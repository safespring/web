---
ai: true
title: "Safesprings nettverksmodell forklart"
date: "2022-03-24"
intro: "Folk er forvirret over nettverksstakken til Safesprings OpenStack-beregningsplattform. La oss se nærmere på den og forklare."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknologioppdatering"
author: "Jarle Bjørgeengen"
language: "nb"
toc: "Innholdsfortegnelse"
aliases:
  - /blogg/2022-03-network
  - /blogg/2022/2022-03-network/
---

{{< ingress >}}
Dette blogginnlegget forklarer de ulike aspektene ved Safespring-nettverksstakken fra et brukerperspektiv.
{{< /ingress >}}

Hvis du kommer fra andre plattformer som bruker den eldre tilnærmingen med
«laget-2-bro» (med programvaredefinerte svitsjer, rutere, flytende IP-adresser, osv.),
les hele innlegget for å forstå konsekvensene. Det fungerer ikke slik du tror :-).
Forutsetninger for å forstå dette innlegget er grunnleggende kunnskap om CIDR-notasjon,
IP-protokoller (TCP, UDP, ICMP) og IP-basert tilgangskontroll.

{{% accordion title="TL;DR (Sammendrag)" %}}
**Ikke koble til mer enn ett grensesnitt; det vil ødelegge kommunikasjonen**

Safespring sin compute-plattform bruker [Calico][calico], en OpenStack Neutron kjerne-plugin,
for nettverk.

Bruk sikkerhetsgrupper for å muliggjøre kommunikasjon mellom Safespring-instanser
og mellom Safespring-instanser og Internett.

IP-adresser tildeles fra en delt pool, men endres ikke i løpet av en instans sin levetid.

Du kan ikke ta med egne IP-adresser med mindre du lager dine egne tunneler oppå
instansene.

Det finnes ingen pool for flytende IP-er.

Klikk deg gjennom de syv skjermbildene i diagrammet under for å forstå hvordan
kommunikasjon skjer basert på medlemskap og regler i sikkerhetsgrupper.

{{% /accordion %}}
{{< accordion-script >}}

{{< distance >}}

[calico]: https://www.tigera.io/project-calico/

<iframe src="/img/safespring-network.sozi.html"  width="100%" height="500" style="border:0"></iframe>

## Forklaringen

Alle rammene i diagrammet inneholder de samme tre instansene som er koblet til
`public`, `default-v4-nat` og `private`-nettverkene.

{{% note "Merk" %}}
Merk at ingen av instansene har mer enn ett grensesnitt; bare grensesnittet til nettverket de er tilkoblet.
{{% /note %}}

Hver diagramramme eksemplifiserer effekten som sikkerhetsgrupper og reglene deres
har på hvordan tilkoblinger får finne sted. Dette innlegget handler bare om hvordan
plattformen fungerer, så hva som skjer i operativsystemet til instansene er utenfor
innleggets omfang.

For å forklare hvordan egress-regler og ingress-regler fungerer sammen, starter
diagrammet med instanser som ikke er medlem av noen sikkerhetsgrupper.
(dvs. standard sikkerhetsgruppen som inkluderer egress til verden, er fjernet)

Røde stiplede piler viser at det ikke er forbindelse. Grønne heltrukne piler viser en
tillatelse, med pilen pekende i den tillatte retningen.

1. Ingen av instansene kan kommunisere med noen.
2. En egress (E)-regel legges til for å tillate at instansen på `public`-nettverket
   (offentlig instans) kan nå enhver IPv4-adresse på Internett på enhver port.
   Utgående forbindelse visualiseres med pilretningen.
3. En ingress (I)-regel legges til for å tillate enhver IPv4-adresse på Internett å kontakte
   den offentlige instansen på port 443. (Pilen går fra Internett til instansen)
4. En ingress (I)-regel legges til for instansen på `default-v4-nat`-nettverket
   (default-instansen) som vil tillate den offentlige instansen å nå default-instansen
   på port 80 (tcp). Dette er punktet der mange brukere tror de trenger et separat
   «ben» fra den «offentlige instansen» til `default-v4-nat`-nettverket. Ikke bare er
   det unødvendig, det vil også fullstendig ødelegge kommunikasjonen på den offentlige
   instansen. Merk at egress-regelen fra 3. allerede tillater utgående trafikk
   fra den offentlige instansen; dermed trenger vi ikke å legge til en regel for det.
5. En ingress (I)-regel legges til for den offentlige instansen, som tillater
   default-instansen å nå den offentlige instansen på port 3333 (tcp). Siden
   det ikke var knyttet egress-regler til default-instansen, må vi også
   tillate utgående trafikk (egress) til den offentlige instansen på port 3333.
6. En ingress (I)-regel legges til for default-instansen, som tillater instansen på
   `private`-nettverket (privat instans) å koble til default-instansen
   på port 4545 (tcp). Igjen er en egress-regel for den private instansen nødvendig
   også. I dette tilfellet åpner vi bredt og lar den private instansen nå alle
   porter i hele IPv4-adresserommet. (Og default-instansen er selvfølgelig
   en del av det.) Så da burde det private nettet kunne snakke med enhver IPv4-adresse
   på Internett, ikke sant? **Feil**. Instanser på det private nettet kan bare snakke
   med andre Safespring-instanser i samme site, forutsatt at reglene i
   sikkerhetsgruppene tillater det.
7. En egress (E)-regel legges til for å tillate default-instansen å nå 1.1.1.1 på
   port 443 (tcp). Dette vil fungere fordi `default-v4-nat` er satt opp til å gjøre
   Network Address Translation (NAT). Vær bare oppmerksom på at kildeadressen
   sett fra 1.1.1.1 åpenbart **ikke** er den som står på instansens grensesnitt. Det
   er faktisk den offentlige adressen til compute-verten instansen kjører på.
   (Som gjør NAT/Masquerade)

## Andre fallgruver

En instans **må** alltid ha Safespring-gatewayen (fra DHCP) som første rutehopp.
Hvis du prøver å legge til (i operativsystemet) en annen standardgateway, eller en
statisk rute via en annen, vil pakkene bare bli droppet, og det vil ikke fungere.
Dette er fordi hver instans har sin egen separate lag-2-tilkobling til
Safespring-gatewayen, og dermed rutes all trafikk gjennom den på lag 3. Denne
ruteren er alltid første hopp, som automatisk konfigurert av DHCP.

Som en konsekvens, hvis du trenger ditt eget nettverk oppå Safespring-plattformen,
må du bruke en form for tunneling som Wireguard, IPIP, GRE, osv.,
som lager sitt eget overleggsnettverk som du som bruker kontrollerer.

## Hvorfor Calico

- {{< inline "Enkelhet/Sikkerhet:" >}} Altså, mindre kompleksitet => mindre angrepsflate, og færre
  ting som kan gå galt.
- {{< inline "Ytelse:" >}} Ren BGP-ruting er langt mer ytelseseffektiv enn
  å (re)skape virtuelle svitsjlag og **deretter** legge lag 3 oppå igjen. Vi
  kommer nær linjehastighet med svært lite overhead ved denne tilnærmingen.
- {{< inline "Skalerbarhet:" >}} BGP skalerer Internett. Calico skalerer datasenteret på tilsvarende måte
  ved å bruke BGP.
- {{< inline "Kostnad:" >}} Ingen dyr leverandør-«lock-in» med tilhørende kostnader. Mindre overhead =>
  mindre regnekraft => lavere energiforbruk for samme arbeid => grønnere og
  rimeligere.

## Oppsummering

- Bruk bare ett grensesnitt per instans
- Sikkerhetsgrupper **er** brannmuren. Tilpass designet ditt til å utnytte denne
  egenskapen ved plattformen, med bruk av automatiseringsverktøy som Terraform, for eksempel
  (ordspill ikke tilsiktet) \* Åpne bare det du trenger med sikkerhetsgrupper.
- Ikke endre grensesnitt-/nettverkskonfigurasjonen i instansene bort fra
  å bruke DHCP.
- Bruk tunneling oppå vår leverte lag-3-nettverksstakk hvis du må
  ha lag-2-tilkobling mellom instanser.
- Safespring-«nettverk» er bare en mekanisme for å tildele IP-adresser fra en
  CIDR. Hver instans rutes separat (med /32-prefiks) av plattformen. Instansen
  kan bare snakke med gatewayen over lag 2, så i praksis må all
  trafikk gå gjennom gatewayen levert av plattformen på lag 2.
