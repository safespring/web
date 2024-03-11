---
title: "Läget efter EU-US DPF"
section: "White Paper"
language: "Se"
date: "2024-03-05"
intro: "Med anledning av EU-kommissionen senaste beslut om dataöverföringar till amerikanska molnleverantörer i juli 2023  finns anledning att återigen se över de förändrade omständigheterna."
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
aliases:
    - /whitepapers/cloudact
    - /cloudact
toc: "Innehåll"
---

{{% ingress %}}
I två tidigare white papers, 2018<sup>1</sup> och 2020<sup>2</sup>,  har Safespring gått igenom det rättsliga och tekniska läget för organisationer som planerar sin IT-infrastruktur. 
{{% /ingress %}}

Med anledning av EU-kommissionen senaste beslut om dataöverföringar till amerikanska molnleverantörer i juli 2023[<sup>3</sup>](#källförteckning) finns anledning att återigen se över de förändrade omständigheterna.

I huvudsak förblir rekommendationerna samma. Vi har i vissa delar uppdaterat språket och tagit bort rekommendationer som hänvisar till gamla dataöverföringsbeslut. Infrastrukturplanering är dock ingen ny aktivitet som sådan: grundstenarna i det som utgör ett ansvarsfullt grepp om infrastruktur för en överskådlig tid framöver är desamma idag som för femtio år sedan, eller trettio eller fem. Det handlar om att ge sin verksamhet möjligheter att undvika inlåsningar till enskilda leverantörer, att kunna förutsäga och i bästa fall minimera kostnader och underhållskostnader. Både den enskilda verksamheten, Sverige och Europa behöver i ökad utsträckning verka för rådighet över de delar av infrastrukturen som ska vara stabila och fungera, och de delar som ska möjliggöra flexibilitet, förändring och innovation.

## Bakgrund
I detta avsnitt utforskar vi konsekvenserna av EU-kommissionens senaste beslut från juli 2023 gällande EU-US Data Protection Framework (DPF), ett viktigt steg efter tidigare avtal som Safe Harbor och Privacy Shield. Vi granskar dess inverkan på dataöverföringar till USA och dess betydelse för svenska verksamheters IT-infrastruktur och datahantering.

{{% quote "Amelia Andersdotter" %}}
"Som anmärkts av andra än Safespring finns egentligen få anledningar att tro att dessa förändringar innebär 'väsentligen samma skydd'. Proportionalitet, nödvändighet och berättigade intressen är inte absoluta, utan relativa begrepp."
{{% /quote %}}

### Dataöverföringsbeslut

Den 10 juli 2023 offentliggjorde EU-kommissionen sitt senaste beslut med avseende på rättslig säkerhet vid överföring av personuppgifter till aktörer som lyder under amerikansk rätt: EU-US Data Protection Framework (DPF). Detta är en uppföljare till besluten Safe Harbor och Privacy Shield som tidigare förklarats ogiltiga av EU-domstolen. Till grund för EU-US DPF ligger förhandlingar mellan EU:s medlemsländer och EU-kommissionen, å ena sidan, och EU-kommissionen och federala myndigheter i USA, å andra sidan. Förhandlingarna har resulterat i en överenskommelse mellan USA och EU som ligger i ett appendix till beslutet.

Bland nyheterna i EU-US DPF ingår därför hänvisningar till viktiga begrepp i europeisk dataskyddsrätt: proportionalitet[<sup>4</sup>](#källförteckning),  nödvändighet[<sup>5</sup>](#källförteckning)  och berättigade intressen[<sup>6</sup>](#källförteckning).  Den tidigare ombudsmannafunktionen har delats upp i nya funktioner: en Civil Liberties Protection Officer[<sup>7</sup>](#källförteckning)  och en Data Protection Review Court[<sup>8</sup>](#källförteckning). 

Som anmärkts av andra än Safespring finns egentligen få anledningar att tro att dessa förändringar innebär "väsentligen samma skydd"[<sup>9</sup>](#källförteckning).  Proportionalitet, nödvändighet och berättigade intressen är inte absoluta, utan relativa begrepp. Om utgångspunkten är att amerikanska säkerhetsintressen, till exempel sådant som riskerar att påverka amerikansk ekonomi, amerikanska företag eller amerikanska medborgare, står överordnade andra intressen, kan det vara både nödvändigt och proportionerligt att inskränka europeiska medborgares rättigheter enligt amerikansk rätt.

EU-domstolens invändning mot den tidigare ombudsmannafunktionen var inte heller grundad i att titeln ombudsman är felaktig, utan i de befogenheter ombudsmannen tilldelats. Domstolsfunktionen ses inte av EU-domstolens som en förvaltningsmyndighet vars uppdrag flexibelt kan styras utifrån politiska direktiv, utan som en egen och separat funktion friställd från övriga politiskt styrda verksamheter.

Utifrån det perspektivet kommer EU-domstolen vid en rättslig prövning sannolikt inte kunna göra något annat än att underkänna även EU-US DPF. Det behöver inte ta lång tid. Safe Harbor-beslutet underkändes efter 15 år, och Privacy Shield-beslutet efter 4 år. Nya rättsliga möjligheter för europeiska medborgare att försvara sina rättigheter i domstol har avsevärt kortat sträckan mellan förmodat olagligt beslut och rättslig prövning i EU-domstolen. Även om rättvisans kvarnar fortfarande mal långsamt, menar vi på Safespring att de inte längre kan förmodas mala långsammare än de tidshorisonter man bör planera sin IT-infrastruktur på.

### Lagar om IT-drift och infrastruktur

Det är inte bara den europeiska rätten som spelar roll för svenska verksamheter som planerar sin IT-infrastruktur. Även svensk lagstiftning i form av säkerhetsskydd och offentlighets- och sekretesslagstiftning spelar in. Det kan till exempel röra tolkningen av begrepp så som "att röja [en sekretessklassad uppgift]", "direktåtkomst", eller skillnaden mellan ett utlämnande och teknisk bearbetning. Idag är det oklart om och hur regeringen gör skillnad mellan den situation att olika myndigheter samarbetar om IT-drift (samordning) och att en enskild myndighet överlägger på en privat aktör att tillhandahålla IT-drift (utkontraktering)[<sup>10</sup>](#källförteckning). 

Vid analyser av försörjningskedjor kan det uppstå frågor om utsträckningen i vilken man behöver säkerställa att underleverantörer av supporttjänster har eller har haft problematiska medborgarskap. Exempelvis då en balkansk service-tekniker i Tjeckien tillhandahåller systemadministrativa supporttjänster för ett myndighetssystem i Sverige[<sup>11</sup>](#källförteckning).  I vissa fall blir kraven så strikta att en säkerhetsgranskning måste genomföras för all personal som hanterar IT-systemet där svenskt medborgarskap är ett krav för att alls få granskas.

I mångt om mycket handlar dessa frågor om administrativ rådighet. En svensk myndighet bör exempelvis inte teckna avtal som medför att konflikter med medborgare om myndighets maktutövande riskerar att behöva avgöras i en utländsk domstol (exempelvis då standardavtal preciserar att oklarheter kring tjänstens verkan ska avgöras där en privat leverantör har sin hemvist). För personer med svensk hemvist eller medborgarskap gäller att man enklare får tag på information om familjemedlemmar, tillgångar och/eller skulder, som kan vara nödvändiga vid bedömningen av en persons tillförlitlighet (säkerhetsgranskning).

Vid bedömningen av oklarheter kring tolkning av svensk lagstiftning behöver man ofta först ta reda på om man är samhällsviktig verksamhet i den mening som avses i svensk, nationell säkerhetspolitik[<sup>12</sup>](#källförteckning).  Ett kommunalt elnät kan till exempel vara lokalt samhällsviktigt, men inte nationellt samhällsviktigt. En statlig myndighet kan i stället oftast presumeras vara nationellt samhällsviktig.

## Effektivitet

Molntjänster bidrar till allt ifrån miljömässig hållbarhet till starkare säkerhetsarbete, samt ökad förmåga att snabbt få tillgång till antingen datalagringskapacitet eller databehandlingskapacitet utan formaliserade upphandlingar. Det är framför allt två egenskaper som utmärker molnet: en möjlighet att separera mjukvara som infrastruktur från mjukvara som tjänster, och renodling av kompetens kring driftsfunktioner.

Som Safespring tidigare redovisat finns ett stort antal resurser i Sverige kring IT-drift och infrastruktur[<sup>13</sup>](#källförteckning).  Sedan mer än 50 år tillbaka till tiden har man regelbundet arbetat med att beskriva och analysera marknadsstrukturer. Den senaste sådana kartläggningen på nationell nivå kallas IT-driftsutredningen[<sup>14</sup>](#källförteckning).,  dit Safespring tillsammans med en rad andra aktörer på svenska molnmarknaden lämnade ett yttrande[<sup>15</sup>](#källförteckning). 

Många IT-driftsfunktioner på infrastrukturnivån är samtidigt rutinartade och specialiserade. Det krävs en hög kunskapsnivå för att drifta IT på ett säkert, tillgängligt och motståndskraftigt sätt. Hanteringen av undantagsfall kan kräva ännu högre specialistkunskap och beredskap. En renodling av driftsuppdraget är det som skapar bäst förutsättningar för pålitliga, stabila och säkra system.

En annan typ av förmåga och specialistkunskap krävs i stället för att bygga de dynamiska tjänster som ligger närmast användare. Här handlar det om att kunna ta vara på möjligheter och gränssnitt som tillgängliggörs från den stabila grunden.

Ett enkelt sätt att för sig själv visualisera hur effektivitet tar sig olika uttryck för dessa olika sorters mjukvarubaserade tjänster är takten i vilken man vill och kan planera för att migrera från en tjänst till en annan. Infrastruktur får gärna vara stabil för en överskådlig tid, medan tjänster gärna får vara snabbt utbytbara.

## Samverkan

Separation av mjukvara som infrastruktur från mjukvara som tjänster är en sorts vertikal separation som skapar förutsättningar för flera konkurrensutsatta marknader där det tidigare kanske bara fanns en eller några stycken silo-artade lösningar. Men precis som den amerikanska leverantören av nätverksinfastruktur Cisco tidigare haft mer än 90% marknadsandelar på den globala marknaden för nätverksutrustning[<sup>16</sup>](#källförteckning) och det amerikanska företaget Microsoft har mer än 90% marknadsandelar på den globala marknaden för operativsystem till arbetsstationer[<sup>17</sup>](#källförteckning) kan det också innebära oerhört starka inlåsningseffekter på en eller båda av de nya marknadssegmenten. Ett sätt att motverka starka inlåsningar är att använda standarder som skapar digital samverkan (interoperabilitet).

Utredningen för datadelning observerade så sent som i december 2023 att det i Sverige oftast saknats strategier för att peka ut de standarder som hjälper verksamheter uppnå utstakade mål (exempelvis regelefterlevnad)[<sup>18</sup>](#källförteckning). Trots att frågan lyfts uttryckligen sedan åtminstone 2007[<sup>19</sup>](#källförteckning) har det som mest tillkommit riktlinjer[<sup>20, 21</sup>](#källförteckning).

I Sverige har det alltså varit upp till varje enskild verksamhet att välja hur man realiserar effektivitet och rådighet, samtidigt som det varit svårt att få konkret information om digital samverkan. Det gör att svenska verksamheter inte sällan drabbats av inlåsning i de facto-standarder: delvis eller mestadels öppet dokumenterade gränssnitt som handhas av en och bara en aktör. Amazons S3-protokoll är en de facto-standard för storskalig lagring av ostruktuerad data i molnet. Dessvärre går det inte alltid att digitalt samverka med samtliga funktionaliteter Amazon bygger in i sin version av S3. Amazons dominerande ställning på marknaden för molntjänster gör att konkurrenter behöver experimentera sig fram till en acceptabel nivå av samverkan genom så kallad reverse engineering.

## Rådighet

Med rådighet avses förmågan att förstå och bestämma vad som händer med de egna systemen, kostnaderna och avtalen. Rådighet kan konceptualiseras på olika sätt och på olika nivåer.

Rådighet kan avgränsas till den egna förmågan att utveckla, drifta eller användning av system. Idag saknar många svenska verksamheter rådighet på alla tre nivåer.

### Utveckling
I de industridrivna organen för standardisering av IT-infrastruktur har det idag uppstått två spår. Man gör åtskillnad mellan standardiserade funktioner som utformas som skriftliga dokument för implementation av var och en av tillverkarna efter eget tycke[<sup>22</sup>](#källförteckning) och mjukvaru-specificerade funktioner som i första hand tillhandahålls som kod och bara i andra hand som API-beskrivningar[<sup>23</sup>](#källförteckning). Exempel på denna moderna uppdelning är 5G-standarden i 3GPP som täcker radioantenner och chipfunktioner och 5G-funktionerna som införlivats i det mjukvarubaserade OpenRAN som körs ovanpå 3GPP-specificerad hårdvara.

Mjukvaruspecificerade funktionaliteter med API-beskrivningar utvecklas ofta i konsortier. De största konsortierna på marknaden idag är amerikanska eller baserade i USA. Det gör att rådigheten över hur man driftar ett konsortium för mjukvaruspecificerade funktionaliter också är i huvudsak amerikansk.

### Drift
De största leverantörerna av IT-tjänster är idag amerikanska. Det innebär att möjligheterna att utveckla kompetenser för att samtidigt drifta en sammanhållen infrastruktur över mångfaldiga datacenter koncentrerats hos amerikanska aktörer. Europeiska aktörer har haft utmaningar med att utveckla samma rådighet av flera skäl.

I kontinentala Europa har många nuvarande molntjänsterleverantörer börjat som antingen teleoperatörer eller webbhostingföretag. De har gått från hårdvaruinfrastruktur till mjukvaruinfrastruktur. De amerikanska aktörerna har i stället ofta börjar med operativsystem eller webbtjänster. De har kommit från mjukvaruutveckling till mjukvaruinfrastruktur. Rådigheten som redan är fallet vid koordinering av utveckling av mjukvara spiller över på rådighet vid drift.

### Användning
De riktlinjer och försök till koordinering kring digital samverkan som hittills kommit på plats i Sverige har varit inspirerade av europeiska förlagor[<sup>24</sup>](#källförteckning) eller tvingande europeisk lagstiftning[<sup>26</sup>](#källförteckning) Enigheten bland svenska bibliotek kring implementation av dataformatet BIBFRAME[<sup>26</sup>](#källförteckning) har föregåtts av ett beslut i amerikanska kongressbiblioteket att implementera detta format. Sammantaget tyder inte detta på en innevarande svensk rådighet över de normer som blir gällande för svensk IT-infrastruktur.



## Rekommendationer

### Etablera den tidshorisont ni vill jobba på.
- Bestäm på vilken tidshorisont ni planerar er infrastruktur och hur ofta ni vill eftersöka och upphandla nya tjänster. Jämför denna tidshorisont med hur snabbt rättsläget, teknikläget och er organisation i övrigt kan förändras.
- Gör en analys av förändringstakten för avtalsvillkor och vilket inflytande ni kan utöva över denna. Det kan exempelvis röra villkor om prissättning och tjänstetillgång. Notera: Vid användning av leverantörers standardavtal är det vanligare att villkoren kan förändras även vid passivt medgivande av kunden. Att inte godta standardavtalsförändringar är i dessa situationer likställt med att påbörja ett migrationsprojekt.
- Testa och modellera olika scenarier. Sätt siffror på era sannolikhetsbedömningar och konsekvensanalyser. {{< note "Exempel på scenario" >}} Om det till exempel antas vara 20% risk för ett fullt stopp av överföring av personuppgifter till amerikanska tjänster under 12 månader med start om 9 månader, hur skulle detta påverka verksamheten och beslutsprocessen kring IT-strategi gällande val av leverantörer? {{< /note >}}

### Skapa förutsättningar för enkel migration.
- Att bygga sin miljö med containrar (t ex Kubernetes eller Docker) underlättar migration av utvecklings- och produktionsmiljöer mellan leverantörer i förhållande till virtuella servrar eller fysiska servrar.
- Räkna på hur dataöverförings¬kostnaderna skulle slå den dagen ni vill flytta ut. Många molntjänsteleverantörer tar inte betalt för att lägga upp data. Desto fler tar betalt av kunderna för att hämta hem data. Notera: Detta kallas ofta för ingress (ladda upp) och egress (hämta hem).
- Separera data från tjänster med öppna (eller standardiserade) gränssnitt för enklare kunna byta datalagringsplattform. Fallgrop: Amazons S3-protokoll är en de facto-standard för storskalig lagring av ostruktuerad data i molnet. Dessvärre går det inte alltid att digitalt samverka med samtliga funktionaliteter Amazon bygger in i sin version av S3. Om du ska använda S3 bör du se till att bara använda sådana funktionaliteter som går att införliva även i en generisk S3-leverantörs tjänster.
- Investera i egen identitetshantering istället för att lita på molntjänst-leverantörens. Startsträckan blir lite längre men migration blir mycket enklare.
- Säkerställ att tjänsteleverantören vid utformingen av sin tjänst använt öppet specificerade mjukvarufunktionaliteter (som API:er eller dataformat).

### Personuppgiftsskydd
- Gör grundarbetet med GDPR kring hantering av personuppgifter. Se över:
	- var ni geografiskt lagrar era personuppgifter,
	- vad ni har för rättslig grund för behandlingen,
	- hur känsliga personuppgifter det är som behandlas,
	- om det finns någon gallringsrutin implementerad,
	- hur ni informerar privatpersoner om behandlingen, och
    - om personuppgifterna lagras utanför EU/EES, vilken rättslig grund ni har för överföringen dit {{< note "Gallringsrutiner" >}}Gallringsrutiner är särskilt viktiga om uppgifterna lagras i USA eftersom organisationer då minskar mängden uppgifter som skulle kunna komma att behöva lämnas ut.{{< /note >}}
-  Bedöm säkerhetsklassningen av den datan som behandlas inom organisationen. Är det känsliga personuppgifter? Offentliga uppgifter? Privat kommunikation? Denna bedömning är nödvändig för att kunna göra korrekt lämplighets- och riskanalys kring användandet av olika molntjänster.

### Hantering av försörjningskedjan
- Ha koll på hela värdekedjan:
	- Kontrollera ifall tjänsteleverantörer i rakt nedstigande led använder underleverantörer i form av PaaS eller SaaS-tillhandahållare.
	- Verifiera att det finns avtal mellan tjänsteleverantören och underleverantören, samt att avtalet överensstämmer med de dataskyddsrättsliga kraven.
	- Kontrollera ifall antingen tjänsteleverantören som sådan eller tjänsteleverantörens underleverantörer har sin legala hemvist i tredjeland. Gör en bedömning av om detta riskerar innebära att tredjelandets myndigheter kan ålägga antingen underleverantören eller tjänsteleverantören att överlämna uppgifter till tredjelandets myndigheter.
- Ha redundans av leverantörer. Detta är särskilt viktigt för tjänster i riskzonen och gör det enklare att migrera om behovet eller viljan uppstår.
- Kontrollera att underleverantören tillhandahåller dokumentation kring de öppna standarder och specifikationer underleverantören använt för sina infrastrukturlösningar. Kontrollera vidare att tjänsteleverantören förvissat sig om att de har möjlighet att vid behov migrera till en annan underleverantör.

## Källförteckning

1. Safespring. (2018). *Cloud Act*. Hämtad från [https://www.safespring.com](https://www.safespring.com/whitepaper/cloudact/)
2. Safespring. (2020). *Schrems II*. Hämtad från [https://www.safespring.com](https://www.safespring.com/whitepaper/schrems-ii/)
3. Europeiska kommissionen. (2023). *Adequacy decision EU-US Data Privacy Framework*. C(2023) 4745 final. Hämtad från [https://commission.europa.eu](https://commission.europa.eu/system/files/2023-07/Adequacy%20decision%20EU-US%20Data%20Privacy%20Framework_en.pdf)
4. Europeiska unionens stadga för grundläggande rättigheter. (2023). Art. 52.1. I C(2023) 4745 final, Rec. 131.
5. Europeiska unionens stadga för grundläggande rättigheter. (2023). Art. 52.1. I C(2023) 4745 final, Rec. 138.
6. Dataskyddsförordningen. (2016). 679/2016 Art. 6.1.f. I C(2023) 4745 final, Rec. 134-135.
7. Europeiska unionens stadga för grundläggande rättigheter. (2023). Art. 52.1. I C(2023) 4745 final, Rec. 126.
8. Europeiska unionens stadga för grundläggande rättigheter. (2023). Art. 52.1. I C(2023) 4745 final, Rec. 184.
9. Noyb. (2023, 10 juli). *European Commission gives EU-US data transfers third round at CJEU*. Hämtad från [https://noyb.eu](https://noyb.eu/en/european-commission-gives-eu-us-data-transfers-third-round-cjeu)
10. Se t.ex. Proposition 2022/23:97 *Sekretessgenombrott vid utlämnande för teknisk bearbetning eller teknisk lagring av uppgifter*.
11. Transportstyrelseskandalen sommaren 2017.
12. Tom
13. Safespring. (2020). *Schrems II*. Hämtad från [https://www.safespring.com](https://www.safespring.com/whitepaper/schrems-ii/)
14. SOU 2021:97. *Säker och kostnadseffektiv IT-drift*.
15. Safespring, Binero, City Networks. (2022, 21 mars). *Remissvar: It-driftsutredningens slutbetänkande (SOU 2021:97)*.
16. Tom
17. Tom
18. SOU 2023:96. *En reform för datadelning*. sidan 95.
19. SOU 2007:47. *Den osynliga infrastrukturen*.
20. Webbriktlinjer från Myndigheten för digital förvaltning.
21. Svenskt ramverk för digital samverkan från Myndigheten för digital förvaltning.
22. Standardiseringsorgan som ISO/IEC, ETSI, IEEE LAN/MAN SC, 3GPP, IETF, W3C.
23. Konsortier som OpenRAN, Kubernetes Foundation, Linux Foundation, OpenStack Consortium.
24. Tom
25. Tom
26. LIBRIS. *Terminologi för BIBFRAME på svenska*. Hämtad från [https://libris.kb.se](https://libris.kb.se/katalogisering/help/terminology-bibframe-swedish) . Notera att föregångaren MARC21 hade samma framgång av samma skäl.
