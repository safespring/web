---
title: "The Safespring network model explained"
date: "2022-03-24"
intro: "People are puzzled by the network stack of the Safespring OpenStack
compute platform. Let's check it out and do some explanation."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Tech update"
author: "Jarle Bjørgeengen"
language: "en"
toc: "Table of contents"
aliases:
    - /blogg/2022-03-network
    - /blogg/2022/2022-03-network/
---

{{< ingress >}}
This blog post will explain the different aspects of the Safespring network
stack from a user perspective.
{{< /ingress >}}

If you come from other platforms that use the legacy
«layer 2 bridging» approach (with software-defined switches, routers,
floating IP addresses, etc.), please read the full post to understand the
implications. It does not work the way you think :-). Prerequisites for
understanding this post are basic knowledge of CIDR notation, IP protocols
(TCP,UDP,ICMP), and IP-based access control.

{{% accordion title="TL;DR (Summary)" %}}
**Do not attach more than one interface; it will destroy communication**

The Safespring compute platform platform uses the [Calico][calico] OpenStack neutron core
plugin for networking.

Use security groups to enable communication between
Safespring instances and between Safespring instances and the Internet.

IP addresses are allocated from a shared pool but don't change during the
lifetime of an instance.

You can't bring your own IP address unless you create your own tunnels on top
of your instances.

There is no floating IP pool.

Click through the seven screens of the diagram below to understand how
communication happens based on security group memberships and rules.

{{% /accordion %}}
{{< accordion-script >}}

{{< distance >}}

[calico]: https://www.tigera.io/project-calico/

<iframe src="/img/safespring-network.sozi.html"  width="100%" height="500" style="border:0"></iframe>

## The explanation

All frames of the diagram contain the same three instances that are attached
to `public`, `default-v4-nat` and `private` networks respectively.

{{% note "Note" %}}
Note that none of the instances have more than one interface; the interface to the network they are attached to.
{{% /note %}}

Each diagram frame exemplifies the effect that security groups and their rules have on how
connections are allowed to take place. This blog is only about how the platform
works, so what is happening in the operating system of instances is outside
this post's scope.

To explain how egress rules and ingress rules work together, the
diagram starts with instances that are not a member of any security groups.
(i.e, the default security group that includes egress to the world has been
removed)

Red dashed arrows depict no connection. Green solid arrows depict an allow rule
with the arrow pointing in the allowed direction.

1. None of the instances can communicate with anyone.
2. Egress (E) rule is added to allow the instance on the `public`-network
   (public instance) to access any IPv4 Internet address on any
   port. Connection going out is visualized with the arrow direction.
3. Ingress (I) rule is added to allow any IPv4 Internet address to contact the
   public instance on port 443. (The arrow goes from the Internet to the
   instance)
4. Ingress (I) rule is added to the instance on the `default-v4-nat`-network
   (default instance) that will allow the public instance to reach the default
   instance on port 80 (tcp). This is where many users think they need a separate
   «leg» from the "public instance" to the `default-v4-nat`-network. Not only is
   this not necessary, it will also completely destroy the communcation on the public
   instance. Note that the egress rule from 3. will allow outbound
   traffic from the public instance already; thus we do not need to add a rule for
   that.
5. Ingress (I) rule is added to the public instance, allowing the the
   default instance to reach the public instance on port 3333 (tcp). Since
   no egress rules were attached to the default instance we also need to
   allow outgoing traffic (egress) to the public instance on port 3333.
6. Ingress (I) rule is added to the default instance, allowing the instance on
   the `private`-network (private instance) to connect to the default instance
   on port 4545 (tcp). Again an egress rule for the private instance is necessary
   too. In this case, we open wide and allow the private instance to reach all
   ports in all of the IPv4 address space. (And the default instance is, of course,
   part of that). So the private network should be able to talk to any Internet
   IPv4 address, right? **Wrong**. Instances on the private network can only talk
   to other Safespring instances in the same site, provided security group rules
   allow it.
7. Egress (E) rule is added to allow the default instance to access 1.1.1.1 on
   port 443 (tcp). This will work because the `default-v4-nat` is set up to do Network Address
   Translation (NAT). Just be aware that obviously, the source
   address as seen from 1.1.1.1 is **not** the one on the instance interface. It
   is, in fact, the public address of the compute host the instance is running on.
   (Which is doing the NAT/Masquerade)

## Other gotchas

An instance **must** always have the Safespring provided gateway (from
DHCP) as the first routing hop. If you try to add (in the operating
system) another default gateway, or a static route via another, the packages
will just be dropped, and it will not work.
This is because every instance has its own separate layer 2-connection to the
Safespring provided gateway, and thus all traffic is routed through it on layer 3. This router is always the first hop, as automatically configured by DHCP.

Consequently, if you require your own network on top of the Safespring
platform, you must use some form of tunneling like Wireguard, IPIP, GRE, etc.,
that will create its own overlay network that you as a user control.

## Why Calico

- {{< inline "Simplicity/Security:" >}} I.e., less complexity => smaller attack surface, and fewer
  things that can go wrong.
- {{< inline "Performance:" >}} Just straight BGP routing is a lot more performant than
  (re)creating virtual switch layers and **then** put layer 3 on top again. We
  get close to line speed with very little overhead using this approach.
- {{< inline "Scalability:" >}} BGP scales the Internet. Calico scales the data center similarly
  using BGP
- {{< inline "Cost:" >}} No expensive vendor «lock-in» with costs attached. Less overhead =>
  less compute power => less energy consumption for the same work => greener and
  less expensive.

## Summary

- Only use one interface per instance
- Security groups **are** the firewall. Adapt your design to utilize this
  property of the platform, using automation tools like Terraform, for instance
  (no pun intended) \* Open up only what you need with security groups.
- Do not change the interface/network configuration in the instances away from
  using DHCP.
- Use tunneling on top of our provided layer 3 network stack if you must
  have layer 2 connectivity between instances.
- The Safespring «networks» is just a mechanism to allocate IP addresses from a
  CIDR. Each instance is routed separately (with /32 prefix) by the platform. The
  instance can only talk to the gateway over layer 2, so in practice, all
  traffic must go through the platform-provided gateway on layer 2.
