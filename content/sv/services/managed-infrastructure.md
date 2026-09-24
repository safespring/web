---
title: "Dedikerad infrastruktur med Safespring som driftpartner."
metatitle: "Private Cloud – dedikerad infrastruktur med Safespring"
language: "sv"
date: "2023-05-10"
lastmod: "2026-09-24"
draft: false
intro: "Ett moln på öppen teknik för er verksamhet, placerat i ert datacenter eller hos en datacenterpartner."
background: "safespring-compute-background.svg"
socialmedia: "socialmedia/safespring-private-cloud.jpg"
slug: "private-cloud"
aliases: ["/tjanster/safespring-on-premise-cloud/", "/private-cloud/", "/tjanster/managed-private-cloud/", "/tjanster/managed-infrastructure/"]
section: "Private Cloud"
sidebarlinkname: "Prata med oss"
sidebarlinkurl: "/kontakt/"
sidebarlinkname2: "Utforska Private Cloud"
sidebarlinkurl2: "#kontroll"
toc: "På denna sida"
sidebarimage: "safespring_logotype_blue_svg.svg"
sidebartext: "Berätta om era system, krav på datahantering och planer. Tillsammans går vi igenom hur Private Cloud kan passa er verksamhet."
sidebarmail: "hello@safespring.com"
private_cloud_visuals:
  benefits:
  - title: Resurser för er verksamhet
    text: Dedikerad hårdvara med beräknings- och lagringskapacitet efter era behov.
      Ni planerar kapaciteten tillsammans med oss.
  - title: Drift och underhåll
    text: Safespring driftsätter och underhåller molnplattformen. Ni fokuserar på
      era applikationer, data och användare.
  - title: Öppen teknik som grund
    text: OpenStack och öppna gränssnitt ger er en grund för automatisering och integration
      med era verktyg.
  responsibility:
    layers:
    - owner: Er verksamhet
      title: Applikationer och data
      text: Era system, användare och er strategi för säkerhetskopiering.
    - owner: Safespring
      title: Molnplattform och drift
      text: Driftsättning, löpande drift och programvaruunderhåll.
    - owner: Ni eller datacenterpartnern
      title: Datacenter och fysisk miljö
      text: Plats, ström, kylning, anslutning och arbete på plats.
    note: Exakt ansvarsfördelning, support och servicenivåer fastställs i avtalet.
  placement:
  - id: eget-datacenter
    label: I ert datacenter
    number: A
    title: Safespring sköter molnplattformen
    text: Behåll infrastrukturen i ert datacenter och låt Safespring sköta molnplattformen.
      Ni tillhandahåller den fysiska miljön och anslutningen.
    detail: För verksamheter som vill ha egen kontroll över den fysiska placeringen.
    tags:
    - Er fysiska miljö
    - Safesprings plattformsdrift
  - id: datacenterpartner
    label: Hos en datacenterpartner
    number: B
    title: Ert moln hos T.Loop
    text: Safespring Private Cloud kan placeras i T.Loops svenska datacenter, där
      överskottsvärmen återvinns. Safespring levererar molnplattformen och T.Loop
      datacentertjänsten.
    detail: Placering, kapacitet och villkor tas fram för er lösning.
    tags:
    - Datacenter i Sverige
    - Värmeåtervinning
    link: "/tjanster/tloop/"
    linktext: Läs om samarbetet med T.Loop
  platform:
    compute:
      technology: OpenStack
      title: Compute
      text: Virtuella servrar med kapacitet för era applikationer. Processorer, minne
        och lokal lagring anpassas efter era behov.
      note: Lokal instanslagring ingår i grunden.
    storage:
      technology: Ceph
      label: Lagringsplattform
      items:
      - title: Blocklagring
        text: Beständiga lagringsvolymer för era virtuella servrar, baserade på Ceph.
        note: Tillval till Compute.
      - title: Objektlagring
        text: Lagra stora datamängder via ett S3-kompatibelt API. Objektlagringen
          kan kombineras med Compute eller levereras separat.
        note: S3-kompatibelt API.
  trust:
    eyebrow: Ett systematiskt säkerhetsarbete
    title: ISO 27001
    text: Safesprings certifierade ledningssystem för informationssäkerhet omfattar
      drift, utveckling och underhåll av infrastruktur för både publika och privata
      molntjänster.
    linktext: Läs om certifieringens omfattning
    link: compliance/iso-27001
  contact:
    eyebrow: Nästa steg
    title: Låt oss gå igenom era behov
    text: Berätta om era system, krav på datahantering och planer. Tillsammans går
      vi igenom hur Private Cloud kan passa er verksamhet.
    cta: Prata Private Cloud med oss
---

## Kapacitet, drift och öppen teknik {#kontroll}

{{< ingress >}}
Med Private Cloud får ni en dedikerad plattform och en partner som sköter den löpande driften.
{{< /ingress >}}

{{< private-cloud-visual "benefits" >}}

{{< distance >}}

## Så fördelas ansvaret {#ansvar}

Tillsammans klargör vi vem som ansvarar för varje del, från datacentret till applikationerna.

{{< private-cloud-visual "responsibility" >}}

{{< distance >}}

## Placering efter era krav {#placering}

Utgå från verksamhetens krav på placering och fysisk kontroll. Vi hjälper er att välja ett upplägg för den dedikerade infrastrukturen.

{{< private-cloud-visual "placement" >}}

{{< distance >}}

## Plattformens byggstenar {#oppenhet}

Kombinera beräkning och lagring efter era behov. OpenStack är grunden för Compute, medan Ceph används för block- och objektlagring.

{{< private-cloud-visual "platform" >}}

Compute kan kompletteras med GPU-kapacitet. En kombination med Safesprings publika moln planeras utifrån era behov.

Tjänstekatalogen beskriver möjligheten för er att ta över förvaltningen av plattformen, med kunskapsöverföring från Safespring.

[Utforska tjänstekatalogen]({{< relref "geant/service-catalogue/private-cloud" >}})

{{< distance >}}

## Ett systematiskt säkerhetsarbete {#sakerhet}

{{< private-cloud-visual "trust" >}}

{{< distance >}}

## Frågor om Private Cloud {#fragor}

{{% accordion title="Hur skiljer sig Private Cloud från ett publikt moln?" %}}
Private Cloud bygger på dedikerad infrastruktur för er organisation. Kapacitet, placering och driftupplägg utformas för era behov. I Safesprings publika moln använder ni resurser i en gemensam plattform.
{{% /accordion %}}

{{% accordion title="Vem äger hårdvaran?" %}}
I det Private Cloud-erbjudande som beskrivs i vår tjänstekatalog äger kunden hårdvaran. Vi går igenom hårdvara, placering och ansvarsfördelning när vi tar fram lösningen.
{{% /accordion %}}

{{% accordion title="Vilka OpenStack-funktioner och API:er ingår?" %}}
OpenStack är grunden för beräkningsplattformen. Vi stämmer av vilka tjänster, API:er och nätverksfunktioner ni behöver när vi utformar lösningen. Omfattningen ska framgå av erbjudandet.
{{% /accordion %}}

{{% accordion title="Hur hanteras tillgänglighet och säkerhetskopiering?" %}}
Vi går igenom era krav på redundans, återställning och support och fastställer servicenivåerna i avtalet. Ni ansvarar för era applikationer och er strategi för säkerhetskopiering. Säkerhetskopiering och lösningar över flera platser behöver planeras särskilt.
{{% /accordion %}}

{{% accordion title="Vad kostar Private Cloud?" %}}
Kontakta oss för en offert utifrån era behov av kapacitet, placering och drift. I dialogen går vi också igenom tillval, support och avtalsperiod.
{{% /accordion %}}

{{< distance >}}

## Låt oss gå igenom era behov {#kontakt}

{{< private-cloud-visual "contact" >}}
