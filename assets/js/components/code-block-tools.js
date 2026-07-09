/*
 * Code block labels and copy buttons.
 *
 * Purpose: Hugo renders highlighted code as static <pre><code> blocks. This
 * component adds language labels and localized copy buttons after render.
 *
 * DOM contract: pre > code[class*="language-"] for labels and pre elements for
 * copy buttons. Localized labels are injected through Hugo js.Build params.
 *
 * Failure behavior: pages without code blocks do nothing. Existing copy buttons
 * are not duplicated. Copy errors surface through the localized error label.
 */
import * as params from "@params";

(function () {
  var labels = {
    copy: params.copyLabel || "Copy code",
    copied: params.copiedLabel || "Copied!",
    error: params.errorLabel || "Error",
  };

  function addLanguageLabels() {
    document.querySelectorAll('pre > code[class*="language-"]').forEach(function (codeBlock) {
      var languageMatch = codeBlock.className.match(/language-(\w+)/);
      if (!languageMatch) {
        return;
      }

      var language = languageMatch[1];
      var pre = codeBlock.parentNode;
      if (language === "fallback") {
        language = " ";
      }
      pre.setAttribute("data-lang", language);
    });
  }

  function setButtonLabel(button, label) {
    button.textContent = label;
  }

  function addCopyButtons() {
    document.querySelectorAll("pre").forEach(function (pre) {
      if (pre.querySelector(".copy-code-button")) {
        return;
      }

      var code = pre.querySelector("code");
      if (!code) {
        return;
      }

      var button = document.createElement("button");
      button.className = "copy-code-button";
      setButtonLabel(button, labels.copy);

      button.addEventListener("click", function () {
        if (!navigator.clipboard || !navigator.clipboard.writeText) {
          setButtonLabel(button, labels.error);
          return;
        }

        navigator.clipboard
          .writeText(code.textContent)
          .then(function () {
            setButtonLabel(button, labels.copied);
            setTimeout(function () {
              setButtonLabel(button, labels.copy);
            }, 4000);
          })
          .catch(function () {
            setButtonLabel(button, labels.error);
          });

        setTimeout(function () {
          button.blur();
        }, 4000);
      });

      pre.style.position = "relative";
      pre.style.display = "flex";
      button.style.position = "absolute";
      button.style.top = "0";
      button.style.right = "0";

      pre.appendChild(button);
    });
  }

  addLanguageLabels();
  addCopyButtons();
})();
