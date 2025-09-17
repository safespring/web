---
ai: true
title: "Å omfavne endringer: Et innblikk i Safesprings tekniske planer for 2025"
date: 2025-02-17
intro: ""
draft: false
tags: ["English"]
showthedate: true
card: "safespring_card_53.webp"
sidebarimage: "safespring_card_53.webp"
eventbild: ""
socialmediabild: ""
language: "nb"
sectiontext: "Blogg"
section: "blogg"
author: "Rob Haverkamp"
TOC: "I dette innlegget"
aliases:
  - /blogg/2025/2024-02-engineering-plans/
  - /blogg/2025/2025-02-engineering-plans/
---
Hei alle sammen,

Jeg er veldig glad for å kunne dele noen spennende oppdateringer fra Safesprings ingeniøravdeling. Siden jeg ble leder for ingeniøravdelingen i september 2024, har jeg hatt privilegiet av å lede teamene våre som har jobbet iherdig for å forbedre infrastrukturen og kapasitetene våre.

Det er nå snart seks måneder siden jeg tok på meg denne rollen, og jeg er utrolig glad for å kunne dele mange spennende kunngjøringer og innsikter i dag!

{{% accordion title="TL;DR" %}}
Vil du ha kortversjonen? Safesprings ingeniørteam gjør store grep i 2025!

- Etter en stor overgang fra Red Hat til Ubuntu er migreringen i STO1 nesten fullført.
- STO2 utvikles også fra et backup‑site til et fullt beregningssenter, med støtte for nye GPU‑kapabiliteter – Nvidia A2‑GPUer kommer i april.
- Safespring utvikler også en skalerbar Kubernetes‑PaaS på Talos Linux, planlagt for 2026, med alfa‑testing snart.

Disse oppgraderingene understreker Safesprings forpliktelse til åpne, suverene og regelverkskompatible skyløsninger.
{{% /accordion %}}
{{< accordion-script >}}

### **STO1 – lærdommer**

Historisk sett har Safespring vært en stor bruker av Red Hat‑økosystemet. Alle skyløsningene våre var bygget på Red Hat‑ eller CentOS‑systemer. Vi ble hardt rammet av beslutningene fra Red Hat[^1], og kjenner fortsatt konsekvensene av dette.

Vi har gradvis migrert skyløsningene våre til Ubuntu‑økosystemet, og det har kostet mye å vedlikeholde to versjoner i parallell under migreringen. Så langt i år har vi hatt seks vedlikeholdsvinduer for ett av datasentrene våre i Stockholm (STO1). Denne uken er to nye hendelser planlagt, og deretter er vi helt ute av Red Hat‑økosystemet.

### **Opprydding og skalering i Stockholm**

Et av våre viktigste initiativer har vært oppryddingen av eldre infrastruktur i vårt andre datasenter i Stockholm (STO2). Dette handler ikke bare om å rydde; det handler om å legge et robust fundament for fremtidig vekst. Vi rydder ut to fulle rack med maskinvare og omtrent 450 HDD‑er for å gi plass til vår nye compute‑plattform. I tillegg legger vi til et nytt offentlig nettverk med 2x10GbE kapasitet, som ytterligere forbedrer tilkobling og ytelse.

Dette arbeidet er nødvendig for den første spennende kunngjøringen. Vi bygger et nytt beregningssenter i Stockholm. Historisk har STO1 vært beregningssenteret vårt, mens STO2 har vært arkiv‑ og backup‑sitet. Snart blir det ikke slik lenger!

### **Styrking av våre GPU‑ og AI‑kapasiteter**

Safespring er en stor partner i European Open Science Cloud (EOSC)[^2]. Sammen med PSNC er vi infrastruktur‑ og PaaS‑leverandører. I løpet av 2024 introduserte vi Nvidia H100‑kapasitet, spesielt for EOSC.

Etterspørselen har vært enorm. Vi har lyttet til kundene våre og gjør store investeringer for å holde tritt.

{{< quote "Rob – leder for ingeniøravdelingen" >}}Jeg er begeistret for å kunne fortelle at vi legger til Nvidia A2‑GPUer i infrastrukturen vår, noe som muliggjør avanserte beregningsoppgaver som maskinlæring og dataanalyse.{{< /quote >}}

Disse GPU‑ene blir tilgjengelige fra tidlig i april i vårt nye beregningssenter STO2. Gjennom 2025 vil vi fortsette å utvide disse kapasitetene ved å introdusere dem i STO1 og datasenteret vårt i Oslo (OSL2).

### **Bygge en skalerbar Kubernetes‑PaaS**

Vi stopper ikke ved infrastrukturen. Vi utvikler også en [svært skalerbar Kubernetes Platform‑as‑a‑Service (PaaS)](/services/containerplatform/) på toppen av Talos Linux[^3]. Dette initiativet vil gi kundene mulighet til å distribuere, administrere og skalere containeriserte applikasjoner med letthet. Talos Linux, kjent for sikkerhet og effektivitet, gir et solid fundament for våre Kubernetes‑tilbud og sikrer at PaaS‑en vår er både kraftig og sikker.

En av våre nøkkelfunksjoner er at vi kan tilby dette både i våre offentlige skysentre og i private skysentre som vi drifter for kunder.

Vi tar sikte på å lansere denne plattformen i 2026, men vi ser allerede etter alfa‑testere. Hvis du er interessert i tidlig tilgang og vil hjelpe oss å forme fremtiden til denne plattformen, følg med for mer informasjon om hvordan du kan bli med[^4].

### **Veien videre**

Jeg er utrolig stolt over å jobbe for et selskap med så mangfoldige og meningsfulle kunder. 2025 er et år med store investeringer og krevende prosjekter for Safespring. Jeg ser frem til å komme gjennom dette sammen med våre utrolig dyktige team og sørge for at vi leverer de beste åpne, suverene og regelverkskompatible skyløsningene til kundene våre.

## Lenker

Fordyp deg i mer informasjon via disse lenkene.

[^1]: **Red Hat.** _CentOS Linux End of Life (EOL_). Red Hat forklarer overgangen bort fra CentOS Linux, hva det betyr for brukere og alternative muligheter videre. Hentet 17. februar 2025 fra [redhat.com](https://www.redhat.com/en/topics/linux/centos-linux-eol).

[^2]: **Safespring og EOSC.** En kort titt på Safesprings engasjement i European Open Science Cloud. Hentet 17. februar 2025 fra [EOSC Safespring](/eosc/).

[^3]: **Talos Linux.** _A Modern Secure Kubernetes OS._ Talos Linux er et minimalt, uforanderlig operativsystem designet for Kubernetes, med fokus på sikkerhet og automatisering. Hentet 17. februar 2025 fra https://www.talos.dev/.

[^4]: **Safespring Container platform.** Tjenestebeskrivelse av containerplattformen vår. Hentet 17. februar 2025 fra [safespring.com/containerplatform](/services/containerplatform/)