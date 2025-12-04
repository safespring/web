---
ai: true
title: "Distribuera Talos Kubernetes i OpenStack med hjälp av Cluster API"
date: 2025-06-12
intro: "Att använda Cluster API för att skapa Talos-baserade Kubernetes-kluster på OpenStack."
draft: false
tags: ["English"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "sv"
sectiontext: "Teknikuppdatering"
section: "Teknikuppdatering"
author: "Stefan Negru"
TOC: "I det här inlägget"
aliases:
  - /blogg/2025/2025-04-validating-talos-linux-intstall/
---
# 

{{< ingress >}}
En steg-för-steg-guide för att deklarativt etablera, konfigurera och hantera Talos Linux Kubernetes-kluster på Safesprings OpenStack-infrastruktur med hjälp av CAPO och ClusterResourceSets.
{{< /ingress >}}

I den här artikeln tar vi vår utforskning av Talos Linux några steg vidare och hur vi kan använda det i [Safesprings Compute-infrastruktur (OpenStack)](/services/compute/), samtidigt som vi fördjupar oss i att automatisera installationen och använda [Kubernetes Cluster API](https://cluster-api.sigs.k8s.io/).

{{% note "Fokusområden" %}}
Saker vi ville illustrera i den här tekniska genomgången:

1. Vad är Cluster API och hur kommer man igång
2. Hur man använder Cluster API Provider OpenStack och Safesprings Compute-infrastruktur för att installera ett Talos Kubernetes-kluster
3. Hur man använder ClusterResourceSets för att konfigurera resurser i ett Talos Kubernetes-kluster

{{% /note %}}

## Vad är Cluster API?

I takt med att Kubernetes har mognat har behovet av standardiserad livscykelhantering för infrastruktur blivit tydligare. Projektet **Cluster API (CAPI)**, utvecklat av Kubernetes SIG Cluster Lifecycle, adresserar detta behov. Det tillhandahåller ett Kubernetes-stilat deklarativt API för att hantera livscykeln för Kubernetes-kluster, från skapande, skalning och uppgradering till borttagning, över olika infrastrukturleverantörer.

I korthet låter Cluster API dig hantera hela Kubernetes-kluster ungefär som du hanterar applikationer med Kubernetes-manifest. Det frikopplar infrastrukturetablering från kärnlogiken i dina arbetslaster och standardiserar hur Kubernetes-kluster skapas och hanteras i olika miljöer.

### Här kommer CAPO in i bilden: Cluster API Provider OpenStack

**CAPO** står för **Cluster API Provider OpenStack**. Det är infrastrukturleverantören för Cluster API som möjliggör etablering och hantering av Kubernetes-kluster i **OpenStack**-molnmiljöer.

Om du använder OpenStack som din infrastruktur och vill automatisera och standardisera livscykelhanteringen av Kubernetes-kluster är CAPO verktyget du behöver.

---

### Nyckelkomponenter

Att använda CAPO innebär flera rörliga delar:

1. **Management-kluster**: Ett Kubernetes-kluster som kör Cluster API-kontroller (inklusive CAPO). Det ansvarar för att hantera livscykeln för *mål*-Kuberneteskluster.
2. [**Infrastrukturleverantör (CAPO)**](https://cluster-api-openstack.sigs.k8s.io/): Detta är kontrollern som förstår hur man skapar och hanterar OpenStack-resurser (instanser, nätverk, säkerhetsgrupper osv.) baserat på Cluster API:s CRDs (Custom Resource Definitions).
3. **Custom Resource Definitions (CRDs)**: CAPO introducerar OpenStack-specifika CRDs som `OpenStackCluster`, `OpenStackMachine` och `OpenStackClusterTemplate`, vilka låter dig deklarativt definiera ditt målklusters önskade tillstånd.
4. **Bootstrap-leverantör**: För vårt användningsfall använder vi [Cluster API Bootstrap Provider Talos (CABPT)](https://github.com/siderolabs/cluster-api-bootstrap-provider-talos) tillsammans med [Cluster API Control Plane Provider Talos (CACPPT) ](https://github.com/siderolabs/cluster-api-control-plane-provider-talos). Andra verktyg som **kubeadm** används typiskt för att bootstrap:a Kubernetes-noder under skapandet.
5. **ClusterResourceSet**: ett deklarativt sätt att koppla Kubernetes-resurser till ett kluster, så att specifika manifest appliceras automatiskt när ett kluster etableras med Cluster API.


## Kom igång

Det finns några förutsättningar för att kunna replikera stegen, och vi går inte in i detalj på installation av Talos Linux-kluster.

{{% note "Förutsättningar" %}}
- `kubectl`, `clusterctl`, `helm` 
- OpenStack-uppgifter (inkludera även OpenStack ec2-uppgifter för S3-butik av state), dessutom använder den här guiden [Safespring Elastic IP](https://docs.safespring.com/new/elastic-ip/) så se till att det är aktiverat.
   - Talos-avbild `1.10.3` finns i OpenStack, se [tidigare artikel](/blogg/2025/2025-03-talos-linux-on-openstack/) för information om hur man skapar den
{{% /note %}}

1. **Sätt upp ditt management-kluster**: Detta kan vara vilket Kubernetes-kluster som helst, till och med [`kind`](https://kind.sigs.k8s.io/), eller se hur vi satte upp ett kluster i en [tidigare artikel](/blogg/2025/2025-03-talos-linux-on-openstack/).
2. **Installera Cluster API-komponenter** med [Cluster API CLI `clusterctl`](https://cluster-api.sigs.k8s.io/clusterctl/overview.html).
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
Efter en lyckad installation bör du kunna se att följande pods körs:
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
Därmed avslutar vi genomgången av komponenterna i management-klustret, nämligen:

- **Cluster API Core Manager**: Denna controller (*CAPI*) ansvarar för att orkestrera den övergripande livscykeln för Kubernetes-kluster. Den hanterar kärnresurserna i Cluster API såsom `Cluster`, `Machine`, `MachineDeployment` och `MachineSet`, vilka definierar det önskade tillståndet för ett Kubernetes-kluster på ett leverantörsneutralt sätt. Dessa kärnresurser refererar till ytterligare leverantörsspecifika resurser för att färdigställa klusterkonfigurationen. Den faktiska infrastrukturen och bootstrap-logiken hanteras av separata provider-komponenter.
- **Bootstrap Provider**: *Talos Bootstrap Provider (CABPT)* ansvarar för att generera maskinkonfigurationer anpassade för Talos Linux. Dessa konfigurationer, inkapslade i anpassade resurser av typen TalosConfig, konsumeras av Talos-noder under initieringsprocessen. CABPT omvandlar abstrakta `Machine`-definitioner till Talos-baserade Kubernetes-noder och möjliggör säker och oföränderlig bootstrap av klustret. I samarbete med CABPT hanterar *Talos Control Plane Provider (CACPPT)* hela livscykeln för Talos-baserade kontrollplansnoder. Den använder Talos API:er för att etablera och konfigurera kontrollplanet enligt det önskade tillstånd som definieras av Cluster API. CACPPT säkerställer korrekt etcd-klusterbildning, hög tillgänglighet och konsekvent tillstånd över kontrollplansnoder.
- **Infrastructure Provider**: Infrastrukturprovidern (*CAPO*) ansvarar för att provisionera den underliggande moln- eller on-prem-infrastrukturen, såsom virtuella maskiner, nätverk och lagring, baserat på klusterspecifikationen. Den utnyttjar maskinkonfigurationen som genereras av bootstrap-providern (dvs. `TalosConfigTemplate`) för att initiera noder med korrekt roll och konfiguration. När de väl är provisionerade startar dessa maskiner in i Talos och går automatiskt med i klustret.

Läs mer i [Cluster API-boken](https://cluster-api.sigs.k8s.io/user/concepts).

---

## Skapa ett Workload-kluster

{{% note "Observera" %}}
[Cluster API Snabbstartsguide](https://cluster-api.sigs.k8s.io/user/quick-start#create-your-first-workload-cluster) samt [SideroLabs Cluster API-mallar](https://github.com/siderolabs/cluster-api-templates) ger en mycket bra grund för att skapa och förstå den konfiguration som krävs för ett workload-kluster; vi rekommenderar att du går igenom dem.
{{% /note %}}

Vår strategi för att skapa ett Workload-kluster innefattar först att skapa `ClusterResourceSet`s som tillhandahåller mekanismen för att automatiskt applicera en uppsättning resurser (såsom CNI/CSI/CCM) på workload-kluster. `ClusterResourceSet`-CRD ger en grundläggande lösning för installation och hantering av resurser, medan den allmänna rekommendationen för avancerade användningsfall är att använda en addon-provider, såsom [Cluster API Add-on Provider Helm](https://github.com/kubernetes-sigs/cluster-api-addon-provider-helm).

Den andra delen beskriver hur man skapar YAML med de nödvändiga Custom Resource Definitions (CRD) specifika för *CAPI* och *CAPO*, men även för Talos Bootstrap- och Control Plane-providers.

### 1. Skapa ClusterResourceSet-resurser

I vårt exempel kommer vi bara att illustrera `ClusterResourceSet`, eftersom [Cluster API Add-on Provider Helm vid tidpunkten för publiceringen av detta blogginlägg inte är uppdaterad för version 1.10.0](https://github.com/kubernetes-sigs/cluster-api-addon-provider-helm/issues/371).

Det första att påpeka är att det är bra att känna till fältet `strategy`, som kan vara antingen `Reconcile` eller `ApplyOnce`. Skillnaden är att med `Reconcile`, när workload-klustren är redo, försöker man fortlöpande upprätthålla resursers tillstånd i workload-klustret, medan `ApplyOnce` bara synkroniserar en gång.

En annan viktig del är etiketterna (labels) som gör det möjligt att rikta installationen av `ClusterResourceSet` till ett `Cluster` om etiketten är satt på den `Cluster`-resursen.

Vi kommer att använda namnområdet `safespring` för att skapa klustret och lagra alla nödvändiga CRD:er för att skapa ett Workload-kluster.

{{% note "Observera" %}}
Eftersom `ClusterResourceSet` tillämpas via etiketter rekommenderar vi att de är namnrymdsindelade; annars finns risk att alla kluster uppgraderas när de uppdateras.
{{% /note %}}
```bash
kubectl create ns safespring
```
Som det första steget i klustret kommer vi att konfigurera Cinder CSI tillsammans med de nödvändiga lagringsklasserna så att vi har persistenta volymer tillgängliga när klustret skapas:
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
Vi kommer också att konfigurera Nginx Ingress samt Cert-manager med helm template för att generera nödvändig YAML i en `ConfigMap`.
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
Med cert-manager kommer vi också att skapa en `ClusterIssuer` för att göra det enklare att begära certifikat.
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
### 2. Skapa maskinmallar och anpassade klusterresurser
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
För att `cloud-config` ska kunna användas som `kind: Secret` i en `ClusterResourceSet` måste den lagras som en Kubernetes-hemlighet, därför kommer vi att använda `--dry-run=client` för att skapa YAML-manifestet.
```bash
kubectl create secret generic safespring-demo-cloud-config --from-file=clouds.yaml='clouds.yaml' --from-literal=cacert="" -n safespring

kubectl label secret -n safespring safespring-demo-cloud-config clusterctl.cluster.x-k8s.io/move=true

# https://cluster-api-openstack.sigs.k8s.io/clusteropenstack/configuration.html
#  Set clusterctl.cluster.x-k8s.io/move label for the secret created from OPENSTACK_CLOUD_YAML_B64 in order to successfully move objects from bootstrap cluster to target cluster. 
```
För mer information om hur du skaffar autentiseringsuppgifter för applikationer, se vår dokumentation om hur du [skapar autentiseringsuppgifter för applikationer](https://docs.safespring.com/new/app-creds/#creating-application-credentials-using-the-dashboard).
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
För den här guiden behöver vi två [elastiska IP-adresser](https://docs.safespring.com/new/elastic-ip/). Observera också att installationen av Cilium CNI görs via `inlineManifests` med flaggan `bgpControlPlane.enabled=true` så att [policy för BGP-peering](https://docs.cilium.io/en/latest/network/bgp-control-plane/bgp-control-plane-v1/) aktiveras.

{{% note "Observera" %}}
På längre sikt rekommenderar vi att migrera till [resurser för BGP-kontrollplanet](https://docs.cilium.io/en/stable/network/bgp-control-plane/bgp-control-plane-v2/).
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
Nu till den faktiska klusterspecifikationen: observera att vi för det här klustret som standard sätter etiketten `cloud=openstack`, för att exemplifiera den andra `ClusterResourceSet` efter att klustret har installerats.
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
Spara konfigurationen ovan och tillämpa den med `kubectl apply -f adjusted-cluster-config.yaml`.

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
{{% note "Observera" %}}
Vi kommer att använda etiketter för att demonstrera hur `ClusterResourceSet` tillämpas på **alla kluster** i den namnrymden som har dessa etiketter.
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
Skapa en persistent volym:
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

## Slutsats – varför använda Cluster API med CAPO?

**Deklarativ livscykelhantering**: Definiera klustrets tillstånd i YAML‑manifest och tillämpa ändringar över tid efter behov, precis som du gör med poddar och tjänster.

**Molnagnostisk**: Att använda CAPI med CAPO abstraherar klustrets livscykeloperationer. Om du senare flyttar till ett annat moln kan du byta infrastrukturleverantör (t.ex. AWS, Azure) med minimala förändringar i ditt arbetsflöde.

**Enhetlig automation**: Undvik handgjorda automationsskript och använd community-testade kontroller och API:er som säkerställer tillförlitlig klusterprovisionering och uppgraderingar.

**Avancerade funktioner**: CAPO stöder en rad OpenStack-funktioner, såsom: *flera tillgänglighetszoner*, *stöd för anpassade images och flavors*, *Cinder-baserad lagring*, *flytande IP-adresser för kontrollplaner och arbetsnoder* (om OpenStack-installationen tillåter det) samt [autoskalning](https://cluster-api.sigs.k8s.io/tasks/automated-machine-management/autoscaling).


{{% note "Gillade du det du just läste?" %}}
Låter det här som en bra lösning för dina behov?
Tveka inte att höra av dig om du har några frågor på hello@safespring.com.
{{% /note %}}