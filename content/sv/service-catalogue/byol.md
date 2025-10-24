---
ai: true
title: "Ta med din egen licens – BYOL"
language: "sv"
cardtitle: "Egen licens"
cardicon: "fa-solid fa-hand-holding-box"
cardcolor: "#195F8C"
cardorder: "09"
date: 2024-05-17
draft: false
intro: "Ta med din egen licens, använd befintliga programvarulicenser i Safesprings molnmiljö"
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tillbaka till alla kategorier"
sidebarlinkurl: "/service-catalogue"
section: "Safespring tjänstekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
nosidebar: ""
aliases:
  - /service-catalogue/byol/
---

{{< ingress >}}
Safespring tillhandahåller flera licenser för tredjepartsprogramvara för användning på våra IaaS-plattformar.
{{< /ingress >}}

Safesprings IaaS-tjänster finns tillgängliga utan paketerade betalda programvarulicenser från leverantörer, vilket gör Safesprings IaaS-tjänster till ett perfekt val för kunder som redan har licensavtal som medger driftsättning i ett publikt moln. Safespring inför inga konstgjorda begränsningar av kundernas möjligheter att använda BYOL; det styrs enbart av leverantörernas licensavtal.

{{% disclaimer "Licensansvar" %}}
Eftersom Safespring är en tredje part i licensavtalet mellan kunden och programvaruleverantörerna är det kundens ansvar att säkerställa att licenskraven för att köra programvara på molnplattformen uppfylls.

All information om tillåtlighet som lämnas här är endast avsedd som vägledning. Det är kundens ansvar att fastställa om de egna licensavtalen medger drift på Safesprings IaaS-plattformar.
{{% /disclaimer %}}

## Leverantörer

Leverantörer med kommersiellt stöd och kända licensvillkor som medger användning listas i tabellen nedan.

| Leverantör | Programvara                                                      | Kommentar                                                                                                                                                                       |
| ---------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Microsoft  | Applikationer, inte operativsystem såsom Windows/Windows Server. | För närvarande möjligt med Software Assurance och License Mobility                                                                                                              |
| RedHat     | Red Hat Enterprise Linux                                         | Tillåtet enligt klausulen om SLA för tredjepartsprogramvara.                                                                                                                    |
| SUSE       | SUSE Enterprise Linux                                            | Tillåtet.                                                                                                                                                                       |
| Oracle     | Oracle Database                                                  | Tillåtet på Safesprings virtuella IaaS, med risk för uteblivet stöd om Oracle anser att orsaken inte ligger i Oracles programvara. Installationer på bare metal får fullt stöd. |

Safespring begränsar inte på något sätt vilken programvara kunderna använder, annat än via sin [Policy för acceptabel användning](/documents/safespring-acceptable_use_policy.pdf). Detta innebär att alla Linux-distributioner som kan köras på x86-plattformar på moderna standardhypervisorer baserade på KVM är tekniskt stödda, inklusive i princip samtliga communityutgåvor.
