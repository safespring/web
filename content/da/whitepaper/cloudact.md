---
ai: true
title: "Sådan håndterer du usikkerheden i forbindelse med GDPR og CLOUD Act"
section: "Hvidbog"
language: "da"
date: "2019-07-09"
intro: "EU-rettens og amerikansk rets bestemmelser om grænseoverskridende dataoverførsler samt aktuelle retsafgørelser, der kan komme til at påvirke dette."
draft: false
tags: ["Svenska"]
author: "Martin Millnert"
dokumentnamn: ""
socialmediabild: "Safespring_Linkedin_cloudact-gdpr.jpg"
sidebarlinkname: "Hent"
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: "#hent"
card: "safespring_card_26.jpg"
eventbild: ""
aliases:
  - /whitepapers/cloudact
  - /cloudact
  - /whitepaper/cloudact/
toc: "Indhold"
---

{{< ingress >}}
Dette white paper handler om EU's og amerikansk rets bestemmelser om grænseoverskridende dataoverførsler samt aktuelle retssager, som kan komme til at påvirke dette.
{{< /ingress >}}

Allmänna dataskyddsförordningen (eng.: GDPR) trådte i kraft den 25. maj 2018 og erstattede Personuppgiftslagen (PUL). Den er hverken begyndelsen eller enden på EU's længe igangværende bestræbelser på at forbedre beskyttelsen af individets data samt retten til privatliv. Disse rettigheder er grundlæggende menneskerettigheder i EU, og samtlige medlemsstater er bundet af dem på områder, der falder ind under EU's kompetence i og med ikrafttrædelsen af Lissabontraktaten 20091. EU styrker dermed sit forspring i forhold til USA, når det gælder retlige værn om individers ret til privatliv og data.

## Baggrund

{{< ingress >}}
Databeskyttelsesdirektivet2 fra 1995 skabte en EU-fælles ramme for beskyttelse af personoplysninger.
{{< /ingress >}}

Det var stadig op til hvert enkelt land at indføre national lovgivning på baggrund af direktivet. I Sverige blev direktivet gennemført i national ret i 1998 gennem personuppgiftslagen (PUL)3. PUL regulerede dels, hvilke typer personoplysninger der måtte registreres, samt også hvordan disse måtte overføres til såkaldte “tredjelande”. Sidstnævnte krævede, at mindst én af tre følgende situationer gjaldt:

1. Landets persondatabeskyttelseslovgivning anses for sammenlignelig med den europæiske (33 § PUL)
2. Den registrerede har givet samtykke eller har ved indgåelse af kontrakt de facto accepteret vis udlevering (34 § PUL)
3. Regeringen har specifikt meddelt undtagelse (35 § PUL)

I modsætning til Databeskyttelsesdirektivet gælder GDPR som EU-ret direkte og kræver ikke implementering af EU-reglerne i national lovgivning. Det indebærer, at samtlige EU-medlemsstater nu har fået en endnu mere harmoniseret lovgivning, hvad angår personoplysningsbeskyttelse. Mindre lokale tilpasninger af visse detaljer i GDPR tillades, særligt hvad angår offentlig forvaltning, men den store majoritet af lovgivningen forbliver ens medlemslandene imellem.

Der fandtes frem til den 6. oktober 2015 flere måder at muliggøre overførsel til tredjelande, hvoraf de tre hovedalternativer var:

1. Safe Harbor4 - et system for amerikanske selskaber til selv at certificere deres behandling af personoplysninger.
2. Binding Corporate Rules - retningslinjer og processer for multinationale virksomheders interne overførsler.
3. Standard Contractual Clauses5 - en standardkontrakt, som en europæisk kunde kan indgå med en amerikansk leverandør.

Den 6. oktober 2015 kendte EU-Domstolen i C-362/14 EU-Kommissionens afgørelse om Safe Harbor6 ugyldig. Den 2. februar 2016 besluttede EU-Kommissionen på ny om et system for amerikanske selskaber til at selv-certificere sig, det såkaldte Privacy Shield.7

Ved siden af personoplysningsbeskyttelsen, som gælder ved interaktioner mellem enkeltpersoner og virksomheder eller enkeltpersoner og myndigheder, findes et særskilt system for dataoverførsel i aktiviteter, der vedrører retshåndhævende myndigheder. Disse myndigheder kan indhente oplysninger i efterforskninger og lignende fra andre lande via såkaldte MLAT-aftaler (Mutual Legal Assistance Treaty).

## Aktuellt

{{< ingress >}}
I dag kan amerikanske IT-selskaber blive tvunget til at udlevere persondata, når amerikanske myndigheder kræver det, uanset hvor data fysisk befinder sig.
{{< /ingress >}}

### CLOUD Act

Clarifying Lawful Overseas Use of Data Act (US CLOUD Act)8 er en amerikansk lov, der blev vedtaget den 23. marts 2018, med det formål at fjerne tidligere hindringer i amerikansk lovgivning for, at amerikanske IT-selskaber kan udlevere persondata, når amerikanske myndigheder kræver det, uanset hvor data fysisk befinder sig.

Loven indeholder også en proces, hvor den amerikanske regering kan kvalificere andre lande til at måtte anmode om data fra amerikanske selskaber. Et yderligere formål med lovgivningen er at omgå de i dag eksisterende MLAT'er (se ovenfor), blandt andet fordi MLAT-processer anses for langsomme. MLAT-processer indebærer, at anmodninger om udlevering af oplysninger prøves af domstole, hvilket tager tid9. Både europæiske og britiske repræsentanter inden for retshåndhævelse har forhandlet med amerikanske modparter for at forbedre situationen på området og opnå enklere og hurtigere adgang til udenlandsk lagrede data i straffesager.

Da Microsoft vs US Government10 var blevet taget op ved USA's Højesteret i foråret 2018, havde den amerikanske side travlt med at indføre ny lov for at undgå, at den forventede afgørelse, indtil loven blev ændret, ville cementere et udfald, som hverken Microsoft eller US Government (MS-vs-USG) ønskede11. Lovgivningen er i sig hastigt12 udarbejdet og har fået en mængde kritik af forskellige grunde, blandt andet bekymring for, at ikke-amerikanske myndigheder skal kunne få adgang til upassende data via de bilaterale samarbejdsaftaler13, men også på det juridiske plan, da anvendelsen af ekstraterritorial lovgivning er et virvar14. Sagen ved Højesteret blev opgivet, efter at US CLOUD Act blev fastslået15.

Irland16 såvel som EU-Kommissionen17 har indgivet såkaldte amicus curiae-indlæg18 i MS-vs-USG, som sammenfattende i sidstnævnte tilfælde fastslår, at EU har en interesse i internationalt retshåndhævelsessamarbejde, men samtidig at enhver form for udlevering af data fysisk lagret i EU skal ske i overensstemmelse med GDPR for at være lovlig i EU19. I GDPR er det særligt artikel 4820, som behandler fuldbyrdelse af domstols- eller myndighedsafgørelser fra tredjelande inden for EU, og siger, at en sådan overførsel “kun må gennemføres, hvis den er baseret på en international aftale, såsom en aftale om gensidig retshjælp [eng.: MLAT]”. Irland samt EU-Kommissionen peger begge i deres indlæg på, at den mest rimelige vej netop er de allerede eksisterende MLAT-aftaler.

US CLOUD Act har altså endnu ikke ændret den grundlæggende situation: amerikansk og europæisk ret er ikke kompatible i spørgsmålet om udlevering af data lagret i EU til USA. Indtil aftaler mellem EU eller mellem hver enkelt medlemsstat og USA er på plads, som legaliserer anvendelsen af US CLOUD Act i forhold til artikel 48 i GDPR, er den eneste tilladte måde, der harmonerer med europæisk ret, at USA anvender de eksisterende MLAT-aftaler, hvilket var det, USA ønskede at komme uden om i første omgang.
Der er altså især tre spørgsmål, som spiller en afgørende rolle fremadrettet med hensyn til US CLOUD Acts indvirkning på amerikanske IT-selskabers virksomhed inden for EU:

1. Vil EU og USA, eller hver enkelt af medlemsstaterne og USA, få en eller flere aftaler på plads, som gør den amerikanske anvendelse af US CLOUD Act lovlig ud fra et europæisk perspektiv?
2. Vil en sådan aftale leve op til Chartret om grundlæggende rettigheder (EU-chartret)?
3. Vil USA respektere den europæiske territorialitet for GDPR, eller vil overførsler ske i strid med GDPR, og vil EU have indsigt i dette eller agere, hvis en sådan overførsel opdages?

I EU-Domstolens afgørelse i “Safe Harbor”-sagen ræsonnerer domstolen ikke i første række i termer af, hvad der beviseligt er sket i enkeltsager, men hvad amerikansk lov de facto muliggør. Hvad angår det tredje punkt ovenfor, gør US CLOUD Act det muligt for USA at anmode om overførsel af data i strid med GDPR: Ifølge US CLOUD Act er det op til det adspurgte selskab på eget initiativ at modsætte sig ved domstolene – en amerikansk retssag finder kun sted da. Selv hvis den amerikanske domstol skulle finde grunde til ikke at godkende en anmodning om udlevering af data, kan den også finde grunde til at godkende den. Det er udtrykkeligt indskrevet i loven, at retten skal tage stilling til en række forhold, herunder amerikanske interesser inklusive nationale sikkerhedsinteresser. Set fra et europæisk perspektiv er dette problematisk. Den europæiske ret til databeskyttelse beskytter europæiske borgere, og det europæiske retsvæsen (særligt domstolene) har til opgave at sikre, at europæisk lovgivning fortolkes, så den beskytter EU-borgere.

Det, man skal forstå, er, at EU-chartret hører til rammetraktaterne og har til formål at kodificere EU's grundprincipper. Det betyder, at anden EU-ret som direktiver, forordninger og regler for aftaler successivt bygger ovenpå den lovgivning. EU-chartret garanterer rettigheder til EU-borgere, som de europæiske domstole skal forholde sig til ved retstvister. Det ser derfor ud til, at det andet spørgsmål ovenfor fører til samme grundlæggende problemstilling, som EU-Domstolen allerede må tage i betragtning i og med håndteringen af sagen “Data Protection Commissioner” (se nedenfor). Det andet punkt kan også siges i vid udstrækning allerede at være vurderet i C-362/14 (se særligt paragraf 79-98, som fuldstændigt fældede Safe Harbor-aftalen).
Hvad angår det første spørgsmål, hævdes det, at Storbritannien er i bilaterale forhandlinger med USA med henblik på at få en ny MLAT-aftale på plads21, mens EU tilstræber en multilateral aftale for hele unionen med USA22. Et problem for EU er, at US CLOUD Act, strengt læst, ikke tillader, at USA indgår multilaterale aftaler frem for bilaterale aftaler, hvilket kan indebære, at amerikansk lov forhindrer den amerikanske stat i andet end at søge bilaterale aftaler med hvert enkelt EU-medlemsland. For EU ville en sådan løsning være utilfredsstillende. Yderligere lovgivning eller en “venlig” fortolkning af US CLOUD Act kræves, for at EU kan søge en multilateral aftale.

### C-311/18, Data Protection Commissioner

Efter at Safe Harbor-afgørelsen blev kendt ugyldig af EU-Domstolen den 6. oktober 2015 i C-362/14, indgav østrigeren Max Schrems igen til det irske datatilsyn en begæring om tilsyn med Facebook Irelands dataflows ud af EU. Han mente, at det, i lyset af udfaldet i C-362/14, umuligt kunne være tilladt at overføre data til USA baseret på Standard Contractual Clauses eller Privacy Shield. Sagen gik i retten, da Schrems argumenterede for, at det irske datatilsyn selv kan beslutte at stoppe Facebooks dataflows ud af EU. USA's regering, Digital Europe og Business Software Alliance bistår Facebook i sagen, mens Schrems og det irske datatilsyn bistås af EPIC.

Datatilsynet er enig med Schrems i, at EU-charterets artikel 47 — Ret til et effektivt retsmiddel og til en upartisk domstol — ikke respekteres i den ordning, som etableres af Standard Contractual Clauses og Privacy Shield, samt i risikoen for, at EU-borgeres rettigheder ifølge artikel 7 og 8 dermed er truet. Den irske High Court24 besluttede den 3. oktober 2017 at forelægge sagen for EU-Domstolen, så afgørelsen bliver gyldig i hele EU. Facebook appellerede beslutningen om forelæggelse til den irske Supreme Court. Da High Court så annoncerede selve forelæggelsen den 12. april 2018, ansøgte Facebook High Court om at fryse forelæggelsen for EU-Domstolen i afventning af Supreme Courts afgørelse.

High Court afviste dette den 2. maj, da Facebooks begæring manglede grundlag, og skrev, at “forelæggelsen skal fortsætte straks”, samt at Facebooks optræden i retten havde været på grænsen til dadelværdig og useriøs25. Mediernes vurdering er, at Facebook på forskellige vis forsøger at forsinke retsprocessen26. Det var også tydeligt i den høring, som Europa-Parlamentet gennemførte den 22. maj 2018 med Facebooks CEO, Mark Zuckerberg, at Facebooks forretningsvirksomhed har en række aktuelle konfliktområder med EU27 28 29.

En EU-parlamentariker konstaterede under høringen med Zuckerberg niveauforskellene mellem USA's og EU's databeskyttelse og vanskeligheden ved at forene disse to30. Gyldigheden af både Standard Contractual Clauses og Privacy Shield bestrides i forelæggelsen for EU-Domstolen. Hvad angår Privacy Shield, gælder tvisten i første række, om den ombudsmand, som USA's regering udpeger, opfylder EU-rettens krav til en uafhængig retsinstans med en række yderligere egenskaber.

Når man læser paragraf 43 og 44 i forelæggelsen, er det svært at se, hvordan dette skulle kunne være tilfældet givet det ræsonnement, som det irske datatilsyn har ført, men vi må afvente EU-Domstolens afgørelse.

Forelæggelsen består af 11 spørgsmål, som beder EU-Domstolen udtale sig om, hvorvidt Standard Contractual Clauses samt Privacy Shield er forenelige med unionsretten (EU-chartret osv.), men der er ikke plads til at beskrive samtlige øvrige indledende spørgsmål her. Det bør vides, at EU-Domstolen undertiden svarer på de spørgsmål, den ønsker, den havde fået, snarere end de spørgsmål, den faktisk fik, hvorfor man ikke kan forvente entydige svar.

## Slutsats

{{< ingress >}}
I lyset af den ovenfor beskrevne retlige situation og den store diskrepans mellem udformningen af amerikansk og europæisk ret er det svært at se, hvordan de to regimer er indbyrdes forenelige.
{{< /ingress >}}

For det første er der ingen indikationer på, at europæiske domstole kunne tænkes at kraftigt forringe sådanne borgerlige rettigheder, som er lovfæstede. Den muligvis farbare retning er, at amerikansk lov forbedrer beskyttelsen for enkeltpersoner. En sådan udvikling ville dog gå stik imod amerikansk praksis vedrørende netop national sikkerhed, som i praksis ikke anerkender rettigheder for personer, som ikke er statsborgere i USA (hvilket EU-borgere typisk ikke er), hvilket udtalelser fra retskyndige i High Courts forelæggelse til EU-Domstolen C-311/18 tilsiger.

For det andet er det muligt, at EU-Domstolen vil kende både Standard Contractual Clauses samt Privacy Shield ugyldige, og at EU-Kommissionen forhandler et “Safe Harbor 3” med USA, i det omfang US CLOUD Act ikke har gjort et sådant umuligt. Man kan spekulere i, hvilken parts position der styrkes mest forud for forhandlingerne af en sådan afgørelse fra EU-Domstolen.

For det tredje er der for nærværende en politisk situation mellem EU og USA, som er alt andet end god. Bagsiderne af amerikanske IT-selskabers privatlivspolitikker, som f.eks. Facebooks, som delvist anses at have gjort Brexit muligt gennem påvirkningskampagner, er ikke gået EU-politikere forbi. Hertil kan lægges diplomatiske problemer, som er opstået i og med at USA har trukket sig ud af Iran-aftalen, og den spirende handelskrig, som USA's regering har skabt.

For det fjerde er en almindelig indvending mod, at EU-Domstolen skulle kunne kende både Standard Contractual Clauses samt Privacy Shield ugyldige overhovedet, eller uden at et alternativ er på plads, at det ville have så store konsekvenser for erhvervslivet. EU-Domstolens opgave er at sikre, at EU-chartret efterleves i EU's love og beslutninger. Hvis EU-chartret står i vejen for erhvervslivet, må det i så fald ændres. Indtil da gælder det, som det er. EU-Kommissionen konstaterede, at europæiske borgeres rettigheder blev krænket, men anså sig ikke for forpligtet til at ændre Safe Harbor-afgørelsen i lyset af dette i afventning af en forestående genforhandling af afgørelsen med USA. EU-Domstolen hævder derimod, at man tværtimod faktisk bør stoppe overførslerne ved en sådan konstatering for at ophøre med at krænke EU-borgeres grundlæggende rettigheder31.

Hvad næste skridt ville blive, efter at EU har kendt USA som utilstrækkeligt tredjeland, kan man kun spekulere om. Det kan dog konstateres, at ved EU-Domstolens forrige præjudicielle afgørelse i C-362/14 ophørte Safe Harbor straks med at gælde, men de europæiske datatilsyn gav databehandlere (bitræder) 3 måneders respit, så EU-Kommissionen og USA kunne finde en ny løsning. Hvis ikke en ny løsning kan findes i nær fremtid, behøver databehandlere at ophøre med behandling af personoplysninger på berørte tjenester for at undgå trussel om bøder.

## Rekommendationer till organisationer

{{< ingress >}}
I lyset af retssituationen er der nogle strategiske anbefalinger vedrørende cloudtjenester for at undgå at komme i klemme, inden (eller hvis ikke) de retlige modstridigheder mellem EU og USA er blevet afklaret.
{{< /ingress >}}

### Rekommendationer gällande IT-arkitektur

1. Sørg for at bygge cloud-infrastrukturen med agnostiske værktøjer og platforme for lettere at kunne flytte miljøet til en anden leverandør, hvis det retlige læge forværres. At bygge sin miljø med containere (eller Docker) i stedet for virtuelle servere er en velafprøvet måde, som letter migrering af tjenesterne til en anden leverandør.
2. Beregn, hvordan dataoverførselsomkostningerne vil slå igennem den dag, I vil flytte ud. Mange cloudtjenesteudbydere tager ikke betaling for at lægge op – men desto mere for at hente hjem, hvilket kan give ubehagelige overraskelser.
3. Sørg for at adskille data fra tjenesterne med åbne (eller i det mindste standardiserede) grænseflader for lettere at kunne skifte datalagringsplatform. Amazons S3-protokol er blevet branchestandard for storskala lagring af ustrukturerede data i skyen. Desværre bruger Amazon visse udvidelser, som ikke understøttes af andre S3-kompatible tjenester. Hvis du sørger for at bruge en mere generisk S3-kompatibel udbyder i første omgang, er det lettere at flytte til en anden udbyder.
4. Invester i en egen identitetshåndtering i stedet for at stole på cloudtjenesteudbyderens. Dette vil i visse tilfælde blive lidt mere besværligt, men utrolig meget lettere, hvis tjenesterne skal migreres et andet sted hen.

### Rekommendationer gällande riskanalys och tillmötesgående av personuppgiftsskyddslagstiftning

1. Lav grundarbejdet med GDPR omkring håndtering af personoplysninger. Et sådant grundarbejde bør omfatte, at I gennemgår:
   1. hvor I geografisk lagrer jeres personoplysninger,
   2. hvilken lovlighed I har for behandlingen, samt (hvis personoplysningerne lagres uden for EU/EØS) for selve overførslen dertil,
   3. hvor følsomme de personoplysninger er, der behandles (særligt hvis det sker uden for EU/EØS),
   4. om I har informeret de registrerede personer om, at deres personoplysninger behandles, og
   5. om der er implementeret en gallinerings-/sletterutine. Dette punkt er naturligvis særligt vigtigt, hvis oplysningerne lagres i USA, eftersom organisationer da i hvert fald har en naturlig måde at reducere de oplysninger, som kunne tænkes at skulle udleveres.
2. Uddyb GDPR-arbejdet ved at indføre sikkerhedsklassificering af den information, der behandles inden for organisationen — dette er nødvendigt for derefter at kunne foretage korrekt egnetheds- og risikovurdering omkring anvendelsen af forskellige cloudtjenester.
3. Medtag i risikovurderingen den juridiske usikkerhed omkring eksisterende og nye cloudtjenesteudbydere — foretag en sandsynlighedsvurdering og konsekvensanalyse og ager ud fra dette: Hvis der f.eks. antages at være 20 % risiko for et fuldt stop for overførsel af personoplysninger til amerikanske tjenester i 12 måneder med start om 9 måneder, hvordan ville dette påvirke virksomheden og beslutningsprocessen omkring IT-strategi vedrørende valg af leverandører?
4. Hav redundans også af leverandører. Særligt vigtigt for tjenester i risikozonen, og lav en vurdering omkring migrationsprocessen — hvor lang tid tager det f.eks. at udskifte samtlige amerikanske tjenester, hvis behovet skulle opstå? Det kan synes for katastrofalt overhovedet at overveje, men grundlaget er nødvendigt for at kunne træffe de rigtige beslutninger, hvis det skulle blive alvor.

Rekommendationer till organisationer som förlitar sig på Privacy Shield och SCCs

1. Analyser dataflows, der indebærer overførsel af data til lande uden for EØS, og find ud af, hvilken overførselsaftale der anvendes, hvor vigtig den er for virksomheden, og de sandsynlige konsekvenser af ikke at kunne fortsætte sådanne overførsler. Udarbejd mulige løsninger, som kunne undgå behovet for overførsler.
2. Find ud af, hvordan de tredjeparter, som håndterer dataflows fra jeres virksomhed, vil håndtere en mulig ugyldiggørelse af SCC og/eller Privacy Shield.
3. Informer ledelsen og andre vigtige interessenter om de risici, der opstår ved en potentiel ugyldiggørelse af SCC og/eller Privacy Shield.
