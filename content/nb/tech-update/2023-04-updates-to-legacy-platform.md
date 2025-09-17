---
ai: true
title: "Viktig oppdatering om EOL for den eldre plattformen i STO1"
date: "2023-04-18"
publishDate: "2023-04-18"
intro: "Vi ønsker å informere om at vår eldre plattform i STO1 vil bli lagt ned 1. mai 2023."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknologioppdatering"
language: "nb"
toc: ""
sidebarlinkname: "Slik migrerer du"
sidebarlinkurl: "https://docs.safespring.com/new/migrate-from-legacy/"
sidebarlinkname2: "Kontakt kundestøtte"
sidebarlinkurl2: "mailto:support@safespring.com"
aliases:
  - /blogg/2023/2023-04-updates-to-legacy-platform/
---
{{< ingress >}}
Ettersom den gamle plattformen i STO1 nærmer seg slutten av sin livssyklus, håper vi at dere kommer godt i gang med migreringen til den nye plattformen.
{{< /ingress >}}

Ifølge vår prosjektoppfølging har de fleste av dere allerede migrert til den nye plattformen eller er i gang med å gjøre det.

For dere som ikke har startet ennå, vil vi oppfordre dere til å komme i gang så snart som mulig og ta kontakt med oss hvis dere trenger hjelp. Alle nødvendige steg for å migrere instansene deres finner dere i vår [migreringsveiledning](https://docs.safespring.com/new/migrate-from-legacy/).

For dere som sliter med å rekke fristen 1. mai, kan vi forsikre dere om at vi ikke sletter noen data uten deres samtykke. Vi har vært i kontakt med alle kunder for å sette opp en migreringsplan, og vi vil fortsette med dette de kommende ukene.

Flere kunder har gitt oss en liste over instanser som ikke skal migreres eller som skal merkes for sletting. Disse instansene vil bli slått av 1. mai og bli liggende på den gamle plattformen i en henstandsperiode på 30 dager, før de blir slettet.

## Ofte stilte spørsmål

### Vi ønsker å beholde instansene våre over en lengre periode. Er det mulig?

Som hovedregel forlenger vi ikke fristen for migreringen. Men hvis dere er i gang med å migrere instansene deres og trenger mer tid, ta kontakt hvis dere ikke allerede har gjort det, så skal vi forsøke å imøtekomme forespørselen.

### Vi ønsker å migrere, men har utfordringer med den nye plattformen. Hva kan vi gjøre?

Den viktigste forskjellen i den nye plattformen er den nye nettverksmodellen, og noen kunder har uttrykt bekymringer rundt dette. Vi har skrevet utførlig om temaet i et blogginnlegg samt i vår sluttbrukerdokumentasjon, og vi mener at de fleste bekymringene kan adresseres der. Hvis dere trenger hjelp eller rådgivning, ta gjerne kontakt med oss.

### Vi prøver å migrere et volum, men ingenting skjer

Det vanligste problemet vi ser, er at `migrate_to`-taggen er satt på et volum i stedet for på et volum-snapshot. Sørg for at dere har opprettet et snapshot av volumet dere vil migrere, og at `migrate_to`-taggen er satt på det snapshotet. Hvis dere er sikre på at dette er gjort riktig, ta kontakt med oss; batch-jobbene kan ha feilet av en eller annen grunn.

### Vi har flere store instanser med lokal disk som vi må migrere, og migreringsveiledningen deres er for tidkrevende. Finnes det en raskere måte?

Hvis dere har flere store instanser med lokal disk og migrerer til en flavor med lokal disk i den nye plattformen, kan det i noen særtilfeller gå mye raskere å migrere direkte mellom image-tjenestene. Hvis dere er i en slik situasjon, ta kontakt med oss, så hjelper vi dere.