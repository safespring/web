---
ai: true
title: "Förbättrad CPU-prestanda på Windows"
date: "2022-02-17"
intro: "Visste du att Windows lider av dålig CPU-prestanda med OpenStack och KVM:s standardinställningar?"
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknikuppdatering"
author: "Øyvind Christiansen"
language: "sv"
toc: ""
aliases:
  - /blogg/2022-02-windows-vm-cpu-perf
  - /blogg/2022/2022-02-windows-vm-cpu-perf/
---
{{< ingress >}}
I det här blogginlägget går vi igenom några optimeringar för virtuella maskiner. Vi optimerade CPU-prestandan på Windows på grund av dålig applikationsprestanda hos en av våra kunder.
{{< /ingress >}}

## Bakgrund

Vi blev nyligen kontaktade av en kund som använde operativsystemet Windows Server 2019. De upplevde högre CPU-belastning och långsammare svarstider när de använde vår plattform jämfört med andra IaaS-lösningar.

Vår allmänna interna erfarenhet av Windows är att det haft stabil prestanda över compute-/hypervisorvärdar och att prestandan blev bättre när vi installerade nyare hårdvara (som förväntat). Vi hade aldrig testat mot andra molnleverantörer. Därför kände vi inte till problemet.

## Undersökningar

Kunden började spåra applikationen och letade efter möjliga skillnader i kodens exekveringsvägar mellan plattformar. Detta arbete gav prestandaförbättringar för applikationen på alla plattformar; dock var skillnaden mellan oss och andra plattformar (enligt kundens mätningar) fortfarande långt större än väntat. Som ett resultat började vi undersöka och göra allmänna benchmarktester i en sandbox-miljö. Denna undersökning visade inte någon lysande prestanda, men som tidigare nämnts skilde sig prestandan inte nämnvärt mellan hypervisorvärdar. En stabilt dålig prestanda kan oftast utesluta problem med enskilda hypervisorvärdar.

### Fel typ av virtuell hårdvara?

När man upplever konsekvent dålig prestanda på en specifik uppsättning virtuella maskiner i en hel miljö beror det vanligtvis på att fel typ av virtuell hårdvara presenteras, eller på dåliga (eller inga) drivrutiner för den virtuella hårdvaran.

Virtuella plattformar har vanligtvis specifika drivrutiner för varje gästoperativsystem för att få dem att använda den virtuella hårdvaran så effektivt som möjligt. Dessa är idealiskt inbakade i den virtuella avbild som används vid installation av operativsystemet. Dessutom kan värdsystemet ibland presentera olika typer av virtuell hårdvara beroende på vilket operativsystem som används.

I vårt fall fanns drivrutiner inbakade i Windows-avbilden, så det borde inte vara problemet. Den virtuella hårdvaran verkade vara en typisk virtuell maskin, ungefär som de andra icke-Windows-instanserna vi körde.

### Iakttagelser gällande Hyper-V för KVM

När vi sökte kring Windows och KVM (som vi använder för virtualisering) hittade vi information om Hyper-V för KVM ([1][1], [2][2], [3][3] och [4][4]) – vilket enligt dokumentationen kan ge en rejäl prestandaökning. För att aktivera dessa tillägg behövde inställningar göras i varje instans XML-konfigurationsfil. Problemet är att OpenStack skriver denna fil auktoritativt vid uppstart av instansen, vilket innebär att alla ändringar i XML:en (som bara läses vid uppstart) skrivs över vid uppstart.

[1]: https://leduccc.medium.com/improving-the-performance-of-a-windows-10-guest-on-qemu-a5b3f54d9cf5
[2]: https://techblog.web.cern.ch/techblog/post/ostype-property-for-windows-images-on/
[3]: https://openstack-in-production.blogspot.com/2017/02/ostype-property-for-windows-images-on.html
[4]: https://bugs.launchpad.net/nova/+bug/1400315

## Lösningen

Lösningen vi hittade var pinsamt enkel. Lägg bara till image-egenskapen `os_type=windows`, så lägger OpenStack till några ”Hyper‑V Enlightenments” i KVM:s XML-konfiguration för den VM som skapas från den avbilden ([4][4]).

Den konfiguration som läggs till som en följd av att denna egenskap sätts är:```
<features>
    <acpi/>
    <apic/>
    <hyperv>
      <relaxed state='on'/>
      <vapic state='on'/>
      <spinlocks state='on' retries='8191'/>
    </hyperv>
  </features>
  ....
  <clock offset='localtime'>
    <timer name='pit' tickpolicy='delay'/>
    <timer name='rtc' tickpolicy='catchup'/>
    <timer name='hpet' present='no'/>
    <timer name='hypervclock' present='yes'/>
  </clock>
```
Efter den här ändringen är prestandan för Windows-applikationer i nivå med andra plattformar. Ett varmt tack till den kund som hjälpte oss att upptäcka detta till nytta för alla våra Windows-kunder. Den här egenskapen är nu en standardinställning.