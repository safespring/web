---
ai: true
title: "Netværkstjenester"
language: "da"
cardtitle: "Netværk"
cardicon: "fa-solid fa-network-wired"
cardcolor: "#195F8C"
cardorder: "03"
date: "2025-01-20"
draft: false
intro: "Omfattende netværkstjenester til problemfri forbindelse og kontrol, herunder offentlige/private IP-adresser, sikker trafikstyring, belastningsudligning og avancerede muligheder for brugere i stor skala."
cardintro: "Omfattende netværkstjenester til sømløs forbindelse og kontrol."
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tilbage til alle kategorier"
sidebarlinkurl: "/geant/service-catalogue"
sidebarlinkname2: "Se prisen for netværk"
sidebarlinkurl2: "/geant/price/#network"
socialmedia: "safespring-compute.jpg"
section: "OCRE 2024-rammeværk"
socialmedia: "/safespring-start.jpg"
toc: "På denne side"
noindex: "x"
aliases:
- /geant/service-catalogue/network/
---
{{< ingress >}}
Obligatoriske og valgfrie netværkstjenester ved brug af IaaS-platformene.
{{< /ingress >}}

Netværksdesignet i Compute-platformen er baseret på L3 (IP) og hardwarebaseret routing. Virtuelle routere eller L2-overlaynetværk bruges ikke. Det sikrer maksimal netværksydelse og driftsmæssig enkelhed på alle niveauer. Sikkerheden er baseret på sæt af adgangskontrollister (ACL’er) baseret på L3‑IP‑adresser. Hvis en kunde har behov for overlay-netværk, kan de frit implementere dem – med lavere overhead og højere ydeevne end hos konkurrerende udbydere.

Safespring har peering med de nationale forsknings- og uddannelsesnet (NREN) med redundante forbindelser til SUNET i Sverige og redundante forbindelser til SIKT i Norge.

Disse NREN er forbundet med Nordunet, hvilket giver en hurtig forbindelse for kunder, der er tilsluttet NREN i hele Europa.

Safespring understøtter både {{< inline "SAML2" >}} og {{< inline "OIDC" >}} til fødereret identitetshåndtering og autorisation til platformen.

- Offentlige IPv4- og IPv6-adresser tildelt direkte til netværksgrænsefladen.
- Private adresser til intern kommunikation på sitet.
- Ingress-/egress-trafik styret af API-drevne adgangskontrollister (ACL’er).
- Administreret SLB (baseret på BGP og haproxy).
- Egne IP-præfikser (for større kunder).
- Reverse DNS-konfiguration (for større kunder, egne præfikser).

| Product Code | Beskrivelse                                                  |
| ------------ | ------------------------------------------------------------ |
| NET-publicv4 | Offentlig IPv4-adresse                                       |
| NET-publicv6 | Offentlig IPv6-adresse                                       |
| NET-ingress  | Ingress-trafik ind i en instans fra uden for datacentret     |
| NET-egress   | Egress-trafik fra en instans til uden for datacentret        |
| NET-mgn.slb  | Tjeneste til lastbalancering af applikationer                 |
| NET-rdns     | Reverse DNS-poster (PTR)                                     |
| NET-byoip    | Egne IP-præfikser                                            |

## Offentlige IP-adresser

Safespring leverer offentlige IPv4- og IPv6-adresser til tjenesterne. Som standard får hver instans én af hver.

## Ingress- og egress-trafik

Safespring måler ingress- og egress-trafik for hver kundeinstans ved netværksgrænsen i hvert datacenter. Safespring fakturerer ikke for ingress- eller egress-trafik. Safespring er direkte forbundet til SUNET-, SIKT- og NORDUNET-netværkene.

## Lastbalancering

Safespring tilbyder funktionalitet, der giver kunder mulighed for at opsætte load balancere i platformen. Løsningen er baseret på iBGP med anycast-routing, hvilket muliggør en sikker og stabil lastbalanceringsløsning.

## Reverse DNS-konfiguration

Safespring tilbyder muligheden for at konfigurere reverse DNS-navne (PTR-poster) for offentlige IP-adresser, tilpasset kundens behov. Tjenesten er særligt relevant til brugsscenarier som hosting af SMTP-servere eller andre tjenester, hvor reverse DNS er afgørende. Anmodninger vurderes fra sag til sag, og vi giver et estimeret omkostningsoverslag baseret på de konkrete krav.

## Egne IP-præfikser

Kunder kan allokere deres egne IPv4-præfikser til platformen til eget brug i platformen (mindstestørrelse /24). Safespring konfigurerer disse præfikser i platformen og annoncerer dem til sine peers via BGP.

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kontakt Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Salg:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}