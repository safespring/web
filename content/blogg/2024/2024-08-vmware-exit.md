---
title: "Escaping the VMware trap?"
date: 2024-08-30
intro: "VMware users had their world turned upside down when Broadcom decided to rapidly  change the user terms of VMware software in 2024"
draft: false
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
causing concern and prompting some to consider alternatives. This post will
address these challenges and one proposed solution.
{{< /ingress >}}

These changes, after Broadcom's acquisition of VMware, have led to higher long-term 
costs for many customers, especially smaller businesses that may see dramatic 
increases in their annual renewal fees.


{{% note "Key effects of Broadcom's acquisition of VMware" %}}

* Broadcom has made major changes to VMware's pricing and licensing model:
  * Shifted from perpetual licenses to a subscription-based model
  * Eliminated the free version of VMware's vSphere Hypervisor (ESXi)
  * Implemented price increases, with some customers reporting 5-10x higher costs
{{% /note %}}

## Background

VMware is a leading company in the field of cloud computing and virtualisation
technology, founded in 1998 and headquartered in Palo Alto, California. It
specialises in creating software that allows multiple virtual machines (VMs) to
run on a single physical server, enabling efficient use of hardware resources.

VMware's primary product is its virtualisation software, which creates an
abstraction layer over computer hardware. This allows a single physical machine
to operate multiple virtual computers, each running its own operating system
(OS) and applications independently. The first commercial product, VMware
Workstation was released in 1999, enabling users to run different operating
systems on a single PC

During the 2000s, VMware server technology was a flexible way of
abstracting server workloads away from physical hardware.

## The Safespring alternative

Safespring uses the OpenStack and CEPH open source projects to build production
quality Infrastructure as a Service in multiple physical data centre locations
in the Nordics. At the core, both VMware and OpenStack are all about managing
virtual machines (VMs), thus, Safespring ought to be a great alternative to
VMware, right? Well, as always, it depends! Most of all, it depends on your
ability and motivation to automate infrastructure and operating system
management.

Traditionally, VMware and specialised tooling companies provided tools to first
migrate physical machines to virtual machines using image capture technologies
for the hard drives (P2V) and subsequently using virtual disk images as a means to
manage upgrades and migrations. While this seems like a good approach in the
short term, we think it only postpones the need to manage VMs, disks, and
networks separate from VM operating systems and with operating system
configuration management tools like Cfengine, Rudder, Puppet, Chef and/or Salt
& Ansible (for orchestration) and a version control system for code and
configuration data.

So, to be blunt, the usefulness of any IaaS service as a replacement for VMware or
similar kinds of on-premise virtual infrastructure management tools depends
strongly on the willingness and ability to automate and manage the
infrastructure provisioning, the operating system configuration (including
workload deployment) and state management (data dumps, object storage, backups
etc.) separately from VM images and snapshots. Thus, if you already manage your
VMware workload like this, Safespring could nearly be a drop in replacement by
only rewriting the infrastructure code, using, for instance, our community
provided [Terraform modules][tfmodulesblog]

### Closing the gap

Safespring offers a free assessment service to estimate the key activities
needed to migrate your workloads from VMware to the Safespring
platform.

The assessment can be adapted to each customer's needs, but the following
activity list outlines the evaluation:

* Identify which VMware products are in use
* Identify which features of the products are used, for which purposes and to which extent
* Identify the distribution of operating systems for VM workloads and the level
  of automation and tools in use for managing operating systems and their workloads.
* Identify container workloads and tools used to deploy them.
* For workloads evaluated to be reasonably easy to migrate, create proof of
  concept (POC) to try out Safespring as a new destination for the workloads
* Based on the POC outcome, create a complete migration plan for all workloads
  verified to be compatible with Safespring

The service is free, and the only requirement from you is to first qualify by
[answering a short survey][survey] about your current in-house experience with
automated infrastructure management tools and practices. Once qualified, we ask
you dedicate resources with sufficient knowledge to work with us to first
carry out the assessment and then create the migration plans and automation
code to deploy the necessary infrastructure to deploy workloads onto.

[tfmodulesblog]: https://www.safespring.com/blogg/2022/2022-03-terraform-module/
[survey]: https://next.safespring.com/apps/forms/s/miJx5AFAb988X5EjwCLF5LGd
