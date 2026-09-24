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
---

## Kapacitet, drift och öppen teknik {#kontroll}

{{< ingress >}}
Med Private Cloud får ni en dedikerad plattform och en partner som sköter den löpande driften.
{{< /ingress >}}

<div class="mb-2"></div>

{{< icon-block-horisontal icon="fa-solid fa-server" color="#195F8C" text="Resurser för er verksamhet" description="Dedikerad hårdvara med beräknings- och lagringskapacitet efter era behov. Ni planerar kapaciteten tillsammans med oss." >}}

<div class="mb-2"></div>

{{< icon-block-horisontal icon="fa-solid fa-headset" color="#3C9BCD" text="Drift och underhåll" description="Safespring driftsätter och underhåller molnplattformen. Ni fokuserar på era applikationer, data och användare." >}}

<div class="mb-2"></div>

{{< icon-block-horisontal icon="fa-solid fa-code" color="#195F8C" text="Öppen teknik som grund" description="OpenStack och öppna gränssnitt ger er en grund för automatisering och integration med era verktyg." >}}

{{< distance >}}

## Så fördelas ansvaret {#ansvar}

Tillsammans klargör vi vem som ansvarar för varje del, från datacentret till applikationerna.

### Applikationer och data

**Er verksamhet**

Era system, användare och er strategi för säkerhetskopiering.

### Molnplattform och drift

**Safespring**

Driftsättning, löpande drift och programvaruunderhåll.

### Datacenter och fysisk miljö

**Ni eller datacenterpartnern**

Plats, ström, kylning, anslutning och arbete på plats.

Exakt ansvarsfördelning, support och servicenivåer fastställs i avtalet.

{{< distance >}}

## Placering efter era krav {#placering}

Utgå från verksamhetens krav på placering och fysisk kontroll. Vi hjälper er att välja ett upplägg för den dedikerade infrastrukturen.

### Safespring sköter molnplattformen

**I ert datacenter**

Behåll infrastrukturen i ert datacenter och låt Safespring sköta molnplattformen. Ni tillhandahåller den fysiska miljön och anslutningen.

För verksamheter som vill ha egen kontroll över den fysiska placeringen.

- Er fysiska miljö
- Safesprings plattformsdrift

{{< distance >}}

### Ert moln hos T.Loop

**Hos en datacenterpartner**

Safespring Private Cloud kan placeras i T.Loops svenska datacenter, där överskottsvärmen återvinns. Safespring levererar molnplattformen och T.Loop datacentertjänsten.

Placering, kapacitet och villkor tas fram för er lösning.

- Datacenter i Sverige
- Värmeåtervinning

[Läs om samarbetet med T.Loop](/tjanster/tloop/)

{{< distance >}}

## Plattformens byggstenar {#oppenhet}

Kombinera beräkning och lagring efter era behov. OpenStack är grunden för Compute, medan Ceph används för block- och objektlagring.

{{< icon-block-horisontal icon="fa-solid fa-server" color="#195F8C" text="Compute – OpenStack" description="Virtuella servrar med kapacitet för era applikationer. Processorer, minne och lokal lagring anpassas efter era behov.<br><br><small>Lokal instanslagring ingår i grunden.</small>" >}}

<div class="mb-2"></div>

{{< icon-block-horisontal icon="fa-solid fa-database" color="#3C9BCD" text="Blocklagring" description="Beständiga lagringsvolymer för era virtuella servrar, baserade på Ceph.<br><br><small>Tillval till Compute.</small>" >}}

<div class="mb-2"></div>

{{< icon-block-horisontal icon="fa-solid fa-cloud" color="#3C9BCD" text="Objektlagring" description="Lagra stora datamängder via ett S3-kompatibelt API. Objektlagringen kan kombineras med Compute eller levereras separat.<br><br><small>S3-kompatibelt API.</small>" >}}

Compute kan kompletteras med GPU-kapacitet. En kombination med Safesprings publika moln planeras utifrån era behov.

Tjänstekatalogen beskriver möjligheten för er att ta över förvaltningen av plattformen, med kunskapsöverföring från Safespring.

[Utforska tjänstekatalogen]({{< relref "geant/service-catalogue/private-cloud" >}})

{{< distance >}}

## Ett systematiskt säkerhetsarbete {#sakerhet}

{{% custom-card image="/img/card/safespring-iso.svg" cardtitle="ISO 27001" text="Safesprings certifierade ledningssystem för informationssäkerhet omfattar drift, utveckling och underhåll av infrastruktur för både publika och privata molntjänster." link="/compliance/iso-27001/" linktext="Läs om certifieringens omfattning" %}}
{{% /custom-card %}}

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

Berätta om era system, krav på datahantering och planer. Tillsammans går vi igenom hur Private Cloud kan passa er verksamhet.

<a class="button" href="{{< relref "contact" >}}">Prata Private Cloud med oss</a>
