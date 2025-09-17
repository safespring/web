---
ai: true
title: "Safesprings uforanderlige objektlagring"
date: "2021-04-12"
draft: false
tags: ["English"]
author: "Gabriel Paues"
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_38.gif"
intro: "Med uforanderlige objekter er Safespring Storage en utmerket måte å opprette en ekstern sikkerhetskopi som er sikker og pålitelig."
sidebarlinkname: ""
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: ""
card: "safespring-storage.svg"
background: "safespring-storage.png"
sidebarimage: "safespring-storage.svg"
socialmediabild: "safespring_social_38.gif"
toc: "Innholdsfortegnelse"
language: "nb"
section: "Løsningsoversikt"
aliases:
  - /whitepaper/immutable-storage/
  - /solution-brief/immutable-storage/
  - /en/whitepaper/immutable-storage/
---
{{< ingress >}}
I dette løsningsnotatet går vi gjennom Safespring Storage-tjenesten basert på S3-objektlagring. Med uforanderlige objekter er Safespring Storage en utmerket måte å lage en ekstern sikkerhetskopi som er sikker og pålitelig.
{{< /ingress >}}

Å sikkerhetskopiere dataene dine er viktig i alle IT-miljøer. De fleste moderne sikkerhetskopiløsninger er funksjonsrike og gode til å håndtere menneskelige feil eller katastrofer. Men angrepsflatene endrer seg, noe som gjør at løsninger som var tilstrekkelige for en stund siden, ikke lenger er oppdaterte i møte med dagens trusler. Å teste sikkerhetskopiløsningen for å sikre at den gjør det vi tror den gjør, kan være kostbart, men er alltid en nødvendig rutine.

Ved å bruke løsningen som beskrives i dette løsningsnotatet, kan organisasjonen oppnå følgende fordeler:

- En moderne og komplett sikkerhetskopiløsning som er enkel å administrere.
- Sikker ekstern lagring for kritiske sikkerhetskopidata.
- En kostnadseffektiv løsning som dekker alle sikkerhetskrav fra en krevende organisasjon.

## 3-2-1-regelen

Det finnes flere måter å utforme en sikkerhetskopiløsning på, men de fleste er enige om at 3-2-1-regelen er et godt prinsipp. Det betyr at man bør ha tre kopier av dataene, på to separate medier, hvorav én av kopiene skal lagres utenfor huset. Den tradisjonelle måten å få til dette på var å bruke en båndrobot med et rullerende opplegg der bånd med komplette sikkerhetskopier ble transportert til et annet sted med jevne mellomrom.

Med introduksjonen av standardiserte, skybaserte lagringsløsninger som S3 (som selv om det opprinnelig var et Amazon-produkt nå er en åpen standard), har det oppstått mer effektive alternativer til fysisk transport av bånd. I stedet sendes de eksterne sikkerhetskopiene over en kryptert kanal til et annet sted. Siden skybaserte lagringsløsninger er svært kostnadseffektive, tilbyr de både automatisering og pålitelighet til en lav pris.

## Automatisk – men uten luftgap

Selv om dette er populært, er det et problem med å lagre den eksterne sikkerhetskopien i en skyløsning, nemlig at det ikke finnes noe luftgap. Den manuelle prosessen med å flytte data fysisk på bånd kunne være tungvint, men la til et ekstra lag med sikkerhet ved at angriperen ikke kan nå stedet der de eksterne sikkerhetskopiene ligger. Selv om hele miljøet var kompromittert, ville de eksterne båndene være trygge på det andre stedet, med mindre angriperen fikk fysisk tilgang. Disse kopiene kunne brukes til å gjenopprette hele løsningen ved behov, selv om det er tidkrevende.

Angripere blir stadig mer sofistikerte og forstår at for å kunne utpresse med ransomware, må også sikkerhetskopiene fjernes. Flere og flere angripere går spesifikt etter sikkerhetskopiserveren for å slette alle sikkerhetskopier før de bruker ransomware til å kryptere dataene. Det betyr at de også vil forsøke å slette alt som er tilgjengelig, inkludert de eksterne sikkerhetskopiene lagret i skyløsningen. Når det er gjort, kan offeret bli nødt til å betale angriperne for å få dataene tilbake.

Siden mange virksomheter bruker samme programvare, vil noen moderne varianter av ransomware til og med automatisk slette de skybaserte, eksterne sikkerhetskopiene, noe som gjør skyløsningen mindre attraktiv sammenlignet med den gammeldagse, båndbaserte sikkerhetskopieringen.

## Objektlåsing eller uforanderlige objekter

De fleste skybaserte lagringsløsninger er objektlagring. Et objekt representerer den opplastede filen samt tilhørende metadata, som når filen ble lastet opp, størrelsen og filtype. For å hindre at ondsinnede angripere kan slette lagrede objekter, er det introdusert en ny funksjon: objektlåsing, også kalt uforanderlige objekter. Dette betyr at det på forhånd er mulig å konfigurere regler for hvordan og når objekter som er lagret i løsningen, kan fjernes. For eksempel kan administrator konfigurere at ingen objekter kan slettes før tretti dager har gått siden de ble lastet opp; lagringsløsningen vil da nekte en slik forespørsel.

> Object locking og Immutable objects er to begreper som beskriver det samme.

Denne funksjonaliteten har vist seg å være svært nyttig for sikkerhetskopiløsninger, siden den skaper et virtuelt luftgap. Selv om angripere får tilgang til stedet der de eksterne sikkerhetskopiene er lagret, kan de ikke slette sikkerhetskopiene uansett hvor hardt de prøver.

### Støtte i sikkerhetskopiprogramvare

Siden problemet med ransomware som sletter eksterne sikkerhetskopier har blitt mer vanlig, er støtte for objektlåsing introdusert i sikkerhetskopiprogramvaren. I avsnittet nedenfor beskriver vi hvordan du aktiverer dette i Veeam, som er en populær sikkerhetskopiløsning.

S3 organiserer filer i objekter og buckets. En bucket kan inneholde filer og er enheten som konfigureres i sikkerhetskopiprogramvaren for å sende sikkerhetskopiene til. Når du oppretter bucket-en, aktiverer du objektlåsing og konfigurerer variabler for retensjonstid, altså hvor lenge objektene skal være låst. Vi går ikke inn i detaljene her, men det er viktig å forstå at dette steget er nødvendig.

Når det er gjort, oppretter du et “Object Storage Repository” i Veeam.

![Gjør S3-bucket til uforanderlig objekt](/img/whitepapers/make_S3_bucket_an_immutable_object.png)

I konfigurasjonsveiviseren, under steget Bucket, må du krysse av for alternativet “Make recent backups immutable for…”. Her konfigurerer du også antall dager objektene skal være uforanderlige, og det er viktig å sette samme verdi som ble konfigurert på bucket-en.

Når det er gjort, fullfører du veiviseren, og funksjonen er nå aktivert på object repository-et. Nå er det på tide å konfigurere et sikkerhetskopioppsett som forteller Veeam hvilke filer som skal sendes til repositoriet.

## Konklusjon

Vi har forklart viktigheten av eksterne sikkerhetskopier og hvorfor objektlåsing er en viktig funksjon. Ved å bruke dette kan katastrofer unngås, samtidig som gjenopprettingstiden (RTO) kan kortes ned, siden gjenoppretting fra bånd kan ta lang tid. Med objektlåsing kan man få det beste fra to verdener.