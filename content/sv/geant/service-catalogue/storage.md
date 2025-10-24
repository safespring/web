---
ai: true
title: "Lagring som tjänst"
language: "sv"
cardtitle: "Objektlagring"
cardicon: "fa-solid fa-database"
cardcolor: "#195F8C"
cardorder: "05"
date: "2025-01-20"
draft: false
intro: "Lagringstjänsten är byggd på Cephs tillförlitliga och mycket skalbara objektlagringskluster. Den stöder integration via S3-API, vilket säkerställer kompatibilitet med applikationer och arbetsflöden som förlitar sig på objektbaserade lagringslösningar."
cardintro: "Lagringstjänst baserad på Cephs objektlagringskluster som använder S3-API:t."
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tillbaka till alla kategorier"
sidebarlinkurl: "/geant/service-catalogue"
sidebarlinkname2: "Se pris för lagring"
sidebarlinkurl2: "/geant/price/#safespring-storage"
section: "OCRE 2024-ramverk"
socialmedia: "/safespring-start.jpg"
toc: "På den här sidan"
noindex: "x"
aliases:
  - /geant/service-catalogue/storage/
---

{{< ingress >}}
Compute-plattformen innehåller en lagringstjänst baserad på Cephs objektlagringskluster och tillhandahåller objektlagring som en tjänst via ett S3-API-kompatibelt gränssnitt.
{{< /ingress >}}

### S3-API-kompatibel lagringstjänst

Safespring tillhandahåller Storage-as-a-Service med objektbaserad lagring via Ceph Rados Gateway. Se API-definitionerna i avsnitt 3.2.

### Förutsättningar

Inga.

### Konfigurationer

| Produktkod  | Egenskaper                            |
| ----------- | ------------------------------------- |
| S3-archive  | HDD-baserad med erasure coding i Ceph |
| S3 -storage | HDD-baserad med 3 repliker i Ceph     |

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kontakta Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Info:" >}} +46855107370 eller ocre@safespring.com
{{% /custom-card %}}
