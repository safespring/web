---
ai: true
title: "Forklaring af Safesprings netværksmodel"
date: "2022-03-24"
intro: "\"Folk er forundrede over Safespring OpenStacks netværksstak"
compute platform. Let's check it out and do some explanation."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknologiopdatering"
author: "Jarle Bjørgeengen"
language: "da"
toc: "Indholdsfortegnelse"
aliases:
    - /blogg/2022-03-network
    - /blogg/2022/2022-03-network/
---
{{< ingress >}}
Dette blogindlæg forklarer de forskellige aspekter af Safesprings netværksstack set fra et brugerperspektiv.
{{< /ingress >}}

Hvis du kommer fra andre platforme, der bruger den gamle «layer 2 bridging»-tilgang (med softwaredefinerede switche, routere, flydende IP-adresser osv.), så læs hele indlægget for at forstå implikationerne. Det fungerer ikke, som du tror :-). Forudsætninger for at forstå dette indlæg er grundlæggende kendskab til CIDR-notation, IP-protokoller (TCP, UDP, ICMP) og IP-baseret adgangskontrol.

{{% accordion title="TL;DR (Resumé)" %}}
**Tilslut ikke mere end ét netværksinterface; det vil ødelægge kommunikationen**

Safespring compute-platformen bruger [Calico][calico], OpenStack Neutron core plugin, til netværk.

Brug sikkerhedsgrupper til at aktivere kommunikation mellem Safespring-instanser og mellem Safespring-instanser og Internettet.

IP-adresser tildeles fra en delt pulje, men ændrer sig ikke i en instans’ levetid.

Du kan ikke medbringe din egen IP-adresse, medmindre du opretter dine egne tunneler oven på dine instanser.

Der er ingen pulje af flydende IP-adresser (floating IPs).

Klik dig igennem de syv skærmbilleder i diagrammet nedenfor for at forstå, hvordan kommunikationen sker baseret på medlemskaber i sikkerhedsgrupper og deres regler.

{{% /accordion %}}
{{< accordion-script >}}

{{< distance >}}

[calico]: https://www.tigera.io/project-calico/

<iframe src="/img/safespring-network.sozi.html"  width="100%" height="500" style="border:0"></iframe>

## Forklaring

Alle rammer i diagrammet indeholder de samme tre instanser, som er tilsluttet netværkene `public`, `default-v4-nat` og `private` henholdsvis.

{{% note "Bemærk" %}}
Bemærk, at ingen af instanserne har mere end ét interface; kun interfacet til det netværk, de er tilsluttet.
{{% /note %}}

Hver diagramramme illustrerer effekten af sikkerhedsgrupper og deres regler på, hvordan forbindelser må etableres. Dette blogindlæg handler kun om, hvordan platformen fungerer, så hvad der sker i instansernes operativsystem, er uden for dette indlægs scope.

For at forklare hvordan egress-regler og ingress-regler virker sammen, starter diagrammet med instanser, der ikke er medlem af nogen sikkerhedsgrupper (dvs. standard-sikkerhedsgruppen, som inkluderer udgående trafik (egress) til verden, er fjernet).

Røde, stiplede pile viser ingen forbindelse. Grønne, fuldt optrukne pile viser en tilladelsesregel, med pilen pegende i den tilladte retning.

1. Ingen af instanserne kan kommunikere med nogen.
2. En egress (E)-regel tilføjes for at lade instansen på `public`-netværket
   (public-instansen) tilgå enhver IPv4-internetadresse på enhver port. Udgående forbindelse visualiseres med pilens retning.
3. En ingress (I)-regel tilføjes for at lade enhver IPv4-internetadresse kontakte
   public-instansen på port 443. (Pilen går fra Internettet til instansen)
4. En ingress (I)-regel tilføjes til instansen på `default-v4-nat`-netværket
   (default-instansen), som giver public-instansen adgang til default-instansen på port 80 (tcp). Det er her, mange brugere tror, de behøver et separat «ben» fra "public-instansen" til `default-v4-nat`-netværket. Ikke alene er det unødvendigt, det vil også fuldstændig ødelægge kommunikationen på public-instansen. Bemærk, at egress-reglen fra 3. allerede tillader udgående
   trafik fra public-instansen; derfor behøver vi ikke at tilføje en regel for det.
5. En ingress (I)-regel tilføjes til public-instansen, som giver
   default-instansen adgang til public-instansen på port 3333 (tcp). Da der ikke var knyttet nogen egress-regler til default-instansen, skal vi også
   tillade udgående trafik (egress) til public-instansen på port 3333.
6. En ingress (I)-regel tilføjes til default-instansen, som giver instansen på
   `private`-netværket (private-instansen) adgang til default-instansen
   på port 4545 (tcp). Igen er en egress-regel for private-instansen også nødvendig.
   I dette tilfælde åbner vi bredt og tillader private-instansen at nå alle
   porte i hele IPv4-adresserummet. (Og default-instansen er naturligvis
   en del af det). Så private-netværket burde kunne tale med enhver IPv4-adresse på Internettet, ikke? **Forkert**. Instanser på private-netværket kan kun kommunikere
   med andre Safespring-instanser i samme site, forudsat at regler i sikkerhedsgrupper tillader det.
7. En egress (E)-regel tilføjes for at tillade default-instansen at tilgå 1.1.1.1 på
   port 443 (tcp). Dette vil virke, fordi `default-v4-nat` er sat op til at udføre Network Address
   Translation (NAT). Vær blot opmærksom på, at kildeadressen, som den ses fra 1.1.1.1, selvfølgelig **ikke** er den, der er på instansens interface. Det er faktisk den offentlige adresse på den compute-vært, som instansen kører på
   (som udfører NAT/Masquerade).

## Andre faldgruber

En instans **skal** altid have den Safespring-leverede gateway (fra DHCP) som første hop. Hvis du forsøger at tilføje (i operativsystemet) en anden standardgateway eller en statisk rute via en anden, bliver pakkerne bare droppet, og det vil ikke fungere.
Dette skyldes, at hver instans har sin egen separate lag-2-forbindelse til den Safespring-leverede gateway, og dermed routes al trafik gennem den på lag 3. Denne router er altid første hop, som automatisk konfigureret af DHCP.

Hvis du derfor har brug for dit eget netværk oven på Safespring-platformen, skal du bruge en form for tunnellering som Wireguard, IPIP, GRE osv., som opretter sit eget overlay-netværk, som du som bruger kontrollerer.

## Hvorfor Calico

- {{< inline "Enkelhed/Sikkerhed:" >}} Dvs. mindre kompleksitet => mindre angrebsflade og færre
  ting, der kan gå galt.
- {{< inline "Ydelse:" >}} Ren BGP-routing er langt mere performant end at (gen)oprette
  virtuelle switch-lag og **derefter** lægge lag 3 ovenpå igen. Vi
  kommer tæt på linjehastighed med meget lidt overhead ved denne tilgang.
- {{< inline "Skalerbarhed:" >}} BGP skalerer internettet. Calico skalerer datacentret tilsvarende
  ved hjælp af BGP.
- {{< inline "Omkostninger:" >}} Ingen dyr leverandør-«lock-in» med omkostninger knyttet til. Mindre overhead =>
  mindre compute-kraft => lavere energiforbrug for samme arbejde => grønnere og
  billigere.

## Opsummering

- Brug kun ét interface pr. instans
- Sikkerhedsgrupper **er** firewallen. Tilpas dit design til at udnytte denne
  egenskab ved platformen, fx med automatiseringsværktøjer som Terraform (ordspil ikke tilsigtet) \* Åbn kun det, du har brug for, med sikkerhedsgrupper.
- Ændr ikke instansernes interface-/netværkskonfiguration til noget andet end
  DHCP.
- Brug tunnellering oven på vores leverede lag 3-netværksstack, hvis du skal
  have lag 2-forbindelse mellem instanser.
- Safespring-«netværk» er blot en mekanisme til at tildele IP-adresser fra en
  CIDR. Hver instans routes separat (med /32-præfiks) af platformen. Instansen
  kan kun tale med gatewayen over lag 2, så i praksis skal al
  trafik gå gennem den platformleverede gateway på lag 2.