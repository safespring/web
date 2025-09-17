---
ai: true
title: "Safespring uforanderlig objektlagring"
date: "2021-04-12"
draft: false
tags: ["English"]
author: "Gabriel Paues"
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_38.gif"
intro: "Med uforanderlige objekter er Safespring Storage en fremragende måde at oprette en offsite-backup, der er sikker og pålidelig."
sidebarlinkname: ""
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: ""
card: "safespring-storage.svg"
background: "safespring-storage.png"
sidebarimage: "safespring-storage.svg"
socialmediabild: "safespring_social_38.gif"
toc: "Indholdsfortegnelse"
language: "da"
section: "Løsningsoversigt"
aliases:
  - /whitepaper/immutable-storage/
  - /solution-brief/immutable-storage/
  - /en/whitepaper/immutable-storage/
---
{{< ingress >}}
I dette løsningsoverblik gennemgår vi Safespring Storage-tjenesten, der er baseret på S3-objektlagring. Med uforanderlige objekter er Safespring Storage en fremragende måde at skabe en offsite-backup, der er sikker og pålidelig.
{{< /ingress >}}

At tage backup af dine data er vigtigt i alle IT-miljøer. De fleste moderne backup-systemer er rige på funktioner og gode til at håndtere menneskelige fejl eller katastrofer. Men angrebsfladerne ændrer sig, hvilket gør, at løsninger, der var tilstrækkelige for nogen tid siden, ikke længere er opdaterede i forhold til de nuværende trusler. At teste backup-systemet for at sikre, at det gør, hvad vi tror, det gør, kan være omkostningstungt, men er altid en nødvendig rutine.

Ved at bruge løsningen beskrevet i dette brief kan organisationen opnå disse fordele:

- En moderne og komplet backup-løsning, der er nem at administrere.
- En sikker offsite-lagring til kritiske backupdata.
- En omkostningseffektiv løsning, der opfylder alle sikkerhedskrav fra en krævende organisation.

## 3-2-1-reglen

Der er flere måder at designe en backup-løsning på, men de fleste synes at være enige om, at 3-2-1-reglen er et godt princip. Det betyder, at man skal have tre kopier af dataene på to separate medier, hvoraf den ene kopi skal opbevares offsite. Den traditionelle løsning var at bruge en taperobot med en rullende ordning, hvor bånd med komplette backups blev transporteret til en anden lokation med tilbagevendende mellemrum.

Med introduktionen af standardiserede, cloud-baserede lagringsløsninger som S3 (der, selvom det oprindeligt var et Amazon-produkt, nu er en åben standard), er der opstået mere effektive alternativer til fysisk transport af bånd. I stedet sendes offsite-backups over en krypteret kanal til en anden lokation. Da cloud-baserede lagringsløsninger er meget omkostningseffektive, tilbyder de både automatisering og pålidelighed til en lav pris.

## Automatisk – men intet air gap

Selv om det er populært, er der et problem med at lagre offsite-backup i en cloud-løsning, og det er, at der ikke er noget air gap. Den manuelle proces med fysisk at flytte data på bånd kan have været besværlig, men tilføjer det ekstra sikkerhedslag, at en angriber ikke kan nå den lokation, hvor offsite-backups er opbevaret. Selv hvis hele miljøet bliver kompromitteret, vil offsite-båndene være sikre på den anden lokation, medmindre angriberen opnår fysisk adgang. Disse kopier kan bruges til at gendanne hele løsningen om nødvendigt, selvom det er tidskrævende.

Angribere bliver mere sofistikerede og forstår, at for at kunne afpresse med en kryptolocker, skal backupperne også fjernes. Flere og flere angribere går specifikt efter backup-serveren for at slette alle backups, før de bruger en kryptolocker til at kryptere dataene. Det betyder, at de også vil forsøge at fjerne alt, der er tilgængeligt, herunder de offsite-backups, der er lagret i cloud-løsningen. Når det er gjort, kan offeret blive tvunget til at betale angriberne for at få dataene tilbage.

Da mange virksomheder bruger den samme software, kan nogle moderne kryptolockere endda automatisk slette de cloud-baserede offsite-backups, hvilket gør den cloud-baserede løsning mindre attraktiv sammenlignet med den gammeldags, tape-baserede backup.

## Objektlåsning eller uforanderlige objekter

De fleste cloud-baserede lagringsløsninger er objektlagringsløsninger. Et objekt repræsenterer den uploadede fil plus tilknyttede metadata, som hvornår filen blev uploadet, dens størrelse og filtype. For at forhindre ondsindede angribere i at slette de lagrede objekter er der blevet introduceret en ny funktion: objektlåsning, eller uforanderlige objekter, som det også kaldes. Det betyder, at det på forhånd er muligt at konfigurere regler for, hvordan og hvornår objekter, der er lagret i løsningen, kan fjernes. For eksempel kan administratoren konfigurere, at ingen objekter kan fjernes, før der er gået tredive dage, siden de blev uploadet, hvilket gør det umuligt at slette dem, da lagringsløsningen vil afvise en sådan anmodning.

> Object locking og Immutable objects er to betegnelser for det samme.

Denne funktionalitet har vist sig at være meget nyttig til backup-løsninger, da den skaber et virtuelt air gap. Selv hvis angriberne får adgang til lokationen, hvor offsite-backups er lagret, kan de ikke slette backupperne, uanset hvor meget de forsøger.

### Understøttelse i backupsoftware

Da problemet med kryptolockere, der sletter offsite-backups, er blevet mere almindeligt, er der blevet introduceret understøttelse af objektlåsning i backup-softwaren. I det følgende afsnit beskriver vi, hvordan man aktiverer det i Veeam, som er en populær backup-løsning.

S3 organiserer filer i objekter og buckets. En bucket kan indeholde filer og er den enhed, der konfigureres i backup-softwaren til at modtage backups. Når bucketen oprettes, aktiveres objektlåsning, og variabler for retentionstid, som betyder hvor længe objekterne skal være låst, konfigureres. Vi går ikke i detaljer her, men det er vigtigt at forstå, at dette trin er nødvendigt.

Når det er gjort, opretter du et “Object Storage Repository” i Veeam.

![Gør S3-bucket til et uforanderligt objekt](/img/whitepapers/make_S3_bucket_an_immutable_object.png)

I konfigurationsguiden, under trinnet Bucket, skal man markere valgmuligheden “Make recent backups immutable for…”. Her konfigurerer du også antallet af dage, objekterne skal være uforanderlige, og det er vigtigt at konfigurere den samme værdi, som blev angivet på bucketen.

Når det er gjort, afslutter du guiden, og funktionen er nu aktiveret på objekt-repositoryet. Nu er det tid til at konfigurere en backupplan, der fortæller Veeam, hvilke filer der skal sendes til repositoryet.

## Konklusion

Vi har forklaret vigtigheden af offsite-backups og hvorfor objektlåsning er en vigtig funktion. Ved at bruge den kan katastrofer undgås, samtidig med at genopretningstiden (RTO) kan forkortes, da en gendannelse fra bånd kan tage lang tid. Med objektlåsning kan man opnå det bedste fra to verdener.