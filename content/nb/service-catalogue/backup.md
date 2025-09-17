---
ai: true
title: "Sikkerhetskopiering som en tjeneste – BaaS"
language: "nb"
cardtitle: "Sikkerhetskopi"
cardicon: "fa-solid fa-cloud-arrow-up"
cardcolor: "#195F8C"
cardorder: "04"
date: 2023-02-28
draft: false
intro: "Backup-tjenesten er basert på IBM’s Spectrum Protect med tre ulike varianter."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nei"
sidebarlinkname: "Tilbake til alle kategorier"
sidebarlinkurl: "/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Safespring tjenestekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
- /service-catalogue/backup/
---
{{< ingress >}}
Tjenester for sikkerhetskopiering i skyen omfatter følgende kategorier:
{{< /ingress >}}

1. Sikkerhetskopiering for filsystemer
1. Sikkerhetskopiering for applikasjoner
1. Sikkerhetskopiering av klienter

## Sikkerhetskopiering for applikasjoner og filsystemer

Programvaren som trengs for å sikkerhetskopiere filsystemer, Microsoft SQL, Microsoft Exchange, Oracle, DB2 og grunnleggende støtte for MySQL er inkludert i tjenesten. I tillegg er programvaren som trengs for å sikkerhetskopiere VMware vSphere-klynger inkludert i tjenesten.

### Forutsetninger

Ingen.

### Tjenestebeskrivelser

Sikkerhetskopieringstjenesten er basert på IBMs Spectrum Protect og tilbys i tre varianter basert på hvor mye data kunden forventer å sikkerhetskopiere. Safespring har utviklet et eget API som orkestrerer koblingen mellom klienter og flåten av backupservere. Spectrum Protect (tidligere kjent som TSM) er primært et filbasert backup-system med en «incremental forever»-strategi, som betyr at filer bare sikkerhetskopieres hvis de har endret seg. Dette reduserer drastisk datamengden som håndteres av backupserveren. I tillegg komprimeres det meste av dataene som sikkerhetskopieres; for data som ikke er klientkryptert, brukes deduplisering i kombinasjon med komprimering. Klientkrypterte data dedupliseres ikke for å garantere maksimal sikkerhet for kundens data. All data lagres med kryptering av data i ro (data-at-rest), og backup-trafikken i nettverket er kryptert med sterke AES-256-chiffer.

Kryptering er bare så sikker som nøkkelhåndteringen, og sikkerhetskopieringsalternativene finnes i følgende tre varianter:

1. Felles kryptering, nøkler eies av leverandøren
1. Felles kryptering, nøkler eies av kunden
1. Kryptering per vert, nøkler eies av kunde/sluttbruker

For alle nivåer er det mulig å planlegge opptil fire (4) sikkerhetskopier per dag. Det finnes flere forhåndsdefinerte starttidspunkter å velge mellom (annenhver time).

| Produktkode     | Type     | Sted | Versjon                 |
| --------------- | -------- | ---- | ----------------------- |
| BAAS-on.demand  | OnDemand | STO1 | Spectrum Protect 7 & 8  |
| BAAS-small      | Small    | STO1 | Spectrum Protect 7 & 8  |
| BAAS-large      | Large    | STO1 | Spectrum Protect 7 & 8  |

#### Plan (filsystemer)

| Plan                 | Beskrivelse                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------- |
| Kontinuerlig inkrementell | Inkrementell sikkerhetskopiering av filsystemer. Starttidspunkter å velge mellom annenhver time. |

#### Plan (applikasjoner)

| Plan                      | Beskrivelse                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------ |
| Full sikkerhetskopi       | Full sikkerhetskopiering av applikasjonen. Starttidspunkter å velge mellom annenhver time.      |
| Inkrementell-/loggsikkerhetskopi | Inkrementell- eller loggsikkerhetskopi avhengig av applikasjon. Starttidspunkter hver time. |

### Tilvalg i sikkerhetskopieringstjenesten

I tillegg til standard oppbevaringsregler tilbyr vi en rekke versjonsbegrensede regler. De beholder sikkerhetskopier i angitt antall dager, men hver fil beholdes kun opptil det maksimale antallet versjoner som er angitt.

Disse reglene har fordelen at de gir et pristak. For eksempel, hvis en fem-versjonsregel velges, vil lagret (og fakturert) mengde aldri overstige fem (5) ganger klientstørrelsen. I de fleste tilfeller vil lagret mengde være lavere, siden bare endrede filer sikkerhetskopieres. En fil som aldri endres, vil fortsatt bare ha én versjon i backup-systemet.

| Oppbevaring | Beskrivelse                                                                     |
| ----------- | ------------------------------------------------------------------------------- |
| 30 dager    | Beholder alle sikkerhetskopidata i 30 dager, opptil fem (5) versjoner per fil beholdes.  |
| 30 dager    | Beholder alle sikkerhetskopidata i 30 dager, opptil ti (10) versjoner per fil beholdes.  |
| 90 dager    | Beholder alle sikkerhetskopidata i 90 dager, opptil ti (10) versjoner per fil beholdes.  |
| 365 dager   | Beholder alle sikkerhetskopidata i 365 dager, opptil fem (5) versjoner per fil beholdes. |
| 365 dager   | Beholder alle sikkerhetskopidata i 365 dager, opptil ti (10) versjoner per fil beholdes. |

Det er mulig å be om andre versjonsbegrensede regler ved behov (f.eks. 17 eller 42 versjoner).

## Snapshot (image) sikkerhetskopiering for virtuelle servere

De samme krypterings- og planleggingsreglene gjelder for snapshots av virtuelle servere.

### Oppbevaringspolicy

| Oppbevaring | Beskrivelse                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| 14 dager    | Beholder alle sikkerhetskopidata i 14 dager, alle versjoner beholdes. Dette tilsvarer ti (10) virkedager.    |

## Profesjonelle tjenester for BaaS

### Generell rådgivning om sikkerhetskopiering

En profesjonell rådgivningstjeneste er tilgjengelig. Tjenesten kan leveres på stedet eller eksternt, avhengig av oppgaven. Tjenesten kan brukes til, men er ikke begrenset til:

- Design av mer komplekse scenarier for sikkerhetskopiering/gjenoppretting
- Implementering av mer komplekse backup-/restore-installasjoner som store MS Exchange- eller MS SharePoint-miljøer
- Implementering av TSM for virtuelle miljøer
- Bistand med sikkerhetskopiering/gjenoppretting av andre applikasjoner
- Opplæring på stedet
- Bistand på stedet under katastrofegjenoppretting
- Testing av gjenoppretting

| Produktkode               | Profesjonell tjeneste                                                               |
| ------------------------- | ----------------------------------------------------------------------------------- |
| BAASPS-generic.consultancy | Generell rådgivningstjeneste for sikkerhetskopiering for å konfigurere bestemte applikasjoner og lignende |
| BAASPS-migration          | Tjeneste for migrering og validering av sikkerhetskopier                            |
| BAASPS-offsite            | Tjenester for eksternt backup-mål                                                   |
| BAASPS-restore.test       | Tjenester for gjenopprettingstester                                                 |
| BAASPS-onboarding         | Program for onboarding til backup                                                   |
| BAASPS-feature            | Tillegg av backup-funksjoner og -tjenester                                          |
| BAASPS-exit               | Exit-tjenester for backup                                                           |

### Tjenester for backup-migrering og -validering

Safespring bistår Kunden med å konvertere data fra gamle/eksisterende backup-systemer til Safesprings skybackup-tjeneste. Etter at sikkerhetskopiene er migrert, bistår Safespring Kunden med å validere alle overførte data.

### Tjenester for eksternt backup-mål

Safespring bistår Kunden med å sette opp utstyr utenfor lokasjon og mobile enheter for å ta sikkerhetskopi til Safesprings backup-tjeneste BaaS.

### Tjenester for gjenopprettingstest

Safespring hjelper kundene med å verifisere at alle testjobber for gjenoppretting fungerer som de skal. Safespring bruker programvare for gjenopprettingstester til å gjenopprette enhver type maskin til en virtuell maskin for verifisering.

### Program for onboarding til backup

Generell konsulentbistand som hjelper kundene med onboarding-prosesser og hvordan de migrerer til Safesprings skytjenester. Safespring bistår kunden i tråd med kundens egen kompetanse og behov.

### Tillegg av backup-funksjoner og -tjenester

Generell konsulentbistand som hjelper kundene å forstå hvordan de kan legge til nye funksjoner eller tjenester i eksisterende skytjenester.

### Avsluttende backup-tjenester

Safespring bistår Kunden med å overføre lagrede backup-data fra Safespring til Kunden etter at kontrakten utløper.