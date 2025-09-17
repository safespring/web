---
ai: true
title: "Att omfamna förändring: en inblick i Safesprings ingenjörsteams planer för 2025"
date: 2025-02-17
intro: ""
draft: false
tags: ["English"]
showthedate: true
card: "safespring_card_53.webp"
sidebarimage: "safespring_card_53.webp"
eventbild: ""
socialmediabild: ""
language: "sv"
sectiontext: "Blogg"
section: "blogg"
author: "Rob Haverkamp"
TOC: "I det här inlägget"
aliases:
  - /blogg/2025/2024-02-engineering-plans/
  - /blogg/2025/2025-02-engineering-plans/
---
Hej allihopa,

Jag är väldigt glad att få dela några spännande uppdateringar från Safesprings teknikorganisation. Sedan jag tillträdde som Head of Engineering i september 2024 har jag haft förmånen att leda våra team som arbetat oförtrutet för att förbättra vår infrastruktur och våra kapaciteter.

Det är nu nästan 6 månader sedan jag tog den här rollen och jag är otroligt glad att idag få dela många spännande nyheter och insikter!

{{% accordion title="TL;DR" %}}
Vill du ha den korta versionen? Safesprings ingenjörsteam tar stora steg under 2025!

- Efter en stor övergång från Red Hat till Ubuntu är migreringen i STO1 nästan klar.
- STO2 utvecklas också från en backupsite till ett fullt beräkningscenter, med stöd för nya GPU-funktioner när Nvidia A2‑GPU:er lanseras i april.
- Safespring utvecklar dessutom en skalbar Kubernetes‑PaaS på Talos Linux, planerad för lansering 2026, med alfa‑testning inom kort.

Dessa uppgraderingar förstärker Safesprings åtagande för öppna, suveräna och regelefterlevande molnlösningar.
{{% /accordion %}}
{{< accordion-script >}}

### **STO1 – lärdomar**

Historiskt har Safespring varit en stor användare av Red Hat‑ekosystemet. Alla våra molnlösningar har byggts ovanpå Red Hat‑ eller CentOS‑system. Vi drabbades hårt av Red Hats beslut[^1] och känner fortfarande av konsekvenserna.

Vi har gradvis migrerat våra molnlösningar till Ubuntu‑ekosystemet. Det har varit krävande att underhålla två versioner av våra lösningar parallellt och samtidigt migrera. Hittills i år har vi haft sex planerade underhållsfönster för ett av våra datacenter i Stockholm (STO1). Den här veckan är ytterligare två tillfällen inplanerade, och därefter har vi helt lämnat Red Hat‑ekosystemet.

### **Upprensning och uppskalning i Stockholm**

Ett av våra större initiativ har varit att rensa ut äldre infrastruktur i vårt andra datacenter i Stockholm (STO2). Det handlar inte bara om städning; det handlar om att lägga en robust grund för framtida tillväxt. Vi tömmer två hela rack med hårdvara och cirka 450 hårddiskar, för att bana väg för vår nya beräkningsplattform. Dessutom lägger vi till ett nytt publikt nät med 2×10 GbE‑kapacitet, vilket ytterligare förbättrar vår uppkoppling och prestanda.

Detta arbete behövs för vår första spännande nyhet. Vi bygger en andra beräkningssite i Stockholm. Historiskt har STO1 varit vår compute‑site medan STO2 varit vår arkiv- och backupsite. Mycket snart kommer det inte längre att vara fallet!

### **Stärker våra GPU‑ och AI‑kapaciteter**

Safespring är en stor partner i initiativet European Open Science Cloud (EOSC)[^2]. Tillsammans med PSNC är vi leverantörer av infrastruktur och PaaS. Under 2024 introducerade vi Nvidia H100‑kapacitet, specifikt för EOSC.

Efterfrågan har varit enorm. Vi har lyssnat på våra kunder och gör stora investeringar för att möta behovet.

{{< quote "Rob – Ingenjörschef" >}}Jag är glad att kunna meddela att vi lägger till Nvidia A2‑GPU:er i vår infrastruktur, vilket möjliggör avancerade beräkningsuppgifter såsom maskininlärning och dataanalys. {{< /quote >}}

Dessa GPU:er blir tillgängliga från början av april i vår nya beräkningssite STO2. Under 2025 kommer vi att fortsätta bygga ut dessa möjligheter genom att introducera dem i STO1 och vårt datacenter i Oslo (OSL2).

### **Bygger en skalbar Kubernetes‑PaaS**

Vi stannar inte vid infrastrukturen. Vi utvecklar också en [mycket skalbar Kubernetes‑plattform som tjänst (PaaS)](/services/containerplatform/) ovanpå Talos Linux[^3]. Detta initiativ ger kunderna möjlighet att enkelt distribuera, hantera och skala containeriserade applikationer. Talos Linux, känt för sin säkerhet och effektivitet, kommer att utgöra en stabil bas för våra Kubernetes‑erbjudanden och säkerställa att vår PaaS är både kraftfull och säker.

En av våra nyckelfunktioner är att vi kan erbjuda detta både i våra publika molnsiter och i våra privata molnsiter som vi driver åt kunder.

Vi siktar på att lansera plattformen 2026, men vi letar redan snart efter alfa‑testare. Om du är intresserad av tidig åtkomst och vill hjälpa oss att forma plattformens framtid, håll utkik efter mer information om hur du kan delta[^4].

### **Framåt**

Jag är otroligt stolt över att arbeta för ett företag med så varierade och betydelsefulla kunder. 2025 är ett år med stora investeringar och utmanande projekt för Safespring. Jag ser fram emot att ta oss igenom det tillsammans med våra mycket skickliga team och säkerställa att vi levererar de bästa öppna, suveräna och regelefterlevande molnlösningarna till våra kunder.

## Länkar

Fördjupa dig med följande länkar.

[^1]: **Red Hat.** _CentOS Linux End of Life (EOL_). Red Hat förklarar övergången bort från CentOS Linux, vad det innebär för användare och vilka alternativ som finns framåt. Hämtad 17 februari 2025 från [redhat.com](https://www.redhat.com/en/topics/linux/centos-linux-eol).

[^2]: **Safespring och EOSC.** En kort översikt över Safesprings engagemang i European Open Science Cloud. Hämtad 17 februari 2025 från [EOSC Safespring](/eosc/).

[^3]: **Talos Linux.** _Ett modernt och säkert Kubernetes‑OS._ Talos Linux är ett minimalt, oföränderligt operativsystem utformat för Kubernetes, med fokus på säkerhet och automation. Hämtad 17 februari 2025 från https://www.talos.dev/.

[^4]: **Safespring Container platform.** Tjänstebeskrivning av vår containerplattform. Hämtad 17 februari 2025 från [safespring.com/containerplatform](/services/containerplatform/)