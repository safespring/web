---
title: "Setting up a minumal Kubernetes cluster on Safespring using Kubespray"
date: "2022-08-16"
intro: "This post shows how you can get from no resources to a fully automated and continuously compliant infrastructure with code only."
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
This blog post explains how to automatically confugure and deploy a minimal
Kubernetes (K8S) cluster by utilizing a tool called Kubespray.
{{< /ingress >}}

## Prerequisites
This blog post assumes that you use the open source Terraform CLI. Terraform CLI
is just a binary program that you download from the [releases page][tfreleases],
for your architecture/platform. Here you also find checksums for the files to
verify their integrity.

There is also the official [Terraform documentation][tfdocs].

A basic understanding of Ansible playbooks and inventories is also necessary.

## Kubespray introduction

 - Automated deployment on Openstack using contrib tf-code
 - Dynamic inventory from tf
 - Ansible to deploy k8s


[kubespray]: https://github.com/kubernetes-sigs/kubespray
[ati]: https://github.com/safespring-community/utilities/blob/main/ati/terraform.py
[ansible]: https://github.com/ansible/ansible
[tfdl]:https://www.terraform.io/downloads
[sftfmodules]:https://github.com/safespring-community/terraform-modules
[sftfexamples]:https://github.com/safespring-community/terraform-modules/tree/main/examples
[sshblog]:https://www.safespring.com/blogg/2022-03-ssh-keys/
[netblog]:https://www.safespring.com/blogg/2022-03-network/

[tfdocs]: https://www.terraform.io/docs
[tfreleases]: https://releases.hashicorp.com/terraform/

