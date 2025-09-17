---
ai: true
title: "Migrér fra Azure Kubernetes Service til CK8s hos Safespring"
date: "2020-09-04"
draft: false
tags: ["Svenska"]
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_37.gif"
intro: "Dette dokument sammenfatter de trin, der bør tages for at migrere fra Azure Kubernetes Service."
sidebarlinkname: "Læs som PDF"
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: "/publications/safespring-migrering-fran-microsoft-azure-kubernetes-service-2021.pdf"
card: "safespring-azure.svg"
sidebarimage: "safespring-azure.svg"
toc: "Indhold"
background: "safespring-azure.png"
socialmediabild: ""
language: "da"
section: "Løsningsoversigt"
aliases:
  - /solution-brief/migrate-from-azure/
---
## Migrering til Compliant Kubernetes

{{< ingress >}}
Dette dokument sammenfatter de skridt, der bør tages for at migrere fra Azure Kubernetes Service.
{{< /ingress >}}

Motivationen for en sådan migrering er mange. At svensk og europæisk lovgivning gælder for GDPR-overholdelse, adgang til ekspertsupport på svensk og at data ligger trygt i Sverige, er nogle af dem. Det stærke sikkerhedsfokus i Compliant Kubernetes er endnu et.

En migrationsplan indeholder nødvendigvis en kortlægningsfase, identifikation af afhængigheder og hvordan disse kan udskiftes, planlægning af arbejdet samt tests, der sikrer funktionalitet. Derefter kan migreringen igangsættes og verificeres ved hjælp af de tests, der definerer kravene. Løbende dokumentation og opfølgning sikrer, at vigtige læringer ikke går tabt.

Når migreringen er gennemført, venter systemadministration og overvågning i et nyt miljø. Værktøjerne hertil er også præsenteret i dokumentet, samt hvordan de tilsammen giver en helhedsløsning med fokus på sikkerhed og smidige agile udviklingsprocesser.

## Baggrund

{{< ingress >}}
Cloudtjenester har revolutioneret måden, mange virksomheder arbejder på i dag.
{{< /ingress >}}

Fleksibiliteten ved som tjeneste at kunne købe funktioner, der tidligere ikke fandtes eller var svære at bygge selv, har givet mange virksomheder ny innovationskraft og forenklet processer. Samarbejdsfunktioner og centraliseret håndtering af data og dokumenter har løst problematikken omkring, hvilken der er den seneste version af et dokument. IT- og udviklingsafdelinger kan med få klik slå nye funktioner til, som understøtter komplekse eller helt nye processer.

Størstedelen af de cloudplatforme, virksomheder bruger i dag, er amerikanske. Disse aktører er vokset til store giganter med enorm innovationskraft og er en stor grund til, at vi i dag arbejder på helt nye måder i organisationer. Problemet er, at lovgivningen i EU og USA ikke er kompatibel, når det kommer til håndtering af persondata. I EU bygger GDPR (Databeskyttelsesforordningen) og andre love inden for informationssikkerhed på EU’s grundlag, som giver individet stor kontrol over sine data. I USA er udgangspunktet derimod love, der giver amerikanske myndigheder store muligheder for at infiltrere de data, brugerne afgiver, for at opretholde nationens sikkerhed.

De forskellige udgangspunkter skaber et sammenstød, som juridisk ikke er let at rede ud. For mere information om emnet anbefales [Safesprings white paper om Schrems II](/schrems), som beskriver den seneste udvikling i forbindelse med EU-Domstolens ugyldiggørelse af Privacy Shield, der i de seneste år har været den aftale, som brugen af amerikanske cloudtjenester i EU har hvilet på.

Tilbage står nu en række virksomheder og organisationer, som med et fundament af cloudtjenester har anlagt en ny måde at arbejde på, uden lovligt grundlag for at bruge dem. Det er en svær situation, da det ikke er enkelt at gå tilbage, samtidig med at organisationer skal følge loven.

### Mulighed for at blive uafhængig

Rammeværker er udviklet, som fjerner afhængigheden af den underliggende cloudleverandør. Et sådant rammeværk er Kubernetes, som er en orkestreringsplatform for containerteknologi med standardiserede grænseflader for, hvordan applikationer kan idriftsættes og vedligeholdes. Kubernetes skaber et grundlag, oven på hvilket applikationer kan håndteres via standardiserede definitioner. Hvis det lyder teknisk, kan det sammenfattes som, at Kubernetes hjælper organisationer med på en standardiseret måde at håndtere applikationer og tjenester med høj driftssikkerhed. Fordi systemerne og deres afhængigheder er defineret med kode, kan man trække på den viden, der findes på internettet, og nemt tage komplekse systemer i drift, som kan erstatte de tjenester, der findes hos de etablerede cloudleverandører. Det er altså enklere at drive de tjenester selv, som organisationen er blevet afhængig af.

Der kommer også flere og flere applikationer, som erstatter de mere bruger­nære tjenester såsom Office 365, OneDrive eller Dropbox. Hvis organisationen bruger Kubernetes til at køre sine applikationer og tjenester, bliver idriftsættelse og vedligehold af disse applikationer håndterbart.

Safespring er en cloudleverandør med datacentre i Sverige, hvilket gør juridiske sammenstød med amerikanske love til et ikke-problem. Sammen med vores partner Elastisys har vi udarbejdet et fælles tilbud, Compliant Kubernetes eller Ck8s. Det er en fuldt administreret tjeneste, der giver organisationer det grundlag, som muliggør frigørelse fra den underliggende cloudleverandør. Hvis en virksomhed i sin nuværende cloud allerede bruger Kubernetes, bliver migreringen enklere, da al koden, der beskriver systemerne og tjenesterne, der kører, kan genbruges.

Dette white paper beskriver, hvordan en migrering fra Microsoft Azure Kubernetes Service (AKS) ser ud. Udgangspunktet er, at organisationen allerede kører Kubernetes i Azure. Flere af trinene er også anvendelige for organisationer, der ikke bruger Azure Kubernetes Service i dag. Med udgangspunkt i, at Kubernetes fortsat er lingua franca for drift af containeriserede applikationer, er fordelene ved at køre det i organisationen indlysende. Alt det arbejde, der lægges i at migrere til en standardiseret platform, kan genbruges, hvis organisationen vil flytte sin infrastruktur et andet sted hen, eftersom de samme infrastrukturelle definitioner kan anvendes, så længe modtagerplatformen også er Kubernetes. Det skaber en fleksibilitet og uafhængighed, som ellers er svær at opnå.

### Fordelene ved open source

En stor grund til, at mange bruger cloudtjenester, er, at der findes nyttige ekstratjenester, som reducerer time-to-market. Lige så meget som disse tjenester reducerer produktionstiden, øges dog afhængigheden af cloudleverandørernes økosystem. En alternativ måde at reducere produktionstiden for sine tjenester, samtidig med at man mindsker leverandørafhængighed, er at implementere systemer uden for ens kerneleverance med open source. Begge tilgange lader dig fokusere på din applikation og lade støttesystemer træde i baggrunden, mens open source-tilgangen mindsker afhængigheden i stedet for at øge den.

Open source bygger på samarbejde, og ved at engagere sig i de projekter, man anvender (primært ved at poste de fejlrettelser og forbedringer, man laver), bliver det, man bidrager med, gransket for større tryghed og sikkerhed. At andre, som bruger projekterne, gør det samme, skaber en kontinuerligt opdateret kodebase, gransket af mange, uden licensomkostninger. Fordi mange bruger projekterne, findes der også meget færdig kode og løsninger til at idriftsætte og vedligeholde systemerne blot få søgninger væk.

### Compliant Kubernetes

Compliant Kubernetes (CK8s) er en CNCF (Cloud Native Computing Foundation) certificeret Kubernetes-distribution, som er frit tilgængelig både som open source og som en fuldt administreret tjeneste hos Safespring. Open source-løsningen passer til organisationer, der gerne drifter Kubernetes og den omkringliggende teknologistak selv, men vil drage fordel af en sikkerhedshærdet Kubernetes-distribution, der er specielt tilpasset regulerede brancher, samtidig med at de slipper for vedligehold og kan basere sig på kvartalsvise opdateringer af paketeringen af Kubernetes og relaterede projekter. Open source-varianten er også et godt supplement til en administreret tjeneste for dem, der skal levere deres software i en kombination af egne serverrum, ude hos kunder og i offentlige skyer, og vil gøre det på en sømløs måde med fuld regelefterlevelse. For kunder, der ønsker det, tilbyder vores partner Elastisys både 8/17- og 24/7-support.

### CK8s som open source

- [Kildekode](https://github.com/elastisys/compliantkubernetes)
- [Dokumentation](https://compliantkubernetes.io)

### Forudsætninger

For at kunne køre applikationer i Compliant Kubernetes gælder følgende forudsætninger:

- Konto til Safespring Compute og eventuelt Safespring Storage, hvis objektlagring skal bruges.
- Et eller flere domæner registreret hos en registrar, som kan pege på tjenesterne. Compliant Kubernetes udnytter external-dns og cert-manager til dynamisk at håndtere både applikationers domænenavne og automatisk certifikathåndtering, så en registrar, der understøttes af external-dns, er at foretrække. Da håndtering af domænenavne ikke indebærer, at kunders personoplysninger eksponeres, er det ud fra GDPR synspunkt muligt at blive hos sin registrar, så længe den har et kompatibelt API.

Undersøg, hvilken version af Kubernetes der kører i Azure Kubernetes Service (AKS) i dag. For at undgå overraskelser er det vigtigt at køre samme version i Compliant Kubernetes.

## Migrationsplan

{{< ingress >}}
Dette afsnit gennemgår de skridt, der bør tages, før selve migreringen finder sted.
{{< /ingress >}}

Kortlægning af systemer, der kører i organisationen
Hvert migrationsprojekt starter med en kortlægning af de tjenester og systemer, der kører i organisationen. Selv hvis det, der kører i Azure Kubernetes Service (AKS) i dag, kun er en delmængde, kan der være afhængigheder til andre systemer.

Eksempler på systemer, som kan skabe afhængigheder, er:

- {{< inline "Forretningslogiksystemer" >}} Denne type system kan nogle gange hænge ved længe, og derfor kan der findes afhængigheder til dem alle mulige steder. Kører disse systemer i Azure i dag, eller kører de ligefrem in-house eller hos en anden hostingpartner?
- {{< inline "Integrationsfunktioner" >}} Denne type system findes nogle gange for at løse små, specifikke opgaver. De er ofte opstået for at integrere et system med et andet. Det kan være værd at undersøge, hvordan denne type system kaldes, og hvorfra.
- {{< inline "Databaser" >}} Disse bruges ofte af mange systemer, og afhængigt af hvor stringent opdelingen mellem forskellige domæner har været, kan databaser tiltales fra systemer, som egentlig ikke tilhører det systemdomæne, hvor databasen ligger. Ved at gennemgå databaseforbindelser og logge kan man få en forståelse af, hvordan databaserne bruges i organisationen. Hvis det ikke allerede er gjort, kan konsolidering af databaser være et projekt, der køres, før selve migreringen for at forenkle processen.
- {{< inline "Mailsystemer" >}} Rigtig mange systemer bruger mail til at kommunikere status eller fejl. Nogle af disse mails kan endda læses maskinelt af andre systemer, hvilket gør dem til et led i et procesflow. Det kan være, at disse konti er registreret i andre domæner end de offentlige mailkonti. Ved at gennemgå, hvilke domæner og konti der bruges til denne type kommunikation, kan ubehagelige overraskelser undgås.
- {{< inline "Støttefunktioner" >}} Til systemer i denne kategori hører DNS (navneopslag), NTP (tidsynkronisering) og forskellige typer service discovery-systemer. Mange af disse kører sikkert i Azure i dag, men det er vigtigt at identificere, om de også kører internt et sted.
- {{< inline "Interne applikationer" >}} Ikke alle systemer er måske migreret til Azure (måske tidsregistrering eller intern web). Der kan findes forskellige afhængigheder skjult i disse systemer, som er vigtige at identificere.

Kortlæg, hvordan sikker kommunikation mellem systemerne håndteres. Der er to typiske valg:

- Virtual Private Networking (VPN), som gør, at al kommunikation til og fra Azure og det interne miljø går gennem en VPN-tunnel, eller at
- applikationerne selv har ansvar for sikker kommunikation ved at bruge TLS eller lignende protokoller.

Hvis VPN bruges, skal der opsættes en ny VPN-tunnel mellem det interne miljø og Safesprings miljø. Det kan gøres på forhånd, så kommunikationen er oppe, når systemerne flyttes over. I migrationsfasen kan der også være behov for at opsætte endnu en VPN-tunnel mellem Azure og Safesprings miljø, hvis systemerne skal kunne flyttes over én ad gangen.

Hvis det andet alternativ bruges, bliver det enklere, da det så blot er at pege kommunikationen om til Safesprings miljø med en ændring af en DNS-post. Det kan være værd at se på dette alternativ, selv hvis der bruges VPN i dag, da alle typer migreringer bliver enklere, hvis applikationerne selv håndterer den sikre kommunikation.

### Kortlægning af tjenester

Kortlæg afhængigheder for de tjenester, der kører i Azure.

- {{< inline "Identitetshåndtering" >}} Hvordan håndteres identitet og rettigheder? Bruges Azure AD, og hvis det bruges, kaldes det så fra tjenesterne, der kører i Azure Kubernetes Service (AKS)? Et skridt, som kan forenkle senere, er at aktivere Secure LDAP (som er en standardiseret protokol) på Azure AD og tilpasse tjenesterne, så de bruger det i stedet. Så bliver det meget lettere, når migreringen væk fra Azure AD sker.
- {{< inline "Objektlagring" >}} er en praktisk måde at lagre filer, som systemer bruger, billigt. Hvis objektlagring allerede bruges i form af Azure Blob Storage, kan data migreres til Safespring Storage, som er S3-kompatibel. Der vil skulle laves tilpasninger, for at systemerne bruger Safesprings tjeneste i stedet. Det kan være værd at undersøge, om systemerne er designet, så det er enkelt at ændre URI til objektlagringstjenesten ét sted via en variabel. Hvis ikke, kan det være værd at bruge lidt arbejde på at gøre systemerne sådan, da det bliver meget enklere at pege om senere. Hvis objektlagring ikke bruges i organisationen i dag, kan det være værd at overveje at begynde at gøre det, selv om det projekt med fordel lægges efter migreringen for at minimere frihedsgraderne.
- {{< inline "Virtuelle maskiner" >}} Kører alle systemer i Azure som containere, eller findes der visse systemer, der kører som separate virtuelle maskiner? Hvis ja, er det godt at undersøge, hvordan disse maskiner er sat op, og om der findes en enkel måde at replikere deres konfiguration på. Der findes forskellige måder at migrere virtuelle maskiner “as is” med snapshots, men det anbefales at sætte maskinerne op fra bunden hos Safespring for en bedre integration med platformen.
- {{< inline "Databastjenester" >}} hos Azure. Hvis disse bruges, er det godt at undersøge, hvilken variant der kører (MySQL, MariaDB eller PostgreSQL eller Microsoft SQL). Alle disse varianter kan man køre selv på Safesprings infrastruktur. MariaDB og PostgreSQL kan fås som database som tjeneste via Ck8s-tilbuddet. For høj tilgængelighed anbefales det at bruge en form for klynge. For MySQL og MariaDB er det Galera, der bruges. PostgreSQL og Microsoft SQL har egne indbyggede løsninger.
- {{< inline "Hemmelighedshåndtering" >}} En god måde at fjerne adgangskoder og nøgler fra selve systemerne er at bruge et centralt system til hemmelighedshåndtering. Azure Kubernetes Service (AKS) tilbyder i egenskab af at være Kubernetes-baseret håndtering af Secrets. Disse kan bruges på samme måde i Compliant Kubernetes. I Azure findes også den specifikke tjeneste Key Vault. En modstykke til den tjeneste er softwaren Vault fra virksomheden HashiCorp. Der skal laves tilpasninger i tjenesterne for at skifte til HashiCorp Vault, og det er vigtigt at identificere andre systemer, der også bruger denne funktionalitet.
- {{< inline "Meddelelsesbus" >}} eller meddelelseskøer. Asynkron kommunikation mellem tjenester håndteres ofte via et meddelelsesbussystem eller et system til meddelelseskøer. I Azure findes tjenesten Service Bus. Safespring tilbyder ikke en tilsvarende tjeneste, men anbefaler, at kunder installerer et RabbitMQ-klynge. Dette kan køre i Compliant Kubernetes, og RabbitMQ er kompatibelt med Azure Service Bus, idet begge understøtter samme API (AMQP 1.0). Dermed bør en migrering være relativt ukompliceret og primært kræve, at den nye tjeneste peges ud i applikationernes konfiguration. Et moderne alternativ med overlegen performance og avanceret funktionalitet er NATS, men det er ikke API-kompatibelt med Azure Service Bus.

### Etabler afhængighedsmatrix

En kontrolleret migrering indebærer fuldt kendskab til, hvilke afhængigheder der findes mellem systemerne. Det viser, i hvilken rækkefølge systemerne migreres, og hvilke systemer der er mere centrale end andre. Afhængigheder kan nogle gange snige sig ind uventede steder, så en grundig gennemgang af, hvordan tjenesterne hos Azure er konfigureret, og hvilke tjenester der bruges i egenudviklede systemer, vil betale sig, når det er tid til at migrere.

Skjulte afhængigheder findes typisk omkring centrale systemer såsom identitetshåndtering (Azure AD), meddelelsesbusser og/eller databaser.

Det er også vigtigt at kortlægge, om de egenudviklede systemer har afhængigheder i form af udviklingsbiblioteker. Hvis et bibliotek tilpasset Azure er blevet brugt, skal det udskiftes til noget, der er agnostisk i forhold til den underliggende platform. Dette kan skabe behov for tilpasninger i selve applikationen.

### Tjenester, der skal erstattes

Der findes mange indbyggede systemer, som har en modstykke bygget med open source. På side 10 findes en samling af cirka 20. I dette trin fastlægges også en liste over, hvilke tests der skal gennemføres for at definere, hvad der er en vellykket migrering.

### Tjenester i Azure som open source

Vi har samlet de mest almindelige tjenester hos Azure Kubernetes Service og listet deres modstykker som open source. Se hele listen i slutningen af denne tekst. Du kan nemt rulle ned ved at klikke på knappen nedenfor.

{{< localbutton text="Se listen" link="#aks-motsvarighet-som-open-source" >}}

### Planlægning og prioritering

Efter en gennemført afhængighedsanalyse kan planlægning af, hvordan systemerne skal migreres, udføres. Ofte vil migreringen omfatte en form for servicevindue, hvor tjenesterne er nede, så det er vigtigt at planlægge alt, der skal gøres, og i hvilken rækkefølge. Input til dette trin kommer også fra test- og kvalitetssikringsfasen.

### Test og kvalitetssikring

Det første, der skal testes, er selve tjenesterne, som kører på den nye platform. Når det fungerer, er mål­billedet klart, og så testes migrering til testmiljøet for at få en fornemmelse af, hvilke trin der er nødvendige for en vellykket migrering.

Derefter skal der også laves belastningstests, som i videst muligt omfang afspejler produktionsbelastningen. Selvfølgelig gælder det, at jo tættere man kommer på produktionsbelastningen i testene, desto mindre risiko for overraskelser, når migreringen gennemføres.

## Migrering

{{< ingress >}}
Hvis testene er gennemført, vil selve migreringen ikke være så svær.
{{< /ingress >}}

Under en migrering kan der dukke uventede hændelser op, som ikke har kunnet forudses. Typiske ting, der kan opstå, er, at testdatabasen ikke er identisk med produktionsdatabasen, hvilket kan give uventede effekter. Andre almindelige problemer er, at et andet sæt nøgler og hemmeligheder er brugt i produktion end i test, som måske skal opdateres, hvis tjenesterne ikke bruger en central hemmelighedshåndtering (fx HashiCorp Vault) fuldt ud.

### Lastbalancere

For at sikre høj tilgængelighed for produktionslast skal der opsættes en løsning for lastbalancere. Safespring kan levere en løsning, hvor I får adgang til to eller flere virtuelle maskiner, som kan balancere lasten over specifikke instanser, der kører på platformen. Tjenesten som sådan indebærer nogle manuelle trin ved opsætning, men er let at håndtere, når den først er i drift. Hvilken software der skal bruges som lastbalancer, er valgfrit, men de mest populære valg er HAProxy eller Traefik. Det er også muligt at installere MetalLB for at få et system, der tilbyder en Kubernetes-leveret og -kompatibel tjeneste, som giver dynamisk lastbalanceringsfunktionalitet.

### Opfølgning

Efter at migreringen er gennemført, udføres testene fra listen, som definerer en vellykket migrering. Enhedstests, som er oprettet for at teste systemerne før og efter migrering, skal køres for at sikre, at al funktionalitet fungerer, som den skal. I de tilfælde, hvor der opstår afvigelser, gennemgås de for at afgøre, om yderligere tilpasninger er nødvendige, før idriftsættelse.

### Dokumentation

Dokumentation skal føres gennem hele processen, men der er også behov for et separat trin for at sammenfatte det, der er produceret. Ud over dokumentation om, hvordan ting er sat op, og hvordan systemerne interagerer, er det også vigtigt at få lærte erfaringer med.

## Efter gennemført migrering

{{< ingress >}}
Drift og overvågning af dine applikationer efter migreringen sikrer, at du har kontrol efter migreringen
{{< /ingress >}}

### Drift og overvågning

Applikationer i Compliant Kubernetes overvåges på to måder:

1. Måledata og monitoreringsdata gemmes i Prometheus og visualiseres i Grafana.
2. Applikationers logge gemmes i en Elasticsearch-klynge og visualiseres og behandles i Kibana.

Disse softwareprodukter nyder stor støtte fra det globale DevOps-community og betragtes generelt som best practice til disse opgaver i Kubernetes-sammenhæng.

Mange programmer eksponerer måledata i Prometheus-specifikt format netop fordi systemet er så forankret i communityet. Adapters findes til forskellige sammenhænge, hvilket gør dataindsamlingen smidig. Eksempelvis for Java-applikationer, der eksponerer data via Java Management Extensions (JMX), hvor data automatisk kan importeres til Prometheus. Grafana tillader systemadministratorer at oprette dashboards via Prometheus’ forespørgselssprog PromQL og dermed få grafisk overblik over dels infrastrukturens tilstand (eksempelvis diskplads, netværkstrafik og processorforbrug), dels nøgletal for applikationers performance (som antal loggede brugere eller aktive databasetransaktioner).

På den måde kan ingeniører holde styr på de “fire gyldne signaler” inden for overvågning:

- Latens
- Trafik
- Fejl
- Systemernes mætning

Applikationslogge hentes automatisk ud af containerne, og deres indhold gøres søgbart i Kibana via tagget metadata. Dermed kan administratorer hurtigt afgøre, hvilken node i Compliant Kubernetes-klyngen en bestemt logudskrift kom fra, og udføre root cause analysis for effektiv fejlsøgning. Hvis logdata konsekvent følger en bestemt struktur, eller endda er i et hierarkisk format såsom JSON, kan denne struktur omdannes til egentlige felter i Elasticsearch og dermed yderligere forenkle behandling af data.

### Continuous Integration and Deployment

For at muliggøre en agil arbejdsform baserer mange organisationer sig på systemer, der lader dem automatisk bygge, teste og idriftsætte software i en Continuous Integration and Deployment (CI/CD)-proces, gerne direkte ved check-in af kode til et versionsstyringssystem. Azure tilbyder her Azure DevOps Pipelines som helhedsløsning. Andre populære alternativer er GitLab, CircleCI, ArgoCD, Octopus Deploy, TeamCity og Jenkins, hvor organisationer administrerer i det mindste nogle af disse selv.

Da systemerne til at bygge og idriftsætte software i en CI/CD-proces i sig selv typisk ikke er afhængige af brugerens personoplysninger, er det sandsynligt muligt, også under GDPR, at fortsætte med at bruge de systemer, organisationen allerede har. Organisationer, der derfor har processer og meget viden inden for en bestemt serie produkter eller tjenester, kan derfor tænkes at ville blive ved disse.

Hverken Safespring som sådan eller Compliant Kubernetes dikterer en bestemt CI/CD-løsning, men kan gøres kompatibel med alle. Af sikkerhedsmæssige årsager anbefaler Compliant Kubernetes, at build-artefakterne, container images, gemmes i det container image-register, som indgår i Compliant Kubernetes.

I egenskab af at være en officielt af CNCF certificeret Kubernetes-distribution er Compliant Kubernetes fuldt kompatibel med alle CI/CD-systemer, der understøtter Kubernetes.

### Policy as Code

Kontinuerlig sikkerhed og regelefterlevelse via Policy as Code. Compliant Kubernetes er en Kubernetes-distribution med stort fokus på sikkerhed. At sikre systemers sikkerhed er ikke en engangsbegivenhed, men en kontinuerlig proces. Compliant Kubernetes understøtter denne proces på følgende måde:

- Sikkerhedsscanning af container images for kendte sårbarheder gennemføres kontinuerligt af softwaren Trivy, som er integreret i container image-registret Harbor.
- Indtrængningsdetektion via Falco, som advarer, når software i en container begynder at opføre sig på ikke-tilladte måder, eksempelvis ved at begynde at forsøge netværksforbindelser til systemer, den ellers ikke gør, eller ved at begynde at skrive eller læse filer, som udviklerne ikke har tilsigtet.
- Begrænsning af netværkstrafik via firewall-regler, udtrykt som Kubernetes Network Policies. Disse implementeres og håndhæves af netværkssoftwaren Calico.
- Automatisk certifikathåndtering via cert-manager, hvilket gør, at krypteringscertifikater kan gives kort levetid og roteres ofte automatisk.
- Beskyttelse mod ukorrekt konfiguration via Open Policy Agent, som opfanger, inspicerer og kun slipper sådanne API-kald mod Kubernetes API-serveren igennem, der opfylder definerede policy-krav. Et eksempel her er, at en policy kan forbyde konfiguration, der indeholder kendte standardadgangskoder, eller at udviklingssystemer forbinder til produktionsdatabaser.

Disse aspekter af sikkerhedsprocessen er en konkretisering af organisationens politikker. Idet disse policies konfigureres via kode, som kan versionsstyres og underlægges organisationens krav om kodegennemgang, opfylder organisationen lettere krav til regelefterlevelse, eksempelvis i henhold til ISO-27001.

Kontinuerlig scanning efter både kendte sårbarheder og advarsler for adfærd, der indikerer ukendte fejl, reducerer også risikoen for databrud. Og begrænsninger i netværkstrafik, som applikationerne ikke selv kan modificere, reducerer risikoen for, at eventuelle indbrud får stor effekt.

## Sammenfatning

{{< ingress >}}
En migrationsplan indeholder en kortlægningsfase, opdagelse af afhængigheder, planlægning af arbejdet og tests, der sikrer funktionalitet.
{{< /ingress >}}

I dette dokument er de skridt, en organisation skal tage, sammenfattet for at kunne migrere succesfuldt fra Microsoft Azure og Azure Kubernetes Service til Safespring og Compliant Kubernetes. Motivationen for en sådan migrering er mange. At svensk og europæisk lovgivning gælder for GDPR-overholdelse, adgang til ekspertsupport på svensk og at data ligger trygt i Sverige, er nogle af disse. Det stærke sikkerhedsfokus i Compliant Kubernetes er endnu et.

En migrationsplan indeholder nødvendigvis en kortlægningsfase, identifikation af afhængigheder og hvordan disse kan udskiftes, planlægning af arbejdet samt tests, der sikrer funktionalitet. Derefter kan migreringen igangsættes og verificeres ved hjælp af de tests, der definerer kravene. Løbende dokumentation og opfølgning sikrer, at vigtige læringer ikke går tabt.

Når migreringen er gennemført, venter systemadministration og overvågning i et nyt miljø. Værktøjerne hertil er også præsenteret i dokumentet, samt hvordan de tilsammen giver en helhedsløsning med fokus på sikkerhed og smidige agile udviklingsprocesser.

## AKS motsvarighet som Open source

| Tjeneste i Azure                            | Funktion                                                             | Open Source                                                                                                    | Managed hos Safespring                           |
| ------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Azure Kubernetes Service (AKS)              | Managed Kubernetes                                                   | [Compliant Kubernetes](/services/compliant-kubernetes)                                                         | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| Azure Virtual Machine                       | Virtuelle maskiner, hvor Kubernetes kører (master- og worker-noder)  | N/A                                                                                                            | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| Azure Blob Storage                          | Objektlagring                                                        | N/A                                                                                                            | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| Azure Mysql, Azure MariaDB, Azure PostgreSQL| Databaser                                                            | Galera-klynge (for MySQL eller MariaDB) med ProxySQL, som kører i Kubernetes eller på separate virtuelle maskiner | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| Azure Service Bus                           | Beskedtjeneste til kommunikation mellem tjenester                    | RabbitMQ eller NATS, som kører i Kubernetes eller på separate virtuelle maskiner                               | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| Azure Monitor                               | Overvågning                                                          | Prometheus + Grafana                                                                                           | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| Azure Monitor                               | Logning                                                              | Elasticsearch                                                                                                  | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| Azure Container Registry                    | Containerregister                                                    | Harbor                                                                                                         | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| N/A                                         | Indtrængningsdetektion                                               | Falco                                                                                                          | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| Azure Active Directory                      | Identitetsudbyder                                                    | Dex                                                                                                            | {{< icon "fa-solid fa-circle-check" "#32CD32" >}} |
| Azure AD Domain Services                    | Håndtering af organisationens brugere, ressourcer og deres rettigheder| OpenLDAP                                                                                                       | {{< icon "fa-solid fa-dash" "#FA690F" >}}         |
| Azure Key Vault                             | Central og sikker håndtering af hemmeligheder                        | Hashicorp Vault                                                                                                | {{< icon "fa-solid fa-dash" "#FA690F" >}}         |
| Azure Cosmos DB (Table API)                 | Key-value store                                                      | TiKV                                                                                                           | {{< icon "fa-solid fa-dash" "#FA690F" >}}         |
| Azure Functions                             | Serverless runtime                                                   | OpenFaaS / OpenWhisk                                                                                           | {{< icon "fa-solid fa-dash" "#FA690F" >}}         |
| Azure Virtual Network                       | Privat netværk                                                       | Calico                                                                                                         | {{< icon "fa-solid fa-dash" "#FA690F" >}}         |
| Azure DevOps Pipelines                      | CI/CD                                                                | Jenkins, ArgoCD, m.fl.                                                                                         | {{< icon "fa-solid fa-dash" "#FA690F" >}}         |