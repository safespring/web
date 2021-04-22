---
title: "Objektlagring med protokollet S3 ger dig oändlig flexibilitet"
date: 2018-06-20
draft: false
author: ""
section: "Solution Brief"
dokumentnamn: "Safespring_White-Paper_Att-tanka-pa-i-och-med-inforandet-av-GDPR-och-CLOUD-act.pdf"
intro: "Denna solution brief går igenom lagringsstandarden S3 och ger dig fyra exempel på hur det kan användas idag. Du kommer lära dig hur du kan använda dig av den på olika sätt i din verksamhet, säkert och modernt, utan att din data behöver lämnar landet."
card: "safespring_card_27.jpg"
eventbild: "safespring_background_27.jpg"
socialmediabild: "safespring_social_27.gif"
socialmedia: "/blogg/socialmedia/safespring_social_27.gif"
toc: "Innehållsförteckning"
---

{{< ingress >}}
Denna solution brief går igenom lagringsstandarden S3 och ger dig fyra exempel på hur det kan används idag.
{{< /ingress >}}

Du kommer lära dig hur du kan använda dig av objektlagring på olika sätt i din verksamhet, säkert och modernt, utan att din data behöver lämna landet.

## Vad är S3?
S3 (Simple Storage Service) är ett open source-protokoll utvecklat av Amazon för deras tjänst med samma namn.

Protokollet lanserades i USA den 14 mars 2006 och kom till Europa den 17 november året efter. De grundläggande lagringsenheterna i S3 är föremål som är organiserade i så kallade “buckets”. Varje objekt identifieras av en unik nyckel som användaren har tilldelats.

  >Företag som använder S3-protokollet är bland andra Netflix, DropBox, Tumblr, Pinterest för att nämna några få.

Protokollet är idag öppet för vilken leverantör som helst att använda och gör det enkelt att ladda upp och ned filer säkert över HTTPS.  Många backuplösningar såsom Veeam, Commvault, Backup Exec och fler därtill, stödjer S3 direkt i applikationen vilket gör det enkelt att sätta upp. Genom standardiserade protokoll blir integration mellan olika lösningar en barnlek.

### Exempel på användningsområden
Det finns många sätt att utnyttja flexibiliteten och säkerheten hos S3. I vår verksamhet och bland våra kunder hittar vi flera exempel och nedan följer fyra stycken användningsområden som vi tycker är bra implementationer av S3.


## Exempel 1 - Offsite Backup
Att ta backup är självklart idag - men att ta backup som klarar att hela din primära site slås ut är svårare.

Lösningen är att ha ett system uppsatt som skickar iväg en offsite kopia till en annan plats. Med en sådan lösning på plats är du mycket mer förberedd om något skulle hända din primära site. Lösningen är enkel och kostnadseffektiv eftersom att du använder ditt befintliga backupsystem.

### Immutable objects
När objektlagring används för offsite backup är det viktigt att datan inte går att manipulera eller radera. Därför är funktionen "immutable objects" ett bra sätt att skydda den lagrade datan. Användaren kan sätta en tidsram där datan är helt skyddad från påverkan utifrån. Det gör att säkerhetskopiering blir säkrare och mer kostnadseffektiv än innan genom Safespring Storage. [Läs vår solution brief om immutable objects](/whitepaper/immutable-storage/).

### Vikten av offsite backup
Att lagra kopior på annan plats är ovärderligt om en katastrof skulle inträffa. De huvudsakliga anledningarna till en sådan lösning är följande:

- Säkra data från attacker i den primära miljön.
- Hålla en kopia offsite om din primära site skulle drabbas av en större katastrof (brand, översvämning eller t.ex. strömavbrott).

Styrkan med objektlagring är att den är generell och fungerar med befintliga lösningar. Backupen kan hanteras precis som förut med den stora skillnaden att det även finns en kopia på annan ort.

### 3-2-1 regeln
Det finns ett antal backuplösningar på marknaden som kan hantera din lokala backup väldigt bra.

Den vanligaste lösningen är att ha en backupserver med en dedikerad lagringslösning kopplad till som säkerställer att det går snabbt att läsa tillbaka om en server skulle drabbas av något oväntat. När vi pratar om backup så är det vanligt att vi pratar om 3-2-1 regeln vilket innebär att du ska ha tre kopior av din data, på två olika mediatyper och en kopia offsite.

Den lokala backuplösningen löser bara de första två kraven: du har säkert tre backuper på två olika lagringsmedia men ingen av dem är offsite. Traditionellt har offsite-backupen inneburit fysisk transport av t ex band till en annan plats men det är dyrt och kräver rutiner. Nu när standardiserade lagringslösningar som krypterat kan nås över internet finns att tillgå så förenklas det momentet avsevärt.


## Exempel 2 - Backendlagring för e-arkivering
Datamängderna växer hela tiden överallt både på grund av att mer information blir digitaliserat och att data vi lagrar i form av t.ex. rörliga bilder och högupplösta inskanningar tar mer plats.

Många företag och myndigheter har ett arkiveringsansvar som sträcker sig längre och längre bakåt i tiden.  Dessa saker sammantaget gör att datat växer mer och mer vilket gör det svårt att hitta kostnadseffektiva lösningar över tid.

Traditionellt så har bolag delat upp det data som lagras i sådant som måste kunna nås relativt snabbt och arkiverad data som inte behöver vara lika tillgängligt, och lagrat det på billigare lagringsmedium. Innan digitaliseringsvågen så var mikrofilm det som användes och efter digitaliseringen oftast bandbackup. Problemet med dessa metoder har varit att åtkomsten eftersom att de bägge innebär manuella processer för att nå det arkiverade datat. Dessutom så har det varit kostsamt i form av infrastruktur och väldigt svårt att säkerställa att det arkiverade datat verkligen är intakt.

En objektlagringstjänst med S3 kan lösa dessa problem. Genom att använda en S3-tjänst kan all data som lagras i arkivet kostnadseffektivt lagras på samma sätt. Det spelar ingen roll om användaren behöver få tag på en fil som arkiverades igår eller för tio år sedan. E-arkivlösningen håller reda på meta-data och referenser men lagrar all data i S3 vilket gör det nåbart och kostnadseffektivt. Eftersom Safesprings tjänster produceras i Sverige så behöver ingen heller inte vara orolig för vilket lagstiftning som gäller då kunden och leverantören lyder under samma lagar.


## Exempel 3 - Prisvärda och interna kollaborationstjänster
S3 erbjuder med sin enkelhet möjlighet att använda det med många olika applikationer. Det gör det möjligt att utvidga funktionaliteten i kombination med den kostnadseffektiva lagring som S3 erbjuder. Många gånger krävs en högre säkerhet och då finns det flera alternativ med liknande funktioner.

### Nextcloud
En sådan applikation är Nextcloud som är en serverprogramvara som bygger på öppen källkod och som syftar till att sätta upp en egen privat tjänst som liknar t ex Dropbox. Gränssnittet är webbaserat, men det finns också synkroniseringklienter för både arbetsstationer som kör Windows, MacOS eller Linux och smartphones så att datat alltid är lätt att nå.

Nextcloud stödjer S3 som lagring vilket gör det lätt att sätta upp en prisvärd lagringstjänst för företagets filer. Nextcloud stödjer också funktioner för att temporärt dela filer med externa aktörer, både med lösenord och tidsbegränsning. Just dessa funktioner är något som inte finns inbyggd i S3 men som ger ett väldigt stort mervärde för användarna.

Läs mer på Nextclouds webbplats:
https://nextcloud.com


## Exempel 4 - Privat S3-tjänst med Minio
Safesprings S3-tjänst är designad med hög säkerhet och flexibilitet i fokus. Det finns vissa fall då men kan behöva ännu större möjligheter.

Initiativet Minio är ett öppen källkodsprojekt med vilket du kan sätta upp din alldeles egna privata installation av en S3-komplativa tjänst. För att säkerställa åtkomst och tillgänglighet så går det utmärkt att sätta upp det i [Safesprings Compute tjänst](/tjanster/safespring-compute).

Fördelarna med en sådan lösning är att du får full kontroll på alla inställningar för S3-tjänsten och att den blir privat för ditt företag. Du kan själv styra policies för åtkomst, inloggning och lagring. Filerna som lagras i tjänsten läggs på Safesprings Computetjänst av typen Large, vilket ger en något högre kostnad men å andra sidan så kan du styra precis allting själv.

Minio används som referensinstallation för S3 av många tillverkare som bygger in S3-stöd i sina produkter vilket ökar sannolikheten att integrationer med andra lösningar fungerar.

Läs mer om Minio:
https://min.io

## Varför en lokal leverantör av molntjänster?
Om du använder ett Amazon protokoll, varför inte använda Amazon som lagringslösning? Det finns ett antal anledningar varför en lokal leverantör av en S3-kompatibel tjänst kan vara en bättre lösning:

{{% inline "Efterlevnad av lagar (Compliance)" %}} Genom att lägga ditt data hos en lokal leverantör blir det mycket enklare att efterfölja lokala lagar och regler. Med införandet av t.ex. den amerikanska lagen Cloud Act så spelar det egentligen ingen roll var datat är lagrat utan vilket land företaget har sitt säte. Juridiska experter på eSam anser att uppgifter lagrade i en amerikansk tjänst är att betrakta som röjda, oavsett vilket land datacentret ligger i. Eftersom Safespring är ett svenskt bolag lyder vi inte under Cloud Act.

{{% inline "Lokal support" %}} När du ska komma igång med en ny leverantör så kan det kännas tryggt att supportorganisationen är baserad i samma land som du - och pratar ditt språk.

{{% inline "Ökad Kapacitet" %}} Närmare placering av datat och färre flaskhalsar ger högre kapacitet för uppladdning och nedladdning av data.

De flesta backuplösningar kan använda en molnbaserad S3-lösning som en sekundär lagringspool. Med bara konfiguration i den befintliga backuplösningen och utan några ytterligare investeringar kan du erhålla en offsite kopia av ditt data. Safespring Storage produceras i Sverige vilket gör att du inte behöver vara orolig för utländska lagar och regler. Dessutom stödjer den S3 protokollet vilket gör att den är lätt att integrera med befintliga backuplösningar på marknaden.


## Safespring är en hållbar plattform för säkra molntjänster
Safespring levererar säkra, snabba och flexibla moln- och IT-infrastrukturtjänster baserade på Open Source och öppna standarder.

Vi producerar själva samtliga tjänster lokalt vilket gör det enklare för dig att uppfylla lagar och regler, samt känna dig trygg! Safespring är ett Svenskt företag med lokalt producerade molntjänster i Sverige och Norge.

Molntjänster är ett modernt och effektivt sätt att producera IT, men frågor som alltid diskuteras är om det är säkert och var ens data finns. Det är något som vi tagit fasta på när vi skapat Safespring och våra tjänster, hos oss ska du känna dig trygg! Din data lämnar aldrig landet.

Att vi är ett svenskt företag innebär dessutom att vi inte omfattas av Cloud Act, så vi kan inte tvingas att lämna ut din data. Vi har skapat våra tjänster med högsta säkerhet i fokus, vi producerar dem lokalt för att du ska veta vilka lagar och regler som gäller och var ditt data finns lagrat ! Vi är experter på det vi gör och hjälper dig gärna att ta fram bästa lösningen för just dig.

{{% inline "Open Source" %}} Våra tjänster baseras på öppen källkod sk. Open Source. De senaste decennierna har visat att öppen källkod ger ett oerhört kraftfullt ekosystem av företag och organisationer som i stort har samma behov, men samtidigt behov av skräddarsydda lösningar.

Eftersom källkoden är publik så är den enkel att granska och förbättra. Öppen källkod gör dig oberoende av plattform och leverantör vilket både ökar säkerheten och flexibiliteten. Dessutom är det ingen licenskostnad.
