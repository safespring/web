---
ai: true
title: "Forstå Safespring On-demand Kubernetes, hvis du normalt kører Kubernetes selv"
date: "2026-03-30"
intro: "En praktisk guide til platformsteams, der ønsker at forstå tjenestegrænsen, standardindstillingerne og tekniske kompromiser i Safespring On-demand Kubernetes."
draft: false
sectiontext: "Teknologiopdatering"
section: "Teknologiopdatering"
tags: ["container"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "da"
author: ""
TOC: "I dette indlæg"
sidebarlinkname: "Talos på OpenStack"
sidebarlinkurl: "/tech-update/2025-03-talos-linux-on-openstack/"
sidebarlinkname2: "Cluster API på OpenStack"
sidebarlinkurl2: "/tech-update/2025-06-deploy-talos-kubernetes-on-openstack-with-cluster-api/"
aliases:
  - /blogg/2026/2026-03-what-to-compare-managed-kubernetes-vs-self-managed/
  - /blogg/2026-03-what-to-compare-managed-kubernetes-vs-self-managed/
---


{{< ingress >}}
Hvis du allerede selv ved, hvordan du kører Kubernetes, er det nyttige spørgsmål ikke, om en
administreret tjeneste kan oprette en klynge. Det nyttige spørgsmål er, hvordan servicen er
formet, hvor grænsen går, og hvilke dele af platformen den allerede løser godt.
{{< /ingress >}}

Vi har skrevet en del på det seneste om at bygge Kubernetes-platforme med Talos, OpenStack,
Cluster API, Cinder CSI og moderne trafikstyring. Det er den ene side af billedet.

Den anden side er at forstå, hvad en tjeneste som Safespring On-demand Kubernetes faktisk
forsøger at levere.

Dette indlæg henvender sig til ingeniører og platformsteams, der er perfekt i stand til selv
at køre Kubernetes, men ønsker at forstå Safespring On-demand Kubernetes i mere konkrete
termer end "administrerede Kubernetes".

{{% accordion title="TL;DR" %}}

1. Safespring On-demand Kubernetes er designet til at give teams en brugbar Kubernetes-platformsgrænse fra dag ét, snarere end en rå klynge, der stadig har brug for omfattende montagearbejde.
2. Tjenesten dokumenterer i øjeblikket portal- og API-baseret klyngeforsyning, et administreret kontrolplan, Talos Linux, Cilium som standard-CNI, trafikstyringsmuligheder, Cinder CSI-baseret lagring, OIDC-baseret adgang og GPU-kompatible arbejdsknudepunkter.
3. Den mest nyttige måde at evaluere tjenesten på er at se på, hvad der allerede er løst som standard, og hvad der stadig er en del af dit eget platformdesign.
4. For mange teams er værdien ikke, at Kubernetes bliver "nemme", men at færre tilbagevendende platformsansvar skal ejes internt.
5. Hvis dit team allerede kører Kubernetes selv, overføres den oplevelse stadig direkte, især omkring arbejdsbelastningsdesign, observerbarhed, adgangsmodeller, lageradfærd og trafikmønstre.

{{< localbutton text="Gå til tjenestegrænsen" link="#tjenestegrænsen-i-praksis" >}}

{{% /accordion %}}
{{< accordion-script >}}

## Hvad Safespring On-demand Kubernetes forsøger at gøre

På et højt niveau er Safespring On-demand Kubernetes en Kubernetes-tjeneste bygget på
Safespring Compute og eksponeret gennem en selvbetjeningsmodel. Hensigten er ikke at
erstatte ingeniørmæssig vurdering eller at skjule Kubernetes bag et proprietært kontrollag.
Hensigten er at give en solid platformsbaseline, så teams kan bruge mindre tid på at samle
selve klyngen og mere tid på at arbejde med arbejdsbelastninger.

Den skelnen betyder noget.

Nogle tjenester markedsfører sig selv som administrerede, mens de stadig lader store dele af
platformhistorien stå uløst. Du skal muligvis stadig fastgøre identitet, opbevaring, indgang
eller en sammenhængende opgraderingsmodel, før tjenesten føles brugbar i produktionen.

Hvad der er mere interessant i Safesprings tilfælde er, at servicegrænsen er dokumenteret i
konkrete platformstermer:

- hvordan klynger leveres
- hvordan styreplanet håndteres
- hvilken netværksmodel der forventes
- hvordan vedvarende lagring gøres tilgængelig
- hvordan brugere autentificerer til klynger
- hvad der understøttes omkring GPU-arbejdsbelastninger
- hvad der bevidst efterlades uden for standardserviceomfanget

Det gør det nemmere for platformsteams at vurdere tilbuddet som infrastruktur, ikke kun som
produktmeddelelser.

## Hvad du får på dag ét

Baseret på den aktuelle Safespring-dokumentation er On-demand Kubernetes dokumenteret med
følgende platformsegenskaber:

- **Klyngeklargøring via portal og API**, så klynger kan oprettes og administreres gennem en selvbetjeningsarbejdsgang.
- **Et administreret kontrolplan** med understøttelse af `3` eller `5` kontrolplan noder afhængigt af tilgængelighedskrav.
- **Talos Linux** som det underliggende operativsystem for Kubernetes-knuderne.
- **Cilium som standard CNI**, med Gateway API aktiveret i netværksmodellen.
- **Støtte til Traefik** for hold, der foretrækker et velkendt indgangsmønster.
- **Vedholdende volumener gennem Cinder CSI**, med `fast` og `large` lagerklasser tilgængelige, når CSI-komponenten er aktiveret.
- **OIDC-baseret godkendelse**, ved hjælp af portalgenereret kubeconfig og `kubelogin`.
- **GPU-kompatible arbejdernoder** til teams med ML, AI eller andre accelererede arbejdsbelastninger.
- **Et administreret kontrolplan**, målt i forhold til Kubernetes API-tilgængelighed.

Det er en meningsfuld mængde platforms overfladeareal, der skal defineres foran. Det
betyder, at tjenesten ikke kun handler om at få noder til at starte. Det handler også om at
give teams en kendt måde at tænke på adgang, netværk, lagring og platformsdrift.

## Tjenestegrænsen i praksis

Hvis du er vant til selvadministrerede Kubernetes, hjælper det at læse tjenesten ikke som
"hvad kan den?" men som "hvad ejer den allerede?"

En klarere måde at tænke det på er emne for emne:

{{< boundary-row
  first="true"
  topic="Klyngeoprettelse"
  service="Klynger oprettes og administreres via portal og API."
  responsibility="Navngivning, miljømodel, automatiseringslag og interne brugsmønstre."
>}}

{{< boundary-row
  topic="Kontrolplan"
  service="Kontrolplanet administreres og er tilgængeligt i opsætninger med `3` eller `5` noder."
  responsibility="Workload-arkitektur, SLO'er og hvordan applikationer opfører sig ved node- eller afhængighedsfejl."
>}}

{{< boundary-row
  topic="Node-OS og klyngefundament"
  service="Talos Linux bruges som operativsystemfundament."
  responsibility="Applikationsantagelser, runtime-begrænsninger og hvordan workloads operationaliseres oven på fundamentet."
>}}

{{< boundary-row
  topic="Netværk"
  service="Cilium er standard-CNI, og Gateway API er aktiveret i platformmodellen."
  responsibility="Rutedesign, certifikatmodel, namespace-grænser, eksponeringsstrategi og netværkspolitik."
>}}

{{< boundary-row
  topic="Ingress og trafik"
  service="Traefik understøttes ud over standardnetværksretningen."
  responsibility="Hvilket trafikmønster I standardiserer internt, og hvordan det driftes på tværs af teams."
>}}

{{< boundary-row
  topic="Persistent storage"
  service="Cinder CSI kan aktiveres med storage classes `fast` og `large`."
  responsibility="PVC-design, forventninger til lagring, stateful workload-adfærd og datastrategi på applikationsniveau."
>}}

{{< boundary-row
  topic="Autentificering"
  service="OIDC-baseret klyngeadgang er dokumenteret via portaludstedt kubeconfig og `kubelogin`."
  responsibility="RBAC-konventioner, tenantmodel, gruppekortlægning og intern adgangsstyring."
>}}

{{< boundary-row
  topic="GPU-workloads"
  service="GPU-kompatible workernoder er en del af det dokumenterede tilbud."
  responsibility="Planlægningsregler, runtime-forventninger, modelpakning og omkostningskontrol for workloads."
>}}

{{< boundary-row
  topic="Observerbarhed"
  service="Grænsen er eksplicit snarere end skjult."
  responsibility="Prometheus, Grafana, Loki, alarmering, dashboards, logopbevaring og hændelsesflow forbliver en del af platformdesignet."
  last="true"
>}}

Den sidste række er værd at fremhæve klart.

Safespring præsenterer ikke On-demand Kubernetes, som om enhver operationel bekymring er
bundtet ind i tjenesten. Den aktuelle dokumentation anbefaler, at du implementerer din egen
observerbarhedsstak, og klyngelogfiler gemmes eller overvåges som standard for
on-demand-klynger.

For nogle hold kan det ligne et hul. For andre er det en sund og realistisk grænse. Det
betyder, at tjenesten tager ansvar for selve klyngeplatformen uden at foregive, at
observerbarhed på arbejdsbelastningsniveau kan løses generisk for hver kunde.

## Hvorfor denne serviceform betyder noget

Den operationelle form af en Kubernetes-tjeneste betyder mere end etiketten, der er knyttet
til den.

En tjeneste kan have en lang funktionsliste og stadig skabe en masse platformarbejde for
kunden, hvis standarderne er svage, eller ansvarsfordelingen er vag. Omvendt kan en service
være ret overbevisende selv uden at forsøge at styre hvert lag, så længe servicegrænsen er
sammenhængende og dokumenteret.

Det er her, Safespring On-demand Kubernetes bliver interessant for ingeniører.

Den kombinerer et par valgmuligheder, der passer godt sammen:

- Talos som knudepunktet
- Cilium som standard netværksretning
- Gateway API-understøttelse i servicemodellen
- Vedvarende opbevaring på bagsiden
- OIDC-baseret klyngeadgang
- et administreret kontrolplan frem for et medbring-selv kontrolplanmønster

Ingen af ​​disse valg er mystiske i sig selv. De fleste platformsteams vil genkende dem med
det samme. Værdien er, at de kombineres til et konsekvent serviceudgangspunkt i stedet for
at blive en liste over integrationsopgaver, som hver enkelt kunde skal løse fra bunden.

## Hvor din egen Kubernetes-oplevelse stadig betyder noget

Brug af en tjeneste som denne gør ikke Kubernetes viden mindre vigtig. Det ændrer bare, hvor
den viden bedst bruges.

Hvis dit team allerede driver Kubernetes selv, er denne erfaring fortsat yderst relevant på
områder som:

- design af navnerum, RBAC og multi-team klyngebrug
- at vælge mellem indgangsmønstre og gatewaymønstre
- beslutte, hvordan stateful workloads skal bruge vedvarende volumener
- design af observerbarhed og alarmering, der matcher dine applikationer
- at forstå fejldomæner på arbejdsbelastningsniveau i stedet for kun på nodeniveau
- beslutte, hvornår GPU-arbejdsbelastninger hører hjemme i Kubernetes, og hvornår de ikke gør det

Med andre ord kan tjenesten indsnævre mængden af ​​klynge VVS, du skal eje, men den fjerner
ikke behovet for platformsteknik omkring arbejdsbelastninger og operationer.

Det er normalt en god handel.

## En praktisk måde at evaluere Safespring On-demand Kubernetes på

For teams, der ønsker at vurdere servicen seriøst, synes vi, at de bedste spørgsmål er
disse:

1. Stemmer den dokumenterede servicegrænse med, hvordan vi ønsker at opdele platformarbejdet internt?
2. Er netværks-, adgangs- og lagerstandarderne tæt nok på vores virkelige krav?
3. Nyder vi mere af et styret kontrolplan, end vi har gavn af at designe det lag selv?
4. Er vi komfortable med at eje vores egen observerbarhed, arbejdsbelastningsstandarder og platformskonventioner på højere niveau oven i tjenesten?
5. Passer de dokumenterede byggeklodser til den slags applikationer, vi rent faktisk kører, ikke kun de klynger, vi ønsker at skabe?

Disse spørgsmål har en tendens til at producere en mere nyttig teknisk diskussion end
generiske debatter om, hvorvidt administrerede Kubernetes er "bedre" end selvadministrerede
Kubernetes.

## Afsluttende tanke

Hvis du selv er vant til at bygge klynger, er Safespring On-demand Kubernetes nok mest
nyttig at tænke på som en dokumenteret platformsbaseline.

Det giver dig et administreret kontrolplan, en selvbetjent leveringssti, en valgt
nodedriftsmodel, en standardnetværksretning, lagerintegrationer, identitetsintegration og
understøttelse af GPU-kompatible arbejdsbelastninger. Samtidig efterlader det stadig nok af
de øverste platformlag i dine hænder, til at du kan forme arbejdsbelastningsoplevelsen efter
dine egne behov.

Den balance er ofte, hvor en service bliver virkelig nyttig for ingeniørteams.

Ikke fordi det fjerner Kubernetes.

Fordi det reducerer mængden af ​​Kubernetes-platformsamling, der skal gentages for hver
klynge.

{{< horisontal-card
  image="/img/graphics/safespring-image.svg"
  alt="Safespring On-demand Kubernetes til platformsteams"
  cardtitle="Gå gennem platformsgrænsen på dine egne vilkår"
  text="Hvis du vil evaluere Safespring On-demand Kubernetes for egne workloads, skal du starte med den dokumenterede tjenestegrænse: provisioning, lagring, netværk, adgang og drift."
  link="/kontakt/"
  linktext="Diskuter dine krav"
>}}
