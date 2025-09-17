---
ai: true
title: "Nettverkstjenester"
language: "nb"
cardtitle: "Nettverk"
cardicon: "fa-solid fa-network-wired"
cardcolor: "#195F8C"
cardorder: "02"
date: 2023-02-28
draft: false
intro: "Obligatoriske og valgfrie nettverkstjenester ved bruk av IaaS-plattformene."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nei"
sidebarlinkname: "Tilbake til alle kategorier"
sidebarlinkurl: "/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Safespring tjenestekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
- /service-catalogue/network/
---
{{< ingress >}}
Obligatoriske og valgfrie nettverkstjenester ved bruk av IaaS-plattformene.
{{< /ingress >}}

Nettverksdesignet i IaaS-plattformen er basert på L3 (IP) og maskinvarebasert ruting. Virtuelle rutere eller L2 overlay-nettverk benyttes ikke. Dette sikrer maksimal nettverksytelse og operasjonell enkelhet i alle skalaer. Sikkerheten er basert på sett med L3 IP-adresse-tilgangskontrollister (ACL-er). Hvis en kunde trenger overlay-nettverk, står de fritt til å rulle dem ut – med mindre overhead og høyere ytelse enn i konkurrerende leverandørløsninger.

1. Offentlige IPv4- og IPv6-adresser direkte tildelt nettverksgrensesnittet
1. Private adresser for intern kommunikasjon i miljøet
1. Ingress-/egresstrafikk styrt av API-drevne ACL-er
1. Administrert SLB (basert på BGP og haproxy)
1. Saferoute / IP-VPN
1. Ta med egne IP-prefikser (for store kunder)
1. Reverse DNS-konfigurasjon (for store kunder, egne prefikser)

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
      <td>Ta med eget IP-prefiks</td>
    </tr>
    <tr>
      <td>NET-ingress</td>
      <td>Ingress-trafikk inn til en instans fra utsiden av datasenteret</td>
    </tr>
    <tr>
      <td>NET-egress</td>
      <td>Egress-trafikk fra en instans til utsiden av datasenteret</td>
    </tr>
    <tr>
      <td>NET-mgn.slb</td>
      <td>Administrert tjenestelastbalanserer</td>
    </tr>
    <tr>
      <td>NET-saferoute</td>
      <td>Saferoute MPLS-basert IP-VPN</td>
    </tr>
    <tr>
      <td>NET-rdns</td>
      <td>Reverse DNS-poster (PTR)</td>
    </tr>
  </tbody>
</table>

## Offentlige IP-adresser

Safespring leverer offentlige IPv4- og IPv6-adresser til tjenestene dine. Som standard får hver instans én av hver.

## Ta med egne IP-prefiks(er)

Kunder kan allokere egne IPv4-prefikser til plattformen for egen bruk i plattformen (minstestørrelse /24). Safespring konfigurerer disse prefiksene i plattformen og annonserer dem til sine peering-partnere ved hjelp av BGP.

## Ingress-/egresstrafikk

Safespring måler ingress- og egresstrafikk for hver kundeinstans ved nettverksgrensen til hvert datasenter.

## Administrert SLB

Safespring drifter en Service Load Balancer for kunder. Den hostes på en serverinstans i kundens miljø. Lastbalansereren er en abonnementstjeneste og faktureres månedlig. Konfigurasjon og forvaltning er inkludert i prisen. Ekstra IPv4-adresser faktureres i tillegg.

## Saferoute

Safespring leverer en MPLS-basert IP-VPN-tjeneste sammen med den lokale NREN som muliggjør separat trafikk fra ordinær Internett-trafikk, slik at kunder kan koble et miljø i Safesprings datasentre til sin egen lokale infrastruktur, f.eks. bak brannmurer osv. Dette produktet avhenger av nettverksintegrasjon med den lokale NREN og dens partnere og er ikke generelt tilgjengelig for alle kunder, men andre VPN-løsninger kan leveres gjennom standard Professional Services i slike tilfeller.

## Reverse DNS-konfigurasjon

Safespring tilbyr mulighet for å konfigurere reverse DNS-navn (PTR-poster) for offentlige IP-adresser, tilpasset kundens behov. Denne tjenesten er særlig relevant for brukstilfeller som hosting av SMTP-servere eller andre tjenester der reverse DNS er kritisk. Forespørsler vurderes fra sak til sak, og vi gir et kostnadsestimat basert på de konkrete kravene.