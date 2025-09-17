---
ai: true
title: "Lagring som en tjeneste – STaaS"
language: "nb"
cardtitle: "Objektlagring"
cardicon: "fa-solid fa-database"
cardcolor: "#195F8C"
cardorder: "04"
date: 2023-02-28
draft: false
intro: "Lagringstjeneste basert på en Ceph-objektlagringsklynge som bruker S3-API-et."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nei"
sidebarlinkname: "Tilbake til alle kategorier"
sidebarlinkurl: "/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Safespring tjenestekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
- /service-catalogue/storage/
---
{{< ingress >}}
IaaS-plattformen inneholder en lagringstjeneste basert på Ceph-objektlagringsklyngen, som tilbyr objektlagring som en tjeneste via et S3-API-kompatibelt grensesnitt.
{{< /ingress >}}

## S3-API-kompatibel lagringstjeneste

Safespring tilbyr lagring som en tjeneste (Storage-as-a-Service) basert på objektlagring levert av Ceph Rados Gateway. Safespring tilbyr S3-API-kompatibilitet i henhold til Ceph-versjonene angitt nedenfor. Nøyaktig nivå for API-støtte finnes i relevant dokumentasjon; se referanser nedenfor.

### Forutsetninger

Ingen.

### Ceph-versjoner

| Produktkode | Type       | Lokasjon | Versjon       |
| ----------- | ---------- | -------- | ------------- |
| S3-standard | S3-storage | OSL2     | v17 (Quincy)  |
| S3-standard | S3-storage | STO1     | v15 (Octopus) |
| S3-standard | S3-storage | STO2     | v15 (Octopus) |

## Direkte RADOS-integrasjon av applikasjon

Safespring støtter direkte integrasjon av applikasjoner mot RADOS-laget, når dette utføres og rulles ut av Safespring på en kontrollert måte.

Det er ikke mulig for brukere å få direkte tilgang til dette lagringslaget. Integrasjonen utføres av Safespring med tjenestebasert prising, og det vil påløpe påfølgende vedlikeholdskostnader. Eksakt pris avhenger av prosjektets omfang og vurderes derfor fra sak til sak.

### Forutsetninger

Ingen.