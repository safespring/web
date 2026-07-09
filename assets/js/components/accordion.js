/*
 * Accordion panels.
 *
 * Purpose: accordion markup is rendered statically by Hugo, but needs JS to
 * initialize panel state, keep aria attributes synchronized, animate height,
 * and support deep links to accordion boxes.
 *
 * DOM contract: .accordion buttons followed immediately by their panel, with
 * optional .accordion-box wrappers for hash/deep-link opening.
 *
 * Failure behavior: buttons without a following panel are skipped. Existing
 * data-accordion-ready buttons are not bound twice.
 */
(function () {
  var accordionButtons = document.getElementsByClassName("accordion");

  function initialiseAccordion(button, index) {
    var panel = button.nextElementSibling;
    if (!panel) {
      return null;
    }

    if (!button.id) {
      button.id = "accordion-button-" + index;
    }

    if (!panel.id) {
      panel.id = "accordion-panel-" + index;
    }

    button.setAttribute("aria-controls", panel.id);
    button.setAttribute(
      "aria-expanded",
      button.classList.contains("accordion-active") ? "true" : "false",
    );
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-labelledby", button.id);
    panel.setAttribute("aria-hidden", button.classList.contains("accordion-active") ? "false" : "true");

    if (button.classList.contains("accordion-active")) {
      panel.removeAttribute("inert");
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.style.marginBottom = 10 + "px";
    } else {
      panel.setAttribute("inert", "");
      panel.style.maxHeight = null;
      panel.style.marginBottom = 0 + "px";
    }

    return panel;
  }

  function setAccordionState(button, expanded) {
    var panel = button.nextElementSibling;
    if (!panel) {
      return;
    }

    button.classList.toggle("accordion-active", expanded);
    button.setAttribute("aria-expanded", expanded ? "true" : "false");
    panel.setAttribute("aria-hidden", expanded ? "false" : "true");

    if (expanded) {
      panel.removeAttribute("inert");
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.style.marginBottom = 10 + "px";
    } else {
      panel.setAttribute("inert", "");
      panel.style.maxHeight = null;
      panel.style.marginBottom = 0 + "px";
    }
  }

  function getAccordionHashTarget(hash) {
    if (!hash || hash === "#") {
      return "";
    }

    var targetId = hash.substring(1);
    try {
      targetId = decodeURIComponent(targetId);
    } catch (error) {
      return targetId;
    }

    return targetId;
  }

  function openAccordion(id) {
    var accordionBox = document.getElementById(id);
    if (!accordionBox) {
      return;
    }

    var button = accordionBox.getElementsByClassName("accordion")[0];
    if (!button) {
      return;
    }

    setAccordionState(button, true);
    accordionBox.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openAccordionFromHash() {
    var targetId = getAccordionHashTarget(window.location.hash);
    if (targetId) {
      openAccordion(targetId);
    }
  }

  for (var index = 0; index < accordionButtons.length; index++) {
    initialiseAccordion(accordionButtons[index], index);
    if (accordionButtons[index].hasAttribute("data-accordion-ready")) {
      continue;
    }
    accordionButtons[index].setAttribute("data-accordion-ready", "");
    accordionButtons[index].addEventListener("click", function () {
      setAccordionState(this, this.getAttribute("aria-expanded") !== "true");
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var targetId = getAccordionHashTarget(this.getAttribute("href"));
      var targetElement = document.getElementById(targetId);
      if (targetElement && targetElement.classList.contains("accordion-box")) {
        event.preventDefault();
        openAccordion(targetId);
      }
    });
  });

  if (window.location.hash) {
    window.requestAnimationFrame(openAccordionFromHash);
  }
  window.addEventListener("hashchange", openAccordionFromHash);
})();
