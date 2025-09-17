---
ai: true
title: "Situationen efter EU-USA's databeskyttelsesramme (DPF)"
section: "Hvidbog"
language: "da"
date: "2024-03-13"
intro: "På baggrund af EU-Kommissionens seneste beslutning om dataoverførsler til amerikanske cloudtjenesteudbydere i juli 2023 er der anledning til igen at gennemgå de ændrede omstændigheder."
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
toc: "Indhold"
aliases:
- /whitepaper/eu-us-dpf/
---
{{< ingress >}}
Europa-Kommissionens seneste beslutning om dataoverførsler til USA har igen sat fokus på de retlige og tekniske udfordringer som europæiske organisationer.
{{< /ingress >}}

I to tidligere white papers, 2018[^1] og 2020[^2], har Safespring gennemgået den retlige og tekniske situation for organisationer, der planlægger deres IT-infrastruktur.

I anledning af Europa-Kommissionens seneste beslutning om dataoverførsler til amerikanske cloududbydere i juli 2023[^3] er der grund til igen at gennemgå de ændrede omstændigheder.

I hovedsagen forbliver anbefalingerne de samme. Vi har på visse punkter opdateret sproget og fjernet anbefalinger, der henviser til gamle dataoverførsels­afgørelser. Infrastrukturplanlægning er ikke nogen ny aktivitet; grundstenene i det, der udgør et ansvarligt greb om infrastruktur for en overskuelig fremtid, er de samme i dag som for halvtreds år siden, eller tredive eller fem. Det handler om at give sin virksomhed mulighed for at undgå indlåsning hos enkelte leverandører, at kunne forudsige og i bedste fald minimere omkostninger og vedligeholdelsesomkostninger. Både den enkelte virksomhed, Sverige og Europa har i stigende grad behov for at arbejde for råderet over de dele af infrastrukturen, der skal være stabile og fungere, og de dele, der skal muliggøre fleksibilitet, forandring og innovation.

{{< quote "Amelia Andersdotter" >}}
Som påpeget af andre end Safespring er der egentlig få grunde til at tro, at ændringerne i den nye dataoverførselsafgørelse indebærer "i det væsentlige samme beskyttelsesniveau" som europæisk ret.
{{< /quote >}}

## Baggrund

### Europæiske dataoverførselsafgørelser

Den 10. juli 2023 offentliggjorde Europa-Kommissionen sin seneste afgørelse med hensyn til retlig sikkerhed ved overførsel af personoplysninger til aktører, der er underlagt amerikansk ret: EU-US Data Protection Framework (DPF). Dette er en opfølger til afgørelserne Safe Harbor og Privacy Shield, som tidligere er kendt ugyldige af EU-Domstolen. Til grund for EU-US DPF ligger forhandlinger mellem EU’s medlemslande og Europa-Kommissionen på den ene side og Europa-Kommissionen og føderale myndigheder i USA på den anden. Forhandlingerne har resulteret i en aftale mellem USA og EU, som fremgår af et appendiks til afgørelsen.

Blandt nyhederne i EU-US DPF indgår henvisninger til vigtige begreber i europæisk databeskyttelsesret: proportionalitet,[^4] nødvendighed[^5] og legitime interesser[^6]. Den tidligere ombudsmandsfunktion er opdelt i nye funktioner: en Civil Liberties Protection Officer[^7] og en Data Protection Review Court[^8].

Som påpeget af andre end Safespring er der egentlig få grunde til at tro, at disse ændringer indebærer "i det væsentlige samme beskyttelsesniveau"[^9]. Proportionalitet, nødvendighed og legitime interesser er ikke absolutte, men relative begreber. Hvis udgangspunktet er, at amerikanske sikkerhedsinteresser, for eksempel forhold, der kan påvirke amerikansk økonomi, amerikanske virksomheder eller amerikanske statsborgere, står over andre interesser, kan det både være nødvendigt og proportionalt at indskrænke europæiske borgeres rettigheder efter amerikansk ret.

EU-Domstolens indvending mod den tidligere ombudsmandsfunktion var heller ikke begrundet i, at titlen ombudsmand er forkert, men i de beføjelser, ombudsmanden var tillagt. Domstolsfunktionen anses ikke af EU-Domstolen for at være en forvaltningsmyndighed, hvis opgave fleksibelt kan styres ud fra politiske direktiver, men som en selvstændig og separat funktion adskilt fra øvrige politisk styrede aktiviteter. Også Den Europæiske Tilsynsførende for Databeskyttelse, EDPS, har i en afgørelse mod Europa-Kommissionen fastslået, at man på baggrund af EU-Domstolens afgørelser må udlede, at kun europæiske myndigheder kan bemyndiges til at fremsætte hemmelige krav på adgang til beskyttede data[^10].

Ud fra dette perspektiv vil EU-Domstolen ved en retlig prøvelse sandsynligvis ikke kunne gøre andet end at underkende også EU-US DPF. Det behøver ikke at tage lang tid. Safe Harbor-afgørelsen blev underkendt efter 15 år, og Privacy Shield-afgørelsen efter fire år. Nye retlige muligheder for europæiske borgere til at forsvare deres rettigheder ved domstol har væsentligt forkortet afstanden mellem formodet ulovlig afgørelse og retlig prøvelse ved EU-Domstolen. Selv om rettens mølle stadig maler langsomt, mener vi hos Safespring, at den ikke længere kan antages at male langsommere end tidshorisonten for planlægning af IT-infrastruktur.

### Svensk lovgivning

Det er ikke kun den europæiske ret, der spiller en rolle for svenske virksomheder, der planlægger deres IT-infrastruktur. Også svensk lovgivning i form af säkerhetsskyddslagen og offentlighets- och sekretesslagen spiller ind. Det kan for eksempel dreje sig om tolkningen af begreber som "att röja [en sekretessklassad uppgift]", "direktåtkomst" eller forskellen mellem en udlevering og teknisk behandling. I dag er det uklart, om og hvordan regeringen skelner mellem situationen, hvor forskellige myndigheder samarbejder om IT-drift (samordning), og hvor en enkelt myndighed indgår aftale med en privat aktør om at levere IT-drift (udlicitering)[^11].

Ved analyser af forsyningskæder kan der opstå spørgsmål om, i hvilket omfang kunden skal sikre, at underleverandører af supporttjenester har eller har haft problematiske statsborgerskaber. Eksempelvis når en balkansk servicetekniker i Tjekkiet leverer systemadministrative supporttjenester til et myndighedssystem i Sverige[^12]. I visse tilfælde bliver kravene så strenge, at en sikkerhedsgodkendelse skal gennemføres for alt personale, der håndterer IT-systemet, hvor svensk statsborgerskab er et krav for overhovedet at kunne blive godkendt.

Ved vurderingen af uklarheder omkring tolkningen af svensk lovgivning har kunden ofte først behov for at finde ud af, om den er samfundsvigtig virksomhed i den betydning, som anvendes i svensk, national sikkerhedspolitik[^13]. Et kommunalt elnet kan for eksempel være lokalt samfundsvigtigt, men ikke nationalt samfundsvigtigt. Statlige myndigheder er ofte nationalt samfundsvigtige.

Den svenske lovgivnings indvirkning på infrastrukturplanlægning handler først og fremmest om administrativ råderet.

### Standardisering, åben kildekode og certificering

En vigtig udvikling i den europæiske ret er, at der lægges stadig større vægt på industrinormer, standarder og certificeringer. Dette gælder eksempelvis i NIS2-direktivet, men endnu tydeligere i love som AI Act og Cyber Resilience Act.

Standardisering og certificering i IT-industrien er ikke nyt. Enheder til generering af kryptografiske signaturer har for eksempel været standardiseret siden 1990’erne. Tænk eksempelvis banktokens, kortlæsere, chipsene på biometriske pas og ID-kort og lignende applikationer. Også for software findes kvalitetsstandarder: de såkaldte Common Criteria og FIPS bruges i Nordamerika til at teste implementationer af sikkerhedsfunktioner. I EU findes der ingen tilsvarende regiondækkende initiativer eller standarder.

Den mest almindelige kritik af certificeringsprogrammer for software er, at certificeringscyklusserne er lange og dyre for leverandører at komme igennem. Det mindsker incitamentet til at opdage, analysere og afhjælpe sikkerhedsproblemer, efter at certificeringen er gennemført, selv om ingen eksisterende certificering garanterer fejlfri produkter (og i tilfælde af software er det endda ikke muligt).

Generelt bliver det stadig mere almindeligt, at man inden for en bestemt branche samarbejder om fælles udviklede, åbne applikationsgrænseflader (API'er). Eksempelvis OpenRAN, som er en mængde grænseflader til håndtering af mobilnetudstyr, består af open source-applikationer, som hver enkelt mobilnetoperatør kan bidrage til, ændre i deres egne net eller implementere as is for at sikre højest mulige grad af interoperabilitet med andre mobilnet. Tilsvarende sæt af grænseflader findes for cloudtjenester, håndtering af tingenes internet, grænseflader til elektronik i biler m.m. Åben kildekode er blevet den hurtigste måde at sikre størst muligt digitalt samspil.

At kildekoden er åben, mindsker mulighederne for, at leverandører og implementatører kan skjule sikkerhedsfejl, der opdages efter eventuel certificering. Det skaber også mulighed for samfundsmæssig styring af de ressourcer, der går ind i de konsortier, som er ansvarlige for grænsefladeudviklingen. Præcis hvordan styringen vil udvikle sig, må vise sig, men som det fremgår, findes der både sikkerhedsmæssige og samarbejdsmæssige grunde til at orientere sig mod open source-løsninger.

## Anbefalinger

### Fastlæg den tidshorisont, I vil arbejde med

- Bestem, på hvilken tidshorisont I planlægger jeres infrastruktur, og hvor ofte I vil eftersøge og indkøbe nye tjenester. Sammenlign denne tidshorisont med, hvor hurtigt retsstillingen, den teknologiske situation og jeres organisation i øvrigt kan ændre sig.
- Lav en analyse af ændringstakten for aftalevilkår, og hvilken indflydelse I kan udøve over denne. Det kan for eksempel dreje sig om vilkår for prissætning og tjenestetilgængelighed.
  - Bemærk: Ved brug af leverandørers standardaftaler er det almindeligt, at vilkårene kan ændres, også ved kundens passive samtykke. At afvise ændringer i standardaftalen svarer i disse situationer til at igangsætte et migrationsprojekt.
- Test og modeller forskellige scenarier. Sæt tal på jeres sandsynlighedsvurderinger og konsekvensanalyser. {{< note "Eksempel på scenarie" >}}<p>Hvis der f.eks. antages at være 20 % risiko for et fuldt stop for overførsel af personoplysninger til amerikanske tjenester i tolv måneder med start om ni måneder, hvordan ville dette påvirke virksomheden og beslutningsprocessen omkring IT-strategi vedrørende valg af leverandører?</p>{{< /note >}}

### Skab forudsætninger for enkel migration

- At bygge sit miljø med containere (f.eks. Kubernetes eller Docker) gør det lettere at migrere udviklings- og produktionsmiljøer mellem leverandører sammenlignet med virtuelle servere eller fysiske servere.
- Beregn, hvordan dataoverførselsomkostningerne vil slå igennem den dag, I vil flytte ud. Mange cloudtjenesteudbydere tager ikke betaling for at uploade data. Til gengæld tager mange betaling for at hente data hjem.
  - Bemærk: Dette kaldes ofte ingress (uploade) og egress (hente hjem).
- Adskil data fra tjenester med åbne (eller standardiserede) grænseflader for lettere at kunne skifte datalagringsplatform.
  - Faldgrube: Amazons S3-protokol er en de facto-standard for storskala lagring af ustrukturerede data i skyen. Desværre er det ikke altid muligt at opnå digital interoperabilitet med alle de funktioner, Amazon bygger ind i sin version af S3. Hvis I vil bruge S3, bør I sikre, at I kun anvender funktioner, som kan indarbejdes i alle S3-udbyderes tjenester.
- Invester i egen identitetsstyring i stedet for at stole på cloududbyderens. Opstartsfasen bliver lidt længere, men migrationen bliver meget enklere.
- Sørg for, at tjenesteudbyderen ved udformningen af sin tjeneste har anvendt åbent specificerede API'er og dataformater.

### Beskyttelse af personoplysninger

- Gør grundarbejdet med GDPR omkring håndtering af personoplysninger. Gennemgå:
  - hvor I geografisk lagrer jeres personoplysninger,
  - hvilket retligt grundlag I har for behandlingen,
  - hvor følsomme de personoplysninger er, der behandles,
  - om der er implementeret sletterutiner,
  - hvordan I informerer privatpersoner om behandlingen, og
  - hvis personoplysningerne lagres uden for EU/EØS, hvilket retligt grundlag I har for overførslen dertil. {{< note "Sletning" >}}<p>Sletterutiner er særligt vigtige, hvis oplysningerne lagres i USA, fordi organisationer dermed reducerer mængden af oplysninger, der potentielt kan blive udleveret.</p>{{< /note >}}
- Vurder sikkerhedsklassificeringen af de data, der behandles i organisationen. Denne vurdering er nødvendig for at kunne foretage en korrekt egnetheds- og risikovurdering ved brug af forskellige cloudtjenester.
  - Er det følsomme personoplysninger?
  - Offentlige oplysninger?
  - Privat kommunikation?

### Sikkerhed

- Vil jeres virksomhed blive omfattet af krav til sikkerhedsstandarder? I så fald hvilke?
  - Hvordan vil I verificere leverandører?
  - Hvilke certifikater vil I acceptere?
  - Vil I kunne samarbejde med andre om evaluering af certifikater?
  - Hvordan vil I overvåge udviklingen, der sker efter certifikatets udstedelse?
- Hvordan vil I håndtere løbende sikkerhedsopdateringer?

### Håndtering af forsyningskæden

- Hav styr på hele forsyningskæden:
  - Kontrollér, om tjenesteudbydere i direkte led anvender underleverandører i form af andre cloudtjenesteudbydere.
  - Verificér, at der findes aftaler mellem tjenesteudbyderen og underleverandøren, samt at aftalen er i overensstemmelse med de databeskyttelsesretlige krav.
  - Kontrollér, om enten tjenesteudbyderen som sådan eller tjenesteudbyderens underleverandører har deres juridiske hjemsted i tredjelande. Foretag en vurdering af, om dette kan indebære en risiko for, at tredjelandets myndigheder kan pålægge enten underleverandøren eller tjenesteudbyderen at udlevere oplysninger til tredjelandets myndigheder.

## Kildeliste

[^1]: Safespring. (2018). _Cloud Act White Paper_. Hentet fra [safespring.com](/whitepaper/cloudact/)

[^2]: Safespring. (2020). _Schrems II White Paper_. Hentet fra [safespring.com](/whitepaper/schrems-ii/)

[^3]: Europa-Kommissionen. (2023). _C(2023) 4745 final_. Hentet fra [commission.europa.eu](https://commission.europa.eu/system/files/2023-07/Adequacy%20decision%20EU-US%20Data%20Privacy%20Framework_en.pdf)

[^4]: Europa-Kommissionen. (2023). _C(2023) 4745 final, Rec. 131_. Den Europæiske Unions charter om grundlæggende rettigheder, artikel 52, stk. 1.

[^5]: Europa-Kommissionen. (2023). _C(2023) 4745 final, Rec. 138_. Den Europæiske Unions charter om grundlæggende rettigheder, artikel 52, stk. 1.

[^6]: Europa-Kommissionen. (2023). _C(2023) 4745 final, Rec. 134-135_. Databeskyttelsesforordningen (GDPR), 679/2016, artikel 6, stk. 1, litra f.

[^7]: Europa-Kommissionen. (2023). _C(2023) 4745 final, Rec. 126_.

[^8]: Europa-Kommissionen. (2023). _C(2023) 4745 final, Rec. 184_.

[^9]: noyb. (2023, 10. juli). _European Commission gives EU-US data transfers third round at CJEU_. Hentet fra [noyb.eu](https://noyb.eu/en/european-commission-gives-eu-us-data-transfers-third-round-cjeu)

[^10]: Den Europæiske Tilsynsførende for Databeskyttelse. (2024). _EDPS/2024/05_. European Commission’s use of Microsoft 365 infringes data protection law for EU institutions and bodies. Hentet fra [edps.europa.eu](https://www.edps.europa.eu/system/files/2024-03)