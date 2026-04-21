---
ai: true
title: "Forstå Safespring On-demand Kubernetes hvis du vanligvis kjører Kubernetes selv"
date: "2026-03-30"
intro: "En praktisk veiledning for plattformteam som ønsker å forstå tjenestegrensene, standardinnstillingene og tekniske avveininger i Safespring On-demand Kubernetes."
draft: false
sectiontext: "Teknologioppdatering"
section: "Teknologioppdatering"
tags: ["container"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "nb"
author: ""
TOC: "I dette innlegget"
sidebarlinkname: "Talos på OpenStack"
sidebarlinkurl: "/tech-update/2025-03-talos-linux-on-openstack/"
sidebarlinkname2: "Cluster API på OpenStack"
sidebarlinkurl2: "/tech-update/2025-06-deploy-talos-kubernetes-on-openstack-with-cluster-api/"
aliases:
  - /blogg/2026/2026-03-what-to-compare-managed-kubernetes-vs-self-managed/
  - /blogg/2026-03-what-to-compare-managed-kubernetes-vs-self-managed/
---


{{< ingress >}}
Hvis du allerede vet hvordan du kjører Kubernetes selv, er ikke det nyttige spørsmålet om en
administrert tjeneste kan opprette en klynge. Det nyttige spørsmålet er hvordan tjenesten er
formet, hvor grensen går, og hvilke deler av plattformen den allerede løser godt.
{{< /ingress >}}

Vi har skrevet ganske mye i det siste om å bygge Kubernetes-plattformer med Talos,
OpenStack, Cluster API, Cinder CSI og moderne trafikkstyring. Det er den ene siden av
bildet.

Den andre siden er å forstå hva en tjeneste som Safespring On-demand Kubernetes faktisk
prøver å tilby.

Dette innlegget er rettet mot ingeniører og plattformteam som er perfekt i stand til å kjøre
Kubernetes selv, men som ønsker å forstå Safespring On-demand Kubernetes i mer konkrete
termer enn «administrerte Kubernetes».

{{% accordion title="TL;DR" %}}

1. Safespring On-demand Kubernetes er designet for å gi team en brukbar Kubernetes-plattformgrense fra dag én, i stedet for en rå klynge som fortsatt trenger omfattende monteringsarbeid.
2. Tjenesten dokumenterer for tiden portal- og API-basert klyngeklargjøring, et administrert kontrollplan, Talos Linux, Cilium som standard CNI, trafikkstyringsalternativer, Cinder CSI-basert lagring, OIDC-basert tilgang og GPU-kompatible arbeidernoder.
3. Den mest nyttige måten å evaluere tjenesten på er å se på hva som allerede er løst som standard og hva som fortsatt er en del av din egen plattformdesign.
4. For mange team er ikke verdien at Kubernetes blir «enkel», men at færre tilbakevendende plattformansvar må eies internt.
5. Hvis teamet ditt allerede kjører Kubernetes selv, overføres den opplevelsen fortsatt direkte, spesielt rundt arbeidsbelastningsdesign, observerbarhet, tilgangsmodeller, lagringsatferd og trafikkmønstre.

{{< localbutton text="Gå til tjenestegrensen" link="#tjenestegrensen-i-praksis" >}}

{{% /accordion %}}
{{< accordion-script >}}

## Hva Safespring On-demand Kubernetes prøver å gjøre

På et høyt nivå er Safespring On-demand Kubernetes en Kubernetes-tjeneste bygget på
Safespring Compute og eksponert gjennom en selvbetjeningsmodell. Hensikten er ikke å
erstatte teknisk vurdering eller å skjule Kubernetes bak et proprietært kontrolllag.
Hensikten er å gi en solid plattformgrunnlinje slik at team kan bruke mindre tid på å sette
sammen selve klyngen og mer tid på å jobbe med arbeidsbelastninger.

Det skillet er viktig.

Noen tjenester markedsfører seg selv som administrerte mens de fortsatt lar store deler av
plattformhistorien stå uløst. Det kan hende du fortsatt må feste identitet, lagring, tilgang
eller en sammenhengende oppgraderingsmodell før tjenesten føles brukbar i produksjon.

Det som er mer interessant i Safesprings tilfelle er at tjenestegrensen er dokumentert i
konkrete plattformtermer:

- hvordan klynger klargjøres
- hvordan kontrollflyet håndteres
- hvilken nettverksmodell som forventes
- hvordan vedvarende lagring gjøres tilgjengelig
- hvordan brukere autentiserer til klynger
- hva som støttes rundt GPU-arbeidsbelastninger
- hva som bevisst er utenfor standard tjenesteomfang

Det gjør det lettere for plattformteam å vurdere tilbudet som infrastruktur, ikke bare som
produktmeldinger.

## Hva du får på dag én

Basert på gjeldende Safespring-dokumentasjon, er On-demand Kubernetes dokumentert med
følgende plattformegenskaper:

- **Klyngeklargjøring gjennom portal og API** slik at klynger kan opprettes og administreres gjennom en selvbetjent arbeidsflyt.
- **Et administrert kontrollplan** med støtte for `3` eller `5` kontrollplannoder avhengig av tilgjengelighetskrav.
- **Talos Linux** som det underliggende operativsystemet for Kubernetes-nodene.
- **Cilium som standard CNI**, med Gateway API aktivert i nettverksmodellen.
- **Støtte for Traefik** for lag som foretrekker et kjent inntrengningsmønster.
- **Persistente volumer gjennom Cinder CSI**, med `fast` og `large` lagringsklasser tilgjengelig når CSI-komponenten er aktivert.
- **OIDC-basert autentisering**, ved hjelp av portalgenerert kubeconfig og `kubelogin`.
- **GPU-kompatible arbeidernoder** for team med ML, AI eller andre akselererte arbeidsbelastninger.
- **Et administrert kontrollplan**, målt mot Kubernetes API-tilgjengelighet.

Det er en meningsfull mengde plattformoverflate som må defineres foran. Det betyr at
tjenesten ikke bare handler om å få noder til å starte opp. Det handler også om å gi team en
kjent måte å tenke på tilgang, nettverk, lagring og plattformdrift.

## Tjenestegrensen i praksis

Hvis du er vant til selvstyrte Kubernetes, hjelper det å lese tjenesten ikke som "hva kan
den gjøre?" men som "hva eier den allerede?"

En klarere måte å tenke på er emne for emne:

{{< boundary-row
  first="true"
  topic="Klyngeoppretting"
  service="Klynger opprettes og administreres gjennom portal og API."
  responsibility="Navngivning, miljømodell, automatiseringslag og interne bruksmønstre."
>}}

{{< boundary-row
  topic="Kontrollplan"
  service="Kontrollplanet administreres og er tilgjengelig i oppsett med `3` eller `5` noder."
  responsibility="Arbeidslastarkitektur, SLO-er og hvordan applikasjoner oppfører seg ved node- eller avhengighetsfeil."
>}}

{{< boundary-row
  topic="Node-OS og klyngefundament"
  service="Talos Linux brukes som operativsystemfundament."
  responsibility="Applikasjonsantakelser, kjøretidsbegrensninger og hvordan arbeidslaster operasjonaliseres på toppen av fundamentet."
>}}

{{< boundary-row
  topic="Nettverk"
  service="Cilium er standard CNI, og Gateway API er aktivert i plattformmodellen."
  responsibility="Rutedesign, sertifikatmodell, namespace-grenser, eksponeringsstrategi og nettverkspolicy."
>}}

{{< boundary-row
  topic="Ingress og trafikk"
  service="Traefik støttes i tillegg til standard nettverksretning."
  responsibility="Hvilket trafikkmønster dere standardiserer internt og hvordan det driftes på tvers av team."
>}}

{{< boundary-row
  topic="Persistent lagring"
  service="Cinder CSI kan aktiveres med lagringsklassene `fast` og `large`."
  responsibility="PVC-design, forventninger til lagring, stateful arbeidslastatferd og datastrategi på applikasjonsnivå."
>}}

{{< boundary-row
  topic="Autentisering"
  service="OIDC-basert klyngetilgang er dokumentert via portalutstedt kubeconfig og `kubelogin`."
  responsibility="RBAC-konvensjoner, tenantmodell, gruppekartlegging og intern tilgangsstyring."
>}}

{{< boundary-row
  topic="GPU-arbeidslaster"
  service="GPU-kompatible arbeidernoder er en del av det dokumenterte tilbudet."
  responsibility="Planleggingsregler, kjøretidsforventninger, modellpakking og kostnadskontroll for arbeidslaster."
>}}

{{< boundary-row
  topic="Observerbarhet"
  service="Grensen er eksplisitt i stedet for skjult."
  responsibility="Prometheus, Grafana, Loki, varsling, dashbord, loggoppbevaring og hendelsesflyt forblir en del av plattformdesignet."
  last="true"
>}}

Den siste raden er verdt å si tydelig.

Safespring presenterer ikke On-demand Kubernetes som om alle operasjonelle bekymringer er
samlet i tjenesten. Den gjeldende dokumentasjonen anbefaler å distribuere din egen
observerbarhetsstabel, og klyngelogger lagres eller overvåkes som standard for
on-demand-klynger.

For noen lag kan det se ut som et gap. For andre er det en sunn og realistisk grense. Det
betyr at tjenesten tar ansvar for selve klyngeplattformen uten å late som om observerbarhet
på arbeidsbelastningsnivå kan løses generisk for hver kunde.

## Hvorfor denne tjenesteformen er viktig

Den operative formen til en Kubernetes-tjeneste betyr mer enn etiketten som er festet til
den.

En tjeneste kan ha en lang funksjonsliste og likevel skape mye plattformarbeid for kunden
dersom standardene er svake eller ansvarsfordelingen er vag. Motsatt kan en tjeneste være
ganske overbevisende selv uten å prøve å administrere hvert lag, så lenge tjenestegrensen er
sammenhengende og dokumentert.

Det er der Safespring On-demand Kubernetes blir interessant for ingeniører.

Den kombinerer noen få valg som passer godt sammen:

- Talos som nodefundament
- Cilium som standard nettverksretning
- Gateway API-støtte i tjenestemodellen
- Vedvarende lagring på baksiden av slagg
- OIDC-basert klyngetilgang
- et administrert kontrollplan i stedet for et ta med-din-egen kontrollplanmønster

Ingen av disse valgene er mystiske i seg selv. De fleste plattformteam vil gjenkjenne dem
umiddelbart. Verdien er at de kombineres til et konsistent tjenesteutgangspunkt i stedet for
å bli en liste over integrasjonsoppgaver som hver kunde må løse fra bunnen av.

## Hvor din egen Kubernetes-opplevelse fortsatt betyr noe

Å bruke en tjeneste som denne gjør ikke Kubernetes kunnskap mindre viktig. Det endrer bare
hvor den kunnskapen brukes best.

Hvis teamet ditt allerede driver Kubernetes selv, forblir denne erfaringen svært relevant på
områder som:

- utforming av navnerom, RBAC og bruk av flerlagsklynge
- velge mellom inngangsmønstre og gatewaymønstre
- bestemme hvordan stateful arbeidsbelastninger skal bruke vedvarende volumer
- utforme observerbarhet og varsling som matcher applikasjonene dine
- forstå feildomener på arbeidsbelastningsnivå i stedet for bare på nodenivå
- bestemme når GPU-arbeidsbelastninger hører hjemme i Kubernetes og når de ikke gjør det

Med andre ord kan tjenesten begrense mengden klyngerørleggerarbeid du trenger å eie, men den
fjerner ikke behovet for plattformutvikling rundt arbeidsbelastninger og operasjoner.

Det er vanligvis en god handel.

## En praktisk måte å evaluere Safespring On-demand Kubernetes på

For team som ønsker å vurdere tjenesten seriøst, tror vi de beste spørsmålene er disse:

1. Stemmer den dokumenterte tjenestegrensen med hvordan vi ønsker å dele plattformarbeid internt?
2. Er nettverks-, tilgangs- og lagringsstandardene nær nok til våre virkelige krav?
3. Har vi mer nytte av et administrert kontrollplan enn vi drar nytte av å designe det laget selv?
4. Er vi komfortable med å eie vår egen observerbarhet, arbeidsbelastningsstandarder og plattformkonvensjoner på høyere nivå i tillegg til tjenesten?
5. Passer de dokumenterte byggeklossene til den typen applikasjoner vi faktisk kjører, ikke bare klyngene vi ønsker å lage?

Disse spørsmålene har en tendens til å produsere en mer nyttig teknisk diskusjon enn
generiske debatter om hvorvidt administrerte Kubernetes er "bedre" enn selvstyrte
Kubernetes.

## Avsluttende tanke

Hvis du er vant til å bygge klynger selv, er Safespring On-demand Kubernetes sannsynligvis
mest nyttig å tenke på som en dokumentert plattformgrunnlinje.

Den gir deg et administrert kontrollplan, en selvbetjent klargjøringsbane, en valgt
nodeoperativmodell, en standard nettverksretning, lagringsintegrasjoner,
identitetsintegrasjon og støtte for GPU-kompatible arbeidsbelastninger. Samtidig har det
fortsatt nok av de øvre plattformlagene i hendene dine til at du kan forme
arbeidsbelastningsopplevelsen etter dine egne behov.

Den balansen er ofte der en tjeneste blir virkelig nyttig for ingeniørteam.

Ikke fordi det fjerner Kubernetes.

Fordi det reduserer mengden Kubernetes-plattformmontering som må gjentas for hver klynge.

{{< horisontal-card
  image="/img/graphics/safespring-image.svg"
  alt="Safespring On-demand Kubernetes for plattformteam"
  cardtitle="Gå gjennom plattformgrensen på dine egne vilkår"
  text="Hvis du ønsker å evaluere Safespring On-demand Kubernetes for egne arbeidslaster, start med den dokumenterte tjenestegrensen: klargjøring, lagring, nettverk, tilgang og drift."
  link="/kontakt/"
  linktext="Diskuter dine krav"
>}}
