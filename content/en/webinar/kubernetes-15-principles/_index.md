---
ai: true
title: "Designing and Deploying Scalable Applications on Kubernetes"
language: "en"
date: "2023-09-18"
publishDate: "2023-09-18"
draft: false
tags: ["Svenska"]
card: "safespring-gabriel-lars.jpg"
eventbild: ""
socialmediabild: ""
intro: "In this web series, we will explore how to design and deploy scalable applications on Kubernetes."
partner: ""
audience: "SaaS"
explorer: ""
sidebarlinkurl: ""
sidebarlinkname: ""
sidebarimage: ""
nosidebar: "invisible"
toc: "Section"
section: "Webinar"
aliases:
  - /kubernetes-webcast
  - /webinar/kubernetes-15-principles/
---
{{< ingress >}}
In this web series, we will walk through Elastisys’s principles for getting the most out of Kubernetes and maximizing its benefits.
{{< /ingress >}}

Each episode covers specific topics and gives you insight into how you can improve your DevOps processes and build a more robust and scalable architecture. We have grouped the 15 principles according to how they fit into the episodes. If you want to read more about the principles, Elastisys goes through them in order in their article here.

All code snippets shown throughout this series are available on GitHub at elastisys/kubernetes-principles-webinar-series.

{{% note "The principles at a glance" %}}

{{% column-two %}}

1. Stateful vs. Stateless Controller
2. Secrets vs. Non-secrets
3. Autoscaling
4. Lifecycle Management
5. Probes
6. Signal Handling
7. Fail Hard, Fast, Loud
8. Prepare application
9. Resource requests and limits
10. Reservation & prioritization
11. Scheduling requirements
12. Pod Disruption Budget
13. Strategies > stop the world
14. Restrict permissions
15. Limit attack surface

{{% /column-two %}}

{{% /note %}}

{{< distance >}}

## Episode 1

### Introduction to cloud-native applications and Kubernetes

In this episode with Gabriel Paues from Safespring and Lars Larsson from Elastisys, you’ll get an overview of cloud-native applications and an introduction to Kubernetes. You will learn about its key components, how they work together to create a scalable and reliable infrastructure, and what these components correspond to in AWS.

{{< distance >}}

## Episode 2

### Managing Pods, Deployments, and StatefulSets

Gabriel Paues from Safespring and Lars Larsson from Elastisys give you a deeper understanding of how Pods, Deployments, and StatefulSets work, and how you can use them to build and scale your applications on Kubernetes. After watching this episode, you will have a strong foundation for managing applications that involve both stateless and stateful components.

{{< inline "Principle 01" >}} Using Controllers for Pods  
{{< inline "Principle 11" >}} Force co-location of or spreading out Pods as needed

{{< distance >}}

## Episode 3

### Configuration, scaling, and container lifecycle

In this episode, Gabriel Paues from Safespring and Lars Larsson from Elastisys focus on configuration and lifecycle management of containers in Kubernetes. You’ll learn about the importance of separating secret and non-secret configurations, as well as how to prepare a component to scale out and scale in in a controlled, effective way.

{{< inline "Principle 02" >}} Separate secret from non-secret configuration  
{{< inline "Principle 14" >}} Enabling automatic scaling  
{{< inline "Principle 15" >}} Utilizing container lifecycle hooks

{{< distance >}}

## Episode 4

### Automating and observing applications

This episode teaches you the importance of preparing your application for observability and how to implement automation to facilitate operations and scaling. Gabriel Paues from Safespring and Lars Larsson from Elastisys cover topics such as monitoring, logging, and tracing, and how you can use these insights to make decisions about scaling and resource management.

{{< inline "Principle 5" >}} Use probes correctly  
{{< inline "Principle 6" >}} Use signal handling correctly  
{{< inline "Principle 7" >}} Failing hard, fast, and loudly  
{{< inline "Principle 8" >}} Preparing your application for observability

{{< distance >}}

## Episode 5

### Advanced deployment strategies and high availability

This episode covers advanced deployment strategies such as blue/green and canary deployments. Gabriel Paues from Safespring and Lars Larsson from Elastisys show how these strategies help minimize downtime and risk during updates, and how you can ensure high availability for your application by using Pod Disruption Budgets and other techniques.

{{< inline "Principle 9" >}} Setting Pod resource requests and limits  
{{< inline "Principle 10" >}} Reserving capacity and prioritizing Pods  
{{< inline "Principle 12" >}} Pod Disruption Budget
{{< inline "Principle 13" >}} Strategies > stop the world

{{< distance >}}

## Episode 6

### Security and constraints for Pods and networking

In this episode, Gabriel Paues from Safespring and Lars Larsson from Elastisys explore security aspects of running applications on Kubernetes. You will learn about the importance of restricting permissions and access for Pods, how to handle network policies, and how to improve the security of your applications by following best practices.

{{< inline "Principle 14" >}} Restrict permissions
{{< inline "Principle 15" >}} Limit attack surface

{{< distance >}}

## Episode 7

### Summary and next steps

In the final episode, Gabriel Paues from Safespring and Lars Larsson from Elastisys summarize all the material from the web series and discuss additional resources and recommendations to continue improving your Kubernetes and cloud-native applications. We cover key learnings and tips that will help you succeed in your ongoing journey to design, build, and operate scalable and robust applications on Kubernetes. We also go through what we consider good next steps to deepen your knowledge in the area.

{{< distance >}}

{{% note "Don’t hesitate to contact us" %}}
We hope this web series, created together with Elastisys, has given you insights and tools that make you more confident in using Kubernetes to build and manage your cloud-native applications.

Whether you are a beginner or an experienced Kubernetes user, there are always new things to learn and new techniques to explore. We encourage you to watch the entire web series and share it with your colleagues and friends.

Together, we can continue to develop and improve our skills to create the cloud-native applications of the future.

{{< 2calltoaction "Get in touch" "/demo" "Learn more about Kubernetes at Safespring" "/services/compliant-kubernetes" >}}
{{% /note %}}