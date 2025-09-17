---
ai: true
title: "Onboarding-vejledning til Kubernetes-projektet"
date: "2024-04-08"
intro: "Dette værktøj er skræddersyet til IT-arkitekter, DevOps-ingeniører og tekniske teams, der ønsker at integrere virksomhedsspecifikke arbejdsgange i Kubernetes og dermed fremme et problemfrit og effektivt styringssystem."
draft: false
section: "Teknisk opdatering"
author: "Niklas Hagman"
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "da"
TOC: "I denne vejledning"
sidebarlinkname: "GitHub-repository"
sidebarlinkurl: "https://github.com/safespring-community/utilities/tree/main/okd/project-onboarding"
sidebarlinkicon: "fa-arrow-up-right-from-square"
aliases:
  - /blogg/2024/2024-04-container-projekt-onboarding/
---
{{< ingress >}}
Velkommen til Project Onboarding – en transformativ tilgang, der forenkler håndteringen af namespaces i Kubernetes for multi-tenant-miljøer.
{{< /ingress >}}

Dette værktøj er udviklet til IT-arkitekter, DevOps-ingeniører og tekniske teams, der ønsker at integrere virksomhedsspecifikke arbejdsgange i Kubernetes og skabe et gnidningsfrit, effektivt system til håndtering af namespaces. Project Onboarding befinder sig i krydsfeltet mellem innovation og enkelhed og tilbyder en robust løsning på de kompleksiteter, man ofte møder i forbindelse med administration af Kubernetes-namespaces.

{{% note "GitHub-repositorium" %}}
Denne vejledning ledsages af et komplet sæt kodeeksempler, der findes i vores GitHub-repositorium. For nem adgang til alle scripts, konfigurationer og skabeloner, der bruges i denne vejledning, besøg venligst [safespring-community/utilities](https://github.com/safespring-community/utilities/tree/main/okd/project-onboarding) på GitHub. Det sikrer, at du har alt, hvad du behøver for at arbejde med Project Onboarding i dit miljø.
{{% /note %}}

## Hvorfor Project Onboarding?

At administrere Kubernetes-objekter og namespaces kan være uoverskueligt, især i multi-tenant-scenarier, hvor præcision og sikkerhed er altafgørende. Project Onboarding introducerer en elegant løsning, der udnytter kraften i automatisering til at forenkle onboarding-processen for nye namespaces, så dit team kan fokusere på at levere værdi i stedet for at navigere i kompleks Kubernetes-konfiguration.

Forestil dig en verden, hvor håndtering af namespaces er lige så enkel som at tilføje et par labels. Med Project Onboarding bliver det til virkelighed. Ved at definere dine behov med simple labels igangsætter du en række automatiserede processer, der konfigurerer namespaces præcist efter dine krav – fra resource quotas og network policies til role bindings – alt sammen orkestreret uden manuel indgriben.```yaml
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
Dette YAML-udsnit viser, hvordan et nyt namespace `glassproj-appname-acc` kan oprettes med omfattende konfigurationer ved hjælp af labels. Det er et bevis på, hvordan Project Onboarding giver teams mulighed for ubesværet at definere komplekse indstillinger, så fokus kan være på udvikling og udrulning af applikationer.

### Nøglefunktioner

- Forenklet namespace-administration: Strømlin oprettelse og vedligeholdelse af Kubernetes-namespaces ved hjælp af labels.
- Automatisering først: Udnyt Operatoren til namespace-konfiguration til at automatisere håndhævelsen af policies, roller og kvoter baseret på angivne labels.
- Multitenancy gjort enkel: Sikr sikre og isolerede multi-tenant-miljøer med tilpasselige netværkspolitikker og ressourcekvoter.
- Kompatibilitet med OpenShift og Kubernetes: Designet til fleksibilitet integrerer Project Onboarding problemfrit med både Kubernetes- og OpenShift-miljøer, understøttet af Helm og Kustomize for en gnidningsfri opsætning.

Project Onboarding er mere end blot et værktøj; det er et nyt perspektiv på Kubernetes-administration, der inviterer dig til at gentænke, hvordan namespaces håndteres i din infrastruktur. Det handler om at sætte teams i stand til mere, styrke sikkerheden og fremme effektiviteten gennem intelligent automatisering.

## Namespace-konfigurationer

Denne automatisering udnytter [Operator til namespace-konfiguration](https://github.com/redhat-cop/namespace-configuration-operator) fra Red Hats Communities of Practice, et fremragende værktøj til at spore labels i namespaces og i OpenShifts grupper eller brugere, hvilket gør det til en hjørnesten i vores Project Onboarding.

Her er et glimt af, hvordan disse ressourcedefinitioner til Operatoren for namespace-konfiguration er organiseret i Project Onboardings struktur:```text
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
Med Project Onboarding skal du blot oprette et nyt namespace med labels, der definerer alt. Nedenfor er et komplet eksempel på namespace [glassproj-appname-acc (GitHub)](https://github.com/safespring-community/utilities/blob/main/okd/project-onboarding/namespace-configuration/examples/clustertypeZ/glassproj-appname-acc/namespace.yaml) med alle de labels, der i øjeblikket er mulige.```yaml
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
### Netværkspolitikker

Implementering af passende netværkspolitikker er afgørende for at opretholde sikkerhed og isolation i en Kubernetes-klynge, især når der hostes flere kunder eller teams. Lad os se, hvordan Project Onboarding håndterer netværkspolitikker.

#### Netværkspolitikker til multitenancy

- **`project-onboarding/networkpolicies-multitenancy`**

I Kubernetes-klynger med flere lejere er det almindelig praksis at begrænse netværkstrafikken mellem namespaces. Medmindre labelen `project-onboarding/networkpolicies-multitenancy: false` er sat, håndhæves disse netværkspolitikker automatisk på namespace’et. Det sikrer, at netværkstrafikken mellem forskellige kunder eller teams i samme klynge altid routes korrekt og opretholder strenge standarder for sikkerhed og isolation.

#### Team-specifikke netværkspolitikker

- **`project-onboarding/networkpolicies-team`**

For at muliggøre kommunikation mellem teams på tværs af namespaces bruges labelen `project-onboarding/networkpolicies-team: teamname`, hvor `teamname` erstattes med det faktiske teamnavn (f.eks. `glassproj`). Det muliggør gnidningsfri samarbejde mellem team-namespaces samtidig med, at nødvendig sikkerhed og isolation i klyngen opretholdes.

### Rollebindinger

At knytte namespaces til brugergrupper er essentielt for at styre adgang og sikre, at teams effektivt kan bruge deres tildelte namespaces. På grund af begrænsninger i label-mulighederne har vi udarbejdet et enkelt labelsystem til dette formål.

- **`project-onboarding/team`**

Brug labelen `project-onboarding/team: groupname` for at give admin-rettigheder til en gruppe i namespace’et. Denne label gør det nemt at tildele et team de adgangsrettigheder, de har brug for i deres namespace.

For mere granulær kontrol over tilladelser findes følgende labels:

- `project-onboarding/team1-name`
- `project-onboarding/team1-permissions`
- `project-onboarding/team2-name`
- `project-onboarding/team2-permissions`
- `project-onboarding/team3-name`
- `project-onboarding/team3-permissions`

Disse labels gør det muligt at knytte en gruppe til specifikke tilladelser i et namespace. Selvom tilladelserne indledningsvis er begrænset til admin, edit og view, kan de tilpasses i den brugerdefinerede ressource `namespaceConfig` for at imødekomme flere variationer efter behov.

### Ressourcekvoter

Ressourcekvoter er en kritisk del af ressourcehåndteringen i dine Kubernetes-namespaces og sikrer, at hvert team eller projekt kun forbruger sin rimelige andel af ressourcerne, så andre ikke udsultes. Project Onboarding forenkler processen og gør det muligt at definere ressourcekvoter direkte via namespace-labels, så det er enkelt at styre CPU-, hukommelses- og lagergrænser på namespace-niveau.

#### Definering af CPU- og hukommelseskvoter

For effektiv styring af compute-ressourcer tilbyder Project Onboarding følgende labels:

- **`project-onboarding/compute-limits-cpu`**: Angiver den samlede mængde CPU-ressourcer, som alle pods i namespace’et må forbruge. Sættes den f.eks. til `"10"`, kan pods i namespace’et tilsammen bruge op til 10 CPU-enheder.
- **`project-onboarding/compute-limits-memory`**: Bestemmer den samlede mængde hukommelse (RAM), som alle pods i namespace’et må forbruge. Hvis denne label sættes til `"8Gi"`, tillades op til 8 GiB hukommelsesforbrug.

Disse kvoter sikrer, at dine applikationer kører effektivt uden at monopolisere klyngeressourcer, hvilket fremmer fair ressourcefordeling på tværs af alle namespaces.

#### Håndtering af lagerkvoter

Lagerstyring er endnu et vigtigt aspekt, som Project Onboarding dækker. Følgende labels hjælper med at definere lagerkvoter:

- **`project-onboarding/storage-size`**: Angiver den samlede mængde persistent lager, der er tilgængelig for namespace’et. F.eks. allokerer `"50Gi"` op til 50 GiB persistent lager på tværs af alle pods i namespace’et.

For mere granulær styring af lager baseret på StorageClass kan du bruge:

- **`project-onboarding/storage-csi-cinder-sc-delete-size`** og **`project-onboarding/storage-csi-cinder-sc-retain-size`**: Disse labels muliggør angivelse af lagergrænser pr. StorageClass og giver fleksibilitet i håndteringen af lagerpolitikker og livscyklus.

Denne struktur gør det let at tilpasse og administrere ressourcekvoter, så dine Kubernetes-miljøer optimeres både for ydeevne og ressourceudnyttelse.

Ved at udnytte Project Onboarding til håndtering af ressourcekvoter kan du sikre en balanceret fordeling af ressourcer og skabe et mere effektivt og fair miljø for alle dine Kubernetes-workloads.

## Installation af Namespace Configuration Operator og opsætning af en servicekonto

Project Onboarding udnytter Namespace Configuration Operator, som kan installeres via Operator Lifecycle Manager (OLM) eller som et Helm chart. Den følgende vejledning fokuserer på installation fra `community-operators` CatalogSource, en kilde der er forudinstalleret i OKD/OpenShift-miljøer.

### Installation af Namespace Configuration Operator

For at lette administrationen af namespaces og relaterede konfigurationer i din Kubernetes- eller OpenShift-klynge er Namespace Configuration Operator en kritisk komponent. Operatoren kan integreres sømløst i dit miljø med OLM eller Helm og tilbyder en robust løsning til at automatisere anvendelsen af labels og efterfølgende konfigurere namespaces baseret på disse labels.

Ved installation fra `community-operators` CatalogSource, som er tilgængelig i OKD/OpenShift-klynger, kan du bruge en enkel fremgangsmåde med `oc`, OpenShift CLI-værktøjet. Denne metode sikrer, at operatoren udrulles korrekt i din klynge og muliggør automatisk håndtering af namespace-konfigurationer.

For at installere Namespace Configuration Operator skal du køre følgende kommando:```bash
oc apply -k ./namespace-configuration/operator
```
Denne kommando igangsætter udrulningsprocessen for operatoren ved at anvende de Kubernetes-manifester, der ligger i den angivne mappe. Det er vigtigt at vente, indtil alle Custom Resource Definitions (CRD'er) er blevet installeret med succes af InstallPlan. Når dette trin er fuldført, kan du fortsætte med at anvende konfigurationer, der er specifikke for din klyngetype.

For eksempel, for at anvende en generel konfiguration, der gælder for alle klyngetyper, kan du bruge følgende kommando:```bash
oc apply -k ./namespace-configuration/configuration/all
```
Denne kommando anvender konfigurationen for kategorien `all`, som omfatter indstillinger og politikker beregnet til universel anvendelse på tværs af dine klynger.

### Opsætning af en servicekonto

Det næste trin indebærer at opsætte en servicekonto, der vil blive brugt til at oprette navnerum med de angivne etiketter. Denne servicekonto giver de nødvendige tilladelser til at automatisere oprettelse og administration af navnerum, så Namespace Configuration Operator kan fungere uden manuel indgriben.

For at opsætte servicekontoen skal du køre:```bash
oc apply -k ./namespace-configuration/serviceaccount
```
Denne kommando anvender de Kubernetes-manifester, der er nødvendige for at oprette servicekontoen, sammen med eventuelle tilknyttede roller og rollebindinger, så kontoen har de nødvendige tilladelser til at administrere konfigurationer for navneområder.

### Udtrække servicekontoens token

Ved operationer, der kræver godkendelse, såsom automatiserede scripts eller eksterne værktøjer, der interagerer med din Kubernetes-klynge, kan du få brug for at udtrække det token, der er knyttet til den servicekonto, der blev oprettet i det foregående trin.

For at udtrække tokenet og oprette en brugsklar `kubeconfig`-fil skal du bruge det medfølgende `create-kubeconfig.sh`-script:```bash
./namespace-configuration/serviceaccount/create-kubeconfig.sh
```
Dette script genererer en `kubeconfig`-fil konfigureret med servicekontoens token, hvilket muliggør problemfri autentificering til operationer, der kræver klyngeadgang.

### Afslutning

Med Namespace Configuration Operator installeret og servicekontoen sat op er dit Project Onboarding-miljø nu klar. Denne opsætning gør det muligt at automatisere styringen af namespaces i din klynge, hvilket strømliner onboardingprocessen for nye namespaces og sikrer ensartet anvendelse af konfigurationer på tværs af dit Kubernetes- eller OpenShift-miljø.

## Håndtering af Project Onboarding med ArgoCD

For en fleksibel tilgang til håndtering af namespaces kan du overveje at udnytte Kustomize sammen med ArgoCD. Denne metode indebærer brug af et dedikeret git-repositorium til namespace-konfiguration, administreret enten via en kundeportal eller et automatiseringsværktøj. Dette repositorium indeholder alle ønskede Kustomize YAML-kodeændringer, som ArgoCD derefter anvender på din klynge, hvilket giver en balance mellem manuelle tilpasningsmuligheder og robuste funktioner til revision, tilstandsstyring og mulighed for at genskabe ændringer.

Overvej at strukturere dit git-repositorium, så det tillader unikke konfigurationer pr. namespace. Denne struktur understøtter komplekse scenarier, f.eks. når et namespace kræver specifikke netværkspolitikker ud over, hvad der let kan opnås med en NamespaceConfig Custom Resource. I sådanne tilfælde kan du udarbejde en dedikeret netværkspolitik-fil og referere til den i namespace'ets `kustomization.yaml`.

Nedenfor er et illustrativt eksempel på, hvordan du kan organisere dit git-repositorium:```text
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
For at indarbejde ændringer skal du bruge Kustomize's `create`- eller `edit`-kommandoer med flagene `--autodetect` og `--recursive`, så alle relevante filer bliver inkluderet. Efter at have committet og pushet disse ændringer, udløs en øjeblikkelig scanning via ArgoCDs webhook.

Denne strategi muliggør dynamisk og strømlinet udrulning af namespace-konfigurationer på tværs af dine Kubernetes-miljøer, så hvert namespace kan tilpasses specifikke krav, samtidig med at håndteringen og muligheden for opdatering holdes enkel.

## Udvidede sikkerhedshensyn for namespace-håndtering

Project Onboarding øger hvor let eksterne kundeportaler eller API’er kan oprette og administrere Kubernetes-namespaces og abstraherer den underliggende kompleksitet. Denne mulighed for direkte at administrere namespace-objekter i Kubernetes indebærer også, at eksterne systemer kan ændre namespaces, der er centrale for systemets drift.

At sikre kritiske, systemejede namespaces, især dem med præfikset `kube-` eller `openshift-`, kræver, at eksterne grænseflader anvender strenge beskyttelsesstrategier. Hjørnestenen i en sådan strategi er proaktivt at blokere enhver ændring af disse namespaces for at forhindre uautoriseret adgang og ændringer, der kan bringe hele klyngens sikkerhed i fare.

For yderligere at styrke denne sikkerhedsprofil introducerer Kubernetes 1.29 en avanceret mekanisme til in-process validering af forespørgsler til Kubernetes API-serveren og markerer “Validating Admission Policy” som en beta-funktion. Denne politik udnytter Common Expression Language (CEL) til at formulere valideringsregler, hvilket muliggør højtkonfigurerbare politikker, der kan skræddersys og parameteriseres efter klyngeadministratorers behov. Med fremkomsten af Validating Admission Policy kan specifikke CEL-scripts udformes til kategorisk at afvise enhver ændring af systemejede namespaces og dermed give et robust beskyttelseslag.

Derudover findes der flere værktøjer, der specialiserer sig i at validere Kubernetes API-forespørgsler, herunder K-Rail, Kyverno, Kubewarden og OPA/Gatekeeper. Disse værktøjer tilbyder alsidige og effektive måder at håndhæve sikkerhedspolitikker og validere forespørgsler på, hvilket yderligere sikrer, at systemejede namespaces forbliver beskyttet mod uautoriserede ændringer.

## Udvidelse til at håndtere mere end blot namespace-objektet

Håndteringen af dit Kubernetes-miljø kan forenkles betydeligt ved at ændre labels på et namespace-objekt, som udløser ændringer andre steder i det pågældende namespace. Denne funktionalitet fjerner kompleksiteten for eksterne kundeportaler, idet Namespace Configuration Operator påtager sig ansvaret for at opretholde den korrekte tilstand for den ønskede funktionalitet.

Labels som `project-onboarding/compute-limits-cpu` angiver grænser for CPU, men der findes mange andre ressourcekvoteindstillinger såsom requests.cpu, requests.memory, persistent volume claims og alle varianter af objektantal. Hvis du vil gøre alt dette konfigurerbart, skal du oprette NamespaceConfig custom resources (CR’er) for hver indstilling, du ønsker at eksponere. Med tiden kan dette blive besværligt, og du må afgøre, hvornår det er tid til at gribe det anderledes an. En mulighed er at pakke ressourcekvoter i T-shirt-størrelser, der indeholder flere ressourcekvotebegrænsninger i stedet for at angive individuelle indstillinger. Introducér for eksempel `project-onboarding/compute-t-shirt-size` og lad den angive størrelser som `small`, `medium`, `large` osv. En anden tilgang er at understøtte direkte håndtering af ressourcekvoter i den eksterne kundeportal, når der er behov for mere kontrol over ressourcekvoter. Det betyder, at alle labels relateret til ressourcekvoter fjernes fra namespace-objektet, og at ressourcekvoter administreres direkte med eksterne værktøjer.

Det samme princip gælder for typer som network policies. Når kompleksiteten overstiger et håndterbart niveau, skal du gå væk fra labels på selve namespace-objektet og i stedet implementere styring af disse elementer via eksterne værktøjer. Dette skifte vil hjælpe med at strømline administrationsprocessen og sikre, at dit Kubernetes-miljø forbliver effektivt og skalerbart.

## Konklusion og invitation til samarbejde

Inden for Kubernetes og OpenShift kan kompleksiteten af namespace-håndtering i multitenant-miljøer virke overvældende. Project Onboarding er designet med visionen om at forenkle denne proces og tilbyder en innovativ tilgang til håndtering af namespaces, der balancerer fleksibilitet med nødvendigheden af at skjule underliggende kompleksiteter. Denne guide har ført dig gennem fundamentet i Project Onboarding – fra strømlinede namespace-konfigurationer til udvidede sikkerhedshensyn – alt sammen med det formål at forbedre effektiviteten og sikkerheden i dine Kubernetes-miljøer.

### Vi byder dine bidrag velkommen

Project Onboarding er mere end et værktøj; det er et fællesskabsprojekt, der lever af dine indsigter, bidrag og feedback. Vi inviterer dig varmt til at bidrage:

{{< icon-block-horisontal icon="fa-solid fa-code-pull-request" text="Pull requests" description="Uanset om det er at tilføje nye funktioner, forbedre eksisterende eller rette fejl, er dine kodebidrag uvurderlige. Sammen kan vi forbedre Project Onboarding, så det endnu bedre opfylder behovene i vores voksende community." color="#195F8C" >}}
{{< icon-block-horisontal icon="fa-solid fa-rectangle-history-circle-user" text="Succeshistorier" description="Har du med succes integreret Project Onboarding i dit workflow? Vi vil meget gerne høre om dine erfaringer, udfordringer der blev overvundet, og de fordele du har opnået. Dine historier kan inspirere og vejlede nye brugere!" color="#195F8C" >}}

### Bliv involveret

At afprøve Project Onboarding er kun begyndelsen. Dyk ned i konfigurationseksemplerne, eksperimentér med labels, og se på første hånd, hvordan det kan forandre dine praksisser for namespace-håndtering. Husk undervejs, at dine perspektiver og erfaringer er nøglen til at forme fremtiden for Project Onboarding.

Vi ser frem til at tage på denne rejse sammen med dig og skabe et levende fællesskab, hvor innovation går forrest i håndteringen af Kubernetes-namespaces. Lad os bygge noget stort sammen.

**Slut dig til os, bidrag, og lad os gøre håndteringen af Kubernetes-namespaces enklere – sammen.**