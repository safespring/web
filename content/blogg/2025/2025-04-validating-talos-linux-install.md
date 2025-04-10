---
title: "Validating Talos Linux Install and Maintenance Operations"
date: 2025-04-09
intro: "An accessible approach to operations on a Kubernetes platform, represents a compelling  option for PaaS operators."
draft: false
tags: ["English"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "En"
sectiontext: "Tech Update"
section: "Tech update"
author: "Stefan Negru"
TOC: "In this post"
aliases:
  - /blogg/2025/2025-04-validating-talos-linux-intstall/
---

In a [previous article](https://www.safespring.com/blogg/2025/2025-03-talos-linux-on-openstack/) we started to explore Talos Linux and what that could mean for us, and how we can automate the installation on Safespring OpenStack, but we wanted to go a few steps further in our investigation and look into confirming two more aspects:

1. Validate that Kubernetes cluster and underlying CNI installed correctly.
2. Upgrade both the Operating system and the Kubernetes version.

Both of these elements are aimed to augment our automation efforts but also to provider certainty in our ability to provide a robust kubernetes platform offering. 

Whilst our experience with Talos Linux cluster has been smooth we did encounter a few hurdles we will detail in this article, with the purpose of providing encouragement on how to overcome these hurdles in your setup.

{{% note "Prerequisites" %}}
There are a few prerequisites to to be able to replicate the steps and while we will not go into details Talos Linux cluster setup:
- Talos Linux CLI `talosctl`.
- Kubernetes Command line tool `kubectl`.
- Podman/Docker.
- OpenStack credentials (also include OpenStack ec2 credentials for state s3 store).
- Talos cluster provisioned with [Cilium CNI](https://www.talos.dev/v1.9/kubernetes-guides/network/deploying-cilium/) as well as [Cinder CSI](https://www.safespring.com/blogg/2024/2024-03-cinder-csi-volume-provisioner/).
{{% /note %}}

Onward with the hands-on steps:

## Building a Container Image

As we want to test the cluster installation, we would need to run in a container the command line tools required to validate the cluster installation. For this purpose we prepared the `Dockerfile-talos` below that we need to build and push to a registry.

Thus create a file named `Dockerfile-talos` with the contents:

```dockerfile
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

Building and pushing to a registry e.g. `docker.io`:
```bash
# substitute docker.io/blankdots/talosctl:minimal with your own registry 
podman build -t docker.io/blankdots/talosctl:minimal -f Dockerfile-talos --no-cache
podman push docker.io/blankdots/talosctl:minimal
```

## Creating a Validate Job

In order to be able to validate the cluster via a job that runs inside our newly created Talos cluster, we need to be able to have both a [Service Account](https://kubernetes.io/docs/concepts/security/service-accounts/) with permissions to the right kubernetes API resources as we as [Talos Service Account](https://www.talos.dev/v1.9/advanced/talos-api-access-from-k8s/).

Before that we will create a namespace where to do our validation check:
```bash
kubectl create ns safespring
```

### Setting Access to Kubernetes API Resources

Ensure that the Talos Service Account is enabled either by editing the machine config direct and adding:
```yaml
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

Editing the machine can be done with:
```bash
talosctl --talosconfig .talos/talosconfig edit mc --nodes 10.5.0.2
```


Patching the machine can be done using:
```bash
talosctl --talosconfig .talos/talosconfig --nodes 10.5.0.2 patch mc --patch @patch-rbac.json
```
Where `patch-rbac.json` has the following content:

```json
[
  {"op": "add", "path": "/machine/features/rbac", "value": true},
  {"op": "add", "path": "/machine/features/kubernetesTalosAPIAccess", "value": {"enabled": true}},
  {"op": "add", "path": "/machine/features/kubernetesTalosAPIAccess/allowedRoles", "value": ["os:reader"]},
  {"op": "add", "path": "/machine/features/kubernetesTalosAPIAccess/allowedKubernetesNamespaces", "value": ["kube-system", "safespring"]}
]
```
Next we introduce the service accounts and roles :

```bash
kubectl apply -f service-account.yaml
```

Where `service-account.yaml` has the following content:

```yaml
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


### Script to validate installation 

Let us create a script that will help us validate important aspects of the Talos installation, namely the CNI, CSI as well as Talos API. The script below `validate.sh` includes such parts.

In the code below, notice the storage class name, fast , this needs to be adjusted to your own storage classes. To see storage classes use:
```bash
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

Next we will add the script as a config map to use in the job:

```bash
kubectl create configmap -n safespring validate-script --from-file=validate.sh
```

As the script requires elevated privileges we would need to overwrite pod security standards at the namespace level for `safespring` namespace.

```bash
kubectl label --overwrite ns safespring pod-security.kubernetes.io/audit=privileged pod-security.kubernetes.io/warn=privileged
```

### Creating the Job

```yaml
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

You can see the results of the job:

```bash
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

## Upgrading a Talos Cluster

Upgrading a Talos cluster is pretty straight forward following the instructions with some small hurdles, especially for the kubernetes versions.

### Upgrading Talos Linux

Following the [instructions for upgrading Talos Linux](https://www.talos.dev/v1.9/talos-guides/upgrading-talos/#talosctl-upgrade) is as easy as applying the `talosctl upgrade` command.

```bash
talosctl --talosconfig .talos/talosconfig upgrade --image ghcr.io/siderolabs/installer:v1.9.5
# add --nodes <node> to target a specific node
```
### Upgrading Talos Kubernetes Version

Upgrading the kubernetes version is [straight forward by following the instructions](https://www.talos.dev/v1.9/kubernetes-guides/upgrading-kubernetes/), however in our case we installed Cilium CNI with a job and that presents a challenge when upgrading.

Our demo cluster has version `1.31.5` of Kubernetes and we want to ugprade to `1.32.3`:
```bash
➜ kubectl get nodes        
NAME                              STATUS   ROLES           AGE   VERSION
dev-taloscluster-controlplane-1   Ready    control-plane   57m   v1.31.5
dev-taloscluster-worker-1         Ready    <none>          57m   v1.31.5
```

Let us try the upgrade command:

```bash
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

We notice that the Job we have used in `inlineManifest` presents a challenge to the upgrade; a simple solution to that would be to edit the talos config and remove the problematic section.

```bash
talosctl --talosconfig talosconfig --nodes 10.5.0.2 patch mc --patch @remove-inlinemanifests.json
```

where `remove-inlinemanifests.json` contains

```json
[
  {
    "op": "remove",
    "path": "/cluster/inlineManifests"
  }
]
```

An alternative to this solution would be making use of [`extraManifests`](https://www.talos.dev/v1.9/reference/configuration/v1alpha1/config/#Config.cluster) as detailed in [Talos helm install of Cilium](https://www.talos.dev/v1.9/kubernetes-guides/network/deploying-cilium/#method-1-helm-install), however the URLs need to either public or access via basic auth e.g. `https://username:password@url`.

## Troubleshooting

A few notes on installing Cilium CNI to consider:

- Enabling `bpf.hostLegacyRouting=true` for Cilium to work with Talos Linux installation documented in official [Cilium docs](https://docs.cilium.io/en/stable/installation/k8s-install-helm/#install-cilium).
- One of the reasons we need to validate the internet connectivity was started from making Cilium DNS work as there seems to be is an issue with version `1.6.5` see [this comment](https://github.com/cilium/cilium/issues/36761#issuecomment-2560353729) and [issue 66](https://github.com/isejalabs/homelab/issues/66): 
  - "Cilium now uses BPF Host Routing in `1.16.5`, which is conflicting with `forwardKubeDNSToHost` in Talos. Setting `bpf.hostLegacyRouting=true` in your Cilium reverts to the behaviour used in `1.16.4` and earlier. This eliminates the need for disabling `forwardKubeDNSToHost` in Talos".


## Conclusion: Operations on Talos Linux

Talos Linux offers an accessible approach to operations on Kubernetes infrastructure and to reinforce our previous conclusion on Talos' promise of delivering a secure, immutable, and operationally efficient foundation for modern infrastructure. From verifying Cilium and Cinder CSI functionality to upgrading both the OS and Kubernetes versions, Talos demonstrated its ability to offer a streamlined and automated path for cluster lifecycle management.

As we continue our journey in refining infrastructure automation on Safespring's OpenStack, Talos Linux presents a compelling option for operators who value predictability, security, and GitOps-native workflows in their Kubernetes environments. We hope this hands-on deep dive helps you better prepare for deploying and managing Talos Linux in your own setups.


{{% note "liked what you just read?" %}}
Does this sound like a good fit for your needs?
Don't hesitate to reach out if you have any questions at hello@safespring.com.
{{% /note %}}

