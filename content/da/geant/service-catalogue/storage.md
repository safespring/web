---
ai: true
title: "Lagring som en service"
language: "da"
cardtitle: "Objektlagring"
cardicon: "fa-solid fa-database"
cardcolor: "#195F8C"
cardorder: "05"
date: "2025-01-20"
draft: false
intro: "Lagringstjenesten er bygget på den pålidelige og højtskalerbare Ceph-objektlagringsklynge. Den understøtter integration via S3-API'et, hvilket sikrer kompatibilitet med applikationer og arbejdsgange, der er afhængige af objektbaserede lagringsløsninger."
cardintro: "Lagringstjeneste baseret på Cephs objektlagringsklynge ved brug af S3-API'en."
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tilbage til alle kategorier"
sidebarlinkurl: "/geant/service-catalogue"
sidebarlinkname2: "Se pris på lagerplads"
sidebarlinkurl2: "/geant/price/#safespring-storage"
socialmedia: "safespring-compute.jpg"
section: "OCRE 2024-rammeværk"
socialmedia: "/safespring-start.jpg"
toc: "På denne side"
noindex: "x"
aliases:
- /geant/service-catalogue/storage/
---
{{< ingress >}}
Compute-platformen indeholder en lagringstjeneste baseret på Cephs objektlagringsklynge, som leverer objektlagring som en tjeneste via en S3-API-kompatibel grænseflade.
{{< /ingress >}}

### S3-API-kompatibel lagringstjeneste

Safespring tilbyder lagring som en tjeneste baseret på objektlagring leveret af Ceph Rados Gateway. Se API-definitionerne i afsnit 3.2.

### Forudsætninger

Ingen.

### Konfigurationer

| Produktkode | Egenskaber                         |
| ----------- | ---------------------------------- |
| S3-archive  | HDD-baseret med erasure-kodet Ceph |
| S3 -storage | HDD-baseret med Ceph med 3 replikater |

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kontakt Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Info:" >}} +46855107370 eller ocre@safespring.com
{{% /custom-card %}}