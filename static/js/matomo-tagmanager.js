(function () {
  if (window.__safespringMatomoTagManager) return;
  var state = window.__safespringMatomoTagManager = { requested: false };

  function loadContainer() {
    if (state.requested || !window.__safespringMatomo || !window.__safespringMatomo.ready) return;
    try {
      if (!window.cookieTractor.consentGivenFor('statistical')) return;
    } catch (e) {
      return;
    }
    state.requested = true;
    var mtm = window._mtm = window._mtm || [];
    mtm.push({ 'mtm.startTime': (new Date().getTime()), event: 'mtm.Start' });
    var containerUrl = 'https://analytics.safespring.com/js/container_43nGFJfy.js?v=matomo-owner-20260925-r1';
    if (window.location.hostname === 'www2.safespring.com') {
      containerUrl = 'https://analytics.safespring.com/js/container_43nGFJfy_staging_a9c2dc2373b94947ef881235.js?v=d4b3314b2ea2';
    }
    var script = document.createElement('script');
    script.id = 'matomo-container-tag';
    script.async = true;
    script.src = containerUrl;
    document.head.appendChild(script);
  }

  ['SafespringMatomoReady', 'CookieConsent', 'CookieConsentGiven'].forEach(function (name) {
    window.addEventListener(name, loadContainer, false);
  });
  loadContainer();
})();
