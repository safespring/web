---
ai: true
title: "Selvbetjent tilgang til åpen kildekodeinfrastruktur med NATS og Huma"
date: "2024-05-24"
intro: "Sesjonen vår, med tittelen 'Å bruke NATS og Huma til å styrke åpen kildekode-infrastruktur', var utformet for å gi både B2B- og europeiske forskningsmiljøer robust selvbetjent tilgang."
section: "Teknisk oppdatering"
draft: false
author: "Jon Ander Novella de Miguel"
tags: ["English"]
showthedate: true
card: "safespring_card_52.webp"
eventbild: ""
socialmediabild: ""
language: "nb"
TOC: ""
sidebarlinkname: "Presentasjon"
sidebarlinkurl: ""
sidebarlinkicon: ""
sidebarimage: "jon-openinfra-2024.webp"
aliases:
  - /blogg/2024/2024-05-openinfra-presentation/
---
{{< ingress >}}
Jeg hadde nylig muligheten til å presentere på OpenInfra Day Sweden 2024, og jeg gleder meg til å dele innsikter og utvikling fra teamet vårt hos Safespring.
{{< /ingress >}}

De siste tre månedene har vi jobbet med et nytt verktøy som skal styrke selvbetjent tilgang til infrastruktur med åpen kildekode for våre B2B‑kunder og kunder i europeiske forskningsmiljøer. Verktøyet bygger på NATS og Huma.

{{< inline "Safesprings oppdrag" >}} Safespring har som mål å bli den foretrukne plattformen for skytjenester i Europa. Vi er dedikert til å levere sikre skytjenester i samsvar med regelverket på tvers av flere datasentre i Norden, inkludert Oslo, Stockholm og Luleå. Våre tjenester følger GDPR og europeiske sikkerhetsstandarder, noe som sikrer førsteklasses sikkerhet for brukerne våre.

{{< distance >}}

{{< streamed-video "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-open-infra-days-2024/master.m3u8" >}}

{{< icon-block-horisontal icon="fa-solid fa-download" color="#3C9BCD" description="Klikk her for å laste ned presentasjonen som PDF." text="Last ned presentasjonen" link="/publications/2024-safespring-nats-and-huma-presentation-openinfra-gothenburg.pdf" >}}

{{< distance >}}

### Prosjektoversikt

Prosjektet vårt adresserer behovet for automatisert klargjøring av ressurser som prosjekter, brukere, nettverk og tilgangskontrollister på tvers av flere OpenStack‑installasjoner. Vi utviklet et selvbetjent API ved hjelp av to nøkkelteknologier:

1. NATS - Et meldingssystem for mikrotjenester.
2. Huma - Et HTTP‑rammeverk i Golang som legger til rette for å lage OpenAPI‑spesifikasjoner.

### Mål for selvbetjenings‑API‑et

1. Distribuert forvaltning: Muliggjøre effektiv distribuert forvaltning av kunders ressurser, redusere driftskostnader og la kundene klargjøre prosjekter ved behov.
2. Infrastruktur‑føderering: Støtte føderering av infrastruktur for prosjekter som involverer flere organisasjoner, slik som vårt pågående samarbeid med EU-kommisjonen.
3. Kontrollert ressursklargjøring: Implementere et kontrollag for å håndtere kunders forespørsler om ressurser, og sikre etterlevelse av forhåndsdefinerte kvoter og tilgangsnivåer.

### Tekniske detaljer

{{% accordion title="Huma‑rammeverket" %}}

- Kompatibelt med populære HTTP‑rutere.
- Bruk av generiske HTTP‑handler‑signaturer for god vedlikeholdbarhet.
- Annoterte struct‑typer for inn- og utdata‑modeller, som muliggjør automatisk generering av OpenAPI‑spesifikasjoner.

Huma, HTTP‑rammeverket vi valgte, er integrert i Golang‑økosystemet.
{{% /accordion %}}

{{% accordion title="NATS‑mikrotjenester" %}}

- Fire‑and‑forget‑meldinger: Effektiv publisering uten å vente på svar.
- Emnebasert meldingsutveksling: Målrettet kommunikasjon med flere tjenester samtidig.
- Innebygd lastbalansering: Sikrer høy tilgjengelighet og effektiv ressursfordeling.

For å overvinne begrensningene ved HTTP for dynamisk tjenesteoppdagelse og lastbalansering, tok vi i bruk NATS som meldingsmellomvare.
{{% /accordion %}}

### Arkitektur

Arkitekturen vår består av:

1. Selvbetjent HTTP‑API: Hovedgrensesnittet for brukerinteraksjon.
2. NATS‑mikrotjenester: Distribuert på tvers av ulike datasentre, lytter på emner og utfører operasjoner som å opprette prosjekter og brukere.
3. Sentrale tjenester: Inkluderer en kvote‑ og ACL‑kontroller for å styre ressursallokering og tilgangskontroll.

### Meldingsmønstre

Vi implementerte flere NATS‑mønstre, blant annet:

- Fan‑in og fan‑out: Distribuere meldinger fra selvbetjenings‑API‑et til flere tjenester.
- Scatter og gather: Aggregere svar fra flere tjenester for å gi helhetlige resultater til klienten.

### Utfordringer og løsninger

1. Enhetlig API for OKD og OpenStack: Utvikle en abstraksjon som fungerer på tvers av plattformer, samtidig som kompleksiteten rundt brukere og grupper håndteres.
2. Integrasjonstesting: Sikre robust testing mot gjenbrukbare OpenStack‑ og OKD‑miljøer, til tross for utfordringer med nestet virtualisering.

### Konklusjon

Dette prosjektet er et viktig steg fremover for å tilby skalerbar, selvbetjent tilgang til infrastruktur med åpen kildekode for kundene våre. Ved å utnytte NATS og Huma har vi laget et robust, effektivt og sikkert verktøy som møter de økende behovene hos våre B2B‑kunder og europeiske forskningsmiljøer.

Ta gjerne kontakt hvis du har spørsmål eller ønsker mer detaljert informasjon om prosjektet vårt!

{{< accordion-script >}}