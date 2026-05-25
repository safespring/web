---
title: "Svensk OpenStack IaaS til regulerede virksomheder"
cardtitle: "Compute"
cardicon: "fa-solid fa-server"
cardcolor: "#417DA5"
cardorder: "1"
date: "2025-05-23"
draft: false
intro: "Safespring Compute er en svensk og europæisk IaaS-platform til virtuelle servere, automatisering og skalerbar infrastruktur med dataplacering i Norden og tydelig kontrol."
cardintro: "Svensk IaaS med robust serverkapacitet, kontrol og høj fleksibilitet."
background: "safespring-compute-background.svg"
form: "no"
documentation: "Compute"
sidebarlinkname: "Bestil demo"
sidebarlinkurl: "/demo/compute/"
sidebarlinkname2: "Pris for Compute"
sidebarlinkurl2: "/pris/#safespring-compute"
language: "da"
section: "Safespring Compute"
socialmedia: "/safespring-start.jpg"
megamenu: "yes"
aliases:
  - /da/tjenester/compute/
slug: "safespring-cloud-compute"
---

{{< icon-block-container >}}
    {{< icon-block icon="fa-solid fa-server" text="Central bloklagring" link="#central-bloklagring" color="#195F8C" >}}
    {{< icon-block icon="fa-solid fa-user-lock" text="Datasuverænitet" link="" color="#32cd32" >}}
    {{< icon-block icon="fa-solid fa-lock-open" text="Ingen vendor lock-in" link="" color="#195F8C" >}}
    {{< icon-block icon="fa-solid fa-chart-line" text="Skalerbar infrastruktur" link="" color="#3C9BCD" >}}
    {{< icon-block icon="fa-solid fa-code" text="Open source" link="" color="#3C9BCD" >}}
    {{< icon-block icon="fa-solid fa-cloud-upload-alt" text="99,9 % tilgængelighed" link="" color="#32cd32" >}}
{{< /icon-block-container >}}


## OpenStack-baseret IaaS i Sverige

{{< ingress >}}
Safespring Compute giver organisationer en fleksibel infrastrukturplatform til virtuelle servere, automatisering og skalerbar drift uden hyperscaler lock-in.
{{< /ingress >}}

Med Safespring kan du oprette, starte og stoppe virtuelle maskiner med blot få enkle trin. Det er nemt at tilpasse efter dine behov takket være selvbetjening og fuld automatisering.

### Dine data er GDPR-sikre

Vi tilbyder det højeste niveau af sikkerhed og tilgængelighed med vores datacentre placeret inden for Sveriges grænser. Safespring Compute er fleksibel, automatiseret og gør det nemmere at efterleve love og regler om datalagring. Alle data gemmes på krypterede harddiske.

Med Safespring Compute får du adgang til markedsledende skyteknologi direkte fra vores sikre og pålidelige datacentre i Sverige. Dine data bliver inden for landets grænser, hvilket giver ekstra datasikkerhed.

{{< distance >}}

{{% custom-card image="/img/card/safespring-move-from-vmware.svg" cardtitle="Få en gratis vurdering til migrering af dine VMware-workloads til Safespring" %}}
Safespring hjælper dig med at migrere fra VMware til Safespring, gratis og tilpasset dine behov. Vurderingen omfatter identificering af jeres nuværende VMware-produkter, vurdering af automatiseringsniveauer og oprettelse af et proof of concept for migrering.

{{< localbutton icon="fa fa-external-link" text="Start vurderingen" link="https://next.safespring.com/apps/forms/s/miJx5AFAb988X5EjwCLF5LGd" >}}

{{% /custom-card %}}

{{< distance >}}

### Samarbejd effektivt med Safespring Compute
Vores tjeneste letter samarbejdet mellem forskellige afdelinger eller grupper, forenkler IT-administration og tilfører effektivitet til din organisation.


### Bygget på open source
Safespring Compute er bygget på Open Source, hvilket gør det muligt for virksomheder og organisationer at dele produktudvikling og innovation. Dette gavner alle parter - virksomheder, organisationer og slutbrugere.

{{% accordion title="VPN-tjenester" %}}

Med Safespring Compute kan du styrke din organisation med robuste og fleksible VPN-muligheder som WireGuard og ZeroTier. Vores automatiserede løsning til WireGuard VPN-servere giver et sikkert og effektivt udgangspunkt for adgang til private netværk fra enhver placering, perfekt til virksomheder, der kræver fjernadgang og høj databeskyttelse. WireGuard tilbyder en strømlinet og let konfigurerbar VPN-arkitektur, der sikrer, at dine virksomhedsdata er sikre og tilgængelige uanset hvor dine medarbejdere befinder sig.

For organisationer, der søger en endnu mere skalerbar VPN-løsning, er ZeroTier et fremragende alternativ. Med ZeroTier kan du nemt oprette virtuelle netværk med krypterede tunneler, der muliggør sikker og øjeblikkelig kommunikation mellem noder globalt. Denne platform er ideel til hurtig konfiguration og nem skalerbarhed uden behov for traditionel VPN-hardware eller komplekse installationsprocesser.

Hos Safespring er vi stolte af at tilbyde disse avancerede VPN-muligheder integreret direkte i vores Compute-platform. Med blot få klik kan du konfigurere og implementere en komplet VPN-løsning, der understøtter både WireGuard og ZeroTier, hvilket sikrer, at din organisation altid har adgang til sikre og fleksible netværksmuligheder.

[Læs mere i vores dokumentation](https://docs.safespring.com/compute/vpn/).

{{% /accordion %}}

{{< accordion-script >}}

## Central bloklagring

{{< ingress >}}
Vores centraliserede bloklagring tilbyder sikker og fleksibel lagerkapacitet, der er adskilt fra de noder, hvor dine instanser kører.
{{< /ingress >}}

Dette muliggør høj tilgængelighed og pålidelighed. Gennem en distribueret Ceph-klynge kan vi garantere optimal ydeevne og skalerbarhed til dine specifikke behov. Vores bloklagringsmuligheder findes i to varianter, tilpasset forskellige anvendelser: FAST og LARGE.

{{< icon-block-horisontal color="#195F8C" icon="fas fa-rocket" text="FAST" description="Vores FAST-lagring er optimeret til ydeevne og designet til applikationer, der kræver lav latenstid og høj IOPS (Input/Output Operations Per Second). Den er ideel til databaser, virtuelle maskiner og andre ydeevnekritiske applikationer, der kræver hurtig svartid og pålidelig tilgængelighed." >}}
{{< icon-block-horisontal color="#195F8C" icon="fas fa-hdd" text="LARGE" description="LARGE-lagringen er designet til at tilbyde omkostningseffektiv bloklagring med høj kapacitet. Den er det perfekte valg til applikationer, hvor lagerkapacitet prioriteres frem for ydeevne, såsom arkivering, sikkerhedskopier og håndtering af store datamængder, hvor pris per gigabyte er en afgørende faktor." >}}

{{< distance >}}

{{< video "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-demo-instans-svenska/master.m3u8" "/img/card/safespring-demo-instans-svenska.webp" >}}

{{< distance >}}

{{< horisontal-card image="/img/card/safespring-image.svg" cardtitle="NIS 2-direktivet" link="/gdpr" linktext="Safesprings sikkerhed" text="NIS 2-direktivet udvider kravene til virksomheder i kritiske sektorer om at implementere strategier for risikohåndtering, sikre hændelseshåndtering og kontinuitet samt garantere leverandørkædens sikkerhed." >}}


## OpenStack og Kubernetes
OpenStack og Kubernetes gør det nemt at automatisere og skalere din applikationsopsætning. Uanset hvor du vælger at køre dine applikationer, kan Safespring tilbyde en ensartet og smidig løsning.

Selvom vores platform er baseret på open source og Linux, understøtter vi også Windows på vores virtuelle maskiner. Safespring samarbejder med CloudBase om at tilbyde klar-til-brug Windows-images, så du hurtigt kan komme i gang.

{{< readfile "Hvad er IaaS?" "/content/da/read-more/iaas-vs-colocation.md" >}}


{{< distance >}}

{{< horisontal-card image="/img/card/safespring-scaleut_use-case-ebba.webp" cardtitle="Ebba fra Scaleout fortæller om vigtigheden af håndtering af følsomme data" link="/tjenester/case/scaleout/" linktext="Læs Use Case" text="“Fordi machine learning- og AI-initiativer af denne type kræver håndtering af store mængder følsomme data, er det vigtigt, at virksomheder har kontrol og kan stole på en pålidelig leverandør med høj datasikkerhed og integritet.”" >}}
