---
title: "Mermaid test"
date: "2023-11-19"
intro: "Separating the config data into a yaml file which serves as input to the Pulumi program"
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Tech update"
author: "Jarle Bjørgeengen"
language: "En"
---

eparating the config data into a yaml file which serves as input to the Pulumi program" eparating the config data into a yaml file which serves as input to the Pulumi program" eparating the config data into a yaml file which serves as input to the Pulumi program"

<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    const safespringTheme = {
      theme: "base",
      themeVariables: {
        primaryColor: "#E8EFF3",
        primaryTextColor: "#417DA5",
        primaryBorderColor: "#FFFFFF",
        lineColor: "#417DA5",
        secondaryColor: "#FAFEFE",
        secondaryTextColor: "#FAFEFE",
        tertiaryColor: "#FFF",
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
      }
    };

    mermaid.initialize(safespringTheme);
  });
</script>

{{< distance >}}

{{< chart >}}
gantt
    title A Gantt Diagram
    dateFormat YYYY-MM-DD
    section Section
        A task          :a1, 2014-01-01, 30d
        Another task    :after a1, 20d
    section Another
        Task in Another :2014-01-12, 12d
        another task    :24d
{{< /chart >}}

{{< distance >}}