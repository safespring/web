---
ai: true
title: "Status etter EU-US Data Protection Framework (DPF)"
section: "Hvitbok"
language: "nb"
date: "2024-03-13"
intro: "På bakgrunn av EU-kommisjonens nyeste vedtak fra juli 2023 om dataoverføringer til amerikanske skytjenesteleverandører, er det grunn til igjen å se over de endrede omstendighetene."
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
toc: "Innhold"
aliases:
  - /whitepaper/eu-us-dpf/
---

{{< ingress >}}
EU-kommisjonens siste beslutning om dataoverføringer til USA har igjen satt søkelys på de rettslige og tekniske utfordringene som europeiske organisasjoner.
{{< /ingress >}}

I to tidligere white papers, 2018[^1] og 2020[^2], har Safespring gått gjennom det rettslige og tekniske bildet for organisasjoner som planlegger sin IT-infrastruktur.

På bakgrunn av EU-kommisjonens siste vedtak om dataoverføringer til amerikanske skyleverandører i juli 2023[^3] er det grunn til å på nytt se over de endrede omstendighetene.

I hovedsak forblir anbefalingene de samme. Vi har på enkelte punkter oppdatert språket og fjernet anbefalinger som viser til gamle dataoverføringsvedtak. Infrastrukturplanlegging er ingen ny aktivitet; grunnsteinene i det som utgjør et ansvarlig grep om infrastruktur for en overskuelig fremtid er de samme i dag som for femti år siden, eller tretti eller fem. Det handler om å gi virksomheten mulighet til å unngå innlåsing til enkeltleverandører, å kunne forutsi og helst minimere kostnader og vedlikeholdskostnader. Både den enkelte virksomhet, Sverige og Europa trenger i økende grad å verne om råderetten over de delene av infrastrukturen som skal være stabile og fungere, og de delene som skal muliggjøre fleksibilitet, endring og innovasjon.

{{< quote "Amelia Andersdotter" >}}
Som påpekt av andre enn Safespring finnes det egentlig få grunner til å tro at endringene i det nye dataoverføringsvedtaket innebærer «vesentlig samme beskyttelse» som europeisk rett.
{{< /quote >}}

## Bakgrunn

### Europeiske dataoverføringsvedtak

Den 10. juli 2023 offentliggjorde EU-kommisjonen sitt siste vedtak med hensyn til rettslig sikkerhet ved overføring av personopplysninger til aktører som er underlagt amerikansk rett: EU-US Data Protection Framework (DPF). Dette er en oppfølger til vedtakene Safe Harbor og Privacy Shield som tidligere er kjent ugyldige av EU-domstolen. Til grunn for EU–US DPF ligger forhandlinger mellom EUs medlemsland og EU-kommisjonen på den ene siden, og EU-kommisjonen og føderale myndigheter i USA på den andre. Forhandlingene har resultert i en overenskomst mellom USA og EU som ligger i et vedlegg til vedtaket.

Blant nyhetene i EU–US DPF inngår henvisninger til viktige begreper i europeisk personvernrett: proporsjonalitet,[^4] nødvendighet[^5] og berettigede interesser[^6]. Den tidligere ombudsmannsfunksjonen er delt opp i nye funksjoner: en Civil Liberties Protection Officer[^7] og en Data Protection Review Court[^8].

Som påpekt av andre enn Safespring finnes det egentlig få grunner til å tro at disse endringene innebærer «vesentlig samme beskyttelse»[^9]. Proporsjonalitet, nødvendighet og berettigede interesser er ikke absolutte, men relative begreper. Hvis utgangspunktet er at amerikanske sikkerhetsinteresser, for eksempel forhold som kan påvirke amerikansk økonomi, amerikanske selskaper eller amerikanske borgere, er overordnet andre interesser, kan det være både nødvendig og proporsjonalt å innskrenke europeiske borgeres rettigheter etter amerikansk rett.

EU-domstolens innvending mot den tidligere ombudsmannsfunksjonen var heller ikke begrunnet i at tittelen ombudsmann er feil, men i hvilke fullmakter ombudsmannen var tildelt. Domstolsfunksjonen anses ikke av EU-domstolen som en forvaltningsmyndighet hvis oppdrag fleksibelt kan styres etter politiske direktiver, men som en egen og separat funksjon fristilt fra øvrige politisk styrte virksomheter. Også Det europeiske datatilsynet, EDPS, har i en avgjørelse mot EU-kommisjonen fastslått at man, ut fra EU-domstolens avgjørelser, må slutte at bare europeiske myndigheter kan bemyndiges til å fremsette hemmelige krav på tilgang til beskyttede data[^10].

Ut fra dette perspektivet vil EU-domstolen ved en rettslig prøving sannsynligvis ikke kunne gjøre annet enn å underkjenne også EU–US DPF. Det trenger ikke ta lang tid. Safe Harbor-vedtaket ble underkjent etter 15 år, og Privacy Shield-vedtaket etter fire år. Nye rettslige muligheter for europeiske borgere til å forsvare sine rettigheter i domstol har betydelig forkortet veien mellom et antatt ulovlig vedtak og rettslig prøving i EU-domstolen. Selv om rettferdighetens kvern fortsatt maler langsomt, mener vi i Safespring at den ikke lenger kan antas å male langsommere enn tidshorisonten for planlegging av IT-infrastruktur.

### Svensk lovgivning

Det er ikke bare europeisk rett som har betydning for svenske virksomheter som planlegger sin IT-infrastruktur. Også svensk lovgivning i form av säkerhetsskyddslagen og offentlighets- och sekretesslagen spiller inn. Det kan for eksempel gjelde tolkningen av begreper som «att röja [en sekretessklassad uppgift]», «direktåtkomst», eller forskjellen mellom en utlevering og teknisk behandling. I dag er det uklart om og hvordan regjeringen skiller mellom situasjonen der ulike myndigheter samarbeider om IT-drift (samordning) og at en enkelt myndighet avtaler med en privat aktør om å levere IT-drift (utkontraktering)[^11].

Ved analyser av forsyningskjeder kan det oppstå spørsmål om i hvilken utstrekning kunden må sikre at underleverandører av støttetjenester har eller har hatt problematiske statsborgerskap. For eksempel når en balkansk servicetekniker i Tsjekkia leverer systemadministrative støttetjenester for et myndighetssystem i Sverige[^12]. I noen tilfeller blir kravene så strenge at en sikkerhetsklarering må gjennomføres for alt personell som håndterer IT-systemet, der svensk statsborgerskap er et krav for i det hele tatt å kunne bli klarert.

Ved vurderingen av uklarheter rundt tolkning av svensk lovgivning må kunden ofte først finne ut om den er samfunnskritisk virksomhet i den betydningen som brukes i svensk, nasjonal sikkerhetspolitikk[^13]. Et kommunalt kraftnett kan for eksempel være lokalt samfunnskritisk, men ikke nasjonalt samfunnskritisk. Statlige myndigheter er mange ganger nasjonalt samfunnskritiske.

Den svenske lovgivningens innvirkning på infrastrukturplanlegging handler først og fremst om administrativ råderett.

### Standardisering, åpen kildekode og sertifisering

En viktig utvikling i europeisk rett er at stadig sterkere vekt legges på bransjenormer, standarder og sertifiseringer. Dette gjelder for eksempel i NIS2-direktivet, men enda tydeligere i lover som AI Act og Cyber Resilience Act.

Standardisering og sertifisering i IT-bransjen er ikke noe nytt. Apparater for generering av kryptografiske signaturer har for eksempel vært standardisert siden 1990-tallet. Tenk for eksempel kodebrikker, kortlesere, chipene på biometriske pass og ID-kort og lignende applikasjoner. Også for programvare finnes kvalitetsstandarder: de såkalte Common Criteria og FIPS brukes i Nord-Amerika for å teste implementasjoner av sikkerhetsfunksjoner. I EU finnes det ingen tilsvarende regionomfattende initiativer eller standarder.

Den vanligste kritikken mot sertifiseringsprogrammer for programvare er at sertifiseringssyklusene er lange og dyre for leverandører å komme igjennom. Det reduserer insentivet til å oppdage, analysere og utbedre sikkerhetsproblemer etter at sertifiseringen er ferdig, selv om ingen eksisterende sertifisering garanterer feilfrie produkter (og det er for programvare ikke engang mulig).

Generelt blir det stadig vanligere at man innen en viss industri samarbeider om felles utviklede, åpne applikasjonsgrensesnitt (API-er). Eksempelvis OpenRAN, som er en mengde grensesnitt for håndtering av mobilnettutstyr, består av åpen kildekode-applikasjoner som hver av mobilnettoperatørene kan bidra til, endre i egne nett eller implementere «as is» for å sikre høyest mulig grad av interoperabilitet med andre mobilnett. Tilsvarende grensesnittsmengder finnes for skytjenester, håndtering av tingenes internett, grensesnitt for elektronikk i biler, med mer. Åpen kildekode har blitt den raskeste måten å garantere mest mulig digital samhandling.

At kildekoden er åpen, reduserer muligheten for leverandører og implementatører til å skjule sikkerhetsfeil som oppdages etter eventuell sertifisering. Det skaper også mulighet for samfunnsmessig styring av ressursene som går inn i konsortiene som har ansvar for grensesnittsutviklingen. Hvordan denne styringen nøyaktig vil utvikle seg, gjenstår å se, men som vist finnes det både sikkerhets- og samhandlingsgrunner til å orientere seg mot løsninger med åpen kildekode.

## Anbefalinger

### Etabler tidshorisonten dere vil jobbe på

- Bestem på hvilken tidshorisont dere planlegger infrastrukturen og hvor ofte dere vil etterspøre og anskaffe nye tjenester. Sammenlign denne tidshorisonten med hvor raskt rettstilstanden, teknologisituasjonen og organisasjonen deres for øvrig kan endre seg.
- Gjør en analyse av endringstakten for avtalevilkår og hvilken innflytelse dere kan utøve over disse. Det kan for eksempel gjelde vilkår om prissetting og tjenestetilgang.
  - Merk: Ved bruk av leverandørers standardavtaler er det vanlig at vilkårene kan endres selv ved passivt samtykke fra kunden. Å ikke godta standardavtaleendringer er i disse situasjonene ensbetydende med å igangsette et migreringsprosjekt.
- Test og modeller ulike scenarier. Tallfest deres sannsynlighetsvurderinger og konsekvensanalyser. {{< note "Eksempel på scenario" >}}<p>Hvis det for eksempel antas å være 20 % risiko for full stopp i overføring av personopplysninger til amerikanske tjenester i tolv måneder med oppstart om ni måneder, hvordan vil dette påvirke virksomheten og beslutningsprosessen rundt IT-strategi ved valg av leverandører?</p>{{< /note >}}

### Legg til rette for enkel migrering

- Å bygge miljøet med containere (f.eks. Kubernetes eller Docker) gjør det enklere å migrere utviklings- og produksjonsmiljøer mellom leverandører sammenlignet med virtuelle servere eller fysiske servere.
- Regn på hvordan dataoverføringskostnadene vil slå ut den dagen dere vil flytte ut. Mange skytjenesteleverandører tar ikke betalt for å laste opp data. Derimot tar mange betalt av kundene for å hente data ut.
  - Merk: Dette kalles ofte ingress (laste opp) og egress (hente ut).
- Skill data fra tjenester med åpne (eller standardiserte) grensesnitt for enklere å kunne bytte datalagringsplattform.
  - Fallgruve: Amazons S3-protokoll er en de facto-standard for storskala lagring av ustrukturert data i skyen. Dessverre er det ikke alltid mulig å samhandle digitalt med all funksjonalitet Amazon bygger inn i sin versjon av S3. Hvis du skal bruke S3, bør du sørge for å bare bruke funksjonalitet som lar seg implementere hos alle S3-leverandører.
- Invester i egen identitetshåndtering i stedet for å stole på skyleverandørens. Startstrekket blir litt lengre, men migreringen blir mye enklere.
- Sørg for at tjenesteleverandøren ved utformingen av sin tjeneste har brukt åpent spesifiserte API-er og dataformater.

### Personvern

- Gjør grunnarbeidet med GDPR for håndtering av personopplysninger. Se over:
  - hvor dere geografisk lagrer personopplysningene,
  - hvilket rettslig grunnlag dere har for behandlingen,
  - hvor sensitive personopplysninger som behandles,
  - om det finnes en kassasjonsrutine implementert,
  - hvordan dere informerer enkeltpersoner om behandlingen, og
  - dersom personopplysningene lagres utenfor EU/EØS, hvilket rettslig grunnlag dere har for overføringen dit. {{< note "Kassasjon" >}}<p>Kassasjonsrutiner er spesielt viktige dersom opplysningene lagres i USA, fordi organisasjoner da reduserer mengden opplysninger som kan komme til å måtte utleveres.</p>{{< /note >}}
- Vurder sikkerhetsklassifiseringen av dataene som behandles i organisasjonen. Denne vurderingen er nødvendig for å kunne gjøre korrekt egnethets- og risikoanalyse rundt bruk av ulike skytjenester.
  - Er det sensitive personopplysninger?
  - Offentlige opplysninger?
  - Privat kommunikasjon?

### Sikkerhet

- Vil virksomheten deres bli omfattet av krav til sikkerhetsstandarder? I så fall, hvilke?
  - Hvordan vil dere verifisere leverandører?
  - Hvilke sertifikater vil dere godkjenne?
  - Vil dere kunne samarbeide med andre ved vurdering av sertifikater?
  - Hvordan skal dere følge med på utvikling som skjer etter at sertifikatene er utstedt?
- Hvordan skal dere håndtere løpende sikkerhetsoppdateringer?

### Håndtering av forsyningskjeden

- Ha kontroll på hele forsyningskjeden:
  - Kontroller om tjenesteleverandører i direkte ledd bruker underleverandører i form av andre skyleverandører.
  - Verifiser at det finnes avtale mellom tjenesteleverandøren og underleverandøren, og at avtalen samsvarer med personvernrettslige krav.
  - Kontroller om enten tjenesteleverandøren som sådan eller tjenesteleverandørens underleverandører har sitt rettslige hjemsted i tredjeland. Gjør en vurdering av om dette kan innebære at myndigheter i tredjeland kan pålegge enten underleverandøren eller tjenesteleverandøren å utlevere opplysninger til tredjelandets myndigheter.

## Kildeliste

[^1]: Safespring. (2018). _Cloud Act White Paper_. Hentet fra [safespring.com](/whitepaper/cloudact/)

[^2]: Safespring. (2020). _Schrems II White Paper_. Hentet fra [safespring.com](/whitepaper/schrems-ii/)

[^3]: Europakommisjonen. (2023). _C(2023) 4745 final_. Hentet fra [commission.europa.eu](https://commission.europa.eu/system/files/2023-07/Adequacy%20decision%20EU-US%20Data%20Privacy%20Framework_en.pdf)

[^4]: Europakommisjonen. (2023). _C(2023) 4745 final, Rec. 131_. Den europeiske unions pakt om grunnleggende rettigheter, artikkel 52.1.

[^5]: Europakommisjonen. (2023). _C(2023) 4745 final, Rec. 138_. Den europeiske unions pakt om grunnleggende rettigheter, artikkel 52.1.

[^6]: Europakommisjonen. (2023). _C(2023) 4745 final, Rec. 134–135_. Personvernforordningen (GDPR), 679/2016, artikkel 6 nr. 1 f.

[^7]: Europakommisjonen. (2023). _C(2023) 4745 final, Rec. 126_.

[^8]: Europakommisjonen. (2023). _C(2023) 4745 final, Rec. 184_.

[^9]: noyb. (2023, 10. juli). _European Commission gives EU-US data transfers third round at CJEU_. Hentet fra [noyb.eu](https://noyb.eu/en/european-commission-gives-eu-us-data-transfers-third-round-cjeu)

[^10]: Det europeiske datatilsynet. (2024). _EDPS/2024/05_. European Commission’s use of Microsoft 365 infringes data protection law for EU institutions and bodies. Hentet fra [edps.europa.eu](https://www.edps.europa.eu/system/files/2024-03)
