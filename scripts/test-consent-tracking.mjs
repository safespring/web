import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const googleAdsSource = fs.readFileSync(path.join(projectRoot, 'static/js/google-ads.js'), 'utf8');
const qualifiedEvaluationSource = fs.readFileSync(path.join(projectRoot, 'static/js/qualified-evaluation.js'), 'utf8');
const consentLoaderSource = fs.readFileSync(path.join(projectRoot, 'static/js/safespring-cookie-consent.js'), 'utf8');

function storage(seed = {}) {
  const values = new Map(Object.entries(seed));
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    }
  };
}

function harness(initialConsents = {}) {
  const consents = {
    statistical: !!initialConsents.statistical,
    marketing: !!initialConsents.marketing
  };
  const listeners = new Map();
  const appendedScripts = [];
  const context = {
    console,
    Date,
    Math,
    JSON,
    Object,
    Array,
    String,
    RegExp,
    Number,
    Boolean,
    sessionStorage: storage({
      'safespring.qualifiedEvaluation.session.v1': JSON.stringify({
        version: 'qualified-evaluation-v1',
        startedAt: Date.now() - 180000,
        activeSeconds: 120,
        pageviews: 2,
        paths: ['/tjanster/safespring-backup/', '/pris/'],
        commercialPaths: ['/tjanster/safespring-backup/', '/pris/'],
        highIntentPaths: ['/pris/'],
        contentOnlyPaths: [],
        contactIntent: false,
        returning: false
      })
    }),
    localStorage: storage(),
    location: {
      pathname: '/tjanster/safespring-storage/',
      href: 'https://www.safespring.com/tjanster/safespring-storage/'
    },
    setInterval() {
      return 1;
    },
    clearInterval() {},
    setTimeout(callback) {
      callback();
      return 1;
    },
    addEventListener(name, callback) {
      if (!listeners.has(name)) listeners.set(name, []);
      listeners.get(name).push(callback);
    },
    dispatch(name, detail = {}) {
      for (const callback of listeners.get(name) || []) {
        callback({ detail });
      }
    },
    cookieTractor: {
      consentGivenFor(category) {
        return !!consents[category];
      }
    },
    document: {
      hidden: false,
      addEventListener() {},
      getElementById() {
        return null;
      },
      createElement(tagName) {
        return { tagName, setAttribute() {} };
      },
      head: {
        appendChild(element) {
          appendedScripts.push(element);
        }
      }
    }
  };

  context.window = context;
  context.__consents = consents;
  context.__appendedScripts = appendedScripts;
  return vm.createContext(context);
}

function run(source, context, filename) {
  vm.runInContext(source, context, { filename });
}

function googleEvents(context, eventName) {
  return (context.dataLayer || []).filter((entry) => {
    const args = Array.from(entry);
    return args[0] === 'event' && args[1] === eventName;
  });
}

assert.doesNotMatch(googleAdsSource, /googletagmanager\.com\/gtag\/js/);
assert.doesNotMatch(googleAdsSource, /gtag\(['\"]config['\"]/);
assert.match(consentLoaderSource, /marketing:[\s\S]*google-ads\.js/);
assert.match(consentLoaderSource, /statistical:[\s\S]*qualified-evaluation\.js/);

{
  const context = harness({ marketing: true });
  run(googleAdsSource, context, 'google-ads.js');
  assert.equal(context.__appendedScripts.length, 0, 'event adapter must not inject gtag.js');
  assert.equal(context.safespringTracking.trackGoogleAdsEvent('qualified_evaluation', { product_area: 'storage' }), true);
  assert.equal(googleEvents(context, 'qualified_evaluation').length, 1);

  context.__consents.marketing = false;
  context.dispatch('CookieConsentRevoked', { consents: ['marketing'] });
  assert.equal(context.safespringTracking.trackGoogleAdsEvent('qualified_evaluation', {}), false);
  assert.equal(googleEvents(context, 'qualified_evaluation').length, 1, 'revocation must block new events without reload');
}

{
  const context = harness({ statistical: true, marketing: false });
  run(qualifiedEvaluationSource, context, 'qualified-evaluation.js');
  assert.equal(context._paq.length, 1, 'QE remains a Matomo event with statistical consent');
  assert.equal(context.dataLayer, undefined, 'QE must not create a Google queue without marketing consent');

  context.__consents.marketing = true;
  run(googleAdsSource, context, 'google-ads.js');
  assert.equal(googleEvents(context, 'qualified_evaluation').length, 1, 'eligible QE is forwarded after marketing consent');
  assert.equal(Array.from(googleEvents(context, 'qualified_evaluation')[0])[2].product_area, 'storage');

  context.dispatch('CookieConsentGiven', { consents: ['marketing'] });
  assert.equal(googleEvents(context, 'qualified_evaluation').length, 1, 'QE must only be forwarded once per session');
}

{
  const context = harness({ statistical: false, marketing: true });
  context.sessionStorage.setItem('safespring.qualifiedEvaluation.sent.v1', String(Date.now()));
  run(qualifiedEvaluationSource, context, 'qualified-evaluation.js');
  run(googleAdsSource, context, 'google-ads.js');
  assert.equal(googleEvents(context, 'qualified_evaluation').length, 0, 'Google QE requires statistical consent too');
}

console.log('Consent tracking smoke tests passed.');
