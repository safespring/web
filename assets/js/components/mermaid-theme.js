/*
 * Mermaid theme initialization.
 *
 * Purpose: pages that contain Mermaid diagrams keep the Safespring diagram
 * colors after moving the inline theme object out of footer.html.
 *
 * DOM contract: the Mermaid CDN script must load before this component and
 * expose window.mermaid. The footer only includes this file when Mermaid markup
 * exists in the page content.
 *
 * Failure behavior: if Mermaid is unavailable, the component exits quietly so
 * the page does not fail for non-critical diagram enhancement.
 */
(function () {
  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  onReady(function () {
    if (!window.mermaid || !window.mermaid.initialize) {
      return;
    }

    window.mermaid.initialize({
      theme: "base",
      themeVariables: {
        primaryColor: "#E8EFF3",
        primaryTextColor: "#417DA5",
        primaryBorderColor: "#FFFFFF00",
        lineColor: "#417DA5",
        secondaryColor: "#FAFEFE",
        secondaryTextColor: "#FAFEFE",
        fontFamily: "var(--mon-font)",
        labelColor: "#FFFFFF",
        actorBorder: "#FFFFFF",
        actorBkg: "#E8EFF3",
        actorTextColor: "#417DA5",
        actorLineColor: "#417DA5",
        signalColor: "#417DA5",
        labelBoxBkgColor: "#E8EFF3",
        labelBoxBorderColor: "#417DA5",
        arrowheadColor: "#417DA5",
        flowchartBackground: "#E8EFF3",
        todayLineColor: "#417DA5",
        classText: "#417DA5",
        classBackground: "#E8EFF3",
        classBorder: "#FFFFFF",
        tableNodeTextColor: "#417DA5",
        tableNodeBackground: "#E8EFF3",
        tableNodeBorderColor: "#FFFFFF",
        quadrantTitleFill: "var(--clear-blue-color)",
        quadrantPointFill: "var(--link-color)",
        quadrantPointTextFill: "var(--link-color)",
        pieOuterStrokeWidth: "0px",
        cScale0: "#E8EFF3",
        cScaleLabel0: "#417DA5",
        cScale1: "#E8EFF3",
        cScaleLabel1: "#417DA5",
        cScale2: "#E8EFF3",
        cScaleLabel2: "#417DA5",
        cScale3: "#E8EFF3",
        cScaleLabel3: "#417DA5",
        cScale4: "#E8EFF3",
        cScaleLabel4: "#417DA5",
        cScale5: "#E8EFF3",
        cScaleLabel5: "#417DA5",
        cScale6: "#E8EFF3",
        cScaleLabel6: "#417DA5",
        cScale7: "#E8EFF3",
        cScaleLabel7: "#417DA5",
        cScale8: "#E8EFF3",
        cScaleLabel8: "#417DA5",
        cScale9: "#E8EFF3",
        cScaleLabel9: "#417DA5",
        cScale10: "#E8EFF3",
        cScaleLabel10: "#417DA5",
        cScale11: "#E8EFF3",
        cScaleLabel11: "#417DA5",
        cScale12: "#E8EFF3",
        cScaleLabel12: "#417DA5",
      },
    });
  });
})();
