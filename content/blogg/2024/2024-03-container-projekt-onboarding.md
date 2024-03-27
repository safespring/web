---
title: "Kubernetes Project Onboarding Guide"
date: "2024-03-27"
intro: "This tool is crafted for IT architects, DevOps engineers, and technical teams eager to integrate company-specific workflows into Kubernetes, fostering a seamless, efficient management system."
draft: false
section: "Tech update"
author: "Niklas Hagman"
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "En"
TOC: "In this guide"
sidebarlinkname: "GitHub repository"
sidebarlinkurl: "https://github.com/safespring/container-platform/tree/project-onboarding/project-onboarding"
sidebarlinkicon: "fa-arrow-up-right-from-square"
---


{{< ingress >}}
Welcome to Project Onboarding - a transformative approach to simplifying namespace management in Kubernetes for multi-tenant environments. 
{{< /ingress >}}

This tool is crafted for IT architects, DevOps engineers, and technical teams eager to integrate company-specific workflows into Kubernetes, fostering a seamless, efficient management system. Project Onboarding stands at the intersection of innovation and simplicity, offering a robust solution to the complexities often encountered in Kubernetes namespace management.

## Why Project Onboarding?

Managing Kubernetes objects and namespaces can be daunting, especially in multi-tenancy scenarios where precision and security are paramount. Project Onboarding introduces an elegant solution, leveraging the power of automation to simplify the onboarding process for new namespaces, thus allowing your team to concentrate on delivering value rather than navigating the intricacies of Kubernetes configurations.

Imagine a world where namespace management is as straightforward as applying a few labels. With Project Onboarding, this becomes reality. By defining your requirements through simple labels, you initiate a series of automated processes that configure namespaces to meet your exact needs, from resource quotas and network policies to role bindings - all orchestrated without manual intervention.

```yaml
kind: Namespace
apiVersion: v1
metadata:
  name: glassproj-appname-acc
  labels:
    project-onboarding/managed-by: selfservice-api
    project-onboarding/compute-limits-cpu: "10"
    project-onboarding/compute-limits-memory: 8Gi
    project-onboarding/storage-size: 50Gi
    project-onboarding/team: glassproj
```

This YAML snippet exemplifies how a new namespace `glassproj-appname-acc` can be created with comprehensive configurations using labels. It's a testament to how Project Onboarding empowers teams to define complex settings effortlessly, focusing on application development and deployment.

### Key Features
- **Simplified Namespace Management**: Streamline the creation and maintenance of Kubernetes namespaces using labels.
- **Automation First**: Utilize the Namespace Configuration Operator to automate the enforcement of policies, roles, and quotas based on specified labels.
- **Multi-Tenancy Made Easy**: Ensure secure and isolated multi-tenant environments with customizable network policies and resource quotas.
- **OpenShift & Kubernetes Compatibility**: Designed for flexibility, Project Onboarding seamlessly integrates with both Kubernetes and OpenShift environments, supported by Helm and Kustomize for a smooth setup experience.

Project Onboarding is more than just a tool; it's a new perspective on Kubernetes management, inviting you to rethink how namespaces are handled within your infrastructure. It's about enabling teams, enhancing security, and promoting efficiency through intelligent automation.


## Namespace configurations

This automation leverages the [Namespace Configuration Operator](https://github.com/redhat-cop/namespace-configuration-operator) from Red Hat's Communities of Practice, an excellent tool for tracking labels in namespaces and OpenShift's groups or users, making it a cornerstone of our Project Onboarding.

Here's a glimpse into how these resource definitions for Namespace Configuration Operator are organized within the Project Onboarding structure:

```text
.
└── namespace-configuration
    └── configuration
        ├── all
        │   └── NamespaceConfig
        │       ├── networkpolicies
        │       │   ├── networkpolicies-multitenancy.yaml
        │       │   └── networkpolicies-team.yaml
        │       │
        │       ├── resourcequotas
        │       │   ├── compute-limits-cpu-default.yaml
        │       │   ├── compute-limits-cpu.yaml
        │       │   ├── compute-limits-memory-default.yaml
        │       │   ├── compute-limits-memory.yaml
        │       │   ├── storage-csi-cinder-sc-delete-size.yaml
        │       │   ├── storage-csi-cinder-sc-retain-size.yaml
        │       │   ├── storage-global-size-limit.yaml
        │       │   └── storage-no-storage.yaml
        │       │
        │       └── rolebindings
        │           ├── rolebindings-team1.yaml
        │           ├── rolebindings-team2.yaml
        │           ├── rolebindings-team3.yaml
        │           └── rolebindings-team.yaml
        │
        └── clustertypeZ
            └── GroupConfig
                └── group-shared-namespace.yaml
```


With Project Onboarding you only have to create a new namespace with labels that define everything. Below are a complete example for namespace [glassproj-appname-acc](namespace-configuration/examples/clustertypeZ/glassproj-appname-acc/namespace.yaml) with all possible labels currently possible.

```yaml
kind: Namespace
apiVersion: v1
metadata:
  name: glassproj-appname-acc
  labels:
    project-onboarding/managed-by: selfservice-api

    project-onboarding/compute-limits-cpu: "10"
    project-onboarding/compute-limits-memory: 8Gi

    project-onboarding/storage-size: 300Gi
    project-onboarding/storage-csi-cinder-sc-retain-size: 100Gi
    project-onboarding/storage-csi-cinder-sc-delete-size: 200Gi

    project-onboarding/team: glassproj

    project-onboarding/team1-name: glassproj-admins
    project-onboarding/team1-permissions: admin

    project-onboarding/team2-name: glassproj-editors
    project-onboarding/team2-permissions: edit

    project-onboarding/team3-name: glassproj-viewers
    project-onboarding/team3-permissions: view

    project-onboarding/networkpolicies-multitenancy: "true"
    project-onboarding/networkpolicies-team: glassproj
```

### Network policies

Implementing appropriate network policies is crucial for maintaining security and isolation within a Kubernetes cluster, especially when hosting multiple customers or teams. Let’s explore how Project Onboarding handles network policies.

#### Multitenancy network policies

- **`project-onboarding/networkpolicies-multitenancy`**

In Kubernetes clusters with multiple tenants, restricting network traffic between namespaces is common practice. Unless the label `project-onboarding/networkpolicies-multitenancy: false` is applied, these network policies will be automatically enforced on the namespace. This ensures network traffic between different customers or teams within the same cluster is always appropriately routed, maintaining strict security and isolation standards.

#### Team-specific network policies

- **`project-onboarding/networkpolicies-team`**

To facilitate inter-team communication across namespaces, use the label `project-onboarding/networkpolicies-team: teamname`, replacing `teamname` with the actual team name (e.g., `glassproj`). This allows for seamless collaboration between team namespaces while upholding necessary security and isolation within the cluster.

### Role bindings

Linking namespaces with user groups is essential for managing access and ensuring teams can effectively utilize their designated namespaces. Due to limitations in label capabilities, we’ve devised a straightforward labeling system for this purpose.

- **`project-onboarding/team`**

Use the label `project-onboarding/team: groupname` to provide admin rights to a group within the namespace. This label simplifies the process of assigning a team with the access rights they need for their namespace.

For more granular control over permissions, the following labels are available:

- **`project-onboarding/team1-name`**
- **`project-onboarding/team1-permissions`**
- **`project-onboarding/team2-name`**
- **`project-onboarding/team2-permissions`**
- **`project-onboarding/team3-name`**
- **`project-onboarding/team3-permissions`**

These labels enable you to link a group with specific permissions within a namespace. While the permissions are initially limited to admin, edit, and view, they can be customized in the custom resource `namespaceConfig` to accommodate more variations as needed.

### Resource quotas

Resource quotas are a critical aspect of managing resources within your Kubernetes namespaces, ensuring that each team or project consumes only its fair share of resources, preventing resource starvation for others. Project Onboarding simplifies this process, enabling you to define resource quotas directly through namespace labels, making it straightforward to manage CPU, memory, and storage limits at the namespace level.

#### Defining CPU and memory quotas

To manage compute resources effectively, Project Onboarding offers the following labels:

- **`project-onboarding/compute-limits-cpu`** Specifies the total amount of CPU resources that can be consumed by all pods in the namespace. For instance, setting this to `"10"` allows pods within the namespace to consume up to 10 CPU units.
- **`project-onboarding/compute-limits-memory`** Determines the total amount of memory (RAM) that can be consumed by all pods in the namespace. Setting this label to `"8Gi"` permits up to 8 GiB of memory usage.

These quotas ensure that your applications run efficiently without monopolizing cluster resources, facilitating fair resource distribution across all namespaces.

#### Managing storage quotas

Storage management is another crucial aspect covered by Project Onboarding. The following labels help you define storage quotas:

- **`project-onboarding/storage-size`**: Sets the total amount of persistent storage available to the namespace. For example, `"50Gi"` allocates up to 50 GiB of persistent storage across all pods in the namespace.

For more granular control over storage based on the StorageClass, use:

- **`project-onboarding/storage-csi-cinder-sc-delete-size`** and **`project-onboarding/storage-csi-cinder-sc-retain-size`**: These labels allow specifying storage limits per StorageClass, offering flexibility in managing storage policies and lifecycle.

This structure allows for easy customization and management of resource quotas, ensuring your Kubernetes environments are optimized for both performance and resource utilization.

By leveraging Project Onboarding for resource quota management, you can ensure a balanced distribution of resources, fostering a more efficient and fair environment for all your Kubernetes workloads.

## Installing the Namespace Configuration Operator and setting up a service account

Project Onboarding leverages the Namespace Configuration Operator, which can be installed via the Operator Lifecycle Manager (OLM) or as a Helm chart. The following guide focuses on installation from the `community-operators` CatalogSource, a source pre-installed in OKD/OpenShift environments.

### Installing the Namespace Configuration Operator

To facilitate the management of namespaces and related configurations in your Kubernetes or OpenShift cluster, the Namespace Configuration Operator is a critical component. This operator can be seamlessly integrated into your environment using OLM or Helm, offering a robust solution for automating the application of labels and the subsequent configuration of namespaces based on these labels.

For installations from the `community-operators` CatalogSource, which is readily available in OKD/OpenShift clusters, you can employ a straightforward approach using `oc`, the OpenShift CLI tool. This method ensures the operator is correctly deployed within your cluster, enabling the automatic management of namespace configurations.

To install the Namespace Configuration Operator, execute the following command:

```bash
oc apply -k ./namespace-configuration/operator
```

This command initiates the deployment process of the operator by applying the Kubernetes manifests located in the specified directory. It's crucial to wait until all custom resource definitions (CRDs) have been successfully installed by the InstallPlan. Once this step is completed, you can proceed to apply configurations specific to your cluster type.

For instance, to apply a general configuration applicable to all cluster types, you might use the following command:

```bash
oc apply -k ./namespace-configuration/configuration/all
```

This command applies the configuration for the `all` category, encompassing settings and policies intended for universal application across your clusters.

### Setting up a service account

The next step involves setting up a service account that will be used to create namespaces with the specified labels. This service account grants the necessary permissions to automate the creation and management of namespaces, ensuring that the Namespace Configuration Operator can function without manual intervention.

To set up the service account, run:

```bash
oc apply -k ./namespace-configuration/serviceaccount
```

This command applies the Kubernetes manifests necessary for creating the service account, along with any associated roles and role bindings, ensuring that the account has the appropriate permissions to manage namespace configurations.

### Extracting the service account token

For operations that require authentication, such as automated scripts or external tools interfacing with your Kubernetes cluster, you may need to extract the token associated with the service account created in the previous step.

To extract the token and create a ready-to-use `kubeconfig` file, utilize the provided `create-kubeconfig.sh` script:

```bash
./namespace-configuration/serviceaccount/create-kubeconfig.sh
```

This script generates a `kubeconfig` file configured with the service account's token, allowing for seamless authentication for operations requiring cluster access.

### Completion

With the Namespace Configuration Operator installed and the service account set up, your Project Onboarding environment is now ready. This setup empowers you to automate the management of namespaces within your cluster, streamlining the onboarding process for new namespaces and ensuring consistent application of configurations across your Kubernetes or OpenShift environment.

## Managing Project Onboarding with ArgoCD

Here's a tip on how namespaces can be managed using Kustomize and, by extension, ArgoCD. If greater flexibility is needed, I recommend using a dedicated git repository solely for managing the configuration of namespaces. This git repository is managed by a customer portal or other automation that writes all desired changes as Kustomize YAML code. On the other side, ArgoCD ensures that changes are applied in the cluster. This approach creates flexibility by offering manual customization of namespaces and at the same time creates audit, replay and state management.

For example, unique namespaces can receive their own configuration in the git tree structure, which ArgoCD then ensures is applied in the cluster. For instance, if a namespace needs specially tailored network policies and there's no need to create NamespaceConfig custom resources (CRs) for that purpose. Create the customization in its own file and reference the customization in the namespace's `kustomization.yaml` file.

[Here is an example](namespace-configuration/examples) of a git tree structure:
```text
.
└── namespace-configuration
    └── examples
        ├── clustertypeX
        │   ├── businessarea51-labs-utv
        │   │   ├── kustomization.yaml
        │   │   └── namespace.yaml
        │   └── kustomization.yaml
        │
        ├── clustertypeZ
        │   ├── glassproj-appname-acc
        │   │   ├── kustomization.yaml
        │   │   └── namespace.yaml
        │   ├── glassproj-appname-sys
        │   │   ├── kustomization.yaml
        │   │   └── namespace.yaml
        │   ├── glassproj-appname-utv
        │   │   ├── kustomization.yaml
        │   │   └── namespace.yaml
        │   └── kustomization.yaml
        │
        └── kustomization.yaml
```

When a change occurs in the tree structure, use kustomize `create` or `edit` with `--autodetect` and `--recursive` flags to include all files. Git commit and push and then, contact your ArgoCD webhook to initiate scanning of the git repository immediately.

This method allows for dynamic management and deployment of namespace configurations across multiple clusters, ensuring that each namespace is configured according to specific requirements. It streamlines the process of managing Kubernetes resources, making it easier to maintain and update configurations in a controlled and automated manner.

## FAQ

### Enhanced security considerations for namespace management

Project Onboarding enhances the ease with which external customer portals or APIs can create and manage Kubernetes namespaces, abstracting away the underlying complexity. This ability to directly manage namespace objects in Kubernetes also implies that external systems have the capacity to modify namespaces that are integral to the system’s operations.

Ensuring the security of critical system-owned namespaces, especially those prefixed with `kube-` or `openshift-`, requires external interfaces to adopt rigorous protective strategies. The cornerstone of such a strategy is to proactively block any modifications to these namespaces, thereby preventing unauthorized access and changes that could jeopardize the security of the entire cluster.

Further strengthening this security posture, Kubernetes 1.29 introduces an advanced mechanism for in-process validation of requests to the Kubernetes API server, marking the "Validating Admission Policy" as a beta feature. This policy leverages the Common Expression Language (CEL) to articulate validation rules, allowing for highly configurable policies that can be tailored and parameterized according to the needs of cluster administrators. With the advent of the Validating Admission Policy, specific CEL scripts can be crafted to outright deny any modifications against system-owned namespaces, providing a robust layer of protection.

Additionally, there are several tools available that specialize in validating Kubernetes API requests, including K-Rail, Kyverno, Kubewarden, and OPA/Gatekeeper. These tools offer versatile and powerful means to enforce security policies and validate requests, further ensuring that system-owned namespaces remain secure from unauthorized changes.

### Growing to manage more than just the namespace object

Managing your Kubernetes environment can be significantly simplified by modifying labels on a namespace object, triggering changes elsewhere within that namespace. This functionality removes the complexity for external customer portals, with the Namespace Configuration Operator taking on the responsibility of maintaining the correct state for the desired functionality.

Labels like `project-onboarding/compute-limits-cpu` set limits for CPU, but there are many other resource quota settings such as requests.cpu, requests.memory, persistent volume claims, and all varieties of object counts. If you want to make all these configurable, you'll need to create NamespaceConfig custom resources (CRs) for each setting you wish to expose. Over time, this could become cumbersome, and you'll need to decide when it's time to approach this differently. One option is to package resource quotas into T-shirt sizes containing multiple resource quota limitations instead of specifying individual settings. For example, introduce `project-onboarding/compute-t-shirt-size` and allow it to specify sizes like `small`, `medium`, `large`, etc. Another approach is to support direct management of resource quotas in the external customer portal when more control over resource quotas is needed. This means removing all labels related to resource quotas from the namespace object and directly managing resource quotas with external tools.

The same principle applies to types such as network policies. When the complexity exceeds a manageable level, move away from labels on the namespace object and implement management of these elements through external tools. This shift will help streamline the management process, ensuring that your Kubernetes environment remains efficient and scalable.