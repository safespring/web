---
title: "Service Level Agreement"
date: 2026-04-15
draft: false
intro: "Om oppetid og hjelp. Forklarer tilgjengelighetsmål, hendelseshåndtering, responsforventninger og hvilken løsning som gjelder hvis mål blir oversett."
documentimage: "safespring_card_21.jpg"
sidebarlinkname: ""
sidebarlinkicon: ""
sidebarlinkurl: ""
general: "yes"
toc: "Innhold"
language: "nb"
noindex: "x"
ai: true
aliases:
  - /document/service_level_agreement/
---


I løpet av avtaleperioden som Safespring har samtykket i å levere sine tjenester til
kunden ("Avtalen"), vil hver dekket tjeneste gi en månedlig oppetidsprosent til kunden
som angitt i tabellene nedenfor ("servicenivåmålet" eller "SLO").

Hvis Safespring ikke oppfyller SLO, og hvis Kunden oppfyller sine forpliktelser i
henhold til denne SLA, vil Kunden være kvalifisert til å motta de finansielle kredittene
beskrevet nedenfor. Denne serviceavtalen angir kundens eneste og eksklusive rettsmiddel
for Safesprings manglende oppfyllelse av SLO.

## 1. Tjenestenivåmål

Mål for månedlig oppetidsprosent settes per dekket tjeneste. Hver tjeneste måles
uavhengig på kalendermånedsbasis.

| Dekket tjeneste | Månedlig oppetid % |
|---|---|
| **Compute (IaaS), Network, Block Storage** | **99,99 %** |
| **Kubernetes (kontrollplan)** | **99,95 %** |
| **Objektlagring (S3)** | **99,95 %** |
| **Sikkerhetskopieringstjeneste** | **99,9 %** |

**Merk:** Kubernetes SLO gjelder kun for kontrollplanet. Arbeider node
tilgjengelighet er styrt av den underliggende Compute SLO.

## 2. Latency-mål

I tillegg til tilgjengelighet har følgende tjenester ventetidsmål målt ved 95.
persentilen (p95) over en kalendermåned.

| Service | Metrisk | Min | Gj.sn. (p50) | Maks (p95) |
|---|---|---|---|---|
| **Nettverk (intra-site)** | Rundtur | [TBD] | [TBD] | [TBD] |
| **Blokker lagring (les)** | IOPS latens | [TBD] | [TBD] | [TBD] |
| **Blokker lagring (skriv)** | IOPS latens | [TBD] | [TBD] | [TBD] |
| **Objektlagring (S3)** | Første byte | [TBD] | [TBD] | [TBD] |

**Merk:** Mål for ventetid er informative og dekkes ikke av
Finansielle kreditter. Vedvarende brudd kan rapporteres til Safespring-støtte for
etterforskning.

## 3. Definisjoner

Følgende definisjoner gjelder for SLA:

### Dekket tjeneste

- **BEREGN**
Safespring Compute-tjeneste inkludert virtuelle maskiner, lokal lagring og
blokklagringsvolumer.
- **NETTVERK**
Nettverkstilkoblingen mellom kundeforekomster innenfor et Safespring-nettsted og til
eksterne endepunkter.
- **BLOKK LAGRING**
Vedvarende blokklagringsvolumer knyttet til Compute-forekomster.
- **KUBERNETES**
Kubernetes API og kontrollplan levert av Safesprings administrerte Kubernetes-tilbud.
- **OPPBEVARING AV OBJEKTER**
Safesprings S3-kompatible objektlagringstjeneste.
- **BACKUP**
Safesprings sky backup-tjeneste.

### Nedetid

Nedetid er definert per dekket tjeneste som følger:

- **BEREGN**
En virtuell maskin blir utilgjengelig, krasjer eller mister tilgang til den tilknyttede
blokklagringen, noe som påvirker forekomster på tvers av to eller flere fysiske verter.
En enkelt vertsfeil er utelukket (se avsnitt 5).
- **NETTVERK**
Fullstendig tap av nettverkstilkobling på områdenivå som påvirker alle kunder.
- **BLOKK LAGRING**
Manglende evne til å utføre lese- eller skrive I/O-operasjoner på klargjorte volumer.
- **KUBERNETES**
Kubernetes API er utilgjengelig eller kan ikke behandle forespørsler for alle klynger.
Svikt i individuelle arbeidernoder eller pods regnes ikke som nedetid og dekkes under
Compute SLO.
- **OPPBEVARING AV OBJEKTER**
S3 API er utilgjengelig eller kan ikke behandle lese-, skrive- eller listeforespørsler.
- **BACKUP**
Sikkerhetskopieringstjenesten er utilgjengelig og klienter kan ikke starte eller
fullføre sikkerhetskopierings- eller gjenopprettingsoperasjoner.

### Nedetidsperiode

"Neetidsperiode" betyr en periode på fem eller flere sammenhengende minutter med
nedetid. Intermitterende nedetid for en periode på mindre enn fem minutter vil ikke bli
regnet med i noen nedetidsperioder.

### Månedlig oppetidsprosent

"Månedlig oppetidsprosent" betyr totalt antall minutter i en kalendermåned, minus antall
minutter nedetid som er påført av alle nedetidsperioder i den måneden, delt på det
totale antallet minutter i måneden.

### Planlagt nedetid

"Planlagt nedetid" betyr nedetid som følge av at Safespring utfører vedlikehold under et
forhåndskommunisert vedlikeholdsvindu. Planlagt nedetid er ekskludert fra beregningen av
månedlig oppetidsprosent.

### Vedlikeholdsvindu

En tidsperiode hvor Safespring utfører planlagt vedlikehold på en dekket tjeneste.
Vedlikehold Vinduer skal annonseres minst 5 virkedager i forveien. Ett vedlikeholdsvindu
per service per måned er standard. I unntakstilfeller som involverer eksterne
sikkerhetstrusler, kan ytterligere vedlikeholdsvinduer annonseres med så mye varsel som
mulig.

## 4. Finansielle kreditter

Finansielle kreditter fastsettes på kalendermånedsbasis per dekket tjeneste.

- **MUP** månedlig oppetidsprosent
- **PMB** Prosentandel av månedlig regning for de respektive dekkede
Berørt tjeneste som ikke oppfylte SLO som vil bli kreditert fremtidige månedlige
regninger til kunden.

### Databehandling, nettverk og blokklagring

| **MUP** | **PMB** |
|---|---|
| 99,00 % til < 99,99 % | 10 % |
| 95,00 % til < 99,00 % | 25 % |
| < 95,00 % | 50 % |

### Kubernetes og objektlagring

| **MUP** | **PMB** |
|---|---|
| 99,00 % til < 99,95 % | 10 % |
| 95,00 % til < 99,00 % | 25 % |
| < 95,00 % | 50 % |

### Sikkerhetskopiering

| **MUP** | **PMB** |
|---|---|
| 99,00 % til < 99,90 % | 10 % |
| 95,00 % til < 99,00 % | 25 % |
| < 95,00 % | 50 % |

### Kunden må be om finansiell kreditt

For å motta noen av de finansielle kredittene beskrevet ovenfor, må kunden varsle
Safespring innen tretti dager fra det tidspunktet kunden blir kvalifisert til å motta en
finansiell kreditt. Kunden må også oppgi loggfiler eller overvåkingsdata som viser
tjenestens utilgjengelighet og datoene og klokkeslettet disse feilene oppsto.

### Maksimal finansiell kreditt

Det samlede maksimale antallet finansielle kreditter som skal utstedes av Safespring til
kunden for alle nedetidsperioder som oppstår i en enkelt faktureringsmåned, vil ikke
overstige 50 % av beløpet som kunden skal betale for den berørte dekkede tjenesten for
den aktuelle måneden. Finansielle kreditter vil bli gitt i form av en pengekreditt som
brukes for fremtidig bruk av tjenesten og vil bli brukt innen 60 dager etter at
finanskreditten ble forespurt.

## 5. SLA-ekskluderinger

Denne SLAen gjelder ikke for noen:

(a) Planlagt nedetid eller forhåndskommuniserte vedlikeholdsvinduer;

(b) Maskinvarefeil som påvirker individuelle dataverter;

(c) Funksjoner utpekt som beta;

(d) feil forårsaket av faktorer utenfor Safesprings rimelige kontroll;

(e) Feil som skyldes kundens programvare, maskinvare eller tredjeparts programvare eller
maskinvare;

(f) Feil som er et resultat av misbruk eller annen atferd som bryter avtalen eller
retningslinjene for akseptabel bruk;

(g) Feil forårsaket av kvoter eller ressursgrenser oppført i selvbetjeningsportalen.

## 6. Måling og overvåking

Tilgjengelighet måles ved koblingspunktet (leveringspunktet) ved hjelp av Safesprings
infrastrukturovervåkingssystemer ved datasenteret.

Kunden er ansvarlig for å overvåke sine egne forekomster og sikre at tjenestene kjører
etter et avbrudd.

Kunder oppfordres til å abonnere på statussiden på https://status.safespring.com for
hendelsesoppdateringer i sanntid.
