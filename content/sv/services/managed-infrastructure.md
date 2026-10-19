---
layout: "service-landing"
title: "Private Cloud med Safespring som driftpartner"
metatitle: "Private Cloud med dedikerad infrastruktur"
language: "sv"
date: "2023-05-10"
lastmod: "2026-10-02"
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
  contact:
    eyebrow: Nästa steg
    title: Låt oss gå igenom era behov
    text: Berätta om era system, krav på datahantering och planer. Tillsammans går
      vi igenom hur Private Cloud kan passa er verksamhet.
    cta: Prata Private Cloud med oss
---

<section class="service-section service-split service-intro" aria-labelledby="pc-intro">
<div>
<p class="service-eyebrow">Safespring Private Cloud</p>
<h2 id="pc-intro">Ett eget moln med en driftpartner</h2>
</div>
<div class="service-copy">
<p>En dedikerad molnplattform för er organisation, placerad i ert eget datacenter eller hos en datacenterpartner.</p>
<p>Safespring sköter plattformens drift och underhåll. Ni ansvarar för applikationer, data och användare. Lösningen utformas efter kapacitet, fysisk placering och det driftansvar ni vill fördela.</p>
<div class="service-actions"><a class="button" href="/kontakt/">Diskutera Private Cloud</a><a class="text-button" href="#ansvar">Se ansvarsfördelningen</a></div>
</div>
</section>

<section id="kontroll" class="service-section" aria-labelledby="pc-behov">
<h2 id="pc-behov">När passar ett privat moln?</h2>
<p>Private Cloud är relevant när ni behöver dedikerad infrastruktur och vill planera kapaciteten för en egen miljö. Det kan också vara ett alternativ när placeringen styrs av era datacenter- eller verksamhetskrav.</p>
{{< private-cloud-visual "benefits" />}}
{{< note title="Jämför med det publika molnet" color="middle-blue" >}}
I det publika molnet använder ni resurser i en gemensam plattform. För en privat installation behöver hårdvara, kapacitetsutökning och driftupplägg planeras för just er miljö.
{{< /note >}}
</section>

<section id="ansvar" class="service-section service-split" aria-labelledby="pc-ansvar">
<div>
<h2 id="pc-ansvar">Ett tydligt ansvar på varje nivå</h2>
<p>Safespring sköter molnplattformens driftsättning, löpande drift och programvaruunderhåll. Ni sköter applikationer och data, inklusive er strategi för säkerhetskopiering.</p>
<p>Ström, kylning, anslutning och arbete på plats ligger hos er eller datacenterpartnern enligt valt upplägg. Exakt ansvar, support och servicenivåer fastställs i avtalet.</p>
</div>
<div>{{< private-cloud-visual "responsibility" />}}</div>
</section>

<section id="placering" class="service-section" aria-labelledby="pc-placering">
<h2 id="pc-placering">Eget datacenter eller datacenterpartner</h2>
<p>Om plattformen ska stå hos er behöver utrymme, el, kylning, anslutning och arbete på plats ingå i planeringen. Private Cloud kan även placeras hos T.Loop i Sverige; placering, kapacitet och villkor tas fram för lösningen.</p>
{{< private-cloud-visual "placement" />}}
</section>

<section id="oppenhet" class="service-section" aria-labelledby="pc-plattform">
<h2 id="pc-plattform">OpenStack för Compute, Ceph för lagring</h2>
<p>Lokal instanslagring ingår i grundupplägget. Ceph-baserad blocklagring kan väljas till, och S3-kompatibel objektlagring kan kombineras med Compute eller levereras separat.</p>
{{< private-cloud-visual "platform" >}}
GPU-kapacitet är ett tillval som behöver dimensioneras. Stäm av de tjänster, API:er och nätverksfunktioner ni behöver; funktionerna i det publika molnet ska inte automatiskt förutsättas ingå i en privat installation.
{{< /private-cloud-visual >}}
</section>

<section class="service-section service-split" aria-labelledby="pc-flytt">
<div>
<h2 id="pc-flytt">Utvärderar ni ett alternativ till VMware?</h2>
<p>Börja med de arbetslaster och VMware-funktioner ni använder. OpenStack kan kräva anpassningar av er miljö.</p>
</div>
<div>
{{< timeline ariaLabel="Utvärdering inför en migration till Private Cloud" >}}
  {{< timeline-item label="01" title="Inventera funktioner och krav" >}}
<p>Jämför nätverk, lagring, automation, licenser och tillgänglighetskrav med den planerade OpenStack-miljön.</p>
  {{< /timeline-item >}}
  {{< timeline-item label="02" title="Planera en avgränsad pilot" >}}
<p>En migration behöver en avgränsad pilot, en plan för dataflytt och ett sätt att återgå om provet inte uppfyller kraven.</p>
  {{< /timeline-item >}}
  {{< timeline-item label="03" title="Bestäm omfattning och ansvar" >}}
<p>Diskutera driftupplägg och ansvar innan produktionsflytten planeras. Private Cloud ska inte behandlas som en direkt ersättare utan anpassning.</p>
  {{< /timeline-item >}}
{{< /timeline >}}
</div>
</section>

<section id="sakerhet" class="service-section" aria-labelledby="pc-villkor">
<h2 id="pc-villkor">Knyt tekniken till tydliga villkor</h2>
{{< card-grid columns="2" ariaLabel="Frågor att avtala för Private Cloud" >}}
  {{< card-grid-item code="DRIFT" title="Åtkomst, återställning och support" >}}
Gå igenom administrativ åtkomst, backup, redundans och support som delar av samma lösning. Servicenivåer behöver knytas till tjänsten och er arkitektur, inte användas som ett generellt löfte om varje applikation.
  {{< /card-grid-item >}}
  {{< card-grid-item code="AVTAL" title="Integration och framtida byte" >}}
Öppna gränssnitt är en teknisk grund för integration. Rättigheter att ta över förvaltningen, eventuell kunskapsöverföring och ansvar vid ett avslut behöver också framgå av avtalet.
  {{< /card-grid-item >}}
{{< /card-grid >}}
</section>

<section id="fragor" class="service-section" aria-labelledby="pc-fragor">
<h2 id="pc-fragor">Pris och frågor inför ett beslut</h2>
{{% accordion title="Vad kostar Private Cloud?" %}}
Priset tas fram genom offert. Kapacitet, placering, lagringstillval, support och avtalsperiod är delar av underlaget. Ta med dagens resursbehov och hur ni väntar er att det förändras.
{{% /accordion %}}
{{% accordion title="Vem äger hårdvaran?" %}}
Ägande och ansvar för hårdvaran fastställs i erbjudandet och avtalet. Gå igenom placering, underhåll och vad som ska hända när avtalet löper ut.
{{% /accordion %}}
{{% accordion title="Ingår drift av våra applikationer och backup?" %}}
Driften av molnplattformen ska skiljas från driften av applikationerna. Ni ansvarar för applikationer, data och backupstrategi. Ytterligare åtaganden behöver beskrivas och avtalas särskilt.
{{% /accordion %}}
{{% accordion title="Kan vi kombinera med Safesprings publika moln?" %}}
En kombination kan planeras utifrån era behov. Gå igenom anslutning, dataflöden och ansvar för respektive miljö innan ni väljer vilka delar som ska ligga var.
{{% /accordion %}}
</section>

<section id="kontakt" class="service-section service-split service-photo-contact" aria-labelledby="pc-kontakt">
<figure class="service-photo service-photo-planning">
<img src="/img/team/safespring-team-planning-1280.jpg" srcset="/img/team/safespring-team-planning-640.jpg 640w, /img/team/safespring-team-planning-1280.jpg 1280w" sizes="(max-width: 800px) 90vw, 560px" width="1280" height="720" alt="Två personer samtalar framför en presentationsskärm i Safesprings kontorsmiljö." loading="lazy" decoding="async">
</figure>
<div>
<h2 id="pc-kontakt">Förbered ett samtal om er miljö</h2>
<p>Beskriv systemen, ungefärlig kapacitet och önskad placering. Ta med krav på tillgänglighet, återställning och support, samt vilka delar ert eget team vill sköta.</p>
{{< private-cloud-visual "contact" />}}
</div>
</section>
