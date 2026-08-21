(function () {
  var VERSION = 'qualified-evaluation-v2';
  var EVENT_CATEGORY = 'Lead intent';
  var EVENT_ACTION = 'Commercial evaluation candidate';
  var SESSION_KEY = 'safespring.qualifiedEvaluation.candidate.session.v2';
  var SENT_KEY = 'safespring.qualifiedEvaluation.candidate.sent.v2';
  var ACTIVE_SECONDS_REQUIRED = 120;
  var INACTIVITY_SECONDS = 60;
  var DEEP_READ_PERCENT = 60;
  var SAVE_EVERY_SECONDS = 5;
  var EVALUATE_EVERY_SECONDS = 5;

  var COMMERCIAL_PATH_RE = /\/(tjanster|services|tjenester|pris|price|kontakt|contact|demo|schedule-demo|branscher|industries|bransjer|compliance|certifieringar|data-centers|datacenter|containerplattform|containerplatform|containers|kubernetes|compute|storage|backup|database|machine-learning|ai|gpu|openstack|gdpr|sovereign-cloud|cloud|saas|service-catalogue|geant)(\/|$)/i;
  var HIGH_INTENT_PATH_RE = /\/(pris|price|kontakt|contact|demo|schedule-demo|container-thanks)(\/|$)/i;
  var PRODUCT_PATH_RE = /\/(tjanster|services|tjenester)\/[^/]+\/$/i;

  var state = readJson(SESSION_KEY) || {
    version: VERSION,
    activeSeconds: 0,
    paths: [],
    commercialPaths: [],
    highIntentPaths: [],
    deepCommercialPaths: []
  };
  var stopped = false;
  var tickCount = 0;
  var currentPath = normalizePath(window.location.pathname || '/');
  var lastActivityAt = Date.now();

  state.version = VERSION;
  addCurrentPage();
  updateScrollDepth();
  saveState();
  evaluate();

  var timer = window.setInterval(function () {
    if (stopped) return;
    if (isActivelyVisible()) state.activeSeconds += 1;
    tickCount += 1;

    if (tickCount % SAVE_EVERY_SECONDS === 0) saveState();
    if (tickCount % EVALUATE_EVERY_SECONDS === 0) evaluate();
  }, 1000);

  ['pointerdown', 'pointermove', 'keydown', 'touchstart', 'wheel'].forEach(function (eventName) {
    document.addEventListener(eventName, markActivity, { passive: true, capture: true });
  });

  document.addEventListener('scroll', function () {
    markActivity();
    updateScrollDepth();
  }, { passive: true, capture: true });

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) markActivity();
    saveState();
    evaluate();
  });

  window.addEventListener('focus', markActivity);
  window.addEventListener('pagehide', saveState);

  window.addEventListener('CookieConsentRevoked', function (event) {
    var revoked = event && event.detail && Array.isArray(event.detail.consents)
      ? event.detail.consents
      : [];
    if (revoked.indexOf('statistical') > -1) stopAndForget();
  }, false);

  function isActivelyVisible() {
    var focused = typeof document.hasFocus !== 'function' || document.hasFocus();
    var recentlyActive = Date.now() - lastActivityAt <= INACTIVITY_SECONDS * 1000;
    return !document.hidden && focused && recentlyActive;
  }

  function markActivity() {
    lastActivityAt = Date.now();
  }

  function addCurrentPage() {
    addUnique(state.paths, currentPath);
    if (isCommercialPath(currentPath)) addUnique(state.commercialPaths, currentPath);
    if (isHighIntentPath(currentPath)) addUnique(state.highIntentPaths, currentPath);
  }

  function updateScrollDepth() {
    var documentElement = document.documentElement;
    var body = document.body;
    var scrollTop = window.scrollY || documentElement.scrollTop || (body && body.scrollTop) || 0;
    var viewportHeight = window.innerHeight || documentElement.clientHeight || 0;
    var documentHeight = Math.max(
      documentElement.scrollHeight || 0,
      documentElement.offsetHeight || 0,
      body ? body.scrollHeight || 0 : 0,
      body ? body.offsetHeight || 0 : 0
    );

    if (!isCommercialPath(currentPath) || documentHeight <= viewportHeight || documentHeight === 0) return;
    var percent = Math.min(100, Math.round(((scrollTop + viewportHeight) / documentHeight) * 100));
    if (percent >= DEEP_READ_PERCENT) addUnique(state.deepCommercialPaths, currentPath);
  }

  function evaluate() {
    if (stopped || !hasStatisticalConsent() || wasSent()) return;
    if (state.activeSeconds < ACTIVE_SECONDS_REQUIRED || state.commercialPaths.length === 0) return;

    var reasons = [];
    if (state.highIntentPaths.length > 0) reasons.push('high-intent-page');
    if (state.commercialPaths.length >= 2) reasons.push('multi-commercial-page');
    if (state.deepCommercialPaths.length > 0) reasons.push('deep-commercial-read');

    if (reasons.length > 0) sendQualifiedEvaluation(reasons);
  }

  function sendQualifiedEvaluation(reasons) {
    if (wasSent()) return;
    writeSession(SENT_KEY, String(Date.now()));

    var paq = window._paq = window._paq || [];
    paq.push([
      'trackEvent',
      EVENT_CATEGORY,
      EVENT_ACTION,
      VERSION + '|' + reasons.join('+'),
      state.activeSeconds
    ]);
  }

  function hasStatisticalConsent() {
    try {
      return !!window.cookieTractor
        && typeof window.cookieTractor.consentGivenFor === 'function'
        && window.cookieTractor.consentGivenFor('statistical');
    } catch (e) {
      return false;
    }
  }

  function wasSent() {
    return !!readSession(SENT_KEY);
  }

  function stopAndForget() {
    stopped = true;
    if (timer) window.clearInterval(timer);
    removeSession(SESSION_KEY);
    removeSession(SENT_KEY);
  }

  function isCommercialPath(path) {
    return COMMERCIAL_PATH_RE.test(path);
  }

  function isHighIntentPath(path) {
    return HIGH_INTENT_PATH_RE.test(path) || PRODUCT_PATH_RE.test(path);
  }

  function normalizePath(path) {
    var value = String(path || '/').split('?')[0].split('#')[0];
    if (!value) value = '/';
    if (value.charAt(0) !== '/') value = '/' + value;
    if (value !== '/' && value.indexOf('.') === -1 && value.charAt(value.length - 1) !== '/') {
      value += '/';
    }
    return value;
  }

  function addUnique(list, value) {
    if (list.indexOf(value) === -1) list.push(value);
    if (list.length > 30) list.shift();
  }

  function readJson(key) {
    var value = readSession(key);
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  function saveState() {
    writeSession(SESSION_KEY, JSON.stringify(state));
  }

  function readSession(key) {
    try {
      return window.sessionStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function writeSession(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (e) {
      // Storage may be unavailable in strict browser modes; tracking fails closed.
    }
  }

  function removeSession(key) {
    try {
      window.sessionStorage.removeItem(key);
    } catch (e) {
      // Nothing to clear when storage is unavailable.
    }
  }

})();
