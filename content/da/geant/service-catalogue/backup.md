---
ai: true
title: "Backup som en tjeneste"
language: "da"
cardtitle: "Sikkerhedskopi"
cardicon: "fa-solid fa-cloud-arrow-up"
cardcolor: "#195F8C"
cardorder: "06"
date: "2025-01-20"
draft: false
intro: "Backup-tjenesten fås i tre abonnementsmodeller alt efter dine behov."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tilbage til alle kategorier"
sidebarlinkurl: "/geant/service-catalogue"
sidebarlinkname2: "Se pris på beregningskapacitet"
sidebarlinkurl2: "/geant/price/#safespring-backup"
socialmedia: "safespring-compute.jpg"
section: "OCRE 2024-rammeværk"
socialmedia: "/safespring-start.jpg"
toc: "På denne side"
noindex: "x"
aliases:
- /geant/service-catalogue/backup/
---
{{< ingress >}}
Agentbaserede cloud-backup-tjenester med deduplikering og sikker off-site-lagring.
{{< /ingress >}}

## Backup-tjeneste

Backup-tjenesten findes i tre abonnementsmodeller afhængigt af brugernes behov.

### Forudsætninger

Ingen.

### Konfigurationer

| Produktkode   | Tjeneste                                               |
| ------------- | ------------------------------------------------------ |
| BAAS-on.demand | Abonnement egnet til mindre on-demand-behov.          |
| BAAS-small     | Abonnement egnet til mellemstore behov.               |
| BAAS-large     | Abonnement egnet til store behov.                     |

### Backup til applikationer og filsystemer

Den software, der er nødvendig for at sikkerhedskopiere filsystemer, kan suppleres med applikationsbevidste agenter til sikker backup af forskellige varianter af databaser.

Backup-tjenesten er baseret på IBM’s Spectrum Protect og tilbydes i tre forskellige varianter afhængigt af, hvor meget data kunden forventer at sikkerhedskopiere. Safespring har udviklet sit eget API, som orkestrerer matchningen mellem klienter og flåden af backupservere.

Spectrum Protect er primært et filbaseret backupsystem med en "incremental forever" backupstrategi, hvilket betyder, at filer kun sikkerhedskopieres, hvis de er ændret. Det reducerer drastisk mængden af data, som backupserveren skal håndtere. Derudover anvendes komprimering på de fleste data, der sikkerhedskopieres; for data, der ikke er klientsidekrypteret, kombineres dette med deduplikering. Klientsidekrypterede data deduplikeres ikke for at garantere maksimal sikkerhed for kundens data. Alle data lagres med kryptering af data i hvile, og backup-netværkstrafikken er krypteret ved hjælp af stærke AES-256-chiffersuiter.

Kryptering er kun så sikker som håndteringen af krypteringsnøglerne, og backupmulighederne findes i følgende tre varianter:

- Delt kryptering, nøgler ejet af udbyderen
- Delt kryptering, nøgler ejet af kunden
- Kryptering pr. værtsmaskine, nøgler ejet af kunden/slutbrugeren

For alle niveauer er det muligt at planlægge op til fire sikkerhedskopier om dagen. Der findes flere foruddefinerede starttidspunkter at vælge imellem (hver anden time). Backup-tjenesten benævnes BAAS.backup i prislisten.

Sikkerhedskopierne kan opsættes med følgende skemaer:

- Incremental forever. Inkrementel backup af filsystemer. Med valgbare starttidspunkter hver anden time.
- Fuld backup. Fuld backup af applikationen. Med valgbare starttidspunkter hver anden time.
- Inkrementel/log-backup. Inkrementel- eller log-backup afhængigt af applikationen. Med valgbare starttidspunkter hver time.

### Retentionspolitikker

Ud over standard-retentionspolitikkerne tilbyder vi en række versionsbegrænsede politikker. De bevarer backup i det angivne antal dage, men hver fil opbevares kun op til det maksimale angivne antal versioner.

Disse politikker har fordelen, at de giver et prisloft. Hvis der f.eks. vælges en politik med fem versioner, vil den lagrede (og fakturerede) mængde aldrig overstige fem gange klientens datamængde. I de fleste tilfælde vil den lagrede mængde være mindre, da kun ændrede filer sikkerhedskopieres. En fil, der aldrig ændrer sig, vil stadig kun findes i én version i backupsystemet.

| Opbevaring | Beskrivelse                                                                |
| ---------- | -------------------------------------------------------------------------- |
| 30 dage    | Bevarer alle backupdata i 30 dage, op til fem versioner pr. fil bevares.  |
| 30 dage    | Bevarer alle backupdata i 30 dage, op til ti versioner pr. fil bevares.   |
| 90 dage    | Bevarer alle backupdata i 90 dage, op til fem versioner pr. fil bevares.  |
| 90 dage    | Bevarer alle backupdata i 90 dage, op til ti versioner pr. fil bevares.   |
| 365 dage   | Bevarer alle backupdata i 365 dage, op til fem versioner pr. fil bevares. |
| 365 dage   | Bevarer alle backupdata i 365 dage, op til ti versioner pr. fil bevares.  |

Det er muligt at anmode om andre versionsbegrænsede politikker efter behov (f.eks. 17 eller 42 versioner).

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kontakt Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Salg:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}