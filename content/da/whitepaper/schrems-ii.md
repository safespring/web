---
ai: true
title: "EU-Domstolens underkendelse af Privacy Shield"
section: "Hvidbog"
language: "da"
date: "2020-09-04"
draft: false
tags: ["Svenska"]
author: "Amelia Andersdotter"
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_33.jpg"
intro: "Forudsætninger og anbefalinger for den offentlige sektor og deres leverandører"
sidebarlinkname: "Hent som PDF"
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: "/publications/safespring-white_paper-ogiltigforklarandet_av_privacy_shield.pdf"
card: "safespring_card_33.jpg"
socialmediabild: "safespring_social_33.jpg"
toc: "Indhold"
aliases:
  - /schrems/
  - /whitepaper/schrems-ii/
---
{{< ingress >}}
Nu hvor cloudtjenester, der er underlagt amerikansk lovgivning, sandsynligvis ikke kan anvendes i et udbud, har vi hos Safespring udgivet et white paper om den nye retlige situation.
{{< /ingress >}}

Dette white paper tager forudsætningerne efter dommen op og giver anbefalinger til organisationer i EU. Det er inddelt i fire kapitler.

- Schrems II-afgørelsen (del I),
- markedsstrukturen for cloudtjenester og samspillet mellem tekniske krav og jura (del II),
- forskellige svenske aktørers rolle i den videre udvikling af denne markedsstruktur og særligt behovet for koordinering af indsatser på statsligt niveau (del III)
- samt en kort beskrivelse af vejen frem (del IV).

## Baggrund

{{< ingress >}}
Safespring offentliggjorde i foråret 2018 et white paper om konsekvenserne af den europæiske databeskyttelsesforordning (DSF) og den amerikanske CLOUD Act for cloud-udbud i Sverige.
{{< /ingress >}}

Safesprings white paper afsluttedes med elleve anbefalinger til organisationer, der arbejder med cloudinfrastruktur i Sverige, vedrørende databeskyttelse, datasikkerhed og jurisdiktionsspørgsmål. Nu har EU-Domstolen i en dom af 16. juli 2020 yderligere præciseret vilkårene for overførsel af europæiske privatpersoners oplysninger til amerikansk jurisdiktion. Det nødvendiggør en opdatering af Safesprings tidligere anbefalinger.

Nærværende dokument gennemgår Schrems II-afgørelsen (del I), markedsstrukturen for cloudtjenester og samspillet mellem tekniske krav og jura (del II), forskellige svenske aktørers rolle i den videre udvikling af denne markedsstruktur og særligt behovet for koordinering af indsatser på statsligt niveau (del III) samt en kort beskrivelse af vejen frem (del IV). I del II og IV videreudvikles Safesprings tidligere anbefalinger for organisationers egne aktiviteter i lyset af den nye retlige situation. Del III giver organisationer bedre forudsætninger for at stille de rette krav til den statslige koordinering.

## Del I - Indledning <br> Yderligere præcisering af regler for dataoverførsler

{{< ingress >}}
Den 16. juli 2020 afsagde EU-Domstolen dom i sag C-311/18, ofte benævnt ”Schrems II”.
{{< /ingress >}}

Den 16. juli 2020 afsagde EU-Domstolen dom i sag C-311/18[^1], ofte benævnt ”Schrems II”, vedrørende de europæiske konstitutionelle princippers forenelighed med det, som indtil afgørelsen havde været politisk accepterede normer for dataoverførsler til tredjelandet USA. Overordnet bekræftede dommen, hvad EU-Domstolen allerede i en række afgørelser siden Lissabontraktatens ikrafttræden i 2009 har gjort klart: databeskyttelse er et forfatningsretligt princip i EU-området (art. 8 i Den Europæiske Unions charter om grundlæggende rettigheder), og præciseringen af reglerne for opretholdelse af dette forfatningsretlige princip i eksempelvis databeskyttelsesforordningen (DSF) undergraver ikke dette forfatningsretlige princip.

I Schrems II konkretiseres det, at disse forfatningsretlige normer indebærer, at visse dele af amerikansk efterretnings- og sikkerhedslovgivning forhindrer virksomheder, der er underlagt forpligtelser i henhold til denne lovgivning, i at blive anset som sikre modtagere af data i EU-retlig forstand. EU-Domstolen minder også europæiske politikere om, at de administrative dataoverførselsafgørelser, som EU-Kommissionen kan træffe efter DSF art. 45, og overførselsaftaler efter DSF art. 46 og 49, ikke kan anvendes til at tilsidesætte de europæiske forfatningsretlige principper om databeskyttelse.

Dommen har konsekvenser for virksomheder og myndigheder, der behandler europæiske borgeres personoplysninger, idet rummet for aftaler og samarbejde med aktører, som risikerer at være underlagt forpligtelser efter amerikansk lovgivning om dataudlevering til myndigheder, nu er kraftigt begrænset.

{{% accordion title="Hvad er en tilstrækkelighedsafgørelse?" %}}
Tilstrækkelighedsafgørelse, dvs. en afgørelse om tilstrækkeligt beskyttelsesniveau, indebærer, at EU-Kommissionen beslutter, at et tredjeland har sådanne normer, der beskytter europæiske borgeres rettigheder. En tilstrækkelighedsafgørelse er ikke en aftale i egentlig forstand, men en ensidig bekendtgørelse fra EU-Kommissionens side.

EU-Kommissionen træffer dog i praksis ikke afgørelser på egen hånd, men får støtte fra det udvalg af medlemsstatsrepræsentanter, som er etableret i DSF art. 93. EU-Kommissionens afgørelser forudgås ofte af forhandlinger med tredjelandet.
{{% /accordion %}}

{{% accordion title="Hvad er en overførselsaftale?" %}}
Aftaler om dataoverførsel kan have form af standardiserede databeskyttelsesbestemmelser (DSF art. 46, stk. 2), databehandleraftaler (DSF art. 46, stk. 3) eller aftaler mellem erhvervsdrivende og enkeltperson (DSF art. 49).

Standardiserede databeskyttelsesbestemmelser skal indebære et i det væsentlige tilsvarende beskyttelsesniveau som den nationale europæiske lovgivning.
{{% /accordion %}}

### EU-Domstolens afgørelse

EU-Domstolen har særligt besluttet

- At tredjelandes sikkerhedslovgivning ikke påvirker anvendelsen af europæiske rettigheder for borgere, selv om den europæiske borger interagerer med erhvervsdrivende fra tredjelandet (C-311/18, præmis 89).
- At kravet om et i det væsentlige tilsvarende beskyttelsesniveau for europæiske borgeres rettigheder ved dataoverførsler ikke påvirkes af den specifikke mekanisme for overførslen (C-311/18, præmis 92).
- At ”beskyttelsesniveauet” for personoplysninger skal være i det væsentlige tilsvarende det, som etableres i EU-retten, uden hensyn til særlige nationale bestemmelser i enkelte EU-lande (C-311/18, præmis 101 og 103).
- At tredjelandes myndigheders muligheder for at skaffe sig adgang til oplysninger påvirker beskyttelsesniveauet (C-311/18, præmis 103).
- At tilsynsmyndigheder har pligt til at gribe ind, når et i det væsentlige tilsvarende beskyttelsesniveau ikke kan fastslås, særligt når der mangler en tilstrækkelighedsafgørelse (C-311/18, præmis 120-121).
- At en afgørelse fra EU-Kommissionen om standardkontraktbestemmelser ikke påvirker forpligtelser for dataansvarlige og modtagere af personoplysninger til at afbryde overførsler, hvis det viser sig, at det beskyttelsesniveau, som klausulerne forudsætter, ikke kan realiseres (C-311/18, præmis 142).
- At EU-Kommissionens tilstrækkelighedsafgørelse ”Privacy Shield” er ugyldig (C-311/18, præmis 201).

Overordnet har EU-Domstolen bekræftet de konklusioner, som allerede fremgik af Safesprings white paper ”Hur du hanterar det osäkra läget i och med CLOUD Act och GDPR” fra 2018. Mens det økonomiske pres fra yderligere spændinger mellem USA og EU i databeskyttelsesspørgsmål hverken er blevet afhjulpet af de politiske reaktioner på Schrems I eller den nu afsagte Schrems II-afgørelse, er den retlige situation nu klarere.

Med Schrems II-afgørelsen er det blevet tydeligere, at problemet ikke først og fremmest er, hvor data som sådan lagres, men hvor den aktør er placeret, som lagrer dataene. De rettigheder, der kodificeres i EU-retten, beskytter fysiske personer, og de forpligtelser til at opretholde disse rettigheder, som kodificeres i EU-retten, retter sig mod fysiske og juridiske personer. Hvis tredjelands lovgivning gælder over for en fysisk eller juridisk person på en sådan måde, at denne forhindres i at opfylde forpligtelser vedrørende grundlæggende rettigheder for en fysisk person, er dette i princippet en væsentlig hindring for samarbejde med denne fysiske eller juridiske person.

Dommen aktualiserer igen Safesprings anbefalinger til organisationer vedrørende cloudtjenester[^2]. Men organisationer skal ikke blot sikre, at de har en grundig retlig analyse af datakataloger og retlige grundlag for behandling og overførsel af personoplysninger, men bør også sikre, at de tjenester, de anvender, bruger åbent specificerede protokoller og er teknisk konstrueret med henblik på at muliggøre eventuelle fremtidige leverandørskift. Ved investering i eller brug af cloudtjenester, som i et eller andet markedsled kan komme til at berøre (europæiske) myndigheders behandling af personoplysninger, synes samarbejde med amerikanske virksomheder i princippet udelukket, så længe USA ikke ændrer sin nationale lovgivning til fordel for europæiske retsubjekter.

Denne sidste betingelse bliver særlig interessant i den af EU-Kommissionen annoncerede proces om at indlede samtaler om en ny tilstrækkelighedsafgørelse[^3].

## Del II – Skyen, lokal infrastruktur med lokal tilpasning

{{< ingress >}}
Cloudtjenester har medført store muligheder for organisationer for at effektivisere og automatisere deres arbejde.
{{< /ingress >}}

Det er især gennem stordriftsfordele, at cloudtjenester bidrager til alt fra miljømæssig bæredygtighed til stærkere sikkerhedsarbejde, men også en øget evne til hurtigt at få adgang til enten datalagringskapacitet eller databehandlingskapacitet uden formaliserede udbud har bidraget til, at denne moderne form for IT-drift har gjort fremskridt ikke kun i den private sektor, men også i den offentlige[^4].

Fordelene ved en vis centralisering viser sig også i øget tilpasningsevne. Omkostninger til udvikling og vedligehold af grundfunktionaliteter kan fordeles på flere forskellige parter. Et antal globale konsortier er etableret de seneste 10 år med opdrag at vedligeholde og udvikle nyttige basisfunktioner ved håndtering af et stort antal servere[^5]. Opgaver, som i et mindre IT-system kan kræve mange manuelle timer, kan i stordriftsmiljøer automatiseres, og normalt tidskrævende og dyre opgaver som investeringer i realtidsovervågning af IT-miljøets sikkerhed eller afhjælpning af sikkerhedsbrister bliver lettere at motivere. Med sikre og optimerede basisfunktioner som fundament kan specialiserede tjenester bygges ovenpå og tilpasses efter den enkelte virksomheds særlige behov. Virksomheden kan støtte sig til et stabilt og solidt grundlag uden at skulle opbygge en hel IT-arkitektur fra bunden, hver gang et nyt koncept skal afprøves.

Den store interesse for cloudtjenester har gjort, at markedet hurtigt har udviklet sig til at omfatte en række forskellige tjenester med forskellige fordele for den indkøbende kunde. Forskellige grader af automatisering og stordrift kan tillades afhængigt af de specifikke krav, der gælder i den enkelte indkøbende organisation.

Betegnelsen cloudtjeneste omfatter således dels centraliseret håndtering af infrastruktur – virtualiserede servere med et operativsystem, som kunden selv kan disponere over og efter eget skøn tilføje og vedligeholde specifikke tjenester til specifikke formål (for eksempel databaser, webservere eller administrative systemer). Dels omfatter den formålsspecifikke systemer, hvor udbyderen af cloudtjenesten selv bidrager med databaseværktøjer og andre grundlæggende byggesten for mere specialiseret funktionalitet. Den mest synlige del af cloudmarkedet for en typisk slutbruger udgøres af sådanne tjenester, som allerede fra cloududbyderen er højt forædlede: centraliserede systemer til alt fra tekstredigering til vagtplanlægning og videokonferencer.

Cloudmarkedet har desuden udviklet sig således, at forskellige typer cloudtjenester samvirker med hinanden i B2B-relationer. En forædlet cloudtjeneste i form af et personallistesystem kan altså samvirke med en mere infrastrukturel cloudtjeneste, der stiller virtualiserede servere til rådighed. På den måde behøver en slutkunde kun at håndtere selve indtastningen og verifikationen af relevante oplysninger frem for vedligeholdelse og administration af kodebaser og underliggende operativsystemer. Det er også almindeligt, at både infrastrukturelle tjenester og forædlede tjenester leveres af den samme markedsaktør. Ligesom telemarkedet i 1980’erne var præget af vertikal integration, er cloudmarkedet i dag domineret af aktører med en høj grad af vertikal integration. Det betyder, at virksomhederne samtidig leverer både infrastruktur, platforme og software.

For indkøbende slutkunder skal fordele og ulemper ved vertikal integration overvejes nøje. I et vertikalt opsplittet marked, hvor mange forskellige virksomheder kan bidrage med nye funktionaliteter på hvert niveau i værdikæden, er der større plads til varieret og tilpasset tjenesteudbud. Desuden kommer store slutkunder i en bedre vidensposition over for leverandørerne. Ligesom vertikal opsplitning og konkurrence på telemarkedet åbnede for udvikling af nyskabende tjenester i 1990’erne, kan opsplitning og konkurrence på cloudmarkedet skabe plads til nyskabende tjenester i 2020’erne.

En vigtig forskel er, at cloudmarkedet allerede i høj grad tager udgangspunkt i grænseoverskridende og fælles, åbne kodebaser. Markedets oprindelse er global, ikke national, og en højere grad af vertikal opsplitning behøver ikke at indebære en højere grad af nationalisering. Det betyder, at både applikationer, regnekraft og data, der fødes ind i disse applikationer, er geografisk og organisatorisk mobile. Dataoverførsler er blevet almindelige både i grænseoverskridende forstand og i den forstand, at data overføres mellem organisationer, som hver især udfylder en egen rolle i leveringen af den endelige tjeneste.

Et tysk projekt, der forsøger at forene erfaringer fra teleindustrien med nytteværdierne fra cloudindustrien, er GAIA-X[^6], et rammeværk for omkostningsdeling mellem geografisk forbundne aktører, der leverer interoperable tjenester[^7]. I Frankrig har man i snart et årti understreget, at udbudsredskaber kan være særligt velegnede til at styrke europæiske småvirksomheders rolle i digitale økosystemer, med særlig vægt på netop løsninger for åbne data og cloudtjenester[^8].

### Med fleksibilitet følger øget ansvar

Anvendelse af cloudtjenester indebærer i praksis, at data, som en indkøbende organisation er ansvarlig for, og applikationer, der bruger sådanne data som input, vil befinde sig på infrastruktur, som ikke administreres af organisationen selv. Uanset hvilket forædlingsniveau organisationer vælger for deres cloudtjenester, afhænger mange af stordriftsfordelene af, at den faktiske administrator af cloudtjenestens infrastruktur har adgang til tilstrækkelig information om de data, der behandles, for at kunne stille de ressourcer til rådighed og sikre det sikkerhedsniveau, som kunden kræver. Det er i denne tekniske uundgåelighed, at forpligtelser for indkøbende organisationer opstår i forhold til EU-Domstolens Schrems II-afgørelse.

EU-Domstolens vurdering af grundlæggende rettigheder i EU-området skaber et krav til dataansvarlige organisationer om at skaffe sig overblik over hele værdikæden, også når man indkøber en specifik og afgrænset softwareapplikation, der blot skal opnå en afgrænset nytte i den egen virksomhed. Slutkunden bør ikke kun overveje fordelene ved den tjeneste, man indkøber, men også se på, hvordan denne tjenesteudbyder interagerer med underleverandører.

Allerede i den statslige udredning ”Den osynliga infrastrukturen” fra 2007 blev det observeret[^9], at ”IT-infrastruktur har den egenskab, at den er usynlig i de tilfælde, hvor standarder er på plads og er hensigtsmæssige. Først når standarder mangler, mærkes deres fravær og skaber problemer. IT-standarder er også i vid udstrækning usynlige i beslutningstagningen hos de ansvarlige for driften. Driftsbeslutninger, for eksempel om indkøb af e-tjenester, indebærer ofte også beslutninger om valg af standarder, men disse synes ikke at blive besluttet separat og udtrykkeligt, i hvert fald ikke på driftsansvarligt niveau, men bliver en uudtalt konsekvens af forskellige driftsbeslutninger.” En af følgerne af både DSF og Schrems II-afgørelsen bør være, at disse uudtalte konsekvenser i virkeligheden må gøres udtalte.

Databehandlere skal sikre, at eventuelle underdatabehandlere er underlagt de samme aftaleretlige forpligtelser over for de personer, hvis oplysninger behandles af en dataansvarlig, som databehandleren selv (DSF art. 28).

Det er dog den dataansvarlige, der i sidste ende skal sikre, at både databehandlere og underleverandører har mulighed for at opfylde de rette aftaleretlige garantier. Når enten en databehandler eller databehandlerens underleverandør er underlagt retlige forpligtelser i et tredjeland, mener EU-Domstolen, at den dataansvarlige har et omfattende ansvar for at sikre, at disse retlige forpligtelser ikke forringer europæiske borgeres databeskyttelse. EU-Domstolen anser endvidere, at den dataansvarliges forpligtelser ikke mindskes, blot fordi det ikke kan konstateres, at sådanne retlige forpligtelser faktisk realiseres på specifikke oplysninger, men at det er tilstrækkeligt, at en sådan retlig forpligtelse kan opstå (jf. C-311/18, præmis 142).

Safesprings tjekliste fra 2018 tager de spørgsmål op, som enhver organisation bør anvende ved valg af infrastruktur[^10]. I lyset af Schrems II-afgørelsen skal det i denne tjekliste præciseres, at cloudtjenesteudbydere, der er underlagt tredjelands lovgivning, bør have svært ved at opfylde EU-rettens krav. For særligt tredjelandet USA gælder, at den amerikanske lovgivning skal ændres, for at virksomheder, der er baseret i landet, kan være en databeskyttelsesretligt acceptabel modtager af oplysninger. Det er ikke længere tilstrækkeligt at holde styr på, hvilke (følsomme) personoplysninger der kan ende hos en udenlandsk myndighed, men risikoen for, at sådanne oplysninger kan kræves udleveret, skal nu aktivt forebygges.

Det indebærer i praksis, at indkøbende organisationer bør begrænse deres valg af tjenesteudbydere og underleverandører til sådanne leverandører, der er juridisk hjemmehørende et sted inden for EØS-området. Der kan også være behov for at sikre, at administration og vedligehold af IT-systemer ikke udføres af personer, der er aktive uden for EØS-området. At europæiske politikere og EU-Kommissionen to gange ikke har formået at formulere tilstrækkelighedsafgørelser med stærke nok garantier for databeskyttelse, bør også få indkøbende organisationer til at tøve med at stole på fremtidige tilstrækkelighedsafgørelser[^11]. I praksis har svenske politikere, trods begrænset retligt råderum til at omgå EU-Domstolen, alligevel hovedsageligt orienteret indsatserne mod forsøg på at bevare status quo[^12], med den følge at aktører, der følger politiske retningslinjer, risikerer at havne retligt forkert.

### Supplerende anbefalinger

Se den tidligere liste i Safespring, White paper: Hur du hanterar det osäkra läget i och med CLOUD Act och GDPR, 2018.

1. Kontrollér, om tjenesteudbydere i direkte nedadgående led bruger underleverandører i form af PaaS- eller SaaS-udbydere.
2. Kontrollér, om tjenesteudbyderen ved udformningen af sin tjeneste har anvendt åbent specificerede softwarefunktionaliteter (såsom API’er eller dataformater).
3. Verificér, at der findes aftaler mellem tjenesteudbyderen og underleverandøren, samt at aftalen er i overensstemmelse med de databeskyttelsesretlige krav.
4. Kontrollér, at underleverandøren stiller dokumentation til rådighed for de åbne standarder og specifikationer, underleverandøren har anvendt til sine infrastrukturløsninger. Kontrollér desuden, at tjenesteudbyderen har sikret sig mulighed for om nødvendigt at migrere til en anden underleverandør.
5. Kontrollér, om enten tjenesteudbyderen som sådan eller tjenesteudbyderens underleverandører har deres juridiske hjemsted i et tredjeland. Foretag en vurdering af, om dette indebærer en risiko for, at tredjelandets myndigheder kan pålægge enten underleverandøren eller tjenesteudbyderen at udlevere oplysninger til tredjelandets myndigheder.

### Åbenhed som værn mod politisk ustabilitet

Både på europæisk[^13] og svensk[^14] niveau er det blevet understreget, at et stærkere fokus på åbent tilgængelig programkode og åbne standarder skaber både indsigt og overskuelighed på den måde, som den europæiske databeskyttelsesret nu synes at kræve. Svenske myndigheder anbefales af Myndigheten för digitalisering at offentliggøre al egenproduceret kode under åbne softwarelicenser[^15].

Åbne standarder og åbne kodebaser er ikke anbefalinger, der udspringer af den europæiske databeskyttelsesret. Til gengæld skaber de større mobilitet for slutkunder mellem forskellige leverandører. Hvis infrastrukturen er åben og interoperabel, har slutkunden større frihed til at tilpasse sig eksempelvis domstolsafgørelser.

Selv om databeskyttelsesretten ikke som sådan foreskriver, at organisationer skal sikre mulighed for at skifte leverandør, synes praksisudviklingen inden for databeskyttelsesretten at være sådan, at organisationer muligvis selv kan have interesse i at investere i denne fleksibilitet.

Når det gælder dataoverførsler, har det politiske lederskab i Sverige og Europa eksempelvis ikke blot én, men to gange fejlkalibreret politiske beslutninger på en sådan måde, at EU-Domstolen har måttet underkende dem. For organisationer, der skal følge gældende ret, indebærer dette høje omkostninger, stor usikkerhed og tidsforbrug. Bevidste satsninger på åbne standarder og kode reducerer dog friktionen ved behov for forandring.

## Del III – Retlige rammer er et fælles ansvar

{{< ingress >}}
Hver enkelt organisation bør dog ikke tvinges til på egen hånd at opfinde måder at håndtere åbne standarder og databeskyttelsesret på.
{{< /ingress >}}

Når det gælder dataoverførsler og cloudtjenester, findes der en række svenske statslige aktører, hvis indsatser kan gøre det nemmere for andre at tilpasse sig EU-retten, samtidig med at et højt niveau af både grundlæggende stabilitet og applikationsstabilitet opnås i IT-systemerne.

For svenske organisationer vurderes det her, at følgende aktører bør opmuntres til at arbejde videre med IT-infrastrukturer og databeskyttelse:

1. Udredningen, der blev etableret ved kommissorium 2019:64, med tillægskommissorium 2020:73, bør ikke kun gives mere tid til at afslutte sit opdrag, men også få et væsentligt tydeligere mandat til at kigge på dataoverførsels-spørgsmål og åbne standarder.
   1. Opgavestilleren bør efterspørge en opfølgning på de konklusioner i SOU 2017:74, som indebar, at data, der lagres af teleoperatører, skal lagres i Sverige, sammenholdt med data, der lagres af andre aktører.
   2. Opgavestilleren bør også efterspørge en opfølgning på målsætningerne i SOU 2007:47 kap. 6 ud fra de seneste 15 års europæiske og svenske retlige udvikling, med hensyn til de institutionelle forudsætninger for interoperabel, lovlig og velfungerende teknisk infrastruktur, som foreslås der.
   3. Opgavestilleren bør efterspørge en sammenstilling af, hvordan andre EU-lande arbejder med dataoverførsler og cloudinfrastrukturer. Eksempelvis har Slovenien påbegyndt arbejdet med en regeringscloud[^16], og Frankrig har anlagt en udtalt strategi for ”digital suverænitet”[^17]. Disse tiltag bør kontrasteres og sammenlignes med de nuværende svenske strategier for IT-infrastruktur og cloudtjenester.
   4. Overordnet bør opgavestilleren præcisere, at udrederen ikke kun skal se på, hvordan allerede eksisterende aftaler mellem kommuner og virksomheder i tredjelande kan gøres lovlige, men give udrederen mandat til at foreslå veje frem, som rækker også ud over næste databeskyttelsesprøvelse i EU-Domstolen.
2. Det svenske Justitiedepartement har mulighed for at følge EU-Kommissionens forhandlinger med den amerikanske administration om en ny tilstrækkelighedsafgørelse gennem det såkaldte artikel 93-udvalg (som etableres i DSF art. 93). Forud for forhandlingerne om Privacy Shield oplyste Justitiedepartementet, at de primært havde haft skriftlig kontakt med den svenske virksomhed Ericsson[^18], og Sveriges regering pressede også på for en hurtig afgørelse, der ikke stillede ultimative krav til USA[^19]. Schrems II-afgørelsen viser, at denne tilgang lider af visse mangler, og et bredere input til Justitiedepartementet kunne vejlede regeringen til at søge mere stabile løsninger på dataoverførsels-spørgsmålene.
3. Datainspektionen bør få et skarpere mandat til at arbejde videre med tilsyn og forskrifter. I en udredning fra Statskontoret[^20] blev det sommeren 2020 påpeget, at myndigheden lider af en ”forsigtighedskultur”, som netop i tilfældet med cloudtjenester og dataoverførsler risikerer at forværre og forlænge den retlige usikkerhed. I SOU 2016:65 fremgår det, at Datainspektionen til tider også har haft problemer med at samvirke med andre myndigheder. Et eksplicit mandat til at føre tilsyn og samarbejde med andre myndigheder om særlige problemområder (såsom udbud, IT-infrastruktur og dataoverførsler) kunne give større tydelighed for flere aktører på det svenske marked.
4. Konkurrensverket bør få til opgave at følge op på den gennemlysning af ansvarsfordelingen mellem databehandlere og dataansvarlige, som Datainspektionen annoncerede i sin tilsynsplan 2019-2020[^21]. Særligt bør Konkurrensverket ud fra sit tilsynsmandat efter loven om offentlig indkøb se på, hvordan Datainspektionens konklusioner påvirker muligheder og udfordringer for indkøbere i den offentlige sektor, i forhold til de rammeaftaler[^22], som allerede findes tilgængelige fra Statens inköpscentral (Kammarkollegiet), eventuelt i samvirke med Datainspektionen.
5. Tillväxtverket bør få til opgave at undersøge svenske muligheder inden for rammerne af det tyske projekt GAIA-X[^23]. Mulige retninger for dette arbejde kan være at undersøge, om de forretningsmodeller, som foreslås af GAIA-X, er tilstrækkeligt fremtidstilpassede, eller i hvilken udstrækning GAIA-X kan indebære fordele for svenske cloud- og IT-aktører, som ikke kan opnås inden for rammerne af de private konsortier, der udvikler åbne cloudinfrastrukturer (f.eks. OSF)[^24] eller orkestreringsværktøjer (f.eks. CNCF)[^25]. Derudover ville en gennemlysning af svenske aktørers udbytte af det europæiske ISA2-projekt[^26] være velkommen, også med henblik på potentielle fremtidsmuligheder for svensk industri.

Det statslige IT-arbejde har behov for struktur og målrettethed, og forskellige myndigheders opdrag og styrker behøver at blive koordineret for et enhedligt udfald. Rammerne for mulige udfald er i et vist omfang allerede forudbestemt af den EU-retlige koordinering, som Sverige har underlagt sig gennem medlemskabet af Unionen. Regeringens muligheder for at bistå svenske organisationer med passende støtte i disse spørgsmål er også i høj grad afhængig af de samme organisationers evne til tydeligt at kommunikere deres problemer til relevante beslutningstagere på nationalt niveau. Schrems II-afgørelsen bør ses som en mulighed for hurtigere at opnå en høj grad af klarhed, i stedet for som en hindring.

## Del IV – Veje frem

{{< ingress >}}
Organisationer i Sverige er på nuværende tidspunkt sandsynligvis forhindret i at vælge cloudtjenester, der er underlagt amerikansk lovgivning, ved udbud.
{{< /ingress >}}

Årsagen hertil findes i amerikansk lovgivning om efterretningsvirksomhed, men også i CLOUD Act, som Safespring allerede i tidligere white papers har behandlet. På denne baggrund bør organisationer – ud over at følge Safesprings allerede eksisterende anbefalinger og de forstærkninger, der er nævnt ovenfor –:

- Udarbejde en plan for at migrere væk fra cloudtjenester, der er underlagt amerikansk lovgivning[^27].
- Gennemgå, hvordan egen organisation allerede arbejder med eksisterende retningslinjer fra Statens inköpscentral, eSam og ISA2 (for eksempel ved at evaluere eksisterende projekter ud fra allerede eksisterende anbefalinger).
- Engagere regeringen aktivt i udviklingen af en svensk plan for cloudtjenester, der er forenelige med europæisk ret.

## Kildehenvisninger

{{< ingress >}}
Dette white paper er skrevet af Amelia Andersdotter. Safespring tilbyder svenskproducerede cloudtjenester.
{{< /ingress >}}

{{< accordion-script >}}

[^1]: ECLI:EU:C:2020:559

[^2]: Safespring, White paper: Sådan håndterer du den usikre situation i og med CLOUD Act og GDPR, 2018

[^3]: [EU-Kommissionen, 10. august 2020, Joint Press Statement from European Commissioner for Justice Didier Reynders and U.S. Secretary of Commerce Wilbur Ross](https://ec.europa.eu/info/news/joint-press-statement-european-commissioner-justice-didier-reynders-and-us-secretary-commerce-wilbur-ross-7-august-2020-2020-aug-07_en)

[^4]: Statens servicecenter, En fælles statslig cloudtjeneste til myndighedernes it-drift, delrapport 2017.

[^5]: Jf. OpenStack Foundation (OSF) og Cloud Native Computing Foundation (CNCF).

[^6]: [GAIA-X: a federated data infrastructure for Europe](https://www.data-infrastructure.eu/GAIAX/Navigation/EN/Home/home.html)

[^7]: Interoperabilitet: samvirke mellem forskellige komponenter. Se også SOU 2007:47, s. 133 ff.

[^8]: Rapport d’Information No 443, Union européenne -- colonie du monde numérique ?, 20 mars 2013, s. 115-116.

[^9]: SOU 2007:47, Den osynliga infrastrukturen, s. 64.

[^10]: Jf. ovenfor fodnote 2.

[^11]: Både Safe Harbor-afgørelsen fra 2001 og Privacy Shield-afgørelsen fra 2016 er fundet ugyldige af EU-Domstolen.

[^12]: Jf. kommittédirektiv 2019:64 med tillæg i dir. 2020:73.

[^13]: C(2018) 7118, European Commission Digital Strategy - A digitally transformed, user-focused and data-driven Commission, 2018.

[^14]: E-delegationen, Vejledning for digitalt samvirke, Version 4.1, 2015-05-28.

[^15]: DIGG, 2019-136, Politik for udvikling af software.

[^16]: [Slovenian State Cloud DRO](https://nio.gov.si/nio/asset/drzavni+racunalniski+oblak+dro?lang=en)

[^17]: Se ovenfor, fodnote 8.

[^18]: Ifølge grundlagsenhedens diarium, efterspurgt efteråret 2016 af forfatteren.

[^19]: Justitiedepartementets instruktion forud for møde i udvalget for beskyttelse af enkeltpersoner med hensyn til behandling af personoplysninger af 20-06-2016.

[^20]: Statskontoret 2020:14, Myndighedsanalyse af Datainspektionen.

[^21]: Datainspektionen DI-2019-841, 15. marts 2019.

[^22]: [Kammarkollegiet, Statens inköpscentral, rammeaftaler på IT- og teleområdet](https://www.avropa.se/ramavtal/ramavtalsomraden/it-och-telekom/)

[^23]: Se ovenfor fodnote 6.

[^24]: [Open Stack Foundation](https://osf.dev)

[^25]: [Cloud Native Computing Foundation (Linux Foundation)](https://cncf.io)

[^26]: [Europa-Kommissionen, Interoperabilitetsløsninger for offentlige forvaltninger, virksomheder og borgere](https://ec.europa.eu/isa2/)

[^27]: Spørgsmål 5 i del II vil i princippet altid skulle besvares bekræftende ved anvendelse af amerikanske