---
title: "Best practices for SSH keys in Cloud/Openstack"
date: "2022-03-17"
intro: "Let's go through some best practices regarding management of SSH keys, and clear up common misunderstandings."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Tech update"
language: "En"
toc: "Table of contents"
---
{{< ingress >}}
For Linux-/Unix-based cloud instances, the initial root access to the instances is enabled employing SSH keys. In this post, we'll go through some best practices and things to keep in mind when managing ssh-keys to enable root access to instances.
{{< /ingress >}}

## Summary (TL;DR)

* SSH keypairs are not the same as an OpenStack keypair.
* SSH keypairs should be created in a trusted environment on the user's computer. It should be of type RSA. The private key should be kept in an encrypted secret store and never be exposed outside the user's local site/environment.
* The poorly named "OpenStack keypair" contains no secrets, only an SSH pubkey.
* An "OpenStack keypair" is tied to the user creating it, not a specific project.
* Nobody cares about SSH host keys, but they should.

## Background
When you provision instances in any cloud platform, you get a virtual server with a base operating system like Centos, Ubuntu, Debian, FreeBSD, etc., based on which cloud image the instance is provisioned from. You can use images available in the Infrastructure as a Service (IaaS) platform or upload your own, as long as the image is prepared for being used with the IaaS-platform you use. In Safespring's case, the image must be made for the OpenStack IaaS.

The mechanism that automates the configuration of a cloud image into a cloud instance must grant operating system root access to the user owning the provisioned instance. This is to let the user to further configure the instance to do something useful (installing packages, configuring services, etc.).

For Linux-/Unix-based systems, this access is granted via secure shell daemon (SSHD), a service that all Linux-/Unix-based systems have included and is always part of a Linux-/Unix-based cloud image. Although SSHD can allow users to log in with a password, this option is turned off in all cloud images meant for production use since [passwords pose a security risk][sshpw].

[sshpw]:https://blog.runcloud.io/why-authentication-using-ssh-public-key-is-better-than-using-password-and-how-do-they-work/

Instead, the access is granted by means of a public SSH key which is placed in the `authorized_keys` file of the cloud user of the image. The cloud user is the local user ( in the instance'  `/etc/passwd|shadow`) that is used for logging in to the instance with, and then become root using `su` or `sudo`.

In order to gain operating system access to a cloud instance with an SSH client, you must:

* Make sure to have the public key injected into the cloud users' `authorized_keys` file in the instance
* Use the correct cloud user name for the image: i.e., centos for Centos, Ubuntu for Ubuntu, etc. (Google is your friend here.)
* Have the private key matching the public key in the instance' `authorized_keys` file available to your client.

Injection of the public key into the cloud user's `authorized_keys` file is done by "cloud-init" when you tell OpenStack which public SSH key to use with the instance.

So we can appreciate that a lot of stuff happens behind the scenes for the users to securely bootstrap root access to the instances that are provisioned. Openstack is just reusing already existing mechanisms long before "the cloud." It's just wrapped in something new called "cloud-init." No magic, really!

## Best practice

### Public vs private
A keypair consists of a public and a private key. The names are just as descriptive as they seem. The private key should be kept confidential as it contains the secret you use to log in with.

The public key contains no secrets. Knowledge of this key can not grant access to anything anywhere.

In Openstack, the term "keypair" is poorly named. It translates to "public key" because it is only the public part of the keypair that is stored by Openstack.

The best practice for creating keypairs for cloud instances is to make it in a trusted environment in your premises and then generate an OpenStack keypair by importing the public key of the locally generated keypair. That way, neither the cloud provider nor anyone in between will ever access your private key.

Needless to say, the private key should be exposed solely to subjects (users, scripts, playbooks, etc.) that should have root access to the instance; thus, it should be kept in an encrypted secret store and only be exposed on a need to know basis.

A consequence of this approach is that you should not use OpenStack (GUI, API, CLI) to generate the keypair, just because the private key will not be as private as possible.

### Public keys are tied to Openstack users
Openstack keypairs, which contains the public part of the keypair, is owned by the user that created them, regardless of the project. So the OpenStack keypair is not a project resource but a user resource. Thus a user can see (GUI) or list (CLI) their keys regardless of which OpenStack project the user is in.

**Once again: OpenStack keypairs contain only the public key, and sharing it with the world is not a problem if you choose to do so.**

A user can import as many keypairs (public keys) to OpenStack as they wish. This is useful if one wants to segregate root access for different sets of instances by attaching different keypairs (public keys) to the different sets of instances and then giving access to local private keys matching those sets that the local subject should have access to.

Another way of separating and/or taking complete control over access is to use the OpenStack provided keypair only to configure your own authentication/authorization mechanism and then remove access via the cloud user by removing its `authorized_keys`. To prevent it from being re-injected to the `authorized_keys` file upon instance rebuild, one can also remove the keypair (public key) from Openstack. This will also remove the fallback access if the auth method the user set up is misconfigured or malfunctioning and the user is permanently locked out.

### SSH public host key
In addition to the SSH keypairs that are used to grant access to users, there is also the SSH host key. This is the method a host uniquely identifies itself to connecting clients with. It is up to the client to trust this host key upon the first contact. We have all seen this message:

```
The authenticity of host 'foo.example.net (x.x.x.x)' can't be established.
ECDSA key fingerprint is SHA256:bbFasR3yR1ellOSPnLOjYTWkAdGNnhNnUybkbrf5apc.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

If we say yes, the fingerprint is stored in our `known_hosts` file and effectively is trusted upon subsequent access.

The correct thing to do before answering yes and trusting that the SSH service on the host is actually the one it claims to be is to compare the fingerprint in that prompt against a known fingerprint of the remote servers' host key file. You can do this with the output of `ssh-keygen -l -f <ssh-host-key-file>` on the server you are trying to log in to.

Hmm, that's a bit of Catch22, right? How can I run a command on a host I'm not yet logged into? Perhaps this is why most users ignore it and accept the risk that someone executes a man in the middle (MITM) attack right in that moment of exchange of initial trust. Of course, suppose you accept the key fingerprint without verifying it. In that case, you say that «I'm convinced enough that someone is not spoofing my communication at this time and accept to trust this fingerprint without verifying it».

Unless you are among the vast majority that apparently is fine with this, the practice you should probably consider is injecting a script with cloud-init that will securely post that server SSH host key fingerprint home to you and use that to generate SSH known hosts that actually are known.

More on [SSH MITM][ssh-mitm]

[ssh-mitm]: https://github.com/ssh-mitm/ssh-mitm

## Key management
To keep control of SSH keys as an access mechanism, one must establish good tools and routines. Your mileage will vary, but [this blog post][kmgmt] goes through some important things to think about.

[kmgmt]: https://www.beyondtrust.com/blog/entry/ssh-key-management-overview-6-best-practices
