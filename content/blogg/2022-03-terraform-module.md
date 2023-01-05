---
title: "Flexible provisioning of resources with Safespring's new Terraform modules"
date: "2022-04-11"
intro: "From basic to more advanced/powerful usage of Safespring's Terraform modules"
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
This is part two in the series about Safespring's Terraform modules. This blog
post will look at the new and more general Safespring modules for compute
instances and security groups.{{< /ingress >}}

We will also look at how we can use it to provision sets of instances
in different configurations allowing only the necessary connections using
security groups. The next post will be about using Ansible and
from terraform/OpenStack to configure services on the provisioned
instances.

{{% note "Read more" %}}
If you found this post useful, be sure to check out the rest of the series on using Terraform and Ansible for resource provisioning and compliance. In particular, you might also enjoy: 

1. [Dead easy provisioning using the Safespring Terraform modules](/blogg/2022-01-terraform-modules)
2. [Flexible provisioning of resources with Safespring's new Terraform modules](/blogg/2022-03-terraform-module)
3. [Integrating Terraform and ansible for efficient resource management](/blogg/2022-05-terraform-ansible)
4. [From zero to continuous compliance with Terraform, ansible and Rudder](/blogg/2022-06-terraform-ansible-rudder)

{{% /note %}}


## Prerequisites
This blog post assumes that you use the open source Terraform CLI. Terraform CLI
is just a binary program that you download from the [releases page][tfreleases],
for your architecture/platform. Here you also find checksums for the files to
verify their integrity.  

Unless otherwise explained, all the examples presuppose that you put the code
in a `.tf` in a separate directory and run `plan`, `init`, `apply` and `destroy`
from within that directory. `main.tf` is mostly used as a convention for the file
name, but you can name it whatever you like as long as it ends in `.tf`

There is also the official [Terraform documentation][tfdocs]

## Terraform introduction

Terraform takes plain text files with «HCL - Hashicorp Configuration Language»
as input and provides servers and storage as output. HCL is a declarative
language, i.e., it does not specify any actions to be taken but rather a desired
state - or outcome.

The idea that configuration languages should be declarative, and that
the agent should drive/converge real state into the declared desired state, has
become widely accepted over the last three decades and is based on ideas and
research by [Mark Burgess during the early nineties and later][mbcfengine].

### Terraform providers
The superpower of Terraform comes from all of its providers. The Terraform
providers are binary extensions of Terraform that, as the name indicates,
«provide» resources of different kinds using the APIs of the cloud provider
reflected by the extension's name.

These extensions do all the heavy lifting for the cloud provider APIs and
ensure that the actual state (the cloud resources) is converged to what is
specified as the desired state.

Terraform can be viewed as a desired state configuration agent for
infrastructure. Every time it is run, it will turn the desired state into the
actual state for cloud resources.

### Reducing the level of «lock-in»
Terraform has tons of battle-tested providers available to use, thus easing the
burden of provisioning cloud resources from all kinds of cloud APIs within the
same (or different) configurations.

Let's say you need resources in other clouds (or on-premise) for the same
multi-cloud or hybrid environments. Then you can do that using one Terraform
config, and you can even scale up and down the number of resources by changing
some variables in your Terraform code.

Terraform is cloud-agnostic and thus is excellent insurance that your resources are as portable as possible, thus reducing the level of "lock-in" to a minimum.

{{< disclaimer "Disclaimer" >}}Terraform is a powerful tool, and powerful tools can make
powerful failures if misused, so be sure to read up on documentation
and best practices to understand the nature of the tool before using it for
the important stuff.{{< /disclaimer >}}

## The new «v2-compute-instance» module
In [the previous blog post][firstblog] we showcased basic usage of the initial
version of the Safespring Terraform modules. These modules are now deprecated
and are replaced by a single module that does more than the deprecated ones. The
reason for this is that the new module automatically switches usage of «boot
from volume» on and off based on whether the flavor name starts with an «l» or
not. The new module also defaults to use [our new compute flavors][newflavors],
while the deprecated ones default to the old deprecated flavors. Last but not
least, the new module can [receive a map variable describing a set of additional
data disks to be attached to the instance][diskmap].

{{< note "Note" >}}The module library is constantly evolving, so this blog post
explains the features currently available and how to use them. Please also look
at the code, comments, and variable definitions to get the whole picture.
Especially at a later point in time. {{< /note >}}

## Examples
We'll use the code [examples][sftfexamples] in the Terraform module [git
repo][sftfmodules] as a reference and explain each of them underneath the code.

### [Ex1][ex1]: One instance with default parameters
[ex1]:https://github.com/safespring-community/terraform-modules/blob/main/examples/v2-compute-instance/main.tf

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
document the contents of the default values. To override a default just
uncomment and change the value.

When applied, this code will create a compute instance with the name
hello-safespring, operating system ubuntu 20.04, from a flavor with the local
disk, 2 VCPUS, and 4 GB of RAM. It will be attached to the default network, which
gives the instance a public IPv6 address and a private IPv4 address. The
instance will have no data disks and will be a member of the `default` security
group, which will contain rules that allow traffic from the instance to
the world on IPv4 and IPv6 (egress). Since the flavor is of type local disk, the
disk_size parameter will be ignored, and the local NVMe disk defined in
the flavor (100GB) will be used for the Ubuntu operating system.

The `config_drive` parameter is rarely used. If you don't know what it is used
for, you can safely leave the default (false). For the `role` and `wg_ip`
parameters, we'll leave the explanation until later.

### [Ex2][ex2]: A set of 3 instances using count
[ex2]: https://github.com/safespring-community/terraform-modules/blob/main/examples/v2-compute-instance-set-with-count/main.tf

```
module my_sf_instances {
   count           = 3
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   name            = "hello-safespring-${count.index + 1}.example.com"
   key_pair_name   = "an-existing-keypair"
}
```
Here we added a count of 3, and we use the count index to differentiate the names
of the 3 instances created (you can't create more than one instance with the
same name). Applying this will yield 3 instances named
`hello-safespring-{1,2,3}.example.com`. Commented default parameters were
explained in the first example, so they are left out here. As in the first
example, default values will be used where none is given, so all 3 instances
will have the same properties, and these properties are the same default values
as in the first example.

### [Ex3][ex3]: Security group(s) and keypair as part of the code
[ex3]: https://github.com/safespring-community/terraform-modules/blob/main/examples/v2-compute-instance-set-with-keypair-and-secgroup/main.tf

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
OpenStack keypairs are an excellent example of such a resource.

The specification of security group rules is done with map variables directly
inside the security group module instantiation, a map of maps «one» and «two».
These can be replaced with «locals» or even variable definitions that can be
used as parameters if using this code as a module.

It is totally up to you if you want to make use of our module library, create
your own modules or just create the resources directly in your config. At least
the module library, with its default values, can serve as documentation or a
thin wrapper around the resources and names in our platform as seen from a
Terraform perspective.

### [Ex4][ex4]: Maps define instances and security group rules
[ex4]: https://github.com/safespring-community/terraform-modules/blob/main/examples/v2-compute-instance-set-using-map/main.tf

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
giving you full control over what traffic will be allowed. This will
effectively firewall all attempts from servers to initiate outbound connections
and can be used as efficient prevention of [stage 2 downloads of executable code
during an attack and hence [prevent attackers establishment of command and
control (COC))][coc]. Then you can punch only the necessary holes for legitimate
outbound connections to software repositories etc. This is relevant also for
servers on the `default`-network both via IPv6 and NATed IPv4.

{{< note "Note" >}}If you create an instance that has no security groups attached
to it, it will still be attached to the `default` security group that includes
egress rules that allow the instance to connect to the world. To prevent this,
create your own security groups that you attach instances to and use the
«delete_default_rules = true» parameter to the «v2-compute-security-group»
module.{{< /note >}}

### [Ex5][ex5]: Combining count and map for instances and map for disks
[ex5]: https://github.com/safespring-community/terraform-modules/tree/main/examples/v2-compute-instance-set-with-count-and-map

It would be nice if you could combine iteration with `for_each` (map) and count,
right? That way you could say: «Give me 10 web servers with no datadisk on the
public network with flavor X, and 2 backend servers on the default network with a
100GB datadisk». Well, if you try to combine them in the same call to
`v2-compute-instance` you will get an error saying:

```
The "count" and "for_each" meta-arguments are mutually-exclusive, only one
should be used to be explicit about the number of resources to be created.  
```

However it can be done by wrapping one of them into its own module.
let's say we create the following local module in a directory named
`./a-set-of-instances`:

`main.tf`

```
module my_sf_instances {
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   name            = "${var.prefix}-${count.index + 1}.example.com"
   count           = var.i_count
   key_pair_name   = var.key_pair_name
   data_disks      = var.data_disks
   image           = var.image
   network         = var.network
   flavor          = var.flavor
}
```

`variables.tf`
```
variable "i_count" {
  description = "Count"
  type        = number
}

variable "flavor" {
  type        = string
}

variable "prefix" {
  type        = string
}

variable "key_pair_name" {
  type = string
}

variable "image" {
  type = string
}

variable "network" {
  type = string
}

variable "data_disks" {
  type        = map(
    object({
      type      = string
      size      = number
    })
  )
}
```

`providers.tf`
```
terraform {
  required_version = ">= 0.14.0"
    required_providers {
      openstack = {
      source  = "terraform-provider-openstack/openstack"
    }
  }
}
```

And then this code in our `main.tf`:
```
locals {
  instances = {
    "web" = {
      prefix  = "web"
      flavor  = "l2.c2r4.100"
      os      = "centos-7"
      network = "public"
      i_count   = 2
    }
    "db" = {
      prefix  = "db"
      flavor  = "l2.c4r8.100"
      network = "default"
      os      = "ubuntu-20.04"
      data_disks = {
        "db" = {
          size    = 5
          type    = "fast"
        }
      }
    }
  }
}

module my_sf_instances {
   for_each        = local.instances
   source          = "./a-set-of-instances"
   prefix          = each.value.prefix
   i_count         = try(each.value.i_count,1)
   image           = each.value.os
   flavor          = each.value.flavor
   network         = each.value.network
   key_pair_name   = "jb-jump"
   data_disks      = try(each.value.data_disks,{})
}
```

So first we created a module that used our `v2-compute-instance` as the source
with the necessary variable definitions for the values, we intend to override the
defaults for and the `i_count` parameter which defines the count value for each.

Then we call our local module, that now supports an `i_count` parameter, and
iterate over a map that has all the necessary default overrides for each set
**and** the count for each set. So now, instead of copying two identical map
entries and only varying the name, we can generate the name from a prefix and
the count index in the local module; hence, we with one map entry we can create a
set of as many instances we want with the same properties. If we need different
properties, we create another set with its own parameters and `i_count`. The
naming of the `i_count` parameter is chosen so it will not collide with the
internal, reserved `count` parameter.  

So here we have combined methods of examples 2 and 4 to make the same thing as
example 4 but in a more generic way that can scale up sets without
duplicating lots of map entries. To scale up the number of web servers now you
only increase `i_count` field in the map entry for web servers instead of
creating as many new map entries as new servers needed.  

In addition, we have defined another map inside the map entry of the `db`
instance that will create and attach a volume of type `fast` and size 5GB.

The [try][tftry] is used to give the local module the mandatory fallback
parameters when different map entries need to override different sets of
parameters in the `v2_compute_instance`. The local module must have variables
for the sum/union of all parameters to be specified.

[tftry]: https://www.terraform.io/language/functions/try
[coc]: https://www.paloaltonetworks.com/cyberpedia/how-to-break-the-cyber-attack-lifecycle
[diskmap]:https://github.com/safespring-community/terraform-modules/blob/main/examples/v2-compute-instance/main.tf#L17
[newflavors]:https://docs.safespring.com/new/flavors/
[firstblog]:https://www.safespring.com/blogg/2022-01-terraform-modules/
[mbcfengine]:https://www.researchgate.net/publication/243774232_Cfengine_A_site_configuration_engine
[tfdl]:https://www.terraform.io/downloads
[sftfmodules]:https://github.com/safespring-community/terraform-modules
[sftfexamples]:https://github.com/safespring-community/terraform-modules/tree/main/examples
[sshblog]:https://www.safespring.com/blogg/2022-03-ssh-keys/
[netblog]:https://www.safespring.com/blogg/2022-03-network/

[tfdocs]: https://www.terraform.io/docs
[tfreleases]: https://releases.hashicorp.com/terraform/
