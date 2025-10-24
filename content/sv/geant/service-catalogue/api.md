---
ai: true
title: "API-åtkomst"
language: "sv"
cardtitle: "API-åtkomst"
cardicon: "fa-kit fa-api"
cardcolor: "#195F8C"
cardorder: "02"
date: "2025-01-20"
draft: false
intro: "Få sömlös åtkomst till och automatisera Safesprings molninfrastruktur via våra omfattande API:er, vilket ger full kontroll över beräkningsresurser, lagring och säkerhetskopiering."
cardintro: "Smidig molnautomatisering via Safesprings API Access."
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tillbaka till alla kategorier"
sidebarlinkurl: "/geant/service-catalogue"
section: "OCRE 2024-ramverk"
socialmedia: "/safespring-start.jpg"
toc: "På den här sidan"
noindex: "x"
aliases:
  - /geant/service-catalogue/api/
---

{{< ingress >}}
Alla Safesprings tjänster har API:er som möjliggör en mer automatiserad användning av tjänsterna.
{{< /ingress >}}

## Compute-API

Safespring Compute är byggt på OpenStack, som levereras med ett utökningsbart API. Tjänsterna som Safespring tillhandahåller API-åtkomst till är:

1. [Nova Compute](https://docs.openstack.org/api-ref/compute/). Detta API stöder att skapa, ta bort och ändra instanser (virtuella maskiner) i plattformen.
2. [Keystone Identity](https://docs.openstack.org/api-ref/identity/v3/). API:et hanterar all identitetshantering och RBAC i plattformen. Det här är det API som en användare loggar in mot för att få en autentiseringstoken som sedan kan användas vid efterföljande anrop till andra API:er i plattformen.
3. [Glance – avbildningshantering](https://docs.openstack.org/api-ref/image/v2/). Detta API hanterar avbildningar och ögonblicksbilder, från vilka en instans kan skapas. Användaren kan också använda detta API för att ladda upp egna avbildningar till plattformen.
4. [Neutron Network](https://docs.openstack.org/api-ref/network/v2/). Detta API hanterar nätverk. Eftersom Safespring använder nätverksmotorn Calico är detta API begränsat, då inte alla åtgärder kan utföras när denna nätverksmotor används.
5. [Cinder Blocklagring](https://docs.openstack.org/api-ref/block-storage/v3/). Detta API ger tillgång till blocklagringsåtgärder såsom att skapa och koppla volymer till instanser.

## Lagrings-API

Safespring Storage stödjer S3-API:et. S3-API:et är de facto-standard för interaktion med objektlagringstjänster. Tjänsten tillhandahålls via lagringsprojektet Ceph, och de operationer som stöds av implementationen kan ses här: https://docs.ceph.com/en/latest/radosgw/s3/.

## Backup-API

Safespring Backup använder produkten Cloutility från Aawau. API-specifikationen finns här: https://portal-api.backup.sto2.safedc.net/v1/help.
{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kom i kontakt med Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Försäljning:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}
