---
title: "Läget efter EU-US Data Protection Framework (DPF)"
section: "White Paper"
language: "Se"
date: "2024-03-13"
intro: "Med anledning av EU-kommissionens senaste beslut om dataöverföringar till amerikanska molntjänst­leverantörer i juli 2023 finns anledning att återigen se över de förändrade omständigheterna."
draft: false
tags: ["Svenska"]
author: "Amelia Andersdotter"
dokumentnamn: ""
socialmediabild: ""
sidebarlinkname: ""
sidebarlinkicon: ""
sidebarlinkurl: ""
card: ""
eventbild: ""
socialmediabild: ""
toc: "Innehåll"
---

{{< ingress >}}
I två tidigare white papers, 2018<sup>1</sup> och 2020<sup>2</sup>, har Safespring gått igenom det rättsliga och tekniska läget för organisationer som planerar sin IT-infrastruktur. 
{{< /ingress >}}

Med anledning av EU-kommissionens senaste beslut om dataöverföringar till amerikanska molnleverantörer i juli 2023 [<sup>3</sup>](#källförteckning) finns anledning att återigen se över de förändrade omständigheterna.

I huvudsak förblir rekommendationerna samma. Vi har i vissa delar uppdaterat språket och tagit bort rekommendationer som hänvisar till gamla dataöverförings­beslut. Infrastruktur­planering är ingen ny aktivitet; grundstenarna i det som utgör ett ansvarsfullt grepp om infrastruktur för en överskådlig tid framöver är desamma idag som för femtio år sedan, eller trettio eller fem. Det handlar om att ge sin verksamhet möjligheter att undvika inlåsningar till enskilda leverantörer, att kunna förutsäga och i bästa fall minimera kostnader och underhållskostnader. Både den enskilda verksamheten, Sverige och Europa behöver i ökad utsträckning verka för rådighet över de delar av infrastrukturen som ska vara stabila och fungera, och de delar som ska möjliggöra flexiblitet, förändring och innovation.

{{< quote "Amelia Andersdotter" >}}

Som anmärkts av andra än Safespring finns egentligen få anledningar att tro att förändringarna i nya data­överförings­beslutet innebär “väsentligen samma skydd” som europeisk rätt.

{{< /quote >}}

## Bakgrund 
### Europeiska dataöverförings­beslut

Den 10 juli 2023 offentliggjorde EU-kommissionen sitt senaste beslut med avseende på rättslig säkerhet vid överföring av personuppgifter till aktörer som lyder under amerikansk rätt: EU-US Data Protection Framework (DPF). Detta är en uppföljare till besluten Safe Harbor och Privacy Shield som tidigare förklarats ogiltiga av EU-domstolen. Till grund för EU-US DPF ligger förhandlingar mellan EU:s medlemsländer och EU-kommissionen, å ena sidan, och EU-kommissionen och federala myndigheter i USA, å andra sidan. Förhandlingarna har resulterat i en överenskommelse mellan USA och EU som ligger i ett appendix till beslutet.

Bland nyheterna i EU-US DPF ingår därför hänvisningar till viktiga begrepp i europeisk dataskyddsrätt: proportionalitet,[<sup>4</sup>](#källförteckning) nödvändighet[<sup>5</sup>](#källförteckning) och berättigade intressen[<sup>6</sup>](#källförteckning). Den tidigare ombudsmanna­funktionen har delats upp i nya funktioner: en Civil Liberties Protection Officer[<sup>7</sup>](#källförteckning) och en Data Protection Review Court[<sup>8</sup>](#källförteckning). 

Som anmärkts av andra än Safespring finns egentligen få anledningar att tro att dessa förändringar innebär "väsentligen samma skydd"[<sup>9</sup>](#källförteckning). Proportionalitet, nödvändighet och berättigade intressen är inte absoluta, utan relativa begrepp. Om utgångspunkten är att amerikanska säkerhetsintressen, till exempel sådant som riskerar att påverka amerikansk ekonomi, amerikanska företag eller amerikanska medborgare, står överordnade andra intressen, kan det vara både nödvändigt och proportionerligt att inskränka europeiska medborgares rättigheter enligt amerikansk rätt.

EU-domstolens invändning mot den tidigare ombudsmanna­funktionen var inte heller grundad i att titeln ombudsman är felaktig, utan i de befogenheter ombudsmannen tilldelats. Domstolsfunktionen ses inte av EU-domstolens som en förvaltnings­myndighet vars uppdrag flexibelt kan styras utifrån politiska direktiv, utan som en egen och separat funktion friställd från övriga politiskt styrda verksamheter. Även Europeiska dataskydds­ombudsmannen, EDPS, har i ett avgörande mot EU-kommissionen fastslagit att man, utifrån EU-domstolens avgöranden, måste slutleda att bara europeiska myndigheter får bemäktigas göra hemliga anspråk på tillgång till skyddad data.[<sup>10</sup>](#källförteckning)

Utifrån det perspektivet kommer EU-domstolen vid en rättslig prövning sannolikt inte kunna göra något annat än att underkänna även EU-US DPF. Det behöver inte ta lång tid. Safe Harbor-beslutet underkändes efter 15 år, och Privacy Shield-beslutet efter fyra år. Nya rättsliga möjligheter för europeiska medborgare att försvara sina rättigheter i domstol har avsevärt kortat sträckan mellan förmodat olagligt beslut och rättslig prövning i EU-domstolen. Även om rättvisans kvarnar fortfarande mal långsamt, menar vi på Safespring att de inte längre kan förmodas mala långsammare än de tidshorisonter man bör planera sin IT-infrastruktur på.

### Svensk lagstiftning

Det är inte bara den europeiska rätten som spelar roll för svenska verksamheter som planerar sin IT-infrastruktur. Även svensk lagstiftning i form av säkerhetsskydd och offentlighets- och sekretess­lagstiftning spelar in. Det kan till exempel röra tolkningen av begrepp så som "att röja [en sekretessklassad uppgift]", "direktåtkomst", eller skillnaden mellan ett utlämnande och teknisk bearbetning. Idag är det oklart om och hur regeringen gör skillnad mellan den situation att olika myndigheter samarbetar om IT-drift (samordning) och att en enskild myndighet överlägger på en privat aktör att tillhandahålla IT-drift (utkontraktering).[<sup>11</sup>](#källförteckning)

Vid analyser av försörjningskedjor kan det uppstå frågor om utsträckningen i vilken man behöver säkerställa att underleverantörer av supporttjänster har eller har haft problematiska medborgarskap. Exempelvis då en balkansk service-tekniker i Tjeckien tillhandahåller systemadministrativa supporttjänster för ett myndighetssystem i Sverige[<sup>12</sup>](#källförteckning). I vissa fall blir kraven så strikta att en säkerhetsgranskning måste genomföras för all personal som hanterar IT-systemet där svenskt medborgarskap är ett krav för att alls få granskas.

Vid bedömningen av oklarheter kring tolkning av svensk lagstiftning behöver man ofta först ta reda på om man är samhällsviktig verksamhet i den mening som avses i svensk, nationell säkerhetspolitik[<sup>13</sup>](#källförteckning). Ett kommunalt elnät kan till exempel vara lokalt samhällsviktigt, men inte nationellt samhällsviktigt. En statlig myndighet kan i stället oftast presumeras vara nationellt samhällsviktig.

Den svenska lagstiftningens inverkan på infrastruktur­planering handlar framför allt om administrativ rådighet.

### Standardisering, öppen källkod och certifiering

En viktig utveckling i den europeiska rätten är att allt starkare tonvikt läggs vid industrinormer, standarder och certifieringar. Detta gäller exempelvis i NIS2-direktivet, men ännu tydligare i lagar som AI Act och Cyber Resilience Act.

Standardisering och certifiering inom IT-industrin är inget nytt. Apparater för generering av kryptografiska signaturer har till exempel standardiserats sedan 1990-talet. Tänk exempelvis bankdosor, kortläsare, chippen på biometriska pass och ID-kort, och dylika applikationer. Även för mjukvarukod finns kvalitetsstandarder: de så kallade Common Criteria och FIPS används i Nordamerika för att testa mjukvaru­implementationer av säkerhetsfunktioner. I EU finns inga dylika regionomfattande initiativ eller standarder.

Den vanligaste kritiken mot certifieringsprogram för mjukvarukod är att certifierings­cyklerna är långa och dyra för leverantörer att ta sig igenom. Det minskar incitamentet att upptäcka, analysera och åtgärda säkerhetsproblem efter att certifieringen är klar, trots att ingen befintlig certifiering garanterar felfria produkter (och det är i fallet mjukvarukod inte ens möjligt).

I allmänhet blir det allt vanligare att man inom en viss industri samarbetar kring gemensamt utvecklade, öppna applikations­gränssnitt (API:er). Exempelvis OpenRAN, som är en mängd gränssnitt för hantering av mobilnätsutrustning, består av öppen källkods­applikationer som var och en av mobilnätoperatörerna kan bidra till, ändra i sina egna nät, eller implementera "as is" för att säkerställa högsta nivå av interoperabilitet med andra mobilnät. Motsvarande gränssnittsmängder finns för molntjänster, hantering av sakernas internet, gränssnitt för elektronik i bilar, med många fler. Öppen källkod har blivit det snabbaste sättet att garantera största mängd digital samverkan.

Att koden är öppen minskar möjligheterna för leverantörer och implementatörer att dölja säkerhetsfel som upptäcks efter eventuell certifiering. Det skapar också möjlighet för samhällelig styrning av resurser som går in i de konsortier som ansvarar för gränssnitts­utvecklingen. Hur exakt styrningen kommer utvecklas återstår att se, men som synes finns både säkerhetsskäl och samverkansskäl att orientera sig mot öppen källkodslösningar.

 
## Rekommendationer

### Etablera den tidshorisont ni vill jobba på
- Bestäm på vilken tidshorisont ni planerar er infrastruktur och hur ofta ni vill eftersöka och upphandla nya tjänster. Jämför denna tidshorisont med hur snabbt rättsläget, teknikläget och er organisation i övrigt kan förändras.
- Gör en analys av förändringstakten för avtalsvillkor och vilket inflytande ni kan utöva överdenna. Det kan exempelvis röra villkor om prissättning och tjänstetillgång. Notera: Vid användning av leverantörers standardavtal är det vanligare att villkoren kan förändras även vid passivt medgivande av kunden. Att inte godta standardavtals­förändringar är i dessa situationer likställt med att påbörja ett migrationsprojekt.
- Testa och modellera olika scenarier. Sätt siffror på era sannolikhets­bedömningar och konsekvensanalyser. Exempel: Om det till exempel antas vara 20% risk för ett fullt stopp avöverföring av personuppgifter till amerikanska tjänster under 12 månader med start om 9 månader, hur skulle detta påverka verksamheten och beslutsprocessen kring IT-strategi gällande val av leverantörer?

### Skapa förutsättningar för enkel migration.
- Att bygga sin miljö med containrar (t ex Kubernetes eller Docker) underlättar migration av utvecklings- och produktionsmiljöer mellan leverantörer i förhållande till virtuella servrar eller fysiska servrar.
- Räkna på hur dataöverförings­kostnaderna skulle slå den dagen ni vill flytta ut. Många molntjänst­leverantörer tar inte betalt för att lägga upp data. Desto fler tar betalt av kunderna för att hämta hem data. Notera: Detta kallas ofta för ingress (ladda upp) och egress (hämta hem).
- Separera data från tjänster med öppna (eller standardiserade) gränssnitt för enklare kunna byta datalagrings­plattform. Fallgrop: Amazons S3-protokoll är en de facto-standard för storskalig lagring av ostruktuerad data i molnet. Dessvärre går det inte alltid att digitalt samverka med samtliga funktionaliteter Amazon bygger in i sin version av S3. Om du ska använda S3 bör du se till att bara använda sådana funktionaliteter som går att införliva även i en generisk S3-leverantörs tjänster.
- Investera i egen identitetshantering istället för att lita på molntjänst-leverantörens. Startsträckan blir lite längre men migration blir mycket enklare.
- Säkerställ att tjänsteleverantören vid utformingen av sin tjänst använt öppet specificerade mjukvaru­funktionaliteter (som API:er eller dataformat).

### Personuppgiftsskydd
- Gör grundarbetet med GDPR kring hantering av personuppgifter. Se över:
    - var ni geografiskt lagrar era personuppgifter,
    - vad ni har för rättslig grund för behandlingen, 
    - hur känsliga personuppgifter det är som behandlas,
    - om det finns någon gallringsrutin implementerad,
    - hur ni informerar privatpersoner om behandlingen, och
    - om personuppgifterna lagras utanför EU/EES, vilken rättslig grund ni har för överföringen dit.
{{< note "Gallring" >}}<p>Gallringsrutiner är särskilt viktiga om uppgifterna lagras i USA eftersom organisationer då minskar mängden uppgifter som skulle kunna komma att behöva lämnas ut.</p>{{< /note >}}
- Bedöm säkerhetsklassningen av den datan som behandlas inom organisationen. Denna bedömning är nödvändig för att kunna göra korrekt lämplighets- och riskanalys kring användandet av olika molntjänster. 
    - Är det känsliga personuppgifter? 
    - Offentliga uppgifter? 
    - Privat kommunikation? 

### Säkerhet
- Kommer er verksamhet träffas av krav på säkerhetsstandarder? I sådana fall, vilka?
    - Hur kommer ni verifiera leverantörer? 
    - Vilka certifikat kommer ni vilja godkänna?
    - Kommer ni kunna samarbeta med andra vid utvärdering av certifikat?
    - Hur ska ni bevaka utveckling som sker efter certifikatens utfärdande?
- Hur ska ni hantera löpande säkerhets­uppdateringar?

### Hantering av försörjningskedjan
- Ha koll på hela värdekedjan:
    - Kontrollera ifall tjänsteleverantörer i rakt nedstigande led använder underleverantörer i form av PaaS eller SaaS-tillhandahållare.
    - Verifiera att det finns avtal mellan tjänsteleverantören och underleverantören, samt att avtalet överensstämmer med de dataskyddsrättsliga kraven.
    - Kontrollera ifall antingen tjänsteleverantören som sådan eller tjänsteleverantörens underleverantörer har sin legala hemvist i tredjeland. Gör en bedömning av om detta riskerar innebära att tredjelandets myndigheter kan ålägga antingen underleverantören eller tjänsteleverantören att överlämna uppgifter till tredjelandets myndigheter.

## Källförteckning

1. Safespring. (2018). *Cloud Act White Paper*. Hämtad från [https://www.safespring.com](https://www.safespring.com/whitepaper/cloudact/)
2. Safespring. (2020). *Schrems II White Paper*. Hämtad från [https://www.safespring.com](https://www.safespring.com/whitepaper/schrems-ii/)
3. Europeiska kommissionen. (2023). *C(2023) 4745 final*. Hämtad från [https://commission.europa.eu](https://commission.europa.eu/system/files/2023-07/Adequacy%20decision%20EU-US%20Data%20Privacy%20Framework_en.pdf)
4. Europeiska kommissionen. (2023). *C(2023) 4745 final, Rec. 131*. Europeiska unionens stadga för grundläggande rättigheter, Artikel 52.1.
5. Europeiska kommissionen. (2023). *C(2023) 4745 final, Rec. 138*. Europeiska unionens stadga för grundläggande rättigheter, Artikel 52.1.
6. Europeiska kommissionen. (2023). *C(2023) 4745 final, Rec. 134-135*. Dataskyddsförordningen (GDPR), 679/2016, Artikel 6.1.f.
7. Europeiska kommissionen. (2023). *C(2023) 4745 final, Rec. 126*.
8. Europeiska kommissionen. (2023). *C(2023) 4745 final, Rec. 184*.
9. noyb. (2023, 10 juli). *European Commission gives EU-US data transfers third round at CJEU*. Hämtad från [https://noyb.eu](https://noyb.eu/en/european-commission-gives-eu-us-data-transfers-third-round-cjeu)
10. Europeiska dataskyddsombudsmannen. (2024). *EDPS/2024/05*. European Commission’s use of Microsoft 365 infringes data protection law for EU institutions and bodies. Hämtad från [https://www.edps.europa.eu](https://www.edps.europa.eu/system/files/2024-03/EDPS-2024-05-European-Commission_s-use-of-M365-infringes-data-protection-rules-for-EU-institutions-and-bodies_EN.pdf)
11. Se till exempel Regeringens proposition 2022/23:97. (2023). *Sekretessgenombrott vid utlämnande för teknisk bearbetning eller teknisk lagring av uppgifter.* Stockholm: Finansdepartementet.
12. Jämför Transportstyrelsens datasäkerhetsskandal sommaren 2017.
13. Myndigheten för samhällsskydd och beredskap. (n.d.). *MSB1408: Metod för identifiering av samhällsviktig verksamhet*.