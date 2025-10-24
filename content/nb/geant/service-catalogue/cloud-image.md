---
ai: true
title: "Skytjeneste for bilder"
language: "nb"
cardtitle: "Skyavbildninger"
cardicon: "fa-solid fa-compact-disc"
cardcolor: "#195F8C"
cardorder: "04"
date: "2025-01-20"
draft: false
cardintro: "IaaS-tjenesten inneholder dessuten en bildetjeneste for skyen (Openstack Glance)."
intro: "Administrer og rull ut operativsystembilder i skyen enkelt med Safesprings Image Service, drevet av OpenStack Glance, som muliggjør tilpassede eller forhåndskonfigurerte skymiljøer."
background: "safespring-compute-background.svg"
form: "nei"
sidebarlinkname: "Tilbake til alle kategorier"
sidebarlinkurl: "/geant/service-catalogue"
section: "OCRE 2024-rammeverk"
socialmedia: "/safespring-start.jpg"
toc: "På denne siden"
noindex: "x"
aliases:
  - /geant/service-catalogue/cloud-image/
---

{{< ingress >}}
Compute-tjenesten inneholder i tillegg en bildetjeneste (OpenStack Glance).
{{< /ingress >}}

## Skyavbildninger

Skyavbildninger er ferdiglagde operativsystemavbildninger som kan tas i bruk i et skymiljø der for eksempel det fremtidige servernavnet, IP- eller MAC-adressen ikke er kjent på forhånd. Avbildningene må ha rammeverket cloud-init installert, som gir OpenStack et API for å samhandle med de opprettede instansene og sette disse variablene i instansen.

Bildetjenesten lar brukere opprette, lese, oppdatere og slette egne avbildninger, enten de er laget av brukeren selv eller kopiert fra en annen kilde. Tjenesten inneholder også en liste over offentlige avbildninger som oppdateres jevnlig av leverandøren.

### Forutsetninger

Selv om bildetjenesten kan brukes frittstående, må du ha en serverinstans for å kunne starte en instans fra disse skyavbildningene.

### Lagringstjeneste for avbildninger

Grunnleveransen for bildetjenesten er selve tjenesten, som lagrer avbildninger for bruk i Compute-tjenesten. Produktkode: `IM-Storage`.

### Tilgjengelige offentlige avbildninger

Safespring tilbyr følgende offentlige skyavbildninger, basert på utgivelser fra upstream-prosjekter. Disse avbildningene oppdateres jevnlig innenfor sine hovedversjoner:

| Operativsystemavbildninger     |
| ------------------------------ |
| CentOS                         |
| Cirros                         |
| Debian                         |
| RedHat Enterprise Linux Server |
| Windows Server Datacenter      |
| Ubuntu                         |

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Ta kontakt med Safespring" %}}
{{< inline "Brukerstøtte:" >}} support@safespring.com  
{{< inline "Salg:" >}} +46855107370 or sales@safespring.se
{{% /custom-card %}}
