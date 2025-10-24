---
ai: true
title: "Infrastruktur som tjänst (IaaS)"
language: "sv"
cardtitle: "Infrastruktur"
cardicon: "fa-solid fa-server"
cardcolor: "#195F8C"
cardorder: "01"
date: 2023-02-28
draft: false
intro: "Med IaaS kan du skala din infrastruktur upp eller ned efter behov."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tillbaka till alla kategorier"
sidebarlinkurl: "/service-catalogue"
section: "Safesprings tjänstekatalog"
socialmedia: "/safespring-start.jpg"
toc: "På den här sidan"
aliases:
  - /service-catalogue/infrastructure/
---

{{< ingress >}}
På den här sidan hittar du information om våra Infrastructure as a Service (IaaS) molncompute-tjänster, inklusive detaljerade konfigurationer och kategorier av tillgängliga compute-tjänster.
{{< /ingress >}}

Molncompute-tjänsterna omfattar följande kategorier (OpenStack flavors):

1. [Grundläggande compute](#1-basic-compute)
1. [Minnesoptimerad compute](#2-memory-optimized-compute)
1. [Grundläggande compute med lokal NVMe-disk](#3-basic-compute-with-local-nvme-disk)
1. [Minnesoptimerad compute med GPU och lokal NVMe-disk](#5-memory-optimized-compute-with-gpu-and-local-nvme-disk)
1. [Bare metal-beräkning](#6-bare-metal-compute)

Basdiskar är standardstorleken för rotdisk om inte en volym med annan storlek anges när en avbild distribueras. Ephemeral-diskar är extra lokala lagringsenheter som är åtkomliga för en virtuell maskin på en specifik hypervisor, för de flavor-typer där det är tillämpligt.

{{% note "Större flavors" %}}
Om du inte hittat den idealiska flavor:n för din tjänst, ingen fara! Vi erbjuder ett utbud av större flavors som för närvarande inte finns tillgängliga på plattformen. För mer information, kontakta Safespring på [hello@safespring.com](mailto:hello@safespring.com).
{{% /note %}}

## 1. Grundläggande Compute

Profilen för grundläggande compute erbjuder ett förhållande 1:2 mellan vCPU och RAM, vilket innebär att för varje virtuell CPU som allokeras finns två gigabyte RAM tillgängligt. Denna profil har HyperThreading inaktiverat på hypervisorerna och inkluderar inte temporär lagring (ephemeral). Dessutom är CPU-överbokningsförhållandet begränsat till högst 1:4, vilket säkerställer att antalet virtuella CPU:er inte överstiger fyra gånger antalet fysiska CPU:er på värden.

### 1.1. Förutsättningar

Inga.

### 1.2. Konfigurationer

| Produktkod         | vCPU | RAM (GB) | Lokal disk (GB) |
| ------------------ | ---- | -------- | --------------- |
| FLAVOR-b2. c1 r2   | 1    | 2        | 0               |
| FLAVOR-b2. c2 r4   | 2    | 4        | 0               |
| FLAVOR-b2 .c4 r8   | 4    | 8        | 0               |
| FLAVOR-b2. c8 r16  | 8    | 16       | 0               |
| FLAVOR-b2. c16 r32 | 16   | 32       | 0               |

## 2. Minnesoptimerad Compute

Profilen för minnesoptimerad compute ger ett förhållande 1:4 mellan vCPU och RAM, vilket innebär att för varje virtuell CPU som allokeras finns fyra gigabyte RAM tillgängligt. Även här är HyperThreading inaktiverat på hypervisorerna och temporär lagring ingår inte. Dessutom är CPU-överbokningsförhållandet begränsat till högst 1:6, vilket säkerställer att antalet virtuella CPU:er inte överstiger sex gånger antalet fysiska CPU:er på värden.

### 2.1. Förutsättningar

Inga.

### 2.2. Konfigurationer

| Produktkod         | vCPU | RAM (GB) | Lokal disk (GB) |
| ------------------ | ---- | -------- | --------------- |
| FLAVOR-b2. c1 r4   | 1    | 4        | 0               |
| FLAVOR-b2. c2 r8   | 2    | 8        | 0               |
| FLAVOR-b2. c4 r16  | 4    | 16       | 0               |
| FLAVOR-b2. c8 r32  | 8    | 32       | 0               |
| FLAVOR-b2. c16 r64 | 16   | 64       | 0               |

## 3. Grundläggande Compute med lokal NVMe-disk

Profilen för grundläggande compute med lokal NVMe-disk erbjuder ett förhållande 1:2 mellan vCPU och RAM, vilket innebär att för varje virtuell CPU som allokeras finns två gigabyte RAM tillgängligt. Denna profil inkluderar lokala temporära NVMe-lagringsalternativ. CPU-överbokningsförhållandet är satt till högst 1:3, vilket innebär att det kan finnas upp till tre virtuella CPU:er för varje fysisk CPU på värden.

### 3.1. Förutsättningar

Inga.

### 3.2. Konfigurationer

| Produktkod               | vCPU | RAM (GB) | Lokal disk (GB) |
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

## 4. Compute med GPU och lokal NVMe-disk

Den minnesoptimerade compute-profilen med lokal NVMe-disk har ett förhållande 1:4 mellan vCPU och RAM. Den levereras med lokal temporär NVMe-lagring. CPU-överbokningsförhållandet är 1:1. Den lokala lagringen är IOPS-provisionerad.

### 4.1. Förutsättningar

Inga.

### 4.2. Konfigurationer

| Produktkod              | vCPU | RAM (GB) | Lokal disk (GB) | GPU (A2) |
| ----------------------- | :--: | :------: | --------------: | :------: |
| FLAVOR-l2.c4r16.125.gA2 |  4   |    16    |             125 |    1     |
| FLAVOR-l2.c8r32.250.gA2 |  8   |    32    |             250 |    1     |
| FLAVOR-b2.c4r8.gA2      |  4   |    8     |               0 |    1     |
| FLAVOR-b2.c8r16.gA2     |  8   |    16    |               0 |    1     |

| Produktkod               | Instanstyp     | vCPU | Minne  | Basdisk | Provisionerade IOPs (R/W) |
| ------------------------ | -------------- | ---- | ------ | ------- | ------------------------- |
| FLAVOR-g2 .c4 r8. 100    | g2.c4r8.100    | 4    | 16 GiB | 100 GB  | 4k/8k, 8.5k/17k           |
| FLAVOR-g2 .c8 r32. 500   | g2.c8r32.500   | 8    | 32 GiB | 500 GB  | 4k/8k, 21k/42k            |
| FLAVOR-g2 .c16 r64. 1000 | g2.c16r64.1000 | 16   | 64 GiB | 1000 GB | 4k/8k, 46k/92k            |

## 5. Bare metal-beräkning

Bare metal-compute är en provisionerad fysisk server. Endast de tillhandahållna OS-avbildningarna stöds fullt ut, men dokumentation om hur man förbereder en OS-avbildning för bare metal-servern tillhandahålls också. Om beställningen överstiger tillgänglig kapacitet beror leveranstiderna på leverantörernas hårdvaruleveranstider.

### 5.1. Förutsättningar

Inga.

### 5.2. Konfigurationer

| Produktkod                | Instanstyp      | CPU (p)kärnor | Minne   | NVMe-disk  |
| ------------------------- | --------------- | ------------- | ------- | ---------- |
| FLAVOR-p1. c16 r128. 4000 | p1.c16r128.4000 | 16            | 128 GiB | 3,8 TB     |
| FLAVOR-p1. c32 r256. 4000 | p1.c32r256.4000 | 32            | 256 GiB | 3,8 TB     |
| FLAVOR-p1. c64 r512. 8000 | p1.c64r512.8000 | 2 x 32        | 512 GiB | 2 x 3,8 TB |

## 6. Volymlagring

Vi tillhandahåller volymlagring via Ceph-kluster bestående av både HDD- och SSD-lagring.

### 6.1. Förutsättningar

Du kan ansluta en volym till en serverinstans, inklusive som en rotdiskvolym.

### 6.2. Konfigurationer

| Produktkod      | Volymtyp           | Site | Egenskaper                      |
| --------------- | ------------------ | ---- | ------------------------------- |
| VOLUME-fast     | Fast               | osl1 | SSD-baserad Ceph med 3 repliker |
| VOLUME-large    | Large              | osl1 | HDD-baserad Ceph med 3 repliker |
| VOLUME-fast     | Fast               | sto1 | SSD-baserad Ceph med 3 repliker |
| VOLUME-large    | Large              | sto1 | HDD-baserad Ceph med 3 repliker |
| VOLUME-snapshot | Snapshot av avbild | -    | -                               |
