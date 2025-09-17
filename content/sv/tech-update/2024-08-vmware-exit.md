---
ai: true
title: "Hur tar man sig ur VMware-fällan?"
date: 2024-08-30
intro: "VMware-användare fick sin värld vänd upp och ner när Broadcom beslutade att snabbt ändra användarvillkoren för VMware-programvaran år 2024."
draft: false
section: "Teknisk uppdatering"
author: "Jarle Bjørgeengen"
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "sv"
aliases:
  - /blogg/2024/2024-08-vmware-exit/
---
{{< ingress >}}
Broadcoms förvärv av VMware har haft betydande effekter för kunderna,
vilket skapat oro och fått vissa att överväga alternativ. Detta inlägg
tar upp dessa utmaningar och beskriver en lösning på dem.
{{< /ingress >}}

Dessa förändringar, efter Broadcoms förvärv av VMware, har lett till högre långsiktiga
kostnader för många kunder, särskilt mindre företag som kan se dramatiska
ökningar av sina årliga förnyelseavgifter.

{{% note "Viktigaste effekterna av Broadcoms förvärv av VMware" %}}

1. Övergång från perpetuella licenser till en prenumerationsbaserad modell.
2. Avskaffade den kostnadsfria versionen av VMwares vSphere Hypervisor (ESXi).
3. Införde prishöjningar, där vissa kunder rapporterar 5–10 gånger högre kostnader.
   {{% /note %}}

## Bakgrund

VMware var ett ledande mjukvaruföretag inom teknik för virtualisering av lokala
datacenter som skapar ett abstraktionslager ovanpå datorhårdvara. På många sätt
banade VMware väg för användningen av virtuella servrar ovanpå "common off the
shelf" (COTS) Intel-baserad serverhårdvara under 2000-talet. De blev
förstahandsvalet för många arbetslaster i lokala datacenter, även om andra och
mindre kända alternativ fanns och finns.

## Safesprings alternativ

Safespring använder open source-projekten OpenStack och CEPH för att bygga IaaS
(Infrastructure as a Service) i produktionsklass på flera fysiska
datacenterplatser i Norden. I grunden handlar både VMware och OpenStack om att
hantera virtuella maskiner (VM:er), så Safespring borde vara ett utmärkt
alternativ till VMware, eller hur? Tja, som alltid: det beror på! Framför allt
beror det på din förmåga och motivation att automatisera hanteringen av
infrastruktur och operativsystem.

Traditionellt har VMware och specialiserade verktygsföretag tillhandahållit
verktyg för att först migrera fysiska maskiner till virtuella maskiner med hjälp
av avbildningstekniker för hårddiskarna (P2V) och därefter använda virtuella
diskavbilder som ett sätt att hantera uppgraderingar och migreringar.

Även om detta kan verka som ett bra angreppssätt på kort sikt menar vi att det
bara skjuter upp behovet av att hantera VM:er, diskar och nätverk separat från
VM:ernas operativsystem och med verktyg för operativsystemskonfiguration som
Cfengine, Puppet och Chef samt orkestreringsverktyg som Salt och Ansible, ofta
kallat "infrastructure as code" eller IAC. Detta angreppssätt möjliggör att IAC
hanteras med samma typ av versionshanteringssystem som används i molnnativ
applikationsutveckling, vilket förbättrar flexibilitet, stabilitet och
automatiseringsgrad även på infrastruktursidan.

Så, för att vara uppriktig: nyttan av en IaaS-tjänst som ersättning för VMware
eller liknande lokala verktyg för virtuell infrastrukturhantering beror i hög
grad på viljan och förmågan att automatisera och hantera
infrastrukturprovisionering, operativsystemskonfiguration (inklusive
driftsättning av arbetslaster) och tillståndshantering (datadumpar,
objektlagring, säkerhetskopior osv.) separat från VM-avbilder och snapshots. Om
du redan hanterar dina VMware-arbetslaster på detta sätt kan Safespring nästan
fungera som en drop-in-ersättning genom att endast skriva om
infrastrukturkoden, med till exempel våra community-baserade
[Terraform-moduler][tfmodulesblog].

Du kan förstås testa OpenStack på egen hand, enligt OpenStacks open
source-projektbeskrivning av ["Migrating from VMware to OpenStack: Optimizing
your Infrastructure to Save Money and Avoid Vendor-Lock-in"][openstackmig].
Men om du söker ett alternativ med minsta möjliga insats, varför inte helt
enkelt köpa en hanterad tjänst och låta proffsen sköta den något komplexa
uppgiften att drifta OpenStack på ett säkert och stabilt sätt.

### Överbrygga gapet

Safespring erbjuder en kostnadsfri bedömningstjänst för att uppskatta de
nyckelaktiviteter som behövs för att migrera dina arbetslaster från VMware till
Safesprings plattform.

Bedömningen kan anpassas efter varje kunds behov, men följande aktivitetslista
beskriver utvärderingen:

1. Identifiera vilka VMware-produkter som används.
2. Identifiera vilka funktioner i produkterna som används, för vilka syften och i vilken omfattning.
3. Identifiera fördelningen av operativsystem för VM-arbetslaster samt nivån av automatisering och vilka verktyg som används för att hantera operativsystemen och deras arbetslaster.
4. Identifiera containerbaserade arbetslaster och vilka verktyg som används för att driftsätta dem.
5. För arbetslaster som bedöms vara rimligt enkla att migrera, skapa en proof of concept (POC) för att prova Safespring som ny destination för arbetslasterna.
6. Baserat på POC-resultatet, skapa en komplett migrationsplan för alla arbetslaster som verifierats vara kompatibla med Safespring.

Tjänsten är kostnadsfri, och det enda kravet från din sida är att först
kvalificera dig genom att [svara på en kort enkät][survey] om er nuvarande
interna erfarenhet av automatiserade verktyg och arbetssätt för
infrastrukturhantering. När du kvalificerat dig ber vi att du avsätter resurser
med tillräcklig kompetens för att samarbeta med oss, först för att genomföra
bedömningen och därefter för att ta fram migrationsplaner och automationskod för
att tillhandahålla den infrastruktur som krävs för att köra arbetslasterna.

{{< distance >}}

{{% custom-card image="/img/card/safespring-move-from-vmware.svg" cardtitle="Få en kostnadsfri bedömning för att migrera dina VMware-arbetslaster till Safespring" %}}
Safespring erbjuder en kostnadsfri bedömningstjänst som hjälper dig att migrera arbetslaster från VMware till vår plattform, anpassad efter dina behov. Detta omfattar identifiering av nuvarande VMware-produkter, bedömning av automationsnivåer och framtagning av en proof of concept för migreringen.

{{< localbutton text="Starta bedömningen" link="https://next.safespring.com/apps/forms/s/miJx5AFAb988X5EjwCLF5LGd" >}}

{{% /custom-card %}}

{{< distance >}}

[tfmodulesblog]: /blogg/2022/2022-03-terraform-module/
[survey]: https://next.safespring.com/apps/forms/s/miJx5AFAb988X5EjwCLF5LGd
[openstackmig]: https://www.openstack.org/vmware-migration-to-openstack-white-paper