---
ai: true
title: "Ta med din egen licens – BYOL"
language: "sv"
cardtitle: "Egen licens"
cardicon: "fa-solid fa-hand-holding-box"
cardcolor: "#195F8C"
cardorder: "11"
date: "2025-01-20"
draft: false
intro: "Ta med din egen licens, använd befintliga programvarulicenser i Safesprings molnmiljö"
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tillbaka till alla kategorier"
sidebarlinkurl: "/geant/service-catalogue"
section: "OCRE 2024-ramverk"
socialmedia: "/safespring-start.jpg"
toc: "På den här sidan"
nosidebar: ""
noindex: "x"
aliases:
  - /geant/service-catalogue/byol/
---

{{< ingress >}}
Safesprings Compute-tjänster finns tillgängliga utan medföljande betalda programvarulicenser från programvaruleverantörer, vilket gör Safesprings Compute-tjänster till ett perfekt val för kunder som har befintliga licensavtal som tillåter driftsättning i ett publikt moln.
{{< /ingress >}}

Safespring inför inga godtyckliga begränsningar för kundernas möjligheter att använda Bring Your Own License (BYOL); det avgörs enbart av leverantörernas licensavtal.

{{% disclaimer "Ansvarsfriskrivning" %}}
Eftersom Safespring är en tredje part till licensavtalet mellan kunden och programvaruleverantörerna är det kundens ansvar att säkerställa att licenskraven uppfylls för att köra programvaran på molnplattformen.

Eventuella indikationer på tillåtlighet här är endast avsedda som vägledning till kunden. Det är kundens ansvar att fastställa att dess licensavtal medger körning på Safesprings Compute-plattformar.
{{% /disclaimer %}}

## Programvaruleverantörer

Programvaruleverantörer med kommersiellt stöd och kända villkor som medger användning listas i tabellen nedan.

| Leverantör | Programvara                              |
| ---------- | ---------------------------------------- |
| Adobe      | Adobe Creative Suite                     |
| Mathworks  | Matlab                                   |
| Microsoft  | Windows Server, SQL Server, Windows [^1] |
| Oracle     | Oracle Database                          |
| Red Hat    | Red Hat Enterprise Linux                 |
| SUSE       | SUSE Enterprise Linux                    |

Safespring begränsar inte på något sätt vilken programvara kunderna använder, annat än genom sin [Policy för acceptabel användning](/documents/safespring-acceptable_use_policy.pdf). Detta innebär att alla Linux-distributioner som kan köras på x86-plattformar på en modern standard-KVM-hypervisor är tekniskt stödda, inklusive i princip alla community-utgåvor.

{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kontakta Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Försäljning:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}
{{< distance >}}

### Noter

[^1]: För närvarande möjligt med Software Assurance eller prenumeration
