---
ai: true
title: "Netværkstjenester"
language: "da"
cardtitle: "Netværk"
cardicon: "fa-solid fa-network-wired"
cardcolor: "#195F8C"
cardorder: "02"
date: 2023-02-28
draft: false
intro: "Obligatoriske og valgfrie netværkstjenester ved brug af IaaS-platforme."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tilbage til alle kategorier"
sidebarlinkurl: "/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Safespring Servicekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
- /service-catalogue/network/
---
{{< ingress >}}
Obligatoriske og valgfrie netværkstjenester ved brug af IaaS-platformene.
{{< /ingress >}}

Netværksdesignet for IaaS-platformen er baseret på L3 (IP) og hardwarebaseret routing. Virtuelle routere eller L2-overlay-netværk anvendes ikke. Det sikrer maksimal netværksydelse og driftsmæssig enkelhed i alle skalaer. Sikkerheden er baseret på sæt af adgangskontrollister (ACL'er) på L3/IP-adresser. Hvis en kunde har brug for overlay-netværk, kan de frit implementere dem – med mindre overhead og højere ydeevne end i konkurrerende udbyderes løsninger.

1. Offentlige IPv4- og IPv6-adresser tildelt direkte til netværksgrænsefladen
1. Private adresser til site-intern kommunikation
1. Ingress-/egress-trafik styres af API-drevne ACL'er
1. Administreret SLB (baseret på BGP og haproxy)
1. Saferoute / IP-VPN
1. Medbring egne IP-præfikser (for store kunder)
1. Reverse DNS-konfiguration (for store kunder, egne præfikser)

<table class="width100">
  <thead>
    <tr>
      <th>Produktkode</th>
      <th>Beskrivelse</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>NET-publicv4</td>
      <td>Offentlig IPv4-adresse</td>
    </tr>
    <tr>
      <td>NET-publicv6</td>
      <td>Offentlig IPv6-adresse</td>
    </tr>
    <tr>
      <td>NET-byoip</td>
      <td>Medbring eget IP-præfiks</td>
    </tr>
    <tr>
      <td>NET-ingress</td>
      <td>Ingress-trafik ind i en instans fra uden for datacentret</td>
    </tr>
    <tr>
      <td>NET-egress</td>
      <td>Egress-trafik fra en instans til uden for datacentret</td>
    </tr>
    <tr>
      <td>NET-mgn.slb</td>
      <td>Administreret Service Load Balancer</td>
    </tr>
    <tr>
      <td>NET-saferoute</td>
      <td>Saferoute MPLS-baseret IP-VPN</td>
    </tr>
    <tr>
      <td>NET-rdns</td>
      <td>Reverse DNS-poster (PTR)</td>
    </tr>
  </tbody>
</table>

## Offentlige IP-adresser

Safespring leverer offentlige IPv4- og IPv6-adresser til dine tjenester. Som standard får hver instans én af hver.

## Medbring egne IP-præfikser

Kunder kan allokere deres egne IPv4-præfikser til platformen til eget brug i platformen (mindste størrelse /24). Safespring konfigurerer disse præfikser i platformen og annoncerer dem til sine peere via BGP.

## Ingress-/egress-trafik

Safespring måler ingress- og egress-trafik for hver kundes instans ved netværksgrænsen i hvert datacenter.

## Administreret SLB

Safespring driver en Service Load Balancer for kunder. Den hostes på en serverinstans i kundens miljø. Lastbalanceren er en abonnementsservice og faktureres månedligt. Konfiguration og drift er inkluderet i prisen. Yderligere IPv4-adresser faktureres som tilkøb.

## Saferoute

Safespring leverer en MPLS-baseret IP-VPN-tjeneste sammen med det lokale NREN, som muliggør adskilt trafik fra den almindelige internettrafik, så kunder kan forbinde et miljø i Safesprings datacentre til deres egen lokale infrastruktur, f.eks. bag firewalls m.m. Dette produkt afhænger af netværksintegration med det lokale NREN og dets peere og er ikke generelt tilgængeligt for alle kunder, men andre VPN-løsninger kan i stedet leveres som standard Professional Services i de tilfælde.

## Reverse DNS-konfiguration

Safespring tilbyder mulighed for at konfigurere reverse DNS-navne (PTR-poster) for offentlige IP-adresser, tilpasset kundens behov. Denne tjeneste er særligt relevant til brugsscenarier som hosting af SMTP-servere eller andre tjenester, hvor reverse DNS er afgørende. Anmodninger vurderes fra sag til sag, og vi giver et estimeret omkostningsoverslag baseret på de konkrete krav.