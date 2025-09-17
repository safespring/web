---
ai: true
title: "Safespring Backup: En total fornyelse af brugerportalen"
date: 2023-01-12T13:58:58+01:00
draft: false
tags: ["English"]
intro: "Safespring har i forbindelse med lanceringen af vores Safespring Backup-tjeneste udviklet en brugerportal og en API-bro."
background: "safespring-compute.jpg"
sidebarlinkname: "Til tjenesten"
sidebarlinkurl: "/services/backup"
sidebarlinkname2: "Kom i gang"
sidebarlinkurl2: "/demo"
socialmedia: ""
devops: ""
card: "safespring-backup.svg"
sidebarimage: "safespring-backup.svg"
background: "safespring-backup.svg"
socialmediabild: ""
form: ""
toc: "I denne artikel"
language: "da"
author: "Gabriel Paues"
section: "Løsningsoversigt"
aliases:
- /solution-brief/safespring-backup-portal-en/
---
## Introduktion

{{< ingress >}}
Safespring Backup er baseret på det veletablerede Spectrum Protect fra IBM. Det har mange styrker, såsom høj sikkerhed, fremragende skalerbarhed og automatisering af dataens livscyklus.
{{< /ingress >}}

Spectrum Protect kan beskytte utallige terabyte data med minimal administrationsindsats.

Sikkerhedskopier krypteres under overførsel med TLS 1.2, men kan også konfigureres til at blive krypteret på klientsiden for endnu højere sikkerhed, automatisk.

Som en gennemprøvet løsning til store virksomheder kan Spectrum Protect uden problemer håndtere skalaen i store serviceudbyderopsætninger som Safesprings. Der, hvor den halter lidt, er fleksibel administration af brugerkonti og rolletildelinger. Da sikkerhedskopier generelt håndteres af et dedikeret team i en stor organisation, er denne ulempe noget, der deles med mange andre backup-løsninger på markedet og derfor ikke et specifikt problem for Spectrum Protect.

## Problemstilling

For at løse dette udviklede Safespring en brugerportal og en API-bro ved lanceringen af vores Backup-tjeneste. Portalen har tjent sit formål godt ved at tilføje selvbetjening til opsætning af nye noder og generering af nøgletokens til automatisk opsætning af flere noder uden direkte menneskelig indgriben.

Selvom den var funktionel, manglede den gamle brugergrænseflade status-dashboards og muligheden for, at kunder kunne tilføje deres egne brugerkonti. Brugere kunne ikke oprette deres egne hierarkier for at forenkle håndteringen af forskellige grupper af servere, der sikkerhedskopieres.

![Safesprings nye backup-portal](/img/safespring-backup-portal.png)

## Oversigt over løsningen

Med vores relancering af Safespring Backup introducerer vi en fuldkommen overhaling af brugergrænsefladen. Løsningen er baseret på produktet Auwau Cloutility med funktioner som:

- Selvbetjening for slutbrugere med mulighed for at oprette nye brugere uden at kontakte Safespring samt tildele roller og rettigheder til brugerne.
- Multitenancy med mulighed for at oprette hierarkier og brugere med rollebaseret adgang til forskellige dele af hierarkiet. Det gør det muligt for én administrator at delegere forskellige servere til forskellige dele af organisationen.
- Klargøring (provisionering), hvor administratoren kan definere processen med standardindstillinger, så brugerne nemt kan håndtere deres egen aktivering af sikkerhedskopier.
- Avanceret, men brugervenlig, rapportmotor, som gør det let at følge status for alle kørende sikkerhedskopier. Det er også muligt at opsætte tidsplaner for at sende rapporter med bestemte intervaller til specifikke e-mailadresser.
- Et REST API gør det muligt at udføre alt, hvad du kan i webbrugerfladen, via API-kald for at automatisere din opsætning yderligere.

### Beskyttelse mod ransomware

Safespring Backup anvender en låsemekanisme på hver node, der registrerer sig for at bruge tjenesten. Denne mekanisme er designet til at forhindre backup-agenten i at slette sikkerhedskopier, før en foruddefineret opbevaringsperiode er udløbet. Denne opbevaringsperiode fastsættes til et bestemt antal dage, hvor sikkerhedskopierne bevares sikre.

Ved at implementere denne mekanisme kan vi sikre, at selv i tilfælde af et ransomware-angreb vil angriberen ikke kunne fjerne alle sikkerhedskopier fra serveren, før dataene krypteres lokalt. Dette skyldes, at sikkerhedskopierne er låst og ikke kan slettes, før opbevaringsperioden er udløbet.

Derudover giver mekanismen et ekstra beskyttelseslag for at sikre datagendannelse i tilfælde af et angreb. Ved at have flere sikkerhedskopier til rådighed kan vi gendanne data til et tidspunkt før angrebet fandt sted og dermed minimere påvirkningen for vores kunder.

Overordnet hjælper brugen af denne mekanisme os med at levere en mere sikker og pålidelig backup-tjeneste til vores kunder og er et vigtigt skridt i beskyttelsen mod den voksende trussel fra ransomware.

## Konklusion

Med vores relancering af Safespring Backup tager Safespring et kæmpe skridt fremad for at forbedre brugeroplevelsen og gøre det nemmere at håndtere dine sikkerhedskopier hos Safespring. Med pålideligheden fra Spectrum Protect kombineret med en fuldt udbygget selvbetjeningsportal har det aldrig været lettere at køre dine sikkerhedskopier. Med et komplet REST API er det muligt at automatisere forskellige administrative opgaver.

Med Safespring Backup får du en sikker og samtidig brugervenlig løsning til at håndtere alle dine sikkerhedskopier.

{{< horisontal-card image="/img/card/safespring-backup.svg" cardtitle="Læs mere om Safespring Backup" text="Safespring Backup er en næste generations løsning til databackup og -gendannelse, der udnytter pålideligheden og skalerbarheden i IBM Spectrum Protect. Safespring Backup er en næste generations løsning til databackup og -gendannelse, der udnytter pålideligheden og skalerbarheden i IBM Spectrum Protect." linktext="Til tjenesten" link="/services/backup">}}