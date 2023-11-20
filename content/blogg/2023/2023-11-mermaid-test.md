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
flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[Car]
{{< /chart >}}

{{< distance >}}

{{< chart >}}
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>Bob: Hello Bob, how are you?
    Bob-->>Alice: I am good thanks!
{{< /chart >}}

{{< distance >}}

{{< chart >}}
flowchart TB
    A[Start] --> B{Is it working?};
    B -->|Yes| C[End];
    B -->|No| A;
{{< /chart >}}

{{< distance >}}

{{< chart >}}
classDiagram
    Class01 <|-- AveryLongClass : Cool
    Class03 *-- Class04
    Class05 o-- Class06
    Class07 .. Class08
    Class09 --> C2 : Where am i?
    Class09 --* C3
    Class09 --|> Class07
    Class07 : equals()
    Class07 : Object[] elementData
    Class01 : size()
    Class01 : int chimp
    Class01 : int gorilla
    Class08 <--> C2: Cool label
{{< /chart >}}

{{< distance >}}

{{< chart >}}
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task    : 24d
{{< /chart >}}