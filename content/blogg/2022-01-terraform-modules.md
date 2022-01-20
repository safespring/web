---
title: "Dead easy provisioning using the Safespring Terraform modules"
date: "2022-01-10"
intro: "It has never been easier to provision compute and block storage resources in Safespring's infrastructure platform."
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
In this blog post, we'll showcase just how easy it is by the example of our community Terraform modules.
{{< /ingress >}}

It has never been easier to provision compute and block storage resources in Safespring's infrastructure platform. Modules can be sourced directly from GitHub using a minimum of Terraform code.

## Terraform introduction
Terraform has become the de-facto industry standard for «Infrastructure As Code - IAC». It is written in Golang, is open source, and you can download it as a single executable file from the [Terraform download page][tfdl].

Terraform takes plain text files with «HCL - Hashicorp Configuration Language» as input and provides servers and storage as output. HCL is a declarative language, i.e., it does not specify any actions to be taken but rather a desired state - or outcome.

The idea that configuration languages should be declarative, and that convergence of real state into the declared desired state, has become widely accepted over the last three decades and is based on ideas and research by [Mark Burgess during the early nineties and later][mbcfengine].

### Terraform providers
The superpower of Terraform comes from all of it's providers. The Terraform providers are binary extensions of Terraform that, as the name indicates, «provide» resources of different kinds using the APIs of the cloud provider reflected by the extension's name.

These extensions do all the heavy lifting towards the cloud provider APIs and ensure that the actual state (the cloud resources) is converged to what is specified as the desired state.

Terraform can be viewed as a desired state configuration agent for infrastructure. Every time it is run, it will turn the desired state into the actual state for cloud resources.

### Reducing the level of «lock-in»
Terraform has tons of battle-tested providers available to use, thus easing the burden of provisioning cloud resources from all kinds of cloud APIs within the same (or different) configurations.

Let's say you need resources in other clouds (or on-premise) for the same multi-cloud or hybrid environments. Then you can do that using one Terraform config, and you can even scale up and down the number of resources by changing some variables in your Terraform code.

Terraform is cloud-agnostic and thus is excellent insurance that your resources are as portable as possible, thus reducing the level of "lock-in" to a minimum.

## Examples using the Safespring Terraform modules
The Safespring Openstack platform provides two categories of instance flavors:

1. Flavors with local NVMe disk. Flavor names start with `l`, for example, `lm.small`.
2. Flavors with no disk. Flavor names start without `l`. These flavors need to provision at least one additional volume from the Openstack volume service (Cinder) to boot the operating system from.

Thus the modules ar divided into to major types according to instance types with or without local disk. In addition, both instances with or without local disk can have a central disk (data disk) attached to it. That makes four modules in total:

1. `v2-compute-local-disk`<br>
Module for flavor with local disk and no central extra data disk.
2. `v2-compute-central-disk`<br>
Module for flavor with central disk and no central extra data disk
3. `v2-compute-local-disk-and-attached-disk`<br>
Module for flavor with local disk and central extra data disk
4. `v2-compute-central-disk-and-attached-disk`<br>
Module for flavor with central disk and extra central data disk:

### 1. The smallest possible example
 A local disk flavor instance with default values.

Parameters for flavor, image, name-prefix, suffix, count, and so on are the default unless specified. The only mandatory parameter is `key_pair_name` which can be a pre-existing key , or it can be created as part of the Terraform config. First, we'll create one with OpenStack CLI and reference it in the Terraform config.

<script data-theme="solarized-dark" id="asciicast-yr2F1jWsmTWTFvkiXMtQ26f5I" src="https://asciinema.org/a/yr2F1jWsmTWTFvkiXMtQ26f5I.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

### 2. Same thing but now creating the key in Terraform

First, we destroy what we created in the previous example. Then we add code to create a keypair with Terraform and then use the keypair in the instance config. Thus making the Terraform config self-contained with no external dependencies on Openstack objects.

The Safespring modules contain references to which providers/versions they depend on. When creating resources directly in the config (like the key pair in the example below), we must also include config for the OpenStack provider in the root module (main.tf)

<script data-theme="solarized-dark" id="asciicast-P36Q7BaY9sktSzTbS7uhASjGj" src="https://asciinema.org/a/P36Q7BaY9sktSzTbS7uhASjGj.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>


### 3. Now with security groups

If an instance is not a member of any security groups, it is impossible to communicate with the instance using any allocated IP addresses. The following example shows how to create a security group with a couple of rules to allow `ssh` and `ICMP` (ping, for instance) from «the world» by IPv4. It is also possible to use names of pre-existing security groups (the default security group, for example, which is always present in a project).

Also, it should be possible to apply configuration changes without needing to destroy the current state of the resources. Sometimes it is impossible to change the state without re-creating objects. Terraform will re-create objects when the changes require it, so be careful when examining the plan before applying. The plan is always shown when `terraform apply` is run in interactive mode, but it is also possible/recommended to run `terraform plan`, which only **shows** the planned changes.

Let's apply our newly added security group to our existing config without destroying it first.

<script data-theme="solarized-dark" id="asciicast-py92MXeP9yI4f2a33Z5KMRLuk" src="https://asciinema.org/a/py92MXeP9yI4f2a33Z5KMRLuk.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

### 4. More modules and parameters

So how do I magically know which parameters are available for a module and what they do? Easy, I look at the `variables.tf` file in the module directory on GitHub. For instance, the `v2-compute-local-disk` module used so far (among others) is located on [Safespring Community at GitHub](https://github.com/safespring-community/terraform-modules/tree/main/v2-compute-local-disk). There are some `.tf` files in that directory. The `variables.tf` contains all the variables/parameters that the module accepts, their description, and default values.

Lets try to use that to expand our configuration a bit more.
<script data-theme="solarized-dark" id="asciicast-rfkA04x6QfSkGaIMJOS1rTGJE" src="https://asciinema.org/a/rfkA04x6QfSkGaIMJOS1rTGJE.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

### 5. Wrap up
We have found out how little code is necessary to deploy groups of resources in the Safespring compute platform using a minimal amount of Terraform code that reuses Safespring specific modules directly from GitHub to specify the desired state of Safespring resources.

Also, we have pointed to the modules' source code, which you can examine to see what they do and how they do it. The source code can inspire you to create your modules for your particular purpose.

The following post will expand further on module usage to create several sets/groups of instances and security groups to orchestrate and connect environments. Also, it will demonstrate how meta-data roles from Terraform config can be used as Ansible inventory groups to configure the operating systems according to particular roles that instances should fulfill.

[mbcfengine]: https://www.researchgate.net/publication/243774232_Cfengine_A_site_configuration_engine
[tfdl]: https://www.terraform.io/downloads
[sftfmodules]: https://github.com/safespring-community/terraform-modules
