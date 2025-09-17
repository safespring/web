---
ai: true
title: "Infrastruktur som en service (IaaS)"
language: "da"
cardtitle: "Infrastruktur"
cardicon: "fa-solid fa-server"
cardcolor: "#195F8C"
cardorder: "01"
date: 2023-02-28
draft: false
intro: "Med IaaS kan du skalere din infrastruktur op eller ned efter behov."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tilbage til alle kategorier"
sidebarlinkurl: "/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Safespring Servicekatalog"
socialmedia: "/safespring-start.jpg"
toc: "På denne side"
aliases:
- /service-catalogue/infrastructure/
---
{{< ingress >}}
På denne side finder du information om vores Infrastructure as a Service (IaaS) cloud-compute-tjenester, inklusive detaljerede konfigurationer og kategorier af compute-tjenester, der er tilgængelige.
{{< /ingress >}}

Cloud-compute-tjenester omfatter følgende kategorier (OpenStack-flavors):

1. [Grundlæggende compute](#1-basic-compute)
1. [Hukommelsesoptimeret compute](#2-memory-optimized-compute)
1. [Grundlæggende compute med lokal NVMe-disk](#3-basic-compute-with-local-nvme-disk)
1. [Hukommelsesoptimeret compute med GPU og lokal NVMe-disk](#5-memory-optimized-compute-with-gpu-and-local-nvme-disk)
1. [Bare-metal-compute](#6-bare-metal-compute)

Basisdiske er standardstørrelser for root-diske, medmindre der angives et volume med en anden størrelse ved udrulning af et image. Midlertidige diske (ephemeral) er ekstra lokale lagringsenheder, der er tilgængelige for en virtuel maskine på en specifik hypervisor, for de flavor-typer hvor det er relevant.

{{% note "Større flavors" %}}
Hvis du ikke har fundet den ideelle flavor til din tjeneste, så bare rolig! Vi tilbyder en række større flavors, som i øjeblikket ikke er tilgængelige på platformen. For at høre mere, kontakt Safespring på [hello@safespring.com](mailto:hello@safespring.com).
{{% /note %}}

## 1. Grundlæggende compute

Den grundlæggende compute-profil tilbyder et vCPU-til-RAM-forhold på 1:2, hvilket betyder, at for hver virtuel CPU der allokeres, er der to gigabyte RAM tilgængeligt. Denne profil har HyperThreading deaktiveret på hypervisorerne og inkluderer ikke midlertidig (ephemeral) lagring. Derudover er CPU-overbookningsforholdet begrænset til maksimalt 1:4, hvilket sikrer, at der ikke er mere end fire gange så mange virtuelle CPU’er som fysiske CPU’er tilgængelige på værten.

### 1.1. Forudsætninger

Ingen.

### 1.2. Konfigurationer

| Produktkode        | vCPU | RAM (GB) | Lokal disk (GB) |
| ------------------ | ---- | -------- | --------------- |
| FLAVOR-b2. c1 r2   | 1    | 2        | 0               |
| FLAVOR-b2. c2 r4   | 2    | 4        | 0               |
| FLAVOR-b2 .c4 r8   | 4    | 8        | 0               |
| FLAVOR-b2. c8 r16  | 8    | 16       | 0               |
| FLAVOR-b2. c16 r32 | 16   | 32       | 0               |

## 2. Hukommelsesoptimeret compute

Den hukommelsesoptimerede compute-profil giver et vCPU-til-RAM-forhold på 1:4, hvilket betyder, at for hver virtuel CPU der allokeres, er der fire gigabyte RAM tilgængeligt. Denne profil har også HyperThreading deaktiveret på hypervisorerne og inkluderer ikke midlertidig lagring. Derudover er CPU-overbookningsforholdet begrænset til maksimalt 1:6, hvilket sikrer, at der ikke er mere end seks gange så mange virtuelle CPU’er som fysiske CPU’er tilgængelige på værten.

### 2.1. Forudsætninger

Ingen.

### 2.2. Konfigurationer

| Produktkode        | vCPU | RAM (GB) | Lokal disk (GB) |
| ------------------ | ---- | -------- | --------------- |
| FLAVOR-b2. c1 r4   | 1    | 4        | 0               |
| FLAVOR-b2. c2 r8   | 2    | 8        | 0               |
| FLAVOR-b2. c4 r16  | 4    | 16       | 0               |
| FLAVOR-b2. c8 r32  | 8    | 32       | 0               |
| FLAVOR-b2. c16 r64 | 16   | 64       | 0               |

## 3. Grundlæggende compute med lokal NVMe-disk

Profilen for grundlæggende compute med lokal NVMe-disk tilbyder et vCPU-til-RAM-forhold på 1:2, hvilket betyder, at for hver virtuel CPU der allokeres, er der to gigabyte RAM tilgængeligt. Denne profil inkluderer lokal midlertidig NVMe-lagring. CPU-overbookningsforholdet er sat til maksimalt 1:3, hvilket betyder, at der kan være op til tre virtuelle CPU’er for hver fysisk CPU, der er tilgængelig på værten.

### 3.1. Forudsætninger

Ingen.

### 3.2. Konfigurationer

| Produktkode               | vCPU | RAM (GB) | Lokal disk (GB) |
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

## 4. Compute med GPU og lokal NVMe-disk

Den hukommelsesoptimerede compute-profil med lokal NVMe-disk har et vCPU:RAM-forhold på 1:4. Den leveres med lokal midlertidig NVMe-lagring. CPU-overbookningsforholdet er 1:1. Den lokale lagring er IOPS-provisioneret.

### 4.1. Forudsætninger

Ingen.

### 4.2. Konfigurationer

| Produktkode               | vCPU | RAM (GB) | Lokal disk (GB) | GPU (A2)
|--------------------------|:----:|:--------:|----------------:|:--------:|
| FLAVOR-l2.c4r16.125.gA2  | 4    | 16       | 125             | 1        |
| FLAVOR-l2.c8r32.250.gA2  | 8    | 32       | 250             | 1        |
| FLAVOR-b2.c4r8.gA2       | 4    | 8        | 0               | 1        |
| FLAVOR-b2.c8r16.gA2      | 8    | 16       | 0               | 1        |

| Produktkode           | Instanstype   | vCPU | Hukommelse | Basisdisk | Provisionerede IOPS (R/W)  |
|-----------------------|---------------|------|------------|-----------|----------------------------|
| FLAVOR-g2 .c4 r8. 100   | g2.c4r8.100    | 4    | 16 GiB     | 100 GB    | 4k/8k, 8.5k/17k            |
| FLAVOR-g2 .c8 r32. 500  | g2.c8r32.500   | 8    | 32 GiB     | 500 GB    | 4k/8k, 21k/42k             |
| FLAVOR-g2 .c16 r64. 1000 | g2.c16r64.1000 | 16   | 64 GiB     | 1000 GB   | 4k/8k, 46k/92k             |

## 5. Bare-metal-compute

Bare-metal-compute-typen er en klargjort fysisk server. Kun de leverede OS-images understøttes fuldt ud, men der findes også dokumentation om, hvordan man forbereder et OS-image til bare-metal-serveren. Hvis bestillinger overstiger den tilgængelige kapacitet, afhænger leveringstiden af leverandørens hardwareleveringstider.

### 5.1. Forudsætninger

Ingen.

### 5.2. Konfigurationer

| Produktkode               | Instanstype    | CPU (fysiske kerner) | Hukommelse | NVMe-disk |
| ------------------------- | -------------- | -------------------- | ---------- | --------- |
| FLAVOR-p1. c16 r128. 4000 | p1.c16r128.4000 | 16                   | 128 GiB    | 3,8 TB    |
| FLAVOR-p1. c32 r256. 4000 | p1.c32r256.4000 | 32                   | 256 GiB    | 3,8 TB    |
| FLAVOR-p1. c64 r512. 8000 | p1.c64r512.8000 | 2 x 32               | 512 GiB    | 2 x 3,8 TB |

## 6. Volume-lagring

Vi leverer volume-lagring via Ceph-klynger bestående af både HDD- og SSD-lagring.

### 6.1. Forudsætninger

Du kan tilknytte et volume til en serverinstans, også som et root-disk-volume.

### 6.2. Konfigurationer

| Produktkode     | Volumentype       | Site | Egenskaber                |
| --------------- | ----------------- | ---- | ------------------------- |
| VOLUME-fast     | Fast              | osl1 | SSD-baseret Ceph med 3 replikaer |
| VOLUME-large    | Large             | osl1 | HDD-baseret Ceph med 3 replikaer |
| VOLUME-fast     | Fast              | sto1 | SSD-baseret Ceph med 3 replikaer |
| VOLUME-large    | Large             | sto1 | HDD-baseret Ceph med 3 replikaer |
| VOLUME-snapshot | Snapshot af image | -    | -                         |