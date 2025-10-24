---
ai: true
title: "Skytjeneste til beregning"
language: "da"
cardtitle: "Beregning i skyen"
cardicon: "fa-solid fa-server"
cardcolor: "#195F8C"
cardorder: "01"
date: "2025-01-20"
draft: false
intro: "På denne side finder du oplysninger om vores IaaS-baserede cloud-computetjenester, herunder detaljerede konfigurationer og kategorier af tilgængelige computetjenester."
cardintro: "Med IaaS kan du skalere din infrastruktur op eller ned efter behov."
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tilbage til alle kategorier"
sidebarlinkurl: "/geant/service-catalogue"
sidebarlinkname2: "Se pris på beregningskapacitet"
sidebarlinkurl2: "/geant/price/#safespring-compute"
section: "OCRE 2024-rammeværk"
socialmedia: "/safespring-start.jpg"
toc: "På denne side"
noindex: "x"
aliases:
  - /geant/service-catalogue/infrastructure/
---

{{< ingress >}}
På denne side finder du information om vores Infrastructure as a Service (IaaS) cloud compute-tjenester, inklusive detaljerede konfigurationer og kategorier af tilgængelige compute-tjenester.
{{< /ingress >}}

Cloud compute-tjenesterne omfatter følgende kategorier (OpenStack-flavors):

- Compute med lokal NVMe-lagring (‘**L2**’)
- Compute (‘**B2**’)

Basisdiske er standardstørrelser for roddisken, medmindre der angives et volumen med en anden størrelse ved udrulning af et image. Ephemeral-diske er ekstra lokale lagringsenheder, som er tilgængelige for en virtuel maskine på en specifik hypervisor, for de flavor-typer hvor det er relevant.

## Compute med lokal NVMe-lagring

Compute-profilen med lokal NVMe-disk har både 1:2- og 1:4-profiler for vCPU:RAM-forhold. Den leveres med forskellige valg af lokal, ephemeral NVMe-lagring. Udtrykket ephemeral betyder, at lagringen har samme levetid som instansen og kun lagres med én kopi på den lokale disk på den compute-node, hvor instansen kører. Det gør instanserne velegnede til automatiseret opsætning, hvor tab af en enkelt instans let håndteres med provisioning eller som klustermedlem for databaser eller Kubernetes worker-noder.

### Forudsætninger

Ingen.

### Konfigurationer

| Produktkode              | vCPU | Hukommelse | Ephemeral-disk |
| ------------------------ | ---- | ---------- | -------------- |
| FLAVOR-l2. c2 r4. 100    | 2    | 4 GiB      | 100 GB         |
| FLAVOR-l2. c2 r4. 500    | 2    | 4 GiB      | 500 GB         |
| FLAVOR-l2. c2 r4. 1000   | 2    | 4 GiB      | 1000 GB        |
| FLAVOR-l2. c4 r8. 100    | 4    | 8 GiB      | 100 GB         |
| FLAVOR-l2. c4 r8. 500    | 4    | 8 GiB      | 500 GB         |
| FLAVOR-l2. c4 r8. 1000   | 4    | 8 GiB      | 1000 GB        |
| FLAVOR-l2. c8 r16. 100   | 8    | 16 GiB     | 100 GB         |
| FLAVOR-l2. c8 r16. 500   | 8    | 16 GiB     | 500 GB         |
| FLAVOR-l2. c8 r16. 1000  | 8    | 16 GiB     | 1000 GB        |
| FLAVOR-l2. c16 r32. 100  | 16   | 32 GiB     | 100 GB         |
| FLAVOR-l2. c16 r32. 500  | 16   | 32 GiB     | 500 GB         |
| FLAVOR-l2. c16 r32. 1000 | 16   | 32 GiB     | 1000 GB        |
| FLAVOR-l2. c16 r64. 500  | 16   | 64 GiB     | 500 GB         |
| FLAVOR-l2. c32 r64. 1000 | 32   | 64 GiB     | 1000 GB        |

### Compute uden lokal lagring

Den grundlæggende compute-profil leveres med både 1:2- og 1:4-profiler for vCPU:RAM-forhold. Den har ikke ephemeral-lagring og skal oprettes med et underliggende volumen fra den centrale lagringstjeneste.

#### Forudsætninger

Ingen.

#### Konfiguration

| Produktkode         | vCPU | Hukommelse |
| ------------------- | ---- | ---------- |
| FLAVOR-b2. c1 r2    | 1    | 2 GiB      |
| FLAVOR-b2. c1 r4    | 1    | 4 GiB      |
| FLAVOR-b2. c2 r4    | 2    | 4 GiB      |
| FLAVOR- b2. c2 r8   | 2    | 8 GiB      |
| FLAVOR- b2. c4 r8   | 4    | 8 GiB      |
| FLAVOR- b2. c4 r16  | 4    | 16 GiB     |
| FLAVOR- b2. c8 r16  | 8    | 16 GiB     |
| FLAVOR- b2. c8 r32  | 8    | 32 GiB     |
| FLAVOR- b2. c16 r32 | 16   | 32 GiB     |
| FLAVOR- b2. c16 r64 | 16   | 64 GiB     |

### Central bloklagring

Central bloklagring leveres af Ceph HDD- og SSD-klynger.

#### Forudsætninger

Serverinstans, der kan få tilknyttet et volumen, herunder som roddisk-volumen.

#### Konfigurationer

| Produktkode     | Egenskaber                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| VOLUME-large    | HDD-understøttet Ceph med 3 replikaer                                                                               |
| VOLUME-fast     | SSD-understøttet Ceph med 3 replikaer                                                                               |
| VOLUME-snapshot | SDD eller HDD baseret på kilde. Copy-on-write, som kun gemmer forskellen fra det tidspunkt, snapshot’et blev taget. |

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kom i kontakt med Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Salg:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}
