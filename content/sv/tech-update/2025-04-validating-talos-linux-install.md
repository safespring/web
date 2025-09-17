---
ai: true
title: "Validering av installations- och underhållsåtgärder för Talos Linux"
date: 2025-04-09
intro: "Ett lättillgängligt angreppssätt för drift på en Kubernetes-plattform utgör ett attraktivt alternativ för PaaS-operatörer."
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
I en [tidigare artikel](/blogg/2025/2025-03-talos-linux-on-openstack/) började vi utforska Talos Linux, vad det kan innebära för oss och hur vi kan automatisera installationen på Safespring OpenStack. Nu vill vi gå några steg längre i vår undersökning och bekräfta ytterligare två aspekter:

1. Validera att Kubernetes-klustret och underliggande CNI installerats korrekt.
2. Uppgradera både operativsystemet och Kubernetes-versionen.

Båda dessa delar syftar till att stärka våra automationsinsatser och ge trygghet i vår förmåga att leverera en robust Kubernetes-plattform.

Även om vår erfarenhet av Talos Linux-klustret har varit smidig stötte vi på några hinder som vi beskriver i den här artikeln, i syfte att ge uppmuntran och vägledning kring hur du kan övervinna dem i din miljö.

{{% note "Förutsättningar" %}}
Det finns några förutsättningar för att kunna återskapa stegen, och vi går inte in på detaljer kring hur man sätter upp ett Talos Linux-kluster:
- Talos Linux CLI:t `talosctl`.
- Kubernetes kommandoradsverktyg `kubectl`.
- Podman/Docker.
- OpenStack-autentiseringsuppgifter (inkludera även OpenStack EC2-uppgifter för S3-lagring av state).
- Talos-kluster provisionerat med [Cilium CNI](https://www.talos.dev/v1.9/kubernetes-guides/network/deploying-cilium/) samt [Cinder CSI](/blogg/2024/2024-03-cinder-csi-volume-provisioner/).
{{% /note %}}

Vidare till de praktiska stegen:

## Skapa en containeravbild

Eftersom vi vill testa klusterinstallationen behöver vi köra de kommandoradsverktyg som krävs för att validera klustret i en container. För detta ändamål har vi förberett `Dockerfile-talos` nedan, som vi behöver bygga och pusha till ett containerregister.

Skapa alltså en fil med namnet `Dockerfile-talos` med följande innehåll:```dockerfile
FROM docker.io/alpine:3

RUN apk add --no-cache bash wget tar curl linux-headers openssl

RUN wget https://github.com/stedolan/jq/releases/download/jq-1.7.1/jq-linux64 && \
    wget https://github.com/jqlang/jq/releases/download/jq-1.7.1/sha256sum.txt && \
    grep jq-linux64 sha256sum.txt | cut -d ' ' -f 1 > jq-linux64.sha256 && \
    echo "$(cat jq-linux64.sha256)  jq-linux64" | sha256sum -c && \
    mv jq-linux64 /usr/bin/jq && \
    rm sha256sum.txt && \
    chmod +x /usr/bin/jq 

RUN curl -sL https://talos.dev/install | sh

RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256" && \
    echo "$(cat kubectl.sha256)  kubectl" | sha256sum -c && \
    mv kubectl /usr/local/bin/kubectl && \
    chmod +x /usr/local/bin/kubectl && \
    rm kubectl.sha256

RUN CILIUM_CLI_VERSION=$(curl -s https://raw.githubusercontent.com/cilium/cilium-cli/main/stable.txt) && \
    CLI_ARCH=amd64 && \
    curl -L --fail --remote-name-all https://github.com/cilium/cilium-cli/releases/download/${CILIUM_CLI_VERSION}/cilium-linux-${CLI_ARCH}.tar.gz{,.sha256sum} && \
    sha256sum -c cilium-linux-${CLI_ARCH}.tar.gz.sha256sum && \
    tar xzvfC cilium-linux-${CLI_ARCH}.tar.gz /usr/local/bin && \
    rm cilium-linux-${CLI_ARCH}.tar.gz cilium-linux-${CLI_ARCH}.tar.gz.sha256sum

RUN kubectl version --client && \
    cilium version --client && \
    talosctl version --client

RUN apk add --update ca-certificates

```
Bygga och pusha till ett register, t.ex. `docker.io`:```bash
# substitute docker.io/blankdots/talosctl:minimal with your own registry 
podman build -t docker.io/blankdots/talosctl:minimal -f Dockerfile-talos --no-cache
podman push docker.io/blankdots/talosctl:minimal
```
## Skapa ett valideringsjobb

För att kunna validera klustret via ett jobb som körs inuti vårt nyskapade Talos-kluster behöver vi både ett [Tjänstkonto](https://kubernetes.io/docs/concepts/security/service-accounts/) med behörighet till rätt Kubernetes API-resurser samt ett [Talos-tjänstkonto](https://www.talos.dev/v1.9/advanced/talos-api-access-from-k8s/).

Innan dess skapar vi ett namespace där vi ska göra vår valideringskontroll:```bash
kubectl create ns safespring
```
### Ställa in åtkomst till Kubernetes API-resurser

Säkerställ att Talos Service Account är aktiverat antingen genom att redigera maskinkonfigurationen direkt och lägga till:```yaml
machine:
  features:
    rbac: true
    kubernetesTalosAPIAccess:
      enabled: true
      allowedRoles:
        - os:reader
      allowedKubernetesNamespaces:
        - safespring
        - kube-system
```
Maskinen kan redigeras med:```bash
talosctl --talosconfig .talos/talosconfig edit mc --nodes 10.5.0.2
```
Maskinen kan patchas med:```bash
talosctl --talosconfig .talos/talosconfig --nodes 10.5.0.2 patch mc --patch @patch-rbac.json
```
Där `patch-rbac.json` har följande innehåll:```json
[
  {"op": "add", "path": "/machine/features/rbac", "value": true},
  {"op": "add", "path": "/machine/features/kubernetesTalosAPIAccess", "value": {"enabled": true}},
  {"op": "add", "path": "/machine/features/kubernetesTalosAPIAccess/allowedRoles", "value": ["os:reader"]},
  {"op": "add", "path": "/machine/features/kubernetesTalosAPIAccess/allowedKubernetesNamespaces", "value": ["kube-system", "safespring"]}
]
```
Härnäst introducerar vi tjänstkonton och roller:```bash
kubectl apply -f service-account.yaml
```
Där `service-account.yaml` har följande innehåll:```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: validate-install
  namespace: safespring
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: validate-install
  namespace: safespring
rules:
  - apiGroups: [""]
    resources: ["namespaces", "pods", "configmaps", "nodes"]
    verbs: ["get", "list"]
  - apiGroups: [""]
    resources: ["pods/exec"]
    verbs: ["create", "delete", "get", "list", "patch", "update", "watch"]
  - apiGroups: ["apps"]
    resources: ["daemonsets", "deployments"]
    verbs: ["get", "list", "watch"]
  - apiGroups: ["batch"]
    resources: ["jobs"]
    verbs: ["get", "list", "watch"]
  - apiGroups: [""]
    resources: ["persistentvolumeclaims"]
    verbs: ["get", "list", "create", "delete", "watch"]
  - apiGroups:
      - cilium.io
    resources:
      - ciliumnodes
      - ciliumnodes/status
      - ciliumendpoints
    verbs:
      - get
      - list
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: validate-install # This will bind the role and service account
subjects:
  - kind: ServiceAccount
    name: validate-install
    namespace: safespring
roleRef:
  kind: ClusterRole
  name: validate-install
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: talos.dev/v1alpha1
kind: ServiceAccount
metadata:
  name: validate-install-job-talos-secrets
  namespace: safespring
spec:
  roles:
    - os:reader
```
### Skript för att validera installationen

Låt oss skapa ett skript som hjälper oss att validera viktiga delar av Talos-installationen, nämligen CNI, CSI samt Talos API. Skriptet nedan, `validate.sh`, innehåller dessa delar.

I koden nedan, notera namnet på lagringsklassen, `fast`; detta behöver anpassas till dina egna lagringsklasser. För att visa lagringsklasser, använd:```bash
➜ kubectl get storageclass -o custom-columns=Name:.metadata.name,Provisoner:.provisioner
Name    Provisoner
fast    cinder.csi.openstack.org
large   cinder.csi.openstack.org
```

```bash
#!/usr/bin/env bash

echo "==============="
echo "Validate Cilium installed"
echo "==============="

# wait for job completion
kubectl wait --for=condition=complete --timeout=30s -n kube-system job/cilium-install 

# check cilium install job complete
cilium_job=$(kubectl get job -n kube-system cilium-install -o jsonpath={.status.succeeded})

if [ "${cilium_job}" -eq 1 ]; then
  echo "Cilium job succeeded"
else
  echo "Cilium failed to install"
  exit 1
fi

# check we have more that 1 pod running in case of cilium
cilium_running=$(kubectl -n kube-system get pods -l k8s-app=cilium --field-selector=status.phase==Running --output json | jq -j '.items | length')

if [ "${cilium_running}" -gt 0 ]; then
  echo "Cilium running"
else
  echo "Cilium failed to run"
  exit 1
fi

# view cilium status
cilium status

echo "==============="
echo "Validate internet connection"
echo "==============="

curl -Is http://www.google.com | head -1 | grep 200

if [ $? -eq 0 ]; then     
  echo "Connectivity to internet is ok"   
else
  echo "DNS doesn't seem to work"
  exit 1  
fi

echo "==============="
echo "Validate Cinder CSI configured"
echo "==============="

# check cinder csi pods running
cinder_containers=$(kubectl get pods -n kube-system -l app=csi-cinder-controllerplugin --output json | jq -j '.items[].spec.containers | length')

if [ "${cinder_containers}" -eq 6  ]; then
  echo "Cinder CSI running ok"   
else
  echo "Cinder does not have all pods running"
  exit 1
fi

kubectl apply -f - <<EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: csi-pvc-test
  namespace: safespring
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: fast
EOF

echo "waiting to create volume 30 sec..."
sleep 30

pvc_status=$(kubectl get pvc -n safespring csi-pvc-test -o jsonpath={.status.phase})

if [ "${pvc_status}" == "Bound"  ]; then
  echo "PVC can be created" 
  kubectl delete pvc -n safespring csi-pvc-test
else
  echo "PVC has not been created"
  kubectl -n safespring get pvc -o custom-columns=Name:.metadata.name,Status:.status.phase,Volume:.spec.volumeName
  exit 1
fi

echo "==============="
echo "Validate Talos API connectivity"
echo "==============="

# check talosctl can reach talos API
control_plane_ip=$(kubectl get nodes --selector=node-role.kubernetes.io/control-plane -o jsonpath='{$.items[*].status.addresses[?(@.type=="InternalIP")].address}')
talos_context=$(talosctl --talosconfig /var/run/secrets/talos.dev/config -n "$control_plane_ip" config info -o json | jq -r '.context')


if [ "${talos_context}" == "default" ]; then
  echo "talosctl verified" 
  talosctl --talosconfig /var/run/secrets/talos.dev/config -n "$control_plane_ip" version
else
  echo "talos API connection problematic"
  exit 1
fi
```
Härnäst lägger vi till skriptet som en ConfigMap för att använda i jobbet:```bash
kubectl create configmap -n safespring validate-script --from-file=validate.sh
```
Eftersom skriptet kräver förhöjda behörigheter måste vi åsidosätta Pod Security Standards på namnrymdsnivå för namnrymden `safespring`.```bash
kubectl label --overwrite ns safespring pod-security.kubernetes.io/audit=privileged pod-security.kubernetes.io/warn=privileged
```
### Skapa jobbet```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: validate-install-job
  namespace: safespring
spec:
  template:
    metadata:
      labels:
        name: validate-job
    spec:
      containers:
        - args:
            - /bin/bash
            - -c
            - /configmap/validate.sh
          # consider change the image to one set up in your registry
          image: docker.io/blankdots/talosctl:minimal
          name: validate-job
          resources: {}
          volumeMounts:
            - mountPath: /configmap
              name: configmap
            - mountPath: /var/run/secrets/talos.dev
              name: talos-secrets
      restartPolicy: Never
      serviceAccountName: validate-install
      volumes:
        - configMap:
            defaultMode: 511
            name: validate-script
          name: configmap
        - name: talos-secrets
          secret:
            secretName: validate-install-job-talos-secrets
```
Du kan se resultaten av jobbet:```bash
➜ kubectl apply -f job.yaml                                                     
job.batch/validate-install-job created

➜ kubectl get pods -n safespring 
NAME                         READY   STATUS      RESTARTS   AGE
validate-install-job-n2kkx   0/1     Completed   0          6s

➜ kubectl logs -f -n safespring validate-install-job-n2kkx 
===============
Validate Cilium installed
===============
job.batch/cilium-install condition met
Cilium job succeeded
Cilium running
    /¯¯\
 /¯¯\__/¯¯\    Cilium:             OK
 \__/¯¯\__/    Operator:           OK
 /¯¯\__/¯¯\    Envoy DaemonSet:    OK
 \__/¯¯\__/    Hubble Relay:       disabled
    \__/       ClusterMesh:        disabled

DaemonSet              cilium                   Desired: 2, Ready: 2/2, Available: 2/2
DaemonSet              cilium-envoy             Desired: 2, Ready: 2/2, Available: 2/2
Deployment             cilium-operator          Desired: 1, Ready: 1/1, Available: 1/1
Containers:            cilium                   Running: 2
                       cilium-envoy             Running: 2
                       cilium-operator          Running: 1
                       clustermesh-apiserver    
                       hubble-relay             
Cluster Pods:          3/3 managed by Cilium
Helm chart version:    
Image versions         cilium             quay.io/cilium/cilium:v1.17.2@sha256:3c4c9932b5d8368619cb922a497ff2ebc8def5f41c18e410bcc84025fcd385b1: 2
                       cilium-envoy       quay.io/cilium/cilium-envoy:v1.31.5-1741765102-efed3defcc70ab5b263a0fc44c93d316b846a211@sha256:377c78c13d2731f3720f931721ee309159e782d882251709cb0fac3b42c03f4b: 2
                       cilium-operator    quay.io/cilium/operator-generic:v1.17.2@sha256:81f2d7198366e8dec2903a3a8361e4c68d47d19c68a0d42f0b7b6e3f0523f249: 1
===============
Validate internet connection
===============
HTTP/1.1 200 OK
Connectivity to internet is ok
===============
Validate Cinder CSI configured
===============
Cinder CSI running ok
persistentvolumeclaim/csi-pvc-test created
waiting to create volume 30 sec...
PVC can be created
persistentvolumeclaim "csi-pvc-test" deleted
===============
Validate Talos API connectivity
===============
talosctl verified
Client:
  Tag:         v1.9.5
  SHA:         d07f6daa
  Built:       
  Go version:  go1.23.7
  OS/Arch:     linux/amd64
Server:
  NODE:        10.5.0.2
  Tag:         v1.9.5
  SHA:         d07f6daa
  Built:       
  Go version:  go1.23.7
  OS/Arch:     linux/amd64
  Enabled:     RBAC

```
## Uppgradera ett Talos-kluster

Att uppgradera ett Talos-kluster är ganska enkelt om man följer instruktionerna, med några små hinder, särskilt vad gäller Kubernetes-versionerna.

### Uppgradera Talos Linux

Att följa [instruktionerna för att uppgradera Talos Linux](https://www.talos.dev/v1.9/talos-guides/upgrading-talos/#talosctl-upgrade) är lika enkelt som att köra kommandot `talosctl upgrade`.```bash
talosctl --talosconfig .talos/talosconfig upgrade --image ghcr.io/siderolabs/installer:v1.9.5
# add --nodes <node> to target a specific node
```
### Uppgradera Talos Kubernetes-versionen

Att uppgradera Kubernetes-versionen är [enkelt om du följer instruktionerna](https://www.talos.dev/v1.9/kubernetes-guides/upgrading-kubernetes/), men i vårt fall installerade vi Cilium CNI med ett jobb, vilket innebär en utmaning vid uppgradering.

Vårt demokluster kör version `1.31.5` av Kubernetes och vi vill uppgradera till `1.32.3`:```bash
➜ kubectl get nodes        
NAME                              STATUS   ROLES           AGE   VERSION
dev-taloscluster-controlplane-1   Ready    control-plane   57m   v1.31.5
dev-taloscluster-worker-1         Ready    <none>          57m   v1.31.5
```
Låt oss prova kommandot upgrade:```bash
# we try to run the upgrade with dry-run to see if it possible
➜ talosctl --talosconfig .talos/talosconfig --nodes 10.5.0.2 upgrade-k8s --to 1.32.3 --dry-run
automatically detected the lowest Kubernetes version 1.31.5
discovered controlplane nodes ["10.5.0.2"]
discovered worker nodes ["10.5.0.3"]
checking for removed Kubernetes component flags
checking for removed Kubernetes API resource versions
 > "10.5.0.2": pre-pulling registry.k8s.io/kube-apiserver:v1.32.3
 > "10.5.0.2": pre-pulling registry.k8s.io/kube-controller-manager:v1.32.3
 > "10.5.0.2": pre-pulling registry.k8s.io/kube-scheduler:v1.32.3
 > "10.5.0.2": pre-pulling ghcr.io/siderolabs/kubelet:v1.32.3
 > "10.5.0.3": pre-pulling ghcr.io/siderolabs/kubelet:v1.32.3
updating "kube-apiserver" to version "1.32.3"
<snip>
1 error(s) occurred:
  Job.batch "cilium-install" is invalid: <snip>.... field is immutable]

```
Vi noterar att Job-resursen som vi har använt i `inlineManifest` försvårar uppgraderingen; en enkel lösning är att redigera Talos-konfigurationen och ta bort den problematiska sektionen.```bash
talosctl --talosconfig talosconfig --nodes 10.5.0.2 patch mc --patch @remove-inlinemanifests.json
```
där `remove-inlinemanifests.json` innehåller```json
[
  {
    "op": "remove",
    "path": "/cluster/inlineManifests"
  }
]
```
Ett alternativ till den här lösningen vore att använda [`extraManifests`](https://www.talos.dev/v1.9/reference/configuration/v1alpha1/config/#Config.cluster) enligt beskrivningen i [Talos Helm-installation av Cilium](https://www.talos.dev/v1.9/kubernetes-guides/network/deploying-cilium/#method-1-helm-install), men URL:erna måste antingen vara publika eller nås via basic auth, t.ex. `https://username:password@url`.

## Felsökning

Några saker att tänka på vid installation av Cilium CNI:

- Aktivera `bpf.hostLegacyRouting=true` för att Cilium ska fungera med Talos Linux, enligt den officiella [Cilium-dokumentationen](https://docs.cilium.io/en/stable/installation/k8s-install-helm/#install-cilium).
- En av anledningarna till att vi behövde validera internetanslutningen var att få Ciliums DNS att fungera; det verkar finnas ett problem med version `1.6.5`, se [denna kommentar](https://github.com/cilium/cilium/issues/36761#issuecomment-2560353729) och [ärende 66](https://github.com/isejalabs/homelab/issues/66): 
  - "Cilium now uses BPF Host Routing in `1.16.5`, which is conflicting with `forwardKubeDNSToHost` in Talos. Setting `bpf.hostLegacyRouting=true` in your Cilium reverts to the behaviour used in `1.16.4` and earlier. This eliminates the need for disabling `forwardKubeDNSToHost` in Talos".

## Slutsats: Drift med Talos Linux

Talos Linux erbjuder ett lättillgängligt sätt att drifta Kubernetes-infrastruktur och bekräftar vår tidigare slutsats om Talos löfte att leverera en säker, oföränderlig och driftseffektiv grund för modern infrastruktur. Från att verifiera funktionaliteten i Cilium och Cinder CSI till att uppgradera både OS och Kubernetes-versioner har Talos visat att det kan erbjuda en strömlinjeformad och automatiserad väg för klustrets livscykelhantering.

När vi fortsätter att förfina infrastruktur-automation på Safesprings OpenStack framstår Talos Linux som ett starkt alternativ för operatörer som värdesätter förutsägbarhet, säkerhet och GitOps-native arbetsflöden i sina Kubernetes-miljöer. Vi hoppas att denna praktiska genomgång hjälper dig att bättre förbereda dig för att distribuera och hantera Talos Linux i dina egna miljöer.

{{% note "Gillade du just det du läste?" %}}
Låter detta som en bra lösning för dina behov?
Tveka inte att höra av dig om du har några frågor på hello@safespring.com.
{{% /note %}}