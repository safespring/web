---
ai: true
title: "Forbedre CPU-ytelsen i Windows"
date: "2022-02-17"
intro: "Visste du at Windows opplever dårlig CPU-ytelse med standardinnstillingene til OpenStack og KVM?"
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknisk oppdatering"
author: "Øyvind Christiansen"
language: "nb"
toc: ""
aliases:
  - /blogg/2022-02-windows-vm-cpu-perf
  - /blogg/2022/2022-02-windows-vm-cpu-perf/
---
{{< ingress >}}
I dette blogginnlegget går vi gjennom noen optimaliseringer for virtuelle maskiner. Vi forbedret CPU-ytelsen på Windows på grunn av dårlig applikasjonsytelse hos en av kundene våre.
{{< /ingress >}}

## Bakgrunn

Vi ble nylig kontaktet av en kunde som bruker operativsystemet Windows Server 2019. De opplevde høyere CPU-belastning og tregere svartider ved bruk av plattformen vår enn på andre IaaS-løsninger.

Vår generelle interne erfaring med Windows er at det har hatt stabil ytelse på tvers av compute-/hypervisor-verter, og at ytelsen ble bedre når vi installerte nyere maskinvare (som forventet). Vi hadde aldri testet mot andre skyleverandører. Dermed var vi ikke klar over problemet.

## Undersøkelser

Kunden startet med å spore applikasjonen og lette etter mulige forskjeller i kjøringsstier for koden mellom plattformer. Denne prosessen ga ytelsesforbedringer for applikasjonen på alle plattformer; likevel var forskjellen mellom oss og andre plattformer (slik kunden målte den) fortsatt altfor stor til å være forventet. Derfor startet vi egne undersøkelser og generelle benchmark-tester i et sandkassemiljø. Denne undersøkelsen viste ikke noen glitrende ytelse, men, som nevnt tidligere, var ytelsen ikke vesentlig forskjellig mellom hypervisor-verter. En konsekvent dårlig ytelse kan som regel utelukke problemer med enkeltstående hypervisor-verter.

### Feil type virtuell maskinvare?

Når man opplever jevnt over dårlig ytelse på et bestemt sett virtuelle maskiner, skyldes det som oftest at de presenteres med feil type virtuell maskinvare eller at det brukes dårlige (eller ingen) drivere for den virtuelle maskinvaren.

Virtuelle plattformer har vanligvis spesifikke drivere for hver type gjesteoperativsystem for at de skal utnytte den virtuelle maskinvaren så effektivt som mulig. Ideelt sett er disse bakt inn i det virtuelle bildet som brukes ved installasjon av operativsystemet. I tillegg kan verts-systemet noen ganger presentere ulike typer virtuell maskinvare avhengig av hvilket operativsystem som bruker systemet.

I vårt tilfelle var det drivere bakt inn i Windows-avbildningen som ble brukt, så det burde ikke være problemet. Den virtuelle maskinvaren fremsto som en typisk virtuell maskin, omtrent som de andre ikke-Windows-instansene vi kjørte.

### Funn om Hyper-V for KVM

Mens vi søkte rundt temaet Windows og KVM (som vi bruker til virtualisering), fant vi informasjon om Hyper-V for KVM ([1][1], [2][2], [3][3] og [4][4]) – som ifølge dokumentasjonen kan gi et ganske massivt ytelsesløft. For å aktivere disse tilleggene måtte det gjøres innstillinger i hver instans sin XML-konfigurasjonsfil. Problemet er at OpenStack autoritativt skriver denne filen ved oppstart av instansen, noe som betyr at eventuelle endringer gjort i XML-en (som bare leses ved oppstart) blir overskrevet ved oppstart.

[1]: https://leduccc.medium.com/improving-the-performance-of-a-windows-10-guest-on-qemu-a5b3f54d9cf5
[2]: https://techblog.web.cern.ch/techblog/post/ostype-property-for-windows-images-on/
[3]: https://openstack-in-production.blogspot.com/2017/02/ostype-property-for-windows-images-on.html
[4]: https://bugs.launchpad.net/nova/+bug/1400315

## Løsningen

Løsningen vi fant, var pinlig enkel. Bare legg til bildeegenskapen `os_type=windows`, så vil OpenStack legge til noen «Hyper-V Enlightenments» i KVM-XML-konfigen til VM-en som opprettes fra det bildet ([4][4]).

Konfigurasjonen som legges til som følge av denne innstillingen er:
```
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
Etter denne endringen er applikasjonsytelsen på Windows på nivå med andre plattformer. En varm takk til kunden som hjalp oss med å avdekke dette, til fordel for alle våre Windows-kunder. Denne egenskapen er nå en standardinnstilling.