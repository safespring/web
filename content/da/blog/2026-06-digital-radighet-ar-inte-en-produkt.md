---
ai: true
title: "Digital rådighed er ikke et produkt"
slug: "digital-radighet-ar-inte-en-produkt"
date: "2026-07-01"
intro: "CivSecs rapport Digital rådighet och strukturella beroenden samler spørgsmål, som allerede dukker op i udbud, arkitektur, databeskyttelse og AI. Udviklingen omkring EU-US Data Privacy Framework gør dem konkrete for cloudkunder."
draft: false
tags: ["Dansk"]
showthedate: true
card: "digital-radighet-schrems-card.webp"
eventbild: ""
socialmedia: "blogg/socialmedia/safespring-puzzle.jpg"
language: "da"
section: "blogg"
author: "Gabriel Paues"
aliases:
  - /blog/2026-06-digital-radighet-ar-inte-en-produkt/
  - /blog/digital-radighet-ar-inte-en-produkt/
---

{{< ingress >}}
Da CivSec i maj 2026 offentliggjorde rapporten Digital rådighet och strukturella beroenden, gav de begrebet en tydelig definition: organisationens faktiske evne til at kontrollere information, systemer og beslutninger over tid, også når leverandører, aftaler eller juridiske forudsætninger ændrer sig.
{{< /ingress >}}

Rapporten placerer digital rådighed ved siden af NIS2, AI Act, DORA og den svenske cybersikkerhedslov (2025:1506).[^1] Den peger også på afstanden mellem, hvad regelværkerne allerede gør muligt, og hvad organisationer faktisk kræver, når de indkøber, dokumenterer og styrer deres digitale miljøer.

Hos Safespring er vi kommet ind på det samme område fra flere retninger de seneste år: jurisdiktion og databeskyttelse, cloudarkitektur, AI, offentlige udbud og muligheden for at vælge en anden vej, når forudsætningerne ændrer sig. I artiklen [Det multidimensionelle problem]({{% relref "/blog/2025-08-det-multidimensionella-problemet.md" %}}) samlede vi flere af disse perspektiver, fra jura og sikkerhed til drift, geopolitik og forretningsrisiko.

Digital rådighed fungerer godt som samlebegreb, men kun hvis det ikke gøres til endnu en produktkategori. Kernen er, hvilke beslutninger en organisation stadig kan træffe, når teknologi, aftaler, leverandørmarked eller lovgivning ændrer sig.

## Når juraen møder infrastrukturen

I udbud og arkitektur lyder digital rådighed ofte som et teknisk spørgsmål. Flere af de sværeste afvejninger ligger alligevel i juraen.

Schrems II-dommen i 2020 gjorde det tydeligt, og arbejdet med EU-US Data Privacy Framework har holdt spørgsmålet levende. Organisationer, der behandler følsom information, har brug for mere end tekniske specifikationer. De skal vide, hvor data behandles, hvilken lovgivning leverandøren er underlagt, og hvor realistisk det er at flytte tjenester, hvis forudsætningerne ændrer sig.

Den 29. juni 2026 afgjorde USA's højesteret *Trump v. Slaughter*.[^2] Domstolen fastslog, at FTC's begrænsning af præsidentens mulighed for at afsætte kommissærer strider mod magtens deling i USA's forfatning.

Koblingen til EU-US Data Privacy Framework er direkte: Europa-Kommissionens afgørelse om tilstrækkelighed fra 10. juli 2023 bygger på amerikanske tilsyns- og klagemekanismer.[^3] Den 30. juni sendte noyb et formelt brev til Europa-Kommissionen.[^4] noyb mener, at dommen påvirker grundlaget for DPF, blandt andet fordi Kommissionens afgørelse henviser til FTC mere end 250 gange. I sin artikel om dommen skriver noyb også, at SCC'er og BCR'er kan blive påvirket, når organisationers transfer impact assessments bygger på amerikansk tilsyn eller særlige retsmidler.[^5]

DPF gælder altså stadig. Afgørelsen om tilstrækkelighed gælder, indtil Europa-Kommissionen trækker den tilbage, eller EU-Domstolen erklærer den ugyldig. Organisationer, der bruger amerikanske cloudtjenester, bør alligevel kunne vise, hvilket grundlag deres overførsler hviler på, og hvilke antagelser der indgår i deres egen analyse.

I vores white paper [Situationen efter EU-USA's databeskyttelsesramme (DPF)]({{% relref "/whitepaper/eu-us-dpf.md" %}}) skrev vi om, hvordan sådanne overvejelser påvirker risikobilledet, selv når data lagres i Europa. Den type gennemgang vender tilbage, når virksomheder vælger cloudplatform, samarbejdsværktøjer, AI-tjenester og sikkerhedssystemer.

I en gennemgang af cloudtjenester bør organisationen kunne svare på:

- Hvilke personoplysninger behandles i USA eller kan tilgås fra USA?
- Hvilken overførselsmekanisme bruges for hver behandling?
- Hvilke underleverandører har adgang til drift, support, logs, backup eller metadata?
- Hvilke vurderinger henviser til uafhængigt amerikansk tilsyn eller særlige retsmidler?
- Hvilke systemer indeholder data med højt beskyttelsesbehov?

Listen er ikke juridisk rådgivning. Den er en praktisk grund til at gennemgå cloudafhængigheder, underleverandører og exit-planer, mens der stadig er tid til at gøre arbejdet ordentligt.

## Åbne standarder og muligheden for at vælge en anden vej

CivSec vender flere gange tilbage til portabilitet.

Portabilitet omfatter dataeksport, men også hvor afhængig virksomheden bliver af en bestemt platform, en bestemt grænseflade eller en bestemt leverandørs måde at pakke tjenester på.

Åbne standarder løser ikke hele problemet, men de kan reducere omkostningen ved fremtidige ændringer. OpenStack bruges til at bygge cloudinfrastruktur med åbne grænseflader. Kubernetes bruges til at køre containeriserede applikationer i forskellige miljøer. S3-kompatible lagringsgrænseflader kan reducere afhængigheden af en bestemt lagringsleverandør.

Teknologivalg fjerner ikke leverandørafhængigheder, men de kan gøre afhængighederne mere synlige og nogle skift mere gennemførlige. Vi har tidligere været inde på det i artiklen [Helhedsgreb om skyinfrastrukturen]({{% relref "/blog/2023-06-molninfrastruktur.md" %}}) og i flere tekster om OpenStack, Kubernetes og leverandøruafhængig arkitektur.

## AI gør afhængigheden tydeligere

I de seneste to år er AI begyndt at indgå i samme type samtaler, som cloudtjenester tidligere gjorde.

Udgangspunktet er ofte funktionalitet. Ret hurtigt ender diskussionen alligevel i data og afhængigheder: hvor information behandles, om modellen kan granskes, om løsningen kan flyttes, og hvilke krav AI Act stiller til dokumentation og transparens.

CivSec behandler AI som en del af digital rådighed. Vi genkender mønstret fra samtaler om private AI-miljøer, GPU-infrastruktur og brug af sprogmodeller i den offentlige sektor. Et eksempel er vores arbejde med GPU-infrastruktur og fødereret maskinlæring, hvor dataplacering, kontrol og samarbejde mellem organisationer bliver en del af den tekniske løsning. Mere om dette findes på vores side om [Fødereret AI med FEDn på Safespring]({{% relref "/services/machine-learning.md" %}}).

I juni 2026 kom et konkret eksempel. Den 12. juni skrev Anthropic, at den amerikanske regering havde besluttet eksportkontrol for modellerne Fable 5 og Mythos 5.[^6] Beslutningen gjaldt udenlandske statsborgere, både i og uden for USA. Anthropic skrev samtidig, at virksomheden manglede en pålidelig måde at kontrollere nationalitet i realtid på og derfor lukkede adgangen til begge modeller for alle brugere.

Den 30. juni skrev Anthropic, at eksportkontrollen var blevet ophævet.[^7] Fable 5 ville igen blive tilgængelig globalt den 1. juli, mens Mythos 5 var blevet gendannet for en række amerikanske organisationer efter godkendelse fra den amerikanske regering.

For en svensk eller europæisk virksomhed er pointen ikke, om netop Fable 5 eller Mythos 5 skal bruges. Det vigtige er, om en kritisk AI-funktion kan påvirkes af beslutninger, der ligger uden for virksomhedens egen aftale, egen leverandørstyring og EU's jurisdiktion.

## Når jura påvirker adgang til tjenester

Anthropic er det aktuelle eksempel. Problemet med adgang til digitale tjenester og udenlandsk jurisdiktion er ældre.

I 2019 udstedte USA Executive Order 13884, som blokerede ejendom og visse transaktioner knyttet til Venezuelas regering.[^8] I den forbindelse meddelte Adobe brugere i Venezuela, at deres konti ville blive deaktiveret. The Verge rapporterede, at Adobe først skrev, at tilbagebetalinger ikke kunne gennemføres, men senere ændrede besked.[^9]

I 2025 sanktionerede USA Karim Khan, chefanklager ved Den Internationale Straffedomstol. Associated Press rapporterede, at Khans Microsoft-konto var blevet lukket, og at han gik over til Proton Mail.[^10] I et skriftligt svar i det britiske overhus noterede regeringen, at Microsoft kraftigt havde afvist, at virksomheden havde gjort dette.[^11]

Eksemplerne skal ikke presses ind i samme forklaring. De viser alligevel, hvorfor jurisdiktion, sanktionsregler og leverandørens tekniske kontrol skal indgå i risikoarbejdet.

## NIS2 gør spørgsmålet mindre valgfrit

CivSec vender tilbage til, at mange organisationer stadig behandler leverandørafhængigheder som et IT-spørgsmål, selv om regelværkerne i stigende grad gør dem til et forretningsspørgsmål.

NIS2 har gjort den ændring tydeligere. Jurisdiktion, leverandørkæder, hændelseshåndtering og kontinuitet hænger nu sammen med virksomhedens risikostyring. For nogle organisationer mærkes det i udbud. For andre mærkes det i kravene til dokumentation, arkitektur eller leverandørstyring.

Det er også baggrunden for flere af vores tidligere tekster om digital rådighed, leverandørrisiko og europæisk infrastruktur, blandt andet [EU har netop defineret den suveræne cloud - her er vores score]({{% relref "/blog/2025-11-the-eu-just-defined-sovereign-cloud-here-is-our-score.md" %}}).

## Digital rådighed i praksis

I praktisk arbejde kan digital rådighed ofte begynde med spørgsmål, der passer i en arkitekturgennemgang, risikoanalyse eller et udbud:

- Kan data flyttes til et andet miljø?
- Findes der dokumenterede exit-muligheder?
- Hvilke dele af infrastrukturen er afhængige af en bestemt leverandør?
- Kan en kritisk AI-funktion erstattes, hvis adgangen pludselig trækkes tilbage?
- Hvem kan træffe beslutninger om tjenestens fortsatte tilgængelighed?

Svarene vil være forskellige fra organisation til organisation. Et forskningsmiljø har andre krav end en kommune. Et offentligt website har andre krav end et system, der bruges til myndighedsudøvelse.

Digital rådighed er derfor ikke et produkt, en regionsindstilling eller en certificering. Den bygges op gennem tekniske, juridiske og organisatoriske beslutninger, der træffes over tid.

For den, der vil fordybe sig yderligere i den europæiske dimension af spørgsmålet, anbefaler vi også artiklerne [EU har netop defineret den suveræne cloud - her er vores score]({{% relref "/blog/2025-11-the-eu-just-defined-sovereign-cloud-here-is-our-score.md" %}}) og [Hvorfor Safespring støtter EuroStack]({{% relref "/blog/2025-03-eurostack.md" %}}).

## Kilder

[^1]: CivSec, *Digital rådighet och strukturella beroenden*, maj 2026: <https://www.civsec.se/documents/Digital%20r%C3%A5dighet%20och%20strukturella%20beroenden_1.1.pdf>
[^2]: Supreme Court of the United States, *Trump v. Slaughter*, 29. juni 2026: <https://www.supremecourt.gov/opinions/25pdf/25-332_qn12.pdf>
[^3]: European Commission, *Adequacy decision for the EU-US Data Privacy Framework*, 10. juli 2023: <https://commission.europa.eu/document/fa09cbad-dd7d-4684-ae60-be03fcb0fddf_en>
[^4]: noyb, formelt brev til Europa-Kommissionen om EU-US data transfers, 30. juni 2026: <https://noyb.eu/sites/default/files/2026-06/Letter_noyb_EU-US_data_transfers.pdf>
[^5]: noyb, "US Supreme Court just blew up EU-US Data Transfers", 29. juni 2026: <https://noyb.eu/en/us-supreme-court-just-blew-eu-us-data-transfers>
[^6]: Anthropic, "Statement on the US government directive to suspend access to Fable 5 and Mythos 5", 12. juni 2026: <https://www.anthropic.com/news/fable-mythos-access>
[^7]: Anthropic, "Redeploying Fable 5", 30. juni 2026: <https://www.anthropic.com/news/redeploying-fable-5>
[^8]: Federal Register, Executive Order 13884, 7. august 2019: <https://www.federalregister.gov/documents/2019/08/07/2019-17052/blocking-property-of-the-government-of-venezuela>
[^9]: The Verge, "Adobe is cutting off users in Venezuela due to US sanctions", 8. oktober 2019: <https://www.theverge.com/2019/10/7/20904030/adobe-venezuela-photoshop-behance-us-sanctions>
[^10]: Associated Press, "Trump's sanctions on ICC prosecutor have halted tribunal's work", 2025: <https://apnews.com/article/icc-trump-sanctions-karim-khan-court-a4b4c02751ab84c09718b1b95cbd5db3>
[^11]: UK Parliament, skriftligt svar HL8755, 8. juli 2025: <https://lordsbusiness.parliament.uk/ItemOfBusiness?businessPaperDate=2025-06-25&itemOfBusinessId=157147&sectionId=50>
