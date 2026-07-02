---
ai: true
title: "Digital råderett er ikke et produkt"
slug: "digital-radighet-ar-inte-en-produkt"
date: "2026-07-01"
intro: "CivSecs rapport Digital rådighet och strukturella beroenden samler spørsmål som allerede dukker opp i anskaffelser, arkitektur, personvern og AI. Utviklingen rundt EU-US Data Privacy Framework gjør dem konkrete for skykunder."
draft: false
tags: ["Norsk"]
showthedate: true
card: "digital-radighet-schrems-card.webp"
eventbild: ""
socialmedia: "blogg/socialmedia/safespring-puzzle.jpg"
language: "nb"
section: "blogg"
author: "Gabriel Paues"
aliases:
  - /blogg/2026-06-digital-radighet-ar-inte-en-produkt/
  - /blogg/digital-radighet-ar-inte-en-produkt/
---

{{< ingress >}}
Da CivSec i mai 2026 publiserte rapporten Digital rådighet och strukturella beroenden, satte de en tydelig definisjon på begrepet: organisasjonens faktiske evne til å kontrollere informasjon, systemer og beslutninger over tid, også når leverandører, avtaler eller juridiske forutsetninger endres.
{{< /ingress >}}

Rapporten plasserer digital råderett ved siden av NIS2, AI Act, DORA og den svenske cybersikkerhetsloven (2025:1506).[^1] Den peker også på gapet mellom hva regelverkene allerede gjør mulig og hva organisasjoner faktisk krever når de anskaffer, dokumenterer og styrer sine digitale miljøer.

I Safespring har vi kommet inn på det samme området fra flere retninger de siste årene: jurisdiksjon og personvern, skyarkitektur, AI, offentlige anskaffelser og muligheten til å velge en annen vei når forutsetningene endres. I artikkelen [Det multidimensjonale problemet]({{% relref "/blog/2025-08-det-multidimensionella-problemet.md" %}}) samlet vi flere av disse perspektivene, fra juss og sikkerhet til drift, geopolitikk og virksomhetsrisiko.

Digital råderett fungerer godt som samlebegrep, men bare hvis det ikke gjøres om til enda en produktkategori. Kjernen er hvilke beslutninger en organisasjon fortsatt kan fatte når teknologi, avtaler, leverandørmarked eller lovgivning endres.

## Når jussen møter infrastrukturen

I anskaffelser og arkitektur høres digital råderett ofte ut som et teknisk spørsmål. Flere av de vanskeligste avveiningene ligger likevel i jussen.

Schrems II-dommen i 2020 gjorde det tydelig, og arbeidet med EU-US Data Privacy Framework har holdt spørsmålet levende. Organisasjoner som behandler sensitiv informasjon, trenger mer enn tekniske spesifikasjoner. De må vite hvor data behandles, hvilken lovgivning leverandøren er underlagt, og hvor realistisk det er å flytte tjenester hvis forutsetningene endres.

Den 29. juni 2026 avgjorde USAs høyesterett *Trump v. Slaughter*.[^2] Domstolen slo fast at FTCs begrensning av presidentens mulighet til å avsette kommissærer strider mot maktfordelingen i USAs grunnlov.

Koblingen til EU-US Data Privacy Framework er direkte: Europakommisjonens adekvansbeslutning fra 10. juli 2023 bygger på amerikanske tilsyns- og klagemekanismer.[^3] Den 30. juni sendte noyb et formelt brev til Europakommisjonen.[^4] noyb mener at dommen påvirker grunnlaget for DPF, blant annet fordi Kommisjonens beslutning viser til FTC mer enn 250 ganger. I sin artikkel om dommen skriver noyb også at SCC-er og BCR-er kan bli påvirket når organisasjoners transfer impact assessments bygger på amerikansk tilsyn eller særskilte rettsmidler.[^5]

DPF gjelder altså fortsatt. Adekvansbeslutningen gjelder til Europakommisjonen trekker den tilbake eller EU-domstolen kjenner den ugyldig. Organisasjoner som bruker amerikanske skytjenester, bør likevel kunne vise hvilket grunnlag overføringene deres bygger på og hvilke antakelser som inngår i deres egen analyse.

I vår hvitbok [Status etter EU-US Data Protection Framework (DPF)]({{% relref "/whitepaper/eu-us-dpf.md" %}}) skrev vi om hvordan slike vurderinger påvirker risikobildet selv når data lagres i Europa. Denne typen gjennomgang kommer tilbake når virksomheter velger skyplattform, samarbeidsverktøy, AI-tjenester og sikkerhetssystemer.

I en gjennomgang av skytjenester bør organisasjonen kunne svare på:

- Hvilke personopplysninger behandles i USA eller kan nås fra USA?
- Hvilken overføringsmekanisme brukes for hver behandling?
- Hvilke underleverandører har tilgang til drift, support, logger, backup eller metadata?
- Hvilke vurderinger viser til uavhengig amerikansk tilsyn eller særskilte rettsmidler?
- Hvilke systemer inneholder data med høyt beskyttelsesbehov?

Listen er ikke juridisk rådgivning. Den er en praktisk grunn til å gå gjennom skyavhengigheter, underleverandører og exit-planer mens det fortsatt finnes tid til å gjøre arbeidet ordnet.

## Åpne standarder og muligheten til å velge en annen vei

CivSec kommer flere ganger tilbake til portabilitet.

Portabilitet omfatter dataeksport, men også hvor avhengig virksomheten blir av en bestemt plattform, et bestemt grensesnitt eller en bestemt leverandørs måte å pakke tjenester på.

Åpne standarder løser ikke hele problemet, men de kan redusere kostnaden ved fremtidige endringer. OpenStack brukes til å bygge skyinfrastruktur med åpne grensesnitt. Kubernetes brukes til å kjøre containeriserte applikasjoner i ulike miljøer. S3-kompatible lagringsgrensesnitt kan redusere avhengigheten av en bestemt lagringsleverandør.

Teknologivalg fjerner ikke leverandøravhengigheter, men de kan gjøre avhengighetene mer synlige og enkelte bytter mer gjennomførbare. Vi har tidligere vært inne på dette i artikkelen [Helhetlig grep om skyinfrastrukturen]({{% relref "/blog/2023-06-molninfrastruktur.md" %}}) og i flere tekster om OpenStack, Kubernetes og leverandøruavhengig arkitektur.

## AI gjør avhengigheten tydeligere

De siste to årene har AI begynt å havne i samme type samtaler som skytjenester gjorde tidligere.

Utgangspunktet er ofte funksjonalitet. Ganske raskt havner diskusjonen likevel i data og avhengigheter: hvor informasjon behandles, om modellen kan granskes, om løsningen kan flyttes og hvilke krav AI Act stiller til dokumentasjon og transparens.

CivSec behandler AI som en del av digital råderett. Vi kjenner igjen mønsteret fra samtaler om private AI-miljøer, GPU-infrastruktur og bruk av språkmodeller i offentlig sektor. Et eksempel er vårt arbeid med GPU-infrastruktur og føderert maskinlæring, der dataplassering, kontroll og samarbeid mellom organisasjoner blir en del av den tekniske løsningen. Mer om dette finnes på siden vår om [Maskinlæring og AI med GPU-ressurser]({{% relref "/services/machine-learning.md" %}}).

I juni 2026 kom et konkret eksempel. Den 12. juni skrev Anthropic at den amerikanske regjeringen hadde besluttet eksportkontroller for modellene Fable 5 og Mythos 5.[^6] Beslutningen gjaldt utenlandske statsborgere, både innenfor og utenfor USA. Anthropic skrev samtidig at selskapet manglet en pålitelig måte å kontrollere nasjonalitet i sanntid på og derfor stengte tilgangen til begge modellene for alle brukere.

Den 30. juni skrev Anthropic at eksportkontrollene var opphevet.[^7] Fable 5 skulle igjen bli tilgjengelig globalt 1. juli, mens Mythos 5 var gjenopprettet for et utvalg amerikanske organisasjoner etter godkjenning fra den amerikanske regjeringen.

For en svensk eller europeisk virksomhet er poenget ikke om akkurat Fable 5 eller Mythos 5 skal brukes. Det viktige er om en kritisk AI-funksjon kan påvirkes av beslutninger som ligger utenfor egen avtale, egen leverandørstyring og EUs jurisdiksjon.

## Når juss påvirker tilgang til tjenester

Anthropic er det ferske eksempelet. Problemet med tilgang til digitale tjenester og utenlandsk jurisdiksjon er eldre.

I 2019 utstedte USA Executive Order 13884, som blokkerte eiendom og visse transaksjoner knyttet til Venezuelas regjering.[^8] I forbindelse med dette varslet Adobe brukere i Venezuela om at kontoene deres ville bli deaktivert. The Verge rapporterte at Adobe først skrev at refusjoner ikke kunne gjennomføres, men senere endret beskjed.[^9]

I 2025 sanksjonerte USA Karim Khan, sjefanklager ved Den internasjonale straffedomstolen. Associated Press rapporterte at Khans Microsoft-konto hadde blitt stengt og at han gikk over til Proton Mail.[^10] I et skriftlig svar i det britiske overhuset bemerket regjeringen at Microsoft sterkt hadde avvist at selskapet hadde gjort dette.[^11]

Eksemplene skal ikke presses inn i samme forklaring. De viser likevel hvorfor jurisdiksjon, sanksjonsregler og leverandørens tekniske kontroll må være en del av risikoarbeidet.

## NIS2 gjør spørsmålet mindre valgfritt

CivSec kommer tilbake til at mange organisasjoner fortsatt behandler leverandøravhengigheter som et IT-spørsmål, selv om regelverkene i økende grad gjør dem til et virksomhetsspørsmål.

NIS2 har gjort denne endringen tydeligere. Jurisdiksjon, leverandørkjeder, hendelseshåndtering og kontinuitet henger nå sammen med virksomhetens risikostyring. For noen organisasjoner merkes det i anskaffelser. For andre merkes det i kravene til dokumentasjon, arkitektur eller leverandørstyring.

Det er også bakgrunnen for flere av våre tidligere tekster om digital råderett, leverandørrisiko og europeisk infrastruktur, blant annet [EU har nettopp definert suveren sky, her er vår poengsum]({{% relref "/blog/2025-11-the-eu-just-defined-sovereign-cloud-here-is-our-score.md" %}}).

## Digital råderett i praksis

I praktisk arbeid kan digital råderett ofte begynne med spørsmål som passer i en arkitekturgjennomgang, risikoanalyse eller anskaffelse:

- Kan data flyttes til et annet miljø?
- Finnes det dokumenterte exit-muligheter?
- Hvilke deler av infrastrukturen er avhengige av en bestemt leverandør?
- Kan en kritisk AI-funksjon erstattes hvis tilgangen plutselig trekkes tilbake?
- Hvem kan fatte beslutninger om tjenestens videre tilgjengelighet?

Svarene vil variere mellom virksomheter. Et forskningsmiljø har andre krav enn en kommune. Et offentlig nettsted har andre krav enn et system som brukes til myndighetsutøvelse.

Digital råderett er derfor ikke et produkt, en regioninnstilling eller en sertifisering. Den bygges opp gjennom tekniske, juridiske og organisatoriske beslutninger som tas over tid.

For den som vil fordype seg ytterligere i den europeiske dimensjonen av spørsmålet, anbefaler vi også artiklene [EU har nettopp definert suveren sky, her er vår poengsum]({{% relref "/blog/2025-11-the-eu-just-defined-sovereign-cloud-here-is-our-score.md" %}}) og [Hvorfor Safespring støtter EuroStack]({{% relref "/blog/2025-03-eurostack.md" %}}).

## Kilder

[^1]: CivSec, *Digital rådighet och strukturella beroenden*, mai 2026: <https://www.civsec.se/documents/Digital%20r%C3%A5dighet%20och%20strukturella%20beroenden_1.1.pdf>
[^2]: Supreme Court of the United States, *Trump v. Slaughter*, 29. juni 2026: <https://www.supremecourt.gov/opinions/25pdf/25-332_qn12.pdf>
[^3]: European Commission, *Adequacy decision for the EU-US Data Privacy Framework*, 10. juli 2023: <https://commission.europa.eu/document/fa09cbad-dd7d-4684-ae60-be03fcb0fddf_en>
[^4]: noyb, formelt brev til Europakommisjonen om EU-US data transfers, 30. juni 2026: <https://noyb.eu/sites/default/files/2026-06/Letter_noyb_EU-US_data_transfers.pdf>
[^5]: noyb, "US Supreme Court just blew up EU-US Data Transfers", 29. juni 2026: <https://noyb.eu/en/us-supreme-court-just-blew-eu-us-data-transfers>
[^6]: Anthropic, "Statement on the US government directive to suspend access to Fable 5 and Mythos 5", 12. juni 2026: <https://www.anthropic.com/news/fable-mythos-access>
[^7]: Anthropic, "Redeploying Fable 5", 30. juni 2026: <https://www.anthropic.com/news/redeploying-fable-5>
[^8]: Federal Register, Executive Order 13884, 7. august 2019: <https://www.federalregister.gov/documents/2019/08/07/2019-17052/blocking-property-of-the-government-of-venezuela>
[^9]: The Verge, "Adobe is cutting off users in Venezuela due to US sanctions", 8. oktober 2019: <https://www.theverge.com/2019/10/7/20904030/adobe-venezuela-photoshop-behance-us-sanctions>
[^10]: Associated Press, "Trump's sanctions on ICC prosecutor have halted tribunal's work", 2025: <https://apnews.com/article/icc-trump-sanctions-karim-khan-court-a4b4c02751ab84c09718b1b95cbd5db3>
[^11]: UK Parliament, skriftlig svar HL8755, 8. juli 2025: <https://lordsbusiness.parliament.uk/ItemOfBusiness?businessPaperDate=2025-06-25&itemOfBusinessId=157147&sectionId=50>
