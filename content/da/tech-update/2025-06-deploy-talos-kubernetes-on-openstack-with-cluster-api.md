---
ai: true
title: "Udrul Kubernetes med Talos på OpenStack via Cluster API"
date: 2025-06-12
intro: "Brug af Cluster API til at oprette Talos-baserede Kubernetes-klynger på OpenStack."
draft: false
tags: ["English"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "da"
sectiontext: "Teknologiopdatering"
section: "Teknisk opdatering"
author: "Stefan Negru"
TOC: "I dette indlæg"
aliases:
  - /blogg/2025/2025-04-validating-talos-linux-intstall/
---
# 

{{< ingress >}}
En trin-for-trin guide til deklarativt at klargøre, konfigurere og administrere Talos Linux Kubernetes-klynger på Safesprings OpenStack-infrastruktur ved hjælp af CAPO og ClusterResourceSets.
{{< /ingress >}}

I denne artikel vil vi tage nogle skridt videre i vores undersøgelse af Talos Linux og hvordan vi kan bruge det i [Safespring Compute-infrastruktur (OpenStack)](/services/compute/), og samtidig foretage en mere dybdegående udforskning af den automatiserede installation og gøre brug af [Kubernetes Cluster API](https://cluster-api.sigs.k8s.io/).

{{% note "Fokusområder" %}}
Det, vi ønskede at illustrere i denne tekniske udforskning:

1. Hvad er Cluster API, og hvordan kommer man i gang
2. Hvordan man bruger Cluster API Provider OpenStack og Safespring Compute-infrastruktur til at installere en Talos Kubernetes-klynge
3. Anvende Cluster Resource Sets til at konfigurere ressourcer i en Talos Kubernetes-klynge

{{% /note %}}

## Hvad er Cluster API?

Efterhånden som Kubernetes er modnet, er behovet for standardiseret livscyklusstyring af infrastruktur blevet tydeligere. Projektet **Cluster API (CAPI)**, udviklet af Kubernetes SIG Cluster Lifecycle, adresserer dette behov. Det leverer en Kubernetes-lignende deklarativ API til at styre livscyklussen for Kubernetes-klynger—fra oprettelse, skalering, opgradering og sletning—på tværs af forskellige infrastrukturudbydere.

Kort sagt gør Cluster API det muligt at administrere hele Kubernetes-klynger, som du ville administrere applikationer med Kubernetes-manifester. Det afkobler infrastrukturklargøring fra arbejdsbelastningernes kerne­logik og standardiserer, hvordan Kubernetes-klynger oprettes og administreres på tværs af forskellige miljøer.

### Mød CAPO: Cluster API Provider OpenStack

**CAPO** står for **Cluster API Provider OpenStack**. Det er infrastrukturudbyder-implementeringen for Cluster API, som muliggør klargøring og styring af Kubernetes-klynger i **OpenStack**-skymiljøer.

Hvis du bruger OpenStack som din infrastrukturudbyder og ønsker at automatisere og standardisere livscyklusstyringen af Kubernetes-klynger, er CAPO værktøjet, du har brug for.

---

### Centrale komponenter

At bruge CAPO omfatter flere bevægelige dele:

1. **Management Cluster**: En Kubernetes-klynge, der kører Cluster API-controllere (inklusive CAPO). Den er ansvarlig for at styre livscyklussen for *mål*-Kubernetes-klynger.
2. [**Infrastructure Provider (CAPO)**](https://cluster-api-openstack.sigs.k8s.io/): Dette er controlleren, der forstår, hvordan man opretter og administrerer OpenStack-ressourcer (instanser, netværk, sikkerhedsgrupper osv.) baseret på Cluster API CRDs (Custom Resource Definitions).
3. **Custom Resource Definitions (CRDs)**: CAPO introducerer OpenStack-specifikke CRDs som `OpenStackCluster`, `OpenStackMachine` og `OpenStackClusterTemplate`, som gør det muligt deklarativt at definere den ønskede tilstand for din målklynge.
4. **Bootstrap Provider**: I vores use case bruger vi [Cluster API Bootstrap Provider Talos (CABPT)](https://github.com/siderolabs/cluster-api-bootstrap-provider-talos), som anvendes sammen med [Cluster API Control Plane Provider Talos (CACPPT) ](https://github.com/siderolabs/cluster-api-control-plane-provider-talos). Andre værktøjer som **kubeadm** bruges typisk til at bootstrappe Kubernetes-noder under oprettelse.
5. **ClusterResourceSet**: en deklarativ måde at knytte Kubernetes-ressourcer til en klynge på, der sikrer, at specifikke manifester anvendes automatisk, når en klynge klargøres med Cluster API.

## Kom godt i gang

Der er nogle forudsætninger for at kunne replikere trinnene, og vi går ikke i detaljer med opsætningen af en Talos Linux-klynge.

{{% note "Forudsætninger" %}}
- `kubectl`, `clusterctl`, `helm` 
- OpenStack-legitimationsoplysninger (inkluder også OpenStack ec2-legitimationsoplysninger til state s3-lager). Derudover anvender denne vejledning [Safespring Elastic IP](https://docs.safespring.com/new/elastic-ip/), så sørg for, at det er aktiveret.
   - Talos-image `1.10.3` tilgængeligt i OpenStack; se [tidligere artikel](/blogg/2025/2025-03-talos-linux-on-openstack/) for information om, hvordan det oprettes
{{% /note %}}

1. **Opsæt din management-klynge**: Dette kan være enhver Kubernetes-klynge, endda [`kind`](https://kind.sigs.k8s.io/), eller se hvordan vi opsatte en klynge i en [tidligere artikel](/blogg/2025/2025-03-talos-linux-on-openstack/).
2. **Installer Cluster API-komponenter** ved hjælp af [Cluster API CLI `clusterctl`](https://cluster-api.sigs.k8s.io/clusterctl/overview.html).
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
Efter en vellykket installation bør du kunne se følgende pods kørende:
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
Med det afrunder vi komponenterne i administrationsklyngen, nemlig:

- **Cluster API Core Manager**: Denne controller (*CAPI*) er ansvarlig for at orkestrere den overordnede livscyklus for Kubernetes-klynger. Den håndterer de centrale Cluster API‑ressourcer som `Cluster`, `Machine`, `MachineDeployment` og `MachineSet`, som definerer den ønskede tilstand for en Kubernetes‑klynge på en udbyder‑agnostisk måde. Disse kerneressourcer refererer til yderligere udbyderspecifikke ressourcer for at fuldende klyngekonfigurationen. Den faktiske infrastruktur- og bootstrap‑logik håndteres af separate provider‑komponenter.
- **Bootstrap Provider**: *Talos Bootstrap Provider (CABPT)* er ansvarlig for at generere maskinkonfigurationer skræddersyet til Talos Linux. Disse konfigurationer—indkapslet i TalosConfig‑tilpassede ressourcer—forbruges af Talos‑noder under initialiseringsprocessen. CABPT konverterer abstrakte `Machine`‑definitioner til Talos‑baserede Kubernetes‑noder, hvilket muliggør sikker og uforanderlig klynge‑bootstrap. I samspil med CABPT styrer *Talos Control Plane Provider (CACPPT)* hele livscyklussen for Talos‑baserede kontrolplan‑noder. Den bruger Talos‑API’er til at klargøre og konfigurere kontrolplanet i henhold til den ønskede tilstand defineret af Cluster API. CACPPT sikrer korrekt dannelse af etcd‑klynge, høj tilgængelighed og konsistent tilstand på tværs af kontrolplan‑noder.
- **Infrastructure Provider**: Infrastruktur‑provideren (*CAPO*) er ansvarlig for at klargøre den underliggende cloud‑ eller on‑prem‑infrastruktur—såsom virtuelle maskiner, netværk og storage—baseret på klyngespecifikationen. Den udnytter maskinkonfigurationen genereret af bootstrap‑provideren (dvs. `TalosConfigTemplate`) til at initialisere noder med korrekt rolle og konfiguration. Når de er klargjort, booter disse maskiner ind i Talos og tilslutter sig automatisk klyngen.


Se flere detaljer i [Cluster API‑bogen](https://cluster-api.sigs.k8s.io/user/concepts).

---

## Oprettelse af en workload‑klynge

{{% note "Bemærk" %}}
[Cluster API‑hurtigstartvejledningen](https://cluster-api.sigs.k8s.io/user/quick-start#create-your-first-workload-cluster) samt [SideroLabs’ Cluster API‑skabeloner](https://github.com/siderolabs/cluster-api-templates) giver et rigtig godt grundlag for at oprette og forstå den krævede konfiguration for en workload‑klynge; vi anbefaler at gennemgå dem.
{{% /note %}}

Vores strategi for at oprette en workload‑klynge omfatter først at oprette `ClusterResourceSet`s, som giver en mekanisme til automatisk at anvende et sæt ressourcer (såsom CNI/CSI/CCM) på workload‑klynger. `ClusterResourceSet`‑CRD’et giver en grundlæggende løsning til installation og håndtering af ressourcer, mens det for avancerede brugssager generelt anbefales at bruge en add‑on‑provider såsom [Cluster API Add‑on Provider Helm](https://github.com/kubernetes-sigs/cluster-api-addon-provider-helm).

Den anden del beskriver oprettelsen af YAML’en med de nødvendige Custom Resource Definitions (CRD), som er specifikke for *CAPI* og *CAPO*, men også for Talos Bootstrap‑ og Control Plane‑providerne.


### 1. Opret ClusterResourceSet‑ressourcer

I vores eksempel vil vi kun illustrere `ClusterResourceSet`, da [Cluster API Add‑on Provider Helm pr. udgivelsen af dette blogindlæg ikke er opdateret til version 1.10.0](https://github.com/kubernetes-sigs/cluster-api-addon-provider-helm/issues/371).

Først er det værd at være opmærksom på feltet `strategy`, som kan være enten `Reconcile` eller `ApplyOnce`. Forskellen er, at med `Reconcile`, når workload‑klyngerne er klar, forsøges det løbende at vedligeholde ressourcernes tilstand i workload‑klyngen, mens `ApplyOnce` kun synkroniserer én gang.

En anden vigtig del er labels, som gør det muligt at målrette installationen af `ClusterResourceSet` til en `Cluster`, hvis labelen er sat på den pågældende `Cluster`‑CRD.

Vi vil bruge navnerummet `safespring` til at oprette klyngen og gemme alle de nødvendige CRD’er til at oprette en workload‑klynge.

{{% note "Bemærk" %}}
Da `ClusterResourceSet` anvendes via labels, anbefaler vi, at de er navnerumsopdelte; ellers er der risiko for at opgradere alle klynger ved opdatering.
{{% /note %}}
```bash
kubectl create ns safespring
```
Som det første i klyngen konfigurerer vi Cinder CSI sammen med de nødvendige StorageClasses, så der er persistente volumener tilgængelige, når klyngen oprettes:
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
Vi vil også konfigurere Nginx Ingress samt Cert-manager med helm template for at generere den nødvendige YAML i en `ConfigMap`.
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
Med cert-manager vil vi også oprette en `ClusterIssuer` for at gøre det nemmere at anmode om certifikater.
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
### 2. Opret maskinskabeloner og klyngens brugerdefinerede ressourcer
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
For at `cloud-config` kan bruges som `kind: Secret` i en `ClusterResourceSet`, skal den gemmes som en Kubernetes Secret; derfor vil vi bruge `--dry-run=client` til at oprette YAML'en.
```bash
kubectl create secret generic safespring-demo-cloud-config --from-file=clouds.yaml='clouds.yaml' --from-literal=cacert="" -n safespring

kubectl label secret -n safespring safespring-demo-cloud-config clusterctl.cluster.x-k8s.io/move=true

# https://cluster-api-openstack.sigs.k8s.io/clusteropenstack/configuration.html
#  Set clusterctl.cluster.x-k8s.io/move label for the secret created from OPENSTACK_CLOUD_YAML_B64 in order to successfully move objects from bootstrap cluster to target cluster. 
```
For mere information om at få applikationslegitimationsoplysninger kan du se vores dokumentation om, hvordan du [opretter applikationslegitimationsoplysninger](https://docs.safespring.com/new/app-creds/#creating-application-credentials-using-the-dashboard).
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
Til denne vejledning skal vi bruge to [elastiske IP'er](https://docs.safespring.com/new/elastic-ip/). Bemærk samtidig, at installationen af Cilium CNI udføres via `inlineManifests` med flaget `bgpControlPlane.enabled=true`, så [BGP-peeringpolitik](https://docs.cilium.io/en/latest/network/bgp-control-plane/bgp-control-plane-v1/) aktiveres.

{{% note "Bemærk" %}}
På længere sigt anbefaler vi at migrere til [BGP Control Plane-ressourcer](https://docs.cilium.io/en/stable/network/bgp-control-plane/bgp-control-plane-v2/).
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
Nu til selve klyngespecifikationen: Bemærk, at vi for denne klynge anvender ét label `cloud=openstack` som standard, for at eksemplificere den anden `ClusterResourceSet` efter at klyngen er blevet installeret.
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
Gem ovenstående konfiguration og anvend den med `kubectl apply -f adjusted-cluster-config.yaml`.

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
{{% note "Bemærk" %}}
Vi vil bruge etiketter til at demonstrere, hvordan `ClusterResourceSet` anvendes på **alle klyngerne** i det pågældende namespace, som har disse etiketter.
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
Opret et vedvarende volumen:
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

## Konklusion – hvorfor bruge Cluster API med CAPO?

**Deklarativ livscyklusadministration**: Definér klyngens tilstand i YAML-manifester og anvend ændringer over tid efter behov—ligesom du gør med pods og services.

**Cloud-agnostisk**: CAPI med CAPO abstraherer håndteringen af klyngens livscyklus. Hvis du senere flytter til en anden cloud, kan du skifte infrastrukturudbyder (fx AWS, Azure) med minimale ændringer i din arbejdsgang.

**Konsistent automatisering**: Undgå håndlavede automatiseringsscripts, og benyt community-testede controllere og API'er, der sikrer pålidelig oprettelse og opgradering af klynger.

**Avancerede funktioner**: CAPO understøtter en række OpenStack-funktioner såsom: *Flere tilgængelighedszoner*, *understøttelse af brugerdefinerede images og flavors*, *Cinder-baseret lagring*, *Floating IP'er til kontrolplaner og worker-noder* (hvis OpenStack-installationen tillader det) samt [autoskalering](https://cluster-api.sigs.k8s.io/tasks/automated-machine-management/autoscaling).


{{% note "Kunne du lide det, du lige læste?" %}}
Lyder det som et godt match til dine behov?
Tøv ikke med at kontakte os, hvis du har spørgsmål, på hello@safespring.com.
{{% /note %}}