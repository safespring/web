---
title: "GPU resources for AI and machine learning"
metatitle: "GPU instances for AI and machine learning"
section: "Public Cloud"
language: "en"
cardtitle: "GPU for AI and ML"
megamenulisttitle: "GPU (AI/ML)"
cardicon: "fa-solid fa-microchip-ai"
cardcolor: "#195F8C"
cardorder: "2"
date: 2025-03-13
draft: false
intro: "Run inference, model training, video encoding, and other GPU-accelerated workloads on Safespring's cloud infrastructure."
cardintro: "GPU instances with A2 and H100 NVL for compute-intensive workloads."
form: ""
background: "safespring-ai-background.svg"
sidebarlinkname: "View prices"
sidebarlinkurl: "/price/#gpu-flavors"
sidebarlinkname2: "Contact Safespring"
sidebarlinkurl2: "/contact"
sidebarimage: "safespring-fredric.webp"
sidebartext: "Would you like to discuss GPU resources? My name is Fredric Wallsten. Feel free to contact me if you have any questions."
sidebarphone: "+46855107370"
sidebarmail: "hello@safespring.com"
socialmedia: ""
slug: "ai-ml"
aliases:
  - /en/services/machine-learning-ai-gpu-resources/
---

## GPU instances in Safespring Compute

{{< ingress >}}
Safespring Compute provides GPU flavors for inference, model training, video encoding, and running large language models.
{{< /ingress >}}

GPU resources are provided as flavors, which are predefined resource profiles. Each GPU flavor has a fixed combination of GPU, vCPU, and RAM. Flavors in the l2 series also include local storage. Current configurations and prices are listed on the price page.

A2 is suitable for inference, lighter training, and video encoding. A2 flavors are available in STO2 and are enabled for the project through support. H100 NVL is available in STO1 on request and is optimized for inference with large language models. The card has 94 GB of HBM3 memory, PCIe 5.0 x16, and passive cooling.

{{< gpu-comparison >}}

{{< distance >}}

## Choose between local and central storage

l2 flavors include local NVMe storage on the compute node. The root disk follows the instance lifecycle and is deleted with the instance. Safespring cannot restore the data if the local disk fails. Use l2 for stateless or short-lived workloads, or make sure that the data is backed up.

b2 flavors do not include a local disk and boot from a persistent volume in central block storage. The volume remains independently of the instance and can be either `fast` or `large`.

{{< distance >}}

## GPU nodes for Kubernetes

GPU support in Safespring Kubernetes Engine is available in STO2 for worker nodes using A2 flavors whose names end in `gA2`. The documented SKE support does not include H100 NVL. The managed control plane and the Compute instances used as worker nodes are billed separately.

{{< distance >}}

## GPU and machine learning documentation and examples

Explore technical documentation for GPU instances, a practical guide to running a local language model, and an example of machine learning on Safespring's infrastructure.

{{< manual-document-table matomoAction="GPU Resources Deep Dive" >}}
  {{< manual-document-row
    title="A2 flavors in Safespring Compute"
    href="https://docs.safespring.com/compute/gpu/"
    icon="fa-solid fa-microchip-ai"
    label="Docs"
    description="NVIDIA A2, flavor naming, restrictions, and NVIDIA driver installation."
  >}}
  {{< manual-document-row
    title="Run GPU workloads in Kubernetes"
    href="https://docs.safespring.com/kubernetes/gpu/"
    icon="fa-solid fa-server"
    label="Guide"
    description="Verify the NVIDIA runtime and run GPU jobs and vLLM inference in Safespring Kubernetes Engine."
  >}}
  {{< manual-document-row
    title="Run a local language model with Ollama"
    href="/blogg/2025/2025-12-run-llm-in-safespring-container-platform/"
    icon="fa-solid fa-terminal"
    label="Blog"
    description="Install NVIDIA drivers, Ollama, and Open-WebUI on an Ubuntu GPU instance."
  >}}
  {{< manual-document-row
    title="Choose storage for the GPU instance"
    href="https://docs.safespring.com/compute/volume/"
    icon="fa-solid fa-hard-drive"
    label="Guide"
    description="Compare local storage with persistent volumes and learn about the fast and large volume types."
  >}}
  {{< manual-document-row
    title="Federated machine learning with Scaleout"
    href="/services/case/scaleout/"
    icon="fa-solid fa-people-arrows"
    label="Case study"
    description="Scaleout discusses federated machine learning, data protection, and its work on Safespring's infrastructure."
  >}}
{{< /manual-document-table >}}

{{< distance >}}

## Configurations and prices

The [GPU instance price list](/price/#gpu-flavors) contains current configurations with vCPU, RAM, local storage, GPU model, and prices per hour and per 30 days.

If you are unsure which flavor or storage option fits your workload, [contact Safespring](/contact) to discuss your requirements.
