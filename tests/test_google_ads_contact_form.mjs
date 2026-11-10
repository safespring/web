import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../static/js/google-ads.js', import.meta.url), 'utf8');
const endpoints = [
  'https://power.upsales.com/api/external/formSubmit',
  'https://power.upsales.com/api/external/forms/submit',
];

function harness({ consent = true, configuredLead = true } = {}) {
  const listeners = new Map();
  const windowListeners = new Map();
  const scripts = [];
  let marketingConsent = consent;
  class FakeXHR {
    constructor() { this.listeners = new Map(); this.status = 0; }
    addEventListener(type, callback) { this.listeners.set(type, [...(this.listeners.get(type) || []), callback]); }
    open(method, url) { this.method = method; this.url = url; }
    send(body) { this.body = body; }
    respond(status, responseText = '12345') {
      this.status = status;
      this.responseText = responseText;
      for (const callback of this.listeners.get('load') || []) callback.call(this);
    }
  }
  const document = {
    addEventListener(type, callback) { listeners.set(type, [...(listeners.get(type) || []), callback]); },
    querySelector() { return null; },
    createElement() { return {}; },
    head: { appendChild(script) { scripts.push(script); } },
  };
  const window = {
    location: { pathname: '/kontakt/', hostname: 'www.safespring.com' },
    cookieTractor: { consentGivenFor(category) { assert.equal(category, 'marketing'); return marketingConsent; } },
    XMLHttpRequest: FakeXHR,
    setTimeout(callback) { callback(); },
    addEventListener(type, callback) { windowListeners.set(type, [...(windowListeners.get(type) || []), callback]); },
    safespringTrackingConfig: { googleAds: { accountId: 'AW-FIXTURE', conversions: configuredLead ? { leadFormSubmit: 'AW-FIXTURE/lead' } : {} } },
  };
  vm.runInNewContext(source, { window, document });
  function submit({ managed = false, action = endpoints[0] } = {}) {
    const form = {
      hasAttribute(name) { return name === 'data-contact-form' && managed; },
      getAttribute(name) { return name === 'action' ? action : ''; },
      querySelector() { return { textContent: 'Skicka förfrågan' }; },
    };
    for (const callback of listeners.get('submit') || []) callback({ target: form });
  }
  function request({ managed = false, endpoint = endpoints[0] } = {}) {
    const xhr = new window.XMLHttpRequest();
    if (managed) xhr.__safespringContactFormManaged = true;
    xhr.open('POST', endpoint);
    xhr.send('Contact.email=private%40company.example&Extra.9001=confidential');
    return xhr;
  }
  return {
    submit, request, scripts, window,
    conversions() { return (window.dataLayer || []).filter(entry => entry[0] === 'event' && entry[1] === 'conversion'); },
    consent(value) {
      marketingConsent = value;
      const type = value ? 'CookieConsentGiven' : 'CookieConsentRevoked';
      for (const callback of windowListeners.get(type) || []) callback({ detail: { consents: ['marketing'] } });
    },
  };
}

test('legacy forms retain their existing conversion behavior on both Upsales endpoints', () => {
  for (const endpoint of endpoints) {
    const h = harness();
    h.submit({ action: endpoint });
    h.request({ endpoint }).respond(200);
    assert.equal(h.conversions().length, 1, endpoint);
    assert.equal(h.conversions()[0][2].send_to, 'AW-FIXTURE/lead');
    assert.doesNotMatch(JSON.stringify(h.conversions()), /private|company\.example|confidential/);
  }
});

test('a managed contact form never arms the generic Ads form conversion', () => {
  for (const action of ['#up-form', ...endpoints]) {
    const h = harness();
    h.submit({ managed: true, action });
    h.request().respond(200);
    assert.equal(h.conversions().length, 0, action);
  }
});

test('managed requests cannot consume a legacy pending conversion, including HTTP 200 error objects', () => {
  for (const endpoint of endpoints) {
    for (const response of ['12345', '{"error":"invalid"}', '{"success":true}']) {
      const h = harness();
      h.submit();
      h.submit({ managed: true });
      h.request({ managed: true, endpoint }).respond(200, response);
      assert.equal(h.conversions().length, 0, `${endpoint}: ${response}`);
      h.request().respond(200);
      assert.equal(h.conversions().length, 1, 'Only the pending legacy request may consume its conversion');
    }
  }
});

test('the explicit validated-receipt path can send once without a second generic conversion', () => {
  const h = harness();
  h.submit({ managed: true });
  h.request({ managed: true }).respond(200);
  assert.equal(h.conversions().length, 0);
  assert.equal(h.window.safespringTracking.trackGoogleAdsConversion({ conversionType: 'leadFormSubmit' }), true);
  assert.equal(h.conversions().length, 1);
});

test('the default null lead conversion is never invented by either path', () => {
  const h = harness({ configuredLead: false });
  h.submit();
  h.request().respond(200);
  assert.equal(h.window.safespringTracking.trackGoogleAdsConversion({ conversionType: 'leadFormSubmit' }), false);
  assert.equal(h.conversions().length, 0);
});

test('marketing denial prevents Ads scripts and both conversion paths', () => {
  const h = harness({ consent: false });
  h.submit();
  h.request().respond(200);
  assert.equal(h.window.safespringTracking.trackGoogleAdsConversion({ conversionType: 'leadFormSubmit' }), false);
  assert.equal(h.scripts.length, 0);
  assert.equal(h.conversions().length, 0);
  h.consent(true);
  assert.equal(h.conversions().length, 0, 'Denied form activity is not replayed');
});

test('revoking marketing consent before the response discards the pending conversion', () => {
  const h = harness();
  h.submit();
  const xhr = h.request();
  h.consent(false);
  xhr.respond(200);
  h.consent(true);
  assert.equal(h.conversions().length, 0);
});
