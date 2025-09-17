---
ai: true
language: "sv"
title: "Sunet Drive – en lösning för synkronisering och delning av filer"
section: "Lösningsöversikt"
date: 2021-04-12T11:29:26+02:00
draft: false
intro: "En GDPR-förenlig filsynk- och delningslösning för forskning och utbildning"
eventbild: "safespring_background_42.jpg"
socialmedia: "safespring_social_42.gif"
dokumentbild: "safespring_card_42.jpg"
sidebarlinkname: "Ladda ner som PDF"
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: "/documents/sunet/safespring_solution-brief_sunet-drive.pdf"
noindex: ""
toc: "Innehållsförteckning"
aliases:
  - /dokument/sunet/sunet-drive/
---
{{< ingress >}}
Sunet Drive är en hanterad lagringslösning som är fysiskt installerad i universitetets lokala datacenter och som bygger på de tillförlitliga open source-projekten Nextcloud, OpenStack och Ceph.
{{< /ingress >}}

{{< inline "Sunet" >}} är Sveriges nationella forsknings- och utbildningsnät (NREN). Sunet grundades på 1980-talet som ett forskningsprojekt för svenska datavetare som banade väg för internet i Sverige. I dag knyter Sunet samman 750 000 användare och 110 organisationer via 8 400 km fiber och tillhandahåller även andra tjänster som stödjer vetenskap och forskning.

{{< inline "Safespring" >}} är en leverantör av infrastruktur- och plattformstjänster (IaaS/PaaS) och är leverantör av Sunets molnerbjudande till den svenska akademiska sektorn. Genom ett nära samarbete med Sunet har Safespring byggt storskaliga molnlösningar för Sunets kunder. Safesprings tjänster finns också på OCRE:s ramavtal för alla europeiska NREN och deras medlemmar.

## Bakgrund

{{< ingress>}}
Ökad internationell samverkan har blivit en av de drivande faktorerna bakom framgången för vårt innovations­ekosystem.
{{< /ingress >}}

Detta medför en ständigt ökande mängd data som samlas in och analyseras, samt utmaningen att lagra och arkivera denna data. Forskare hittar alltid lösningar, antingen genom att själva lösa sina lagringsbehov genom att etablera en egen skugg-it i projektet, eller genom att använda lagringstjänster från centrala IT-avdelningar. Det finns flera problem med detta lokala angreppssätt:

- Överensstämmer lagringslösningen med finansiärens krav på datahantering?
- Hur kan central IT möjliggöra flexibel samverkan kring data mellan forskare på campus och externa aktörer?
- Vem betalar för lagringen när forskningsprojektet är avslutat?

Publika molntjänster med enkel debiteringsmodell och samarbetsfunktioner har lösningar på dessa utmaningar men är svåra att använda för europeiska forskare. Detta gäller särskilt om den data som produceras i projektet är känslig. Det finns alltid en möjlighet att köra en privat molnlösning, men alla universitet har inte en IT-avdelning med resurser att implementera och underhålla en sådan lösning, särskilt när det gäller att upprätta höga krav på fysisk datacentersäkerhet och andra administrativa processer.

Eftersom forskare har vant sig vid moderna molnlagringstjänster vet de vad de vill ha, men saknar sätt att uppnå det och samtidigt följa GDPR eller annan europeisk lagstiftning.

![Sunet Drive är perfekt för samarbete](/img/documents/safespring-sunet-drive.jpg)

## Behov och krav

Universitet över hela Europa har gemensamma behov och krav på en lagringslösning:

- Den ska vara enkel att använda och administrera för alla inblandade parter.
- Initialkostnaden bör täckas av universiteten, med en enkel och transparent debiteringsmodell för projekt som behöver lagra stora datamängder.
- Samarbete mellan institutioner, både på och utanför campus, samt externa aktörer ska vara flexibelt men ändå säkert.
- Data ska kunna hanteras från primära datakällor ända till arkivering av publicerade resultat.
- Lösningen ska bygga på öppna standarder och API:er för att undvika inlåsning till en leverantör.

### Klassificering

Alla dessa krav placeras sedan i en generell modell för livscykelhantering av forskningsdata, baserad på en kombination av klassificeringsparametrar: lokalt (on-premises) eller lagrat i molnet, små eller stora filer, samt datans känslighetsnivå.

När dessa parametrar har fastställts kan data nås antingen via ett klassiskt filsystem eller moderna appar som fungerar på mobil och dator, samtidigt som man alltid kan avgöra var datat är lagrat fysiskt.

Sunet Drive möjliggör sedan en sömlös livscykelhantering av datat under projektets gång, genom bevarandetiden och fram till arkivering av datat.

## Lösningen

{{< ingress >}}
Sunet Drive är en hanterad lagringslösning som är installerad i universitetets lokala IT‑miljö.
{{< /ingress >}}

Sunet Drive är en hanterad lagringslösning som är fysiskt installerad i universitetets lokala datacenter och som bygger på de tillförlitliga open source-projekten Nextcloud, OpenStack och Ceph. Den använder SAML2-baserad federerad inloggning för att knyta samman samarbetande forskare i hela den akademiska sektorn. Den är byggd för att hantera data i petabyte-skala och använder Sunets högpresterande NREN-nät för filöverföringar mellan universitet.

Den är utformad för att möta behoven och kraven ovan och bli en smart och långsiktig lösning för svenska universitet att hantera sina ökande lagringsbehov utan att kompromissa med regelverk som exempelvis Schrems II.

### Design

Sunet Drive gör det möjligt för universitet att erbjuda en lagringslösning med samma flexibilitet som många forskare har vant sig vid, samtidigt som den uppfyller lokala, nationella och internationella krav. Detta uppnås genom en federerad arkitektur i global skala som implementerar en gemensam förvaltning mellan Sunet och det lokala universitetet.

Varje organisation som ansluter till lösningen kan förvalta sin egen Nextcloud-nod enligt gemensamt överenskomna standarder, samtidigt som lokala processer och rutiner kan stödjas. Den federerade inloggningen via en Global Site Selector binder en användare till respektive Nextcloud-nod. Detta garanterar att användare från en organisation endast verkar på sin egen nod.

När en internationell användare loggar in i Sunet Drive blir de delegerade till en extern Nextcloud-nod där ett användarkonto etableras, och de kan bjudas in av andra användare att samarbeta.

![Separering i Sunet Drive](/img/documents/sunet_drive_separation2.svg)

Huvudlagringen för varje Nextcloud-nod är S3-lagring som körs på samma infrastruktur som Nextcloud-noden. S3 består av bucketar, som är flexibla lagringsenheter som kan hanteras som virtuella hårddiskar.

Datamanagerare och dataåtkomstfunktioner vid universiteten kan flexibelt skapa S3-bucketar och tilldela dem till forskare, projekt, institutioner eller andra logiska organisationer. På så sätt går det att hålla data som tillhör ett visst projekt eller forskargrupp åtskilda. Befintlig data kan enkelt integreras och indexeras av Nextcloud, vilket kan användas för applikationer där forskare behöver ladda upp data direkt till S3 i stället för att använda Nextcloud. Å andra sidan tillhandahåller Nextcloud synkroniseringsklienter för alla plattformar och stöder dessutom filöverföringsprotokoll som WebDAV för att agera som en lokal filserver.

Genom att använda S3 som backend är det alltid möjligt att nå kärn­datan direkt från lagringslösningen. Detta gör det lätt att migrera datat till en annan lösning om behovet skulle uppstå. Nextcloud tillför användarmappning, lokal synkronisering, delning och samarbetsfunktioner till lösningen. Generellt fungerar det som ett användarvänligt gränssnitt mot datat som lagras i S3-lösningen.

Sunet Drive är byggt med separation mellan åtkomst och ägande av data i åtanke. Det innebär att en forskare kan byta till ett annat universitet med en annan Nextcloud-nod utan komplexa migreringsförfaranden. Även efter att ha bytt tillhörighet kommer forskare att kunna komma åt sitt data med minimal administrativ insats.

## Byggblock

{{< ingress >}}
Det finns ett antal komponenter som tillsammans utgör Sunet Drive.
{{< /ingress >}}

### Samarbetsplattform – Nextcloud

Nextcloud är en lokalt installerad samarbetsplattform. Den kombinerar på ett unikt sätt bekvämligheten och användarvänligheten hos konsumenttjänster som Dropbox, OneDrive och Google Drive med den säkerhet, integritet och kontroll som stora organisationer behöver.

Användare får åtkomst till sina dokument och kan dela dem med andra inom och utanför sin organisation via ett lättanvänt webbgränssnitt eller klienter för Windows, Mac, Linux, Android och iOS.

Eftersom Nextcloud är ett open source-projekt går det att integrera med andra lösningar och skräddarsy efter specifika behov. Sunet Drive inkluderar en federerad inloggningsintegration med SWAMID vilket gör det lättare att samarbeta mellan olika universitet och hjälper också till att lösa problemet med forskare som byter universitet och hur data ska kunna följa med dem till deras nya miljö.

Nextcloud stöder även Global Site Selector-funktionalitet som i Sunet Drive används för att tillhandahålla Single sign-on (SSO) till hela lösningen. Alla inloggningar startar på en gemensam inloggningssida och användaren omdirigeras sedan till rätt nod, som kan finnas hos Sunet eller vid användarens universitet. Platsen för användarens data lagras som metadata i SWAMID-lösningen vilket gör det lättare att spåra var användare hör hemma.

S3 kan användas både som bakomliggande lagring för hela lösningen och anslutas som separata externa lagringsenheter till Nextcloud-noden. Det senare är praktiskt för att möta lagringsbehov i ett specifikt forskningsprojekt eftersom alla tillhörande filer kan lagras i en S3-bucket som i sin tur presenteras som en separat enhet i Nextcloud.

Med avancerade funktioner för att hantera åtkomst till filer, kataloger eller externa enheter (hela S3-bucketar) kan användarna styra vem som får åtkomst till vad. Det är till och med möjligt att ge åtkomst till externa användare, vilket är mycket användbart i projekt som spänner över både privata företag och akademi.

Om delningsinställningarna tillåter det kan alla filer i Nextcloud delas via standardiserade protokoll som WebDAV. Detta ger en flexibilitet som standard‑S3 saknar och gör det lättare att bygga arkiveringspipelines eller andra typer av dataflöden.

### Objektlagring – Ceph

Primära lagringskrav för Sunet har definierats som:

- Tillgänglighet
- Konsistens
- Robusthet
- Kostnad

Det är avsevärt billigare att ge garantier som uppfyller dessa krav per objekt än för ett helt filsystem. I och med att S3 har blivit en de facto-standard som gränssnitt mot objektlagring möts även kraven på långsiktig driftsäkerhet och möjligheten att migrera datat någon annanstans.

Ceph, med RadosGW-implementationen, är en beprövad lösning för storskalig objektlagring. Genom att tillhandahålla samma underliggande lösning till olika universitet i Sverige öppnas möjligheter för federation eller till och med en gränslös datalake för forskning.

### Beräkning – OpenStack

OpenStack-installationen är liten i jämförelse med Ceph-installationen eftersom den främst används för att köra de virtuella maskiner som behövs för Nextcloud och Galera Cluster. Om universitetet behöver ytterligare resurser för databehandling kan kapaciteten enkelt utökas.

Genom att ha beräkningskraft nära datat får forskare möjlighet att bearbeta och göra beräkningar på datat. Resurserna tilldelas med flavors (maskintyper), där vissa är vanliga CPU-resurser och vissa GPU-resurser om universitetet har behov av det och har GPU-kort installerade i instansen. Instanserna kommer också med snabb, lokal NVMe-lagring för hög prestanda vid databearbetning.

### Hårdvaruinfrastruktur

Hårdvaruinfrastrukturen baseras på standardiserade i386‑noder placerade i universitetets IT‑miljö. Det mesta av hanteringen sker på distans men vid fysiskt arbete som diskbyten och ersättningar utförs dessa uppgifter av lokal IT-personal.

## Implementering

{{< ingress >}}
Det finns ett antal komponenter som tillsammans utgör Sunet Drive.
{{< /ingress >}}

Flera komponenter har integrerats för att skapa Sunet Drive. Längst ner har vi de självständiga noderna som är kompletta, redundanta installationer av Nextcloud med frontendservrar med applikationslogik och databaskluster. Containerteknik effektiviserar alla DevOps-aspekter, från automatiserad driftsättning till underhåll. I mitten av bilden finns de delade komponenterna som drivs av Sunet.

<br><br>
![Översikt över Sunet Drive](/img/documents/sunet_drive_overview.svg)
<br><br><br>

I mitten av bilden ser vi de delade komponenterna som körs centralt hos Sunet.
En Global Site Selector, en redundant Nextcloud-nod med GSS‑masterrollen aktiverad. Denna nod hanterar inloggningar och omdirigerar användare till deras respektive noder.

SAML2-proxyn (för integration med befintliga federerade ID‑plattformar). GSS använder SAML2-proxynoden för att vidarebefordra inloggningsförfrågningar som skickas vidare till varje universitets IdP för autentisering. När en inloggning lyckas skickas informationen tillbaka till GSS-noden via SAML2-proxyn.

Uppslagsservern som gör det möjligt för de självständiga Nextcloud-noderna att slå upp användare som finns i andra Nextcloud-noder. Detta gör det möjligt för användare i olika Nextcloud-noder att hitta varandra för samarbete mellan olika universitet och institutioner.
En lastbalanseringstjänst för att säkerställa hög motståndskraft och tillgänglighet i lösningen.

Inte med på bilden är testmiljön, som är en replik av arkitekturen för verifiering och validering av nya funktioner och uppgraderingar.
Längst upp i bilden ser vi användarna vid de olika institutionerna som använder tjänsten genom att logga in via Global Site Selector och bli omdirigerade till respektive universitets Nextcloud-nod.

### Drift

De flesta komponenter i Sunet Drive hanteras som kod (infrastructure as code), vilket möjliggör oföränderlig infrastruktur uppdelad mellan tillståndslösa (stateless) och tillståndsfulla (stateful) komponenter. Nextclouds frontendservrar är ett bra exempel på tillståndslösa komponenter; de kan enkelt skalas ut genom att lägga till fler instanser. Men även databasservrarna, som är klustrade och tillståndsfulla, är till stor del frikopplade från den underliggande S3-lagringen och innehåller endast generell information om filoperationer, snarare än faktisk forskningsdata.

### Regelefterlevnad

Regelefterlevnad uppnås på flera nivåer, med processer som stödjer, men inte begränsas till, processramverk som ISO 27001, ITIL eller svenska MSBFS 2020:7, som reglerar säkerhetsåtgärder i informationssystem för statliga myndigheter. Detta görs genom en tydlig ansvarsfördelning mellan de inblandade parterna. Användare och operatörer får åtkomst till sina respektive delar av den federerade arkitekturen, som i sin tur kan anpassas till lokala processer.

### Användarperspektiv

Ur slutanvändarens perspektiv är det så enkelt som det kan bli när man använder en EFSS‑lösning (Enterprise File Sync and Share). En användare loggar in via sitt institutionskonto och blir delegerad till den federerade nod som samförvaltas av Sunet/Safespring och deras institution. Det innebär till exempel att en användare kan ansöka om projektspecifik lagring (en S3-bucket), som då visas som en vanlig mapp i Nextcloud och kan synkroniseras med Nextclouds standardappar.

Samarbeten med andra forskare kan enkelt etableras genom att bjuda in dem till Sunet Drive. När ett projekt är avslutat kan egenskaperna för S3‑bucketen ändras och ägarskapet till datat kan överföras. Detta inkluderar även integrering av metadata för publikationer, t.ex. via DORIS från Svensk nationell datatjänst (SND).

## Slutsats

{{< ingress >}}
Ökad internationell samverkan har blivit en av de drivande faktorerna bakom framgången för vårt innovations­ekosystem.
{{< /ingress >}}

Genom att använda standardhårdvara och etablerade open source-projekt tillhandahåller Sunet Drive en lagringslösning som är utformad för att möta de ständigt växande lagringsbehoven inom den akademiska sektorn.

Genom att koppla den till redan existerande lösningar som SWAMID för identitetshantering kan forskare arbeta och samarbeta med stora datamängder. Detta kombineras med förutsägbara kostnader och möjligheten att låta data följa forskaren i stället för tvärtom.