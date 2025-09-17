---
ai: true
title: "Använda en jumphost för kontinuerlig åtkomst till Safesprings API:er"
date: "2022-09-06"
intro: "Lär dig hur du sätter upp en jumpserver för ökad säkerhet och smidig åtkomst till Safesprings API:er när du är på språng."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknisk uppdatering"
author: "Anders Trier-Vaage"
language: "sv"
toc: ""
aliases:
  - /blogg/2022-08-using-jumphost-for-safespring-apis
  - /blogg/2022/2022-08-using-jumphost-for-safespring-apis/
---
{{< ingress >}}
Att använda en jump host är god praxis för ökad säkerhet och en enkel lösning när du inte har en fast IP-adress men behöver åtkomst till Safesprings API:er.
{{< /ingress >}}

Automationsverktyg som Terraform kräver åtkomst till flera av OpenStacks API:er
som vi för närvarande endast exponerar för vitlistade IP-adresser av säkerhetsskäl.
Detta är en praxis vi delar med flera andra små och oberoende molnleverantörer
likt oss själva. När många ingenjörer arbetar på distans och saknar fast IP kan
det kännas omständligt och onödigt att skicka in ett supportärende varje gång din
publika IP ändras. Att använda en jump host är dock inte bara en enkel lösning på
detta problem utan också god praxis för de flesta automationsscenarier där
säkerheten är kritisk.

## Bakgrund

OpenStack är en mjukvaruplattform som består av flera komponenter som styr en
pool av olika beräknings-, lagrings- och nätverksresurser, tillsammans med
hjälpkomponenter som en identitetstjänst och en GUI-baserad dashboard. Det som
från dashboardens perspektiv kan se ut som en enhetlig produkt är i själva verket
olika programvarudelprojekt utvecklade av olika communityteam under ett större
paraplyprojekt – en vanlig modell inom öppen källkod. Komponenterna kommunicerar
över sina respektive REST-API:er med dashboarden som nav för
användarinteraktionen. När du använder CLI eller automationsverktyg som Terraform
kommunicerar du däremot inte via ett enda applikationsgränssnitt som
dashboarden, utan med alla enskilda tjänsters publika API-endpoints.

Detta innebär inte att OpenStack är osäkert – tvärtom. OpenStack är en av de mest
transparenta och säkra molnplattformarna som finns, utvecklad öppet av många
personer och organisationer och ständigt granskad. Men all mjukvara kan
potentiellt vara sårbar för intrång och exploateringar, vilket är varför det
ständigt görs försök från hela världen att kompromettera i princip allt som är
exponerat mot internet. Även om vi känner oss trygga med att OpenStack-
komponenternas publika API:er är rimligt säkra och korrekt konfigurerade från
vår sida utgör de ändå en relativt stor attackyta. Givet de resurser vi som ett
litet företag har tillgängliga – och den potentiella skada ett intrång kan orsaka
våra kunder – är det rimligt att begränsa denna attackyta även om det innebär en
mindre olägenhet när direkt API-åtkomst behövs.

Även om vi hypotetiskt skulle kunna garantera att varje publik API-endpoint vore
100 % vattentät finns det goda skäl att vara försiktig som konsument. Det går
till exempel inte att använda multifaktorautentisering mellan t.ex. Terraform och
OpenStacks API:er, eller med OpenStack CLI för den delen. Inloggningsuppgifter
lagras ofta i klartext. Konsekvenserna av en stulen laptop eller vilsna
inloggningsuppgifter kan bli katastrofala – ett enda kommando kan utradera en
hel infrastruktur.

Att använda en jump host är ingen perfekt lösning på ovan nämnda utmaningar,
men ett utmärkt första steg mot bättre säkerhet – och det finns andra fördelar
också.

## Använda en jump host

I vidare bemärkelse är en jump host ett system i ett nätverk som används för att
nå och hantera enheter i en separat säkerhetszon. Genom att använda en jump host
kan du begränsa åtkomst till interna resurser till en enda källa, med ökad
säkerhetshärdning (inklusive multifaktorautentisering) och övervakning. Beroende
på hur strikt du definierar en jump host kan den också vara en arbetsmiljö där
t.ex. leveranser till interna servrar utförs. I vissa fall körs till och med hela
utvecklingsmiljöer på jump hosts med fjärrutvecklingsverktyg som VSCode eller en
kombination av terminalredigerare och multiplexrar, med fördelarna enkel åtkomst
till interna resurser och smidigt samarbete kring kod.

De publika instansnätens adressintervall i Safespring Compute är vitlistade för
API-åtkomst i våra lastbalanserare, vilket är anledningen till att vi alltid
rekommenderar våra kunder att börja med att skapa en jump host via
webbdashboarden och använda denna för API-baserad provisionering (t.ex.
Terraform).

Det finns fler fördelar. Om du till exempel vill deploya till instanser på det
privata (RFC1918) nätet är det enda sättet att göra det via en publik instans på
samma site. Vi har skrivit om det i detalj i [ett annat blogginlägg](/blogg/2022-03-network/).
Du kan förstås skapa en särskild jump bara för detta ändamål, men att göra all
provisionering och alla leveranser från en och samma värd är betydligt
bekvämare.

Tillsammans ger detta ett mycket praktiskt sätt att hantera din Safespring-
infrastruktur liksom din egen säkerhetszon.

Att arbeta över SSH från en jump host passar inte varje scenario. Ett annat
vanligt alternativ när man arbetar över säkerhetszoner är VPN. Det har
traditionellt varit ganska komplicerat att konfigurera, med komplexa nät,
säkerhet och protokoll, och anses av många administratörer både föråldrat och en
tidsbov.

## Använda sshuttle

Här kommer [sshuttle](https://github.com/sshuttle/sshuttle), som utvecklaren
kallar ”en fattigmans-VPN”, men inte mindre kraftfull för den sakens skull.
sshuttle är helt baserat på SSH, mycket enkelt att använda, tillräckligt snabbt
och kräver ingen konfiguration på serversidan utöver en fungerande SSH-server.
sshuttle drar nytta av både säkerhetsfördelarna i OpenSSH och dess inbyggda
tunnlingsfunktioner – utan att du behöver sätta upp individuell vidarebefordran
för varje värd/port i det externa nätet.

Nackdelen med sshuttle är att det för närvarande bara körs på macOS, Linux och
BSD. Det finns i nuläget inget stöd för Windows, inklusive WSL (även om det finns
[en lösning](https://sshuttle.readthedocs.io/en/stable/windows.html)).

Att använda sshuttle med en Safespring Compute-instans kräver knappt någon
konfigurering. Starta bara en instans, lägg till din SSH-nyckel och kör helt
enkelt:```
sshuttle -r <username>@<instance ip> <range you want to forward>
```
Omfånget kan vara så smalt eller brett som du vill, men för OpenStack-API:erna räcker det att vidarebefordra den IP-adress som auth_url i din OpenStack-konfiguration löser till.

Eftersom sshuttle är en SSH-klient stöder den samma autentiseringsmetoder och säkerhetshärdning som en vanlig OpenSSH-klient, inklusive MFA.

## Andra alternativ

Andra alternativ inkluderar mer fullfjädrade VPN-lösningar som
[Wireguard](https://www.wireguard.com/), [ZeroTier](https://www.zerotier.com/)
eller [OpenVPN](https://openvpn.net/) som alla är mycket enklare att konfigurera än
traditionella protokoll som IPSec, GRE, PPTP osv. Om du ändå ska sätta upp en VPN
i Safespring Compute kan gatewayen även fungera som en jump host. Vi har skapat
[dokumentation om hur du kommer igång](https://docs.safespring.com/new/vpn/) och vi tillhandahåller också en [automatiserad installation av en
Wireguard-gateway](https://github.com/safespring-community/wireguard-gateway) som kan användas för detta och mer, tillgänglig här