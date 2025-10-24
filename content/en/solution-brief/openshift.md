---
title: "OpenShift runs smoothly on Safespring's platform"
date: 2021-12-07T13:58:58+01:00
draft: false
tags: ["English"]
intro: "With the OKD community installer, you can quickly get an OpenShift cluster up-and-running."
sidebarlinkname: "Contact Us"
sidebarlinkurl: "/contact"
socialmedia: "safespring-compute.jpg"
devops: ""
card: "safespring-openshift.svg"
sidebarimage: "safespring-openshift.svg"
background: "safespring-openshift.png"
socialmediabild: "safespring_social_21.gif"
form: "yes"
toc: "Table of Contents"
language: "en"
section: "Solution Brief"
aliases:
  - /solution-brief/openshift-en/
---

![Safespring OpenShift benefits](/img/safespring_key-points-openshift-3.svg)

{{% ingress %}}
Containers require flexibility. Safespring's platform is created for scalability, high security and is optimized for OpenShift cluster resource requirements.
{{% /ingress %}}

Safespring's Compute service gives you all the resources you need to run OKD, the open source version of Kubernetes based on Red Hat OpenShift.

Are you running OpenShift on-prem today? With a Swedish cloud service as the basis for your OKD cluster, you get both the scalability and security of a managed infrastructure platform. Let your developers focus on OpenShift and pay only for the resources you consume.

<div style="margin-bottom:50px;"></div>

<script data-theme="solarized-dark" id="asciicast-J98pWS97p1zAHM8L1VFmB7Bre" src="https://asciinema.org/a/J98pWS97p1zAHM8L1VFmB7Bre.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

## Install OKD with the community installer

{{% ingress %}}
Learn everything needed to set up RedHat OpenShift (OKD) on Safespring's cloud platform.
{{% /ingress %}}

With these tools, you can provide an OKD cluster in about an hour. The installation provides a minimal OKD cluster with three control plane nodes and two working nodes with a minimum instance size. The cluster can be scaled up and down based on changed input parameters and re-run of Ansible playbook.

On Safespring's Openstack-based infrastructure platform, you can quickly deploy an OKD cluster with our [tools for instantiating clusters][1].

{{< 2calltoaction "Download OKD-installer" "https://github.com/safespring-community/utilities/tree/main/okd" >}}

### You need this to get started

- A project on [Safespring Compute](/services/compute/) with the following resources:
  - Memory: 60GB
  - VCPUs: 16
  - Security group rules: 40
  - Storage access to S3 in STO2 site
  - A liveDNS domain @ gandi.net
  - An API key for your gandi.net user

### The Terraform module

The core of our developed tool is the Terraform module, which provides all the necessary resources that an OKD cluster needs to assemble itself, ie. calculate nodes with different roles (boot, control plane, worker), block storage, security, groups, networks, DNS records, key pairs, and so on. The module is as general as it can be. The installation tools use the terraform module for all infrastructure provisioning. The module is called directly to GitHub in the installation tools, in the cluster configuration template `cluster.tf.js`.

### Input parameters

The cluster setup needs a large amount of input parameters. You can choose to provide these parameters to suit your needs, but we created an abstraction layer withe sane default values for many of the parameters to make this as easy as possible. The tool we have developed ensures that you have all the dependencies in place and make the necessary configuration from templates.

The tool takes a few inputs such as cluster name, DNS domain, S3 bucket (for the large ignition file for the start node) and converts these to useful parameters for the Terraform module. A template-generated `cluster.tf` contains these parameters and references to the module. The file `cluster.tf` is used for the provisioning.

## The result

The installation provides a minimal OKD cluster with control plane nodes and two working nodes with a minimum instance size. You can override the instance size and other parameters (such as the number of different nodes) through the `settings.yml` file.

{{< 2calltoaction "Download OKD-installer" "https://github.com/safespring-community/utilities/tree/main/okd" >}}

[1]: https://github.com/safespring-community/utilities/tree/main/okd
