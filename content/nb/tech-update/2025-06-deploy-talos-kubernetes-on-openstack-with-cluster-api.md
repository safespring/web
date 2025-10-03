---
ai: true
title: "Distribuer Talos Kubernetes på OpenStack ved hjelp av Cluster API"
date: 2025-06-12
intro: "Ta i bruk Cluster API for å opprette Talos-baserte Kubernetes-klynger på Openstack."
draft: false
tags: ["English"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "nb"
sectiontext: "Teknologioppdatering"
section: "Teknisk oppdatering"
author: "Stefan Negru"
TOC: "I dette innlegget"
aliases:
  - /blogg/2025/2025-04-validating-talos-linux-intstall/
---
# 

{{< ingress >}}
En trinnvis veiledning for å deklarativt provisjonere, konfigurere og administrere Talos Linux Kubernetes-klynger på Safesprings OpenStack-infrastruktur ved hjelp av CAPO og ClusterResourceSets.
{{< /ingress >}}

I denne artikkelen ønsker vi å ta noen skritt videre i utforskningen av Talos Linux og hvordan vi kan bruke det i [Safespring Compute-infrastruktur (OpenStack)](/services/compute/), og samtidig gå dypere inn i automatisk installasjon og bruk av [Kubernetes Cluster API](https://cluster-api.sigs.k8s.io/).

{{% note "Fokusområder" %}}
Ting vi ønsket å illustrere i denne tekniske utforskningen:

1. Hva er Cluster API og hvordan komme i gang
2. Hvordan bruke Cluster API Provider OpenStack og Safespring Compute-infrastruktur til å installere en Talos Kubernetes-klynge
3. Bruke Cluster Resource Sets til å konfigurere ressurser i en Talos Kubernetes-klynge

{{% /note %}}

## Hva er Cluster API?

Etter hvert som Kubernetes har modnet, har behovet for standardisert livssyklusforvaltning av infrastruktur blitt tydeligere. Prosjektet **Cluster API (CAPI)**, utviklet av Kubernetes SIG Cluster Lifecycle, adresserer dette behovet. Det tilbyr et Kubernetes-aktig deklarativt API for å håndtere livssyklusen til Kubernetes-klynger—fra opprettelse, skalering og oppgradering til sletting—på tvers av ulike infrastrukturleverandører.

Kort sagt lar Cluster API deg administrere hele Kubernetes-klynger slik du administrerer applikasjoner med Kubernetes-manifester. Det frikobler provisjonering av infrastruktur fra kjernelogikken i arbeidslastene dine og standardiserer hvordan Kubernetes-klynger opprettes og administreres på tvers av ulike miljøer.

### Møt CAPO: Cluster API Provider OpenStack

**CAPO** står for **Cluster API Provider OpenStack**. Det er infrastrukturleverandøren for Cluster API som muliggjør provisjonering og administrasjon av Kubernetes-klynger i **OpenStack**-skymiljøer.

Hvis du bruker OpenStack som infrastrukturleverandør og ønsker å automatisere og standardisere livssyklusforvaltningen av Kubernetes-klynger, er CAPO verktøyet du trenger.

---

### Nøkkelkomponenter

Å bruke CAPO innebærer flere komponenter:

1. **Management Cluster**: En Kubernetes-klynge som kjører Cluster API-kontrollere (inkludert CAPO). Den har ansvaret for å forvalte livssyklusen til *mål*-Kubernetes-klynger.
2. [**Infrastrukturleverandør (CAPO)**](https://cluster-api-openstack.sigs.k8s.io/): Dette er kontrolleren som forstår hvordan man oppretter og administrerer OpenStack-ressurser (instanser, nettverk, sikkerhetsgrupper osv.) basert på Cluster API-CRD-er (Custom Resource Definitions).
3. **Custom Resource Definitions (CRD-er)**: CAPO introduserer OpenStack-spesifikke CRD-er som `OpenStackCluster`, `OpenStackMachine` og `OpenStackClusterTemplate`, som lar deg deklarativt definere ønsket tilstand for mål-klyngen din.
4. **Bootstrap Provider**: For vårt brukstilfelle vil vi bruke [Cluster API Bootstrap Provider Talos (CABPT)](https://github.com/siderolabs/cluster-api-bootstrap-provider-talos) som brukes sammen med [Cluster API Control Plane Provider Talos (CACPPT) ](https://github.com/siderolabs/cluster-api-control-plane-provider-talos). Andre verktøy som **kubeadm** brukes ofte til å bootstrappe Kubernetes-noder under opprettelse.
5. **ClusterResourceSet**: en deklarativ måte å knytte Kubernetes-ressurser til en klynge på, som sikrer at bestemte manifester brukes automatisk når en klynge provisjoneres med Cluster API.

## Komme i gang

Det er noen forutsetninger for å kunne gjenta stegene, og vi går ikke i detalj på oppsett av Talos Linux-klynge.

{{% note "Forutsetninger" %}}
- `kubectl`, `clusterctl`, `helm` 
- OpenStack-legitimasjon (inkluder også OpenStack EC2-legitimasjon for S3 state-lager); i tillegg bruker denne veiledningen [Safespring Elastic IP](https://docs.safespring.com/new/elastic-ip/), så sørg for at det er aktivert.
   - Talos-avbildning `1.10.3` tilgjengelig i OpenStack; se [tidligere artikkel](/blogg/2025/2025-03-talos-linux-on-openstack/) for informasjon om hvordan du oppretter den
{{% /note %}}

1. **Sett opp administrasjonsklyngen**: Dette kan være hvilken som helst Kubernetes-klynge, til og med [`kind`](https://kind.sigs.k8s.io/), eller se hvordan vi satte opp en klynge i en [tidligere artikkel](/blogg/2025/2025-03-talos-linux-on-openstack/).
2. **Installer Cluster API-komponenter** ved hjelp av [Cluster API-CLI `clusterctl`](https://cluster-api.sigs.k8s.io/clusterctl/overview.html).
```bash
export KUBECONFIG=<kubeconfig_for_management_cluster>
CAPO_VERSION=v0.12.3
# Install ORC (needed for CAPO >=v0.12)
kubectl apply -f https://github.com/k-orc/openstack-resource-controller/releases/latest/download/install.yaml
# Initialize the management cluster with bootstrap provider talos 
# as well as control plane talos
# log verbosity is set highest for us to follow what it does

clusterctl init -c talos -b talos --infrastructure openstack:$CAPO_VERSION -v 5

# if we want to install with Cluster API Add-on Provider Helm 
clusterctl init -c talos -b talos --infrastructure openstack:$CAPO_VERSION --addon helm -v 5 
```
Etter en vellykket installasjon bør du kunne se følgende pods kjøre:
```bash
NAMESPACE                       NAME                                                  READY   STATUS      RESTARTS   AGE
...
# caaph-system only present if the Cluster API Add-on Provider Helm  was installed
caaph-system                    caaph-controller-manager-f8867899f-hpft2              1/1     Running     0          1h
cabpt-system                    cabpt-controller-manager-b96c47fbf-7wdj4              1/1     Running     0          1h
cacppt-system                   cacppt-controller-manager-5b655c8bb6-sh9kt            1/1     Running     0          1h
capi-system                     capi-controller-manager-7ffb6df7df-c7rhj              1/1     Running     0          1h
capo-system                     capo-controller-manager-f5675885f-pmht4               1/1     Running     0          1h
...
orc-system                      orc-controller-manager-594d544cd7-25qlr               1/1     Running     0          1h
...

```
Med det avslutter vi komponentene i administrasjonsklyngen, nemlig:

- Cluster API Core Manager: Denne kontrolleren (CAPI) er ansvarlig for å orkestrere hele livssyklusen til Kubernetes-klynger. Den forvalter de kjernebaserte Cluster API‑ressursene som `Cluster`, `Machine`, `MachineDeployment` og `MachineSet`, som definerer ønsket tilstand for en Kubernetes‑klynge på en leverandøruavhengig måte. Disse kjerneressursene refererer til tilleggsspesifikke ressurser for å fullføre klyngekonfigurasjonen. Den faktiske infrastrukturen og oppstartslogikken håndteres av separate leverandørkomponenter.
- Bootstrap Provider: Talos Bootstrap Provider (CABPT) er ansvarlig for å generere maskinkonfigurasjoner skreddersydd for Talos Linux. Disse konfigurasjonene—innkapslet i egendefinerte TalosConfig‑ressurser—brukes av Talos‑noder under initieringsprosessen. CABPT konverterer abstrakte `Machine`‑definisjoner til Talos‑baserte Kubernetes‑noder, og muliggjør sikker og uforanderlig oppstart av klynger. I samspill med CABPT håndterer Talos Control Plane Provider (CACPPT) hele livssyklusen til Talos‑baserte kontrollplannoder. Den bruker Talos‑API‑ene til å klargjøre og konfigurere kontrollplanet i henhold til ønsket tilstand definert av Cluster API. CACPPT sørger for korrekt etcd‑klyngeformasjon, høy tilgjengelighet og konsistent tilstand på tvers av kontrollplannoder.
- Infrastructure Provider: Infrastrukturoverøren (CAPO) er ansvarlig for å klargjøre underliggende sky‑ eller lokal (on‑prem) infrastruktur—som virtuelle maskiner, nettverk og lagring—basert på klyngespesifikasjonen. Den utnytter maskinkonfigurasjonen generert av bootstrap‑leverandøren (dvs. `TalosConfigTemplate`) for å initialisere noder med riktig rolle og konfigurasjon. Når de er klargjort, booter disse maskinene inn i Talos og blir automatisk med i klyngen.

Se flere detaljer i [Cluster API-boken](https://cluster-api.sigs.k8s.io/user/concepts).

---

## Opprette en arbeidslastklynge

{{% note "Merk" %}}
Både [Hurtigstartguide for Cluster API](https://cluster-api.sigs.k8s.io/user/quick-start#create-your-first-workload-cluster) og [SideroLabs Cluster API-maler](https://github.com/siderolabs/cluster-api-templates) gir et meget godt grunnlag for å lage og forstå nødvendig konfigurasjon for en arbeidslastklynge – vi anbefaler å gå gjennom dem.
{{% /note %}}

Strategien vår for å opprette en arbeidslastklynge innebærer først å opprette `ClusterResourceSet`‑er som gir en mekanisme for automatisk å anvende et sett med ressurser (som CNI/CSI/CCM) på arbeidslastklynger. CRD‑en `ClusterResourceSet` tilbyr en grunnleggende løsning for installasjon og administrasjon av ressurser, mens for avanserte brukstilfeller anbefales det generelt å bruke en tilleggsleverandør som [Cluster API Add-on Provider Helm](https://github.com/kubernetes-sigs/cluster-api-addon-provider-helm).

Den andre delen beskriver å lage YAML‑en med de nødvendige Custom Resource Definitions (CRD) som er spesifikke for CAPI og CAPO, men også for Talos Bootstrap‑ og Control Plane‑leverandørene.

### 1. Opprett ClusterResourceSet-er

I eksemplet vårt viser vi bare `ClusterResourceSet`, siden [Cluster API Add-on Provider Helm per utgivelsen av dette innlegget ikke er oppdatert til versjon 1.10.0](https://github.com/kubernetes-sigs/cluster-api-addon-provider-helm/issues/371).

Først er det verdt å merke seg feltet `strategy`, som kan være enten `Reconcile` eller `ApplyOnce`. Forskjellen er at med `Reconcile`, når arbeidslastklyngene er klare, gjøres det en innsats for kontinuerlig å vedlikeholde tilstanden til ressursene i arbeidslastklyngen, mens `ApplyOnce` bare synkroniserer én gang.

En annen viktig del er etikettene, som gjør det mulig å målrette installasjonen av `ClusterResourceSet` til en `Cluster` dersom etiketten er satt på den `Cluster`‑CRD‑en.

Vi vil bruke navnerommet `safespring` til å opprette klyngen og lagre alle nødvendige CRD‑er for å opprette en arbeidslastklynge.

{{% note "Merk" %}}
Siden `ClusterResourceSet` brukes via etiketter, anbefaler vi at de er navneromsbundne; ellers risikerer du å oppgradere alle klynger når du oppdaterer dem.
{{% /note %}}
```bash
kubectl create ns safespring
```
Som første steg i klyngen skal vi konfigurere Cinder CSI sammen med de nødvendige lagringsklassene, slik at vi har persistente volumer tilgjengelige når klyngen opprettes:
```bash
cat > cloud.conf <<EOF
[Global]
auth-url="<your_auth_url>"
application-credential-id=" <your_credential_id>"
application-credential-secret="<your_credential_secret>"
[LoadBalancer]
enabled = false
EOF

kubectl create secret generic cloud-config --from-file=cloud.conf --dry-run=client -o yaml -n kube-system > cloud-secret.yaml

kubectl create secret generic cloud-config --from-file=cloud-secret.yaml --type=addons.cluster.x-k8s.io/resource-set -n safespring-demo

kubectl create configmap cinder-csi-controllerplugin-rbac -n safespring --from-literal=cinder-csi-controllerplugin-rbac.yaml="$(curl -k https://raw.githubusercontent.com/kubernetes/cloud-provider-openstack/refs/heads/master/manifests/cinder-csi-plugin/cinder-csi-controllerplugin-rbac.yaml)"

kubectl create configmap cinder-csi-controllerplugin -n safespring --from-literal=cinder-csi-controllerplugin.yaml="$(curl -k https://raw.githubusercontent.com/kubernetes/cloud-provider-openstack/refs/heads/master/manifests/cinder-csi-plugin/cinder-csi-controllerplugin.yaml)"

kubectl create configmap cinder-csi-nodeplugin-rbac -n safespring --from-literal=cinder-csi-nodeplugin-rbac.yaml="$(curl -k https://raw.githubusercontent.com/kubernetes/cloud-provider-openstack/refs/heads/master/manifests/cinder-csi-plugin/cinder-csi-nodeplugin-rbac.yaml)"

kubectl create configmap cinder-csi-nodeplugin -n safespring --from-literal=cinder-csi-nodeplugin.yaml="$(curl -k https://raw.githubusercontent.com/kubernetes/cloud-provider-openstack/refs/heads/master/manifests/cinder-csi-plugin/cinder-csi-nodeplugin.yaml)"

kubectl create configmap csi-cinder-driver -n safespring --from-literal=csi-cinder-driver.yaml="$(curl -k https://raw.githubusercontent.com/kubernetes/cloud-provider-openstack/refs/heads/master/manifests/cinder-csi-plugin/csi-cinder-driver.yaml)"

cat > storage-classes.yaml <<EOF
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: large
  annotations: { storageclass.kubernetes.io/is-default-class: "true" }
provisioner: cinder.csi.openstack.org
volumeBindingMode: Immediate
allowVolumeExpansion: true
reclaimPolicy: Delete
parameters:
  type: large
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast
  annotations: { storageclass.kubernetes.io/is-default-class: "false" }
provisioner: cinder.csi.openstack.org
volumeBindingMode: Immediate
allowVolumeExpansion: true
reclaimPolicy: Delete
parameters:
  type: fast
EOF

kubectl create configmap -n safespring storage-classes --from-file=storage-classes.yaml 

cat <<EOF | kubectl apply -f -
apiVersion: addons.cluster.x-k8s.io/v1beta1
kind: ClusterResourceSet
metadata:
  name: cloud-provider-openstack
  namespace: safespring
spec:
  strategy: Reconcile
  clusterSelector:
    matchLabels:
      cloud: openstack
  resources:
    - name: cloud-config
      kind: Secret
    - name: cinder-csi-controllerplugin-rbac
      kind: ConfigMap
    - name: cinder-csi-controllerplugin
      kind: ConfigMap
    - name: cinder-csi-nodeplugin
      kind: ConfigMap
    - name: cinder-csi-nodeplugin-rbac
      kind: ConfigMap
    - name: csi-cinder-driver
      kind: ConfigMap
    - name: storage-classes
      kind: ConfigMap
EOF
```
Vi skal også konfigurere Nginx Ingress samt Cert-manager med helm template for å generere nødvendig YAML i en `ConfigMap`.
```bash
helm template ingress-nginx ingress-nginx/ingress-nginx --namespace ingress-nginx --create-namespace --version $NGINX_VERSION  --set controller.metrics.enabled=true --set controller.hostNetwork=true --set controller.hostPort.enabled=true --set controller.kind=DaemonSet --set controller.service.enabled=false --set controller.admissionWebhooks.enabled=false > nginx-ingress.yaml

kubectl create configmap -n safespring nginx-install --from-file=nginx-ingress.yaml

cat <<EOF | kubectl apply -f -
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-ns
  namespace: safespring
data:
  namespace-create: |
    apiVersion: v1
    kind: Namespace
    metadata:
      name: ingress-nginx
      labels:
        pod-security.kubernetes.io/enforce: privileged
        pod-security.kubernetes.io/enforce-version: latest
        pod-security.kubernetes.io/audit: privileged
        pod-security.kubernetes.io/warn: privileged
        name: ingress-nginx
---
apiVersion: addons.cluster.x-k8s.io/v1beta1
kind: ClusterResourceSet
metadata:
  name: nginx-installation
  namespace: safespring
spec:
  clusterSelector:
    matchLabels:
      ingress: nginx
  resources:
    - kind: ConfigMap
      name: nginx-ns
    - kind: ConfigMap
      name: nginx-install
  strategy: Reconcile
EOF
```
Med cert-manager vil vi også opprette en `ClusterIssuer` for å gjøre det enklere å be om sertifikater.
```bash
helm template cert-manager jetstack/cert-manager --namespace cert-manager --create-namespace --version v1.17.2 --set crds.enabled=true > cert-manager-v1.17.2.yaml

kubectl create configmap -n safespring cert-manager --from-file=cert-manager-v1.17.2.yaml

cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: cluster-issuer-letsencrypt-prod
  namespace: safespring
data:
  cluster_issuer: |
    apiVersion: cert-manager.io/v1
    kind: ClusterIssuer
    metadata:
      name: letsencrypt-prod
    spec:
      acme:
        email: not-valid@safespring.com
        privateKeySecretRef:
          name: letsencrypt-prod
        server: https://acme-v02.api.letsencrypt.org/directory
        solvers:
        - http01:
            ingress:
              ingressClassName: nginx
          selector: {}
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: cert-manager-ns
  namespace: safespring
data:
  namespace-create: |
    apiVersion: v1
    kind: Namespace
    metadata:
      name: cert-manager
      labels:
        name: cert-manager
---
apiVersion: addons.cluster.x-k8s.io/v1beta1
kind: ClusterResourceSet
metadata:
  name: cert-manager-installation
  namespace: safespring
spec:
  clusterSelector:
    matchLabels:
      component: cert-manager
  resources:
    - kind: ConfigMap
      name: cert-manager-ns
    - kind: ConfigMap
      name: cert-manager
    - kind: ConfigMap
      name: cluster-issuer-letsencrypt-prod
  strategy: Reconcile
EOF
```
### 2. Opprett maskinmaler og egendefinerte klyngeressurser
```bash
cat > clouds.yaml <<EOF
clouds:
  openstack:
    auth:
      application_credential_id: <your_credential_id>
      application_credential_secret: <your_credential_secret>
      auth_url: <your_auth_url>
      project_name: <project_name>
      user_domain_name: users
    auth_type: v3applicationcredential
    identity_api_version: 3
    interface: public
    region_name: <region_name>
EOF
```
For at `cloud-config` skal kunne brukes som `kind: Secret` i en `ClusterResourceSet`, må den lagres som en Kubernetes Secret, derfor bruker vi `--dry-run=client` for å opprette YAML-en.
```bash
kubectl create secret generic safespring-demo-cloud-config --from-file=clouds.yaml='clouds.yaml' --from-literal=cacert="" -n safespring

kubectl label secret -n safespring safespring-demo-cloud-config clusterctl.cluster.x-k8s.io/move=true

# https://cluster-api-openstack.sigs.k8s.io/clusteropenstack/configuration.html
#  Set clusterctl.cluster.x-k8s.io/move label for the secret created from OPENSTACK_CLOUD_YAML_B64 in order to successfully move objects from bootstrap cluster to target cluster. 
```
For mer informasjon om å skaffe applikasjonslegitimasjon, se dokumentasjonen vår om hvordan du [oppretter applikasjonslegitimasjon](https://docs.safespring.com/new/app-creds/#creating-application-credentials-using-the-dashboard).
```yaml
apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
kind: OpenStackMachineTemplate
metadata:
  name: safespring-demo-control-plane
  namespace: safespring
spec:
  template:
    spec:
      # For flavours options consult: https://docs.safespring.com/new/flavors/ 
      flavor: l2.c8r16.100
      image:
        filter:
          # adjust to the name of the image in openstack
          name: talos-image-v1.10.3
---
apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
kind: OpenStackMachineTemplate
metadata:
  name: safespring-demo-md-0
  namespace: safespring
spec:
  template:
    spec:
      # For flavours options consult: https://docs.safespring.com/new/flavors/ 
      flavor: l2.c4r8.100
      image:
        filter:
          # adjust to the name of the image in openstack
          name: talos-image-v1.10.3
---
apiVersion: bootstrap.cluster.x-k8s.io/v1alpha3
kind: TalosConfigTemplate
metadata:
  name: safespring-demo-md-0
  namespace: safespring
spec:
  template:
    spec:
      generateType: join
      # adjust to the your talos version
      talosVersion: 1.10.3
```
I denne veiledningen trenger vi to [elastiske IP-adresser](https://docs.safespring.com/new/elastic-ip/). Merk også at Cilium CNI-installasjonen gjøres via `inlineManifests` med flagget `bgpControlPlane.enabled=true`, slik at [BGP-peeringpolicy](https://docs.cilium.io/en/latest/network/bgp-control-plane/bgp-control-plane-v1/) er aktivert.

{{% note "Note" %}}
På sikt anbefaler vi å migrere til [BGP Control Plane-ressurser](https://docs.cilium.io/en/stable/network/bgp-control-plane/bgp-control-plane-v2/).
{{% /note %}}
```yaml

apiVersion: cluster.x-k8s.io/v1beta1
kind: MachineDeployment
metadata:
  name: safespring-demo-md-0
  namespace: safespring
spec:
  clusterName: safespring-demo
  # adjust to the desired number of worker nodes
  replicas: 2
  selector:
    matchLabels: null
  template:
    spec:
      bootstrap:
        configRef:
          apiVersion: bootstrap.cluster.x-k8s.io/v1alpha3
          kind: TalosConfigTemplate
          name: safespring-demo-md-0
      clusterName: safespring-demo
      failureDomain: nova
      infrastructureRef:
        apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
        kind: OpenStackMachineTemplate
        name: safespring-demo-md-0
      # adjust to the desired kubernetes version
      version: v1.32.4

---
apiVersion: controlplane.cluster.x-k8s.io/v1alpha3
kind: TalosControlPlane
metadata:
  name: safespring-demo-control-plane
  namespace: safespring-demo
spec:
  infrastructureTemplate:
    kind: OpenStackMachineTemplate
    apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
    name: safespring-demo-control-plane
    namespace: safespring-demo
  controlPlaneConfig:
    controlplane:
      generateType: controlplane
      # adjust to the your talos version
      talosVersion: 1.10.3
      configPatches:
      - op: add
        # this is required to deploy the cloud-controller-manager 
        # which is responsible for running cloud specific controllers
        path: /cluster/externalCloudProvider
        value:
          enabled: true
          manifests:
              - https://raw.githubusercontent.com/kubernetes/cloud-provider-openstack/master/manifests/controller-manager/cloud-controller-manager-roles.yaml
              - https://raw.githubusercontent.com/kubernetes/cloud-provider-openstack/master/manifests/controller-manager/cloud-controller-manager-role-bindings.yaml
              - https://raw.githubusercontent.com/kubernetes/cloud-provider-openstack/master/manifests/controller-manager/openstack-cloud-controller-manager-ds.yaml
      - op: add
        path: /machine/certSANs
        value:
          # adjust to the desired FQDN 
          - api.demo.safespring.eu
          # adjust to control plane available elastic IPS
          # see https://docs.safespring.com/new/elastic-ip/
          - "255.255.255.254"
      - op: add
        path: /cluster/proxy
        value:
          disabled: true
      - op: add
        path: /cluster/network/cni
        value:
          name: none
      - op: add
        path: /machine/network/interfaces
        value:
          - deviceSelector:
              hardwareAddr: "00:00:00:00:00:00"
            addresses:
            # adjust to control plane available elastic IPS
            # see https://docs.safespring.com/new/elastic-ip/
              - 255.255.255.254/32
      - op: add
        path: /cluster/inlineManifests
        value:
          - name: cilium-install
            contents: |
              ---
              apiVersion: rbac.authorization.k8s.io/v1
              kind: ClusterRoleBinding
              metadata:
                name: cilium-install
              roleRef:
                apiGroup: rbac.authorization.k8s.io
                kind: ClusterRole
                name: cluster-admin
              subjects:
              - kind: ServiceAccount
                name: cilium-install
                namespace: kube-system
              ---
              apiVersion: v1
              kind: ServiceAccount
              metadata:
                name: cilium-install
                namespace: kube-system
              ---
              apiVersion: batch/v1
              kind: Job
              metadata:
                name: cilium-install
                namespace: kube-system
              spec:
                backoffLimit: 10
                template:
                  metadata:
                    labels:
                      app: cilium-install
                  spec:
                    restartPolicy: OnFailure
                    tolerations:
                      - operator: Exists
                      - effect: NoSchedule
                        operator: Exists
                      - effect: NoExecute
                        operator: Exists
                      - effect: PreferNoSchedule
                        operator: Exists
                      - key: node-role.kubernetes.io/control-plane
                        operator: Exists
                        effect: NoSchedule
                      - key: node-role.kubernetes.io/control-plane
                        operator: Exists
                        effect: NoExecute
                      - key: node-role.kubernetes.io/control-plane
                        operator: Exists
                        effect: PreferNoSchedule
                    affinity:
                      nodeAffinity:
                        requiredDuringSchedulingIgnoredDuringExecution:
                          nodeSelectorTerms:
                            - matchExpressions:
                                - key: node-role.kubernetes.io/control-plane
                                  operator: Exists
                    serviceAccount: cilium-install
                    serviceAccountName: cilium-install
                    hostNetwork: true
                    containers:
                    - name: cilium-install
                      image: quay.io/cilium/cilium-cli-ci:v0.16.22
                      env:
                      - name: KUBERNETES_SERVICE_HOST
                        valueFrom:
                          fieldRef:
                            apiVersion: v1
                            fieldPath: status.podIP
                      - name: KUBERNETES_SERVICE_PORT
                        value: "6443"
                      command:
                        - cilium
                        - install
                        - --set
                        - ipam.mode=kubernetes
                        - --set
                        - kubeProxyReplacement=true
                        - --set
                        - securityContext.capabilities.ciliumAgent={CHOWN,KILL,NET_ADMIN,NET_RAW,IPC_LOCK,SYS_ADMIN,SYS_RESOURCE,DAC_OVERRIDE,FOWNER,SETGID,SETUID}
                        - --set
                        - securityContext.capabilities.cleanCiliumState={NET_ADMIN,SYS_ADMIN,SYS_RESOURCE}
                        - --set
                        - cgroup.autoMount.enabled=false
                        - --set
                        - cgroup.hostRoot=/sys/fs/cgroup
                        - --set
                        - k8sServiceHost=localhost
                        - --set
                        - k8sServicePort=7445
                        - --set
                        - bpf.hostLegacyRouting=true
                        - --set
                        - bpf.masquerade=true
                        - --set
                        - hubble.enabled=true
                        - --set
                        - hubble.metrics.enabled=dns:query
                        - --set
                        - hubble.metrics.enabled={drop,tcp,flow,port-distribution,icmp,http}
                        - --set
                        - bgpControlPlane.enabled=true
                        - --version=1.17.4
          - name: "bgp-boilerplate-configmap"
            contents: |
              apiVersion: "cilium.io/v2alpha1"
              kind: CiliumLoadBalancerIPPool
              metadata:
                name: "cilium-lb-pool"
                labels:
                  bgp-announce: "control"
              spec:
                blocks:
                  # adjust to control plane available elastic IPS
                  # see https://docs.safespring.com/new/elastic-ip/
                  - cidr: "255.255.255.254/32"
              ---
              apiVersion: cilium.io/v2alpha1
              kind: CiliumBGPPeeringPolicy
              metadata:
                name: custom-policy
              spec:
                nodeSelector:
                  matchLabels:
                    node-role.kubernetes.io/control-plane: "" 
                virtualRouters:
                - exportPodCIDR: true
                  # adjust to correct ASN
                  # see https://docs.safespring.com/new/elastic-ip/
                  localASN: 99999
                  neighbors:
                  - connectRetryTimeSeconds: 120
                    eBGPMultihopTTL: 5
                    holdTimeSeconds: 90
                    keepAliveTimeSeconds: 30
                    peerASN: 64700
                    # adjust to correct peerAddress
                    # see https://docs.safespring.com/new/elastic-ip/
                    peerAddress: 255.255.255.253/32
                    peerPort: 179
                  serviceSelector:
                    matchLabels:
                      bgp-announce: "control"
              ---
              apiVersion: cilium.io/v2alpha1
              kind: CiliumBGPPeeringPolicy
              metadata:
                name: custom-policy-worker
              spec:
                nodeSelector:
                  matchExpressions:
                    - key: node-role.kubernetes.io/control-plane
                      operator: DoesNotExist
                virtualRouters:
                - exportPodCIDR: false
                  # adjust to correct ASN
                  # see https://docs.safespring.com/new/elastic-ip/
                  localASN: 99999
                  neighbors:
                  - connectRetryTimeSeconds: 120
                    eBGPMultihopTTL: 5
                    holdTimeSeconds: 90
                    keepAliveTimeSeconds: 30
                    # adjust to correct peerAddress
                    # see https://docs.safespring.com/new/elastic-ip/
                    peerAddress: 255.255.255.253/32
                    peerPort: 179
                  serviceSelector:
                    matchLabels:
                      bgp-announce: "worker"
              ---
              apiVersion: v1
              kind: Service
              metadata:
                name: bgp-control
                namespace: kube-system
                labels:
                  bgp-announce: "control"
                annotations:
                  io.cilium/lb-ipam-announce: "true"
              spec:
                type: LoadBalancer
                externalIPs:
                  # adjust to control plane available elastic IPS
                  # see https://docs.safespring.com/new/elastic-ip/
                  - 255.255.255.254
                ports:
                  - protocol: TCP
                    port: 6443
                    targetPort: 6443
              ---
              apiVersion: v1
              kind: Service
              metadata:
                name: bgp-worker
                namespace: kube-system
                labels:
                  bgp-announce: "worker"
                annotations:
                  io.cilium/lb-ipam-announce: "true"
              spec:
                type: LoadBalancer
                externalIPs:
                  # adjust to worker node available elastic IPS
                  # see https://docs.safespring.com/new/elastic-ip/
                  - 255.255.255.255
                ports:
                  - protocol: TCP
                    port: 50000
                    targetPort: 50000
  # adjust to the desired number of control planes
  replicas: 1
  # adjust to the desired kubernetes version
  version: v1.32.4
```
Så til selve klynjespesifikasjonen, merk at vi for denne klyngen setter én etikett `cloud=openstack` som standard, for å illustrere det andre `ClusterResourceSet` etter at klyngen er installert.
```yaml
apiVersion: cluster.x-k8s.io/v1beta1
kind: Cluster
metadata:
  name: safespring-demo
  namespace: safespring-demo
  labels:
    cloud: openstack
spec:
  clusterNetwork:
    pods:
      cidrBlocks:
      - 192.168.0.0/16
    serviceDomain: cluster.local
  controlPlaneRef:
    apiVersion: controlplane.cluster.x-k8s.io/v1alpha3
    kind: TalosControlPlane
    name: safespring-demo-control-plane
  infrastructureRef:
    apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
    kind: OpenStackCluster
    name: safespring-demo
---
apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
kind: OpenStackCluster
metadata:
  name: safespring-demo
  namespace: safespring-demo
spec:
  # adjust to control plane available elastic IPS
  # see https://docs.safespring.com/new/elastic-ip/
  apiServerFixedIP:  255.255.255.254
  disableAPIServerFloatingIP: true
  network:
    # adjust to the elastic IPS network id in the openstack project
    id: <external_network_id>
  externalNetwork:
    # adjust to the elastic IPs network id in the openstack project
    id:  <external_network_id>
  identityRef:
    cloudName: openstack
    name: safespring-demo-cloud-config
  managedSecurityGroups:
    allNodesSecurityGroupRules:
    - description: Created by cluster-api-provider - Talos API nodes
      direction: ingress
      etherType: IPv4
      name: Talos-API-NODES
      portRangeMax: 50001
      portRangeMin: 50000
      protocol: tcp
      remoteIPPrefix: "10.72.0.0/20"
    - description: Created by cluster-api-provider - Talos API LB
      direction: ingress
      etherType: IPv4
      name: Talos-API-LB
      portRangeMax: 50000
      portRangeMin: 50000
      protocol: tcp
      # this means the talosctl control port is open to the world
      # adjust as seen fit
      remoteIPPrefix: "0.0.0.0/0"
    - description: Created by cluster-api-provider - cilium vxlan overlay egress
      direction: egress
      etherType: IPv4
      name: cilium-vxlan-udp-egress
      portRangeMax: 8472
      portRangeMin: 8472
      protocol: udp
      remoteManagedGroups:
          - controlplane
          - worker
    - description: Created by cluster-api-provider - cilium vxlan overlay ingress
      direction: ingress
      etherType: IPv4
      name: cilium-vxlan-udp-ingress
      portRangeMax: 8472
      portRangeMin: 8472
      protocol: udp
      remoteManagedGroups:
          - controlplane
          - worker
    - description: Created by cluster-api-provider - Cilium health checks
      direction: ingress
      etherType: IPv4
      name: Cilium-Health-Checks
      portRangeMax: 4240
      portRangeMin: 4240
      protocol: tcp
      remoteManagedGroups:
          - controlplane
          - worker
    - description: Created by cluster-api-provider - ICMP Echo Request/Reply ingress
      direction: ingress
      etherType: IPv4
      name: ICMP-Echo-ingress
      protocol: icmp
      portRangeMin: 8
      portRangeMax: 0
      remoteManagedGroups:
          - controlplane
          - worker
    - description: Created by cluster-api-provider - ICMP Echo Request/Reply egress
      direction: egress
      etherType: IPv4
      name: ICMP-Echo-egress
      protocol: icmp
      portRangeMin: 8
      portRangeMax: 0
      remoteManagedGroups:
          - controlplane
          - worker
```
Lagre konfigurasjonen ovenfor og ta den i bruk med `kubectl apply -f adjusted-cluster-config.yaml`.

### 3. Resultatet
```bash
➜  kubectl get cluster -A
NAMESPACE         NAME              CLUSTERCLASS   PHASE         AGE     VERSION
safespring        safespring-demo                  Provisioned   3m55s   
➜  clusterctl get kubeconfig safespring-demo -n safespring > capi-quickstart.kubeconfig
➜  kubectl --kubeconfig=./capi-quickstart.kubeconfig get nodes
NAME                                  STATUS   ROLES           AGE     VERSION
safespring-demo-control-plane-7r42k   Ready    control-plane   3m17s   v1.32.4
safespring-demo-md-0-rknp6-2gkkz      Ready    <none>          3m11s   v1.32.4
safespring-demo-md-0-rknp6-hg2s9      Ready    <none>          3m13s   v1.32.4
➜  kubectl --kubeconfig=./capi-quickstart.kubeconfig get pods -A -w                                
NAMESPACE     NAME                                                          READY   STATUS      RESTARTS      AGE
kube-system   cilium-8fwmd                                                  1/1     Running     0             18m
kube-system   cilium-9rl6z                                                  1/1     Running     0             18m
kube-system   cilium-9sthp                                                  1/1     Running     0             18m
kube-system   cilium-envoy-bpg7z                                            1/1     Running     0             18m
kube-system   cilium-envoy-m6xw4                                            1/1     Running     0             18m
kube-system   cilium-envoy-rqcdk                                            1/1     Running     0             18m
kube-system   cilium-install-cs5gg                                          0/1     Completed   0             19m
kube-system   cilium-operator-7b8cb89c45-6c55h                              1/1     Running     0             18m
kube-system   coredns-78d87fb69b-2lzzf                                      1/1     Running     0             19m
kube-system   coredns-78d87fb69b-hbq7q                                      1/1     Running     0             19m
kube-system   csi-cinder-controllerplugin-55b78fd85b-j6xgk                  6/6     Running     0             3m24s
kube-system   csi-cinder-nodeplugin-fbmv4                                   3/3     Running     0             3m15s
kube-system   csi-cinder-nodeplugin-k74nk                                   3/3     Running     0             3m18s
kube-system   csi-cinder-nodeplugin-lzppj                                   3/3     Running     0             3m18s
kube-system   kube-apiserver-safespring-demo-control-plane-7r42k            1/1     Running     0             19m
kube-system   kube-controller-manager-safespring-demo-control-plane-7r42k   1/1     Running     2 (19m ago)   19m
kube-system   kube-scheduler-safespring-demo-control-plane-7r42k            1/1     Running     2 (19m ago)   19m
kube-system   openstack-cloud-controller-manager-zbf9p                      1/1     Running     0             4m3s

```
{{% note "Merk" %}}
Vi vil bruke etiketter for å demonstrere hvordan `ClusterResourceSet` blir anvendt på **alle klyngene** i det navnerommet som har disse etikettene.
{{% /note %}}
```bash
➜  kubectl label cluster -n safespring safespring-demo component=cert-manager 
cluster.cluster.x-k8s.io/safespring-demo labeled
➜  kubectl label cluster -n safespring safespring-demo ingress=nginx
cluster.cluster.x-k8s.io/safespring-demo labeled
➜  kubectl --kubeconfig=./capi-quickstart.kubeconfig get pods -A   
NAMESPACE       NAME                                                          READY   STATUS      RESTARTS      AGE
cert-manager    cert-manager-7d67448f59-7bns8                                 1/1     Running     0             2m38s
cert-manager    cert-manager-cainjector-666b8b6b66-khq4j                      1/1     Running     0             2m38s
cert-manager    cert-manager-startupapicheck-694cb                            0/1     Completed   0             2m38s
cert-manager    cert-manager-webhook-78cb4cf989-jwvk4                         1/1     Running     0             2m38s
ingress-nginx   ingress-nginx-controller-mgnhb                                1/1     Running     0             25s
ingress-nginx   ingress-nginx-controller-nv52z                                1/1     Running     0             25s
kube-system     cilium-cc5s9                                                  1/1     Running     0             8m40s
kube-system     cilium-chmc4                                                  1/1     Running     0             8m40s
kube-system     cilium-envoy-hh59m                                            1/1     Running     0             8m40s
kube-system     cilium-envoy-n6znv                                            1/1     Running     0             8m40s
kube-system     cilium-envoy-ppdzm                                            1/1     Running     0             8m40s
kube-system     cilium-install-2mqxh                                          0/1     Completed   0             9m51s
kube-system     cilium-l6777                                                  1/1     Running     0             8m40s
kube-system     cilium-operator-7b8cb89c45-ccvvr                              1/1     Running     0             8m40s
kube-system     coredns-78d87fb69b-8k72g                                      1/1     Running     0             9m50s
kube-system     coredns-78d87fb69b-zdlb9                                      1/1     Running     0             9m50s
kube-system     csi-cinder-controllerplugin-55b78fd85b-pp5g9                  6/6     Running     0             7m33s
kube-system     csi-cinder-nodeplugin-2ntjp                                   3/3     Running     0             7m33s
kube-system     csi-cinder-nodeplugin-jrl76                                   3/3     Running     0             7m33s
kube-system     csi-cinder-nodeplugin-xhsg2                                   3/3     Running     0             7m33s
kube-system     kube-apiserver-safespring-demo-control-plane-8gfwb            1/1     Running     0             9m47s
kube-system     kube-controller-manager-safespring-demo-control-plane-8gfwb   1/1     Running     2 (10m ago)   9m47s
kube-system     kube-scheduler-safespring-demo-control-plane-8gfwb            1/1     Running     2 (10m ago)   9m47s
kube-system     openstack-cloud-controller-manager-p6nlw                      1/1     Running     0             8m15s

```
Opprette et persistent volum:
```bash
➜  kubectl --kubeconfig=./capi-quickstart.kubeconfig apply -f - <<EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: csi-pvc-test
  namespace: default
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: fast
EOF
persistentvolumeclaim/csi-pvc-test created
➜  kubectl --kubeconfig=./capi-quickstart.kubeconfig get pvc -A        
NAMESPACE   NAME           STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   VOLUMEATTRIBUTESCLASS   AGE
default     csi-pvc-test   Bound    pvc-feac6f5f-9137-4ab0-9b77-3032483a7828   1Gi        RWO            fast           <unset>                 8s

```
---

## Konklusjon – eller hvorfor bruke Cluster API med CAPO?

**Deklarativ livssyklushåndtering**: Definer klyngens tilstand i YAML-manifester og anvend endringer over tid etter behov – akkurat som du gjør med pods og tjenester.

**Sky-agnostisk**: Bruk av CAPI med CAPO abstraherer klyngens livssyklusoperasjoner. Hvis du senere flytter til en annen sky, kan du bytte infrastrukturleverandør (f.eks. AWS, Azure) med minimale endringer i arbeidsflyten.

**Konsistent automatisering**: Unngå håndlagde automasjonsskript, og ta i bruk fellesskapstestede kontrollere og API-er som sørger for pålitelig opprettelse og oppgraderinger av klynger.

**Avanserte funksjoner**: CAPO støtter en rekke OpenStack-funksjoner som: *Flere tilgjengelighetssoner*, *Støtte for egendefinerte images og flavors*, *Cinder-basert lagring*, *Flytende IP-er for kontrollplaner og arbeidsnoder* (hvis OpenStack-installasjonen tillater det) samt [autoskalering](https://cluster-api.sigs.k8s.io/tasks/automated-machine-management/autoscaling).


{{% note "likte du det du nettopp leste?" %}}
Høres dette ut som en god løsning for dine behov?
Ikke nøl med å ta kontakt på hello@safespring.com hvis du har spørsmål.
{{% /note %}}