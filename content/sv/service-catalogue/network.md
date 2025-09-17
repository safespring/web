---
ai: true
title: "Nätverkstjänster"
language: "sv"
cardtitle: "Nätverk"
cardicon: "fa-solid fa-network-wired"
cardcolor: "#195F8C"
cardorder: "02"
date: 2023-02-28
draft: false
intro: "Obligatoriska och valfria nätverkstjänster vid användning av IaaS-plattformar."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tillbaka till alla kategorier"
sidebarlinkurl: "/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Safesprings tjänstekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
- /service-catalogue/network/
---
{{< ingress >}}
Obligatoriska och valfria nätverkstjänster vid användning av IaaS-plattformarna.
{{< /ingress >}}

Nätverksdesignen för IaaS-plattformen bygger på L3 (IP) och hårdvarubaserad routning. Virtuella routrar eller L2 overlay-nät används inte. Detta säkerställer maximal nätverksprestanda och driftsmässig enkelhet i alla skalor. Säkerheten bygger på uppsättningar av L3-baserade åtkomstkontrollistor (ACL) för IP-adresser. Om en kund behöver overlay-nät kan de fritt etablera dem själva – med mindre overhead och högre prestanda än i konkurrerande leverantörslösningar.

1. Publika IPv4- och IPv6-adresser direkt tilldelade nätverksgränssnitt
1. Privata adresser för platsintern kommunikation
1. Ingress-/egress-trafik styrs av API-drivna ACL:er
1. Hanterad SLB (baserad på BGP och haproxy)
1. Saferoute / IP-VPN
1. Ta med egna IP-prefix (för stora kunder)
1. Reverse DNS-konfiguration (för stora kunder, egna prefix)

<table class="width100">
  <thead>
    <tr>
      <th>Produktkod</th>
      <th>Beskrivning</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>NET-publicv4</td>
      <td>Publik IPv4-adress</td>
    </tr>
    <tr>
      <td>NET-publicv6</td>
      <td>Publik IPv6-adress</td>
    </tr>
    <tr>
      <td>NET-byoip</td>
      <td>Ta med eget IP-prefix</td>
    </tr>
    <tr>
      <td>NET-ingress</td>
      <td>Ingress-trafik till en instans från utsidan av datacentret</td>
    </tr>
    <tr>
      <td>NET-egress</td>
      <td>Egress-trafik från en instans till utsidan av datacentret</td>
    </tr>
    <tr>
      <td>NET-mgn.slb</td>
      <td>Hanterad tjänstelastbalanserare</td>
    </tr>
    <tr>
      <td>NET-saferoute</td>
      <td>Saferoute MPLS-baserad IP-VPN</td>
    </tr>
    <tr>
      <td>NET-rdns</td>
      <td>Reverse DNS-poster (PTR)</td>
    </tr>
  </tbody>
</table>

## Publika IP-adresser

Safespring tillhandahåller publika IPv4- och IPv6-adresser till dina tjänster. Som standard får varje instans en av varje.

## Ta med egna IP-prefix

Kunder kan tilldela sina egna IPv4-prefix till plattformen för användning i plattformen (minsta storlek /24). Safespring konfigurerar dessa prefix i plattformen och annonserar dem till sina peers via BGP.

## Ingress-/egress-trafik

Safespring mäter ingress- och egress-trafik för varje kundinstans vid nätverksgränsen i varje datacenter.

## Hanterad SLB

Safespring driver en hanterad tjänstelastbalanserare åt kunder. Den körs på en serverinstans i kundens miljö. Lastbalanseraren är en prenumerationstjänst med månadsdebitering. Konfiguration och hantering ingår i priset. Ytterligare IPv4-adresser debiteras separat.

## Saferoute

Safespring tillhandahåller en MPLS-baserad IP-VPN-tjänst tillsammans med den lokala NREN som separerar trafiken från den vanliga Internettrafiken, så att kunder kan ansluta en miljö i Safesprings datacenter till sin egen lokala infrastruktur, t.ex. bakom brandväggar. Denna produkt förutsätter nätverksintegration med den lokala NREN och dess peers och är inte generellt tillgänglig för alla kunder, men andra VPN-lösningar kan i stället levereras via ordinarie Professional Services i sådana fall.

## Reverse DNS-konfiguration

Safespring erbjuder möjlighet att konfigurera reverse DNS-namn (PTR-poster) för publika IP-adresser, anpassade efter kundens behov. Tjänsten är särskilt relevant för användningsfall som drift av SMTP-servrar eller andra tjänster där reverse DNS är kritiskt. Förfrågningar bedöms från fall till fall, och vi lämnar en kostnadsuppskattning baserad på de specifika kraven.