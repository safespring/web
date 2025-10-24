---
ai: true
title: "Billedservice i skyen"
language: "da"
cardtitle: "Cloud-afbildninger"
cardicon: "fa-solid fa-compact-disc"
cardcolor: "#195F8C"
cardorder: "03"
date: 2023-02-28
draft: false
intro: "IaaS-tjenesten indeholder desuden en cloud-imagetjeneste (Openstack Glance)."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tilbage til alle kategorier"
sidebarlinkurl: "/service-catalogue"
section: "Safespring servicekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
  - /service-catalogue/cloud-image/
---

{{< ingress >}}
IaaS-tjenesten indeholder desuden en cloud-image-service (Openstack Glance).
{{< /ingress >}}

## Cloud-images

Cloud-images er forberedte OS-images, der kan udrulles i et cloud-miljø, hvor f.eks. den kommende servers navn, IP eller MAC-adresse ikke er kendt på forhånd. Disse images bygger ofte på et populært stykke software kaldet cloud-init.

Image-tjenesten giver brugere mulighed for at oprette, læse, opdatere og slette deres egne images, som brugerne enten selv har lavet eller kopieret fra en anden kilde. Tjenesten indeholder også en liste over offentlige images, som opdateres regelmæssigt af udbyderen.

### Forudsætninger

Selvom image-tjenesten kan bruges alene, kræver det en serverinstans at starte et image ved hjælp af disse cloud-images.

### Image-lagringstjeneste

Basistilbuddet for image-tjenesten er selve image-tjenesten, som lagrer images til brug i IaaS-tjenesten. Produktkode: IM-Storage.

### Offentlige images

Safespring stiller følgende offentlige cloud-images til rådighed, baseret på upstream-projekternes udgivelser. De opdateres regelmæssigt med nyere udgivelser inden for deres hovedversioner.

| OS                             | Version               |
| ------------------------------ | --------------------- |
| CentOS                         | 7                     |
| CentOS                         | 8                     |
| Cirros                         | 0.3.6                 |
| Debian                         | 9 (Stretch)           |
| Debian                         | 10 (Buster)           |
| RedHat Enterprise Linux Server | 7                     |
| RedHat Enterprise Linux Server | 8                     |
| Windows Server                 | 2016 Datacenter       |
| Windows Server                 | 2019 Datacenter       |
| Ubuntu                         | 16.04 (Xenial Xerus)  |
| Ubuntu                         | 18.04 (Bionic Beaver) |
| Ubuntu                         | 20.04 (Focal Fossa)   |
| Scaleout STACKn                | 2020.6                |
