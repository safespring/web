/*
 * Global site header behavior.
 *
 * Purpose: preserve the current fixed-header interactions after moving the
 * implementation out of header.html. The component controls scroll hiding,
 * desktop megamenu accessibility, mobile menu state, inert handling, focus
 * trapping, Escape/outside-click closing, and contact-button tracking.
 *
 * DOM contract: #navbar, .site-header-megamenu-link[aria-controls],
 * #mobileMenuBtn, #mobileMenuWrapper, #mobileMainMenu, .mobile-submenu-trigger,
 * .mobile-menu-wrapper .back-button, and .mobile-menu-wrapper .submenu.
 *
 * Failure behavior: if optional markup is absent, the related behavior exits
 * quietly. Accessibility state must keep aria-expanded, aria-hidden, inert,
 * body.mobile-menu-open, and focus restoration in sync with the visible menu.
 */
(function () {
  var navbar = document.getElementById("navbar");
  var contactButton = document.querySelector(".site-header-button-contact");
  var previousScrollPosition = window.pageYOffset;

  function trackContactButtonClick() {
    if (window._paq && window._paq.push) {
      window._paq.push(["trackEvent", "Knapptryck", "Kontaktknapp"]);
    }
  }

  function initScrollHeader() {
    if (!navbar) {
      return;
    }

    window.addEventListener(
      "scroll",
      function () {
        var currentScrollPosition = window.pageYOffset;
        if (previousScrollPosition > currentScrollPosition || currentScrollPosition < 120) {
          navbar.style.top = "0px";
        } else {
          navbar.style.top = "-200px";
        }
        previousScrollPosition = currentScrollPosition;
      },
      { passive: true },
    );
  }

  function initContactTracking() {
    if (!contactButton) {
      return;
    }

    contactButton.addEventListener("click", trackContactButtonClick);
  }

  function initMegaMenu() {
    var megaMenuLinks = Array.from(
      document.querySelectorAll(".site-header-megamenu-link[aria-controls]"),
    );
    var controllers = [];

    if (!megaMenuLinks.length) {
      return;
    }

    function hideMegaMenu(controller) {
      controller.wrapper.classList.remove("show");
      controller.wrapper.setAttribute("aria-hidden", "true");
      controller.wrapper.setAttribute("inert", "");
      controller.link.setAttribute("aria-expanded", "false");
    }

    function showMegaMenu(controller) {
      if (controller.suppressFocusOpen) {
        return;
      }
      controllers.forEach(function (otherController) {
        clearTimeout(otherController.hideTimeout);
        if (otherController !== controller) {
          hideMegaMenu(otherController);
        }
      });
      clearTimeout(controller.hideTimeout);
      controller.wrapper.classList.add("show");
      controller.wrapper.setAttribute("aria-hidden", "false");
      controller.wrapper.removeAttribute("inert");
      controller.link.setAttribute("aria-expanded", "true");
    }

    function scheduleMegaMenuClose(controller) {
      controller.hideTimeout = setTimeout(function () {
        if (!controller.wrapper.contains(document.activeElement)) {
          hideMegaMenu(controller);
        }
      }, 120);
    }

    megaMenuLinks.forEach(function (link) {
      var wrapper = document.getElementById(link.getAttribute("aria-controls"));
      if (!wrapper) {
        return;
      }
      var controller = {
        link: link,
        wrapper: wrapper,
        hideTimeout: null,
        suppressFocusOpen: false,
      };
      controllers.push(controller);

      link.addEventListener("mouseenter", function () {
        showMegaMenu(controller);
      });
      link.addEventListener("focus", function () {
        showMegaMenu(controller);
      });
      link.addEventListener("mouseleave", function () {
        scheduleMegaMenuClose(controller);
      });
      link.addEventListener("focusout", function () {
        scheduleMegaMenuClose(controller);
      });
      wrapper.addEventListener("mouseenter", function () {
        showMegaMenu(controller);
      });
      wrapper.addEventListener("mouseleave", function () {
        scheduleMegaMenuClose(controller);
      });
      wrapper.addEventListener("focusin", function () {
        showMegaMenu(controller);
      });
      wrapper.addEventListener("focusout", function () {
        scheduleMegaMenuClose(controller);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") {
        return;
      }
      controllers.forEach(function (controller) {
        if (!controller.wrapper.classList.contains("show")) {
          return;
        }
        event.preventDefault();
        hideMegaMenu(controller);
        controller.suppressFocusOpen = true;
        controller.link.focus();
        window.requestAnimationFrame(function () {
          controller.suppressFocusOpen = false;
        });
      });
    });
  }

  function initMobileMenu() {
    var mobileMenuBtn = document.getElementById("mobileMenuBtn");
    var mobileMenuWrapper = document.getElementById("mobileMenuWrapper");
    var mobileSubmenuLinks = document.querySelectorAll("#mobileMainMenu .mobile-submenu-trigger");
    var mobileBackButtons = document.querySelectorAll(".mobile-menu-wrapper .back-button");
    var mobileSubmenus = document.querySelectorAll(".mobile-menu-wrapper .submenu");
    var mobileMainMenu = document.getElementById("mobileMainMenu");
    var mobileMenuFocusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    if (!mobileMenuBtn || !mobileMenuWrapper) {
      return;
    }

    function setMobileMenuPageInert(isInert) {
      Array.from(document.body.children).forEach(function (element) {
        if (
          element === navbar ||
          element.id === "CookieConsent" ||
          element.tagName === "SCRIPT" ||
          element.tagName === "STYLE"
        ) {
          return;
        }

        if (isInert) {
          if (!element.hasAttribute("data-mobile-menu-inert")) {
            if (element.hasAttribute("inert")) {
              element.setAttribute("data-mobile-menu-had-inert", "");
            }
            element.setAttribute("data-mobile-menu-inert", "");
          }
          element.setAttribute("inert", "");
          return;
        }

        if (!element.hasAttribute("data-mobile-menu-inert")) {
          return;
        }

        if (!element.hasAttribute("data-mobile-menu-had-inert")) {
          element.removeAttribute("inert");
        }
        element.removeAttribute("data-mobile-menu-inert");
        element.removeAttribute("data-mobile-menu-had-inert");
      });
    }

    function getMobileMenuFocusableElements() {
      return [mobileMenuBtn]
        .concat(Array.from(mobileMenuWrapper.querySelectorAll(mobileMenuFocusableSelector)))
        .filter(function (element) {
          if (element.closest("[inert]")) {
            return false;
          }

          var style = window.getComputedStyle(element);
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            element.getClientRects().length > 0
          );
        });
    }

    function resetMobileSubmenus() {
      mobileMenuWrapper.classList.remove("show-submenu");
      if (mobileMainMenu) {
        mobileMainMenu.setAttribute("aria-hidden", "false");
        mobileMainMenu.removeAttribute("inert");
      }
      mobileSubmenus.forEach(function (submenu) {
        submenu.classList.remove("active");
        submenu.setAttribute("aria-hidden", "true");
        submenu.setAttribute("inert", "");
      });
      mobileSubmenuLinks.forEach(function (link) {
        link.setAttribute("aria-expanded", "false");
      });
    }

    function closeMobileMenu() {
      mobileMenuWrapper.classList.remove("visible");
      mobileMenuBtn.classList.remove("active");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
      mobileMenuWrapper.setAttribute("aria-hidden", "true");
      mobileMenuWrapper.setAttribute("inert", "");
      document.body.classList.remove("mobile-menu-open");
      setMobileMenuPageInert(false);
      resetMobileSubmenus();
    }

    function openMobileMenu() {
      mobileMenuWrapper.classList.add("visible");
      mobileMenuBtn.classList.add("active");
      mobileMenuBtn.setAttribute("aria-expanded", "true");
      mobileMenuWrapper.setAttribute("aria-hidden", "false");
      mobileMenuWrapper.removeAttribute("inert");
      document.body.classList.add("mobile-menu-open");
      setMobileMenuPageInert(true);
      resetMobileSubmenus();
    }

    mobileMenuBtn.addEventListener("click", function () {
      if (mobileMenuWrapper.classList.contains("visible")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileSubmenuLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        mobileMenuWrapper.classList.add("show-submenu");
        if (mobileMainMenu) {
          mobileMainMenu.setAttribute("aria-hidden", "true");
          mobileMainMenu.setAttribute("inert", "");
        }
        mobileSubmenus.forEach(function (submenu) {
          submenu.classList.remove("active");
          submenu.setAttribute("aria-hidden", "true");
          submenu.setAttribute("inert", "");
        });
        mobileSubmenuLinks.forEach(function (submenuLink) {
          submenuLink.setAttribute("aria-expanded", "false");
        });

        var targetId = link.getAttribute("data-submenu");
        var targetSubmenu = document.getElementById(targetId);
        if (targetSubmenu) {
          targetSubmenu.classList.add("active");
          targetSubmenu.setAttribute("aria-hidden", "false");
          targetSubmenu.removeAttribute("inert");
          link.setAttribute("aria-expanded", "true");

          var firstSubmenuFocusable = targetSubmenu.querySelector(mobileMenuFocusableSelector);
          if (firstSubmenuFocusable) {
            firstSubmenuFocusable.focus();
          }
        }
      });
    });

    mobileBackButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        resetMobileSubmenus();
        if (!mobileMainMenu) {
          return;
        }

        var firstMainMenuFocusable = mobileMainMenu.querySelector(mobileMenuFocusableSelector);
        if (firstMainMenuFocusable) {
          firstMainMenuFocusable.focus();
        }
      });
    });

    document.addEventListener("click", function (event) {
      if (
        mobileMenuWrapper.classList.contains("visible") &&
        !mobileMenuWrapper.contains(event.target) &&
        !mobileMenuBtn.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Tab" && mobileMenuWrapper.classList.contains("visible")) {
        var focusableElements = getMobileMenuFocusableElements();
        var firstFocusableElement = focusableElements[0];
        var lastFocusableElement = focusableElements[focusableElements.length - 1];

        if (!firstFocusableElement || !lastFocusableElement) {
          return;
        }

        if (event.shiftKey && document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
          return;
        }

        if (!event.shiftKey && document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
          return;
        }

        if (!focusableElements.includes(document.activeElement)) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }

      if (event.key === "Escape" && mobileMenuWrapper.classList.contains("visible")) {
        closeMobileMenu();
        mobileMenuBtn.focus();
      }
    });
  }

  initScrollHeader();
  initContactTracking();
  initMegaMenu();
  initMobileMenu();
})();
