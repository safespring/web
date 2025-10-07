---
title: "Cloud Image Service"
language: "En"
cardtitle: "Cloud Images"
cardicon: "fa-solid fa-compact-disc"
cardcolor: "#195F8C"
cardorder: "03"
date: 2023-02-28
draft: false
intro: "The IaaS service additionally contains a cloud image service (Openstack Glance)."
cardintro: ""
background: "safespring-compute-background.svg"
form: "no"
sidebarlinkname: "Back to all categories"
sidebarlinkurl: "/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Safespring Service Catalogue"
socialmedia: "/safespring-start.jpg"
toc: ""
---

{{< ingress >}}
The IaaS service additionally contains a cloud image service (Openstack Glance).
{{< /ingress >}}

## What is a cloud image

Cloud images are prepared OS images that are deployable in a cloud environment where, for example the server-to-be’s name, IP or MAC address is not known in advance. These images are commonly relying on a popular piece of software called cloud-init.

The image service allows users to create, read, update and delete their own images, which users either have authored on their own or copied from another source. The service also contains a list of public images that are updated regularly by the provider.

### Prerequisites

Although the image service can be used stand-alone, in order to launch an image using these cloud images, a server instance is required.

### Image storage service

The image service base offer is the image service itself, which stores images for consumption within the IaaS service. Product code: IM-Storage.

### Provided Public Images

Safespring provides the following public cloud images, based on upstream project’s publication. They are regularly updated with newer releases within their major versions.

| OS                             | Version               |
|--------------------------------|-----------------------|
| CentOS                         | 7                     |
| CentOS                         | 8                     |
| Cirros                         | 0.3.6                 |
| Debian                         | 9 (Stretch)           |
| Debian                         | 10 (Buster)           |
| RedHat Enterprise Linux Server | 7                     |
| RedHat Enterprise Linux Server | 8                     |
| Windows Server                 | 2016 Datacenter       |
| Windows Server                 | 2019 Datacenter       |
| Ubuntu                         | 16.04 (Xenial Xerus)  |
| Ubuntu                         | 18.04 (Bionic Beaver) |
| Ubuntu                         | 20.04 (Focal Fossa)   |
| Scaleout STACKn                | 2020.6                |


