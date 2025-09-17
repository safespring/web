---
ai: true
title: "Bruk din egen lisens – BYOL"
language: "nb"
cardtitle: "Egen lisens"
cardicon: "fa-solid fa-hand-holding-box"
cardcolor: "#195F8C"
cardorder: "11"
date: "2025-01-20"
draft: false
intro: "Ta med egen lisens (BYOL), bruk eksisterende programvarelisenser i Safesprings skymiljø"
cardintro: ""
background: "safespring-compute-background.svg"
form: "nei"
sidebarlinkname: "Tilbake til alle kategorier"
sidebarlinkurl: "/geant/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "OCRE 2024-rammeverk"
socialmedia: "/safespring-start.jpg"
toc: "På denne siden"
nosidebar: ""
noindex: "x"
aliases:
- /geant/service-catalogue/byol/
---
{{< ingress >}}
Safesprings Compute-tjenester er tilgjengelige uten medfølgende betalte programvarelisenser fra programvareleverandører, noe som gjør Safesprings Compute-tjenester til et perfekt valg for kunder som har eksisterende lisensavtaler som tillater utrulling i en offentlig sky.
{{< /ingress >}}

Safespring pålegger ingen kunstige begrensninger på kundenes muligheter til å bruke Bring Your Own License (BYOL); dette styres utelukkende av leverandørenes lisensavtaler.

{{% disclaimer "Ansvarsfraskrivelse" %}}
Siden Safespring er en tredjepart til lisensavtalen mellom kunden og programvareleverandørene, er det kundens ansvar å sørge for at lisenskravene for å kjøre programvaren på skyplattformen er oppfylt.

Eventuelle indikasjoner på at noe er tillatt her, er kun ment som veiledning for kunden. Det er kundens ansvar å fastslå at lisensavtalene tillater kjøring på Safesprings Compute-plattformer.
{{% /disclaimer %}}

## Programvareleverandører

Programvareleverandører med kommersiell støtte og kjente vilkår for tillatt bruk er listet i tabellen nedenfor.

| Leverandør | Programvare                             |
| ---------- | --------------------------------------- |
| Adobe      | Adobe Creative Suite                    |
| Mathworks  | Matlab                                  |
| Microsoft  | Windows Server, SQL Server, Windows [^1]|
| Oracle     | Oracle Database                         |
| Red Hat    | Red Hat Enterprise Linux                |
| SUSE       | SUSE Enterprise Linux                   |

Safespring begrenser ikke på noen måte hvilken programvare kundene bruker, annet enn gjennom sine [Retningslinjer for akseptabel bruk](/documents/safespring-acceptable_use_policy.pdf). Dette betyr at enhver Linux-distribusjon som kan kjøre på x86-plattformer på en standard, moderne KVM-hypervisor, er teknisk støttet, inkludert i praksis alle community-utgaver.

{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Ta kontakt med Safespring" %}}
{{< inline "Brukerstøtte:" >}} support@safespring.com  
{{< inline "Salg:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}
{{< distance >}}

### Merknader

[^1]: For tiden mulig med Software Assurance eller abonnement