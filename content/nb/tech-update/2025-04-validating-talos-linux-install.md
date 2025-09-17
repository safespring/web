---
ai: true
title: "Validering av installasjons- og vedlikeholdsoperasjoner for Talos Linux"
date: 2025-04-09
intro: "En tilgjengelig tilnærming til drift på en Kubernetes-plattform er et overbevisende alternativ for PaaS-operatører."
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
I en [tidligere artikkel](/blogg/2025/2025-03-talos-linux-on-openstack/) begynte vi å utforske Talos Linux, hva det kan bety for oss, og hvordan vi kan automatisere installasjonen på Safespring OpenStack. Vi ønsket imidlertid å gå noen steg videre i undersøkelsen og bekrefte to ytterligere aspekter:

1. Validere at Kubernetes-klyngen og underliggende CNI er installert riktig.
2. Oppgradere både operativsystemet og Kubernetes-versjonen.

Begge disse elementene skal styrke automatiseringsarbeidet vårt og samtidig gi trygghet for at vi kan tilby en robust Kubernetes-plattform.

Selv om erfaringene våre med Talos Linux-klyngen har vært gode, støtte vi på noen hindringer som vi vil beskrive i denne artikkelen, med mål om å gi veiledning og oppmuntring til hvordan du kan overvinne disse hindringene i ditt oppsett.

{{% note "Forutsetninger" %}}
Det er noen forutsetninger for å kunne gjenta stegene, og selv om vi ikke går i detalj på oppsett av Talos Linux-klynge:
- Talos Linux CLI `talosctl`.
- Kubernetes kommandolinjeverktøy `kubectl`.
- Podman/Docker.
- OpenStack-legitimasjon (ta også med OpenStack ec2-legitimasjon for state s3-lager).
- Talos-klynge provisjonert med [Cilium CNI](https://www.talos.dev/v1.9/kubernetes-guides/network/deploying-cilium/) samt [Cinder CSI](/blogg/2024/2024-03-cinder-csi-volume-provisioner/).
{{% /note %}}

Videre med de praktiske stegene:

## Bygge et container-image

Siden vi vil teste klyngeinstallasjonen, må vi kjøre kommandolinjeverktøyene som kreves for å validere klyngen, i en container. For dette formålet har vi forberedt `Dockerfile-talos` nedenfor, som vi må bygge og pushe til et register.

Opprett derfor en fil med navnet `Dockerfile-talos` med følgende innhold:```dockerfile
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
Bygge og pushe til et register, f.eks. `docker.io`:```bash
# substitute docker.io/blankdots/talosctl:minimal with your own registry 
podman build -t docker.io/blankdots/talosctl:minimal -f Dockerfile-talos --no-cache
podman push docker.io/blankdots/talosctl:minimal
```
## Opprette en valideringsjobb

For å kunne validere klyngen via en jobb som kjører inne i vår nyopprettede Talos-klynge, trenger vi både en [tjenestekonto](https://kubernetes.io/docs/concepts/security/service-accounts/) med tillatelser til de riktige Kubernetes API-ressursene, samt en [Talos‑tjenestekonto](https://www.talos.dev/v1.9/advanced/talos-api-access-from-k8s/).

Før det oppretter vi et namespace der vi skal gjøre selve valideringssjekken:```bash
kubectl create ns safespring
```
### Konfigurere tilgang til Kubernetes-API-ressurser

Sørg for at Talos-servicekontoen er aktivert, enten ved å redigere maskinkonfigurasjonen direkte og legge til:```yaml
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
Maskinen kan redigeres med:```bash
talosctl --talosconfig .talos/talosconfig edit mc --nodes 10.5.0.2
```
Patching av maskinen kan gjøres ved hjelp av:```bash
talosctl --talosconfig .talos/talosconfig --nodes 10.5.0.2 patch mc --patch @patch-rbac.json
```
Der `patch-rbac.json` har følgende innhold:```json
[
  {"op": "add", "path": "/machine/features/rbac", "value": true},
  {"op": "add", "path": "/machine/features/kubernetesTalosAPIAccess", "value": {"enabled": true}},
  {"op": "add", "path": "/machine/features/kubernetesTalosAPIAccess/allowedRoles", "value": ["os:reader"]},
  {"op": "add", "path": "/machine/features/kubernetesTalosAPIAccess/allowedKubernetesNamespaces", "value": ["kube-system", "safespring"]}
]
```
Deretter introduserer vi tjenestekontoene og rollene:```bash
kubectl apply -f service-account.yaml
```
Der `service-account.yaml` har følgende innhold:```yaml
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
### Skript for å validere installasjonen

La oss lage et skript som hjelper oss å validere viktige aspekter ved Talos-installasjonen, nemlig CNI, CSI samt Talos API. Skriptet nedenfor, `validate.sh`, dekker dette.

I koden nedenfor, legg merke til navnet på lagringsklassen, `fast`. Dette må justeres til dine egne lagringsklasser. For å se lagringsklasser, bruk:```bash
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
Deretter legger vi til skriptet som en ConfigMap for å bruke det i jobben:```bash
kubectl create configmap -n safespring validate-script --from-file=validate.sh
```
Siden skriptet krever utvidede rettigheter, må vi overstyre pod-sikkerhetsstandardene på navneromsnivå for navnerommet `safespring`.```bash
kubectl label --overwrite ns safespring pod-security.kubernetes.io/audit=privileged pod-security.kubernetes.io/warn=privileged
```
### Opprette jobben```yaml
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
Du kan se resultatene av jobben:```bash
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
## Oppgradere en Talos-klynge

Å oppgradere en Talos-klynge er ganske rett frem ved å følge instruksjonene, med noen små utfordringer, spesielt når det gjelder Kubernetes-versjonene.

### Oppgradere Talos Linux

Å følge [instruksjonene for å oppgradere Talos Linux](https://www.talos.dev/v1.9/talos-guides/upgrading-talos/#talosctl-upgrade) er så enkelt som å kjøre kommandoen `talosctl upgrade`.```bash
talosctl --talosconfig .talos/talosconfig upgrade --image ghcr.io/siderolabs/installer:v1.9.5
# add --nodes <node> to target a specific node
```
### Oppgradere Kubernetes-versjonen i Talos

Å oppgradere Kubernetes-versjonen er [enkelt ved å følge instruksjonene](https://www.talos.dev/v1.9/kubernetes-guides/upgrading-kubernetes/), men i vårt tilfelle installerte vi Cilium CNI med en jobb, og det byr på en utfordring ved oppgradering.

Demoklyngen vår har Kubernetes-versjon `1.31.5`, og vi vil oppgradere til `1.32.3`:```bash
➜ kubectl get nodes        
NAME                              STATUS   ROLES           AGE   VERSION
dev-taloscluster-controlplane-1   Ready    control-plane   57m   v1.31.5
dev-taloscluster-worker-1         Ready    <none>          57m   v1.31.5
```
La oss prøve oppgraderingskommandoen:```bash
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
Vi ser at Job-ressursen vi har brukt i `inlineManifest` vanskeliggjør oppgraderingen; en enkel løsning er å redigere Talos-konfigurasjonen og fjerne den problematiske delen.```bash
talosctl --talosconfig talosconfig --nodes 10.5.0.2 patch mc --patch @remove-inlinemanifests.json
```
der `remove-inlinemanifests.json` inneholder```json
[
  {
    "op": "remove",
    "path": "/cluster/inlineManifests"
  }
]
```
Et alternativ til denne løsningen er å bruke [`extraManifests`](https://www.talos.dev/v1.9/reference/configuration/v1alpha1/config/#Config.cluster) som beskrevet i [Talos Helm-installasjon av Cilium](https://www.talos.dev/v1.9/kubernetes-guides/network/deploying-cilium/#method-1-helm-install), men URL-ene må enten være offentlige eller kunne nås via basic auth, f.eks. `https://username:password@url`.

## Feilsøking

Noen punkter å være oppmerksom på ved installasjon av Cilium CNI:

- Aktiver `bpf.hostLegacyRouting=true` for at Cilium skal fungere med Talos Linux-installasjonen, som dokumentert i den offisielle [Cilium-dokumentasjonen](https://docs.cilium.io/en/stable/installation/k8s-install-helm/#install-cilium).
- En av grunnene til at vi må validere internett-tilkoblingen, startet med å få Cilium DNS til å fungere, siden det ser ut til å være et problem med versjon `1.6.5`; se [denne kommentaren](https://github.com/cilium/cilium/issues/36761#issuecomment-2560353729) og [sak 66](https://github.com/isejalabs/homelab/issues/66): 
  - "Cilium bruker nå BPF Host Routing i `1.16.5`, som kommer i konflikt med `forwardKubeDNSToHost` i Talos. Å sette `bpf.hostLegacyRouting=true` i Cilium går tilbake til oppførselen i `1.16.4` og tidligere. Dette eliminerer behovet for å deaktivere `forwardKubeDNSToHost` i Talos".

## Konklusjon: Drift på Talos Linux

Talos Linux tilbyr en tilgjengelig tilnærming til drift av Kubernetes-infrastruktur og bekrefter vår tidligere konklusjon om Talos’ løfte om å levere et sikkert, uforanderlig og driftseffektivt fundament for moderne infrastruktur. Fra verifisering av Cilium- og Cinder CSI-funksjonalitet til oppgradering av både OS- og Kubernetes-versjoner, demonstrerte Talos evnen til å tilby en strømlinjeformet og automatisert vei for livssyklushåndtering av klynger.

Mens vi fortsetter arbeidet med å videreutvikle automatisering av infrastrukturen på Safesprings OpenStack, fremstår Talos Linux som et overbevisende alternativ for operatører som verdsetter forutsigbarhet, sikkerhet og GitOps-native arbeidsflyter i sine Kubernetes-miljøer. Vi håper denne praktiske, dyptpløyende gjennomgangen hjelper deg å forberede deg bedre på å ta i bruk og administrere Talos Linux i dine egne oppsett.

{{% note "likte du det du nettopp leste?" %}}
Høres dette ut som en god løsning for dine behov?
Ikke nøl med å ta kontakt hvis du har spørsmål: hello@safespring.com.
{{% /note %}}