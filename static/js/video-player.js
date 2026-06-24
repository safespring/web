(function () {
  'use strict';

  if (window.__videoPlayerBootstrapped) {
    return;
  }
  window.__videoPlayerBootstrapped = true;

  var hlsScriptPromise = null;

  function normalizeBool(value) {
    if (value === true || value === false) {
      return value;
    }
    if (typeof value !== 'string') {
      return null;
    }
    var normalized = value.trim().toLowerCase();
    if (normalized === 'true' || normalized === '1' || normalized === 'yes' || normalized === 'on') {
      return true;
    }
    if (normalized === 'false' || normalized === '0' || normalized === 'no' || normalized === 'off') {
      return false;
    }
    return null;
  }

  function normalizeCursorLabel(label, fallback) {
    var text = (label == null ? '' : String(label)).trim();
    if (!text) {
      text = fallback || '';
    }
    text = text.replace(/^["']+|["']+$/g, '');
    if (text.toLowerCase() === 'play') {
      return 'Play';
    }
    if (text.toLowerCase() === 'pause') {
      return 'Pause';
    }
    return text || fallback || '';
  }

  function isHlsSource(url) {
    return typeof url === 'string' && /\.m3u8(?:$|[?#])/i.test(url);
  }

  function normalizeMediaUrl(url) {
    if (!url) {
      return '';
    }
    try {
      return encodeURI(decodeURI(url));
    } catch (decodeError) {
      try {
        return encodeURI(url);
      } catch (encodeError) {
        return url;
      }
    }
  }

  function hasNonAsciiUrl(url) {
    return /[^\x00-\x7F]/.test(url || '');
  }

  function isSafariBrowser() {
    var userAgent = navigator.userAgent || '';
    return /Safari/i.test(userAgent) &&
      !/Chrome|Chromium|CriOS|Edg|OPR|Firefox|FxiOS|Android/i.test(userAgent);
  }

  function shouldPreferHlsJs(url) {
    return isSafariBrowser() && hasNonAsciiUrl(url);
  }

  function shouldUseNativeControls() {
    if (!window.matchMedia) {
      return false;
    }
    return window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(max-width: 700px)').matches;
  }

  function loadHlsScript() {
    if (window.Hls) {
      return Promise.resolve();
    }
    if (hlsScriptPromise) {
      return hlsScriptPromise;
    }

    hlsScriptPromise = new Promise(function (resolve, reject) {
      var existingScript = document.querySelector('script[data-video-player-hls="true"]');
      if (existingScript) {
        existingScript.addEventListener('load', function () {
          resolve();
        });
        existingScript.addEventListener('error', function () {
          reject(new Error('Failed to load hls.min.js'));
        });
        return;
      }

      var script = document.createElement('script');
      script.src = '/js/hls.min.js';
      script.async = true;
      script.dataset.videoPlayerHls = 'true';
      script.onload = function () {
        resolve();
      };
      script.onerror = function () {
        reject(new Error('Failed to load hls.min.js'));
      };
      document.head.appendChild(script);
    }).catch(function (error) {
      hlsScriptPromise = null;
      throw error;
    });

    return hlsScriptPromise;
  }

  function logPlaybackError(error) {
    if (!error) {
      console.warn('Video playback could not start. Verify stream availability.');
      return;
    }
    if (typeof error === 'string') {
      console.warn('Video playback could not start. ' + error);
      return;
    }
    if (error.name || error.message) {
      console.warn('Video playback could not start:', error.name || 'Error', error.message || '');
      return;
    }
    console.warn('Video playback could not start. Verify stream availability.', error);
  }

  function logFullscreenError(error) {
    if (!error) {
      console.warn('Fullscreen could not start. Verify browser permissions.');
      return;
    }
    if (typeof error === 'string') {
      console.warn('Fullscreen could not start. ' + error);
      return;
    }
    if (error.name || error.message) {
      console.warn('Fullscreen could not start:', error.name || 'Error', error.message || '');
      return;
    }
    console.warn('Fullscreen could not start. Verify browser permissions.', error);
  }

  function debugVideoPlayer(message, details) {
    if (details === undefined) {
      console.info('[video-player]', message);
      return;
    }
    console.info('[video-player]', message, details);
  }

  function initVideoPlayer(root) {
    if (!root || root.dataset.videoPlayerInitialized === 'true') {
      return;
    }
    root.dataset.videoPlayerInitialized = 'true';

    var video = root.querySelector('[data-role="video"]');
    if (!video) {
      return;
    }

    var customCursor = root.querySelector('[data-role="custom-cursor"]');
    var videoTimeline = root.querySelector('[data-role="timeline"]');
    var videoTimelineFill = root.querySelector('[data-role="timeline-fill"]');
    var videoTimeText = root.querySelector('[data-role="time"]');
    var captionOverlay = root.querySelector('[data-role="caption-overlay"]');
    var subtitleControls = root.querySelector('[data-role="subtitle-controls"]');
    var subtitleToggle = root.querySelector('[data-role="subtitle-toggle"]');
    var muteToggle = root.querySelector('[data-role="mute-toggle"]');
    var subtitleSelect = root.querySelector('[data-role="subtitle-select"]');
    var fullscreenToggle = root.querySelector('[data-role="fullscreen-toggle"]');

    var videoSrc = root.__videoSrc || root.getAttribute('data-video-src') || '';
    var normalizedVideoSrc = normalizeMediaUrl(videoSrc);
    // Decide playback path from raw source so non-ASCII URLs (e.g. en dash) are still detectable.
    var preferHlsJs = shouldPreferHlsJs(videoSrc);
    var cursorTextPaused = normalizeCursorLabel(root.getAttribute('data-cursor-paused'), 'Play');
    var cursorTextPlaying = normalizeCursorLabel(root.getAttribute('data-cursor-playing'), 'Pause');
    var initialSubtitleLang = (root.getAttribute('data-initial-subtitle-lang') || '').toLowerCase();
    var pageSubtitleLang = (root.getAttribute('data-page-subtitle-lang') || '').toLowerCase();
    var ccDefaultOnAttr = normalizeBool(root.getAttribute('data-cc-default-on'));
    var unmuteOnInteraction = normalizeBool(root.getAttribute('data-unmute-on-interaction')) === true;
    var unmuteOnPlay = normalizeBool(root.getAttribute('data-unmute-on-play')) === true;
    var playerId = root.getAttribute('data-player-id') || root.id || '';
    var useUrlTime = normalizeBool(root.getAttribute('data-url-time')) === true;
    var useNativeControls = shouldUseNativeControls();
    var debugContext = {
      src: videoSrc,
      normalizedSrc: normalizedVideoSrc,
      preferHlsJs: preferHlsJs,
      nativeControls: useNativeControls
    };

    var htmlLang = (document.documentElement && document.documentElement.lang ? document.documentElement.lang : '').toLowerCase();
    var autoSubtitleLang = '';
    if (htmlLang === 'en') {
      autoSubtitleLang = 'en';
    } else if (htmlLang === 'no' || htmlLang === 'nb' || htmlLang === 'nn') {
      autoSubtitleLang = 'no';
    }

    var initialized = false;
    var initPromise = null;
    var isToggleInProgress = false;
    var isTimelineScrubbing = false;
    var subtitlesInitialized = false;
    var activeSubtitleTrack = null;
    var activeSubtitleListener = null;
    var hlsInstance = null;
    var pendingSeekTime = useUrlTime ? getRequestedTime() : null;

    var muteLabels = {
      mute: 'Ljud av',
      unmute: 'Ljud på'
    };
    var subtitleToggleLabels = {
      enable: 'Slå på undertexter',
      disable: 'Slå av undertexter'
    };
    var fullscreenLabels = {
      enter: 'Fullskärm',
      exit: 'Stäng fullskärm'
    };

    if (htmlLang === 'en') {
      muteLabels.mute = 'Mute';
      muteLabels.unmute = 'Unmute';
      subtitleToggleLabels.enable = 'Enable subtitles';
      subtitleToggleLabels.disable = 'Disable subtitles';
      fullscreenLabels.enter = 'Full screen';
      fullscreenLabels.exit = 'Exit full screen';
    } else if (htmlLang === 'no' || htmlLang === 'nb' || htmlLang === 'nn') {
      muteLabels.mute = 'Demp';
      muteLabels.unmute = 'Lyd på';
      subtitleToggleLabels.enable = 'Slå på undertekster';
      subtitleToggleLabels.disable = 'Slå av undertekster';
      fullscreenLabels.enter = 'Fullskjerm';
      fullscreenLabels.exit = 'Avslutt fullskjerm';
    }

    var subtitleState = {
      enabled: ccDefaultOnAttr === null ? !!autoSubtitleLang : ccDefaultOnAttr,
      language: (initialSubtitleLang || autoSubtitleLang || pageSubtitleLang || '').toLowerCase()
    };

    function setNativeControlsMode(enabled) {
      useNativeControls = !!enabled;
      root.classList.toggle('uses-native-controls', useNativeControls);

      if (useNativeControls) {
        video.controls = true;
        video.setAttribute('controls', 'controls');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        if (!video.getAttribute('preload') || video.getAttribute('preload') === 'none') {
          video.setAttribute('preload', 'metadata');
        }
        hideTimeline();
        clearCaptionOverlay();
        applyNativeSubtitleState();
        ensureVideoInitialized().catch(function (error) {
          logPlaybackError(error);
        });
        return;
      }

      video.controls = false;
      video.removeAttribute('controls');
      root.classList.remove('has-visible-caption');
      if (subtitlesInitialized) {
        applySubtitleState();
        updateSubtitleControls();
      }
    }

    setNativeControlsMode(useNativeControls);

    function setCursorText() {
      if (!customCursor) {
        return;
      }
      customCursor.textContent = video.paused ? cursorTextPaused : cursorTextPlaying;
    }

    function formatTime(seconds) {
      if (!isFinite(seconds)) {
        return '00:00';
      }
      var totalSeconds = Math.max(0, Math.floor(seconds));
      var minutes = Math.floor(totalSeconds / 60);
      var remainingSeconds = totalSeconds % 60;
      return (minutes < 10 ? '0' : '') + minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
    }

    function updateTimeText() {
      if (!videoTimeText) {
        return;
      }
      var current = isFinite(video.currentTime) ? video.currentTime : 0;
      var duration = isFinite(video.duration) ? video.duration : 0;
      videoTimeText.textContent = formatTime(current) + ' / ' + formatTime(duration);
    }

    function updateTimelineProgress() {
      if (!videoTimelineFill) {
        return;
      }
      if (!video.duration || video.duration <= 0 || !isFinite(video.duration) || !isFinite(video.currentTime)) {
        videoTimelineFill.style.width = '0%';
        updateTimeText();
        return;
      }
      var progress = (video.currentTime / video.duration) * 100;
      videoTimelineFill.style.width = Math.min(Math.max(progress, 0), 100) + '%';
      updateTimeText();
    }

    function parseSeekTime(time) {
      var parsedTime = Number(time);
      return Number.isFinite(parsedTime) && parsedTime >= 0 ? parsedTime : null;
    }

    function getRequestedTime() {
      var requestedTime = null;
      if (window.URLSearchParams) {
        var params = new URLSearchParams(window.location.search);
        requestedTime = params.get('t') || params.get('time');
      }
      if (!requestedTime && window.location.hash) {
        var hashMatch = window.location.hash.match(/(?:^#t=|[&?]t=)(\d+(?:\.\d+)?)/);
        requestedTime = hashMatch ? hashMatch[1] : null;
      }
      return parseSeekTime(requestedTime);
    }

    function waitForMetadata() {
      if (video.readyState >= 1) {
        return Promise.resolve(true);
      }
      return new Promise(function (resolve) {
        var resolved = false;
        var timeout = window.setTimeout(function () {
          if (resolved) {
            return;
          }
          resolved = true;
          resolve(video.readyState >= 1);
        }, 8000);

        video.addEventListener('loadedmetadata', function () {
          if (resolved) {
            return;
          }
          resolved = true;
          window.clearTimeout(timeout);
          resolve(true);
        }, { once: true });

        if (video.load) {
          try {
            video.load();
          } catch (error) {
            logPlaybackError(error);
          }
        }
      });
    }

    function updateUrlTime(time) {
      if (!window.history || !window.history.replaceState || !window.URL) {
        return;
      }
      var url = new URL(window.location.href);
      url.searchParams.set('t', time);
      if (playerId) {
        url.hash = playerId;
      }
      window.history.replaceState(null, '', url.toString());
    }

    function playVideo() {
      var playResult = video.play();
      if (playResult && playResult.catch) {
        playResult.catch(function (error) {
          logPlaybackError(error);
        });
      }
      return playResult;
    }

    function seekToTime(time, options) {
      var parsedTime = parseSeekTime(time);
      if (parsedTime === null) {
        return Promise.resolve(false);
      }

      options = options || {};
      pendingSeekTime = parsedTime;

      if (options.updateUrl) {
        updateUrlTime(parsedTime);
      }

      function applySeek() {
        video.currentTime = parsedTime;
        pendingSeekTime = null;
        updateTimelineProgress();
        updateTimeText();
        if (options.play) {
          playVideo();
        }
      }

      return ensureVideoInitialized().then(function () {
        return waitForMetadata();
      }).then(function (hasMetadata) {
        if (!hasMetadata) {
          video.addEventListener('loadedmetadata', applySeek, { once: true });
          if (options.play) {
            playVideo();
          }
          return false;
        }
        applySeek();
        return true;
      }).catch(function (error) {
        logPlaybackError(error);
        return false;
      });
    }

    function showTimeline() {
      if (useNativeControls) {
        return;
      }
      if (videoTimeline) {
        videoTimeline.style.opacity = '1';
        videoTimeline.style.pointerEvents = 'auto';
      }
      if (videoTimeText) {
        videoTimeText.style.opacity = '1';
      }
      if (captionOverlay) {
        captionOverlay.classList.add('is-lifted');
      }
      if (subtitleControls) {
        subtitleControls.style.opacity = '1';
        subtitleControls.style.pointerEvents = 'auto';
      }
      if (fullscreenToggle && !fullscreenToggle.disabled) {
        fullscreenToggle.style.opacity = '1';
        fullscreenToggle.style.pointerEvents = 'auto';
      }
    }

    function hideTimeline() {
      if (videoTimeline) {
        videoTimeline.style.opacity = '0';
        videoTimeline.style.pointerEvents = 'none';
      }
      if (videoTimeText) {
        videoTimeText.style.opacity = '0';
      }
      if (captionOverlay) {
        captionOverlay.classList.remove('is-lifted');
      }
      if (subtitleControls) {
        subtitleControls.style.opacity = '0';
        subtitleControls.style.pointerEvents = 'none';
      }
      if (fullscreenToggle) {
        fullscreenToggle.style.opacity = '0';
        fullscreenToggle.style.pointerEvents = 'none';
      }
    }

    function getTimelineClientX(event) {
      if (event.touches && event.touches.length) {
        return event.touches[0].clientX;
      }
      if (event.changedTouches && event.changedTouches.length) {
        return event.changedTouches[0].clientX;
      }
      return event.clientX;
    }

    function seekFromTimeline(event) {
      if (!videoTimeline || !video.duration || video.duration <= 0 || !isFinite(video.duration)) {
        return;
      }
      var rect = videoTimeline.getBoundingClientRect();
      if (!rect.width || !isFinite(rect.width)) {
        return;
      }
      var clientX = getTimelineClientX(event);
      if (!isFinite(clientX)) {
        return;
      }
      var ratio = (clientX - rect.left) / rect.width;
      if (ratio < 0) {
        ratio = 0;
      }
      if (ratio > 1) {
        ratio = 1;
      }
      video.currentTime = ratio * video.duration;
      updateTimelineProgress();
    }

    function stopTimelineScrub() {
      isTimelineScrubbing = false;
    }

    function startTimelineScrub(event) {
      if (!videoTimeline) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      isTimelineScrubbing = true;
      ensureVideoInitialized().then(function () {
        seekFromTimeline(event);
      }).catch(function () {
        isTimelineScrubbing = false;
      });
    }

    function moveTimelineScrub(event) {
      if (!isTimelineScrubbing) {
        return;
      }
      seekFromTimeline(event);
    }

    function showCustomCursor() {
      if (useNativeControls || !customCursor) {
        return;
      }
      customCursor.style.visibility = 'visible';
      setCursorText();
    }

    function hideCustomCursor() {
      if (!customCursor) {
        return;
      }
      customCursor.style.visibility = 'hidden';
    }

    function getSubtitleTracks() {
      var tracks = [];
      if (!video.textTracks) {
        return tracks;
      }
      for (var i = 0; i < video.textTracks.length; i++) {
        tracks.push(video.textTracks[i]);
      }
      return tracks;
    }

    function clearCaptionOverlay() {
      if (!captionOverlay) {
        return;
      }
      captionOverlay.textContent = '';
      captionOverlay.classList.remove('is-visible');
      root.classList.remove('has-visible-caption');
    }

    function renderActiveCues() {
      if (useNativeControls || !captionOverlay || !activeSubtitleTrack || !subtitleState.enabled) {
        clearCaptionOverlay();
        return;
      }
      var activeCues = activeSubtitleTrack.activeCues;
      if (!activeCues || !activeCues.length) {
        clearCaptionOverlay();
        return;
      }

      var lines = [];
      for (var i = 0; i < activeCues.length; i++) {
        lines.push(activeCues[i].text || '');
      }
      var captionText = lines.join(' ').replace(/\s+/g, ' ').trim();
      if (!captionText) {
        clearCaptionOverlay();
        return;
      }
      captionOverlay.textContent = '';
      var lineElement = document.createElement('span');
      lineElement.className = 'video-caption-overlay-line';
      lineElement.textContent = captionText;
      captionOverlay.appendChild(lineElement);
      captionOverlay.classList.add('is-visible');
      root.classList.add('has-visible-caption');
    }

    function detachActiveSubtitleTrack() {
      if (activeSubtitleTrack && activeSubtitleListener && activeSubtitleTrack.removeEventListener) {
        activeSubtitleTrack.removeEventListener('cuechange', activeSubtitleListener);
      }
      activeSubtitleTrack = null;
      activeSubtitleListener = null;
      clearCaptionOverlay();
    }

    function getLanguageCandidates(language) {
      if (!language) {
        return [];
      }
      var normalized = language.toLowerCase();
      if (normalized === 'no' || normalized === 'nb' || normalized === 'nn') {
        return ['no', 'nb', 'nn'];
      }
      if (normalized === 'sv' || normalized === 'se') {
        return ['sv', 'se'];
      }
      return [normalized];
    }

    function findTrackLanguage(language) {
      if (!language) {
        return '';
      }
      var tracks = getSubtitleTracks();
      var candidates = getLanguageCandidates(language);
      for (var i = 0; i < tracks.length; i++) {
        var trackLang = (tracks[i].language || '').toLowerCase();
        for (var j = 0; j < candidates.length; j++) {
          var candidate = candidates[j];
          if (trackLang === candidate || trackLang.indexOf(candidate + '-') === 0) {
            return trackLang;
          }
        }
      }
      return '';
    }

    function getPreferredSubtitleLanguage() {
      var tracks = getSubtitleTracks();
      if (!tracks.length) {
        return '';
      }

      var selected = findTrackLanguage(subtitleState.language);
      if (selected) {
        return selected;
      }

      var pageLanguage = findTrackLanguage(pageSubtitleLang);
      if (pageLanguage) {
        return pageLanguage;
      }

      var english = findTrackLanguage('en');
      if (english) {
        return english;
      }

      return (tracks[0].language || '').toLowerCase();
    }

    function applySubtitleState() {
      if (useNativeControls) {
        applyNativeSubtitleState();
        return;
      }
      var tracks = getSubtitleTracks();
      for (var i = 0; i < tracks.length; i++) {
        tracks[i].mode = 'disabled';
      }
      detachActiveSubtitleTrack();

      if (!tracks.length || !subtitleState.enabled) {
        return;
      }

      var targetLang = getPreferredSubtitleLanguage();
      if (!targetLang) {
        return;
      }
      subtitleState.language = targetLang;

      for (var j = 0; j < tracks.length; j++) {
        var trackLang = (tracks[j].language || '').toLowerCase();
        if (trackLang === targetLang) {
          tracks[j].mode = 'hidden';
          if (tracks[j].addEventListener) {
            activeSubtitleTrack = tracks[j];
            activeSubtitleListener = function () {
              renderActiveCues();
            };
            activeSubtitleTrack.addEventListener('cuechange', activeSubtitleListener);
          }
          renderActiveCues();
          break;
        }
      }
    }

    function applyNativeSubtitleState() {
      var tracks = getSubtitleTracks();
      detachActiveSubtitleTrack();
      if (!tracks.length) {
        return;
      }

      var targetLang = subtitleState.enabled ? getPreferredSubtitleLanguage() : '';
      if (targetLang) {
        subtitleState.language = targetLang;
      }

      for (var i = 0; i < tracks.length; i++) {
        var trackLang = (tracks[i].language || '').toLowerCase();
        tracks[i].mode = targetLang && trackLang === targetLang ? 'showing' : 'disabled';
      }
    }

    function updateSubtitleControls() {
      if (!subtitleControls) {
        return;
      }

      var tracks = getSubtitleTracks();
      var hasTracks = tracks.length > 0;
      subtitleControls.style.display = (hasTracks || !!muteToggle) ? 'flex' : 'none';

      if (subtitleToggle) {
        var subtitlesEnabled = !!subtitleState.enabled;
        subtitleToggle.disabled = !hasTracks;
        subtitleToggle.classList.toggle('is-on', subtitlesEnabled);
        subtitleToggle.setAttribute('aria-pressed', subtitlesEnabled ? 'true' : 'false');
        subtitleToggle.setAttribute('aria-label', subtitlesEnabled ? subtitleToggleLabels.disable : subtitleToggleLabels.enable);
        subtitleToggle.setAttribute('title', subtitlesEnabled ? subtitleToggleLabels.disable : subtitleToggleLabels.enable);
        subtitleToggle.innerHTML = subtitlesEnabled
          ? '<i class="fa-solid fa-closed-captioning-slash" aria-hidden="true"></i>'
          : '<i class="fa-solid fa-closed-captioning" aria-hidden="true"></i>';
      }

      if (subtitleSelect) {
        subtitleSelect.disabled = !hasTracks || !subtitleState.enabled;
        if (subtitleState.language) {
          subtitleSelect.value = subtitleState.language;
        }
      }
    }

    function updateMuteButton() {
      if (!muteToggle) {
        return;
      }
      var isMuted = !!video.muted;
      muteToggle.classList.toggle('is-muted', isMuted);
      muteToggle.setAttribute('aria-pressed', isMuted ? 'true' : 'false');
      muteToggle.setAttribute('aria-label', isMuted ? muteLabels.unmute : muteLabels.mute);
      muteToggle.setAttribute('title', isMuted ? muteLabels.unmute : muteLabels.mute);
      muteToggle.innerHTML = isMuted
        ? '<i class="fa-solid fa-volume-xmark" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-volume" aria-hidden="true"></i>';
    }

    function getFullscreenElement() {
      return document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        null;
    }

    function isFullscreenSupported() {
      return !!(root.requestFullscreen ||
        root.webkitRequestFullscreen ||
        root.msRequestFullscreen ||
        video.webkitEnterFullscreen);
    }

    function isPlayerFullscreen() {
      var fullscreenElement = getFullscreenElement();
      return fullscreenElement === root || fullscreenElement === video;
    }

    function updateFullscreenButton() {
      if (!fullscreenToggle) {
        return;
      }

      if (!isFullscreenSupported()) {
        fullscreenToggle.disabled = true;
        fullscreenToggle.style.display = 'none';
        return;
      }

      var isFullscreen = isPlayerFullscreen();
      root.classList.toggle('is-fullscreen', isFullscreen);
      fullscreenToggle.setAttribute('aria-pressed', isFullscreen ? 'true' : 'false');
      fullscreenToggle.setAttribute('aria-label', isFullscreen ? fullscreenLabels.exit : fullscreenLabels.enter);
      fullscreenToggle.setAttribute('title', isFullscreen ? fullscreenLabels.exit : fullscreenLabels.enter);
      fullscreenToggle.innerHTML = isFullscreen
        ? '<i class="fa-solid fa-compress" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-expand" aria-hidden="true"></i>';
    }

    function requestPlayerFullscreen() {
      var requestFullscreen = root.requestFullscreen ||
        root.webkitRequestFullscreen ||
        root.msRequestFullscreen;

      if (requestFullscreen) {
        var requestResult = requestFullscreen.call(root);
        if (requestResult && requestResult.catch) {
          return requestResult.catch(function (error) {
            logFullscreenError(error);
            return false;
          });
        }
        return Promise.resolve(requestResult);
      }

      if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
        return Promise.resolve(true);
      }

      return Promise.resolve(false);
    }

    function exitPlayerFullscreen() {
      var exitFullscreen = document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen;

      if (!exitFullscreen) {
        return Promise.resolve(false);
      }

      var exitResult = exitFullscreen.call(document);
      if (exitResult && exitResult.catch) {
        return exitResult.catch(function (error) {
          logFullscreenError(error);
          return false;
        });
      }
      return Promise.resolve(exitResult);
    }

    function toggleFullscreen() {
      var fullscreenElement = getFullscreenElement();
      if (fullscreenElement) {
        return exitPlayerFullscreen();
      }
      return requestPlayerFullscreen();
    }

    function maybeUnmuteVideo() {
      if (!video.muted) {
        return;
      }
      video.muted = false;
      updateMuteButton();
    }

    function populateSubtitleOptions() {
      if (!subtitleSelect) {
        return;
      }
      var tracks = getSubtitleTracks();
      var existing = {};
      subtitleSelect.innerHTML = '';

      for (var i = 0; i < tracks.length; i++) {
        var lang = (tracks[i].language || '').toLowerCase();
        if (!lang || existing[lang]) {
          continue;
        }
        existing[lang] = true;
        var option = document.createElement('option');
        option.value = lang;
        option.textContent = tracks[i].label || lang.toUpperCase();
        subtitleSelect.appendChild(option);
      }
    }

    function initializeSubtitles() {
      if (subtitlesInitialized) {
        updateSubtitleControls();
        return;
      }
      subtitlesInitialized = true;
      populateSubtitleOptions();
      if (subtitleState.enabled) {
        subtitleState.language = getPreferredSubtitleLanguage();
      }
      applySubtitleState();
      updateSubtitleControls();
    }

    function supportsNativeHls() {
      return video.canPlayType('application/vnd.apple.mpegurl') ||
        video.canPlayType('application/x-mpegURL');
    }

    function shouldUseNativeHls() {
      return !preferHlsJs && supportsNativeHls();
    }

    function loadHlsScriptIfNeeded() {
      if (!normalizedVideoSrc || !isHlsSource(normalizedVideoSrc) || shouldUseNativeHls()) {
        debugVideoPlayer('skip hls.js preload', {
          src: normalizedVideoSrc,
          isHls: isHlsSource(normalizedVideoSrc),
          nativeHls: shouldUseNativeHls()
        });
        return Promise.resolve();
      }
      if (window.Hls && Hls.isSupported && Hls.isSupported()) {
        debugVideoPlayer('hls.js already available', debugContext);
        return Promise.resolve();
      }
      debugVideoPlayer('loading hls.js', debugContext);
      return loadHlsScript();
    }

    function initializeVideo() {
      if (initialized) {
        return Promise.resolve();
      }

      if (!normalizedVideoSrc) {
        debugVideoPlayer('initialize without src');
        initialized = true;
        return Promise.resolve();
      }

      if (!isHlsSource(normalizedVideoSrc)) {
        debugVideoPlayer('initialize direct src', debugContext);
        video.src = normalizedVideoSrc;
        initialized = true;
        return Promise.resolve();
      }

      if (shouldUseNativeHls()) {
        debugVideoPlayer('initialize native hls', {
          src: normalizedVideoSrc,
          nativeSupport: supportsNativeHls(),
          preferHlsJs: preferHlsJs
        });
        video.src = normalizedVideoSrc;
        initialized = true;
        return Promise.resolve();
      }

      function attachHls() {
        if (!(window.Hls && Hls.isSupported && Hls.isSupported())) {
          throw new Error('This browser does not support HLS playback.');
        }
        hlsInstance = new Hls({
          xhrSetup: function (xhr, url) {
            var normalizedUrl = normalizeMediaUrl(url);
            if (normalizedUrl !== url) {
              xhr.open('GET', normalizedUrl, true);
            }
          }
        });
        debugVideoPlayer('initialize hls.js', {
          src: normalizedVideoSrc,
          hlsVersion: window.Hls && Hls.version ? Hls.version : 'unknown'
        });
        hlsInstance.loadSource(normalizedVideoSrc);
        hlsInstance.attachMedia(video);
        hlsInstance.on(Hls.Events.ERROR, function (event, data) {
          console.error('HLS.js error:', data);
          if (data && data.fatal) {
            logPlaybackError(data.details || data.type || 'Fatal HLS error');
          }
        });
        initialized = true;
      }

      if (window.Hls && Hls.isSupported && Hls.isSupported()) {
        attachHls();
        return Promise.resolve();
      }

      if (supportsNativeHls()) {
        debugVideoPlayer('fallback native hls', {
          src: normalizedVideoSrc,
          preferHlsJs: preferHlsJs
        });
        video.src = normalizedVideoSrc;
        initialized = true;
        return Promise.resolve();
      }

      return Promise.reject(new Error('This browser does not support HLS playback.'));
    }

    function ensureVideoInitialized() {
      if (initialized) {
        return Promise.resolve();
      }
      if (initPromise) {
        return initPromise;
      }

      initPromise = loadHlsScriptIfNeeded().then(function () {
        return initializeVideo();
      }).then(function () {
        debugVideoPlayer('video initialized', debugContext);
        initPromise = null;
      }).catch(function (error) {
        initPromise = null;
        debugVideoPlayer('video initialization failed', {
          src: normalizedVideoSrc,
          error: error && (error.message || error.details || error)
        });
        console.error(error);
        throw error;
      });

      return initPromise;
    }

    function togglePlayback() {
      if (video.paused) {
        playVideo();
        return;
      }
      video.pause();
    }

    if (customCursor && !useNativeControls) {
      var isHoveringVideo = false;
      var isHoveringControls = false;
      var isIdleHidden = false;
      var idleHideTimer = null;
      var idleHideDelay = 4000;
      var cursorContainer = customCursor.parentElement;
      var hoverHost = root;

      function getPointerPosition(event) {
        if (!event) {
          return null;
        }
        if (!isFinite(event.clientX) || !isFinite(event.clientY)) {
          return null;
        }
        return {
          x: event.clientX,
          y: event.clientY
        };
      }

      function isInsideVideoBounds(position, bounds) {
        return position.x >= bounds.left &&
          position.x <= bounds.right &&
          position.y >= bounds.top &&
          position.y <= bounds.bottom;
      }

      function setNativeCursor(value) {
        root.style.cursor = value;
        video.style.cursor = value;
      }

      function clearIdleHideTimer() {
        if (!idleHideTimer) {
          return;
        }
        window.clearTimeout(idleHideTimer);
        idleHideTimer = null;
      }

      function hideControlsForIdle() {
        idleHideTimer = null;
        if (!isHoveringVideo || isHoveringControls || isTimelineScrubbing) {
          return;
        }
        isIdleHidden = true;
        root.classList.remove('is-hovering-video');
        hideCustomCursor();
        hideTimeline();
        setNativeCursor('none');
      }

      function scheduleIdleHide() {
        clearIdleHideTimer();
        if (!isHoveringVideo || isHoveringControls || isTimelineScrubbing) {
          return;
        }
        idleHideTimer = window.setTimeout(hideControlsForIdle, idleHideDelay);
      }

      function showControlsForActivity() {
        if (!isHoveringVideo) {
          return;
        }
        isIdleHidden = false;
        root.classList.add('is-hovering-video');
        showTimeline();
        scheduleIdleHide();
      }

      function updateCustomCursorPosition(position, bounds) {
        if (!position || !customCursor) {
          return;
        }
        var cursorBounds = cursorContainer ? cursorContainer.getBoundingClientRect() : bounds;
        customCursor.style.top = (position.y - cursorBounds.top) + 'px';
        customCursor.style.left = (position.x - cursorBounds.left) + 'px';
      }

      function syncCursorWithPointer(position) {
        if (!position) {
          return;
        }

        var bounds = video.getBoundingClientRect();
        var isInsideVideo = isInsideVideoBounds(position, bounds);
        if (isInsideVideo !== isHoveringVideo) {
          setHoverState(isInsideVideo);
        }

        if (!isInsideVideo || isHoveringControls) {
          if (isHoveringControls) {
            clearIdleHideTimer();
          }
          hideCustomCursor();
          setNativeCursor('auto');
          return;
        }

        showControlsForActivity();
        updateCustomCursorPosition(position, bounds);

        var height = bounds.height || video.offsetHeight || 0;
        var bottomControlZone = Math.min(100, Math.max(56, height * 0.18));
        if (position.y > bounds.bottom - bottomControlZone) {
          hideCustomCursor();
          setNativeCursor('auto');
          return;
        }

        showCustomCursor();
        setNativeCursor('none');
      }

      function setHoverState(isHovering) {
        if (isHoveringVideo === isHovering) {
          return;
        }
        isHoveringVideo = isHovering;
        if (isHoveringVideo) {
          isIdleHidden = false;
          root.classList.add('is-hovering-video');
          showTimeline();
          scheduleIdleHide();
          if (!isHoveringControls) {
            showCustomCursor();
          } else {
            hideCustomCursor();
            setNativeCursor('auto');
          }
        } else {
          root.classList.remove('is-hovering-video');
          hideCustomCursor();
          hideTimeline();
          setNativeCursor('auto');
          isIdleHidden = false;
          clearIdleHideTimer();
        }
      }

      function setControlHoverState(isHovering) {
        isHoveringControls = isHovering;
        if (!isHoveringVideo) {
          return;
        }
        if (isHoveringControls) {
          isIdleHidden = false;
          clearIdleHideTimer();
          hideCustomCursor();
          showTimeline();
          setNativeCursor('auto');
          return;
        }
        if (isHoveringVideo) {
          showControlsForActivity();
          showCustomCursor();
        }
      }

      hoverHost.addEventListener('mouseenter', function (event) {
        var position = getPointerPosition(event);
        if (!position) {
          setHoverState(true);
          return;
        }
        syncCursorWithPointer(position);
      });

      hoverHost.addEventListener('mouseleave', function () {
        setControlHoverState(false);
        setHoverState(false);
      });

      root.addEventListener('mouseleave', function () {
        setControlHoverState(false);
        setHoverState(false);
      });

      video.addEventListener('mouseenter', function (event) {
        syncCursorWithPointer(getPointerPosition(event));
      });

      video.addEventListener('mousemove', function (event) {
        syncCursorWithPointer(getPointerPosition(event));
      });

      video.addEventListener('mouseleave', function () {
        hideCustomCursor();
        setNativeCursor('auto');
      });

      if (videoTimeline) {
        videoTimeline.addEventListener('mouseenter', function () {
          setControlHoverState(true);
        });
        videoTimeline.addEventListener('mouseleave', function () {
          setControlHoverState(false);
        });
      }

      if (subtitleControls) {
        subtitleControls.addEventListener('mouseenter', function () {
          setControlHoverState(true);
        });
        subtitleControls.addEventListener('mouseleave', function () {
          setControlHoverState(false);
        });
      }

      if (fullscreenToggle) {
        fullscreenToggle.addEventListener('mouseenter', function () {
          setControlHoverState(true);
        });
        fullscreenToggle.addEventListener('mouseleave', function () {
          setControlHoverState(false);
        });
      }

      hoverHost.addEventListener('mousemove', function (event) {
        syncCursorWithPointer(getPointerPosition(event));
      });
    }

    if (videoTimeline && !useNativeControls) {
      videoTimeline.addEventListener('mousedown', startTimelineScrub);
      videoTimeline.addEventListener('mousemove', moveTimelineScrub);
      videoTimeline.addEventListener('mouseup', stopTimelineScrub);
      videoTimeline.addEventListener('mouseleave', stopTimelineScrub);
      videoTimeline.addEventListener('touchstart', startTimelineScrub);
      videoTimeline.addEventListener('touchmove', moveTimelineScrub);
      videoTimeline.addEventListener('touchend', stopTimelineScrub);
      videoTimeline.addEventListener('touchcancel', stopTimelineScrub);
    }

    if (!useNativeControls) {
      document.addEventListener('mouseup', stopTimelineScrub);
      document.addEventListener('touchend', stopTimelineScrub);
      document.addEventListener('touchcancel', stopTimelineScrub);
    }

    if (subtitleToggle && !useNativeControls) {
      subtitleToggle.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        subtitleState.enabled = !subtitleState.enabled;
        if (subtitleState.enabled && !subtitleState.language) {
          subtitleState.language = getPreferredSubtitleLanguage();
        }
        applySubtitleState();
        updateSubtitleControls();
      });
    }

    if (subtitleSelect && !useNativeControls) {
      subtitleSelect.addEventListener('change', function (event) {
        event.stopPropagation();
        subtitleState.language = (subtitleSelect.value || '').toLowerCase();
        subtitleState.enabled = true;
        applySubtitleState();
        updateSubtitleControls();
      });
    }

    if (muteToggle && !useNativeControls) {
      muteToggle.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        video.muted = !video.muted;
        updateMuteButton();
      });
    }

    if (fullscreenToggle && !useNativeControls) {
      fullscreenToggle.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        showTimeline();
        toggleFullscreen().then(function () {
          updateFullscreenButton();
        });
      });
    }

    document.addEventListener('fullscreenchange', updateFullscreenButton);
    document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
    document.addEventListener('MSFullscreenChange', updateFullscreenButton);

    function toggleWithCustomInteraction(event) {
      if (useNativeControls) {
        return;
      }
      if (isToggleInProgress) {
        return;
      }
      if (initialized) {
        event.preventDefault();
        event.stopPropagation();
        if (unmuteOnInteraction) {
          maybeUnmuteVideo();
        }
        togglePlayback();
        return;
      }

      isToggleInProgress = true;
      event.preventDefault();
      event.stopPropagation();
      if (unmuteOnInteraction) {
        maybeUnmuteVideo();
      }

      ensureVideoInitialized().then(function () {
        togglePlayback();
      }).catch(function (error) {
        console.error(error);
        togglePlayback();
      }).finally(function () {
        isToggleInProgress = false;
      });
    }

    if (!useNativeControls) {
      video.addEventListener('click', function (event) {
        toggleWithCustomInteraction(event);
      });
    }

    video.addEventListener('play', function () {
      setCursorText();
      if (unmuteOnPlay) {
        maybeUnmuteVideo();
      }
      updateMuteButton();
    });

    video.addEventListener('pause', function () {
      setCursorText();
      if (customCursor) {
        showCustomCursor();
      }
    });

    video.addEventListener('loadedmetadata', function () {
      if (useNativeControls) {
        applyNativeSubtitleState();
      } else {
        initializeSubtitles();
      }
      updateTimelineProgress();
      updateTimeText();
    });

    video.addEventListener('timeupdate', function () {
      updateTimelineProgress();
      updateTimeText();
      if (!useNativeControls && subtitleState.enabled) {
        renderActiveCues();
      }
    });

    video.addEventListener('ended', function () {
      setCursorText();
      updateTimelineProgress();
      updateTimeText();
      if (customCursor) {
        showCustomCursor();
      }
    });

    video.addEventListener('error', function () {
      var mediaError = video.error;
      if (!mediaError) {
        return;
      }
      logPlaybackError({
        name: 'MediaError',
        message: 'code=' + mediaError.code + ', message=' + mediaError.message
      });
    });

    video.addEventListener('volumechange', function () {
      updateMuteButton();
    });

    var publicApi = {
      video: video,
      initialize: ensureVideoInitialized,
      seekTo: seekToTime,
      play: function () {
        return ensureVideoInitialized().then(function () {
          return playVideo();
        });
      },
      pause: function () {
        video.pause();
      },
      toggleFullscreen: toggleFullscreen,
      updateFullscreenButton: updateFullscreenButton
    };

    if (video.webkitEnterFullscreen) {
      video.addEventListener('webkitbeginfullscreen', updateFullscreenButton);
      video.addEventListener('webkitendfullscreen', updateFullscreenButton);
    }

    if (fullscreenToggle && (useNativeControls || !isFullscreenSupported())) {
      fullscreenToggle.disabled = true;
      fullscreenToggle.style.display = 'none';
    } else {
      updateFullscreenButton();
    }

    root.__videoPlayer = publicApi;
    if (playerId) {
      window.videoPlayers = window.videoPlayers || {};
      window.videoPlayers[playerId] = publicApi;
    }

    if (playerId === 'player') {
      window.setCurrentTime = function (time) {
        return publicApi.seekTo(time, {
          play: true,
          updateUrl: true
        });
      };
    }

    function syncNativeControlsMode() {
      var nextMode = shouldUseNativeControls();
      if (nextMode !== useNativeControls) {
        setNativeControlsMode(nextMode);
      }
    }

    if (window.matchMedia) {
      var nativeControlsMediaQuery = window.matchMedia('(pointer: coarse), (hover: none), (max-width: 700px)');
      if (nativeControlsMediaQuery.addEventListener) {
        nativeControlsMediaQuery.addEventListener('change', syncNativeControlsMode);
      } else if (nativeControlsMediaQuery.addListener) {
        nativeControlsMediaQuery.addListener(syncNativeControlsMode);
      }
    }
    window.addEventListener('resize', syncNativeControlsMode);
    window.setTimeout(syncNativeControlsMode, 0);
    window.setTimeout(syncNativeControlsMode, 500);

    hideTimeline();
    updateMuteButton();

    if (useNativeControls) {
      clearCaptionOverlay();
      applyNativeSubtitleState();
      ensureVideoInitialized().catch(function (error) {
        logPlaybackError(error);
      });
    }

    if (useUrlTime && pendingSeekTime !== null) {
      seekToTime(pendingSeekTime, {
        play: false
      });
    }
  }

  function initAllVideoPlayers() {
    var players = document.querySelectorAll('[data-video-player]');
    for (var i = 0; i < players.length; i++) {
      initVideoPlayer(players[i]);
    }
  }

  window.initVideoPlayers = initAllVideoPlayers;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllVideoPlayers);
  } else {
    initAllVideoPlayers();
  }
})();
