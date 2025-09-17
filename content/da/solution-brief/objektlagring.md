---
ai: true
title: "Objektlagring med S3-protokollen giver dig ubegrænset fleksibilitet"
language: "da"
date: 2018-06-20
draft: false
author: ""
tags: ["Svenska"]
documentation: "Lagring"
dokumentnamn: "Safespring_White-Paper_Att-tanka-pa-i-och-med-inforandet-av-GDPR-och-CLOUD-act.pdf"
intro: "Denne løsningsbeskrivelse gennemgår lagringsstandarden S3 og giver dig fire eksempler på, hvordan den kan bruges i dag. Du vil lære, hvordan du kan anvende den på forskellige måder i din virksomhed, sikkert og moderne, uden at dine data behøver at forlade landet."
card: "safespring-s3.svg"
sidebarimage: "safespring-s3.svg"
background: "safespring-storage.png"
socialmediabild: "safespring_social_27.gif"
socialmedia: "/blogg/socialmedia/safespring_social_27.gif"
toc: "Indholdsfortegnelse"
section: "Løsningsoversigt"
aliases:
  - /solution-brief/objektlagring/
---
{{< ingress >}}
Denne solution brief gennemgår lagringsstandarden S3 og giver dig fire eksempler på, hvordan den kan bruges i dag.
{{< /ingress >}}

Du vil lære, hvordan du kan bruge objektlagring på forskellige måder i din virksomhed, sikkert og moderne, uden at dine data behøver at forlade landet.

## Hvad er S3?

S3 (Simple Storage Service) er en open source-protokol udviklet af Amazon til deres tjeneste med samme navn.

Protokollen blev lanceret i USA den 14. marts 2006 og kom til Europa den 17. november året efter. De grundlæggende lagringsenheder i S3 er objekter, som er organiseret i såkaldte “buckets”. Hvert objekt identificeres af en unik nøgle, som brugeren har fået tildelt.

> Virksomheder, der bruger S3-protokollen, er blandt andre Netflix, DropBox, Tumblr og Pinterest, for at nævne nogle få.

Protokollen er i dag åben for enhver leverandør at bruge og gør det nemt at uploade og downloade filer sikkert over HTTPS. Mange backup-løsninger såsom Veeam, Commvault, Backup Exec og flere derudover understøtter S3 direkte i applikationen, hvilket gør det let at sætte op. Med standardiserede protokoller bliver integration mellem forskellige løsninger legende let.

### Eksempler på anvendelsesområder

Der er mange måder at udnytte fleksibiliteten og sikkerheden i S3. I vores egen drift og blandt vores kunder ser vi flere eksempler, og nedenfor følger fire anvendelsesområder, som vi mener er gode implementeringer af S3.

## Eksempel 1 - Offsite-backup

At tage backup er en selvfølge i dag – men at tage backup, der kan klare, at hele dit primære site går ned, er sværere.

Løsningen er at have et system sat op, som sender en offsite-kopi til et andet sted. Med en sådan løsning er du langt bedre forberedt, hvis der skulle ske noget med dit primære site. Løsningen er enkel og omkostningseffektiv, fordi du bruger dit eksisterende backup-system.

### Immutable objects

Når objektlagring bruges til offsite-backup, er det vigtigt, at data ikke kan manipuleres eller slettes. Derfor er funktionen “immutable objects” en god måde at beskytte de lagrede data på. Brugeren kan sætte en tidsramme, hvor data er fuldstændig beskyttet mod påvirkning udefra. Det gør sikkerhedskopiering mere sikker og mere omkostningseffektiv end før med Safespring Storage. [Læs vores solution brief om immutable objects](/solution-brief/immutable-storage/).

### Vigtigheden af offsite-backup

At lagre kopier et andet sted er uvurderligt, hvis en katastrofe skulle indtræffe. De væsentligste grunde til en sådan løsning er følgende:

- Sikre data mod angreb i det primære miljø.
- Have en kopi offsite, hvis dit primære site skulle blive ramt af en større katastrofe (brand, oversvømmelse eller f.eks. strømafbrydelse).

Styrken ved objektlagring er, at den er generel og fungerer med eksisterende løsninger. Backuppen kan håndteres præcis som før, med den store forskel, at der også findes en kopi et andet sted.

### 3-2-1-reglen

Der findes en række backup-løsninger på markedet, som kan håndtere din lokale backup rigtig godt.

Den mest almindelige løsning er at have en backup-server med en dedikeret lagringsløsning koblet til, som sikrer, at det går hurtigt at gendanne, hvis en server skulle blive ramt af noget uventet. Når vi taler om backup, taler vi ofte om 3-2-1-reglen, hvilket betyder, at du skal have tre kopier af dine data, på to forskellige medietyper og én kopi offsite.

Den lokale backup-løsning løser kun de første to krav: Du har nok tre backups på to forskellige lagringsmedier, men ingen af dem er offsite. Traditionelt har offsite-backup indebåret fysisk transport af f.eks. bånd til et andet sted, men det er dyrt og kræver faste rutiner. Nu, hvor standardiserede lagringsløsninger kan tilgås krypteret over internettet, forenkles dette trin betydeligt.

## Eksempel 2 - Backend-lagring til e-arkivering

Datamængderne vokser hele tiden overalt, både fordi mere information bliver digitaliseret, og fordi de data, vi lagrer i form af f.eks. levende billeder og højopløste indskanninger, fylder mere.

Mange virksomheder og myndigheder har et arkiveringsansvar, som strækker sig længere og længere tilbage i tiden. Disse forhold tilsammen gør, at datamængderne vokser mere og mere, hvilket gør det svært at finde omkostningseffektive løsninger over tid.

Traditionelt har virksomheder opdelt de data, der lagres, i dem, som skal kunne tilgås relativt hurtigt, og arkiverede data, som ikke behøver at være lige så tilgængelige, og lagret dem på billigere lagringsmedier. Før digitaliseringsbølgen var mikrofilm det, man brugte, og efter digitaliseringen ofte båndbackup. Problemet med disse metoder har været tilgængeligheden, fordi begge indebærer manuelle processer for at nå de arkiverede data. Derudover har det været omkostningstungt i form af infrastruktur og meget svært at sikre, at de arkiverede data virkelig er intakte.

En objektlagringstjeneste med S3 kan løse disse problemer. Ved at bruge en S3-tjeneste kan alle data, der lagres i arkivet, omkostningseffektivt lagres på samme måde. Det er ligegyldigt, om brugeren skal have fat i en fil, der blev arkiveret i går eller for ti år siden. E-arkivløsningen holder styr på metadata og referencer, men lagrer alle data i S3, hvilket gør det tilgængeligt og omkostningseffektivt. Da Safesprings tjenester produceres i Sverige, behøver ingen at være bekymrede for, hvilken lovgivning der gælder, da kunden og leverandøren er underlagt de samme love.

## Eksempel 3 - Prisvenlige og interne samarbejdsløsninger

S3 tilbyder med sin enkelhed mulighed for at bruge den med mange forskellige applikationer. Det gør det muligt at udvide funktionaliteten i kombination med den omkostningseffektive lagring, som S3 tilbyder. Mange gange kræves højere sikkerhed, og så findes der flere alternativer med lignende funktioner.

### Nextcloud

En sådan applikation er Nextcloud, som er serversoftware baseret på open source og har til formål at sætte en egen privat tjeneste op, der ligner f.eks. Dropbox. Grænsefladen er webbaseret, men der findes også synkroniseringsklienter til både arbejdsstationer, der kører Windows, macOS eller Linux, og smartphones, så data altid er lette at få adgang til.

Nextcloud understøtter S3 som lagring, hvilket gør det let at sætte en prisvenlig lagringstjeneste op til virksomhedens filer. Nextcloud understøtter også funktioner til midlertidig deling af filer med eksterne parter, både med adgangskode og tidsbegrænsning. Netop disse funktioner findes ikke indbygget i S3, men giver en meget stor merværdi for brugerne.

Læs mere på Nextclouds websted:
https://nextcloud.com

## Eksempel 4 - Privat S3-tjeneste med Minio

Safesprings S3-tjeneste er designet med høj sikkerhed og fleksibilitet i fokus. Der findes dog tilfælde, hvor man kan få brug for endnu større muligheder.

Initiativet Minio er et open source-projekt, med hvilket du kan sætte din helt egen private installation af en S3-kompatibel tjeneste op. For at sikre adgang og tilgængelighed kan det med fordel sættes op i [Safesprings Compute-tjeneste](/services/safespring-compute).

Fordelene ved en sådan løsning er, at du får fuld kontrol over alle indstillinger for S3-tjenesten, og at den bliver privat for din virksomhed. Du kan selv styre policies for adgang, login og lagring. De filer, der lagres i tjenesten, lægges på Safesprings Compute-tjeneste af typen Large, hvilket giver en lidt højere omkostning, men til gengæld kan du styre alting selv.

Minio bruges som referenceinstallation for S3 af mange producenter, der bygger S3-understøttelse ind i deres produkter, hvilket øger sandsynligheden for, at integrationer med andre løsninger fungerer.

Læs mere om Minio:
https://min.io

## Hvorfor en lokal leverandør af cloud-tjenester?

Hvis du bruger Amazons protokol, hvorfor så ikke bruge Amazon som lagringsløsning? Der er en række grunde til, at en lokal leverandør af en S3-kompatibel tjeneste kan være en bedre løsning:

{{% inline "Efterlevelse af lovgivning (compliance)" %}} Ved at placere dine data hos en lokal leverandør bliver det meget enklere at efterleve lokale love og regler. Med indførelsen af f.eks. den amerikanske lov Cloud Act er det i praksis ligegyldigt, hvor data er lagret, men derimod hvilket land virksomheden har hjemsted i. Juridiske eksperter hos eSam mener, at oplysninger lagret i en amerikansk tjeneste er at betragte som røbet, uanset hvilket land datacentret ligger i. Eftersom Safespring er et svensk selskab, er vi ikke underlagt Cloud Act.

{{% inline "Lokal support" %}} Når du skal i gang med en ny leverandør, kan det føles trygt, at supportorganisationen er baseret i samme land som dig – og taler dit sprog.

{{% inline "Øget kapacitet" %}} Nærmere placering af data og færre flaskehalse giver højere kapacitet til upload og download af data.

De fleste backup-løsninger kan bruge en cloud-baseret S3-løsning som en sekundær lagringspool. Med blot konfigurering i den eksisterende backup-løsning og uden yderligere investeringer kan du få en offsite-kopi af dine data. Safespring Storage produceres i Sverige, hvilket betyder, at du ikke behøver at bekymre dig om udenlandske love og regler. Desuden understøtter den S3-protokollen, hvilket gør den let at integrere med eksisterende backup-løsninger på markedet.

## Safespring er en bæredygtig platform for sikre cloud-tjenester

Safespring leverer sikre, hurtige og fleksible cloud- og IT-infrastrukturtjenester baseret på open source og åbne standarder.

Vi producerer selv alle tjenester lokalt, hvilket gør det nemmere for dig at efterleve love og regler – og føle dig tryg! Safespring er en svensk virksomhed med lokalt producerede cloud-tjenester i Sverige og Norge.

Cloud-tjenester er en moderne og effektiv måde at producere IT på, men spørgsmål, der altid diskuteres, er, om det er sikkert, og hvor ens data findes. Det er noget, vi har taget til os, da vi skabte Safespring og vores tjenester – hos os skal du føle dig tryg! Dine data forlader aldrig landet.

At vi er en svensk virksomhed betyder desuden, at vi ikke er omfattet af Cloud Act, så vi kan ikke tvinges til at udlevere dine data. Vi har skabt vores tjenester med højeste sikkerhed i fokus, og vi producerer dem lokalt, så du ved, hvilke love og regler der gælder, og hvor dine data er lagret! Vi er eksperter i det, vi gør, og hjælper dig gerne med at finde den bedste løsning til netop dig.

{{% inline "Open Source" %}} Vores tjenester er baseret på åben kildekode, såkaldt open source. De seneste årtier har vist, at åben kildekode giver et særdeles stærkt økosystem af virksomheder og organisationer, som i det store hele har de samme behov, men samtidig har behov for skræddersyede løsninger.

Eftersom kildekoden er offentlig, er den enkel at gennemgå og forbedre. Åben kildekode gør dig uafhængig af platform og leverandør, hvilket både øger sikkerheden og fleksibiliteten. Derudover er der ingen licensomkostning.