---
title: "Digital rådighet är inte en produkt"
date: "2026-07-01"
intro: "CivSecs rapport Digital rådighet och strukturella beroenden sätter ord på frågor som redan finns i upphandling, arkitektur, dataskydd och AI. Utvecklingen kring EU-US Data Privacy Framework gör frågan konkret för molnkunder."
draft: false
tags: ["Svenska"]
showthedate: true
card: "safespring-puzzle.webp"
eventbild: ""
socialmedia: "blogg/socialmedia/safespring-puzzle.jpg"
language: "Se"
section: "blogg"
author: "Gabriel Paues"
---

{{< ingress >}}
I maj 2026 publicerade CivSec rapporten [*Digital rådighet och strukturella beroenden*](https://www.civsec.se/documents/Digital%20r%C3%A5dighet%20och%20strukturella%20beroenden_1.1.pdf). Rapporten definierar digital rådighet som en organisations faktiska förmåga att kontrollera information, system och beslut över tid, även när leverantörer, avtal eller juridiska förutsättningar förändras.
{{< /ingress >}}

CivSec kopplar frågan till NIS2, AI Act, DORA och den svenska cybersäkerhetslagen (2025:1506). Rapporten beskriver också ett gap mellan vad regelverken gör möjligt och vad organisationer faktiskt kräver när de upphandlar, dokumenterar och styr sina digitala miljöer.

Begreppet är relativt nytt. Frågorna är det inte.

På Safespring har vi under flera år skrivit om samma problemområde från olika håll: jurisdiktion och dataskydd, molnarkitektur, AI, offentlig upphandling och möjligheten att byta väg när förutsättningarna ändras. Flera av resonemangen finns i artikeln [Det multidimensionella problemet](/blogg/2025/2025-08-det-multidimensionella-problemet/), där juridik, säkerhet, drift, geopolitiska förutsättningar och verksamhetsrisk behandlas tillsammans.

Digital rådighet är ett användbart samlingsbegrepp, men det får inte bli ett nytt ord för en gammal produktkategori. Det handlar om vilka beslut en organisation fortfarande kan fatta när teknik, avtal, leverantörsmarknad eller lagstiftning förändras.

## När juridiken möter infrastrukturen

Diskussionen om digital rådighet förs ofta som en teknisk fråga, men många av de mest komplicerade avvägningarna är juridiska.

Det blev tydligt efter Schrems II-domen 2020 och har fortsatt genom arbetet med EU-US Data Privacy Framework. För organisationer som behandlar känslig information räcker det inte att läsa tekniska specifikationer. De behöver också veta var data behandlas, vilken lagstiftning leverantören lyder under och vilka möjligheter som finns att flytta tjänster om förutsättningarna ändras.

Den 29 juni 2026 avgjorde USA:s högsta domstol [Trump v. Slaughter](https://www.supremecourt.gov/opinions/25pdf/25-332_qn12.pdf). Domstolen slog fast att FTC:s begränsning av presidentens möjlighet att avsätta kommissionärer strider mot maktfördelningen i USA:s konstitution.

Det är relevant för EU-US Data Privacy Framework eftersom EU-kommissionens [adekvansbeslut från 10 juli 2023](https://commission.europa.eu/document/fa09cbad-dd7d-4684-ae60-be03fcb0fddf_en) bygger på amerikanska tillsyns- och rättsmedelsfunktioner. Den 30 juni skickade [noyb ett formellt brev](https://noyb.eu/sites/default/files/2026-06/Letter_noyb_EU-US_data_transfers.pdf) till EU-kommissionen. noyb menar att domen påverkar grunden för DPF, bland annat eftersom kommissionens beslut hänvisar till FTC mer än 250 gånger. I sin [artikel om domen](https://noyb.eu/en/us-supreme-court-just-blew-eu-us-data-transfers) skriver noyb också att SCC:er och BCR:er kan påverkas när organisationers transfer impact assessments bygger på amerikansk tillsyn eller särskilda rättsmedel.

Det betyder inte att DPF har upphört att gälla. Adekvansbeslutet gäller tills EU-kommissionen återkallar det eller EU-domstolen ogiltigförklarar det. Däremot bör organisationer som använder amerikanska molntjänster kunna visa vilken grund deras överföringar vilar på och vilka antaganden som ingår i bedömningen.

I white paperet [Läget efter EU-US Data Protection Framework (DPF)](/whitepaper/eu-us-dpf/) beskrev vi hur sådana frågor påverkar riskbedömningen även när data lagras inom Europa. Samma typ av bedömning återkommer när verksamheter väljer molnplattform, samarbetsverktyg, AI-tjänster och säkerhetssystem.

För molnkunder blir de praktiska frågorna konkreta:

- Vilka personuppgifter behandlas i USA eller kan nås från USA?
- Vilken överföringsmekanism används för varje behandling?
- Vilka underleverantörer har åtkomst till drift, support, loggar, backup eller metadata?
- Vilka bedömningar hänvisar till oberoende amerikansk tillsyn eller särskilda rättsmedel?
- Vilka system innehåller data med högt skyddsvärde?

Detta ersätter inte juridisk rådgivning. Det är däremot ett skäl att gå igenom molnberoenden, underleverantörer och exit-planer medan det fortfarande finns tid att göra arbetet ordnat.

## Öppna standarder och möjlighet att byta väg

Rapporten återkommer flera gånger till frågan om portabilitet.

Portabilitet omfattar dataexport, men också hur beroende verksamheten blir av en viss plattform, ett visst gränssnitt eller en viss leverantörs sätt att paketera tjänster.

Öppna standarder löser inte hela problemet, men de kan minska kostnaden för framtida förändringar. OpenStack används för att bygga molninfrastruktur med öppna gränssnitt. Kubernetes används för att köra containeriserade applikationer i olika miljöer. S3-kompatibla lagringsgränssnitt kan minska beroendet av en specifik lagringsleverantör.

Tekniken eliminerar inte leverantörsberoenden. Den gör däremot vissa beroenden mer synliga och vissa byten mer genomförbara. Vi har tidigare berört samma frågor i artikeln [Helhetsgrepp om molninfrastrukturen](/blogg/2023/2023-06-molninfrastruktur/) och i flera texter om OpenStack, Kubernetes och leverantörsoberoende arkitektur.

## AI gör beroendet tydligare

Under de senaste två åren har många organisationer börjat diskutera AI på samma sätt som de tidigare diskuterade molntjänster.

Samtalen börjar ofta i funktionalitet, men går snabbt vidare till data och beroenden: var information behandlas, om modellen kan granskas, om lösningen kan flyttas och vilka krav AI Act ställer på dokumentation och transparens.

I rapporten behandlas AI som en del av digital rådighet. Vi ser samma frågor i samtal om privata AI-miljöer, GPU-infrastruktur och användning av språkmodeller inom offentlig sektor. Ett exempel är vårt arbete med GPU-infrastruktur och federerad maskininlärning, där dataplacering, kontroll och samarbete mellan organisationer blir en del av den tekniska lösningen. Mer om detta finns på vår sida om [Machine Learning, AI and GPU Resources](/en/services/machine-learning-ai-gpu-resources/).

I juni 2026 blev frågan praktisk. Den 12 juni skrev [Anthropic](https://www.anthropic.com/news/fable-mythos-access) att den amerikanska regeringen hade beslutat om exportkontroller för modellerna Fable 5 och Mythos 5. Beslutet gällde utländska medborgare, både inom och utanför USA. Anthropic skrev samtidigt att företaget saknade ett tillförlitligt sätt att kontrollera nationalitet i realtid och därför stängde av åtkomsten till båda modellerna för alla användare.

Den 30 juni skrev [Anthropic](https://www.anthropic.com/news/redeploying-fable-5) att exportkontrollerna hade lyfts. Fable 5 skulle åter bli tillgänglig globalt den 1 juli, medan Mythos 5 hade återställts för en uppsättning amerikanska organisationer efter godkännande från den amerikanska regeringen.

För en svensk eller europeisk verksamhet är frågan inte om just Fable 5 eller Mythos 5 ska användas. Frågan är om en kritisk AI-funktion kan påverkas av beslut som ligger utanför det egna avtalet, den egna leverantörsstyrningen och EU:s jurisdiktion.

## När juridik påverkar tillgång till tjänster

Anthropic-exemplet är nytt, men frågan om tillgång till digitala tjänster och utländsk jurisdiktion är äldre.

År 2019 utfärdade USA [Executive Order 13884](https://www.federalregister.gov/documents/2019/08/07/2019-17052/blocking-property-of-the-government-of-venezuela), som blockerade egendom och vissa transaktioner kopplade till Venezuelas regering. I samband med detta meddelade Adobe användare i Venezuela att deras konton skulle deaktiveras. [The Verge rapporterade](https://www.theverge.com/2019/10/7/20904030/adobe-venezuela-photoshop-behance-us-sanctions) att Adobe först skrev att återbetalningar inte kunde göras, men senare ändrade beskedet.

År 2025 sanktionerade USA Karim Khan, chefsåklagare vid Internationella brottmålsdomstolen. [Associated Press rapporterade](https://apnews.com/article/icc-trump-sanctions-karim-khan-court-a4b4c02751ab84c09718b1b95cbd5db3) att Khans Microsoft-konto hade stängts och att han fick gå över till Proton Mail. I ett [skriftligt svar i det brittiska överhuset](https://lordsbusiness.parliament.uk/ItemOfBusiness?businessPaperDate=2025-06-25&itemOfBusinessId=157147&sectionId=50) noterade regeringen att Microsoft starkt hade förnekat att företaget gjort detta.

Exemplen är olika och ska inte pressas in i samma förklaring. För riskbedömningen är det ändå relevant vilken jurisdiktion leverantören lyder under, vilka sanktionsregler som kan träffa tjänsten och vilken teknisk kontroll leverantören har.

## NIS2 gör frågan mindre valfri

En återkommande observation i rapporten är att många organisationer fortfarande behandlar leverantörsberoenden som en IT-fråga trots att regelverken i allt högre grad behandlar dem som en verksamhetsfråga.

Det är en förändring som blivit tydligare genom NIS2. Frågor om jurisdiktion, leverantörskedjor, incidenthantering och kontinuitet blir en del av verksamhetens riskhantering. För vissa organisationer leder det till nya krav i upphandlingar. För andra leder det till nya krav på dokumentation, arkitektur eller leverantörsstyrning.

Samma utveckling ligger bakom flera av de resonemang vi tidigare fört kring digital rådighet, leverantörsrisk och europeisk infrastruktur, bland annat i artikeln [EU har precis definierat det suveräna molnet, här är vårt resultat](/blogg/2025/2025-11-the-eu-just-defined-sovereign-cloud-here-is-our-score/).

## Digital rådighet i praktiken

I praktiken handlar digital rådighet ofta om frågor som går att ställa i en arkitekturgranskning, riskanalys eller upphandling:

- Kan data flyttas till en annan miljö?
- Finns dokumenterade exit-möjligheter?
- Vilka delar av infrastrukturen är beroende av en specifik leverantör?
- Kan en kritisk AI-funktion ersättas om åtkomsten plötsligt dras tillbaka?
- Vem kan fatta beslut om tjänstens fortsatta tillgänglighet?

Svar på dessa frågor kommer att se olika ut för olika verksamheter. En forskningsmiljö har andra krav än en kommun. En publik webbplats har andra krav än ett system som används för myndighetsutövning.

Det är därför digital rådighet inte är en produkt, en regioninställning eller en certifiering. Det är resultatet av tekniska, juridiska och organisatoriska beslut som fattas över tid.

För den som vill fördjupa sig ytterligare i den europeiska dimensionen av frågan rekommenderar vi även artiklarna [EU har precis definierat det suveräna molnet, här är vårt resultat](/blogg/2025/2025-11-the-eu-just-defined-sovereign-cloud-here-is-our-score/) och [Varför Safespring stödjer EuroStack](/blogg/2025/2025-03-eurostack/).
