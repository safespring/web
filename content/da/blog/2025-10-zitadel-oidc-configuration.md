---
ai: true
title: "Zitadel OIDC-konfiguration til Talos Kubernetes API-server"
date: 2025-10-03
intro: "Integrationen bruger Zitadel som identitetsudbyder, hvilket muliggør sikker, centraliseret autentificering og autorisation."
draft: false
tags: ["English"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "da"
sectiontext: "Teknologiopdatering"
section: "Tech update"
author: "Anders Johansson, Ahmet Balci"
TOC: "I dette indlæg"
---
{{< ingress >}}
I denne vejledning gennemgår vi konfiguration af OpenID Connect (OIDC)-godkendelse for Kubernetes API-serveren i Talos-administrerede klynger. 
{{</ ingress >}}

Integrationen bruger [Zitadel](https://zitadel.com/) som identitetsudbyder, hvilket muliggør sikker, centraliseret godkendelse og autorisation.

Vi vil også bruge [kubectl OIDC-plugin](https://github.com/int128/kubelogin) `kubelogin` til at håndtere OIDC-baserede logins problemfrit fra kommandolinjen.

---

## Vigtige komponenter

* **Identitetsudbyder**: [Zitadel](https://zitadel.com/)
* **Kubernetes API-server**: OIDC-aktiveret godkendelse
* **RBAC**: Rollebaseret adgangskontrol ved hjælp af OIDC-claims
* **Klyngeadministration**: Talos Linux

---

{{% note "Forudsætninger" %}}

Før du starter, skal følgende være på plads.

### Påkrævede værktøjer

* `talosctl` - Talos administrations-CLI
* `kubectl` - Kubernetes CLI med [`kubectl OIDC plugin`](https://github.com/int128/kubelogin) installeret
* Adgang til Zitadel Admin Console
* Klyngeadministratorrettigheder

### Påkrævede oplysninger

* Zitadel-URL (selvhostet eller ZITADEL Cloud)
* **Ressource-ID** (bruges i Kubernetes API-serverkonfiguration i stedet for Klient-ID)
* OIDC Klient-ID (fra Zitadel [applikationskonfiguration](#2-create-oidc-applications))
* API-serverens slutpunkter for klyngen
* Målbrugeres `ClusterRoleBindings` og `RoleBindings`

### Netværkskrav

* Kubernetes API-serveren skal kunne nå Zitadel
* Brugere skal kunne nå både Zitadel og API-serveren

{{%/ note %}}

## Zitadel-konfigurationsprocedure

### 1. Opret et projekt

Vi anbefaler at oprette et dedikeret projekt (eller endda en organisation, afhængigt af dine behov) pr. klynge eller kunde.

Når det er oprettet, skal du notere projektets **Ressource-ID**; det skal bruges i Kubernetes API-serverens konfiguration. Vi bruger **Ressource-ID** og ikke applikationernes **Klient-ID**, så vi kan lade andre applikationer (f.eks. [Headlamp](https://headlamp.dev/)) blive registreret under samme projekt og benytte OIDC-login.

* I projektindstillingerne skal du aktivere følgende:
  * Bekræft roller ved godkendelse
  * Kontrollér autorisation ved godkendelse
  * Kontrollér projekt ved godkendelse
* Se de officielle vejledninger for detaljer:
  * [Oprettelse af organisationer](https://zitadel.com/docs/guides/manage/console/organizations)
  * [Oprettelse af projekter](https://zitadel.com/docs/guides/manage/console/projects)

---

### 2. Opret OIDC-applikationer

Afhængigt af dit miljø skal du opsætte en eller begge af følgende applikationer:

{{% note "Mulighed A" %}}
**Webapplikation** (browser-baseret login)

* Applikationstype: `Web Application`
* Godkendelsesmetode: **PKCE**
* Omdirigerings-URI: `http://localhost:8000`
* Aktivér **Development Mode** (påkrævet for kubelogin)
* Token-indstillinger:
  * Brug **JWT**
  * Aktivér: Tilføj brugerroller til adgangstokenet
  * Aktivér: Brugerroller i ID-tokenet
  * Aktivér: Brugerinfo i ID-tokenet
{{%/ note %}}

{{% note "Mulighed B" %}}
**Native applikation** (ingen browseradgang)

* Applikationstype: `Native`
* Godkendelsesmetode: **Device Code**
* Token-indstillinger som ovenfor

{{%/ note %}}

### 3. Konfigurer claims

* Sørg for, at email-claimet er til stede
* Konfigurer groups-claimet til RBAC-integration
* Bekræft korrekt kortlægning af brugerattributter

---

## Opdater Talos-kontrolplanens konfiguration

Opdater Talos-maskinkonfigurationen med OIDC-indstillinger:
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
Rediger konfigurationerne som beskrevet i [vejledningen til Talos-maskinkonfiguration](https://www.talos.dev/v1.11/talos-guides/configuration/editing-machine-configuration/).

Genstart API-serveren om nødvendigt:
```bash
talosctl service kube-apiserver status --nodes <control-plane-node-ip>
talosctl service kube-apiserver restart --nodes <control-plane-node-ip>
```
---

## Konfigurer RBAC

Tilknyt nu Zitadel-roller til Kubernetes RBAC.

### Tilknytning af adminrolle
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
### Kortlægning af Viewer-rolle

Opret en `ClusterRole` og bind Zitadel-gruppen `users` til den.
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

## Opret kubeconfig til login

For at kunne bruge rollerne mod Kubernetes API'et skal vi følge [kubelogin OIDC-opsætning](https://github.com/int128/kubelogin?tab=readme-ov-file#setup) og oprette en `kubeconfig` med oidc-login-indstillinger.

Selvom [Kubernetes OpenID Connect-autentificeringsvejledning](https://github.com/int128/kubelogin/blob/master/docs/setup.md) forudsætter en eksisterende `kubeconfig` med en klyngekontekst, stiller vi til generering af en ny konfiguration følgende script til rådighed:
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
Brug ovenstående `make-kubeconfig.sh`-script til at generere en kubeconfig, der understøtter OIDC-login via `kubelogin`.

{{% note "Eksempel" %}}
```bash
./make_kubeconfig.sh -c <client_id> -i zitadel.apps.cluster.safespring.com -k api.demo.safespring.com
kubectl --kubeconfig=demo-kubeconfig cluster-info

Kubernetes control plane is running at https://api.demo.safespring.com:6443
CoreDNS is running at https://api.demo.safespring.com:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```
{{%/ note %}}

* Med **Auth Code Flow** → et browservindue åbnes
* Med **Device Code Flow** → en login-URL vises

---

## Konklusion

Ved at integrere **Zitadel OIDC-godkendelse** med **Talos Kubernetes API-serveren** kan du centralisere identitetsstyring, styrke adgangssikkerheden og forenkle brugerarbejdsgange. Med korrekt kortlagte claims og RBAC-bindinger kan administratorer og brugere problemfrit autentificere via Zitadel, mens Kubernetes bevarer finmasket kontrol gennem sit indbyggede RBAC-system.

Denne opsætning giver:

* Stærk, standardbaseret godkendelse
* Centraliseret identitets- og gruppestyring via Zitadel
* Finmasket autorisation med Kubernetes RBAC
* En gnidningsfri login-oplevelse for udviklere/administratorer via `kubelogin`

Med dette fundament får dine Talos-administrerede klynger en skalerbar og sikker adgangskontrolmodel, der harmoniserer identitetsstyringen på tværs af din infrastruktur.


{{% note "Kunne du lide det, du lige læste?" %}}
Lyder dette som et godt match til dine behov?
Tøv ikke med at kontakte os på hello@safespring.com, hvis du har spørgsmål.
{{% /note %}}