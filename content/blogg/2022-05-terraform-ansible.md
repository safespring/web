---
title: "Integrating Terraform and Ansible"
date: "2022-05-23"
intro: "From zero to service using Terraform and Ansible together"
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
This is part three in the series about Safespring's Terraform modules. This blog
post will look at how we can integrate Ansible and Terraform in order to configure
services on top of the instances provisioned with Terraform, using Terraform state as
ansible inventory.
{{< /ingress >}}

{{% note "Read more" %}}
Here you can read [part one](/blogg/2022-01-terraform-modules), [part two](/blogg/2022-03-terraform-module) and part three (this post).
{{% /note %}}

## Prerequisites
This blog post assumes that you use the open source Terraform CLI. Terraform CLI
is just a binary program that you download from the [releases page][tfreleases],
for your architecture/platform. Here you also find checksums for the files to
verify their integrity.  

Unless otherwise explained, all the examples presuppose that you put the code
in a `.tf` in a separate directory and run `plan`, `init`, `apply` and `destroy`
from within that directory. `main.tf` is mainly used as a convention for the file
name, but you can name it whatever you like as long as it ends in `.tf`

There is also the official [Terraform documentation][tfdocs]

A basic understanding of Ansible playbooks and inventories is also necessary.

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

Terraform is cloud-agnostic and thus is excellent insurance that your resources
are as portable as possible, thus reducing the level of "lock-in" to a minimum.

{{< disclaimer "Disclaimer" >}}Terraform is a powerful tool, and powerful tools can make
powerful failures if misused, so be sure to read up on documentation
and best practices to understand the nature of the tool before using it for
the important stuff.{{< /disclaimer >}}

## Ansible introduction
[Ansible][ansible] is a suite of tools for orchestration and configuration management
mainly by using so-called playbooks. Playbooks are written in YAML and describes the
desired state for operating system properties like files, services, filesystems
and so on. It is mainly used for configuring Linux-based operating systems over the
ssh protocol, however, it can also be used for configuring windows operating
systems. In this post, we will show how to use Ansible to configure services on
a Linux based operating system (Ubuntu 20.04)

Ansible inventories are lists of hosts, groups of hosts, and variables for those
hosts and groups. Hosts and groups are used to tell Ansible where a certain
desired state (task) is applicable. When working with static hosts in a
data center, inventories are often also static textfiles which is maintained
manually or semi-manually. However, inventories can also be dynamic, i.e.
provided by scripts.

When working with OpenStack, it is possible to use inventory scripts that
queries the OpenStack API directly and produces a complete inventory of all
instances with metadata all the  group memberships and so on, but oftentimes
these scripts take a long time to run, and they generally need to run every
time you run a playbook, thus making playbook runs orders of magnitude more
timeconsuming than static inventories. Also, they can put a heavy load on the
OpenStack APIs if the inventory is frequently updated.   

## Terraform and Ansible
It must be "Terrible" then ;-) ? Actually, it is not terrible at all.

Terraform keeps its own account of all objects it provisions together with
its metadata. This is called "state," and it is stored in the local directory
where Terraform is run by default, in a file called `terraform.tfstate`. The
previous state version is backed up in the file `terraform.tfstate.backup`.

This means that most things you can query the API for about your Terraform
provided objects in OpenStack will also be present in the local Terraform
state file. Hence, if we use a script that queries the local Terraform state
file we will benefit from the high-speed performance and no resource consumption in
the OpenStack API. This is precisely what we'll showcase here. There is several
scripts/programs available for this purpose (duckduckgo.com is your friend),
but we'll use a simple [python script][ati] developed initially by Cisco
Systems.

In order to use it, just copy or symlink the script somewhere convenient and
use the path as the `--inventory` option to `ansible-*` commands. If you
put the script in a directory, and use the directory name as `--inventory`, you
can also combine information from the dynamic inventory provided by the script
with static inventory files that further enrich or transform the dynamic
inventory. For instance, if you use an Ansible role or playbook that requires a
specific host group name, you can use a static inventory to define a new host
group that you choose the name of and specify a hos group  from the dynamic
inventory as `children` to the group you created, and then use that group with
your role or playbook. We'll look at that in a later example.

## Examples
We'll use the code [examples][sftfexamples] in the Terraform module [git
repo][sftfmodules] as a reference and explain each of them underneath the code.

### Two webservers using Nginx

```
terraform {
  required_version = ">= 0.14.0"
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
    }
  }
}

resource "openstack_compute_keypair_v2" "skp" {
  name       = "hello-pubkey"
  public_key = "${chomp(file("~/.ssh/id_rsa.pub"))}"
}

module ingress {
   source = "github.com/safespring-community/terraform-modules/v2-compute-security-group"
   name = "ingress"
   delete_default_rules = true
   description = "For exposing web servers on port 80 (http) to the world"
   rules = {
     ssh = {
       direction   = "ingress"
       ip_protocol = "tcp"
       to_port     = "22"
       from_port   = "22"
       ethertype   = "IPv4"
       cidr        = "0.0.0.0/0"
     }
     http = {
       direction   = "ingress"
       ip_protocol = "tcp"
       to_port     = "80"
       from_port   = "80"
       ethertype   = "IPv4"
       cidr        = "0.0.0.0/0"
     }
  }
}

locals {
  instances = {
    "web1" = {
      name    = "websrv1.example.com"
      flavor  = "l2.c2r4.100"
      os      = "ubuntu-20.04"
      network = "public"
      role    = "webserver"
      sgs     = [ "default", module.ingress.name ]
    }
    "web2" = {
      name    = "websrv2.example.com"
      flavor  = "l2.c2r4.100"
      os      = "ubuntu-20.04"
      network = "public"
      role    = "webserver"
      sgs     = [ "default", module.ingress.name ]
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
   role            = each.value.role
   key_pair_name   = openstack_compute_keypair_v2.skp.name
}
```
First, we create two instances on the `public` network, from flavor
`l2.c2r4.100` and the `ubuntu-20.04` image. Notably, we specify `role=webserver`.
When we run `terraform apply` on this, the instances, key pairs, and security
groups are created. There is not yet a webserver installed nor configured. That
is what we'll use Ansible for.

In order to reuse the role we specified in the Terraform code for instances, we
need an inventory script that reads Terraform state file(s) and produces
an inventory in a format that Ansible can consume. The [Ansible Terraform
Inventory script][ati] will be used for this purpose. We copy the script to a
directory named `ati` and run this playbook.

```
ansible-playbook -i ati example.yml
```

The contents of `example.yml`
```
- hosts: os_metadata_role=webserver
  gather_facts: no
  become: true
  tasks:
    - name: Wait 600 seconds for target connection to become reachable/usable
      wait_for_connection:

    - name: gather facts
      setup:

    - name: Make sure nginx is installed
      apt:
        update_cache: yes
        name: "nginx"
        state: present

    - name: An example index.html file
      copy:
        dest: "/var/www/html/index.html"
        content: "<html><h1>Welcome to {{ansible_hostname}}</h1></html>"
```

Notice `hosts: os_metadata_role=webserver`. This is where we call upon the role
we specified in the Terraform code. The inventory script will find the correct
instances, and their IP-addresses, belonging to the group that has the
`webserver` role, and hence the playbook tasks will be ensured for those hosts.

First of all, we wait for the instances to come up. This way, we can run the
playbook straight after provisioning (in a script, for instance) instead of
waiting an unknown number of seconds before the instances are available and
ready to be configured by Ansible over ssh. We set `gather_facts: no` to
prevent playbook failure before instances are available, then we use `setup:`
in its own task after we waited for instances to be available.  

The two following tasks are to install the Nginx package and to create an
`index.html` with a welcome message that inserts the hostname of each instance
respectively.

### A set of Wireguard clients using an exit gateway

In this example, we show how to combine static and dynamic inventory to bridge
group names expected by an Ansible role with group names provided by the
OpenStack metadata role in the Terraform state.

The practical upshot of the example is also to show an automated setup of
Wireguard on a set of clients to route their traffic through a gateway.
This can be useful if clients need to access an external service with a
stable source address, for example, if that external service uses IP-based ACLs.

```
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

module interconnect {
   source = "github.com/safespring-community/terraform-modules/v2-compute-security-group"
   name = "interconnect"
   delete_default_rules = true
   description = "For interconnecting servers with full network access between members"
   rules = {
     ingress = {
       direction       = "ingress"
       remote_group_id = "self"
     }
     egress = {
       direction       = "egress"
       remote_group_id = "self"
     }
  }
}

module ingress {
   source = "github.com/safespring-community/terraform-modules/v2-compute-security-group"
   name = "ingress"
   delete_default_rules = true
   description = "For for ssh access from the world, and egress from nodes"
   rules = {
     ssh = {
       direction   = "ingress"
       ip_protocol = "tcp"
       to_port     = "22"
       from_port   = "22"
       ethertype   = "IPv4"
       cidr        = "0.0.0.0/0"
     }
  }
}

module my_gw {
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   name            = "wireguard-gw.example.com"
   image           = "ubuntu-20.04"
   network         = "public"
   security_groups = [ "default", module.interconnect.name, module.ingress.name ]
   role            = "wg_gw"
   wg_ip           = "192.168.45.1"
   key_pair_name   = openstack_compute_keypair_v2.skp.name
}

module my_clients {
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   count           = 2
   name            = "wireguard-client-${count.index+1}.example.com"
   image           = "ubuntu-20.04"
   network         = "public"
   security_groups = [ "default", module.interconnect.name, module.ingress.name ]
   role            = "wg_client"
   wg_ip           = cidrhost("192.168.45.0/24",count.index + 2)
   key_pair_name   = openstack_compute_keypair_v2.skp.name
}
```
Here we declare a key pair (public key), two security groups, a Wireguard
gateway instance, and a set of 2 Wireguard client instances. The `ingress`
security group allows access from the world on IPv4 to port 22/tcp (ssh), the
`interconnect` security group ensures full IPv4 connectivity between all member
instances of the group. Both the gateway instance and the set of client
instances are included in both those security groups, also they are included in
the pre-existing default security group to allow egress traffic to the world.

We also added a new parameter to the Safespring compute instance module, namely
the `wg_ip` parameter. The purpose of this parameter is to allocate the
Wireguard overlay IP plan as metadata when creating the instances. Later, we'll
see how this metadata can be found and reused as variables inside the Ansible
inventory, thus avoiding any manual config specification.

We assign the Wireguard IP address of the gateway instance to the first address
in the range `192.168.45.0/24`, and then we assign the client's addresses to
the second, third, and so on by utilizing the function
`cidrhost("192.168.45.0/24",count.index + 2)`. The count index starts on 0 and
docs for the Terraform `cidrhost()` function can be found in the [Terraform
docs][tfdocs]

And now over to Ansible. We created an inventory directory with the following contents:
```
$ ls -l inventory
total 4
-rw-rw-r-- 1 jarle jarle 241 May 25 13:36 hosts
lrwxrwxrwx 1 jarle jarle  22 May 25 13:32 _terraform.py -> ../../ati/terraform.py
```

The file `_terraform.py` is a symlink to the dynamic inventory script. The
reason it starts with an underscore is that the stuff that is defined in the
static inventory (the `hosts ` file) refers to stuff produced by the dynamic
inventory. Files in the inventory directory are processed in alphabetical order,
thus the dynamic inventory must be processed before the static inventory
otherwise, the referenced child groups in the  static inventory do
not yet exists when it is processed.

The content of the `hosts` file:
```
[wireguard_gateway]
[wireguard_gateway:children]
os_metadata_role=wg_gw

[wireguard_gateway:vars]
wireguard_forward_interface=ens3
wireguard_connect_interface=ens3

[wireguard_clients]
[wireguard_clients:children]
os_metadata_role=wg_client
```

So here we define the host groups that the Wireguard role expects, namely
`wireguard_gateway` and `wireguard_clients` and populate them with the children
from the respective groups from the dynamic inventory, namely
`os_metadata_role=wg_gw` and `os_metadata_role=wg_client`.
Also we define the static variables `wireguard_forward_interface` and
`wireguard_connect_interface`

The playbook looks like this:
```
- hosts: wireguard_gateway
  become: yes
  remote_user: ubuntu
  vars:
    wireguard_address: "{{metadata.wg_ip}}"
  tasks:
    - include_role:
        name: ansible-role-wireguard

- hosts: wireguard_clients
  become: yes
  remote_user: ubuntu
  vars:
    wireguard_address: "{{metadata.wg_ip}}"
  tasks:
    - include_role:
        name: ansible-role-wireguard
```


First, we run a play applying the Wireguard role to the Wireguard gateway and
then we run another play applying the same role to Wireguard clients. This is
because the clients require information that was created by the play for the
gateway. The population of the host variable `wireguard_address` is expected by the
role from the value of `{{metadata.wg_ip}}` which comes from the dynamic
inventory script and points back at the `wg_ip` that was defined in Terraform.

Then we run the playbook with the mixed static and dynamic inventory:

```
ansible-playbook -i inventory wg.yml
```

This will install Wireguard and configure clients to route all traffic via the
Wireguard gateway over the Wireguard encrypted overlay network. Like so:

```
$ openstack server list |grep wire
| 666bc025-3c86-4bc8-9278-66600a49f522 | wireguard-client-2.example.com | ACTIVE | public=185.189.29.84, 2a0a:bcc0:40::40c  | ubuntu-20.04                   | l2.c2r4.100 |
| 9c260891-954b-418c-9be5-aff2b8482164 | wireguard-gw.example.com       | ACTIVE | public=185.189.28.40, 2a0a:bcc0:40::d3   | ubuntu-20.04                   | l2.c2r4.100 |
| f3f361c3-19f8-45dd-887e-ca2dd7fa98f2 | wireguard-client-1.example.com | ACTIVE | public=185.189.29.118, 2a0a:bcc0:40::326 | ubuntu-20.04                   | l2.c2r4.100 |
```

The IP-address of the gateway is `185.189.28.40`. If we log in to the clients
and ask what is our source-address as perceived from the Internet.
```
$ ssh ubuntu@185.189.29.84
(..)
$ curl ifconfig.me
185.189.28.40
$ ssh ubuntu@185.189.29.118
(..)
$ curl ifconfig.me
185.189.28.40
```

Voila!


[ati]: https://github.com/safespring-community/utilities/blob/main/ati/terraform.py
[ansible]: https://github.com/ansible/ansible
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
