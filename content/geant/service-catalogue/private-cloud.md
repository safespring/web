---
title: "Private Cloud"
language: "En"
cardtitle: "Private Cloud"
cardicon: "fa-solid fa-shield-check"
cardcolor: "#195F8C"
cardorder: "07"
date: "2025-01-20"
draft: false
cardintro: "Complete offer including hardware, operations and software maintenance."
intro: "Comprehensive private cloud solutions, including hardware, operations, and software maintenance, tailored for full control and scalability in dedicated customer-owned infrastructure."
background: "safespring-compute-background.svg"
form: "no"
sidebarlinkname: "Back to all categories"
sidebarlinkurl: "/geant/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "OCRE 2024 framework"
socialmedia: "/safespring-start.jpg"
toc: "On this page"
noindex: "x"
---

{{< ingress >}}
Complete offer for Private Cloud deployment, including hardware, operations and software maintenance. The hardware is owned by the customer and provides datacenter rack space for the installation. 
{{< /ingress >}}

The Compute base offer includes Control Plane and Compute Service with local instance storage only.

Options include Elastic Block Storage (Ceph cluster) and accelerated compute nodes (typically GPU).

The Storage base offer includes Control Plane and storage nodes of either HDD or NVMe type.

Storage interfaces include RADOS, S3 via Rados Gateway, Rados Block Device or iSCSI/NFS via storage proxy.

If needed, the customer can take over the management of the installation and continue host the service on its own. This ensures services continuity in case the customers needs change over time and can be facilitated with controlled knowledge transfer from Safespring to the customer.

## Private Cloud – Compute Base
The base configuration, Compute Base,  is for deployment in a dedicated rack space, preferably with room to grow. The ToR switches scale to 24 compute or storage nodes due to 4 interfaces being reserved for control plane, 2 for interswitch-links, 2 for uplinks. 

If multi-rack deployment additional ports are required for cross-connect. Compute Node configuration (CPU, RAM, local NVMe) per customer specification.

### Prerequisites
None.

## Private Cloud – Volume Storage Option
The Compute Volumes option add several storage options to the Compute Base deployment. NVMe, for local ephemeral storage on the compute nodes where the instances are running as well as HDD based storage for persistent storage needs in a shared Ceph cluster. It reuses the switches and control plane of the Private Cloud deployment. The ToR switches are based on 32x100 Gbps and scale to 24 compute or storage nodes due to four interfaces being reserved for control plane, two for interswitch-links, two for uplinks.

If multi-rack deployment additional ports are required for cross-connect. Storage interface is Rados Block Device (RBD) to the compute nodes . HDD Storage Node fits 12x3.5”, maximum size per drive depends on market availability and uses Optane drive for DB. NVMe Storage Node fits 10x2.5” NVMe, drive write endurance and size depends on market availability and customer preference.

### Prerequisites
Compute Base configuration.

## Private Cloud – S3 Storage Option
Private Cloud can be deployed with a large scalable object storage with an S3 compatible API. This gives the customer a cost efficient and standardized way of storing large amount of data in the platform. 

In combination with block storage option connected to the compute nodes, data can be stored in S3 object storage and then copied to the block storage during processing. This combination of S3 object storage and block storage gives a very cost effective, yet productive environment to store and process large quantities of data.

The S3 Storage Option is a separate solution from Compute Base, and can be set up separate

### Prerequisites
None.


{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Get in contact with Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Sales:" >}} +46855107370 or sales@safespring.se
{{% /custom-card %}}


