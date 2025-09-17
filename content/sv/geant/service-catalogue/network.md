---
ai: true
title: "Nätverkstjänster"
language: "sv"
cardtitle: "Nätverk"
cardicon: "fa-solid fa-network-wired"
cardcolor: "#195F8C"
cardorder: "03"
date: "2025-01-20"
draft: false
intro: "Omfattande nätverkstjänster för sömlös anslutning och kontroll, inklusive publika/privata IP-adresser, säker trafikhantering, lastbalansering och avancerade alternativ för storskalig användning."
cardintro: "Heltäckande nätverkstjänster för sömlös uppkoppling och kontroll."
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tillbaka till alla kategorier"
sidebarlinkurl: "/geant/service-catalogue"
sidebarlinkname2: "Se pris för nätverk"
sidebarlinkurl2: "/geant/price/#network"
socialmedia: "safespring-compute.jpg"
section: "OCRE 2024-ramverket"
socialmedia: "/safespring-start.jpg"
toc: "På den här sidan"
noindex: "x"
aliases:
- /geant/service-catalogue/network/
---
{{< ingress >}}
Obligatoriska och valfria nätverkstjänster vid användning av IaaS-plattformarna.
{{< /ingress >}}

Nätverksdesignen för Compute-plattformen är baserad på L3 (IP) och hårdvarubaserad routning. Virtuella routrar eller L2-overlaynät används inte. Detta säkerställer maximal nätverksprestanda och enkel drift oavsett skala. Säkerheten baseras på uppsättningar av åtkomstkontrollistor (ACL) på L3-nivå. Om en kund behöver overlay-nät kan de fritt implementera dem – med lägre overhead och högre prestanda än i konkurrerande leverantörers lösningar.

Safespring har peering med de nationella forsknings- och utbildningsnäten (NREN) med redundanta anslutningar till SUNET i Sverige och redundanta anslutningar till SIKT i Norge.

Dessa NREN är anslutna via Nordunet vilket ger snabb anslutning för kunder som är kopplade till NREN i hela Europa.

Safespring stödjer både {{< inline "SAML2" >}} och {{< inline "OIDC" >}} för federerad identitetshantering och auktorisering till plattformen.

- Publika IPv4- och IPv6-adresser tilldelas direkt till nätverksgränssnittet.
- Privata adresser för platsintern kommunikation.
- Ingress-/egress-trafik styrs av API-drivna ACL:er.
- Hanterad SLB (baserad på BGP och haproxy).
- Ta med egna IP-prefix (för större kunder).
- Reverse DNS-konfiguration (för större kunder, egna prefix).

| Produktkod   | Beskrivning                                                  |
| ------------ | ------------------------------------------------------------ |
| NET-publicv4 | Publik IPv4-adress                                           |
| NET-publicv6 | Publik IPv6-adress                                           |
| NET-ingress  | Ingress-trafik in till en instans från utsidan av datacentret |
| NET-egress   | Egress-trafik från en instans till utsidan av datacentret    |
| NET-mgn.slb  | Tjänst för lastbalansering av applikationer                  |
| NET-rdns     | Reverse DNS-poster (PTR)                                     |
| NET-byoip    | Ta med egna IP-prefix                                        |

## Publika IP-adresser

Safespring tillhandahåller publika IPv4- och IPv6-adresser till tjänsterna. Som standard får varje instans en av varje.

## Ingress- och egress-trafik

Safespring mäter ingress- och egress-trafik för varje kundinstans vid nätverksgränsen i varje datacenter. Safespring tar inte betalt för ingress- eller egress-trafik. Safespring är direkt anslutet till SUNET, SIKT och NORDUNET.

## Lastbalansering

Safespring erbjuder funktionalitet som ger kunden möjlighet att sätta upp lastbalanserare i plattformen. Lösningen är baserad på iBGP med anycast-routning som möjliggör en säker och stabil lastbalanseringslösning.

## Reverse DNS-konfiguration

Safespring erbjuder möjlighet att konfigurera omvända DNS-namn (PTR-poster) för publika IP-adresser, anpassat efter kundens behov. Tjänsten är särskilt relevant för användningsfall som att drifta SMTP-servrar eller andra tjänster där reverse DNS är kritiskt. Förfrågningar bedöms från fall till fall, och vi återkommer med en kostnadsuppskattning baserat på de specifika kraven.

## Ta med egna IP-prefix

Kunder kan tilldela egna IPv4-prefix i plattformen för eget bruk (minsta storlek /24). Safespring konfigurerar dessa prefix i plattformen och annonserar dem till sina peers med BGP.

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kom i kontakt med Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Sälj:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}