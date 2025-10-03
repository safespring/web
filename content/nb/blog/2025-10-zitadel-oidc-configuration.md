---
ai: true
title: "Zitadel OIDC-konfigurasjon for Talos Kubernetes API-server"
date: 2025-10-03
intro: "Integrasjonen bruker Zitadel som identitetsleverandør, noe som muliggjør sikker, sentralisert autentisering og autorisering."
draft: false
tags: ["English"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "nb"
sectiontext: "Teknologioppdatering"
section: "Tech update"
author: "Anders Johansson, Ahmet Balci"
TOC: "I dette innlegget"
---
{{< ingress >}}
I denne veiledningen går vi gjennom konfigurasjon av OpenID Connect (OIDC)-autentisering for Kubernetes API-serveren i Talos-administrerte klynger. 
{{</ ingress >}}

Integrasjonen bruker [Zitadel](https://zitadel.com/) som identitetsleverandør, og muliggjør sikker, sentralisert autentisering og autorisasjon.

Vi vil også bruke [kubectl OIDC-tillegg](https://github.com/int128/kubelogin) `kubelogin` for å håndtere OIDC-baserte pålogginger sømløst fra kommandolinjen.

---

## Nøkkelkomponenter

* **Identitetsleverandør**: [Zitadel](https://zitadel.com/)
* **Kubernetes API-server**: OIDC-aktivert autentisering
* **RBAC**: Rollebassert tilgangskontroll med OIDC-påstander
* **Klyngeadministrasjon**: Talos Linux

---

{{% note "Forutsetninger" %}}

Før du starter, sørg for at følgende er på plass.

### Nødvendige verktøy

* `talosctl` - Talos administrasjons-CLI
* `kubectl` - Kubernetes CLI med [`kubectl OIDC-tillegg`](https://github.com/int128/kubelogin) installert
* Tilgang til Zitadel Admin Console
* Rettigheter som klyngeadministrator

### Nødvendig informasjon

* Zitadel-URL (selvhostet eller ZITADEL Cloud)
* **Resource ID** (brukes i konfigurasjonen av Kubernetes API-serveren i stedet for Client ID)
* OIDC Client ID (fra Zitadel [applikasjonskonfigurasjon](#2-create-oidc-applications))
* API-serverendepunkter for klyngen
* Målbrukers `ClusterRoleBindings` og `RoleBindings`

### Nettverkskrav

* Kubernetes API-serveren må kunne nå Zitadel
* Brukere må kunne nå både Zitadel og API-serveren

{{%/ note %}}

## Fremgangsmåte for konfigurasjon av Zitadel

### 1. Opprett et prosjekt

Vi anbefaler å opprette et **eget prosjekt** (eller til og med en organisasjon, avhengig av behov) per klynge eller kunde.

Når prosjektet er opprettet, noter deg prosjektets **Resource ID**; den vil brukes i konfigurasjonen av Kubernetes API-serveren. Vi bruker **Resource ID** og ikke applikasjonenes **Client ID**, slik at andre applikasjoner (f.eks. [Headlamp](https://headlamp.dev/)) kan registreres under samme prosjekt og bruke OIDC-påloggingen.

* I prosjektinnstillingene, aktiver følgende:
  * Assert Roles on Authentication
  * Check Authorization on Authentication
  * Check for Project on Authentication
* Se offisielle veiledninger for detaljer:
  * [Opprette organisasjoner](https://zitadel.com/docs/guides/manage/console/organizations)
  * [Opprette prosjekter](https://zitadel.com/docs/guides/manage/console/projects)

---

### 2. Opprett OIDC-applikasjoner

Avhengig av miljøet ditt, sett opp én (eller begge) av følgende applikasjoner:

{{% note "Alternativ A" %}}
**Web-applikasjon** (pålogging via nettleser)

* Applikasjonstype: `Web Application`
* Autentiseringsmetode: **PKCE**
* Redirect URI: `http://localhost:8000`
* Aktiver **Development Mode** (kreves for `kubelogin`)
* Token-innstillinger:
  * Bruk **JWT**
  * Aktiver: Legg til brukerroller i access token
  * Aktiver: Brukerroller i ID Token
  * Aktiver: Brukerinformasjon i ID Token
{{%/ note %}}

{{% note "Alternativ B" %}}
**Native-applikasjon** (ingen nettlesertilgang)

* Applikasjonstype: `Native`
* Autentiseringsmetode: **Device Code**
* Token-innstillinger som over

{{%/ note %}}

### 3. Konfigurer claims

* Sørg for at email-claim er til stede
* Konfigurer groups-claim for RBAC-integrasjon
* Sjekk at mappingen av brukerattributter er korrekt

---

## Oppdater konfigurasjonen for Talos-kontrollplanet

Oppdater Talos-maskinkonfigurasjonen med OIDC-innstillinger:
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
Rediger konfigurasjonene i henhold til [veiledningen for Talos-maskinkonfigurasjon](https://www.talos.dev/v1.11/talos-guides/configuration/editing-machine-configuration/).

Start API-serveren på nytt ved behov:
```bash
talosctl service kube-apiserver status --nodes <control-plane-node-ip>
talosctl service kube-apiserver restart --nodes <control-plane-node-ip>
```
---

## Konfigurer RBAC

Tilordne nå Zitadel-roller til Kubernetes RBAC.

### Tilordning av admin-rolle
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
### Rollekartlegging for Viewer

Opprett en `ClusterRole` og knytt Zitadel-gruppen `users` til den.
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

## Opprett kubeconfig for innlogging

For å kunne bruke rollene mot Kubernetes-API-et må vi følge [kubelogin OIDC-oppsett](https://github.com/int128/kubelogin?tab=readme-ov-file#setup) og opprette en `kubeconfig` med oidc-login-alternativer.

Selv om [Kubernetes OpenID Connect-autentiseringsveiledning](https://github.com/int128/kubelogin/blob/master/docs/setup.md) forutsetter en eksisterende `kubeconfig` med en klyngekontekst, tilbyr vi følgende skript for å generere en ny konfigurasjon:
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
Bruk skriptet `make-kubeconfig.sh` ovenfor til å generere en kubeconfig som støtter OIDC-innlogging via `kubelogin`.

{{% note "Eksempel" %}}
```bash
./make_kubeconfig.sh -c <client_id> -i zitadel.apps.cluster.safespring.com -k api.demo.safespring.com
kubectl --kubeconfig=demo-kubeconfig cluster-info

Kubernetes control plane is running at https://api.demo.safespring.com:6443
CoreDNS is running at https://api.demo.safespring.com:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```
{{%/ note %}}

* Med **Auth Code Flow** → et nettleservindu åpnes
* Med **Device Code Flow** → en innloggings-URL vises

---

## Konklusjon

Ved å integrere **Zitadel OIDC-autentisering** med **Talos Kubernetes API-server**, kan du sentralisere identitetsforvaltning, styrke tilgangssikkerheten og forenkle brukerflyter. Med riktig mappede claims og RBAC-bindinger kan administratorer og brukere sømløst autentisere seg via Zitadel, mens Kubernetes opprettholder fingranulert kontroll gjennom sitt innebygde RBAC-system.

Dette oppsettet gir:

* Sterk, standardbasert autentisering
* Sentralisert identitets- og gruppehåndtering via Zitadel
* Fingranulert autorisasjon med Kubernetes RBAC
* En smidig innloggingsopplevelse for utviklere/administratorer via `kubelogin`

Med dette som grunnlag får Talos-administrerte klynger en skalerbar og sikker tilgangskontrollmodell som harmoniserer identitetsforvaltning på tvers av infrastrukturen.


{{% note "likte du det du nettopp leste?" %}}
Høres dette ut som en god match for dine behov?
Ikke nøl med å ta kontakt hvis du har spørsmål på hello@safespring.com.
{{% /note %}}