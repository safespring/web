---
title: "Using Talos Linux and Kubernetes bootstrap on OpenStack"
date: 2025-03-03
intro: "We consider that automation, security and common IaC tools to be the holy trinity for a robust kubernetes platform offering. "
draft: false
tags: ["container"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "en"
sectiontext: "Blog"
section: "Tech update"
author: "Anders Johansson"
TOC: "In this post"
aliases:
  - /blogg/2025/2024-02-engineering-plans/
  - /blogg/2025/2025-03-talos-linux-on-openstack/
---

{{< ingress >}}
When it comes to container orchestration, Kubernetes is the de facto standard. And there are many different flavors of Kubernetes distributions and ways of provisioning them. So we started to explore what Talos Linux could mean for us.  
{{< /ingress >}}

Things we wanted to have answered while doing that:

1. **Automation**, can we do this with automation?
2. **Security**, needs to be secure by default with minimal overhead for users.
3. **Usage of common IaCs** and other tools need to be supported.

We consider that this is the holy trinity for a robust kubernetes platform offering. And being able to do all of them is key for success: An automatable, secure by default, and repeatable solution.

With that in mind, we choose Talos Linux from Sidero Labs, as it comes with a sane secure-by-default implementation. Things like no SSH access to nodes and an extensible API with support for the common use cases when it comes to modern container-based operations.

And also a really small footprint with resources[^1]. With such a small footprint, it was a given.

And the Talos Linux system only has 12 unique binaries, whereas a common distribution like Ubuntu server 22.04 has a minimum of 1,500 binaries. Less binaries means less exposure equals more secure. And ease of maintenance.

## Lets get started with the fun stuff

There are a few prerequisites to get this going, we will keep this at a high level and will not go into Openstack specific details in this post.

{{% note "Prerequisites" %}}

- You need `talosctl` and `kubectl`.
- OpenStack credentials.
  - also include openstack ec2 credentials for state s3 store.
- Talos image present in OpenStack.
  {{% /note %}}

To configure and upload[^2] a talos[^3] image to openstack use the following guide:

```bash
inputs_schematic: 376567988ad370138ad8b2698212367b8edcb69b5fd68c80be1f2ec7d603b4ba
inputs_version: v1.9.4

wget https://factory.talos.dev/image/${inputs_schematic}/${inputs_version}/openstack-amd64.raw.xz
unxz openstack-amd64.raw.xz
openstack image create --disk-format raw --container-format bare --community --file ./openstack-amd64.raw talos-image-${inputs_version}
rm -f openstack-amd64.raw.xz openstack-amd64.raw
```

_With the tooling prerequisites in place we also will need to have created a HaProxy load balancer and a DNS entry for the cluster._

Now lets generate a Talos Config:

```bash
talosctl gen config \
    "name-of-cluster" \
    "fqdn_endpoint:6443" \
    --kubernetes-version 1.30.4  \
    --output talosconfig_dir \
    --config-patch @patch/cluster.yaml \
    --config-patch-control-plane @patch/patch-controlplane.yaml \
    --config-patch-worker @patch/patch-worker.yaml \
    --with-examples=false \
    --with-docs=false
```

{{% note "Note" %}}
The options `with-example` and `with-docs` are for keeping the configuration clean free and from examples or docs.
{{% /note %}}

The above will generate an Talos config and put it in the `talosconfig_dir`. And will also generate 3 patch files one for each type of node controlplane, worker and one general for the cluster.

Before we continue lets set the API Endpoint for the cluster and which node we should interact with.

```bash
talosctl config endpoint "https://fqdn"
talosctl config node "https://fdqn"
```

_The following is an example configuration that also showcase how to install a custom cni (Cilium in this case) with a kubernetes job._

Cluster config:

```yaml
machine:
  seccompProfiles:
    - name: audit.json
      value:
        defaultAction: SCMP_ACT_LOG
  kubelet:
    extraArgs:
      rotate-server-certificates: true
    extraConfig:
      featureGates:
        UserNamespacesSupport: true
        UserNamespacesPodSecurityStandards: true
  sysctls:
    user.max_user_namespaces: "11255"

cluster:
  adminKubeconfig:
    certLifetime: 2160h0m0s # 90 days
  apiServer:
    auditPolicy:
      apiVersion: audit.k8s.io/v1
      kind: Policy
      rules:
        - level: Metadata
    extraArgs:
      feature-gates: UserNamespacesSupport=true,UserNamespacesPodSecurityStandards=true
  network:
    cni:
      name: none
  proxy:
    disabled: true
  extraManifests:
    # these are added due to the option of rotate-server-certificates which needs a way to approve certificates
    # https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/
    - https://raw.githubusercontent.com/alex1989hu/kubelet-serving-cert-approver/main/deploy/standalone-install.yaml
    - https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
  inlineManifests:
    - name: cilium-install
      contents: |
        ---
        # https://www.talos.dev/v1.9/kubernetes-guides/network/deploying-cilium/#method-5-using-a-job
```

Then we will create one for Control Plane:

```yaml
# control plane config
machine:
  type: controlplane
  features:
    rbac: true # Enable role-based access control (RBAC).

    # Configure Talos API access from Kubernetes pods.
    kubernetesTalosAPIAccess:
      enabled: true # Enable Talos API access from Kubernetes pods.
      # The list of Talos API roles which can be granted for access from Kubernetes pods.
      allowedRoles:
        - os:reader
      #     # The list of Kubernetes namespaces Talos API access is available from.
      allowedKubernetesNamespaces:
        - kube-system
```

And lastly we will create one for the workers:

```yaml
# separate worker node config
machine:
  type: worker
  nodeLabels:
    node-role.kubernetes.io/worker: worker
```

A machine configuration can also be patched after the fact:

```bash
talosctl machineconfig patch worker.yaml --patch @patches/patch.yaml -o worker1.yaml
```

And on a running Talos node you can patch the machine config using the following:

```bash
talosctl patch mc --nodes 1.2.3.4 --patch @patches/patch.yaml
```

{{% note "retrieve kubconfig" %}}
When we set the `rotate-server-certificates` option to `true`, the new kubconfig can retrieved by using:

```bash
talosctl kubeconfig kubeconfig_<path>
```

{{% /note %}}

Nodes can be provisioned with OpenStack and Opentofu provider.
Assuming that we have the OpenStack infrastructure setup with Opentofu we can now create a Kubernetes cluster with Talos Linux using the `null_resource` and `local-exec` provisioner:

```yaml
resource "null_resource" "talos_bootstrap" {
  depends_on = [null_resource.a_records, null_resource.apply_haproxy_config]
  provisioner "local-exec" {
    interpreter = ["bash", "-c"]
    command     = <<EOT
#!/bin/bash

# wait for DNS propagation
timeout 300 perl -e 'print("Waiting for DNS propagation ...\n"), sleep(10) while `nc -w 2 -z ${local.api_endpoint} 6443 2>&1`' 0

# bootstrap the cluster using fqdn endpoint configured in talosconfig
talosctl --talosconfig "${var.talosconfig_dir}/talosconfig" bootstrap

# wait for the cluster to be ready
timeout 300 perl -e 'print("Waiting for ${local.api_endpoint}:6443 ...\n"), sleep(10) while `curl -k https://${local.lb_ip}:6443 2>&1 2>/dev/null` !~ 401' 0

# save the kubeconfig
echo "saving kubeconfig in ${var.kubeconfigs_dir}"
talosctl --talosconfig "${var.talosconfig_dir}/talosconfig" kubeconfig "${var.kubeconfigs_dir}/kubeconfig-${local.cluster_fqdn}"
export KUBECONFIG="${var.kubeconfigs_dir}/kubeconfig-${local.cluster_fqdn}"

EOT
  }
}
```

This wil give you a ready to use barebone kubernetes cluster.  
Run the below to verify access to the cluster.

```
kubectl get nodes -o wide
```

## Conclusion: Why Talos Linux?

Talos Linux offers a modern approach to Kubernetes infrastructure by:

- {{< inline "Minimal Attack Surface" >}} Only 12 unique binaries vs. 1,500 in traditional distributions. Why? Every additional package is a potential security vulnerability. More code means more potential entry points for attackers. By reducing the system to just 12 essential binaries, Talos dramatically shrinks the potential attack surface, making it significantly harder for malicious actors to exploit the system.
- {{< inline "Immutable Security" >}} No SSH, API-driven management Why? Traditional server management relies on direct SSH access, which creates numerous security risks: manual changes, configuration drift, and potential human error. By eliminating SSH and using an API-driven approach, Talos ensures that all changes are deliberate, traceable, and can be version-controlled, preventing unauthorized or undocumented modifications.
- {{< inline "Cloud-Native Simplicity" >}} Built for modern, automated infrastructure. Why? Modern cloud environments demand infrastructure that can be quickly spun up, torn down, and precisely replicated. Traditional operating systems are designed for static, long-running servers. Talos is built from the ground up to support dynamic, containerized environments, making it seamless to integrate with CI/CD pipelines and infrastructure-as-code workflows.
- {{< inline "Operational Efficiency" >}} Reduces complexity, enhances reliability. Why? IT teams spend countless hours troubleshooting configuration issues, managing system updates, and maintaining complex server environments. Talos simplifies this by providing a purpose-built Kubernetes OS that removes most manual management tasks, allowing teams to focus on delivering value rather than maintaining infrastructure.

This is why we chose Talos Linux, Talos offers a pragmatic path forward. It's not about chasing the latest trend, instead we aim to have a good foundation for solving real obstacles: by reducing security risks, by minimizing configuration errors, and by making infrastructure more predictable. Think of it less as a revolutionary technology and more as a practical tool that aligns with how modern infrastructure should work—simple, secure, and reproducible.

{{% note "liked what you just read?" %}}
Does this sound like a good fit for your needs?
Don't hesitate to reach out if you have any questions at hello@safespring.com.
{{% /note %}}

## References and link

[^1]: Read more about [Talos System Requirements](https://www.talos.dev/v1.9/introduction/system-requirements/#minimum-requirements).

[^2]: Read more about how to upload an image in the [Safespring documentation about images](https://docs.safespring.com/compute/image/#uploading-an-image-by-customer).

[^3]: More information about the [Talos Image Factory](https://factory.talos.dev/).
