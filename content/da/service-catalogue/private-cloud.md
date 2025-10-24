---
ai: true
title: "Privat sky"
language: "da"
cardtitle: "Privat sky"
cardicon: "fa-solid fa-shield-check"
cardcolor: "#195F8C"
cardorder: "06"
date: 2023-02-28
draft: false
intro: "Samlet tilbud inklusive hardware, drift og vedligeholdelse af software."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tilbage til alle kategorier"
sidebarlinkurl: "/service-catalogue"
section: "Safespring servicekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
  - /service-catalogue/private-cloud/
---

{{< ingress >}}
Komplet tilbud til Private Cloud-udrulning, inklusive hardware, drift og softwarevedligeholdelse.
{{< /ingress >}}

IaaS-basitilbuddet omfatter kontrolplan og compute-tjeneste med kun lokal instanslagring.
Tilvalg omfatter Elastic Block Storage (Ceph-klynge) og accelererede compute-noder (typisk GPU).
STaaS-basitilbuddet omfatter kontrolplan og lagringsnoder af enten HDD- eller NVME-type.

Lagringsgrænseflader omfatter RADOS, S3 via Rados Gateway, Rados Block Device eller iSCSI/NFS via storage-proxy.

## Private Cloud – IaaS

IaaS-baskonfigurationen er til udrulning i et dedikeret rack, helst med plads til at vokse. ToR-switches er baseret på 32x100 Gbps og skalerer til 24 compute- eller lagringsnoder, da 4 interfaces er reserveret til kontrolplanen, 2 til interswitch-links og 2 til uplinks.

Ved multi-rack-udrulning kræves ekstra porte til cross-connect. Compute-nodekonfiguration (CPU, RAM, lokal NVME) efter kundespecifikation.

### Forudsætninger

Ingen.

### Private Cloud – IaaS-basis konfiguration

<table class="width100">
  <thead>
    <tr>
      <th>Nodetype</th>
      <th>Noder</th>
      <th>Rack Units/enhed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Top-of-rack-switch</td>
      <td>2</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Management-switch</td>
      <td>2</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Kontrolplan (4 servere / 2RU)</td>
      <td>3</td>
      <td>2</td>
    </tr>
    <tr>
      <td>Compute-node</td>
      <td>3</td>
      <td>2</td>
    </tr>
  </tbody>
</table>

### Private Cloud – IaaS-basis produktkomponenter

| Produktkode               | Komponent                                     | Rack Units |
| ------------------------- | --------------------------------------------- | ---------- |
| PRIVATECLOUD-compute.base | IaaS Compute-baskonfiguration                 | 12         |
| PRIVATECLOUD-compute.add  | IaaS yderligere compute-noder (4 pr. chassis) | 2          |

## Private Cloud – IaaS Volumes-tilvalg

IaaS Volumes-tilvalget tilføjer elastisk lagring med NVME, HDD eller begge dele til den private IaaS-udrulning. Det genbruger switches og kontrolplan fra den private IaaS-udrulning. ToR-switches er baseret på 32x100 Gbps og skalerer til 24 compute- eller lagringsnoder, da fire (4) interfaces er reserveret til kontrolplanen, to (2) til interswitch-links og to (2) til uplinks.

Ved multi-rack-udrulning kræves ekstra porte til cross-connect. Lagringsgrænsefladen er Rados Block Device (RBD) til compute-hypervisoren. HDD-lagringsnode rummer 12x3.5”, maksimal størrelse pr. drev afhænger af markeds­tilgængelighed og bruger Optane-drev til DB. NVME-lagringsnode rummer 10x2.5” NVME; drevenes skriveudholdenhed og størrelse afhænger af markeds­tilgængelighed og kundens præferencer.

### Forudsætninger

IaaS-baskonfiguration.

### Private Cloud – IaaS Volumes-tilvalg

| Nodetype             | Noder    | Rack Units                               |
| -------------------- | -------- | ---------------------------------------- |
| Top-of-rack-switch   | 2        | 0 (genbrug af IaaS ToR)                  |
| Management-switch    | 2        | 0 (genbrug af IaaS Mgm-switch)           |
| Kontrolplan          | 3        | 0 (samme placering som IaaS-kontrolplan) |
| Lagringsnoder – NVME | 0 / 6..n | 0 / 6..n                                 |
| Lagringsnoder – HDD  | 0 / 6..n | 0 / 12..2n                               |

### Private Cloud IaaS Volume-produktkomponenter

| Produktkode                   | Komponent                                  | Rack Units |
| ----------------------------- | ------------------------------------------ | ---------- |
| PRIVATECLOUD-volume.nvme.base | IaaS Volumes-baskonfiguration, NVME-klasse | 6          |
| PRIVATECLOUD-volume.nvme.add  | IaaS yderligere lagringsnode, NVME-klasse  | 1          |
| PRIVATECLOUD-volume.hdd.base  | IaaS Volumes-baskonfiguration, HDD-klasse  | 12         |
| PRIVATECLOUD-volume.hdd.add   | IaaS yderligere lagringsnode, HDD-klasse   | 2          |

### Private Cloud – STaaS

STaaS-tjenesten leverer elastisk lagring på NVME, HDD eller begge dele. ToR-switches er baseret på 32x100 Gbps og skalerer til 24 compute- eller lagringsnoder, da 4 interfaces er reserveret til kontrolplanen, to (2) til interswitch-links og to (2) til uplinks. Ved multi-rack-udrulning kræves ekstra porte til cross-connect. Lagringsgrænseflader omfatter RADOS, S3 via Rados Gateway, Rados Block Device (RBD) eller iSCSI/NFS via storage-proxy.

HDD-lagringsnode rummer 12x3.5”, maksimal størrelse pr. drev afhænger af markeds­tilgængelighed og bruger Optane-drev til DB. NVME-lagringsnode rummer 10x2.5” NVME; drevenes skriveudholdenhed og størrelse afhænger af markeds­tilgængelighed og kundens præferencer.

### Forudsætninger

Ingen.

### Private Cloud – STaaS-basis konfiguration

| Nodetype            | Noder    | Rack Units/enhed |
| ------------------- | -------- | ---------------- |
| Top-of-rack-switch  | 2        | 1                |
| Management-switch   | 2        | 1                |
| Kontrolplan         | 3        | 2                |
| Lagringsnode – NVME | 0 / 4..n | 1                |
| Lagringsnode – HDD  | 0 / 4..n | 2                |

### Private Cloud STaaS-produktkomponenter

| Produktkode                  | Komponent                               | Rack Units |
| ---------------------------- | --------------------------------------- | ---------- |
| PRIVATECLOUD-staas.base      | STaaS-baskonfiguration                  | 6          |
| PRIVATECLOUD-staas.nvme.base | STaaS-basis lagringsklynge, NVME-klasse | 4          |
| PRIVATECLOUD-staas.nvme.add  | STaaS lagringsklynge, NVME-klasse       | 1          |
| PRIVATECLOUD-staas.hdd.base  | STaaS-basis lagringsklynge, HDD-klasse  | 8          |
| PRIVATECLOUD-staas.hdd.add   | STaaS lagringsklynge, HDD-klasse        | 2          |
