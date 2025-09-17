---
ai: true
title: "Brug din egen licens – BYOL"
language: "da"
cardtitle: "Egen licens"
cardicon: "fa-solid fa-hand-holding-box"
cardcolor: "#195F8C"
cardorder: "11"
date: "2025-01-20"
draft: false
intro: "Bring Your Own License, brug af eksisterende softwarelicenser i Safesprings cloudmiljø"
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tilbage til alle kategorier"
sidebarlinkurl: "/geant/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "OCRE 2024-rammeværk"
socialmedia: "/safespring-start.jpg"
toc: "På denne side"
nosidebar: ""
noindex: "x"
aliases:
- /geant/service-catalogue/byol/
---
{{< ingress >}}
Safesprings Compute-tjenester leveres uden medfølgende betalte softwarelicenser fra softwareleverandører, hvilket gør Safespring Compute til et perfekt valg for kunder, der har eksisterende licensaftaler, som tillader udrulning i en offentlig cloud.
{{< /ingress >}}

Safespring pålægger ikke kunstige begrænsninger på kundernes mulighed for at anvende Bring Your Own License (BYOL); det afhænger udelukkende af leverandørernes licensaftaler.

{{% disclaimer "Ansvarsfraskrivelse" %}}
Da Safespring er tredjepart i licensaftalen mellem kunden og softwareleverandørerne, er det kundens ansvar at sikre, at licenskravene for at køre softwaren på cloudplatformen er opfyldt.

Eventuelle angivelser af tilladelighed her er kun ment som vejledning til kunden. Det er kundens ansvar at fastslå, om deres licensaftaler tillader drift på Safesprings Compute-platforme.
{{% /disclaimer %}}

## Softwareleverandører

Softwareleverandører med kommerciel support og kendte tilladelsesvilkår er listet i tabellen nedenfor.

| Leverandør | Software                                 |
| ---------- | ---------------------------------------- |
| Adobe      | Adobe Creative Suite                     |
| Mathworks  | Matlab                                   |
| Microsoft  | Windows Server, SQL Server, Windows [^1] |
| Oracle     | Oracle Database                          |
| Red Hat    | Red Hat Enterprise Linux                 |
| SUSE       | SUSE Enterprise Linux                    |

Safespring begrænser ikke på nogen måde, hvilken software kunderne bruger, ud over via deres [Politik for acceptabel brug](/documents/safespring-acceptable_use_policy.pdf). Det betyder, at enhver Linux-distribution, der kan køre på x86-platforme på en standard, moderne KVM-hypervisor, teknisk set understøttes, hvilket i praksis omfatter stort set alle community-udgaver.

{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kontakt Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Salg:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}
{{< distance >}}

### Bemærkninger

[^1]: I øjeblikket muligt med Software Assurance eller abonnement