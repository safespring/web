---
ai: true
title: "Slip ud af VMware-fælden?"
date: 2024-08-30
intro: "VMware-brugere fik vendt op og ned på deres verden, da Broadcom i 2024 besluttede at foretage en hurtig ændring af brugervilkårene for VMware-softwaren."
draft: false
section: "Teknisk opdatering"
author: "Jarle Bjørgeengen"
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "da"
aliases:
  - /blogg/2024/2024-08-vmware-exit/
---
{{< ingress >}}
Broadcoms opkøb af VMware har haft betydelige konsekvenser for kunderne,
hvilket har skabt bekymring og fået nogle til at overveje alternativer. Dette indlæg vil
adressere disse udfordringer og beskrive én løsning på dem.
{{< /ingress >}}

Disse ændringer efter Broadcoms opkøb af VMware har medført højere langsigtede
omkostninger for mange kunder, især mindre virksomheder, der kan opleve markante
stigninger i deres årlige fornyelsesgebyrer.

{{% note "Vigtigste konsekvenser af Broadcoms opkøb af VMware" %}}

1. Skift fra perpetuelle licenser til en abonnementsbaseret model.
2. Afskaffede den gratis version af VMwares vSphere Hypervisor (ESXi).
3. Indførte prisstigninger, hvor nogle kunder rapporterer 5–10 gange højere omkostninger.
   {{% /note %}}

## Baggrund

VMware var en førende softwarevirksomhed inden for on‑premise datacenter‑
virtualiseringsteknologi, der skaber et abstraheringslag over computerhardware.
På mange måder banede VMware vejen for brugen af virtuelle servere oven på
"common off the shelf" (COTS) Intel‑baseret serverhardware i 2000’erne.
De blev førstevalget for mange on‑premise datacenter‑workloads, selv om andre og
mindre kendte alternativer fandtes og stadig findes.

## Safespring‑alternativet

Safespring bruger open source‑projekterne OpenStack og CEPH til at bygge
Infrastructure as a Service i produktionskvalitet på flere fysiske
datacenterlokationer i Norden. Dybest set handler både VMware og OpenStack om at
administrere virtuelle maskiner (VM’er), så Safespring burde vel være et
glimrende alternativ til VMware, ikke? Tja, som altid: det kommer an på! Først og
fremmest afhænger det af jeres evne og motivation til at automatisere
infrastruktur‑ og operativsystemadministration.

Traditionelt har VMware og specialiserede værktøjsleverandører leveret
værktøjer til først at migrere fysiske maskiner til virtuelle maskiner ved hjælp
af billedoptagelsesteknologier for harddiske (P2V) og efterfølgende bruge
virtuelle diskbilleder som middel til at håndtere opgraderinger og migreringer.

Selv om det på kort sigt kan virke som en god tilgang, mener vi, at det blot
udskyder behovet for at administrere VM’er, diske og netværk adskilt fra
VM‑operativsystemerne og med værktøjer til konfigurationsstyring af
operativsystemer som Cfengine, Puppet og Chef samt orkestreringsværktøjer som
Salt og Ansible – ofte omtalt som "infrastructure as code" (IAC). Denne tilgang
gør det muligt at håndtere IAC med samme type versionsstyringssystemer som i
cloud‑native applikationsudvikling og forbedrer dermed fleksibilitet, stabilitet
og automationsniveau også på infrastruktursiden.

Så, for at sige det ligeud: nytteværdien af enhver IaaS‑tjeneste som erstatning
for VMware eller lignende on‑premise‑værktøjer til virtuel
infrastrukturstyring afhænger i høj grad af viljen og evnen til at automatisere
og håndtere infrastrukturprovisionering, operativsystemkonfiguration (inklusive
udrulning af workloads) og tilstandsstyring (datadumps, objektlagring, backups
osv.) adskilt fra VM‑images og snapshots. Hvis I allerede håndterer jeres
VMware‑workloads på denne måde, kan Safespring næsten være en drop‑in‑erstatning
ved blot at omskrive infrastrukturkoden, for eksempel ved at bruge vores
community‑udviklede [Terraform‑moduler][tfmodulesblog].

Selvfølgelig kan I også selv prøve kræfter med OpenStack, som beskrevet i
OpenStack‑projektets gennemgang af ["Migrering fra VMware til OpenStack:
Optimer din infrastruktur for at spare penge og undgå vendor lock‑in"][openstackmig].
Men hvis I ønsker et alternativ med minimal indsats, hvorfor så ikke købe den
managed service‑oplevelse og lade fagfolk tage sig af den noget komplekse opgave
at drive OpenStack sikkert og stabilt.

### At bygge bro

Safespring tilbyder en gratis vurderingstjeneste, der estimerer de vigtigste
aktiviteter, der skal til for at migrere jeres workloads fra VMware til
Safespring‑platformen.

Vurderingen kan tilpasses den enkelte kundes behov, men følgende aktivitetsliste
skitserer forløbet:

1. Identificer hvilke VMware‑produkter der er i brug.
2. Identificer hvilke funktioner i produkterne der bruges, til hvilke formål, og i hvilket omfang.
3. Identificer fordelingen af operativsystemer for VM‑workloads samt graden af
   automatisering og de værktøjer, der bruges til at administrere operativsystemer og deres workloads.
4. Identificer container‑workloads og de værktøjer, der bruges til at udrulle dem.
5. For workloads, der vurderes rimeligt lette at migrere, oprettes et proof of
   concept (POC) for at afprøve Safespring som ny destination for disse workloads.
6. Baseret på POC‑resultatet udarbejdes en komplet migrationsplan for alle
   workloads, der er verificeret kompatible med Safespring.

Tjenesten er gratis, og det eneste krav til jer er først at kvalificere jer ved
at [besvare en kort spørgeundersøgelse][survey] om jeres nuværende in‑house‑
erfaring med automatiserede værktøjer og praksisser til infrastrukturstyring.
Når I er kvalificeret, beder vi jer afsætte ressourcer med tilstrækkelig viden
til at arbejde sammen med os om først at gennemføre vurderingen og derefter
udarbejde migrationsplanerne og automationskoden til at etablere den nødvendige
infrastruktur, som workloads kan udrulles på.

{{< distance >}}

{{% custom-card image="/img/card/safespring-move-from-vmware.svg" cardtitle="Få en gratis vurdering af migrering af jeres VMware‑workloads til Safespring" %}}
Safespring tilbyder en gratis vurderingstjeneste, der hjælper jer med at migrere workloads fra VMware til vores platform, skræddersyet til jeres behov. Det omfatter identifikation af aktuelle VMware‑produkter, vurdering af automationsniveau og oprettelse af et proof of concept til migreringen.

{{< localbutton text="Start vurderingen" link="https://next.safespring.com/apps/forms/s/miJx5AFAb988X5EjwCLF5LGd" >}}

{{% /custom-card %}}

{{< distance >}}

[tfmodulesblog]: /blogg/2022/2022-03-terraform-module/
[survey]: https://next.safespring.com/apps/forms/s/miJx5AFAb988X5EjwCLF5LGd
[openstackmig]: https://www.openstack.org/vmware-migration-to-openstack-white-paper