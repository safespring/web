---
layout: "service-landing"
title: "Virtuella servrar på OpenStack"
metatitle: "Virtuella servrar i Sverige – Compute"
language: "sv"
documentation: "Compute"
cardtitle: "Compute"
cardicon: "fa-solid fa-server"
cardcolor: "#417DA5"
cardorder: "3"
date: 2022-12-07T13:58:58+01:00
draft: false
intro: "Virtuella servrar med dataplacering i Stockholm eller Oslo. Välj resurser, automatisera med OpenStack och planera drift och backup för er miljö."
cardintro: "Virtuella servrar på OpenStack med portal, API och Terraform."
background: "safespring-compute-background.svg"
form: "yes"
sidebarlinkname: "Se demo"
sidebarlinkurl: "/demo/compute/"
sidebarlinkname2: "Pris för Compute"
sidebarlinkurl2: "/pris/#safespring-compute"
socialmedia: "safespring-compute.jpg"
sidebarimage: "safespring-fredric.webp"
sidebartext: "Vill du prata om tjänsten? Jag heter Fredric Wallsten, ta gärna kontakt med mig om du har några frågor."
sidebarphone: "+46855107370"
sidebarmail: "hello@safespring.com"
aliases:
  - /tjanster/safespring-cloud-compute/
  - /compute/
  - /safespring-compute/
  - /tjanster/safespring-compute/
devops: ""
section: "Public Cloud"
megamenu: "yes"
slug: "compute"
---

<section class="service-section service-split service-intro" aria-labelledby="compute-intro">
<div>
<p class="service-eyebrow">Safespring Compute</p>
<h2 id="compute-intro">Virtuella servrar för den miljö ni vill bygga</h2>
</div>
<div class="service-copy">
<p>Safespring Compute ger er virtuella servrar på OpenStack. Välj resurser och datacenter för er miljö och hantera servrarna i portalen eller med API och Terraform.</p>
<p>Safespring sköter infrastrukturen. Ni driver operativsystem och applikationer och planerar hur era data säkerhetskopieras.</p>
<div class="service-actions">
<a class="button" href="/demo/compute/">Se demo av Compute</a>
<a class="text-button" href="#resurser">Jämför resurser och lagring</a>
</div>
</div>
</section>

<section class="service-section" aria-labelledby="resurser">
<h2 id="resurser">Välj beräkning och lagring tillsammans</h2>
<p>Börja med applikationens behov av processorkraft, minne och lagring. Diskvalet påverkar både prestanda och hur data behöver skyddas.</p>
{{< card-grid columns="2" ariaLabel="Två typer av instanser och lagring" >}}
  {{< card-grid-item code="b2" title="Central blocklagring" >}}
Volymen är skild från den server som kör instansen. Om den ska finnas kvar när instansen tas bort behöver inställningen för radering vid avslut vara rätt.

Central blocklagring finns som FAST och LARGE. Välj efter diskprestanda och kapacitet.
  {{< /card-grid-item >}}
  {{< card-grid-item code="l2" title="Lokal NVMe-lagring" >}}
För arbetslaster där lokal disk är ett medvetet arkitekturval. Planera hur applikationen hanterar diskfel och hur data återställs.

Lokal disk har inte samma egenskaper som central blocklagring.
  {{< /card-grid-item >}}
{{< /card-grid >}}
<div id="central-blocklagring"></div>
{{< manual-document-table >}}
  {{< manual-document-row title="Instanstyper och resurser" href="https://docs.safespring.com/compute/flavors/" label="Docs" description="Jämför instanstyperna och deras lagring." >}}
  {{< manual-document-row title="Volymer och livscykel" href="https://docs.safespring.com/compute/volume/" label="Guide" description="Hur volymer skapas, ansluts och tas bort." >}}
{{< /manual-document-table >}}
</section>

<section class="service-section service-split" aria-labelledby="compute-placering">
<div>
<h2 id="compute-placering">Välj var miljön ska köras</h2>
<p>Compute finns dokumenterad på sajterna STO1 och STO2 i Stockholm samt OSL2 i Oslo. Välj svensk placering när det är ett krav för er lösning.</p>
<p>Sajterna är separata. En applikation som ska tåla att en hel sajt blir otillgänglig behöver utformas för det.</p>
</div>
<div>
{{< card-grid columns="1" ariaLabel="Dataplacering för Compute" >}}
  {{< card-grid-item code="STO1 / STO2" title="Stockholm" >}}
Svensk dataplacering för er Compute-miljö.
  {{< /card-grid-item >}}
  {{< card-grid-item code="OSL2" title="Oslo" >}}
Norsk dataplacering på en separat sajt.
  {{< /card-grid-item >}}
{{< /card-grid >}}
<p>Datacentervalet ersätter inte er bedömning av avtal, åtkomst och personuppgiftshantering. <a href="https://docs.safespring.com/compute/sites/">Läs om sajter och dataplacering</a>.</p>
</div>
</section>

<section class="service-section" aria-labelledby="compute-ansvar">
<h2 id="compute-ansvar">Infrastrukturen hos oss. Applikationerna hos er.</h2>
{{< card-grid columns="2" ariaLabel="Ansvarsfördelning för Compute" >}}
  {{< card-grid-item code="SAFESPRING" title="Molninfrastrukturen" >}}
Safespring sköter den infrastruktur där era virtuella servrar körs. Ni hanterar resurserna genom portalen, OpenStack CLI eller Terraform.
  {{< /card-grid-item >}}
  {{< card-grid-item code="ERT TEAM" title="System, behörigheter och backup" >}}
Ni väljer operativsystem och sköter applikationer, uppdateringar och behörigheter. Automatiska backuper av era virtuella maskiner ingår inte i Compute.
  {{< /card-grid-item >}}
{{< /card-grid >}}
{{< note title="Planera återställningen" color="middle-blue" >}}
Snapshots och redundant lagring ersätter inte en backupstrategi. Välj hur era data ska skyddas och prova att de kan återställas. S3-objektlagring är en separat tjänst: [Safespring Storage]({{< relref "services/storage" >}}).
{{< /note >}}
<p><a href="https://docs.safespring.com/compute/security-compliance/data-management/">Läs om ansvar och datahantering för Compute</a>.</p>
</section>

<section class="service-section service-split" aria-labelledby="compute-inforande">
<div>
<h2 id="compute-inforande">Planera automation och kostnad före en flytt</h2>
<p>API-åtkomsten är IP-begränsad. Tillåtna adresser behöver vara konfigurerade, eller så behöver åtkomsten ske från en instans på plattformen.</p>
<div class="service-actions"><a class="text-button" href="/pris/#safespring-compute">Se priser för Compute</a></div>
</div>
<div>
{{< timeline ariaLabel="Att planera inför Compute" >}}
  {{< timeline-item label="01" title="Kontrollera åtkomst och verktyg" >}}
<p>Planera era utvecklings- och driftsättningsflöden med portal, OpenStack CLI och Terraform. <a href="https://docs.safespring.com/compute/api/">Läs om API-åtkomst och Terraform</a>.</p>
  {{< /timeline-item >}}
  {{< timeline-item label="02" title="Räkna på resurser som finns kvar" >}}
<p>En instans debiteras så länge den finns, även när den är avstängd, pausad eller shelved. Volymer och snapshots kan ge separata kostnader. Säkra data innan resurser raderas.</p>
  {{< /timeline-item >}}
  {{< timeline-item label="03" title="Planera ändringar av kapacitet" >}}
<p>Resize görs offline. Kontrollera vilka byten som stöds för instanstypen och planera avbrottet. <a href="https://docs.safespring.com/compute/cost-optimization/">Läs om kostnadsoptimering</a>.</p>
  {{< /timeline-item >}}
{{< /timeline >}}
</div>
</section>

<section class="service-section" aria-labelledby="compute-demo">
<h2 id="compute-demo">Se hur en instans skapas</h2>
{{< video "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-demo-instans-svenska/master.m3u8" "/img/card/safespring-demo-instans-svenska.webp" >}}
</section>

<section class="service-section" aria-labelledby="compute-fragor">
<h2 id="compute-fragor">Frågor inför en flytt</h2>
{{% accordion title="Kan vi flytta från VMware?" %}}
Det börjar med att jämföra er nuvarande miljö med OpenStack. Nätverk, lagring, automation och applikationernas krav kan behöva anpassas. En bedömning av miljön är inte samma sak som en genomförd migration.

[Beskriv er miljö i formuläret för migrationsbedömning](https://next.safespring.com/apps/forms/s/miJx5AFAb988X5EjwCLF5LGd).
{{% /accordion %}}
{{% accordion title="Kan vi köra Windows?" %}}
Windows-avbildningar finns för virtuella maskiner. Kontrollera att licenser, drivrutiner och applikationskrav fungerar för er planerade miljö. Att en avbildning finns innebär inte att alla licenser eller migreringsmoment ingår.
{{% /accordion %}}
{{% accordion title="Ska vi välja Compute eller Kubernetes?" %}}
Välj Compute när ni vill hantera virtuella maskiner och deras operativsystem. För containeriserade applikationer med ett managerat kontrollplan kan ni utvärdera [Safespring Kubernetes Engine]({{< relref "services/containerplatform" >}}). Ert ansvar för applikationer och data behöver vara tydligt i båda fallen.
{{% /accordion %}}
</section>

<section class="service-section service-split" aria-labelledby="compute-kontakt">
<h2 id="compute-kontakt">Beskriv den miljö ni vill bygga</h2>
<div>
<p>Berätta vad ni kör i dag, ungefärligt resursbehov, önskad dataplacering och krav på återställning. Det ger ett underlag för att diskutera vilken konfiguration som passar.</p>
<div class="service-actions"><a class="button" href="#contact-form">Kontakta oss om Compute</a></div>
</div>
</section>
