---
ai: true
title: "Validering af installations- og vedligeholdelsesopgaver for Talos Linux"
date: 2025-04-09
intro: "En tilgængelig tilgang til drift på en Kubernetes-platform udgør en overbevisende mulighed for PaaS-operatører."
draft: false
tags: ["English"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "da"
sectiontext: "Teknologiopdatering"
section: "Teknologiopdatering"
author: "Stefan Negru"
TOC: "I dette indlæg"
aliases:
  - /blogg/2025/2025-04-validating-talos-linux-intstall/
---
I en [tidligere artikel](/blogg/2025/2025-03-talos-linux-on-openstack/) begyndte vi at udforske Talos Linux, hvad det kan betyde for os, og hvordan vi kan automatisere installationen på Safespring OpenStack. Vi ville dog gå et par skridt videre i vores undersøgelse og se på at få bekræftet to yderligere aspekter:

1. Validere, at Kubernetes-klyngen og den underliggende CNI er installeret korrekt.
2. Opgradere både operativsystemet og Kubernetes-versionen.

Begge disse elementer skal både understøtte vores automatiseringsarbejde og give sikkerhed for, at vi kan tilbyde en robust Kubernetes-platform.

Selvom vores erfaring med Talos Linux-klyngen har været gnidningsfri, stødte vi på nogle udfordringer, som vi beskriver i denne artikel, med det formål at give inspiration til, hvordan du kan overvinde disse udfordringer i din opsætning.

{{% note "Forudsætninger" %}}
Der er nogle forudsætninger for at kunne gentage trinnene, og vi går ikke i detaljer med opsætningen af Talos Linux-klyngen:
- Talos Linux CLI `talosctl`.
- Kubernetes-kommandolinjeværktøjet `kubectl`.
- Podman/Docker.
- OpenStack-adgangsoplysninger (inkluder også OpenStack EC2-adgangsoplysninger til state S3-lager).
- Talos-klynge klargjort med [Cilium CNI](https://www.talos.dev/v1.9/kubernetes-guides/network/deploying-cilium/) samt [Cinder CSI](/blogg/2024/2024-03-cinder-csi-volume-provisioner/).
{{% /note %}}

Videre til de praktiske trin:

## Opbygning af et containerimage

Da vi vil teste klyngeinstallationen, har vi brug for at køre de kommandolinjeværktøjer, der kræves for at validere klyngeinstallationen, i en container. Til dette formål har vi forberedt `Dockerfile-talos` nedenfor, som vi skal bygge og skubbe til et registry.

Opret derfor en fil med navnet `Dockerfile-talos` med følgende indhold:```dockerfile
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
Byg og pushe til et registry, f.eks. `docker.io`:```bash
# substitute docker.io/blankdots/talosctl:minimal with your own registry 
podman build -t docker.io/blankdots/talosctl:minimal -f Dockerfile-talos --no-cache
podman push docker.io/blankdots/talosctl:minimal
```
## Oprette et valideringsjob

For at kunne validere klyngen via et job, der kører i vores nyoprettede Talos-klynge, har vi brug for både en [servicekonto](https://kubernetes.io/docs/concepts/security/service-accounts/) med tilladelser til de relevante Kubernetes API-ressourcer og en [Talos-servicekonto](https://www.talos.dev/v1.9/advanced/talos-api-access-from-k8s/).

Inden da opretter vi et namespace, hvor vi udfører vores validering:```bash
kubectl create ns safespring
```
### Konfiguration af adgang til Kubernetes API-ressourcer

Sørg for, at Talos Service Account er aktiveret, enten ved at redigere maskinkonfigurationen direkte og tilføje:```yaml
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
Du kan redigere maskinen med:```bash
talosctl --talosconfig .talos/talosconfig edit mc --nodes 10.5.0.2
```
Patchning af maskinen kan udføres ved hjælp af:```bash
talosctl --talosconfig .talos/talosconfig --nodes 10.5.0.2 patch mc --patch @patch-rbac.json
```
Hvor `patch-rbac.json` har følgende indhold:```json
[
  {"op": "add", "path": "/machine/features/rbac", "value": true},
  {"op": "add", "path": "/machine/features/kubernetesTalosAPIAccess", "value": {"enabled": true}},
  {"op": "add", "path": "/machine/features/kubernetesTalosAPIAccess/allowedRoles", "value": ["os:reader"]},
  {"op": "add", "path": "/machine/features/kubernetesTalosAPIAccess/allowedKubernetesNamespaces", "value": ["kube-system", "safespring"]}
]
```
Dernæst introducerer vi servicekonti og roller:```bash
kubectl apply -f service-account.yaml
```
Hvor `service-account.yaml` har følgende indhold:```yaml
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
### Script til at validere installationen

Lad os oprette et script, der hjælper os med at validere vigtige aspekter af Talos-installationen, nemlig CNI, CSI samt Talos API. Scriptet nedenfor, `validate.sh`, omfatter disse kontroller.

I koden nedenfor skal du lægge mærke til StorageClass-navnet `fast`; dette skal tilpasses til dine egne StorageClasses. For at se StorageClasses, brug:```bash
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
Dernæst tilføjer vi scriptet som en ConfigMap, så det kan bruges i jobbet:```bash
kubectl create configmap -n safespring validate-script --from-file=validate.sh
```
Da scriptet kræver forhøjede privilegier, skal vi tilsidesætte pod-sikkerhedsstandarderne på namespace-niveau for `safespring`-namespace.```bash
kubectl label --overwrite ns safespring pod-security.kubernetes.io/audit=privileged pod-security.kubernetes.io/warn=privileged
```
### Oprettelse af jobbet```yaml
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
Du kan se resultaterne af jobbet:```bash
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
## Opgradering af en Talos-klynge

Opgradering af en Talos-klynge er ret ligetil, hvis man følger vejledningen, med nogle små bump på vejen, især for Kubernetes-versionerne.

### Opgradering af Talos Linux

At følge [vejledningen til opgradering af Talos Linux](https://www.talos.dev/v1.9/talos-guides/upgrading-talos/#talosctl-upgrade) er lige så enkelt som at køre kommandoen `talosctl upgrade`.```bash
talosctl --talosconfig .talos/talosconfig upgrade --image ghcr.io/siderolabs/installer:v1.9.5
# add --nodes <node> to target a specific node
```
### Opgradering af Talos Kubernetes-version

Opgradering af Kubernetes-versionen er [ligetil ved at følge vejledningen](https://www.talos.dev/v1.9/kubernetes-guides/upgrading-kubernetes/), men i vores tilfælde installerede vi Cilium CNI med et job, og det giver en udfordring ved opgradering.

Vores demoklynge har version `1.31.5` af Kubernetes, og vi vil opgradere til `1.32.3`:```bash
➜ kubectl get nodes        
NAME                              STATUS   ROLES           AGE   VERSION
dev-taloscluster-controlplane-1   Ready    control-plane   57m   v1.31.5
dev-taloscluster-worker-1         Ready    <none>          57m   v1.31.5
```
Lad os prøve opgraderingskommandoen:```bash
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
Vi bemærker, at det Job, som vi har brugt i `inlineManifest`, skaber udfordringer for opgraderingen; en enkel løsning på det vil være at redigere Talos-konfigurationen og fjerne den problematiske sektion.```bash
talosctl --talosconfig talosconfig --nodes 10.5.0.2 patch mc --patch @remove-inlinemanifests.json
```
hvor `remove-inlinemanifests.json` indeholder```json
[
  {
    "op": "remove",
    "path": "/cluster/inlineManifests"
  }
]
```
Et alternativ til denne løsning vil være at bruge [`extraManifests`](https://www.talos.dev/v1.9/reference/configuration/v1alpha1/config/#Config.cluster) som beskrevet i [Talos Helm-installation af Cilium](https://www.talos.dev/v1.9/kubernetes-guides/network/deploying-cilium/#method-1-helm-install), men URL’erne skal enten være offentlige eller tilgås via basic auth, f.eks. `https://username:password@url`.

## Fejlfinding

Et par bemærkninger i forbindelse med installation af Cilium CNI:

- Aktivér `bpf.hostLegacyRouting=true`, så Cilium fungerer med Talos Linux-installationen som dokumenteret i den officielle [Cilium-dokumentation](https://docs.cilium.io/en/stable/installation/k8s-install-helm/#install-cilium).
- En af grundene til, at vi skulle bekræfte internetforbindelsen, udsprang af at få Ciliums DNS til at fungere, da der lader til at være et problem i version `1.6.5`; se [denne kommentar](https://github.com/cilium/cilium/issues/36761#issuecomment-2560353729) og [issue 66](https://github.com/isejalabs/homelab/issues/66): 
  - "Cilium bruger nu BPF Host Routing i `1.16.5`, hvilket konflikter med `forwardKubeDNSToHost` i Talos. Hvis du sætter `bpf.hostLegacyRouting=true` i din Cilium-opsætning, går den tilbage til adfærden i `1.16.4` og tidligere. Det fjerner behovet for at deaktivere `forwardKubeDNSToHost` i Talos".

## Konklusion: Drift på Talos Linux

Talos Linux tilbyder en tilgængelig tilgang til drift af Kubernetes-infrastruktur og bekræfter vores tidligere konklusion om Talos’ løfte om at levere et sikkert, uforanderligt og driftseffektivt fundament for moderne infrastruktur. Fra verifikation af Cilium- og Cinder CSI-funktionalitet til opgradering af både OS- og Kubernetes-versioner har Talos demonstreret sin evne til at tilbyde en strømlinet og automatiseret vej til styring af klyngens livscyklus.

I takt med at vi fortsætter arbejdet med at forbedre infrastruktur-automatisering på Safesprings OpenStack, fremstår Talos Linux som et stærkt valg for operatører, der værdsætter forudsigelighed, sikkerhed og GitOps-native arbejdsgange i deres Kubernetes-miljøer. Vi håber, at denne praktiske dybdegående gennemgang hjælper dig med bedre at forberede udrulning og drift af Talos Linux i dine egne opsætninger.

{{% note "Kunne du lide, hvad du lige læste?" %}}
Lyder dette som et godt match til dine behov?
Tøv ikke med at kontakte os, hvis du har spørgsmål, på hello@safespring.com.
{{% /note %}}