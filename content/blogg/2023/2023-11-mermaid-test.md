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
toc: "Table of contents"
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
        secondaryTextColor: "##FAFEFE",
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
        tableNodeBorderColor: "#FFFFFF"
      }
    };

    mermaid.initialize(safespringTheme);
  });
</script>

{{< distance >}}

{{< chart >}}
graph TD
    A[Start] --> B[Läs in videofiler från INPUT_DIR]
    B --> C[Skapa output_folder i OUTPUT_DIR]
    C --> D[Skapa master.m3u8 spellista]
    D --> E[Hämta originalvideons bredd och höjd]
    E --> F{Jämför originalbredd med önskad storlek}
    F --> |Större| G[Beräkna ny bredd och höjd]
    G --> H[Justera höjd för h264]
    H --> I[Skala video med ffmpeg]
    F --> |Mindre eller lika| J[Behåll originalupplösning]
    J --> I
    I --> K[Lägg till upplösning i master.m3u8]
    K --> L{Finns fler storlekar?}
    L --> |Ja| F
    L --> |Nej| M[Slut på en video]
    M --> N{Finns fler videofiler?}
    N --> |Ja| B
    N --> |Nej| O[Slut]
{{< /chart >}}

{{< distance >}}