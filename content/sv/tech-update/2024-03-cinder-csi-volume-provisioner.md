---
ai: true
title: "CSI-volymprovisionerare för OpenStack Cinder"
date: "2024-03-13"
intro: "Den här guiden är utformad för att hjälpa dig att smidigt integrera Cinder CSI Volume Provisioner i ditt OKD- eller OpenShift-kluster."
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
sidebarlinkurl: "https://github.com/safespring-community/utilities/tree/main/okd/cinder-csi"
sidebarlinkname2: "GitHub-repo"
sidebarlinkurl2: "https://github.com/safespring-community/utilities/tree/main/okd/cinder-csi"
aliases:
  - /blogg/2024/2024-03-cinder-csi-volume-provisioner/
---
{{< ingress >}}
Har du konfigurerat ditt OKD‑ eller OpenShift‑kluster med plattformsalternativet satt till "none" och saknar därför OpenStack Cinder CSI Driver Operator?
{{< /ingress >}}

Den här guiden är avsedd att hjälpa dig att utan krångel integrera Cinder CSI Volume Provisioner i ditt OKD‑ eller OpenShift‑kluster. Den är utformad för att förenkla processen och göra integrationen smidig och problemfri.

Dessutom är den här guiden inte exklusiv för OpenShift‑ eller OKD‑miljöer; den kan enkelt anpassas för användning i vanliga Kubernetes‑installationer med en liten ändring. En viktig fördel för OKD‑ och OpenShift‑användare är att Security Context Constraints (SCC)‑cluster‑rollbindningar ingår i Helm‑chartens templates‑katalog. Denna viktiga funktion gör att Cinder CSI‑poddar kan köras med privilegierad åtkomst, i linje med OpenShifts säkerhetspraxis, och säkerställer optimal funktion i ditt klusters säkerhetsramverk.

I den här guiden går vi steg för steg igenom installationsprocessen med tydliga instruktioner och hjälpsamma tips för en lyckad integration. Oavsett om du är ny på OpenShift eller en erfaren administratör är målet att ge dig all information du behöver för att förbättra klustrets lagringskapacitet med Cinder CSI Volume Provisioner.

{{% note "Git-arkiv" %}}
Den här guiden åtföljs av ett komplett set med kodexempel som finns i vårt GitHub‑arkiv. För enkel åtkomst till alla skript, konfigurationer och mallar som används i den här guiden, besök [safespring-community](https://github.com/safespring-community/utilities/tree/main/okd/cinder-csi) på GitHub.
{{% /note %}}

## Konfigurera din Secret för OpenStack‑autentisering

Att säkra kommunikationen mellan Cinder CSI‑volymprovisioneraren och OpenStack är avgörande. Genom att använda en application credential får du de autentiseringsuppgifter som behövs för interaktion med OpenStack‑tjänster.

### 1. Skapa en application credential

Påbörja skapandet av en ny application credential anpassad efter dina behov. Om du tidigare har genererat autentiseringsuppgifter kan du överväga att återanvända dem för Cinder CSI‑insticksmodulen. För att hantera dina uppgifter effektivt, använd kommandot nedan för att skapa en ny eller lista befintliga:```bash
openstack application credential create <app-cred-name>
openstack application credential list
```
När den har skapats, hämta `auth_url`, `Application ID` och `Application secret` för att möjliggöra autentisering mot OpenStack:```bash
auth_url=$(openstack configuration show -f json | jq .auth_url)

json_output=$(openstack application credential create cinder-csi --format json)
app_id=$(echo $json_output | jq -r '.id')
app_secret=$(echo $json_output | jq -r '.secret')

echo "auth_url: ${auth_url}"
echo "Application ID: ${app_id}"
echo "Application secret: ${app_secret}"
```
### 2. Skapa ett namnområde för lagrings-CSI

Skapa ett dedikerat namnområde för CSI för att förbättra den organisatoriska tydligheten och säkerheten:```bash
namespace="csi"
oc create namespace ${namespace}
```
### 3. Förbered din molnkonfiguration

Generera en konfigurationsfil som är base64-kodad för lagring i en Kubernetes Secret. Den här konfigurationen gör att din applikation kan autentisera mot OpenStack:```bash
cloud_config="[Global]
auth-url=${auth_url}
application-credential-id=${app_id}
application-credential-secret=${app_secret}"

cloud_config_encoded=$(echo "${cloud_config}" | base64 | tr -d '\n')
echo -e "${cloud_config_encoded}" | base64 -d
```
### 4. Distribuera den kodade konfigurationen som din Secret

Använd detta Kubernetes-manifest för att lagra dina OpenStack-autentiseringsuppgifter på ett säkert sätt i den skapade namnrymden:```yaml
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
## Installationsprocess

### Välja rätt version av Cinder CSI-volymprovisioneraren

Matcha versionen av Cinder CSI-provisioneraren med din Kubernetes-version. Hämta din Kubernetes-version och lista tillgängliga versioner av Helm-diagram för att säkerställa kompatibilitet.

Hämta din OpenShift-version:```bash
oc version
```

```
Client Version: 4.15.0
Kustomize Version: v5.0.4-0.20230601165947-6ce0bf390ce3
Server Version: 4.15.0
Kubernetes Version: v1.28.6+6216ea1
```
Lista tillgängliga Cinder CSI-versioner:```bash
namespace="${namespace:-csi}"
helm repo -n ${namespace} add cpo https://kubernetes.github.io/cloud-provider-openstack
helm search -n ${namespace} repo cpo/openstack-cinder-csi --versions
```
| name                     | version | app_version | beskrivning                    |
| ------------------------ | ------- | ----------- | ------------------------------ |
| cpo/openstack-cinder-csi | 2.29.0  | v1.29.0     | Cinder CSI-diagram för OpenStack |
| cpo/openstack-cinder-csi | 2.28.2  | v1.28.2     | Cinder CSI-diagram för OpenStack |
| cpo/openstack-cinder-csi | 2.28.1  | v1.28.1     | Cinder CSI-diagram för OpenStack |
| cpo/openstack-cinder-csi | 2.28.0  | v1.28.0     | Cinder CSI-diagram för OpenStack |
| cpo/openstack-cinder-csi | 2.27.3  | v1.27.3     | Cinder CSI-diagram för OpenStack |
| cpo/openstack-cinder-csi | 2.27.2  | v1.27.2     | Cinder CSI-diagram för OpenStack |
| cpo/openstack-cinder-csi | 2.27.1  | v1.27.1     | Cinder CSI-diagram för OpenStack |
| cpo/openstack-cinder-csi | 2.27.0  | v1.27.0     | Cinder CSI-diagram för OpenStack |

Matcha din Kubernetes-version med versionen i kolumnen app_version. När du söker efter en specifik version, kom ihåg att det är Helm-diagrammets version du anger, inte Kubernetes-versionen.```bash
helm search -n ${namespace} repo cpo/openstack-cinder-csi --version '~2.28'
```
| namn                     | version | app_version | beskrivning                    |
| ------------------------ | ------- | ----------- | ------------------------------ |
| cpo/openstack-cinder-csi | 2.28.2  | v1.28.2     | Cinder CSI-diagram för OpenStack |

När vi söker efter rätt version använder vi tildeintervall. Jämförelseoperatorn tilde (~) används för patchnivåintervall när en minorversion anges och för majornivåintervall när minornumret saknas. I vårt exempel är `~2.28` likvärdigt med `>= 2.28, < 2.29`.

I `Chart.yaml`, uppdatera beroendena så att de söker efter samma version.```yaml
dependencies:
  - name: openstack-cinder-csi
    version: "~2.28"
    repository: "https://kubernetes.github.io/cloud-provider-openstack"
```
Uppdatera beroenden```bash
helm dependency update
```
Om du har ändringar, pusha dem till ditt Git-repo.

### Installera Cinder CSI-volymprovisioneraren```bash
namespace="${namespace:-csi}"
helm install -n ${namespace} cinder-csi .
```
Verifiera med `oc -n ${namespace} get pods` att du har en `controllerplugin`-podd och `nodeplugin`-poddar för varje nod i ditt kluster.```bash
oc -n ${namespace} get pods
```
| NAMN                                                   | REDO | STATUS | OMSTARTER | ÅLDER |
| ------------------------------------------------------ | ---- | ------ | --------- | ----- |
| openstack-cinder-csi-controllerplugin-544fc6fc4c-cnjft | 6/6  | Körs   | 0         | 151m |
| openstack-cinder-csi-nodeplugin-5t54r                  | 3/3  | Körs   | 0         | 151m |
| openstack-cinder-csi-nodeplugin-dc5hc                  | 3/3  | Körs   | 0         | 151m |
| openstack-cinder-csi-nodeplugin-dxkhb                  | 3/3  | Körs   | 0         | 151m |
| openstack-cinder-csi-nodeplugin-kxzr8                  | 3/3  | Körs   | 0         | 151m |
| openstack-cinder-csi-nodeplugin-vp8qg                  | 3/3  | Körs   | 0         | 151m |

Du har nu två olika lagringsklasser att använda.```bash
oc get storageclass -o custom-columns=Name:.metadata.name,Provisoner:.provisioner
```
| Namn                 | Provisioner              |
| -------------------- | ------------------------ |
| csi-cinder-sc-delete | cinder.csi.openstack.org |
| csi-cinder-sc-retain | cinder.csi.openstack.org |

## Testa Cinder CSI-volymprovisioneraren

Testa Cinder CSI-volymprovisioneraren genom att skapa en Persistent Volume Claim och sedan en applikation som använder denna PVC.```bash
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
PersistentVolumeClaim ska ha statusen "Bound" vid lyckat resultat.```bash
oc -n ${namespace_test} get pvc -o custom-columns=Name:.metadata.name,Status:.status.phase,Volume:.spec.volumeName
```
| Namn                 | Status | Volym                                    |
| -------------------- | ------ | ---------------------------------------- |
| csi-pvc-cinderplugin | Bunden | pvc-ed60e725-93e8-447c-bc18-ca33546f2ce8 |

Om du har några problem, börja med att titta i händelsetabellen med `oc -n ${namespace_test} events`.

I OpenStack kan du använda OpenStack CLI för att se din volym.```bash
openstack volume show pvc-ed60e725-93e8-447c-bc18-ca33546f2ce8
```
Avsluta med att ta bort ditt test:```bash
oc delete namespace ${namespace_test}
```
## Uppdatera din installation

Om det finns uppdateringar tillgängliga för Cinder CSI-provisioner-komponenten, använd följande kommando för att tillämpa dem:```bash
namespace="${namespace:-csi}"
helm upgrade -n ${namespace} cinder-csi .
```
## Avinstallera

Om du behöver avinstallera Cinder CSI-provisioner, kör följande kommandon:```bash
namespace="${namespace:-csi}"
helm install -n ${namespace} cinder-csi .
oc delete namespace ${namespace}
```
## Vanliga frågor

### Utmaningen med att använda Helms `values.yaml` för hemligheter

Även om Helm-charts gör det enkelt att automatisera driftsättningar, inklusive att skapa hemligheter via filen `values.yaml`, innebär denna metod betydande säkerhetsutmaningar, särskilt i ett GitOps-arbetsflöde med ArgoCD.

Till exempel, när du konfigurerar Helm-chartet `openstack-cinder-csi`, kan det vara frestande att lägga in känsliga autentiseringsuppgifter direkt i filen `values.yaml`, så här:```yaml
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
Den här metoden fungerar bra för manuella Helm-installationer. Men i en GitOps-miljö där ArgoCD automatiskt tillämpar konfigurationer från ett Git-repo är det riskabelt att lagra hemligheter på det här sättet. Den främsta oron gäller säkerheten: att lagra känslig data, såsom inloggningsuppgifter, i ett Git-repo — även om det är privat — exponerar din infrastruktur för potentiella intrång.