/*
 * Footnote back-reference labels.
 *
 * Purpose: Hugo's footnote backrefs need localized aria-label/title text after
 * render so screen-reader users get useful return-link labels.
 *
 * DOM contract: .footnote-backref links whose href points back to a footnote
 * reference id. The localized base label is injected through js.Build params.
 *
 * Failure behavior: pages without footnote backrefs do nothing.
 */
import * as params from "@params";

(function () {
  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  onReady(function () {
    var baseLabel = params.backrefLabel || "Back to reference";
    document.querySelectorAll(".footnote-backref").forEach(function (link) {
      var target = link.getAttribute("href") || "";
      var reference = target.replace(/^#fnref:?/, "");
      var label = reference ? baseLabel + " " + reference : baseLabel;
      link.setAttribute("aria-label", label);
      link.setAttribute("title", label);
    });
  });
})();
