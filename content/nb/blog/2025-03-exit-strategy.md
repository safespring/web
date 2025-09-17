---
ai: true
title: "Når du vil, må eller blir tvunget til å forlate en amerikansk skyleverandør"
date: 2025-03-26
intro: "Uansett hvorfor du går, står du overfor Exit-dilemmaet."
draft: false
tags: ["English"]
showthedate: true
card: "safespring_card_54.svg"
eventbild: ""
socialmediabild: ""
language: "nb"
sectiontext: "Blogg"
section: "blogg"
author: "Daniel Melin"
aliases:
  - /blogg/2025/2025-03-exit-strategy/
---
{{< ingress >}}
I dagens geopolitiske landskap, der USA raskt forsøker å bli mer lik Kina og Russland, står kunder hos amerikanske skyleverandører overfor vanskelige valg.
{{< /ingress >}}

**Vil du forlate dem?** Kanskje du føler at USA har kommet for langt i å ødelegge sitt eget demokrati, eller at ting generelt er i ferd med å gå over styr.

**Må du forlate dem?** Kanskje kunden din krever at tjenesten din er fri for amerikanske forbindelser, eller at de ansatte nekter å jobbe med amerikanske skyleverandører, eller at Trans-Atlantic Data Privacy Framework forsvinner. Hvis du er i offentlig sektor eller primært selger til offentlig sektor, må du kanskje vurdere på nytt om du kan lagre og behandle personopplysninger og/eller gradert informasjon.

**Er du tvunget til å forlate dem?** Kanskje Trump bestemte at organisasjonen din, landet ditt eller kontinentet ditt er VELDIG DÅRLIG og derfor ikke lenger skal ha tilgang til amerikanske skytjenester, eller at tollsatser gjør skytjenestene for dyre å bruke.

Uansett hvorfor du forlater dem, står du overfor Exit-dilemmaet.

{{% note "Exit-prosessen" %}}
Her er en liste over noen av tingene du kan vurdere i Exit-prosessen:

1. Dokumenter hvilke amerikanske skytjenester du bruker.
2. Dokumenter hvilke typer tjenester du kjøper. IaaS, PaaS, SaaS eller annen XaaS?
3. Dokumenter hvilke typer data som lagres og behandles i tjenestene.
4. Prøv å lese kontrakten(e). De er ofte svært lange, svært komplekse, lite kundevennlige og ikke alltid komplette.
   1. Hvilke rettigheter har du til dataene og metadataene dine?
   1. Kan du hente ut alt?
   1. I hvilke formater kan du få ut data og metadata?
   1. Er det mulig å gjenbruke data og metadata uten tap?
5. Hvis du bruker compute-instanser og S3-lagring, bør prosessen være ganske rett fram, og det bør ikke oppstå datatap.
6. Hvis du bruker Kubernetes og containere, finnes det noen fallgruver, men du bør kunne migrere uten datatap.
7. Hvis du er utvikleren bak en SaaS som bruker andres IaaS/PaaS, vil erfaringene variere mye avhengig av hvor låst du er til funksjoner som bare finnes hos én skyleverandør. I så fall kan det bli nødvendig å endre applikasjonen slik at den kan kjøre i ethvert standard skymiljø. Det vil uansett være gunstig for deg på lang sikt. :)
8. Nettverk er nøkkelen. Ved migrering mellom plattformer er det viktig å kunne håndtere overgangen. Det kan gjøres ved å sette opp et overlay-nettverk som spenner over begge plattformene. På den måten kan hver funksjon migreres med minimal påvirkning.

{{% /note %}}

Uansett situasjon, snakk med oss i Safespring, så veileder vi deg gjennom din Exit.

{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Daniel Melin" %}}
Jeg er Safesprings Business Development Manager. Enten du er interessert i å anskaffe tjenestene våre eller vil lære mer om initiativer som EuroStack, er jeg her for å hjelpe deg å navigere og utnytte tilbudene våre.

{{< inline "Ring" >}} +46 (0)76 868 00 59
[daniel.melin@safespring.com](mailto:daniel.melin@safespring.com)
{{% /custom-card %}}