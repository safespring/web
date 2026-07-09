/*
 * Lazy iframe loading.
 *
 * Purpose: embedded iframes with data-src should not load until they approach
 * the viewport. This preserves the existing performance behavior for embeds.
 *
 * DOM contract: iframe[data-src] elements.
 *
 * Failure behavior: pages without lazy iframes do nothing. Browsers without
 * IntersectionObserver load the iframes immediately so content remains usable.
 */
(function () {
  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function loadFrame(frame) {
    if (!frame.dataset.src) {
      return;
    }

    frame.src = frame.dataset.src;
    frame.removeAttribute("data-src");
  }

  onReady(function () {
    var lazyFrames = document.querySelectorAll("iframe[data-src]");
    if (!lazyFrames.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      lazyFrames.forEach(loadFrame);
      return;
    }

    var frameObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        loadFrame(entry.target);
        frameObserver.unobserve(entry.target);
      });
    });

    lazyFrames.forEach(function (frame) {
      frameObserver.observe(frame);
    });
  });
})();
