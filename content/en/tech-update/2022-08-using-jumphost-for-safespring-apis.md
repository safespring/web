---
title: "Using a jump host for persistent access to Safespring's APIs"
date: "2022-09-06"
intro: "Learn how to set up a jump host for increased security and easy access to Safesprings API:s when you're on the go."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Tech update"
author: "Anders Trier-Vaage"
language: "en"
toc: ""
aliases:
  - /blogg/2022-08-using-jumphost-for-safespring-apis
  - /blogg/2022/2022-08-using-jumphost-for-safespring-apis/
---

{{< ingress >}}
Using a jump host is good practice for increased security and a simple solution when you don’t have a fixed IP-adress but need access to Safespring’s APIs.
{{< /ingress >}}

Automation tools like Terraform require access to several of OpenStack's APIs
which we're currently exposing only to whitelisted IPs for security reasons.
This is a practice we share with several other small and independent cloud
providers like ourselves. With many engineers working remote and not having a
fixed IP, submitting a support ticket each time your public IP changes might
feel tedious and unnecessary in 2022. However, using a jump host is not only a
simple solution to this problem but also good practice for most automation
scenarios where security is critical.

## Background

OpenStack is a software platform consisting of several components controlling a
pool of different processing, storage, and networking resources along with helper
components such as an identity service and a GUI dashboard. What might look like
one unified product from a dashboard perspective are in reality different pieces
of software developed by different community teams organized under a larger
project - a common model in open source software. The components communicate
over their respective REST APIs with the dashboard as a centerpiece for the user
interaction. However, when using the CLI or automation software like Terraform
you're not communicating through a single application interface like the
dashboard, but with all the individual service's public API endpoints.

This doesn't imply that OpenStack is insecure - quite the contrary. OpenStack is
one of the most transparent and secure cloud platforms there is, being developed
in the open by a large number of people and organizations, and under constant
scrutiny. However, all software is potentially vulnerable to security breaches
and exploits, which is why there are ceaseless attempts to compromise
practically anything exposed to the internet from every corner of the world.
While we feel confident that the OpenStack components' public APIs are
reasonably secure and correctly configured on our side, they nevertheless
constitute a relatively large attack vector. Given the resources we as a small
company have available - and the potential damage a security breach may cause to
our customers - it makes sense to limit this attack vector even if it causes a
minor inconvenience when direct API access is needed.

Even if we hypothetically could guarantee that every public API endpoint was
100% bulletproof, there are good reasons to be cautious as a consumer. For
example, there's no way to use multi-factor authentication between e.g.
Terraform and OpenStack APIs, or with the OpenStack CLI for that matter.
Credentials are often stored in clear text. The implications of a stolen laptop
or credentials gone astray could be disastrous - a single command could wipe out
an entire infrastructure.

Using a jump host is not a perfect solution to the above-mentioned challenges,
but an excellent first step to better security - and there are other benefits as
well.

## Using a jump host

A jump host in a broader definition is a system on a network used to access and
manage devices in a separate security zone. By using a jump host you can restrict
access to internal resources to a single source with increased security
hardening (including multi-factor authentication) and monitoring. Depending on
how strictly you define a jump host, it can also be a work environment where e.g.
deployments to internal servers are executed. In some cases, even full
development environments are deployed on jump hosts using remote development
tools like VSCode or a combination of terminal editors and multiplexers with the
benefits of easy access to internal resources and collaborative coding.

The public instance network ranges in Safespring Compute are whitelisted for API
access on our load-balancers which is why we always recommend our customers to
start by creating a jump host through the web dashboard and utilize this for
API-based provisioning (e.g. Terraform).

There are other benefits as well. For example, if you want to deploy to
instances on the private (RFC1918) network, the only way to do that is through a
public instance in the same site. We've written about that in detail in
[another blog post](/blogg/2022-03-network/).
You could of course create a specific jump for this purpose alone, however,
doing all provisioning and deployments from a single host is far more
convenient.

Combine all this and you have a very practical way of managing your Safespring
infrastructure as well as your own security zone.

Working over SSH from a jump host doesn't fit every scenario. Another common
option when working across security zones is a VPN. This has traditionally been
a rather complicated task to configure involving complex networking, security
and protocols, and is considered both archaic and a time-drain for many
administrators.

## Using sshuttle

Enter [sshuttle](https://github.com/sshuttle/sshuttle), by its developer
referred to as "a poor man's VPN", but no less powerful for that. sshuttle is
entirely based on SSH, is very simple to use, is reasonably fast, and requires no
server-side configuration besides a working SSH server. Not only is sshuttle
leveraging the security benefits of OpenSSH but also its in-built tunneling
capabilities - without needing to set up individual forwarding for every
host/port on the remote network.

The downside of sshuttle is that it currently only runs on macOS, Linux, and BSD.
There's currently no support for Windows, including WSL (although there is a
[workaround](https://sshuttle.readthedocs.io/en/stable/windows.html)).

Using sshuttle with a Safespring Compute instance hardly requires any set up.
Just launch an instance, add your SSH-key and simply run:

```
sshuttle -r <username>@<instance ip> <range you want to forward>
```

The range could be as narrow or wide as you'd like, but for the OpenStack APIs
it's sufficient to forward the IP the auth_url in your OpenStack config resolves
to.

As sshuttle is an SSH client, it supports the same authentication methods and
security hardening as a regular OpenSSH client, including MFA.

## Other options

Other options include more full-fledged VPN solutions like
[Wireguard](https://www.wireguard.com/), [ZeroTier](https://www.zerotier.com/)
or [OpenVPN](https://openvpn.net/) which are all a lot simpler to configure than
traditional protocols like IPSec, GRE, PPTP, etc. If you're going to set up a VPN
in Safespring Compute anyway the gateway can serve as a jump host has well. We've
created some [documentation on how to get started](https://docs.safespring.com/compute/vpn/) and we also provide an [automated setup of a
Wireguard gateway](https://github.com/safespring-community/wireguard-gateway) which can be used for this purpose and more, available here
