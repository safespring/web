---
title: "Mandatory Package: Safespring Platform Basics"
section: "Internal"
episode: "1"
series: "true"
language: "En"
date: "2026-06-24"
publishDate: "2026-06-24"
draft: false
card: "/img/card/safespring-gabriel-demo.webp"
eventbild: ""
socialmediabild: ""
intro: "Gabriel Paus introduces the cloud concepts, service boundaries and Safespring-specific knowledge every employee should understand."
nosidebar: "none"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/internal-knowledge-hub-mandatory-package-2026-06-24/master.m3u8"
thumbnail: "/img/card/safespring-gabriel-demo.webp"
chaptersTitle: "Training chapters"
noindex: true
chapters:
  - title: "Welcome, agenda and objectives"
    time: 2
    timeFormatted: "0:02"
  - title: "What is the cloud?"
    time: 96
    timeFormatted: "1:36"
  - title: "Essential cloud characteristics"
    time: 139
    timeFormatted: "2:19"
  - title: "Cloud service models"
    time: 344
    timeFormatted: "5:44"
  - title: "Cloud deployment models"
    time: 552
    timeFormatted: "9:12"
  - title: "What problems Safespring solves"
    time: 1192
    timeFormatted: "19:52"
  - title: "Strengths and weaknesses"
    time: 1613
    timeFormatted: "26:53"
  - title: "Safespring services"
    time: 2002
    timeFormatted: "33:22"
  - title: "Limitations and non-offerings"
    time: 2784
    timeFormatted: "46:24"
  - title: "Data centers and responsibilities"
    time: 3058
    timeFormatted: "50:58"
  - title: "Containers"
    time: 3210
    timeFormatted: "53:30"
  - title: "Kubernetes"
    time: 3516
    timeFormatted: "58:36"
  - title: "Summary"
    time: 3840
    timeFormatted: "64:00"
---

{{< ingress >}}
This mandatory training gives employees a shared baseline for explaining Safespring: what cloud services are, what Safespring provides, what we do not provide and how our platform differs from hyperscale cloud providers.
{{< /ingress >}}

Gabriel Paus starts by framing the training goals: increase internal understanding of what Safespring does and does not do, make it easier to answer customer questions and give all employees a stronger technical foundation for collaboration.

The first part explains cloud computing through the NIST model: network access, measured service, resource pooling, on-demand self-service and rapid elasticity. It then separates the main service models: infrastructure as a service, platform as a service and software as a service. In Safespring terms, IaaS covers virtual machines and storage, while the managed Kubernetes offering sits closer to platform as a service. Safespring does not sell software as a service, but many customers build SaaS products on top of the platform.

The training then covers deployment models and the delivery model Safespring uses. Public, private, community and hybrid cloud are described in relation to how customers connect, where workloads run and how responsibilities are divided between Safespring and the customer.

The Safespring-specific section focuses on the problems we solve for cloud-mature and less cloud-mature organizations. For customers already using hyperscalers, the value is often sovereignty, compliance and a Nordic provider with familiar cloud primitives. For customers with more traditional environments, the value is self-service access to modern infrastructure without needing to build the same operational platform internally.

The strengths section highlights data sovereignty, Nordic ownership, Nordic data centers, security-focused service design, open source foundations and predictable resource consumption. The weaknesses section is equally important: employees should understand where Safespring is smaller, more focused and less broad than hyperscale platforms.

The service overview explains the current platform areas: Compute based on OpenStack, storage options including S3-compatible object storage, backup services, managed Kubernetes, GPU flavors and database as a service. The limitations chapter clarifies common customer requests that Safespring does not currently offer directly, such as DNS, CDN, load balancing as a broad standalone product and several higher-level managed services.

The final part introduces Safespring's public and private data centers, the responsibilities Safespring takes in those facilities and why containers and Kubernetes matter. Containers are explained as a lighter packaging model than virtual machines. Kubernetes is introduced as an orchestration platform for running, scaling and updating containerized applications while keeping workloads portable and easier to operate.

### After watching

- You should be able to explain the difference between IaaS, PaaS and SaaS in Safespring language.
- You should understand what makes a service a cloud service and how Safespring maps to those characteristics.
- You should be able to describe the main customer problems Safespring solves.
- You should know the major Safespring service areas and common limitations.
- You should be able to explain, at a high level, why containers and Kubernetes are important for the platform.
