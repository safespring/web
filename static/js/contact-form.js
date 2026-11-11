(function () {
  'use strict';

  function init(form) {
    if (form.dataset.contactInitialized) return;
    form.dataset.contactInitialized = 'true';

    var config = JSON.parse(form.querySelector('[data-contact-config]').textContent);
    var copy = config.copy;
    // Local previews must never create CRM contacts or send notification emails.
    var hostname = window.location.hostname.toLowerCase().replace(/\.$/, '');
    var preview = hostname === 'localhost' || /^127(?:\.\d{1,3}){3}$/.test(hostname)
      || hostname === '[::1]' || hostname === '::1' || /\.localhost$/.test(hostname);
    var button = form.querySelector('button[type="submit"]');
    var status = form.querySelector('.contact-form-status');
    var email = form.querySelector('[name="Contact.email"]');
    var organisation = form.querySelector('[name="Client.name"]');
    var message = form.querySelector('[data-contact-message]');
    var fields = Array.prototype.slice.call(form.querySelectorAll('.form-field input:not([type="hidden"]), textarea, input[type="checkbox"]'));
    var inFlight = false;
    var started = false;
    var viewed = false;
    var validationEvents = {};
    var consentEpoch = 0;
    var analyticsSite = (config.analyticsSites || {})[hostname];
    window.addEventListener('CookieConsentRevoked', function () { consentEpoch += 1; });

    function hasConsent(category) {
      try {
        return !!window.cookieTractor && !!window.cookieTractor.consentGivenFor(category);
      } catch (error) { return false; }
    }

    function track(action) {
      if (preview || !analyticsSite || !hasConsent('statistical')) return;
      // Do not queue denied activity for a later consent grant. Never send input values.
      try {
        var epoch = consentEpoch;
        var sent = false;
        var queue = window._paq = window._paq || [];
        // A Tag Manager may have added another tracker. Send only to the site's tracker.
        queue.push([function () {
          try {
            if (sent || epoch !== consentEpoch || !hasConsent('statistical')) return;
            if (String(this.getSiteId()) !== String(analyticsSite)
              || this.getTrackerUrl() !== 'https://analytics.safespring.com/matomo.php') return;
            sent = true;
            this.trackEvent('Contact form', action, config.sourcePage);
          } catch (error) { /* A late analytics callback must not interrupt other scripts. */ }
        }]);
      } catch (error) { /* Analytics must not affect the form. */ }
    }

    function trackReceipt(receipt) {
      track('request_received');
      if (preview || !analyticsSite || !hasConsent('marketing')) return;
      try {
        if (typeof window._uaq === 'function') window._uaq('form=' + receipt);
        // Reuse an explicitly configured Ads conversion; never invent a new conversion label.
        if (hostname === 'www.safespring.com' && window.safespringTracking
          && typeof window.safespringTracking.trackGoogleAdsConversion === 'function') {
          window.safespringTracking.trackGoogleAdsConversion({ conversionType: 'leadFormSubmit' });
        }
      } catch (error) { /* Marketing attribution must not affect the receipt. */ }
    }

    function showStatus(text, isError) {
      status.textContent = text;
      status.hidden = !text;
      status.classList.toggle('is-error', !!isError);
    }

    function updateLabel(input) {
      var field = input.closest('.form-field');
      if (field) field.classList.toggle('has-content', !!input.value);
    }

    function errorFor(input) {
      var value = input.value.trim();
      if (input === email) {
        if (!value) return copy.requiredEmail;
        // Native email syntax plus a dotted business domain; allow international domains.
        input.setCustomValidity('');
        if (input.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return copy.invalidEmail;
        var domain = value.split('@').pop().toLowerCase();
        if (config.blockedEmailDomains.some(function (blocked) {
          return domain === blocked || domain.endsWith('.' + blocked);
        }) || (config.blockedEmailProviders || []).some(function (provider) {
          // Match the provider across country suffixes, as in Upsales' native blocklist.
          return domain.indexOf(provider + '.') === 0;
        })) return copy.privateEmail;
      }
      if (input === organisation && !value) return copy.requiredOrganization;
      if (input.type === 'checkbox' && input.required && !input.checked) return copy.requiredTerms;
      if (input.maxLength > 0 && input.value.length > input.maxLength) return copy.tooLong;
      return '';
    }

    function validate(input) {
      var error = errorFor(input);
      var errorId = (input.getAttribute('aria-describedby') || '').split(' ').filter(function (id) {
        return /-error$/.test(id);
      })[0];
      var errorElement = errorId && document.getElementById(errorId);
      input.setCustomValidity(error);
      input.setAttribute('aria-invalid', error ? 'true' : 'false');
      var field = input.closest('.form-field');
      if (field) field.classList.toggle('invalid', !!error);
      if (errorElement) {
        errorElement.textContent = error;
        errorElement.hidden = !error;
        // Required fields are already marked; keep their descriptions for assistive technology.
        errorElement.classList.toggle('contact-visually-hidden', error === copy.requiredEmail || error === copy.requiredOrganization);
      }
      if (error) {
        var category = input === email ? (error === copy.privateEmail ? 'private_email' : 'email')
          : input === organisation ? 'organisation' : input.type === 'checkbox' ? 'consent' : 'length';
        if (!validationEvents[category]) {
          track('validation_error_' + category);
          validationEvents[category] = true;
        }
      }
      return !error;
    }

    fields.forEach(function (input) {
      input.addEventListener('focus', function () {
        var field = input.closest('.form-field');
        if (field) field.classList.add('is-focused');
        updateLabel(input);
        if (!started) { started = true; track('start'); }
      });
      input.addEventListener('blur', function () {
        var field = input.closest('.form-field');
        if (field) field.classList.remove('is-focused');
        input.dataset.touched = 'true';
        updateLabel(input);
        validate(input);
      });
      input.addEventListener('input', function () {
        updateLabel(input);
        if (input.dataset.touched || input.getAttribute('aria-invalid') === 'true') validate(input);
        if (input === message) form.querySelector('[data-message-count]').textContent = String(message.value.length);
      });
      input.addEventListener('change', function () { updateLabel(input); validate(input); });
      input.addEventListener('animationstart', function () { updateLabel(input); });
      updateLabel(input);
    });
    window.addEventListener('pageshow', function () {
      fields.forEach(updateLabel);
      form.querySelector('[data-message-count]').textContent = String(message.value.length);
    });

    if (window.IntersectionObserver) {
      var observer = new IntersectionObserver(function (entries) {
        if (!viewed && entries.some(function (entry) { return entry.isIntersecting; })) {
          viewed = true;
          track('view');
          observer.disconnect();
        }
      });
      observer.observe(form);
    }

    // Keep the existing organisation suggestions; free text remains valid if lookup fails.
    var jq = window.jQuery;
    if (jq && jq.fn && typeof jq.fn.typeahead === 'function') {
      var nameField = jq(organisation);
      var duns = form.querySelector('[name="Client.dunsNo"]');
      var selectedName = '';
      var timer;
      var lookup;
      var generation = 0;
      function escape(value) {
        var span = document.createElement('span');
        span.textContent = value || '';
        return span.innerHTML;
      }
      nameField.typeahead({ hint: false, highlight: true, minLength: 2 }, {
        name: 'clients', limit: 25,
        source: function (query, sync, callback) {
          clearTimeout(timer);
          if (lookup) lookup.abort();
          var current = ++generation;
          timer = setTimeout(function () {
            lookup = jq.ajax({
              type: 'GET', timeout: 5000,
              url: 'https://power.upsales.com/api/external/prospecting/clientSearch?country=SE&country=NO&country=DK&country=FI&country=GB&country=BE&country=FR&country=IE&country=IT&country=LU&country=NL&country=DE&country=AT&name=' + encodeURIComponent(query),
              success: function (result) { if (current === generation) callback(result && Array.isArray(result.data) ? result.data : []); },
              error: function () { if (current === generation) callback([]); }
            });
          }, 200);
        },
        templates: { suggestion: function (client) {
          return '<div><div>' + escape(client.name) + '</div><span class="contact-suggestion-city">' + escape(client.city) + '</span></div>';
        } }
      }).bind('typeahead:select typeahead:autocompleted', function (event, client) {
        nameField.typeahead('val', client.name);
        duns.value = client.dunsNo || '';
        selectedName = client.name;
        updateLabel(organisation);
        validate(organisation);
      }).bind('typeahead:change', function () {
        if (organisation.value !== selectedName) duns.value = '';
        updateLabel(organisation);
      });
      organisation.addEventListener('input', function () {
        if (organisation.value !== selectedName) duns.value = '';
      });
    }

    function finishError(text) {
      inFlight = false;
      button.disabled = false;
      button.textContent = copy.submit;
      form.removeAttribute('aria-busy');
      showStatus(text, true);
      status.focus();
      track('submission_error');
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (inFlight) return;
      showStatus('', false);
      email.value = email.value.trim();
      var firstInvalid;
      fields.forEach(function (input) {
        input.dataset.touched = 'true';
        if (!validate(input) && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) {
        showStatus(copy.checkFields, true);
        firstInvalid.focus();
        return;
      }
      if (preview) {
        showStatus(copy.preview, false);
        status.focus();
        return;
      }
      // No invented Upsales field IDs. Fail closed until the live form contract is verified.
      var mapped = ['message', 'sourcePage', 'service', 'language'].every(function (key) {
        return /^Extra\.\d+$/.test(config.fieldNames[key] || '');
      });
      if (!config.integrationReady || !mapped
        || !/^https:\/\/power\.upsales\.com\/api\/external\/(formSubmit|forms\/submit)$/.test(config.submissionUrl)) {
        showStatus(copy.unavailable, true);
        status.focus();
        return;
      }

      var payload = new URLSearchParams();
      Array.prototype.forEach.call(form.elements, function (input) {
        if (!input.name || input.disabled || input.type === 'submit') return;
        var value = input.type === 'checkbox' ? (input.checked ? input.value : 'off') : input.value.trim();
        // Empty optional names should not erase an existing contact's name.
        if (!value && /^Contact\.(firstname|lastname)$/.test(input.name)) return;
        payload.append(input.name, value);
      });
      payload.set('isAjax', 'true');
      inFlight = true;
      button.disabled = true;
      button.textContent = copy.sending;
      form.setAttribute('aria-busy', 'true');
      var request = new XMLHttpRequest();
      request.__safespringContactFormManaged = true;
      request.open('POST', config.submissionUrl);
      request.timeout = 20000;
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.onload = function () {
        if (request.status !== 200) { finishError(copy.serverError); return; }
        // Upsales' generated handler expects a scalar submit ID, not a JSON object.
        var receipt = request.responseText.trim();
        try { receipt = JSON.parse(receipt); } catch (error) { /* A plain-text ID is also supported. */ }
        if ((typeof receipt !== 'string' && typeof receipt !== 'number')
          || !String(receipt).trim() || String(receipt).length > 512
          || /[<>\s\x00-\x1f\x7f]/.test(String(receipt))
          || /^(error|false|true|null|undefined|nan|infinity)$/i.test(String(receipt))) {
          finishError(copy.uncertainError);
          return;
        }
        // This records the web response, not an independently verified CRM conversion.
        trackReceipt(String(receipt));
        window.location.assign(form.dataset.successUrl);
      };
      request.onerror = function () { finishError(copy.uncertainError); };
      request.ontimeout = function () { finishError(copy.uncertainError); };
      request.onabort = function () { finishError(copy.uncertainError); };
      try { request.send(payload.toString()); } catch (error) { finishError(copy.uncertainError); }
    });

    button.disabled = false;
    form.querySelector('.contact-form-preview').hidden = !preview;
  }

  function start() {
    document.querySelectorAll('[data-contact-form]').forEach(init);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
