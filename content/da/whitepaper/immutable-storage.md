---
ai: true
title: "Safespring uforanderlig objektlagring"
date: "2021-04-12"
draft: false
author: "Gabriel Paues"
section: "Løsningsbeskrivelse"
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_38.gif"
intro: "Med uforanderlige objekter er Safespring Storage en fremragende måde at oprette en offsite-backup, der er sikker og pålidelig."
sidebarlinkname: ""
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: ""
card: "safespring_card_38.jpg"
eventbild: "safespring_background_38.jpg"
socialmediabild: "safespring_social_38.gif"
toc: "Indholdsfortegnelse"
language: "da"
aliases:
  - /no/whitepaper/immutable-storage/
---
{{< ingress >}}
I dette løsningsnotat gennemgår vi Safespring Storage-tjenesten baseret på S3-objektlagring. Med uforanderlige objekter er Safespring Storage en fremragende måde at skabe en offsite-backup, der er sikker og pålidelig.
{{< /ingress >}}

At tage backup af dine data er vigtigt i alle IT-miljøer. De fleste moderne backupsystemer er funktionsrige og gode til at håndtere menneskelige fejl eller katastrofer. Men angrebsfladerne ændrer sig, hvilket gør, at løsninger, der var tilstrækkelige for et stykke tid siden, ikke længere er tidssvarende i forhold til de nuværende trusler. At teste backupsystemet for at sikre, at det gør det, vi tror, det gør, kan være dyrt, men er altid en nødvendig rutine.

Ved at bruge løsningen beskrevet i dette notat kan organisationen opnå disse fordele:

- En moderne og komplet backupløsning, der er nem at administrere.
- En sikker offsite-lagring til kritiske backupdata.
- En omkostningseffektiv løsning, der opfylder alle sikkerhedskrav fra en krævende organisation.

## 3-2-1-reglen

Der findes flere måder at designe en backupløsning på, men de fleste synes at være enige om, at 3-2-1-reglen er et godt princip. Det betyder, at man bør have tre kopier af data, på to separate medier, hvoraf den ene kopi skal opbevares offsite. Den traditionelle måde at imødekomme dette på var at bruge en taperobot med en rullende plan, hvor bånd med fulde backups blev transporteret til en anden placering med jævne mellemrum.

Med introduktionen af standardiserede, cloud-baserede lagringsløsninger som S3 (som, selv om det oprindeligt var et Amazon-produkt, nu er en åben standard), er der opstået mere effektive alternativer til fysisk transport af bånd. I stedet sendes offsite-backups over en krypteret kanal til en anden lokalitet. Da cloud-baserede lagringsløsninger er meget omkostningseffektive, tilbyder de både automatisering og pålidelighed til en lav pris.

## Automatisk – men intet luftgab

Selv om det er populært, er der et problem med at opbevare offsite-backup i en cloudløsning, nemlig at der ikke er noget luftgab. Den manuelle proces med at flytte data fysisk på bånd kan være besværlig, men den tilføjer det ekstra sikkerhedslag, at angriberen ikke kan nå den placering, hvor offsite-backups er opbevaret. Selv hvis hele miljøet bliver kompromitteret, vil offsite-båndene være sikre på den anden lokation, medmindre angriberen opnår fysisk adgang. Disse kopier kan bruges til at gendanne hele løsningen om nødvendigt, om end tidskrævende.

Angribere bliver mere sofistikerede og forstår, at for at kunne afpresse med ransomware, skal backupperne også fjernes. Flere og flere angribere går specifikt efter backupserveren for at slette alle backups, før de bruger ransomware til at kryptere data. Det betyder, at de også vil forsøge at fjerne alt, hvad der er tilgængeligt, herunder offsite-backups, der er lagret i cloudløsningen. Når det er sket, kan offeret blive tvunget til at betale angriberne for at få data tilbage.

Da mange virksomheder bruger den samme software, fjerner nogle moderne ransomware-varianter endda de cloud-baserede offsite-backups automatisk, hvilket gør den cloud-baserede løsning mindre attraktiv sammenlignet med den gammeldags båndbaserede backup.

## Objektlåsning eller uforanderlige objekter

De fleste cloud-baserede lagringsløsninger er objektlagringsløsninger. Et objekt repræsenterer den uploadede fil plus tilknyttede metadata, såsom hvornår filen blev uploadet, dens størrelse og filtype. For at beskytte mod ondsindede angribere, der sletter de lagrede objekter, er der introduceret en ny funktion: objektlåsning, også kaldet uforanderlige objekter. Det betyder, at man på forhånd kan konfigurere regler for, hvordan og hvornår objekter i løsningen kan slettes. For eksempel kan administratoren konfigurere, at ingen objekter kan slettes, før der er gået tredive dage, siden de blev uploadet, hvilket gør det umuligt at gøre det tidligere, da lagringsløsningen vil afvise en sådan anmodning.

> Objektlåsning og uforanderlige objekter er to begreber for det samme.

Denne funktionalitet har vist sig at være meget nyttig for backupløsninger, fordi den skaber et virtuelt luftgab. Selv hvis angriberne får adgang til den placering, hvor offsite-backups er lagret, kan de ikke slette backupperne, uanset hvor hårdt de prøver.

### Understøttelse i backupsoftware

Da problemet med ransomware, der sletter offsite-backups, er blevet mere udbredt, er der indført understøttelse af objektlåsning i backupsoftwaren. I det følgende afsnit beskriver vi, hvordan man aktiverer det i Veeam, som er en populær backupløsning.

S3 organiserer filer i objekter og buckets. En bucket kan indeholde filer og er den enhed, der konfigureres i backupsoftwaren til at modtage backupperne. Når bucketen oprettes, aktiveres objektlåsning, og variabler for retentionstid – dvs. hvor længe objekterne skal være låst – konfigureres. Vi går ikke i detaljer her, men det er vigtigt at forstå, at dette trin er nødvendigt.

Når det er gjort, opretter du et “Object Storage Repository” i Veeam.

![Gør S3-bucket til et uforanderligt objekt](/img/whitepapers/make_S3_bucket_an_immutable_object.png)

I konfigurationsguiden markerer man under trin Bucket valgmuligheden “Make recent backups immutable for…”. Her angiver du også det antal dage, objekterne skal være uforanderlige, og det er vigtigt at angive den samme værdi, som blev konfigureret på bucketen.

Når det er gjort, fuldfører du guiden, og funktionen er nu aktiveret på objekt-repositoryet. Nu er det tid til at konfigurere et backupskema, der fortæller Veeam, hvilke filer der skal sendes til repositoryet.

## Konklusion

Vi har forklaret vigtigheden af offsite-backups og hvorfor objektlåsning er en vigtig funktion. Ved at bruge det kan katastrofer undgås, samtidig med at genopretningstiden (RTO) kan forkortes, da gendannelse fra bånd kan tage lang tid. Med objektlåsning kan man få det bedste fra to verdener.

<div class="flexcontainer-shortcode" style="">

{{< services >}}

</div>