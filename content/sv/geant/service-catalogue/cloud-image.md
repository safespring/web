---
ai: true
title: "Molnbildtjänst"
language: "sv"
cardtitle: "Molnavbilder"
cardicon: "fa-solid fa-compact-disc"
cardcolor: "#195F8C"
cardorder: "04"
date: "2025-01-20"
draft: false
cardintro: "IaaS-tjänsten innehåller dessutom en avbildstjänst i molnet (Openstack Glance)."
intro: "Hantera och distribuera operativsystemavbilder i molnet smidigt med Safesprings Image Service, som drivs av OpenStack Glance och möjliggör anpassade eller förkonfigurerade molnmiljöer."
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tillbaka till alla kategorier"
sidebarlinkurl: "/geant/service-catalogue"
section: "OCRE 2024-ramverk"
socialmedia: "/safespring-start.jpg"
toc: "På den här sidan"
noindex: "x"
aliases:
  - /geant/service-catalogue/cloud-image/
---

{{< ingress >}}
Compute-tjänsten innehåller dessutom en tjänst för molnavbilder (OpenStack Glance).
{{< /ingress >}}

## Molnavbilder

Molnavbilder är förberedda OS-avbildningar som kan distribueras i en molnmiljö där till exempel den blivande serverns namn, IP- eller MAC-adress inte är känd i förväg. Avbilderna behöver ha ramverket cloud-init installerat, vilket ger OpenStack ett API för att interagera med de skapade instanserna och sätta dessa variabler i instansen.

Avbildningstjänsten låter användare skapa, läsa, uppdatera och ta bort egna avbilder som de antingen själva har skapat eller kopierat från en annan källa. Tjänsten innehåller också en lista över offentliga avbilder som uppdateras regelbundet av leverantören.

### Förutsättningar

Även om avbildningstjänsten kan användas fristående krävs en serverinstans för att starta en avbild med hjälp av dessa molnavbilder.

### Lagringstjänst för avbilder

Basutbudet i avbildningstjänsten är själva tjänsten, som lagrar avbilder för användning inom Compute-tjänsten. Produktkod: `IM-Storage`.

### Tillhandahållna offentliga avbilder

Safespring tillhandahåller följande offentliga molnavbilder, baserade på upstream-projektens releaser. Dessa avbilder uppdateras regelbundet inom sina huvudversioner:

| Operativsystemsavbilder        |
| ------------------------------ |
| CentOS                         |
| Cirros                         |
| Debian                         |
| RedHat Enterprise Linux Server |
| Windows Server Datacenter      |
| Ubuntu                         |

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kontakta Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Försäljning:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}
