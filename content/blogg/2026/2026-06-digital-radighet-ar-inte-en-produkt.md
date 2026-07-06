---
title: "Digital rådighet är inte en produkt"
date: "2026-07-01"
intro: "CivSecs rapport Digital rådighet och strukturella beroenden samlar frågor som redan dyker upp i upphandling, arkitektur, dataskydd och AI. Utvecklingen kring EU-US Data Privacy Framework gör dem konkreta för molnkunder."
draft: false
tags: ["Svenska"]
showthedate: true
card: "digital-radighet-schrems-card.webp"
eventbild: ""
socialmedia: "blogg/socialmedia/safespring-puzzle.jpg"
language: "Se"
section: "blogg"
author: "Gabriel Paues"
---

{{< ingress >}}
När CivSec i maj 2026 publicerade rapporten Digital rådighet och strukturella beroenden satte de en tydlig definition på begreppet: organisationens faktiska förmåga att kontrollera information, system och beslut över tid, även när leverantörer, avtal eller juridiska förutsättningar förändras.
{{< /ingress >}}

Rapporten placerar digital rådighet bredvid NIS2, AI Act, DORA och den svenska cybersäkerhetslagen (2025:1506).[^1] Den pekar också på gapet mellan vad regelverken redan gör möjligt och vad organisationer faktiskt kräver när de upphandlar, dokumenterar och styr sina digitala miljöer.

På Safespring har vi kommit in på samma område från flera håll under de senaste åren: jurisdiktion och dataskydd, molnarkitektur, AI, offentlig upphandling och möjligheten att byta väg när förutsättningarna ändras. I artikeln [Det multidimensionella problemet](/blogg/2025/2025-08-det-multidimensionella-problemet/) samlade vi flera av de perspektiven, från juridik och säkerhet till drift, geopolitik och verksamhetsrisk.

Digital rådighet fungerar bra som samlingsbegrepp, men bara om det inte görs om till ännu en produktkategori. Kärnan är vilka beslut en organisation fortfarande kan fatta när teknik, avtal, leverantörsmarknad eller lagstiftning förändras.

## När juridiken möter infrastrukturen

I upphandling och arkitektur låter digital rådighet ofta som en teknisk fråga. Flera av de svåraste avvägningarna ligger ändå i juridiken.

Schrems II-domen 2020 gjorde det tydligt, och arbetet med EU-US Data Privacy Framework har hållit frågan levande. Organisationer som behandlar känslig information behöver mer än tekniska specifikationer. De behöver veta var data behandlas, vilken lagstiftning leverantören lyder under och hur realistiskt det är att flytta tjänster om förutsättningarna ändras.

Den 29 juni 2026 avgjorde USA:s högsta domstol *Trump v. Slaughter*.[^2] Domstolen slog fast att FTC:s begränsning av presidentens möjlighet att avsätta kommissionärer strider mot maktfördelningen i USA:s konstitution.

Kopplingen till EU-US Data Privacy Framework är direkt: EU-kommissionens adekvansbeslut från 10 juli 2023 bygger på amerikanska tillsyns- och rättsmedelsfunktioner.[^3] Den 30 juni skickade noyb ett formellt brev till EU-kommissionen.[^4] noyb menar att domen påverkar grunden för DPF, bland annat eftersom kommissionens beslut hänvisar till FTC mer än 250 gånger. I sin artikel om domen skriver noyb också att SCC:er och BCR:er kan påverkas när organisationers transfer impact assessments bygger på amerikansk tillsyn eller särskilda rättsmedel.[^5]

DPF gäller alltså fortfarande. Adekvansbeslutet gäller tills EU-kommissionen återkallar det eller EU-domstolen ogiltigförklarar det. Organisationer som använder amerikanska molntjänster bör ändå kunna visa vilken grund deras överföringar vilar på och vilka antaganden som ingår i den egna analysen.

I vårt white paper [Läget efter EU-US Data Protection Framework (DPF)](/whitepaper/eu-us-dpf/) skrev vi om hur sådana överväganden påverkar riskbilden även när data lagras inom Europa. Den typen av genomgång återkommer när verksamheter väljer molnplattform, samarbetsverktyg, AI-tjänster och säkerhetssystem.

I en genomgång av molntjänster bör organisationen kunna svara på:

- Vilka personuppgifter behandlas i USA eller kan nås från USA?
- Vilken överföringsmekanism används för varje behandling?
- Vilka underleverantörer har åtkomst till drift, support, loggar, backup eller metadata?
- Vilka bedömningar hänvisar till oberoende amerikansk tillsyn eller särskilda rättsmedel?
- Vilka system innehåller data med högt skyddsvärde?

Listan är inte juridisk rådgivning. Den är en praktisk anledning att gå igenom molnberoenden, underleverantörer och exit-planer medan det fortfarande finns tid att göra arbetet ordnat.

## Öppna standarder och möjlighet att byta väg

CivSec återkommer flera gånger till portabilitet.

Portabilitet omfattar dataexport, men också hur beroende verksamheten blir av en viss plattform, ett visst gränssnitt eller en viss leverantörs sätt att paketera tjänster.

Öppna standarder löser inte hela problemet, men de kan minska kostnaden för framtida förändringar. OpenStack används för att bygga molninfrastruktur med öppna gränssnitt. Kubernetes används för att köra containeriserade applikationer i olika miljöer. S3-kompatibla lagringsgränssnitt kan minska beroendet av en specifik lagringsleverantör.

Teknikval tar inte bort leverantörsberoenden, men de kan göra beroendena synligare och vissa byten mer genomförbara. Vi har tidigare varit inne på det i artikeln [Helhetsgrepp om molninfrastrukturen](/blogg/2023/2023-06-molninfrastruktur/) och i flera texter om OpenStack, Kubernetes och leverantörsoberoende arkitektur.

## AI gör beroendet tydligare

Under de senaste två åren har AI börjat hamna i samma typ av samtal som molntjänster gjorde tidigare.

Startpunkten är ofta funktionalitet. Ganska snabbt hamnar diskussionen ändå i data och beroenden: var information behandlas, om modellen kan granskas, om lösningen kan flyttas och vilka krav AI Act ställer på dokumentation och transparens.

CivSec behandlar AI som en del av digital rådighet. Vi känner igen mönstret från samtal om privata AI-miljöer, GPU-infrastruktur och användning av språkmodeller inom offentlig sektor. Ett exempel är vårt arbete med GPU-infrastruktur och federerad maskininlärning, där dataplacering, kontroll och samarbete mellan organisationer blir en del av den tekniska lösningen. Mer om detta finns på vår sida om [Machine Learning, AI and GPU Resources](/en/services/machine-learning-ai-gpu-resources/).

I juni 2026 kom ett konkret exempel. Den 12 juni skrev Anthropic att den amerikanska regeringen hade beslutat om exportkontroller för modellerna Fable 5 och Mythos 5.[^6] Beslutet gällde utländska medborgare, både inom och utanför USA. Anthropic skrev samtidigt att företaget saknade ett tillförlitligt sätt att kontrollera nationalitet i realtid och därför stängde av åtkomsten till båda modellerna för alla användare.

Den 30 juni skrev Anthropic att exportkontrollerna hade lyfts.[^7] Fable 5 skulle åter bli tillgänglig globalt den 1 juli, medan Mythos 5 hade återställts för en uppsättning amerikanska organisationer efter godkännande från den amerikanska regeringen.

För en svensk eller europeisk verksamhet är poängen inte om just Fable 5 eller Mythos 5 ska användas. Det viktiga är om en kritisk AI-funktion kan påverkas av beslut som ligger utanför det egna avtalet, den egna leverantörsstyrningen och EU:s jurisdiktion.

## När juridik påverkar tillgång till tjänster

Anthropic är det färska exemplet. Problemet med tillgång till digitala tjänster och utländsk jurisdiktion är äldre.

År 2019 utfärdade USA Executive Order 13884, som blockerade egendom och vissa transaktioner kopplade till Venezuelas regering.[^8] I samband med detta meddelade Adobe användare i Venezuela att deras konton skulle deaktiveras. The Verge rapporterade att Adobe först skrev att återbetalningar inte kunde göras, men senare ändrade beskedet.[^9]

År 2025 sanktionerade USA Karim Khan, chefsåklagare vid Internationella brottmålsdomstolen. Associated Press rapporterade att Khans Microsoft-konto hade stängts och att han fick gå över till Proton Mail.[^10] I ett skriftligt svar i det brittiska överhuset noterade regeringen att Microsoft starkt hade förnekat att företaget gjort detta.[^11]

Exemplen ska inte pressas in i samma förklaring. De visar ändå varför jurisdiktion, sanktionsregler och leverantörens tekniska kontroll behöver finnas med i riskarbetet.

## NIS2 gör frågan mindre valfri

CivSec återkommer till att många organisationer fortfarande behandlar leverantörsberoenden som en IT-fråga, trots att regelverken i allt högre grad gör dem till en verksamhetsfråga.

NIS2 har gjort den förändringen tydligare. Jurisdiktion, leverantörskedjor, incidenthantering och kontinuitet hör nu ihop med verksamhetens riskhantering. För vissa organisationer märks det i upphandlingar. För andra märks det i kraven på dokumentation, arkitektur eller leverantörsstyrning.

Det är också bakgrunden till flera av våra tidigare texter om digital rådighet, leverantörsrisk och europeisk infrastruktur, bland annat [EU har precis definierat det suveräna molnet, här är vårt resultat](/blogg/2025/2025-11-the-eu-just-defined-sovereign-cloud-here-is-our-score/).

## Digital rådighet i praktiken

I praktiskt arbete går digital rådighet ofta att börja med frågor som passar i en arkitekturgranskning, riskanalys eller upphandling:

- Kan data flyttas till en annan miljö?
- Finns dokumenterade exit-möjligheter?
- Vilka delar av infrastrukturen är beroende av en specifik leverantör?
- Kan en kritisk AI-funktion ersättas om åtkomsten plötsligt dras tillbaka?
- Vem kan fatta beslut om tjänstens fortsatta tillgänglighet?

Svaren kommer att skilja sig mellan verksamheter. En forskningsmiljö har andra krav än en kommun. En publik webbplats har andra krav än ett system som används för myndighetsutövning.

Digital rådighet är därför inte en produkt, en regioninställning eller en certifiering. Den byggs upp genom tekniska, juridiska och organisatoriska beslut som fattas över tid.

För den som vill fördjupa sig ytterligare i den europeiska dimensionen av frågan rekommenderar vi även artiklarna [EU har precis definierat det suveräna molnet, här är vårt resultat](/blogg/2025/2025-11-the-eu-just-defined-sovereign-cloud-here-is-our-score/) och [Varför Safespring stödjer EuroStack](/blogg/2025/2025-03-eurostack/).

## Källor

[^1]: CivSec, *Digital rådighet och strukturella beroenden*, maj 2026: <https://www.civsec.se/documents/Digital%20r%C3%A5dighet%20och%20strukturella%20beroenden_1.1.pdf>
[^2]: Supreme Court of the United States, *Trump v. Slaughter*, 29 juni 2026: <https://www.supremecourt.gov/opinions/25pdf/25-332_qn12.pdf>
[^3]: European Commission, *Adequacy decision for the EU-US Data Privacy Framework*, 10 juli 2023: <https://commission.europa.eu/document/fa09cbad-dd7d-4684-ae60-be03fcb0fddf_en>
[^4]: noyb, formellt brev till EU-kommissionen om EU-US data transfers, 30 juni 2026: <https://noyb.eu/sites/default/files/2026-06/Letter_noyb_EU-US_data_transfers.pdf>
[^5]: noyb, "US Supreme Court just blew up EU-US Data Transfers", 29 juni 2026: <https://noyb.eu/en/us-supreme-court-just-blew-eu-us-data-transfers>
[^6]: Anthropic, "Statement on the US government directive to suspend access to Fable 5 and Mythos 5", 12 juni 2026: <https://www.anthropic.com/news/fable-mythos-access>
[^7]: Anthropic, "Redeploying Fable 5", 30 juni 2026: <https://www.anthropic.com/news/redeploying-fable-5>
[^8]: Federal Register, Executive Order 13884, 7 augusti 2019: <https://www.federalregister.gov/documents/2019/08/07/2019-17052/blocking-property-of-the-government-of-venezuela>
[^9]: The Verge, "Adobe is cutting off users in Venezuela due to US sanctions", 8 oktober 2019: <https://www.theverge.com/2019/10/7/20904030/adobe-venezuela-photoshop-behance-us-sanctions>
[^10]: Associated Press, "Trump's sanctions on ICC prosecutor have halted tribunal's work", 2025: <https://apnews.com/article/icc-trump-sanctions-karim-khan-court-a4b4c02751ab84c09718b1b95cbd5db3>
[^11]: UK Parliament, skriftligt svar HL8755, 8 juli 2025: <https://lordsbusiness.parliament.uk/ItemOfBusiness?businessPaperDate=2025-06-25&itemOfBusinessId=157147&sectionId=50>
