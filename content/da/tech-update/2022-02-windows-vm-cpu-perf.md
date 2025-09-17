---
ai: true
title: "Forbedring af CPU-ydeevne i Windows"
date: "2022-02-17"
intro: "Vidste du, at Windows har ringe CPU-ydeevne med OpenStack og KVM's standardindstillinger?"
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknologiopdatering"
author: "Øyvind Christiansen"
language: "da"
toc: ""
aliases:
  - /blogg/2022-02-windows-vm-cpu-perf
  - /blogg/2022/2022-02-windows-vm-cpu-perf/
---
{{< ingress >}}
I dette blogindlæg gennemgår vi nogle optimeringer af virtuelle maskiner. Vi forbedrede CPU-ydelsen på Windows på grund af dårlig applikationsperformance hos en af vores kunder.
{{< /ingress >}}

## Baggrund

Vi blev for nylig kontaktet af en kunde, der brugte operativsystemet Windows Server 2019. De oplevede højere CPU-belastning og langsommere svartider på vores platform end på andre IaaS-løsninger.

Vores generelle interne erfaring med Windows er, at det har haft stabil ydeevne på tværs af compute-/hypervisor-værter, og at ydeevnen blev bedre, når vi installerede nyere hardware (som forventet). Vi havde aldrig testet op imod andre cloududbydere. Derfor var vi ikke klar over problemet.

## Undersøgelser

Kunden begyndte at profilere applikationen og søgte efter mulige forskelle i kodeeksekveringsstier mellem platformene. Denne proces gav performanceforbedringer for applikationen på alle platforme; forskellen mellem os og de andre platforme (målt af kunden) var dog stadig alt for stor i forhold til, hvad man burde forvente. Som følge heraf begyndte vi at undersøge sagen og foretage generelle benchmarks i et sandkassemiljø. Undersøgelsen viste ikke en fantastisk ydeevne, men som tidligere nævnt var ydeevnen ikke væsentligt forskellig mellem hypervisor-værter. Stabilt dårlig ydeevne kan normalt udelukke problemer med enkeltstående hypervisor-værter.

### Forkert type virtuel hardware?

Når man oplever gennemgående dårlig ydeevne på et bestemt sæt virtuelle maskiner, skyldes det typisk, at der præsenteres en forkert type virtuel hardware, eller at der bruges dårlige (eller ingen) drivere til den virtuelle hardware.

Virtuelle platforme har som regel specifikke drivere til hver type gæsteoperativsystem, så den virtuelle hardware udnyttes så effektivt som muligt. Disse er ideelt indbagt i det virtuelle image, der bruges, når operativsystemet installeres. Derudover kan værtssystemet nogle gange præsentere forskellige slags virtuel hardware afhængigt af, hvilket operativsystem der kører på systemet.

I vores tilfælde var der drivere indbagt i det Windows-image, der blev brugt, så det burde ikke være problemet. Den virtuelle hardware lignede en typisk virtuel maskine, meget lig de andre ikke-Windows-instanser, vi kørte.

### Fund vedrørende Hyper-V til KVM

Da vi søgte i emnet Windows og KVM (som vi bruger til virtualisering), fandt vi information om Hyper-V til KVM ([1][1], [2][2], [3][3] og [4][4]) – som ifølge dokumentationen kan give et ganske massivt ydelsesløft. For at aktivere disse tilføjelser skulle der foretages indstillinger i hver instans’ XML-konfigurationsfil. Problemet er, at OpenStack skriver denne fil ved instansens opstart, hvilket betyder, at ændringer i XML’en (som kun læses ved boot) bliver overskrevet ved opstart.

[1]: https://leduccc.medium.com/improving-the-performance-of-a-windows-10-guest-on-qemu-a5b3f54d9cf5
[2]: https://techblog.web.cern.ch/techblog/post/ostype-property-for-windows-images-on/
[3]: https://openstack-in-production.blogspot.com/2017/02/ostype-property-for-windows-images-on.html
[4]: https://bugs.launchpad.net/nova/+bug/1400315

## Løsningen

Løsningen, vi fandt, var pinligt enkel. Tilføj blot image-egenskaben `os_type=windows`, og OpenStack tilføjer nogle «Hyper-V Enlightenments» til KVM-XML-konfigurationen for den VM, der oprettes ud fra det image ([4][4]).

Den konfiguration, der tilføjes som følge af denne egenskab, er:```
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
Efter denne ændring er ydeevnen for Windows-applikationer på niveau med andre platforme. En stor tak til den kunde, der hjalp os med at opdage dette til gavn for alle vores Windows-kunder. Denne egenskab er nu en standardindstilling.