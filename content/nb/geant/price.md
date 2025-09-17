---
ai: true
section: "OCRE 2024-rammeverk"
language: "nb"
title: "Prisliste og kalkulator"
date: "2025-01-20"
draft: false
tags: ""
showthedate: false
pageimage: ""
intro: "Sammen skaper vi en sikrere og mer kostnadseffektiv digital infrastruktur."
toc: "Prisliste"
nosidebar: ""
sidebarlinkname: "Last ned prisliste"
sidebarlinkurl: "/pricelist/geant/geant_safespring_pricelist.xlsx"
sidebarlinkname2: "Tjenestekatalog"
sidebarlinkurl2: "/geant/service-catalogue/"
noindex: "x"
aliases:
  - /geant/price/
---
{{% note "Informasjon" %}}
Alle priser er i EUR, ekskl. MVA. For en samlet prisliste i SEK, NOK, EUR og DKR, vennligst [last ned prislisten i Excel-format](/pricelist/geant/geant_safespring_pricelist.xlsx).
{{% /note %}}

## Safespring Compute

{{< ingress >}}
Infrastruktur som en tjeneste kan kjøres med lisens for åpen kildekode eller med Windows-lisens.
{{< /ingress >}}

### Instanstyper med lokal NVMe-lagring

Sentral blokklagring kan kjøpes til instansene. Se "Sentral blokklagring" i prislisten.
Se konfigurasjoner for instanstyper med lokal NVMe-lagring i [tjenestekatalogen](/geant/service-catalogue/infrastructure/#configurations).

| Produkt-ID              | vCPU | RAM (GB) | Lokal disk (GB) | Per time | 30 dager |
| ----------------------- | ---- | -------- | ---------------- | -------- | -------- |
| FLAVOR-l2. c2 r4. 100    | 2    | 4        | 100              | 0,06 €   | 42,72 €  |
| FLAVOR-l2. c2 r4. 500    | 2    | 4        | 500              | 0,11 €   | 78,32 €  |
| FLAVOR-l2. c2 r4. 1000   | 2    | 4        | 1 000            | 0,17 €   | 122,82 € |
| FLAVOR-l2. c4 r8. 100    | 4    | 8        | 100              | 0,11 €   | 76,54 €  |
| FLAVOR-l2. c4 r8. 500    | 4    | 8        | 500              | 0,16 €   | 112,14 € |
| FLAVOR-l2. c4 r8. 1000   | 4    | 8        | 1 000            | 0,22 €   | 156,64 € |
| FLAVOR-l2. c8 r16. 100   | 8    | 16       | 100              | 0,20 €   | 144,18 € |
| FLAVOR-l2. c8 r16. 500   | 8    | 16       | 500              | 0,25 €   | 179,78 € |
| FLAVOR-l2. c8 r16. 1000  | 8    | 16       | 1 000            | 0,31 €   | 224,28 € |
| FLAVOR-l2. c16 r32. 100  | 16   | 32       | 100              | 0,39 €   | 279,46 € |
| FLAVOR-l2. c16 r32. 500  | 16   | 32       | 500              | 0,44 €   | 315,06 € |
| FLAVOR-l2. c16 r32. 1000 | 16   | 32       | 1 000            | 0,50 €   | 359,56 € |
| FLAVOR-l2. c16 r64. 500  | 16   | 64       | 500              | 0,66 €   | 471,70 € |
| FLAVOR-l2. c32 r64. 1000 | 32   | 64       | 1 000            | 0,88 €   | 630,12 € |

### Instanstyper uten lokal lagring

Sentral blokklagring kan kjøpes til instansene. Se "Sentral blokklagring" i prislisten.
Se konfigurasjoner for instanstyper uten lokal lagring i [tjenestekatalogen](/geant/service-catalogue/infrastructure/#compute-without-local-storage).

| Produkt-ID        | vCPU | RAM (GB) | Lokal disk (GB) | Per time | 30 dager |
| ----------------- | ---- | -------- | ---------------- | -------- | -------- |
| FLAVOR-b2. c1 r2  | 1    | 2        | 0                | 0,02 €   | 16,91 €  |
| FLAVOR-b2. c1 r4  | 1    | 4        | 0                | 0,04 €   | 26,70 €  |
| FLAVOR-b2. c2 r4  | 2    | 4        | 0                | 0,05 €   | 33,82 €  |
| FLAVOR-b2. c2 r8  | 2    | 8        | 0                | 0,07 €   | 53,40 €  |
| FLAVOR-b2 .c4 r8  | 4    | 8        | 0                | 0,09 €   | 67,64 €  |
| FLAVOR-b2. c4 r16 | 4    | 16       | 0                | 0,15 €   | 106,80 € |
| FLAVOR-b2. c8 r16 | 8    | 16       | 0                | 0,19 €   | 135,28 € |
| FLAVOR-b2. c8 r32 | 8    | 32       | 0                | 0,30 €   | 213,60 € |
| FLAVOR-b2. c16 r32| 16   | 32       | 0                | 0,38 €   | 270,56 € |
| FLAVOR-b2. c16 r64| 16   | 64       | 0                | 0,59 €   | 427,20 € |

### Sentral blokklagring

Sentral blokklagring gir tre kopier av dataene distribuert i en robust CEPH-klynge.
Se konfigurasjoner i [tjenestekatalogen](/geant/service-catalogue/infrastructure/#central-block-storage).

| Produkt-ID       | Beskrivelse                | Per time | 30 dager |
| ---------------- | -------------------------- | -------- | -------- |
| VOLUME-large     | HDD-basert Ceph med 3 replikaer | 0,0001 € | 0,1068 € |
| VOLUME-fast      | SSD-basert Ceph med 3 replikaer | 0,0004 € | 0,3204 € |
| VOLUME-snapshot  | Snapshot av image          | 0,0001 € | 0,1068 € |

{{< distance >}}

## Safespring Storage (S3)

{{< ingress >}}
Kontakt oss for rabatter ved større lagringsmengder. Prismodell basert på antall lagrede TB per måned.
{{< /ingress >}}

Se konfigurasjoner for objektlagring i [tjenestekatalogen](/geant/service-catalogue/storage/#configurations).

| Produkt-ID | Per TB i 30 dager |
| ---------- | ----------------- |
| S3-archive | 31,15 €           |
| S3-storage | 44,50 €           |

{{< distance >}}

## Safespring Backup

{{< ingress >}}
Skybackup-løsning for on‑prem- eller skyservere basert på Spectrum Protect (TSM).
{{< /ingress >}}

Safespring Backup tilbyr teknologi for datareduksjon[^1] i tjenesten som typisk reduserer datamengden mellom 45 %–90 %. Prisen settes per beskyttet GB på klienten og per lagret GB i tjenesten etter deduplisering og komprimering. I tillegg er 1 TB inkludert i den faste månedsprisen for BAAS-small.

Se konfigurasjoner for sikkerhetskopi i [tjenestekatalogen](/geant/service-catalogue/backup/#configurations).

{{% accordion title="Hvilket alternativ er best?" %}}

| Dataforbruk (GB) | Mest kostnadseffektive tjeneste |
| ---------------- | -------------------------------- |
| 0 - 5 000        | Backup on Demand                 |
| 5 001 - 7 000    | Backup Small                     |
| 7 001            | Backup Large                     |

{{% /accordion %}}
{{< accordion-script >}}

| Produkt-ID          | Fast månedspris | Per GB / 30 dager |
| ------------------- | ---------------- | ----------------- |
| BAAS-on.demand[^2]  | N/A              | 0,22 €            |
| BAAS-small[^3]      | 490 €            | 0,16 €            |
| BAAS-large[^4]      | 846 €            | 0,08 €            |

## Nettverk og programvare

{{< ingress >}}
Safespring tilbyr ulike programvarer og lisenser som kan kjøre oppå Safesprings skyplattform.
{{< /ingress >}}

### Nettverk

Safespring tilbyr flere nettverkstjenester.  
Se nettverksalternativer i [tjenestekatalogen](/geant/service-catalogue/network/).

| Produkt-ID  | Type                       | Beskrivelse                               | Fakturering per | Månedlig |
| ----------- | -------------------------- | ----------------------------------------- | --------------- | -------- |
| NET-publicv4| IPv4                       | Offentlig                                 | IP-adresse      | 2,23 €   |
| NET-publicv6| IPv6                       | Offentlig                                 | N/A             | 0,00 €   |
| NET-ingress | Dataoverføring             |                                           | N/A             | 0,00 €   |
| NET-egress  | Dataoverføring             |                                           | N/A             | 0,00 €   |
| NET-mgn.slb | Administrert SLB           | Lastbalanserer basert på to `l2.c4.r8.100`| Instans         | 186,00 € |
| NET-rdns    | Reverse DNS-navn           |                                           | N/A             | 0,00 €   |
| NET-byoip   | Ta med egne IP-prefikser   |                                           | N/A             | 0,00 €   |

### Programvare og lisenser

Safespring tilbyr flere programvareløsninger og lisenser.  
Se tredjeparts programvarelisenser i [tjenestekatalogen](/geant/service-catalogue/third-party-software-licenses/).

| Produkt-ID         | Beskrivelse                     | Fakturering per | Månedlig |
| ------------------ | -------------------------------- | --------------- | -------- |
| SW-win.ser.2022    | Microsoft Windows Server         | vCPU            | 15,58 €  |
| SW-ms.sql.ser      | Microsoft SQL Server Standard    | vCPU            | 109,38 € |
| SW-ms.sql.ser.ent  | Microsoft SQL Server Enterprise  | vCPU            | 424,17 € |
| SW-nextcloud       | Nextcloud Hub                    | Konto           | 6,00 €   |

<!--## Plattformtjenester
Vi tilbyr full forvaltning av Kubernetes-miljøene dine, inkludert etterlevelse, med Compliant Kubernetes. I tillegg tilbys Managed Elasticsearch, NATS, MariaDB og Redis. Be om et tilbud i dag for å få tilgang til disse tjenestene!

| Product ID            | Beskrivelse                                           |          Månedlig |
|-----------------------|-------------------------------------------------------|------------------:|
| PAAS-man.kubernetes24 | Administrert Compliant Kubernetes 24/7                | Be om et tilbud   |
| PAAS-man.kubernetes8  | Administrert Compliant Kubernetes 8/5                 | Be om et tilbud   |
| PAAS-man.opensearch   | Administrert Opensearch (inkludert i Compliant Kubernetes) | Be om et tilbud   |
| PAAS-openshift        | Ingen støtte                                          | Be om et tilbud   |
| PAAS-man.nats         | Administrert NATS                                     | Be om et tilbud   |
| PAAS-man.mariadb      | Administrert MariaDB                                  | Be om et tilbud   |
| PAAS-man.redis        | Administrert Redis                                    | Be om et tilbud   |
-->

## Support og konsulenttjenester

{{< ingress >}}
Support gjelder for Safespring Compute, Safespring Storage og Safespring Backup.
{{< /ingress >}}

Se supportalternativer i [tjenestekatalogen](/service-catalogue/support/).

| Produkt-ID       | Beskrivelse                                                  | Fakturering per | Månedlig                 |
| ---------------- | ------------------------------------------------------------ | ---------------- | ------------------------ |
| SUPPORT-base     | Support for Safesprings tjenester                            | N/A              | 0,00 €                   |
| SUPPORT-standard | Tilgang til chattrom med support og ingeniørteam             | Totalt volum     | 3 % av totalvolumet [^5] |
| SUPPORT-premium  | Dedikert Service Manager med kvartalsvise driftsmøter        | Måned            | 2 140,00 €               |

<!--### Konsulenttjenester
Få tilgang til våre erfarne konsulenter og prosjektledere for å optimalisere skysinfrastrukturen din til konkurransedyktige priser, med junior-eksperter fra €100.43 per time og senior-eksperter opp til €122.38 per time.

| Product ID       | Beskrivelse                                                     | Fakturering per |  Månedlig |
|------------------|-----------------------------------------------------------------|-----------------|----------:|
| PS-consult.jun   | Konsulent, skysinfrastruktur, junior kompetansenivå             | Time            | 100,30 €  |
| PS-consult.sen   | Konsulent, skysinfrastruktur, senior kompetansenivå             | Time            | 122,29 €  |
| PS-cloudarch.jun | Arkitekt for skysinfrastruktur, junior kompetansenivå           | Time            | 113,65 €  |
| PS-cloudarch.sen | Arkitekt for skysinfrastruktur, senior kompetansenivå           | Time            | 122,29 €  |
| PS-pm.jun        | Prosjektleder, junior kompetansenivå                            | Time            | 101,37 €  |
| PS-pm.sen        | Prosjektleder, senior kompetansenivå                            | Time            | 122,29 €  |
-->

### Kurs

Safespring tilbyr flere kurs innen IaaS og skytjenester.  
Les kursbeskrivelsene i [tjenestekatalogen](/geant/service-catalogue/courses/).

| Produkt-ID                 | Beskrivelse                                   | Varighet | Fakturering per | Pris      |
| -------------------------- | --------------------------------------------- | -------- | ---------------- | --------- |
| COURSE-intro.iaas          | Introduksjon til "infrastruktur som en tjeneste" | Én dag   | Per gang         | 560,00 €  |
| COURSE-cxo.strategy        | Skystrategi for ledergrupper                  | Én dag   | Per gang         | 560,00 €  |
| COURSE-intro.cloud         | Introduksjon til infrastrukturteknologi for skyen | Fire dager | Per gang      | 2 230,00 €|
| COURSE-devops.microservices| Moderne DevOps og "mikrotjenester"            | Fire dager | Per gang       | 2 230,00 €|

---

### Merknader

[^1]: Deduplisering er en datareduksjon som gjøres i tjenesten. Avhengig av dataene varierer den vanligvis mellom 45 % - 90 %.

[^2]: Prisen er per beskyttet GB på klienten.

[^3]: Prisen er per GB lagret i tjenesten etter deduplisering og komprimering.

[^4]: Prisen er per GB lagret i tjenesten etter deduplisering og komprimering. Tjenesten inkluderer 1000 GB i den faste månedsprisen.

[^5]: Supportgebyret belastes med 3 % av totalvolumet, med et minimumsgebyr på 150 EUR per måned.