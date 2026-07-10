---
ai: true
title: "Elastisys builds Welkin on Safespring Compute"
language: "en"
date: 2023-09-18
draft: false
section: "Use case"
intro: "Welkin is Elastisys' Kubernetes platform for environments where security, traceability, and compliance need to be reviewed. On Safespring Compute, it runs on Nordic IaaS."
background: "/safespring-elastisys.svg"
card: ""
socialmedia: ""
sidebarlinkname: ""
sidebarlinkurl: ""
sidebarlinkname2: ""
sidebarlinkurl2: ""
sidebarsection: ""
sidebarimage: "saas_elastisys.svg"
sidebartext: "Safespring provides the IaaS layer: compute, storage, network, and data center location. Elastisys runs the Welkin layer on top and is responsible for the customers' Kubernetes platform."
saas: ""
sidebarwhitepaper: ""
service: "Safespring Compute"
aliases:
  - /en/services/case/elastisys/
  - /solution-brief/welkin-on-safespring/
  - /solution-brief/compliant-kubernetes/
---

{{< ingress >}}
This page shows how responsibilities are divided when Welkin runs on Safespring Compute. The customer builds its service on Elastisys' Kubernetes platform, while Safespring is responsible for the underlying infrastructure.
{{< /ingress >}}

In this setup, Safespring provides the Compute infrastructure, data center location, storage, and network. Elastisys runs the Kubernetes platform and customer-facing services. This makes the supplier chain possible to describe with separate responsibilities for each party.

![Responsibility split between customer, Elastisys and Safespring](/img/saas/elastisys-safespring-compliant-kubernetes-pyramid.svg)

_The image shows the responsibility split. Safespring provides the infrastructure, Elastisys runs the Welkin layer, and the customer is responsible for the service and team._

## What is Welkin?

Welkin is a Kubernetes platform from Elastisys for organizations that want to run containerized applications in environments where security, traceability, and compliance need to be included from the start. The platform is built on Kubernetes and open source components and includes operations, security hardening, monitoring, and lifecycle management.

Customers can build and deploy applications without owning the full Kubernetes stack themselves. Welkin is used where questions about GDPR, patient data, audits, access control, and supplier risk need to be answered.

Welkin is CNCF-certified as a Kubernetes distribution and includes controls for security in containerized environments. Examples include intrusion detection with Falco, policy control with Open Policy Agent/Gatekeeper, automatic certificate management with cert-manager, a container registry with security scanning, and support for CI/CD flows such as ArgoCD.

A security review therefore needs to show how network segmentation, role-based access, secret management, vulnerability scanning, logging, and updates are handled. These controls need to be demonstrable in ongoing operations, not only when the cluster is first deployed.

The hard part is not only starting a Kubernetes cluster, but operating it with real workloads over time. For regulated environments, the platform needs to handle upgrades, testing, patching, CVE tracking, backups, and supporting services for logging and monitoring without making the responsibility split unclear.

That means Welkin can be used across the software lifecycle: development, packaging, testing, deployment, operations, and audits. Safespring's role is to provide the local Compute infrastructure, data center location, storage, and network that the platform can run on.

## How Elastisys uses Safespring

Safespring Compute gives Elastisys the infrastructure Welkin needs for Swedish and Nordic customers. This includes virtual servers, storage, networking, data center location, and access to a cloud platform built on open standards.

Elastisys can focus its work on the Kubernetes platform, security controls, operating model, and customers' application environments. Safespring provides the local infrastructure base and can supply material for questions that often arise in procurements, security reviews, and technical assessments.

For the end customer, the supplier chain is easier to describe. Applications run on a Kubernetes platform from Elastisys, on Safespring's Nordic IaaS infrastructure. The customer can see where data is processed, which suppliers are involved, and which part of operations each party is responsible for.

## Why infrastructure matters

For companies that build their own platforms, SaaS services, or services for regulated industries, the infrastructure needs to be describable to customers, legal teams, security teams, and procurement.

When the product handles sensitive data, questions about data location, third-country risks, support paths, access, agreements, and subcontractors often arise before contract or production start. A local infrastructure base does not reduce the need for the company's own security work, but it provides concrete information to use when those questions need to be answered.

For Elastisys, Safespring is a way to offer Welkin on infrastructure that suits customers who want European operations, open technical interfaces, and a Nordic provider with experience from regulated environments.

{{% note "When this model is relevant" %}}

This setup is relevant for companies that:

- build their own platform or SaaS service on cloud infrastructure
- sell to customers who review data location, jurisdiction, and subcontractors
- need Kubernetes and open source components without tying the product to a hyperscaler ecosystem
- need to answer questions from public sector, medtech, healthtech, finance, or other regulated environments
- need an infrastructure partner that can take part in technical and security-related questions when the deal requires it

{{% /note %}}

## What Safespring contributes

Safespring is not a replacement for Elastisys' product. Our contribution is the infrastructure Welkin runs on. This includes Safespring Compute, storage, networking, Nordic data center location, and a way of working where technical questions can be handled close to the teams that build the service.

{{< icon-block-horisontal color="#195F8C" icon="fa-solid fa-layer-group" text="An infrastructure base that can be explained" description="Compute, storage, network, and data center location are clearly separated from the Kubernetes platform. This makes the responsibility split easier to describe to customers, auditors, and security teams." >}}
{{< icon-block-horisontal color="#32cd32" icon="fa-solid fa-location-dot" text="Nordic operations for sensitive services" description="Safespring provides a local IaaS foundation for customers who need control over where data is processed, which jurisdiction applies, and which suppliers are part of the chain." >}}
{{< icon-block-horisontal color="#3C9BCD" icon="fa-solid fa-code-branch" text="Kubernetes and open source components" description="Welkin is built on Kubernetes and open source components on top of Safespring Compute. The service does not need to be built on provider-specific cloud services." >}}

This is relevant for other platform companies as well. If you build a platform for customers with documentation and review requirements, the infrastructure layer needs to be describable as part of your offering.

## Are you building a service like Welkin?

If you develop a platform, SaaS service, or product for regulated customers, the infrastructure needs to be reviewable and possible to describe. Safespring Compute can be used when you need to combine cloud infrastructure with data location in the Nordics, open standards, and a Nordic provider.

Talk to us about your target state, customer requirements, and which part of the infrastructure you want to own yourselves. We can then go through whether Safespring Compute fits your product, and how the responsibilities between you, Safespring, and any platform partners should be described.

{{% custom-card image="/img/card/safespring-fredric.webp" cardtitle="Fredric Wallsten" %}}
Contact me if you want to discuss infrastructure for your service.

{{< inline "Call" >}} [+46 76-629 25 02](tel:+46766292502)

{{< inline "Email" >}} [hello@safespring.com](mailto:hello@safespring.com)
{{% /custom-card %}}
