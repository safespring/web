---
ai: true
title: "Privat moln"
language: "sv"
cardtitle: "Privat moln"
cardicon: "fa-solid fa-shield-check"
cardcolor: "#195F8C"
cardorder: "06"
date: 2023-02-28
draft: false
intro: "Komplett erbjudande inklusive hårdvara, drift och programvaruunderhåll."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tillbaka till alla kategorier"
sidebarlinkurl: "/service-catalogue"
section: "Safesprings tjänstekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
  - /service-catalogue/private-cloud/
---

{{< ingress >}}
Komplett erbjudande för driftsättning av privat moln (Private Cloud), inklusive hårdvara, drift och programvaruunderhåll.
{{< /ingress >}}

IaaS-baserbjudandet inkluderar Kontrollplan (Control Plane) och Compute-tjänst med enbart lokal instanslagring.
Alternativ inkluderar elastisk blocklagring (Ceph-kluster) och accelererade beräkningsnoder (vanligen GPU).
STaaS-baserbjudandet inkluderar Kontrollplan och lagringsnoder av antingen HDD- eller NVME-typ.

Lagringsgränssnitt innefattar RADOS, S3 via Rados Gateway, Rados Block Device eller iSCSI/NFS via lagringsproxy.

## Privat moln – IaaS

IaaS-baskonfigurationen är avsedd för driftsättning i dedikerat rackutrymme, gärna med utrymme för expansion. ToR-switcharna är baserade på 32x100 Gbps och skalar till 24 beräknings- eller lagringsnoder eftersom 4 gränssnitt är reserverade för kontrollplanet, 2 för interswitch-länkar och 2 för uplänkar.

Om driftsättning över flera rack används krävs extra portar för korskoppling. Konfiguration av beräkningsnod (CPU, RAM, lokal NVME) enligt kundspecifikation.

### Förutsättningar

Inga.

### Privat moln – IaaS baskonfiguration

<table class="width100">
  <thead>
    <tr>
      <th>Nodtyp</th>
      <th>Noder</th>
      <th>Rackenheter/enhet</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Top-of-Rack-switch</td>
      <td>2</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Management-switch</td>
      <td>2</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Kontrollplan (4 servrar / 2RU)</td>
      <td>3</td>
      <td>2</td>
    </tr>
    <tr>
      <td>Beräkningsnod</td>
      <td>3</td>
      <td>2</td>
    </tr>
  </tbody>
</table>

### Privat moln – IaaS baskomponenter

| Produktkod                | Komponent                                     | Rackenheter |
| ------------------------- | --------------------------------------------- | ----------- |
| PRIVATECLOUD-compute.base | IaaS Compute baskonfiguration                 | 12          |
| PRIVATECLOUD-compute.add  | IaaS Compute ytterligare noder (4 per chassi) | 2           |

## Privat moln – IaaS Volymer (tillval)

IaaS Volymer-tillvalet lägger till elastisk lagring med NVME, HDD eller båda till Private IaaS-driftsättningen. Det återanvänder switchar och kontrollplan från Private IaaS. ToR-switcharna är baserade på 32x100 Gbps och skalar till 24 beräknings- eller lagringsnoder eftersom fyra (4) gränssnitt är reserverade för kontrollplanet, två (2) för interswitch-länkar och två (2) för uplänkar.

Om driftsättning över flera rack används krävs extra portar för korskoppling. Lagringsgränssnittet är Rados Block Device (RBD) mot beräkningshypervisorn. HDD-lagringsnod rymmer 12x3,5”, maximal storlek per enhet beror på marknadstillgång och använder Optane-enhet för databasen (DB). NVME-lagringsnod rymmer 10x2,5” NVME; enheternas skrivuthållighet och storlek beror på marknadstillgång och kundpreferens.

### Förutsättningar

IaaS-baskonfiguration.

### Privat moln – IaaS Volymer (tillval)

| Nodtyp               | Noder    | Rackenheter                              |
| -------------------- | -------- | ---------------------------------------- |
| Top-of-Rack-switch   | 2        | 0 (återanvändning av IaaS ToR)           |
| Management-switch    | 2        | 0 (återanvändning av IaaS Mgm-switch)    |
| Kontrollplan         | 3        | 0 (samlokaliserad med IaaS-kontrollplan) |
| Lagringsnoder – NVME | 0 / 6..n | 0 / 6..n                                 |
| Lagringsnoder – HDD  | 0 / 6..n | 0 / 12..2n                               |

### Produktkomponenter för Privat moln – IaaS Volymer

| Produktkod                    | Komponent                                 | Rackenheter |
| ----------------------------- | ----------------------------------------- | ----------- |
| PRIVATECLOUD-volume.nvme.base | IaaS Volymer baskonfiguration, NVME-klass | 6           |
| PRIVATECLOUD-volume.nvme.add  | IaaS ytterligare lagringsnod, NVME-klass  | 1           |
| PRIVATECLOUD-volume.hdd.base  | IaaS Volymer baskonfiguration, HDD-klass  | 12          |
| PRIVATECLOUD-volume.hdd.add   | IaaS ytterligare lagringsnod, HDD-klass   | 2           |

### Privat moln – STaaS

STaaS-tjänsten tillhandahåller elastisk lagring med NVME, HDD eller båda. ToR-switcharna är baserade på 32x100 Gbps och skalar till 24 beräknings- eller lagringsnoder eftersom 4 gränssnitt är reserverade för kontrollplanet, två (2) för interswitch-länkar och två (2) för uplänkar. Om driftsättning över flera rack används krävs extra portar för korskoppling. Lagringsgränssnitt inkluderar RADOS, S3 via Rados Gateway, Rados Block Device (RBD) eller iSCSI/NFS via lagringsproxy.

HDD-lagringsnod rymmer 12x3,5”, maximal storlek per enhet beror på marknadstillgång och använder Optane-enhet för databasen. NVME-lagringsnod rymmer 10x2,5” NVME; enheternas skrivuthållighet och storlek beror på marknadstillgång och kundpreferens.

### Förutsättningar

Inga.

### Privat moln – STaaS baskonfiguration

| Nodtyp             | Noder    | Rackenheter/enhet |
| ------------------ | -------- | ----------------- |
| Top-of-Rack-switch | 2        | 1                 |
| Management-switch  | 2        | 1                 |
| Kontrollplan       | 3        | 2                 |
| Lagringsnod – NVME | 0 / 4..n | 1                 |
| Lagringsnod – HDD  | 0 / 4..n | 2                 |

### Produktkomponenter för Privat moln – STaaS

| Produktkod                   | Komponent                            | Rackenheter |
| ---------------------------- | ------------------------------------ | ----------- |
| PRIVATECLOUD-staas.base      | STaaS baskonfiguration               | 6           |
| PRIVATECLOUD-staas.nvme.base | STaaS baslagringskluster, NVME-klass | 4           |
| PRIVATECLOUD-staas.nvme.add  | STaaS lagringskluster, NVME-klass    | 1           |
| PRIVATECLOUD-staas.hdd.base  | STaaS baslagringskluster, HDD-klass  | 8           |
| PRIVATECLOUD-staas.hdd.add   | STaaS lagringskluster, HDD-klass     | 2           |
