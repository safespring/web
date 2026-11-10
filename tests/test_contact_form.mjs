import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const script = readFileSync(new URL('../static/js/contact-form.js', import.meta.url), 'utf8');
const deployment = JSON.parse(readFileSync(new URL('../data/contact_form.json', import.meta.url), 'utf8'));
// Synthetic IDs are confined to this offline fixture; they are not Upsales mappings.
const fixtureMappings = { message: 'Extra.9001', sourcePage: 'Extra.9002', service: 'Extra.9003', language: 'Extra.9004' };
const copy = Object.fromEntries([
  'requiredEmail', 'invalidEmail', 'privateEmail', 'requiredOrganization', 'requiredTerms',
  'tooLong', 'checkFields', 'preview', 'unavailable', 'submit', 'sending', 'serverError', 'uncertainError',
].map(key => [key, key]));

// Only the DOM surface used by this script is emulated. Actual browser validity,
// autofill and label geometry are checked separately in the rendered page.
class Element {
  constructor(properties = {}) {
    Object.assign(this, {
      dataset: {}, attributes: {}, listeners: new Map(), value: '', name: '', type: '',
      textContent: '', hidden: false, disabled: false, required: false, maxLength: 512,
    }, properties);
    const classes = new Set();
    this.classList = {
      add: name => classes.add(name), remove: name => classes.delete(name),
      contains: name => classes.has(name),
      toggle: (name, on) => on ? classes.add(name) : classes.delete(name),
    };
  }
  addEventListener(type, callback) {
    this.listeners.set(type, [...(this.listeners.get(type) || []), callback]);
  }
  dispatch(type) {
    const event = { target: this, prevented: false, preventDefault() { this.prevented = true; } };
    for (const callback of this.listeners.get(type) || []) callback(event);
    return event;
  }
  focus() { this.focused = true; this.dispatch('focus'); }
  closest(selector) { return selector === '.form-field' ? this.field || null : null; }
  setAttribute(name, value) { this.attributes[name] = value; }
  getAttribute(name) { return this.attributes[name] ?? null; }
  removeAttribute(name) { delete this.attributes[name]; }
  setCustomValidity(value) { this.customValidity = value; }
  get validity() {
    return { typeMismatch: this.type === 'email' && !!this.value && !/^[^\s@]+@[^\s@]+$/.test(this.value) };
  }
}

function harness(options = {}) {
  const config = {
    integrationReady: true, submissionUrl: 'https://power.upsales.com/api/external/forms/submit',
    analyticsSites: deployment.analyticsSites,
    fieldNames: fixtureMappings, blockedEmailDomains: deployment.blockedEmailDomains, blockedEmailProviders: deployment.blockedEmailProviders,
    sourcePage: '/tjanster/safespring-compute/', service: 'Compute', language: 'sv', copy,
    ...options.config,
  };
  const elementsById = new Map();
  function input(key, name, type, value = '', required = false) {
    const element = new Element({ name, type, value, required, field: new Element() });
    element.setAttribute('aria-describedby', `${key}-error`);
    elementsById.set(`${key}-error`, new Element({ hidden: true }));
    return element;
  }
  const fields = {
    firstname: input('firstname', 'Contact.firstname', 'text'),
    lastname: input('lastname', 'Contact.lastname', 'text'),
    email: input('email', 'Contact.email', 'email', 'buyer@enterprise.example', true),
    organisation: input('organisation', 'Client.name', 'text', 'Example Organisation', true),
    message: input('message', config.fieldNames.message || '', 'textarea'),
    terms: input('terms', 'singleOptIn.4riingqjtdo', 'checkbox', 'on', true),
  };
  fields.terms.checked = true;
  for (const [key, value] of Object.entries(options.values || {})) fields[key].value = value;
  const status = new Element({ hidden: true });
  const previewNote = new Element({ hidden: true });
  const count = new Element({ textContent: '0' });
  const button = new Element({ type: 'submit', textContent: copy.submit, disabled: true });
  const duns = new Element({ type: 'hidden', name: 'Client.dunsNo' });
  const hidden = [
    new Element({ type: 'hidden', name: 'formCid', value: deployment.formCid }),
    new Element({ type: 'hidden', name: 'formId', value: deployment.formId }),
    new Element({ type: 'hidden', name: 'isFrame', value: 'false' }),
    new Element({ type: 'hidden', name: 'validation' }), duns,
    ...['sourcePage', 'service', 'language'].filter(key => config.fieldNames[key]).map(key =>
      new Element({ type: 'hidden', name: config.fieldNames[key], value: config[key] })),
  ];
  const form = new Element({ dataset: { successUrl: '/contact-thanks/' }, elements: [...Object.values(fields), ...hidden, button] });
  const selectors = new Map([
    ['[data-contact-config]', new Element({ textContent: JSON.stringify(config) })],
    ['button[type="submit"]', button], ['.contact-form-status', status],
    ['[name="Contact.email"]', fields.email], ['[name="Client.name"]', fields.organisation],
    ['[name="Client.dunsNo"]', duns], ['[data-contact-message]', fields.message],
    ['[data-message-count]', count], ['.contact-form-preview', previewNote],
  ]);
  form.querySelector = selector => {
    assert.ok(selectors.has(selector), `Harness does not implement selector ${selector}`);
    return selectors.get(selector);
  };
  form.querySelectorAll = selector => {
    assert.equal(selector, '.form-field input:not([type="hidden"]), textarea, input[type="checkbox"]');
    return Object.values(fields);
  };
  const document = {
    readyState: 'complete', getElementById: id => elementsById.get(id),
    querySelectorAll: selector => { assert.equal(selector, '[data-contact-form]'); return [form]; },
  };
  const requests = [];
  class FakeXHR {
    constructor() { this.headers = {}; this.status = 0; this.responseText = ''; }
    open(method, url) { this.method = method; this.url = url; }
    setRequestHeader(name, value) { this.headers[name] = value; }
    send(body) { this.body = body; requests.push(this); if (options.throwOnSend) throw Error('Synthetic network failure'); }
    respond(statusCode, body = '') { this.status = statusCode; this.responseText = body; this.onload(); }
  }
  let observerCallback;
  class FakeObserver {
    constructor(callback) { observerCallback = callback; }
    observe() {}
    disconnect() {}
  }
  const redirects = [];
  const analytics = [];
  const marketing = [];
  const queued = [];
  let consent = options.consent ?? true;
  const trackers = (options.trackers || [{ id: '1', url: 'https://analytics.safespring.com/matomo.php' }]).map(item => ({
    getSiteId: () => item.id,
    getTrackerUrl: () => item.url,
    trackEvent: (...args) => analytics.push(['trackEvent', ...args]),
  }));
  function runCommand(command) {
    assert.equal(typeof command[0], 'function', 'Use a scoped tracker callback, not a broadcast event');
    for (const tracker of trackers) command[0].call(tracker);
  }
  const window = new Element({
    location: { hostname: options.hostname || 'www.safespring.com', assign: target => redirects.push(target) },
    cookieTractor: { consentGivenFor: category => category === 'marketing' ? !!options.marketingConsent : consent },
    _paq: options.trackerDelayed ? queued : { push: runCommand }, IntersectionObserver: FakeObserver,
    _uaq: value => marketing.push(['upsales', value]),
    safespringTracking: { trackGoogleAdsConversion: value => marketing.push(['ads', value.conversionType]) },
  });
  vm.runInNewContext(script, { document, window, XMLHttpRequest: FakeXHR, IntersectionObserver: FakeObserver, URLSearchParams });
  return {
    fields, form, status, button, previewNote, count, requests, redirects, analytics, marketing,
    submit() { assert.equal(form.dispatch('submit').prevented, true); },
    view() { observerCallback([{ isIntersecting: true }]); },
    pageShow() { window.dispatch('pageshow'); },
    setConsent(value) { consent = value; if (!value) window.dispatch('CookieConsentRevoked'); },
    loadTracker() { queued.splice(0).forEach(runCommand); window._paq = { push: runCommand }; },
  };
}

test('localhost variants never POST even with a ready integration and populated message', () => {
  for (const hostname of ['localhost', 'LOCALHOST.', 'preview.localhost', '127.0.0.1', '127.0.0.2', '[::1]', '::1']) {
    const h = harness({ hostname, values: { message: 'Confidential project details' } });
    h.submit();
    assert.equal(h.requests.length, 0, hostname);
    assert.equal(h.status.textContent, copy.preview);
    assert.equal(h.previewNote.hidden, false);
    assert.equal(h.button.disabled, false);
    assert.equal(h.analytics.length, 0);
  }
});

test('unready or unmapped deployment fails closed outside localhost', () => {
  const incomplete = ['message', 'sourcePage', 'service', 'language'].map(key => ({
    fieldNames: { ...fixtureMappings, [key]: '' },
  }));
  for (const config of [{ integrationReady: false }, ...incomplete,
    { submissionUrl: 'https://untrusted.example/submit' },
    { submissionUrl: 'https://power.upsales.com/api/external/forms/submit?redirect=elsewhere' }]) {
    const h = harness({ config });
    h.submit();
    assert.equal(h.requests.length, 0);
    assert.equal(h.status.textContent, copy.unavailable);
    assert.equal(h.status.classList.contains('is-error'), true);
  }
});

test('blank optional names/message are accepted; names are omitted so existing CRM names are not erased', () => {
  const h = harness({ values: { firstname: ' ', lastname: '' } });
  h.submit();
  assert.equal(h.requests.length, 1);
  const payload = new URLSearchParams(h.requests[0].body);
  assert.equal(payload.has('Contact.firstname'), false);
  assert.equal(payload.has('Contact.lastname'), false);
  assert.equal(payload.get(fixtureMappings.message), '');
  assert.equal(payload.get('Contact.email'), 'buyer@enterprise.example');
  assert.equal(payload.get('Client.name'), 'Example Organisation');
  assert.equal(payload.get('isAjax'), 'true');
});

test('message and page context are encoded into the intended submission fields', () => {
  const message = 'Behöver lagring & drift för forskning + säkerhet = viktigt.';
  const h = harness({ values: { message } });
  h.submit();
  const payload = new URLSearchParams(h.requests[0].body);
  assert.equal(payload.get(fixtureMappings.message), message);
  assert.equal(payload.get(fixtureMappings.sourcePage), '/tjanster/safespring-compute/');
  assert.equal(payload.get(fixtureMappings.service), 'Compute');
  assert.equal(payload.get(fixtureMappings.language), 'sv');
  assert.equal(payload.has('Contact.cellPhone'), false);
});

test('private email blocking is case insensitive and handles surrounding whitespace and subdomains', () => {
  for (const email of ['BUYER@GMAIL.COM', ' buyer@GmAiL.CoM ', 'buyer@mail.gmail.com', 'buyer@hotmail.co.uk', 'buyer@yahoo.de']) {
    const h = harness({ values: { email } });
    h.submit();
    assert.equal(h.requests.length, 0);
    assert.equal(h.fields.email.customValidity, copy.privateEmail);
    assert.equal(h.fields.email.getAttribute('aria-invalid'), 'true');
    assert.equal(h.fields.email.focused, true);
  }
  const h = harness({ values: { email: ' buyer@ENTERPRISE.EXAMPLE ' } });
  h.submit();
  assert.equal(h.requests.length, 1);
  assert.equal(new URLSearchParams(h.requests[0].body).get('Contact.email'), 'buyer@ENTERPRISE.EXAMPLE');
});

test('required fields, retained privacy acknowledgement and message limit are validated', () => {
  for (const [key, value, expected] of [
    ['email', '', copy.requiredEmail], ['email', 'not-an-address', copy.invalidEmail],
    ['organisation', '   ', copy.requiredOrganization], ['message', 'x'.repeat(513), copy.tooLong],
  ]) {
    const h = harness({ values: { [key]: value } });
    h.submit();
    assert.equal(h.requests.length, 0);
    assert.equal(h.fields[key].customValidity, expected);
  }
  const h = harness();
  h.fields.terms.checked = false;
  h.submit();
  assert.equal(h.requests.length, 0);
  assert.equal(h.fields.terms.customValidity, copy.requiredTerms);
});

test('double submission while a request is pending produces exactly one POST', () => {
  const h = harness();
  h.submit();
  h.submit();
  assert.equal(h.requests.length, 1);
  assert.equal(h.button.disabled, true);
  assert.equal(h.form.getAttribute('aria-busy'), 'true');
  assert.equal(h.requests[0].timeout, 20000);
});

test('server, network, timeout and abort failures preserve input and permit a manual retry', () => {
  for (const fail of [request => request.respond(500), request => request.onerror(),
    request => request.ontimeout(), request => request.onabort()]) {
    const h = harness({ values: { firstname: 'Alex', message: 'Keep my question & details' } });
    h.submit();
    fail(h.requests[0]);
    assert.equal(h.button.disabled, false);
    assert.equal(h.form.getAttribute('aria-busy'), null);
    assert.equal(h.status.classList.contains('is-error'), true);
    assert.equal(h.fields.firstname.value, 'Alex');
    assert.equal(h.fields.message.value, 'Keep my question & details');
    assert.equal(h.redirects.length, 0);
    assert.equal(h.requests.length, 1, 'No automatic retry');
    h.submit();
    assert.equal(h.requests.length, 2, 'Explicit retry accepted');
  }
});

test('a synchronous send failure also restores the usable form', () => {
  const h = harness({ throwOnSend: true, values: { message: 'Retain this' } });
  h.submit();
  assert.equal(h.button.disabled, false);
  assert.equal(h.status.textContent, copy.uncertainError);
  assert.equal(h.fields.message.value, 'Retain this');
});

test('HTTP 200 with an unknown object, error text, empty body or HTML never confirms a submission', () => {
  for (const body of ['{"success":true,"id":123}', '{"error":"invalid"}', '', 'null', 'true', '<html>Error</html>', 'error', '"error"']) {
    const h = harness();
    h.submit();
    h.requests[0].respond(200, body);
    assert.equal(h.redirects.length, 0, body);
    assert.equal(h.status.textContent, copy.uncertainError, body);
    assert.equal(h.button.disabled, false);
    assert.equal(h.analytics.some(event => event[2] === 'request_received'), false);
  }
});

test('nonempty scalar receipts follow the generated Upsales contract and redirect once', () => {
  for (const body of ['12345', '"12345"', '123', '"receipt-id_abc123"']) {
    const h = harness();
    h.submit();
    h.requests[0].respond(200, body);
    assert.deepEqual(h.redirects, ['/contact-thanks/']);
    h.submit();
    assert.equal(h.requests.length, 1);
    assert.equal(h.analytics.filter(event => event[2] === 'request_received').length, 1);
  }
});

test('form events reach exactly the matching host tracker, including beta language sites', () => {
  for (const [hostname, id] of Object.entries(deployment.analyticsSites)) {
    const h = harness({ hostname, trackers: [
      { id, url: 'https://analytics.safespring.com/matomo.php' },
      { id, url: 'https://analytics.safespring.com/matomo.php' },
      { id: '99', url: 'https://analytics.safespring.com/matomo.php' },
      { id, url: 'https://unrelated.example/matomo.php' },
    ] });
    h.view();
    h.fields.email.focus();
    assert.deepEqual(h.analytics.map(event => event[2]), ['view', 'start'], hostname);
  }
  for (const hostname of ['www2.safespring.com', 'preview.example', 'safespring.com.evil.example']) {
    const h = harness({ hostname, marketingConsent: true });
    h.view(); h.submit(); h.requests[0].respond(200, '123');
    assert.equal(h.analytics.length, 0, hostname);
    assert.equal(h.marketing.length, 0, hostname);
  }
});

test('late tracker loading preserves consented events but revocation invalidates pending events', () => {
  const h = harness({ trackerDelayed: true });
  h.view(); h.fields.email.focus();
  assert.equal(h.analytics.length, 0);
  h.loadTracker();
  assert.deepEqual(h.analytics.map(event => event[2]), ['view', 'start']);
  const revoked = harness({ trackerDelayed: true });
  revoked.view(); revoked.setConsent(false); revoked.setConsent(true); revoked.loadTracker();
  assert.equal(revoked.analytics.length, 0);
});

test('marketing attribution requires its own consent and a valid receipt; beta never sends Ads conversions', () => {
  for (const marketingConsent of [false, true]) {
    const h = harness({ consent: false, marketingConsent });
    h.submit();
    assert.equal(h.requests[0].__safespringContactFormManaged, true);
    assert.equal(h.marketing.length, 0);
    h.requests[0].respond(200, '12345');
    assert.equal(h.analytics.length, 0);
    assert.deepEqual(h.marketing, marketingConsent ? [['upsales', 'form=12345'], ['ads', 'leadFormSubmit']] : []);
  }
  const beta = harness({ hostname: 'beta.safespring.se', marketingConsent: true });
  beta.submit(); beta.requests[0].respond(200, '12345');
  assert.deepEqual(beta.marketing, [['upsales', 'form=12345']]);
  const invalid = harness({ marketingConsent: true });
  invalid.submit(); invalid.requests[0].respond(200, '{"error":"invalid"}');
  assert.equal(invalid.marketing.length, 0);
});

test('analytics contain only event category/action and page path, never contact or message content', () => {
  const h = harness({ values: { firstname: 'PrivatePerson', organisation: 'PrivateCompany', message: 'PrivateMessage' } });
  h.view();
  h.fields.firstname.focus();
  h.submit();
  h.requests[0].respond(200, '12345');
  assert.deepEqual(h.analytics.map(event => event[2]), ['view', 'start', 'request_received']);
  for (const event of h.analytics) {
    assert.equal(event.length, 4);
    assert.deepEqual(event.slice(0, 2), ['trackEvent', 'Contact form']);
    assert.equal(event[3], '/tjanster/safespring-compute/');
  }
  assert.doesNotMatch(JSON.stringify(h.analytics), /PrivatePerson|PrivateCompany|PrivateMessage|buyer@|12345/);
});

test('events denied by statistical consent are dropped and never replayed after consent changes', () => {
  const h = harness({ consent: false, values: { email: 'buyer@gmail.com' } });
  h.view();
  h.fields.email.focus();
  h.submit();
  assert.equal(h.analytics.length, 0);
  h.setConsent(true);
  h.fields.email.value = 'buyer@enterprise.example';
  h.fields.email.dispatch('input');
  h.submit();
  h.requests[0].respond(200, '12345');
  assert.deepEqual(h.analytics.map(event => event[2]), ['request_received']);
});

test('label state persists for populated fields after blur and pageshow; message count updates', () => {
  const h = harness({ hostname: 'localhost' });
  h.fields.message.focus();
  assert.equal(h.fields.message.field.classList.contains('is-focused'), true);
  h.fields.message.value = 'Three words here';
  h.fields.message.dispatch('input');
  h.fields.message.dispatch('blur');
  assert.equal(h.fields.message.field.classList.contains('is-focused'), false);
  assert.equal(h.fields.message.field.classList.contains('has-content'), true);
  assert.equal(h.count.textContent, String('Three words here'.length));
  h.fields.firstname.value = 'Restored name';
  h.pageShow();
  assert.equal(h.fields.firstname.field.classList.contains('has-content'), true);
});
