---
title: "Dead easy provisioning using the Safespring terraform modules"
date: "2021-12-27"
draft: false
tags: ["tech","english"]
showthedate: true
card: "safespring_card_32.jpg"
eventbild: "safespring_background_32.jpg"
socialmediabild: "safespring_social_32.jpg"
---
{{< ingress >}}
Provisioning of compute and block storage resources in Safespring's
infrastructure platform has never been easier. In this blog post I'll showcase
just how easy it is by example of our community terraform modulessftfmodules.
<p>
Modules can be sourced directly from github using a minimum of terraform code.
{{< /ingress >}}

## Terraform introduction
Terraform has become the de-facto industry standard for «Infrastructure As Code - IAC».
It is written in golang, is open source and can be downloaded as a single
executable file from the [Terraform download page][tfdl]. Terraform takes plain
text files with "HCL - Hashicorp Configuration Language" as input and provides
servers and storage as output. HCL is a declarative language, i.e. it does not
specify any actions to be taken but rather a desired state - or outcome. The
idea that configuration languages should be declarative, and onvergence of real
state into that declared desired state, has become widely accepted over the last
three decades and is based on ideas and research by [Mark Burgess during the early
nineties and later][mbcfengine].

The superpower of Terraform comes from all of it's providers. The Terraform
providers are binary extensions of Terraform that, as the name indicates,
"provide" resources of differents kinds using the APIs of the cloud provider
reflected by the name of the extension. It is these extensions that do all the
heavy lifting towards the cloud provider APIs and ensures that the actual state
(the cloud resources) is converged to what is specificed as the desired state.
As such, Terraform can be viewed as a desired state configuration agent for
infrastructure. Every time it is run, it will turn desired state into actual
state when it comes to cloud resources.

Terraform has tons of battle tested providers available to use, thus easing the
burden of provisioning cloud resources from all kinds of cloud APIs within the
same (or different) configurations. Let's say you need resourcess in different
clouds (or on premise) for the same multi cloud and/or hybrid environemnts. Then you
can do that using one terrafrom config, and you can even scale up and down the number of 
resources just by changing som variables in your Terrform code.

Terraform is cloud agnostic and thus is a great insurance that your resources
is as portable as possible, thus reducing the level of "lock in" to a minimum.

## Examples using the Safespring Terraform modules

The Safespring Openstack plattform provides two catgories of instance flavors:

1. Flavors with local NVMe disk. Flavor names start with **«l»**, for example **lm.small**
2. Flavors with no disk. Flavor names start without "l". These flavors need to
provision at least one additional volume from the Openstack volume service
(Cinder) to boot the operating system from

### The smallest possible example: **a local disk flavor instance with default values.**

Parameters for flavor, image, name-prefix, suffix, count and so on is default
unless specified. The only mandatory parameter is `key_pair_name`. This can be
a pre-existing key created as part of the terraform config. First we'll create
one with openstac kcli and reference it in terraform config.

<script id="asciicast-yr2F1jWsmTWTFvkiXMtQ26f5I" src="https://asciinema.org/a/yr2F1jWsmTWTFvkiXMtQ26f5I.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

### Next: same thing but now creating the key in terraform

First we destroy what we created in the previous example. Then we add code to
create a keypair with terraform and then usa thet keypair in the instance
config. Thus making the terraform config self contained with no external
dependencies on Openstack objects.

The Safespring modules contains references to which providers/versions they
depend on. When creating resources directly in the config (like the key pair in
the example below) we must also include config for the openstack provider in
the root module (main.tf)

<script id="asciicast-P36Q7BaY9sktSzTbS7uhASjGj" src="https://asciinema.org/a/P36Q7BaY9sktSzTbS7uhASjGj.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>


### Next: now with security groups

If an instance is not member any security groups it is not possible to
communicate with the instance using any of the allocated IP addresses. The
following example shows how to create a security group with a couple of rules
to allow ssh and ICMP (ping for instance) from the world on IPv4. It is also
possible to use names of pre-existing security goups (the default security
group for example, which is always present in a project).

Also it should be possible to apply configuration changes without needing to
destroy the current state of the resources. Sometimes it is not possible though
to change the state without re-creating objects. Terraform will just re-create
object when the changes require it, so just be careful when examining the plan
before applying. The plan is always shown when Terraform apply is run in
interactive mode, but it is also possible/recommended to run `terraform plan`
which **only** shows the planned changes.

Let's try to apply our newly added security group to our existing config
without destroying it first.

<script id="asciicast-py92MXeP9yI4f2a33Z5KMRLuk" src="https://asciinema.org/a/py92MXeP9yI4f2a33Z5KMRLuk.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

### Next: more modules and parameters

So how do I magically know which parameters are available for a module and what
they do? Easy, I look at the `variables.tf` file in the module directory on
github. For instance the `v2-compute-local-disk` module used so far (among
others) is located on:
https://github.com/safespring-community/terraform-modules/tree/main/v2-compute-local-disk.
There is some `.tf` files in that directory. The `variables.tf` contains all
the variables/parameters that the module accepts, description of what they are
and default values.

Lets try to use that to expand our configuration a bit more.
<script id="asciicast-rfkA04x6QfSkGaIMJOS1rTGJE" src="https://asciinema.org/a/rfkA04x6QfSkGaIMJOS1rTGJE.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

### Wrap up
We have found out how little code is necessary to deploy groups of resources in
the Safespring compute platform using minimal amount of terraform code, that
reuse Safespring specific modules directly from github, to specify desired state
of Safespring resources.

Also, we have pointed to the source code of the modules which can be examined
to see what they do and how they do it. This can serve as inspiration to create
your own modules for your particular purpose.

The next post will be expand further on module usage to create several
sets/groups of instances and security groups to orchestrate and connect
environments. Also it will demonstrate how meta-data-roles from terraform
config can be used as ansible inventory groups in order to configure the
operationgs systems according to particular roles that instances should fulfill.

[mbcfengine]: https://www.researchgate.net/publication/243774232_Cfengine_A_site_configuration_engine
[tfdl]: https://www.terraform.io/downloads
[sftfmodules]: https://github.com/safespring-community/terraform-modules
