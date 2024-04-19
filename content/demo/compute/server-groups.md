---
title: "Implementing Server Groups in OpenStack"
section: ""
episode: "8"
series: "true"
language: "En"
date: "2024-04-19"
draft: false
tags: ["English"]
card: "/img/webinar/thumbnails/demo-episode-8.webp"
eventbild: ""
socialmediabild: ""
intro: 'Explore how to use server groups in OpenStack to enforce anti-affinity rules for improved redundancy and reliability in your cloud infrastructure.'
sidebarlinkurl: "/demo/compute"
sidebarlinkname: "Back to all episodes"
sidebarlinkurl2: ""
sidebarlinkname2: ""
nosidebar: "none"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-demo-episode-8-server-groups/master.m3u8"
thumbnail: "/img/webinar/thumbnails/demo-episode-8.webp"
chaptersTitle: "In this episode"
chapters:
- title: "Om detta avsnitt"
  time: 91
  timeFormatted: "1:31"
---

{{< ingress >}}
This video tutorial delves into the concept of server groups within OpenStack, a critical feature for ensuring that instances, particularly in high-availability setups like database clusters, do not run on the same physical hardware. {{< /ingress >}}

Safespring Cloud Architect, Gabriel, explains the distinction between different policies like affinity, anti-affinity, soft affinity, and soft anti-affinity, emphasizing the importance of anti-affinity for scenarios requiring true redundancy. 

By walking through the creation of a server group named 'DB Cluster' with an anti-affinity policy, the video demonstrates how to configure and deploy instances that are guaranteed to operate on separate compute nodes. 

This setup is essential for maintaining service availability even if one of the compute nodes fails, making it ideal for critical applications such as databases and messaging systems. 

The session provides practical insights into utilizing OpenStack’s server groups to enhance the fault tolerance of cloud deployments.