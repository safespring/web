---
title: "Is it possible to replace VMware? There might be..."
date: 2025-02-20
intro: "VMware is designed for hosting and managing in-house IT systems, whereas Safespring provides services for running applications and systems in the cloud. Each has distinct strengths and weaknesses."
draft: false
tags: ["English"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "en"
sectiontext: "Blog"
section: "Tech update"
author: "Gabriel Paues"
TOC: "In this post"
aliases:
  - /blogg/2025/2025-02-vmware-exit/
---

{{< ingress >}}
With Broadcom's acquisition of VMware, many companies and organizations that have built their infrastructure on VMware have faced an unpleasant surprise: a new subscription-based model and overall higher prices.
{{< /ingress >}}

{{% accordion title="TL;DR" %}}

1. Broadcom’s acquisition of VMware has sparked concerns over subscription-based pricing and higher costs.
2. While VMware excels at on-premises virtualization, Safespring offers a cloud-native alternative based on OpenStack (virtualization), Ceph (storage), and containers.
3. It’s not a direct drop-in replacement; instead, Safespring enables modernization of IT infrastructure with tools for network security, resilient services (via Elastic IPs and Server Groups), and flexible VPN options like WireGuard.
4. Built on open-source technologies, Safespring’s solutions avoid lock-in, empower administrators with hands-on control, and ensure predictable, transparent pricing over time.

{{< localbutton text="Let's talk" link="#conclusion" >}}

{{% /accordion %}}
{{< accordion-script >}}

## The VMware Offering

For more than 20 years, VMware has been the most successful player in the market for virtualization solutions. VMware has offered flexibility (through virtualization) and other features and products to ease the workload of system administrators. Through good design choices, many customers have been able to migrate old physical systems directly into VMware. With robust monitoring, backend storage, and software-defined networking (SDN) solutions, VMware has enabled systems to be set up in a resilient and redundant way, requiring minimal changes to the actual software configuration of the systems. Additionally, VMware includes built-in network security features.

This functionality has allowed system administrators to manage complex IT environments with minimal overhead. IT administrators have also been relieved from having to address the intricate details of building robustness and redundancy, as the platform takes care of these tasks.

## The Safespring Offering

Safespring offers a cloud-based virtualization and storage solution built on OpenStack and Ceph. Additionally, Safespring provides a container platform based on OKD and an S3-compatible object storage solution.

{{< quote "Gabriel Paues (Cloud Architect)" >}}
It’s important to note that Safespring’s offering is not a drop-in replacement for VMware. VMware is designed for hosting and managing in-house IT systems, whereas Safespring provides services for running applications and systems in the cloud.
{{< /quote >}}

Each has distinct strengths and weaknesses.

That said, there are several ways customers can modernize their application deployment to fit into a cloud environment, thereby eliminating dependencies on the underlying virtualization platform.

### Network Security

Systems running on a VMware platform are often organized into internal and external network zones. External services are placed in an external network zone with stricter security constraints, while internal services operate in an internal network zone with more lenient policies. In this setup, many system administrators rely on the platform for network security instead of implementing it directly on each system.

Security update policies are often stricter for the external zone than for the internal zone. For example, systems in the internal zone might not be required to use encryption, whereas those in the external zone are.

### More flexible than VPN Tunnels

Many system integrators use VPN tunnels to connect remotely to systems hosted elsewhere. The most common solution is IPSec, which is secure but has setup challenges and interoperability issues. IPSec is primarily designed for site-to-site or client-to-site connections and can be cumbersome to configure for system-to-system communication.

IPSec uses one channel for encryption and another for transmitting encrypted data, making it challenging to traverse firewalls. As a result, IPSec tunnels are often terminated directly at the firewall.

When securely connecting resources in a traditional hosting provider, the approach is to set up an IPSec tunnel between the customer’s internal environment and the hosting provider, aggregating all traffic through these two locations.

However, modern VPN solutions like WireGuard offer a more flexible approach. WireGuard is stateless, encrypting each packet separately, which simplifies traversal through diverse IT environments. Built on UDP for speed, it allows encapsulated TCP sessions to handle retransmissions and packet integrity.

Since Safespring’s network stack relies on IP-to-IP connectivity, the traditional site-to-site method is suboptimal. Instead, customers are encouraged to build an overlay network that spans both the internal and cloud environments. WireGuard’s stateless nature makes it ideal for such setups. Instead of connecting all systems through a single central IPSec tunnel, customers can establish a mesh network where each system directly connects to others as needed. Open-source projects like [Netbird](https://netbird.io/) can simplify the configuration of such solutions.

### Resiliency

Resiliency can be achieved in various ways. Organizations familiar with VMware likely rely on tools like load-based automatic live migration (DRS) and integrated software-defined networking (SDN) to ensure services remain accessible. In such cases, the virtualization platform handles resiliency, requiring minimal customization of the applications themselves.

Safespring’s OpenStack solution offers tools to achieve similar resiliency:

{{< icon-block-horisontal color="#417DA5" icon="fas fa-network-wired" text="Elastic IP" description="These can be used with products like HAProxy and Traefik for load balancing and network resiliency." link="" >}}
{{< icon-block-horisontal color="#417DA5" icon="fas fa-server" text="Server Groups" description="These ensure that cluster members of a service run on different hardware nodes within the platform." link="" >}}

Using these tools, services can be configured for redundancy and resiliency. For instance, a service can run across multiple cluster members distributed across different hardware nodes using Server Groups. Elastic IPs can distribute traffic among the cluster members while maintaining a common IP address.

While this approach requires manual setup, it provides administrators with a better understanding of the solution, fostering confidence and peace of mind.

## Conclusion

Safespring’s services empower organizations to transform their internal IT into modern cloud-based solutions while maintaining security, accessibility, and resiliency. Rather than relying on a platform to handle these tasks automatically, administrators gain the knowledge and tools to address potential issues.

Safespring’s solutions are built on open standards, and the principles used are transferable to other services. Furthermore, being based on open-source products ensures there are no unexpected billing changes due to revised licensing models.

{{% custom-card image="/img/card/safespring-move-from-vmware.svg" cardtitle="Do you want to migrate your VMware workloads to Safespring?" %}}
Safespring offers a free assessment service to help you migrate workloads from VMware to our platform, tailored to your needs.

{{< localbutton text="Start the assessment" link="https://next.safespring.com/apps/forms/s/miJx5AFAb988X5EjwCLF5LGd" >}}

{{% /custom-card %}}
