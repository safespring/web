---
ai: true
title: "Självbetjänad åtkomst till öppen källkods-infrastruktur med hjälp av NATS och Huma"
date: "2024-05-24"
intro: "Vår session, med titeln 'Att använda NATS och Huma för att förbättra infrastrukturen för öppen källkod', utformades för att ge både B2B- och europeiska forskningsgemenskaper robust självbetjäningsåtkomst."
section: "Teknikuppdatering"
draft: false
author: "Jon Ander Novella de Miguel"
tags: ["English"]
showthedate: true
card: "safespring_card_52.webp"
eventbild: ""
socialmediabild: ""
language: "sv"
TOC: ""
sidebarlinkname: "Presentation"
sidebarlinkurl: ""
sidebarlinkicon: ""
sidebarimage: "jon-openinfra-2024.webp"
aliases:
  - /blogg/2024/2024-05-openinfra-presentation/
---
{{< ingress >}}
Jag hade nyligen möjlighet att presentera på OpenInfra Day Sweden 2024, och jag är glad att kunna dela med mig av insikter och nyheter från vårt team på Safespring.
{{< /ingress >}}

Under de senaste tre månaderna har vi arbetat med ett nytt verktyg som är utformat för att förbättra självserviceåtkomst till open source-infrastruktur för våra B2B-kunder och kunder inom den europeiska forskargemenskapen. Detta verktyg drar nytta av NATS och Huma.

{{< inline "Safesprings uppdrag" >}} Safespring siktar på att bli den plattform som föredras för europeisk molnberäkning. Vi är dedikerade till att leverera säkra, regel­efterlevande molntjänster över flera datacenter i Norden, inklusive Oslo, Stockholm och Luleå. Våra erbjudanden följer GDPR och europeiska säkerhetsstandarder, vilket säkerställer förstklassig säkerhet för våra användare.

{{< distance >}}

{{< streamed-video "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-open-infra-days-2024/master.m3u8" >}}

{{< icon-block-horisontal icon="fa-solid fa-download" color="#3C9BCD" description="Klicka här för att ladda ner presentationen som PDF." text="Ladda ner presentation" link="/publications/2024-safespring-nats-and-huma-presentation-openinfra-gothenburg.pdf" >}}

{{< distance >}}

### Projektöversikt

Vårt projekt adresserar behovet av automatiserad provisionering av resurser som projekt, användare, nätverk och åtkomstkontrollistor (ACL) över flera OpenStack-installationer. Vi utvecklade ett självservice-API med två nyckeltekniker:

1. NATS - ett meddelandesystem för mikrotjänster.
2. Huma - ett HTTP-ramverk i Golang som underlättar skapandet av OpenAPI-specifikationer.

### Mål för självservice-API:t

1. Distribuerad hantering: Möjliggör effektiv distribuerad hantering av kundresurser, minskar driftkostnader och låter kunder provisionera projekt vid behov.
2. Infrastrukturfederation: Stöd för federation av infrastruktur för projekt som involverar flera organisationer, till exempel vårt pågående samarbete med Europeiska kommissionen.
3. Kontrollerad resursprovisionering: Införa ett kontrollager för att hantera kunders resursförfrågningar och säkerställa efterlevnad av fördefinierade kvoter och åtkomstnivåer.

### Tekniska detaljer

{{% accordion title="Huma-ramverket" %}}

- Kompatibilitet med populära routrar.
- Användning av generiska HTTP-handler-signaturer för bättre underhållbarhet.
- Annoterade struct-typer för in- och utdatamodeller, vilket möjliggör automatisk generering av OpenAPI-specifikationer.

Huma, HTTP-ramverket vi valde, är integrerat i Golang-ekosystemet.
{{% /accordion %}}

{{% accordion title="NATS-mikrotjänster" %}}

- Fire-and-forget-meddelanden: effektiv publicering av meddelanden utan att invänta svar.
- Ämnesbaserad kommunikation: möjliggör riktad kommunikation med flera tjänster samtidigt.
- Inbyggd lastbalansering: säkerställer hög tillgänglighet och effektiv resursfördelning.

För att övervinna HTTP:s begränsningar kring dynamisk tjänsteupptäckt och lastbalansering använde vi NATS som meddelande-middleware.
{{% /accordion %}}

### Arkitektur

Vår arkitektur består av:

1. Självservice-HTTP-API: det huvudsakliga gränssnittet för användarinteraktion.
2. NATS-mikrotjänster: distribuerade över olika datacenter, lyssnar på ämnen och utför operationer som att skapa projekt och användare.
3. Centrala tjänster: inklusive en kvot- och ACL-kontroller för att hantera resursallokering och åtkomstkontroll.

### Meddelandemönster

Vi implementerade flera NATS-meddelandemönster, bland annat:

- Fan-in och fan-out: distribuerar meddelanden från självservice-API:t till flera tjänster.
- Scatter/gather: aggregerar svar från flera tjänster för att ge klienten ett heltäckande resultat.

### Utmaningar och lösningar

1. Enhetligt API för OKD och OpenStack: utveckla en abstraktion som fungerar över olika plattformar samtidigt som komplexiteten kring användare och grupper hanteras.
2. Integrationstester: säkerställa robust testning mot återställningsbara OpenStack- och OKD-miljöer, trots utmaningar med nästlad virtualisering.

### Slutsats

Detta projekt är ett viktigt steg mot att erbjuda skalbar självserviceåtkomst till open source-infrastruktur för våra kunder. Genom att utnyttja NATS och Huma har vi skapat ett robust, effektivt och säkert verktyg som möter de växande behoven hos våra B2B-kunder och den europeiska forskargemenskapen.

Hör gärna av dig om du har några frågor eller vill ha mer detaljerad information om vårt projekt!

{{< accordion-script >}}