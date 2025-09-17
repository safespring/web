---
ai: true
title: "Hvordan komme seg ut av VMware-fellen?"
date: 2024-08-30
intro: "VMware-brukerne fikk verden snudd på hodet da Broadcom bestemte seg for å raskt endre brukervilkårene for VMware-programvaren i 2024."
draft: false
section: "Teknologioppdatering"
author: "Jarle Bjørgeengen"
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "nb"
aliases:
  - /blogg/2024/2024-08-vmware-exit/
---
{{< ingress >}}
Broadcoms oppkjøp av VMware har hatt betydelige konsekvenser for kundene,
skapt bekymring og fått noen til å vurdere alternativer. Dette innlegget vil
belyse utfordringene og beskrive én løsning på dem.
{{< /ingress >}}

Disse endringene etter Broadcoms oppkjøp av VMware har ført til høyere kostnader
på lang sikt for mange kunder, spesielt mindre bedrifter som kan oppleve dramatiske
økninger i de årlige fornyelsesavgiftene.

{{% note "Viktige effekter av Broadcoms oppkjøp av VMware" %}}

1. Gikk fra evigvarende lisenser til en abonnementsbasert modell.
2. Fjernet gratisversjonen av VMwares vSphere Hypervisor (ESXi).
3. Innførte prisøkninger, der noen kunder rapporterer 5–10 ganger høyere kostnader.
   {{% /note %}}

## Bakgrunn

VMware var et ledende programvareselskap innen virtualiseringsteknologi for lokale
datasentre som skaper et abstraksjonslag over maskinvare. På mange måter pionerte
VMware bruken av virtuelle servere på "common off the shelf" (COTS) Intel-basert
servermaskinvare på 2000-tallet. De ble førstevalget for mange arbeidslaster i
lokale datasentre, selv om andre og mindre kjente alternativer fantes og fortsatt finnes.

## Safespring-alternativet

Safespring bruker open source-prosjektene OpenStack og Ceph til å bygge
IaaS i produksjonskvalitet på flere fysiske datasenterlokasjoner i Norden.
I bunn og grunn handler både VMware og OpenStack om å administrere virtuelle
maskiner (VM-er), så Safespring burde være et godt alternativ til VMware, ikke sant?
Vel, som alltid: det kommer an på! Først og fremst avhenger det av evnen og
motivasjonen deres til å automatisere forvaltningen av infrastruktur og
operativsystemer.

Tradisjonelt har VMware og spesialiserte verktøyleverandører tilbudt verktøy for å
først migrere fysiske maskiner til virtuelle maskiner ved å bruke teknologier for
diskavbildning (P2V), og deretter bruke virtuelle diskavbilder som et middel til å
håndtere oppgraderinger og migreringer.

Selv om dette virker som en god tilnærming på kort sikt, mener vi at det bare
utsetter behovet for å håndtere VM-er, disker og nettverk separat fra
VM-operativsystemene og med konfigurasjonsstyringsverktøy for operativsystemer som
Cfengine, Puppet og Chef, samt orkestreringsverktøy som Salt og Ansible – ofte
kalt «infrastruktur som kode» (IaC). Denne tilnærmingen gjorde det mulig å forvalte
IaC med samme type versjonskontrollsystemer som brukes i sky-native
applikasjonsutvikling, og dermed forbedre fleksibilitet, stabilitet og
automatiseringsnivå også på infrastruktursiden.

Så, for å være direkte: Nytten av hvilken som helst IaaS-tjeneste som erstatning
for VMware, eller tilsvarende verktøy for lokal virtuell infrastruktur, avhenger i
stor grad av vilje og evne til å automatisere og håndtere:
provisjonering av infrastruktur, konfigurasjon av operativsystemer (inkludert
utrulling av arbeidslaster) og tilstandshåndtering (datadumper, objektlagring,
sikkerhetskopier osv.) separat fra VM-avbilder og snapshots. Hvis dere allerede
forvalter VMware-arbeidslastene deres på denne måten, kan Safespring nærmest være
en drop-in-erstatning ved bare å skrive om infrastrukturkoden, for eksempel ved å
bruke våre fellesskapsbidrag [Terraform-moduler][tfmodulesblog].

Selvsagt kan du prøve OpenStack på egen hånd, slik det beskrives i
OpenStack-prosjektets «Migrering fra VMware til OpenStack: Optimaliser
infrastrukturen for å spare penger og unngå leverandørlåsing» [openstackmig].
Hvis du derimot ser etter et alternativ med minimalt arbeid, hvorfor ikke bare
kjøpe en forvaltet tjeneste og la profesjonelle ta seg av den nokså komplekse
oppgaven det er å drifte OpenStack på en sikker og stabil måte.

### Tette gapet

Safespring tilbyr en gratis vurderingstjeneste for å anslå de viktigste aktivitetene
som kreves for å migrere arbeidslastene dine fra VMware til Safespring-plattformen.

Vurderingen kan tilpasses hver kundes behov, men følgende aktivitetsliste skisserer
evalueringen:

1. Identifiser hvilke VMware-produkter som er i bruk.
2. Identifiser hvilke funksjoner i produktene som brukes, til hvilke formål og i hvilket omfang.
3. Identifiser fordelingen av operativsystemer for VM-arbeidslaster og nivået
   av automasjon samt verktøy som brukes til å administrere operativsystemer og deres arbeidslaster.
4. Identifiser containerarbeidslaster og verktøy som brukes til å rulle dem ut.
5. For arbeidslaster som vurderes å være rimelig enkle å migrere, lag en
   proof of concept (PoC) for å teste Safespring som nytt mål for arbeidslastene.
6. Basert på resultatet av PoC-en, lag en komplett migreringsplan for alle arbeidslaster
   som er verifisert kompatible med Safespring.

Tjenesten er gratis, og det eneste kravet fra dere er først å kvalifisere ved å
[svare på en kort spørreundersøkelse][survey] om deres interne erfaring med
verktøy og praksis for automatisert infrastrukturforvaltning. Når dere er
kvalifisert, ber vi dere sette av ressurser med tilstrekkelig kompetanse til å
jobbe sammen med oss for først å gjennomføre vurderingen og deretter lage
migreringsplaner og automasjonskode for å rulle ut nødvendig infrastruktur som
arbeidslastene skal kjøres på.

{{< distance >}}

{{% custom-card image="/img/card/safespring-move-from-vmware.svg" cardtitle="Få en gratis vurdering for å migrere VMware-arbeidslastene dine til Safespring" %}}
Safespring tilbyr en gratis vurderingstjeneste som hjelper deg å migrere arbeidslaster fra VMware til plattformen vår, tilpasset dine behov. Dette inkluderer å identifisere nåværende VMware-produkter, vurdere automasjonsnivåer og lage en proof of concept for migreringen.

{{< localbutton text="Start vurderingen" link="https://next.safespring.com/apps/forms/s/miJx5AFAb988X5EjwCLF5LGd" >}}

{{% /custom-card %}}

{{< distance >}}

[tfmodulesblog]: /blogg/2022/2022-03-terraform-module/
[survey]: https://next.safespring.com/apps/forms/s/miJx5AFAb988X5EjwCLF5LGd
[openstackmig]: https://www.openstack.org/vmware-migration-to-openstack-white-paper