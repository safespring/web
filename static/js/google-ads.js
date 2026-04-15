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
    ensureGoogleTag();
    return;
  }

  state.initialized = true;
  state.config = mergeConfig(DEFAULT_CONFIG, GOOGLE_CONFIG);
  state.pendingFormConversion = null;
  window[NAMESPACE] = state;

  var tracking = window.safespringTracking = window.safespringTracking || {};
  tracking.trackGoogleAdsConversion = trackGoogleAdsConversion;
  tracking.configureGoogleAds = configureGoogleAds;

  ensureGoogleTag();
  bindPriceListTracking();
  bindLeadFormTracking();

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
    ensureGoogleTag();
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

  function ensureGoogleTag() {
    if (!hasMarketingConsent()) {
      return;
    }

    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    if (typeof window.gtag !== 'function') {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }

    if (!state.sourceLoaded) {
      injectGoogleSource(state.config.accountId);
      window.gtag('js', new Date());
      window.gtag('config', state.config.accountId);
      state.sourceLoaded = true;
    }
  }

  function injectGoogleSource(accountId) {
    if (document.getElementById('google-ads-gtag-source')) {
      return;
    }

    var source = document.createElement('script');
    source.id = 'google-ads-gtag-source';
    source.async = true;
    source.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(accountId);
    document.head.appendChild(source);
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

    if (!sendTo || !hasMarketingConsent() || typeof window.gtag !== 'function') {
      return false;
    }

    var payload = {
      send_to: sendTo
    };

    if (typeof opts.value === 'number') {
      payload.value = opts.value;
    }
    if (typeof opts.currency === 'string' && opts.currency.length > 0) {
      payload.currency = opts.currency;
    }

    window.gtag('event', 'conversion', payload);
    return true;
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

      trackGoogleAdsConversion({ conversionType: 'priceListDownload' });
    }, true);
  }

  function isPriceListLink(link) {
    var href = link.getAttribute('href') || '';
    return href.indexOf('/pricelist/') !== -1;
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
    return action.indexOf('power.upsales.com/api/external/formSubmit') !== -1;
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
      url.indexOf('power.upsales.com/api/external/formSubmit') !== -1 &&
      xhr.status >= 200 &&
      xhr.status < 300;
  }
})();
