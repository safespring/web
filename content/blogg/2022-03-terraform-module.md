---
title: "Flexible provisioning of services with Safespring's Terraform modules"
date: "2022-03-29"
intro: "From basic to to more advanced/powerful usage of Safespring's Terraform modules"
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
This is part two in the series about Safespring's Terraform modules. In this
blog post, we'll look at the new and more general Safespring modules for compute
instances and security groups, how it can be used to provision sets of instances
in different configurations allowing only the necessary connections using
security groups. The next post will be about how Ansible can be used together
with inventory from terraform/openstack to configure services on the provisioned
instances.{{< /ingress >}}

## The new «v2-compute-instance» module
In [the previous blog post][firstblog] we showcased basic usage of the initial
version of the Safespring Terraform modules. These modules are now deprecated
and are replaced by a single module that does more than the deprecated ones. The
reason for this is that the new module automatically switches usage of «boot
from volume» on and off based on whether the flavor name starts with an «l» or
not. The new module also defaults to use [our new compute flavors][newflavors],
while the deprecated ones default to the old deprecated flavors.  Last but not
least, the new module can [receive a map variable describing a set of additional
data disks to be attached to the instance][diskmap].

{{<note "Note">}}The module library is constantly evolving so this blog post
explains the features currently available and how to use them. Please also look
at the code, comments, and variable definitions to get the full picture.
Especially at a later point in time. {{</note>}}

## Examples
We'll use the code [examples][sftfexamples] in the Terraform module [git
repo][sftfmodules] as a reference and explain each of them underneath the code.

### One instance with default parameters

Code:
```
module my_sf_instance {
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   # name          = "hello-safespring"
   key_pair_name   = "an-existing-keypair"
   # config_drive  = false
   # disk_size     = 5                 # When using b2-flavors
   # network       = "default"         # One of default, private, public
   # wg_ip         = ""                # Ends up as metadata. Can be used to assign wireguard address for us in Ansible.
   # role          = "general"         # Ends up as metadata. Can be for example be used as ansible host group with Ansible Terraform Inventory (ATI)
   # image         = "ubuntu-20.04"
   # flavor        = "l2.c2r4.100"     # Use openstack flavor list. Pick flavors starting with b2 or l2
   # security_groups = ["default"]
   # data_disks = {
   #   "db" = {
   #     size    = 5
   #     type    = "fast"
   #   }
   #   "archive" = {
   #      size = 10
   #      type = "large"
   #   }
   # }
}
```

This is the simplest possible example using only the module source on GitHub and
a pre-existing keypair. All other values are default. The commented lines
document the contents of the default values. To override the default just
uncomment and change the value.

When applied, this code will create a compute instance with the name
hello-safespring, operating system ubuntu 20.04, from a flavor with the local
disk, 2 VCPUS and 4 GB of RAM. It will be attached to the default network which
gives the instance a public IPv6 address and a private IPv4 address.  The
instance will have no data disks and will be a member of the `default` security
group which will contain rules that allow traffic from the instance egress to
the world on IPv4 and IPv6. Since the flavor is of type local disk, the
disk_size parameter will be ignored and the local NVMe disk that is defined in
the flavor (100GB) will be used for the Ubuntu operating system.

The `config_drive` parameter is rarely used. If you don't know what it is used
for you can safely leave the default (false). For the `role` and `wg_ip`
parameters we'll leave the explanation until later.

### A set of 3 instances using count

Code:
```
module my_sf_instances {
   count           = 3
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   name            = "hello-safespring-${count.index + 1}.example.com"
   key_pair_name   = "an-existing-keypair"
}
```
Here we added a count of 3 and we use the count index to differentiate the names
of the 3 instances created (you can't create more than one instance with the
same name). Applying this will yield 3 instances named
`hello-safespring-{1,2,3}.example.com`. Commented default parameters were
explained in the first example so they are left out here. As in the first
example, default values will be used where none is given, so all 3 instances
will have the same properties as in the first example.

### Security group(s) and keypair as part of the code

Code:
```
# This is needed when creating resources directly. When using modules
# the modules will have this included.
terraform {
  required_version = ">= 0.14.0"
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
    }
  }
}

# Create a keypair from a public key.
# An openstack keypair contains only the public key. Thus a misleading name for it.
resource "openstack_compute_keypair_v2" "skp" {
  name       = "hello-pubkey"
  public_key = "${chomp(file("~/.ssh/id_rsa.pub"))}"
}

# Create a security group using a safespring module
module puff {
   source = "github.com/safespring-community/terraform-modules/v2-compute-security-group"
   name = "bowl-of-petunias"
   description = "Oh no! Not again"
   rules = {
     one = {
       ip_protocol = "tcp"
       to_port = "22"
       from_port = "22"
       ethertype = "IPv4"
       cidr = "0.0.0.0/0"
     }
     two = {
       ip_protocol = "tcp"
       to_port = "443"
       from_port = "443"
       ethertype = "IPv4"
       cidr = "0.0.0.0/0"
     }
  }
}

module my_sf_instances {
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   name            = "hello-safespring-${count.index + 1}.example.com"
   count           = 3
   security_groups = [ module.puff.name ]
   key_pair_name   = openstack_compute_keypair_v2.skp.name
}
```
Now we've added code to create the keypair `hello-pubkey` and the security group
`puff`. Those names are used to name the objects within OpenStack. There are
also the Terraform internal names which are used only for referencing back and
forth inside the Terraform code/state. The latter is used to reference the names
of the keypair and security group in the definition of the instances.

The result of this config will be the same 3 instances as in the previous
example except they won't be a member of the default security group, but rather
the `puff` security group that we created with ingress rules for `ssh` and
`https`.

Also, we have created our own keypair (public key) that our instances will get
in their cloud users' `authorized_keys`-file. This code takes the local (where
Terraform is run) `~/.ssh/id_rsa.pub` file and creates an OpenStack keypair for
it. For details about ssh-keys in OpenStack, please head over to [another blog
post regarding that][sshblog]

In this config, we have mixed the creation of resources directly in the config
and via external modules. This is fine, sometimes the resources are so simple
that it doesn't make sense to create an abstraction (module) for it. The
OpenStack keypairs are a good example of such a resource.

The specification of security group rules is done with map variables directly
inside the security group module instantiation, a map of maps «one» and «two».
These can be replaced with «locals» or even variable definitions that can be
used as parameters if using this code as a module.

It is totally up to you if you want to make use of our module library, create
your own modules or just create the resources directly in your config. At least
the module library, with its default values, can serve as documentation or a
thin wrapper around the resources and names in our platform as seen from a
Terraform perspective.

### Maps define instances and security group rules

```
module ingress {
   source = "github.com/safespring-community/terraform-modules/v2-compute-security-group"
   name = "ingress"
   delete_default_rules = true
   description = "For exposing web servers on port 443 (https) to the world"
   rules = {
     ingress = {
       direction   = "ingress"
       ip_protocol = "tcp"
       to_port     = "443"
       from_port   = "443"
       ethertype   = "IPv4"
       cidr        = "0.0.0.0/0"
     }
  }
}

module interconnect {
   source = "github.com/safespring-community/terraform-modules/v2-compute-security-group"
   name = "interconnect"
   delete_default_rules = true
   description = "For interconnecting servers with full network access between members"
   rules = {
     ingress = {
       direction             = "ingress"
       remote_group_id = "self"
     }
     egress = {
       direction             = "egress"
       remote_group_id = "self"
     }
  }
}

locals {
  instances = {
    "web1" = {
      name    = "websrv1.example.com"
      flavor  = "l2.c2r4.100"
      os      = "centos-7"
      network = "public"
      sgs     = [ module.interconnect.name, module.ingress.name ]
    }
    "web2" = {
      name    = "websrv2.example.com"
      flavor  = "l2.c2r4.100"
      os      = "centos-7"
      network = "public"
      sgs     = [ module.interconnect.name, module.ingress.name ]
    }
    "db" = {
      name    = "db.example.com"
      flavor  = "l2.c4r8.100"
      network = "default"
      os      = "ubuntu-20.04"
      sgs     = [ module.interconnect.name ]
    }
  }
}

module my_sf_instances {
   for_each        = local.instances
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   name            = each.value.name
   image           = each.value.os
   network         = each.value.network
   security_groups = each.value.sgs
   key_pair_name   = an-existing-keypair-or-id-of-one-in-terraform-config
}
```
Here we iterate over a local map of maps that define all aspects of the
instances to be created (see the line `for_each = local.instances`). Then we
override the defaults of the `v2-compute-instance`-module using the individual
fields of each map (in the `instances`-map) thus creating 3 instances with
different properties.

The instances `websrv{1,2}.example.com` is created from a `centos-7`-image,
attached to the public network (hence they get public IP addresses). They are
also attached to both the `ingress` and the `interconnect` security groups which
means that the sum/union of all rules in those security groups apply to them.

The `interconnect` security group has rules that open up full connectivity
between all members of the group, but nothing else. The `ingress` security group
opens up port `tcp/443` from the world to all of its members.

Since the `db` server is the only member of the `interconnect` security group,
the `websrv{1,2}` servers can connect to it (and vice versa) but the `db` server
can not be reached from anywhere else, both because it is attached to the
`default` network, which is a private (RFC1918) network, and because of the
rules in the `ingress` security group (which only allows members of the same
group to connect). If you are puzzled about why the webservers on the `public`
network can connect to the db server on the `default` network with only one
interface on each of them, [please read this blog post about Safespring's
network stack.][netblog]

It is worth noting that the parameter `delete_default_rules = true` will remove
the default egress rules that allow access to the world on IPv4 and IPv6, hence
giving you full control over what traffic will be allowed.  This will
effectively firewall all attempts from servers to initiate outbound connections
and can be used as efficient prevention of [stage 2 downloads of executable code
(break establishment of command and control (COC))][coc]. Then you can punch
only the necessary holes for legitimate outbound connections to software
repositories etc. This is relevant also for servers on the `default`-network
both via IPv6 and NATed IPv4.

{{<note "Note">}}If you create an instance that has no security groups attached
to it, it will still be attached to the `default` security group that includes
egress rules that allow the instance to connect to the world. To prevent this,
create your own security groups that you attach instances to and use the
«delete_default_rules = true» parameter to the «v2-compute-security-group»
module.{{</note>}}

[coc]: https://www.paloaltonetworks.com/cyberpedia/how-to-break-the-cyber-attack-lifecycle
[diskmap]:https://github.com/safespring-community/terraform-modules/blob/main/examples/v2-compute-instance/main.tf#L15
[newflavors]:https://docs.safespring.com/new/flavors/
[firstblog]:https://www.safespring.com/blogg/2022-01-terraform-modules/
[mbcfengine]:https://www.researchgate.net/publication/243774232_Cfengine_A_site_configuration_engine
[tfdl]:https://www.terraform.io/downloads
[sftfmodules]:https://github.com/safespring-community/terraform-modules
[sftfexamples]:https://github.com/safespring-community/terraform-modules/tree/main/examples
[sshblog]:https://www.safespring.com/blogg/2022-03-ssh-keys/
[netblog]:https://www.safespring.com/blogg/2022-03-network/