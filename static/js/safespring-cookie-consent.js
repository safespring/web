function addScript(id, src, attrs) {
  if (document.getElementById(id)) return;
  var s = document.createElement('script');
  s.id = id;
  s.src = src;
  s.async = true;
  if (attrs && typeof attrs === 'object') {
    Object.keys(attrs).forEach(function (k) { s.setAttribute(k, attrs[k]); });
  }
  document.head.appendChild(s);
}

function removeScript(id) {
  var el = document.getElementById(id);
  if (el && el.parentNode) el.parentNode.removeChild(el);
}

var CATEGORY_SCRIPTS = {
  statistical: [
    { id: 'analytics-script',   src: '/js/matomo.js' },
    { id: 'tagmanager-script',  src: '/js/matomo-tagmanager.js' },
    { id: 'r2b2-script',        src: '/js/r2b2.js' }
  ],
  marketing: [
    { id: 'upsales-script',     src: 'https://img.upsales.com/lBtRI6eK9zoMXU3igCaQIw==/visit/v.js' }
  ]
};

function syncCategory(category) {
  var hasConsent = false;
  try {
    hasConsent = !!cookieTractor && typeof cookieTractor.consentGivenFor === 'function'
      ? cookieTractor.consentGivenFor(category)
      : false;
  } catch (e) {
    hasConsent = false;
  }

  var list = CATEGORY_SCRIPTS[category] || [];
  if (hasConsent) {
    list.forEach(function (item) { addScript(item.id, item.src, item.attrs); });
  } else {
    list.forEach(function (item) { removeScript(item.id); });
  }
}

(function initConsentSync() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      syncCategory('statistical');
      syncCategory('marketing');
    });
  } else {
    syncCategory('statistical');
    syncCategory('marketing');
  }
})();

window.addEventListener('CookieConsentGiven', function (event) {
  // If one category is granted we can resync both cheaply
  syncCategory('statistical');
  syncCategory('marketing');
}, false);

window.addEventListener('CookieConsentRevoked', function (event) {
  var revoked = Array.isArray(event?.detail?.consents) ? event.detail.consents : [];
  if (revoked.indexOf('statistical') > -1) {
    (CATEGORY_SCRIPTS.statistical || []).forEach(function (item) { removeScript(item.id); });
  }
  if (revoked.indexOf('marketing') > -1) {
    (CATEGORY_SCRIPTS.marketing || []).forEach(function (item) { removeScript(item.id); });
  }
}, false);
