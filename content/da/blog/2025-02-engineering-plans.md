---
ai: true
title: "At omfavne forandring: Et indblik i Safesprings engineeringteams planer for 2025"
date: 2025-02-17
intro: ""
draft: false
tags: ["English"]
showthedate: true
card: "safespring_card_53.webp"
sidebarimage: "safespring_card_53.webp"
eventbild: ""
socialmediabild: ""
language: "da"
sectiontext: "Blog"
section: "blog"
author: "Rob Haverkamp"
TOC: "I dette indlæg"
aliases:
  - /blogg/2025/2024-02-engineering-plans/
  - /blogg/2025/2025-02-engineering-plans/
---
Hej alle sammen,

Jeg er begejstret for at dele nogle spændende opdateringer fra Safesprings ingeniørafdeling. Siden jeg blev Head of Engineering i september 2024, har jeg haft privilegiet at lede vores teams, som har arbejdet utrætteligt på at forbedre vores infrastruktur og kapaciteter.

Det er nu næsten 6 måneder siden, jeg tiltrådte rollen, og jeg er utrolig glad for at kunne dele mange spændende nyheder og indsigter i dag!

{{% accordion title="TL;DR" %}}
Vil du have den korte version? Safesprings engineering-team tager store skridt i 2025!

- Efter en større overgang fra Red Hat til Ubuntu er migreringen i STO1 næsten fuldført.
- STO2 udvikler sig også fra at være et backup-site til et fuldt compute-center og understøtter nye GPU-kapaciteter med Nvidia A2 GPU’er, som lanceres i april.
- Safespring udvikler desuden en skalerbar Kubernetes PaaS på Talos Linux med planlagt lancering i 2026 og tidlig alpha-test snart.

Disse opgraderinger understreger Safesprings engagement i åbne, suveræne og compliant cloudløsninger.
{{% /accordion %}}
{{< accordion-script >}}

### **STO1 – erfaringer**

Historisk har Safespring været en storbruger af Red Hat-økosystemet. Alle vores cloudløsninger var bygget oven på Red Hat- eller CentOS-systemer. Vi blev hårdt ramt af beslutningerne fra Red Hat, og vi mærker stadig konsekvenserne af dette.

Vi har gradvist migreret vores cloudløsninger til Ubuntu-økosystemet. Det har været en stor belastning at vedligeholde to versioner af vores løsninger parallelt og samtidig migrere. Indtil nu har vi haft 6 planlagte vedligeholdelsesvinduer for et af vores datacentre i Stockholm (STO1) i år. I denne uge er der planlagt yderligere to hændelser, og derefter har vi fuldstændig forladt Red Hat-økosystemet.

### **Oprydning og skalering i Stockholm**

En af vores større initiativer har været oprydning i legacy-infrastruktur i vores andet datacenter i Stockholm (STO2). Det handler ikke kun om oprydning; det handler om at lægge et robust fundament for fremtidig vækst. Vi rydder to hele racks for hardware og cirka 450 HDD’er for at gøre plads til vores nye compute-platform. Derudover tilføjer vi et nyt offentligt netværk med 2×10GbE kapacitet, hvilket yderligere forbedrer vores forbindelser og ydeevne.

Dette arbejde er nødvendigt for den første spændende nyhed. Vi bygger et andet compute-site i Stockholm. Historisk har STO1 været vores compute-site, mens STO2 har været vores arkiv- og backup-site. Meget snart bliver det ikke længere tilfældet!

### **Styrkelse af vores GPU- og AI-kapaciteter**

Safespring er en stor partner i initiativet European Open Science Cloud (EOSC) [^2]. Sammen med PSNC er vi infrastruktur- og PaaS-leverandører. I 2024 introducerede vi Nvidia H100-kapaciteter, specifikt for EOSC.

Efterspørgslen har været enorm. Vi har lyttet til vores kunder og investerer massivt for at følge med.

{{< quote "Rob – Engineeringchef" >}}Jeg er begejstret for at kunne annoncere, at vi tilføjer Nvidia A2 GPU’er til vores infrastruktur, hvilket muliggør avancerede beregningsopgaver som machine learning og dataanalyse. {{< /quote >}}

Disse GPU’er vil være tilgængelige fra begyndelsen af april på vores nye compute-site STO2. I løbet af 2025 vil vi fortsætte med at udvide disse kapaciteter ved at introducere dem i STO1 og vores datacenter i Oslo (OSL2).

### **Opbygning af en skalerbar Kubernetes PaaS**

Vi stopper ikke ved infrastrukturen. Vi udvikler også en [meget skalerbar Kubernetes Platform-as-a-Service (PaaS)](/services/containerplatform/) oven på Talos Linux[^3]. Dette initiativ vil give kunder mulighed for nemt at udrulle, administrere og skalere containeriserede applikationer. Talos Linux, kendt for sin sikkerhed og effektivitet, vil være et solidt fundament for vores Kubernetes-tilbud og sikre, at vores PaaS både er kraftfuld og sikker.

En af vores nøglefordele er, at vi kan tilbyde dette både i vores offentlige cloud-sites og i vores private cloud-sites, som vi drifter for kunder.

Vi sigter mod at lancere platformen i 2026, men vi er allerede på udkig efter alpha-testere snart. Hvis du er interesseret i tidlig adgang og i at hjælpe os med at forme platformens fremtid, så hold øje med mere information om, hvordan du kan være med[^4].

### **Blik fremad**

Jeg er utrolig stolt af at arbejde for en virksomhed med så mangfoldige og betydningsfulde kunder. 2025 bliver et år med store investeringer og udfordrende projekter for Safespring. Jeg ser frem til at komme igennem det sammen med vores utroligt dygtige teams og sikre, at vi leverer de bedste åbne, suveræne og compliant cloudløsninger til vores kunder.

## Links

Dyk dybere ned i informationen med disse links.

[^1]: **Red Hat.** _CentOS Linux – slut på levetiden (EOL)._ Red Hat forklarer udfasningen af CentOS Linux, hvad det betyder for brugere, og alternative muligheder fremadrettet. Hentet 17. februar 2025 fra [redhat.com](https://www.redhat.com/en/topics/linux/centos-linux-eol).

[^2]: **Safespring og EOSC.** Kort kig på Safesprings engagement i European Open Science Cloud. Hentet 17. februar 2025 fra [EOSC Safespring](/eosc/).

[^3]: **Talos Linux.** _A Modern Secure Kubernetes OS._ Talos Linux er et minimalt, uforanderligt operativsystem designet til Kubernetes med fokus på sikkerhed og automatisering. Hentet 17. februar 2025 fra https://www.talos.dev/.

[^4]: **Safespring Container platform.** Servicetypebeskrivelse af vores containerplatform. Hentet 17. februar 2025 fra [safespring.com/containerplatform](/services/containerplatform/)