---
ai: true
title: "Medbring din egen licens – BYOL"
language: "da"
cardtitle: "Egen licens"
cardicon: "fa-solid fa-hand-holding-box"
cardcolor: "#195F8C"
cardorder: "09"
date: 2024-05-17
draft: false
intro: "Medbring din egen licens: brug eksisterende softwarelicenser i Safesprings cloudmiljø"
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tilbage til alle kategorier"
sidebarlinkurl: "/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Safespring Servicekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
nosidebar: ""
aliases:
- /service-catalogue/byol/
---
{{< ingress >}}
Safespring stiller flere tredjeparts-softwarelicenser til rådighed til brug på vores IaaS-platforme.
{{< /ingress >}}

Safesprings IaaS-tjenester leveres uden medfølgende betalte softwarelicenser fra softwareleverandører, hvilket gør dem velegnede til kunder, der allerede har licensaftaler, som tillader udrulning i en offentlig cloud. Safespring pålægger ingen kunstige begrænsninger på kundernes muligheder for at bruge BYOL; det afhænger udelukkende af leverandørernes licensaftaler.

{{% disclaimer "Licensansvar" %}}
Da Safespring er tredjepart i licensaftalen mellem kunden og softwareleverandørerne, er det kundens ansvar at sikre, at licenskravene for at køre software på cloud-platformen er opfyldt.

Eventuelle angivelser af tilladelighed her er kun vejledende. Kunden er ansvarlig for at afklare, om vedkommendes licensaftaler tillader brug på Safesprings IaaS-platforme.
{{% /disclaimer %}}

## Leverandører

Leverandører med kommerciel support og kendte vilkår for tilladelighed er angivet i tabellen nedenfor.

| Leverandør | Software                                               | Kommentar                                                                                                                                                    |
| ---------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Microsoft  | Applikationer, ikke operativsystemer som Windows/Windows Server. | På nuværende tidspunkt muligt med Software Assurance og License Mobility                                                                                     |
| RedHat     | Red Hat Enterprise Linux                               | Tilladt via SLA-klausul for tredjepartssoftware.                                                                                                            |
| SUSE       | SUSE Enterprise Linux                                  | Tilladt.                                                                                                                                                     |
| Oracle     | Oracle Database                                        | Tilladt på Safesprings virtuelle IaaS med risiko for manglende support, hvis Oracle vurderer, at årsagen ikke er Oracle-software. Bare-metal-udrulninger får fuld support. |

Safespring begrænser ikke på nogen måde, hvilken software kunderne bruger, ud over via sin [Politik for acceptabel brug](/documents/safespring-acceptable_use_policy.pdf). Det betyder, at enhver Linux-distribution, der kan køre på x86-platforme på moderne standard KVM-hypervisorer, er teknisk understøttet, herunder stort set alle community-udgaver.