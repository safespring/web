---
ai: true
title: "Zitadel OIDC-konfiguration för Talos Kubernetes API-servern"
date: 2025-10-03
intro: "Integrationen använder Zitadel som identitetsleverantör, vilket möjliggör säker, centraliserad autentisering och auktorisering."
draft: false
tags: ["English"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "sv"
sectiontext: "Teknikuppdatering"
section: "Tech update"
author: "Anders Johansson, Ahmet Balci"
TOC: "I det här inlägget"
---
{{< ingress >}}
I den här guiden går vi igenom hur du konfigurerar OpenID Connect (OIDC)-autentisering för Kubernetes API-servern i Talos-hanterade kluster.
{{</ ingress >}}

Integrationen använder [Zitadel](https://zitadel.com/) som identitetsleverantör, vilket möjliggör säker, centraliserad autentisering och auktorisering.

Vi kommer också att använda [kubectl OIDC-plugin](https://github.com/int128/kubelogin) `kubelogin` för att smidigt hantera OIDC-baserade inloggningar från kommandoraden.

---

## Nyckelkomponenter

* **Identitetsleverantör**: [Zitadel](https://zitadel.com/)
* **Kubernetes API-server**: OIDC-aktiverad autentisering
* **RBAC**: Rollbaserad åtkomstkontroll med OIDC-claims
* **Klusterhantering**: Talos Linux

---

{{% note "Förutsättningar" %}}

Innan du börjar, säkerställ följande.

### Krävs verktyg

* `talosctl` - Talos hanterings-CLI
* `kubectl` - Kubernetes CLI med [`kubectl OIDC-plugin`](https://github.com/int128/kubelogin) installerat
* Åtkomst till Zitadel Admin Console
* Behörigheter som klusteradministratör

### Nödvändig information

* Zitadel-URL (egenhostad eller ZITADEL Cloud)
* **Resurs-ID** (används i Kubernetes API-serverns konfiguration i stället för Client ID)
* OIDC Client ID (från Zitadels [applikationskonfiguration](#2-create-oidc-applications))
* API-serverns slutpunkter för klustret
* Målanvändarens `ClusterRoleBindings` och `RoleBindings`

### Nätverkskrav

* Kubernetes API-servern måste kunna nå Zitadel
* Användare måste kunna nå både Zitadel och API-servern

{{%/ note %}}

## Zitadel-konfiguration

### 1. Skapa ett projekt

Vi rekommenderar att du skapar ett **dedikerat projekt** (eller till och med en organisation, beroende på dina behov) per kluster eller kund.

När projektet har skapats, notera projektets **Resurs-ID** – det kommer att användas i Kubernetes API-serverns konfiguration. Vi använder **Resurs-ID** och inte applikationernas **Client ID**, så att andra applikationer (t.ex. [Headlamp](https://headlamp.dev/)) kan registreras under samma projekt och använda OIDC-inloggningen.

* I projektinställningarna, aktivera följande:
  * Verifiera roller vid autentisering
  * Kontrollera auktorisering vid autentisering
  * Kontrollera projekt vid autentisering
* Se officiella guider för detaljer:
  * [Skapa organisationer](https://zitadel.com/docs/guides/manage/console/organizations)
  * [Skapa projekt](https://zitadel.com/docs/guides/manage/console/projects)

---

### 2. Skapa OIDC-applikationer

Beroende på din miljö, konfigurera en (eller båda) av följande applikationer:

{{% note "Alternativ A" %}}
**Webbapplikation** (webbläsarbaserad inloggning)

* Applikationstyp: `Web Application`
* Autentiseringsmetod: **PKCE**
* Omdirigerings-URI: `http://localhost:8000`
* Aktivera **Development Mode** (krävs för `kubelogin`)
* Tokeninställningar:
  * Använd **JWT**
  * Aktivera: Lägg till användarroller i åtkomsttoken
  * Aktivera: Användarroller i ID-token
  * Aktivera: Användarinformation i ID-token
{{%/ note %}}

{{% note "Alternativ B" %}}
**Native-applikation** (ingen webbläsaråtkomst)

* Applikationstyp: `Native`
* Autentiseringsmetod: **Device Code**
* Tokeninställningarna samma som ovan

{{%/ note %}}

### 3. Konfigurera claims

* Säkerställ att `email`-claim finns
* Konfigurera `groups`-claim för RBAC-integration
* Verifiera korrekt mappning av användarattribut

---

## Uppdatera konfigurationen för Talos-kontrollplanet

Uppdatera Talos maskinkonfiguration med OIDC-inställningar:
```yaml
cluster:
  apiServer:
    extraArgs:
      oidc-client-id: resource-id
      oidc-groups-claim: groups
      oidc-groups-prefix: "zitadel:"
      oidc-issuer-url: https://zitadel.apps.cluster.safespring.com
      oidc-username-claim: email
      oidc-username-prefix: "zitadel:"
```
Redigera konfigurationerna enligt [Talos maskinkonfigurationsguide](https://www.talos.dev/v1.11/talos-guides/configuration/editing-machine-configuration/).

Starta om API-servern vid behov:
```bash
talosctl service kube-apiserver status --nodes <control-plane-node-ip>
talosctl service kube-apiserver restart --nodes <control-plane-node-ip>
```
---

## Konfigurera RBAC

Mappa nu Zitadel-roller till Kubernetes RBAC.

### Mappning av administratörsrollen
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: zitadel-admin
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- apiGroup: rbac.authorization.k8s.io
  kind: Group
  name: zitadel:administrators
```
### Mappning av visningsrollen

Skapa en `ClusterRole` och koppla Zitadel-gruppen `users` till den.
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: oidc-viewer
rules:
- apiGroups: [""]
  resources: ["pods", "services", "nodes"]
  verbs: ["get", "list", "watch"]
- apiGroups: ["apps"]
  resources: ["deployments", "replicasets"]
  verbs: ["get", "list", "watch"]
```

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: oidc-viewer-binding
subjects:
- kind: Group
  name: zitadel:users
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: oidc-viewer
  apiGroup: rbac.authorization.k8s.io
```
---

## Skapa kubeconfig för inloggning

För att kunna använda rollerna mot Kubernetes-API:et behöver vi följa [inställningen för kubelogin OIDC](https://github.com/int128/kubelogin?tab=readme-ov-file#setup) och skapa en `kubeconfig` med oidc-login-alternativ.

Även om [guiden för Kubernetes OpenID Connection-autentisering](https://github.com/int128/kubelogin/blob/master/docs/setup.md) förutsätter en befintlig `kubeconfig` med ett klusterkontext, tillhandahåller vi följande skript för att generera en ny konfiguration:
```bash

#!/usr/bin/env bash
set -euo pipefail

unset KUBECONFIG

usage() {
  cat >&2 <<'USAGE'
Create a kubeconfig that uses kubectl oidc-login as an exec plugin.

Required flags:
  -i  OIDC issuer (host or URL; e.g. zitadel.example.com or https://zitadel.example.com)
  -k  Kubernetes API host (no scheme; e.g. api.your-cluster.com)
  -c  OIDC Client ID (e.g. XXXXXXXXXXXXXXX)

Optional:
  -d  Use Device Code flow (authentication for devices without a browser)
  -h  Show this help and exit

Examples:
  # default (auth code opens browser, depending on kubelogin defaults)
  ./make-kubeconfig.sh -i zitadel.example.com -k api.your-cluster.com -c XXXXXXXXXXXXXXX

  # device code (fully CLI; verify on any browser)
  ./make-kubeconfig.sh -i zitadel.example.com -k api.your-cluster.com -c XXXXXXXXXXXXXXX -d
USAGE
}

ISSUER_IN=""
API_HOST_IN=""
CLIENT_ID=""
DEVICE_MODE=false

while getopts ":i:k:c:dh" opt; do
  case "$opt" in
    i) ISSUER_IN="$OPTARG" ;;
    k) API_HOST_IN="$OPTARG" ;;
    c) CLIENT_ID="$OPTARG" ;;
    d) DEVICE_MODE=true ;;
    h) usage; exit 0 ;;
    \?) echo "Error: invalid option -$OPTARG" >&2; usage; exit 2 ;;
    :)  echo "Error: -$OPTARG requires an argument" >&2; usage; exit 2 ;;
  esac
done

if [[ -z "${ISSUER_IN}" || -z "${API_HOST_IN}" || -z "${CLIENT_ID}" ]]; then
  echo "Error: -i, -k and -c are required." >&2
  usage
  exit 2
fi

# Tooling checks
if ! command -v openssl >/dev/null 2>&1; then
  echo "Error: openssl not found in PATH." >&2
  exit 1
fi
if ! command -v kubectl >/dev/null 2>&1; then
  echo "Error: kubectl not found in PATH." >&2
  exit 1
fi
if ! kubectl oidc-login --help >/dev/null 2>&1; then
  echo "Error: 'kubectl oidc-login' plugin not found." >&2
  echo "       Install via: kubectl krew install oidc-login" >&2
  echo "       or see: https://github.com/int128/kubelogin" >&2
  exit 1
fi

kubectl oidc-login clean >/dev/null 2>&1 || true

case "$ISSUER_IN" in
  http://*|https://*) ISSUER_URL="$ISSUER_IN" ;;
  *)                  ISSUER_URL="https://${ISSUER_IN}" ;;
esac

# Sanitize API host (strip any scheme/path/port or IPv6 brackets)
API_HOST="$(printf '%s\n' "$API_HOST_IN" | awk -F/ '{print $3?$3:$1}')"
API_HOST="${API_HOST#[}"   # drop leading '['
API_HOST="${API_HOST%]}"   # drop trailing ']'
API_HOST="${API_HOST%%:*}" # drop port if present

if [[ -z "$API_HOST" ]]; then
  echo "Error: could not parse a host from -k argument (${API_HOST_IN})." >&2
  exit 2
fi

CONNECT_TARGET="${API_HOST}:6443"
SERVER_NAME="$API_HOST"
SERVER_URL="https://${API_HOST}:6443"

openssl s_client -servername "${SERVER_NAME}" -connect "${CONNECT_TARGET}" < /dev/null 2>/dev/null | openssl x509 > ca.crt

if base64 --help 2>&1 | grep -q -- ' -w'; then
  CA_B64="$(base64 -w0 ca.crt)"
else
  CA_B64="$(base64 < ca.crt | tr -d '\n')"
fi

# Generate config filename from API host
config_base="$API_HOST"
config_base="${config_base#api.}"
config_base="${config_base%.paas.safedc.net}"
config_file="${config_base}-kubeconfig"
cluster_name="$config_base"

# Conditionally add device-code arguments 
DEVICE_ARGS=""
if $DEVICE_MODE; then
  DEVICE_ARGS=$'\n      - --grant-type=device-code\n      - --skip-open-browser'
fi

cat > "${config_file}" <<YAML
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: ${CA_B64}
    server: ${SERVER_URL}
  name: ${cluster_name}
contexts:
- context:
    cluster: ${cluster_name}
    user: oidc
  name: oidc@${cluster_name}
current-context: oidc@${cluster_name}
kind: Config
preferences: {}
users:
- name: oidc
  user:
    exec:
      apiVersion: client.authentication.k8s.io/v1
      args:
      - oidc-login
      - get-token
      - --oidc-issuer-url=${ISSUER_URL}
      - --oidc-client-id=${CLIENT_ID}
      - --oidc-extra-scope=email,profile,groups${DEVICE_ARGS}
      command: kubectl
      env: null
      interactiveMode: Never
      provideClusterInfo: false
YAML

echo "Wrote kubeconfig to ${config_file}"
echo "To use now: export KUBECONFIG=\$PWD/${config_file}"
rm ca.crt
```
Använd skriptet `make-kubeconfig.sh` ovan för att generera en kubeconfig som stödjer OIDC-inloggning via `kubelogin`.

{{% note "Exempel" %}}
```bash
./make_kubeconfig.sh -c <client_id> -i zitadel.apps.cluster.safespring.com -k api.demo.safespring.com
kubectl --kubeconfig=demo-kubeconfig cluster-info

Kubernetes control plane is running at https://api.demo.safespring.com:6443
CoreDNS is running at https://api.demo.safespring.com:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```
{{%/ note %}}

* Med **Auth Code Flow** → ett webbläsarfönster öppnas
* Med **Device Code Flow** → en inloggnings-URL visas

---

## Slutsats

Genom att integrera **Zitadel OIDC-autentisering** med **Talos Kubernetes API-server** kan du centralisera identitetshanteringen, stärka åtkomstsäkerheten och förenkla användarnas arbetsflöden. Med korrekt mappade claims och RBAC-bindningar kan administratörer och användare sömlöst autentisera via Zitadel, samtidigt som Kubernetes upprätthåller finmaskig kontroll genom sitt inbyggda RBAC-system.

Den här konfigurationen ger:

* Stark, standardbaserad autentisering
* Centraliserad identitets- och grupphantering via Zitadel
* Finmaskig auktorisering med Kubernetes RBAC
* En smidig inloggningsupplevelse för utvecklare/administratörer via `kubelogin`

Med denna grund på plats får dina Talos-hanterade kluster en skalbar och säker åtkomstkontrollmodell som harmoniserar identitetshanteringen i hela din infrastruktur.


{{% note "Gillade du vad du just läste?" %}}
Verkar det här passa dina behov?
Tveka inte att höra av dig om du har frågor på hello@safespring.com.
{{% /note %}}