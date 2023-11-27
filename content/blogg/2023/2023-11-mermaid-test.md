---
title: "Mermaid test"
date: "2023-11-19"
intro: "Lorem ipsum is a type of placeholder text, commonly used in the graphic, print, and web design industries. It is derived from parts of Cicero's De Finibus Bonorum et Malorum"
draft: true
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Tech update"
author: ""
language: "En"
fullwidth: ""
nosidebar: ""
---

<style>
       .modal {
         display: none; /* Gömd som standard */
         position: fixed; /* Stanna på plats */
         z-index: 99; /* Ligga ovanför andra element */
         left: 0;
         top: 0;
         width: 100%; /* Full bredd */
         height: 100%; /* Full höjd */
         overflow: auto; /* Möjliggör scrollning om nödvändigt */
         background-color: rgb(0,0,0); /* Fall back color */
         background-color: rgba(0,0,0,0.4); /* Svart med opacitet */
  }

  .modal-content {
         background-color: #fafefe;
         margin: 15% auto; /* 15% från toppen och centrerad */
         padding: 20px;
         border: 1px solid #888;
         width: 90%; /* Kan anpassas */
         border-radius: 20px;
  }
</style>

<div id="myModal" class="modal">
  <div class="modal-content">

{{< chart >}}
       timeline
       title Private Cloud
       section Vecka 0
       Avtal signerat: Förbereda avtalsdokument
       : Skicka avtalsdokument för granskning
       : Få avtalet signerat av alla parter
       : Arkivera det signerade avtalet
       section Vecka 1
       Beställning av hårdvara: Identifiera och specificera nödvändig hårdvara
       : Samla in offerter från leverantörer
       : Granska och jämföra offerter
       : Placera en beställning för godkänd hårdvara
       : Följ upp leveranstiden och leveransstatus
       section Vecka 4
       Arbetsplanering: Identifiera projektresurser
       : Allokera resurser till specifika uppgifter
       : Skapa en detaljerad projektplan
       : Dela ut uppgifter och ansvarsområden
       Uppföljningsmöte 1: Förbereda statusrapport inför mötet
       : Diskutera och säkerställa access
       : Planera för kundens resurser
       section Vecka 8
       Utbildning plattform: Planera och schemalägga utbildningstillfällen
       : Skapa utbildningsmaterial
       : Genomföra utbildningstillfällen
       : Samla in feedback och utvärdera
       Uppföljningsmöte 2: Förbereda statusrapport
       : Utses kundens resurser
       : Diskutera problem och lösningar
       section  Vecka 12-18
       Leverans hårdvara: Följ upp leveransstatus
       : Informera kund om leveransdatum
       : Säkerställ mottagande av hårdvaran
       Installation hårdvara (v18): Planera installationsprocessen
       : Genomföra installation
       : Funktionalitetstester
       section  Vecka 18-19
       Installation mjukvara: Samla in nödvändig mjukvara
       : Installera och konfigurera mjukvara
       Utföra tester : Utföra tester
       section     Vecka 20
       Leveransmöte: Förbereda statusrapport
       : Genomgång av användargränssnitt
       : Genomgång av plattformens funktioner
{{< /chart >}}

</div>
</div>

<button id="openModalButton">Se större bild</button>


{{% 700 %}}
Lorem ipsum is a type of placeholder text, commonly used in the graphic, print, and web design industries. It is derived from parts of Cicero's "De Finibus Bonorum et Malorum" (The Extremes of Good and Evil) written in 45 BC. The text became popular as a nonsensical placeholder in the 1960s with Letraset transfer sheets, which contained passages from "De Finibus Bonorum et Malorum" for use by graphic designers.

The purpose of lorem ipsum is to create a natural-looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not uncommon in the printing and typesetting industry before the widespread adoption of computers, it helps designers plan out visual elements without the distraction of meaningful content. 

Over time, the original Latin text has been modified, often resulting in versions that are more nonsensical than the original, but the core purpose remains the same: to provide a visually balanced and neutral backdrop for design layouts.

{{< distance >}}


Lorem ipsum is a type of placeholder text, commonly used in the graphic, print, and web design industries. It is derived from parts of Cicero's "De Finibus Bonorum et Malorum" (The Extremes of Good and Evil) written in 45 BC. The text became popular as a nonsensical placeholder in the 1960s with Letraset transfer sheets, which contained passages from "De Finibus Bonorum et Malorum" for use by graphic designers.

{{% /700 %}}

{{< distance >}}


{{< chart >}}
---
displayMode: compact
---
%% Use 2017-01-01 as a starting point to show weeks correct
gantt
dateFormat YYYY-MM-DD
axisFormat Vecka %W
A task          :a1, 2017-01-01, 7d
Another task    :after a1, 7d
Task in Another :2017-01-12, 12d
another task    :24d
{{< /chart >}}

{{< distance >}}

{{< chart >}}
timeline
title Private Cloud
section Vecka 0
Avtal signerat: Förbereda avtalsdokument
: Skicka avtalsdokument för granskning
: Få avtalet signerat av alla parter
: Arkivera det signerade avtalet
section Vecka 1
Beställning av hårdvara: Identifiera och specificera nödvändig hårdvara
: Samla in offerter från leverantörer
: Granska och jämföra offerter
: Placera en beställning för godkänd hårdvara
: Följ upp leveranstiden och leveransstatus
section Vecka 4
Arbetsplanering: Identifiera projektresurser
: Allokera resurser till specifika uppgifter
: Skapa en detaljerad projektplan
: Dela ut uppgifter och ansvarsområden
Uppföljningsmöte 1: Förbereda statusrapport inför mötet
: Diskutera och säkerställa access
: Planera för kundens resurser
section Vecka 8
Utbildning plattform: Planera och schemalägga utbildningstillfällen
: Skapa utbildningsmaterial
: Genomföra utbildningstillfällen
: Samla in feedback och utvärdera
Uppföljningsmöte 2: Förbereda statusrapport
: Utses kundens resurser
: Diskutera problem och lösningar
section  Vecka 12-18
Leverans hårdvara: Följ upp leveransstatus
: Informera kund om leveransdatum
: Säkerställ mottagande av hårdvaran
Installation hårdvara (v18): Planera installationsprocessen
: Genomföra installation
: Funktionalitetstester
section  Vecka 18-19
Installation mjukvara: Samla in nödvändig mjukvara
: Installera och konfigurera mjukvara
Utföra tester : Utföra tester
section     Vecka 20
Leveransmöte: Förbereda statusrapport
: Genomgång av användargränssnitt
: Genomgång av plattformens funktioner
{{< /chart >}}

{{< distance >}}