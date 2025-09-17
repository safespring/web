---
ai: true
title: "Når du vil, har brug for eller bliver tvunget til at forlade en amerikansk cloududbyder"
date: 2025-03-26
intro: "Uanset hvorfor du går, står du over for Exit-dilemmaet."
draft: false
tags: ["English"]
showthedate: true
card: "safespring_card_54.svg"
eventbild: ""
socialmediabild: ""
language: "da"
sectiontext: "Blog"
section: "blog"
author: "Daniel Melin"
aliases:
  - /blogg/2025/2025-03-exit-strategy/
---
{{< ingress >}}
I dagens geopolitiske landskab, hvor USA hurtigt forsøger at blive mere som Kina og Rusland, står kunder hos amerikanske cloududbydere over for svære beslutninger.
{{< /ingress >}}

**Vil du forlade dem?** Måske føler du, at USA er gået for langt i at ødelægge sit demokrati, eller at tingene generelt er ved at køre af sporet.

**Er du nødt til at forlade dem?** Måske kræver din kunde, at din tjeneste er fri for amerikanske forbindelser, dine medarbejdere nægter at arbejde med amerikanske cloududbydere, eller Trans-Atlantic Data Privacy Framework forsvinder. Hvis du er i den offentlige sektor eller primært sælger til den offentlige sektor, kan det være nødvendigt at revurdere, om du kan lagre og behandle personoplysninger og/eller fortrolige oplysninger.

**Er du tvunget til at forlade dem?** Måske har Trump besluttet, at din organisation, dit land eller dit kontinent er MEGET DÅRLIGT og derfor ikke længere vil have adgang til amerikanske cloudtjenester, eller at toldsatser gør cloudtjenesterne for dyre at bruge.

Uanset hvorfor du forlader dem, står du over for Exit-dilemmaet.

{{% note "Exit-processen" %}}
Her er en liste over nogle af de ting, du kan overveje i Exit-processen:

1. Dokumentér, hvilke amerikanske cloudtjenester du bruger.
2. Dokumentér, hvilke typer tjenester du køber. IaaS, PaaS, SaaS eller andet XaaS?
3. Dokumentér, hvilke typer data der lagres og behandles i tjenesterne.
4. Prøv at læse kontrakten/kontrakterne. De er dog ofte meget lange, meget komplekse, meget kundeuvenlige og ikke altid fuldstændige.
   1. Hvilke rettigheder har du til dine data og metadata?
   1. Kan du udtrække alt?
   1. I hvilke formater kan du få data og metadata?
   1. Er det muligt at genbruge data og metadata uden tab?
5. Hvis du bruger compute-instanser og S3-lagring, bør processen være ret ligetil, og der bør ikke være noget datatab.
6. Hvis du bruger Kubernetes og containere, er der nogle faldgruber, men du bør kunne migrere uden datatab.
7. Hvis du er udvikleren bag en SaaS, der bruger andres IaaS/PaaS, vil dine muligheder variere meget afhængigt af, hvor låst du er til funktioner, der kun findes hos én cloududbyder. I så fald kan det være nødvendigt at ændre din applikation, så den kan køre i ethvert standard-cloudmiljø. Det vil under alle omstændigheder være en fordel for dig på den lange bane. :)
8. Netværk er nøglen. Når man migrerer mellem platforme, er det vigtigt at kunne håndtere overgangen. Det kan gøres ved at etablere et overlay-netværk, der spænder over begge platforme. På den måde kan hver funktion migreres med minimal påvirkning.

{{% /note %}}

Uanset din situation, så tal med os hos Safespring, og vi guider dig gennem din Exit.

{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Daniel Melin" %}}
Jeg er Safesprings Business Development Manager. Uanset om du er interesseret i at indkøbe vores tjenester eller vil høre mere om initiativer som EuroStack, er jeg her for at hjælpe dig med at navigere og udnytte vores tilbud.

{{< inline "Ring" >}} +46 (0)76 868 00 59
[daniel.melin@safespring.com](mailto:daniel.melin@safespring.com)
{{% /custom-card %}}