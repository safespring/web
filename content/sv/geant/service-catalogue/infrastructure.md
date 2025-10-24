---
ai: true
title: "Molnberäkningstjänst"
language: "sv"
cardtitle: "Molnberäkning"
cardicon: "fa-solid fa-server"
cardcolor: "#195F8C"
cardorder: "01"
date: "2025-01-20"
draft: false
intro: "På den här sidan hittar du information om våra molnberäkningstjänster inom Infrastructure as a Service (IaaS), inklusive detaljerade konfigurationer och kategorier av tillgängliga beräkningstjänster."
cardintro: "Med IaaS kan du skala din infrastruktur upp eller ner efter behov."
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tillbaka till alla kategorier"
sidebarlinkurl: "/geant/service-catalogue"
sidebarlinkname2: "Se pris för beräkningsresurser"
sidebarlinkurl2: "/geant/price/#safespring-compute"
section: "Ramverket OCRE 2024"
socialmedia: "/safespring-start.jpg"
toc: "På den här sidan"
noindex: "x"
aliases:
  - /geant/service-catalogue/infrastructure/
---

{{< ingress >}}
På den här sidan hittar du information om våra molnberäkningstjänster för Infrastructure as a Service (IaaS), inklusive detaljerade konfigurationer och kategorier av tillgängliga beräkningstjänster.
{{< /ingress >}}

Molnberäkningstjänsterna omfattar följande kategorier (OpenStack flavors):

- Beräkning med lokal NVMe-lagring (‘**L2**’)
- Beräkning (‘**B2**’)

Basdiskar är standardstorlekar för root-disk, om inte en volym med annan storlek anges när en avbild (image) distribueras. Tillfälliga diskar (ephemeral) är extra lokala lagringsenheter som är åtkomliga för en virtuell maskin på en viss hypervisor, för de flavor-typer där det är tillämpligt.

## Beräkning med lokal NVMe-lagring

Profilen för beräkning med lokal NVMe-disk finns med både 1:2- och 1:4-profiler för vCPU:RAM. Den erbjuder val av lokal, temporär NVMe-lagring. Termen ”ephemeral” betyder att lagringen har samma livslängd som instansen och endast lagras med en kopia på den lokala disken på den beräkningsnod där instansen körs. Detta gör instanserna väl lämpade för automatiserad uppsättning, där förlusten av en enskild instans enkelt kan hanteras med provisionering eller som klustermedlem för databaser eller Kubernetes-arbetsnoder.

### Förutsättningar

Inga.

### Konfigurationer

| Produktkod               | vCPU | Minne  | Tillfällig disk |
| ------------------------ | ---- | ------ | --------------- |
| FLAVOR-l2. c2 r4. 100    | 2    | 4 GiB  | 100 GB          |
| FLAVOR-l2. c2 r4. 500    | 2    | 4 GiB  | 500 GB          |
| FLAVOR-l2. c2 r4. 1000   | 2    | 4 GiB  | 1000 GB         |
| FLAVOR-l2. c4 r8. 100    | 4    | 8 GiB  | 100 GB          |
| FLAVOR-l2. c4 r8. 500    | 4    | 8 GiB  | 500 GB          |
| FLAVOR-l2. c4 r8. 1000   | 4    | 8 GiB  | 1000 GB         |
| FLAVOR-l2. c8 r16. 100   | 8    | 16 GiB | 100 GB          |
| FLAVOR-l2. c8 r16. 500   | 8    | 16 GiB | 500 GB          |
| FLAVOR-l2. c8 r16. 1000  | 8    | 16 GiB | 1000 GB         |
| FLAVOR-l2. c16 r32. 100  | 16   | 32 GiB | 100 GB          |
| FLAVOR-l2. c16 r32. 500  | 16   | 32 GiB | 500 GB          |
| FLAVOR-l2. c16 r32. 1000 | 16   | 32 GiB | 1000 GB         |
| FLAVOR-l2. c16 r64. 500  | 16   | 64 GiB | 500 GB          |
| FLAVOR-l2. c32 r64. 1000 | 32   | 64 GiB | 1000 GB         |

### Beräkning utan lokal lagring

Den grundläggande beräkningsprofilen finns med både 1:2- och 1:4-profiler för vCPU:RAM. Den har ingen temporär lagring och måste skapas med en bakomliggande volym från den centrala lagringstjänsten.

#### Förutsättningar

Inga.

#### Konfiguration

| Produktkod          | vCPU | Minne  |
| ------------------- | ---- | ------ |
| FLAVOR-b2. c1 r2    | 1    | 2 GiB  |
| FLAVOR-b2. c1 r4    | 1    | 4 GiB  |
| FLAVOR-b2. c2 r4    | 2    | 4 GiB  |
| FLAVOR- b2. c2 r8   | 2    | 8 GiB  |
| FLAVOR- b2. c4 r8   | 4    | 8 GiB  |
| FLAVOR- b2. c4 r16  | 4    | 16 GiB |
| FLAVOR- b2. c8 r16  | 8    | 16 GiB |
| FLAVOR- b2. c8 r32  | 8    | 32 GiB |
| FLAVOR- b2. c16 r32 | 16   | 32 GiB |
| FLAVOR- b2. c16 r64 | 16   | 64 GiB |

### Central blocklagring

Central blocklagring tillhandahålls av Ceph HDD- och SSD-kluster.

#### Förutsättningar

Serverinstans att ansluta volym till, inklusive som root-diskvolym.

#### Konfigurationer

| Produktkod      | Egenskaper                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| VOLUME-large    | HDD-baserad 3-replika Ceph                                                                                  |
| VOLUME-fast     | SSD-baserad 3-replika Ceph                                                                                  |
| VOLUME-snapshot | SDD eller HDD baserat på källan. Copy-on-write som endast sparar skillnaden från när ögonblicksbilden togs. |

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kontakta Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Försäljning:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}
