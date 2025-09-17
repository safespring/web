---
ai: true
title: "Objektlagring med S3-protokollen gir deg ubegrenset fleksibilitet"
language: "nb"
date: 2018-06-20
draft: false
author: ""
tags: ["Svenska"]
documentation: "Lagring"
dokumentnamn: "Safespring_White-Paper_Att-tanka-pa-i-och-med-inforandet-av-GDPR-och-CLOUD-act.pdf"
intro: "Denne løsningsbeskrivelsen går gjennom lagringsstandarden S3 og gir deg fire eksempler på hvordan den kan brukes i dag. Du vil lære hvordan du kan bruke den på ulike måter i virksomheten din, sikkert og moderne, uten at dataene dine trenger å forlate landet."
card: "safespring-s3.svg"
sidebarimage: "safespring-s3.svg"
background: "safespring-storage.png"
socialmediabild: "safespring_social_27.gif"
socialmedia: "/blogg/socialmedia/safespring_social_27.gif"
toc: "Innholdsfortegnelse"
section: "Løsningsoversikt"
aliases:
  - /solution-brief/objektlagring/
---
{{< ingress >}}
Denne solution brief går gjennom lagringsstandarden S3 og gir deg fire eksempler på hvordan den kan brukes i dag.
{{< /ingress >}}

Du vil lære hvordan du kan bruke objektlagring på ulike måter i virksomheten din, sikkert og moderne, uten at dataene dine trenger å forlate landet.

## Hva er S3?

S3 (Simple Storage Service) er en open source-protokoll utviklet av Amazon for deres tjeneste med samme navn.

Protokollen ble lansert i USA 14. mars 2006 og kom til Europa 17. november året etter. De grunnleggende lagringsenhetene i S3 er objekter som er organisert i såkalte "buckets". Hvert objekt identifiseres av en unik nøkkel som brukeren har fått tildelt.

> Selskaper som bruker S3-protokollet er blant andre Netflix, Dropbox, Tumblr og Pinterest, for å nevne noen.

Protokollet er i dag åpent for enhver leverandør å bruke og gjør det enkelt å laste opp og ned filer sikkert over HTTPS. Mange backup-løsninger som Veeam, Commvault, Backup Exec og flere til, støtter S3 direkte i applikasjonen, noe som gjør det enkelt å sette opp. Gjennom standardiserte protokoller blir integrasjon mellom ulike løsninger en enkel sak.

### Eksempler på bruksområder

Det finnes mange måter å utnytte fleksibiliteten og sikkerheten i S3 på. I vår virksomhet og blant kundene våre finner vi flere eksempler, og nedenfor følger fire bruksområder som vi mener er gode implementeringer av S3.

## Eksempel 1 - Offsite backup

Å ta backup er en selvfølge i dag – men å ta backup som tåler at hele den primære siten din går ned, er vanskeligere.

Løsningen er å ha et system som sender en offsite-kopi til et annet sted. Med en slik løsning på plass er du langt bedre forberedt dersom noe skulle skje med den primære siten din. Løsningen er enkel og kostnadseffektiv fordi du bruker ditt eksisterende backup-system.

### Immutable objects

Når objektlagring brukes til offsite backup, er det viktig at data ikke kan manipuleres eller slettes. Derfor er funksjonen "immutable objects" en god måte å beskytte lagrede data på. Brukeren kan sette en tidsramme der data er fullstendig beskyttet mot påvirkning utenfra. Det gjør sikkerhetskopieringen sikrere og mer kostnadseffektiv enn før med Safespring Storage. [Les vår solution brief om immutable objects](/solution-brief/immutable-storage/).

### Viktigheten av offsite backup

Å lagre kopier et annet sted er uvurderlig dersom en katastrofe skulle inntreffe. De viktigste grunnene til en slik løsning er følgende:

- Sikre data mot angrep i det primære miljøet.
- Ha en offsite-kopi dersom den primære siten din skulle rammes av en større katastrofe (brann, flom eller f.eks. strømbrudd).

Styrken med objektlagring er at den er generell og fungerer med eksisterende løsninger. Backupen kan håndteres akkurat som før, med den store forskjellen at det også finnes en kopi på et annet sted.

### 3-2-1-regelen

Det finnes en rekke backup-løsninger på markedet som kan håndtere din lokale backup svært godt.

Den vanligste løsningen er å ha en backup-server med en dedikert lagringsløsning tilkoblet som sikrer at det går raskt å lese tilbake dersom en server skulle rammes av noe uventet. Når vi snakker om backup, er det vanlig å referere til 3-2-1-regelen, som innebærer at du skal ha tre kopier av dataene dine, på to ulike medietyper og én kopi offsite.

Den lokale backup-løsningen løser bare de to første kravene: Du har sannsynligvis tre backuper på to ulike lagringsmedier, men ingen av dem er offsite. Tradisjonelt har offsite-backup innebåret fysisk transport av for eksempel bånd til et annet sted, men det er dyrt og krever rutiner. Nå som standardiserte lagringsløsninger som kan nås kryptert over internett er tilgjengelige, blir dette trinnet betydelig enklere.

## Eksempel 2 - Backend-lagring for e-arkivering

Datamengdene øker hele tiden, både fordi mer informasjon digitaliseres og fordi data vi lagrer, for eksempel i form av bevegelige bilder og høyoppløselige innskanninger, tar mer plass.

Mange virksomheter og offentlige etater har et arkiveringsansvar som strekker seg stadig lenger bakover i tid. Samlet gjør dette at datamengdene vokser mer og mer, noe som gjør det vanskelig å finne kostnadseffektive løsninger over tid.

Tradisjonelt har selskaper delt opp data som lagres i det som må kunne nås relativt raskt, og arkivert data som ikke trenger å være like tilgjengelig, og lagret det på billigere lagringsmedier. Før digitaliseringsbølgen ble mikrofilm brukt, og etter digitaliseringen oftest båndbackup. Problemet med disse metodene har vært tilgangen, siden begge innebærer manuelle prosesser for å nå det arkiverte materialet. I tillegg har det vært kostbart i form av infrastruktur og svært vanskelig å sikre at de arkiverte dataene faktisk er intakte.

En objektlagringstjeneste med S3 kan løse disse problemene. Ved å bruke en S3-tjeneste kan alle data som lagres i arkivet, lagres kostnadseffektivt på samme måte. Det spiller ingen rolle om brukeren trenger tilgang til en fil som ble arkivert i går eller for ti år siden. E-arkivløsningen holder orden på metadata og referanser, men lagrer alle data i S3, noe som gjør det tilgjengelig og kostnadseffektiv. Siden Safesprings tjenester produseres i Sverige, trenger ingen å være bekymret for hvilken lovgivning som gjelder, ettersom kunden og leverandøren er underlagt de samme lovene.

## Eksempel 3 - Prisgunstige og interne samarbeidstjenester

S3 tilbyr med sin enkelhet muligheten til å bruke det med mange ulike applikasjoner. Det gjør det mulig å utvide funksjonaliteten i kombinasjon med den kostnadseffektive lagringen S3 tilbyr. Ofte kreves høyere sikkerhet, og da finnes det flere alternativer med tilsvarende funksjoner.

### Nextcloud

En slik applikasjon er Nextcloud, som er serverprogramvare basert på åpen kildekode og som har som mål å sette opp en egen privat tjeneste som ligner for eksempel Dropbox. Grensesnittet er nettbasert, men det finnes også synkroniseringsklienter for både arbeidsstasjoner som kjører Windows, macOS eller Linux og for smarttelefoner, slik at data alltid er lett tilgjengelig.

Nextcloud støtter S3 som lagring, noe som gjør det lett å sette opp en prisgunstig lagringstjeneste for bedriftens filer. Nextcloud støtter også funksjoner for midlertidig deling av filer med eksterne aktører, både med passord og tidsbegrensning. Akkurat disse funksjonene finnes ikke innebygd i S3, men gir en svært stor merverdi for brukerne.

Les mer på Nextclouds nettsted:
https://nextcloud.com

## Eksempel 4 - Privat S3-tjeneste med Minio

Safesprings S3-tjeneste er designet med høy sikkerhet og fleksibilitet i fokus. Det finnes likevel tilfeller der man kan trenge enda større muligheter.

Initiativet Minio er et open source-prosjekt som lar deg sette opp din helt egen private installasjon av en S3-kompatibel tjeneste. For å sikre tilgang og tilgjengelighet går det utmerket å sette det opp i [Safesprings Compute-tjeneste](/services/safespring-compute).

Fordelene med en slik løsning er at du får full kontroll over alle innstillinger for S3-tjenesten, og at den blir privat for virksomheten din. Du kan selv styre retningslinjer for tilgang, innlogging og lagring. Filene som lagres i tjenesten legges på Safesprings Compute-tjeneste av typen Large, noe som gir en noe høyere kostnad, men til gjengjeld kan du styre absolutt alt selv.

Minio brukes som referanseinstallasjon for S3 av mange produsenter som bygger inn S3-støtte i produktene sine, noe som øker sannsynligheten for at integrasjoner med andre løsninger fungerer.

Les mer om Minio:
https://min.io

## Hvorfor en lokal leverandør av skytjenester?

Hvis du bruker en Amazon-protokoll, hvorfor ikke bruke Amazon som lagringsløsning? Det finnes flere grunner til at en lokal leverandør av en S3-kompatibel tjeneste kan være en bedre løsning:

{{% inline "Etterlevelse av lover (Compliance)" %}} Ved å legge dataene dine hos en lokal leverandør blir det mye enklere å etterleve lokale lover og regler. Med innføringen av for eksempel den amerikanske loven Cloud Act spiller det i praksis ingen rolle hvor dataene er lagret, men hvilket land selskapet har sitt sete i. Juridiske eksperter i eSam mener at opplysninger lagret i en amerikansk tjeneste må anses som avslørt, uavhengig av hvilket land datasenteret ligger i. Siden Safespring er et svensk selskap, er vi ikke underlagt Cloud Act.

{{% inline "Lokal kundestøtte" %}} Når du skal komme i gang med en ny leverandør, kan det føles trygt at supportorganisasjonen er basert i samme land som deg – og snakker ditt språk.

{{% inline "Økt kapasitet" %}} Nærmere plassering av dataene og færre flaskehalser gir høyere kapasitet for opplasting og nedlasting av data.

De fleste backup-løsninger kan bruke en skybasert S3-løsning som en sekundær lagringspool. Med kun konfigurasjon i den eksisterende backup-løsningen og uten ytterligere investeringer kan du få en offsite-kopi av dataene dine. Safespring Storage produseres i Sverige, noe som gjør at du ikke trenger å bekymre deg for utenlandske lover og regler. Dessuten støtter den S3-protokollet, noe som gjør at den er lett å integrere med eksisterende backup-løsninger på markedet.

## Safespring er en bærekraftig plattform for sikre skytjenester

Safespring leverer sikre, raske og fleksible sky- og IT-infrastrukturtjenester basert på Open Source og åpne standarder.

Vi produserer selv alle tjenester lokalt, noe som gjør det enklere for deg å oppfylle lover og regler, og føle deg trygg! Safespring er et svensk selskap med lokalt produserte skytjenester i Sverige og Norge.

Skytjenester er en moderne og effektiv måte å produsere IT på, men spørsmål som alltid diskuteres, er om det er sikkert og hvor dataene dine befinner seg. Det er noe vi har tatt på alvor da vi skapte Safespring og tjenestene våre – hos oss skal du føle deg trygg! Dataene dine forlater aldri landet.

At vi er et svensk selskap innebærer dessuten at vi ikke omfattes av Cloud Act, så vi kan ikke tvinges til å utlevere dataene dine. Vi har skapt tjenestene våre med høyeste sikkerhet i fokus; vi produserer dem lokalt slik at du skal vite hvilke lover og regler som gjelder og hvor dataene dine er lagret! Vi er eksperter på det vi gjør og hjelper deg gjerne med å finne den beste løsningen for akkurat deg.

{{% inline "Open Source" %}} Tjenestene våre er basert på åpen kildekode, såkalt Open Source. De siste tiårene har vist at åpen kildekode gir et svært kraftig økosystem av selskaper og organisasjoner som i stor grad har de samme behovene, men samtidig behov for skreddersydde løsninger.

Siden kildekoden er offentlig, er den enkel å granske og forbedre. Åpen kildekode gjør deg uavhengig av plattform og leverandør, noe som både øker sikkerheten og fleksibiliteten. I tillegg er det ingen lisenskostnad.