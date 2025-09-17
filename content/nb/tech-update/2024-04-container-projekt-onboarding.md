---
ai: true
title: "Introduksjonsveiledning for Kubernetes-prosjektet"
date: "2024-04-08"
intro: "Dette verktøyet er laget for IT-arkitekter, DevOps-ingeniører og tekniske team som ønsker å integrere virksomhetsspesifikke arbeidsflyter i Kubernetes, og dermed legge til rette for en sømløs og effektiv administrasjonsløsning."
draft: false
section: "Teknologioppdatering"
author: "Niklas Hagman"
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "nb"
TOC: "I denne veiledningen"
sidebarlinkname: "GitHub-repositorium"
sidebarlinkurl: "https://github.com/safespring-community/utilities/tree/main/okd/project-onboarding"
sidebarlinkicon: "fa-arrow-up-right-from-square"
aliases:
  - /blogg/2024/2024-04-container-projekt-onboarding/
---
{{< ingress >}}
Velkommen til Project Onboarding – en transformativ tilnærming som forenkler håndtering av namespaces i Kubernetes for multi-tenant-miljøer.
{{< /ingress >}}

Dette verktøyet er laget for IT-arkitekter, DevOps-ingeniører og tekniske team som vil integrere virksomhetsspesifikke arbeidsflyter i Kubernetes, og dermed legge til rette for et sømløst, effektivt system for håndtering av namespaces. Project Onboarding befinner seg i skjæringspunktet mellom innovasjon og enkelhet og tilbyr en robust løsning på kompleksiteten som ofte oppstår ved håndtering av namespaces i Kubernetes.

{{% note "GitHub-repositorium" %}}
Denne veiledningen ledsages av et komplett sett med kodeeksempler tilgjengelig i vårt GitHub-repositorium. For enkel tilgang til alle skripter, konfigurasjoner og maler som brukes gjennom hele veiledningen, besøk [safespring-community/utilities](https://github.com/safespring-community/utilities/tree/main/okd/project-onboarding) på GitHub. Dette sikrer at du har alt du trenger for å lykkes med Project Onboarding i ditt miljø.
{{% /note %}}

## Hvorfor Project Onboarding?

Å administrere Kubernetes-objekter og namespaces kan være krevende, spesielt i multitenant-scenarier der presisjon og sikkerhet er avgjørende. Project Onboarding introduserer en elegant løsning som utnytter kraften i automatisering for å forenkle onboarding-prosessen for nye namespaces, slik at teamet ditt kan konsentrere seg om å levere verdi i stedet for å navigere i kompleksiteten i Kubernetes-konfigurasjoner.

Tenk deg en verden der håndtering av namespaces er like enkelt som å legge til noen få etiketter. Med Project Onboarding blir dette virkelighet. Ved å definere kravene dine gjennom enkle etiketter utløser du en serie automatiserte prosesser som konfigurerer namespaces nøyaktig etter dine behov, fra ressurskvoter og nettverkspolicyer til rollebindinger – alt orkestrert uten manuell inngripen.```yaml
kind: Namespace
apiVersion: v1
metadata:
  name: glassproj-appname-acc
  labels:
    project-onboarding/managed-by: selfservice-api
    project-onboarding/compute-limits-cpu: "10"
    project-onboarding/compute-limits-memory: 8Gi
    project-onboarding/storage-size: 50Gi
    project-onboarding/team: glassproj
```
Denne YAML-utdraget viser hvordan et nytt namespace `glassproj-appname-acc` kan opprettes med omfattende konfigurasjoner ved hjelp av etiketter. Det er et bevis på hvordan Project Onboarding setter team i stand til å definere komplekse innstillinger uten friksjon, med fokus på utvikling og utrulling av applikasjoner.

### Nøkkelfunksjoner

- **Forenklet namespace-administrasjon**: Strømlinjeform oppretting og vedlikehold av Kubernetes-namespaces ved hjelp av etiketter.
- **Automatisering først**: Utnytt Namespace Configuration Operator til å automatisere håndheving av policyer, roller og kvoter basert på angitte etiketter.
- **Flerleietakermiljø gjort enkelt**: Sikre trygge og isolerte flerleietakermiljøer med tilpassbare nettverkspolicyer og ressurskvoter.
- **Kompatibilitet med OpenShift og Kubernetes**: Utformet for fleksibilitet; Project Onboarding integreres sømløst med både Kubernetes- og OpenShift-miljøer, støttet av Helm og Kustomize for en smidig oppsettprosess.

Project Onboarding er mer enn bare et verktøy; det er et nytt perspektiv på Kubernetes-administrasjon som inviterer deg til å tenke nytt om hvordan namespaces håndteres i infrastrukturen din. Det handler om å sette team i stand, styrke sikkerheten og fremme effektivitet gjennom intelligent automatisering.

## Namespace-konfigurasjoner

Denne automatiseringen utnytter [Namespace-konfigurasjonsoperatør](https://github.com/redhat-cop/namespace-configuration-operator) fra Red Hats Communities of Practice, et utmerket verktøy for å spore etiketter i namespaces og OpenShift-grupper eller -brukere, noe som gjør det til en hjørnestein i vår Project Onboarding.

Her er et glimt av hvordan disse ressursdefinisjonene for Namespace Configuration Operator er organisert innenfor strukturen til Project Onboarding:```text
.
└── namespace-configuration
    └── configuration
        ├── all
        │   └── NamespaceConfig
        │       ├── networkpolicies
        │       │   ├── networkpolicies-multitenancy.yaml
        │       │   └── networkpolicies-team.yaml
        │       │
        │       ├── resourcequotas
        │       │   ├── compute-limits-cpu-default.yaml
        │       │   ├── compute-limits-cpu.yaml
        │       │   ├── compute-limits-memory-default.yaml
        │       │   ├── compute-limits-memory.yaml
        │       │   ├── storage-csi-cinder-sc-delete-size.yaml
        │       │   ├── storage-csi-cinder-sc-retain-size.yaml
        │       │   ├── storage-global-size-limit.yaml
        │       │   └── storage-no-storage.yaml
        │       │
        │       └── rolebindings
        │           ├── rolebindings-team1.yaml
        │           ├── rolebindings-team2.yaml
        │           ├── rolebindings-team3.yaml
        │           └── rolebindings-team.yaml
        │
        └── clustertypeZ
            └── GroupConfig
                └── group-shared-namespace.yaml
```
Med Project Onboarding trenger du bare å opprette et nytt namespace med etiketter som definerer alt. Nedenfor er et komplett eksempel for namespace [glassproj-appname-acc (GitHub)](https://github.com/safespring-community/utilities/blob/main/okd/project-onboarding/namespace-configuration/examples/clustertypeZ/glassproj-appname-acc/namespace.yaml) med alle etiketter som per i dag er mulig.```yaml
kind: Namespace
apiVersion: v1
metadata:
  name: glassproj-appname-acc
  labels:
    project-onboarding/managed-by: selfservice-api

    project-onboarding/compute-limits-cpu: "10"
    project-onboarding/compute-limits-memory: 8Gi

    project-onboarding/storage-size: 300Gi
    project-onboarding/storage-csi-cinder-sc-retain-size: 100Gi
    project-onboarding/storage-csi-cinder-sc-delete-size: 200Gi

    project-onboarding/team: glassproj

    project-onboarding/team1-name: glassproj-admins
    project-onboarding/team1-permissions: admin

    project-onboarding/team2-name: glassproj-editors
    project-onboarding/team2-permissions: edit

    project-onboarding/team3-name: glassproj-viewers
    project-onboarding/team3-permissions: view

    project-onboarding/networkpolicies-multitenancy: "true"
    project-onboarding/networkpolicies-team: glassproj
```
### Nettverkspolicyer

Å implementere hensiktsmessige nettverkspolicyer er avgjørende for å opprettholde sikkerhet og isolasjon i en Kubernetes-klynge, spesielt når du er vert for flere kunder eller team. La oss se hvordan Project Onboarding håndterer nettverkspolicyer.

#### Nettverkspolicyer for multitenancy

- **`project-onboarding/networkpolicies-multitenancy`**

I Kubernetes-klynger med flere leietakere er det vanlig å begrense nettverkstrafikk mellom namespaces. Med mindre etiketten `project-onboarding/networkpolicies-multitenancy: false` er satt, vil disse nettverkspolicyene automatisk håndheves i navnerommet. Dette sikrer at nettverkstrafikk mellom ulike kunder eller team i samme klynge alltid rutes på riktig måte, og opprettholder strenge krav til sikkerhet og isolasjon.

#### Teamspesifikke nettverkspolicyer

- **`project-onboarding/networkpolicies-team`**

For å legge til rette for kommunikasjon mellom team på tvers av namespaces, bruk etiketten `project-onboarding/networkpolicies-team: teamname`, der du erstatter `teamname` med faktisk teamnavn (f.eks. `glassproj`). Dette muliggjør sømløst samarbeid mellom team-navnerom samtidig som nødvendig sikkerhet og isolasjon i klyngen opprettholdes.

### Rollebindinger

Å koble namespaces til brukergrupper er essensielt for å styre tilgang og sikre at team kan bruke sine tildelte navnerom effektivt. På grunn av begrensninger i mulighetene med etiketter har vi laget et enkelt system for dette.

- **`project-onboarding/team`**

Bruk etiketten `project-onboarding/team: groupname` for å gi administratorrettigheter til en gruppe i navnerommet. Denne etiketten forenkler prosessen med å gi et team tilgangsrettighetene de trenger i sitt navnerom.

For mer finmasket kontroll over tillatelser er følgende etiketter tilgjengelige:

- `project-onboarding/team1-name`
- `project-onboarding/team1-permissions`
- `project-onboarding/team2-name`
- `project-onboarding/team2-permissions`
- `project-onboarding/team3-name`
- `project-onboarding/team3-permissions`

Disse etikettene lar deg knytte en gruppe til spesifikke tillatelser i et navnerom. Selv om tillatelsene i utgangspunktet er begrenset til admin, edit og view, kan de tilpasses i den egendefinerte ressursen `namespaceConfig` for å støtte flere varianter ved behov.

### Ressurskvoter

Ressurskvoter er en kritisk del av ressursstyringen i Kubernetes-navnerom, og sikrer at hvert team eller prosjekt bare bruker sin rettmessige andel av ressursene, slik at andre ikke blir skadelidende. Project Onboarding forenkler dette ved at du kan definere ressurskvoter direkte via etiketter på navnerommet, noe som gjør det enkelt å styre grenser for CPU, minne og lagring på navneromsnivå.

#### Definere CPU- og minnekvoter

For å administrere beregningsressurser effektivt tilbyr Project Onboarding følgende etiketter:

- **`project-onboarding/compute-limits-cpu`**: Angir den totale mengden CPU-ressurser som kan brukes av alle podder i navnerommet. For eksempel vil verdien `"10"` tillate podder i navnerommet å bruke inntil 10 CPU-enheter.
- **`project-onboarding/compute-limits-memory`**: Bestemmer den totale mengden minne (RAM) som kan brukes av alle podder i navnerommet. Verdien `"8Gi"` tillater inntil 8 GiB minnebruk.

Disse kvotene sørger for at applikasjonene dine kjører effektivt uten å monopolisere klyngeressursene, og legger til rette for rettferdig ressursfordeling på tvers av alle navnerom.

#### Administrere lagringskvoter

Lagringshåndtering er en annen viktig del som dekkes av Project Onboarding. Følgende etiketter hjelper deg å definere lagringskvoter:

- **`project-onboarding/storage-size`**: Setter total mengde vedvarende lagring tilgjengelig for navnerommet. For eksempel vil `"50Gi"` avsette inntil 50 GiB vedvarende lagring på tvers av alle podder i navnerommet.

For mer finmasket kontroll over lagring basert på StorageClass, bruk:

- **`project-onboarding/storage-csi-cinder-sc-delete-size`** og **`project-onboarding/storage-csi-cinder-sc-retain-size`**: Disse etikettene lar deg angi lagringsgrenser per StorageClass, og gir fleksibilitet i håndteringen av lagringspolicyer og livssyklus.

Denne strukturen gjør det enkelt å tilpasse og administrere ressurskvoter, slik at Kubernetes-miljøene dine er optimalisert både for ytelse og ressursutnyttelse.

Ved å bruke Project Onboarding til å styre ressurskvoter kan du sikre en balansert ressursfordeling og legge til rette for et mer effektivt og rettferdig miljø for alle Kubernetes-arbeidslaster.

## Installere Namespace Configuration Operator og sette opp en servicekonto

Project Onboarding benytter Namespace Configuration Operator, som kan installeres via Operator Lifecycle Manager (OLM) eller som et Helm-diagram. Følgende veiledning fokuserer på installasjon fra `community-operators` CatalogSource, en kilde som er forhåndsinstallert i OKD/OpenShift-miljøer.

### Installere Namespace Configuration Operator

For å forenkle håndteringen av navnerom og relaterte konfigurasjoner i Kubernetes- eller OpenShift-klyngen din er Namespace Configuration Operator en kritisk komponent. Operatøren kan integreres sømløst i miljøet ditt ved hjelp av OLM eller Helm og gir en robust løsning for å automatisere bruk av etiketter og påfølgende konfigurasjon av navnerom basert på disse etikettene.

For installasjoner fra `community-operators` CatalogSource, som er lett tilgjengelig i OKD/OpenShift-klynger, kan du bruke en enkel fremgangsmåte med `oc`, kommandolinjeverktøyet for OpenShift. Denne metoden sikrer at operatøren blir distribuert riktig i klyngen, og muliggjør automatisk håndtering av navneromskonfigurasjoner.

For å installere Namespace Configuration Operator, kjør følgende kommando:```bash
oc apply -k ./namespace-configuration/operator
```
Denne kommandoen starter utrullingsprosessen for operatøren ved å bruke Kubernetes-manifestene som ligger i den angitte katalogen. Det er avgjørende å vente til alle Custom Resource Definitions (CRD-er) har blitt installert vellykket av InstallPlan. Når dette trinnet er fullført, kan du fortsette med å anvende konfigurasjoner som er spesifikke for klyngetypen din.

For eksempel, for å anvende en generell konfigurasjon som gjelder for alle klyngetyper, kan du bruke følgende kommando:```bash
oc apply -k ./namespace-configuration/configuration/all
```
Denne kommandoen anvender konfigurasjonen for `all`-kategorien, som omfatter innstillinger og policyer ment for universell bruk på tvers av klyngene dine.

### Sette opp en servicekonto

Neste steg innebærer å sette opp en servicekonto som skal brukes til å opprette namespaces med de angitte labelene. Denne servicekontoen gir nødvendige tillatelser til å automatisere opprettelse og håndtering av namespaces, og sikrer at Namespace Configuration Operator kan fungere uten manuell inngripen.

For å sette opp servicekontoen, kjør:```bash
oc apply -k ./namespace-configuration/serviceaccount
```
Denne kommandoen tar i bruk Kubernetes-manifestene som er nødvendige for å opprette tjenestekontoen, sammen med eventuelle tilknyttede roller og rollebindinger, slik at kontoen får nødvendige tillatelser til å administrere navneromskonfigurasjoner.

### Hente ut tokenet for tjenestekontoen

For operasjoner som krever autentisering, for eksempel automatiserte skript eller eksterne verktøy som kobler seg til Kubernetes-klyngen din, kan det være nødvendig å hente ut tokenet som er knyttet til tjenestekontoen som ble opprettet i forrige steg.

For å hente ut tokenet og opprette en klar-til-bruk `kubeconfig`-fil, bruk det medfølgende skriptet `create-kubeconfig.sh`:```bash
./namespace-configuration/serviceaccount/create-kubeconfig.sh
```
Dette skriptet genererer en `kubeconfig`-fil konfigurert med tjenestekontoens token, som muliggjør sømløs autentisering for operasjoner som krever tilgang til klyngen.

### Fullføring

Med Namespace Configuration Operator installert og tjenestekontoen satt opp, er miljøet for prosjekt-onboarding nå klart. Denne oppsettet gjør det mulig å automatisere håndteringen av namespaces i klyngen din, strømlinjeforme onboarding-prosessen for nye namespaces og sikre konsekvent anvendelse av konfigurasjoner på tvers av Kubernetes- eller OpenShift-miljøet ditt.

## Administrere prosjekt-onboarding med ArgoCD

For en fleksibel tilnærming til håndtering av namespaces kan du vurdere å bruke Kustomize sammen med ArgoCD. Denne metoden innebærer et dedikert Git-repositorium for namespace-konfigurasjon, styrt enten via en kundeportal eller et automatiseringsverktøy. Dette repositoriet inneholder alle ønskede Kustomize YAML-endringer, som ArgoCD deretter anvender på klyngen din, og gir en balanse mellom manuelle tilpasningsmuligheter og robust revisjonssporing, tilstandsstyring og replay-muligheter.

Vurder å strukturere Git-repositoriet slik at det tillater unike konfigurasjoner per namespace. Denne strukturen støtter komplekse scenarier, for eksempel når et namespace krever spesifikke NetworkPolicy-er utover det som enkelt lar seg oppnå med en NamespaceConfig-tilpasset ressurs. I slike tilfeller kan du lage en dedikert NetworkPolicy-fil og referere til den i namespace-ets `kustomization.yaml`.

Nedenfor er et illustrerende eksempel på hvordan du kan organisere Git-repositoriet:```text
.
└── namespace-configuration
    └── examples
        ├── clustertypeX
        │   ├── businessarea51-labs-utv
        │   │   ├── kustomization.yaml
        │   │   └── namespace.yaml
        │   └── kustomization.yaml
        │
        ├── clustertypeZ
        │   ├── glassproj-appname-acc
        │   │   ├── kustomization.yaml
        │   │   └── namespace.yaml
        │   ├── glassproj-appname-sys
        │   │   ├── kustomization.yaml
        │   │   └── namespace.yaml
        │   ├── glassproj-appname-utv
        │   │   ├── kustomization.yaml
        │   │   └── namespace.yaml
        │   └── kustomization.yaml
        │
        └── kustomization.yaml
```
For å innarbeide endringer, bruk Kustomize sine `create`- eller `edit`-kommandoer med flaggene `--autodetect` og `--recursive`, slik at alle relevante filer tas med. Etter å ha committed og pushet disse endringene, utløs en umiddelbar skanning via ArgoCDs webhook.

Denne strategien muliggjør dynamisk og strømlinjeformet utrulling av navneromskonfigurasjoner på tvers av Kubernetes-miljøene dine, slik at hvert navnerom kan skreddersys til spesifikke behov samtidig som administrasjon og oppdaterbarhet holdes enkel.

## Forsterkede sikkerhetshensyn for navneromsadministrasjon

Project Onboarding gjør det enklere for eksterne kundeportaler eller API-er å opprette og administrere Kubernetes-navnerom ved å abstrahere bort underliggende kompleksitet. Evnen til å administrere selve namespace-objektene i Kubernetes innebærer også at eksterne systemer kan endre navnerom som er kritiske for systemets drift.

For å sikre kritiske, systemeide navnerom, spesielt de som begynner med `kube-` eller `openshift-`, må eksterne grensesnitt ta i bruk strenge beskyttelsestiltak. Hjørnesteinen i en slik strategi er å proaktivt blokkere enhver endring i disse navnerommene, og dermed forhindre uautorisert tilgang og endringer som kan sette sikkerheten i hele klyngen i fare.

Som ytterligere forsterkning introduserer Kubernetes 1.29 en avansert mekanisme for validering av forespørsler i selve Kubernetes API-serveren, der “Validating Admission Policy” er merket som en betafunksjon. Denne policyen benytter Common Expression Language (CEL) til å uttrykke valideringsregler, noe som muliggjør høyt konfigurerbare retningslinjer som kan skreddersys og parameteriseres etter behovene til klyngeadministratorer. Med Validating Admission Policy kan spesifikke CEL-skript utformes for å blankt avslå alle endringer mot systemeide navnerom, og dermed gi et robust beskyttelseslag.

I tillegg finnes det flere verktøy som spesialiserer seg på å validere Kubernetes API-forespørsler, inkludert K-Rail, Kyverno, Kubewarden og OPA/Gatekeeper. Disse verktøyene tilbyr fleksible og kraftige måter å håndheve sikkerhetspolicyer og validere forespørsler på, slik at systemeide navnerom forblir beskyttet mot uautoriserte endringer.

## Utvidelse til å håndtere mer enn bare namespace-objektet

Administreringen av Kubernetes-miljøet ditt kan forenkles betydelig ved å endre etiketter (labels) på et namespace-objekt, noe som utløser endringer andre steder i samme navnerom. Denne funksjonaliteten fjerner kompleksiteten for eksterne kundeportaler, mens Namespace Configuration Operator påtar seg ansvaret for å opprettholde riktig tilstand for ønsket funksjonalitet.

Etiketter som `project-onboarding/compute-limits-cpu` setter grenser for CPU, men det finnes mange andre innstillinger for ressurskvoter, som requests.cpu, requests.memory, PersistentVolumeClaims og alle varianter av objekttellinger. Hvis du vil gjøre alt dette konfigurerbart, må du opprette NamespaceConfig-tilpassede ressurser (CR-er) for hver innstilling du ønsker å eksponere. Over tid kan dette bli tungvint, og du må avgjøre når det er på tide å angripe problemet på en annen måte. Ett alternativ er å pakke ressurskvoter i T-skjortestørrelser som inneholder flere begrensninger for ressurskvoter, i stedet for å spesifisere individuelle innstillinger. For eksempel kan du introdusere `project-onboarding/compute-t-shirt-size` og tillate størrelser som `small`, `medium`, `large`, osv. En annen tilnærming er å støtte direkte administrasjon av ressurskvoter i den eksterne kundeportalen når det er behov for mer kontroll over ressurskvoter. Dette betyr å fjerne alle etiketter knyttet til ressurskvoter fra namespace-objektet og administrere ressurskvoter direkte med eksterne verktøy.

Det samme prinsippet gjelder for typer som nettverkspolicyer. Når kompleksiteten overstiger et håndterbart nivå, bør du gå bort fra etiketter på namespace-objektet og i stedet innføre administrasjon av disse elementene gjennom eksterne verktøy. Denne overgangen vil bidra til å strømlinjeforme administrasjonsprosessen og sikre at Kubernetes-miljøet ditt forblir effektivt og skalerbart.

## Avslutning og invitasjon til samarbeid

I Kubernetes- og OpenShift-verdenen kan kompleksiteten ved navneromsadministrasjon i multitenant-miljøer være overveldende. Project Onboarding er laget med mål om å forenkle denne prosessen og tilbyr en nytenkende tilnærming til administrasjon av navnerom som balanserer fleksibilitet med behovet for å skjule underliggende kompleksitet. Denne veiledningen har tatt deg gjennom det grunnleggende i Project Onboarding, fra strømlinjeformede navneromskonfigurasjoner til forsterkede sikkerhetshensyn, alt med mål om å forbedre effektiviteten og sikkerheten i Kubernetes-miljøene dine.

### Vi ønsker bidragene dine velkommen

Project Onboarding er mer enn et verktøy; det er et fellesskapsprosjekt som lever av innsikt, bidrag og tilbakemeldinger fra deg. Vi inviterer deg varmt til å bidra:

{{< icon-block-horisontal icon="fa-solid fa-code-pull-request" text="Pull requests" description="Enten det gjelder å legge til nye funksjoner, forbedre eksisterende eller fikse feil, er kodebidragene dine uvurderlige. Sammen kan vi videreutvikle Project Onboarding slik at det enda bedre dekker behovene i det voksende fellesskapet vårt." color="#195F8C" >}}
{{< icon-block-horisontal icon="fa-solid fa-rectangle-history-circle-user" text="Suksesshistorier" description="Har du integrert Project Onboarding i arbeidsflyten din med gode resultater? Vi vil gjerne høre om erfaringene dine, utfordringene du har overvunnet, og fordelene du har oppnådd. Historiene dine kan inspirere og veilede nye brukere!" color="#195F8C" >}}

### Bli med

Å prøve Project Onboarding er bare begynnelsen. Dykk ned i konfigurasjonseksemplene, eksperimenter med etikettene, og se selv hvordan det kan transformere praksisen din for navneromsadministrasjon. Husk at perspektivene og erfaringene dine er nøkkelen til å forme fremtiden til Project Onboarding.

Vi gleder oss til å legge ut på denne reisen sammen med deg og bygge et levende fellesskap der innovasjon leder an innen administrasjon av Kubernetes-navnerom. La oss skape noe stort sammen.

**Bli med, bidra, og la oss gjøre Kubernetes-namespaceadministrasjon enklere – sammen.**