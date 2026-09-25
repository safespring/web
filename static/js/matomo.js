(function () {
  var existing = window.__safespringMatomo;
  if (existing) {
    existing.sync();
    return;
  }

  var state = window.__safespringMatomo = {
    ready: false,
    pageviewTracked: false,
    trackers: [],
    sync: syncConsent
  };

  function hasConsent() {
    try {
      return !!window.cookieTractor
        && typeof window.cookieTractor.consentGivenFor === 'function'
        && !!window.cookieTractor.consentGivenFor('statistical');
    } catch (e) {
      return false;
    }
  }

  function syncTracker(tracker) {
    if (hasConsent()) {
      if (!tracker.hasConsent()) tracker.setConsentGiven();
    } else if (tracker.hasConsent()) {
      tracker.forgetConsentGiven();
    }
  }

  function guardTracker(tracker) {
    if (state.trackers.indexOf(tracker) !== -1) return;
    state.trackers.push(tracker);
    tracker.requireConsent();
    // Native link handlers also use this request-processing hook.
    tracker.setCustomRequestProcessing(function (request) {
      return hasConsent() ? request : '';
    });
    // Do not queue activity from a denied period for a later consent grant.
    Object.keys(tracker).forEach(function (name) {
      if (!/^(track|ping$|queueRequest$)/.test(name) || typeof tracker[name] !== 'function') return;
      var original = tracker[name];
      tracker[name] = function () {
        if (!hasConsent()) return;
        return original.apply(this, arguments);
      };
    });
    syncTracker(tracker);
  }

  function syncConsent() {
    state.trackers.forEach(syncTracker);
    if (state.primary && hasConsent() && !state.pageviewTracked) {
      state.pageviewTracked = true;
      state.primary.trackPageView();
    }
  }

  function installGuards() {
    if (state.guardsInstalled || !window.Matomo) return;
    state.guardsInstalled = true;
    window.Matomo.on('TrackerSetup', guardTracker);
    window.Matomo.getAsyncTrackers().forEach(guardTracker);
  }

  var previousInit = window.matomoAsyncInit;
  window.matomoAsyncInit = function () {
    installGuards();
    if (typeof previousInit === 'function') previousInit.apply(this, arguments);
  };
  installGuards();

  var paq = window._paq = window._paq || [];
  if (Array.isArray(paq)) {
    var queuePush = paq.push;
    paq.push = function () {
      for (var i = 0; i < arguments.length; i += 1) {
        var command = arguments[i];
        if (Array.isArray(command) && /^(track|ping$|queueRequest$)/.test(command[0]) && !hasConsent()) continue;
        queuePush.call(this, command);
      }
      return this.length;
    };
  }
  paq.push(['requireConsent']);
  paq.push(['setTrackerUrl', 'https://analytics.safespring.com/matomo.php']);
  paq.push(['setSiteId', '1']);
  paq.push([function () {
    guardTracker(this);
    if (!state.primary) {
      state.primary = this;
      this.enableLinkTracking();
    }
    state.ready = true;
    syncConsent();
    window.dispatchEvent(new Event('SafespringMatomoReady'));
  }]);

  ['CookieConsent', 'CookieConsentGiven', 'CookieConsentRevoked'].forEach(function (name) {
    window.addEventListener(name, syncConsent, false);
  });

  if (!window.Matomo && !document.getElementById('matomo-base-tag')) {
    var script = document.createElement('script');
    script.id = 'matomo-base-tag';
    script.async = true;
    script.src = 'https://analytics.safespring.com/matomo.js';
    document.head.appendChild(script);
  }
})();
