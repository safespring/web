---
ai: true
title: "Migrer fra Azure Kubernetes Service til CK8s hos Safespring"
date: "2020-09-04"
draft: false
author: ""
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_37-2.gif"
intro: "Denne hvitboken oppsummerer de nødvendige trinnene for å migrere fra Azure Kubernetes Service."
sidebarlinkname: ""
Section: "Hvitbok"
sidebarlinkicon: "fa-file-download"
card: "safespring_card_37.jpg"
eventbild: "safespring_background_37.jpg"
socialmediabild: "safespring_social_37-2.gif"
toc: "Innholdsfortegnelse"
language: "nb"
aliases:
  - /en/whitepaper/migrate-from-azure/
---
## Migrering til Compliant Kubernetes

{{< ingress >}}
Denne hvitboken oppsummerer hvilke steg som må tas for å migrere fra Azure Kubernetes Service.
{{< /ingress >}}

Det finnes mange grunner til en slik migrering, blant annet å etterleve svensk og europeisk lovgivning for GDPR-etterlevelse, tilgang til ekspertsupport på svensk, og sikker lagring av data i Sverige. En annen grunn er vektleggingen av sikkerhet i Compliant Kubernetes.

En migrasjonsplan inneholder nødvendig kartleggingsfase, identifisering av avhengigheter og hvordan disse kan erstattes, arbeidsplanlegging samt tester som sikrer funksjonalitet. Migreringen kan deretter starte og verifiseres gjennom de nødvendige testene. Løpende dokumentasjon og oppfølging gjør at alt man lærer underveis blir bevart for fremtiden.

Når migreringen er fullført, venter systemadministrasjon og overvåking i et nytt miljø. Verktøyene for dette presenteres også i dokumentet, som også ser på hvordan de spiller sammen for å gi en helhetlig løsning med vekt på sikkerhet og smidige, agile utviklingsprosesser.

## Bakgrunn

{{< ingress >}}
Skytjenester har revolusjonert hvordan mange virksomheter jobber i dag.
{{< /ingress >}}

Fleksibiliteten ved å ha en tjeneste som lar deg kjøpe funksjoner som tidligere ikke fantes eller var vanskelige å bygge selv, har gjort mange virksomheter mer innovative og forenklet prosessene deres. Samarbeidsfunksjoner og sentralisert håndtering av data og dokumenter har løst problemet med å holde orden på siste versjon av et dokument. Med bare noen få klikk kan IT- og utviklingsavdelinger aktivere nye funksjoner som støtter komplekse eller helt nye prosesser.

De fleste skyplattformene som virksomheter bruker i dag, er amerikanske. Disse aktørene er enormt innovative og er en stor grunn til at organisasjoner jobber på helt nye måter. Problemet ligger i at lovgivningen mellom EU og USA er uforenlig når det gjelder håndtering av personopplysninger. I EU er personvernforordningen (GDPR) og annen informasjonssikkerhetslovgivning forankret i EU-retten, noe som gir individet betydelig kontroll over egne data. I USA er utgangspunktet derimot lovgivning som gir amerikanske myndigheter mulighet til å få innsyn i data som brukere etterlater seg for å ivareta nasjonal sikkerhet.

Disse ulike utgangspunktene skaper en juridisk floke som ikke er helt enkel å løse. For mer informasjon om dette anbefaler vi å lese [Safesprings hvitbok om Schrems II](/knowledge-hub/whitepaper/schrems2/), som forklarer siste utvikling i forbindelse med at Privacy Shield ble opphevet av EU-domstolen. De siste årene har Privacy Shield vært avtalen som amerikanske skytjenester har støttet seg på innen EU.

Det er nå flere selskaper og organisasjoner som har tatt i bruk nye arbeidsmåter forankret i skytjenester, men som mangler et juridisk grunnlag for bruken. Dette er en vanskelig situasjon, siden det ikke er lett å gå tilbake. Samtidig må organisasjoner etterleve loven.

### Muligheten til å bli uavhengig

Det er utviklet rammeverk som fjerner avhengigheter til underliggende skyleverandør. Et slikt rammeverk er Kubernetes, en orkestreringsplattform for containere med standardiserte grensesnitt for utrulling og drift av applikasjoner. Kubernetes skaper en grunnplattform som applikasjoner kan forvaltes på gjennom standardiserte definisjoner. Enklere sagt hjelper Kubernetes organisasjoner med å forvalte applikasjoner og tjenester på en standardisert måte med høy pålitelighet. Siden systemene og deres avhengigheter er definert som kode, er det mulig å utnytte kunnskapen som finnes tilgjengelig på nett og enkelt sette i drift komplekse systemer som kan erstatte tjenester fra etablerte skyleverandører. Dermed blir det enklere å drive selv de tjenestene organisasjonen har blitt avhengig av.

I tillegg finnes det stadig flere applikasjoner som erstatter de mer brukervennlige tjenestene som Office 365, OneDrive eller Dropbox. Hvis en organisasjon bruker Kubernetes til å kjøre applikasjoner og tjenester, blir utrulling og drift av disse applikasjonene mer håndterlig.

Safespring er en skyleverandør med datasentre i Sverige, noe som gjør juridiske konflikter med USA til et ikke-problem. Sammen med vår partner Elastisys har vi utviklet et felles tilbud – Compliant Kubernetes, eller CK8s. Dette er en administrert tjeneste som gir organisasjoner en grunnplattform som frigjør dem fra underliggende skyleverandør. Hvis et selskap allerede bruker Kubernetes hos sin nåværende skyleverandør, er migrasjonen enda enklere siden all koden som beskriver systemene og tjenestene kan gjenbrukes.

Denne hvitboken beskriver migrasjonsprosessen fra Microsoft Azure Kubernetes Service (AKS). Utgangspunktet er at organisasjonen allerede kjører Kubernetes i Azure. Flere av stegene gjelder også for organisasjoner som ikke bruker Azure Kubernetes Service i dag. Forutsatt at Kubernetes fortsatt er lingua franca for drift av containeriserte applikasjoner, er det en klar fordel å kjøre det i egen organisasjon. All innsats som legges i å migrere til en standardisert plattform kan gjenbrukes dersom organisasjonen ønsker å flytte infrastrukturen senere, så lenge målplattformen også er Kubernetes. Dette gir en fleksibilitet og uavhengighet som ellers er vanskelig å oppnå.

### Fordelene med åpen kildekode

En stor grunn til at mange bruker skytjenester, er at de tilbyr nyttige tilleggstjenester som reduserer time-to-market. Selv om disse tjenestene reduserer produksjonstiden, øker de avhengigheten av skyleverandørens økosystem. En måte å redusere produksjonstiden for egne tjenester samtidig som du reduserer leverandøravhengigheten, er å ta i bruk åpne kildekodesystemer for støttefunksjoner utenfor kjerneleveransen. Begge tilnærmingene lar deg fokusere på applikasjonen og sette støttesystemer i bakgrunnen, men åpen kildekode reduserer avhengigheten i stedet for å øke den.

Åpen kildekode bygger på samarbeid. Ved å engasjere deg i prosjektene du bruker (primært ved å sende inn feilrettinger og forbedringer du gjør), blir det du bidrar med gjennomgått for å sikre høyere sikkerhet og pålitelighet. At også andre brukere gjør det samme, sikrer en kontinuerlig oppdatert kodebase, gjennomgått av mange og uten lisenskostnader. Siden mange bruker prosjektene, finnes det også mye kode og flere løsninger er bare noen få søk unna når systemene skal settes i drift og vedlikeholdes.

### Compliant Kubernetes

Compliant Kubernetes er sertifisert av Cloud Native Computing Foundation (CNCF) som en Kubernetes-distribusjon som er fritt tilgjengelig både som åpen kildekode og som en fullt administrert tjeneste hos Safespring. Åpen kildekode-løsningen passer for organisasjoner som ønsker å drifte Kubernetes og tilhørende teknologistakker selv, men som også vil nyte godt av en Kubernetes-distribusjon med forsterket sikkerhet spesielt tilpasset regulerte bransjer, samtidig som de slipper å bekymre seg for vedlikehold og kan dra nytte av kvartalsvise oppdateringer av Kubernetes-pakker og tilhørende prosjekter. Åpen kildekode-alternativet er også et godt supplement til en administrert tjeneste for dem som må levere programvaren sin i egne datasaler, ute hos kunder og i offentlige skyer, og som vil gjøre dette sømløst med full regulatorisk etterlevelse. For interesserte kunder tilbyr vår partner Elastisys både 8/17- og 24/7-støtte.

### Compliant Kubernetes som åpen kildekode

- Kildekode: https://github.com/elastisys/compliantkubernetes
- Dokumentasjon: https://compliantkubernetes.io

### Forutsetninger

For å kunne kjøre applikasjoner i Compliant Kubernetes gjelder følgende forutsetninger:

- Konto for Safespring Compute og eventuelt Safespring Storage hvis objektlagring skal brukes.
- Ett eller flere domener er registrert hos en registrar som kan peke ut tjenestene.

Compliant Kubernetes bruker external-DNS og cert-manager for dynamisk håndtering av applikasjonenes domenenavn samt automatisk sertifikathåndtering, så en registrar som støttes av external-DNS er å foretrekke. Siden håndtering av domenenavn ikke innebærer eksponering av personopplysninger, er det mulig å beholde dagens registrar fra et GDPR-perspektiv, forutsatt at registrar har et kompatibelt API.

Finn ut hvilken versjon av Kubernetes som kjøres i Azure Kubernetes Service (AKS). For å unngå overraskelser er det viktig å kjøre samme versjon i Compliant Kubernetes.

## Migrasjonsplan

{{< ingress >}}
Dette avsnittet dekker stegene som bør tas før selve migreringen gjennomføres.
{{< /ingress >}}

Kartlegging av systemer som kjører i organisasjonen
Hvert migrasjonsprosjekt starter med en kartlegging av tjenestene og systemene som kjøres i organisasjonen. Selv om det som kjører i Azure Kubernetes Service (AKS) kun er et delsett, kan det finnes avhengigheter til andre systemer. Eksempler på systemer som kan skape avhengigheter:

- {{< inline "Systemer for forretningslogikk" >}} Denne typen systemer kan bli værende lenge, og det kan derfor finnes avhengigheter til dem mange steder. Kjører disse systemene i Azure i dag, eller kjører de kun internt eller hos en annen driftsleverandør?
- {{< inline "Integrasjonsfunksjoner" >}} Denne typen systemer finnes noen ganger for å løse små, spesifikke oppgaver. De legges ofte til for å integrere ett system med et annet. Det kan være verdt å sjekke hvordan denne typen systemer kalles og hvorfra.
- {{< inline "Databaser" >}} Disse brukes ofte av mange systemer, og avhengig av hvor strengt domenene er delt, kan databaser kalles fra systemer som ikke tilhører systemdomenet der databasen ligger. Ved å gå gjennom databaseforbindelser og logger får du et bilde av hvordan databasene brukes i organisasjonen. Hvis det ikke allerede er gjort, kan konsolidering av databaser være et prosjekt som kjøres før selve migreringen for å forenkle prosessen.
- {{< inline "E-postsystemer" >}} Svært mange systemer bruker e-post for å kommunisere statuser eller ved feil. Noen av disse e-postene kan til og med leses maskinelt av andre systemer, og er dermed et ledd i en prosessflyt. Det kan være at disse kontoene er registrert på andre domener enn offentlige e-postkontoer. Ved å gå gjennom domenene og kontoene som brukes til denne typen kommunikasjon, kan stygge overraskelser unngås.
- {{< inline "Støttefunksjoner" >}} Systemer i denne kategorien omfatter DNS (navneoppslag), NTP (tidssynkronisering) og ulike typer tjenesteoppdagelsessystemer. Selv om mange av disse trygt kjøres i Azure i dag, er det viktig å identifisere om de også kjøres internt et sted.
- {{< inline "Interne applikasjoner" >}} Ikke alle systemer er nødvendigvis migrert til Azure (kanskje tidrapportering eller intern web). Det kan være skjulte avhengigheter i disse systemene som er viktige å identifisere.

Gjør en kartlegging av hvordan sikker kommunikasjon mellom systemene håndteres. Det finnes to typiske valg:

- Virtual Private Networking (VPN), som lar all kommunikasjon til og fra Azure og det interne miljøet gå gjennom en VPN-tunnel, eller
- Applikasjonene håndterer sikker kommunikasjon selv ved å bruke TLS eller tilsvarende protokoller.

Hvis det brukes VPN, må en ny VPN-tunnel settes opp mellom det interne miljøet og Safesprings miljø. Dette kan gjøres på forhånd slik at kommunikasjonen er oppe når systemene flyttes over. I migrasjonsfasen kan det også være behov for en ekstra VPN-tunnel mellom Azure og Safesprings miljø dersom systemene må flyttes én og én.

Det blir enklere hvis det andre alternativet brukes, siden det da bare handler om å peke kommunikasjonen til Safesprings miljø via endring av en DNS-post. Det kan være verdt å vurdere dette alternativet selv om det i dag brukes VPN-tunnel, siden alle typer migreringer blir enklere hvis applikasjonene selv håndterer sikker kommunikasjon.

### Kartlegging av tjenester som kjører i Azure

Gjør en kartlegging av avhengigheter for tjenestene som kjører i Azure.

- {{< inline "Identitetsforvaltning" >}} Hvordan håndteres identiteter og rettigheter? Brukes Azure AD? Hvis ja, kalles det fra tjenestene som kjører i Azure Kubernetes Service (AKS)? Et steg som kan gjøre det enklere senere, er å aktivere Secure LDAP (en standardisert protokoll) på Azure AD og tilpasse tjenestene til å bruke dette i stedet. Dette gjør migrasjon fra Azure AD mye enklere når tiden kommer.
- {{< inline "Objektlagring" >}} er en praktisk måte å lagre filer som brukes av systemer rimelig på. Hvis objektlagring allerede brukes i form av Azure Blob Storage, kan data migreres til Safespring Storage, som er S3-kompatibel. Det kan være behov for justeringer for at systemene skal bruke Safesprings tjeneste i stedet. Sjekk om systemene er designet slik at URI for objektlagring kan endres enkelt på ett sted med én variabel. Hvis ikke, kan det være verdt å bruke litt tid på å tilpasse systemene slik at det blir langt enklere å peke dem om senere. Hvis objektlagring ikke brukes i organisasjonen i dag, kan det være verdt å vurdere å begynne, selv om et slikt prosjekt legges etter migrasjonen for å minimere kompleksiteten.
- {{< inline "Virtuelle maskiner" >}} Kjører alle systemer i Azure som containere, eller finnes det noen som kjøres som separate virtuelle maskiner? I så fall er det lurt å se på hvordan disse maskinene er satt opp og om det finnes en enkel måte å replikere konfigurasjonen på. Selv om det finnes ulike måter å migrere virtuelle maskiner «as is» med snapshots, anbefales det å sette opp maskinene hos Safespring fra grunnen av for å sikre bedre integrasjon med plattformen.
- {{< inline "Databasetjenester" >}} med Azure. Hvis disse brukes, er det lurt å se på hvilken variant som kjører (MySQL, MariaDB, PostgreSQL eller Microsoft SQL). Alle disse kan kjøres selv på Safesprings infrastruktur. MariaDB og PostgreSQL kan fås som database som en tjeneste gjennom Ck8s-tilbudet. For å sikre høy tilgjengelighet anbefales det å bruke en form for klynge. Galera brukes for MySQL og MariaDB. PostgreSQL og Microsoft SQL har innebygde løsninger.
- {{< inline "Håndtering av hemmeligheter" >}} En god måte å fjerne passord og nøkler fra systemene selv på, er å bruke et sentralt system for håndtering av hemmeligheter. Siden Azure Kubernetes Service (AKS) er Kubernetes-basert, tilbyr det håndtering av Secrets. Disse kan brukes på samme måte i Compliant Kubernetes. Azure har også en egen Key Vault-tjeneste. En tilsvarende tjeneste er Vault fra selskapet Hashicorp. Tjenestene må justeres for å bytte til Hashicorp Vault, og det er viktig å identifisere andre systemer som også bruker denne funksjonaliteten.
- {{< inline "Meldingsbuss" >}} eller meldingskøer. Asynkron kommunikasjon mellom tjenester håndteres ofte ved hjelp av et meldingsbuss- eller meldingskøsystem. Azure har tjenesten Service Bus. Selv om Safespring ikke tilbyr en tilsvarende tjeneste, anbefaler vi at kunder installerer en RabbitMQ-klynge. Denne kan kjøres innenfor Compliant Kubernetes, og RabbitMQ er kompatibel med Azure Service Bus siden begge støtter samme API (AMQP 1.0). Migrasjonen bør derfor være relativt ukomplisert og primært kreve at den nye tjenesten angis i applikasjonskonfigurasjonen. Et moderne alternativ med overlegen ytelse og avansert funksjonalitet er NATS, men den er ikke API-kompatibel med Azure Service Bus.

### Etabler en avhengighetsmatrise

En kontrollert migrering krever full oversikt over avhengighetene som finnes mellom systemene. Den viser rekkefølgen systemene skal migreres i, og hvilke systemer som er mer sentrale enn andre. Avhengigheter kan noen ganger snike seg inn på uventede steder, så en grundig gjennomgang av hvordan Azures tjenester er konfigurert og hvilke tjenester som brukes i egne systemer, vil lønne seg når det er tid for migrering.

Skjulte avhengigheter finnes vanligvis rundt sentrale systemer, som identitetsforvaltning (Azure AD), meldingsbusser og/eller databaser.

I tillegg er det viktig å kartlegge egne systemer og om de har avhengigheter i form av utviklingsbiblioteker. Hvis det er brukt et bibliotek tilpasset Azure, må det erstattes med noe som er agnostisk til underliggende plattform. Dette kan medføre tilpasninger i selve applikasjonen.

### Tjenester i Azure som åpen kildekode

Mange innebygde tjenester har en tilsvarende variant bygget med åpen kildekode. Det finnes en liste på rundt 20 på side 10. I dette steget utarbeides en liste over testene som skal utføres for å definere hva som er en vellykket migrering.

{{< localbutton text="Se listen" link="#aks-counterparts-as-open-source" >}}

### Planlegging og prioritering

Når avhengighetsanalysen er fullført, kan migreringen av systemene planlegges. Migrering vil ofte innebære en form for vedlikeholdsvindu der tjenestene er nede, så det er viktig å planlegge alt som skal gjøres og i hvilken rekkefølge. Input til dette steget kommer også fra test- og kvalitetssikringsfasen.

### Testing og kvalitetssikring

Det første som testes er tjenestene som kjører på den nye plattformen. Når dette fungerer, er målbildet klart, og migrering til testmiljøet prøves ut for å få et inntrykk av hvilke steg som trengs for en vellykket migrering.

Deretter må lasttester som reflekterer produksjonslasten også gjennomføres så langt det lar seg gjøre. Jo nærmere testlasten er produksjonslasten, desto mindre er risikoen for overraskelser når migreringen skjer.

## Migrering

{{< ingress >}}
Hvis testene er gjennomført, blir selve migreringen ikke særlig vanskelig.
{{< /ingress >}}

Under migreringen kan det oppstå uventede hendelser som ikke kunne forutses. Dette inkluderer typisk en testdatabase som ikke er identisk med produksjonsdatabasen, noe som kan gi uventede effekter. Andre vanlige problemer inkluderer nøkler og hemmeligheter som er satt opp forskjellig i produksjon enn i test, og som må oppdateres hvis tjenestene ikke fullt ut bruker sentral håndtering av hemmeligheter (f.eks. Hashicorp Vault).

### Implementering av lastbalanserer

For å sikre høy tilgjengelighet for produksjonslaster må det settes opp en løsning for lastbalansering. Safespring kan tilby en løsning der du får tilgang til to eller flere virtuelle maskiner som kan balansere lasten over spesifikke instanser som kjører på plattformen. Selv om tjenesten i seg selv innebærer noen manuelle steg ved oppsett, er den enkel å administrere når den er i drift. Det finnes flere valg av programvare for lastbalansering, men de mest populære er HAProxy eller Traefik. Du kan også installere MetalLB for å få et system som tilbyr en Kubernetes-levert og kompatibel tjeneste som gir dynamisk lastbalanseringsfunksjonalitet.

### Oppfølging

Når migreringen er fullført, utføres tester fra listen som definerer en vellykket migrering. Enhetstester opprettet for å teste systemene før og etter migreringen må kjøres for å sikre at all funksjonalitet fungerer som den skal. Eventuelle avvik gjennomgås for å finne ut om ytterligere justeringer trengs før produksjonssetting.

### Dokumentasjon

Selv om dokumentasjon må holdes ved like gjennom hele prosessen, trengs et eget steg for å sammenstille dokumentasjonen som er produsert. I tillegg til dokumentasjon om hvordan ting er satt opp og hvordan systemene samhandler, er det viktig å ta vare på læringspunkter.

## Når migreringen er fullført

{{< ingress >}}
Drift og overvåking av applikasjonene dine etter migrasjon sikrer at du har kontroll etter flyttingen.
{{< /ingress >}}

### Drift og overvåking

Applikasjoner i Compliant Kubernetes overvåkes på to måter:

1. Metrikker og overvåkingsdata lagres i Prometheus og visualiseres i Grafana.
2. Applikasjonslogger lagres i en Elasticsearch-klynge og visualiseres og behandles i Kibana.
   Disse programmene har bred støtte i det globale DevOps-miljøet, og det anses som beste praksis å bruke dem til disse oppgavene i Kubernetes-kontekst.

Mange programmer eksponerer metrikker i et Prometheus-spesifikt format nettopp fordi systemet er så utbredt i miljøet. Det finnes adaptere for ulike kontekster som sikrer smidig datainnsamling, som for Java-applikasjoner som eksponerer data via Java Management Extensions (JMX), hvor data kan importeres automatisk til Prometheus. Grafana lar systemadministratorer lage dashboards via Prometheus’ spørrespråk, PromQL, og dermed få en grafisk oversikt over tilstanden til infrastrukturen (f.eks. diskplass, nettverkstrafikk og prosessorbruk), samt nøkkelverdier for applikasjonsytelse (f.eks. antall påloggede brukere eller aktive databasetransaksjoner).

På denne måten kan ingeniører holde styr på de fire gylne signalene i overvåking:

- Latens
- Trafikk
- Feil
- Systemmetning

Applikasjonslogger hentes automatisk fra containerne og innholdet gjøres søkbart i Kibana ved hjelp av tagget metadata. Dette lar administratorer raskt avgjøre hvilken node i Compliant Kubernetes-klyngen et gitt loggutdrag kom fra og gjennomføre rotårsaksanalyse for effektiv feilsøking. Hvis loggdataene konsekvent følger en bestemt struktur, eller om de er i et hierarkisk format som JSON, kan denne strukturen gjøres til regulære felt i Elasticsearch og dermed ytterligere forenkle bearbeidingen av dataene.

### Kontinuerlig integrasjon og utrulling

For å muliggjøre en agil arbeidsform, er det mange organisasjoner som baserer seg på systemer som lar dem bygge, teste og rulle ut programvare automatisk i en CI/CD-prosess, gjerne direkte ved innsjekk av kode i et versjonskontrollsystem. Azure tilbyr Azure DevOps Pipelines som en komplett løsning. Andre populære alternativer er Gitlab, CircleCI, ArgoCD, Octopus Deploy, TeamCity og Jenkins, hvor organisasjoner administrerer minst noen av disse selv.

Siden systemene for bygging og utrulling av programvare i en CI/CD-prosess typisk ikke er avhengige av brukernes data, er det sannsynlig at de, også under GDPR, vil fortsette å bruke systemene organisasjonen allerede har til dette. Organisasjoner som derfor har prosesser og mye kompetanse innenfor en bestemt produktserie eller tjeneste, vil gjerne holde fast ved disse.

Verken Safespring som sådan eller Compliant Kubernetes dikterer en spesifikk CI/CD-løsning, men kan gjøres kompatibel med alle. Av sikkerhetsgrunner anbefaler Compliant Kubernetes at byggeartefakter – containerbilder – lagres i containerbilderegisteret som følger med i Compliant Kubernetes.

Som en offisiell CNCF-sertifisert Kubernetes-distribusjon er Compliant Kubernetes fullt kompatibel med alle CI/CD-systemer som støtter Kubernetes.

### Policy som kode

Kontinuerlig sikkerhet og etterlevelse via Policy som kode. Compliant Kubernetes er en Kubernetes-distribusjon med vekt på sikkerhet. Å sikre systemer er ikke en engangshendelse, men en kontinuerlig prosess. Compliant Kubernetes støtter denne prosessen slik:

- {{< inline "Sikkerhetsskanning" >}} av containerbilder for kjente feil utføres kontinuerlig av Trivy, som er integrert med containerbilderegisteret Harbor.
- {{< inline "Innbruddsdeteksjon" >}} via Falco varsler når programvaren i en container begynner å oppføre seg uautorisert, for eksempel ved å forsøke å etablere nettverkstilkoblinger til systemer den ellers ikke kobler til, eller ved å begynne å skrive eller lese filer som utviklerne ikke hadde til hensikt.
- {{< inline "Begrensning av nettverkstrafikk" >}} via brannmurregler uttrykkes som Kubernetes Network Policies. Disse implementeres og håndheves av nettverksprogramvaren Calico.
- {{< inline "Automatisk sertifikathåndtering" >}} via cert-manager betyr at sertifikater for nettverkskryptering kan ha kort levetid og roteres ofte og automatisk.
- {{< inline "Beskyttelse mot feilkonfigurasjon" >}} med Open Policy Agent: denne fanger opp og inspiserer API-kall til Kubernetes API-serveren og slipper kun gjennom dem som oppfyller definerte policykrav. Et eksempel er at en policy kan forby konfigurasjon som inneholder kjente standardpassord, eller at utviklingssystemer kobler seg til produksjonsdatabaser.

Disse aspektene ved sikkerhetsprosessen er en konkretisering av organisasjonens retningslinjer. Siden disse retningslinjene konfigureres via kode som kan versjonskontrolleres og underlegges organisasjonens krav til kodegjennomgang, kan organisasjonen enklere oppfylle krav til regulatorisk etterlevelse, for eksempel ISO 27001.

Kontinuerlig skanning for både kjente feil og varsler om atferd som indikerer ukjente feil, reduserer også risikoen for databrudd. Samtidig reduserer begrensninger i nettverkstrafikk, som applikasjonene selv ikke kan endre, risikoen for at eventuelle innbrudd får stor effekt.

## Sammendrag

{{< ingress >}}
En migrasjonsplan inneholder en kartleggingsfase, identifisering av avhengigheter, arbeidsplanlegging og tester som sikrer funksjonalitet.
{{< /ingress >}}

Dette dokumentet oppsummerer stegene en organisasjon må ta for å lykkes med å migrere fra Microsoft Azure og Azure Kubernetes Service til Safespring og Compliant Kubernetes. Det finnes mange grunner til en slik migrering, blant annet å etterleve svensk og europeisk lovgivning for GDPR-etterlevelse, tilgang til ekspertsupport på svensk, og sikker lagring av data i Sverige. En annen grunn er vektleggingen av sikkerhet i Compliant Kubernetes.

En migrasjonsplan inneholder nødvendig kartleggingsfase, identifisering av avhengigheter og hvordan disse kan erstattes, arbeidsplanlegging samt tester som sikrer funksjonalitet. Migreringen kan deretter starte og verifiseres gjennom de nødvendige testene. Løpende dokumentasjon og oppfølging gjør at alt man lærer underveis blir bevart for fremtiden.

Når migreringen er fullført, venter systemadministrasjon og overvåking i et nytt miljø. Verktøyene for dette presenteres også i dokumentet, som også ser på hvordan de spiller sammen for å gi en helhetlig løsning med vekt på sikkerhet og smidige, agile utviklingsprosesser.

## AKS counterparts as Open Source

{{< en-aks-alternatives >}}