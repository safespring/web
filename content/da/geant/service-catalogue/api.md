---
ai: true
title: "API-adgang"
language: "da"
cardtitle: "API-adgang"
cardicon: "fa-kit fa-api"
cardcolor: "#195F8C"
cardorder: "02"
date: "2025-01-20"
draft: false
intro: "Få adgang til og automatiser Safesprings skyinfrastruktur gnidningsfrit via vores omfattende API'er, så du får fuld kontrol over beregnings-, lagrings- og backup-tjenester."
cardintro: "Ubesværet automatisering i skyen gennem Safesprings API-adgang."
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tilbage til alle kategorier"
sidebarlinkurl: "/geant/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "OCRE 2024-rammeaftale"
socialmedia: "/safespring-start.jpg"
toc: "På denne side"
noindex: "x"
aliases:
- /geant/service-catalogue/api/
---
{{< ingress >}}
Alle Safesprings tjenester har API’er, som gør det muligt for brugeren at bruge tjenesterne på en mere automatiseret måde.
{{< /ingress >}}

## Compute-API

Safespring Compute er bygget på OpenStack, som leveres med et udvidbart API. De tjenester, som Safespring giver API-adgang til, er:

1. [Nova Compute](https://docs.openstack.org/api-ref/compute/). Dette API understøtter oprettelse, sletning og ændring af instanser (virtuelle maskiner) på platformen.
2. [Keystone Identity](https://docs.openstack.org/api-ref/identity/v3/). API’et håndterer al identitetsstyring og RBAC på platformen. Det er det API, som en bruger logger ind imod for at få et autentificeringstoken, der derefter kan bruges til efterfølgende kald til andre API’er på platformen.
3. [Glance-billedhåndtering](https://docs.openstack.org/api-ref/image/v2/). Dette API håndterer images og snapshots, hvorfra der kan oprettes instanser. Brugeren kan også bruge dette API til at uploade brugerdefinerede images til platformen.
4. [Neutron-netværk](https://docs.openstack.org/api-ref/network/v2/). Dette API håndterer netværk. Da Safespring bruger netværksmotoren Calico, er dette API begrænset, eftersom ikke alle operationer kan udføres med denne netværksmotor.
5. [Cinder-bloklager](https://docs.openstack.org/api-ref/block-storage/v3/). Dette API giver adgang til bloklageroperationer såsom at oprette og tilknytte volumener til instanser.

## Storage-API

Safespring Storage understøtter S3-API’et. S3-API’et er de facto-standarden for interaktion med objektlagertjenester. Tjenesten leveres af Ceph-projektet, og de operationer, der understøttes af implementeringen, kan ses her: https://docs.ceph.com/en/latest/radosgw/s3/.

## Backup-API

Safespring Backup bruger produktet Cloutility fra Aawau. API-specifikationen kan findes her: https://portal-api.backup.sto2.safedc.net/v1/help.
{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kontakt Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Salg:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}