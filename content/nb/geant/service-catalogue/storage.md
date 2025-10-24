---
ai: true
title: "Lagring som en tjeneste"
language: "nb"
cardtitle: "Objektlagring"
cardicon: "fa-solid fa-database"
cardcolor: "#195F8C"
cardorder: "05"
date: "2025-01-20"
draft: false
intro: "Lagringstjenesten er bygget på den pålitelige og svært skalerbare Ceph-objektlagringsklyngen. Den støtter integrasjon via S3-API, noe som sikrer kompatibilitet med applikasjoner og arbeidsflyter som er avhengige av objektbaserte lagringsløsninger."
cardintro: "Lagringstjeneste basert på en Ceph-objektlagringsklynge som bruker S3-API."
background: "safespring-compute-background.svg"
form: "nei"
sidebarlinkname: "Tilbake til alle kategorier"
sidebarlinkurl: "/geant/service-catalogue"
sidebarlinkname2: "Se pris på lagring"
sidebarlinkurl2: "/geant/price/#safespring-storage"
section: "OCRE 2024-rammeverket"
socialmedia: "/safespring-start.jpg"
toc: "På denne siden"
noindex: "x"
aliases:
  - /geant/service-catalogue/storage/
---

{{< ingress >}}
Compute-plattformen inneholder en lagringstjeneste basert på Ceph-objektlagringsklyngen, som tilbyr objektlagring som en tjeneste via et S3-API-kompatibelt grensesnitt.
{{< /ingress >}}

### S3-API-kompatibel lagringstjeneste

Safespring tilbyr lagring som en tjeneste basert på objektlagring, levert av Ceph RADOS Gateway. Se API-definisjonene i seksjon 3.2.

### Forutsetninger

Ingen.

### Konfigurasjoner

| Produktkode | Egenskaper                        |
| ----------- | --------------------------------- |
| S3-archive  | HDD-basert med erasure-kodet Ceph |
| S3 -storage | HDD-basert med 3 replikaer i Ceph |

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Ta kontakt med Safespring" %}}
{{< inline "Kundestøtte:" >}} support@safespring.com  
{{< inline "Info:" >}} +46855107370 eller ocre@safespring.com
{{% /custom-card %}}
