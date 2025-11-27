---
title: "Ingress-Nginx Retires in March 2026: Here’s How to Move to Gateway API and  Cilium Gateway"
date: 2025-11-27
intro: "This article gives platform teams a concrete migration playbook: how to design a shared Cilium Gateway, handle certificates and cross-namespace access with Gateway API."
draft: false
tags: ["container"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "En"
sectiontext: "Tech Update"
section: "Tech update"
author: "Anders Johansson"
TOC: "In this post"
---

## TL;DR
With the retirement of Ingress Nginx migration from Ingress-Nginx to Gateway API using Cilium with a shared gateway approach, trading some complexity for cleaner, more efficient, and standardized ingress management is one way of solving the question of ingress to your cluster.

### Why explore Gateway API:

- **Annotation Sprawl**: Managing dozens of ingress-nginx-specific annotations across ingress resources.
- **Limited Future-Proofing**: Alignment with where the Kubernetes is heading.

### Gateway API address these concerns by offering:

- **Standardization**: Is an official Kubernetes project.
- **Enhanced Security**: Built-in RBAC controls and namespace-based access restrictions.
- **Better Resource Management**: The alternative of useingshared gateways means reduced resource overhead.

{{< horisontal-card
    image="/img/graphics/safespring-image.svg"
    alt="Safespring on-demand Kubernetes with Cilium Gateway API"
    cardtitle="Gateway API on Cilium, managed for you"
    text="Spin up Talos-based clusters with Cilium and Gateway API ready on day one. Get a managed control plane and flexible block storage, so you focus on your workloads instead of the plumbing."
    link="/containers/"
    linktext="Discover on-demand Kubernetes"
>}}

{{< distance >}}
## Lets start

{{% note "Prerequisites" %}}

### Gateway API CRDs Installation
Before beginning the migration, you need to install the Gateway API crds. We're using the latest Gateway API v1.4.0:

```bash
# Install standard Gateway API CRDs
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.4.0/config/crd/standard/gateway.networking.k8s.io_gatewayclasses.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.4.0/config/crd/standard/gateway.networking.k8s.io_gateways.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.4.0/config/crd/standard/gateway.networking.k8s.io_httproutes.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.4.0/config/crd/standard/gateway.networking.k8s.io_referencegrants.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.4.0/config/crd/standard/gateway.networking.k8s.io_grpcroutes.yaml

# Install experimental CRDs (optional, for TLS routes)
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.4.0/config/crd/experimental/gateway.networking.k8s.io_tlsroutes.yaml
```
{{% /note %}}

## Required Cilium Configuration

To enable Gateway API support in Cilium, several key features must be configured:

### Essential Cilium Features

```yaml
# Cilium configuration for Gateway API
gatewayAPI:
  enabled: true           # Enable Gateway API support

kubeProxyReplacement: true # Required for Gateway API

l2announcements:
  enabled: true           # Enable L2 announcements for LoadBalancer services

externalIPs:
  enabled: true           # Allow external IP assignment

# Important for clusters with many services
k8sClientRateLimit:
  burst: 40               # Adjust based on cluster size
  qps: 20                 # Adjust based on cluster size
```

### Load Balancer IP Pool Configuration

Define an IP pool for LoadBalancer services:

```yaml
apiVersion: cilium.io/v2alpha1
kind: CiliumLoadBalancerIPPool
metadata:
  name: "ipv4-pool"
spec:
  blocks:
    - start: "Start Address"
      stop: "Stop Address"
```

### L2 Announcement Policy

Configure L2 announcements for your network interface:

```yaml
apiVersion: "cilium.io/v2alpha1"
kind: CiliumL2AnnouncementPolicy
metadata:
  name: l2-announcement
spec:
  interfaces:
    - eth0  # Replace with your network interface name
  externalIPs: true
  loadBalancerIPs: true
```

## Shared vs Non-Shared Gateway

Using the non-shared gateway will replicate the same pattern as ingress-nginx. Basically one gateway, httproute and a grant for the tls certificate.
And a gateway means also using a IP out of the pool.
While there are usecases for using a seperate Gateway for your workload we will focus on the Shared Gateway in this blog post.

### Non-Shared Gateway 

In the traditional approach, each service or application has its own Gateway resource:

| Pros | Cons |
|------|------|
| Complete isolation between services | Higher resource consumption (multiple Gateway instances) |
| Individual configuration per service | Duplicated TLS certificate management |
| Simpler troubleshooting (one gateway per service) | More complex certificate distribution |
| No cross-namespace dependencies | Increased operational overhead |
|  | IP consumption |

{{% note "Example" %}}
```yaml
# Individual gateway per service
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: podinfo-gateway
  namespace: podinfo
spec:
  gatewayClassName: cilium
  listeners:
  - hostname: podinfo.fdqn
    name: http
    port: 80
    protocol: HTTP
```
{{% /note %}}

### Shared Gateway 

So let's explore the Shared Gateway.

| Pros | Cons |
|------|------|
| Reduced resource consumption (single Gateway instance) | Cross-namespace dependencies |
| Centralized TLS certificate management | Requires additional RBAC configuration |
| Consistent security policies | More complex initial setup |
| Simplified operations and monitoring | Potential single point of failure |
| Enhanced security through namespace selection |  |
| IP consumption |  |

{{% note "Example" %}}
```yaml
# Shared gateway serving multiple services
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: shared-gateway
  namespace: gateway-system
spec:
  gatewayClassName: cilium
  listeners:
    - name: https
      port: 443
      protocol: HTTPS
      tls:
        certificateRefs:
          - kind: Secret
            name: domain-wildcard-tls
            namespace: cert-manager
      allowedRoutes:
        namespaces:
          from: Selector
          selector:
            matchLabels:
              gateway.networking.k8s.io/allowed: "true"
```
{{% /note %}}

## Migration Steps

### Step 1: Prepare the Shared Gateway Infrastructure

Create the gateway-system namespace and deploy the shared gateway:

```yaml
# Namespace with proper labeling
apiVersion: v1
kind: Namespace
metadata:
  name: gateway-system
  labels:
    app.kubernetes.io/name: shared-gateway
    app.kubernetes.io/component: networking
```

### Step 2: Configure Certificate Access

Set up ReferenceGrant to allow the gateway to access TLS certificates:

```yaml
apiVersion: gateway.networking.k8s.io/v1beta1
kind: ReferenceGrant
metadata:
  name: shared-gateway-cert-access
  namespace: cert-manager
spec:
  from:
  - group: gateway.networking.k8s.io
    kind: Gateway
    namespace: gateway-system
  to:
  - group: ""
    kind: Secret
    name: domain-wildcard-tls
```

### Step 3: Migrate Individual Services

For each service, follow this migration pattern:

**Before (nginx-ingress):**
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: podinfo
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
spec:
  rules:
  - host: podinfo.fqdn
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: podinfo
            port:
              number: 9898
```

**After (Gateway API with shared gateway):**

1. Label the namespace:
    ```yaml
    apiVersion: v1
    kind: Namespace
    metadata:
      name: podinfo
      labels:
        gateway.networking.k8s.io/allowed: "true"  # Enable shared gateway access
    ```
2. Create HTTPRoute:  
    ```yaml
    apiVersion: gateway.networking.k8s.io/v1
    kind: HTTPRoute
    metadata:
      name: podinfo
      namespace: podinfo
    spec:
      hostnames:
      - podinfo.fqdn
      parentRefs:
      - name: shared-gateway
        namespace: gateway-system
      rules:
      - backendRefs:
        - name: podinfo
          port: 9898
    ```
3. Create ReferenceGrant for cross-namespace access:  
    ```yaml
    apiVersion: gateway.networking.k8s.io/v1beta1
    kind: ReferenceGrant
    metadata:
      name: podinfo-to-shared-gateway
      namespace: gateway-system
    spec:
      from:
      - group: gateway.networking.k8s.io
        kind: HTTPRoute
        namespace: podinfo
      to:
      - group: gateway.networking.k8s.io
        kind: Gateway
        name: shared-gateway
    ```
4. Remove the Nginx Ingress  
    ```yaml
    kubectl delete your_ingress -n your_namespace
    ```

## Security Enhancements

The shared gateway approach introduces several security improvements:

### Namespace-Based Access Control
Only namespaces explicitly labeled with `gateway.networking.k8s.io/allowed: "true"` can create HTTPRoutes that reference the shared gateway.

### Direct Certificate Management
The gateway directly accesses certificates from the cert-manager namespace.

### RBAC Integration
Proper ServiceAccount and RBAC policies ensure that only authorized components can manage gateway resources.

## What are the goodies?

1. **Resource Efficiency**: Leveraging Cilium's capabilities and minimizing resource overhead is always a good thing. More ebpf to the people!
2. **Enhanced Security**: Namespace-based access controls and direct cert-manager integration
3. **Operational Simplicity**: Fewer resources to monitor and maintain
4. **Standards Compliance**: Alignment with Kubernetes community direction

## Performance Thoughts

The shared gateway approach shows improved performance by:

- **Lower Memory Usage**: Single gateway instance vs. multiple gateways
- **Reduced Network Latency**: Direct traffic handling without additional proxy layers
- **Better Resource Utilization**: More efficient load balancing through Cilium's eBPF implementation.

## Links

[Ingress Nginx Retirement](https://www.kubernetes.dev/blog/2025/11/1/ingress-nginx-retirement/)

[Gateway API](https://gateway-api.sigs.k8s.io)

[Cilium Gateway](https://docs.cilium.io/en/stable/network/servicemesh/gateway-api/gateway-api/#gateway-api-support)


{{< horisontal-card
    image="/img/graphics/safespring-image.svg"
    alt="Safespring on-demand Kubernetes cluster overview"
    cardtitle="Ready to try this in a real cluster?"
    text="Safespring on-demand Kubernetes lets you test-drive Gateway API and Cilium in a managed environment with Talos, observability, and storage already wired up. Perfect for piloting your Ingress-Nginx migration before rolling it into production."
    link="/containers/"
    linktext="Discover on-demand Kubernetes"
>}}