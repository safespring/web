---
title: "Introduction to Safespring Kubernetes Engine"
section: ""
episode: "1"
series: "false"
language: "En"
date: "2026-06-20"
draft: false
tags: ["English"]
card: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-demo-1.webp"
eventbild: ""
socialmediabild: ""
intro: 'Create a Kubernetes cluster in the Safespring self-service portal, scale worker nodes, download kubeconfig, authenticate with the data-center IDP and connect with kubectl.'
sidebarlinkurl: "/contact/#contact-form"
sidebarlinkname: "Contact us"
sidebarlinkicon: "fa fa-external-link"
sidebarlinkurl2: ""
sidebarlinkname2: ""
nosidebar: "none"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/demo-safespring-kubernetes-engine-intro/master.m3u8"
thumbnail: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-demo-1.webp"
subtitles:
  - src: "/subtitles/demo-kubernetes/demo-safespring-kubernetes-engine-intro-en.vtt"
    srclang: "en"
    label: "English"
  - src: "/subtitles/demo-kubernetes/demo-safespring-kubernetes-engine-intro-sv.vtt"
    srclang: "sv"
    label: "Svenska"
  - src: "/subtitles/demo-kubernetes/demo-safespring-kubernetes-engine-intro-no.vtt"
    srclang: "no"
    label: "Norsk"
chaptersTitle: "In this episode"
chapters:
  - title: "Login to the portal"
    time: 0
    timeFormatted: "0:00"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-01.webp"
  - title: "Environments"
    time: 46
    timeFormatted: "0:46"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-02.webp"
  - title: "Add cluster"
    time: 80
    timeFormatted: "1:20"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-03.webp"
  - title: "More on cluster configuration"
    time: 248
    timeFormatted: "4:08"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-04.webp"
  - title: "Cluster walkthrough"
    time: 365
    timeFormatted: "6:05"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-06.webp"
  - title: "Scale up worker nodes"
    time: 430
    timeFormatted: "7:10"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-05.webp"
  - title: "KubeConfig contents"
    time: 615
    timeFormatted: "10:15"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-02.webp"
  - title: "Authentication levels"
    time: 635
    timeFormatted: "10:35"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-05.webp"
  - title: "Delete environment"
    time: 724
    timeFormatted: "12:04"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-01.webp"
---

{{< ingress >}}
This demo walks through the full first-cluster flow in Safespring Kubernetes Engine: from signing in to the portal and creating a cluster to connecting with kubectl and removing the demo cluster when it is no longer needed.
{{< /ingress >}}

The walkthrough starts in the Safespring self-service portal, where environments are used to group resources. From an empty environment, the demo creates a new Kubernetes cluster and shows the choices made during provisioning, including data center, control plane sizing and worker node sizing.

The cluster is created in Stockholm 2 as an example. The configuration review shows the selected data center, cluster name, control plane nodes, worker nodes and the downloadable configuration before the request is submitted.

During provisioning, the demo explains what Safespring sets up around the cluster: the managed control plane, worker nodes, API endpoint, automatically provisioned DNS for ingress and the Talos Linux base used for the nodes. It also covers how Kubernetes upgrades are handled, including when changes need coordination with the application team.

After the cluster becomes active, the overview page shows region, Kubernetes version, Talos version, network details, API endpoint, ingress CNAME target and worker node count. The demo then scales the worker pool from three to four nodes directly from the portal.

The second half focuses on access. The kubeconfig contains the cluster certificate authority data, API server endpoint and login configuration for the data center identity provider. Portal access and cluster access are intentionally separated, so administrators can create or remove clusters while cluster users authenticate to the data center without needing permission to delete infrastructure.

Finally, the demo logs in with kubectl, lists nodes and checks pods in the kube-system namespace. The walkthrough points out components such as Cilium, CoreDNS and CSI Cinder before deleting the demo cluster.
