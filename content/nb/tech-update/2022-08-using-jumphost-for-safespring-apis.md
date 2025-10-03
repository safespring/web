---
ai: true
title: "Bruk av en jumpserver for vedvarende tilgang til Safesprings API-er"
date: "2022-09-06"
intro: "Lær hvordan du setter opp en jump-host for økt sikkerhet og enkel tilgang til Safesprings API-er når du er på farten."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknisk oppdatering"
author: "Anders Trier-Vaage"
language: "nb"
toc: ""
aliases:
  - /blogg/2022-08-using-jumphost-for-safespring-apis
  - /blogg/2022/2022-08-using-jumphost-for-safespring-apis/
---
{{< ingress >}}
Å bruke en jump-host er god praksis for økt sikkerhet og en enkel løsning når du ikke har en fast IP-adresse, men trenger tilgang til Safesprings API-er.
{{< /ingress >}}

Automatiseringsverktøy som Terraform trenger tilgang til flere av OpenStacks API-er,
som vi for øyeblikket kun eksponerer for hvitlistede IP-adresser av sikkerhetshensyn.
Dette er en praksis vi deler med flere andre små og uavhengige skyleverandører som oss selv.
Når mange ingeniører jobber eksternt og ikke har en fast IP, kan det føles både tungvint og unødvendig
i 2022 å sende en supportsak hver gang den offentlige IP-en din endrer seg. Å bruke en jump-host er imidlertid ikke bare en enkel løsning på dette problemet, men også god praksis i de fleste automasjonsscenarier der sikkerhet er kritisk.

## Bakgrunn

OpenStack er en programvareplattform som består av flere komponenter som styrer en
pool av ulike prosess-, lagrings- og nettverksressurser, sammen med hjelpe-
komponenter som en identitetstjeneste og et GUI-dashbord. Det som fra et
dashbordperspektiv kan se ut som ett samlet produkt, er i realiteten ulike biter
av programvare utviklet av forskjellige community-team organisert under et større
prosjekt – en vanlig modell i åpen kildekode-verdenen. Komponentene kommuniserer
over sine respektive REST-API-er, med dashbordet som midtpunkt for bruker-
interaksjon. Når du derimot bruker CLI-en eller automasjonsprogramvare som Terraform,
kommuniserer du ikke via ett enkelt applikasjonsgrensesnitt som dashbordet, men med
alle de individuelle tjenestenes offentlige API-endepunkter.

Dette innebærer ikke at OpenStack er usikkert – tvert imot. OpenStack er
en av de mest transparente og sikre skyplattformene som finnes, utviklet
åpent av et stort antall personer og organisasjoner og under konstant
granskning. Likevel er all programvare potensielt sårbar for sikkerhetsbrudd
og utnyttelser, og det gjøres derfor uopphørlige forsøk på å kompromittere
praktisk talt alt som er eksponert mot internett, fra alle verdenshjørner.
Selv om vi er trygge på at de offentlige API-ene til OpenStack-komponentene er
rimelig sikre og korrekt konfigurert hos oss, utgjør de likevel en relativt
stor angrepsflate. Gitt ressursene vi som et lite selskap har tilgjengelig – og
den potensielle skaden et sikkerhetsbrudd kan påføre kundene våre – er det
fornuftig å begrense denne angrepsflaten, selv om det medfører en liten
ulempe når direkte API-tilgang trengs.

Selv om vi hypotetisk kunne garantere at hvert offentlig API-endepunkt var
100 % skuddsikkert, finnes det gode grunner til å være forsiktig som forbruker.
For eksempel finnes det ingen måte å bruke flerfaktorautentisering mellom f.eks.
Terraform og OpenStack-API-ene, eller med OpenStack CLI-en for den saks skyld.
Påloggingsopplysninger lagres ofte i klartekst. Konsekvensene av en stjålet laptop
eller påloggingsopplysninger på avveie kunne være katastrofale – én enkelt
kommando kan slette en hel infrastruktur.

Å bruke en jump-host er ikke en perfekt løsning på de ovennevnte utfordringene,
men et utmerket første steg mot bedre sikkerhet – og det finnes andre fordeler også.

## Bruke en jump-host

En jump-host, i en bredere definisjon, er et system på et nettverk som brukes til å få tilgang til og
administrere enheter i en separat sikkerhetssone. Ved å bruke en jump-host kan du begrense
tilgangen til interne ressurser til én enkelt kilde med økt sikkerhetsherding
(inkludert flerfaktorautentisering) og overvåking. Avhengig av hvor strengt du
definerer en jump-host, kan den også være et arbeidsmiljø der f.eks. utrulling til interne
servere utføres. I noen tilfeller kjøres til og med komplette utviklingsmiljøer på
jump-hoster ved å bruke fjernutviklingsverktøy som VSCode eller en kombinasjon av
terminalredaktører og multipleksere, med fordelen av enkel tilgang til interne ressurser
og mulighet for samarbeidende koding.

De offentlige nettverksområdene for instanser i Safespring Compute er hvitelistet for API-
tilgang på våre lastbalansere, og derfor anbefaler vi alltid at kundene våre starter med å
opprette en jump-host via web-dashbordet og bruker denne til API-basert provisjonering
(f.eks. Terraform).

Det finnes også andre fordeler. Hvis du for eksempel vil rulle ut til
instanser på det private (RFC1918)-nettverket, er den eneste måten å gjøre det på via en
offentlig instans på samme site. Vi har skrevet om det i detalj i
[et annet blogginnlegg](/blogg/2022-03-network/).
Du kan selvfølgelig opprette en egen jump-host kun for dette formålet, men
å gjøre all provisjonering og utrulling fra én enkelt vert er langt mer
praktisk.

Kombiner alt dette, så har du en svært praktisk måte å administrere Safespring-
infrastrukturen din og din egen sikkerhetssone på.

Å jobbe over SSH fra en jump-host passer ikke i alle scenarier. Et annet vanlig
alternativ når man jobber på tvers av sikkerhetssoner er en VPN. Dette har
tradisjonelt vært ganske komplisert å konfigurere, med involvering av kompleks
nettverksdesign, sikkerhet og protokoller, og oppleves av mange administratorer
som både arkaisk og tidkrevende.

## Bruke sshuttle

Her kommer [sshuttle](https://github.com/sshuttle/sshuttle), omtalt av utvikleren
som «a poor man's VPN», men ikke mindre kraftig av den grunn. sshuttle er
helt basert på SSH, er svært enkelt å bruke, er rimelig raskt, og krever ingen
serverkonfigurasjon utover en fungerende SSH-server. sshuttle utnytter ikke
bare sikkerhetsfordelene i OpenSSH, men også de innebygde tunneleringsmulighetene –
uten at du trenger å sette opp individuelle videresendinger for hver
vert/port på det eksterne nettverket.

Ulempen med sshuttle er at det for øyeblikket bare kjører på macOS, Linux og BSD.
Det finnes foreløpig ingen støtte for Windows, inkludert WSL (selv om det finnes en
[omgåelsesløsning](https://sshuttle.readthedocs.io/en/stable/windows.html)).

Å bruke sshuttle med en Safespring Compute-instans krever knapt noe oppsett.
Start bare en instans, legg til SSH-nøkkelen din og kjør:
```
sshuttle -r <username>@<instance ip> <range you want to forward>
```
Omfanget kan være så smalt eller bredt du vil, men for OpenStack-API-ene er det tilstrekkelig å videresende IP-adressen som auth_url i OpenStack-konfigurasjonen din peker til.

Siden sshuttle er en SSH-klient, støtter den de samme autentiseringsmetodene og sikkerhetstiltakene som en vanlig OpenSSH-klient, inkludert MFA.

## Andre alternativer

Andre alternativer inkluderer mer fullverdige VPN-løsninger som
[Wireguard](https://www.wireguard.com/), [ZeroTier](https://www.zerotier.com/)
eller [OpenVPN](https://openvpn.net/) som alle er langt enklere å konfigurere enn
tradisjonelle protokoller som IPSec, GRE, PPTP osv. Hvis du uansett skal sette opp en VPN
i Safespring Compute, kan gatewayen også fungere som en jump host. Vi har
laget noe [dokumentasjon for å komme i gang](https://docs.safespring.com/new/vpn/) og vi tilbyr også et [automatisert oppsett av en
Wireguard-gateway](https://github.com/safespring-community/wireguard-gateway) som kan brukes til dette formålet og mer, tilgjengelig her