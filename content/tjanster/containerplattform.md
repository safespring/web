---
title: "Kör Kubernetes och Open Shift på optimerade servrar"
language: "Se"
cardtitle: "Containerplattform"
cardintro: "Blixtsnabb NVMe-lagring och optimerad nätverksdesign anpassade för containers."
cardicon: "fa-solid fa-container-storage"
cardcolor: "#3C9BCD"
cardorder: "3"
date: 2019-01-07T13:58:58+01:00
draft: false
section: "Public Cloud"
intro: "Blixtsnabb NVMe-lagring och optimerad nätverksdesign anpassade för containers. Hantera dem själv eller köp som managerad tjänst."
background: "safespring-kubernetes-background.svg"
card: ""
socialmedia: "safespring_social_01.jpg"
sidebarlinkname: "Kom igång"
sidebarlinkurl: "/demo"
sidebarlinkname2: "Läs Solution Brief"
sidebarlinkurl2: "#"
---

![Safespring benefits](/img/graphics/safespring-containerplatform-se.svg)

## Kraftfulla virtuella servrar med NVMe

{{< ingress >}}
NVMe är ett höghastighetsgränssnitt för lagring som erbjuder snabbare åtkomsttider och lägre latency jämfört med traditionella lagringstekniker. 
{{< /ingress >}}

Det är ett utmärkt val för användning i etcd, en distribuerad och konsistent nyckellagringstjänst som är grundläggande för Kubernetes. Etcd används för att lagra data över ett kluster av maskiner och är användbart för att lagra och hämta konfigurationsdata, samordning mellan tjänster och lagring av metadata. 

Genom att använda NVMe-lagring för etcd förbättras prestanda och tillförlitlighet i systemet, så att det kan hantera stora mängder data och trafik med lätthet samtidigt som det stödjer Kubernetes kraftfulla containerhantering.

## Safesprings nätverksmodell är optimal för containerplattformar

Safespring är en produkt som erbjuder en effektiv och hög tillgänglig nätverksstack som använder BGP (Border Gateway Protocol). Det här gör att Safespring kan erbjuda en effektiv lastbalansering med hjälp av Equal cost multipath routing och Elastic IP (ECMP).

En annan fördel med Safespring är den skalbara nätverksimplementationen, där det inte finns några centrala kontrollnoder. Det här gör att nätverket är mer robust och driftsäkert.

Safespring erbjuder även IP-till-IP konnektivitet på lager 3, vilket innebär att det finns möjlighet för en direkt koppling mellan två IP-adresser. Detta gör det enklare att bygga en robust nätverkslösning utan "single point of failure".

Tack vare Elastic IP fungerar Safespring som en basfunktion för att bygga lastbalanserare. Dessutom erbjuder Safespring verktygen för att bygga högt tillgängliga lösningar, där det inte finns någon enda svag punkt i nätverket.

Sammanfattningsvis har Safespring en effektiv nätverksstack, en skalbar nätverksimplementation, IP-till-IP konnektivitet och tillhandahåller verktyg för att bygga högt tillgängliga lösningar, vilket gör det till en attraktiv produkt för de som vill bygga robusta och driftsäkra nätverk.

## Kör Kubernetes som en tjänst på Safespring

Med styrkan av Safesprings infrastruktur har våra partners byggt kraftfulla managerade tjänster. Låt era tekniker managera era tjänster och låt oss fokusera på infrastrukturen och plattformslagret. 

{{< custom-card image="/img/graphics/compliant-kubernetes-on-safespring.svg" text="Kör Kubernetes som en tjänst. Med omfattande säkerhetsmekanismer är Compliant Kubernetes en helhetslösning för säker hantering av ert behov av Kubernetes." cardtitle="Compliant Kubernetes som managerad tjänst på Safespring" linktext="Kom igång!" link="/tjanster/compliant-kubernetes/" >}}
 