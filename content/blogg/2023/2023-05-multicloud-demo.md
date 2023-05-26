---
title: "Demonstrating a minimal multi-cloud demo using Terraform and Ansible to program Openstack and DNS"
date: "2022-08-22"
intro: "This post shows infrastructure as code (IAC)that enables zero to infininate scaling of a minimal web application using multiple Openstack sites and DNS round robin (RR)for loadbalancing by means of Terraform and Ansible"
draft: true
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Tech update"
language: "En"
toc: "Table of contents"
---

{{< author-jarle >}}

{{< ingress >}}
In previous posts we have shown the power of combining Terraform for
infrastructure provisioning and Ansible for configuring operating systems on
the instances in the infrastructure. In this blog post we take it one step
further and will show a minimal example on how to scale up web service back
ends across multiple sites and use an API programmable DNS servcie (Gandi) to
maintain A records for those backends, effectively scaling the service by means
of DNS round robin (RR). This is the simplest possible approach for such an
implentation, however, this can be exanded on by replacing the simple DNS RR
with a service discovery mechanism (like Consul for instance) to enable more
dynamic behaviors and even health checks ensuring that only healthy service are
used as backends.
{{< /ingress >}}

## Prerequisites
1. This blog post assumes that you use the open source Terraform CLI. Terraform CLI
is just a binary program that you download from the [releases page][tfreleases],
for your architecture/platform. Here you also find checksums for the files to
verify their integrity. There is also the official [Terraform documentation][tfdocs].
1. A basic understanding of Ansible playbooks and inventories is also necessary.
1. Some basic usage of the [OpenStack CLI][osclidoc] will also be required.
1. A basic understanding of DNS and round robin (RR) behavior.
1. The blog post about [Safespring community terraform modules][tfmodulesblog]

## TL;DR
<div style="margin-bottom:50px;"></div>

<script data-autoplay="true" data-loop="true" data-speed="2" async id="asciicast-kCn38aGPomo6FvSCjqCDAukoM" src="https://asciinema.org/a/kCn38aGPomo6FvSCjqCDAukoM.js"></script>

Keep reading if further explanation is needed.

## Using multiple clouds from the same Terraform code and state

Terraform has a handy feature that let us configure multiple instances of the
same type of provider and use aliases to differentiate which one will be used
when declaring desired state for resources.

In our case this code does that:
```hcl
provider "openstack" {
  alias               = "sto1-sandbox"
  cloud = "safespring-sto1"
}

provider "openstack" {
  alias = "psnc-dcw"
  cloud = "psnc-dcw"
  region = "DCW"
}
```

Here we define two declarations of the Terraform Openstack provider that points
to different entries in our `clouds.yaml` file and can will be referred to by
their `alias`.

We also need to declare which versions of providers we need for all providers
that is used in the code. Like this:

```hcl
terraform {
  required_providers {
    openstack = {
      source = "terraform-provider-openstack/openstack"
      configuration_aliases = [ openstack.sto1-sandbox, openstack.psnc-dcw]
    }
    gandi = {
      version = "~> 2.1.0"
      source   = "go-gandi/gandi"
    }
  }
  required_version = ">= 0.14"
}

```
Note also that the aliases of the Openstack provider instances need to be
declared in the `configuration_aliases` field.

## Web back end instances in cloud number one

We start by declaring Terraform desired state for instances in the sto1
Safespring datacenter, like this:

```hcl
resource "openstack_compute_keypair_v2" "sto1kp" {
  name       = "mc-sto1-pubkey"
  public_key = chomp(file("~/.ssh/id_rsa_jump.pub"))
  provider   = openstack.sto1-sandbox
}

module "sto1_http_backend_sg" {
  providers = {
    openstack = openstack.sto1-sandbox
  }
  source      = "github.com/safespring-community/terraform-modules/v2-compute-security-group"
  name        = "http_back_end"
  description = "Opening ports for http backends"
  rules = {
    one = {
      ip_protocol = "tcp"
      to_port     = "22"
      from_port   = "22"
      ethertype   = "IPv4"
      cidr        = "0.0.0.0/0"
    }
    two = {
      ip_protocol = "tcp"
      to_port     = "443"
      from_port   = "443"
      ethertype   = "IPv4"
      cidr        = "0.0.0.0/0"
    }
    three = {
      ip_protocol = "tcp"
      to_port     = "80"
      from_port   = "80"
      ethertype   = "IPv4"
      cidr        = "0.0.0.0/0"
    }
  }
}

module "sto1_instances" {
  providers = {
    openstack = openstack.sto1-sandbox
  }
  source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
  name            = "mc-safespring-sto1-${count.index + 1}.saft.in"
  role            = "http_backend"
  count           = var.count_safespring
  network         = "public"
  security_groups = [module.sto1_http_backend_sg.name]
  key_pair_name   = openstack_compute_keypair_v2.sto1kp.name
}
```

We simply use the Safespring provided Terraform modules directly from Github
(the `source` field) to easily declare both the necessary security groups (for
opening the ports for ssh, http and https respectively) and using count with
prefix to declare a set of instances where the number and name is controlled by
the variable `var.count_safespring`. The variable is defined in the
`variables.tf` file with a default value of `1`, like this:

```hcl
variable "count_safespring" {
  description = "Instance count Safespring"
  type        = number
  default     = 1
}
```

There is also a resource declaration for the [poorly named][sshblog] `ssh keypair` which
in fact just sucks up your ssh public key file and stores it in Openstack for
later use by the instance module. (`key_pair_name   =
openstack_compute_keypair_v2.sto1kp.name`)

But the most interesting part is the `provider` and the `providers` parameters
for the keypair resource and the modules respectively. Here we reference the
provider by the previously mentioned alias `openstack.sto1-sandbox`. Hence,
the declared resources will be provisioned using **that** cloud provider,
which maps back to the `sandbox` project in the `sto1` Safespring site.

To summarize: applying only this code will create the keypair (pubkey), the
security group with rules and one instance in the `sandbox` openstack project
in the `sto1` Safespring site.

## About the connection between Terraform and Ansible

Terraform keeps its own account of all objects it provisions together with
it's metadata. This is called "state," and it is stored in the local directory
where Terraform is run by default, in a file called `terraform.tfstate`. The
previous state version is backed up in the file `terraform.tfstate.backup`.

This means that most things you can query the API for, about your Terraform
provided objects in OpenStack will also be present in the local Terraform
state file. Hence, if we use a script that queries the local Terraform state
file we will benefit from the high-speed performance and no resource consumption in
the OpenStack API. This is precisely what [Ansible Terraform Inventory
(ATI)][ati].

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


[tfmodulesblog]: https://www.safespring.com/blogg/2022/2022-03-terraform-module/
[ati]: https://github.com/safespring-community/utilities/blob/main/ati/terraform.py
[ksparams]: https://github.com/kubernetes-sigs/kubespray/blob/master/docs/vars.md
[kubespray]: https://github.com/kubernetes-sigs/kubespray
[sftfmodules]:https://github.com/safespring-community/terraform-modules
[sftfexamples]:https://github.com/safespring-community/terraform-modules/tree/main/examples
[sshblog]:https://www.safespring.com/blogg/2022-03-ssh-keys/
[netblog]:https://www.safespring.com/blogg/2022-03-network/
[tfdocs]:https://www.terraform.io/docs
[tfreleases]:https://releases.hashicorp.com/terraform/
[osclidoc]:https://docs.safespring.com/new/api/
[appcred]: https://docs.safespring.com/new/app-creds/
