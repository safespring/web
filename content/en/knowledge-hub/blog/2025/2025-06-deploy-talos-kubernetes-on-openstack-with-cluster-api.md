---
title: "Deploy Talos Kubernetes on OpenStack with Cluster API"
date: 2025-06-12
intro: "Making Use of Cluster API to Create Talos-based Kubernetes Clusters On Openstack."
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
author: "Stefan Negru"
TOC: "In this post"
aliases:
  - /blogg/2025/2025-04-validating-talos-linux-intstall/
---

# 

{{< ingress >}}
A step-by-step guide to declaratively provision, configure, and manage Talos Linux Kubernetes clusters on Safespring’s OpenStack infrastructure using CAPO and ClusterResourceSets.
{{< /ingress >}}

In this article we want to take a few steps further our investigation into Talos Linux and how we can make use of it in [Safespring Compute Infrastructure (OpenStack)](https://www.safespring.com/en/services/compute/), and at the same time have a more in depth exploration of the automate installation and make use of [Kubernetes Cluster API](https://cluster-api.sigs.k8s.io/).

{{% note "Focus areas" %}}
Things we wanted to illustrate in this technical exploration:

1. What is Cluster API and how to get started
2. How to make use of Cluster API Provider OpenStack and Safespring Computer Infrastructure to install a Talos Kubernetes Cluster
3. Making use of Cluster Resource Sets to configure resources in a Talos Kubernetes Cluster

{{% /note %}}

## What is Cluster API?

As Kubernetes has matured, the need for standardized infrastructure lifecycle management has become more apparent. The **Cluster API (CAPI)** project, developed by the Kubernetes SIG Cluster Lifecycle, addresses this need. It provides a Kubernetes-style declarative API to manage the lifecycle of Kubernetes clusters—spanning creation, scaling, upgrading, and deletion—across different infrastructure providers.

In essence, Cluster API allows you to manage entire Kubernetes clusters as you would manage applications with Kubernetes manifests. It decouples infrastructure provisioning from the core logic of your workloads and standardizes how Kubernetes clusters are created and managed across various environments.

### Enter CAPO: Cluster API Provider OpenStack

**CAPO** stands for **Cluster API Provider OpenStack**. It is the infrastructure provider implementation for Cluster API that enables the provisioning and management of Kubernetes clusters on **OpenStack** cloud environments.

If you're using OpenStack as your infrastructure provider and want to automate and standardize Kubernetes cluster lifecycle management, CAPO is the tool you need.

---

### Key Components

Using CAPO involves several moving parts:

1. **Management Cluster**: A Kubernetes cluster running Cluster API controllers (including CAPO). It is responsible for managing the lifecycle of *target* Kubernetes clusters.
2. [**Infrastructure Provider (CAPO)**](https://cluster-api-openstack.sigs.k8s.io/): This is the controller that understands how to create and manage OpenStack resources (instances, networks, security groups, etc.) based on the Cluster API CRDs (Custom Resource Definitions).
3. **Custom Resource Definitions (CRDs)**: CAPO introduces OpenStack-specific CRDs like `OpenStackCluster`, `OpenStackMachine`, and `OpenStackClusterTemplate`, which allow you to declaratively define your target cluster's desired state.
4. **Bootstrap Provider**: For the purpose of our use case we will use [Cluster API Bootstrap Provider Talos (CABPT)](https://github.com/siderolabs/cluster-api-bootstrap-provider-talos) which is used along side [Cluster API Control Plane Provider Talos (CACPPT) ](https://github.com/siderolabs/cluster-api-control-plane-provider-talos). Other tools like **kubeadm** are typically used to bootstrap the Kubernetes nodes during creation.
5. **ClusterResourceSet**: a declarative way to associate Kubernetes resources with a cluster, ensuring that specific manifests are applied automatically when a cluster is provisioned using Cluster API.


## Getting Started

There are a few prerequisites to be able to replicate the steps and while we will not go into details Talos Linux cluster setup.

{{% note "Prerequisites" %}}
- `kubectl`, `clusterctl`, `helm` 
- OpenStack credentials (also include OpenStack ec2 credentials for state s3 store), additionally this tutorial makes use of [Safespring Elastic IP](https://docs.safespring.com/new/elastic-ip/) so make sure that is enabled.
   - Talos image `1.10.3` present in OpenStack, see [previous article](https://www.safespring.com/blogg/2025/2025-03-talos-linux-on-openstack/) for information how to create it
{{% /note %}}

1. **Set up your management cluster**: This can be any Kubernetes cluster even [`kind`](https://kind.sigs.k8s.io/), or see how we set up a cluster in a [previous article](https://www.safespring.com/blogg/2025/2025-03-talos-linux-on-openstack/).
2. **Install Cluster API components** using the [Cluster API CLI `clusterctl`](https://cluster-api.sigs.k8s.io/clusterctl/overview.html).

```bash
export KUBECONFIG=<kubeconfig_for_management_cluster>
CAPO_VERSION=v0.12.3
# Install ORC (needed for CAPO >=v0.12)
kubectl apply -f https://github.com/k-orc/openstack-resource-controller/releases/latest/download/install.yaml
# Initialize the management cluster with bootstrap provider talos 
# as well as control plane talos
# log verbosity is set highest for us to follow what it does

clusterctl init -c talos -b talos --infrastructure openstack:$CAPO_VERSION -v 5

# if we want to install with Cluster API Add-on Provider Helm 
clusterctl init -c talos -b talos --infrastructure openstack:$CAPO_VERSION --addon helm -v 5 
```

After successful installation you should be able to see the following pods running:

```bash
NAMESPACE                       NAME                                                  READY   STATUS      RESTARTS   AGE
...
# caaph-system only present if the Cluster API Add-on Provider Helm  was installed
caaph-system                    caaph-controller-manager-f8867899f-hpft2              1/1     Running     0          1h
cabpt-system                    cabpt-controller-manager-b96c47fbf-7wdj4              1/1     Running     0          1h
cacppt-system                   cacppt-controller-manager-5b655c8bb6-sh9kt            1/1     Running     0          1h
capi-system                     capi-controller-manager-7ffb6df7df-c7rhj              1/1     Running     0          1h
capo-system                     capo-controller-manager-f5675885f-pmht4               1/1     Running     0          1h
...
orc-system                      orc-controller-manager-594d544cd7-25qlr               1/1     Running     0          1h
...

```

With that we conclude the management cluster components, namely:

- **Cluster API Core Manager**: This controller (*CAPI*) is responsible for orchestrating the overall lifecycle of Kubernetes clusters. It manages the core Cluster API resources like `Cluster`, `Machine`, `MachineDeployment`, and `MachineSet`, which define the desired state of a Kubernetes cluster in a provider-agnostic way. These core resources reference additional provider-specific resources to complete the cluster configuration. The actual infrastructure and bootstrapping logic are handled by separate provider components.
- **Bootstrap Provider**: *Talos Bootstrap Provider (CABPT)* is responsible for generating machine configurations tailored for Talos Linux. These configurations—encapsulated in TalosConfig custom resources—are consumed by Talos nodes during the initialization process. CABPT converts abstract `Machine` definitions into Talos-based Kubernetes nodes, enabling secure and immutable cluster bootstrapping. Working in tandem with CABPT, the *Talos Control Plane Provider (CACPPT)* manages the full lifecycle of Talos-based control plane nodes. It uses the Talos APIs to provision and configure the control plane according to the desired state defined by Cluster API. CACPPT ensures correct etcd cluster formation, high availability, and consistent state across control plane nodes.
- **Infrastructure Provider**: The infrastructure provider (*CAPO*) is responsible for provisioning the underlying cloud or on-prem infrastructure—such as virtual machines, networking, and storage—based on the cluster specification. It leverages the machine configuration generated by the bootstrap provider (i.e., `TalosConfigTemplate`) to initialize nodes with the appropriate role and configuration. Once provisioned, these machines boot into Talos and join the cluster automatically.


See more details at [The Cluster API Book](https://cluster-api.sigs.k8s.io/user/concepts).

---

## Creating a Workload Cluster

{{% note "Note" %}}
The [Cluster API Quickstart Guide](https://cluster-api.sigs.k8s.io/user/quick-start#create-your-first-workload-cluster) as well as the [SideroLabs Cluster API templates](https://github.com/siderolabs/cluster-api-templates) provide a very good basis for creating and understanding the required configuration for a workload cluster we recommend to go over them.
{{% /note %}}

Our strategy for creating a Workload Cluster includes first creating `ClusterResourceSet`s which provide the mechanism to automatically apply a set of resources (such as CNI/CSI/CCM) to workload clusters. `ClusterResourceSet` CRD provides a basic solution for installing & managing resources, whilst for advanced use cases the general recommendation is to use the addon provider such as the [Cluster API Add-on Provider Helm](https://github.com/kubernetes-sigs/cluster-api-addon-provider-helm).

The second part details creating the YAML with the necessary Custom Resource Definitions (CRD) specific to *CAPI* and *CAPO*, but also to the Talos Bootstrap and Control Plane providers.


### 1. Create Cluster Resource Sets

In our example we will illustrate just `ClusterResourceSet` as the [Cluster API Add-on Provider Helm as of the release of this blog is not updated for version 1.10.0](https://github.com/kubernetes-sigs/cluster-api-addon-provider-helm/issues/371).

First thing to point out, is that good to be aware of the `strategy` field, which can be either `Reconcile` or `ApplyOnce`, the distinction can be made that with `Reconcile` once workload clusters are ready there is an effort to continuously maintain state of the resources in the workload cluster, whereas the `ApplyOnce` only syncs once.

Another important part are the labels which allow to target installing the `ClusterResourceSet` to a `Cluster` if the label is set on that `Cluster` CRD.

We will make use of the `safespring` namespace to create the cluster an store all the required CRD for creating a Workload Cluster.

{{% note "Note" %}}
As the `ClusterResourceSet` get applied with labels, thus we recommend for the to be namespaced otherwise there is a risk of upgrading all clusters when updating them.
{{% /note %}}

```bash
kubectl create ns safespring
```

As a the first setup in the cluster we will be configuring Cinder CSI along with the necessary storage classes so that we have persistent volumes available upon cluster creation:

```bash
cat > cloud.conf <<EOF
[Global]
auth-url="<your_auth_url>"
application-credential-id=" <your_credential_id>"
application-credential-secret="<your_credential_secret>"
[LoadBalancer]
enabled = false
EOF

kubectl create secret generic cloud-config --from-file=cloud.conf --dry-run=client -o yaml -n kube-system > cloud-secret.yaml

kubectl create secret generic cloud-config --from-file=cloud-secret.yaml --type=addons.cluster.x-k8s.io/resource-set -n safespring-demo

kubectl create configmap cinder-csi-controllerplugin-rbac -n safespring --from-literal=cinder-csi-controllerplugin-rbac.yaml="$(curl -k https://raw.githubusercontent.com/kubernetes/cloud-provider-openstack/refs/heads/master/manifests/cinder-csi-plugin/cinder-csi-controllerplugin-rbac.yaml)"

kubectl create configmap cinder-csi-controllerplugin -n safespring --from-literal=cinder-csi-controllerplugin.yaml="$(curl -k https://raw.githubusercontent.com/kubernetes/cloud-provider-openstack/refs/heads/master/manifests/cinder-csi-plugin/cinder-csi-controllerplugin.yaml)"

kubectl create configmap cinder-csi-nodeplugin-rbac -n safespring --from-literal=cinder-csi-nodeplugin-rbac.yaml="$(curl -k https://raw.githubusercontent.com/kubernetes/cloud-provider-openstack/refs/heads/master/manifests/cinder-csi-plugin/cinder-csi-nodeplugin-rbac.yaml)"

kubectl create configmap cinder-csi-nodeplugin -n safespring --from-literal=cinder-csi-nodeplugin.yaml="$(curl -k https://raw.githubusercontent.com/kubernetes/cloud-provider-openstack/refs/heads/master/manifests/cinder-csi-plugin/cinder-csi-nodeplugin.yaml)"

kubectl create configmap csi-cinder-driver -n safespring --from-literal=csi-cinder-driver.yaml="$(curl -k https://raw.githubusercontent.com/kubernetes/cloud-provider-openstack/refs/heads/master/manifests/cinder-csi-plugin/csi-cinder-driver.yaml)"

cat > storage-classes.yaml <<EOF
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: large
  annotations: { storageclass.kubernetes.io/is-default-class: "true" }
provisioner: cinder.csi.openstack.org
volumeBindingMode: Immediate
allowVolumeExpansion: true
reclaimPolicy: Delete
parameters:
  type: large
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast
  annotations: { storageclass.kubernetes.io/is-default-class: "false" }
provisioner: cinder.csi.openstack.org
volumeBindingMode: Immediate
allowVolumeExpansion: true
reclaimPolicy: Delete
parameters:
  type: fast
EOF

kubectl create configmap -n safespring storage-classes --from-file=storage-classes.yaml 

cat <<EOF | kubectl apply -f -
apiVersion: addons.cluster.x-k8s.io/v1beta1
kind: ClusterResourceSet
metadata:
  name: cloud-provider-openstack
  namespace: safespring
spec:
  strategy: Reconcile
  clusterSelector:
    matchLabels:
      cloud: openstack
  resources:
    - name: cloud-config
      kind: Secret
    - name: cinder-csi-controllerplugin-rbac
      kind: ConfigMap
    - name: cinder-csi-controllerplugin
      kind: ConfigMap
    - name: cinder-csi-nodeplugin
      kind: ConfigMap
    - name: cinder-csi-nodeplugin-rbac
      kind: ConfigMap
    - name: csi-cinder-driver
      kind: ConfigMap
    - name: storage-classes
      kind: ConfigMap
EOF
```

We will also configure Nginx Ingress as well as Cert-manager with helm template to generate the necessary YAML in a `ConfigMap`.

```bash
helm template ingress-nginx ingress-nginx/ingress-nginx --namespace ingress-nginx --create-namespace --version $NGINX_VERSION  --set controller.metrics.enabled=true --set controller.hostNetwork=true --set controller.hostPort.enabled=true --set controller.kind=DaemonSet --set controller.service.enabled=false --set controller.admissionWebhooks.enabled=false > nginx-ingress.yaml

kubectl create configmap -n safespring nginx-install --from-file=nginx-ingress.yaml

cat <<EOF | kubectl apply -f -
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-ns
  namespace: safespring
data:
  namespace-create: |
    apiVersion: v1
    kind: Namespace
    metadata:
      name: ingress-nginx
      labels:
        pod-security.kubernetes.io/enforce: privileged
        pod-security.kubernetes.io/enforce-version: latest
        pod-security.kubernetes.io/audit: privileged
        pod-security.kubernetes.io/warn: privileged
        name: ingress-nginx
---
apiVersion: addons.cluster.x-k8s.io/v1beta1
kind: ClusterResourceSet
metadata:
  name: nginx-installation
  namespace: safespring
spec:
  clusterSelector:
    matchLabels:
      ingress: nginx
  resources:
    - kind: ConfigMap
      name: nginx-ns
    - kind: ConfigMap
      name: nginx-install
  strategy: Reconcile
EOF
```

With cert-manager we will also create a `ClusterIssuer` to make it easier to request certificates.

```bash
helm template cert-manager jetstack/cert-manager --namespace cert-manager --create-namespace --version v1.17.2 --set crds.enabled=true > cert-manager-v1.17.2.yaml

kubectl create configmap -n safespring cert-manager --from-file=cert-manager-v1.17.2.yaml

cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: cluster-issuer-letsencrypt-prod
  namespace: safespring
data:
  cluster_issuer: |
    apiVersion: cert-manager.io/v1
    kind: ClusterIssuer
    metadata:
      name: letsencrypt-prod
    spec:
      acme:
        email: not-valid@safespring.com
        privateKeySecretRef:
          name: letsencrypt-prod
        server: https://acme-v02.api.letsencrypt.org/directory
        solvers:
        - http01:
            ingress:
              ingressClassName: nginx
          selector: {}
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: cert-manager-ns
  namespace: safespring
data:
  namespace-create: |
    apiVersion: v1
    kind: Namespace
    metadata:
      name: cert-manager
      labels:
        name: cert-manager
---
apiVersion: addons.cluster.x-k8s.io/v1beta1
kind: ClusterResourceSet
metadata:
  name: cert-manager-installation
  namespace: safespring
spec:
  clusterSelector:
    matchLabels:
      component: cert-manager
  resources:
    - kind: ConfigMap
      name: cert-manager-ns
    - kind: ConfigMap
      name: cert-manager
    - kind: ConfigMap
      name: cluster-issuer-letsencrypt-prod
  strategy: Reconcile
EOF
```

### 2. Create Machine Templates and Cluster Custom Resources

```bash
cat > clouds.yaml <<EOF
clouds:
  openstack:
    auth:
      application_credential_id: <your_credential_id>
      application_credential_secret: <your_credential_secret>
      auth_url: <your_auth_url>
      project_name: <project_name>
      user_domain_name: users
    auth_type: v3applicationcredential
    identity_api_version: 3
    interface: public
    region_name: <region_name>
EOF
```

In order for the `cloud-config` to be used as `kind: Secret` in a `ClusterResourceSet` it needs to be stored as kubernetes secret thus we will make use of `--dry-run=client` to create the YAML.

```bash
kubectl create secret generic safespring-demo-cloud-config --from-file=clouds.yaml='clouds.yaml' --from-literal=cacert="" -n safespring

kubectl label secret -n safespring safespring-demo-cloud-config clusterctl.cluster.x-k8s.io/move=true

# https://cluster-api-openstack.sigs.k8s.io/clusteropenstack/configuration.html
#  Set clusterctl.cluster.x-k8s.io/move label for the secret created from OPENSTACK_CLOUD_YAML_B64 in order to successfully move objects from bootstrap cluster to target cluster. 
```

For more information on getting application credentials see our documentation on how to [create application credentials](https://docs.safespring.com/new/app-creds/#creating-application-credentials-using-the-dashboard).


```yaml
apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
kind: OpenStackMachineTemplate
metadata:
  name: safespring-demo-control-plane
  namespace: safespring
spec:
  template:
    spec:
      # For flavours options consult: https://docs.safespring.com/new/flavors/ 
      flavor: l2.c8r16.100
      image:
        filter:
          # adjust to the name of the image in openstack
          name: talos-image-v1.10.3
---
apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
kind: OpenStackMachineTemplate
metadata:
  name: safespring-demo-md-0
  namespace: safespring
spec:
  template:
    spec:
      # For flavours options consult: https://docs.safespring.com/new/flavors/ 
      flavor: l2.c4r8.100
      image:
        filter:
          # adjust to the name of the image in openstack
          name: talos-image-v1.10.3
---
apiVersion: bootstrap.cluster.x-k8s.io/v1alpha3
kind: TalosConfigTemplate
metadata:
  name: safespring-demo-md-0
  namespace: safespring
spec:
  template:
    spec:
      generateType: join
      # adjust to the your talos version
      talosVersion: 1.10.3
```

For the purpose of this tutorial we would need two [elastic IPS](https://docs.safespring.com/new/elastic-ip/). At the same time notice that the Cilium CNI installation is done via `inlineManifests`with the `bgpControlPlane.enabled=true` flag so that [BGP Peering Policy](https://docs.cilium.io/en/latest/network/bgp-control-plane/bgp-control-plane-v1/) is enabled.

{{% note "Note" %}}
Long term we recommend migrating to [BGP Control Plane Resources](https://docs.cilium.io/en/stable/network/bgp-control-plane/bgp-control-plane-v2/).
{{% /note %}}

```yaml

apiVersion: cluster.x-k8s.io/v1beta1
kind: MachineDeployment
metadata:
  name: safespring-demo-md-0
  namespace: safespring
spec:
  clusterName: safespring-demo
  # adjust to the desired number of worker nodes
  replicas: 2
  selector:
    matchLabels: null
  template:
    spec:
      bootstrap:
        configRef:
          apiVersion: bootstrap.cluster.x-k8s.io/v1alpha3
          kind: TalosConfigTemplate
          name: safespring-demo-md-0
      clusterName: safespring-demo
      failureDomain: nova
      infrastructureRef:
        apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
        kind: OpenStackMachineTemplate
        name: safespring-demo-md-0
      # adjust to the desired kubernetes version
      version: v1.32.4

---
apiVersion: controlplane.cluster.x-k8s.io/v1alpha3
kind: TalosControlPlane
metadata:
  name: safespring-demo-control-plane
  namespace: safespring-demo
spec:
  infrastructureTemplate:
    kind: OpenStackMachineTemplate
    apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
    name: safespring-demo-control-plane
    namespace: safespring-demo
  controlPlaneConfig:
    controlplane:
      generateType: controlplane
      # adjust to the your talos version
      talosVersion: 1.10.3
      configPatches:
      - op: add
        # this is required to deploy the cloud-controller-manager 
        # which is responsible for running cloud specific controllers
        path: /cluster/externalCloudProvider
        value:
          enabled: true
          manifests:
              - https://raw.githubusercontent.com/kubernetes/cloud-provider-openstack/master/manifests/controller-manager/cloud-controller-manager-roles.yaml
              - https://raw.githubusercontent.com/kubernetes/cloud-provider-openstack/master/manifests/controller-manager/cloud-controller-manager-role-bindings.yaml
              - https://raw.githubusercontent.com/kubernetes/cloud-provider-openstack/master/manifests/controller-manager/openstack-cloud-controller-manager-ds.yaml
      - op: add
        path: /machine/certSANs
        value:
          # adjust to the desired FQDN 
          - api.demo.safespring.eu
          # adjust to control plane available elastic IPS
          # see https://docs.safespring.com/new/elastic-ip/
          - "255.255.255.254"
      - op: add
        path: /cluster/proxy
        value:
          disabled: true
      - op: add
        path: /cluster/network/cni
        value:
          name: none
      - op: add
        path: /machine/network/interfaces
        value:
          - deviceSelector:
              hardwareAddr: "00:00:00:00:00:00"
            addresses:
            # adjust to control plane available elastic IPS
            # see https://docs.safespring.com/new/elastic-ip/
              - 255.255.255.254/32
      - op: add
        path: /cluster/inlineManifests
        value:
          - name: cilium-install
            contents: |
              ---
              apiVersion: rbac.authorization.k8s.io/v1
              kind: ClusterRoleBinding
              metadata:
                name: cilium-install
              roleRef:
                apiGroup: rbac.authorization.k8s.io
                kind: ClusterRole
                name: cluster-admin
              subjects:
              - kind: ServiceAccount
                name: cilium-install
                namespace: kube-system
              ---
              apiVersion: v1
              kind: ServiceAccount
              metadata:
                name: cilium-install
                namespace: kube-system
              ---
              apiVersion: batch/v1
              kind: Job
              metadata:
                name: cilium-install
                namespace: kube-system
              spec:
                backoffLimit: 10
                template:
                  metadata:
                    labels:
                      app: cilium-install
                  spec:
                    restartPolicy: OnFailure
                    tolerations:
                      - operator: Exists
                      - effect: NoSchedule
                        operator: Exists
                      - effect: NoExecute
                        operator: Exists
                      - effect: PreferNoSchedule
                        operator: Exists
                      - key: node-role.kubernetes.io/control-plane
                        operator: Exists
                        effect: NoSchedule
                      - key: node-role.kubernetes.io/control-plane
                        operator: Exists
                        effect: NoExecute
                      - key: node-role.kubernetes.io/control-plane
                        operator: Exists
                        effect: PreferNoSchedule
                    affinity:
                      nodeAffinity:
                        requiredDuringSchedulingIgnoredDuringExecution:
                          nodeSelectorTerms:
                            - matchExpressions:
                                - key: node-role.kubernetes.io/control-plane
                                  operator: Exists
                    serviceAccount: cilium-install
                    serviceAccountName: cilium-install
                    hostNetwork: true
                    containers:
                    - name: cilium-install
                      image: quay.io/cilium/cilium-cli-ci:v0.16.22
                      env:
                      - name: KUBERNETES_SERVICE_HOST
                        valueFrom:
                          fieldRef:
                            apiVersion: v1
                            fieldPath: status.podIP
                      - name: KUBERNETES_SERVICE_PORT
                        value: "6443"
                      command:
                        - cilium
                        - install
                        - --set
                        - ipam.mode=kubernetes
                        - --set
                        - kubeProxyReplacement=true
                        - --set
                        - securityContext.capabilities.ciliumAgent={CHOWN,KILL,NET_ADMIN,NET_RAW,IPC_LOCK,SYS_ADMIN,SYS_RESOURCE,DAC_OVERRIDE,FOWNER,SETGID,SETUID}
                        - --set
                        - securityContext.capabilities.cleanCiliumState={NET_ADMIN,SYS_ADMIN,SYS_RESOURCE}
                        - --set
                        - cgroup.autoMount.enabled=false
                        - --set
                        - cgroup.hostRoot=/sys/fs/cgroup
                        - --set
                        - k8sServiceHost=localhost
                        - --set
                        - k8sServicePort=7445
                        - --set
                        - bpf.hostLegacyRouting=true
                        - --set
                        - bpf.masquerade=true
                        - --set
                        - hubble.enabled=true
                        - --set
                        - hubble.metrics.enabled=dns:query
                        - --set
                        - hubble.metrics.enabled={drop,tcp,flow,port-distribution,icmp,http}
                        - --set
                        - bgpControlPlane.enabled=true
                        - --version=1.17.4
          - name: "bgp-boilerplate-configmap"
            contents: |
              apiVersion: "cilium.io/v2alpha1"
              kind: CiliumLoadBalancerIPPool
              metadata:
                name: "cilium-lb-pool"
                labels:
                  bgp-announce: "control"
              spec:
                blocks:
                  # adjust to control plane available elastic IPS
                  # see https://docs.safespring.com/new/elastic-ip/
                  - cidr: "255.255.255.254/32"
              ---
              apiVersion: cilium.io/v2alpha1
              kind: CiliumBGPPeeringPolicy
              metadata:
                name: custom-policy
              spec:
                nodeSelector:
                  matchLabels:
                    node-role.kubernetes.io/control-plane: "" 
                virtualRouters:
                - exportPodCIDR: true
                  # adjust to correct ASN
                  # see https://docs.safespring.com/new/elastic-ip/
                  localASN: 99999
                  neighbors:
                  - connectRetryTimeSeconds: 120
                    eBGPMultihopTTL: 5
                    holdTimeSeconds: 90
                    keepAliveTimeSeconds: 30
                    peerASN: 64700
                    # adjust to correct peerAddress
                    # see https://docs.safespring.com/new/elastic-ip/
                    peerAddress: 255.255.255.253/32
                    peerPort: 179
                  serviceSelector:
                    matchLabels:
                      bgp-announce: "control"
              ---
              apiVersion: cilium.io/v2alpha1
              kind: CiliumBGPPeeringPolicy
              metadata:
                name: custom-policy-worker
              spec:
                nodeSelector:
                  matchExpressions:
                    - key: node-role.kubernetes.io/control-plane
                      operator: DoesNotExist
                virtualRouters:
                - exportPodCIDR: false
                  # adjust to correct ASN
                  # see https://docs.safespring.com/new/elastic-ip/
                  localASN: 99999
                  neighbors:
                  - connectRetryTimeSeconds: 120
                    eBGPMultihopTTL: 5
                    holdTimeSeconds: 90
                    keepAliveTimeSeconds: 30
                    # adjust to correct peerAddress
                    # see https://docs.safespring.com/new/elastic-ip/
                    peerAddress: 255.255.255.253/32
                    peerPort: 179
                  serviceSelector:
                    matchLabels:
                      bgp-announce: "worker"
              ---
              apiVersion: v1
              kind: Service
              metadata:
                name: bgp-control
                namespace: kube-system
                labels:
                  bgp-announce: "control"
                annotations:
                  io.cilium/lb-ipam-announce: "true"
              spec:
                type: LoadBalancer
                externalIPs:
                  # adjust to control plane available elastic IPS
                  # see https://docs.safespring.com/new/elastic-ip/
                  - 255.255.255.254
                ports:
                  - protocol: TCP
                    port: 6443
                    targetPort: 6443
              ---
              apiVersion: v1
              kind: Service
              metadata:
                name: bgp-worker
                namespace: kube-system
                labels:
                  bgp-announce: "worker"
                annotations:
                  io.cilium/lb-ipam-announce: "true"
              spec:
                type: LoadBalancer
                externalIPs:
                  # adjust to worker node available elastic IPS
                  # see https://docs.safespring.com/new/elastic-ip/
                  - 255.255.255.255
                ports:
                  - protocol: TCP
                    port: 50000
                    targetPort: 50000
  # adjust to the desired number of control planes
  replicas: 1
  # adjust to the desired kubernetes version
  version: v1.32.4
```

Now for the actual cluster specification, notice that for this cluster we apply one one label `cloud=openstack` by default, in order to exemplify the other `ClusterResourceSet` after the cluster has been installed.

```yaml
apiVersion: cluster.x-k8s.io/v1beta1
kind: Cluster
metadata:
  name: safespring-demo
  namespace: safespring-demo
  labels:
    cloud: openstack
spec:
  clusterNetwork:
    pods:
      cidrBlocks:
      - 192.168.0.0/16
    serviceDomain: cluster.local
  controlPlaneRef:
    apiVersion: controlplane.cluster.x-k8s.io/v1alpha3
    kind: TalosControlPlane
    name: safespring-demo-control-plane
  infrastructureRef:
    apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
    kind: OpenStackCluster
    name: safespring-demo
---
apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
kind: OpenStackCluster
metadata:
  name: safespring-demo
  namespace: safespring-demo
spec:
  # adjust to control plane available elastic IPS
  # see https://docs.safespring.com/new/elastic-ip/
  apiServerFixedIP:  255.255.255.254
  disableAPIServerFloatingIP: true
  network:
    # adjust to the elastic IPS network id in the openstack project
    id: <external_network_id>
  externalNetwork:
    # adjust to the elastic IPs network id in the openstack project
    id:  <external_network_id>
  identityRef:
    cloudName: openstack
    name: safespring-demo-cloud-config
  managedSecurityGroups:
    allNodesSecurityGroupRules:
    - description: Created by cluster-api-provider - Talos API nodes
      direction: ingress
      etherType: IPv4
      name: Talos-API-NODES
      portRangeMax: 50001
      portRangeMin: 50000
      protocol: tcp
      remoteIPPrefix: "10.72.0.0/20"
    - description: Created by cluster-api-provider - Talos API LB
      direction: ingress
      etherType: IPv4
      name: Talos-API-LB
      portRangeMax: 50000
      portRangeMin: 50000
      protocol: tcp
      # this means the talosctl control port is open to the world
      # adjust as seen fit
      remoteIPPrefix: "0.0.0.0/0"
    - description: Created by cluster-api-provider - cilium vxlan overlay egress
      direction: egress
      etherType: IPv4
      name: cilium-vxlan-udp-egress
      portRangeMax: 8472
      portRangeMin: 8472
      protocol: udp
      remoteManagedGroups:
          - controlplane
          - worker
    - description: Created by cluster-api-provider - cilium vxlan overlay ingress
      direction: ingress
      etherType: IPv4
      name: cilium-vxlan-udp-ingress
      portRangeMax: 8472
      portRangeMin: 8472
      protocol: udp
      remoteManagedGroups:
          - controlplane
          - worker
    - description: Created by cluster-api-provider - Cilium health checks
      direction: ingress
      etherType: IPv4
      name: Cilium-Health-Checks
      portRangeMax: 4240
      portRangeMin: 4240
      protocol: tcp
      remoteManagedGroups:
          - controlplane
          - worker
    - description: Created by cluster-api-provider - ICMP Echo Request/Reply ingress
      direction: ingress
      etherType: IPv4
      name: ICMP-Echo-ingress
      protocol: icmp
      portRangeMin: 8
      portRangeMax: 0
      remoteManagedGroups:
          - controlplane
          - worker
    - description: Created by cluster-api-provider - ICMP Echo Request/Reply egress
      direction: egress
      etherType: IPv4
      name: ICMP-Echo-egress
      protocol: icmp
      portRangeMin: 8
      portRangeMax: 0
      remoteManagedGroups:
          - controlplane
          - worker
```


Save the above configuration and apply it `kubectl apply -f adjusted-cluster-config.yaml`.

### 3. The Result

```bash
➜  kubectl get cluster -A
NAMESPACE         NAME              CLUSTERCLASS   PHASE         AGE     VERSION
safespring        safespring-demo                  Provisioned   3m55s   
➜  clusterctl get kubeconfig safespring-demo -n safespring > capi-quickstart.kubeconfig
➜  kubectl --kubeconfig=./capi-quickstart.kubeconfig get nodes
NAME                                  STATUS   ROLES           AGE     VERSION
safespring-demo-control-plane-7r42k   Ready    control-plane   3m17s   v1.32.4
safespring-demo-md-0-rknp6-2gkkz      Ready    <none>          3m11s   v1.32.4
safespring-demo-md-0-rknp6-hg2s9      Ready    <none>          3m13s   v1.32.4
➜  kubectl --kubeconfig=./capi-quickstart.kubeconfig get pods -A -w                                
NAMESPACE     NAME                                                          READY   STATUS      RESTARTS      AGE
kube-system   cilium-8fwmd                                                  1/1     Running     0             18m
kube-system   cilium-9rl6z                                                  1/1     Running     0             18m
kube-system   cilium-9sthp                                                  1/1     Running     0             18m
kube-system   cilium-envoy-bpg7z                                            1/1     Running     0             18m
kube-system   cilium-envoy-m6xw4                                            1/1     Running     0             18m
kube-system   cilium-envoy-rqcdk                                            1/1     Running     0             18m
kube-system   cilium-install-cs5gg                                          0/1     Completed   0             19m
kube-system   cilium-operator-7b8cb89c45-6c55h                              1/1     Running     0             18m
kube-system   coredns-78d87fb69b-2lzzf                                      1/1     Running     0             19m
kube-system   coredns-78d87fb69b-hbq7q                                      1/1     Running     0             19m
kube-system   csi-cinder-controllerplugin-55b78fd85b-j6xgk                  6/6     Running     0             3m24s
kube-system   csi-cinder-nodeplugin-fbmv4                                   3/3     Running     0             3m15s
kube-system   csi-cinder-nodeplugin-k74nk                                   3/3     Running     0             3m18s
kube-system   csi-cinder-nodeplugin-lzppj                                   3/3     Running     0             3m18s
kube-system   kube-apiserver-safespring-demo-control-plane-7r42k            1/1     Running     0             19m
kube-system   kube-controller-manager-safespring-demo-control-plane-7r42k   1/1     Running     2 (19m ago)   19m
kube-system   kube-scheduler-safespring-demo-control-plane-7r42k            1/1     Running     2 (19m ago)   19m
kube-system   openstack-cloud-controller-manager-zbf9p                      1/1     Running     0             4m3s

```

{{% note "Note" %}}
We will make use of labels to demonstrate how the `ClusterResourceSet` get applied, to **all the clusters** in that namespace that have those labels.
{{% /note %}}

```bash
➜  kubectl label cluster -n safespring safespring-demo component=cert-manager 
cluster.cluster.x-k8s.io/safespring-demo labeled
➜  kubectl label cluster -n safespring safespring-demo ingress=nginx
cluster.cluster.x-k8s.io/safespring-demo labeled
➜  kubectl --kubeconfig=./capi-quickstart.kubeconfig get pods -A   
NAMESPACE       NAME                                                          READY   STATUS      RESTARTS      AGE
cert-manager    cert-manager-7d67448f59-7bns8                                 1/1     Running     0             2m38s
cert-manager    cert-manager-cainjector-666b8b6b66-khq4j                      1/1     Running     0             2m38s
cert-manager    cert-manager-startupapicheck-694cb                            0/1     Completed   0             2m38s
cert-manager    cert-manager-webhook-78cb4cf989-jwvk4                         1/1     Running     0             2m38s
ingress-nginx   ingress-nginx-controller-mgnhb                                1/1     Running     0             25s
ingress-nginx   ingress-nginx-controller-nv52z                                1/1     Running     0             25s
kube-system     cilium-cc5s9                                                  1/1     Running     0             8m40s
kube-system     cilium-chmc4                                                  1/1     Running     0             8m40s
kube-system     cilium-envoy-hh59m                                            1/1     Running     0             8m40s
kube-system     cilium-envoy-n6znv                                            1/1     Running     0             8m40s
kube-system     cilium-envoy-ppdzm                                            1/1     Running     0             8m40s
kube-system     cilium-install-2mqxh                                          0/1     Completed   0             9m51s
kube-system     cilium-l6777                                                  1/1     Running     0             8m40s
kube-system     cilium-operator-7b8cb89c45-ccvvr                              1/1     Running     0             8m40s
kube-system     coredns-78d87fb69b-8k72g                                      1/1     Running     0             9m50s
kube-system     coredns-78d87fb69b-zdlb9                                      1/1     Running     0             9m50s
kube-system     csi-cinder-controllerplugin-55b78fd85b-pp5g9                  6/6     Running     0             7m33s
kube-system     csi-cinder-nodeplugin-2ntjp                                   3/3     Running     0             7m33s
kube-system     csi-cinder-nodeplugin-jrl76                                   3/3     Running     0             7m33s
kube-system     csi-cinder-nodeplugin-xhsg2                                   3/3     Running     0             7m33s
kube-system     kube-apiserver-safespring-demo-control-plane-8gfwb            1/1     Running     0             9m47s
kube-system     kube-controller-manager-safespring-demo-control-plane-8gfwb   1/1     Running     2 (10m ago)   9m47s
kube-system     kube-scheduler-safespring-demo-control-plane-8gfwb            1/1     Running     2 (10m ago)   9m47s
kube-system     openstack-cloud-controller-manager-p6nlw                      1/1     Running     0             8m15s

```
Creating a persistent volume:

```bash
➜  kubectl --kubeconfig=./capi-quickstart.kubeconfig apply -f - <<EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: csi-pvc-test
  namespace: default
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: fast
EOF
persistentvolumeclaim/csi-pvc-test created
➜  kubectl --kubeconfig=./capi-quickstart.kubeconfig get pvc -A        
NAMESPACE   NAME           STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   VOLUMEATTRIBUTESCLASS   AGE
default     csi-pvc-test   Bound    pvc-feac6f5f-9137-4ab0-9b77-3032483a7828   1Gi        RWO            fast           <unset>                 8s

```

---

## Conclusion or Why Use Cluster API with CAPO?

**Declarative Lifecycle Management**: Define your cluster state in YAML manifests and apply changes over time as needed—just like you do with pods and services.

**Cloud Agnostic**: Using CAPI with CAPO abstracts cluster lifecycle operations. If you later move to a different cloud, you can switch infrastructure providers (e.g., AWS, Azure) with minimal change to your workflow.

**Consistent Automation**: Avoid hand-crafted automation scripts and embrace community-tested controllers and APIs that ensure reliable cluster creation and upgrades.

**Advanced Features**: CAPO supports a range of OpenStack features such as: *Multiple availability zones*, *Custom image and flavor support*, *Cinder-based storage*, *Floating IPs for control planes and worker nodes* (if the OpenStack installation allows that) as well as [auto scaling](https://cluster-api.sigs.k8s.io/tasks/automated-machine-management/autoscaling).


{{% note "liked what you just read?" %}}
Does this sound like a good fit for your needs?
Don't hesitate to reach out if you have any questions at hello@safespring.com.
{{% /note %}}

