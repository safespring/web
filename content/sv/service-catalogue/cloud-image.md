---
ai: true
title: "Molnbildtjänst"
language: "sv"
cardtitle: "Molnavbilder"
cardicon: "fa-solid fa-compact-disc"
cardcolor: "#195F8C"
cardorder: "03"
date: 2023-02-28
draft: false
intro: "IaaS-tjänsten innehåller dessutom en tjänst för molnavbilder (Openstack Glance)."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tillbaka till alla kategorier"
sidebarlinkurl: "/service-catalogue"
section: "Safespring tjänstekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
  - /service-catalogue/cloud-image/
---

{{< ingress >}}
IaaS-tjänsten innehåller dessutom en molnavbildningstjänst (OpenStack Glance).
{{< /ingress >}}

## Molnavbilder

Molnavbilder är förberedda OS-avbilder som kan distribueras i en molnmiljö där till exempel den blivande serverns namn, IP- eller MAC-adress inte är kända i förväg. Dessa avbilder förlitar sig vanligen på ett populärt program som heter cloud-init.

Avbildningstjänsten låter användare skapa, läsa, uppdatera och ta bort egna avbilder, som antingen har skapats av användaren själv eller kopierats från annan källa. Tjänsten innehåller också en lista över publika avbilder som uppdateras regelbundet av leverantören.

### Förutsättningar

Även om avbildningstjänsten kan användas fristående krävs en serverinstans för att starta en instans från en molnavbild.

### Avbildlagringstjänst

Basutbudet för avbildningstjänsten är själva tjänsten, som lagrar avbilder för användning inom IaaS-tjänsten. Produktkod: IM-Storage.

### Tillhandahållna publika avbilder

Safespring tillhandahåller följande publika molnavbilder, baserade på upstream-projektens publiceringar. De uppdateras regelbundet med nya utgåvor inom respektive huvudversion.

| Operativsystem                 | Version               |
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
