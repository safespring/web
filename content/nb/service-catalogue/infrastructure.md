---
ai: true
title: "Infrastruktur som en tjeneste (IaaS)"
language: "nb"
cardtitle: "Infrastruktur"
cardicon: "fa-solid fa-server"
cardcolor: "#195F8C"
cardorder: "01"
date: 2023-02-28
draft: false
intro: "Med IaaS kan du skalere infrastrukturen din opp eller ned etter behov."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nei"
sidebarlinkname: "Tilbake til alle kategorier"
sidebarlinkurl: "/service-catalogue"
section: "Safespring tjenestekatalog"
socialmedia: "/safespring-start.jpg"
toc: "På denne siden"
aliases:
  - /service-catalogue/infrastructure/
---

{{< ingress >}}
På denne siden finner du informasjon om våre Infrastructure as a Service (IaaS) cloud compute-tjenester, inkludert detaljerte konfigurasjoner og kategorier av compute-tjenester som er tilgjengelige.
{{< /ingress >}}

Cloud compute-tjenester inneholder følgende kategorier (OpenStack flavors):

1. [Grunnleggende compute](#1-basic-compute)
1. [Minneoptimalisert compute](#2-memory-optimized-compute)
1. [Grunnleggende compute med lokal NVMe-disk](#3-basic-compute-with-local-nvme-disk)
1. [Minneoptimalisert compute med GPU og lokal NVMe-disk](#5-memory-optimized-compute-with-gpu-and-local-nvme-disk)
1. [Bare metal-compute](#6-bare-metal-compute)

Basisdisker er standard rotdiskstørrelser med mindre et volum med en annen størrelse spesifiseres ved utrulling av et image. Ephemeral-disker er ekstra lokale lagringsenheter tilgjengelige for en virtuell maskin på en bestemt hypervisor, for de flavor-typene der det er aktuelt.

{{% note "Større flavors" %}}
Hvis du ikke har funnet den ideelle flavoren for tjenesten din, ikke bekymre deg! Vi tilbyr en rekke større flavors som ikke er tilgjengelige på plattformen for øyeblikket. For mer informasjon, ta kontakt med Safespring på [hello@safespring.com](mailto:hello@safespring.com).
{{% /note %}}

## 1. Grunnleggende compute

Den grunnleggende compute-profilen tilbyr et vCPU-til-RAM-forhold på 1:2, som betyr at for hver virtuelle CPU som tildeles, er det to gigabyte RAM tilgjengelig. Denne profilen har Hyper-Threading deaktivert på hypervisorene og inkluderer ikke ephemeral-lagring. I tillegg er CPU-overprovisjoneringen begrenset til maks 1:4, slik at det ikke er mer enn fire ganger så mange virtuelle CPU-er som fysiske CPU-er tilgjengelig på verten.

### 1.1. Forutsetninger

Ingen.

### 1.2. Konfigurasjoner

| Produktkode        | vCPU | RAM (GB) | Lokal disk (GB) |
| ------------------ | ---- | -------- | --------------- |
| FLAVOR-b2. c1 r2   | 1    | 2        | 0               |
| FLAVOR-b2. c2 r4   | 2    | 4        | 0               |
| FLAVOR-b2 .c4 r8   | 4    | 8        | 0               |
| FLAVOR-b2. c8 r16  | 8    | 16       | 0               |
| FLAVOR-b2. c16 r32 | 16   | 32       | 0               |

## 2. Minneoptimalisert compute

Den minneoptimaliserte compute-profilen gir et vCPU-til-RAM-forhold på 1:4, som betyr at for hver virtuelle CPU som tildeles, er det fire gigabyte RAM tilgjengelig. Denne profilen har også Hyper-Threading deaktivert på hypervisorene og inkluderer ikke ephemeral-lagring. I tillegg er CPU-overprovisjoneringen begrenset til maks 1:6, slik at det ikke er mer enn seks ganger så mange virtuelle CPU-er som fysiske CPU-er tilgjengelig på verten.

### 2.1. Forutsetninger

Ingen.

### 2.2. Konfigurasjoner

| Produktkode        | vCPU | RAM (GB) | Lokal disk (GB) |
| ------------------ | ---- | -------- | --------------- |
| FLAVOR-b2. c1 r4   | 1    | 4        | 0               |
| FLAVOR-b2. c2 r8   | 2    | 8        | 0               |
| FLAVOR-b2. c4 r16  | 4    | 16       | 0               |
| FLAVOR-b2. c8 r32  | 8    | 32       | 0               |
| FLAVOR-b2. c16 r64 | 16   | 64       | 0               |

## 3. Grunnleggende compute med lokal NVMe-disk

Profilen for grunnleggende compute med lokal NVMe-disk tilbyr et vCPU-til-RAM-forhold på 1:2, som betyr at for hver virtuelle CPU som tildeles, er det to gigabyte RAM tilgjengelig. Denne profilen inkluderer lokal ephemeral NVMe-lagring. CPU-overprovisjoneringen er satt til maks 1:3, som betyr at det kan være opptil tre virtuelle CPU-er for hver fysiske CPU tilgjengelig på verten.

### 3.1. Forutsetninger

Ingen.

### 3.2. Konfigurasjoner

| Produktkode              | vCPU | RAM (GB) | Lokal disk (GB) |
| ------------------------ | ---- | -------- | --------------- |
| FLAVOR-l2. c2 r4. 100    | 2    | 4        | 100             |
| FLAVOR-l2. c2 r4. 500    | 2    | 4        | 500             |
| FLAVOR-l2. c2 r4. 1000   | 2    | 4        | 1 000           |
| FLAVOR-l2. c4 r8. 100    | 4    | 8        | 100             |
| FLAVOR-l2. c4 r8. 500    | 4    | 8        | 500             |
| FLAVOR-l2. c4 r8. 1000   | 4    | 8        | 1 000           |
| FLAVOR-l2. c8 r16. 100   | 8    | 16       | 100             |
| FLAVOR-l2. c8 r16. 500   | 8    | 16       | 500             |
| FLAVOR-l2. c8 r16. 1000  | 8    | 16       | 1 000           |
| FLAVOR-l2. c16 r32. 100  | 16   | 32       | 100             |
| FLAVOR-l2. c16 r32. 500  | 16   | 32       | 500             |
| FLAVOR-l2. c16 r32. 1000 | 16   | 32       | 1 000           |
| FLAVOR-l2. c32 r64.1000  | 32   | 64       | 1 000           |

## 4. Compute med GPU og lokal NVME-disk

Den minneoptimaliserte compute-profilen med lokal NVME-disk har et vCPU:RAM-forhold på 1:4. Den leveres med lokal ephemeral NVME-lagring. CPU-overprovisjoneringen er 1:1. Det lokale lageret er IOPS-provisjonert.

### 4.1. Forutsetninger

Ingen.

### 4.2. Konfigurasjoner

| Produktkode             | vCPU | RAM (GB) | Lokal disk (GB) | GPU (A2) |
| ----------------------- | :--: | :------: | --------------: | :------: |
| FLAVOR-l2.c4r16.125.gA2 |  4   |    16    |             125 |    1     |
| FLAVOR-l2.c8r32.250.gA2 |  8   |    32    |             250 |    1     |
| FLAVOR-b2.c4r8.gA2      |  4   |    8     |               0 |    1     |
| FLAVOR-b2.c8r16.gA2     |  8   |    16    |               0 |    1     |

| Produktkode              | Instanstype    | vCPU | Minne  | Basisdisk | Provisjonerte IOPs (les/skriv) |
| ------------------------ | -------------- | ---- | ------ | --------- | ------------------------------ |
| FLAVOR-g2 .c4 r8. 100    | g2.c4r8.100    | 4    | 16 GiB | 100 GB    | 4k/8k, 8.5k/17k                |
| FLAVOR-g2 .c8 r32. 500   | g2.c8r32.500   | 8    | 32 GiB | 500 GB    | 4k/8k, 21k/42k                 |
| FLAVOR-g2 .c16 r64. 1000 | g2.c16r64.1000 | 16   | 64 GiB | 1000 GB   | 4k/8k, 46k/92k                 |

## 5. Bare metal-compute

Bare metal-compute er en provisjonert fysisk server. Kun de leverte OS-images er fullt støttet, men dokumentasjon om hvordan du forbereder et OS-image for bare metal-serveren er også tilgjengelig. Hvis bestillinger overstiger tilgjengelig kapasitet, avhenger leveringstiden av leverandørens maskinvareleveranser.

### 5.1. Forutsetninger

Ingen.

### 5.2. Konfigurasjoner

| Produktkode               | Instanstype     | CPU (fysiske kjerner) | Minne   | NVMe-disk  |
| ------------------------- | --------------- | --------------------- | ------- | ---------- |
| FLAVOR-p1. c16 r128. 4000 | p1.c16r128.4000 | 16                    | 128 GiB | 3,8 TB     |
| FLAVOR-p1. c32 r256. 4000 | p1.c32r256.4000 | 32                    | 256 GiB | 3,8 TB     |
| FLAVOR-p1. c64 r512. 8000 | p1.c64r512.8000 | 2 x 32                | 512 GiB | 2 x 3,8 TB |

## 6. Volumlager

Vi leverer volumlager gjennom Ceph-klynger som består av både HDD- og SSD-lagring.

### 6.1. Forutsetninger

Du kan koble et volum til en serverinstans, også som et rotdiskvolum.

### 6.2. Konfigurasjoner

| Produktkode     | Volumtype         | Lokasjon | Egenskaper                      |
| --------------- | ----------------- | -------- | ------------------------------- |
| VOLUME-fast     | Fast              | osl1     | SSD-basert Ceph med 3 replikaer |
| VOLUME-large    | Large             | osl1     | HDD-basert Ceph med 3 replikaer |
| VOLUME-fast     | Fast              | sto1     | SSD-basert Ceph med 3 replikaer |
| VOLUME-large    | Large             | sto1     | HDD-basert Ceph med 3 replikaer |
| VOLUME-snapshot | Snapshot av image | -        | -                               |
