---
ai: true
title: "Backup som tjänst"
language: "sv"
cardtitle: "Säkerhetskopiering"
cardicon: "fa-solid fa-cloud-arrow-up"
cardcolor: "#195F8C"
cardorder: "06"
date: "2025-01-20"
draft: false
intro: "Säkerhetskopieringstjänsten finns i tre abonnemangsmodeller beroende på dina behov."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tillbaka till alla kategorier"
sidebarlinkurl: "/geant/service-catalogue"
sidebarlinkname2: "Se pris för beräkningskapacitet"
sidebarlinkurl2: "/geant/price/#safespring-backup"
section: "OCRE 2024-ramverk"
socialmedia: "/safespring-start.jpg"
toc: "På den här sidan"
noindex: "x"
aliases:
  - /geant/service-catalogue/backup/
---

{{< ingress >}}
Agentbaserade molnbackup-tjänster med deduplicering och säker offsite-lagring.
{{< /ingress >}}

## Backup-tjänst

Backup-tjänsten finns i tre abonnemangsmodeller beroende på användarnas behov.

### Förutsättningar

Inga.

### Konfigurationer

| Produktkod     | Tjänst                                     |
| -------------- | ------------------------------------------ |
| BAAS-on.demand | Abonnemang som passar små on-demand-behov. |
| BAAS-small     | Abonnemang som passar medelstora behov.    |
| BAAS-large     | Abonnemang som passar stora behov.         |

### Backup för applikationer och filsystem

Den programvara som behövs för att säkerhetskopiera filsystem kan kompletteras med applikationsmedvetna agenter för säker backup av olika typer av databaser.

Backup-tjänsten baseras på IBM:s Spectrum Protect och erbjuds i tre olika varianter beroende på hur mycket data kunden förväntar sig att säkerhetskopiera. Safespring har utvecklat ett eget API som orkestrerar matchningen mellan klienter och flottan av backupservrar.

Spectrum Protect är främst ett filbaserat backupsystem med en permanent inkrementell ("incremental forever") backupstrategi, vilket innebär att filer bara säkerhetskopieras om de har ändrats. Detta minskar drastiskt mängden data som hanteras av backupservern. Dessutom komprimeras det mesta av den data som säkerhetskopieras; för icke klientkrypterad data används komprimering tillsammans med deduplicering. Klientkrypterad data dedupliceras inte för att garantera maximal säkerhet för kundens data. All data lagras med kryptering av data i vila och backupnätverkstrafiken krypteras med starka AES-256-chiffer.

Kryptering är bara så säker som hanteringen av krypteringsnycklarna, och backupalternativen har följande tre varianter:

- Delad kryptering, nycklar ägs av leverantören
- Delad kryptering, nycklar ägs av kunden
- Kryptering per värd, nycklar ägs av kunden/slutanvändaren

För alla nivåer kan man schemalägga upp till fyra säkerhetskopieringar per dag. Det finns flera fördefinierade starttider att välja bland (varannan timme). Tjänsten benämns BAAS.backup i prislistan.

Säkerhetskopieringarna kan konfigureras enligt följande scheman:

- Permanent inkrementell. Inkrementell säkerhetskopiering av filsystem. Ett schema varannan timme att välja på.
- Fullständig backup. Fullständig säkerhetskopiering av applikationen. Ett schema varannan timme att välja på.
- Inkrementell-/loggbackup. Inkrementell eller loggbackup beroende på applikation. Ett schema varje timme att välja på.

### Retentionspolicyer

Utöver standardretentionspolicyerna erbjuder vi ett antal versionsbegränsade policyer. De behåller säkerhetskopior i det angivna antalet dagar, men varje fil sparas bara upp till det angivna maxantalet versioner.

Dessa policyer har fördelen att ge ett pristak. Till exempel, om en femversionspolicy väljs kommer den lagrade (och debiterade) mängden aldrig att överstiga fem gånger klientens datamängd. I de flesta fall blir den lagrade mängden mindre, eftersom bara ändrade filer säkerhetskopieras. En fil som aldrig ändras finns fortfarande endast i en version i backupsystemet.

| Retentionstid | Beskrivning                                                                 |
| ------------- | --------------------------------------------------------------------------- |
| 30 dagar      | Behåller all backupdata i 30 dagar, upp till fem versioner per fil sparas.  |
| 30 dagar      | Behåller all backupdata i 30 dagar, upp till tio versioner per fil sparas.  |
| 90 dagar      | Behåller all backupdata i 90 dagar, upp till fem versioner per fil sparas.  |
| 90 dagar      | Behåller all backupdata i 90 dagar, upp till tio versioner per fil sparas.  |
| 365 dagar     | Behåller all backupdata i 365 dagar, upp till fem versioner per fil sparas. |
| 365 dagar     | Behåller all backupdata i 365 dagar, upp till tio versioner per fil sparas. |

Det går att beställa andra versionsbegränsade policyer vid behov (t.ex. 17 eller 42 versioner).

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kontakta Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Försäljning:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}
