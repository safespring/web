---
layout: "service-landing"
title: "Safespring Kubernetes Engine"
section: "Platform"
sectionhighlight: ""
cardtitle: "Kubernetes"
megamenutitle: "Kubernetes"
cardintro: "Managerat Kubernetes-kontrollplan. Ni driver applikationerna."
cardicon: "fa-solid fa-container-storage"
cardcolor: "#3C9BCD"
cardorder: "1"
metatitle: "Managerat Kubernetes-kontrollplan"
card: "safespring_card_12.svg"
date: 2026-04-01
draft: false
intro: "Kör Kubernetes med ett managerat kontrollplan i Stockholm eller Oslo. Se ansvar, lagring och kostnad för den klusterkonfiguration ni behöver."
background: ""
sidebarlinkname: "Kontakta oss"
sidebarlinkurl: "/kontakt/"
sidebarimage: "safespring-fredric.webp"
sidebartext: "Vill du prata om tjänsten? Hör gärna av dig om du har några frågor."
sidebarphone: "+46 76-629 25 02"
sidebarmail: "hello@safespring.com"
sidebarlinkname2: "Se demo"
sidebarlinkurl2: "/demo/kubernetes/"
demolink: "/demo/kubernetes/"
showthedate: false
banner: "blue-hover-tech"
fontawesomebundle: "containerplatform"
language: "sv"
aliases:
  - /tjanster/containerplattform/
slug: "kubernetes"
---

<section class="service-section service-split service-intro" aria-labelledby="ske-intro">
<div>
<p class="service-eyebrow">Safespring Kubernetes Engine</p>
<h2 id="ske-intro">Ert team driver applikationerna. Vi driver kontrollplanet.</h2>
</div>
<div class="service-copy">
<p>Skapa kluster i portalen och kör containeriserade applikationer på Safesprings infrastruktur i Stockholm eller Oslo.</p>
<p>Tjänsten passar team som vill använda Kubernetes utan att själva drifta kontrollplanet. Ni ansvarar fortsatt för applikationer, data, konfiguration och återställning.</p>
<div class="service-actions"><a class="button" href="#ske-demo">Se demo av Kubernetes</a><a class="text-button" href="#ske-ansvar">Se ansvarsfördelningen</a></div>
</div>
</section>

<section id="ske-demo" class="service-demo" aria-labelledby="ske-demo-title">
<div class="service-section service-demo-layout">
<div class="service-demo-copy">
<h2 id="ske-demo-title">Demo: skapa ett kluster</h2>
<p>Se hur ni skapar ett kluster i portalen.</p>
</div>
<div class="service-demo-media">
{{< video src="https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/demo-safespring-kubernetes-engine-intro/master.m3u8" poster="/img/webinar/thumbnails/demo-safespring-kubernetes-engine-demo-1.webp" subtitles=`[{"src":"/subtitles/demo-kubernetes/demo-safespring-kubernetes-engine-intro-sv.vtt","srclang":"sv","label":"Svenska"},{"src":"/subtitles/demo-kubernetes/demo-safespring-kubernetes-engine-intro-en.vtt","srclang":"en","label":"English"},{"src":"/subtitles/demo-kubernetes/demo-safespring-kubernetes-engine-intro-no.vtt","srclang":"no","label":"Norsk"}]` page_cc_lang="sv" default_cc_lang="sv" cc_on="true" play_text="Spela demo" pause_text="Pausa demo" >}}
<nav class="service-demo-chapters" aria-label="Utvalda kapitel i Kubernetes-demon">
<a href="/demo/introduktion-till-safespring-kubernetes-engine/?t=80#player"><span class="service-demo-time">01:20</span><span>Skapa kluster</span></a>
<a href="/demo/introduktion-till-safespring-kubernetes-engine/?t=430#player"><span class="service-demo-time">07:10</span><span>Skala workernoder</span></a>
<a href="/demo/introduktion-till-safespring-kubernetes-engine/?t=615#player"><span class="service-demo-time">10:15</span><span>Kubeconfig</span></a>
</nav>
<a class="service-demo-all" href="/demo/introduktion-till-safespring-kubernetes-engine/">Visa alla kapitel</a>
</div>
</div>
</section>

<section class="service-section" aria-labelledby="ske-ansvar">
<h2 id="ske-ansvar">Vem sköter vad?</h2>
{{< card-grid columns="2" ariaLabel="Ansvarsfördelning för Kubernetes" >}}
  {{< card-grid-item code="SAFESPRING" title="Kontrollplan och Kubernetes-API" >}}
Safespring driver kontrollplanet som hanterar klustrets styrning och Kubernetes-API. Ni skapar miljö och kluster i portalen och använder kubeconfig och OIDC för åtkomst.
  {{< /card-grid-item >}}
  {{< card-grid-item code="ERT TEAM" title="Workloads, data och övervakning" >}}
Ni sköter applikationer, behörigheter och konfiguration. Planera övervakning, loggar, säkerhetskopiering och återställning för era applikationer.
  {{< /card-grid-item >}}
{{< /card-grid >}}
{{< note title="Planera er logghantering" color="middle-blue" >}}
Safespring lagrar eller övervakar inte SKE-klustrens loggar enligt tjänstens dokumentation. Plattformens driftövervakning ersätter inte er applikationsövervakning och felsökning.
{{< /note >}}
</section>

<section class="service-section service-sla" aria-labelledby="ske-sla">
<h2 id="ske-sla">Tillgänglighet och SLA</h2>
<div class="service-sla-layout">
<div class="service-sla-summary">
<p class="service-sla-value">99,5 %</p>
<p class="service-sla-label">Kontrollplan och Kubernetes-API</p>
</div>
<div class="service-sla-scope">
<p>Workernoderna omfattas av Compute-SLA och ingår inte i detta kontrollplans-SLA. Exakta villkor framgår av avtalet.</p>
<p>Kontrollplanets SLA ska inte användas som ett löfte om hela applikationens tillgänglighet. Applikationens tillgänglighet beror också på antalet repliker och beroenden till lagring och databaser. <a href="https://docs.safespring.com/kubernetes/getting-started/">Läs tjänsteöversikten och SLA-avgränsningen</a>.</p>
</div>
</div>
</section>

<section class="service-section" aria-labelledby="ske-teknik">
<h2 id="ske-teknik">Tekniken bakom klustret</h2>
<dl class="service-facts">
<div class="service-fact-row">
<dt>Noder</dt>
<dd><p>Talos Linux används som operativsystem för noderna. GPU-kapabla workernoder kan användas; konfiguration och tillgänglig kapacitet behöver stämmas av.</p></dd>
</div>
<div class="service-fact-row">
<dt>Trafik</dt>
<dd><p>Cilium med stöd för Gateway API används för trafikhantering. Kontrollera nätverk, ingress och de tillägg era applikationer använder inför en flytt.</p></dd>
</div>
<div class="service-fact-row">
<dt>Placering</dt>
<dd><p>SKE finns dokumenterad på STO2 i Stockholm och OSL2 i Oslo. Stäm av önskad sajt och kapacitet när ni planerar miljön.</p></dd>
</div>
</dl>
<p>Öppna Kubernetes-komponenter ger ett underlag för jämförelse. En flytt från en annan plattform kan fortfarande kräva anpassning av nätverk, lagring och tillägg.</p>
</section>

<section class="service-section" aria-labelledby="ske-lagring">
<div class="service-reading">
<h2 id="ske-lagring">Beständiga volymer för applikationsdata</h2>
<p>Stateful applikationer kan använda beständiga volymer genom Cinder CSI. De dokumenterade lagringsklasserna är <code>fast</code> och <code>large</code>.</p>
<p>Välj klass efter behov och kontrollera volymens livscykel, inklusive vad som händer när en PVC tas bort.</p>
<div class="service-backup-note">
<h3>Applikationsdata behöver en egen backupplan</h3>
<p>Safesprings backup av manageringsinfrastrukturen, inklusive etcd, är inte backup av era applikationsdata. Databaser, filer och andra data i klustret behöver en egen backup- och återställningsplan.</p>
</div>
<p><a href="https://docs.safespring.com/kubernetes/persistent-volumes/">Läs om persistenta volymer</a> och <a href="https://docs.safespring.com/kubernetes/security-compliance/data-management/">tjänstens datahantering</a>.</p>
</div>
</section>

<section class="service-cost" aria-labelledby="ske-kostnad">
<div class="service-section">
<div class="service-cost-intro">
<h2 id="ske-kostnad">Uppskatta kostnaden för ert kluster</h2>
<p>Kalkylatorn räknar på managerat kontrollplan, workernoder och central blocklagring. Jämför konfigurationer inför ett samtal om vilka resurser ni behöver. Resultatet är en uppskattning, inte en offert för hela er applikationsmiljö.</p>
</div>
{{< container-price-calculator >}}
</div>
</section>

<section class="service-section" aria-labelledby="ske-dokumentation">
<h2 id="ske-dokumentation">Teknisk dokumentation inför utvärderingen</h2>
{{< manual-document-table matomoAction="Container Platform Deep Dive" >}}
  {{< manual-document-row title="Skapa ert första kluster" href="https://docs.safespring.com/kubernetes/portal-overview/" icon="fa-solid fa-table-columns" label="Guide" description="Konton, portal och åtkomst till klustret." >}}
  {{< manual-document-row title="Tjänstens omfattning" href="https://docs.safespring.com/kubernetes/getting-started/" icon="fa-solid fa-book-open" label="Docs" description="Kontrollplan, komponenter och SLA." >}}
  {{< manual-document-row title="Lagring för applikationer" href="https://docs.safespring.com/kubernetes/persistent-volumes/" icon="fa-solid fa-hard-drive" label="Guide" description="Lagringsklasser och volymernas livscykel." >}}
  {{< manual-document-row title="Loggning och övervakning" href="https://docs.safespring.com/kubernetes/security-compliance/logging-monitoring/" icon="fa-solid fa-chart-line" label="Guide" description="Gränsen mellan driftinfrastruktur och kundens loggar." >}}
{{< /manual-document-table >}}
</section>

<section class="service-section" aria-labelledby="ske-fragor">
<h2 id="ske-fragor">Frågor inför ert första kluster</h2>
{{% accordion title="Är hela vår Kubernetes-drift managerad?" %}}
Safespring driver kontrollplanet. Ert team ansvarar för applikationer, konfiguration och data. Tjänsten innebär inte att Safespring tar över all drift och felsökning av era workloads.
{{% /accordion %}}
{{% accordion title="Kan vi använda SKE som ersättning för vår nuvarande plattform?" %}}
Börja med att jämföra de funktioner ni använder med dokumentationen. Kubernetes är en gemensam grund, men plattformstillägg, behörigheter och integrationsflöden kan skilja sig. Planera ett avgränsat prov innan en produktionsflytt.
{{% /accordion %}}
{{% accordion title="Vad behöver vi veta inför en prisdiskussion?" %}}
Beskriv antalet kluster, workernodernas resurser, lagringsbehovet och önskad dataplacering. Ta med krav på applikationens tillgänglighet och återställning.
{{% /accordion %}}
</section>

<section id="get-started" class="service-section service-split service-photo-contact" aria-labelledby="ske-kontakt">
<figure class="service-photo service-photo-work">
<img src="/img/team/safespring-team-work-1280.jpg" srcset="/img/team/safespring-team-work-640.jpg 640w, /img/team/safespring-team-work-1280.jpg 1280w" sizes="(max-width: 800px) 90vw, 560px" width="1280" height="720" alt="En person med hörlurar arbetar vid en laptop i Safesprings kontorsmiljö." loading="lazy" decoding="async">
</figure>
<div>
<h2 id="ske-kontakt">Gå igenom er klusterkonfiguration</h2>
<p>Berätta vilka applikationer ni vill köra och vad teamet sköter i dag. Vi kan diskutera tjänstens omfattning och vilka delar ni behöver planera för själva.</p>
<div class="service-actions"><a class="button" href="/kontakt/">Kontakta oss om Kubernetes</a></div>
</div>
</section>
