---
title: "Using a jumphost for persistent access to Safespring's APIs"
date: "2022-08-24"
intro: "Using a jumphost is good practice for security and is easier to setup than you might think"
draft: true
tags: [""]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Tech update"
language: "En"
toc: ""
---

{{< ingress >}}
Automation tools like Terraform requires access to several of Openstack's APIs
which we're currently exposing only to whitelisted IPs for security reasons, a
practice we share with several other small and independent cloud providers like
ourselves. With many engineers working remote and not having a fixed IP, it can
be tedious process to submit a support ticket each time your public IP changes
and, understandably, it may feel a bit backwards in 2022.  However, using a
jumphost is not only a simple solution to this problem but also good practice
for most automation scenarios where security is critical.
{{< /ingress >}}

## Background

Openstack is a software platform consisting of several components controlling a
pool of different processing, storage and networking resources along with helper
components such as an identity service and a GUI dashboard. What might look like
one unified product from a dashboard perspective are in reality different pieces
of software developed by different community teams organized under a larger
project - a common model in open source projects. The components communicate
over their respective REST APIs with the dashboard as a centerpiece for the user
interaction with these APIs. However, when using the CLI or automation software
like Terraform you're not communicating through a single application interface
like the dashboard, but with all the individual service's public API endpoints. 

This doesn't imply that Openstack is insecure; quite the contrary actually. 
Openstack is one of the most transparent and secure cloud platforms there is,
being developed in the open by a large number of people and organizations under
constant scrutiny. However, all software is potentially vulnerable to security
breaches and exploits, which is why there are constant attempts to compromise
practically anything exposed to the internet from every corner of the world.
While we feel confident that the Openstack component's public APIs are
reasonably secure and correctly configured on our side, they nevertheless
constitute a relatively large attack vector. Given the resources we as a small
company have available - and the potential damage a security breach may cause to
our customers - it makes sense for us to limit this attack vector even if it
causes a small inconvenience when direct API access is needed. 

Even if we hypothetically could guarantee that every public API endpoint were
100% bulletproof there are good reasons to be cautious as a consumer. For
example, there's no way to use multi-factor authentication between e.g.
Terraform and Openstack APIs, or with the Openstack CLI for that matter.
Credentials are often stored in clear text and, needless to say, the
implications of a stolen laptop or credentials gone astray could be 
disastrous - a single command could wipe out an entire infrastructure.  

Using a jumphost is not a perfect solution to the above mentioned challenges,
but a good first step to better security - and quite a few other benefits as well. 

## Using a jumphost

A jumphost in a broader definition is a system on a network used to access and
manage devices in a separate security zone. By using a jumphost you can restrict
access to internal resources to a single source with increased security
hardening (including multi-factor authentication) and monitoring. Depending on
how strictly you define a jumphost, it can also be a work environment where e.g.
deployments to the internal servers are executed. In some cases even full
development environments are deployed on jumphosts using remote development
tools like VSCode or a combination of terminal editors and multiplexers with the
benefits of easy access to internal resources and collaborative coding. 

The public instance network ranges in Safespring Compute are whitelisted for API
access on our load-balancers which is why we always recommend our customers to
start off by creating a jumphost through the web dashboard and utilize this for
API-based provisioning (e.g. Terraform). 

There are other benefits as well. For example, if you want to deploy to
instances on the private (RFC1918) network the only way to do that is through a
public instance in the same site. We've written about that in detail in 
[another blog post](https://www.safespring.com/blogg/2022-03-network/). 
You could of course create a specific jump for this purpose alone, however,
doing all provisioning and deployments from a single host is far more
convenient.

Combine all this and you have a very practical way of managing your Safespring
infrastructure as well as your own security zone. 

Working over SSH from a jumphost doesn't fit every scenario. Another common
option when working across security zones is a VPN. This has traditionally been
a rather complicated task to configure involving complex networking, security
and protocols, and is considered both archaic and a time-drain for many
administrators. 

## Using sshuttle

Enter [sshuttle](https://github.com/sshuttle/sshuttle) - by its developer
referred to as "a poor man's VPN" - but no less powerful for that. sshuttle is
entirely based on SSH, is very simple to use, is reasonably fast and requires no
server-side configuration besides a working SSH server. Not only is it
leveraging the security benefits of OpenSSH but also its in-built tunneling
capabilities without needing to set up individual forwarding for every host/port
on the remote network.  

The downside of sshuttle is that it currently only runs on macOS, Linux and BSD.
There's currently no support for Windows, including WSL (although there is a
[workaround](https://sshuttle.readthedocs.io/en/stable/windows.html)). 

Using sshuttle with a Safespring Compute instance hardly requires any set up.
Just launch an instance, add your SSH-key in simply run

```
sshuttle -r <username>@<instance ip> <range you want to forward>
```

The range could be as narrow or wide as you'd like, but for the Openstack APIs
it's sufficient to forward the IP the auth_url in your openstack config resolves
to. 

As sshuttle is an SSH client it supports the same authentication methods and
security hardening as a regular OpenSSH client, including MFA.

## Other options

Other options include more full-fledged VPN solutions like
[Wireguard](https://www.wireguard.com/), [ZeroTier](https://www.zerotier.com/)
or [OpenVPN](https://openvpn.net/) which are all a lot simpler to configure than
traditional protocols like IPSec, GRE, PPTP etc. If you're going to set up a VPN
in Safespring Compute anyway the gateway can serve as a jumphost has well. We've
created some documentation on how to get started at
https://docs.safespring.com/new/vpn/ and we also provide an automated setup of a
Wireguard gateway which can be used for this purpose and more, available here
https://github.com/safespring-community/wireguard-gateway 