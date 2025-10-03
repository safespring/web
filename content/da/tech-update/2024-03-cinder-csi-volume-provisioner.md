---
ai: true
title: "OpenStack Cinder CSI-volumenklargører"
date: "2024-03-13"
intro: "Denne guide er designet til at hjælpe dig med nemt at integrere Cinder CSI Volume Provisioner i din OKD- eller OpenShift-klynge."
draft: false
section: "Teknologisk opdatering"
author: "Niklas Hagman"
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "da"
TOC: "I denne vejledning"
sidebarlinkname: "GitHub-repo"
sidebarlinkurl: "https://github.com/safespring-community/utilities/tree/main/okd/cinder-csi"
sidebarlinkname2: "GitHub-repository"
sidebarlinkurl2: "https://github.com/safespring-community/utilities/tree/main/okd/cinder-csi"
aliases:
  - /blogg/2024/2024-03-cinder-csi-volume-provisioner/
---
{{< ingress >}}
Har du konfigureret din OKD- eller OpenShift-klynge med platform-indstillingen sat til "none" og mangler som følge heraf OpenStack Cinder CSI Driver Operator?
{{< /ingress >}}

Denne vejledning hjælper dig med uden besvær at integrere Cinder CSI Volume Provisioner i din OKD- eller OpenShift-klynge. Den er udformet til at strømline processen, så integrationen bliver sømløs og problemfri.

Desuden er denne vejledning ikke eksklusiv for OpenShift- eller OKD-miljøer; den kan let tilpasses til brug i standard Kubernetes-opsætninger med en enkel ændring. Et centralt højdepunkt for OKD- og OpenShift-brugere er, at der i Helm-chartets templates-mappe er inkluderet ClusterRoleBindings til Security Context Constraints (SCC). Denne vigtige funktion gør det muligt for Cinder CSI-pods at køre med privilegeret adgang, så de følger OpenShifts sikkerhedspraksis og fungerer optimalt inden for din klynges sikkerhedsramme.

Gennem hele denne vejledning guider vi dig trin for trin gennem installationsprocessen med klare instruktioner og nyttige tips, så integrationen bliver en succes. Uanset om du er ny i OpenShift eller en erfaren administrator, har denne vejledning til formål at give dig al den nødvendige information til at forbedre din klynges lagerkapaciteter med Cinder CSI Volume Provisioner.

{{% note "Git-repositorium" %}}
Denne vejledning ledsages af et komplet sæt kodeeksempler, som er tilgængelige i vores GitHub-repository. For nem adgang til alle scripts, konfigurationer og skabeloner, der bruges i denne vejledning, besøg venligst [safespring-community](https://github.com/safespring-community/utilities/tree/main/okd/cinder-csi) på GitHub.

{{% /note %}}

## Opsætning af din Secret til OpenStack-autentificering

At sikre kommunikationen mellem Cinder CSI Volume Provisioner og OpenStack er altafgørende. Brug af et Application Credential muliggør dette ved at levere de nødvendige autentificeringsoplysninger til interaktion med OpenStack-tjenester.

### 1. Opret et Application Credential

Start med at oprette et nyt Application Credential, der er tilpasset dine behov. Hvis du tidligere har oprettet legitimationsoplysninger, kan du overveje at genbruge dem til Cinder CSI-plugin’et. For at administrere dine legitimationsoplysninger effektivt kan du bruge kommandoen nedenfor til at oprette et nyt sæt eller liste eksisterende:
```bash
openstack application credential create <app-cred-name>
openstack application credential list
```
Efter oprettelsen skal du hente `auth_url`, `Application ID` og `Application secret` for at aktivere OpenStack-godkendelse:
```bash
auth_url=$(openstack configuration show -f json | jq .auth_url)

json_output=$(openstack application credential create cinder-csi --format json)
app_id=$(echo $json_output | jq -r '.id')
app_secret=$(echo $json_output | jq -r '.secret')

echo "auth_url: ${auth_url}"
echo "Application ID: ${app_id}"
echo "Application secret: ${app_secret}"
```
### 2. Opret et namespace til Storage CSI

Opret et dedikeret namespace til CSI'en for at styrke overblik og sikkerhed:
```bash
namespace="csi"
oc create namespace ${namespace}
```
### 3. Forbered din cloud-konfiguration

Generer en base64-kodet konfigurationsfil til lagring i en Kubernetes Secret. Denne konfiguration gør det muligt for din applikation at autentificere sig over for OpenStack:
```bash
cloud_config="[Global]
auth-url=${auth_url}
application-credential-id=${app_id}
application-credential-secret=${app_secret}"

cloud_config_encoded=$(echo "${cloud_config}" | base64 | tr -d '\n')
echo -e "${cloud_config_encoded}" | base64 -d
```
### 4. Udrul den kodede konfiguration som din Secret

Brug dette Kubernetes-manifest til sikkert at gemme dine OpenStack-legitimationsoplysninger i det oprettede namespace:
```yaml
oc apply -f - <<EOF
kind: Secret
apiVersion: v1
metadata:
  name: cinder-csi-cloud-config
  namespace: ${namespace}
data:
  cloud.conf: ${cloud_config_encoded}
type: Opaque
EOF
```
## Installationsproces

### Valg af den korrekte Cinder CSI-volumeprovisioner-version

Match Cinder CSI-provisionerens version med din Kubernetes-version. Hent din Kubernetes-version og oplist de tilgængelige Helm chart-versioner for at sikre kompatibilitet.

Hent din OpenShift-version:
```bash
oc version
```

```
Client Version: 4.15.0
Kustomize Version: v5.0.4-0.20230601165947-6ce0bf390ce3
Server Version: 4.15.0
Kubernetes Version: v1.28.6+6216ea1
```
Vis tilgængelige Cinder CSI-versioner:
```bash
namespace="${namespace:-csi}"
helm repo -n ${namespace} add cpo https://kubernetes.github.io/cloud-provider-openstack
helm search -n ${namespace} repo cpo/openstack-cinder-csi --versions
```
| navn                    | version | app_version | beskrivelse                   |
| ----------------------- | ------- | ----------- | ----------------------------- |
| cpo/openstack-cinder-csi | 2.29.0  | v1.29.0     | Cinder CSI-chart til OpenStack |
| cpo/openstack-cinder-csi | 2.28.2  | v1.28.2     | Cinder CSI-chart til OpenStack |
| cpo/openstack-cinder-csi | 2.28.1  | v1.28.1     | Cinder CSI-chart til OpenStack |
| cpo/openstack-cinder-csi | 2.28.0  | v1.28.0     | Cinder CSI-chart til OpenStack |
| cpo/openstack-cinder-csi | 2.27.3  | v1.27.3     | Cinder CSI-chart til OpenStack |
| cpo/openstack-cinder-csi | 2.27.2  | v1.27.2     | Cinder CSI-chart til OpenStack |
| cpo/openstack-cinder-csi | 2.27.1  | v1.27.1     | Cinder CSI-chart til OpenStack |
| cpo/openstack-cinder-csi | 2.27.0  | v1.27.0     | Cinder CSI-chart til OpenStack |

Sørg for, at din Kubernetes-version matcher versionen i kolonnen app_version. Når du søger efter en specifik version, skal du huske, at det er Helm chart-versionen, du angiver, ikke Kubernetes-versionen.
```bash
helm search -n ${namespace} repo cpo/openstack-cinder-csi --version '~2.28'
```
| navn                     | version | app_version | beskrivelse                    |
| ------------------------ | ------- | ----------- | ------------------------------ |
| cpo/openstack-cinder-csi | 2.28.2  | v1.28.2     | Cinder CSI Chart til OpenStack |

Når vi søger efter den rette version, bruger vi tilde-intervalsammenligninger. Tilde-operatoren (~) bruges til patch-niveauintervaller, når en minorversion er angivet, og til major-niveauintervaller, når minor-tallet mangler. I vores eksempel svarer `~2.28` til `>= 2.28, < 2.29`.

I `Chart.yaml` skal du opdatere afhængighederne, så der søges efter den samme version.
```yaml
dependencies:
  - name: openstack-cinder-csi
    version: "~2.28"
    repository: "https://kubernetes.github.io/cloud-provider-openstack"
```
Opdater afhængigheder
```bash
helm dependency update
```
Hvis du har ændringer, så push dem til dit Git-repository.

### Installering af Cinder CSI-volumenklargører
```bash
namespace="${namespace:-csi}"
helm install -n ${namespace} cinder-csi .
```
Kontrollér med `oc -n ${namespace} get pods`, at du har én `controllerplugin`-pod og `nodeplugin`-pods for hver node i din klynge.
```bash
oc -n ${namespace} get pods
```
| NAVN                                                   | KLAR | STATUS | GENSTARTER | ALDER |
| ------------------------------------------------------ | ---- | ------ | ---------- | ----- |
| openstack-cinder-csi-controllerplugin-544fc6fc4c-cnjft | 6/6  | Kører  | 0          | 151m  |
| openstack-cinder-csi-nodeplugin-5t54r                  | 3/3  | Kører  | 0          | 151m  |
| openstack-cinder-csi-nodeplugin-dc5hc                  | 3/3  | Kører  | 0          | 151m  |
| openstack-cinder-csi-nodeplugin-dxkhb                  | 3/3  | Kører  | 0          | 151m  |
| openstack-cinder-csi-nodeplugin-kxzr8                  | 3/3  | Kører  | 0          | 151m  |
| openstack-cinder-csi-nodeplugin-vp8qg                  | 3/3  | Kører  | 0          | 151m  |

Du har nu to forskellige lagringsklasser, du kan bruge.
```bash
oc get storageclass -o custom-columns=Name:.metadata.name,Provisoner:.provisioner
```
| Navn                 | Provisioner              |
| -------------------- | ------------------------ |
| csi-cinder-sc-delete | cinder.csi.openstack.org |
| csi-cinder-sc-retain | cinder.csi.openstack.org |

## Test Cinder CSI-volume-provisioner

Test Cinder CSI-volume-provisioner ved at oprette en Persistent Volume Claim og derefter en applikation, der bruger denne PVC.
```bash
namespace_test="csi-test"
oc create namespace ${namespace_test}
```

```yaml
oc apply -f - <<EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: csi-pvc-cinderplugin
  namespace: ${namespace_test}
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: csi-cinder-sc-delete
EOF
```

```yaml
oc apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  namespace: ${namespace_test}
spec:
  containers:
    - image: docker.io/nginxinc/nginx-unprivileged
      imagePullPolicy: IfNotPresent
      name: nginx
      ports:
        - containerPort: 8080
          protocol: TCP
      volumeMounts:
        - mountPath: /var/lib/www/html
          name: csi-data-cinderplugin
  volumes:
    - name: csi-data-cinderplugin
      persistentVolumeClaim:
        claimName: csi-pvc-cinderplugin
        readOnly: false
EOF

```
Persistent Volume Claim'en bør være "Bound", når den er oprettet med succes.
```bash
oc -n ${namespace_test} get pvc -o custom-columns=Name:.metadata.name,Status:.status.phase,Volume:.spec.volumeName
```
| Navn                | Status | Volumen                                  |
| -------------------- | ------ | ---------------------------------------- |
| csi-pvc-cinderplugin | Bound  | pvc-ed60e725-93e8-447c-bc18-ca33546f2ce8 |

Hvis du har problemer, så start med at kigge i events-tabellen med `oc -n ${namespace_test} events`.

I OpenStack kan du bruge OpenStack CLI til at se dit volumen.
```bash
openstack volume show pvc-ed60e725-93e8-447c-bc18-ca33546f2ce8
```
Til sidst skal du slette din test:
```bash
oc delete namespace ${namespace_test}
```
## Opdatering af din installation

Hvis der er opdateringer til Cinder CSI-provisioneren, skal du bruge følgende kommando til at anvende dem:
```bash
namespace="${namespace:-csi}"
helm upgrade -n ${namespace} cinder-csi .
```
## Afinstallation

Hvis du skal afinstallere Cinder CSI-provisioneren, skal du køre disse kommandoer:
```bash
namespace="${namespace:-csi}"
helm install -n ${namespace} cinder-csi .
oc delete namespace ${namespace}
```
## Ofte stillede spørgsmål

### Udfordringen ved at bruge Helms `values.yaml` til Secrets

Selvom Helm-charts gør det nemt at automatisere udrulninger, inklusive oprettelse af Secrets via `values.yaml`-filen, medfører denne metode betydelige sikkerhedsudfordringer, især i en GitOps-arbejdsgang med ArgoCD.

For eksempel kan man, når man konfigurerer `openstack-cinder-csi`-chartet, blive fristet til at indlejre følsomme adgangsoplysninger direkte i `values.yaml`-filen, således:
```yaml
openstack-cinder-csi:
  secret:
    enabled: true
    create: true
    name: cinder-csi-cloud-config
    data:
      cloud.conf: |-
        [Global]
        auth-url=<auth_url>
        application-credential-id=<app_id>
        application-credential-secret=<app_secret>
```
Denne tilgang fungerer fint til manuelle Helm-installationer. Men i et GitOps-setup, hvor ArgoCD automatisk anvender konfigurationer fra et Git-repo, er det risikabelt at gemme secrets på denne måde. Den primære bekymring er sikkerhed: at lagre følsomme data, såsom adgangsoplysninger, i et Git-repo — selv hvis det er privat — udsætter din infrastruktur for potentielle sikkerhedsbrud.