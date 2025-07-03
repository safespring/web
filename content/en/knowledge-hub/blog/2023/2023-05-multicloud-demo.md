---
title: "Creating a multi-cloud web service from scratch"
date: "2023-06-07"
intro: "Infrastructure as code that enables zero to infinate scaling using multiple OpenStack sites."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Tech update"
author: "Jarle Bjørgeengen"
language: "en"
toc: "Table of contents"
aliases:
  - /blogg/2023/2023-05-multicloud-demo/
---

{{< ingress >}}
Explore the power of infrastructure as code (IAC) with this guide on
creating a scalable web application using multiple OpenStack sites.
Learn how to utilize Terraform for infrastructure provisioning, Ansible
for system configuration, and how these tools, in combination with DNS
round-robin, can offer a dynamic and scalable solution for your web services.
{{< /ingress >}}

In previous posts, we have shown the power of combining Terraform for
infrastructure provisioning and Ansible for configuring operating systems on
the instances in the infrastructure. In this blog post, we take it one step
further. We will show a minimal example of how to scale up web service backends
across multiple sites and use an API programmable DNS servcie (Gandi) to
maintain A records for those backends, effectively scaling the service by means
of DNS round-robin (RR).

This is the simplest possible approach for such an
implementation, however, this can be expanded by replacing the simple DNS RR
with a service discovery mechanism (like Consul for instance) to enable more
dynamic behaviors and even health checks ensuring that only healthy service are
used as backends. The same methodology can of course be used to provision and
scale Kubernetes clusters, thus enabling horizontal scaling, continous
delivery, and all the Cloud native bells and whistles you want to deliver
microservices and applications that scale horizontally; in fact this is exactly
what our partner Elastisys does.

## Prerequisites

This blog post assumes you use the open source Terraform CLI. Terraform CLI
is just a binary program that you download from the [releases page][tfreleases],
for your architecture/platform. Here you also find checksums for the files to
verify their integrity. There is also the official [Terraform documentation][tfdocs].

- A basic understanding of Ansible playbooks and inventories is also necessary.
- Some basic usage of the [OpenStack CLI][osclidoc] will also be required.
- A basic understanding of DNS and round-robin (RR) behavior.
- The blog post about [Safespring community terraform modules][tfmodulesblog]

## Overview

The following animated drawing shows the concept of the demonstration. Click in
the drawing to cycle through the screens.

1. No infra, DNS or services exist yet.
2. One back-end service exists in the Safespring sto1 sandbox project.
3. One instance is added to another European cloud site, yielding one back-end service in each site.
4. A records pointing towards the IP addresses of the instances across sites is added.
5. Scaling up the service with `count` parameters.
6. Scaling even further (not part of the demo).
7. Automated scaling using feedback based on service response times (not part of the demo).

<iframe src="/img/eosc-multicloud-demo.sozi.html"  width="100%" height="500" style="border:0"></iframe>

## TL;DR

<div style="margin-bottom:50px;"></div>

<script data-autoplay="true" data-loop="true" data-speed="2" async id="asciicast-kCn38aGPomo6FvSCjqCDAukoM" src="https://asciinema.org/a/kCn38aGPomo6FvSCjqCDAukoM.js"></script>

## Start scale up web service backends

All the files in the demo is available on [the Safespring community Github
repository][mcdemo]. Keep reading to understand what happens in further detail.

### Using multiple clouds from the same Terraform code and state

Terraform has a handy feature that let us configure multiple instances of the
the same type of provider and use aliases to differentiate which one will be used
when declaring the desired state for resources.

In our case, this code does that:

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

Here we define two declarations of the Terraform OpenStack provider that points
to different entries in our `clouds.yaml` file and can will be referred to by
their `alias`.

We also need to declare which versions of providers we need for all providers
that are used in the code. Like this:

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

Note also that the aliases of the OpenStack provider instances need to be
declared in the `configuration_aliases` field.

### Web back end instances in cloud number one (Safespring sto1)

We start by declaring Terraform desired state for instances in the sto1
Safespring datacenter, like this (`safespring.tf`):

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

We simply use the Safespring-provided Terraform modules directly from Github
(the `source` field) to easily declare both the necessary security groups (for
opening the ports for ssh, http, and https respectively) and using count with
a prefix to declare a set of instances where the number and name are controlled
by the variable `var.count_safespring`. The variable is defined in the
`variables.tf` file with a default value of `1`, like this:

```hcl
variable "count_safespring" {
  description = "Instance count Safespring"
  type        = number
  default     = 1
}
```

There is also a resource declaration for the [poorly named][sshblog] `ssh
keypair`, which in fact just sucks up your ssh public key file and stores it in
OpenStack for later use by the instance module. (`key_pair_name   =
openstack_compute_keypair_v2.sto1kp.name`)

But the most interesting part is the `provider` and the `providers` parameters
for the keypair resource and the modules respectively. Here we reference the
provider by the previously mentioned alias `openstack.sto1-sandbox`. Hence,
the declared resources will be provisioned using **that** cloud provider,
which maps back to the `sandbox` project in the `sto1` Safespring site.

To summarize: applying only this code will create the keypair (pubkey), the
security group with rules and one instance in the `sandbox` OpenStack project
in the `sto1` Safespring site.

### About the connection between Terraform and Ansible

Terraform keeps its own account of all objects it provisions together with its
metadata. This is called "state," and it is stored in the local directory where
Terraform is run by default, in a file called `terraform.tfstate`. The previous
state version is backed up in the file `terraform.tfstate.backup`.

This means that most things you can query the API for, about your Terraform
provided objects in OpenStack will also be present in the local Terraform state
file. Hence, if we use a script that queries the local Terraform state file we
will benefit from the high-speed performance and no resource consumption in the
OpenStack API. This is precisely what [Ansible Terraform Inventory (ATI)][ati].

To use it, copy or symlink the script somewhere convenient and use the
path as the `--inventory` option to `ansible-*` commands.

When used as inventory for Ansible, the script will produce host groups from
the OpenStack metadata for instances, so that a set of instances having certain
metadata is seen as an Ansible inventory host group. To simplify and
standardize this concept, the Safespring module for creating instances includes
the `role` parameter. In the next chapter, you'll see how the role parameter can
be picked up and used as a host group to configure services on a set of
instances with an Ansible playbook.

### Configuring the web service on back end instances in Safespring

We configure a minimal back end http service using an Ansible playbook like
this (`configure.yaml`):

```yaml
- name: Configure back ends
  hosts: os_metadata_role=http_backend
  become: yes
  tasks:
    - name: wait for nodes to come up
      wait_for_connection:
        timeout: 900
    - name: Install nginx
      apt:
        update_cache: yes
        name: nginx
        state: present
    - name: An example index.html file
      copy:
        dest: "/var/www/html/index.html"
        content: "<html><h1>Welcome to {{ansible_hostname}}</h1></html>"
```

First, we wait for instances to be available. Then we install Nginx, a minimal web
server, and template a minimal html home page that returns a greeting together
with the hostname of the instance the service runs on.

Note the `hosts:` field that tells Ansible where to run the tasks that follow.
This is where the connection happens between what we specified as a `role` in the
desired state (Terraform) for the instance provisioning and the host group we
want to configure in the Ansible playbook.

So we now run the playbook like this:

```shell
$ ansible-playbook -i ati configure.yaml
[WARNING]: Invalid characters were found in group names but not replaced, use -vvvv to see details

PLAY [Configure back ends] ********************************************************************************************************

TASK [Gathering Facts] ************************************************************************************************************
ok: [mc-safespring-sto1-1.saft.in]

TASK [wait for nodes to come up] **************************************************************************************************
ok: [mc-safespring-sto1-1.saft.in]

TASK [Install nginx] **************************************************************************************************************
changed: [mc-safespring-sto1-1.saft.in]

TASK [An example index.html file] *************************************************************************************************
changed: [mc-safespring-sto1-1.saft.in]

PLAY RECAP ************************************************************************************************************************
mc-safespring-sto1-1.saft.in : ok=4    changed=2    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
```

What happens is this:

- The Terraform module takes the `role` parameter and creates a metadata record
  with the key `role` and the value `http_backend` in the underlying OpenStack
  Terraform provider.
- Since the metadata is part of the state for what Terraform creates in
  OpenStack. This information also is present in the Terraform state file
  (`terraform.tfstate`) which the inventory script reads.
- Through the inventory script Ansible finds the group called
  `os_metadata_role=http_backend` in the inventory, and executes the tasks on
  the hosts in that group.

So, now we have a set of one instance (mc-safespring-sto1-1.saft.in ) in the
`sto1` site (sandbox project), with an ssh-pubkey that allows access to the
operating system as root (via `sudo`), a security_group with rules that allows
incoming traffic on ports 80 (HTTP), 443 (HTTPS) and 22 (SSH). Furthermore we
used that ssh access (key and port) with Ansible together with inventory
obtained from the Ansible Terraform Inventory Python script to configure a
web service (Nginx) that serves a minimal greeting that includes the instance'
hostname (mc-safespring-sto1-1.saft.in) over HTTP on port 80.

### Configuring new back ends in a different cloud

In Poland, we work together with another European Cloud providor. They also provide an OpenStack-based IaaS, however with a slightly
different setup with regard to the network stack in the OpenStack platform.

In our demo, we'll show that the Safespring community Terraform modules also can
be used to provision instances on the other European Cloud providor's OpenStack IaaS with only a few
additional lines of Terraform code for allocating and attaching floating IP
addresses to instances. If we were to use another Safespring site as the second
(or even more) OpenStack IaaS, only the variation of providers and aliases
would be necessary.

The code for ssh-key, security group with rules and instance is in fact
identical except for using a different provider alias which points to the other European Cloud providor's
OpenStack cloud entry in the local `clouds.yaml` file, like this:

```hcl
resource "openstack_compute_keypair_v2" "psncdcwkp" {
  name       = "mc-psnc-bst-pubkey"
  public_key = chomp(file("~/.ssh/id_ecdsa.pub"))
  provider   = openstack.psnc-dcw
}

module "psnc_dcw_http_backend_sg" {
  providers = {
    openstack = openstack.psnc-dcw
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
    four = {
      ip_protocol = "icmp"
      ethertype   = "IPv4"
      cidr        = "0.0.0.0/0"
    }
  }
}

module "psnc_dcw_instances" {
  providers = {
    openstack = openstack.psnc-dcw
  }
  source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
  name            = "mc-psnc-dcw-${count.index + 1}.saft.in"
  role            = "http_backend"
  count           = var.count_psnc
  disk_size       = 30
  network         = "jbnet"
  flavor          = "s.2VCPU_4GB"
  image           = "Ubuntu Server 22.04 LTS Cloud Image"
  security_groups = [module.psnc_dcw_http_backend_sg.name]
  key_pair_name   = openstack_compute_keypair_v2.psncdcwkp.name
}
```

Note, that the `image` and `flavor` parameters need to be specified since the
built-in defaults for the Safespring modules specifies Safespring sepcific
image and flavor. And similarly, as with Safespring, the default instance count
in the other European Cloud providor is `1`.

This code is, however, not enough in order to make instances available on the
Internet in the same way as it was using the Safespring IaaS. To do that we
also need to add:

```hcl
resource "openstack_networking_floatingip_v2" "floatip_1" {
  provider = openstack.psnc-dcw
  count    = var.count_psnc
  pool     = "PCSS-DCW-PUB1-EDU"
}

resource "openstack_compute_floatingip_associate_v2" "fipa_1" {
  provider    = openstack.psnc-dcw
  count       = var.count_psnc
  floating_ip = openstack_networking_floatingip_v2.floatip_1[count.index].address
  instance_id = module.psnc_dcw_instances[count.index].id
}
```

This code will allocate a public IPv4 address from a pool of floating IP
addresses and associate it with the instance id(s) according to the same
`count.index` cycle as the instances.

### Configuring the web service on back-end instances

And now the beauty of automation pays off because the only thing necessary to
do now is to run the Ansible playbook again with the updated inventory that the
new Terraform state represents. Namely, the `os_metadata_role=http_backend`
host group now contains both the Safespring and the the other European Cloud providor instance(s).

```shell
$ ansible-playbook -i ati configure.yaml
ansible-playbook -i ati configure.yaml
[WARNING]: Invalid characters were found in group names but not replaced, use -vvvv to see details

PLAY [Configure back ends] ********************************************************************************************************

TASK [Gathering Facts] ************************************************************************************************************
ok: [mc-safespring-sto1-1.saft.in]
ok: [mc-psnc-dcw-1.saft.in]

TASK [wait for nodes to come up] **************************************************************************************************
ok: [mc-safespring-sto1-1.saft.in]
ok: [mc-psnc-dcw-1.saft.in]

TASK [Install nginx] **************************************************************************************************************
ok: [mc-safespring-sto1-1.saft.in]
changed: [mc-psnc-dcw-1.saft.in]

TASK [An example index.html file] *************************************************************************************************
ok: [mc-safespring-sto1-1.saft.in]
changed: [mc-psnc-dcw-1.saft.in]

PLAY RECAP ************************************************************************************************************************
mc-psnc-dcw-1.saft.in      : ok=4    changed=2    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
mc-safespring-sto1-1.saft.in : ok=4    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
```

And the playbook will find that in the Safespring instance, all was already set
up correctly, but in the new second Cloud providor instance, nothing has been done yet, so it
will close that gap and end up converging to the desired state for all hosts in the
group.

### Configuring round-robin (RR) load balancing using DNS

Any DNS provider can be used really, however, to stay away from any problematic
US-owned services it is best to find a European company. This is why we chose
Gandi.net. Since Gandi.net is a French company data transfer to third countries
according to GDPR is completely eliminated, just as it is when using
Safespring and our partners' services.

So, in order to automatically maintain a set of DNS A records that load balance
across instances in both (or all) OpenStack sites, we can use the following
Terraform code (`gandi-dns.tf`) which in turn uses the official Gandi.net Terraform provider
which again in turn uses the Gandi.net automation API.

```hcl
resource "gandi_livedns_record" "rrlb" {
  zone   = "saft.in"
  name   = "www.mcdemo"
  ttl    = 300
  type   = "A"
  values = concat(tolist([for i in module.sto1_instances : i.IPv4]), openstack_networking_floatingip_v2.floatip_1.*.address)
}
```

Here we create A records for all IPv4 addresses for instances in both
Safespring and the other European Cloud providors's OpenStack IaaSes by concatenating the lists of IPv4
addresses from Safespring module outputs and the other European Cloud providor's floating IP addresses
respectively. All A-records point to the name `www.mcdemo.saft.in`, hence DNS
will load balance across all those IPv4 addresses in a round-robin fashion.

We can test this using `curl`:

```shell
for i in `seq 1 100`
do
echo "$(curl -s www.mcdemo.saft.in)"
done|sort |uniq

<html><h1>Welcome to mc-psnc-dcw-1-saft-in</h1></html>
<html><h1>Welcome to mc-safespring-sto1-1</h1></html>
```

Here we make 100 curl requests against www.mcdemo.saft.in, sort them and
collapse them into unique strings. This shows that both the Safespring and the other European Cloud providor's
instances are taking part in the serving of web requests.

### Scaling up (and down)

Armed with a setup like this the only thing we need, to scale the setup, is to
change some count parameters and run `terraform apply` and re-run the same
Ansible playbook as inventory changes. In order to do this we can create a
variable file (`terraform.tfvars`) with the following contents.

```hcl
count_psnc=2
count_safespring=3
```

After applying this and running the Ansible playbook again, our test with `curl`
yields the following.

```shell
for i in `seq 1 100`
do
echo "$(curl -s www.mcdemo.saft.in)"
done|sort |uniq
<html><h1>Welcome to mc-psnc-dcw-1-saft-in</h1></html>
<html><h1>Welcome to mc-psnc-dcw-2-saft-in</h1></html>
<html><h1>Welcome to mc-safespring-sto1-1</h1></html>
<html><h1>Welcome to mc-safespring-sto1-2</h1></html>
<html><h1>Welcome to mc-safespring-sto1-3</h1></html>
```

## Summary

### Harnessing the Power of Infrastructure as Code

In conclusion, the power of Infrastructure as Code (IAC) lies in its ability to seamlessly scale web applications across multiple OpenStack sites. By leveraging tools like Terraform and Ansible, we can automate the provisioning of infrastructure and system configuration, respectively. The integration of these tools with DNS round-robin for load balancing allows us to create a dynamic and scalable solution for web services.

### Enhancing Scalability and Resilience

While this guide presented a simple implementation, it’s possible to introduce more sophisticated elements such as service discovery mechanisms and health checks for further optimization. Ultimately, these methodologies can be applied to provision and scale Kubernetes clusters, supporting continuous delivery and other cloud-native features.

### Final Thoughts

As we continue to explore the possibilities of IAC, we hope this guide serves as a valuable stepping stone in your journey to building scalable, resilient, and efficient web services.

{{% note "Read more" %}}
If you found this post useful, be sure to check out the rest of the series on using Terraform and Ansible for resource provisioning and compliance. In particular, you might also enjoy:

-- [Dead easy provisioning using the Safespring Terraform modules](/blogg/2022-01-terraform-modules)  
-- [Flexible provisioning of resources with Safespring's new Terraform modules](/blogg/2022-03-terraform-module)  
-- [Integrating Terraform and ansible for efficient resource management](/blogg/2022-05-terraform-ansible)  
-- [From zero to continuous compliance with Terraform, ansible and Rudder](/blogg/2022-06-terraform-ansible-rudder)

{{% /note %}}

[tfmodulesblog]: /blogg/2022/2022-03-terraform-module/
[ati]: https://github.com/safespring-community/utilities/blob/main/ati/terraform.py
[ksparams]: https://github.com/kubernetes-sigs/kubespray/blob/master/docs/vars.md
[kubespray]: https://github.com/kubernetes-sigs/kubespray
[sftfmodules]: https://github.com/safespring-community/terraform-modules
[sftfexamples]: https://github.com/safespring-community/terraform-modules/tree/main/examples
[sshblog]: /blogg/2022-03-ssh-keys/
[netblog]: /blogg/2022-03-network/
[tfdocs]: https://www.terraform.io/docs
[tfreleases]: https://releases.hashicorp.com/terraform/
[osclidoc]: https://docs.safespring.com/new/api/
[appcred]: https://docs.safespring.com/new/app-creds/
[mcdemo]: https://github.com/safespring-community/terraform-modules/tree/main/examples/openstack-multicloud
