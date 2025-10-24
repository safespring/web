---
ai: true
title: "Lagring som en tjeneste – STaaS"
language: "da"
cardtitle: "Objektlagring"
cardicon: "fa-solid fa-database"
cardcolor: "#195F8C"
cardorder: "04"
date: 2023-02-28
draft: false
intro: "Lagringstjeneste baseret på en Ceph-objektlagringsklynge, der bruger S3-API'et."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tilbage til alle kategorier"
sidebarlinkurl: "/service-catalogue"
section: "Safespring servicekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
  - /service-catalogue/storage/
---

{{< ingress >}}
IaaS-platformen indeholder en lagringstjeneste baseret på Ceph-objektlagringsklyngen og leverer objektlagring som en tjeneste via en S3-API-kompatibel grænseflade.
{{< /ingress >}}

## S3-API-kompatibel lagringstjeneste

Safespring leverer Storage-as-a-Service ved hjælp af objektbaseret lagring leveret af Ceph RADOS Gateway. Safespring tilbyder S3-API-kompatibilitet i henhold til de Ceph-versioner, der er angivet nedenfor. Det præcise niveau for API-understøttelse kan læses på den relevante dokumentationsside; se referencer nedenfor.

### Forudsætninger

Ingen.

### Ceph-versioner

| Produktkode | Type       | Site | Version       |
| ----------- | ---------- | ---- | ------------- |
| S3-standard | S3-storage | OSL2 | v17 (Quincy)  |
| S3-standard | S3-storage | STO1 | v15 (Octopus) |
| S3-standard | S3-storage | STO2 | v15 (Octopus) |

## Direkte RADOS-integration af applikation

Safespring understøtter direkte integration af applikationer på RADOS-laget, når det udføres og udrulles af Safespring på kontrolleret vis.

Det er ikke muligt for brugere at få direkte adgang til dette lagringslag. Integration udføres af Safespring til professional service-baseret prissætning, og der vil blive opkrævet et efterfølgende vedligeholdelsesgebyr. Den eksakte pris afhænger af projektets omfang og vurderes derfor fra sag til sag.

### Forudsætninger

Ingen.
