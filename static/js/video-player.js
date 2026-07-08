(function () {
  'use strict';

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
    var posterLayer = root.querySelector('[data-role="poster"]');
    var playOverlay = root.querySelector('[data-role="play-overlay"]');
    var chapterMarkers = root.querySelectorAll('[data-role="chapter-marker"]');
    if (posterLayer) {
      root.classList.remove('is-video-active');
    }

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
    var debugContext = {
      src: videoSrc,
      normalizedSrc: normalizedVideoSrc,
      preferHlsJs: preferHlsJs
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
    var videoSurfaceRequested = false;

    var muteLabels = {
      mute: 'Ljud av',
      unmute: 'Ljud på'
    };
    var subtitleToggleLabels = {
      enable: 'Slå på undertexter',
      disable: 'Slå av undertexter'
    };
    var subtitleLanguageLabel = 'Undertextspråk';

    if (htmlLang === 'en') {
      muteLabels.mute = 'Mute';
      muteLabels.unmute = 'Unmute';
      subtitleToggleLabels.enable = 'Enable subtitles';
      subtitleToggleLabels.disable = 'Disable subtitles';
      subtitleLanguageLabel = 'Subtitle language';
    } else if (htmlLang === 'no' || htmlLang === 'nb' || htmlLang === 'nn') {
      muteLabels.mute = 'Demp';
      muteLabels.unmute = 'Lyd på';
      subtitleToggleLabels.enable = 'Slå på undertekster';
      subtitleToggleLabels.disable = 'Slå av undertekster';
      subtitleLanguageLabel = 'Undertekstspråk';
    } else if (htmlLang === 'da') {
      muteLabels.mute = 'Slå lyd fra';
      muteLabels.unmute = 'Slå lyd til';
      subtitleToggleLabels.enable = 'Slå undertekster til';
      subtitleToggleLabels.disable = 'Slå undertekster fra';
      subtitleLanguageLabel = 'Undertekstsprog';
    }

    var subtitleState = {
      enabled: ccDefaultOnAttr === null ? !!autoSubtitleLang : ccDefaultOnAttr,
      language: (initialSubtitleLang || autoSubtitleLang || pageSubtitleLang || '').toLowerCase()
    };

    function showVideoSurface() {
      if (posterLayer && videoSurfaceRequested) {
        root.classList.add('is-video-active');
      }
    }

    function requestVideoSurface() {
      videoSurfaceRequested = true;
      showVideoSurface();
    }

    function updatePlayOverlay() {
      if (!playOverlay) {
        return;
      }
      var isPlaying = !video.paused && !video.ended;
      root.classList.toggle('is-video-playing', isPlaying);
      playOverlay.classList.toggle('is-hidden', isPlaying);
      playOverlay.setAttribute('aria-hidden', isPlaying ? 'true' : 'false');
      playOverlay.tabIndex = isPlaying ? -1 : 0;
    }

    function restorePosterAtStart() {
      if (!posterLayer || getRequestedTime() !== null || !video.paused || video.currentTime > 0.25) {
        return;
      }
      videoSurfaceRequested = false;
      root.classList.remove('is-video-active');
    }

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
        updateChapterMarkers();
        return;
      }
      if (!video.duration || video.duration <= 0 || !isFinite(video.duration) || !isFinite(video.currentTime)) {
        videoTimelineFill.style.width = '0%';
        updateTimeText();
        updateChapterMarkers();
        return;
      }
      var progress = (video.currentTime / video.duration) * 100;
      videoTimelineFill.style.width = Math.min(Math.max(progress, 0), 100) + '%';
      updateTimeText();
      updateChapterMarkers();
    }

    function getChapterMarkerTime(marker) {
      return parseSeekTime(marker.getAttribute('data-chapter-time'));
    }

    function isChapterTooltipEvent(event) {
      return Boolean(event && event.target && event.target.closest && event.target.closest('[data-role="chapter-tooltip"]'));
    }

    function seekToChapterMarker(marker) {
      var targetTime = getChapterMarkerTime(marker);
      if (targetTime === null) {
        return;
      }
      seekTo(targetTime, {
        play: true,
        updateUrl: true,
        showVideo: true
      });
    }

    function getChapterFallbackDuration() {
      var chapterTimes = [];
      for (var i = 0; i < chapterMarkers.length; i++) {
        var chapterTime = getChapterMarkerTime(chapterMarkers[i]);
        if (chapterTime !== null) {
          chapterTimes.push(chapterTime);
        }
      }
      if (!chapterTimes.length) {
        return 0;
      }
      chapterTimes.sort(function (a, b) {
        return a - b;
      });
      var maxChapterTime = chapterTimes[chapterTimes.length - 1];
      var fallbackTail = 60;
      var gaps = [];
      for (var j = 1; j < chapterTimes.length; j++) {
        var gap = chapterTimes[j] - chapterTimes[j - 1];
        if (gap > 0) {
          gaps.push(gap);
        }
      }
      if (gaps.length) {
        gaps.sort(function (a, b) {
          return a - b;
        });
        fallbackTail = gaps[Math.floor(gaps.length / 2)];
      }
      return maxChapterTime + Math.max(30, fallbackTail);
    }

    function getTimelineDuration() {
      var duration = Number(video.duration);
      if (Number.isFinite(duration) && duration > 0) {
        return duration;
      }
      return getChapterFallbackDuration();
    }

    function updateChapterMarkers() {
      if (!chapterMarkers.length) {
        return;
      }

      var duration = getTimelineDuration();
      var currentTime = Number(video.currentTime);
      var activeMarker = null;

      for (var i = 0; i < chapterMarkers.length; i++) {
        var marker = chapterMarkers[i];
        var chapterTime = getChapterMarkerTime(marker);
        var nextMarker = chapterMarkers[i + 1] || null;
        var nextChapterTime = nextMarker ? getChapterMarkerTime(nextMarker) : null;
        var segmentEnd = nextChapterTime !== null && nextChapterTime > chapterTime ? nextChapterTime : duration;
        var isVisible = duration > 0 && chapterTime !== null && chapterTime >= 0;
        var segmentWidth = isVisible ? Math.max(((segmentEnd - chapterTime) / duration) * 100, 0) : 0;
        marker.hidden = !isVisible;

        if (!isVisible) {
          marker.classList.remove('is-active');
          marker.removeAttribute('aria-current');
          marker.style.removeProperty('--chapter-width');
          marker.style.removeProperty('--chapter-fill');
          continue;
        }

        var position = Math.min(Math.max((chapterTime / duration) * 100, 0), 100);
        var fill = 0;
        if (Number.isFinite(currentTime)) {
          if (currentTime >= segmentEnd) {
            fill = 100;
          } else if (currentTime > chapterTime && segmentEnd > chapterTime) {
            fill = ((currentTime - chapterTime) / (segmentEnd - chapterTime)) * 100;
          }
        }

        marker.style.left = position + '%';
        marker.style.setProperty('--chapter-width', Math.min(Math.max(segmentWidth, 0), 100) + '%');
        marker.style.setProperty('--chapter-gap', i === chapterMarkers.length - 1 ? '0px' : '4px');
        marker.style.setProperty('--chapter-fill', Math.min(Math.max(fill, 0), 100) + '%');

        marker.classList.remove('is-active');
        marker.removeAttribute('aria-current');
        if (Number.isFinite(currentTime) && currentTime >= chapterTime && currentTime < segmentEnd) {
          activeMarker = marker;
        }
      }

      if (!activeMarker && Number.isFinite(currentTime) && currentTime >= duration && chapterMarkers.length) {
        activeMarker = chapterMarkers[chapterMarkers.length - 1];
      }

      if (activeMarker) {
        activeMarker.classList.add('is-active');
        activeMarker.setAttribute('aria-current', 'true');
      }
    }

    function showTimeline() {
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

    function getTimelineSeekTime(event) {
      if (!videoTimeline) {
        return null;
      }
      var duration = getTimelineDuration();
      if (!duration || duration <= 0 || !isFinite(duration)) {
        return null;
      }
      var rect = videoTimeline.getBoundingClientRect();
      if (!rect.width || !isFinite(rect.width)) {
        return null;
      }
      var clientX = getTimelineClientX(event);
      if (!isFinite(clientX)) {
        return null;
      }
      var ratio = (clientX - rect.left) / rect.width;
      if (ratio < 0) {
        ratio = 0;
      }
      if (ratio > 1) {
        ratio = 1;
      }
      return ratio * duration;
    }

    function seekFromTimeline(event) {
      var targetTime = getTimelineSeekTime(event);
      if (targetTime === null) {
        return;
      }
      if (!initialized || video.readyState < 1) {
        seekTo(targetTime, {
          showVideo: true,
          updateUrl: useUrlTime
        });
        return;
      }
      try {
        video.currentTime = targetTime;
      } catch (error) {
        logPlaybackError(error);
        return;
      }
      updateTimelineProgress();
      updateTimeText();
      if (useUrlTime) {
        updateUrlTime(targetTime);
      }
    }

    function parseSeekTime(time) {
      if (time === null || time === undefined || time === '') {
        return null;
      }
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

    function updateUrlTime(time) {
      if (!window.history || !window.history.replaceState || !window.URL) {
        return;
      }
      var url = new URL(window.location.href);
      url.searchParams.set('t', Math.floor(time));
      if (playerId) {
        url.hash = playerId;
      }
      window.history.replaceState(null, '', url.toString());
    }

    function seekTo(time, options) {
      var targetTime = parseSeekTime(time);
      options = options || {};
      if (targetTime === null) {
        return Promise.resolve(false);
      }

      function applySeek(resolve) {
        var duration = Number(video.duration);
        if (Number.isFinite(duration) && duration > 0) {
          targetTime = Math.min(targetTime, duration);
        }
        try {
          video.currentTime = targetTime;
        } catch (error) {
          logPlaybackError(error);
          resolve(false);
          return;
        }
        updateTimelineProgress();
        updateTimeText();
        if (options.updateUrl && useUrlTime) {
          updateUrlTime(targetTime);
        }
        if (options.play || options.showVideo) {
          requestVideoSurface();
        }
        if (options.play) {
          var playResult = video.play();
          if (playResult && playResult.catch) {
            playResult.catch(function (error) {
              logPlaybackError(error);
            });
          }
        }
        resolve(true);
      }

      return ensureVideoInitialized().then(function () {
        return new Promise(function (resolve) {
          if (video.readyState >= 1) {
            applySeek(resolve);
            return;
          }
          video.addEventListener('loadedmetadata', function () {
            applySeek(resolve);
          }, { once: true });
          if (video.load) {
            try {
              video.load();
            } catch (error) {
              logPlaybackError(error);
            }
          }
        });
      }).catch(function (error) {
        logPlaybackError(error);
        return false;
      });
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
      event.preventDefault();
      seekFromTimeline(event);
    }

    function showCustomCursor() {
      if (!customCursor) {
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
    }

    function renderActiveCues() {
      if (!captionOverlay || !activeSubtitleTrack || !subtitleState.enabled) {
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
      captionOverlay.textContent = lines.join('\n');
      captionOverlay.classList.add('is-visible');
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
        subtitleSelect.setAttribute('aria-label', subtitleLanguageLabel);
        subtitleSelect.setAttribute('title', subtitleLanguageLabel);
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
        videoSurfaceRequested = true;
        var playResult = video.play();
        if (playResult && playResult.catch) {
          playResult.catch(function (error) {
            logPlaybackError(error);
          });
        }
        return;
      }
      video.pause();
    }

    if (customCursor) {
      var isHoveringVideo = false;
      var isHoveringControls = false;
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
          hideCustomCursor();
          setNativeCursor('auto');
          return;
        }

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
          root.classList.add('is-hovering-video');
          showTimeline();
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
        }
      }

      function setControlHoverState(isHovering) {
        isHoveringControls = isHovering;
        if (!isHoveringVideo) {
          return;
        }
        if (isHoveringControls) {
          hideCustomCursor();
          showTimeline();
          setNativeCursor('auto');
          return;
        }
        if (isHoveringVideo) {
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

      hoverHost.addEventListener('mousemove', function (event) {
        syncCursorWithPointer(getPointerPosition(event));
      });
    }

    if (videoTimeline) {
      videoTimeline.addEventListener('mousedown', startTimelineScrub);
      videoTimeline.addEventListener('mousemove', moveTimelineScrub);
      videoTimeline.addEventListener('mouseup', stopTimelineScrub);
      videoTimeline.addEventListener('mouseleave', stopTimelineScrub);
      videoTimeline.addEventListener('touchstart', startTimelineScrub);
      videoTimeline.addEventListener('touchmove', moveTimelineScrub);
      videoTimeline.addEventListener('touchend', stopTimelineScrub);
      videoTimeline.addEventListener('touchcancel', stopTimelineScrub);
    }

    document.addEventListener('mouseup', stopTimelineScrub);
    document.addEventListener('touchend', stopTimelineScrub);
    document.addEventListener('touchcancel', stopTimelineScrub);

    if (subtitleToggle) {
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

    if (subtitleSelect) {
      subtitleSelect.addEventListener('change', function (event) {
        event.stopPropagation();
        subtitleState.language = (subtitleSelect.value || '').toLowerCase();
        subtitleState.enabled = true;
        applySubtitleState();
        updateSubtitleControls();
      });
    }

    if (muteToggle) {
      muteToggle.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        video.muted = !video.muted;
        updateMuteButton();
      });
    }

    function showChapterTooltip(event) {
      event.currentTarget.classList.add('is-tooltip-visible');
    }

    function hideChapterTooltip(event) {
      if (isPointInChapterTooltipZone(event.currentTarget, event)) {
        return;
      }
      event.currentTarget.classList.remove('is-tooltip-visible');
    }

    function getChapterTooltip(marker) {
      return marker ? marker.querySelector('[data-role="chapter-tooltip"]') : null;
    }

    function isPointInChapterTooltipZone(marker, event) {
      if (!marker || !event || !isFinite(event.clientX) || !isFinite(event.clientY)) {
        return false;
      }
      var tooltip = getChapterTooltip(marker);
      if (!tooltip) {
        return false;
      }
      var markerRect = marker.getBoundingClientRect();
      var tooltipRect = tooltip.getBoundingClientRect();
      var padding = 10;
      var left = Math.min(markerRect.left, tooltipRect.left) - padding;
      var right = Math.max(markerRect.right, tooltipRect.right) + padding;
      var top = Math.min(markerRect.top, tooltipRect.top) - padding;
      var bottom = Math.max(markerRect.bottom, tooltipRect.bottom) + padding;
      return event.clientX >= left && event.clientX <= right && event.clientY >= top && event.clientY <= bottom;
    }

    function getVisibleChapterTooltipMarker() {
      for (var i = 0; i < chapterMarkers.length; i++) {
        if (chapterMarkers[i].classList.contains('is-tooltip-visible')) {
          return chapterMarkers[i];
        }
      }
      return null;
    }

    function hideAllChapterTooltips(exceptMarker) {
      for (var i = 0; i < chapterMarkers.length; i++) {
        if (chapterMarkers[i] !== exceptMarker) {
          chapterMarkers[i].classList.remove('is-tooltip-visible');
        }
      }
    }

    function updateChapterTooltipFromPointer(event) {
      if (!chapterMarkers.length || !event || !isFinite(event.clientX) || !isFinite(event.clientY) || !document.elementFromPoint) {
        return;
      }
      var element = document.elementFromPoint(event.clientX, event.clientY);
      var marker = element && element.closest ? element.closest('[data-role="chapter-marker"]') : null;
      if (!marker || !root.contains(marker)) {
        var visibleMarker = getVisibleChapterTooltipMarker();
        if (isPointInChapterTooltipZone(visibleMarker, event)) {
          return;
        }
        hideAllChapterTooltips();
        return;
      }
      hideAllChapterTooltips(marker);
      marker.classList.add('is-tooltip-visible');
    }

    root.addEventListener('mousemove', updateChapterTooltipFromPointer);
    root.addEventListener('mouseleave', function () {
      hideAllChapterTooltips();
    });

    for (var chapterMarkerIndex = 0; chapterMarkerIndex < chapterMarkers.length; chapterMarkerIndex++) {
      chapterMarkers[chapterMarkerIndex].addEventListener('mouseenter', showChapterTooltip);
      chapterMarkers[chapterMarkerIndex].addEventListener('mouseleave', hideChapterTooltip);
      chapterMarkers[chapterMarkerIndex].addEventListener('focus', showChapterTooltip);
      chapterMarkers[chapterMarkerIndex].addEventListener('blur', hideChapterTooltip);
      chapterMarkers[chapterMarkerIndex].addEventListener('mousedown', function (event) {
        if (isChapterTooltipEvent(event)) {
          event.preventDefault();
          event.stopPropagation();
          seekToChapterMarker(event.currentTarget);
          return;
        }
        startTimelineScrub(event);
      });
      chapterMarkers[chapterMarkerIndex].addEventListener('touchstart', function (event) {
        if (isChapterTooltipEvent(event)) {
          event.preventDefault();
          event.stopPropagation();
          seekToChapterMarker(event.currentTarget);
          return;
        }
        startTimelineScrub(event);
      });
      chapterMarkers[chapterMarkerIndex].addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (isChapterTooltipEvent(event)) {
          seekToChapterMarker(event.currentTarget);
        }
      });
      chapterMarkers[chapterMarkerIndex].addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        seekToChapterMarker(event.currentTarget);
      });
    }

    if (playOverlay) {
      playOverlay.addEventListener('click', function (event) {
        toggleWithCustomInteraction(event);
      });
    }

    function toggleWithCustomInteraction(event) {
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

    video.addEventListener('click', function (event) {
      toggleWithCustomInteraction(event);
    });

    video.addEventListener('play', function () {
      showVideoSurface();
      setCursorText();
      updatePlayOverlay();
      if (unmuteOnPlay) {
        maybeUnmuteVideo();
      }
      updateMuteButton();
    });

    video.addEventListener('pause', function () {
      setCursorText();
      restorePosterAtStart();
      updatePlayOverlay();
      if (customCursor) {
        showCustomCursor();
      }
    });

    video.addEventListener('loadedmetadata', function () {
      initializeSubtitles();
      updateTimelineProgress();
      updateTimeText();
      updateChapterMarkers();
      restorePosterAtStart();
    });

    video.addEventListener('loadeddata', function () {
      restorePosterAtStart();
    });

    video.addEventListener('canplay', function () {
      restorePosterAtStart();
    });

    video.addEventListener('timeupdate', function () {
      updateTimelineProgress();
      updateTimeText();
      if (subtitleState.enabled) {
        renderActiveCues();
      }
    });

    video.addEventListener('ended', function () {
      setCursorText();
      updateTimelineProgress();
      updateTimeText();
      updatePlayOverlay();
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

    hideTimeline();
    updateMuteButton();
    updatePlayOverlay();
    updateChapterMarkers();

    var publicApi = {
      seekTo: seekTo
    };
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
    if (useUrlTime) {
      var requestedTime = getRequestedTime();
      if (requestedTime !== null) {
        seekTo(requestedTime, {
          play: false,
          showVideo: true
        });
      }
    }
    window.setTimeout(restorePosterAtStart, 0);
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
