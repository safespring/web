---
title: "Stärk ditt företag med Safespring Compute"
language: "Se"
documentation: "Compute"
cardtitle: "Compute"
cardicon: "fa-solid fa-server"
cardcolor: "#417DA5"
cardorder: "1"
date: 2022-12-07T13:58:58+01:00
draft: false
intro: "Med Safespring får ditt företag flexibiliteten att anpassa IT-infrastrukturen efter era behov. Allt levereras från säkra datahallar inom Sverige."
cardintro: "Stärk ditt företag med robust serverkapacitet i molnet. Säker, svensk IaaS."
background: "safespring-compute-background.svg"
form: ""
sidebarlinkname: "Boka demo"
sidebarlinkurl: "/demo"
sidebarlinkname2: "Pris för Compute"
sidebarlinkurl2: "/pris/#safespring-compute"
socialmedia: "safespring-compute.jpg"
aliases:
    - /compute/
    - /safespring-compute/
devops: ""
section: "Public Cloud"
megamenu: "yes"
TOC: "På denna sida"
---

<video style="border-radius: 15px;" id="myVideo" controls>
  Your browser does not support the video tag.
</video>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('myVideo');
    var videoSrc = "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-demo-instans-svenska/master.m3u8";
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
      });
      hls.on(Hls.Events.ERROR, function (event, data) {
        console.error('Error event:', event, 'Data:', data);
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('canplay', function() {
        video.play();
      });
    }
  });
</script>

## 
{{< ingress >}}
Safespring Compute erbjuder en kraftfull och flexibel Infrastruktur som Tjänst (IaaS) från en helt svensk molnplattform. 
{{< /ingress >}}

Vår tjänst möjliggör skapandet av virtuella maskiner med olika "flavors" för att erbjuda både flexibilitet och kostnadseffektivitet, utan det krångel och de höga kostnader som kommer med att utveckla en egen plattform.

Med Safespring Compute kan du enkelt och smidigt skapa, starta och stoppa virtuella maskiner via vårt API, med bara några få klick. Vår plattform är utformad för att vara lättanvänd, med självbetjäning och helt automatiserade processer, vilket gör det enklare än någonsin att skräddarsy din IT-infrastruktur efter just dina behov.

Vår prissättningsmodell är transparent och flexibel, där du endast betalar för de resurser du använder, timme för timme. Detta tillvägagångssätt maximerar din kostnadseffektivitet och ger dig möjlighet att dynamiskt anpassa både kapacitet och budget.

{{< readfile "Vad är IaaS?" "/content/read-more/iaas-vs-colocation.md" >}}

{{< distance >}}

{{< icon-block-container >}}
    {{< icon-block icon="fa-solid fa-user-lock" text="Data Sovereignty" link="" color="#32cd32">}}
    {{< icon-block icon="fa-solid fa-lock-open" text="No vendor lock-in" link="" color="#195F8C">}}
    {{< icon-block icon="fa-solid fa-gauge-max" text="Kubernetes Optimised" link="/tjanster/containerplattform/" color="#3C9BCD">}}
    {{< icon-block icon="fa-solid fa-code" text="Open source" link="" color="#3C9BCD">}}
    {{< icon-block icon="fa-solid fa-door-open" text="Open standards" link="" color="#FA690F">}}
    {{< icon-block icon="fa-solid fa-webhook" text="Powerful automation" link="" color="#32cd32">}}
{{< /icon-block-container >}}

{{< distance >}}
### Dina data är säkra med oss
Vi erbjuder högsta nivå av säkerhet och tillgänglighet med våra datahallar belägna inom Sveriges gränser. Safespring Compute är flexibel, automatiserad och ger dig enklare efterlevnad av lagar och regler kring datalagring. Alla data lagras på krypterade hårddiskar.

Med Safespring Compute får du tillgång till marknadsledande molnteknologi direkt ifrån våra säkra och tillförlitliga datahallar i Sverige. Din data stannar inom landets gränser, vilket ger extra trygghet och säkerhet.

{{< distance >}}

{{< horisontal-card image="/img/card/safespring-scaleut_use-case-ebba.webp" cardtitle="Scaleout bygger en AI-plattform" link="/tjanster/case/scaleout/" linktext="Läs Use Case" text="“Eftersom maskininlärning och AI-initiativ av detta slaget kräver hantering av stora mängder känslig data, är det viktigt att företag har kontroll och kan förlita sig på en pålitlig leverantör med hög datasäkerhet och integritet.”" >}}

{{< distance >}}

## Två typer av flavors

Safespring Compute erbjuder en rad olika flavors med olika kombinationer av RAM, vCPU och lagringsalternativ anpassade för dina behov. Oavsett om du behöver ultrahög hastighet eller stora lagringsvolymer, har vi en lösning för dig.

### Flavors med central blocklagring

Våra virtuella servrar kan kopplas till en central blocklagring, vilket ger en robust och skalbar lagringslösning. Vi erbjuder två typer av lagringskluster:

- **Fast:** Byggt med SSD-teknik för snabba åtkomst- och skrivtider, perfekt för applikationer som kräver hög prestanda.
- **Large:** Använder traditionella mekaniska diskar (typ SATA) för att erbjuda stora lagringsvolymer till ett förmånligt pris. Idealiskt för stora datamängder som inte kräver samma åtkomsthastighet som SSD.

All data i våra kluster sparas automatiskt i tre kopior inom ett Ceph-kluster, vilket ger hög tillförlitlighet och datatillgänglighet.

![Safespring Compute benefits](/img/safespring-flavors.svg)

### Flavors med lokal NVMe-lagring

För de som söker det absolut snabbaste lagringsalternativet erbjuder vi servrar med lokal NVMe-disk. Denna teknik ger oslagbar hastighet för läsning och skrivning, vilket är idealiskt för de mest krävande applikationerna.

Oavsett vilket lagringsalternativ du väljer, är säkerheten för din data vår högsta prioritet. Vi erbjuder rådgivning och lösningar för att säkerställa att din data är skyddad, inklusive rekommendationer för backup-strategier och dataskydd.

{{% disclaimer "NVME sparas i ett exemplar" %}}
Det är dock viktigt att notera att data lagrat på NVMe-disken finns i endast ett exemplar. Om disken går sönder kan datat gå förlorat. Vi rekommenderar därför starkt att komplettera med egna backuper eller kopplingar till våra lagringskluster för att säkerställa datans säkerhet.
{{% /disclaimer %}}

{{< distance >}}


## Styrkan hos Safespring

Safespring Compute erbjuder inte bara robusta och skalbara molnlösningar, utan även en plattform byggd med fokus på digital suveränitet, öppna standarder och öppen källkod. Detta säkerställer att våra kunder får tillgång till en flexibel och framtidssäker infrastruktur som skyddar deras data samtidigt som den främjar innovation och samarbete.

### Digital suveränitet

I en värld där data är en av de mest värdefulla tillgångarna, är digital suveränitet avgörande för att säkerställa kontroll och integritet. Safespring Compute ger våra kunder möjligheten att behålla full kontroll över sin data, med garantier om att den lagras och hanteras inom Sveriges gränser. Detta ger inte bara juridisk klarhet men också en ökad trygghet i att känslig information skyddas enligt högsta möjliga standarder.

### Öppna standarder

Genom att anamma öppna standarder försäkrar Safespring Compute interoperabilitet och flexibilitet i teknologilandskapet. Detta tillåter våra kunder att enkelt integrera och samarbeta med ett brett spektrum av applikationer och tjänster, utan att låsas till en specifik leverantör eller plattform. Öppna standarder bidrar till en mer hållbar och tillgänglig IT-miljö, där innovation kan blomstra.

### Öppen källkod

Safespring Compute bygger på principen om öppen källkod, vilket möjliggör en transparent och samarbetsdriven utvecklingsprocess. Genom att använda och bidra till öppen källkodsprojekt, kan våra kunder dra nytta av de senaste innovationerna, samtidigt som de bidrar till en större gemenskap. Öppen källkod underlättar anpassning och optimering av tjänster, vilket säkerställer att de exakt möter kundernas unika behov och krav.


## OpenStack och Kubernetes
OpenStack och Kubernetes gör det enkelt att automatisera och skalera din applikationsuppsättning. Oavsett var du väljer att köra dina applikationer kan Safespring erbjuda en enhetlig och smidig lösning.

Även om vår plattform är baserad på öppen källkod och Linux, stödjer vi även Windows på våra virtuella maskiner. Safespring samarbetar med CloudBase för att erbjuda startklara Windows-avbildningar, så att du snabbt kan komma igång.

{{< distance >}}

{{% custom-card image="/img/card/safespring-fredric.webp" cardtitle="Diskutera Compute över en lunch med vår VD" %}}
Låt oss diskutera hur Safespring kan stärka ditt företag. Boka en lunch med mig idag!

{{< inline "Ring" >}} +46 76-629 25 02
fredric.wallsten@safespring.com
{{% /custom-card %}}

{{< distance >}}
