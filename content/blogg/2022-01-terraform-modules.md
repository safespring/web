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
resources just by changing som variables in your Terrform code.<p> 

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
unless specified. The only mandatory parameter is `key_pair_name`. 

<script id="asciicast-QbFkWpDWHUorR88FplsyeKtWN" src="https://asciinema.org/a/QbFkWpDWHUorR88FplsyeKtWN.js" data-autoplay="true" data-cols="100" data-rows="60" data-loop="true" data-speed="5" async></script>



[mbcfengine]: https://www.researchgate.net/publication/243774232_Cfengine_A_site_configuration_engine
[tfdl]: https://www.terraform.io/downloads
[sftfmodules]: https://github.com/safespring-community/terraform-modules
