(function () {
  var NAMESPACE = '__safespringGoogleAds';
  var GLOBAL_CONFIG = window.safespringTrackingConfig || {};
  var GOOGLE_CONFIG = GLOBAL_CONFIG.googleAds || {};
  var DEFAULT_CONFIG = {
    accountId: 'AW-802443484',
    conversions: {
      priceListDownload: 'AW-802443484/bet1CMm-rpccENyh0f4C',
      leadFormSubmit: null
    }
  };

  var state = window[NAMESPACE] || {};
  if (state.initialized) {
    state.config = mergeConfig(state.config || DEFAULT_CONFIG, GOOGLE_CONFIG);
    ensureGoogleQueue();
    flushQualifiedEvaluation();
    return;
  }

  state.initialized = true;
  state.config = mergeConfig(DEFAULT_CONFIG, GOOGLE_CONFIG);
  state.pendingFormConversion = null;
  window[NAMESPACE] = state;

  var tracking = window.safespringTracking = window.safespringTracking || {};
  tracking.trackGoogleAdsConversion = trackGoogleAdsConversion;
  tracking.trackGoogleAdsEvent = trackGoogleAdsEvent;
  tracking.hasGoogleAdsMarketingConsent = hasMarketingConsent;
  tracking.configureGoogleAds = configureGoogleAds;

  ensureGoogleQueue();
  bindPriceListTracking();
  bindLeadFormTracking();
  bindConsentTracking();
  flushQualifiedEvaluation();

  function mergeConfig(base, override) {
    var merged = {
      accountId: base && base.accountId ? base.accountId : DEFAULT_CONFIG.accountId,
      conversions: {
        priceListDownload: base && base.conversions ? base.conversions.priceListDownload : null,
        leadFormSubmit: base && base.conversions ? base.conversions.leadFormSubmit : null
      }
    };

    if (override && override.accountId) {
      merged.accountId = override.accountId;
    }
    if (override && override.conversions) {
      if (typeof override.conversions.priceListDownload === 'string') {
        merged.conversions.priceListDownload = override.conversions.priceListDownload;
      }
      if (typeof override.conversions.leadFormSubmit === 'string') {
        merged.conversions.leadFormSubmit = override.conversions.leadFormSubmit;
      }
    }

    return merged;
  }

  function configureGoogleAds(nextConfig) {
    state.config = mergeConfig(state.config, nextConfig || {});
    ensureGoogleQueue();
    flushQualifiedEvaluation();
  }

  function hasMarketingConsent() {
    try {
      return !!window.cookieTractor &&
        typeof window.cookieTractor.consentGivenFor === 'function' &&
        window.cookieTractor.consentGivenFor('marketing');
    } catch (e) {
      return false;
    }
  }

  function ensureGoogleQueue() {
    if (!hasMarketingConsent()) {
      return false;
    }

    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    if (typeof window.gtag !== 'function') {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }
    return true;
  }

  function resolveSendTo(explicitSendTo, conversionType) {
    if (typeof explicitSendTo === 'string' && explicitSendTo.length > 0) {
      return explicitSendTo;
    }
    return state.config.conversions[conversionType] || null;
  }

  function trackGoogleAdsConversion(options) {
    var opts = options || {};
    var sendTo = resolveSendTo(opts.sendTo, opts.conversionType);

    if (!sendTo || !ensureGoogleQueue()) {
      return false;
    }

    var payload = {
      send_to: sendTo,
      transport_type: 'beacon'
    };

    if (typeof opts.value === 'number') {
      payload.value = opts.value;
    }
    if (typeof opts.currency === 'string' && opts.currency.length > 0) {
      payload.currency = opts.currency;
    }
    if (typeof opts.eventCallback === 'function') {
      payload.event_callback = opts.eventCallback;
      payload.event_timeout = typeof opts.eventTimeout === 'number' ? opts.eventTimeout : 1000;
    }

    window.gtag('event', 'conversion', payload);
    return true;
  }

  function trackGoogleAdsEvent(eventName, parameters) {
    if (typeof eventName !== 'string' || !eventName || !ensureGoogleQueue()) {
      return false;
    }

    var payload = {};
    var source = parameters && typeof parameters === 'object' ? parameters : {};
    Object.keys(source).forEach(function (key) {
      payload[key] = source[key];
    });

    if (!payload.send_to) {
      payload.send_to = state.config.accountId;
    }
    if (!payload.transport_type) {
      payload.transport_type = 'beacon';
    }

    window.gtag('event', eventName, payload);
    return true;
  }

  function flushQualifiedEvaluation() {
    var tracker = window.safespringTracking || {};
    if (typeof tracker.flushQualifiedEvaluationToGoogleAds === 'function') {
      tracker.flushQualifiedEvaluationToGoogleAds();
    }
  }

  function bindConsentTracking() {
    window.addEventListener('CookieConsentGiven', function () {
      ensureGoogleQueue();
      window.setTimeout(flushQualifiedEvaluation, 0);
    }, false);

    window.addEventListener('CookieConsent', function () {
      ensureGoogleQueue();
      window.setTimeout(flushQualifiedEvaluation, 0);
    }, false);

    window.addEventListener('CookieConsentRevoked', function (event) {
      var revoked = event && event.detail && Array.isArray(event.detail.consents)
        ? event.detail.consents
        : [];
      if (revoked.indexOf('marketing') > -1) {
        state.pendingFormConversion = null;
      }
    }, false);
  }

  function bindPriceListTracking() {
    document.addEventListener('click', function (event) {
      var target = event.target;
      if (!target || typeof target.closest !== 'function') {
        return;
      }

      var link = target.closest('a[href]');
      if (!link || !isPriceListLink(link)) {
        return;
      }

      if (!shouldDelayNavigation(event, link)) {
        trackGoogleAdsConversion({ conversionType: 'priceListDownload' });
        return;
      }

      delayNavigationForConversion(event, link);
    }, true);
  }

  function isPriceListLink(link) {
    var href = link.getAttribute('href') || '';
    return href.indexOf('/pricelist/') !== -1;
  }

  function shouldDelayNavigation(event, link) {
    return event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey &&
      !link.target &&
      !!link.href;
  }

  function delayNavigationForConversion(event, link) {
    var navigated = false;

    function navigate() {
      if (navigated) {
        return;
      }
      navigated = true;
      window.location.href = link.href;
    }

    event.preventDefault();

    if (!trackGoogleAdsConversion({
      conversionType: 'priceListDownload',
      eventCallback: navigate,
      eventTimeout: 1000
    })) {
      navigate();
      return;
    }

    window.setTimeout(navigate, 1200);
  }

  function bindLeadFormTracking() {
    document.addEventListener('submit', function (event) {
      var form = event.target;
      if (!form || !isUpsalesForm(form)) {
        return;
      }

      state.pendingFormConversion = {
        conversionType: inferFormConversionType(form),
        timestamp: Date.now()
      };
    }, true);

    patchXMLHttpRequest();
  }

  function isUpsalesForm(form) {
    var action = form.getAttribute('action') || '';
    return isUpsalesSubmitUrl(action);
  }

  function inferFormConversionType(form) {
    if (isPriceListForm(form)) {
      return 'priceListDownload';
    }
    return 'leadFormSubmit';
  }

  function isPriceListForm(form) {
    var pagePath = (window.location.pathname || '').toLowerCase();
    if (pagePath.indexOf('/pris') !== -1 || pagePath.indexOf('/price') !== -1) {
      return true;
    }

    var submitText = '';
    var submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitButton) {
      submitText = ((submitButton.textContent || submitButton.value || '') + '').toLowerCase();
    }

    return submitText.indexOf('price list') !== -1 ||
      submitText.indexOf('prislist') !== -1 ||
      submitText.indexOf('priskalk') !== -1;
  }

  function patchXMLHttpRequest() {
    if (state.xhrPatched || !window.XMLHttpRequest) {
      return;
    }

    var originalOpen = window.XMLHttpRequest.prototype.open;
    var originalSend = window.XMLHttpRequest.prototype.send;

    window.XMLHttpRequest.prototype.open = function (method, url) {
      this.__safespringMethod = method;
      this.__safespringUrl = url;
      return originalOpen.apply(this, arguments);
    };

    window.XMLHttpRequest.prototype.send = function () {
      if (!this.__safespringTrackingBound) {
        this.addEventListener('load', function () {
          if (!isSuccessfulUpsalesSubmit(this)) {
            return;
          }

          var pending = state.pendingFormConversion;
          state.pendingFormConversion = null;

          if (!pending || Date.now() - pending.timestamp > 30000) {
            return;
          }

          trackGoogleAdsConversion({ conversionType: pending.conversionType });
        });
        this.__safespringTrackingBound = true;
      }

      return originalSend.apply(this, arguments);
    };

    state.xhrPatched = true;
  }

  function isSuccessfulUpsalesSubmit(xhr) {
    var method = (xhr.__safespringMethod || '').toUpperCase();
    var url = xhr.__safespringUrl || '';
    return method === 'POST' &&
      isUpsalesSubmitUrl(url) &&
      xhr.status >= 200 &&
      xhr.status < 300;
  }

  function isUpsalesSubmitUrl(url) {
    return /power\.upsales\.com\/api\/external\/(formSubmit|forms\/submit)(?:[/?#]|$)/i.test(url || '');
  }
})();
