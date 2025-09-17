---
ai: true
title: "OpenStack Cinder CSI-volumklargjører"
date: "2024-03-13"
intro: "Denne guiden er utformet for å hjelpe deg med å integrere Cinder CSI Volume Provisioner i OKD- eller OpenShift-klyngen din på en enkel måte."
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
sidebarlinkname: "GitHub-kodelager"
sidebarlinkurl: "https://github.com/safespring-community/utilities/tree/main/okd/cinder-csi"
sidebarlinkname2: "GitHub-kodelager"
sidebarlinkurl2: "https://github.com/safespring-community/utilities/tree/main/okd/cinder-csi"
aliases:
  - /blogg/2024/2024-03-cinder-csi-volume-provisioner/
---
{{< ingress >}}
Har du konfigurert OKD- eller OpenShift-klyngen din med plattformalternativet satt til "none" og mangler som følge av dette OpenStack Cinder CSI Driver Operator?
{{< /ingress >}}

Denne veiledningen er laget for å hjelpe deg med å integrere Cinder CSI Volume Provisioner i OKD- eller OpenShift-klyngen din på en enkel måte. Den er utformet for å gjøre prosessen smidig, slik at integrasjonen blir sømløs og problemfri.

Veiledningen er dessuten ikke eksklusiv for OpenShift- eller OKD-miljøer; den kan enkelt tilpasses for bruk i et ren- (vanilla) Kubernetes-oppsett med en liten endring. Et viktig høydepunkt for OKD- og OpenShift-brukere er at Helm-chartets templates-katalog inkluderer Security Context Constraints (SCC) klyngerollebindinger. Denne kritiske funksjonen gjør at Cinder CSI pod-er kan kjøres med privilegert tilgang, i tråd med OpenShifts sikkerhetspraksis, og sikrer optimal funksjonalitet innenfor klyngens sikkerhetsrammeverk.

Gjennom denne veiledningen går vi trinn for trinn gjennom installasjonen, med klare instruksjoner og nyttige tips for å sikre en vellykket integrasjon. Enten du er ny i OpenShift eller en erfaren administrator, er målet å gi deg all nødvendig informasjon for å forbedre klyngens lagringskapabiliteter med Cinder CSI Volume Provisioner.

{{% note "Git-repositorium" %}}
Denne veiledningen ledsages av et komplett sett med kodeeksempler i GitHub-repositoriet vårt. For enkel tilgang til alle skripter, konfigurasjoner og maler som brukes i denne veiledningen, gå til [safespring-community](https://github.com/safespring-community/utilities/tree/main/okd/cinder-csi) på GitHub.

{{% /note %}}

## Konfigurere Secret for OpenStack-autentisering

Å sikre kommunikasjonen mellom Cinder CSI Volume Provisioner og OpenStack er avgjørende. Bruk av en applikasjonslegitimasjon gjør dette enklere ved å gi nødvendige autentiseringsdetaljer for interaksjon med OpenStack-tjenester.

### 1. Opprette en applikasjonslegitimasjon

Opprett en ny applikasjonslegitimasjon tilpasset dine behov. Hvis du tidligere har generert legitimasjoner, kan du vurdere å gjenbruke dem for Cinder CSI-tillegget. For å administrere legitimasjonene dine effektivt, bruk kommandoen nedenfor for å opprette et nytt sett eller liste opp eksisterende:```bash
openstack application credential create <app-cred-name>
openstack application credential list
```
Når den er opprettet, hent ut `auth_url`, `Application ID` og `Application secret` for å aktivere OpenStack-autentisering:```bash
auth_url=$(openstack configuration show -f json | jq .auth_url)

json_output=$(openstack application credential create cinder-csi --format json)
app_id=$(echo $json_output | jq -r '.id')
app_secret=$(echo $json_output | jq -r '.secret')

echo "auth_url: ${auth_url}"
echo "Application ID: ${app_id}"
echo "Application secret: ${app_secret}"
```
### 2. Opprett et navnerom for lagrings-CSI

Opprett et dedikert navnerom for CSI for bedre oversikt og sikkerhet:```bash
namespace="csi"
oc create namespace ${namespace}
```
### 3. Forbered skykonfigurasjonen din

Generer en konfigurasjonsfil kodet i base64 for lagring i Kubernetes Secret. Denne konfigurasjonen lar applikasjonen din autentisere mot OpenStack:```bash
cloud_config="[Global]
auth-url=${auth_url}
application-credential-id=${app_id}
application-credential-secret=${app_secret}"

cloud_config_encoded=$(echo "${cloud_config}" | base64 | tr -d '\n')
echo -e "${cloud_config_encoded}" | base64 -d
```
### 4. Distribuer den kodede konfigurasjonen som hemmeligheten din

Bruk dette Kubernetes-manifestet for å lagre OpenStack-påloggingsinformasjonen din sikkert i det opprettede navnerommet:```yaml
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
## Installasjonsprosess

### Velge riktig versjon av Cinder CSI-volumprovisioner

Tilpass Cinder CSI-volumprovisioner-versjonen til Kubernetes-versjonen din. Hent Kubernetes-versjonen din og list opp tilgjengelige Helm chart-versjoner for å sikre kompatibilitet.

Hent OpenShift-versjonen din:```bash
oc version
```

```
Client Version: 4.15.0
Kustomize Version: v5.0.4-0.20230601165947-6ce0bf390ce3
Server Version: 4.15.0
Kubernetes Version: v1.28.6+6216ea1
```
Vis tilgjengelige Cinder CSI-versjoner:```bash
namespace="${namespace:-csi}"
helm repo -n ${namespace} add cpo https://kubernetes.github.io/cloud-provider-openstack
helm search -n ${namespace} repo cpo/openstack-cinder-csi --versions
```
| navn                    | versjon | app_version | beskrivelse                   |
| ----------------------- | ------- | ----------- | ------------------------------ |
| cpo/openstack-cinder-csi | 2.29.0  | v1.29.0     | Cinder CSI-chart for OpenStack |
| cpo/openstack-cinder-csi | 2.28.2  | v1.28.2     | Cinder CSI-chart for OpenStack |
| cpo/openstack-cinder-csi | 2.28.1  | v1.28.1     | Cinder CSI-chart for OpenStack |
| cpo/openstack-cinder-csi | 2.28.0  | v1.28.0     | Cinder CSI-chart for OpenStack |
| cpo/openstack-cinder-csi | 2.27.3  | v1.27.3     | Cinder CSI-chart for OpenStack |
| cpo/openstack-cinder-csi | 2.27.2  | v1.27.2     | Cinder CSI-chart for OpenStack |
| cpo/openstack-cinder-csi | 2.27.1  | v1.27.1     | Cinder CSI-chart for OpenStack |
| cpo/openstack-cinder-csi | 2.27.0  | v1.27.0     | Cinder CSI-chart for OpenStack |

Tilpass Kubernetes-versjonen din til versjonen i kolonnen app_version. Når du søker etter en spesifikk versjon, husk at det er Helm-chart-versjonen du angir, ikke Kubernetes-versjonen.```bash
helm search -n ${namespace} repo cpo/openstack-cinder-csi --version '~2.28'
```
| navn                     | versjon | app_versjon | beskrivelse                 |
| ------------------------ | ------- | ----------- | --------------------------- |
| cpo/openstack-cinder-csi | 2.28.2  | v1.28.2     | Cinder CSI-chart for OpenStack |

Når vi søker etter riktig versjon, bruker vi tilde-områdesammenligninger. Tilde-operatoren (~) brukes for områder på patch-nivå når en minor-versjon er angitt og for endringer på hovednivå når minor-nummeret mangler. I vårt eksempel er `~2.28` ekvivalent med `>= 2.28, < 2.29`.

I `Chart.yaml`, oppdater avhengighetene slik at det søkes etter samme versjon```yaml
dependencies:
  - name: openstack-cinder-csi
    version: "~2.28"
    repository: "https://kubernetes.github.io/cloud-provider-openstack"
```
Oppdater avhengigheter```bash
helm dependency update
```
Hvis du har endringer, push dem til Git-repositoriet ditt.

### Installere Cinder CSI‑volumprovisjonering```bash
namespace="${namespace:-csi}"
helm install -n ${namespace} cinder-csi .
```
Kontroller med `oc -n ${namespace} get pods` at du har én `controllerplugin`-pod og `nodeplugin`-poder for hver node i klyngen.```bash
oc -n ${namespace} get pods
```
| NAVN                                                   | KLAR | STATUS  | OMSTARTER | ALDER |
| ------------------------------------------------------ | ---- | ------- | --------- | ----- |
| openstack-cinder-csi-controllerplugin-544fc6fc4c-cnjft | 6/6  | Kjører  | 0         | 151m  |
| openstack-cinder-csi-nodeplugin-5t54r                  | 3/3  | Kjører  | 0         | 151m  |
| openstack-cinder-csi-nodeplugin-dc5hc                  | 3/3  | Kjører  | 0         | 151m  |
| openstack-cinder-csi-nodeplugin-dxkhb                  | 3/3  | Kjører  | 0         | 151m  |
| openstack-cinder-csi-nodeplugin-kxzr8                  | 3/3  | Kjører  | 0         | 151m  |
| openstack-cinder-csi-nodeplugin-vp8qg                  | 3/3  | Kjører  | 0         | 151m  |

Du har nå to forskjellige lagringsklasser du kan bruke.```bash
oc get storageclass -o custom-columns=Name:.metadata.name,Provisoner:.provisioner
```
| Navn                 | Provisioner              |
| -------------------- | ------------------------ |
| csi-cinder-sc-delete | cinder.csi.openstack.org |
| csi-cinder-sc-retain | cinder.csi.openstack.org |

## Test Cinder CSI-volumprovisioner

Test Cinder CSI-volumprovisioneren ved å opprette en PersistentVolumeClaim og deretter en applikasjon som bruker denne PVC-en.```bash
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
Når det lykkes, skal PersistentVolumeClaim ha statusen "Bound".```bash
oc -n ${namespace_test} get pvc -o custom-columns=Name:.metadata.name,Status:.status.phase,Volume:.spec.volumeName
```
| Navn                 | Status | Volum                                   |
| -------------------- | ------ | --------------------------------------- |
| csi-pvc-cinderplugin | Bound  | pvc-ed60e725-93e8-447c-bc18-ca33546f2ce8 |

Hvis du får problemer, start med å se i hendelsestabellen med `oc -n ${namespace_test} events`.

I OpenStack kan du bruke OpenStack CLI for å se volumet ditt.```bash
openstack volume show pvc-ed60e725-93e8-447c-bc18-ca33546f2ce8
```
Til slutt slett testen din:```bash
oc delete namespace ${namespace_test}
```
## Oppdatere installasjonen

Skulle det være oppdateringer tilgjengelige for Cinder CSI-provisioneren, bruk følgende kommando for å ta dem i bruk:```bash
namespace="${namespace:-csi}"
helm upgrade -n ${namespace} cinder-csi .
```
## Avinstallering

Hvis du trenger å avinstallere Cinder CSI-provisioneren, kjør disse kommandoene:```bash
namespace="${namespace:-csi}"
helm install -n ${namespace} cinder-csi .
oc delete namespace ${namespace}
```
## Ofte stilte spørsmål

### Utfordringen med å bruke Helms `values.yaml` for hemmeligheter

Selv om Helm-diagrammer gjør det enkelt å automatisere utrullinger, inkludert opprettelse av hemmeligheter via `values.yaml`-filen, medfører denne metoden betydelige sikkerhetsutfordringer, særlig i en GitOps-arbeidsflyt med ArgoCD.

For eksempel, når du konfigurerer `openstack-cinder-csi`-chartet, kan det være fristende å legge inn sensitive legitimasjonsopplysninger direkte i `values.yaml`-filen slik:```yaml
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
Denne tilnærmingen fungerer fint for manuelle Helm-installasjoner. I et GitOps-oppsett der ArgoCD automatisk tar i bruk konfigurasjoner fra et Git-repositorium, er det imidlertid risikabelt å lagre hemmeligheter på denne måten. Hovedbekymringen er sikkerhet: å lagre sensitiv informasjon, som legitimasjonsopplysninger, i et Git-repositorium – selv om det er privat – utsetter infrastrukturen din for potensielle sikkerhetsbrudd.