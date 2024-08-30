---
title: "Escaping the VMware trap"
date: "2024-08-30"
intro: "VMware users had their world turned upside down when Broadcom decided to rapidly  change the user terms of VMware software in 2024"
draft: true
section: "Tech update"
author: "Jarle Bjørgeengen"
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "En"
---


{{< ingress >}}
Broadcom's acquisition of VMware has had significant impacts on customers,
causing concern and prompting some to consider alternatives. Here are the key
effects:

* Pricing and Licensing Changes
* Broadcom has made major changes to VMware's pricing and licensing model:
* Shifted from perpetual licenses to a subscription-based model
* Eliminated the free version of VMware's vSphere Hypervisor (ESXi)
* Implemented price increases, with some customers reporting 5-10x higher costs

These changes have led to higher long-term costs for many customers, especially
smaller businesses that may see dramatic increases in their annual renewal
fees.

{{< /ingress >}}

## Background

VMware is a leading company in the field of cloud computing and virtualization
technology, founded in 1998 and headquartered in Palo Alto, California. It
specializes in creating software that allows multiple virtual machines (VMs) to
run on a single physical server, enabling efficient use of hardware resources.

VMware's primary product is its virtualization software, which creates an
abstraction layer over computer hardware. This allows a single physical machine
to operate multiple virtual computers, each running its own operating system
(OS) and applications independently. The first commercial product, VMware
Workstation, was released in 1999, enabling users to run different operating
systems on a single PC

During the 2000s adopted VMware server technology as flexible way of
abstracting server workloads away from physical hardware.

## The Safespring alternative

Safespring uses the Openstack and CEPH open source projects to build production
quality Infrastructure as a Services in multiple physical datacenter locations
in the Nordics.  

### Closing the gap

Safespring offer a free assessement service to estimate the key activities
needed in order to migrate your workloads from VMware to the Safespring
platform. 

The assessment can be adapted for each customer's needs, but the following
activity list outlines the assessment:

* Identify which VMware products are in use
* Identify which features of the products are used, for which purposes and to which extent
* Identify the distribution of operating systems for VM workloads and the level
  of automation and tools in use for managing operating systems and their workloads.
* Identify container workloads and tools used to deploy them.
* For workloads evaluated to be reasonably easy to migrate, create a proof of
  concept (POC) to try out Safespring as a new destination for the workloads
* Based on the POC outcome, create a full migration plan for all workloads
  verified to be compatible with Safespring

The seervice is free, and the only requirment from you is to dedicate human
resources with sufficient knowledge to work with us and help creating the
migration plans.
