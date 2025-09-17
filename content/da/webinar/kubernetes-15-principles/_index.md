---
ai: true
title: "Design og udrulning af skalerbare applikationer på Kubernetes"
language: "da"
date: "2023-09-18"
publishDate: "2023-09-18"
draft: false
tags: ["Svenska"]
card: "safespring-gabriel-lars.jpg"
eventbild: ""
socialmediabild: ""
intro: "I denne webserie vil vi udforske, hvordan man designer og driftsætter skalerbare applikationer på Kubernetes."
partner: ""
audience: "SaaS"
explorer: ""
sidebarlinkurl: ""
sidebarlinkname: ""
sidebarimage: ""
nosidebar: "usynlig"
toc: "Afsnit"
section: "Webinar"
aliases:
  - /kubernetes-webcast
  - /webinar/kubernetes-15-principles/
---
{{< ingress >}}
I denne webserie vil vi gennemgå Elastisys principper for at få mest muligt ud af Kubernetes og drage maksimal nytte af dets fordele.
{{< /ingress >}}

Hvert afsnit behandler specifikke emner og giver dig indsigt i, hvordan du kan forbedre dine DevOps-processer og skabe en mere robust og skalerbar arkitektur. Vi har grupperet de 15 principper efter, hvordan de passer ind i afsnittene. Vil du læse mere om principperne, går Elastisys dem igennem i rækkefølge i sin artikel her.

Alle kodeeksempler, der vises i denne serie, er tilgængelige på GitHub under elastisys/kubernetes-principles-webinar-series.

{{% note "Principperne kort fortalt" %}}

{{% column-two %}}

1. Tilstandsbærende vs. tilstandsløs controller
2. Secrets vs. ikke-secrets
3. Autoskalering
4. Livscyklusstyring
5. Prober
6. Signalhåndtering
7. Fejl hårdt, hurtigt og højtlydt
8. Forbered applikationen
9. Resource requests og limits
10. Reservation og prioritering
11. Planlægningskrav
12. Pod Disruption Budget
13. Strategier > stop-the-world
14. Begræns tilladelser
15. Begræns angrebsfladen

{{% /column-two %}}

{{% /note %}}

{{< distance >}}

## Afsnit 1

### Introduktion til skybaserede applikationer og Kubernetes

I dette afsnit med Gabriel Paues fra Safespring og Lars Larsson fra Elastisys får du et overblik over skybaserede applikationer og en introduktion til Kubernetes. Du lærer om dets nøglekomponenter, hvordan de arbejder sammen for at skabe en skalerbar og pålidelig infrastruktur, og hvad disse komponenter svarer til i AWS.

{{< distance >}}

## Afsnit 2

### Håndtering af Pods, Deployments og StatefulSets

Gabriel Paues fra Safespring og Lars Larsson fra Elastisys giver dig en dybere forståelse af, hvordan Pods, Deployments og StatefulSets fungerer, og hvordan du kan bruge dem til at bygge og skalere dine applikationer på Kubernetes. Efter at have set dette afsnit vil du have et solidt grundlag i at håndtere applikationer, der involverer både tilstandsløse og tilstandsbærende komponenter.

{{< inline "Princip 01" >}} Brug controllere til Pods  
{{< inline "Princip 11" >}} Gennemtving samplacering eller spredning af Pods efter behov

{{< distance >}}

## Afsnit 3

### Konfiguration, skalering og containerlivscyklus

I dette afsnit fokuserer Gabriel Paues fra Safespring og Lars Larsson fra Elastisys på konfiguration og livscyklusstyring af containere i Kubernetes. Du lærer om vigtigheden af at adskille hemmelige og ikke-hemmelige konfigurationer samt hvordan du forbereder en komponent til både at skalere ud og skalere ind på en kontrolleret og god måde.

{{< inline "Princip 02" >}} Adskil hemmelige og ikke-hemmelige konfigurationer  
{{< inline "Princip 14" >}} Muliggør automatisk skalering  
{{< inline "Princip 15" >}} Udnyt containerens livscyklus-hooks

{{< distance >}}

## Afsnit 4

### Automatisering og overvågning af applikationer

Dette afsnit lærer dig vigtigheden af at forberede din applikation til observability og hvordan du implementerer automatisering for at lette drift og skalering. Gabriel Paues fra Safespring og Lars Larsson fra Elastisys dækker emner som overvågning, logning og tracing samt hvordan du kan bruge disse indsigter til at træffe beslutninger om skalering og ressourcehåndtering.

{{< inline "Princip 5" >}} Brug prober korrekt  
{{< inline "Princip 6" >}} Brug signalhåndtering korrekt  
{{< inline "Princip 7" >}} Fejl hårdt, hurtigt og højtlydt  
{{< inline "Princip 8" >}} Forbered din applikation til observability

{{< distance >}}

## Afsnit 5

### Avancerede udrulningsstrategier og høj tilgængelighed

Dette afsnit behandler avancerede udrulningsstrategier såsom blue/green og canary deployments. Gabriel Paues fra Safespring og Lars Larsson fra Elastisys lærer dig, hvordan disse strategier hjælper med at minimere nedetid og risici under opdateringer, samt hvordan du kan garantere høj tilgængelighed for din applikation ved at bruge Pod Disruption Budgets og andre teknikker.

{{< inline "Princip 9" >}} Angiv resource requests og limits for Pods  
{{< inline "Princip 10" >}} Reserver kapacitet og prioriter Pods  
{{< inline "Princip 12" >}} Pod Disruption Budget
{{< inline "Princip 13" >}} Strategier > stop-the-world

{{< distance >}}

## Afsnit 6

### Sikkerhed og begrænsninger for Pods og netværk

I dette afsnit undersøger Gabriel Paues fra Safespring og Lars Larsson fra Elastisys sikkerhedsaspekter ved at køre applikationer på Kubernetes. Du lærer om vigtigheden af at begrænse tilladelser og adgang for Pods, hvordan du håndterer netværkspolitikker, og hvordan du forbedrer sikkerheden for dine applikationer ved at følge best practices.

{{< inline "Princip 14" >}} Begræns tilladelser
{{< inline "Princip 15" >}} Begræns angrebsfladen

{{< distance >}}

## Afsnit 7

### Opsummering og næste skridt

I det sidste afsnit opsummerer Gabriel Paues fra Safespring og Lars Larsson fra Elastisys alt materialet fra webserien og diskuterer yderligere ressourcer og anbefalinger for at fortsætte med at forbedre dine Kubernetes- og skybaserede applikationer. Vi dækker vigtige læringer og tips, der hjælper dig med at få succes i din fortsatte rejse med at designe, bygge og udrulle skalerbare og robuste applikationer på Kubernetes. Vi gennemgår også, hvad vi mener er gode næste skridt for at øge dine kundskaber inden for området.

{{< distance >}}

{{% note "Tøv ikke med at kontakte os" %}}
Vi håber, at denne webserie, skabt sammen med Elastisys, har givet dig indsigter og værktøjer, der gør dig mere tryg ved at bruge Kubernetes til at bygge og håndtere dine skybaserede applikationer.

Uanset om du er nybegynder eller erfaren bruger af Kubernetes, er der altid nye ting at lære og nye teknikker at udforske. Vi opfordrer dig til at se hele webserien og dele den med dine kolleger og venner.

Sammen kan vi fortsætte med at udvikle og forbedre vores færdigheder for at skabe fremtidens skybaserede applikationer.

{{< 2calltoaction "Kontakt os" "/demo" "Læs mere om Kubernetes hos Safespring" "/services/compliant-kubernetes" >}}
{{% /note %}}