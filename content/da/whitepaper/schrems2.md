---
ai: true
title: "EU-Domstolens underkendelse af Privacy Shield"
date: "2020-09-04"
draft: false
author: ""
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_33-2.gif"
intro: "Betingelser og anbefalinger for den offentlige sektor og dens leverandører"
sidebarlinkname: ""
Section: "Hvidbog"
sidebarlinkicon: "fa-file-download"
card: "safespring_card_33.jpg"
eventbild: "safespring_background_33.jpg"
socialmediabild: "safespring_social_33-2.gif"
toc: "Indholdsfortegnelse"
language: "da"
aliases:
  - /en/whitepaper/schrems2/
---
## Baggrund

{{< ingress >}}
I foråret 2018 offentliggjorde Safespring en hvidbog om konsekvenserne af den europæiske databeskyttelsesforordning (GDPR)1 og den amerikanske CLOUD Act for cloudindkøb.
{{< /ingress >}}

Safesprings hvidbog konkluderede med elleve anbefalinger til organisationer, der arbejder med cloudinfrastruktur, om databeskyttelse, datasikkerhed og jurisdiktionsspørgsmål. I en dom afsagt den 16. juli 2020 præciserede Den Europæiske Unions Domstol yderligere betingelserne for overførsel af europæiske borgeres data til amerikansk jurisdiktion. Dette har nødvendiggjort, at Safespring opdaterer sine tidligere anbefalinger.

### Denne hvidbog er opdelt i tre dele

- {{< inline "Del I">}} Dette dokument gennemgår Schrems II-dommen,
- {{< inline "Del II">}} markedets struktur for cloudtjenester og samspillet mellem tekniske krav og lovgivning,
- {{< inline "Del III">}} samt en skitse af vejen frem.

Del II uddyber Safesprings tidligere anbefalinger for organisationens aktiviteter i lyset af den nye retlige situation.

Del III giver organisationer bedre forudsætninger for at fastsætte de passende krav til statslig koordinering.

## Del I - Introduktion <br> Yderligere præcisering af EU's regler for dataoverførsel

{{< ingress >}}
Den 16. juli 2020 afsagde Den Europæiske Unions Domstol dom i sag C-311/18, normalt omtalt som "Schrems II".
{{< /ingress >}}

Den 16. juli 2020 afsagde Den Europæiske Unions Domstol dom i sag C-311/18,1. Sagen omtales normalt som "Schrems II" og vedrørte foreneligheden mellem europæiske forfatningsmæssige principper og hvad der, indtil dommen blev afsagt, var politisk accepterede standarder for dataoverførsel til tredjelandet USA. I det væsentlige bekræftede dommen, hvad Den Europæiske Unions Domstol allerede havde gjort klart i flere domme efter Lissabontraktatens ikrafttræden i 2009: Databeskyttelse er et forfatningsretligt princip i EU-området (artikel 8 i EU's charter om grundlæggende rettigheder), og præciseringen af reglerne for at opretholde dette forfatningsprincip, som i databeskyttelsesforordningen (GDPR), undergraver ikke dette forfatningsprincip.

Schrems II præciserer yderligere, at disse overvejede normer betyder, at visse aspekter af amerikansk efterretnings- og sikkerhedslovgivning forhindrer virksomheder, der er underlagt forpligtelser efter denne lovgivning, i at kunne anses som sikre modtagere af data i europæisk retlig forstand. Den Europæiske Unions Domstol minder også europæiske politikere om, at virksomheder ikke kan bruge de administrative overførselsafgørelser, som Europa-Kommissionen kan træffe i medfør af GDPR artikel 45, og overførselsaftaler efter GDPR artikel 46 og 49 til at omgå de europæiske forfatningsretlige principper om databeskyttelse.

{{% accordion title= "Hvad er en overførselsafgørelse?" %}}

Afgørelser om dataoverførsel, eller afgørelser om et tilstrækkeligt beskyttelsesniveau, indebærer, at Europa-Kommissionen har besluttet, at standarderne i et tredjeland i tilstrækkelig grad beskytter europæiske borgeres rettigheder. En overførselsafgørelse er ikke en aftale i egentlig forstand, men en ensidig meddelelse fra Europa-Kommissionen.

I praksis træffer Europa-Kommissionen dog ikke afgørelserne uafhængigt, men modtager støtte fra det udvalg af medlemsstatsrepræsentanter, som er etableret i GDPR artikel 93. Forud for Kommissionens afgørelser går ofte forhandlinger med tredjelandet.

{{% /accordion %}}

{{% accordion title= "Hvad er en overførselsaftale?" %}}

Aftaler om dataoverførsel kan tage form af standardbestemmelser om databeskyttelse (GDPR artikel 46, stk. 2), en databehandlingsaftale (GDPR artikel 46, stk. 3) eller en aftale mellem en erhvervsdrivende og en fysisk person (GDPR artikel 49).

Standardbestemmelser om databeskyttelse skal yde en beskyttelse, der materielt svarer til den indenlandske europæiske lovgivning.

{{% /accordion %}}

Dommen har konsekvenser for virksomheder og myndigheder, der behandler europæiske borgeres personoplysninger, i den forstand at der nu er et langt mere begrænset råderum for aftaler og samarbejde med aktører, der risikerer at være underlagt forpligtelser efter amerikansk lovgivning om udlevering af data til myndigheder.

{{< inline "Den Europæiske Unions Domstol">}} har udtrykkeligt fastslået, at:

- tredjelandes sikkerhedslovgivning ikke påvirker anvendelsen af europæiske borgerrettigheder, selv om EU-borgeren interagerer med erhvervsdrivende fra tredjelandet (præmis 89 i C-311/18);
- kravet om materielt ækvivalent beskyttelse af europæiske borgeres rettigheder ved dataoverførsel ikke påvirkes af den specifikke mekanisme, der bruges til overførsel (præmis 82 i C-311/18);
- "beskyttelsesniveauet" for personoplysninger skal være materielt ækvivalent med det, der er fastlagt i EU-retten, uden hensyn til særlige nationale bestemmelser i de enkelte EU-lande (præmis 101 og 103 i C-311/18);
- tredjelandsmyndigheders mulighed for at forvente adgang til data påvirker beskyttelsesniveauet (præmis 103 i C-311/18);
- tilsynsmyndigheder skal gribe ind, når materielt ækvivalent beskyttelse ikke kan fastslås, særligt i fraværet af en overførselsafgørelse (præmis 120 og 121 i C-311/18);
- en afgørelse fra Europa-Kommissionen om standardkontraktbestemmelser ikke påvirker dataansvarliges og modtageres forpligtelser til at bringe overførsler til ophør, hvis den beskyttelse, som bestemmelserne skal yde, ikke kan opretholdes (præmis 142 i C-311/18); og
- Europa-Kommissionens overførselsafgørelse "Privacy Shield" ikke er gyldig (præmis 201 i C-311/18).

I det væsentlige har Den Europæiske Unions Domstol bekræftet de konklusioner, der allerede var fremlagt i Safesprings hvidbog How to deal with the uncertainty surrounding the CLOUD Act and GDPR fra 2018. Selvom de økonomiske spændinger vedrørende databeskyttelse mellem USA og EU ikke er blevet afhjulpet af de politiske reaktioner på hverken Schrems I eller den nyligt offentliggjorte Schrems II-dom, er den retlige situation nu mere præcis.

Schrems II-dommen har tydeliggjort, at problemet ikke er, hvor selve dataene er lagret, men hvor den aktør, der lagrer dataene, er placeret. De rettigheder, der er kodificeret i europæisk ret, beskytter fysiske personer, og forpligtelserne til at opretholde disse rettigheder, som er kodificeret i europæisk ret, gælder både fysiske og juridiske personer. Hvis tredjelandslovgivning finder anvendelse på en fysisk eller juridisk person på en sådan måde, at vedkommende forhindres i at opfylde sine forpligtelser i forhold til en fysisk persons grundlæggende rettigheder, udgør det i princippet en væsentlig hindring for samarbejde med den fysiske eller juridiske person.

Dommen bekræfter Safesprings anbefalinger til organisationer vedrørende cloudtjenester.2 Organisationer skal dog sikre, at de har en grundig juridisk analyse af datakataloger og behandlingsgrundlag for behandling og overførsel af personoplysninger, samt sikre at de tjenester, de baserer sig på, anvender offentligt specificerede protokoller og er teknisk designet, så det er muligt at skifte leverandør i fremtiden. I tilfælde af investeringer i eller brug af cloudtjenester, som på et tidspunkt på markedet kan berøre (europæiske) myndigheders behandling af personoplysninger, synes samarbejde med amerikanske virksomheder i udgangspunktet at være udelukket, medmindre USA ændrer sin nationale lovgivning til fordel for europæiske juridiske personer.

Denne sidste betingelse vil være af særlig interesse i den proces, som Europa-Kommissionen har annonceret om at indlede drøftelser om en ny overførselsafgørelse.3

{{% accordion title= "Hvad er leverandørens placering?" %}}

Schrems II-dommen tydeliggør, at det er leverandørens placering snarere end dataenes placering, der begrænser muligheden for dataoverførsel, særligt til amerikansk jurisdiktion. Beskyttelsen af europæiske borgere anses for at være undermineret, idet tredjelandsmyndigheder kan pålægge tjenesteudbydere i tredjelande forpligtelser, som indebærer, at europæiske borgere ikke modtager en databeskyttelse, der er materielt ækvivalent med den, de ville nyde inden for EU's grænser.

Disse konklusioner er ikke nye i europæisk ret. I supplerende lovgivning SOU 2017:74 om datalagring til retshåndhævelsesformål er det anført, at datalagring efter europæisk retspraksis er underlagt placeringskrav.

{{% /accordion %}}

## Del II - Skyen <br>Lokal infrastruktur med lokal tilpasning

{{< ingress >}}
Cloudtjenester har givet organisationer enorme muligheder for at effektivisere og automatisere deres arbejde.
{{< /ingress >}}

Selvom det primært er gennem stordriftsfordele, at cloudtjenester bidrager til alt fra miljømæssig bæredygtighed til styrkede sikkerhedsindsatser, har den forbedrede mulighed for hurtigt at få adgang til enten datalagringskapacitet eller databehandlingskapacitet uden formaliserede indkøbsprocesser medført fremskridt for denne moderne form for it-drift ikke kun i den private sektor, men også i den offentlige sektor.4

Fordelene ved en vis grad af centralisering afspejles også i øget tilpasningsevne. Forskellige parter kan dele omkostningerne til udvikling og vedligeholdelse af grundlæggende funktioner. I løbet af de sidste ti år er der etableret flere globale konsortier for at opretholde og udvikle nyttige basale funktioner til håndtering af store mængder servere.5 I mindre it-systemer kan funktioner, som kan automatiseres gennem stordriftsfordele, kræve mange arbejdstimer. Samtidig bliver opgaver, der normalt er tidskrævende og dyre, såsom investeringer i overvågning i realtid af sikkerheden i it-miljøet eller i foranstaltninger til at forebygge sikkerhedsbrister, lettere at retfærdiggøre. Med et fundament af sikre og optimerede basisfunktioner kan specialiserede tjenester derefter tilføjes og tilpasses efter behovene i den enkelte virksomhed. Virksomheden kan dermed basere sig på et stabilt og solidt fundament uden at skulle bygge en hel it-arkitektur op fra bunden hver gang et nyt koncept skal afprøves.

Den massive interesse for cloudtjenester har betydet, at markedet har udviklet sig hurtigt, herunder flere forskellige tjenester med forskellige fordele for den kontraherende kunde. Afhængigt af de specifikke krav i den enkelte organisation kan der leveres varierende grader af automatisering og stordriftsfordele.

Begrebet "cloudtjeneste" omfatter således både centraliseret styring af infrastruktur –
virtualiserede servere med et operativsystem, som kunden kan indrette efter eget ønske, og hvortil der kan tilføjes og vedligeholdes specifikke tjenester til specifikke formål (såsom databaser, webservere eller administrative systemer) – og formålsbestemte systemer, hvor cloududbyderen bistår med databasemoduler og andre grundlæggende byggesten til mere specialiseret funktionalitet. Det mest synlige element af cloudmarkedet for en typisk slutbruger er de centraliserede systemer for alt fra tekstredigering til planlægning og videokonferencer, som cloududbyderen i høj grad har forædlet.

Cloudmarkedet er også udviklet til at lade forskellige typer cloudtjenester interagere som led i B2B-relationer. En forædlet cloudtjeneste i et personalesystem kan således interagere med en mere infrastrukturel cloudtjeneste, der leverer virtuelle servere. På den måde behøver slutkunder kun at håndtere indtastning og verifikation af relevante data fremfor at vedligeholde og administrere kodebaser og underliggende operativsystemer. Det er også almindeligt, at samme aktør på markedet leverer både infrastruktur-tjenester og forædlede tjenester. Ligesom telemarkederne var kendetegnet ved vertikal integration i 1980'erne, er dagens cloudmarked ligeledes domineret af aktører med en høj grad af vertikal integration. Det betyder, at virksomheder leverer infrastruktur, platforme og software på samme tid.

Indkøbende slutkunder skal nøje overveje fordele og ulemper ved vertikal integration. I et vertikalt adskilt marked, hvor mange forskellige virksomheder kan bidrage med nye funktioner på hvert niveau i værdikæden, er der større plads til et varieret og skræddersyet udbud af tjenester. Desuden sættes store slutkunder i en mere oplyst position over for leverandører. Ligesom vertikal adskillelse og konkurrence på telemarkedet banede vej for udviklingen af innovative tjenester i 1990'erne, kan adskillelse og konkurrence på cloudmarkedet skabe plads til innovative tjenester i 2020'erne.

En vigtig forskel er, at cloudmarkedet allerede primært er baseret på grænseoverskridende og delte åbne kodebaser. Markedets oprindelse er global, ikke national, og en større grad af vertikal adskillelse betyder ikke nødvendigvis en større grad af nationalisering. Det betyder, at applikationer, regnekraft og de data, der indtastes i applikationerne, er geografisk og organisatorisk mobile. Dataoverførsler er blevet almindelige både i grænseoverskridende forstand og i den forstand, at data overføres mellem organisationer, som hver især spiller deres rolle i leveringen af den endelige tjeneste.

Et tysk projekt, der forsøger at kombinere erfaringer fra telesektoren med fordelene fra cloudindustrien, er GAIA-X6, en ramme for omkostningsdeling mellem geografisk forbundne aktører, der leverer interoperable tjenester.7 I Frankrig har man i næsten et årti fremhævet, at udbudsinstrumenter kan være særligt velegnede til at styrke små europæiske virksomheders rolle i digitale økosystemer, med særlig vægt på åbne data og cloudløsningsmodeller.7

### Med øget fleksibilitet følger øget ansvar

I praksis betyder brugen af cloudtjenester, at data, som en indkøbende organisation er ansvarlig for, og applikationer, der bruger disse data som input, vil befinde sig i en infrastruktur, som organisationen ikke selv administrerer. Uanset hvilket forædlingsniveau organisationer vælger for deres cloudtjenester, beror mange stordriftsfordele på, at administratoren af cloudtjenestens infrastruktur har adgang til tilstrækkelig information om de data, der behandles, for at gøre ressourcerne tilgængelige og sikre det sikkerhedsniveau, kunden kræver. Denne tekniske uundgåelighed medfører forpligtelser for indkøbende organisationer i lyset af Den Europæiske Unions Domstols Schrems II-dom.

Den Europæiske Unions Domstols vurdering af grundlæggende rettigheder i EU-området skaber et krav om, at dataansvarlige organisationer skal have overblik over hele værdikæden, også når der indkøbes en specifik og afgrænset softwareapplikation, som kun vil yde en begrænset nytte i egen forretning. Slutkunden bør overveje fordelene ved den tjeneste, der indkøbes, og se på, hvordan tjenesteudbyderen interagerer med sine underleverandører.

Den statslige udredning Den usynlige infrastruktur fra 2007 har allerede påpeget8, at "[it-]infrastruktur har den særhed, at den er usynlig i de tilfælde, hvor standarder findes og er hensigtsmæssige. De [standarderne] mærkes først, når de er fraværende og skaber problemer. It-standarder er også i høj grad usynlige i beslutningstagningen hos virksomhedsledere. Forretningsbeslutninger, såsom indkøb af e-tjenester, indebærer ofte også et valg af standarder, men disse synes ikke at blive valgt separat og eksplicit, i hvert fald ikke på det niveau hvor forretningsansvaret ligger, og de er uudsagte konsekvenser; af forskellige typer forretningsbeslutninger." En af konsekvenserne af både GDPR og Schrems II-dommen bør være, at disse uudsagte konsekvenser gøres eksplicitte.

Databehandlere skal sikre, at eventuelle underdatabehandlere er underlagt de samme kontraktlige forpligtelser som databehandleren selv over for de personer, hvis data behandles af en dataansvarlig (GDPR artikel 28).

Det er imidlertid op til den dataansvarlige at sikre, at både databehandlere og underleverandører opfylder de rette kontraktlige garantier. Når enten en databehandler eller dennes underleverandør er påvirket af retlige forpligtelser i et tredjeland, anser Den Europæiske Unions Domstol, at den dataansvarlige har et altomfattende ansvar for at sikre, at disse retlige forpligtelser ikke underminerer europæiske borgeres databeskyttelse. Den Europæiske Unions Domstol anser også, at den dataansvarliges pligter ikke reduceres blot fordi det ikke er muligt at fastslå en faktisk realisering af sådanne retlige forpligtelser for specifikke data – det er tilstrækkeligt, at en sådan retlig forpligtelse kan opstå (jf. præmis 142 i C-311/18).

{{% accordion title= "Hvad er et tredjeland?" %}}

Efter europæisk ret er et tredjeland et land, der ikke er medlem af Den Europæiske Union.

Nogle tredjelande, såsom EFTA-medlemmer, har en privilegeret status i forhold til andre tredjelande, fordi de har tilsluttet sig EU-lovgivningen. Andre tredjelande, såsom USA, Japan og Indien, har ikke en privilegeret status.

Dataoverførsler til tredjelande er reguleret i GDPR kapitel 5.

{{% /accordion %}}

Safesprings tjekliste fra 2018 adresserer de spørgsmål, som enhver organisation bør stille ved valg af infrastruktur.9 I lyset af Schrems II-dommen behøver tjeklisten en præcisering om, at cloududbydere, der er underlagt tredjelandslovgivning, vil have svært ved at efterleve EU-rettens krav. Særligt i tredjelandet USA vil lovgivningen skulle ændres for at gøre virksomheder, der er hjemmehørende i landet, til acceptable modtagere af data set fra et databeskyttelsesperspektiv. Det er ikke længere nok at holde styr på, hvilke (følsomme) personoplysninger der kan ende hos en udenlandsk myndighed. I stedet skal risikoen for, at sådanne oplysninger kan blive krævet udleveret, nu aktivt forebygges.

I praksis betyder dette, at indkøbende organisationer bør begrænse deres valg af tjenesteudbydere og underleverandører til dem, der er juridisk hjemmehørende et sted i EØS. Der kan også være behov for at sikre, at administration og vedligeholdelse af it-systemer ikke udføres af personer, der opererer uden for EØS. At europæiske politikere og Europa-Kommissionen ved to lejligheder ikke har formuleret overførselsafgørelser med tilstrækkeligt stærke garantier for databeskyttelse, bør også få indkøbende organisationer til at tøve med at have tillid til fremtidige overførselsafgørelser.10 I praksis har svenske politikere – trods begrænset juridisk råderum til at omgå Den Europæiske Unions Domstol – alligevel primært styret mod indsatser, der bevarer status quo,11 hvilket betyder, at aktører, som følger de politiske retningslinjer, risikerer at begå en retlig fejl.12

{{< inline "Supplerende anbefalinger" >}} 13

- Undersøg om downstream-tjenesteudbydere anvender underleverandører i form af PaaS- eller SaaS-udbydere.
- Tjek om tjenesteudbyderen har anvendt åbent specificerede softwarefunktioner (såsom API'er eller dataformater) ved design af sin tjeneste.
- Verificér, at der findes en kontrakt mellem tjenesteudbyderen og underleverandøren, og at aftalen opfylder kravene til databeskyttelse.
- Tjek at underleverandøren leverer dokumentation om de åbne standarder og specifikationer, som underleverandøren anvender til sine infrastrukturløsninger. Tjek desuden, at tjenesteudbyderen har sikret, at den kan migrere til en anden underleverandør om nødvendigt.
- Tjek om enten tjenesteudbyderen eller dens underleverandører har hjemsted i et tredjeland. Vurder om der i givet fald er risiko for, at tredjelandsmyndigheder kan kræve, at underleverandøren eller tjenesteudbyderen udleverer data til tredjelandsmyndigheder.

### Transparens som beskyttelse mod politisk ustabilitet

Både på europæisk14 og på svensk15 niveau er det blevet understreget, at et stærkere fokus på åbent tilgængelig programkode og åbne standarder skaber både transparens og klarhed på den måde, som europæisk databeskyttelsesret nu ser ud til at kræve. Den svenske Digitaliseringsstyrelse anbefaler, at svenske offentlige myndigheder udgiver deres egenudviklede kode under åbne softwarelicenser.16

Åbne standarder og åbne kodebaser er ikke anbefalinger, der udspringer af europæisk databeskyttelsesret. De muliggør imidlertid større mobilitet for slutkunder mellem forskellige leverandører. Hvis infrastrukturen er åben og interoperabel, har slutkunden større frihed til at tilpasse sig f.eks. domstolsafgørelser.

Selvom databeskyttelsesretten ikke kræver, at organisationer sikrer mulighed for at skifte leverandør, synes udviklingen i praksis på databeskyttelsesområdet at være sådan, at organisationer kan have gavn af selv at investere i denne fleksibilitet.

Når det gælder dataoverførsler, har det politiske lederskab i Sverige og Europa ikke bare én men to gange fejlkalibreret politiske beslutninger i en sådan grad, at Den Europæiske Unions Domstol har været nødt til at underkende dem. For organisationer, der skal overholde gældende ret, betyder det enorme omkostninger, spildt tid og massiv usikkerhed. Bevidste investeringer i åbne standarder og kode reducerer friktionen, hvis der bliver behov for at ændre kurs.

## Del III - Vejen frem

{{< ingress >}}
Organisationer i Europa kan for nuværende være forhindret i at vælge cloudtjenester, der er underlagt amerikansk lovgivning.
{{< /ingress >}}

Årsagen er amerikansk lovgivning om efterretningsaktiviteter og CLOUD Act, som Safespring allerede har berørt i tidligere hvidbøger. På denne baggrund bør organisationer, ud over at følge Safesprings eksisterende anbefalinger og de ovennævnte skærpelser, gøre følgende: udarbejde en plan for migrering væk fra cloudtjenester, der er underlagt amerikansk lovgivning;17

- gennemgå hvordan deres organisation allerede arbejder med eksisterende retningslinjer fra den nationale statslige indkøbshub (f.eks. ved at evaluere igangværende projekter på baggrund af aktuelle anbefalinger); og
- engagere sig aktivt i at få regeringen til at udvikle en national plan for cloudtjenester, der er forenelig med europæisk ret.

## Kilder

{{< ingress >}}
Denne hvidbog er skrevet af Amelia Andersdotter. Safespring leverer cloudtjenester produceret i EU med højt niveau af juridisk sikkerhed.
{{< /ingress >}}

1. ECLI: EU:C:2020:559
1. Safespring, hvidbog: Hvordan håndterer man usikkerheden omkring CLOUD Act og GDPR, 2018
1. Europa-Kommissionen, 10. august 2020, Fælles pressemeddelelse fra EU-kommissæren for retlige anliggender Didier Reynders og USA's handelsminister Wilbur Ross. https://ec.europa.eu/info/news/joint-press-statement-european-commissioner-justice-didier-reynders-and-us-secretary-commerce-wilbur-ross-7-august-2020-2020-aug-07_en
1. Statens servicecenter, En fælles statslig cloudtjeneste til offentlige myndigheders it-drift, delrapport 2017.
1. Jf. OpenStack Foundation (OSF) og Cloud Native Computing Foundation (CNCF).
1. GAIA-X: en fødereret datainfrastruktur for Europa. https://www.data-infrastructure.eu/GAIAX/Navigation/EN/Home/home.html
1. Interoperabilitet: samspil mellem forskellige komponenter. Se også SOU 2007:47, s. 133 ff.
1. Rapport d’Information nr. 443, Union européenne -- colonie du monde numérique ?, 20. marts 2013, s. 115-116.
1. SOU 2007:47, Den usynlige infrastruktur, s. 64.
1. Jf. fodnote 2 ovenfor.
1. Både Safe Harbor-afgørelsen fra 2001 og Privacy Shield-afgørelsen fra 2016 er blevet annulleret af Den Europæiske Unions Domstol.
1. Se komitédirektiv 2019:64 med tilføjelser i direktiv 2020:73.
1. Se organisationsanbefalinger i fodnote 2 ovenfor.
1. C(2018) 7118, Europa-Kommissionens digitale strategi – En digitalt forandret, brugerfokuseret og datadrevet Kommission, 2018.
1. E-delegationen, Vejledning for digitalt samarbejde, version 4.1, 28. maj 2015.
1. DIGG, 2019-136, Politik for softwareudvikling.
1. Spørgsmål 5 i del II vil i princippet altid skulle besvares bekræftende ved brug af amerikanske cloudtjenester, hvis USA ikke ændrer sin lovgivning.

{{< accordion-script >}}