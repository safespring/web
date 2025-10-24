---
ai: true
title: "Ta med din egen lisens – BYOL"
language: "nb"
cardtitle: "Egen lisens"
cardicon: "fa-solid fa-hand-holding-box"
cardcolor: "#195F8C"
cardorder: "09"
date: 2024-05-17
draft: false
intro: "Ta med din egen lisens (BYOL), bruk av eksisterende programvarelisenser i Safesprings skymiljø"
cardintro: ""
background: "safespring-compute-background.svg"
form: "nei"
sidebarlinkname: "Tilbake til alle kategorier"
sidebarlinkurl: "/service-catalogue"
section: "Safesprings tjenestekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
nosidebar: ""
aliases:
  - /service-catalogue/byol/
---

{{< ingress >}}
Safespring tilbyr flere tredjeparts programvarelisenser for bruk på våre IaaS-plattformer.
{{< /ingress >}}

Safesprings IaaS-tjenester leveres uten medfølgende betalte programvarelisenser fra programvareleverandører, noe som gjør Safesprings IaaS-tjenester godt egnet for kunder som allerede har lisensavtaler som tillater utrulling i en offentlig sky. Safespring legger ikke kunstige begrensninger på kundenes mulighet til å implementere BYOL; dette styres utelukkende av leverandørenes lisensavtaler.

{{% disclaimer "Lisansansvar" %}}
Siden Safespring er en tredjepart i lisensavtalen mellom kunden og programvareleverandørene, er det kundens ansvar å sørge for at lisenskravene for å kjøre programvare på skyplattformen oppfylles.

Enhver indikasjon på tillatelse som gis her, er kun ment som veiledning til kunden. Det er kundens ansvar å avklare hvorvidt deres lisensavtaler tillater bruk på Safesprings IaaS-plattformer.
{{% /disclaimer %}}

## Leverandører

Leverandører med kommersiell støtte og kjente vilkår for tillatt bruk er listet i tabellen nedenfor.

| Leverandør | Programvare                                          | Kommentar                                                                                                                                                           |
| ---------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Microsoft  | Applikasjoner, ikke OS som Windows / Windows Server. | For tiden mulig med Software Assurance og License Mobility                                                                                                          |
| RedHat     | Red Hat Enterprise Linux                             | Tillatt via SLA-klausul for tredjepartsprogramvare.                                                                                                                 |
| SUSE       | SUSE Enterprise Linux                                | Tillatt.                                                                                                                                                            |
| Oracle     | Oracle Database                                      | Tillatt på Safesprings virtuelle IaaS med risiko for manglende støtte hvis Oracle mener årsaken ikke er Oracle-programvare. Bare-metal-utrullinger får full støtte. |

Safespring begrenser ikke på noen måte hvilken programvare kundene bruker, utover det som følger av [retningslinjene for akseptabel bruk](/documents/safespring-acceptable_use_policy.pdf). Dette betyr at enhver Linux-distribusjon som kan kjøre på x86-plattformer på standard, moderne KVM-hypervisorer, er teknisk støttet, inkludert i praksis alle community-utgaver.
