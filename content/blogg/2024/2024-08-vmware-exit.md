---
title: "Escaping the VMware trap?"
date: 2024-08-30
intro: "VMware users had their world turned upside down when Broadcom decided to rapidly  change the user terms of the VMware software in 2024."
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
address these challenges and describe one solution to the challenges.
{{< /ingress >}}

These changes, after Broadcom's acquisition of VMware, have led to higher long-term
costs for many customers, especially smaller businesses that may see dramatic
increases in their annual renewal fees.


{{% note "Key effects of Broadcom's acquisition of VMware" %}}
1. Shifted from perpetual licenses to a subscription-based model.
2. Eliminated the free version of VMware's vSphere Hypervisor (ESXi).
3. Implemented price increases, with some customers reporting 5-10x higher costs.
{{% /note %}}

## Background

VMware was a leading software company in the field of on-premise datacenter
virtualisation technology that creates an abstraction layer over computer
hardware. In many ways VMware pioneered the usage of virtual servers on top of
"common off the shelf" (COTS) Intel-based server hardware during the 2000s.
They became the first choice for many on-premise data centre workloads even
though other and less known alternatives did and do exist.

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
for the hard drives (P2V) and subsequently using virtual disk images as a means
to manage upgrades and migrations.

While this seems like a good approach in the short term, we think it only
postpones the need to manage VMs, disks, and networks separate from VM
operating systems and with operating system configuration management tools like
Cfengine, Puppet, Chef and orchestration tools like  Salt and Ansible, commonly
referred to as "infrastructure as code", or IAC. This approach allowed for IAC
to be managed using the same kind of version control systems seen in cloud-native
application development, thus improving flexibility, stability and automation
level also on the infrastructure side of things.


So, to be blunt, the usefulness of any IaaS service as a replacement for VMware, or
similar kinds of on-premise virtual infrastructure management tools, depends
strongly on the willingness and ability to automate and manage the
infrastructure provisioning, the operating system configuration (including
workload deployment) and state management (data dumps, object storage, backups
etc.) separately from VM images and snapshots. Thus, if you already manage your
VMware workload like this, Safespring could nearly be a drop in replacement by
only rewriting the infrastructure code, using, for instance, our community
provided [Terraform modules][tfmodulesblog].

Of course, you can take OpenStack for a spin by yourself, as described in the
Openstack open source project description of ["Migrating from VMware to
OpenStack: Optimizing your Infrastructure to Save Money and Avoid
Vendor-Lock-in"][openstackmig]. However, if you are looking for a minimum effort
alternative, why not just buy the managed service experience and let the
professionals take care of the somewhat complex task of Operating OpenStack in
a secure and stable manner.

### Closing the gap

Safespring offers a free assessment service to estimate the key activities
needed to migrate your workloads from VMware to the Safespring
platform.

The assessment can be adapted to each customer's needs, but the following
activity list outlines the evaluation:

1. Identify which VMware products are in use.
2. Identify which features of the products are used, for which purposes, and to what extent.
3. Identify the distribution of operating systems for VM workloads and the level
  of automation and tools in use for managing operating systems and their workloads.
4. Identify container workloads and tools used to deploy them.
5. For workloads evaluated to be reasonably easy to migrate, create a proof of
  concept (POC) to try out Safespring as a new destination for the workloads.
6. Based on the POC outcome, create a complete migration plan for all workloads
  verified to be compatible with Safespring.

The service is free, and the only requirement from you is to first qualify by
[answering a short survey][survey] about your current in-house experience with
automated infrastructure management tools and practices. Once qualified, we ask
you dedicate resources with sufficient knowledge to work with us to first
carry out the assessment and then create the migration plans and automation
code to deploy the necessary infrastructure to deploy workloads onto.

{{< distance >}}

{{% custom-card image="/img/card/safespring-move-from-vmware.svg" cardtitle="Get a free assessment for migrating your VMware workloads to Safespring" %}}
Safespring offers a free assessment service to help you migrate workloads from VMware to our platform, tailored to your needs. This includes identifying current VMware products, assessing automation levels, and creating a proof of concept for migration.

{{< localbutton text="Start the assessment" link="https://next.safespring.com/apps/forms/s/miJx5AFAb988X5EjwCLF5LGd" >}}

{{% /custom-card %}}

{{< distance >}}

[tfmodulesblog]: https://www.safespring.com/blogg/2022/2022-03-terraform-module/
[survey]: https://next.safespring.com/apps/forms/s/miJx5AFAb988X5EjwCLF5LGd
[openstackmig]: https://www.openstack.org/vmware-migration-to-openstack-white-paper
