---
title: "Webbserie: Design och driftsättning av skalbara applikationer på Kubernetes"
language: "Se"
date: "2023-09-18"
publishDate: "2023-09-18"
draft: false
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
I denna webbserie kommer vi gå igenom Elastisys principer för att få ut mesta möjliga av Kubernetes och dra maximal nytta av dess fördelar.
{{< /ingress >}}

Varje avsnitt behandlar specifika ämnen och ger dig insikt i hur du kan förbättra dina DevOps-processer och skapa en mer robust och skalbar arkitektur. Vi har grupperat de 15 principerna efter hur de passar in i avsnitten. Vill du läsa mer om principerna går Elastisys igenom dem i ordning i sin artikel här.

Alla kodsnuttar som visas under den här serien finns tillgänglig på GitHub under elastisys/kubernetes-principles-webinar-series.

{{% note "Principerna i korthet" %}}

{{% column-two %}}

1. Stateful vs. Stateless Controller
2. Secrets vs. Non-secrets
3. Autoscaling
4. Lifecycle Management
5. Probes
6. Signal Handling
7. Fail Hard, Fast, Loud
8. Prepare Application
9. Resource Requests, limits
10. Reservation & prioritization
11. Scheduling requirements
12. Pod Disruption Budget
13. Strategies > stop the world
14. Restrict permissions
15. Limit attack surface

{{% /column-two %}}

{{% /note %}}

{{< distance >}}

## Avsnitt 1
### Introduktion till molnbaserade applikationer och Kubernetes

I detta avsnitt med Gabriel Paues från Safespring och Lars Larsson från Elastisys får du en översikt över molnbaserade applikationer och en introduktion till Kubernetes. Du kommer att lära dig om dess nyckelkomponenter,hur de samverkar för att skapa en skalbar och pålitlig infrastruktur och vad dessa komponenter motsvarar i AWS.

![Avsnitt 2: Hantering av Pods, Deployments och StatefulSets](/img/event/safespring-video-placeholder.svg)

{{< distance >}}



## Avsnitt 2
### Hantering av Pods, Deployments och StatefulSets
Gabriel Paues från Safespring och Lars Larsson från Elastisys ger dig en djupare förståelse för hur Pods, Deployments och StatefulSets fungerar, och hur du kan använda dem för att bygga och skala dina applikationer på Kubernetes. Efter att ha tittat på detta avsnitt kommer du att ha en stark grund i att hantera applikationer som involverar både tillståndslösa och tillståndsbaserade komponenter.

{{< inline "Princip 01" >}} Using Controllers for Pods  
{{< inline "Princip 11" >}} Force co-location of or spreading out Pods as needed  

![Avsnitt 2: Hantering av Pods, Deployments och StatefulSets](/img/event/safespring-video-placeholder.svg)

{{< distance >}}



## Avsnitt 3
### Konfiguration, skalning och containerlivscykel
I detta avsnitt fokuserar Gabriel Paues från Safespring och Lars Larsson från Elastisys på konfiguration och livscykelhantering av containers i Kubernetes. Du lär dig om vikten av att separera hemliga och icke-hemliga konfigurationer samt hur du förbereder en komponent för att både skala ut och skala in på ett kontrollerat och bra sätt.

{{< inline "Princip 02" >}} Separate secret from non-secret configuration  
{{< inline "Princip 14" >}}	Enabling automatic scaling  
{{< inline "Princip 15" >}} Utilizing container lifecycle hooksg

![Avsnitt 2: Hantering av Pods, Deployments och StatefulSets](/img/event/safespring-video-placeholder.svg)

{{< distance >}}



## Avsnitt 4
### Automatisering och övervakning av applikationer
Detta avsnitt lär dig vikten av att förbereda din applikation för observability och hur du implementerar automatisering för att underlätta drift och skalning. Gabriel Paues från Safespring och Lars Larsson från Elastisys täcker ämnen som övervakning, loggning och spårning samt hur du kan använda dessa insikter för att fatta beslut om skalning och resurshantering.

{{< inline "Princip 5" >}} Use probes correctly  
{{< inline "Princip 6" >}} Use signal handling correctly    
{{< inline "Princip 7" >}} Failing hard, fast, and loudly  
{{< inline "Princip 8" >}} Preparing your application for observability

![Avsnitt 2: Hantering av Pods, Deployments och StatefulSets](/img/event/safespring-video-placeholder.svg)

{{< distance >}}



## Avsnitt 5
### Avancerade driftsättningsstrategier och hög tillgänglighet
Detta avsnitt behandlar avancerade driftsättningsstrategier, såsom blue/green och canary deployments. Gabriel Paues från Safespring och Lars Larsson från Elastisys lär dig hur dessa strategier hjälper till att minimera driftstopp och risker under uppdateringar, samt hur du kan garantera hög tillgänglighet för din applikation genom att använda Pod Disruption Budgets och andra tekniker.

{{< inline "Princip 9" >}} Setting Pod resource requests and limits  
{{< inline "Princip 10" >}} Reserving capacity and prioritizing Pods  
{{< inline "Princip 12" >}} Pod Disruption Budget
{{< inline "Princip 13" >}} Strategies > stop the world

![Avsnitt 2: Hantering av Pods, Deployments och StatefulSets](/img/event/safespring-video-placeholder.svg)

{{< distance >}}



## Avsnitt 6
### Säkerhet och begränsningar för Pods och nätverk
I det här avsnittet undersöker Gabriel Paues från Safespring och Lars Larsson från Elastisys säkerhetsaspekter av att köra applikationer på Kubernetes. Du kommer att lära dig om vikten av att begränsa behörigheter och åtkomst för Pods, hur du hanterar nätverkspolicyer och  förbättrar säkerheten för dina applikationer genom att följa bästa praxis.

{{< inline "Princip 14" >}} Restrict permissions
{{< inline "Princip 15" >}} Limit attack surface

![Avsnitt 2: Hantering av Pods, Deployments och StatefulSets](/img/event/safespring-video-placeholder.svg)

{{< distance >}}



## Avsnitt 7
### Sammanfattning och nästa steg
I det sista avsnitt sammanfattar Gabriel Paues från Safespring och Lars Larsson från Elastisys allt material från webbserien och diskuterar ytterligare resurser och rekommendationer för att fortsätta förbättra dina Kubernetes- och molnbaserade applikationer. Vi täcker viktiga lärdomar och tips som hjälper dig att lyckas i din fortsatta resa med att designa, bygga och driftsätta skalbara och robusta applikationer på Kubernetes. Vi går även igenom vad vi anser är bra nästa steg för att öka dina kunskaper inom området.

![Avsnitt 2: Hantering av Pods, Deployments och StatefulSets](/img/event/safespring-video-placeholder.svg)

{{< distance >}}

{{% note "Tveka inte att kontakta oss" %}}
Vi hoppas att denna webbserie, skapad tillsammans med Elastisys, har gett dig insikter och verktyg som gör dig säkrare i att använda Kubernetes för att bygga och hantera dina molnbaserade applikationer. 

Oavsett om du är nybörjare eller erfaren användare av Kubernetes, så finns det alltid nya saker att lära sig och nya tekniker att utforska. Vi uppmuntrar dig att titta på hela webbserien och dela den med dina kollegor och vänner. 

Tillsammans kan vi fortsätta att utveckla och förbättra våra färdigheter för att skapa framtidens molnbaserade applikationer. 

{{< 2calltoaction "Ta kontakt" "/demo" "Läs mer om Kubernetes på Safespring" "/tjanster/compliant-kubernetes" >}}
{{% /note %}}