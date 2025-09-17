---
ai: true
title: "Brug af en bastion-vært til vedvarende adgang til Safesprings API'er"
date: "2022-09-06"
intro: "Lær at opsætte en jump host for øget sikkerhed og nem adgang til Safesprings API'er, når du er på farten."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknologisk opdatering"
author: "Anders Trier-Vaage"
language: "da"
toc: ""
aliases:
  - /blogg/2022-08-using-jumphost-for-safespring-apis
  - /blogg/2022/2022-08-using-jumphost-for-safespring-apis/
---
{{< ingress >}}
At bruge en jump host er god praksis for øget sikkerhed og en enkel løsning, når du ikke har en fast IP-adresse, men har brug for adgang til Safesprings API’er.
{{< /ingress >}}

Automationsværktøjer som Terraform kræver adgang til flere af OpenStacks API’er,
som vi i øjeblikket kun eksponerer for hvidlistede IP’er af sikkerhedshensyn.
Det er en praksis, vi deler med flere andre små og uafhængige cloududbydere som
os selv. Når mange ingeniører arbejder eksternt og ikke har en fast IP, kan det
føles både besværligt og unødvendigt i 2022 at indsende en supportsag hver gang
din offentlige IP ændrer sig. At bruge en jump host er dog ikke kun en enkel
løsning på dette problem, men også god praksis i de fleste automatiserings-
scenarier, hvor sikkerheden er kritisk.

## Baggrund

OpenStack er en softwareplatform bestående af flere komponenter, der styrer en
pulje af forskellige compute-, storage- og netværksressourcer sammen med
hjælpekomponenter som en identitetstjeneste og et GUI-dashboard. Det, der fra et
dashboard-perspektiv kan ligne et samlet produkt, er i virkeligheden forskellige
stykker software udviklet af forskellige community-teams organiseret under et
større projekt – en almindelig model i open source-verdenen. Komponenterne
kommunikerer over deres respektive REST-API’er med dashboardet som omdrejningspunkt
for brugerinteraktionen. Når du derimod bruger CLI’en eller
automationssoftware som Terraform, kommunikerer du ikke gennem et enkelt
applikationsinterface som dashboardet, men med alle de individuelle tjenesters
offentlige API-endpoints.

Det betyder ikke, at OpenStack er usikker – tværtimod. OpenStack er en af de
mest transparente og sikre cloudplatforme, der findes, udviklet i det åbne af et
stort antal mennesker og organisationer og under konstant granskning. Men al
software er potentielt sårbar over for sikkerhedsbrud og exploits, hvilket er
grunden til, at der fra alle verdenshjørner konstant forsøges at kompromittere
praktisk talt alt, der er eksponeret mod internettet. Selvom vi føler os trygge
ved, at OpenStack-komponenternes offentlige API’er er rimeligt sikre og korrekt
konfigureret fra vores side, udgør de ikke desto mindre en relativt stor
angrebsflade. I lyset af de ressourcer, vi som en lille virksomhed råder over –
og den potentielle skade et sikkerhedsbrud kan forvolde vores kunder – giver det
mening at begrænse denne angrebsflade, selv om det medfører en mindre
ulempe, når der er behov for direkte API-adgang.

Selv hvis vi hypotetisk kunne garantere, at hvert offentligt API-endpoint var
100 % vandtæt, er der gode grunde til at være forsigtig som forbruger. Der er
for eksempel ingen måde at bruge multifaktorgodkendelse mellem f.eks. Terraform
og OpenStack-API’er eller med OpenStack CLI for den sags skyld. Legitimation
opbevares ofte i klartekst. Konsekvenserne af en stjålen laptop eller
adgangsoplysninger, der kommer på afveje, kan være katastrofale – en enkelt
kommando kan rydde en hel infrastruktur.

At bruge en jump host er ikke en perfekt løsning på de ovennævnte udfordringer,
men et fremragende første skridt mod bedre sikkerhed – og der er også andre
fordele.

## Brug af en jump host

En jump host er i bred forstand et system på et netværk, der bruges til at få
adgang til og administrere enheder i en separat sikkerhedszone. Ved at bruge en
jump host kan du begrænse adgangen til interne ressourcer til en enkelt kilde
med øget sikkerhedshærdning (inklusive multifaktorgodkendelse) og overvågning.
Afhængigt af hvor stramt du definerer en jump host, kan den også være et
arbejdsmiljø, hvor f.eks. udrulninger til interne servere udføres. I nogle
tilfælde udrulles endda fulde udviklingsmiljøer på jump hosts ved hjælp af
remote-udviklingsværktøjer som VSCode eller en kombination af
terminaleditorer og terminal-multiplexere, med fordelene ved nem adgang til
interne ressourcer og mulighed for kollaborativ kodning.

De offentlige instansnetværksområder i Safespring Compute er hvidlistet til
API-adgang på vores loadbalancere, og derfor anbefaler vi altid, at vores
kunder starter med at oprette en jump host via webdashboardet og bruger denne
til API-baseret klargøring (f.eks. Terraform).

Der er også andre fordele. Hvis du for eksempel vil udrulle til instanser på det
private (RFC1918) netværk, er den eneste måde at gøre det på via en offentlig
instans på samme site. Det har vi skrevet om i detaljer i
[et andet blogindlæg](/blogg/2022-03-network/).
Du kan naturligvis oprette en specifik jump kun til dette formål, men at lave al
klargøring og udrulning fra en enkelt vært er langt mere bekvemt.

Kombinerer du alt dette, får du en meget praktisk måde at administrere din
Safespring-infrastruktur såvel som din egen sikkerhedszone.

At arbejde over SSH fra en jump host passer ikke til alle scenarier. En anden
almindelig mulighed, når man arbejder på tværs af sikkerhedszoner, er en VPN.
Det har traditionelt været en ret kompliceret opgave at konfigurere med kompleks
netværk, sikkerhed og protokoller og betragtes som både gammeldags og en
tidsrøver for mange administratorer.

## Brug af sshuttle

Her kommer [sshuttle](https://github.com/sshuttle), omtalt af udvikleren som
“en fattigmands‑VPN”, men ikke mindre kraftfuld af den grund. sshuttle er fuldt
ud baseret på SSH, er meget let at bruge, er rimeligt hurtigt og kræver ingen
server-side konfiguration udover en fungerende SSH-server. sshuttle udnytter
ikke kun sikkerhedsfordelene ved OpenSSH, men også dets indbyggede tunnelerings-
muligheder – uden behov for at opsætte individuel forwarding for hver
vært/port på det eksterne netværk.

Ulempen ved sshuttle er, at det i øjeblikket kun kører på macOS, Linux og BSD.
Der er i øjeblikket ingen understøttelse af Windows, inklusive WSL (selvom der
findes [en workaround](https://sshuttle.readthedocs.io/en/stable/windows.html)).

At bruge sshuttle med en Safespring Compute-instans kræver næsten ingen
opsætning. Start blot en instans, tilføj din SSH-nøgle, og kør så:```
sshuttle -r <username>@<instance ip> <range you want to forward>
```
Omfanget kan være så snævert eller bredt, som du ønsker, men for OpenStack-API'erne er det tilstrækkeligt at videresende den IP-adresse, som auth_url i din OpenStack-konfiguration peger på.

Da sshuttle er en SSH-klient, understøtter den de samme autentificeringsmetoder og den samme sikkerhedshærdning som en almindelig OpenSSH-klient, inklusive MFA.

## Andre muligheder

Andre muligheder omfatter mere fuldt udbyggede VPN-løsninger som [Wireguard](https://www.wireguard.com/), [ZeroTier](https://www.zerotier.com/) eller [OpenVPN](https://openvpn.net/), som alle er langt nemmere at konfigurere end traditionelle protokoller som IPSec, GRE, PPTP osv. Hvis du alligevel vil sætte en VPN op i Safespring Compute, kan gatewayen også fungere som en jump-host. Vi har lavet noget [dokumentation om, hvordan du kommer i gang](https://docs.safespring.com/new/vpn/), og vi tilbyder også en [automatiseret opsætning af en Wireguard-gateway](https://github.com/safespring-community/wireguard-gateway), som kan bruges til dette formål og mere, tilgængelig her