window.addEventListener('CookieConsentGiven', function (event) {
  if (cookieTractor.consentGivenFor('statistical')) {
    if (!document.getElementById("analytics-script")) {
      var analytics = document.createElement('script');
      analytics.src = "/js/matomo.js";
      analytics.id = "analytics-script";
      document.getElementsByTagName('head')[0].appendChild(analytics); 
    }

    if (!document.getElementById("tagmanager-script")) {
      var tagmanager = document.createElement('script');
      tagmanager.src = "/js/matomo-tagmanager.js";
      tagmanager.id = "tagmanager-script";
      document.getElementsByTagName('head')[0].appendChild(tagmanager); 
    }

    if (!document.getElementById("r2b2-script")) {
      var r2b2 = document.createElement('script');
      r2b2.src = "https://cdn.r2b2.io/r2b2.js"; // ändra till rätt URL om du har egen
      r2b2.id = "r2b2-script";
      document.getElementsByTagName('head')[0].appendChild(r2b2); 
    }
  }
}, false);

// Radera statistiska script
window.addEventListener('CookieConsentRevoked', function (event) {
  var revokedStatistical = event.detail.consents.indexOf('statistical') > -1;
  if (revokedStatistical) {
    var analytics = document.getElementById("analytics-script");
    var tagmanager = document.getElementById("tagmanager-script");
    var r2b2 = document.getElementById("r2b2-script");

    if (analytics) analytics.parentNode.removeChild(analytics);
    if (tagmanager) tagmanager.parentNode.removeChild(tagmanager);
    if (r2b2) r2b2.parentNode.removeChild(r2b2);
  }
}, false);

// Lägg till marknadsföringsscript
window.addEventListener('CookieConsentGiven', function (event) {
  if (cookieTractor.consentGivenFor('marketing')) {
    if (!document.getElementById("upsales-script")) {
      var upsales = document.createElement('script');
      upsales.src = "https://img.upsales.com/lBtRI6eK9zoMXU3igCaQIw==/visit/v.js";
      upsales.id = "upsales-script";
      document.getElementsByTagName('head')[0].appendChild(upsales);
    }
  }
}, false);

// Radera marknadsföringsscript
window.addEventListener('CookieConsentRevoked', function (event) {
  var revokedMarketing = event.detail.consents.indexOf('marketing') > -1;
  if (revokedMarketing) {
    var upsales = document.getElementById('upsales-script');
    upsales.parentNode.removeChild(upsales);
  }
}, false);