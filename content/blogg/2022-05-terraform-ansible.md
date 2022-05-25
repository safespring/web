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
[Ansible][ansible] is a suite of of tools for orchestration an configuration management
mainly by using so called playbooks. Playbooks is written in YAML and describes
desired state for operating system properties like files, services, filesystems
and so on. It is mainly used for configuring Linux based operating systems over the
ssh protocal, however it can also be used for configuring windows operating
systems. In this post we will show how to use Ansible to configure services on
a Linux based operating system (Ubuntu 20.04) 

Ansible inventories are lists of hosts, groups of hosts and variables for those
hosts and groups. Hosts and groups ae used to tell Ansoble where a certain
desired state (task) is applocable.  When working with static hosts in a
datacenter, inventories is often also static textfiles which is maintained
manually or semi-manually.  However, inventories can also be dynamic, i.e.
provided by scripts. 

When working with Openstack it is possible to use inventory scripts that
queries the Openstack API directly and produces a complete inventory of all
instances with metadata all the  group memberships and so on, but often times
these scripts takes a long time to run and they generally need to run every
time you run a plabook, thus making playbook runs orders of magnitude more
timeconsuming than static inventories. Also they can put a heavy load on the
Openstack APIs if the inventory is frequently updated.   

## Terraform and Ansible
It must be "Terrible" then ;-), actually not the terrible at all. 

Terraform keeps it's own account of all objects that it provisons together with
their matadata. This is called "state" and it is stored in the local directory
where Terraform is run by default, in a file called `terraform.tfstate`. The
previous state version is backed up in the file `terraform.tfstate.backup`. 

This means that most things you can query the API for, about your Terraform
provided objects in openstack, will also be present in the local Terraform
state file. Hence, if we use a script that querys the local Terraform state
file we will benefit from very fast performance and no resource consumption in
the Openstack API. This is exactly what we'll showcase here. There is several
scripts/programs available for this purpose (duckduckgo.com is your friend),
but we'll use a simple [python script][ati] orginally developed by Cisco
Systems. 

In order to use it, just copy or symlink the script somewhere convenient and
use the path of it as the `--inventory` option to `ansible-*` commands. If you
put the script in a directory, and use the directory name as `--inventory`, you
can also combine information from dynamic inventory provided by the script with
static inventory files that further enrich or transform the dynamic inventory.
For instance if you use an Ansible role or playbook that require a specific
host group name you can use a static inventory to define a new host group that
you choos the name of and specify a hos group  from the dynamic inventory as
`children` to the group you created, and then use that group with your role or
playbook. We'll look at  that in a later example. 

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
   description = "For exposing web servers on port 443 (https) to the world"
   rules = {
     egress = {
       direction   = "egress"
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
      sgs     = [ module.ingress.name ]
    }
    "web2" = {
      name    = "websrv2.example.com"
      flavor  = "l2.c2r4.100"
      os      = "ubuntu-20.04"
      network = "public"
      role    = "webserver"
      sgs     = [ module.ingress.name ]
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
First we create two instances on the `public` network, from flavor
`l2.c2r4.100` and `ubuntu-20.04` image. Notably we specify `role=webserver`.
When we run `terraform apply` on this, the instances, key pairs and security
groups are created. There is not yet a webserver installed nor configured. That
is what we'll use ansible for.

In order to reuse the role we specified in the Terraform code for instances we
need an inventory script that reads Terraform state file(s) and produce
invontory on a format that ansible can consume. The [Ansible Terraform
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
instances, and their ip-addresses, belonging to the group that has the
`webserver` role, and hence the playbook tasks will be ensured for those hosts.

First of all we wait for the instances to come up. This way we can run the
playbook straight after provisioning (in script for instance) instead of
waiting an unknown number of seconds before the instances is available and
ready to be configured by Ansible over ssh. We set `gather_facts: no` to
prevent playbook failure before instances are available, then we use `setup:`
in it's own task after we waited for instances to be available.  

The two next tasks is for installing the Nginx package, and create an
`index.html` with a welcome message that inserts the hostname of each instance
respectively.


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
