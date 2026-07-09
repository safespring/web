/*
 * Compliance document information toggles.
 *
 * Purpose: keep the compact document table readable while allowing one
 * description row to open at a time after Hugo has rendered static table rows.
 *
 * DOM contract: .compliance-document-table__row must contain a
 * .compliance-document-table__info button and a
 * .compliance-document-table__description element.
 *
 * Failure behavior: rows missing either element are skipped. Accessibility
 * state must keep aria-controls, aria-expanded, aria-hidden, and
 * .is-description-open synchronized.
 */
(function () {
  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function closeAllRows(rows) {
    rows.forEach(function (row) {
      var button = row.querySelector(".compliance-document-table__info");
      var description = row.querySelector(".compliance-document-table__description");
      row.classList.remove("is-description-open");
      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
      if (description) {
        description.setAttribute("aria-hidden", "true");
      }
    });
  }

  onReady(function () {
    var rows = Array.from(document.querySelectorAll(".compliance-document-table__row"));
    if (!rows.length) {
      return;
    }

    rows.forEach(function (row, rowIndex) {
      var button = row.querySelector(".compliance-document-table__info");
      var description = row.querySelector(".compliance-document-table__description");

      if (!button || !description) {
        return;
      }

      if (!description.id) {
        description.id = "compliance-document-description-" + rowIndex;
      }

      button.setAttribute("aria-controls", description.id);
      button.setAttribute("aria-expanded", "false");
      description.setAttribute("aria-hidden", "true");

      button.addEventListener("click", function () {
        var isOpen = button.getAttribute("aria-expanded") === "true";
        closeAllRows(rows);

        if (!isOpen) {
          row.classList.add("is-description-open");
          button.setAttribute("aria-expanded", "true");
          description.setAttribute("aria-hidden", "false");
        }
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeAllRows(rows);
      }
    });
  });
})();
