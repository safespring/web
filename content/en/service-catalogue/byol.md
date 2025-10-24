---
title: "Bring Your Own License – BYOL"
language: "en"
cardtitle: "Own License"
cardicon: "fa-solid fa-hand-holding-box"
cardcolor: "#195F8C"
cardorder: "09"
date: 2024-05-17
draft: false
intro: "Bring Your Own License, using existing software licenses in Safespring cloud environment"
cardintro: ""
background: "safespring-compute-background.svg"
form: "no"
sidebarlinkname: "Back to all categories"
sidebarlinkurl: "/service-catalogue"
section: "Safespring Service Catalogue"
socialmedia: "/safespring-start.jpg"
toc: ""
nosidebar: ""
aliases:
  - /service-catalogue/byol/
---

{{< ingress >}}
Safespring provides several third-party software licenses for use on our IaaS platforms.
{{< /ingress >}}

Safespring’s IaaS services are available without bundled paid software licenses from software vendors making the Safespring IaaS services a perfect fit for customers who have existing licensing agreements which allows for deployments on a public cloud. Safespring does not impose any artificial limitations to customers’ abilities to implement BYOL, it is solely up to the vendors licensing agreements.

{{% disclaimer "Licensing Responsibility" %}}
As Safespring is a third party to the licensing agreement between the Customer and the software vendors, it is the customer’s responsibility to make sure it fulfills the licensing requirements for running software on the cloud platform.

Any indication of permissibility given here is only meant to serve as a guide to the customer. The customer is responsible for ascertain the permissibility of its licensing agreements to run Safespring’s IaaS platforms.
{{% /disclaimer %}}

## Vendors

Vendors with commercial support with known permissibility terms are listed in the table below.

| Vendor    | Software                                               | Comment                                                                                                                                                      |
| --------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Microsoft | Applications, not OS such as Windows / Windows Server. | Currently possible with Software Assurance and License Mobility                                                                                              |
| RedHat    | Red Hat Enterprise Linux                               | Permissible via 3rd party software SLA clause.                                                                                                               |
| SUSE      | SUSE Enterprise Linux                                  | Permissible.                                                                                                                                                 |
| Oracle    | Oracle Database                                        | Permissible on Safespring virtual IaaS with risk of no support if Oracle believes cause is not Oracle software. Bare metal deployments receive full support. |

Safespring does not restrict in any way what software customers use, other than via its [Acceptable Use Policy](/documents/safespring-acceptable_use_policy.pdf) . This means that any Linux distribution that can run on x86 platforms on standard modern KVM hypervisors is technically supported, including essentially all community editions.
