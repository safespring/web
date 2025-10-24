---
ai: true
title: "API-tilgang"
language: "nb"
cardtitle: "API-tilgang"
cardicon: "fa-kit fa-api"
cardcolor: "#195F8C"
cardorder: "02"
date: "2025-01-20"
draft: false
intro: "Få sømløs tilgang til og automatiser Safesprings skyinfrastruktur via våre omfattende API-er, som muliggjør full kontroll over compute-, lagrings- og backup-tjenester."
cardintro: "Enkel skyautomatisering med Safesprings API Access."
background: "safespring-compute-background.svg"
form: "nei"
sidebarlinkname: "Tilbake til alle kategorier"
sidebarlinkurl: "/geant/service-catalogue"
section: "OCRE 2024-rammeverk"
socialmedia: "/safespring-start.jpg"
toc: "På denne siden"
noindex: "x"
aliases:
  - /geant/service-catalogue/api/
---

{{< ingress >}}
Alle Safesprings tjenester har API-er som gjør det mulig for brukeren å benytte tjenestene på en mer automatisert måte.
{{< /ingress >}}

## Compute-API

Safespring Compute er bygget på OpenStack, som leveres med et utvidbart API. Tjenestene Safespring tilbyr API-tilgang til er:

1. [Nova Compute](https://docs.openstack.org/api-ref/compute/). Dette API-et støtter oppretting, sletting og endring av instanser (virtuelle maskiner) i plattformen.
2. [Keystone Identity](https://docs.openstack.org/api-ref/identity/v3/). API-et håndterer all identitetshåndtering og RBAC i plattformen. Dette er API-et en bruker logger inn mot for å få et autentiseringstoken som deretter kan brukes i påfølgende kall til andre API-er i plattformen.
3. [Glance-bildehåndtering](https://docs.openstack.org/api-ref/image/v2/). Dette API-et håndterer bilder og øyeblikksbilder, som det kan opprettes instanser fra. Brukeren kan også bruke dette API-et til å laste opp egendefinerte bilder til plattformen.
4. [Neutron-nettverk](https://docs.openstack.org/api-ref/network/v2/). Dette API-et håndterer nettverk. Siden Safespring bruker nettverksmotoren Calico, er dette API-et begrenset fordi ikke alle operasjoner kan utføres når man bruker denne nettverksmotoren.
5. [Cinder-blokklagring](https://docs.openstack.org/api-ref/block-storage/v3/). Dette API-et gir tilgang til blokklagringsoperasjoner som å opprette og koble volumer til instanser.

## Lagrings-API

Safespring Storage støtter S3-API-et. S3-API-et er de facto-standarden for å samhandle med objektlagringstjenester. Tjenesten leveres gjennom lagringsprosjektet Ceph, og operasjonene som støttes av implementasjonen kan sees her: https://docs.ceph.com/en/latest/radosgw/s3/.

## Backup-API

Safespring Backup bruker produktet Cloutility fra Aawau. API-spesifikasjonen finnes her: https://portal-api.backup.sto2.safedc.net/v1/help.
{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Ta kontakt med Safespring" %}}
{{< inline "Brukerstøtte:" >}} support@safespring.com  
{{< inline "Salg:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}
