---
ai: true
title: "Plattform som tjänst – PaaS"
language: "sv"
cardtitle: "Plattformstjänster"
cardicon: "fa-solid fa-container-storage"
cardcolor: "#195F8C"
cardorder: "07"
date: 2023-02-28
draft: false
intro: "Safespring tillhandahåller flera plattformtjänster ovanpå IaaS-plattformen."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tillbaka till alla kategorier"
sidebarlinkurl: "/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Safesprings tjänstekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
- /service-catalogue/platform/
---
{{< ingress >}}
Safespring tillhandahåller flera plattformstjänster ovanpå IaaS-plattformen.
{{< /ingress >}}

<table class="width100">
  <thead>
    <tr>
      <th>Produktkod</th>
      <th>Tjänst</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>PAAS-man.kubernetes</td>
      <td>Hanterad Kubernetes</td>
    </tr>
    <tr>
      <td>PAAS-man.postgresql</td>
      <td>Hanterad PostgreSQL</td>
    </tr>
    <tr>
      <td>PAAS-man.mariadb</td>
      <td>Hanterad MariaDB</td>
    </tr>
    <tr>
      <td>PAAS-man.elasticsearch</td>
      <td>Hanterad Elasticsearch</td>
    </tr>
    <tr>
      <td>PAAS-man.redis</td>
      <td>Hanterad Redis</td>
    </tr>
    <tr>
      <td>PAAS-man.nats</td>
      <td>Hanterad NATS</td>
    </tr>
  </tbody>
</table>

## Hanterad Kubernetes

Den hanterade plattformen Compliant Kubernetes omfattar följande funktioner och kapaciteter:

{{% accordion title="Säkerhet och efterlevnad" %}}

- Privat containerregister
- Intrångsdetekteringssystem (IDS) för larm vid intrång
- Automatiserad skanning av sårbarheter i avbildningar
- Integration med autentiseringsleverantörer såsom Active Directory, SAML och OIDC, t.ex. Google-autentisering
- Granskningsloggning i Kubernetes API-servern för att spåra aktiviteter i klustret
- Rollbaserad åtkomstkontroll (RBAC)
- Tillämpning av efterlevnadspolicyer
- Hantering av hemligheter
- Automatiserad certifikathantering
- Nätverksseparering (nätverkszoner och isolering av öst-väst-trafik)
- Nätverksisolering och restriktiva brandväggar som endast tillåter godkänd nätverkstrafik in i plattformen. Inkommande trafik till klustret hanteras säkert med Nginx ingress controller

{{% /accordion %}}

{{% accordion title="Observabilitet för plattformen" %}}

- Övervakning av resursanvändningen i Compliant Kubernetes-plattformen
- Larm baserat på övervakningsdata
- Loggaggregering
- Analys baserat på insamlade loggar
  {{% /accordion %}}
  {{% accordion title="Automatisering och hantering" %}}

- Kontinuerliga uppdateringar/patchar av Kubernetes-plattformen
- Kontinuerliga uppdateringar/patchar av klustertjänster och externa tjänster
- Säkerhetskopiering och katastrofåterställning
- Enterprise-gränssnitt för att styra klustret och integrera med andra tjänster
  {{% /accordion %}}

### Förutsättningar

Safespring IaaS.

### Hanterad Kubernetes – översikt

Safesprings hanterade Kubernetes-tjänst är byggd på Compliant Kubernetes (CK8s). Compliant Kubernetes är en beprövad, stabil och säker Kubernetes-plattform byggd på molnnativa komponenter med öppen källkod. Utöver vad som ingår i en ”standard” hanterad Kubernetes-tjänst ger Compliant Kubernetes följande mervärde:

- Bekymmersfri containerdrift med plattformen hanterad dygnet runt, sju dagar i veckan, i ISO‑certifierade europeiska datacenter.
- Förkonfigurerade säkerhetsverktyg enligt bästa praxis för att minska efterlevnadsbördan för ramverk som ISO‑27001, GDPR och PCI‑DSS.
- Gör det enklare att hålla sig säker och följa regelverk över tid genom att tillämpa policyer i hela mjukvaruutvecklingens livscykel utan att begränsa utvecklarna.
- Minskar revisionsbördan genom detaljerade och lättillgängliga granskningsspår.
- Gör applikationer enklare att hantera ur drift-, efterlevnads- och säkerhetsperspektiv genom att tillhandahålla ett enterprise‑gränssnitt som fungerar som en enda ingång till alla relevanta verktyg, policyer och konfigurationer.
- Minskar driftbördan genom att hantera alla ytterligare komponenter som krävs för en säker och efterlevnadsanpassad Kubernetes‑miljö, såsom observabilitet (loggning, övervakning, granskning), autentisering, hantering av hemligheter, intrångsdetektering, sårbarhetsskanning och ett privat containerregister.

### Hanterad Kubernetes – tjänstebeskrivning

![Beskrivning av Safespring Hanterad Kubernetes-tjänst](/img/graphics/safespring-openshift-2024.png)

### Hanterad Kubernetes – SLA

Tjänsten levereras med support ”dygnet runt, sju dagar i veckan” och har ett tillgänglighets‑SLA på 99,9 procent.

## PaaS – Hanterad PostgreSQL

Den hanterade PostgreSQL-tjänsten erbjuder regelbundna uppdateringar, dagliga säkerhetskopior, återställning till en viss tidpunkt och logglagring i Elasticsearch i upp till 30 dagar eller 50 GB.

{{% accordion title="Uppdateringar och uppgraderingar" %}}

PostgreSQL hålls uppdaterad med säkerhetsfixar och nya versioner. Detta inkluderar operativsystemet och databastillämpningen.

{{% /accordion %}}

{{% accordion title="Säkerhetskopior och katastrofåterställning" %}}

En fullständig säkerhetskopia av databasen tas varje dag. Utöver detta erbjuds återställning till en viss tidpunkt via en Write-Ahead-Log.

Katastrofåterställning åtar vi oss att slutföra inom 4 timmar.

{{% /accordion %}}

{{% accordion title="Loggaggregering" %}}

Alla loggar lagras i Elasticsearch och kan visas i Kibana.

Loggar sparas i högst 30 dagar (GDPR‑efterlevnad) eller upp till 50 GB, beroende på vilket som inträffar först.

{{% /accordion %}}

### Förutsättningar

Safespring IaaS.

### Hanterad PostgreSQL – översikt

PostgreSQL är den mest populära relationsdatabasen med öppen källkod för företagsarbetslaster. Safespring tillhandahåller en fullt hanterad PostgreSQL‑tjänst optimerad för prestanda och tillförlitlighet.

### Hanterad PostgreSQL – SLA

Tjänsten levereras med support ”dygnet runt, sju dagar i veckan” och har ett tillgänglighets‑SLA på 99,9 procent.

## PaaS – Hanterad Elasticsearch

Hanterad Elasticsearch erbjuder regelbundna uppdateringar, dagliga säkerhetskopior med återställning till en viss tidpunkt, samt katastrofåterställning med ett åtagande på 4 timmar. Loggar lagras i Elasticsearch och kan visas i Kibana, med en maximal lagringstid på 30 dagar eller 50 GB.

{{% accordion title="Uppdateringar och uppgraderingar" %}}

Elasticsearch- och Kibana‑instanser hålls uppdaterade med säkerhetsfixar och nya versioner.

{{% /accordion %}}

{{% accordion title="Säkerhetskopior och katastrofåterställning" %}}

En fullständig säkerhetskopia av databasen tas varje dag. Utöver detta erbjuds återställning till en viss tidpunkt via en Write-Ahead-Log.

Katastrofåterställning åtar vi oss att slutföra inom fyra (4) timmar.

{{% /accordion %}}

{{% accordion title="Loggaggregering" %}}

Alla loggar lagras i Elasticsearch och kan visas i Kibana.

Loggar sparas i högst 30 dagar (GDPR‑efterlevnad) eller upp till 50 GB, beroende på vilket som inträffar först.

{{% /accordion %}}

### Förutsättningar

Safespring IaaS.

### Hanterad Elasticsearch – översikt

Safespring tillhandahåller en fullt hanterad Elasticsearch‑tjänst som gör det enkelt att distribuera och driftsätta Elasticsearch med säkerhet i toppklass, i molnskala och med noll (0) nedtid. Som en del av tjänsten får kunder också tillgång till en eller flera hanterade Kibana‑instanser som gör det möjligt att söka, köra analyser och visualisera data i realtid.

### Hanterad Elasticsearch – SLA

Tjänsten levereras med support ”dygnet runt, sju dagar i veckan” och har ett tillgänglighets‑SLA på 99,9 procent.

## PaaS – Hanterad Redis

Detta avsnitt ger information om den hanterade Redis‑tjänsten som erbjuds som en del av PaaS‑lösningen. Tjänsten inkluderar regelbundna uppdateringar och uppgraderingar, dagliga säkerhetskopior med återställning till en viss tidpunkt samt loggaggregering med lagring i upp till 30 dagar eller 50 GB, beroende på vilket som inträffar först. Läs vidare för fler detaljer.

{{% accordion title="Uppdateringar och uppgraderingar" %}}

Databasen hålls uppdaterad med säkerhetsfixar och nya versioner. Detta inkluderar operativsystemet och databastillämpningen.

{{% /accordion %}}

{{% accordion title="Säkerhetskopior och katastrofåterställning" %}}

En fullständig säkerhetskopia av databasen tas varje dag. Utöver detta erbjuds återställning till en viss tidpunkt via en Write-Ahead-Log.

Katastrofåterställning åtar vi oss att slutföra inom fyra (4) timmar.

{{% /accordion %}}

{{% accordion title="Loggaggregering" %}}

Alla loggar lagras i Elasticsearch och kan visas i Kibana.

Loggar sparas i högst 30 dagar (GDPR‑efterlevnad) eller upp till 50 GB, beroende på vilket som inträffar först.

{{% /accordion %}}

### Förutsättningar

Safespring IaaS.

### Hanterad Redis – översikt

Redis är ett öppet, minnesresident datalager och ett mycket populärt val som databas, cache eller meddelandeförmedlare. Safespring driver en fullt hanterad Redis‑tjänst som ger alla fördelar med världens ledande in‑memory‑nyckelvärdelagring utan komplexiteten med databashantering, uppgraderingar och säkerhetskopior.

### Hanterad Redis – SLA

Tjänsten levereras med support ”dygnet runt, sju dagar i veckan” och har ett tillgänglighets‑SLA på 99,9 procent.

## PaaS – Hanterad NATS

Detta avsnitt ger information om den hanterade NATS‑tjänsten som erbjuds som en del av PaaS‑lösningen. Tjänsten inkluderar regelbundna uppdateringar och uppgraderingar, dagliga säkerhetskopior med snabb katastrofåterställning samt loggaggregering med lagring i upp till 30 dagar eller 50 GB, beroende på vilket som inträffar först. Läs vidare för fler detaljer.

{{% accordion title="Uppdateringar och uppgraderingar" %}}

- NATS hålls uppdaterat med säkerhetsfixar och nya versioner.

{{% /accordion %}}

{{% accordion title="Säkerhetskopior och katastrofåterställning" %}}

- En fullständig säkerhetskopia tas varje dag.
- Katastrofåterställning åtar vi oss att slutföra inom fyra (4) timmar.

{{% /accordion %}}

{{% accordion title="Loggaggregering" %}}

- Alla loggar lagras i Elasticsearch och kan visas i Kibana.
- Loggar sparas i högst 30 dagar (GDPR‑efterlevnad) eller upp till 50 GB, beroende på vilket som inträffar först.

{{% /accordion %}}

### Förutsättningar

Safespring IaaS.

### Hanterad NATS – översikt

Safespring driver en fullt hanterad NATS‑tjänst som låter dig ta del av fördelarna med ett modernt, molnnativt meddelandesystem.

### Hanterad NATS – SLA

Tjänsten levereras med support ”dygnet runt, sju dagar i veckan” och har ett tillgänglighets‑SLA på 99,9 procent.

{{% accordion-script %}}