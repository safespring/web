---
title: "Webbserie: Design och driftsättning av skalbara applikationer på Kubernetes"
language: "Se"
date: "2023-09-18"
publishDate: "2023-09-18"
draft: true
tags: ["Svenska"]
card: "safespring_card_47.svg"
eventbild: ""
socialmediabild: ""
intro: 'I denna webbserie kommer vi att utforska hur man designar och driftsätter skalbara applikationer på Kubernetes.'
partner: ""
audience: "saas"
explorer: ""
sidebarlinkurl: ""
sidebarlinkname: ""
sidebar: "x"
sidebarimage: ""
toc: "Avsnitt"
---

{{< ingress >}}
Vi kommer att gå igenom Elastisys 15 grundprinciper som hjälper dig att få ut mesta möjliga av Kubernetes och dess fördelar.
{{< /ingress >}}

Varje avsnitt behandlar specifika ämnen och ger dig insikt i hur du kan förbättra dina DevOps-processer och skapa en mer robust och skalbar arkitektur. Vi har grupperat principerna efter hur de passar in i avsnitten, därför kommer vi inte gå igenom dem i ordning.

{{% note "15 grundprinciper" %}}

{{% column-two %}}

1. Never Single Pod
1. Stateful vs. Stateless
1. Secrets vs. Non-secrets
1. Autoscaling
1. Lifecycle Management
1. Probes
1. Fail Hard, Fast, Loud
1. Prepare Application
1. Resource Requests, limits
1. Reservation & prioritization
1. Scheduling requirements
1. Pod Disruption Budget
1. Strategies > stop the world
1. Restrict permissions
1. Limit attack surface

{{% /column-two %}}

{{% /note %}}

{{< distance >}}

## Avsnitt 1
### Introduktion till molnbaserade applikationer och Kubernetes

I detta avsnitt får du en översikt över molnbaserade applikationer och en introduktion till Kubernetes. Du kommer att lära dig om dess nyckelkomponenter och hur de samverkar för att skapa en skalbar och pålitlig infrastruktur.

![Avsnitt 2: Hantering av Pods, Deployments och StatefulSets](/img/event/safespring-video-placeholder.svg)

{{< distance >}}



## Avsnitt 2
### Hantering av Pods, Deployments och StatefulSets
Här kommer du att få en djupare förståelse för hur Pods, Deployments och StatefulSets fungerar, och hur du kan använda dem för att bygga och skala dina applikationer på Kubernetes. Efter att ha tittat på detta avsnitt kommer du att ha en stark grund i att hantera applikationer som involverar både tillståndslösa och tillståndsbaserade komponenter.

{{< inline "Princip 01" >}} Using Controllers for Pods  
{{< inline "Princip 02" >}} Separating stateful and stateless components  
{{< inline "Princip 11" >}} Co-locating or spreading out Pods

![Avsnitt 2: Hantering av Pods, Deployments och StatefulSets](/img/event/safespring-video-placeholder.svg)

{{< distance >}}



## Avsnitt 3
### Konfiguration, skalning och containerlivscykel
I detta avsnitt kommer vi att fokusera på konfiguration och livscykelhantering av containers i Kubernetes. Du lär dig om vikten av att separera hemliga och icke-hemliga konfigurationer och hur du använder liveness och readiness probes för att övervaka och hantera din applikations hälsa.

{{< inline "Princip 03" >}} Separating secret and non-secret configurations  
{{< inline "Princip 14" >}}	Enabling automatic scaling  
{{< inline "Princip 15" >}} Utilizing container lifecycle hooksg

![Avsnitt 2: Hantering av Pods, Deployments och StatefulSets](/img/event/safespring-video-placeholder.svg)

{{< distance >}}



## Avsnitt 4
### Automatisering och övervakning av applikationer
I det här avsnittet kommer du att lära dig om vikten av att förbereda din applikation för observability och hur du implementerar automatisering för att underlätta drift och skalning. Vi kommer att täcka ämnen som övervakning, loggning och spårning samt hur du kan använda dessa insikter för att fatta beslut om skalning och resurshantering.

{{< inline "Princip 6" >}} Using probes correctly  
{{< inline "Princip 7" >}} Failing hard, fast, and loudly  
{{< inline "Princip 8" >}} Preparing your application for observability

![Avsnitt 2: Hantering av Pods, Deployments och StatefulSets](/img/event/safespring-video-placeholder.svg)

{{< distance >}}



## Avsnitt 5
### Avancerade driftsättningsstrategier och hög tillgänglighet
Detta avsnitt kommer att behandla avancerade driftsättningsstrategier, såsom blue/green och canary deployments. Du kommer att lära dig hur dessa strategier hjälper till att minimera driftstopp och risker under uppdateringar, samt hur du kan garantera hög tillgänglighet för din applikation genom att använda Pod Disruption Budgets och andra tekniker.

{{< inline "Princip 9" >}} Setting Pod resource requests and limits  
{{< inline "Princip 10" >}} Reserving capacity and prioritizing Pods

![Avsnitt 2: Hantering av Pods, Deployments och StatefulSets](/img/event/safespring-video-placeholder.svg)

{{< distance >}}



## Avsnitt 6
### Säkerhet och begränsningar för Pods och nätverk
I det här avsnittet kommer vi att undersöka säkerhetsaspekter av att köra applikationer på Kubernetes. Du kommer att lära dig om vikten av att begränsa behörigheter och åtkomst för Pods, hur man hanterar nätverkspolicyer och hur du kan förbättra säkerheten för dina applikationer genom att följa bästa praxis.

{{< inline "Princip 12" >}} Using Pod Disruption Budgets  
{{< inline "Princip 13" >}} Blue/green and canary deployments  

![Avsnitt 2: Hantering av Pods, Deployments och StatefulSets](/img/event/safespring-video-placeholder.svg)

{{< distance >}}



## Avsnitt 7
### Sammanfattning och nästa steg
I det sista avsnittet sammanfattar vi allt vi har lärt oss under webbserien och diskuterar ytterligare resurser och rekommendationer för att fortsätta förbättra dina Kubernetes- och molnbaserade applikationer. Vi kommer att täcka viktiga lärdomar och tips som hjälper dig att lyckas i din fortsatta resa med att designa, bygga och driftsätta skalbara och robusta applikationer på Kubernetes.

{{< inline "Princip 14" >}} Limiting Pod permissions  
{{< inline "Princip 15" >}} Restricting Pod actions within the cluster

![Avsnitt 2: Hantering av Pods, Deployments och StatefulSets](/img/event/safespring-video-placeholder.svg)

{{< distance >}}



Vi hoppas att denna webbserie har gett dig insikter och verktyg som gör att du känner dig säkrare i att använda Kubernetes för att bygga och hantera dina molnbaserade applikationer. Om du är nybörjare eller erfaren användare av Kubernetes, finns det alltid nya saker att lära sig och nya tekniker att utforska.

Vi uppmuntrar dig att titta på hela webbserien och dela den med dina kollegor och vänner. Tillsammans kan vi fortsätta att utveckla och förbättra våra färdigheter för att skapa framtidens molnbaserade applikationer. Tack för att du har följt med på denna resa, och lycka till med dina framtida projekt!