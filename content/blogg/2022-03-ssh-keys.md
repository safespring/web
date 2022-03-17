---
title: "Best practices for ssh keys in Cloud/Openstack
date: "2022-03-17"
intro: "Let's go through some best practices regarding management of ssh keys, and clear up common misunderstandings."
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
For Linux-/Unix-based cloud instances the initial root access to the instances is enabled by means of ssh keys. In this post we'll go through some best practices and things to keep in mind when managing ssh-keys to enable root access to instances. 
{{< /ingress >}}

## TL;DR

* Ssh keypairs is not the same as an openstack keypair.
* Shh keypairs should be created on the user's computer in a trusted environment. It should be of type RSA and it should be kept in an encrypted secret store and never be exposed outside the user's local sit / environment.
* The badly named openstack keypair contains no secrets, only an ssh pubkey.
* An openstack keypair is tied to the user creating it, not to a specific project.
* Nobody cares about ssh host keys, but they should. 

## Background
When you provision instances in any cloud platform you get at virtual server
with a base operating system like Centos, Ubuntu, Debian, FreeBSD etc. based on
which cloud image the instances is provisioned from. You can use images
available in the IaaS-platform or uploud your own, as long as the image is prepared
for being used with the IaaS-platform you use. In Safespring's case the image
must be made for Openstack IaaS.

The mechanism that automates configuration of a cloud image into a cloud
instance must grant admin-/root-access to the user owning the
provisioned instance in order for that user to further configure the instances
to do something useful (installing packeges, configuring services etc.). For
Linux-/Unix-based systems this access is granted via secure shelli daemon
(sshd) which is a service that all Linux-/Unix based systems have included, and
hence alwyays is part of a Linux-/Unix-based cloud image. Although sshd can allow users 
to log in with password, this option is turned off in all cloud images meant
for production use passwords pose a security risk. Instead the access is
grantead by means of a public ssh key which is placed in the `authorized_keys`
file of the image's `cloud user`. The `cloud user` is the loacal user ( in
`/etc/passwd|shadow`) that the owner of the instance can log into the instance
with and become root using `su` or `sudo`. So in order to log in to a cloud
instance with an ssh client (for example the ssh cli in Linux/OSX etc. ) you
must:

* Make sure to have the public key injected to the `cloud users's` `authorized_keys` file in the instance
  * This is done by cloud init when you tell openstack which public ssh key to use with the instance
* Use the correct cloud user name for the image: i.e. centos for Centos, ubuntu for Ubuntu and so on. (Google is your friend her )
* Have the private key matching the public key in instance' `authorized_keys` file available to your client. (Preferably by adding it to you local ssh-agent from a secure place)

So we can appreciate that a lot of stuff happens behind the scenes in order for the users to securlye boostrap root access to the instances provisioned. 

## Public vs private
A keypair consists of a public and a private key. The names are just as
descriptive as they seem. The private key should be kept private as it contains
the secret you use to log in as root with by authenticating with the public key
in the same pair. The public key is well ...public. Knowledge of this key can
not grant access to anything.

In Openstack the term "keypair" translates to "public key" because it is only
the public part of the keypair that is stored by Openstack. The best practice
for creating keypairs for cloud instances is to create it on your local
computer in a trusted environmet (use RSA key type) and then create an openstack
keypair by importing the public key of the locally generated keypair. That way
neither the cloud provider nor anyone in between on sitting the network will
ever have access to your private key. Needless to say the private key should be
exposed solely to subjects (users, scripts, playbooks etc.) that should have
root access to the instance thus it should be kept in a encrypted secret store
and only be exposed on a need to know basis. 

A consequence of this approach is that you should not use openstack (GUI,
API, CLI) to generate the keypair, just beacuse the private key then will not
be as private as possible.

## Public keys are tied to Openstack users
Openstack keypairs, which contains the public part of the keypair, is owned by
the user that created them, regardless of project. So the openstack keypair is
not a project resources but a user resource. Thus a user can see (GUI) or list
(CLI) their keys regardless of which openstack project the user is in.

A user can import as many keypairs (public keys) to openstack as they wish.
This is useful if one want to segregate root access for different sets of
instances by attaching different keypairs (public keys) to the different sets
of instances and then give access to local private keys matching those sets
that local subject should have access to.

Another way of separating and/or taking full control over access is to use the
openstack provided keypair only to configure your own
authenticationi/authorazation mechanism and then remove access via the cloud
user by removing its `authorized_keys´. To prevent it from being re-injected to
the authorozed_keys` file upon rebuild (which for instance happens when
resizing) one can also just remove the keypair (public key) from Openstack.
This of course takes away any fallback access in case the auth method the user
set up is misconfigured or malfunctioning, and the user is permanantly locked out.

## Ssh public host key
In addition to the ssh keypairs that is used to grant access to users, there is
also the ssh host key. It is the way that a host uniquely identifies itself to
connecting clients. It is up to client to opt in to trust this upon the first
contact, and it can bee seen as this type ove message the first time we try to
access a host by ssh.

```
The authenticity of host 'foo.example.net (x.x.x.x)' can't be established.
ECDSA key fingerprint is SHA256:bbFasR3yR1ellOSPnLOjYTWkAdGNnhNnUybkbrf5apc.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```
If wwe say yes, the fingerprint is stored in our `known_hosts` file and
effectively is trusted upon subsequent accesses. 

The correct thin to do before answering yes and trusting that the ssh service
on the host is actually the one it claims to be, is to compare the fingerprint
in that prompt against a known fingerprint of the remote servers' host key
file. This can be done with  the output of `ssh-keygen -l -f
<ssh-host-key-file>` on the server you are trying to log in to. Hmm, that's a
bit of Catch22 right? How can I run a command on a host I'm not yet logged
into? Perhaps this is why most users just ignore it and just accept the risk
tha someone executes a man in the middle attack right in that moment of
exchange of initial trust. Of course if you accept the key fingerprint without
verifying it you basically say that «I'm convinced enough that someone is not
spoofing my communcation at this time and accept to trust this fingerprint
without verifying it». 

Unless you are among the vast majority that apparantly is fine with this
practice you should probably consider to inject a script with cloud-init that
will securely post that server ssh host fingerprint home to you and use that to
generate ssh known hosts that actually are known.

