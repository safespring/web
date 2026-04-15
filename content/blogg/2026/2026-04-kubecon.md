---
title: "KubeCon + CloudNativeCon Europe 2026 — Amsterdam Recap"
date: "2026-04-02"
intro: "KubeCon + CloudNativeCon Europe 2026 took place at Amsterdam RAI from March 23–26, bringing together over 13,500 attendees from 100+ countries and 3,000+ organizations across nearly 900 sessions — the largest KubeCon to date."
draft: false
sectiontext: "Blog"
section: "blogg"
tags: ["English"]
showthedate: true
card: "2026-kubecon-amsterdam-card.webp"
eventbild: ""
socialmediabild: ""
language: "En"
author: ""
---


{{< ingress >}}
The central theme for this years KubeCon was unmistakable: cloud native infrastructure is AI infrastructure, and the ecosystem is reorganizing around that reality. Of course Safespring where onsite and enjoying latest from the industry.
{{< /ingress >}}

![Amsterdam RAI venue entrance during KubeCon + CloudNativeCon Europe 2026.](/img/blogg/2026-kubecon-amsterdam-venue.webp)

## Keynote Highlights

The opening keynotes set the tone with a clear macro forecast: in 2023, roughly two-thirds of AI compute went to training and one-third to inference. By the end of 2026, that ratio is expected to flip, with inference compute demand projected to reach 93.3 gigawatts by decade's end. The message was direct — Kubernetes is becoming the control plane for AI infrastructure, and the CNCF ecosystem is positioning itself to own that layer. And perhaps finally the operating system for the datacenter.

**NVIDIA**, donated its DRA GPU driver to Kubernetes SIG Node as a reference implementation for the vendor-neutral Dynamic Resource Allocation (DRA) API. 


**Project milestones** from the conference: Kyverno and Dragonfly graduated; Fluid and Tekton moved into incubation; LLMD, a distributed inference system built for Kubernetes, was announced as a new CNCF sandbox project.

![Safespring at the KubeCon + CloudNativeCon Europe 2026 showcase area in Amsterdam.](/img/blogg/2026-kubecon-showcase.webp)

---

## Fluxcon and FluxCD

FluxCon Europe 2026 ran as a co-located event on March 23, sessions ranged from enterprise rollouts to visualizing GitOps at scale using the new Flux UI.

Where one key take away is the work that the project has poured into tailor Claude agent skills to really fit what FluxCD is doing.

And it has become quite the SRE for your Gitops pipeline.

---

## CiliumCon and Cilium

CiliumCon returned to Amsterdam for its seventh iteration on March 23 — and appropriately so, as this marked **Cilium's 10th anniversary**. The event came shortly after the release of Cilium v1.19.

The CiliumCon agenda reflected a mature ecosystem. Talks moved past "how do we adopt Cilium?" and into "how do we run it at scale with advanced features?" — including Tetragon policy scaling, multi-cluster networking across hundreds of clusters, and replacing legacy hardware load balancers.

A strong security thread ran through the day, from Tetragon-based per-workload policy enforcement to hardware-accelerated security policies on DPUs. The project is also positioning itself as the networking data plane for AI workloads, a natural fit given its eBPF-based performance profile.

---

![Visitor meeting at the KodeKloud booth during KubeCon + CloudNativeCon Europe 2026.](/img/blogg/2026-kubecon-kodekloud.webp)

## Summary

Walking out of Amsterdam after four days, the thing that stuck most wasn't any single announcement — it was the shift in how people were talking. A year ago, AI at KubeCon in London felt bolted on, everyone was doing it and everyone had a mcp server for their usecase, workload or application. This time around it was done more on purpose in all areas — security, networking, GitOps, observability, scheduling, you name it. Cilium and Flux were two examples of projects leaning into that, but so was practically every other corner of the ecosystem. And AI is not an add-on to the service or application - its something you tailor for. Regardless of Virtualising a whole rack of GPU nodes and using nvlink to make them "one" or if you iron out skills/plugins specifically to fit your application AI is there.

And unlike previous year, this wasn't just hype and mcp's everywhere. AI is being used in production and the gap between this works in a demo and it working in production is not really there anymore. AI has matured.

---

![Safespring team members outside Amsterdam RAI during KubeCon + CloudNativeCon Europe 2026.](/img/blogg/2026-kubecon-team.webp)

## Anders's Take aways:
1. AI everyone is doing it. At all levels of the stack.
   If its tailoring the hw to fit your need or tweaking the orchestrator to fit your workload - you're doing it!
2. Kubevirt is maturing - thanks for the recent changes of licensing of popular platform and the call for an AI-orchestrator. 
3. Thanks to AI MultiCluster/ClusterMesh seems to be on the uprise. Looking at what solo.io does with kagent, agentgateway, kgateway to name a few.
## Ahmet's Take aways:
1. AI is everywhere right now, but a lot of things could still just be solved with a simple script without all the extra cost and complexity.
2. Digital sovereignty became a big topic, especially with more teams want control over their infrastructure and data.
3. Observability feels like it's hitting a wall, there is already so much data and the hard part is figuring out what is actually useful.
## Anand's Take aways:
1. One of the key highlights for me at KubeCon was the Project Pavilion, where I could talk directly with CNCF project maintainers and core contributors. It’s rare to get that kind of access to the people building something truly impactful.
2. For the first time, it truly felt like open source is setting the direction, not just the big cloud providers or large corporations, but a global community collaboratively shaping what comes next.
3. On the technical side, I loved seeing Kubevirt gaining real momentum, AI reshaping observability from just collecting signals to actually interpreting them, and sovereignty being built in by design. It’s exciting to be part of a community where we’re not just running systems anymore but building the future.
