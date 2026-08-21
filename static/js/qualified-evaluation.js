(function () {
  var VERSION = 'qualified-evaluation-v1';
  var EVENT_CATEGORY = 'Lead intent';
  var EVENT_ACTION = 'Qualified evaluation';
  var SESSION_KEY = 'safespring.qualifiedEvaluation.session.v1';
  var SENT_KEY = 'safespring.qualifiedEvaluation.sent.v1';
  var GOOGLE_SENT_KEY = 'safespring.qualifiedEvaluation.googleSent.v1';
  var RETURNING_KEY = 'safespring.qualifiedEvaluation.firstSeen.v1';
  var SAVE_EVERY_SECONDS = 5;
  var EVALUATE_EVERY_SECONDS = 5;

  var COMMERCIAL_PATH_RE = /\/(tjanster|tjenester|services|pris|price|kontakt|contact|demo|schedule-demo|branscher|industries|ocre|eosc|compliance|certifieringar|data-centers|datacenter|containerplattform|containerplatform|containers|kubernetes|compute|storage|s3|backup|database|machine-learning|ai|gpu|openstack|gdpr|sovereign-cloud|cloud)(\/|$)/i;
  var HIGH_INTENT_PATH_RE = /\/(pris|price|kontakt|contact|demo|schedule-demo|container-thanks)(\/|$)/i;
  var CONTENT_ONLY_PATH_RE = /\/(blogg|blog|career|docs|documentation|latest|whitepaper|webinar|solution-brief)(\/|$)/i;

  var state = readJson(SESSION_KEY) || {
    version: VERSION,
    startedAt: Date.now(),
    activeSeconds: 0,
    pageviews: 0,
    paths: [],
    commercialPaths: [],
    highIntentPaths: [],
    contentOnlyPaths: [],
    contactIntent: false,
    returning: false
  };
  var stopped = false;
  var tickCount = 0;

  state.version = VERSION;
  state.returning = markReturningVisitor();
  addCurrentPage();
  saveState();
  evaluate();
  scheduleGoogleAdsFlush();

  var timer = window.setInterval(function () {
    if (stopped) return;
    if (!document.hidden) state.activeSeconds += 1;
    tickCount += 1;

    if (tickCount % SAVE_EVERY_SECONDS === 0) saveState();
    if (tickCount % EVALUATE_EVERY_SECONDS === 0) evaluate();
  }, 1000);

  document.addEventListener('click', function (event) {
    var target = event.target && typeof event.target.closest === 'function'
      ? event.target.closest('a[href]')
      : null;
    if (!target) return;

    var href = target.getAttribute('href') || '';
    if (/^(mailto:|tel:)/i.test(href) || /\/(kontakt|contact)\//i.test(href)) {
      state.contactIntent = true;
      saveState();
      evaluate();
    }
  }, true);

  document.addEventListener('visibilitychange', function () {
    saveState();
    evaluate();
  });

  window.addEventListener('pagehide', saveState);

  window.addEventListener('CookieConsentRevoked', function (event) {
    var revoked = event && event.detail && Array.isArray(event.detail.consents)
      ? event.detail.consents
      : [];
    if (revoked.indexOf('statistical') > -1) stop();
  }, false);

  window.addEventListener('CookieConsentGiven', scheduleGoogleAdsFlush, false);
  window.addEventListener('CookieConsent', scheduleGoogleAdsFlush, false);

  var tracking = window.safespringTracking = window.safespringTracking || {};
  tracking.flushQualifiedEvaluationToGoogleAds = flushQualifiedEvaluationToGoogleAds;

  function stop() {
    stopped = true;
    if (timer) window.clearInterval(timer);
  }

  function addCurrentPage() {
    var path = normalizePath(window.location.pathname || '/');
    state.pageviews += 1;
    addUnique(state.paths, path);
    if (COMMERCIAL_PATH_RE.test(path)) addUnique(state.commercialPaths, path);
    if (HIGH_INTENT_PATH_RE.test(path)) addUnique(state.highIntentPaths, path);
    if (CONTENT_ONLY_PATH_RE.test(path)) addUnique(state.contentOnlyPaths, path);
  }

  function evaluate() {
    if (stopped || !hasStatisticalConsent() || wasSent()) return;

    var commercialCount = state.commercialPaths.length;
    var highIntentCount = state.highIntentPaths.length;
    var contentOnly = state.paths.length > 0 && state.paths.length === state.contentOnlyPaths.length;
    if (contentOnly) return;

    var longCommercialSession = state.activeSeconds >= 120
      && state.pageviews >= 3
      && commercialCount >= 2;
    var intentCommercialSession = state.activeSeconds >= 90
      && commercialCount >= 2
      && highIntentCount >= 1;
    var returningIntentSession = state.returning
      && state.activeSeconds >= 60
      && state.pageviews >= 2
      && commercialCount >= 1
      && highIntentCount >= 1;
    var explicitContactIntent = state.contactIntent
      && commercialCount >= 1;

    if (
      longCommercialSession
      || intentCommercialSession
      || returningIntentSession
      || explicitContactIntent
    ) {
      sendQualifiedEvaluation();
    }
  }

  function sendQualifiedEvaluation() {
    if (wasSent()) return;

    var score = Math.min(100, Math.round(
      state.activeSeconds / 12
      + state.pageviews * 8
      + state.commercialPaths.length * 18
      + state.highIntentPaths.length * 16
      + (state.contactIntent ? 25 : 0)
      + (state.returning ? 10 : 0)
    ));

    state.qualifiedScore = score;
    state.qualifiedAt = Date.now();
    saveState();
    write(SENT_KEY, String(state.qualifiedAt), true);

    var paq = window._paq = window._paq || [];
    paq.push([
      'trackEvent',
      EVENT_CATEGORY,
      EVENT_ACTION,
      VERSION,
      score
    ]);

    scheduleGoogleAdsFlush();
  }

  function scheduleGoogleAdsFlush() {
    window.setTimeout(flushQualifiedEvaluationToGoogleAds, 0);
  }

  function flushQualifiedEvaluationToGoogleAds() {
    if (!wasSent() || wasSentToGoogle() || !hasStatisticalConsent() || !hasMarketingConsent()) {
      return false;
    }

    var adsTracking = window.safespringTracking || {};
    if (typeof adsTracking.trackGoogleAdsEvent !== 'function') {
      return false;
    }

    var score = typeof state.qualifiedScore === 'number'
      ? state.qualifiedScore
      : 0;
    var sent = adsTracking.trackGoogleAdsEvent('qualified_evaluation', {
      evaluation_version: VERSION,
      evaluation_score: score,
      product_area: inferProductArea(),
      returning_visitor: !!state.returning
    });

    if (sent) {
      write(GOOGLE_SENT_KEY, String(Date.now()), true);
    }
    return sent;
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

  function hasMarketingConsent() {
    try {
      return !!window.cookieTractor
        && typeof window.cookieTractor.consentGivenFor === 'function'
        && window.cookieTractor.consentGivenFor('marketing');
    } catch (e) {
      return false;
    }
  }

  function markReturningVisitor() {
    var firstSeen = read(RETURNING_KEY, false);
    if (!firstSeen) {
      write(RETURNING_KEY, String(Date.now()), false);
      return false;
    }
    return true;
  }

  function wasSent() {
    return !!read(SENT_KEY, true);
  }

  function wasSentToGoogle() {
    return !!read(GOOGLE_SENT_KEY, true);
  }

  function inferProductArea() {
    var paths = state.commercialPaths || [];
    for (var index = paths.length - 1; index >= 0; index -= 1) {
      var path = paths[index];
      if (/\/(safespring-)?backup(\/|$)/i.test(path)) return 'backup';
      if (/\/(safespring-)?storage(\/|$)/i.test(path) || /\/s3(\/|$)/i.test(path)) return 'storage';
      if (/\/(safespring-)?compute(\/|$)/i.test(path) || /\/openstack(\/|$)/i.test(path)) return 'compute';
      if (/\/(kubernetes|containerplattform|containerplatform|containers|welkin|stakater)(\/|$)/i.test(path)) {
        return 'kubernetes';
      }
    }
    return 'general';
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
    try {
      var value = window.sessionStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      return null;
    }
  }

  function saveState() {
    write(SESSION_KEY, JSON.stringify(state), true);
  }

  function read(key, session) {
    try {
      return session
        ? window.sessionStorage.getItem(key)
        : window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function write(key, value, session) {
    try {
      if (session) {
        window.sessionStorage.setItem(key, value);
      } else {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      // Storage may be unavailable in strict browser modes; tracking should fail closed.
    }
  }
})();
