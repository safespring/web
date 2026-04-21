---
title: "Understanding Safespring On-demand Kubernetes if you usually run Kubernetes yourself"
date: "2026-03-30"
intro: "A practical guide for platform teams who want to understand the service boundary, defaults, and engineering trade-offs in Safespring On-demand Kubernetes."
draft: false
sectiontext: "Tech Update"
section: "Tech update"
tags: ["container"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "en"
author: ""
TOC: "In this post"
sidebarlinkname: "Talos on OpenStack"
sidebarlinkurl: "/tech-update/2025-03-talos-linux-on-openstack/"
sidebarlinkname2: "Cluster API on OpenStack"
sidebarlinkurl2: "/tech-update/2025-06-deploy-talos-kubernetes-on-openstack-with-cluster-api/"
aliases:
  - /blogg/2026/2026-03-what-to-compare-managed-kubernetes-vs-self-managed/
  - /blogg/2026-03-what-to-compare-managed-kubernetes-vs-self-managed/
---

{{< ingress >}}
If you already know how to run Kubernetes yourself, the useful question is not whether a managed service can create a cluster. The useful question is how the service is shaped, where the boundary sits, and which parts of the platform it already solves well.
{{< /ingress >}}

We have written quite a bit lately about building Kubernetes platforms with Talos, OpenStack, Cluster API, Cinder CSI, and modern traffic management. That is one side of the picture.

The other side is understanding what a service like Safespring On-demand Kubernetes is actually trying to provide.

This post is aimed at engineers and platform teams who are perfectly capable of running Kubernetes themselves, but want to understand Safespring On-demand Kubernetes in more concrete terms than "managed Kubernetes".

{{% accordion title="TL;DR" %}}

1. Safespring On-demand Kubernetes is designed to give teams a usable Kubernetes platform boundary from day one, rather than a raw cluster that still needs extensive assembly work.
2. The service currently documents portal and API-based cluster provisioning, a managed control plane, Talos Linux, Cilium as the default CNI, traffic management options, Cinder CSI-based storage, OIDC-based access, and GPU-capable worker nodes.
3. The most useful way to evaluate the service is to look at what is already solved by default and what still remains part of your own platform design.
4. For many teams, the value is not that Kubernetes becomes "easy", but that fewer recurring platform responsibilities need to be owned internally.
5. If your team already runs Kubernetes itself, that experience still transfers directly, especially around workload design, observability, access models, storage behavior, and traffic patterns.

{{< localbutton text="Jump to the service boundary" link="#the-service-boundary-in-practice" >}}

{{% /accordion %}}
{{< accordion-script >}}

## What Safespring On-demand Kubernetes is trying to do

At a high level, Safespring On-demand Kubernetes is a Kubernetes service built on Safespring Compute and exposed through a self-service model. The intent is not to replace engineering judgment or to hide Kubernetes behind a proprietary control layer. The intent is to provide a solid platform baseline so teams can spend less time assembling the cluster itself and more time working on workloads.

That distinction matters.

Some services market themselves as managed while still leaving large parts of the platform story unresolved. You may still need to bolt on identity, storage, ingress, or a coherent upgrade model before the service feels usable in production.

What is more interesting in Safespring's case is that the service boundary is documented in concrete platform terms:

- how clusters are provisioned
- how the control plane is handled
- which network model is expected
- how persistent storage is made available
- how users authenticate to clusters
- what is supported around GPU workloads
- what is deliberately left outside the default service scope

That makes it easier for platform teams to evaluate the offering as infrastructure, not just as product messaging.

## What you get on day one

Based on the current Safespring documentation, On-demand Kubernetes is documented with the following platform characteristics:

- **Cluster provisioning through portal and API** so clusters can be created and managed through a self-service workflow.
- **A managed control plane** with support for `3` or `5` control plane nodes depending on availability requirements.
- **Talos Linux** as the underlying operating system for the Kubernetes nodes.
- **Cilium as the default CNI**, with Gateway API enabled in the network model.
- **Support for Traefik** for teams that prefer a familiar ingress pattern.
- **Persistent volumes through Cinder CSI**, with `fast` and `large` storage classes available when the CSI component is enabled.
- **OIDC-based authentication**, using portal-generated kubeconfig and `kubelogin`.
- **GPU-capable worker nodes** for teams with ML, AI, or other accelerated workloads.
- **A managed control plane**, measured against Kubernetes API availability.

That is a meaningful amount of platform surface area to have defined up front. It means the service is not only about getting nodes to boot. It is also about giving teams a known way to think about access, networking, storage, and platform operations.

## The service boundary in practice

If you are used to self-managed Kubernetes, it helps to read the service not as "what can it do?" but as "what does it already own?"

A clearer way to think about it is topic by topic:

{{< boundary-row
  first="true"
  topic="Cluster provisioning"
  service="Clusters are created and managed through portal and API."
  responsibility="Your naming, environment model, automation wrappers, and internal usage patterns."
>}}

{{< boundary-row
  topic="Control plane"
  service="The control plane is managed and available in `3` or `5` node layouts."
  responsibility="Your workload architecture, SLOs, and how applications behave during node or dependency failures."
>}}

{{< boundary-row
  topic="Node OS and cluster foundation"
  service="Talos Linux is used as the operating system foundation."
  responsibility="Your application assumptions, runtime constraints, and how you operationalize workloads on top of that foundation."
>}}

{{< boundary-row
  topic="Networking"
  service="Cilium is the default CNI and Gateway API is enabled in the platform model."
  responsibility="Your route design, certificate model, namespace boundaries, service exposure strategy, and network policy design."
>}}

{{< boundary-row
  topic="Ingress and traffic"
  service="Traefik is supported in addition to the default network direction."
  responsibility="Which traffic pattern you standardize on internally and how you operate it across teams."
>}}

{{< boundary-row
  topic="Persistent storage"
  service="Cinder CSI can be activated with `fast` and `large` storage classes."
  responsibility="Your PVC design, retention expectations, stateful workload behavior, and application-level data strategy."
>}}

{{< boundary-row
  topic="Authentication"
  service="OIDC-based cluster access is documented via portal-issued kubeconfig and `kubelogin`."
  responsibility="Your RBAC conventions, tenant model, group mapping, and internal access governance."
>}}

{{< boundary-row
  topic="GPU workloads"
  service="GPU-capable worker nodes are part of the documented offering."
  responsibility="Your scheduling rules, runtime expectations, model packaging, and workload cost control."
>}}

{{< boundary-row
  topic="Observability"
  service="The boundary is explicit rather than hidden."
  responsibility="Prometheus, Grafana, Loki, alerting, dashboards, log retention, and incident workflow remain part of your platform design."
  last="true"
>}}

That final row is worth calling out clearly.

Safespring does not present On-demand Kubernetes as if every operational concern is bundled into the service. The current documentation recommends deploying your own observability stack, and cluster logs are not stored or monitored by default for on-demand clusters.

For some teams, that may look like a gap. For others, it is a healthy and realistic boundary. It means the service takes responsibility for the cluster platform itself without pretending that workload-level observability can be solved generically for every customer.

## Why this service shape matters

The operational shape of a Kubernetes service matters more than the label attached to it.

A service can have a long feature list and still create a lot of platform work for the customer if the defaults are weak or the responsibility split is vague. Conversely, a service can be quite compelling even without trying to manage every layer, as long as the service boundary is coherent and documented.

That is where Safespring On-demand Kubernetes becomes interesting for engineers.

It combines a few choices that fit well together:

- Talos as the node foundation
- Cilium as the default network direction
- Gateway API support in the service model
- Cinder-backed persistent storage
- OIDC-based cluster access
- a managed control plane rather than a bring-your-own control plane pattern

None of those choices are mysterious on their own. Most platform teams will recognize them immediately. The value is that they are combined into a consistent service starting point instead of becoming a list of integration tasks that each customer has to solve from scratch.

## Where your own Kubernetes experience still matters

Using a service like this does not make Kubernetes knowledge less important. It just changes where that knowledge is best spent.

If your team already runs Kubernetes itself, that experience remains highly relevant in areas like:

- designing namespaces, RBAC, and multi-team cluster usage
- choosing between ingress patterns and gateway patterns
- deciding how stateful workloads should use persistent volumes
- designing observability and alerting that matches your applications
- understanding failure domains at workload level rather than only at node level
- deciding when GPU workloads belong in Kubernetes and when they do not

In other words, the service may narrow the amount of cluster plumbing you need to own, but it does not remove the need for platform engineering around workloads and operations.

That is usually a good trade.

## A practical way to evaluate Safespring On-demand Kubernetes

For teams that want to assess the service seriously, we think the best questions are these:

1. Does the documented service boundary align with how we want to split platform work internally?
2. Are the network, access, and storage defaults close enough to our real-world requirements?
3. Do we benefit from a managed control plane more than we benefit from designing that layer ourselves?
4. Are we comfortable owning our own observability, workload standards, and higher-level platform conventions on top of the service?
5. Do the documented building blocks fit the kinds of applications we actually run, not just the clusters we want to create?

Those questions tend to produce a more useful engineering discussion than generic debates about whether managed Kubernetes is "better" than self-managed Kubernetes.

## Closing thought

If you are used to building clusters yourself, Safespring On-demand Kubernetes is probably most useful to think of as a documented platform baseline.

It gives you a managed control plane, a self-service provisioning path, a chosen node operating model, a default network direction, storage integrations, identity integration, and support for GPU-capable workloads. At the same time, it still leaves enough of the upper platform layers in your hands that you can shape the workload experience according to your own needs.

That balance is often where a service becomes genuinely useful for engineering teams.

Not because it removes Kubernetes.

Because it reduces the amount of Kubernetes platform assembly that has to be repeated for every cluster.

{{< horisontal-card
    image="/img/graphics/safespring-image.svg"
    alt="Safespring On-demand Kubernetes for platform teams"
    cardtitle="Walk through the platform boundary in your own terms"
    text="If you want to evaluate Safespring On-demand Kubernetes for your own workloads, start with the documented service boundary: control plane, networking, storage, access, observability, and day-two operations."
    link="/kontakt/"
    linktext="Discuss your requirements"
>}}
