---
ai: true
section: "OCRE 2024-rammeværk"
language: "da"
title: "Prisliste og prisberegner"
date: "2025-01-20"
draft: false
tags: ""
showthedate: false
pageimage: ""
intro: "Sammen skaber vi en sikrere og mere omkostningseffektiv digital infrastruktur."
toc: "Prisliste"
nosidebar: ""
sidebarlinkname: "Hent prisliste"
sidebarlinkurl: "/pricelist/geant/geant_safespring_pricelist.xlsx"
sidebarlinkname2: "Servicekatalog"
sidebarlinkurl2: "/geant/service-catalogue/"
noindex: "x"
aliases:
  - /geant/price/
---
{{% note "Information" %}}
Alle priser er i EUR, ekskl. moms. For en samlet prisliste i SEK, NOK, EUR og DKR, [download prislisten i Excel-format](/pricelist/geant/geant_safespring_pricelist.xlsx).
{{% /note %}}

## Safespring Compute

{{< ingress >}}
Infrastruktur som en tjeneste kan køre på en open source-licens eller med en Windows-licens.
{{< /ingress >}}

### Instanstyper med lokal NVMe-lagring

Central bloklagring kan tilkøbes til instanserne. Se "Central bloklagring" i prislisten.
Se konfigurationer for instanstyper med lokal NVMe-lagring i [servicekataloget](/geant/service-catalogue/infrastructure/#configurations).

| Produkt-ID               | vCPU | RAM (GB) | Lokal disk (GB) | Timepris | 30 dage  |
| ------------------------ | ---- | -------- | --------------- | -------- | -------- |
| FLAVOR-l2. c2 r4. 100    | 2    | 4        | 100             | 0,06 €   | 42,72 €  |
| FLAVOR-l2. c2 r4. 500    | 2    | 4        | 500             | 0,11 €   | 78,32 €  |
| FLAVOR-l2. c2 r4. 1000   | 2    | 4        | 1 000           | 0,17 €   | 122,82 € |
| FLAVOR-l2. c4 r8. 100    | 4    | 8        | 100             | 0,11 €   | 76,54 €  |
| FLAVOR-l2. c4 r8. 500    | 4    | 8        | 500             | 0,16 €   | 112,14 € |
| FLAVOR-l2. c4 r8. 1000   | 4    | 8        | 1 000           | 0,22 €   | 156,64 € |
| FLAVOR-l2. c8 r16. 100   | 8    | 16       | 100             | 0,20 €   | 144,18 € |
| FLAVOR-l2. c8 r16. 500   | 8    | 16       | 500             | 0,25 €   | 179,78 € |
| FLAVOR-l2. c8 r16. 1000  | 8    | 16       | 1 000           | 0,31 €   | 224,28 € |
| FLAVOR-l2. c16 r32. 100  | 16   | 32       | 100             | 0,39 €   | 279,46 € |
| FLAVOR-l2. c16 r32. 500  | 16   | 32       | 500             | 0,44 €   | 315,06 € |
| FLAVOR-l2. c16 r32. 1000 | 16   | 32       | 1 000           | 0,50 €   | 359,56 € |
| FLAVOR-l2. c16 r64. 500  | 16   | 64       | 500             | 0,66 €   | 471,70 € |
| FLAVOR-l2. c32 r64. 1000 | 32   | 64       | 1 000           | 0,88 €   | 630,12 € |

### Instanstyper uden lokal lagring

Central bloklagring kan tilkøbes til instanserne. Se "Central bloklagring" i prislisten.
Se konfigurationer for instanstyper uden lokal lagring i [servicekataloget](/geant/service-catalogue/infrastructure/#compute-without-local-storage).

| Produkt-ID         | vCPU | RAM (GB) | Lokal disk (GB) | Timepris | 30 dage  |
| ------------------ | ---- | -------- | --------------- | -------- | -------- |
| FLAVOR-b2. c1 r2   | 1    | 2        | 0               | 0,02 €   | 16,91 €  |
| FLAVOR-b2. c1 r4   | 1    | 4        | 0               | 0,04 €   | 26,70 €  |
| FLAVOR-b2. c2 r4   | 2    | 4        | 0               | 0,05 €   | 33,82 €  |
| FLAVOR-b2. c2 r8   | 2    | 8        | 0               | 0,07 €   | 53,40 €  |
| FLAVOR-b2 .c4 r8   | 4    | 8        | 0               | 0,09 €   | 67,64 €  |
| FLAVOR-b2. c4 r16  | 4    | 16       | 0               | 0,15 €   | 106,80 € |
| FLAVOR-b2. c8 r16  | 8    | 16       | 0               | 0,19 €   | 135,28 € |
| FLAVOR-b2. c8 r32  | 8    | 32       | 0               | 0,30 €   | 213,60 € |
| FLAVOR-b2. c16 r32 | 16   | 32       | 0               | 0,38 €   | 270,56 € |
| FLAVOR-b2. c16 r64 | 16   | 64       | 0               | 0,59 €   | 427,20 € |

### Central bloklagring

Central bloklagring leverer tre kopier af data fordelt i en robust CEPH-klynge.
Se konfigurationer i [servicekataloget](/geant/service-catalogue/infrastructure/#central-block-storage).

| Produkt-ID      | Beskrivelse                | Timepris  | 30 dage  |
| --------------- | -------------------------- | --------- | -------- |
| VOLUME-large    | HDD-baseret Ceph med 3 replikaer | 0,0001 € | 0,1068 € |
| VOLUME-fast     | SSD-baseret Ceph med 3 replikaer | 0,0004 € | 0,3204 € |
| VOLUME-snapshot | Snapshot af image          | 0,0001 €  | 0,1068 € |

{{< distance >}}

## Safespring Storage (S3)

{{< ingress >}}
Kontakt os for rabatter ved større lagermængder. Pris­modellen er baseret på antallet af lagrede TB pr. måned.
{{< /ingress >}}

Se konfigurationer for objektlagring i [servicekataloget](/geant/service-catalogue/storage/#configurations).

| Produkt-ID | Per TB i 30 dage |
| ---------- | ---------------- |
| S3-archive | 31,15 €          |
| S3-storage | 44,50 €          |

{{< distance >}}

## Safespring Backup

{{< ingress >}}
Cloud-backupløsning til on-prem eller cloudservere baseret på Spectrum Protect (TSM).
{{< /ingress >}}

Safespring Backup tilbyder datanedbringningsteknologi[^1] i tjenesten, som typisk reducerer datamængden med 45–90 %. Prisen fastsættes pr. beskyttet GB på klienten og pr. lagret GB i tjenesten efter deduplikering og komprimering. Derudover er 1 TB inkluderet i den faste månedlige pris for BAAS-small.

Se konfigurationer for backup i [servicekataloget](/geant/service-catalogue/backup/#configurations).

{{% accordion title="Hvilken plan er bedst?" %}}

| Dataforbrug (GB) | Mest omkostningseffektive tjeneste |
| ---------------- | ----------------------------------- |
| 0 - 5 000        | Backup on Demand                    |
| 5 001 - 7 000    | Backup Small                        |
| 7 001            | Backup Large                        |

{{% /accordion %}}
{{< accordion-script >}}

| Produkt-ID         | Fast månedlig pris | Pr. GB / 30 dage |
| ------------------ | ------------------ | ---------------- |
| BAAS-on.demand[^2] | N/A                | 0,22 €           |
| BAAS-small[^3]     | 490 €              | 0,16 €           |
| BAAS-large[^4]     | 846 €              | 0,08 €           |

## Netværk og software

{{< ingress >}}
Safespring tilbyder forskellige software og licenser, der kan køre oven på Safesprings cloudplatform.
{{< /ingress >}}

### Netværk

Safespring tilbyder flere netværkstjenester.  
Se netværksalternativer i [servicekataloget](/geant/service-catalogue/network/).

| Produkt-ID   | Type                       | Beskrivelse                               | Fakturering pr. | Månedligt |
| ------------ | -------------------------- | ----------------------------------------- | --------------- | --------- |
| NET-publicv4 | IPv4                       | Offentlig                                 | IP-adresse      | 2,23 €    |
| NET-publicv6 | IPv6                       | Offentlig                                 | N/A             | 0,00 €    |
| NET-ingress  | Dataoverførsel             |                                           | N/A             | 0,00 €    |
| NET-egress   | Dataoverførsel             |                                           | N/A             | 0,00 €    |
| NET-mgn.slb  | Managed SLB                | Load balancer baseret på to `l2.c4.r8.100` | Instans         | 186,00 €  |
| NET-rdns     | Reverse DNS-navne          |                                           | N/A             | 0,00 €    |
| NET-byoip    | Medbring egne IP-præfikser |                                           | N/A             | 0,00 €    |

### Software og licenser

Safespring tilbyder flere software og licenser.  
Se tredjepartssoftwarelicenser i [servicekataloget](/geant/service-catalogue/third-party-software-licenses/).

| Produkt-ID        | Beskrivelse                      | Fakturering pr. | Månedligt |
| ----------------- | -------------------------------- | --------------- | --------- |
| SW-win.ser.2022   | Microsoft Windows Server         | vCPU            | 15,58 €   |
| SW-ms.sql.ser     | Microsoft SQL Server Standard    | vCPU            | 109,38 €  |
| SW-ms.sql.ser.ent | Microsoft SQL Server Enterprise  | vCPU            | 424,17 €  |
| SW-nextcloud      | Nextcloud Hub                    | Konto           | 6,00 €    |

<!--## Platform Services
Vi tilbyder komplet drift af dine Kubernetes-miljøer, inklusive regulatorisk compliance, med Compliant Kubernetes. Derudover tilbydes Managed Elasticsearch, NATS, MariaDB og Redis. Anmod om et tilbud i dag for at få adgang til disse tjenester!

| Product ID            | Beskrivelse                                            |         Månedligt |
|-----------------------|--------------------------------------------------------|------------------:|
| PAAS-man.kubernetes24 | Administreret Compliant Kubernetes 24/7                | Få et tilbud      |
| PAAS-man.kubernetes8  | Administreret Compliant Kubernetes 8/5                 | Få et tilbud      |
| PAAS-man.opensearch   | Administreret Opensearch (inkluderet i Compliant Kubernetes) | Få et tilbud |
| PAAS-openshift        | Ingen support                                          | Få et tilbud      |
| PAAS-man.nats         | Administreret NATS                                     | Få et tilbud      |
| PAAS-man.mariadb      | Administreret MariaDB                                  | Få et tilbud      |
| PAAS-man.redis        | Administreret Redis                                    | Få et tilbud      |
-->

## Support og konsulentydelser

{{< ingress >}}
Support gælder for Safespring Compute, Safespring Storage og Safespring Backup.
{{< /ingress >}}

Se supportalternativer i [servicekataloget](/service-catalogue/support/).

| Produkt-ID       | Beskrivelse                                                 | Fakturering pr. | Månedligt                |
| ---------------- | ----------------------------------------------------------- | --------------- | ------------------------ |
| SUPPORT-base     | Support til Safesprings tjenester                           | N/A             | 0,00 €                   |
| SUPPORT-standard | Adgang til chatrum med support og teknikere                 | Samlet volumen  | 3 % af samlet volumen [^5] |
| SUPPORT-premium  | Dedikeret Service Manager med kvartalsvise driftsmøder     | Måned           | 2 140,00 €               |

<!--### Consulting Services
Få adgang til vores erfarne konsulenter og projektledere for at optimere din cloudinfrastruktur til konkurrencedygtige priser, med junior-eksperter fra 100,43 € i timen og senior-eksperter op til 122,38 € i timen.

| Product ID       | Beskrivelse                                                      | Fakturering pr. |  Månedligt |
|------------------|------------------------------------------------------------------|-----------------|-----------:|
| PS-consult.jun   | Cloudinfrastruktur-konsulent, junior-erfaringsniveau            | Time            | 100,30 €   |
| PS-consult.sen   | Cloudinfrastruktur-konsulent, senior-erfaringsniveau            | Time            | 122,29 €   |
| PS-cloudarch.jun | Cloudinfrastruktur-arkitekt, junior-erfaringsniveau             | Time            | 113,65 €   |
| PS-cloudarch.sen | Cloudinfrastruktur-arkitekt, senior-erfaringsniveau             | Time            | 122,29 €   |
| PS-pm.jun        | Projektleder, junior-erfaringsniveau                            | Time            | 101,37 €   |
| PS-pm.sen        | Projektleder, senior-erfaringsniveau                            | Time            | 122,29 €   |
-->

### Uddannelser

Safespring tilbyder flere kurser i IaaS og cloudtjenester.  
Læs kursusbeskrivelserne i [servicekataloget](/geant/service-catalogue/courses/).

| Produkt-ID                  | Beskrivelse                                      | Varighed | Fakturering pr. | Pris       |
| --------------------------- | ------------------------------------------------ | -------- | ---------------- | ---------- |
| COURSE-intro.iaas           | Introduktion til "infrastruktur som en tjeneste" | En dag   | Arrangement      | 560,00 €   |
| COURSE-cxo.strategy         | Cloudstrategi for ledelsesteams                  | En dag   | Arrangement      | 560,00 €   |
| COURSE-intro.cloud          | Introduktion til cloudinfrastruktur-teknologi    | Fire dage | Arrangement     | 2 230,00 € |
| COURSE-devops.microservices | Moderne DevOps og "mikroservices"                | Fire dage | Arrangement     | 2 230,00 € |

---

### Noter

[^1]: Deduplikering er en datanedbringelse, der udføres i tjenesten. Afhængigt af data varierer den typisk mellem 45 % og 90 %.

[^2]: Prisen er pr. beskyttet GB på klienten.

[^3]: Prisen er pr. GB lagret i tjenesten efter deduplikering og komprimering.

[^4]: Prisen er pr. GB lagret i tjenesten efter deduplikering og komprimering. Tjenesten inkluderer 1000 GB i den faste månedlige pris.

[^5]: Supportgebyret opkræves med 3 % af den samlede volumen med et minimumsgebyr på 150 EUR pr. måned.