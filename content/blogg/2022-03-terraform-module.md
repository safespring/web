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
blog post, we'll look at the new and more general Safespring module for compute
instances, how it can be used to provision sets of instances in different
configurations. The next post will be about how Ansible can be used together
with inventory from terraform/openstack to configure services on the provisioned
instances.{{< /ingress >}}

## The new «v2-compute-instance» module
In [the previous blog post][firstblog] we showcased basic usage of the initial
version of the Safespring Terraform modules. These modules is now deprecated and
are replaced by a single module that does more than the deprecated ones. The
reason for this is that the new module automatically switches usage of «boot
from volume» on and off based on whether the flavor name starts with an «l» or
not. The new module also defaults to use [our new compute flavors][newflavors],
while the deprecated ones defaults to the old deprecated flavors.  Last but not
least, the new module can [receive a map variable describing a set of addtional
data disks to be attached to the instance][diskmap].

Note: The module library is constantly evolving so this blog post explain the
features currently available and how to use them. Please also look at the code,
comments and variable definitions to get the full picture. Especially at a later
point in time. 

## Examples
We'll use the code [examples][sftfexamples] in the Terraform module [git
repo][sftfmodules] as reference and explain each of them underneath the code.

### One instance with default paramters

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
This is the simplest possible example using only the module source on github and
a pre-existing keypair. All other values are default. The commented lines
document the contents of the default values. To override default just uncomment
and change the value. 

When applied, this code will create a compute instance with name
hello-safespring, operating system ubuntu 20.04, from a flavor with local disk,
2 VCPUS and 4 GB of RAM. It will be attached to the default network which give
the instance a public IPv6 address and a private IPv4 address. 
The instance will have no data disks and will be member of the default security
group which will contain rules that allow traffic from the instance egress to
the world on IPv4 and IPv6. Since the flavor is of type local disk, the
disk_size parameter will be ignored and the local NVMe disk that is defined in
the flavor (100GB) will be used  for the Ubuntu operating system.

The `config_drive` parameter is rarely used. If you don't know what it is used for you can safely leave the default (false). The `role` and `wg_ip` parameters we'll leave the explanation for until later. 

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
example, default values will be used where none is given, so all 3 instance will
have the same properties as in the first example. 

### Security group(s) and keypair as part of the code

Code:
```
# This is needed when creating resources directly. When using modules the modules will have this included.
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
`puff`. Those names are used to name the objects within openstack. There is also
the Terraform internal names which is used only for referencing back and forth
inside the Terraform code/state. The latter is used to reference the names of
the keypair and security group in the definition of the instances.

The result of this config will be the same 3 instances as in the previous
example except they wont be member of the default security group, but rather the
`puff` security group that we created with ingress rules for `ssh`and `https`.

Also we have created our own keypair (public key) that our instances will get in
their cloud-users' `authorized_keys`-file. This code takes the local (where
Terraform is run) `~/.ssh/id_rsa.pub` file and create an openstack keypair for
it. For details about ssh-keys in Openstack, please head over to [another blog
post regarding that][sshblog]

Note: In this config we have mixed the creation of resources directly in the
config and via external modules. This is fine, sometimes the resources is so
simple tht it doesn't make sense to create an abstraction (moduel) for it. The
openstack keypairs is a good example of such a resource.

It is totally up to you if you want to make use of our module library, create
your own modules or just create the resources directly in your config. At least
the module library, with its default values, can serve as a documentation or
thin wrapper around the resources and names in our platform as seen from a
Terraform perspective.

### A set of instances using a map


[diskmap]: https://github.com/safespring-community/terraform-modules/blob/main/examples/v2-compute-instance/main.tf#L15
[newflavors]: https://docs.safespring.com/new/flavors/
[firstblog]: https://www.safespring.com/blogg/2022-01-terraform-modules/
[mbcfengine]: https://www.researchgate.net/publication/243774232_Cfengine_A_site_configuration_engine
[tfdl]: https://www.terraform.io/downloads
[sftfmodules]: https://github.com/safespring-community/terraform-modules
[sftfexamples]: https://github.com/safespring-community/terraform-modules/tree/main/examples
[sshblog]: https://www.safespring.com/blogg/2022-03-ssh-keys/