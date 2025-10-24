---
ai: true
title: "Cloud-faktureringstjeneste"
language: "da"
cardtitle: "Cloud-billeder"
cardicon: "fa-solid fa-compact-disc"
cardcolor: "#195F8C"
cardorder: "04"
date: "2025-01-20"
draft: false
cardintro: "IaaS-tjenesten indeholder desuden en cloud-image-tjeneste (Openstack Glance)."
intro: "Administrer og udrul operativsystemaftryk i skyen uden besvær med Safesprings Image Service, drevet af OpenStack Glance, som muliggør tilpassede eller forudkonfigurerede skymiljøer."
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tilbage til alle kategorier"
sidebarlinkurl: "/geant/service-catalogue"
section: "OCRE 2024-rammeværk"
socialmedia: "/safespring-start.jpg"
toc: "På denne side"
noindex: "x"
aliases:
  - /geant/service-catalogue/cloud-image/
---

{{< ingress >}}
Compute-tjenesten indeholder desuden en cloud-image-tjeneste (OpenStack Glance).
{{< /ingress >}}

## Cloud-images

Cloud-images er forberedte OS-images, der kan udrulles i et cloud-miljø, hvor for eksempel den kommende servers navn, IP- eller MAC-adresse ikke kendes på forhånd. Images skal have frameworket cloud-init installeret, som giver OpenStack et API til at interagere med de oprettede instanser og sætte disse variabler i instansen.

Imagetjenesten giver brugere mulighed for at oprette, læse, opdatere og slette deres egne images, som de enten selv har lavet eller kopieret fra en anden kilde. Tjenesten indeholder også en liste over offentlige images, som udbyderen regelmæssigt opdaterer.

### Forudsætninger

Selvom imagetjenesten kan bruges alene, kræver det en serverinstans for at starte en instans ud fra disse cloud-images.

### Image-lagringstjeneste

Basistilbuddet er selve imagetjenesten, som lagrer images til brug i Compute-tjenesten. Produktkode: `IM-Storage`.

### Tilgængelige offentlige images

Safespring tilbyder følgende offentlige cloud-images, baseret på upstream-projekters udgivelser. Disse images opdateres løbende inden for deres hovedversioner:

| Operativsystem-images          |
| ------------------------------ |
| CentOS                         |
| Cirros                         |
| Debian                         |
| RedHat Enterprise Linux Server |
| Windows Server Datacenter      |
| Ubuntu                         |

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kom i kontakt med Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Salg:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}
