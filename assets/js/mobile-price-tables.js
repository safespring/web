(function () {
  var animationDuration = 340;
  var animationEasing = "cubic-bezier(0.16, 1, 0.3, 1)";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function getRowBody(details) {
    return details.querySelector(".mobile-compact-row__details");
  }

  function removeTransitionListener(details, body) {
    if (!details.mobileCompactTransitionEnd) return;
    body.removeEventListener("transitionend", details.mobileCompactTransitionEnd);
    details.mobileCompactTransitionEnd = null;
  }

  function clearAnimationStyles(details) {
    var body = getRowBody(details);
    if (!body) return;
    removeTransitionListener(details, body);
    body.style.height = "";
    body.style.opacity = "";
    body.style.overflow = "";
    body.style.transform = "";
    body.style.transition = "";
    body.style.willChange = "";
    details.classList.remove("is-animating");
    details.classList.remove("is-closing");
  }

  function cancelRowAnimation(details) {
    if (details.mobileCompactFrame) {
      window.cancelAnimationFrame(details.mobileCompactFrame);
      details.mobileCompactFrame = null;
    }
    if (details.mobileCompactBorderFrame) {
      window.cancelAnimationFrame(details.mobileCompactBorderFrame);
      details.mobileCompactBorderFrame = null;
      details.classList.remove("is-border-settling");
    }
    clearAnimationStyles(details);
  }

  function settleRowBorder(details) {
    if (details.mobileCompactBorderFrame) {
      window.cancelAnimationFrame(details.mobileCompactBorderFrame);
    }
    details.classList.add("is-border-settling");
    details.mobileCompactBorderFrame = window.requestAnimationFrame(function () {
      details.mobileCompactBorderFrame = window.requestAnimationFrame(function () {
        details.mobileCompactBorderFrame = null;
        details.classList.remove("is-border-settling");
      });
    });
  }

  function setAnimatedBodyState(body, height, opacity, translateY) {
    body.style.height = height + "px";
    body.style.opacity = opacity;
    body.style.transform = "translateY(" + translateY + "px)";
  }

  function prepareAnimation(details, body) {
    details.classList.add("is-animating");
    body.style.overflow = "hidden";
    body.style.willChange = "height, opacity, transform";
    body.style.transition =
      "height " + animationDuration + "ms " + animationEasing + ", " +
      "opacity 220ms ease-out, " +
      "transform " + animationDuration + "ms " + animationEasing;
  }

  function finishAnimation(details, body, onFinish) {
    details.mobileCompactTransitionEnd = function (event) {
      if (event.target !== body || event.propertyName !== "height") return;
      if (onFinish) onFinish();
      clearAnimationStyles(details);
    };
    body.addEventListener("transitionend", details.mobileCompactTransitionEnd);
  }

  function openRow(details) {
    var body = getRowBody(details);
    if (!body) return;

    cancelRowAnimation(details);
    if (details.open) return;

    if (reduceMotion.matches) {
      details.open = true;
      return;
    }

    details.open = true;
    prepareAnimation(details, body);
    setAnimatedBodyState(body, 0, "0", -4);
    body.offsetHeight;

    details.mobileCompactFrame = window.requestAnimationFrame(function () {
      details.mobileCompactFrame = null;
      setAnimatedBodyState(body, body.scrollHeight, "1", 0);
    });
    finishAnimation(details, body);
  }

  function closeRow(details) {
    var body = getRowBody(details);
    if (!body) return;

    cancelRowAnimation(details);
    if (!details.open) return;

    if (reduceMotion.matches) {
      details.open = false;
      return;
    }

    details.classList.add("is-closing");
    prepareAnimation(details, body);
    setAnimatedBodyState(body, body.offsetHeight, "1", 0);
    body.offsetHeight;

    details.mobileCompactFrame = window.requestAnimationFrame(function () {
      details.mobileCompactFrame = null;
      setAnimatedBodyState(body, 0, "0", -4);
    });
    finishAnimation(details, body, function () {
      settleRowBorder(details);
      details.open = false;
    });
  }

  function cleanText(element) {
    return element.textContent.replace(/\s+/g, " ").trim();
  }

  function isProductIdHeader(label) {
    var normalized = label.toLowerCase().replace(/\s+/g, " ").trim();
    return /^(produkt[\s-]*id|product\s+id)$/.test(normalized);
  }

  function getHeaders(table) {
    return Array.from(table.querySelectorAll("thead th")).map(cleanText);
  }

  function getLastValueIndex(cells) {
    for (var index = cells.length - 1; index > 0; index--) {
      if (cells[index]) return index;
    }
    return cells.length - 1;
  }

  function getNearestHeading(table) {
    var current = table.previousElementSibling;
    while (current) {
      if (/^H[2-4]$/.test(current.tagName)) return cleanText(current);
      current = current.previousElementSibling;
    }
    return "";
  }

  function createCellTextElement(className, text) {
    var element = document.createElement("strong");
    element.className = className;
    element.textContent = text;
    return element;
  }

  function createSummary(product, price, hasDetails) {
    var summary = document.createElement(hasDetails ? "summary" : "div");
    summary.className = "mobile-compact-row__summary";
    summary.appendChild(createCellTextElement("mobile-compact-row__product", product));
    summary.appendChild(createCellTextElement("mobile-compact-row__price", price));
    return summary;
  }

  function buildCompactRow(cells, headers, list) {
    var priceIndex = getLastValueIndex(cells);
    var product = cells[0];
    var price = cells[priceIndex] || "";
    var detailHeaders = headers.slice(1, priceIndex);
    var hasDetails = detailHeaders.some(function (label, index) {
      return label || cells[index + 1];
    });
    var row = document.createElement(hasDetails ? "details" : "div");
    var summary = createSummary(product, price, hasDetails);

    row.className = hasDetails
      ? "mobile-compact-row"
      : "mobile-compact-row mobile-compact-row--static";
    row.appendChild(summary);

    if (!hasDetails) return row;

    var body = document.createElement("dl");
    body.className = "mobile-compact-row__details";
    detailHeaders.forEach(function (label, index) {
      var value = cells[index + 1] || "";
      if (!label && !value) return;

      var item = document.createElement("div");
      var term = document.createElement("dt");
      var description = document.createElement("dd");
      term.textContent = label;
      description.textContent = value;
      item.appendChild(term);
      item.appendChild(description);
      body.appendChild(item);
    });

    row.appendChild(body);
    summary.addEventListener("click", function (event) {
      event.preventDefault();

      if (row.open) {
        closeRow(row);
        return;
      }

      list.querySelectorAll("details.mobile-compact-row[open]").forEach(function (otherRow) {
        if (otherRow !== row) closeRow(otherRow);
      });
      openRow(row);
    });
    return row;
  }

  function createCompactList(table, headers) {
    var rows = Array.from(table.querySelectorAll("tbody tr"));
    var list = document.createElement("div");
    var label = table.getAttribute("aria-label") || getNearestHeading(table);
    list.className = "mobile-compact-table-list";
    if (label) list.setAttribute("aria-label", label);

    rows.forEach(function (tableRow) {
      var cells = Array.from(tableRow.querySelectorAll("td")).map(cleanText);
      if (cells.length < 2 || !cells[0]) return;
      list.appendChild(buildCompactRow(cells, headers, list));
    });

    return list.children.length ? list : null;
  }

  function initializeTable(table) {
    if (table.dataset.mobileCompactReady === "true") return;
    if (table.closest(".mobile-compact-table-list")) return;

    var headers = getHeaders(table);
    if (headers.length < 2 || !isProductIdHeader(headers[0])) return;

    var list = createCompactList(table, headers);
    if (!list) return;

    table.classList.add("mobile-compact-table");
    table.after(list);
    table.dataset.mobileCompactReady = "true";
  }

  function initialize() {
    if (!document.body.classList.contains("has-mobile-price-tables")) return;
    document.querySelectorAll("main table").forEach(initializeTable);
  }

  onReady(initialize);
})();
