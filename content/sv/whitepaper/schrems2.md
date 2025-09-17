---
ai: true
title: "EU-domstolens ogiltigförklaring av Privacy Shield"
date: "2020-09-04"
draft: false
author: ""
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_33-2.gif"
intro: "Villkor och rekommendationer för den offentliga sektorn och dess leverantörer"
sidebarlinkname: ""
Section: "Vitbok"
sidebarlinkicon: "fa-file-download"
card: "safespring_card_33.jpg"
eventbild: "safespring_background_33.jpg"
socialmediabild: "safespring_social_33-2.gif"
toc: "Innehållsförteckning"
language: "sv"
aliases:
  - /en/whitepaper/schrems2/
---
## Bakgrund

{{< ingress >}}
Våren 2018 publicerade Safespring en vitbok om konsekvenserna av EU:s allmänna dataskyddsförordning (GDPR)1 och den amerikanska CLOUD Act för upphandling av molntjänster.
{{< /ingress >}}

Safesprings vitbok mynnade ut i elva rekommendationer för organisationer som arbetar med molninfrastruktur kring dataskydd, datasäkerhet och jurisdiktionsfrågor. Genom en dom den 16 juli 2020 preciserade Europeiska unionens domstol ytterligare villkoren för överföring av EU-medborgares personuppgifter till amerikansk jurisdiktion. Detta har föranlett Safespring att uppdatera sina tidigare rekommendationer.

### Denna vitbok är indelad i tre delar

- {{< inline "Del I">}} Detta dokument går igenom Schrems II-domen,
- {{< inline "Del II">}} marknadsstrukturen för molntjänster och samspelet mellan tekniska krav och juridik,
- {{< inline "Del III">}} samt en skiss av vägen framåt.

Del II fördjupar Safesprings tidigare rekommendationer för organisationers arbete utifrån den nya rättsliga situationen.

Del III ger organisationer bättre förutsättningar att ställa lämpliga krav för statlig samordning.

## Del I - Introduktion <br> Ytterligare förtydligande av EU:s regler för dataöverföring

{{< ingress >}}
Den 16 juli 2020 meddelade Europeiska unionens domstol dom i mål C-311/18, vanligtvis kallat ”Schrems II”.
{{< /ingress >}}

Den 16 juli 2020 meddelade Europeiska unionens domstol dom i mål C-311/18,1. Målet kallas vanligtvis ”Schrems II” och rörde förenligheten mellan europeiska konstitutionella principer och vad som fram till domen var politiskt accepterade standarder för överföring av data till tredje land, USA. Domen bekräftade i huvudsak vad EU-domstolen redan klargjort i flera avgöranden efter att Lissabonfördraget trätt i kraft 2009: dataskydd är en konstitutionell princip inom EU (artikel 8 i Europeiska unionens stadga om de grundläggande rättigheterna) och preciseringen av regler för att upprätthålla denna konstitutionella princip, såsom i dataskyddsförordningen (GDPR), undergräver inte denna konstitutionella princip.

Schrems II förtydligar vidare att dessa övervägda normer innebär att vissa delar av amerikansk underrättelse- och säkerhetslagstiftning hindrar företag som omfattas av sådan lagstiftning från att anses som säkra mottagare av data i europeiskrättslig mening. EU-domstolen påminner också europeiska politiker om att företag inte kan använda de administrativa överföringsbeslut som Europeiska kommissionen kan fatta enligt artikel 45 i GDPR och överföringsavtal enligt artiklarna 46 och 49 i GDPR för att kringgå de europeiska konstitutionella principerna om dataskydd.

{{% accordion title= "Vad är ett beslut om adekvat skyddsnivå?" %}}

Överföringsbeslut, eller beslut om adekvat skyddsnivå, innebär att Europeiska kommissionen beslutar att standarderna i ett tredjeland är sådana att de skyddar europeiska medborgares rättigheter. Ett överföringsbeslut är inte ett avtal i egentlig mening utan ett ensidigt tillkännagivande från Europeiska kommissionen.

I praktiken fattar dock inte kommissionen beslut självständigt utan får stöd av kommittén med medlemsstaternas företrädare enligt artikel 93 i GDPR. Förhandlingar med tredjeland föregår ofta kommissionens beslut.

{{% /accordion %}}

{{% accordion title= "Vad är ett överföringsavtal?" %}}

Överföringsavtal kan ta formen av standardiserade avtalsklausuler (artikel 46.2 i GDPR), ett avtal om behandling av personuppgifter (artikel 46.3 i GDPR) eller ett avtal mellan en näringsidkare och en enskild (artikel 49 i GDPR).

Standardiserade dataskyddsbestämmelser måste ge ett materiellt likvärdigt skydd med den inhemska europeiska lagstiftningen.

{{% /accordion %}}

Domen får konsekvenser för företag och myndigheter som behandlar europeiska medborgares personuppgifter i den meningen att utrymmet nu är betydligt mer begränsat för avtal och samarbeten med aktörer som riskerar att omfattas av skyldigheter enligt amerikansk lagstiftning vad gäller utlämnande av data till myndigheter.

{{< inline "EU-domstolen">}} har uttryckligen slagit fast att:

- lagstiftning i tredje land om säkerhet inte påverkar tillämpningen av europeiska medborgares rättigheter, även om EU-medborgaren interagerar med näringsidkare från tredje land (punkt 89 i C-311/18);
- kravet på materiellt likvärdigt skydd för europeiska medborgares rättigheter vid dataöverföring inte påverkas av vilken särskild mekanism som används för överföringen (punkt 82 i C-311/18);
- ”skyddsnivån” för personuppgifter ska vara materiellt likvärdig den som gäller enligt EU-rätten, utan hänsyn till särskilda nationella bestämmelser i enskilda EU-länder (punkterna 101 och 103 i C-311/18);
- tredjelandsmyndigheters möjlighet att förvänta sig tillgång till data påverkar skyddsnivån (punkt 103 i C-311/18);
- tillsynsmyndigheter måste agera när materiellt likvärdigt skydd inte kan fastställas, särskilt när ett beslut om adekvat skyddsnivå saknas (punkterna 120 och 121 i C-311/18);
- ett beslut av Europeiska kommissionen om standardavtalsklausuler inte påverkar skyldigheterna för personuppgiftsansvariga och mottagare av personuppgifter att upphöra med överföringar om det skydd som klausulerna avser inte kan upprätthållas (punkt 142 i C-311/18); och
- Europeiska kommissionens överföringsbeslut ”Privacy Shield” är ogiltigt (punkt 201 i C-311/18).

I grunden bekräftar EU-domstolen de slutsatser som redan presenterades i Safesprings vitbok How to deal with the uncertainty surrounding the CLOUD Act and GDPR från 2018. Även om den ekonomiska stressen av fortsatt spänning mellan USA och EU i dataskyddsfrågor inte har lindrats av de politiska reaktionerna på vare sig Schrems I eller den nyligen tillkännagivna Schrems II-domen, är rättsläget nu mer preciserat.

Schrems II har tydliggjort att problemet inte ligger i var själva uppgifterna lagras utan var den aktör som lagrar uppgifterna är belägen. De rättigheter som är kodifierade i europeisk rätt skyddar fysiska personer, och skyldigheterna att upprätthålla dessa rättigheter gäller både fysiska och juridiska personer. Om lagstiftning i ett tredjeland gäller en fysisk eller juridisk person på ett sådant sätt att denne hindras från att uppfylla sina skyldigheter avseende en fysisk persons grundläggande rättigheter, utgör detta i princip ett betydande hinder för samarbete med den fysiska eller juridiska personen.

Domen bekräftar Safesprings rekommendationer för organisationer i fråga om molntjänster.2 Organisationer måste dock säkerställa att de har en grundlig rättslig analys av datakataloger och rättsliga grunder för behandling och överföring av personuppgifter, samt säkerställa att de tjänster de förlitar sig på använder offentligt specificerade protokoll och är tekniskt utformade för att möjliggöra ett eventuellt leverantörsbyte i framtiden. När det gäller investeringar i eller användning av molntjänster som i något skede kan påverka (europeiska) myndigheters behandling av personuppgifter, framstår samarbete med amerikanska företag i princip som uteslutet om inte USA ändrar sin nationella lagstiftning till förmån för europeiska juridiska personer.

Detta sista villkor blir särskilt intressant i den process som Europeiska kommissionen aviserat för att inleda samtal om ett nytt beslut om adekvat skyddsnivå.3

{{% accordion title= "Vad menas med leverantörens lokalisering?" %}}

Schrems II klargör att det är leverantörens lokalisering snarare än datats lokalisering som begränsar möjligheten till dataöverföring, särskilt till USA:s jurisdiktion. Skyddet för europeiska individer anses undergrävt eftersom myndigheter i tredje land kan ålägga tjänsteleverantörer i tredje land skyldigheter som gör att europeiska individer inte får ett materiellt likvärdigt skydd för sina uppgifter som de skulle ha inom EU:s gränser.

Dessa slutsatser är inte nya i europeisk rätt. I det kompletterande lagstiftningsarbetet SOU 2017:74 om datalagring för brottsbekämpande ändamål anges att datalagring enligt europeisk rättspraxis omfattas av lokaliseringskrav.

{{% /accordion %}}

## Del II - Molnet <br>Lokal infrastruktur med lokal anpassning

{{< ingress >}}
Molntjänster har erbjudit enorma möjligheter för organisationer att effektivisera och automatisera sitt arbete.
{{< /ingress >}}

Även om det främst är genom stordriftsfördelar som molntjänster bidrar till allt från miljömässig hållbarhet till förbättrade säkerhetsinsatser, har den stärkta förmågan att snabbt få tillgång till antingen lagringskapacitet eller beräkningskapacitet, utan formaliserade upphandlingsprocesser, lett till framsteg för denna moderna form av IT-drift inte bara i privat sektor utan också i offentlig sektor.4

Fördelarna med viss centralisering återspeglas också i ökad anpassningsbarhet. Olika aktörer kan dela kostnader för utveckling och underhåll av grundläggande funktioner. Under de senaste tio åren har flera globala konsortier etablerats för att upprätthålla och utveckla användbara basfunktioner för att hantera stora mängder servrar.5 I mindre IT-system kan funktioner som kan automatiseras genom stordriftsfördelar ta många timmars arbete. Samtidigt blir uppgifter som vanligtvis är tidskrävande och dyra, såsom investeringar i realtidsövervakning av IT-miljöns säkerhet eller åtgärder för att förhindra säkerhetsbrister, lättare att motivera. Med en grund av säkra och optimerade basfunktioner kan specialisttjänster sedan läggas till och anpassas efter varje verksamhets behov. Verksamheten kan då förlita sig på en stabil och solid grund utan att behöva bygga en hel IT-arkitektur från grunden varje gång ett nytt koncept ska testas.

Det massiva intresset för molntjänster har gjort att marknaden utvecklats snabbt, med flera olika tjänster som ger olika nytta för den upphandlande kunden. Beroende på varje upphandlande organisations specifika krav kan olika grader av automatisering och stordriftsfördelar levereras.

Begreppet ”molntjänst” omfattar därför både centraliserad hantering av infrastruktur –
virtualiserade servrar med ett operativsystem som kunden kan konfigurera efter eget huvud och till vilket de kan lägga till och underhålla specifika tjänster för särskilda syften (såsom databaser, webbservrar eller administrativa system) – och ändamålsspecifika system där molntjänstleverantören bistår med databasverktyg och andra grundläggande byggblock för mer specialiserad funktionalitet. Den mest synliga delen av molnmarknaden för en typisk slutkonsument är de centraliserade system för allt från textredigering till schemaläggning och videokonferenser som molnleverantören har förädlat långt.

Molnmarknaden har också utvecklats för att möjliggöra interaktion mellan olika typer av molntjänster som del av B2B-relationer. En förädlad molntjänst i ett personalsystem kan alltså interagera med en mer infrastrukturell molntjänst som tillhandahåller virtuella servrar. På så sätt behöver slutkunder endast hantera inmatning och verifiering av relevant data i stället för att underhålla och administrera kodbaser och underliggande operativsystem. Det är också vanligt att samma marknadsaktör tillhandahåller både infrastrukturtjänster och förädlade tjänster. Precis som telekommarknaderna präglades av vertikal integration på 1980-talet domineras dagens molnmarknad av aktörer med hög grad av vertikal integration. Det innebär att företag samtidigt tillhandahåller infrastruktur, plattformar och programvara.

Upphandlande slutkunder behöver noggrant väga för- och nackdelar med vertikal integration. I en vertikalt separerad marknad där många olika företag kan bidra med nya funktioner på varje nivå i värdekedjan finns större utrymme för ett varierat och skräddarsytt tjänsteutbud. Dessutom hamnar stora slutkunder i en mer informerad position gentemot leverantörer. Precis som vertikal separation och konkurrens på telekommarknaden banade väg för utvecklingen av innovativa tjänster på 1990-talet kan separation och konkurrens på molnmarknaden skapa utrymme för innovativa tjänster på 2020-talet.

En viktig skillnad är att molnmarknaden redan i huvudsak bygger på gränsöverskridande och delade öppna kodbaser. Marknadens ursprung är globalt, inte nationellt, och en större grad av vertikal separation innebär inte nödvändigtvis en större grad av nationalisering. Detta innebär att applikationer, beräkningskraft och data som matas in i dessa applikationer är geografiskt och organisatoriskt rörliga. Dataöverföringar har blivit vanliga både gränsöverskridande och i den meningen att data överförs mellan organisationer där var och en spelar sin roll i leveransen av den slutliga tjänsten.

Ett tyskt projekt som försöker kombinera erfarenheter från telekomindustrin med fördelarna i molnindustrin är GAIA-X6, ett ramverk för kostnadsdelning mellan geografiskt sammankopplade aktörer som tillhandahåller interoperabla tjänster.7 I Frankrike har man i snart ett decennium betonat att upphandlingsinstrument kan vara särskilt lämpliga för att stärka små europeiska företags roll i digitala ekosystem, med särskild betoning på öppna data och lösningar för molntjänster.7

### Med ökad flexibilitet följer ökat ansvar

I praktiken innebär användningen av molntjänster att data som en upphandlande organisation ansvarar för, och applikationer som använder dessa data som input, kommer att finnas i infrastruktur som organisationen själv inte administrerar. Oavsett vilken förädlingsgrad organisationer väljer för sina molntjänster bygger många stordriftsfördelar på att administratören av molntjänstens infrastruktur har tillgång till tillräcklig information om de data som behandlas för att kunna tillhandahålla resurserna och uppnå den säkerhetsnivå kunden kräver. I denna tekniska ofrånkomlighet uppstår skyldigheter för upphandlande organisationer enligt EU-domstolens dom i Schrems II.

EU-domstolens bedömning av grundläggande rättigheter inom EU skapar ett krav på att personuppgiftsansvariga organisationer skaffar sig en överblick över hela värdekedjan, även när de upphandlar en specifik och begränsad programapplikation som bara ska ge en begränsad nytta i den egna verksamheten. Slutkunden bör väga nyttan av den upphandlade tjänsten mot hur tjänsteleverantören interagerar med sina underleverantörer.

Den statliga utredningen Den osynliga infrastrukturen från 2007 har redan konstaterat8 att ”[IT] infrastruktur har den egenheten att den är osynlig i de fall där standarder finns på plats och är ändamålsenliga. De [standarderna] märks först när de saknas och skapar problem. IT-standarder är också i stor utsträckning osynliga i verksamhetschefers beslutsfattande. Verksamhetsbeslut, såsom rörande upphandling av e-tjänster, handlar ofta även om val av standarder, men dessa verkar inte väljas separat och explicit, åtminstone inte på den nivå där de verksamhetsansvariga finns, och är outtalade konsekvenser; av olika typer av verksamhetsbeslut.” En av konsekvenserna av både GDPR och Schrems II-domen bör vara att dessa outtalade konsekvenser görs uttalade.

Personuppgiftsbiträden måste säkerställa att eventuella underbiträden omfattas av samma avtalsmässiga skyldigheter som personuppgiftsbiträdet självt har gentemot de individer vars uppgifter behandlas av en personuppgiftsansvarig (artikel 28 i GDPR).

Det är dock den personuppgiftsansvarige som måste säkerställa att både biträden och underleverantörer uppfyller de rätta avtalsgarantierna. När antingen ett biträde eller biträdets underleverantör påverkas av rättsliga förpliktelser i ett tredjeland anser EU-domstolen att den personuppgiftsansvarige har ett heltäckande ansvar att säkerställa att dessa rättsliga skyldigheter inte underminerar europeiska medborgares dataskydd. EU-domstolen anser också att den personuppgiftsansvariges skyldigheter inte minskar bara för att det inte går att konstatera en faktisk tillämpning av sådana rättsliga skyldigheter för specifika data – det räcker att en sådan rättslig skyldighet kan uppkomma (jfr punkt 142 i C-311/18).

{{% accordion title= "Vad är ett tredjeland?" %}}

Enligt europeisk rätt är ett tredjeland ett land som inte är medlem i Europeiska unionen.

Vissa tredjeländer, såsom EFTA-medlemmar, har en privilegierad ställning jämfört med andra tredjeländer eftersom de har anslutit sig till EU-lagstiftning. Andra tredjeländer, såsom USA, Japan och Indien, har inte en privilegierad ställning.

Överföringar till tredjeländer regleras i kapitel 5 i GDPR.

{{% /accordion %}}

Safesprings checklista från 2018 tar upp de frågor som varje organisation bör ställa vid val av infrastruktur.9 Mot bakgrund av Schrems II krävs ett förtydligande i checklistan att molntjänstleverantörer som omfattas av tredjelandslagstiftning har svårt att uppfylla kraven i EU-rätten. Särskilt i tredjelandet USA skulle lagstiftningen behöva ändras för att företag med säte där ska kunna vara en acceptabel mottagare av data ur ett dataskyddsperspektiv. Det räcker inte längre att hålla reda på vilka (känsliga) personuppgifter som kan hamna hos en utländsk myndighet. I stället måste risken att sådana uppgifter kan krävas utlämnade nu aktivt förebyggas.

I praktiken innebär detta att upphandlande organisationer bör begränsa sitt val av tjänsteleverantörer och underleverantörer till aktörer som har sitt juridiska säte någonstans inom EES. Det kan också finnas behov av att säkerställa att drift och underhåll av IT-system inte utförs av personer verksamma utanför EES. Att europeiska politiker och Europeiska kommissionen vid två tillfällen misslyckats med att formulera överföringsbeslut med tillräckligt starka garantier för dataskydd bör också få upphandlande organisationer att tveka att lita på framtida överföringsbeslut.10 I praktiken har svenska politiker, trots begränsat rättsligt utrymme att kringgå EU-domstolen, ändå i första hand styrt mot åtgärder som bevarar status quo,11 med följden att aktörer som följer de politiska riktlinjerna riskerar att begå ett rättsligt fel.12

{{< inline "Kompletterande rekommendationer" >}} 13

- Kontrollera om nedströms tjänsteleverantörer använder underleverantörer i form av PaaS- eller SaaS-leverantörer.
- Kontrollera om tjänsteleverantören har använt öppet specificerade programvarufunktioner (såsom API:er eller dataformat) vid utformningen av sin tjänst.
- Verifiera att det finns ett avtal mellan tjänsteleverantören och underleverantören och att avtalet uppfyller dataskyddskraven.
- Kontrollera att underleverantören tillhandahåller dokumentation om de öppna standarder och specifikationer som används av underleverantören för dess infrastrukturlösningar. Kontrollera dessutom att tjänsteleverantören har säkerställt att den kan migrera till en annan underleverantör vid behov.
- Kontrollera om antingen tjänsteleverantören eller dess underleverantörer har sitt juridiska säte i ett tredjeland. Bedöm om det då finns en risk att myndigheter i tredjeland skulle kunna kräva att underleverantören eller tjänsteleverantören lämnar ut data till myndigheter i tredjeland.

### Transparens som skydd mot politisk instabilitet

På både europeisk14 och svensk15 nivå har det betonats att ett starkare fokus på öppet tillgänglig programkod och öppna standarder skapar både transparens och tydlighet på det sätt som europeisk dataskyddsrätt nu tycks kräva. Myndigheten för digital förvaltning rekommenderar att svenska myndigheter publicerar egenutvecklad kod under öppna mjukvarulicenser.16

Öppna standarder och öppen källkod är inte rekommendationer som följer av dataskyddsrätten. De möjliggör dock större rörlighet för slutkunder mellan olika leverantörer. Om infrastrukturen är öppen och interoperabel har slutkunden större frihet att anpassa sig till exempelvis domstolsavgöranden.

Även om dataskyddsrätten inte kräver att organisationer säkerställer förmågan att byta leverantör, förefaller rättsutvecklingen vara sådan att organisationer kan vilja investera i sådan flexibilitet själva.

När det gäller dataöverföringar har den politiska ledningen i Sverige och Europa inte bara en utan två gånger felkalibrerat politiska beslut på ett sådant sätt att EU-domstolen tvingats riva upp dem. För organisationer som behöver följa gällande rätt blir kostnaderna orimliga, tiden bortkastad och osäkerheten massiv. Medvetna investeringar i öppna standarder och kod minskar friktionen om något behöver ändras.

## Del III - Vägen framåt

{{< ingress >}}
Organisationer i Europa kan för närvarande hindras från att välja molntjänster som omfattas av amerikansk lagstiftning.
{{< /ingress >}}

Skälet är amerikansk lagstiftning om underrättelseverksamhet och CLOUD Act, vilket Safespring redan berört i tidigare vitböcker. Mot denna bakgrund bör organisationer, utöver att följa Safesprings befintliga rekommendationer och de förstärkningar som nämnts ovan: ta fram en plan för att migrera bort från molntjänster som omfattas av amerikansk lagstiftning;17

- se över hur den egna organisationen redan arbetar i enlighet med befintliga riktlinjer från den nationella inköpsfunktionen (till exempel genom att utvärdera befintliga projekt utifrån gällande rekommendationer); och
- aktivt engagera staten i att utveckla en nationell plan för molntjänster som är förenlig med europeisk rätt.

## Källor

{{< ingress >}}
Amelia Andersdotter har skrivit denna vitbok. Safespring tillhandahåller molntjänster som produceras i EU med hög rättslig säkerhet.
{{< /ingress >}}

1. ECLI: EU:C:2020:559
1. Safespring, white paper: How to deal with the uncertainty surrounding the CLOUD Act and GDPR, 2018
1. European Commission, 10 August 2020, Joint Press Statement from European Commissioner for Justice Didier Reynders and US Secretary of Commerce Wilbur Ross. https://ec.europa.eu/info/news/joint-press-statement-european-commissioner-justice-didier-reynders-and-us-secretary-commerce-wilbur-ross-7-august-2020-2020-aug-07_en
1. State service center, A joint state cloud service for the IT operations of public authorities, interim report 2017.
1. Cf. OpenStack Foundation (OSF) and Cloud Native Computing Foundation (CNCF).
1. GAIA-X: a federated data infrastructure for Europe. https://www.data-infrastructure.eu/GAIAX/Navigation/EN/Home/home.html
1. Interoperability: interaction between different components. See also SOU 2007:47, p. 133 ff.
1. Rapport d’Information No 443, Union européenne -- colonie du monde numérique ?, 20 March 2013, pp. 115-116.
1. SOU 2007:47, The invisible infrastructure, p. 64.
1. Cf. footnote 2 above.
1. Both the Safe Harbor decision from 2001 and the Privacy Shield decision from 2016 have been annulled by the European Court of Justice.
1. See Committee Directive 2019:64 with additions in Directive 2020:73.
1. See organization recommendations in footnote 2 above.
1. C(2018) 7118, European Commission Digital Strategy – A digitally transformed, user-focused and data-driven Commission, 2018.
1. E-delegation, Guidance for digital collaboration, Version 4.1, 28 May 2015.
1. DIGG, 2019-136, Policy for software development.
1. Question 5 in part II will, in principle, always need to be answered in the affirmative when using US cloud services if the US does not change its legislation.

{{< accordion-script >}}