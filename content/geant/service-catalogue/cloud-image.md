---
title: "Cloud Image Service"
language: "En"
cardtitle: "Cloud Images"
cardicon: "fa-solid fa-compact-disc"
cardcolor: "#195F8C"
cardorder: "04"
date: 2024-10-10
draft: false
cardintro: "The IaaS service additionally contains a cloud image service (Openstack Glance)."
intro: "Effortlessly manage and deploy operating system images in the cloud with Safespring’s Image Service, powered by OpenStack Glance, enabling customized or pre-configured cloud environments."
background: "safespring-compute-background.svg"
form: "no"
sidebarlinkname: "Back to all categories"
sidebarlinkurl: "/geant/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Géant Service Catalogue"
socialmedia: "/safespring-start.jpg"
toc: "On this page"
noindex: "x"
---

{{< ingress >}}
The Compute service additionally contains a cloud image service (OpenStack Glance).
{{< /ingress >}}

## Cloud Images
Cloud images are prepared OS images that are deployable in a cloud environment where, for example the server-to-be’s name, IP or MAC address is not known in advance. The images need to have the framework cloud-init installed, which provides OpenStack with an API to interact with the created instances to set these variables in the instance.

The image service allows users to create, read, update and delete their own images, which users either have authored on their own or copied from another source. The service also contains a list of public images that are updated regularly by the provider.

### Prerequisites

Although the image service can be used stand-alone, in order to launch an image using these cloud images, a server instance is required.

### Image Storage Service

The image service base offer is the image service itself, which stores images for consumption within the Compute service. Product code: `IM-Storage`.

### Provided Public Images

Safespring offers the following public cloud images, based on upstream project releases. These images are regularly updated within their major versions:

| Operating System Images        |
|--------------------------------|
| CentOS                         |
| Cirros                         |
| Debian                         |
| RedHat Enterprise Linux Server |
| Windows Server Datacenter      |
| Ubuntu                         |


{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Get in contact with Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Sales:" >}} +46855107370 or sales@safespring.se
{{% /custom-card %}}