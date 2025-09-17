---
ai: true
title: "Bildetjeneste i skyen"
language: "nb"
cardtitle: "Avbildninger i skyen"
cardicon: "fa-solid fa-compact-disc"
cardcolor: "#195F8C"
cardorder: "03"
date: 2023-02-28
draft: false
intro: "IaaS-tjenesten inneholder i tillegg en tjeneste for systemavbildninger i skyen (Openstack Glance)."
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
- /service-catalogue/cloud-image/
---
{{< ingress >}}
IaaS-tjenesten inneholder i tillegg en bildetjeneste (Openstack Glance).
{{< /ingress >}}

## Skyavbildninger

Skyavbildninger er forhåndstilberedte OS-avbildninger som kan tas i bruk i et skymiljø der for eksempel serverens navn, IP eller MAC-adresse ikke er kjent på forhånd. Disse avbildningene baserer seg ofte på programvaren cloud-init.

Bildetjenesten lar brukere opprette, lese, oppdatere og slette egne avbildninger, enten de er laget selv eller kopiert fra en annen kilde. Tjenesten inneholder også en liste over offentlige avbildninger som oppdateres jevnlig av leverandøren.

### Forutsetninger

Selv om bildetjenesten kan brukes frittstående, kreves en serverinstans for å starte en avbildning ved hjelp av disse skyavbildningene.

### Lagringstjeneste for avbildninger

Grunntilbudet er selve bildetjenesten, som lagrer avbildninger for bruk innenfor IaaS-tjenesten. Produktkode: IM-Storage.

### Offentlige avbildninger som tilbys

Safespring tilbyr følgende offentlige skyavbildninger, basert på oppstrømsprosjektenes publiseringer. De oppdateres jevnlig med nyere utgivelser innenfor sine hovedversjoner.

| OS                             | Versjon               |
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