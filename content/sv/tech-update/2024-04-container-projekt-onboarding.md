---
ai: true
title: "Introduktionsguide till Kubernetes-projektet"
date: "2024-04-08"
intro: "Det här verktyget är utformat för IT-arkitekter, DevOps-ingenjörer och tekniska team som vill integrera företagsspecifika arbetsflöden i Kubernetes och därigenom skapa ett sömlöst och effektivt hanteringssystem."
draft: false
section: "Teknikuppdatering"
author: "Niklas Hagman"
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "sv"
TOC: "I den här guiden"
sidebarlinkname: "GitHub-repo"
sidebarlinkurl: "https://github.com/safespring-community/utilities/tree/main/okd/project-onboarding"
sidebarlinkicon: "fa-arrow-up-right-from-square"
aliases:
  - /blogg/2024/2024-04-container-projekt-onboarding/
---
{{< ingress >}}
Välkommen till Project Onboarding - ett transformativt angreppssätt för att förenkla namespace-hantering i Kubernetes för multi-tenant-miljöer.
{{< /ingress >}}

Detta verktyg är framtaget för IT-arkitekter, DevOps-ingenjörer och tekniska team som vill integrera företagsspecifika arbetsflöden i Kubernetes och därigenom skapa ett sömlöst, effektivt system för namespace-hantering. Project Onboarding befinner sig i skärningspunkten mellan innovation och enkelhet och erbjuder en robust lösning på de komplexiteter som ofta uppstår i hanteringen av Kubernetes-namespaces.

{{% note "GitHub-repo" %}}
Den här guiden åtföljs av en komplett uppsättning kodexempel som finns i vårt GitHub-repo. För enkel åtkomst till alla skript, konfigurationer och mallar som används i hela den här guiden, besök [safespring-community/utilities](https://github.com/safespring-community/utilities/tree/main/okd/project-onboarding) på GitHub. Detta säkerställer att du har allt du behöver för att framgångsrikt arbeta med Project Onboarding i din miljö.
{{% /note %}}

## Varför Project Onboarding?

Att hantera Kubernetes-objekt och namespaces kan vara avskräckande, särskilt i multi-tenant-scenarier där precision och säkerhet är avgörande. Project Onboarding introducerar en elegant lösning som utnyttjar kraften i automatisering för att förenkla onboardingprocessen för nya namespaces, så att ditt team kan fokusera på att leverera värde i stället för att navigera bland komplexa Kubernetes-konfigurationer.

Föreställ dig en värld där namespace-hantering är lika enkel som att sätta några etiketter. Med Project Onboarding blir detta verklighet. Genom att definiera dina krav med enkla etiketter startar du en rad automatiserade processer som konfigurerar namespaces efter dina exakta behov, från resurskvoter och nätverkspolicys till rollbindningar - allt orkestrerat utan manuell handpåläggning.```yaml
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
Detta YAML-exempel visar hur ett nytt namespace `glassproj-appname-acc` kan skapas med heltäckande konfigurationer med hjälp av etiketter. Det visar hur Project Onboarding ger team möjlighet att definiera komplexa inställningar utan krångel, med fokus på applikationsutveckling och utrullning.

### Nyckelfunktioner

- Förenklad hantering av namespaces: Effektivisera skapande och underhåll av Kubernetes-namespaces med hjälp av etiketter.
- Automation i första hand: Utnyttja Namespace Configuration Operator för att automatisera tillämpningen av policys, roller och kvoter baserat på angivna etiketter.
- Multi-tenancy gjort enkelt: Säkerställ säkra och isolerade multi-tenant-miljöer med anpassningsbara nätverkspolicys och resurskvoter.
- Kompatibilitet med OpenShift och Kubernetes: Utformat för flexibilitet; Project Onboarding integreras sömlöst med både Kubernetes- och OpenShift-miljöer, med stöd av Helm och Kustomize för en smidig installation.

Project Onboarding är mer än bara ett verktyg; det är ett nytt perspektiv på Kubernetes-hantering som uppmuntrar dig att ompröva hur namespaces hanteras i din infrastruktur. Det handlar om att möjliggöra för team, stärka säkerheten och främja effektivitet genom intelligent automatisering.

## Namespace-konfigurationer

Denna automatisering utnyttjar [Namespace Configuration Operator](https://github.com/redhat-cop/namespace-configuration-operator) från Red Hats Communities of Practice, ett utmärkt verktyg för att spåra etiketter i namespaces och i OpenShifts grupper eller användare, vilket gör det till en hörnsten i vår Project Onboarding.

Här är en inblick i hur dessa resursdefinitioner för Namespace Configuration Operator är organiserade inom Project Onboarding-strukturen:```text
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
Med Project Onboarding behöver du bara skapa ett nytt namespace med etiketter som definierar allt. Nedan finns ett komplett exempel för namespace [glassproj-appname-acc (GitHub)](https://github.com/safespring-community/utilities/blob/main/okd/project-onboarding/namespace-configuration/examples/clustertypeZ/glassproj-appname-acc/namespace.yaml) med alla etiketter som för närvarande är möjliga.```yaml
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
### Nätverkspolicyer

Att implementera lämpliga nätverkspolicyer är avgörande för att upprätthålla säkerhet och isolering i ett Kubernetes-kluster, särskilt när du hostar flera kunder eller team. Låt oss se hur Project Onboarding hanterar nätverkspolicyer.

#### Nätverkspolicyer för multitenancy

- **`project-onboarding/networkpolicies-multitenancy`**

I Kubernetes-kluster med flera tenants är det vanligt att begränsa nätverkstrafiken mellan namnrymder. Om inte etiketten `project-onboarding/networkpolicies-multitenancy: false` är applicerad kommer dessa nätverkspolicyer att verkställas automatiskt i namnrymden. Detta säkerställer att nätverkstrafik mellan olika kunder eller team inom samma kluster alltid routas på ett korrekt sätt, vilket upprätthåller strikta säkerhets- och isoleringsstandarder.

#### Teamspecifika nätverkspolicyer

- **`project-onboarding/networkpolicies-team`**

För att möjliggöra kommunikation mellan team över olika namnrymder, använd etiketten `project-onboarding/networkpolicies-team: teamname` och ersätt `teamname` med det faktiska teamnamnet (t.ex. `glassproj`). Detta ger smidigt samarbete mellan teamens namnrymder samtidigt som nödvändig säkerhet och isolering i klustret upprätthålls.

### Rollbindningar

Att koppla namnrymder till användargrupper är viktigt för att hantera åtkomst och säkerställa att team effektivt kan använda sina tilldelade namnrymder. På grund av begränsningar i etikettfunktionalitet har vi tagit fram ett enkelt etiketteringssystem för detta ändamål.

- **`project-onboarding/team`**

Använd etiketten `project-onboarding/team: groupname` för att ge administratörsrättigheter till en grupp i namnrymden. Denna etikett förenklar processen att ge ett team de åtkomsträttigheter de behöver för sin namnrymd.

För mer finmaskig kontroll över behörigheter finns följande etiketter:

- `project-onboarding/team1-name`
- `project-onboarding/team1-permissions`
- `project-onboarding/team2-name`
- `project-onboarding/team2-permissions`
- `project-onboarding/team3-name`
- `project-onboarding/team3-permissions`

Dessa etiketter låter dig koppla en grupp till specifika behörigheter i en namnrymd. Även om behörigheterna initialt är begränsade till admin, edit och view kan de anpassas i den anpassade resursen `namespaceConfig` för att rymma fler varianter vid behov.

### Resurskvoter

Resurskvoter är en kritisk del av resursstyrning i dina Kubernetes-namnrymder. De säkerställer att varje team eller projekt bara förbrukar sin rättvisa andel, vilket förhindrar resursbrist för andra. Project Onboarding förenklar processen genom att låta dig definiera resurskvoter direkt via namnrymdsetiketter, vilket gör det enkelt att hantera CPU-, minnes- och lagringsbegränsningar på namnrymdsnivå.

#### Definiera CPU- och minneskvoter

För att effektivt hantera beräkningsresurser erbjuder Project Onboarding följande etiketter:

- **`project-onboarding/compute-limits-cpu`**: Anger den totala mängden CPU-resurser som alla poddar i namnrymden får förbruka. Om du till exempel sätter detta till `"10"` får poddar i namnrymden använda upp till 10 CPU-enheter.
- **`project-onboarding/compute-limits-memory`**: Bestämmer den totala mängden minne (RAM) som alla poddar i namnrymden får förbruka. Om denna etikett sätts till `"8Gi"` tillåts upp till 8 GiB minnesanvändning.

Dessa kvoter säkerställer att dina applikationer körs effektivt utan att monopolisera klusterresurser och underlättar en rättvis resursfördelning mellan alla namnrymder.

#### Hantera lagringskvoter

Lagringshantering är en annan viktig del som täcks av Project Onboarding. Följande etiketter hjälper dig att definiera lagringskvoter:

- **`project-onboarding/storage-size`**: Anger den totala mängden beständig lagring som är tillgänglig för namnrymden. Till exempel allokerar `"50Gi"` upp till 50 GiB beständig lagring fördelat över alla poddar i namnrymden.

För mer detaljerad kontroll av lagring baserat på StorageClass, använd:

- **`project-onboarding/storage-csi-cinder-sc-delete-size`** och **`project-onboarding/storage-csi-cinder-sc-retain-size`**: Dessa etiketter låter dig ange lagringsgränser per StorageClass och ger flexibilitet i hanteringen av lagringspolicyer och livscykel.

Denna struktur gör det enkelt att anpassa och hantera resurskvoter och säkerställer att dina Kubernetes-miljöer är optimerade för både prestanda och resursutnyttjande.

Genom att utnyttja Project Onboarding för resurskvotshantering kan du säkerställa en balanserad fördelning av resurser och främja en mer effektiv och rättvis miljö för alla dina Kubernetes-arbetslaster.

## Installera Namespace Configuration Operator och ställa in ett tjänstkonto

Project Onboarding använder Namespace Configuration Operator, som kan installeras via Operator Lifecycle Manager (OLM) eller som ett Helm chart. Följande guide fokuserar på installation från `community-operators` CatalogSource, en källa som är förinstallerad i OKD/OpenShift-miljöer.

### Installera Namespace Configuration Operator

För att underlätta hanteringen av namnrymder och relaterade konfigurationer i ditt Kubernetes- eller OpenShift-kluster är Namespace Configuration Operator en kritisk komponent. Denna operator kan sömlöst integreras i din miljö med OLM eller Helm och erbjuder en robust lösning för att automatisera tillämpningen av etiketter och den efterföljande konfigurationen av namnrymder baserat på dessa etiketter.

För installationer från `community-operators` CatalogSource, som finns tillgänglig i OKD/OpenShift-kluster, kan du använda en enkel metod med `oc`, OpenShift CLI-verktyget. Denna metod säkerställer att operatorn distribueras korrekt i ditt kluster och möjliggör automatisk hantering av namnrymdskonfigurationer.

För att installera Namespace Configuration Operator, kör följande kommando:```bash
oc apply -k ./namespace-configuration/operator
```
Detta kommando initierar driftsättningsprocessen för operatören genom att tillämpa de Kubernetes-manifest som finns i den angivna katalogen. Det är viktigt att vänta tills alla anpassade resursdefinitioner (CRD:er) har installerats korrekt av InstallPlan. När detta steg är slutfört kan du gå vidare och tillämpa konfigurationer som är specifika för din klustertyp.

Till exempel, för att tillämpa en allmän konfiguration som gäller för alla klustertyper kan du använda följande kommando:```bash
oc apply -k ./namespace-configuration/configuration/all
```
Detta kommando tillämpar konfigurationen för kategorin `all` och omfattar inställningar och policyer som är avsedda att gälla över alla dina kluster.

### Konfigurera ett servicekonto

Nästa steg är att konfigurera ett servicekonto som kommer att användas för att skapa namnrymder med de angivna etiketterna. Detta servicekonto ger de nödvändiga behörigheterna för att automatisera skapande och hantering av namnrymder, vilket säkerställer att Namespace Configuration Operator kan fungera utan manuell inblandning.

För att konfigurera servicekontot, kör:```bash
oc apply -k ./namespace-configuration/serviceaccount
```
Detta kommando tillämpar de nödvändiga Kubernetes-manifesten för att skapa servicekontot, tillsammans med eventuella tillhörande roller och rollbindningar, så att kontot har lämpliga behörigheter för att hantera namnrymdskonfigurationer.

### Extrahera servicekontots token

För åtgärder som kräver autentisering, såsom automatiserade skript eller externa verktyg som kommunicerar med ditt Kubernetes-kluster, kan du behöva extrahera den token som är kopplad till servicekontot som skapades i föregående steg.

För att extrahera token och skapa en färdig att använda `kubeconfig`-fil, använd det medföljande skriptet `create-kubeconfig.sh`:```bash
./namespace-configuration/serviceaccount/create-kubeconfig.sh
```
Detta skript genererar en `kubeconfig`-fil som är konfigurerad med servicekontots token, vilket möjliggör sömlös autentisering för åtgärder som kräver klusteråtkomst.

### Slutförande

Med Namespace Configuration Operator installerad och servicekontot konfigurerat är din Project Onboarding-miljö nu redo. Denna konfiguration gör det möjligt att automatisera hanteringen av namespaces i ditt kluster, vilket effektiviserar onboarding-processen för nya namespaces och säkerställer konsekvent tillämpning av konfigurationer i hela din Kubernetes- eller OpenShift-miljö.

## Hantera Project Onboarding med ArgoCD

För ett flexibelt sätt att hantera namespaces kan du använda Kustomize tillsammans med ArgoCD. Denna metod innebär att man använder ett dedikerat git-repo för namespace-konfiguration, som hanteras antingen via en kundportal eller ett automationsverktyg. Detta repo innehåller alla önskade Kustomize-YAML-ändringar som ArgoCD sedan tillämpar på ditt kluster, vilket ger en balans mellan manuella anpassningsmöjligheter och robust granskning, tillståndshantering och återspelningsmöjligheter.

Överväg att strukturera ditt git-repo så att unika konfigurationer per namespace är möjliga. Denna struktur stödjer komplexa scenarier, till exempel när ett namespace kräver specifika nätverkspolicys utöver vad som enkelt kan åstadkommas med en NamespaceConfig-anpassad resurs. I sådana fall kan du skapa en dedikerad fil för nätverkspolicy och referera till den i namespace:ets `kustomization.yaml`.

Nedan följer ett illustrativt exempel på hur du kan organisera ditt git-repo:```text
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
För att införa ändringar, använd Kustomize-kommandona `create` eller `edit` med flaggorna `--autodetect` och `--recursive`, så att alla relevanta filer inkluderas. Efter att ha committat och pushat dessa ändringar, trigga en omedelbar skanning via ArgoCD:s webhook.

Denna strategi möjliggör dynamisk och strömlinjeformad distribution av namespace-konfigurationer i dina Kubernetes-miljöer, där varje namespace anpassas för att möta specifika krav samtidigt som hanterbarhet och uppdaterbarhet bibehålls.

## Förbättrade säkerhetsaspekter för hantering av namespaces

Project Onboarding ökar hur enkelt externa kundportaler eller API:er kan skapa och hantera Kubernetes-namespaces och döljer den underliggande komplexiteten. Denna möjlighet att direkt hantera namespace-objekt i Kubernetes innebär också att externa system kan ändra namespaces som är integrala för systemets drift.

Att säkerställa säkerheten för kritiska systemägda namespaces, särskilt de som har prefixet `kube-` eller `openshift-`, kräver att externa gränssnitt tillämpar rigorösa skyddsstrategier. Hörnstenen i en sådan strategi är att proaktivt blockera alla ändringar av dessa namespaces och därigenom förhindra obehörig åtkomst och ändringar som kan äventyra hela klustrets säkerhet.

För att ytterligare stärka säkerheten introducerar Kubernetes 1.29 en avancerad mekanism för validering av förfrågningar till Kubernetes API-servern i processen och markerar ”Validating Admission Policy” som en betafunktion. Denna policy utnyttjar Common Expression Language (CEL) för att formulera valideringsregler, vilket möjliggör högkonfigurerbara policyer som kan skräddarsys och parameteriseras efter klusteradministratörers behov. Med Validating Admission Policy kan specifika CEL-skript utformas för att helt neka alla ändringar av systemägda namespaces, vilket ger ett robust skyddslager.

Det finns dessutom flera verktyg som specialiserar sig på validering av Kubernetes API-förfrågningar, inklusive K-Rail, Kyverno, Kubewarden och OPA/Gatekeeper. Dessa verktyg erbjuder mångsidiga och kraftfulla sätt att genomdriva säkerhetspolicyer och validera förfrågningar, vilket ytterligare säkerställer att systemägda namespaces förblir skyddade mot obehöriga ändringar.

## Att växa till att hantera mer än bara namespace-objektet

Det blir avsevärt enklare att hantera din Kubernetes-miljö genom att ändra etiketter på ett namespace-objekt, vilket utlöser förändringar på andra ställen inom det namespace:et. Denna funktionalitet tar bort komplexiteten för externa kundportaler, då Namespace Configuration Operator tar på sig ansvaret att upprätthålla korrekt tillstånd för den önskade funktionaliteten.

Etiketter som `project-onboarding/compute-limits-cpu` sätter begränsningar för CPU, men det finns många andra inställningar för resurskvoter, såsom requests.cpu, requests.memory, persistent volume claims och alla typer av objektantal. Om du vill göra allt detta konfigurerbart behöver du skapa NamespaceConfig-anpassade resurser (CR:er) för varje inställning du vill exponera. Med tiden kan detta bli tungrott, och du behöver avgöra när det är dags att angripa detta på ett annat sätt. Ett alternativ är att paketera resurskvoter i T‑shirt-storlekar som innehåller flera resurskvotsbegränsningar i stället för att ange enskilda inställningar. Introducera till exempel `project-onboarding/compute-t-shirt-size` och låt den ange storlekar som `small`, `medium`, `large` osv. Ett annat angreppssätt är att stödja direkt hantering av resurskvoter i den externa kundportalen när mer kontroll över resurskvoter krävs. Detta innebär att ta bort alla etiketter relaterade till resurskvoter från namespace-objektet och hantera resurskvoter direkt med externa verktyg.

Principen gäller även för typer som nätverkspolicyer. När komplexiteten överstiger en hanterbar nivå bör du lämna etiketter på namespace-objektet och i stället införa hantering av dessa element via externa verktyg. Detta skifte bidrar till att strömlinjeforma hanteringsprocessen och säkerställer att din Kubernetes-miljö förblir effektiv och skalbar.

## Slutsats och inbjudan till samarbete

På området Kubernetes och OpenShift kan komplexiteten i hanteringen av namespaces i multitenant-miljöer vara avskräckande. Project Onboarding har utformats med målet att förenkla denna process och erbjuder ett innovativt angreppssätt för att hantera namespaces som balanserar flexibilitet med behovet av att dölja underliggande komplexitet. Denna guide har gått igenom grunderna i Project Onboarding, från strömlinjeformade namespace-konfigurationer till förbättrade säkerhetsöverväganden, allt med syfte att höja effektiviteten och säkerheten i dina Kubernetes-miljöer.

### Vi välkomnar dina bidrag

Project Onboarding är mer än ett verktyg; det är ett community-projekt som lever på dina insikter, ditt engagemang och din feedback. Vi bjuder varmt in dig att bidra:

{{< icon-block-horisontal icon="fa-solid fa-code-pull-request" text="Pull requests" description="Oavsett om det handlar om att lägga till nya funktioner, förbättra befintliga eller fixa buggar är dina kodbidrag ovärderliga. Tillsammans kan vi förbättra Project Onboarding för att bättre möta behoven i vår växande community." color="#195F8C" >}}
{{< icon-block-horisontal icon="fa-solid fa-rectangle-history-circle-user" text="Framgångsberättelser" description="Har du framgångsrikt integrerat Project Onboarding i ditt arbetsflöde? Vi vill gärna höra om dina erfarenheter, utmaningar du övervunnit och de fördelar du har uppnått. Dina berättelser kan inspirera och vägleda nya användare!" color="#195F8C" >}}

### Engagera dig

Att prova Project Onboarding är bara början. Fördjupa dig i konfigurationsexemplen, experimentera med etiketterna och se på nära håll hur det kan förändra dina arbetssätt för namespace-hantering. När du utforskar, kom ihåg att dina perspektiv och erfarenheter är nyckeln till att forma Project Onboardings framtid.

Vi ser fram emot att ge oss ut på den här resan tillsammans med dig och skapa en livfull community där innovation leder vägen för hantering av Kubernetes-namespaces. Låt oss bygga något fantastiskt tillsammans.

**Gå med oss, bidra och låt oss göra hanteringen av Kubernetes-namespaces enklare – tillsammans.**