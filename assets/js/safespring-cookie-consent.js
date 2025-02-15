!function(){"use strict";(function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})})({});var t=function(){function t(){}return t.DaysFromNow=function(t){return this.DaysFrom(new Date,t)},t.DaysFrom=function(t,e){return new Date(t.setDate(t.getDate()+e))},t.FormatDate=function(t){return t.toLocaleString("sv-SE",{dateStyle:"short",timeStyle:"short"})},t}();function e(t,e){return t.indexOf(e)>-1}var n,o,a="CookieTractor|Declaration: ",r={cdnUrlBase:"https://cdn.cookietractor.com",apiUrlBase:"https://app.cookietractor.com",disableCdn:!1,cacheBuster:""},i="CookieDeclaration",c=void 0;o=document.querySelectorAll('script[src*="'.concat("/cookietractor-declaration.js",'"]'))[0],function(t,e){var n,o=window.cookieConsentSettings,a=e.getAttribute("src"),r=function(t){if(!t||t.length<4)throw"Cannot extract protocol from: "+t;if("//"==t.substring(0,2)){var e=window.location.protocol;return e.substring(0,e.length-1)}return t.length>4&&"https"===t.substring(0,5)?"https":"http"}(a),i=((n=a).indexOf("//")>-1?n.split("/")[2]:n.split("/")[0]).split(":")[0].split("?")[0];t.cdnUrlBase=r+"://"+i;var c=e.getAttribute("data-id");c&&(t.websiteKey=c);var s=e.getAttribute("data-lang");s&&(t.langIso=s),o&&(o.apiUrlBase&&(t.apiUrlBase=o.apiUrlBase),o.cdnUrlBase&&(t.cdnUrlBase=o.cdnUrlBase),o.disableCdn&&(t.disableCdn=o.disableCdn),o.cacheBuster&&(t.cacheBuster=o.cacheBuster),o.runInCrawlMode&&(t.runInCrawlMode=o.runInCrawlMode),o.websiteKey&&(t.websiteKey=o.websiteKey),o.langIso&&(t.langIso=o.langIso),void 0!==o.cmInitialized&&(t.cmInitialized=o.cmInitialized),void 0!==o.cmAdsDataRedaction&&(t.cmAdsDataRedaction=o.cmAdsDataRedaction),void 0!==o.cmUrlPassthrough&&(t.cmUrlPassthrough=o.cmUrlPassthrough),void 0!==o.cmWaitForUpdate&&(t.cmWaitForUpdate=o.cmWaitForUpdate))}(r,o),n=function(){document.getElementById(i)&&function(t){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src=t,e.id="cookie-website";try{document.body.appendChild(e)}catch(t){console.error("Could not load website specific cookie-configuration. Error details: "+t)}}(function(){var t=r.langIso;if(!t)throw a+'Could not find data-lang-attribute on script tag. Please set language like so: <script data-lang="en-US">...';var e=window.location.hostname.replace(/^(?:https?:\/\/)/i,"").split("/")[0];if(!e)throw"Could not find hostname.";var n="";if(!r.websiteKey)throw a+"Missing data-id on script tag. Cookie declaration will not be loaded.";return n=(!1===r.disableCdn?r.cdnUrlBase:r.apiUrlBase)+"/ext/"+r.websiteKey+"/"+e+"/cookiedeclaration-"+t+".js",r.cacheBuster&&r.cacheBuster.length>0&&(n+="?v"+r.cacheBuster),n}())},document.body?n():window.attachEvent?window.attachEvent("onload",n):window.addEventListener("DOMContentLoaded",n,!0),window.cookieTractorDeclaration=window.cookieTractorDeclaration||{initDeclaration:function(n){var o=document.getElementById(i);o&&(o.innerHTML=n.html,null!=(c=function(t){var e=function(t){for(var e=t+"=",n=document.cookie.split(";"),o=0;o<n.length;o++){for(var a=n[o];" "==a.charAt(0);)a=a.substring(1);if(0==a.indexOf(e))return a.substring(e.length,a.length)}return""}(t);if(e&&""!==e){var n=decodeURI(e);return JSON.parse(n)}return null}("_cc_cookieConsent"))&&function(n,o,a){document.getElementById("cc-consent-category".concat(a)).innerHTML=function(t,n){var o=[];if(e(t,"functional")&&o.push("functional"),e(t,"statistical")&&o.push("statistical"),e(t,"marketing")&&o.push("marketing"),0==o.length&&o.push("necessary"),1==o.length)return n[o[0]];for(var a="",r=0;r<o.length;r++){var i=r==o.length-2,c=r==o.length-1;a+=n[o[r]],c||(a+=i?" & ":", ")}return a}(n.consents,o),document.getElementById("cc-consent-date".concat(a)).innerHTML=t.FormatDate(new Date(n.utc)),document.getElementById("cc-consent-key".concat(a)).innerHTML=n.user,document.getElementById("cc-info".concat(a)).classList.add("opened")}(c,n.translations,"-declaration"))}}}();

window.addEventListener('CookieConsentGiven', function (event) {
  if (cookieTractor.consentGivenFor('statistical')) {
    if (!document.getElementById("analytics-script")) {
      var analytics = document.createElement('script');
      analytics.src = "/js/matomo.js";
      analytics.id = "analytics-script";
      document.getElementsByTagName('head')[0].appendChild(analytics); 

      var tagmanager = document.createElement('script');
      tagmanager.src = "/js/matomo-tagmanager.js";
      tagmanager.id = "tagmanager-script";
      document.getElementsByTagName('head')[0].appendChild(tagmanager); 
    }
  }
}, false);

// Radera statistiskt script
window.addEventListener('CookieConsentRevoked', function (event) {
  var revokedStatistical = event.detail.consents.indexOf('statistical') > -1;
  if (revokedStatistical) {
    var analytics = document.getElementById("analytics-script");
    var tagmanager = document.getElementById("tagmanager-script");
    analytics.parentNode.removeChild(analytics);
    tagmanager.parentNode.removeChild(tagmanager);
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