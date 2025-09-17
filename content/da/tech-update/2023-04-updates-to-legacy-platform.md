---
ai: true
title: "Vigtig opdatering vedrørende EOL for legacy-platformen i STO1"
date: "2023-04-18"
publishDate: "2023-04-18"
intro: "Vi vil gerne informere dig om, at vores legacy-platform i STO1 bliver lukket ned den 1. maj 2023."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Tech-opdatering"
language: "da"
toc: ""
sidebarlinkname: "Sådan migrerer du"
sidebarlinkurl: "https://docs.safespring.com/new/migrate-from-legacy/"
sidebarlinkname2: "Kontakt support"
sidebarlinkurl2: "mailto:support@safespring.com"
aliases:
  - /blogg/2023/2023-04-updates-to-legacy-platform/
---
{{< ingress >}}
Da den gamle platform i STO1 er ved at blive udfaset, håber vi, at I er godt i gang med migreringen til den nye platform.
{{< /ingress >}}

Ifølge vores projektopfølgning har de fleste af jer allerede migreret til den nye platform eller er i gang med det.

Til jer, der endnu ikke er startet, vil vi opfordre jer til at komme i gang hurtigst muligt og kontakte os, hvis I har brug for hjælp. Alle nødvendige trin for at migrere jeres instanser findes i vores [migrationsvejledning](https://docs.safespring.com/new/migrate-from-legacy/).

Til jer, der har svært ved at nå fristen den 1. maj, kan vi berolige med, at vi ikke sletter data uden jeres samtykke. Vi har været i kontakt med alle kunder for at lægge en migrationsplan og fortsætter med dette i de kommende uger.

Flere kunder har givet os en liste over instanser, der ikke skal migreres, eller som skal markeres til sletning. Disse instanser vil blive slukket den 1. maj og fortsætte med at eksistere på den gamle platform i en henstandsperiode på 30 dage, hvorefter de vil blive slettet.

## Ofte stillede spørgsmål

### Vi vil gerne beholde vores instanser i en længere periode. Er det muligt?

Som udgangspunkt forlænger vi ikke fristen for migreringen. Men hvis I er i gang med at migrere jeres instanser og har brug for mere tid, så kontakt os, hvis I ikke allerede har gjort det, og vi vil forsøge at imødekomme jeres ønske.

### Vi vil gerne migrere, men har udfordringer med den nye platform. Hvad kan vi gøre?

Den væsentligste forskel i den nye platform er den nye netværksmodel, og nogle kunder har udtrykt bekymringer omkring denne. Vi har skrevet udførligt om emnet i et blogindlæg samt i vores slutbrugerdokumentation og mener, at de fleste bekymringer kan afhjælpes ved at læse disse. Hvis I har brug for assistance eller rådgivning, så kontakt os.

### Vi forsøger at migrere et volume, men der sker ikke noget

Den hyppigste fejl, vi har set, er, at `migrate_to`-tagget er sat på et volume i stedet for på et volume-snapshot. Sørg for, at du har oprettet et snapshot af det volume, du vil migrere, og at migrate_to-tagget er sat på det snapshot. Hvis du er sikker på, at du har gjort dette korrekt, så kontakt os – batch-jobsene kan være fejlet af en eller anden grund.

### Vi har flere store instanser med lokale diske, og jeres migrationsvejledning er for tidskrævende. Findes der en hurtigere måde?

Hvis I har flere store instanser med lokale diske og migrerer til en lokal flavor på den nye platform, kan der i visse særlige tilfælde være meget hurtigere at migrere direkte mellem image-tjenesterne. Hvis I står i denne situation, så kontakt os, og vi hjælper jer.