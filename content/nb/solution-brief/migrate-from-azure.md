---
ai: true
title: "Migrer fra Azure Kubernetes Service til CK8s hos Safespring"
date: "2020-09-04"
draft: false
tags: ["Svenska"]
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_37.gif"
intro: "Dette dokumentet oppsummerer trinnene som bør tas for å migrere fra Azure Kubernetes Service."
sidebarlinkname: "Les som PDF"
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: "/publications/safespring-migrering-fran-microsoft-azure-kubernetes-service-2021.pdf"
card: "safespring-azure.svg"
sidebarimage: "safespring-azure.svg"
toc: "Innhold"
background: "safespring-azure.png"
socialmediabild: ""
language: "nb"
section: "Løsningsoversikt"
aliases:
  - /solution-brief/migrate-from-azure/
---
## Migrering til Compliant Kubernetes

{{< ingress >}}
Dette dokumentet oppsummerer trinnene som bør tas for å migrere fra Azure Kubernetes Service.
{{< /ingress >}}

Motivene for en slik migrering er mange. At svensk og europeisk lovverk gjelder for GDPR-etterlevelse, tilgang på ekspertsupport på svensk og at data ligger trygt i Sverige er noen av dem. Det sterke sikkerhetsfokuset i Compliant Kubernetes er et ytterligere motiv.

En migreringsplan inneholder nødvendigvis en kartleggingsfase, identifisering av avhengigheter og hvordan disse kan byttes ut, planlegging av arbeidet og tester som sikrer funksjonalitet. Deretter kan migreringen settes i gang og verifiseres ved hjelp av de kravstillende testene. Kontinuerlig dokumentasjon og oppfølging gjør at viktige lærdommer ikke går tapt.

Når migreringen først er gjennomført venter systemadministrasjon og overvåking i et nytt miljø. Verktøyene for dette er også presentert i dokumentet og hvordan de sammen gir en helhetsløsning med fokus på sikkerhet og smidige, agile utviklingsprosesser.

## Bakgrunn

{{< ingress >}}
Skytjenester har revolusjonert hvordan mange bedrifter jobber i dag.
{{< /ingress >}}

Fleksibiliteten i å kunne kjøpe som tjeneste funksjoner som tidligere ikke fantes eller som var vanskelige å bygge selv, har gitt mange virksomheter ny innovasjonskraft og forenkling av prosesser. Samarbeidsfunksjoner, sentralisert håndtering av data og dokumenter har løst problematikken rundt hvilken som er den siste versjonen av et dokument. IT- og utviklingsavdelinger kan med noen få klikk skru på nye funksjoner som støtter kompliserte eller helt nye prosesser.

Majoriteten av skyleverandørene som bedrifter bruker i dag er amerikanske. Disse aktørene har vokst til store giganter med enorm innovasjonskraft og er en viktig grunn til at vi i dag jobber på en helt ny måte i organisasjoner. Problemet er at lovverket i EU og USA ikke er kompatibelt når det kommer til håndtering av persondata. I EU bygger GDPR (personvernforordningen) og andre lover innen informasjonssikkerhet på EUs grunnlov som gir individet stor kontroll over sine data. I USA er utgangspunktet i stedet lover som gir amerikanske myndigheter store muligheter til å infiltrere data som brukerne overlater for å ivareta nasjonens sikkerhet.

De ulike utgangspunktene skaper en kollisjon som juridisk ikke er helt enkel å rydde opp i. For mer informasjon om dette temaet anbefales [Safesprings whitepaper om Schrems II](/schrems) som beskriver den siste utviklingen i forbindelse med EU-domstolens ugyldiggjøring av Privacy Shield, som de siste årene har vært den overenskomsten som bruken av amerikanske skytjenester innen EU har vært basert på.

Tilbake står nå et antall bedrifter og organisasjoner som med et fundament av skytjenester har tatt i bruk en ny måte å arbeide på uten lovlig grunnlag for å bruke dem. Det er en vanskelig situasjon siden det ikke er enkelt å gå tilbake samtidig som organisasjoner må følge loven.

### Mulighet til å bli uavhengig

Rammeverk er utviklet som fjerner avhengighetene til den underliggende skyleverandøren. Et slikt rammeverk er Kubernetes, som er en orkestreringsplattform for containerteknologi med standardiserte grensesnitt for hvordan applikasjoner kan driftsettes og vedlikeholdes. Kubernetes skaper en grunnplattform oppå hvilken applikasjoner kan håndteres gjennom standardiserte definisjoner. Hvis det høres teknisk ut, kan det oppsummeres med at Kubernetes hjelper organisasjoner å håndtere applikasjoner og tjenester på en standardisert måte med høy driftssikkerhet. Ved at systemene og deres avhengigheter er definert som kode, går det an å ta i bruk kunnskapen som finnes på internett og enkelt sette i drift kompliserte systemer som kan erstatte tjenestene hos de etablerte skyleverandørene. Det er altså enklere å kjøre selv de tjenestene organisasjonen har blitt avhengig av.

Det kommer også flere og flere applikasjoner som erstatter mer brukernære tjenester som Office 365, OneDrive eller Dropbox. Hvis organisasjonen bruker Kubernetes for å kjøre sine applikasjoner og tjenester, blir utrulling og vedlikehold av disse applikasjonene håndterbart.

Safespring er en skyleverandør med datasentre i Sverige, noe som gjør juridiske kollisjoner med amerikanske lover til et ikke-spørsmål. Sammen med vår partner Elastisys har vi utviklet et felles tilbud, Compliant Kubernetes eller Ck8s. Det er en administrert tjeneste som gir organisasjoner den grunnplattformen som muliggjør frigjøring fra den underliggende skyleverandøren. Hvis et selskap i sin nåværende skyleverandør allerede bruker Kubernetes, blir migreringen enklere fordi all koden som beskriver systemene og tjenestene som kjører kan gjenbrukes.

Dette whitepaperet beskriver hvordan en migrering fra Microsoft Azure Kubernetes Service (AKS) ser ut. Utgangspunktet er at organisasjonen allerede kjører Kubernetes i Azure. Flere av stegene er anvendelige også for organisasjoner som ikke bruker Azure Kubernetes Service i dag. Med utgangspunkt i at Kubernetes fortsetter å være lingua franca for drift av containeriserte applikasjoner, er fordelene ved å kjøre det i organisasjonen åpenbare. Alt arbeidet som legges ned i å migrere til en standardisert plattform kan gjenbrukes hvis organisasjonen skulle ønske å flytte infrastrukturen et annet sted, siden de samme definisjonene for infrastrukturen kan brukes så lenge mottakerplattformen også er Kubernetes. Det skaper en fleksibilitet og uavhengighet som ellers er vanskelig å oppnå.

### Fordelene med open source

En stor grunn til at mange benytter skytjenester er at det finnes nyttige ekstratjenester som reduserer time-to-market. Like mye som disse tjenestene reduserer produksjonstiden, øker de likevel avhengigheten til skyleverandørenes økosystem. En alternativ måte å redusere produksjonstiden for sine tjenester, samtidig som man reduserer leverandøravhengighet, er å implementere systemer som ligger utenfor ens kjerneleveranse med open source. Begge tilnærmingene lar deg fokusere på applikasjonen din og la støttesystemer være, mens tilnærmingen med open source reduserer avhengigheten i stedet for å øke den.

Open source bygger på samarbeid, og ved å engasjere seg i prosjektene man bruker (fremst ved å sende tilbake de feilrettingene og forbedringene man gjør), blir det man bidrar med gransket for større trygghet og sikkerhet. At andre som bruker prosjektene gjør det samme, skaper en kontinuerlig oppdatert kodebase gransket av mange uten lisenskostnader. Ved at mange bruker prosjektene finnes det også mye ferdig kode og løsninger for å drifte og vedlikeholde systemene bare noen søk unna.

### Compliant Kubernetes

Compliant Kubernetes (CK8s) er en CNCF (Cloud Native Computing Foundation) sertifisert Kubernetes-distribusjon som er fritt tilgjengelig både som open source og som en fullt administrert tjeneste på Safespring. Open source-løsningen passer organisasjoner som gjerne drifter Kubernetes og tilhørende teknologistakk selv, men vil dra nytte av en sikkerhetsherset Kubernetes-distribusjon spesielt tilpasset regulerte bransjer, samtidig som de slipper vedlikehold og kan forholde seg til kvartalsvise oppdateringer av pakkeringen av Kubernetes og tilhørende prosjekter. Open source-varianten er også et godt supplement til en administrert tjeneste for dem som trenger å levere programvaren sin i en kombinasjon av egne datasentre, ute hos kunder og i offentlige skyer og vil gjøre det på en sømløs måte med full etterlevelse. For kunder som ønsker det, tilbyr vår partner Elastisys både 8/17- og 24/7-support.

### CK8s som åpen kildekode

- [Kildekode](https://github.com/elastisys/compliantkubernetes)
- [Dokumentasjon](https://compliantkubernetes.io)

### Forutsetninger

For å kunne kjøre applikasjoner i Compliant Kubernetes gjelder følgende forutsetninger:

- Konto hos Safespring Compute og eventuelt Safespring Storage dersom objektlagring skal brukes.
- Et eller flere domener registrert hos en registrar som kan peke ut tjenestene. Compliant Kubernetes utnytter external-dns og cert-manager for å dynamisk håndtere både applikasjoners domenenavn og automatisk sertifikathåndtering, så en registrar som støttes av external-dns er å foretrekke. Siden håndtering av domenenavn ikke innebærer at kunders personinformasjon eksponeres, går det fra et GDPR-synspunkt fint å bli hos sin registrar, så lenge den har et kompatibelt API.

Undersøk hvilken versjon av Kubernetes som kjører i Azure Kubernetes Service (AKS) i dag. For å unngå overraskelser er det viktig å kjøre samme versjon i Compliant Kubernetes.

## Migreringsplan

{{< ingress >}}
Dette avsnittet tar opp trinnene som bør tas før selve migreringen skjer.
{{< /ingress >}}

Kartlegging av systemer som kjører i organisasjonen
Hvert migreringsprosjekt starter med en kartlegging av tjenestene og systemene som kjører i organisasjonen. Selv om det som kjører i Azure Kubernetes Service (AKS) i dag bare er en delmengde, kan det finnes avhengigheter til andre systemer.

Eksempler på systemer som kan skape avhengigheter er:

- {{< inline "Forretningslogikksystem" >}} Denne typen systemer kan noen ganger bli værende lenge, og det kan finnes avhengigheter til dem på alle mulige steder. Kjører disse systemene i Azure i dag, eller kjøres de kanskje in-house eller hos en annen hostingpartner?
- {{< inline "Integrasjonsfunksjoner" >}} Denne typen systemer finnes noen ganger for å løse små, spesifikke oppgaver. De har ofte kommet til for å integrere ett system med et annet. Det kan være verdt å sjekke hvordan denne typen systemer anropes og hvorfra.
- {{< inline "Databaser" >}} Disse brukes ofte av mange systemer, og avhengig av hvor stringent oppdelingen mellom ulike domener har vært, kan databaser anropes fra systemer som egentlig ikke tilhører det systemdomenet der databasen ligger. Ved å gå gjennom databastilkoblinger og logger går det an å få en oppfatning av hvordan databasene brukes i organisasjonen. Om det ikke allerede er gjort, kan konsolidering av databaser være et prosjekt som kjøres før selve migreringen for å forenkle prosessen.
- {{< inline "E-postsystemer" >}} Veldig mange systemer bruker e-post for å kommunisere status eller når noe går galt. Noen av disse e-postene kan til og med leses maskinelt av andre systemer, noe som gjør dem til en lenke i et prosessflyt. Det kan være at disse kontoene er registrert i andre domener enn de for offentlige e-postkontoer. Ved å gå gjennom hvilke domener og kontoer som brukes for denne typen kommunikasjon kan ubehagelige overraskelser unngås.
- {{< inline "Støttefunksjoner" >}} Til systemer i denne kategorien hører DNS (navneoppslag), NTP (tidssynkronisering) og ulike typer service discovery-systemer. Mange av disse kjører sikkert i Azure i dag, men det er viktig å identifisere om de også kjører internt et sted.
- {{< inline "Interne applikasjoner" >}} Alle systemer er kanskje ikke migrert til Azure (kanskje tidregistrering eller internweb). Det kan finnes ulike avhengigheter skjult i disse systemene som er viktige å identifisere.

Kartlegg hvordan sikker kommunikasjon mellom systemene håndteres. Det finnes to typiske valg:

- Virtual Private Networking (VPN), som gjør at all kommunikasjon til og fra Azure og det interne miljøet går gjennom en VPN-tunnel, eller at
- applikasjonene selv har ansvar for sikker kommunikasjon, ved å bruke TLS eller lignende protokoller.

Hvis VPN brukes, må en ny VPN-tunnel settes opp mellom det interne miljøet og Safesprings miljø. Det kan gjøres på forhånd slik at kommunikasjonen er oppe når systemene flyttes over. I migreringsfasen kan også enda en VPN-tunnel måtte settes opp mellom Azure og Safesprings miljø dersom systemene skal kunne flyttes over ett om gangen.

Hvis det andre alternativet brukes, blir det enklere siden det da bare er å peke om kommunikasjonen til Safesprings miljø med en endring av en DNS-post. Det kan være verdt å se på dette alternativet også om VPN-tunnel brukes i dag, siden alle typer migreringer blir enklere hvis applikasjonene håndterer den sikre kommunikasjonen selv.

### Kartlegging av tjenester

Kartlegg avhengigheter for tjenestene som kjører i Azure.

- {{< inline "Identitetshåndtering" >}} Hvordan håndteres identitetshåndtering og rettigheter? Brukes Azure AD, og hvis det brukes, anropes det fra tjenestene som kjører i Azure Kubernetes Service (AKS)? Et steg som kan forenkle senere er å aktivere Secure LDAP (som er en standardisert protokoll) på Azure AD og tilpasse tjenestene slik at de bruker det i stedet. Da vil det gå mye lettere når migreringen ut fra Azure AD skjer.
- {{< inline "Objektlagring" >}} er en praktisk måte å lagre filer som systemer bruker, billig. Hvis objektlagring allerede brukes i form av Azure Blob Storage, kan data migreres til Safespring Storage som er S3-kompatibel. Det vil være behov for tilpasninger for at systemene skal bruke Safesprings tjeneste i stedet. Det kan være verdt å sjekke om systemene er designet slik at det er enkelt å endre URI til objektlagringstjenesten på ett sted med en variabel. Hvis det ikke er tilfelle, kan det være verdt å legge ned litt arbeid i å tilpasse systemene på den måten, da det blir mye enklere å peke om senere. Hvis objektlagring ikke brukes i organisasjonen i dag, kan det være verdt å vurdere å begynne med det, selv om det prosjektet med fordel legges etter migreringen for å minimere frihetsgradene.
- {{< inline "Virtuelle maskiner" >}} Kjører alle systemer i Azure som containere, eller finnes det enkelte systemer som kjører som separate virtuelle maskiner? Hvis ja, er det lurt å undersøke hvordan disse maskinene er satt opp og om det finnes en enkel måte å replikere konfigurasjonen på dem. Det finnes ulike måter å migrere virtuelle maskiner «as is» med snapshots, men det anbefales å sette opp maskinene fra bunnen av hos Safespring for en bedre integrasjon med plattformen.
- {{< inline "Databastjenester" >}} hos Azure. Hvis disse brukes, er det bra å undersøke hvilken variant som kjøres (MySQL, MariaDB, PostgreSQL eller Microsoft SQL). Alle disse variantene kan man kjøre selv på Safesprings infrastruktur. MariaDB og PostgreSQL kan leveres som database som tjeneste gjennom Ck8s-tilbudet. For høy tilgjengelighet er det å anbefale at en form for klynge brukes. For MySQL og MariaDB er det Galera som brukes. PostgreSQL og Microsoft SQL har egne innebygde løsninger.
- {{< inline "Hemmelighetshåndtering" >}} En god måte å fjerne passord og nøkler fra selve systemene er å bruke et sentralt system for hemmelighetshåndtering. Azure Kubernetes Service (AKS) tilbyr i egenskap av å være Kubernetes-basert håndtering av Secrets. Disse kan brukes på samme måte i Compliant Kubernetes. I Azure finnes også den spesifikke tjenesten Key Vault. En motpart til den tjenesten er programvaren Vault fra selskapet Hashicorp. Det må gjøres tilpasninger i tjenestene for å bytte til Hashicorp Vault, og det er viktig å identifisere andre systemer som også bruker denne funksjonaliteten.
- {{< inline "Meldingsbuss" >}} eller meldingskøer. Asynkron kommunikasjon mellom tjenester håndteres ofte ved hjelp av et meldingsbusssystem eller et system for meldingskøer. I Azure finnes tjenesten Service Bus. Safespring tilbyr ikke en tilsvarende tjeneste, men anbefaler at kunder installerer et RabbitMQ-klynge. Dette kan kjøres innenfor Compliant Kubernetes, og RabbitMQ er kompatibelt med Azure Service Bus ved at begge støtter samme API (AMQP 1.0). Dermed bør en migrering være relativt ukomplisert og primært kreve at den nye tjenesten pekes ut i applikasjonenes konfigurasjon. Et moderne alternativ med overlegen ytelse og avansert funksjonalitet er NATS, men det er ikke API-kompatibelt med Azure Service Bus.

### Etablere avhengighetsmatrise

En kontrollert migrering innebærer full kjennskap til hvilke avhengigheter som finnes mellom systemene. Det viser i hvilken rekkefølge systemene migreres og hvilke systemer som er mer sentrale enn andre. Avhengigheter kan noen ganger snike seg inn på uventede steder, så en grundig gjennomgang av hvordan tjenestene hos Azure er konfigurert og hvilke tjenester som brukes i egenutviklede systemer vil lønne seg når det er tid for migrering.

Skjulte avhengigheter finnes vanligvis rundt sentrale systemer, som identitetshåndtering (Azure AD), meldingsbusser og/eller databaser.

Det er også viktig å kartlegge om de egenutviklede systemene har avhengigheter i form av utviklingsbiblioteker. Hvis et bibliotek tilpasset Azure er brukt, må det byttes ut med noe som er agnostisk til den underliggende plattformen. Dette kan skape behov for tilpasninger i selve applikasjonen.

### Tjenester som skal erstattes

Det finnes mange innebygde systemer som har en motpart bygget med åpen kildekode. På side 10 finnes en samling på rundt 20. I dette steget settes også en liste over hvilke tester som skal gjennomføres for å definere hva som er en vellykket migrering.

### Tjenester i Azure som open source

Vi har samlet de vanligste tjenestene hos Azure Kubernetes Service og listet deres motparter som open source. Se hele listen på slutten av denne teksten. Du kan enkelt bla ned ved å klikke på knappen nedenfor.

{{< localbutton text="Se listen" link="#aks-motsvarighet-som-open-source" >}}

### Planlegging og rangering

Etter en gjennomført avhengighetsanalyse kan planleggingen av hvordan systemene skal migreres gjøres. Ofte vil migreringen omfatte en form for vedlikeholdsvindu der tjenestene er nede, så det er viktig å planlegge alt som skal gjøres og i hvilken rekkefølge. Inndata til dette steget kommer også fra test- og kvalitetssikringsfasen.

### Test og kvalitetssikring

Det første som skal testes er selve tjenestene som kjører på den nye plattformen. Når det fungerer, er målbilde klart, og da testes migrering til testmiljø for å få en oppfatning av hvilke steg som trengs for en vellykket migrering.

Deretter skal også lasttester som speiler produksjonslasten i størst mulig grad gjennomføres. Selvsagt gjelder at jo nærmere produksjonslast som oppnås i testene, desto mindre risiko for overraskelser når migreringen først gjennomføres.

## Migrering

{{< ingress >}}
Hvis testene er gjennomført, vil selve migreringen ikke være så vanskelig.
{{< /ingress >}}

Under en migrering kan det dukke opp uventede hendelser som ikke kunne forutses. Typiske ting som kan komme opp er at testdatabasen ikke er identisk med produksjonsdatabasen, noe som kan gi uventede effekter. Andre vanlige problemer er at et annet sett nøkler og hemmeligheter er brukt i produksjon enn i test, som kanskje må oppdateres om tjenestene ikke bruker en sentral hemmelighetshåndterer (f.eks. Hashicorp Vault) fullt ut.

### Lastbalanserer

For å sikre høy tilgjengelighet for produksjonslast må en løsning for lastbalansering settes opp. Safespring kan tilby en løsning der dere får tilgang til to eller flere virtuelle maskiner som kan balansere lasten over spesifikke instanser som kjører i plattformen. Tjenesten som sådan omfatter noen manuelle steg ved oppsett, men er lett å håndtere når den først er i drift. Hvilken programvare som skal brukes for lastbalansering er valgfritt, men de mest populære valgene er HAProxy eller Traefik. Det er også mulig å installere MetalLB, for å få et system som tilbyr en Kubernetes-levert og -kompatibel tjeneste som gir dynamisk lastbalanseringsfunksjonalitet.

### Oppfølging

Etter at migreringen er gjort, gjennomføres testene fra listen som definerer en vellykket migrering. Enhetstester som er laget for å teste systemene før og etter migrering skal kjøres for å sikre at all funksjonalitet fungerer som den skal. I de tilfellene det oppstår avvik, gås de gjennom for å finne ut om noen ytterligere tilpasninger trenger å gjøres før produksjonssetting.

### Dokumentasjon

Dokumentasjon skal føres under hele prosessen, men det trengs også et eget steg for å sammenstille det som er produsert. Foruten dokumentasjon om hvordan ting er satt opp og hvordan systemene interagerer, er det også viktig å få med lærdommer.

## Etter gjennomført migrering

{{< ingress >}}
Drift og overvåking av applikasjonene dine etter migreringen sørger for at du har kontroll etter migreringen
{{< /ingress >}}

### Drift og overvåking

Applikasjoner i Compliant Kubernetes overvåkes på to måter:

1. Måleverdier og overvåkingsdata lagres i Prometheus og visualiseres i Grafana.
2. Applikasjonslogger lagres i et Elasticsearch-klynge og visualiseres og behandles i Kibana.

Disse programvarene nyter stor støtte fra det globale DevOps-miljøet og anses allment som best practice å bruke for disse oppgavene i Kubernetes-sammenheng.

Mange programvarer eksponerer måleverdier i Prometheus-spesifikt format nettopp fordi systemet er så forankret i miljøet. Adaptere finnes for ulike sammenhenger, noe som gjør datainnsamlingen smidig. For eksempel for Java-applikasjoner som eksponerer data via Java Management Extensions (JMX), der data automatisk kan importeres til Prometheus. Grafana tillater systemadministratorer å lage dashboards via Prometheus’ spørrespråk PromQL og dermed få grafisk oversikt over dels infrastrukturens tilstand (for eksempel diskplass, nettverkstrafikk og prosessorbruk), dels nøkkelverdier for applikasjoners ytelse (som antall påloggede brukere eller aktive databasetransaksjoner).

På den måten kan ingeniører holde styr på de «fire gylne signalene» innen overvåking:

- Latens
- Trafikk
- Feil
- Systemenes metningsgrad

Applikasjonslogger hentes fra containerne automatisk og innholdet gjøres søkbart i Kibana via tagget metadata. Dermed kan administratorer raskt avgjøre hvilken node i Compliant Kubernetes-klyngen en bestemt loggutskrift kom fra og gjøre root cause analysis for å feilsøke effektivt. Hvis loggdata konsekvent følger en viss struktur, eller til og med er i et hierarkisk format som JSON, kan denne strukturen gjøres om til egne felt i Elasticsearch og dermed ytterligere forenkle behandling av dataene.

### Continuous Integration and Deployment

For å muliggjøre en agil arbeidsmåte forholder mange organisasjoner seg til systemer som lar dem automatisk bygge, teste og produksjonssette programvare i en Continuous Integration and Deployment (CI/CD)-prosess, gjerne direkte ved innsjekk av kode til et versjonskontrollsystem. Azure tilbyr der Azure DevOps Pipelines som helhetsløsning. Andre populære alternativer er GitLab, CircleCI, ArgoCD, Octopus Deploy, TeamCity og Jenkins, der organisasjoner administrerer minst noen av disse selv.

Siden systemene for å bygge og produksjonssette programvare i en CI/CD-prosess i seg selv typisk ikke er avhengige av brukerens personopplysninger, er det sannsynlig mulig, også under GDPR, å fortsette å bruke de systemene organisasjonen allerede har for dette. Organisasjoner som derfor har prosesser og mye kunnskap innen en viss serie produkter eller tjenester kan tenkes å ville bli værende med disse.

Verken Safespring som sådan eller Compliant Kubernetes dikterer en bestemt CI/CD-løsning, men kan gjøres kompatibel med alle. Av sikkerhetshensyn anbefaler Compliant Kubernetes at byggeartefakter, container-bilder, lagres i containerregisteret som inngår i Compliant Kubernetes.

Som en offisielt CNCF-sertifisert Kubernetes-distribusjon er Compliant Kubernetes fullt kompatibel med alle CI/CD-systemer som har støtte for Kubernetes.

### Policy as Code

Kontinuerlig sikkerhet og etterlevelse via Policy as Code. Compliant Kubernetes er en Kubernetes-distribusjon med stort fokus på sikkerhet. Å sikre sikkerheten i systemer er ikke en engangsforeteelse, men en kontinuerlig pågående prosess. Compliant Kubernetes støtter denne prosessen på følgende måte:

- Sikkerhetsskanning av container-bilder for kjente sårbarheter gjennomføres kontinuerlig av programvaren Trivy som er integrert i containerregisteret Harbor.
- Inntrengingsdeteksjon via Falco, som varsler når programvaren i en container begynner å oppføre seg på ulovlige måter, for eksempel ved å begynne å gjøre nettverkstilkoblinger mot systemer den ellers ikke gjør, eller ved å begynne å skrive eller lese filer som utviklerne ikke har ment.
- Begrensning av nettverkstrafikk via brannmurregler, uttrykt i form av Kubernetes Network Policies. Disse implementeres og håndheves av nettverksprogramvaren Calico.
- Automatisk sertifikathåndtering via cert-manager, noe som gjør at nettverkskrypteringssertifikater kan gis kort levetid og rulleres ofte automatisk.
- Beskyttelse mot ukorrekt konfigurasjon gjennom Open Policy Agent, som fanger opp, inspiserer og kun slipper gjennom slike API-kall mot Kubernetes API-server som oppfyller definerte policy-krav. Et eksempel her er at en policy kan forby konfigurasjon som inneholder kjente standardpassord eller at utviklingssystem kobler seg til produksjonsdatabaser.

Disse aspektene av sikkerhetsprosessen er en konkretisering av organisasjonens policyer. Ved at disse policyene konfigureres via kode som kan versjonskontrolleres og underlegges organisasjonens krav til kodegjennomgang, oppnår organisasjonen enklere krav som stilles for etterlevelse i henhold til for eksempel ISO-27001.

Kontinuerlig skanning etter både kjente sårbarheter og varsling for atferd som indikerer ukjente feil gjør også at risikoen for datainnbrudd reduseres. Og begrensninger i nettverkstrafikk som ikke applikasjonene selv kan modifisere, minsker risikoen for at eventuelle innbrudd får stor effekt.

## Oppsummering

{{< ingress >}}
En migreringsplan inneholder en kartleggingsfase, oppdagelse av avhengigheter, planlegging av arbeidet og tester som sikrer funksjonalitet.
{{< /ingress >}}

I dette dokumentet er stegene en organisasjon trenger å ta oppsummert for å kunne migrere fra Microsoft Azure og Azure Kubernetes Service til Safespring og Compliant Kubernetes med suksess. Motivasjonene for en slik migrering er mange. At svensk og europeisk lovverk gjelder for GDPR-etterlevelse, tilgang på ekspertsupport på svensk og at data ligger trygt i Sverige er noen av dem. Det sterke sikkerhetsfokuset i Compliant Kubernetes er et ytterligere motiv.

En migreringsplan inneholder nødvendigvis en kartleggingsfase, identifisering av avhengigheter og hvordan disse kan byttes ut, planlegging av arbeidet og tester som sikrer funksjonalitet. Deretter kan migreringen settes i gang og verifiseres ved hjelp av de kravstillende testene. Kontinuerlig dokumentasjon og oppfølging gjør at viktige lærdommer ikke går tapt.

Når migreringen først er gjennomført venter systemadministrasjon og overvåking i et nytt miljø. Verktøyene for dette er også presentert i dokumentet og hvordan de sammen gir en helhetsløsning med fokus på sikkerhet og smidige, agile utviklingsprosesser.

## AKS-motstykke som open source

| Tjeneste i Azure                             | Funksjon                                                              | Open source                                                                                                    | Administrert hos Safespring                      |
| -------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Azure Kubernetes Service (AKS)               | Administrert Kubernetes                                               | [Compliant Kubernetes](/services/compliant-kubernetes)                                                         | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| Azure Virtual Machine                        | Virtuelle maskiner der Kubernetes kjører (master- og worker-noder)    | N/A                                                                                                            | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| Azure Blob Storage                           | Objektlagring                                                         | N/A                                                                                                            | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| Azure Mysql, Azure MariaDB, Azure PostgreSQL | Databaser                                                             | Galera-klynge (for MySQL eller MariaDB) med ProxySQL som kjører i Kubernetes eller på separate virtuelle maskiner | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| Azure Service Bus                            | Meldingsfunksjon for kommunikasjon mellom tjenester                   | RabbitMQ eller NATS som kjører i Kubernetes eller på separate virtuelle maskiner                               | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| Azure Monitor                                | Overvåking                                                            | Prometheus + Grafana                                                                                           | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| Azure Monitor                                | Logging                                                               | Elasticsearch                                                                                                  | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| Azure Container Registry                     | Containerregister                                                     | Harbor                                                                                                         | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| N/A                                          | Inntrengingsdeteksjon                                                 | Falco                                                                                                          | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| Azure Active Directory                       | Identitetsleverandør                                                  | Dex                                                                                                            | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| Azure AD Domain Services                     | Håndtering av organisasjonens brukere, ressurser og deres rettigheter | OpenLDAP                                                                                                       | {{< icon "fa-solid fa-dash" "#FA690F" >}}         |
| Azure Key Vault                              | Håndterer hemmeligheter på en sentral og sikker måte                  | Hashicorp Vault                                                                                                | {{< icon "fa-solid fa-dash" "#FA690F" >}}         |
| Azure Cosmos DB (Table API)                  | Key-value store                                                       | TiKV                                                                                                           | {{< icon "fa-solid fa-dash" "#FA690F" >}}         |
| Azure Functions                              | Serverløs kjøremiljø                                                  | OpenFaaS / OpenWhisk                                                                                           | {{< icon "fa-solid fa-dash" "#FA690F" >}}         |
| Azure Virtual Network                        | Privat nettverk                                                       | Calico                                                                                                         | {{< icon "fa-solid fa-dash" "#FA690F" >}}         |
| Azure DevOps Pipelines                       | CI/CD                                                                 | Jenkins, ArgoCD, med flere.                                                                                    | {{< icon "fa-solid fa-dash" "#FA690F" >}}         |