---
title: "Zitadel OIDC Configuration for Talos Kubernetes API Server"
date: 2025-10-03
intro: "The integration uses Zitadel as the identity provider, enabling secure, centralized authentication and authorization."
draft: false
tags: ["English"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "en"
sectiontext: "Tech Update"
section: "Tech update"
author: "Anders Johansson, Ahmet Balci"
TOC: "In this post"
---

{{< ingress >}}
In this guide, we walk through configuring OpenID Connect (OIDC) authentication for the Kubernetes API Server in Talos-managed clusters. 
{{</ ingress >}}

The integration uses [Zitadel](https://zitadel.com/) as the identity provider, enabling secure, centralized authentication and authorization.

We will also leverage the [kubectl OIDC plugin](https://github.com/int128/kubelogin) `kubelogin` for handling OIDC-based logins seamlessly from the command line.

---

## Key Components

* **Identity Provider**: [Zitadel](https://zitadel.com/)
* **Kubernetes API Server**: OIDC-enabled authentication
* **RBAC**: Role-based access control using OIDC claims
* **Cluster Management**: Talos Linux

---

{{% note "Prerequisites" %}}

Before starting, ensure the following are in place.

### Required Tools

* `talosctl` - Talos management CLI
* `kubectl` - Kubernetes CLI with [`kubectl OIDC plugin`](https://github.com/int128/kubelogin) installed
* Access to Zitadel Admin Console
* Cluster admin privileges

### Required Information

* Zitadel URL (self-hosted or ZITADEL Cloud)
* **Resource ID** (used in Kubernetes API server configuration instead of Client ID)
* OIDC Client ID (from Zitadel [application config](#2-create-oidc-applications))
* Cluster API server endpoints
* Target user `ClusterRoleBindings` and `RoleBindings`

### Network Requirements

* The Kubernetes API server must be able to reach Zitadel
* Users must be able to reach both Zitadel and the API server

{{%/ note %}}

## Zitadel Configuration Procedure

### 1. Create a Project

We recommend creating a **dedicated project** (or even an organization, depending on your requirements) per cluster or customer.

Once created, note the **Resource ID** of the project it will be used in Kubernetes API server configuration. We make use of **Resource ID** and not the **Client ID** of the applications, so that the we allow other applications (e.g. [Headlamp](https://headlamp.dev/)) to be registered under the same project and make use of the OIDC login.

* In project settings, enable the following:
  * Assert Roles on Authentication
  * Check Authorization on Authentication
  * Check for Project on Authentication
* See official guides for details:
  * [Creating Organizations](https://zitadel.com/docs/guides/manage/console/organizations)
  * [Creating Projects](https://zitadel.com/docs/guides/manage/console/projects)

---

### 2. Create OIDC Applications

Depending on your environment, set up one (or both) of the following applications:

{{% note "Option A" %}}
**Web Application** (browser-based login)

* Application type: `Web Application`
* Authentication method: **PKCE**
* Redirect URI: `http://localhost:8000`
* Enable **Development Mode** (required for `kubelogin`)
* Token settings:
  * Use **JWT**
  * Enable: Add user roles to the access token
  * Enable: User roles inside ID Token
  * Enable: User Info inside ID Token
{{%/ note %}}

{{% note "Option B" %}}
**Native Application** (no direct browser access). *You will be given an url, but still need a browser to login*

* Application type: `Native`
* Authentication method: **Device Code**
* Token settings same as above

{{%/ note %}}

### 3. Configure Claims

* Ensure `email` claim is present
* Configure `groups` claim for RBAC integration
* Verify correct mapping of user attributes

---

## Update Talos Control Plane Configuration

Update the Talos machine configuration with OIDC settings:

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

Edit configs as per [Talos machine configuration guide](https://www.talos.dev/v1.11/talos-guides/configuration/editing-machine-configuration/).

Restart API server if required:

```bash
talosctl service kube-apiserver status --nodes <control-plane-node-ip>
talosctl service kube-apiserver restart --nodes <control-plane-node-ip>
```

---

## Configure RBAC

Now map Zitadel roles to Kubernetes RBAC.

### Admin Role Mapping

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

### Viewer Role Mapping

Create a `ClusterRole` and bind Zitadel group `users` to it.

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

## Create Kubeconfig for Login

In order to make use of the roles against the Kubernetes API, we need to follow the [kubelogin OIDC setup](https://github.com/int128/kubelogin?tab=readme-ov-file#setup) and create an `kubeconfig` with oidc-login options.

Whilst the [Kubernetes OpenID Connection authentication guide](https://github.com/int128/kubelogin/blob/master/docs/setup.md) assumes an existing `kubeconfig` with a cluster context, for generating a new config we provide the following script:

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

Use the above `make-kubeconfig.sh` script to generate a kubeconfig that supports OIDC login via `kubelogin`.

{{% note "Example" %}}

```bash
./make_kubeconfig.sh -c <client_id> -i zitadel.apps.cluster.safespring.com -k api.demo.safespring.com
kubectl --kubeconfig=demo-kubeconfig cluster-info

Kubernetes control plane is running at https://api.demo.safespring.com:6443
CoreDNS is running at https://api.demo.safespring.com:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

{{%/ note %}}

* With **Auth Code Flow** → a browser window opens
* With **Device Code Flow** → a login URL is displayed

---

## Conclusion

By integrating **Zitadel OIDC authentication** with the **Talos Kubernetes API server**, you can centralize identity management, strengthen access security, and simplify user workflows. With properly mapped claims and RBAC bindings, administrators and users can seamlessly authenticate via Zitadel, while Kubernetes maintains fine-grained control through its native RBAC system.

This setup provides:

* Strong, standards-based authentication
* Centralized identity & group management via Zitadel
* Fine-grained authorization using Kubernetes RBAC
* A smooth developer/admin login experience through `kubelogin`

With this foundation in place, your Talos-managed clusters gain a scalable and secure access control model, aligning identity management across your infrastructure.


{{% note "liked what you just read?" %}}
Does this sound like a good fit for your needs?
Don't hesitate to reach out if you have any questions at hello@safespring.com.
{{% /note %}}