---
title: "API Access"
language: "En"
cardtitle: "API Access"
cardicon: "fa-kit fa-api"
cardcolor: "#195F8C"
cardorder: "02"
date: "2025-01-20"
draft: false
intro: "Access and automate Safespring’s cloud infrastructure seamlessly through our comprehensive APIs, enabling full control over compute, storage, and backup services."
cardintro: "Effortless cloud automation through Safespring’s API Access."
background: "safespring-compute-background.svg"
form: "no"
sidebarlinkname: "Back to all categories"
sidebarlinkurl: "/geant/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "OCRE 2024 framework"
socialmedia: "/safespring-start.jpg"
toc: "On this page"
noindex: "x"
aliases:
- /geant/service-catalogue/api/
---



{{< ingress >}}
All Safespring’s services have APIs to enable the user to use the services in a more automated fashion.
{{< /ingress >}}

## Compute API

Safespring Compute is built upon OpenStack which comes with an extensible API. The services that Safespring provides API access for are:
1.	[Nova Compute](https://docs.openstack.org/api-ref/compute/). This API supports creation, deletion and modification of instances (virtual machines) in the platform.
2.	[Keystone Identity](https://docs.openstack.org/api-ref/identity/v3/). The API handles all identity handling and RBAC in the platform. This is the API to which a user login in order to get an authentication token which then can be used to subsequent calls to other APIs in the platform.
3.	[Glance Image handling](https://docs.openstack.org/api-ref/image/v2/). This API handles images and snapshots, from which an instance can be created. The used can also use this API to upload custom images to the platform. 
4.	[Neutron Network](https://docs.openstack.org/api-ref/network/v2/). This API handles networking. Since Safespring is using the networking engine Calico, this API is restricted since not all operations can be done when using this networking engine. 
5.	[Cinder Block Storage](https://docs.openstack.org/api-ref/block-storage/v3/). This API gives access to block storage operation such as creating and attaching volumes to instances.

## Storage API

Safespring Storage support the S3 API. The S3 API is the de-facto standard for interacting with object storage services. The service is provided with the Ceph storage project, and the operations supported by the implementation can be viewed here: https://docs.ceph.com/en/latest/radosgw/s3/.

## Backup API

Safespring Backup uses the product Cloutility from Aawau. The API specification can be found here: https://portal-api.backup.sto2.safedc.net/v1/help.
{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Get in contact with Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Sales:" >}} +46855107370 or sales@safespring.se
{{% /custom-card %}}