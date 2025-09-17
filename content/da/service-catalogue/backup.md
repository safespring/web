---
ai: true
title: "Backup som en tjeneste – BaaS"
language: "da"
cardtitle: "Sikkerhedskopi"
cardicon: "fa-solid fa-cloud-arrow-up"
cardcolor: "#195F8C"
cardorder: "04"
date: 2023-02-28
draft: false
intro: "Backup-tjenesten er baseret på IBM's Spectrum Protect i tre forskellige varianter."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tilbage til alle kategorier"
sidebarlinkurl: "/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Safespring Servicekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
- /service-catalogue/backup/
---
{{< ingress >}}
Cloud-backup-tjenesterne omfatter følgende kategorier:
{{< /ingress >}}

1. Backup til filsystemer
1. Backup til applikationer
1. Klientbackup

## Backup til applikationer og filsystemer

Den software, der er nødvendig for at tage backup af filsystemer, Microsoft SQL, Microsoft Exchange, Oracle, DB2 og grundlæggende support til MySQL, er inkluderet i tjenesten. Derudover er den software, der er nødvendig for at tage backup af VMware vSphere-klynger, inkluderet i tjenesten.

### Forudsætninger

Ingen.

### Tjenestebeskrivelser

Backup-tjenesten er baseret på IBM’s Spectrum Protect og tilbydes i tre forskellige varianter baseret på, hvor meget data kunden forventer at tage backup af. Safespring har udviklet sin egen API, som orkestrerer matchningen mellem klienter og flåden af backupservere. Spectrum Protect (tidligere kendt som TSM) er primært et filbaseret backup-system med en "incremental forever"-strategi, hvilket betyder, at filer kun sikkerhedskopieres, hvis de er ændret. Dette reducerer drastisk mængden af data, der håndteres af backupserveren. Derudover anvendes komprimering på de fleste data, og for data der ikke er krypteret på klienten, sker det sammen med deduplikering. Klientkrypterede data deduplikeres ikke for at garantere maksimal sikkerhed for kundens data. Alle data lagres med kryptering af data i hvile, og backup-netværkstrafikken er krypteret med stærke AES-256-kryptosuiter.

Kryptering er kun lige så sikker som nøglehåndteringen, og backupmulighederne findes i følgende tre varianter:

1. Delt kryptering, nøgler ejet af udbyderen
1. Delt kryptering, nøgler ejet af kunden
1. Kryptering pr. vært, nøgler ejet af kunden/slutbrugeren

På alle niveauer er det muligt at planlægge op til fire (4) backups pr. dag. Der er flere foruddefinerede starttidspunkter at vælge imellem (hver anden time).

| Produktkode     | Type     | Site | Version                |
| --------------- | -------- | ---- | ---------------------- |
| BAAS-on.demand  | OnDemand | STO1 | Spectrum Protect 7 & 8 |
| BAAS-small      | Small    | STO1 | Spectrum Protect 7 & 8 |
| BAAS-large      | Large    | STO1 | Spectrum Protect 7 & 8 |

#### Planlægning (filsystemer)

| Plan                | Beskrivelse                                                                                 |
| ------------------- | -------------------------------------------------------------------------------------------- |
| Incremental forever | Inkrementel backup af filsystemer. Der kan vælges starttidspunkter for hver anden (2.) time. |

#### Planlægning (applikation)

| Plan                     | Beskrivelse                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| Full backup              | Fuld backup af applikationen. Der kan vælges starttidspunkter for hver anden (2.) time.           |
| Incremental/ Log backup  | Inkrementel- eller log-backup afhængigt af applikationen. Der kan vælges starttidspunkter hver (1.) time. |

### Tilvalg til backup-tjenesten

Ud over standardpolitikkerne for opbevaring tilbyder vi en række versionsbegrænsede politikker. De bevarer backups i det angivne antal dage, men hver fil gemmes kun op til det maksimale antal versioner, der er angivet.

Disse politikker har fordelen af at tilbyde et prisloft. For eksempel, hvis der vælges en politik med fem versioner, vil den lagrede (og fakturerede) mængde aldrig overstige fem (5) gange klientstørrelsen. I de fleste tilfælde vil den lagrede mængde være mindre, da kun ændrede filer sikkerhedskopieres. En fil, der aldrig ændres, vil stadig kun findes i én version i backup-systemet.

| Opbevaring | Beskrivelse                                                                        |
| ---------- | ----------------------------------------------------------------------------------- |
| 30 dage    | Bevarer alle backupdata i 30 dage, der gemmes op til fem (5) versioner pr. fil.    |
| 30 dage    | Bevarer alle backupdata i 30 dage, der gemmes op til ti (10) versioner pr. fil.    |
| 90 dage    | Bevarer alle backupdata i 90 dage, der gemmes op til ti (10) versioner pr. fil.    |
| 365 dage   | Bevarer alle backupdata i 365 dage, der gemmes op til fem (5) versioner pr. fil.   |
| 365 dage   | Bevarer alle backupdata i 365 dage, der gemmes op til ti (10) versioner pr. fil.   |

Det er muligt at anmode om andre versionsbegrænsede politikker efter behov (fx 17 eller 42 versioner).

## Snapshot- (image-)backup til virtuelle servere

De samme krypterings- og planlægningspolitikker gælder for snapshots til virtuelle servere.

### Opbevaringspolitik

| Opbevaring | Beskrivelse                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| 14 dage    | Bevarer alle backupdata i 14 dage, alle versioner bevares. Dette svarer til ti (10) arbejdsdage.            |

## BaaS Professional Services

### Generel backup-rådgivning

Et professionelt konsulenttilbud er tilgængeligt. Denne tjeneste kan leveres on-site eller remote afhængigt af opgaven. Tjenesten kan bruges til, men er ikke begrænset til:

- Design af mere komplekse backup-/gendannelsesscenarier
- Implementering af mere komplekse backup-/gendannelsesinstallationer såsom store MS Exchange-servere eller MS SharePoint
- Implementering af TSM for Virtual Environment
- Assistance med backup/gendannelse af andre applikationer
- Træning på stedet
- Bistand på stedet under genopretning efter katastrofe
- Test af gendannelse

| Produktkode               | Professionel tjeneste                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------- |
| BAASPS-generic.consultancy| Generel backup-rådgivning til konfiguration af visse applikationer og lignende       |
| BAASPS-migration          | Tjeneste til backup-migrering og validering                                           |
| BAASPS-offsite            | Offsite-backupmål-tjenester                                                           |
| BAASPS-restore.test       | Tjenester til gendannelsestest                                                        |
| BAASPS-onboarding         | Program for backup-onboarding                                                         |
| BAASPS-feature            | Tilføjelse af backup-funktioner og -tjenester                                         |
| BAASPS-exit               | Exit-backup-tjenester                                                                 |

### Tjenester til backup-migrering og -validering

Safespring hjælper Kunden med at konvertere data fra gamle/eksisterende backup-systemer til Safesprings cloud-backup-tjeneste. Når backups er migreret, bistår Safespring Kunden med at validere alle overførte data.

### Offsite backup-måltjenester

Safespring hjælper Kunden med at sætte offsite-udstyr og mobile enheder op til at tage backup til Safesprings backup-tjeneste BaaS.

### Gendannelsestest-tjenester

Safespring hjælper kunderne med at verificere, at alle testgendannelser fungerer, som de skal. Safespring bruger software til gendannelsestest til at gendanne enhver type maskine til en virtuel maskine udelukkende for at verificere.

### Backup-onboarding-program

Generel konsulentbistand, der hjælper kunderne med onboarding-processer, og hvordan de migrerer til Safesprings cloud-tjenester. Safespring bistår Kunden i overensstemmelse med kundens egen kompetence og behov.

### Tilføjelser af backup-funktioner og -tjenester

Generel konsulentbistand, der hjælper kunderne med at forstå, hvordan man tilføjer nye funktioner eller tjenester til eksisterende cloudtjenester.

### Exit-backup-tjenester

Safespring hjælper Kunden med at overføre lagrede backupdata fra Safespring til Kunden efter kontraktens udløb.