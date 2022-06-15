---
title: "From zero to continuous compliance with Terraform, Ansible and Rudder"
date: "2022-06-15"
intro: "This post concludes the blog series about automated provisioning and configuration of resources in the Safespring platform. It shows how you can get from no resources to a fully automated and continuously compliant infrastructure with code only." 

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
This is part four, and probably the last, in the series about Safespring's
Terraform modules. This blog post will look at how we can build even further on
previously demonstrated concepts to creates sets of servers that is
continuously monitored and kept in compliance using Rudder, a state of the art
configuration management tool 
{{< /ingress >}}

{{% note "Read more" %}}
Here you can read [part one](/blogg/2022-01-terraform-modules), [part two](/blogg/2022-03-terraform-module), [part three](/blogg/2022-05-terraform-ansible) and part four (this post).
{{% /note %}}

## Prerequisites
This blog post assumes that you use the open source Terraform CLI. Terraform CLI
is just a binary program that you download from the [releases page][tfreleases],
for your architecture/platform. Here you also find checksums for the files to
verify their integrity.

Unless otherwise explained, all the examples presuppose that you put the code
in a `.tf` in a separate directory and run `plan`, `init`, `apply` and `destroy`
from within that directory. `main.tf` is mainly used as a convention for the file
name, but you can name it whatever you like as long as it ends in `.tf`.

There is also the official [Terraform documentation][tfdocs].

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
mainly by using so-called playbooks. Playbooks are written in YAML and describe the
desired state for operating system properties like files, services, filesystems
and so on. It is mainly used for configuring Linux-based operating systems over the
ssh protocol, however, it can also be used for configuring windows operating
systems. In this post, we will show how to use Ansible to configure services on
a Linux based operating system (Ubuntu 20.04)

Ansible inventories are lists of hosts, groups of hosts, and variables for those
hosts and groups. Hosts and groups are used to tell Ansible where a certain
desired state (task) is applicable. When working with static hosts in a
data center, inventories are often also static textfiles maintained
manually or semi-manually. However, inventories can also be dynamic, i.e.
provided by scripts.

When working with OpenStack, it is possible to use inventory scripts that
queries the OpenStack API directly and produces a complete inventory of all
instances with metadata, all the  group memberships and so on, but oftentimes
these scripts take a long time to run, and they generally need to run every
time you run a playbook, thus making playbook runs orders of magnitude more
time-consuming than static inventories. Also, they can put a heavy load on the
OpenStack APIs if the inventory is frequently queried.

## Terraform and Ansible
It must be "Terrible" then ;-) ? Actually, it is not terrible at all.

Terraform keeps its own account of all objects it provisions together with
its metadata. This is called "state," and it is stored in the local directory
where Terraform is run by default, in a file called `terraform.tfstate`. The
previous state version is backed up in the file `terraform.tfstate.backup`.

This means that most things you can query the API for, about your Terraform
provided objects in OpenStack will also be present in the local Terraform
state file. Hence, if we use a script that queries the local Terraform state
file we will benefit from the high-speed performance and no resource consumption in
the OpenStack API. This is precisely what we'll showcase here. There is several
scripts/programs available for this purpose (https://duckduckgo.com is your friend),
but we'll use a simple [python script][ati] developed initially by Cisco
Systems.

In order to use it, copy or symlink the script somewhere convenient and
use the path as the `--inventory` option to `ansible-*` commands. If you
put the script in a directory, and use the directory name as `--inventory`, you
can also combine information from the dynamic inventory provided by the script
with static inventory files that further enrich or transform the dynamic
inventory. For instance, if you use an Ansible role or playbook that requires a
specific host group name, you can use a static inventory to define a new host
group that you choose the name of and specify a host group  from the dynamic
inventory as `children` to the group you created, and then use that group with
your role or playbook. We'll look at that in a later example.

## Rudder introduction
[Rudder][rudder] is an open source configuration and security managament tool.
It comes with a multi tenant control plane for managing and monitoring groups
of nodes/agent in a central place. Because Rudder i built on the highly
efficient [Cfengine core][cfcore] it consumes very little resources, is
blazingly fast and scales from a handful of nodes to many thousands.

You can choose to purchase a Rudder subscription support plan from Normation,
the company behind Rudder, in order to get predictability for product
development and maintenance and different support SLAs. Or you can choose to
install and support it yourself by means of the friendly souls at Normation et.
al that provides ready to use software packages, Ansible collection etc. for
the most common platforms.

The leading theme through this blog series is how to glue together existing
technologies to achieve a higher goal, previously, using the Ansible Terraform
Inventory (ATI) script to bridge Terraform and Ansible. This time we'll take it
one step further and use Ansible with ATI together with an [Ansible
collection][rudder-ansible] maintained by Normation for installing Rudder
server and agents and bootstrap those agents to said server.

## Installing and bootstrapping Rudder using Ansible


We'll use the code [examples][sftfexamples] in the Terraform module [git
repo][sftfmodules] as a reference and explain each of them underneath the code.

### Installing a rudder server and bootstrapping agents to that server

Terraform code:
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
     http = {
       direction   = "ingress"
       ip_protocol = "tcp"
       to_port     = "80"
       from_port   = "80"
       ethertype   = "IPv4"
       cidr        = "0.0.0.0/0"
     }
     https = {
       direction   = "ingress"
       ip_protocol = "tcp"
       to_port     = "443"
       from_port   = "443"
       ethertype   = "IPv4"
       cidr        = "0.0.0.0/0"
     }
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
   name            = "rudder-server.example.com"
   image           = "ubuntu-20.04"
   network         = "public"
   security_groups = [ "default", module.interconnect.name, module.ingress.name ]
   role            = "rudder_server"
   key_pair_name   = openstack_compute_keypair_v2.skp.name
}

module my_clients {
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   count           = 2
   name            = "rudder-client-${count.index+1}.example.com"
   image           = "ubuntu-20.04"
   network         = "default"
   security_groups = [ "default", module.interconnect.name, module.ingress.name ]
   role            = "rudder_client"
   key_pair_name   = openstack_compute_keypair_v2.skp.name
}
```

Here we create an instance that will be configured as Rudder server using the
v2-compute-instance module with `role=rudder_server`. Then we create 2 rudder
clients/agents using the v2-compute-instance with `count=2` and
`role=rudder_client` and attach it to the default network. The default network
is a private (RFC1918) network where instances can reach the Internet through
NAT via the compute host, for things like package installs etc. However,
instances on this network can not be reached directly *from* the Internet,
obviously.

We create two security groups: one «interconnect» security group where all
members in it have full connectivity to each other, and one ingress security
group that allows incoming (ingress) connections on ports `80/tcp` (http),
`443/tcp` (https) and `22/tcp` (ssh) from the world. All instances is member of
the interconnect security group so agents can talk freely with the server, and
the server is also member of the ingress security group so that it can be
reachable as a management host both by means of the Rudder web gui, and API,
but also as a bastion host for logging in with ssh and jump further to the
clients wich is provisioned on a RFC1918 network not directly reachable from
the Internet. Lastly, we include the pre existing `default` security group to
allow outbound (egress) traffic from all instances.

{{% note "Safespring network" %}}
None of the instances have more than one interface. This is intentional. If you don't know why, then please read the post on [The Safespring network model][netblog]
{{% /note %}}

[rudder-ansible]: https://github.com/Normation/rudder-ansible
[cfcore]: https://github.com/cfengine/core
[rudder]: https://www.rudder.io/
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
