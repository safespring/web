---
title: "Network services"
language: "en"
cardtitle: "Network"
cardicon: "fa-solid fa-network-wired"
cardcolor: "#195F8C"
cardorder: "02"
date: 2023-02-28
draft: false
intro: "Mandatory and optional network services when using the IaaS platforms."
cardintro: ""
background: "safespring-compute-background.svg"
form: "no"
sidebarlinkname: "Back to all categories"
sidebarlinkurl: "/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Safespring Service Catalogue"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
- /service-catalogue/network/
---

{{< ingress >}}
Mandatory and optional network services when using the IaaS platforms.
{{< /ingress >}}

The network design of the IaaS platform is based on L3 (IP) and hardware-based routing. Virtual routers or L2 overlay networks are not used. This ensures maximum network performance and operational simplicity at all scales. Security are based on sets of L3 IP address access control lists. If a customer requires overlay networks, they are free to deploy them – at less overhead and at higher performance than in competing provider solutions.

1. Public IPv4 and IPv6 addresses directly assigned to network interface
1. Private addresses for site-internal communication
1. Ingress / Egress traffic controlled by API driven ACL
1. Managed SLB (based on BGP and haproxy)
1. Saferoute / IP-VPN
1. Bring your own IP prefixes (for large customers)
1. Reverse DNS Configuration (for large customers, own prefixes)

<table class="width100">
  <thead>
    <tr>
      <th>Product Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>NET-publicv4</td>
      <td>Public IPv4 address</td>
    </tr>
    <tr>
      <td>NET-publicv6</td>
      <td>Public IPv6 address</td>
    </tr>
    <tr>
      <td>NET-byoip</td>
      <td>Bring your own IP prefix</td>
    </tr>
    <tr>
      <td>NET-ingress</td>
      <td>Ingress traffic into an instance from outside the datacenter</td>
    </tr>
    <tr>
      <td>NET-egress</td>
      <td>Egress traffic from an instance to outside the datacenter</td>
    </tr>
    <tr>
      <td>NET-mgn.slb</td>
      <td>Managed Service Load Balancer</td>
    </tr>
    <tr>
      <td>NET-saferoute</td>
      <td>Saferoute MPLS based IP-VPN</td>
    </tr>
    <tr>
      <td>NET-rdns</td>
      <td>Reverse DNS records (PTR)</td>
    </tr>
  </tbody>
</table>

## Public IP addresses

Safespring provides public IPv4 and IPv6 addresses to your services. By default, each instance receives one of each.

## Bring your own IP prefix(es)

Customers can allocate their own IPv4 prefixes to the platform for their own use in the platform (minimum size /24). Safespring configures these prefixes in the platform and announce them to its peers using BGP.

## Ingress / Egress traffic

Safespring measures ingress and egress traffic for each customer instance at the network border of each datacenter.

## Managed SLB

Safespring manages a Service Load Balancer for customers. It is hosted on a server instance in the customers environment. The load balancer is a subscription service and is charged monthly. Included in the cost is configuration and management. Additional IPv4 addresses are charged as an extra.

## Saferoute

Safespring provides an MPLS based IP-VPN service with the local NREN allowing separate traffic from regular Internet traffic, such that customers can connect an environment in the Safespring datacenters to their own local infrastructure, e.g. behind firewalls, etc. This product depends on network integration with the local NREN its peers and is not generally available to any customer, but other VPN solutions can be delivered using standard Professional Services instead in those cases.

## Reverse DNS Configuration

Safespring offers the option to configure reverse DNS names (PTR records) for public IP addresses, tailored to customer needs. This service is particularly relevant for use cases such as hosting SMTP servers or other services where reverse DNS is critical. Requests are evaluated on a case-by-case basis, and we will provide an estimated cost based on the specific requirements.
