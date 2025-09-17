---
ai: true
language: "da"
title: "Sunet Drive-løsning til synkronisering og deling af filer"
section: "Løsningsoversigt"
date: 2021-04-12T11:29:26+02:00
draft: false
intro: "En GDPR-kompatibel filsynkroniserings- og delingsløsning til forskning og uddannelse"
eventbild: "safespring_background_42.jpg"
socialmedia: "safespring_social_42.gif"
dokumentbild: "safespring_card_42.jpg"
sidebarlinkname: "Hent som PDF"
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: "/documents/sunet/safespring_solution-brief_sunet-drive.pdf"
noindex: ""
toc: "Indholdsfortegnelse"
aliases:
  - /dokument/sunet/sunet-drive/
---
{{< ingress >}}
Sunet Drive er en administreret lagringsløsning, der er fysisk installeret i universitetets lokale datacentre og er bygget på de betroede open source-projekter Nextcloud, OpenStack og Ceph.
{{< /ingress >}}

{{< inline "Sunet" >}} er Sveriges nationale forsknings- og uddannelsesorganisation (NREN). Sunet blev grundlagt i 1980’erne som et forskningsprojekt for svenske dataloger, der banede vejen for internettet i Sverige. I dag forbinder Sunet 750.000 brugere og 110 organisationer via 8.400 km fiber og leverer også andre tjenester til at understøtte videnskab og forskning.

{{< inline "Safespring" >}} er en leverandør af infrastruktur- og platform-som-en-service og er leverandør af Sunets cloud-tilbud til den svenske akademiske sektor. Ved at arbejde tæt sammen med Sunet har Safespring bygget storskala cloud-løsninger til Sunets kunder. Safesprings tjenester er også tilgængelige på OCRE-rammeaftalen for alle europæiske NREN og deres medlemmer.

## Baggrund

{{< ingress>}}
Øget internationalt samarbejde er blevet en af de drivende faktorer for succesen for vores innovationsøkosystem.
{{< /ingress >}}

Det medfører en stadigt voksende mængde data, der indsamles og analyseres, samt udfordringen med at lagre og arkivere disse data. Forskere finder altid løsninger ved enten selv at løse deres lagringsbehov ved at etablere deres egen skygge-IT i projektet eller ved at bruge lagringstjenester fra de centrale IT-afdelinger. Der er flere problemer med denne lokale tilgang:

- Matcher lagringsløsningen de datastyringskrav, som bevillingsgiveren stiller?
- Hvordan kan central IT understøtte fleksibelt samarbejde om data mellem forskere på campus og eksterne aktører?
- Hvem betaler for opbevaringen af data, når forskningsprojektet er afsluttet?

Offentlige cloud-tjenester med en enkel prismodel og samarbejdsfunktioner har løsninger på disse udfordringer, men er svære at bruge for europæiske forskere. Dette gælder især, hvis de data, der produceres af projektet, på nogen måde er følsomme. Der er altid mulighed for at køre en privat cloud-løsning, men ikke alle universiteter har en IT-afdeling bemandet til at implementere og vedligeholde en sådan løsning, især når det gælder etablering af høje standarder for fysisk sikkerhed i datacentre og andre administrative processer.

Forskere, der har vænnet sig til moderne cloud-lagringstjenester, ved udmærket, hvad de ønsker, men mangler en måde at opnå det på og samtidig overholde GDPR eller anden europæisk lovgivning.

![Sunet Drive er perfekt til samarbejde](/img/documents/safespring-sunet-drive.jpg)

## Behov og krav

Universiteter i hele Europa har fælles behov og krav til en lagringsløsning:

- Den skal være let at bruge og administrere for alle involverede parter.
- Startomkostningerne bør dækkes af universiteterne, med en enkel og transparent prismodel for projekter, der kræver lagring af store datasæt.
- Samarbejde mellem institutioner – både på og uden for campus – samt eksterne aktører skal være fleksibelt, men stadig sikkert.
- Data skal kunne håndteres fra de primære datakilder og helt frem til arkivering af publicerede resultater.
- Løsningen skal være baseret på åbne standarder og API’er for at undgå leverandørlåsning.

### Klassificering

Alle disse krav indpasses i en generel model for livscyklusstyring af forskningsdata, baseret på en kombination af klassifikationsparametre: on-premises eller lagret i skyen, mindre eller større filer samt følsomheden af de data, der skal lagres.

Når disse parametre er fastlagt, kan data tilgås enten gennem et klassisk filsystem eller moderne apps, der fungerer på mobile enheder og desktops, samtidig med at man altid kan fastslå, hvor data fysisk er lagret.

Sunet Drive muliggør derefter en problemfri livscyklusstyring af data under projektets udførelse, gennem dataenes opbevaringsperiode og frem til arkivering.

## Løsningen

{{< ingress >}}
Sunet Drive er en administreret lagringsløsning installeret i universitetets lokale IT-miljø.
{{< /ingress >}}

Sunet Drive er en administreret lagringsløsning, der er fysisk installeret i universitetets lokale datacentre og er bygget på de betroede open source-projekter Nextcloud, OpenStack og Ceph. Den bruger SAML2-fødereret login til at binde samarbejdende forskere sammen på tværs af hele den akademiske sektor. Den er bygget til at håndtere data i petabyteskala og bruger Sunets højtydende NREN-netværk til filoverførsler mellem universiteter.

Den er designet til at opfylde de ovennævnte behov og krav for at blive en smart og langsigtet løsning for svenske universiteter til at håndtere deres stigende lagringsbehov uden at gå på kompromis med lovkrav som Schrems II.

### Design

Sunet Drive gør det muligt for universiteter at levere en lagringsløsning med samme fleksibilitet, som mange forskere har vænnet sig til, samtidig med at den overholder lokale, nationale og internationale krav. Dette opnås gennem en fødereret arkitektur i global skala, der implementerer fælles styring mellem Sunet og det lokale universitet.

Hver organisation, der tilslutter sig løsningen, vil kunne administrere deres egen Nextcloud-node i overensstemmelse med fælles aftalte standarder og samtidig kunne understøtte lokale processer og procedurer. Det fødererede login via en Global Site Selector binder en bruger til deres respektive Nextcloud-node. Dette garanterer, at brugere fra én organisation kun opererer på deres egen node.

Når en international bruger logger på Sunet Drive, bliver vedkommende videresendt til en ekstern Nextcloud-node, hvor der oprettes en brugerkonto, og de kan blive inviteret af andre brugere til at samarbejde.

![Adskillelse i Sunet Drive](/img/documents/sunet_drive_separation2.svg)

Hovedlagringen for hver Nextcloud-node er S3-lagring, der kører på den samme infrastruktur som Nextcloud-noden. S3 består af buckets, som er fleksible lagringsentiteter, der kan håndteres som virtuelle harddiske.

Datamanagere og enheder for dataadgang på universiteterne kan fleksibelt oprette S3-buckets og tildele dem til forskere, projekter, institutioner eller andre logiske organisationer. På den måde er det muligt at holde data, der tilhører et specifikt projekt eller forskningsgruppe, adskilt. Eksisterende data kan nemt integreres og indekseres af Nextcloud, hvilket kan bruges til anvendelser, hvor forskere har behov for at uploade data direkte til S3 i stedet for at bruge Nextcloud. Omvendt leverer Nextcloud synkroniseringsklienter til alle platforme og understøtter også filoverførselsprotokoller som WebDAV for at fungere som en lokal filserver.

Ved at bruge S3 som backend er det altid muligt at nå kernedataene direkte fra lagringsløsningen. Dette gør det nemt at migrere data til en anden løsning, hvis behovet opstår. Nextcloud tilføjer brugermapping, lokal synkronisering, deling og samarbejdsfunktioner til løsningen. Generelt fungerer den som en brugervenlig frontend til de data, der er lagret i S3-løsningen.

Sunet Drive er bygget med adskillelse af adgang til og ejerskab af data for øje. Det betyder, at en forsker kan flytte til et andet universitet med en anden Nextcloud-node uden komplekse migrationsprocedurer. Selv efter at have skiftet tilknytning vil forskere kunne få adgang til deres data med minimal administrativ indsats.

## Byggeklodser

{{< ingress >}}
Der er en række komponenter, som tilsammen udgør Sunet Drive.
{{< /ingress >}}

### Samarbejdsplatform – Nextcloud

Nextcloud er en on-premises samarbejdsplatform. Den kombinerer på unik vis bekvemmeligheden og brugervenligheden fra forbrugerprodukter som Dropbox, OneDrive og Google Drive med den sikkerhed, privatlivsbeskyttelse og kontrol, som store organisationer har brug for.

Brugere får adgang til deres dokumenter og kan dele dem med andre inden for og uden for deres organisation via en brugervenlig webgrænseflade eller klienter til Windows, Mac, Linux, Android og iOS.

Da Nextcloud er et open source-projekt, er det muligt at integrere med andre løsninger for at imødekomme specifikke behov. Sunet Drive inkluderer en fødereret login-integration med SWAMID, hvilket gør det lettere at samarbejde mellem forskellige universiteter, men hjælper også med at løse problemet med, at forskere migrerer til et andet universitet, og hvordan data skal kunne følge dem til deres nye placering.

Nextcloud understøtter også Global Site Selector-funktionaliteten, som i Sunet Drive bruges til at levere single sign-on til hele løsningen. Alle logins starter på en fælles login-side, og brugeren bliver derefter omdirigeret til den korrekte node, som kan være hos Sunet eller på brugerens universitet. Placeringen af brugerens data gemmes som metadata i SWAMID-løsningen, hvilket gør det lettere at spore, hvilke brugere der befinder sig hvor.

S3 kan bruges både som bagvedliggende lagring for hele løsningen samt tilsluttes som separate eksterne drev til Nextcloud-noden. Sidstnævnte er praktisk for at imødekomme lagringsbehov i et specifikt forskningsprojekt, eftersom alle tilhørende filer kan lagres i en S3-bucket, der præsenteres som et separat drev i Nextcloud.

Med avanceret funktionalitet til at håndtere adgang til filer, mapper eller eksterne drev (hele S3-buckets) kan brugerne kontrollere, hvem der får adgang til hvad. Det er endda muligt at give adgang til eksterne brugere, hvilket er meget nyttigt i projekter, der spænder over både private virksomheder og den akademiske verden.

Hvis delingsindstillingerne tillader det, kan alle filer i Nextcloud deles med standardiserede protokoller såsom WebDAV. Dette tilføjer en fleksibilitet, som standard S3 ikke har, og gør det lettere at bygge arkiveringspipelines eller andre typer dataflow.

### Objektlagring - Ceph

Primære lagringskrav for Sunet er defineret som:

- Tilgængelighed
- Konsistens
- Robusthed
- Omkostninger

Det er markant billigere at give garantier, der opfylder disse krav pr. objekt fremfor på tværs af et helt filsystem. I kraft af at S3 er blevet de facto-standard som grænseflade til objektlagring, opfyldes også kravene til langsigtet drift og mulighed for at migrere data andetsteds hen.

Ceph, med RadosGW-implementeringen, er en gennemprøvet løsning til objektlagring i stor skala. Ved at levere den samme underliggende løsning til forskellige universiteter i Sverige åbnes muligheder for føderation eller endda en grænseløs datalake til forskning.

### Beregningsressourcer – OpenStack

OpenStack-installationen er lille i sammenligning med Ceph-installationen, da den primært bruges til at køre de virtuelle maskiner, der er nødvendige for Nextcloud og Galera Cluster. Hvis universitetet har behov for yderligere ressourcer til databehandling, kan kapaciteten nemt øges.

Ved at have beregningskraft tæt på data får forskere mulighed for at behandle og udføre beregninger på dataene. Ressourcerne tildeles som flavors, hvor nogle vil være almindelige CPU-ressourcer og nogle GPU-ressourcer, hvis universitetet har behov for det og har GPU-kort installeret i instansen. Instanserne vil også være udstyret med hurtig, lokal NVMe-lagring for høj ydeevne ved databehandling.

### Hardwareinfrastruktur

Hardwareinfrastrukturen er baseret på standard i386-noder placeret i universitetets IT-miljø. De fleste administrationsopgaver udføres eksternt, men når der er behov for fysisk arbejde såsom diskskift og udskiftninger, udfører det lokale IT-personale disse opgaver.

## Implementering

{{< ingress >}}
Der er en række komponenter, som tilsammen udgør Sunet Drive.
{{< /ingress >}}

Der er flere komponenter, som er blevet integreret for at skabe Sunet Drive. Nederst har vi de selvstændige noder, som er komplette, redundante installationer af Nextcloud med frontends med applikationslogik og databaseklynger. Containerteknologi strømliner alle DevOps-aspekter, fra automatiseret udrulning til vedligeholdelse. I midten af figuren er de delte komponenter, der drives af Sunet.

<br><br>
![Overblik over Sunet Drive](/img/documents/sunet_drive_overview.svg)
<br><br><br>

I midten af figuren ser vi de delte komponenter, der kører centralt hos Sunet.
En Global Site Selector, en redundant Nextcloud-node med GSS-masterrollen aktiveret. Denne node håndterer logins og omdirigerer brugere til deres respektive node.

SAML2-proxyen (til integration med eksisterende fødererede ID-platforme). GSS bruger SAML2-proxy-noden til at videresende login-anmodninger, som sendes videre til hvert universitets IDP til autorisation. Når et login lykkes, sendes informationen tilbage til GSS-noden via SAML2-proxyen.

Opslagsserveren gør det muligt for de selvstændige Nextcloud-noder at slå brugere op, der befinder sig i andre Nextcloud-noder. Dette skal gøre det muligt for brugere i forskellige Nextcloud-noder at finde hinanden til samarbejde mellem forskellige universiteter og institutioner.
En load balancer-tjeneste sikrer høj robusthed og oppetid for løsningen.

Ikke vist i figuren er testmiljøet, som er en replika af arkitekturen til verifikation og validering af nye funktioner og opgraderinger.
Øverst i figuren ser vi brugerne på de forskellige institutioner, som tilgår tjenesten ved at logge ind via Global Site Selector og bliver omdirigeret til deres universiteters respektive Nextcloud-noder.

### Drift

De fleste komponenter i Sunet Drive håndteres som kode (infrastruktur som kode), hvilket muliggør uforanderlig infrastruktur opdelt mellem tilstandsfulde og tilstandsløse komponenter. Nextcloud-frontendservere er et godt eksempel på tilstandsløse komponenter; de kan nemt skaleres ud ved at tilføje flere instanser. Men selv databaseinstanserne, der er klyngede og tilstandsfulde, er for det meste afkoblet fra den underliggende S3-lagring og indeholder kun generel information om operationer på filer frem for egentlige forskningsdata.

### Compliance

Datacompliance opnås på flere niveauer ved at indarbejde processer, som understøtter – men ikke er begrænset til – procesrammer som ISO 27001, ITIL eller den svenske MSBFS 2020:7, der fastlægger regler om sikkerhedsforanstaltninger i informationssystemer for statslige myndigheder. Dette sker gennem en klar ansvarsfordeling mellem de involverede parter. Brugere og operatører får adgang til deres respektive dele af den fødererede arkitektur, som derefter kan tilpasses lokale processer.

### Brugerperspektiv

Slutbrugerens perspektiv er så enkelt som muligt ved brug af en Enterprise File Sync and Share (EFSS)-løsning. En bruger logger ind med sin institutionskonto og bliver videresendt til den fødererede node, som samstyres mellem Sunet/Safespring og deres institution. Det betyder for eksempel, at en bruger kan ansøge om projektspecifik lagring (en S3-bucket), som derefter vises som en almindelig mappe i Nextcloud og kan synkroniseres ved hjælp af Nextclouds standardapplikationer.

Samarbejde med andre forskere kan nemt etableres ved at invitere dem ind i Sunet Drive. Når et projekt er afsluttet, kan egenskaberne for S3-bucketen ændres, og ejerskabet af dataene kan overføres. Dette inkluderer også integration af metadata for publikationer, f.eks. via DORIS fra Swedish National Data Service (SND).

## Konklusion

{{< ingress >}}
Øget internationalt samarbejde er blevet en af de drivende faktorer for succesen for vores innovationsøkosystem.
{{< /ingress >}}

Ved at bruge standardhardware og etablerede open source-projekter leverer Sunet Drive en lagringsløsning, der er designet til at løse de stadigt voksende lagringsbehov i den akademiske sektor.

Ved at koble den til allerede eksisterende løsninger såsom SWAMID til identitetshåndtering vil forskere kunne arbejde med og samarbejde om store datasæt. Dette kombineres med forudsigelige omkostninger og muligheden for at lade data følge forskeren i stedet for omvendt.