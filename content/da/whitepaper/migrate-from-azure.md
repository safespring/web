---
ai: true
title: "Migrér fra Azure Kubernetes Service til CK8s hos Safespring"
date: "2020-09-04"
draft: false
author: ""
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_37-2.gif"
intro: "Denne hvidbog sammenfatter de trin, du skal tage for at migrere fra Azure Kubernetes Service."
sidebarlinkname: ""
Section: "Hvidbog"
sidebarlinkicon: "fa-file-download"
card: "safespring_card_37.jpg"
eventbild: "safespring_background_37.jpg"
socialmediabild: "safespring_social_37-2.gif"
toc: "Indholdsfortegnelse"
language: "da"
aliases:
  - /en/whitepaper/migrate-from-azure/
---
## Migrering til Compliant Kubernetes

{{< ingress >}}
Dette whitepaper opsummerer de trin, der skal tages for at migrere fra Azure Kubernetes Service.
{{< /ingress >}}

Der er mange grunde til en sådan migrering, herunder overholdelse af svensk og europæisk lovgivning for GDPR-compliance, adgang til ekspertsupport på svensk samt sikker lagring af data i Sverige. En anden grund er fokus på sikkerhed i Compliant Kubernetes.

En migrationsplan indeholder den nødvendige inventariseringsfase, identificering af afhængigheder og hvordan disse kan erstattes, planlægning af arbejdet samt tests, der sikrer funktionalitet. Herefter kan migreringen påbegyndes og verificeres via de nødvendige tests. Løbende dokumentation og opfølgning betyder, at alt, hvad der læres undervejs, bevares til fremtidig reference.

Når migreringen er gennemført, venter systemadministration og overvågning i et nyt miljø. Værktøjerne hertil præsenteres også i dokumentet, som desuden belyser, hvordan de spiller sammen for at levere en samlet løsning med fokus på sikkerhed og smidige, agile udviklingsprocesser.

## Baggrund

{{< ingress >}}
Cloud-tjenester har revolutioneret måden, mange virksomheder arbejder på.
{{< /ingress >}}

Fleksibiliteten ved at have en tjeneste, hvor man kan købe funktioner, der tidligere ikke fandtes eller var svære at bygge selv, har gjort mange virksomheder mere innovative og forenklet deres processer. Samarbejdsfunktioner og centraliseret håndtering af data og dokumenter har løst udfordringen med at holde styr på den seneste version af et dokument. Med blot få klik kan IT- og udviklingsafdelinger slå nye funktioner til, som understøtter komplekse eller helt nye processer.

De fleste cloudplatforme, som virksomheder bruger i dag, er amerikanske. Disse aktører er enormt innovative giganter og en stor årsag til, at organisationer i dag arbejder på helt nye måder. Problemet er, at lovgivningen mellem EU og USA er uforenelig, når det gælder håndtering af persondata. I EU er databeskyttelsesforordningen (GDPR) og andre informationssikkerhedslove baseret på EU’s forfatningsret, som giver individer betydelig kontrol over deres data. I USA er udgangspunktet derimod lovgivning, som giver amerikanske myndigheder mulighed for at infiltrere de data, brugerne efterlader, for at varetage den nationale sikkerhed.

Disse forskellige udgangspunkter skaber en juridisk knast, der ikke er helt let at løse. For mere information om emnet anbefaler vi at læse [Safesprings whitepaper om Schrems II](/knowledge-hub/whitepaper/schrems2/), som forklarer de seneste udviklinger i forbindelse med EU-Domstolens annullering af Privacy Shield. I de seneste år har Privacy Shield været den aftale, som amerikanske cloudtjenester har baseret sig på i EU.

Flere virksomheder og organisationer har i dag indført nye arbejdsformer, der er forankret i cloudtjenester, men der mangler et juridisk grundlag for deres brug. Det er en svær situation, da det ikke er let at gå tilbage. Samtidig skal organisationer overholde loven.

### Muligheden for at blive uafhængig

Der er udviklet rammeværk, som fjerner afhængigheder af den underliggende cloududbyder. Et sådant rammeværk er Kubernetes, som er en orkestreringsplatform for containerteknologi med standardiserede grænseflader til idriftsættelse og vedligeholdelse af applikationer. Kubernetes skaber et grundlag, hvor applikationer kan administreres via standardiserede definitioner. Mindre teknisk sagt hjælper Kubernetes organisationer med at administrere deres applikationer og tjenester på en standardiseret måde med høj driftssikkerhed. Fordi systemerne og deres afhængigheder er defineret i kode, er det muligt at udnytte den viden, der findes online, og nemt idriftsætte komplekse systemer som erstatning for etablerede cloududbyderes tjenester. Dermed bliver det lettere selv at drive de tjenester, som organisationen er blevet afhængig af.

Der kommer desuden flere og flere applikationer, som erstatter de mere brugervenlige tjenester som Office 365, OneDrive eller Dropbox. Hvis en organisation bruger Kubernetes til at køre sine applikationer og tjenester, bliver idriftsættelsen og vedligeholdelsen af disse applikationer mere håndterbar.

Safespring er en cloududbyder med datacentre i Sverige, hvilket gør juridiske konflikter med USA irrelevante. Sammen med vores partner Elastisys har vi udviklet et fælles tilbud – Compliant Kubernetes, eller CK8s. Det er en managed service, som giver organisationer et grundlag, der frigør dem fra den underliggende cloududbyder. Hvis en virksomhed allerede bruger Kubernetes hos sin nuværende cloududbyder, er migrering endnu lettere, da al koden, der beskriver de kørende systemer og tjenester, kan genbruges.

Dette whitepaper beskriver migrationsprocessen fra Microsoft Azure Kubernetes Service (AKS). Udgangspunktet er, at organisationen allerede kører Kubernetes i Azure. Flere af trinnene gælder også for organisationer, der ikke bruger Azure Kubernetes Service i dag. Forudsat at Kubernetes fortsat er lingua franca for drift af containeriserede applikationer, er der en oplagt fordel ved at køre det i organisationen. Alt det arbejde, der lægges i at migrere til en standardiseret platform, kan genbruges, hvis organisationen senere vil flytte sin infrastruktur, da de samme infrastrukturdefinitioner kan anvendes, så længe modtagerplatformen også er Kubernetes. Dette skaber en grad af fleksibilitet og uafhængighed, som ellers er svær at opnå.

### Fordelene ved åben kildekode

En stor grund til, at mange bruger cloudtjenester, er, at de tilbyder nyttige ekstratjenester, der reducerer time-to-market. Selvom disse tjenester korter produktionstiden, øger de afhængigheden af cloududbydernes økosystemer. En måde at reducere produktionstiden for dine tjenester og samtidig mindske leverandørafhængigheden er at implementere systemer med åben kildekode uden for din kerneleverance. Begge tilgange lader dig fokusere på din applikation og sætte støtte­systemer i baggrunden, men tilgangen med åben kildekode reducerer afhængigheden i stedet for at øge den.

Åben kildekode bygger på samarbejde. Ved at engagere dig i de projekter, du bruger (primært ved at bidrage tilbage med fejlrettelser og forbedringer), bliver det, du bidrager med, gennemgået for at sikre større sikkerhed og pålidelighed. At andre brugere gør det samme, sikrer en kontinuerligt opdateret kodebase, gennemgået af mange og uden licensomkostninger. Fordi mange bruger projekterne, er der også meget kode og flere løsninger kun få søgninger væk ved idriftsættelse og vedligeholdelse af systemerne.

### Compliant Kubernetes

Compliant Kubernetes er certificeret af Cloud Native Computing Foundation (CNCF) som en Kubernetes-distribution, der er frit tilgængelig både som åben kildekode og som en fuldt managed service hos Safespring. Open source-løsningen er velegnet til organisationer, der gerne selv driver Kubernetes og de omkringliggende teknologistakke, men som også vil drage fordel af en Kubernetes-distribution med forhøjet sikkerhed, særligt tilpasset regulerede industrier, uden at skulle bekymre sig om vedligeholdelse og med mulighed for at udnytte kvartalsvise opdateringer af Kubernetes-pakker og tilhørende projekter. Open source-varianten er også et godt supplement til en managed service for dem, der skal levere deres software via egne serverrum, ude hos deres kunder og i public clouds – og som vil gøre det sømløst med fuld efterlevelse af regulativer. For interesserede kunder leverer vores partner Elastisys både 8/17- og 24/7-support.

### Compliant Kubernetes som åben kildekode

- Kildekode: https://github.com/elastisys/compliantkubernetes
- Dokumentation: https://compliantkubernetes.io

### Forudsætninger

For at kunne køre applikationer i Compliant Kubernetes gælder følgende:

- Konto til Safespring Compute og eventuelt Safespring Storage, hvis objektlager skal bruges.
- Et eller flere domæner er registreret hos en registrar, der kan pege på tjenesterne.

Compliant Kubernetes bruger external-DNS og cert-manager til dynamisk at håndtere applikationernes domænenavne samt automatisk certifikat­håndtering, så en registrar understøttet af external-DNS er at foretrække. Da håndtering af domænenavne ikke indebærer eksponering af persondata, er det muligt at forblive hos din registrar ud fra et GDPR-perspektiv, forudsat at registrarens API er kompatibelt.

Find ud af, hvilken version af Kubernetes der i øjeblikket kører i Azure Kubernetes Service (AKS). For at undgå ubehagelige overraskelser er det vigtigt at køre samme version i Compliant Kubernetes.

## Migrationsplan

{{< ingress >}}
Dette afsnit dækker de skridt, der bør tages, før selve migreringen finder sted.
{{< /ingress >}}

Inventar over systemer, der kører i organisationen
Hvert migrationsprojekt starter med en kortlægning af de tjenester og systemer, der drives i organisationen. Selvom det der kører i Azure Kubernetes Service (AKS) kun er et udsnit, kan der være afhængigheder til andre systemer. Eksempler på systemer, der kan skabe afhængigheder, er:

- {{< inline "Forretningslogiksystemer" >}} Denne type system kan nogle gange leve længe, og der kan derfor være afhængigheder til dem mange steder. Kører disse systemer i Azure, eller kører de udelukkende internt eller hos en anden driftsleverandør?
- {{< inline "Integrationsfunktioner" >}} Denne type system findes nogle gange for at løse små, specifikke opgaver. De tilføjes ofte for at integrere ét system med et andet. Det kan være værd at undersøge, hvordan denne type system kaldes – og hvorfra.
- {{< inline "Databaser" >}} Disse bruges ofte af mange systemer, og afhængigt af hvor stringent opdelingen er mellem domæner, kan databaser blive kaldt fra systemer, der ikke hører til det domæne, hvor databasen er placeret. Ved at gennemgå databaseforbindelser og logs kan du få et billede af, hvordan databaserne bruges i organisationen. Hvis det ikke allerede er gjort, kan databasekonsolidering være et projekt, der gennemføres før selve migreringen for at forenkle processen.
- {{< inline "E-mailsystemer" >}} Rigtig mange systemer bruger e-mail til at kommunikere status eller fejl. Nogle af disse e-mails kan endda læses maskinelt af andre systemer og indgår som et led i en proces. Det kan være, at disse konti er registreret i andre domæner end dem til offentlige e-mailkonti. Ved at gennemgå domæner og konti, der bruges til denne type kommunikation, kan ubehagelige overraskelser undgås.
- {{< inline "Støttefunktioner" >}} Systemer i denne kategori omfatter DNS (navneopslag), NTP (tids­synkronisering) og forskellige typer service discovery-systemer. Selvom mange af disse i dag kører trygt i Azure, er det vigtigt at identificere, om de også kører internt et sted.
- {{< inline "Interne applikationer" >}} Ikke alle systemer er nødvendigvis migreret til Azure (måske tidsregistrering eller intranet). Der kan gemme sig forskellige afhængigheder i disse systemer, som er vigtige at identificere.

Lav en inventar over, hvor sikkert kommunikationen mellem systemer håndteres. Der er typisk to valg:

- Virtual Private Networking (VPN), hvor al kommunikation til og fra Azure og det interne miljø går gennem en VPN-tunnel, eller
- Applikationerne håndterer selv sikker kommunikation ved at bruge TLS eller lignende protokoller.

Hvis der bruges VPN, skal der etableres en ny VPN-tunnel mellem det interne miljø og Safesprings miljø. Dette kan gøres på forhånd, så kommunikationen er oppe, når systemerne flyttes over. I migrationsfasen kan der også være behov for en ekstra VPN-tunnel mellem Azure og Safesprings miljø, hvis systemerne skal flyttes enkeltvis.

Det bliver lettere, hvis den anden løsning anvendes, da det blot handler om at omdirigere kommunikationen til Safesprings miljø ved at ændre en DNS-post. Det kan være værd at overveje denne løsning, selvom der i dag bruges en VPN-tunnel, da alle typer migreringer bliver enklere, hvis applikationerne selv håndterer sikker kommunikation.

### Inventar over tjenester, der kører i Azure

Lav en inventar over afhængigheder for de tjenester, der kører i Azure.

- {{< inline "Identitetshåndtering" >}} Hvordan håndteres identiteter og rettigheder? Bruges Azure AD? Hvis ja, kaldes det fra tjenester, der kører i Azure Kubernetes Service (AKS)? Et skridt, som kan gøre tingene lettere senere, er at aktivere Secure LDAP (en standardiseret protokol) på Azure AD og tilpasse tjenesterne til at bruge dette i stedet. Det vil gøre migrering væk fra Azure AD meget enklere, når tiden kommer.
- {{< inline "Objektlager" >}} er en praktisk måde billigt at lagre filer, som systemer bruger. Hvis objektlager allerede anvendes i form af Azure Blob Storage, kan data migreres til Safespring Storage, som er S3-kompatibelt. Der kan være behov for justeringer, for at systemerne bruger Safesprings tjeneste i stedet. Det kan betale sig at tjekke, om systemerne er designet, så man nemt kan ændre objektlagerets URI ét sted via en variabel. Hvis ikke, kan det være tid givet godt ud at sikre, at systemerne tilpasses, så det bliver meget lettere at pege dem om senere. Hvis objektlager ikke bruges i dag, kan det overvejes at begynde at bruge det – eventuelt som et projekt efter migreringen for at minimere kompleksiteten.
- {{< inline "Virtuelle maskiner" >}} Kører alle systemer i Azure som containere, eller er der nogle, der kører som separate virtuelle maskiner? Hvis ja, er det en god idé at se på, hvordan disse maskiner er sat op, og om der er en enkel måde at replikere deres konfiguration på. Selvom der findes måder at migrere virtuelle maskiner “as is” med snapshots, anbefales det at sætte maskinerne op på ny hos Safespring for at sikre bedre integration med platformen.
- {{< inline "Databasetjenester" >}} hos Azure. Hvis disse bruges, er det en god idé at se, hvilken variant der kører (MySQL, MariaDB, PostgreSQL eller Microsoft SQL). Du kan køre alle disse selv på Safesprings infrastruktur. MariaDB og PostgreSQL kan fås som database-som-tjeneste via CK8s-tilbuddet. For at sikre høj tilgængelighed anbefales en form for klynge. Galera bruges til MySQL og MariaDB. PostgreSQL og Microsoft SQL har indbyggede løsninger.
- {{< inline "Håndtering af hemmeligheder" >}} En god måde at fjerne adgangskoder og nøgler fra systemerne selv er at bruge et centralt system til håndtering af hemmeligheder. Azure Kubernetes Service (AKS) tilbyder via Kubernetes håndtering af Secrets. Disse kan bruges på samme måde i Compliant Kubernetes. Azure har også en specifik Key Vault-tjeneste. En tilsvarende tjeneste er Vault-softwaren fra virksomheden Hashicorp. Tjenesterne skal justeres for at skifte til Hashicorp Vault, og det er vigtigt at identificere andre systemer, der også bruger denne funktionalitet.
- {{< inline "Message bus" >}} eller køsystemer. Asynkron kommunikation mellem tjenester håndteres ofte via et message bus- eller køsystem. Azure har Service Bus-tjenesten. Selvom Safespring ikke tilbyder en tilsvarende tjeneste, anbefaler vi, at kunder installerer et RabbitMQ-klynge. Dette kan køre i Compliant Kubernetes, og RabbitMQ er kompatibel med Azure Service Bus, da begge understøtter samme API (AMQP 1.0). Migrering bør derfor være relativt ukompliceret og primært kræve, at den nye tjeneste angives i applikationskonfigurationen. Et moderne alternativ med overlegen ydeevne og avanceret funktionalitet er NATS, men det er ikke API-kompatibelt med Azure Service Bus.

### Etabler en afhængighedsmatrix

En kontrolleret migrering kræver fuld indsigt i de afhængigheder, der findes mellem systemerne. Den viser rækkefølgen, systemerne migreres i, og hvilke systemer der er mere centrale end andre. Afhængigheder kan nogle gange snige sig ind uventede steder, så en grundig gennemgang af, hvordan Azures tjenester er konfigureret, og hvilke tjenester der bruges i proprietære systemer, betaler sig, når det er tid til at migrere.

Skjulte afhængigheder findes typisk omkring centrale systemer som identitetshåndtering (Azure AD), message busser og/eller databaser.

Derudover er det vigtigt at lave en inventar over egne systemer, og om de har afhængigheder i form af udviklingsbiblioteker. Hvis der er brugt et Azure-tilpasset bibliotek, skal det erstattes af noget, der er agnostisk i forhold til den underliggende platform. Det kan give anledning til tilpasninger i selve applikationen.

### Tjenester i Azure som åben kildekode

Mange indbyggede tjenester har en ækvivalent bygget med åben kildekode. Der er en liste på omkring 20 på side 10. I dette trin udarbejdes en liste over tests, der skal udføres, for at definere, hvad en succesfuld migrering er.

{{< localbutton text="Se listen" link="#aks-counterparts-as-open-source" >}}

### Planlægning og prioritering

Når afhængighedsanalysen er gennemført, kan migreringen af systemerne planlægges. Migrering vil ofte inkludere en form for servicevindue, hvor tjenesterne er nede, så det er vigtigt at planlægge, hvad der skal gøres, og i hvilken rækkefølge. Input til dette trin kommer også fra test- og sikringsfasen.

### Test og kvalitetssikring

Det første, der skal testes, er de tjenester, der kører på den nye platform. Når dette fungerer, er mål­billedet klar, og migrering til testmiljøet prøves for at få et billede af, hvilke skridt der er nødvendige for en succesfuld migrering.

Herefter skal der også udføres loadtests, der så vidt muligt afspejler produktionsbelastningen. Jo tættere testbelastningen er på produktionsbelastningen, desto mindre er risikoen for overraskelser, når migreringen gennemføres.

## Migrering

{{< ingress >}}
Hvis testene er udført, bliver selve migreringen ikke for vanskelig.
{{< /ingress >}}

Under migreringen kan der opstå uforudsete hændelser, der ikke kunne forudses. Det kan typisk være en testdatabase, der ikke er identisk med produktionsdatabasen, hvilket kan have uventede effekter. Andre almindelige problemer inkluderer nøgler og secrets, der er sat op anderledes i produktion end i test, og som skal opdateres, hvis tjenesterne ikke fuldt ud bruger central håndtering af hemmeligheder (fx Hashicorp Vault).

### Implementering af load balancer

For at sikre høj tilgængelighed for produktionsbelastninger skal der sættes en løsning for load balancere op. Safespring kan levere en løsning, hvor du får adgang til to eller flere virtuelle maskiner, som kan balancere belastningen over specifikke instanser, der kører på platformen. Selvom tjenesten som sådan inkluderer nogle manuelle trin i opsætningen, er den let at administrere, når den er i drift. Der er flere load balancer-programmer at vælge imellem, men de mest populære er HAProxy og Traefik. Du kan også installere MetalLB for at få et system, der tilbyder en Kubernetes-leveret og kompatibel tjeneste med dynamisk load balancing-funktionalitet.

### Opfølgning

Når migreringen er færdig, udføres tests fra listen, der definerer en succesfuld migrering. Enhedstests, der er oprettet til at teste systemerne før og efter migrering, skal køres for at sikre, at al funktionalitet fungerer korrekt. Eventuelle afvigelser gennemgås for at afklare, om der kræves yderligere justeringer før idriftsættelse.

### Dokumentation

Selvom dokumentation skal føres gennem hele processen, er der også brug for et separat trin til at samle den dokumentation, der er produceret. Ud over dokumentation om, hvordan tingene er sat op, og hvordan systemerne interagerer, er det vigtigt at opsamle læringer.

## Når migreringen er gennemført

{{< ingress >}}
Drift og overvågning af dine applikationer efter migreringen sikrer, at du har kontrol efter flytningen.
{{< /ingress >}}

### Drift og overvågning

Applikationer i Compliant Kubernetes overvåges på to måder:

1. Metrikker og overvågningsdata gemmes i Prometheus og visualiseres i Grafana.
2. Applikationslogs gemmes i et Elasticsearch-klynge og visualiseres og behandles i Kibana.
   Disse programmer nyder bred støtte i det globale DevOps-community, og det anses som best practice at bruge dem til disse opgaver i Kubernetes-sammenhæng.

Mange programmer eksponerer metrikker i et Prometheus-specifikt format netop fordi systemet er så udbredt i communityet. Der findes adaptere til forskellige kontekster for at sikre smidig dataindsamling, såsom for Java-applikationer, der eksponerer data via Java Management Extensions (JMX), hvor data automatisk kan importeres i Prometheus. Grafana lader systemadministratorer skabe dashboards via Prometheus’ forespørgselssprog, PromQL, og dermed få et grafisk overblik over infrastrukturens tilstand (fx lagerplads, netværkstrafik og CPU-forbrug) samt nøgletal for applikations­performance (fx antal indloggede brugere eller aktive databasetransaktioner).

På den måde kan ingeniører holde styr på de fire gyldne signaler i overvågning:

- Latens
- Trafik
- Fejl
- Systemmætning

Applikationslogs hentes automatisk fra containerne, og deres indhold gøres søgbart i Kibana ved hjælp af metadata. Dette gør det muligt for administratorer hurtigt at afgøre, hvilken node i Compliant Kubernetes-klyngen et givent loguddrag kom fra, og at udføre årsagsanalyse for effektiv fejlsøgning. Hvis logdataene konsekvent følger en bestemt struktur, eller hvis de er i et hierarkisk format som JSON, kan denne struktur gøres til egentlige felter i Elasticsearch og dermed yderligere forenkle behandlingen af data.

### Kontinuerlig integration og udrulning

For at muliggøre en agil arbejdsform baserer mange organisationer sig på systemer, der lader dem bygge, teste og udrulle software automatisk i en CI/CD-proces – gerne direkte ved indtjekning af kode i et versionskontrolsystem. Azure tilbyder Azure DevOps Pipelines som en komplet løsning. Andre populære alternativer er Gitlab, CircleCI, ArgoCD, Octopus Deploy, TeamCity og Jenkins, hvor organisationer selv administrerer mindst nogle af disse.

Da systemerne til at bygge og udrulle software i en CI/CD-proces typisk ikke er afhængige af brugerdata, er det sandsynligt, at de – også under GDPR – fortsat vil bruge de systemer, organisationen allerede har hertil. Organisationer, der har processer og stor viden i en bestemt produktserie, vil derfor ofte blive ved med at bruge disse.

Hverken Safespring som sådan eller Compliant Kubernetes dikterer en specifik CI/CD-løsning, men kan gøres kompatibel med alle. Af sikkerhedshensyn anbefaler Compliant Kubernetes, at byggeartefakter – containerimages – gemmes i det containerbilledregister, der indgår i Compliant Kubernetes.

Som en officiel CNCF-certificeret Kubernetes-distribution er Compliant Kubernetes fuldt kompatibel med alle CI/CD-systemer, der understøtter Kubernetes.

### Policy som kode

Kontinuerlig sikkerhed og compliance via Policy som kode. Compliant Kubernetes er en Kubernetes-distribution med fokus på sikkerhed. At sikre systemer er ikke en engangsopgave, men en kontinuerlig proces. Compliant Kubernetes understøtter denne proces således:

- {{< inline "Sikkerhedsscanning" >}} af containerimages for kendte sårbarheder udføres løbende af softwaren Trivy, integreret med containerbilledregisteret Harbor.
- {{< inline "Indbrudsdetektion" >}} via Falco advarer, når softwaren i en container begynder at opføre sig uautoriseret, for eksempel ved at forsøge at etablere netværksforbindelser til systemer, den ellers ikke forbinder til, eller ved at begynde at læse/skrive filer, som programmørerne ikke har tiltænkt.
- {{< inline "Begrænsning af netværkstrafik" >}} via firewallregler udtrykkes som Kubernetes Network Policies. Disse implementeres og håndhæves af netværkssoftwaren Calico.
- {{< inline "Automatisk certifikathåndtering" >}} via cert-manager betyder, at krypteringscertifikater kan have kort levetid og roteres ofte og automatisk.
- {{< inline "Beskyttelse mod forkert konfiguration" >}} med Open Policy Agent: denne opfanger og inspicerer API-kald til Kubernetes’ API-server og videresender kun dem, der opfylder definerede policykrav. Et eksempel er, at en policy kan forbyde konfigurationer, der indeholder kendte standardadgangskoder, eller at udviklingssystemer forbinder til produktionsdatabaser.

Disse aspekter af sikkerhedsprocessen er en konkretisering af organisationens politikker. Da disse politikker konfigureres via kode, som kan versionsstyres og underlægges organisationens krav til code review, kan organisationen lettere opfylde regulatoriske krav, for eksempel ISO-27001.

Løbende scanning for kendte sårbarheder og advarsler om adfærd, der indikerer ukendte fejl, reducerer også risikoen for databrud. Samtidig mindsker begrænsninger af netværkstrafik, som applikationerne ikke selv kan ændre, risikoen for, at eventuelle indbrud får stor effekt.

## Resumé

{{< ingress >}}
En migrationsplan indeholder en inventariseringsfase, identificering af afhængigheder, planlægning af arbejdet og tests, der sikrer funktionalitet.
{{< /ingress >}}

Dette dokument opsummerer de skridt, en organisation skal tage for at migrere succesfuldt fra Microsoft Azure og Azure Kubernetes Service til Safespring og Compliant Kubernetes. Der er mange grunde til en sådan migrering, herunder overholdelse af svensk og europæisk lovgivning for GDPR-compliance, adgang til ekspertsupport på svensk og sikker lagring af data i Sverige. En anden grund er fokus på sikkerhed i Compliant Kubernetes.

En migrationsplan indeholder den nødvendige inventariseringsfase, identificering af afhængigheder og hvordan disse kan erstattes, planlægning af arbejdet samt tests, der sikrer funktionalitet. Herefter kan migreringen påbegyndes og verificeres via de nødvendige tests. Løbende dokumentation og opfølgning betyder, at alt, hvad der læres undervejs, bevares til fremtidig reference.

Når migreringen er gennemført, venter systemadministration og overvågning i et nyt miljø. Værktøjerne hertil præsenteres også i dokumentet, som desuden belyser, hvordan de spiller sammen for at levere en samlet løsning med fokus på sikkerhed og smidige, agile udviklingsprocesser.

## AKS-modstykker som åben kildekode

{{< en-aks-alternatives >}}