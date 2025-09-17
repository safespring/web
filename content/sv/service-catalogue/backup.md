---
ai: true
title: "Säkerhetskopiering som tjänst – BaaS"
language: "sv"
cardtitle: "Säkerhetskopiering"
cardicon: "fa-solid fa-cloud-arrow-up"
cardcolor: "#195F8C"
cardorder: "04"
date: 2023-02-28
draft: false
intro: "Säkerhetskopieringstjänsten baseras på IBM:s Spectrum Protect och finns i tre olika varianter."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tillbaka till alla kategorier"
sidebarlinkurl: "/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Safespring Tjänstekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
- /service-catalogue/backup/
---
{{< ingress >}}
Molnbackup-tjänsterna omfattar följande kategorier:
{{< /ingress >}}

1. Backup för filsystem
1. Backup för applikationer
1. Backup för klienter

## Backup för applikationer och filsystem

Programvaran som behövs för att säkerhetskopiera filsystem, Microsoft SQL, Microsoft Exchange, Oracle, DB2 och grundläggande stöd för MySQL ingår i tjänsten. Dessutom ingår programvaran som krävs för att säkerhetskopiera VMware vSphere-kluster.

### Förutsättningar

Inga.

### Tjänstebeskrivningar

Backuptjänsten baseras på IBMs Spectrum Protect och erbjuds i tre olika varianter beroende på hur mycket data kunden förväntar sig att säkerhetskopiera. Safespring har utvecklat ett eget API som orkestrerar matchningen mellan klienter och parken av backupservrar. Spectrum Protect (tidigare känt som TSM) är främst ett filbaserat backupsystem med en incremental forever-strategi, vilket innebär att filer bara säkerhetskopieras om de har ändrats. Detta minskar drastiskt mängden data som hanteras av backupservern. Dessutom komprimeras merparten av all data som säkerhetskopieras, och för data som inte är klientkrypterad används även deduplicering. Klientkrypterad data dedupliceras inte för att garantera maximal säkerhet för kundens data. All data lagras med kryptering i vila (data-at-rest) och backuptrafiken i nätet krypteras med starka AES-256-chiffersviter.

Kryptering är bara lika säker som hanteringen av krypteringsnycklar, och backupalternativen finns i följande tre varianter:

1. Delad kryptering, nycklar ägs av leverantören
1. Delad kryptering, nycklar ägs av kunden
1. Kryptering per värd, nycklar ägs av kunden/slutanvändaren

För alla nivåer går det att schemalägga upp till fyra (4) säkerhetskopior per dag. Det finns flera fördefinierade starttider att välja mellan (varannan timme).

| Produktkod     | Typ      | Plats | Version                |
| -------------- | -------- | ----- | ---------------------- |
| BAAS-on.demand | OnDemand | STO1  | Spectrum Protect 7 & 8 |
| BAAS-small     | Small    | STO1  | Spectrum Protect 7 & 8 |
| BAAS-large     | Large    | STO1  | Spectrum Protect 7 & 8 |

#### Schema (filsystem)

| Schema              | Beskrivning                                                                           |
| ------------------- | -------------------------------------------------------------------------------------- |
| Incremental forever | Inkrementell backup av filsystem. Det finns ett schema varannan (2) timme att välja.  |

#### Schema (applikation)

| Schema                    | Beskrivning                                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| Fullständig backup        | Fullständig backup av applikationen. Det finns ett schema varannan (2) timme att välja.             |
| Inkrementell/loggbackup   | Inkrementell eller loggbackup beroende på applikation. Det finns ett schema varje timme (1) att välja. |

### Tillägg till backuptjänsten

Utöver de standardiserade lagringspolicys erbjuder vi ett antal versionsbegränsade policys. De behåller backupen under angivet antal dagar, men varje fil behålls endast upp till det maximala antal versioner som anges.

Dessa policys har fördelen att erbjuda ett pristak. Till exempel, om en policy med fem versioner väljs kommer den lagrade mängden (och debiteringen) aldrig att överstiga fem (5) gånger klientens storlek. I de flesta fall blir den lagrade mängden lägre, eftersom bara ändrade filer säkerhetskopieras. En fil som aldrig ändras kommer ändå bara att ha en enda version i backupsystemet.

| Lagringstid | Beskrivning                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| 30 dagar    | Behåller all backupdata i 30 dagar, upp till fem (5) versioner per fil behålls.  |
| 30 dagar    | Behåller all backupdata i 30 dagar, upp till tio (10) versioner per fil behålls. |
| 90 dagar    | Behåller all backupdata i 90 dagar, upp till tio (10) versioner per fil behålls. |
| 365 dagar   | Behåller all backupdata i 365 dagar, upp till fem (5) versioner per fil behålls. |
| 365 dagar   | Behåller all backupdata i 365 dagar, upp till tio (10) versioner per fil behålls. |

Det går att beställa andra versionsbegränsade policys vid behov (t.ex. 17 eller 42 versioner).

## Snapshot (image)-backup för virtuella servrar

Samma krypterings- och schemapolicys gäller för snapshots för virtuella servrar.

### Lagringspolicy

| Lagringstid | Beskrivning                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| 14 dagar    | Behåller all backupdata i 14 dagar, alla versioner behålls. Detta motsvarar tio (10) arbetsdagar.           |

## BaaS professionella tjänster

### Allmän backupkonsultation

Ett professionellt konsultutbud finns tillgängligt. Tjänsten kan levereras på plats eller på distans beroende på uppdrag. Den kan användas för, men är inte begränsad till:

- Design av mer komplexa backup-/återställningsscenarier
- Implementering av mer komplexa backup-/återställningsinstallationer såsom stora MS Exchange-servrar eller MS SharePoint
- Implementering av TSM för virtuella miljöer
- Assistans med backup/återställning av andra applikationer
- Utbildning på plats
- Assistans på plats vid katastrofåterställning
- Test av återställning

| Produktkod               | Professionell tjänst                                                              |
| ------------------------ | ---------------------------------------------------------------------------------- |
| BAASPS-generic.consultancy | Allmän backupkonsultation för att konfigurera vissa applikationer m.m.           |
| BAASPS-migration         | Tjänst för migrering och validering av backup                                      |
| BAASPS-offsite           | Offsite-tjänster för backupmål                                                     |
| BAASPS-restore.test      | Tjänster för återställningstest                                                    |
| BAASPS-onboarding        | Onboardingprogram för backup                                                       |
| BAASPS-feature           | Tillägg av backupfunktioner och -tjänster                                          |
| BAASPS-exit              | Exit-tjänster för backup                                                           |

### Tjänster för migrering och validering av backup

Safespring hjälper kunden att konvertera data från gamla/befintliga backuplösningar till Safesprings molnbaserade backuptjänst. Efter att backuper har migrerats hjälper Safespring kunden att validera all överförd data.

### Offsite backupmålstjänster

Safespring hjälper kunden att sätta upp utrustning offsite och mobila enheter för att ta backup till Safesprings backuptjänst BaaS.

### Tjänster för återställningstest

Safespring hjälper kunderna att verifiera att alla teståterställningar fungerar som de ska. Safespring använder programvara för återställningstest för att återställa valfri typ av maskin till en virtuell maskin enbart i verifieringssyfte.

### Onboardingprogram för backup

Allmän konsultassistans som hjälper kunderna med onboardingprocesser och hur de migrerar till Safesprings molntjänster. Safespring bistår kunden utifrån dennes egen kompetens och behov.

### Tillägg av backupfunktioner och -tjänster

Allmän konsultassistans som hjälper kunderna att förstå hur man lägger till nya funktioner eller tjänster till befintliga molntjänster.

### Exit-tjänster för backup

Safespring hjälper kunden att överföra lagrad backupdata från Safespring till kunden efter att avtalet har löpt ut.