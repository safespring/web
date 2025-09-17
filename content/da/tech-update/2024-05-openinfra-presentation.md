---
ai: true
title: "Selvbetjent adgang til open source-infrastruktur med NATS og Huma"
date: "2024-05-24"
intro: "Vores session, med titlen 'Brug af NATS og Huma til at forbedre open source-infrastruktur', var designet til at give både B2B- og europæiske forskningsfællesskaber robust selvbetjent adgang."
section: "Teknologiopdatering"
draft: false
author: "Jon Ander Novella de Miguel"
tags: ["English"]
showthedate: true
card: "safespring_card_52.webp"
eventbild: ""
socialmediabild: ""
language: "da"
TOC: ""
sidebarlinkname: "Præsentation"
sidebarlinkurl: ""
sidebarlinkicon: ""
sidebarimage: "jon-openinfra-2024.webp"
aliases:
  - /blogg/2024/2024-05-openinfra-presentation/
---
{{< ingress >}}
Jeg havde for nylig mulighed for at præsentere på OpenInfra Day Sweden 2024, og jeg er glad for at kunne dele indsigter og nyheder fra vores team hos Safespring.
{{< /ingress >}}

I løbet af de seneste tre måneder har vi arbejdet på et nyt værktøj, der skal forbedre selvbetjent adgang til open source-infrastruktur for vores B2B-kunder og kunder i den europæiske forskningssektor. Dette værktøj udnytter styrken i NATS- og Huma-teknologierne.

{{< inline "Safesprings mission" >}} Safespring sigter mod at blive den foretrukne platform for europæisk cloud computing. Vi er dedikeret til at levere sikre, compliant cloudtjenester på tværs af flere datacentre i Norden, herunder Oslo, Stockholm og Luleå. Vores tjenester overholder GDPR og europæiske sikkerhedsstandarder, hvilket sikrer højeste grad af sikkerhed for vores brugere.

{{< distance >}}

{{< streamed-video "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-open-infra-days-2024/master.m3u8" >}}

{{< icon-block-horisontal icon="fa-solid fa-download" color="#3C9BCD" description="Klik her for at downloade præsentationen som PDF." text="Download præsentation" link="/publications/2024-safespring-nats-and-huma-presentation-openinfra-gothenburg.pdf" >}}

{{< distance >}}

### Projektoversigt

Vores projekt adresserer behovet for automatiseret klargøring af ressourcer som projekter, brugere, netværk og adgangskontrollister på tværs af flere OpenStack-installationer. Vi har udviklet et selvbetjenings-API ved hjælp af to nøgleteknologier:

1. NATS - Et beskedsystem til mikrotjenester.
2. Huma - Et HTTP-framework i Golang, der gør det nemt at oprette OpenAPI-specifikationer.

### Mål for selvbetjenings-API'et

1. Distribueret administration: Muliggør effektiv, distribueret administration af kundernes ressourcer, reducerer driftsomkostninger og giver kunderne mulighed for at klargøre projekter on demand.
2. Infrastrukturføderation: Understøt fødereret infrastruktur for projekter, der involverer flere organisationer, såsom vores igangværende samarbejde med Europa-Kommissionen.
3. Kontrolleret ressourceklargøring: Implementér et kontrollag til at håndtere kunders anmodninger om ressourcer og sikre overholdelse af foruddefinerede kvoter og adgangsniveauer.

### Tekniske detaljer

{{% accordion title="Huma-frameworket" %}}

- Kompatibilitet med populære routere.
- Brug af generiske HTTP-handler-signaturer for bedre vedligeholdelse.
- Annoterede struct-typer til input- og outputmodeller, som muliggør automatisk generering af OpenAPI-specifikationer.

Huma, det HTTP-framework vi har valgt, er integreret i Golang-økosystemet.
{{% /accordion %}}

{{% accordion title="NATS-mikrotjenester" %}}

- Fire-and-forget-messaging: Effektiv publicering af beskeder uden at afvente svar.
- Emnebaseret messaging: Muliggør målrettet kommunikation med flere tjenester samtidigt.
- Indbygget lastbalancering: Sikrer høj tilgængelighed og effektiv ressourcefordeling.

For at overvinde HTTP’s begrænsninger ved dynamisk tjenesteopdagelse og lastbalancering har vi taget NATS i brug som besked-middleware.
{{% /accordion %}}

### Arkitektur

Vores arkitektur består af:

1. Selvbetjenings-HTTP-API: Hovedgrænsefladen for brugerinteraktion.
2. NATS-mikrotjenester: Distribueret på tværs af forskellige datacentre, lytter på emner og udfører operationer som oprettelse af projekter og brugere.
3. Centrale tjenester: Herunder en kvote- og ACL-controller til at styre ressourceallokering og adgangskontrol.

### Messaging-mønstre

Vi har implementeret flere NATS-messaging-mønstre, herunder:

- Fan-in og fan-out: Distribuerer beskeder fra selvbetjenings-API'et til flere tjenester.
- Scatter-gather: Aggregerer svar fra flere tjenester for at levere et samlet resultat til klienten.

### Udfordringer og løsninger

1. Forenet API for OKD og OpenStack: Udvikling af en abstraktion, der fungerer på tværs af forskellige platforme, samtidig med at kompleksiteten omkring brugere og grupper håndteres.
2. Integrationstest: Sikre robust test mod genanvendelige OpenStack- og OKD-miljøer, på trods af udfordringer med indlejret virtualisering.

### Konklusion

Dette projekt repræsenterer et vigtigt skridt fremad i at levere skalerbar, selvbetjent adgang til open source-infrastruktur for vores kunder. Ved at udnytte NATS og Huma har vi skabt et robust, effektivt og sikkert værktøj, der imødekommer de voksende krav fra vores B2B- og europæiske forskningsmiljøer.

Du er velkommen til at kontakte os, hvis du har spørgsmål eller ønsker mere detaljeret information om vores projekt!

{{< accordion-script >}}