---
ai: true
language: "nb"
title: "Sunet Drive-løsning for filsynkronisering og deling"
section: "Løsningsnotat"
date: 2021-04-12T11:29:26+02:00
draft: false
intro: "En GDPR-kompatibel løsning for synkronisering og deling av filer for forskning og utdanning"
eventbild: "safespring_background_42.jpg"
socialmedia: "safespring_social_42.gif"
dokumentbild: "safespring_card_42.jpg"
sidebarlinkname: "Last ned som PDF"
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: "/documents/sunet/safespring_solution-brief_sunet-drive.pdf"
noindex: ""
toc: "Innholdsfortegnelse"
aliases:
  - /dokument/sunet/sunet-drive/
---
{{< ingress >}}
Sunet Drive er en administrert lagringsløsning som er fysisk installert i universitetets lokale datasentre og er bygget på de anerkjente åpne kildekode-prosjektene Nextcloud, OpenStack og Ceph.
{{< /ingress >}}

{{< inline "Sunet" >}} er den svenske nasjonale forsknings- og utdanningsorganisasjonen (NREN). Sunet ble grunnlagt på 1980-tallet som et forskningsprosjekt for svenske dataforskere som banet vei for internett i Sverige. I dag kobler Sunet sammen 750 000 brukere og 110 organisasjoner via 8 400 km med fiber, og tilbyr også andre tjenester som støtter vitenskap og forskning.

{{< inline "Safespring" >}} er en leverandør av infrastruktur- og plattformtjenester (IaaS/PaaS), og er leverandøren av Sunets skytilbud til den svenske akademiske sektoren. Ved å jobbe tett med Sunet har Safespring bygget skyløsninger i stor skala for Sunets kunder. Safesprings tjenester er også tilgjengelige på OCRE-rammeavtalen for alle europeiske NREN-er og deres medlemmer.

## Bakgrunn

{{< ingress>}}
Økt internasjonalt samarbeid er blitt en av de viktigste drivkreftene for suksessen til vårt innovasjonsøkosystem.
{{< /ingress >}}

Med dette følger stadig større datamengder som samles inn og analyseres, samt utfordringen med å lagre og arkivere dataene. Forskere finner alltid løsninger, enten ved å dekke lagringsbehovene selv ved å etablere sin egen «skygge-IT» i prosjektet, eller ved å bruke lagringstjenester fra sentrale IT-avdelinger. Denne lokale tilnærmingen medfører flere problemer:

- Samsvarer lagringsløsningen med kravene til databehandling fra finansieringsorganet?
- Hvordan kan sentral IT legge til rette for fleksibelt samarbeid om data mellom forskere på campus og eksterne aktører?
- Hvem betaler for lagringen når forskningsprosjektet er avsluttet?

Offentlige skytjenester med en enkel prismodell og samarbeidsfunksjoner kan løse mange av disse utfordringene, men er vanskelige å bruke for europeiske forskere. Dette gjelder særlig dersom dataene som produseres er sensitive. Det er alltid mulig å drifte en privat skyløsning, men ikke alle universiteter har en IT-avdeling bemannet for å implementere og vedlikeholde en slik løsning, spesielt når det gjelder å etablere høye standarder for fysisk datasentersikkerhet og andre administrative prosesser.

Etter å ha blitt vant til moderne skylagringstjenester vet forskerne hva de ønsker, men de mangler en måte å få det til på og samtidig være i samsvar med GDPR eller annen europeisk lovgivning.

![Sunet Drive er perfekt for samarbeid](/img/documents/safespring-sunet-drive.jpg)

## Behov og krav

Universiteter over hele Europa har felles behov og krav til en lagringsløsning:

- Den skal være enkel å bruke og administrere for alle involverte parter.
- Startkostnader bør dekkes av universitetene, med en enkel og transparent prismodell for prosjekter som krever lagring av store datasett.
- Samarbeid mellom institusjoner, både på og utenfor campus, og med eksterne aktører, skal være fleksibelt, men fortsatt sikkert.
- Data skal kunne håndteres fra primære datakilder helt frem til arkivering av publiserte resultater.
- Løsningen bør baseres på åpne standarder og API-er for å unngå leverandørlåsing.

### Klassifisering

Alle disse kravene passer inn i en generell modell for livssyklushåndtering av forskningsdata, basert på en kombinasjon av klassifiseringsparametere: lokalt (on-premise) eller i skyen, små eller store filer, samt hvor sensitive dataene er.

Når disse parameterne er fastsatt, kan dataene nås enten via et klassisk filsystem eller moderne apper som fungerer på mobile enheter og desktop, samtidig som man alltid kan fastslå hvor dataene er lagret fysisk.

Sunet Drive muliggjør deretter sømløs livssyklusstyring av dataene under prosjektgjennomføringen, gjennom perioden for oppbevaring, og frem til arkivering av dataene.

## Løsningen

{{< ingress >}}
Sunet Drive er en administrert lagringsløsning installert i universitetets lokale IT-miljø.
{{< /ingress >}}

Sunet Drive er en administrert lagringsløsning som er fysisk installert i universitetets lokale datasentre og er bygget på de anerkjente åpne kildekode-prosjektene Nextcloud, OpenStack og Ceph. Den bruker SAML2-føderert innlogging for å knytte sammen samarbeidende forskere i hele akademia. Den er bygget for å håndtere data i petabyteskala og bruker Sunets høyytelses NREN-nett for filoverføringer mellom universiteter.

Den er utformet for å oppfylle behovene og kravene nevnt ovenfor, slik at svenske universiteter får en smart og langsiktig løsning for å håndtere økende lagringsbehov uten å kompromisse med lovgivningsmessige forhold som Schrems II.

### Design

Sunet Drive gjør det mulig for universiteter å tilby en lagringsløsning med samme fleksibilitet som mange forskere har blitt vant til, samtidig som den er i samsvar med lokale, nasjonale og internasjonale krav. Dette oppnås gjennom en føderert arkitektur i global skala som etablerer samforvaltning mellom Sunet og det lokale universitetet.

Hver organisasjon som blir med i løsningen, kan administrere sin egen Nextcloud-node i tråd med felles avtalte standarder, samtidig som lokale prosesser og prosedyrer støttes. Den fødererte innloggingen via en Global Site Selector binder en bruker til vedkommendes respektive Nextcloud-node. Dette garanterer at brukere fra én organisasjon kun opererer på sin egen node.

Når en internasjonal bruker logger på Sunet Drive, videresendes vedkommende til en ekstern Nextcloud-node der en brukerkonto klargjøres, og de kan inviteres av andre brukere til samarbeid.

![Separasjon i Sunet Drive](/img/documents/sunet_drive_separation2.svg)

Hovedlagringen for hver Nextcloud-node er S3-lagring som kjører på samme infrastruktur som Nextcloud-noden. S3 består av buckets, som er fleksible lagringsenheter som kan håndteres som virtuelle harddisker.

Dataforvaltere og enheter for datatilgang ved universitetene kan fleksibelt opprette S3-buckets og tildele dem til forskere, prosjekter, institusjoner eller andre logiske organiseringer. På denne måten kan data som tilhører et bestemt prosjekt eller en forskningsgruppe holdes atskilt. Eksisterende data kan enkelt integreres og indekseres av Nextcloud, noe som kan brukes i applikasjoner der forskere må laste opp data direkte til S3 i stedet for å bruke Nextcloud. Samtidig tilbyr Nextcloud synkroniseringsklienter for alle plattformer, og støtter også filoverføringsprotokoller som WebDAV for å opptre som en lokal filserver.

Ved å bruke S3 som backend er det alltid mulig å nå kjernedataene direkte fra lagringsløsningen. Dette gjør det enkelt å migrere dataene til en annen løsning dersom behovet oppstår. Nextcloud tilfører brukerkartlegging, lokal synkronisering, deling og samarbeidsfunksjoner til løsningen. Generelt fungerer den som et brukervennlig grensesnitt til dataene som er lagret i S3-løsningen.

Sunet Drive er bygget med skille mellom tilgang og eierskap til dataene i tankene. Det betyr at en forsker kan flytte til et annet universitet med en annen Nextcloud-node uten komplekse migreringsprosedyrer. Selv etter at tilhørighet er endret, vil forskere kunne få tilgang til dataene sine med minimalt administrativt arbeid.

## Byggeklosser

{{< ingress >}}
En rekke komponenter utgjør til sammen Sunet Drive.
{{< /ingress >}}

### Samarbeidsplattform - Nextcloud

Nextcloud er en lokal (on-premises) samarbeidsplattform. Den kombinerer på en unik måte brukervennligheten fra forbrukertjenester som Dropbox, OneDrive og Google Drive med sikkerheten, personvernet og kontrollen som store organisasjoner trenger.

Brukere får tilgang til dokumentene sine og kan dele dem med andre innenfor og utenfor egen organisasjon via et brukervennlig webgrensesnitt eller klienter for Windows, Mac, Linux, Android og iOS.

Siden Nextcloud er et open source-prosjekt, er det mulig å integrere med andre løsninger for å tilpasse seg spesifikke behov. Sunet Drive inkluderer en føderert innloggingsintegrasjon med SWAMID som gjør det enklere å samarbeide mellom ulike universiteter, og som også bidrar til å løse problemet når forskere flytter til et annet universitet og dataene skal kunne følge dem til det nye stedet.

Nextcloud støtter også Global Site Selector-funksjonalitet, som i Sunet Drive brukes til å tilby Single Sign-On for hele løsningen. Alle innlogginger starter på en felles innloggingsside, og brukeren omdirigeres deretter til riktig node, som kan være hos Sunet eller ved brukerens universitet. Plasseringen av brukerens data lagres som metadata i SWAMID-løsningen, noe som gjør det enklere å holde oversikt over hvor brukere hører hjemme.

S3 kan brukes både som underliggende lagring for hele løsningen og kobles til som separate eksterne disker til Nextcloud-noden. Det siste er praktisk for å dekke lagringsbehov i et spesifikt forskningsprosjekt, siden alle tilhørende filer kan lagres i en S3-bucket som igjen presenteres som en egen disk i Nextcloud.

Med avansert funksjonalitet for å håndtere tilgang til filer, kataloger eller eksterne disker (hele S3-buckets) kan brukerne kontrollere hvem som får tilgang til hva. Det er til og med mulig å gi tilgang til eksterne brukere, noe som er svært nyttig i prosjekter som omfatter både private virksomheter og akademia.

Hvis delingsinnstillingene tillater det, kan alle filer i Nextcloud deles via standardiserte protokoller som WebDAV. Dette gir en fleksibilitet som standard S3 ikke har, og gjør det enklere å bygge arkiveringspipeliner eller andre typer dataflyter.

### Objektlagring - Ceph

Primære lagringskrav for Sunet er definert som:

- Tilgjengelighet
- Konsistens
- Robusthet
- Kostnad

Det er betydelig billigere å gi garantier som oppfyller disse kravene per objekt enn på tvers av et helt filsystem. Siden S3 har blitt en de facto-standard som grensesnitt til objektlagring, ivaretas også kravene til langsiktig driftsevne og muligheten til å migrere dataene andre steder.

Ceph, med RadosGW-implementasjonen, er en velprøvd løsning for objektlagring i stor skala. Ved å tilby den samme underliggende løsningen til ulike universiteter i Sverige åpnes det for føderering eller til og med en grenseløs datalake for forskning.

### Regnekraft - OpenStack

OpenStack-installasjonen er liten sammenlignet med Ceph-installasjonen, siden den primært brukes til å kjøre de virtuelle maskinene som trengs for Nextcloud og Galera-klyngen. Hvis universitetet trenger flere ressurser til databehandling, kan kapasiteten enkelt økes.

Ved å ha regnekraft nær dataene får forskerne mulighet til å behandle og gjøre beregninger på dataene. Ressursene tildeles som flavors, der noen er vanlige CPU-ressurser og noen GPU-ressurser hvis universitetet har behov for det og GPU-kort er installert i instansene. Instansene vil også ha rask, lokal NVMe-lagring for høy ytelse ved databehandling.

### Maskinvareinfrastruktur

Maskinvareinfrastrukturen er basert på standard i386-noder plassert i universitetets IT-miljø. Det meste av forvaltningen gjøres eksternt, men ved fysisk arbeid som bytte og utskifting av disker utfører det lokale IT-personellet disse oppgavene.

## Implementering

{{< ingress >}}
En rekke komponenter utgjør til sammen Sunet Drive.
{{< /ingress >}}

Det er flere komponenter som er integrert for å skape Sunet Drive. Nederst har vi de selvstendige nodene, som er komplette, redundante installasjoner av Nextcloud med frontendservere med applikasjonslogikk og databaseklynger. Containerteknologi effektiviserer alle DevOps-aspekter, fra automatisert utrulling til vedlikehold. I midten av bildet er de delte komponentene som drives av Sunet.

<br><br>
![Oversikt over Sunet Drive](/img/documents/sunet_drive_overview.svg)
<br><br><br>

I midten av bildet ser vi de delte komponentene som kjører sentralt hos Sunet.
En Global Site Selector, en redundant Nextcloud-node med GSS master-rollen aktivert. Denne noden håndterer innlogginger og omdirigerer brukere til sine respektive noder.

SAML2 Proxy (for integrasjon med eksisterende fødererte ID-plattformer). GSS bruker SAML2 Proxy-noden til å videresende innloggingsforespørsler, som sendes videre til hvert universitets IDP for autorisasjon. Når en innlogging er vellykket, sendes informasjonen tilbake til GSS-noden via SAML2 Proxy.

Oppslagstjeneren som gjør det mulig for de selvstendige Nextcloud-nodene å slå opp brukere som befinner seg i andre Nextcloud-noder. Dette gjør det mulig for brukere i ulike Nextcloud-noder å finne hverandre for samarbeid mellom forskjellige universiteter og institusjoner.
En lastbalanseringstjeneste for å sikre høy robusthet og oppetid i løsningen.

Ikke avbildet er testmiljøet, som er en replika av arkitekturen for verifikasjon og validering av nye funksjoner og oppgraderinger.
Øverst i bildet ser vi brukerne ved de ulike institusjonene som får tilgang til tjenesten ved å logge inn via Global Site Selector og bli omdirigert til sine respektive universiteters Nextcloud-noder.

### Drift

De fleste komponentene i Sunet Drive håndteres som kode (infrastructure as code), noe som muliggjør uforanderlig infrastruktur delt mellom tilstandsfulle og tilstandsløse komponenter. Nextcloud-frontendservere er et godt eksempel på tilstandsløse komponenter; de kan enkelt skalere horisontalt ved å legge til flere instanser. Selv databaseinstansene, som er klynget og dermed tilstandsfulle, er i stor grad frikoblet fra den underliggende S3-lagringen, og inneholder kun generell informasjon om operasjoner på filer snarere enn selve forskningsdataene.

### Etterlevelse

Etterlevelse av krav til data oppnås på flere nivåer, med prosesser som støtter, men ikke er begrenset til, rammeverk som ISO 27001, ITIL eller svenske MSBFS 2020:7, som fastsetter regler for sikkerhetstiltak i informasjonssystemer for statlige myndigheter. Dette gjøres gjennom en klar ansvarsdeling mellom de involverte partene. Brukere og operatører får tilgang til sine respektive deler av den fødererte arkitekturen, som deretter kan tilpasses lokale prosesser.

### Brukerperspektiv

Sluttbrukeropplevelsen er så enkel som mulig for en Enterprise File Sync and Share (EFSS)-løsning. En bruker logger inn med sin institusjonelle konto og blir sendt til den fødererte noden som samforvaltes av Sunet/Safespring og institusjonen. Dette betyr for eksempel at en bruker kan søke om prosjektspesifikk lagring (en S3-bucket), som deretter vises som en vanlig mappe i Nextcloud og kan synkroniseres med Nextclouds standardapplikasjoner.

Samarbeid med andre forskere kan enkelt etableres ved å invitere dem inn i Sunet Drive. Når et prosjekt er avsluttet, kan egenskapene til S3-bucketen endres, og eierskapet til dataene kan overføres. Dette inkluderer også integrasjon av metadata for publikasjoner, for eksempel via DORIS fra Swedish National Data Service (SND).

## Konklusjon

{{< ingress >}}
Økt internasjonalt samarbeid er blitt en av de viktigste drivkreftene for suksessen til vårt innovasjonsøkosystem.
{{< /ingress >}}

Ved å bruke standard maskinvare og etablerte open source-prosjekter tilbyr Sunet Drive en lagringsløsning som er utformet for å løse de stadig økende lagringsbehovene i akademia.

Ved å koble den til allerede eksisterende løsninger som SWAMID for identitetshåndtering, kan forskere arbeide og samarbeide med store datasett. Dette kombineres med forutsigbare kostnader og muligheten til å la dataene følge forskeren – ikke omvendt.