/*
 * Responsive table labels.
 *
 * Purpose: mobile CSS uses td[data-label] to show the related table header
 * beside each cell. Hugo cannot add these labels reliably to arbitrary Markdown
 * tables, so the labels are derived after render.
 *
 * DOM contract: table elements with th headers and td body cells.
 *
 * Failure behavior: pages without tables do nothing. Cells without matching
 * header indexes are left unchanged.
 */
(function () {
  function applyTableLabels() {
    document.querySelectorAll("table").forEach(function (table) {
      var headerCells = table.querySelectorAll("th");
      if (!headerCells.length) {
        return;
      }

      table.querySelectorAll("tr").forEach(function (row) {
        row.querySelectorAll("td").forEach(function (cell, cellIndex) {
          if (headerCells.length > cellIndex) {
            cell.setAttribute("data-label", headerCells[cellIndex].textContent);
          }
        });
      });
    });
  }

  if (document.readyState === "complete") {
    applyTableLabels();
  } else {
    window.addEventListener("load", applyTableLabels);
  }
})();
