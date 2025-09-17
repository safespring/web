---
ai: true
title: "Migrera från Azure Kubernetes Service till CK8s hos Safespring"
date: "2020-09-04"
draft: false
author: ""
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_37-2.gif"
intro: "Detta white paper sammanfattar de steg som krävs för att migrera från Azure Kubernetes Service."
sidebarlinkname: ""
Section: "Vitbok"
sidebarlinkicon: "fa-file-download"
card: "safespring_card_37.jpg"
eventbild: "safespring_background_37.jpg"
socialmediabild: "safespring_social_37-2.gif"
toc: "Innehållsförteckning"
language: "sv"
aliases:
  - /en/whitepaper/migrate-from-azure/
---
## Migrering till Compliant Kubernetes

{{< ingress >}}
Denna vitbok sammanfattar de steg som behöver tas för att migrera från Azure Kubernetes Service.
{{< /ingress >}}

Det finns många skäl till en sådan migrering, inklusive efterlevnad av svensk och europeisk lagstiftning för GDPR‑efterlevnad, tillgång till expertsupport på svenska samt säker lagring av data i Sverige. Ett annat skäl är säkerhetsfokuset i Compliant Kubernetes.

En migrationsplan innehåller den nödvändiga inventeringsfasen, identifiering av beroenden och hur dessa kan ersättas, arbetsplanering samt tester som säkerställer funktionalitet. Därefter kan migreringen påbörjas och verifieras genom de nödvändiga testerna. Löpande dokumentation och uppföljningar gör att allt som lärs längs vägen bevaras för framtiden.

När migreringen är klar väntar systemförvaltning och övervakning i en ny miljö. Verktygen för detta presenteras också i dokumentet, som även visar hur de samverkar för att ge en helhetslösning med fokus på säkerhet och smidiga, agila utvecklingsprocesser.

## Bakgrund

{{< ingress >}}
Molntjänster har revolutionerat hur många företag arbetar i dag.
{{< /ingress >}}

Flexibiliteten i att kunna köpa funktioner som tidigare inte fanns eller var svåra att bygga själv har gjort många företag mer innovativa och förenklat deras processer. Samarbetsfunktioner och centraliserad hantering av data och dokument har löst problemet med att hålla reda på den senaste versionen av ett dokument. Med bara några klick kan IT‑ och utvecklingsavdelningar slå på nya funktioner som stöttar komplexa eller helt nya processer.

Majoriteten av de molnplattformar som företag använder i dag är amerikanska. Dessa aktörer är enormt innovativa och en stor anledning till att organisationer arbetar på helt nya sätt. Problemet är att lagstiftningen mellan EU och USA är oförenlig när det gäller hur personuppgifter hanteras. Inom EU baseras Dataskyddsförordningen (GDPR) och annan informationssäkerhetslagstiftning på EU:s konstitutionella rätt, vilket ger individer stort inflytande över sina data. I USA utgår man däremot från lagstiftning som ger amerikanska myndigheter möjlighet att få tillgång till de uppgifter användare lämnar efter sig för att upprätthålla nationell säkerhet.

Dessa olika utgångspunkter skapar en juridisk knut som inte är helt enkel att reda ut. För mer information i ämnet rekommenderar vi att läsa [Safesprings vitbok om Schrems II](/knowledge-hub/whitepaper/schrems2/), som förklarar de senaste händelserna i samband med att EU‑domstolen ogiltigförklarade Privacy Shield. Under de senaste åren har Privacy Shield varit det avtal som amerikanska molntjänster lutat sig mot inom EU.

Det finns nu flera företag och organisationer som antagit nya arbetssätt rotade i molntjänster, men en rättslig grund för deras användning saknas. Detta är en besvärlig situation, eftersom det inte är lätt att gå tillbaka. Samtidigt måste organisationer följa lagen.

### Förmågan att bli oberoende

Det har utvecklats ramverk som tar bort beroenden till den underliggande molnleverantören. Ett sådant ramverk är Kubernetes, en orkestreringsplattform för containerteknik med standardiserade gränssnitt för driftsättning och underhåll av applikationer. Kubernetes skapar en basplatta på vilken applikationer kan hanteras med hjälp av standardiserade definitioner. Mindre tekniskt uttryckt hjälper Kubernetes organisationer att hantera sina applikationer och tjänster på ett standardiserat sätt med hög tillförlitlighet. Eftersom systemen och deras beroenden definieras som kod är det möjligt att utnyttja kunskap som finns tillgänglig online och enkelt driftsätta komplexa system som kan ersätta etablerade molnleverantörers tjänster. Därmed blir det enklare att själva drifta de tjänster som organisationen blivit beroende av.

Dessutom finns allt fler applikationer som ersätter mer användarvänliga tjänster som Office 365, OneDrive eller Dropbox. Om en organisation använder Kubernetes för att köra sina applikationer och tjänster blir driftsättning och underhåll av dessa applikationer mer hanterbart.

Safespring är en molnleverantör med datacenter i Sverige, vilket gör juridiska konflikter med USA till en icke‑fråga. Tillsammans med vår partner Elastisys har vi tagit fram ett gemensamt erbjudande – Compliant Kubernetes, eller CK8s. Detta är en managerad tjänst som ger organisationer en basplatta som frigör dem från den underliggande molnleverantören. Om ett företag redan använder Kubernetes hos sin nuvarande molnleverantör blir migreringen ännu enklare eftersom all kod som beskriver de system och tjänster som körs kan återanvändas.

Denna vitbok beskriver migrationsprocessen från Microsoft Azure Kubernetes Service (AKS). Utgångspunkten är att organisationen redan kör Kubernetes i Azure. Flera av stegen gäller även för organisationer som inte använder Azure Kubernetes Service. Under antagandet att Kubernetes fortsätter vara lingua franca för drift av containeriserade applikationer finns en uppenbar fördel i att köra det inom organisationen. Allt arbete som läggs på att migrera till en standardiserad plattform kan återanvändas om organisationen vill flytta sin infrastruktur någon annanstans, eftersom samma infrastrukturdefinitioner kan användas så länge mottagande plattform också är Kubernetes. Detta skapar en flexibilitet och ett oberoende som annars är svårt att uppnå.

### Fördelarna med öppen källkod

En stor anledning till att många använder molntjänster är att de erbjuder nyttiga tilläggstjänster som minskar time‑to‑market. Även om dessa tjänster förkortar produktionstiden ökar de också beroendet av molnleverantörernas ekosystem. Ett sätt att minska produktionstiden för era tjänster samtidigt som ni minskar leverantörsberoendet är att införa system med öppen källkod utanför er kärnleverans. Båda angreppssätten låter er fokusera på applikationen och lägga stödsystemen åt sidan, men open‑source‑alternativet minskar beroenden i stället för att öka dem.

Öppen källkod bygger på samarbete. Genom att engagera er i de projekt ni använder (framför allt genom att bidra tillbaka med felrättningar och förbättringar ni gör) granskas det ni bidrar med för ökad säkerhet och tillförlitlighet. Att andra som använder projekten gör detsamma säkerställer en kontinuerligt uppdaterad kodbas, granskad av många och utan licenskostnader. Eftersom många använder projekten finns också mycket kod och flera lösningar bara några sökningar bort vid driftsättning och underhåll av systemen.

### Compliant Kubernetes

Compliant Kubernetes är certifierad av Cloud Native Computing Foundation (CNCF) som en Kubernetes‑distribution som finns fritt tillgänglig både som öppen källkod och som en fullt managerad tjänst hos Safespring. Open‑source‑lösningen passar organisationer som vill drifta Kubernetes och den omgivande teknikstacken själva, men som också vill dra nytta av en Kubernetes‑distribution med härdad säkerhet, särskilt anpassad för reglerade branscher, samtidigt som de slipper bekymra sig om underhåll och kan dra nytta av kvartalsvisa uppdateringar av Kubernetes‑paket och närliggande projekt. Open‑source‑alternativet är också ett bra komplement till en managerad tjänst för dem som behöver leverera sin mjukvara via egna serverhallar, ute hos sina kunder och i publika moln, och som vill göra detta sömlöst med full regelefterlevnad. För intresserade kunder erbjuder vår partner Elastisys både 8/17‑ och 24/7‑support.

### Compliant Kubernetes som öppen källkod

- Källkod: https://github.com/elastisys/compliantkubernetes
- Dokumentation: https://compliantkubernetes.io

### Förutsättningar

För att kunna köra applikationer i Compliant Kubernetes gäller följande förutsättningar:

- Konto för Safespring Compute och eventuellt Safespring Storage om objektlagring ska användas.
- En eller flera domäner är registrerade hos en registrar som kan peka ut tjänsterna.

Compliant Kubernetes använder external-DNS och cert-manager för att dynamiskt hantera applikationernas domännamn samt för automatisk certifikathantering, så en registrar som stöds av external-DNS är att föredra. Eftersom hantering av domännamn inte innebär exponering av personuppgifter är det ur GDPR‑perspektiv möjligt att stanna hos er registrar, förutsatt att registraren har ett kompatibelt API.

Ta reda på vilken version av Kubernetes som för närvarande körs i Azure Kubernetes Service (AKS). För att undvika överraskningar är det viktigt att köra samma version i Compliant Kubernetes.

## Migrationsplan

{{< ingress >}}
Detta avsnitt täcker stegen som bör tas innan själva migreringen genomförs.
{{< /ingress >}}

Inventering av system som körs i organisationen  
Varje migrationsprojekt börjar med en inventering av de tjänster och system som körs inom organisationen. Även om det som i dag körs i Azure Kubernetes Service (AKS) bara är en delmängd kan det finnas beroenden till andra system. Exempel på system som kan skapa beroenden är:

- {{< inline "Affärslogiska system" >}} Denna typ av system kan ibland leva kvar länge och det kan därför finnas beroenden till dem lite varstans. Körs dessa system i Azure i dag, eller körs de helt internt eller hos en annan driftspartner?
- {{< inline "Integrationsfunktioner" >}} Denna typ av system finns ibland för att lösa små, specifika uppgifter. De läggs ofta till för att integrera ett system med ett annat. Det kan vara värt att kontrollera hur denna typ av system anropas och varifrån.
- {{< inline "Databaser" >}} Dessa används ofta av många system och beroende på hur strikt uppdelningen mellan olika domäner är kan databaser anropas från system som inte tillhör systemdomänen där databasen ligger. Genom att gå igenom databasanslutningar och loggar får ni en bild av hur databaserna används i organisationen. Om det inte redan är gjort kan databaskonsolidering vara ett projekt att köra före själva migreringen för att förenkla processen.
- {{< inline "E-postsystem" >}} Det finns väldigt många system som använder e‑post för att kommunicera status eller om något går fel. Vissa av dessa e‑postmeddelanden kan till och med läsas maskinellt av andra system och blir därmed en länk i ett processflöde. Det kan vara så att dessa konton är registrerade i andra domäner än de för allmän e‑post. Genom att gå igenom domäner och konton som används för denna typ av kommunikation kan obehagliga överraskningar undvikas.
- {{< inline "Stödfunktioner" >}} System i denna kategori inkluderar DNS (namnuppslag), NTP (tidsynkronisering) och olika typer av service discovery‑system. Även om många av dessa körs säkert i Azure i dag är det viktigt att identifiera om de också körs internt någonstans.
- {{< inline "Interna applikationer" >}} Alla system kanske inte har migrerats till Azure (kanske tidrapportering eller intern webb). Det kan finnas olika beroenden dolda i dessa system som är viktiga att identifiera.

Inventera hur säker kommunikation mellan system hanteras. Det finns två typiska val:

- Virtual Private Network (VPN), vilket gör att all kommunikation till och från Azure och den interna miljön går via en VPN‑tunnel, eller
- Applikationerna hanterar själva säker kommunikation genom att använda TLS eller liknande protokoll.

Om en VPN används behöver en ny VPN‑tunnel sättas upp mellan den interna miljön och Safesprings miljö. Detta kan göras i förväg så att kommunikationen är uppe när systemen flyttas över. I migrationsfasen kan det också behövas en extra VPN‑tunnel mellan Azure och Safesprings miljö om det är så att systemen måste flyttas en i taget.

Det blir enklare om det andra alternativet används, eftersom det då bara handlar om att styra om kommunikationen till Safesprings miljö genom att ändra en DNS‑post. Det kan vara värt att titta på detta alternativ även om en VPN‑tunnel används i dag, eftersom alla typer av migreringar blir enklare om applikationerna själva hanterar säker kommunikation.

### Inventering av tjänster som körs i Azure

Inventera beroenden för de tjänster som körs i Azure.

- {{< inline "Identitetshantering" >}} Hur hanteras identiteter och behörigheter? Används Azure AD? Om ja, anropas det från tjänster som körs i Azure Kubernetes Service (AKS)? Ett steg som kan underlätta senare är att aktivera Secure LDAP (ett standardiserat protokoll) i Azure AD och anpassa tjänsterna att använda detta i stället. Det gör migreringen från Azure AD betydligt enklare när det väl är dags.
- {{< inline "Objektlagring" >}} är ett praktiskt sätt att billigt lagra filer som används av system. Om objektlagring redan används i form av Azure Blob Storage kan data migreras till Safespring Storage, som är S3‑kompatibelt. Justeringar kan behöva göras för att systemen ska använda Safesprings tjänst i stället. Det kan vara värt att kontrollera om systemen är utformade så att objektlagringstjänstens URI enkelt kan ändras på ett ställe med en variabel. Om inte kan det vara värt att lägga lite tid på att anpassa systemen så att det blir mycket enklare att styra om dem senare. Om objektlagring inte används i organisationen i dag kan det vara värt att börja, även om ett sådant projekt läggs efter migreringen för att minimera antalet rörliga delar.
- {{< inline "Virtuella maskiner" >}} Körs alla system i Azure som containrar, eller finns det vissa system som körs som separata virtuella maskiner? I så fall är det en god idé att titta på hur dessa maskiner är uppsatta och om det finns ett enkelt sätt att replikera deras konfiguration. Även om det finns olika sätt att migrera virtuella maskiner ”as is” med snapshots är rekommendationen att sätta upp maskinerna hos Safespring från början för bättre integration med plattformen.
- {{< inline "Databastjänster" >}} hos Azure. Om dessa används är det bra att se vilken variant som körs (MySQL, MariaDB, PostgreSQL eller Microsoft SQL). Ni kan köra alla dessa själva på Safesprings infrastruktur. MariaDB och PostgreSQL kan fås som databas som tjänst via Ck8s‑erbjudandet. För att säkerställa hög tillgänglighet rekommenderas någon form av kluster. Galera används för MySQL och MariaDB. PostgreSQL och Microsoft SQL har egna inbyggda lösningar.
- {{< inline "Hemlighetshantering" >}} Ett bra sätt att ta bort lösenord och nycklar från systemen själva är att använda ett centralt system för hemlighetshantering. Genom att vara Kubernetes‑baserat erbjuder Azure Kubernetes Service (AKS) hantering av Secrets. Dessa kan användas på samma sätt i Compliant Kubernetes. Azure har också en specifik Key Vault‑tjänst. En motsvarande tjänst är Vault från företaget Hashicorp. Justeringar behöver göras i tjänsterna för att växla till Hashicorp Vault, och det är viktigt att identifiera andra system som också använder denna funktionalitet.
- {{< inline "Meddelandebuss" >}} eller meddelandeköer. Asynkron kommunikation mellan tjänster hanteras ofta med ett meddelandebuss‑ eller meddelandekösystem. Azure har tjänsten Service Bus. Även om Safespring inte erbjuder en liknande tjänst rekommenderar vi att kunder installerar ett RabbitMQ‑kluster. Detta kan köras inom Compliant Kubernetes, och RabbitMQ är kompatibelt med Azure Service Bus eftersom båda stöder samma API (AMQP 1.0). Migreringen bör därför vara relativt okomplicerad och främst kräva att den nya tjänsten pekas ut i applikationskonfigurationen. Ett modernt alternativ med överlägsen prestanda och avancerad funktionalitet är NATS, men det är inte API‑kompatibelt med Azure Service Bus.

### Upprätta en beroendematris

En kontrollerad migrering kräver full kunskap om de beroenden som finns mellan systemen. Den visar i vilken ordning systemen migreras och vilka system som är mer centrala än andra. Beroenden kan ibland smyga sig in på oväntade ställen, så en noggrann genomgång av hur Azures tjänster är konfigurerade och vilka tjänster som används i egna system lönar sig när det är dags att migrera.

Dolda beroenden hittas oftast kring centrala system, såsom identitetshantering (Azure AD), meddelandebussar och/eller databaser.

Dessutom är det viktigt att inventera egenutvecklade system och om de har beroenden i form av utvecklingsbibliotek. Om ett för Azure anpassat bibliotek har använts behöver det ersättas med något som är agnostiskt till den underliggande plattformen. Detta kan ge upphov till anpassningar i själva applikationen.

### Tjänster i Azure som öppen källkod

Många inbyggda tjänster har en motsvarighet byggd med öppen källkod. Det finns en lista på cirka 20 på sida 10. I detta steg sammanställs en lista över de tester som ska utföras för att definiera vad som är en lyckad migrering.

{{< localbutton text="Se listan" link="#aks-counterparts-as-open-source" >}}

### Planering och prioritering

När beroendeanalysen är klar kan migreringen av systemen planeras. Migreringen innebär ofta någon form av servicefönster då tjänsterna är nere, så det är viktigt att planera allt som ska göras och i vilken ordning. Indata till detta steg kommer också från test‑ och verifieringsfasen.

### Testning och verifiering

Det första som testas är själva tjänsterna som körs i den nya plattformen. När detta fungerar är målbilden klar och migrering till testmiljön provas för att få en bild av vilka steg som krävs för en lyckad migrering.

Därefter måste även lasttester som återspeglar produktionsbelastningen genomföras så långt det är möjligt. Ju närmare testbelastningen ligger produktionsbelastningen, desto mindre risk för överraskningar när migreringen sker.

## Migrering

{{< ingress >}}
Om testerna har genomförts blir själva migreringen inte särskilt svår.
{{< /ingress >}}

Under migreringen kan oväntade händelser inträffa som inte gick att förutse. Typiska exempel är att en testdatabas inte är identisk med produktionsdatabasen, vilket kan få oväntade effekter. Andra vanliga problem är att nycklar och hemligheter är uppsatta på annat sätt i produktion än i test, vilket kan behöva uppdateras om tjänsterna inte fullt ut använder central hemlighetshantering (t.ex. Hasicorp Vault).

### Implementering av lastbalanserare

För att säkerställa hög tillgänglighet för produktionsbelastningar behöver en lösning för lastbalanserare sättas upp. Safespring kan tillhandahålla en lösning där ni får tillgång till två eller fler virtuella maskiner som kan lastbalansera över specifika instanser som körs på plattformen. Även om tjänsten som sådan innehåller vissa manuella steg vid uppsättning är den enkel att hantera när den väl är i drift. Det finns flera alternativ för lastbalanserarmjukvara, men de mest populära är HAProxy eller Traefik. Ni kan också installera MetalLB för att få ett system som erbjuder en Kubernetes‑levererad och kompatibel tjänst som tillhandahåller dynamisk lastbalanseringsfunktionalitet.

### Uppföljning

När migreringen är klar genomförs tester från listan som definierar en lyckad migrering. Enhetstester som skapats för att testa systemen före och efter migreringen ska köras för att säkerställa att all funktionalitet fungerar korrekt. Eventuella avvikelser gås igenom för att avgöra om ytterligare justeringar behövs före driftsättning.

### Dokumentation

Även om dokumentation ska föras genom hela processen behövs också ett separat steg för att sammanställa den dokumentation som tagits fram. Förutom dokumentation om hur allt är uppsatt och hur systemen samverkar är det viktigt att fånga upp lärdomar.

## När migreringen är klar

{{< ingress >}}
Drift och övervakning av era applikationer efter migreringen säkerställer att ni har kontroll.
{{< /ingress >}}

### Drift och övervakning

Applikationer i Compliant Kubernetes övervakas på två sätt:

1. Metriker och övervakningsdata sparas i Prometheus och visualiseras i Grafana.
2. Applikationsloggar sparas i ett Elasticsearch‑kluster och visualiseras och bearbetas i Kibana.
   Dessa program har gott stöd i den globala DevOps‑gemenskapen och det anses allmänt vara best practice att använda dem för dessa uppgifter i Kubernetes‑sammanhang.

Många program exponerar metrik i ett Prometheus‑specifikt format just eftersom systemet är så etablerat i communityn. Det finns adaptrar för olika sammanhang för smidig datainsamling, exempelvis för Java‑applikationer som exponerar data via Java Management Extensions (JMX), där data automatiskt kan importeras till Prometheus. Med Grafana kan systemadministratörer skapa instrumentpaneler via Prometheus frågespråk, PromQL, och därmed få en grafisk översikt över infrastrukturens tillstånd (t.ex. lagringsutrymme, nätverkstrafik och processoranvändning) samt nyckeltal för applikationsprestanda (t.ex. antal inloggade användare eller aktiva databastransaktioner).

På så sätt kan ingenjörer hålla koll på de fyra gyllene signalerna i övervakning:

- Latens
- Trafik
- Fel
- Systemmättnad

Applikationsloggar hämtas automatiskt från containrarna och deras innehåll görs sökbart i Kibana med hjälp av taggad metadata. Detta gör att administratörer snabbt kan avgöra vilken nod i Compliant Kubernetes‑klustret ett visst loggutdrag kom från och genomföra rotorsaksanalys för effektiv felsökning. Om loggdata konsekvent följer en viss struktur, eller till och med är i ett hierarkiskt format såsom JSON, kan denna struktur göras till reguljära fält i Elasticsearch och därmed ytterligare förenkla bearbetningen av data.

### Kontinuerlig integration och leverans

För att möjliggöra ett agilt arbetssätt förlitar sig många organisationer på system som låter dem automatiskt bygga, testa och leverera mjukvara i en CI/CD‑process, gärna direkt vid incheckning av kod i ett versionshanteringssystem. Azure erbjuder Azure DevOps Pipelines som en komplett lösning. Andra populära alternativ är GitLab, CircleCI, ArgoCD, Octopus Deploy, TeamCity och Jenkins, där organisationer administrerar åtminstone vissa av dessa själva.

Eftersom systemen för att bygga och leverera mjukvara i en CI/CD‑process normalt inte beror på användarnas data är det sannolikt att man, även ur GDPR‑perspektiv, fortsätter att använda de system organisationen redan har för detta. Organisationer som har processer och mycket kunskap inom en viss produktserie eller tjänst kan därför vilja stanna kvar vid dessa.

Varken Safespring som sådan eller Compliant Kubernetes föreskriver en specifik CI/CD‑lösning, utan kan göras kompatibel med alla. Av säkerhetsskäl rekommenderar Compliant Kubernetes att byggartefakter – containeravbilder – lagras i det containerregister som ingår i Compliant Kubernetes.

Som en officiell CNCF‑certifierad Kubernetes‑distribution är Compliant Kubernetes fullt kompatibel med alla CI/CD‑system som stöder Kubernetes.

### Policy as Code

Kontinuerlig säkerhet och regelefterlevnad via Policy as Code. Compliant Kubernetes är en Kubernetes‑distribution med fokus på säkerhet. Att säkerställa systemsäkerhet är inte en engångshändelse utan en kontinuerlig process. Compliant Kubernetes stödjer denna process enligt följande:

- {{< inline "Säkerhetsskanning" >}} av containeravbilder för kända sårbarheter utförs kontinuerligt av programvaran Trivy, integrerad med containerregistret Harbor.
- {{< inline "Intrångsdetektering" >}} via Falco varnar när mjukvaran i en container börjar bete sig otillåtet, till exempel genom att försöka göra nätverksanslutningar till system den annars inte kopplar upp sig mot, eller genom att börja skriva eller läsa filer som utvecklarna inte avsett.
- {{< inline "Begränsning av nätverkstrafik" >}} via brandväggsregler uttrycks i termer av Kubernetes Network Policies. Dessa implementeras och efterlevs av nätverksmjukvaran Calico.
- {{< inline "Automatisk certifikathantering" >}} via cert-manager innebär att certifikat för nätverkskryptering kan ha kort livslängd och roteras ofta och automatiskt.
- {{< inline "Skydd mot felaktig konfiguration" >}} med Open Policy Agent: denna fångar upp och inspekterar API‑anrop till Kubernetes API‑servern och släpper bara igenom dem som uppfyller definierade policykrav. Ett exempel kan vara att en policy förbjuder konfiguration som innehåller kända standardlösenord, eller att utvecklingssystem ansluter till produktionsdatabaser.

Dessa aspekter av säkerhetsarbetet konkretiserar organisationens policys. Eftersom dessa policys konfigureras via kod som kan versionshanteras och omfattas av organisationens krav på kodgranskning kan organisationen lättare uppfylla krav på regelefterlevnad, till exempel enligt ISO‑27001.

Kontinuerlig skanning efter både kända sårbarheter och varningar för beteenden som indikerar okända fel minskar också risken för dataintrång. Samtidigt minskar begränsningar av nätverkstrafik, som applikationerna själva inte kan ändra, risken att eventuella intrång får stor påverkan.

## Sammanfattning

{{< ingress >}}
En migrationsplan innehåller en inventeringsfas, identifiering av beroenden, arbetsplanering och tester som säkerställer funktionalitet.
{{< /ingress >}}

Detta dokument sammanfattar de steg en organisation behöver ta för att framgångsrikt migrera från Microsoft Azure och Azure Kubernetes Service till Safespring och Compliant Kubernetes. Det finns många skäl till en sådan migrering, inklusive efterlevnad av svensk och europeisk lagstiftning för GDPR‑efterlevnad, tillgång till expertsupport på svenska samt säker lagring av data i Sverige. Ett annat skäl är säkerhetsfokuset i Compliant Kubernetes.

En migrationsplan innehåller den nödvändiga inventeringsfasen, identifiering av beroenden och hur dessa kan ersättas, arbetsplanering samt tester som säkerställer funktionalitet. Därefter kan migreringen påbörjas och verifieras genom de nödvändiga testerna. Löpande dokumentation och uppföljningar gör att allt som lärs längs vägen bevaras för framtiden.

När migreringen är klar väntar systemförvaltning och övervakning i en ny miljö. Verktygen för detta presenteras också i dokumentet, som även visar hur de samverkar för att ge en helhetslösning med fokus på säkerhet och smidiga, agila utvecklingsprocesser.

## AKS‑motsvarigheter som öppen källkod

{{< en-aks-alternatives >}}