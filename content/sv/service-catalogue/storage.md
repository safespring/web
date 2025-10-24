---
ai: true
title: "Lagring som en tjänst – STaaS"
language: "sv"
cardtitle: "Objektlagring"
cardicon: "fa-solid fa-database"
cardcolor: "#195F8C"
cardorder: "04"
date: 2023-02-28
draft: false
intro: "Lagringstjänst baserad på Cephs objektlagringskluster som använder S3-API."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tillbaka till alla kategorier"
sidebarlinkurl: "/service-catalogue"
section: "Safespring tjänstekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
  - /service-catalogue/storage/
---

{{< ingress >}}
IaaS-plattformen innehåller en lagringstjänst baserad på Cephs objektlagringskluster och tillhandahåller objektlagring som en tjänst via ett S3‑API‑kompatibelt gränssnitt.
{{< /ingress >}}

## S3‑API‑kompatibel lagringstjänst

Safespring tillhandahåller lagring som tjänst (Storage‑as‑a‑Service) med objektbaserad lagring via Ceph RADOS Gateway. Safespring erbjuder ett S3‑API‑kompatibelt gränssnitt enligt de Ceph‑versioner som visas nedan. Exakt nivå på API‑stödet framgår av relevant dokumentation; se referenserna nedan.

### Förutsättningar

Inga.

### Ceph‑versioner

| Produktkod  | Typ        | Plats | Version       |
| ----------- | ---------- | ----- | ------------- |
| S3-standard | S3-storage | OSL2  | v17 (Quincy)  |
| S3-standard | S3-storage | STO1  | v15 (Octopus) |
| S3-standard | S3-storage | STO2  | v15 (Octopus) |

## Direkt RADOS‑integration av applikationer

Safespring stödjer direkt integration av applikationer mot RADOS‑lagret när detta utförs och driftsätts av Safespring på ett kontrollerat sätt.

Det är inte möjligt för användare att ha direkt åtkomst till detta lagringslager. Integrationen utförs av Safespring enligt konsulttjänst‑baserad prissättning, och en efterföljande underhållsavgift tillkommer. Den exakta prissättningen beror på projektets omfattning och utvärderas därför från fall till fall.

### Förutsättningar

Inga.
