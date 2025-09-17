---
ai: true
title: "Nettverkstjenester"
language: "nb"
cardtitle: "Nettverk"
cardicon: "fa-solid fa-network-wired"
cardcolor: "#195F8C"
cardorder: "03"
date: "2025-01-20"
draft: false
intro: "Omfattende nettverkstjenester for sømløs tilkobling og kontroll, inkludert offentlige og private IP-adresser, sikker trafikkstyring, lastbalansering og avanserte alternativer for bruk i stor skala."
cardintro: "Omfattende nettverkstjenester for sømløs tilkobling og kontroll."
background: "safespring-compute-background.svg"
form: "nei"
sidebarlinkname: "Tilbake til alle kategorier"
sidebarlinkurl: "/geant/service-catalogue"
sidebarlinkname2: "Se pris på nettverk"
sidebarlinkurl2: "/geant/price/#network"
socialmedia: "safespring-compute.jpg"
section: "OCRE-rammeverk for 2024"
socialmedia: "/safespring-start.jpg"
toc: "På denne siden"
noindex: "x"
aliases:
- /geant/service-catalogue/network/
---
{{< ingress >}}
Obligatoriske og valgfrie nettverkstjenester ved bruk av IaaS-plattformene.
{{< /ingress >}}

Nettverksdesignet i Compute-plattformen er basert på L3 (IP) og maskinvarebasert ruting. Virtuelle rutere eller L2-overlaynettverk brukes ikke. Dette sikrer maksimal nettverksytelse og enkel drift uansett skala. Sikkerheten er basert på sett med tilgangskontrollister (ACL) på L3-nivå for IP-adresser. Hvis en kunde trenger overlaynettverk, står de fritt til å rulle dem ut – med lavere overhead og høyere ytelse enn hos konkurrerende leverandører.

Safespring har peering med de nasjonale forsknings- og utdanningsnettene (NREN), med redundante forbindelser til SUNET i Sverige og redundante forbindelser til SIKT i Norge.

Disse NREN-ene er koblet til NORDUnet, noe som gir rask forbindelse for kunder som er tilknyttet NREN-er i hele Europa.

Safespring støtter både {{< inline "SAML2" >}} og {{< inline "OIDC" >}} for føderert identitetshåndtering og autorisering til plattformen.

- Offentlige IPv4- og IPv6-adresser direkte tildelt nettverksgrensesnittet.
- Private adresser for intern kommunikasjon i miljøet.
- Ingress-/egress-trafikk kontrollert av API-drevne ACL-er.
- Administrert SLB (basert på BGP og haproxy).
- Ta med egne IP-prefikser (for store kunder).
- Reverse DNS-konfigurasjon (for store kunder, egne prefikser).

| Produktkode  | Beskrivelse                                                  |
| ------------ | ------------------------------------------------------------ |
| NET-publicv4 | Offentlig IPv4-adresse                                      |
| NET-publicv6 | Offentlig IPv6-adresse                                      |
| NET-ingress  | Ingresstrafikk inn til en instans fra utsiden av datasenteret |
| NET-egress   | Egresstrafikk fra en instans ut av datasenteret             |
| NET-mgn.slb  | Tjeneste for lastbalansering av applikasjoner               |
| NET-rdns     | Reverse DNS-oppføringer (PTR)                               |
| NET-byoip    | Ta med egne IP-prefikser                                    |

## Offentlige IP-adresser

Safespring leverer offentlige IPv4- og IPv6-adresser til tjenestene. Som standard får hver instans én av hver.

## Ingress- og egress-trafikk

Safespring måler ingress- og egress-trafikk for hver kundeinstans ved nettverksgrensen i hvert datasenter. Safespring fakturerer ikke for ingress- eller egress-trafikk. Safespring er direkte tilkoblet SUNET-, SIKT- og NORDUNET-nettverkene.

## Lastbalansering

Safespring tilbyr funksjonalitet som gir kunden mulighet til å sette opp lastbalansere i plattformen. Løsningen er basert på iBGP med anycast-ruting, noe som muliggjør en sikker og stabil lastbalanseringsløsning.

## Reverse DNS-konfigurasjon

Safespring tilbyr muligheten til å konfigurere reverse DNS-navn (PTR-oppføringer) for offentlige IP-adresser, tilpasset kundens behov. Denne tjenesten er særlig relevant for brukstilfeller som drift av SMTP-servere eller andre tjenester der reverse DNS er kritisk. Forespørsler vurderes fra sak til sak, og vi oppgir et kostnadsestimat basert på de spesifikke kravene.

## Ta med egne IP-prefikser

Kunder kan tildele egne IPv4-prefikser til plattformen for egen bruk i plattformen (minst /24). Safespring konfigurerer disse prefiksene i plattformen og annonserer dem til sine peering-partnere ved hjelp av BGP.

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Ta kontakt med Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Salg:" >}} +46855107370 or sales@safespring.se
{{% /custom-card %}}