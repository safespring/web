---
layout: "service-landing"
title: "S3-kompatibel objektlagring för företag"
metatitle: "S3-kompatibel objektlagring i Sverige"
language: "sv"
documentation: "Storage"
cardtitle: "Storskalig lagring"
megamenutitle: "Storage"
cardicon: "fak fa-safespring-s3"
cardcolor: "#f4670f"
cardorder: "4"
date: 2024-09-22T10:50:10+02:00
draft: false
intro: "S3-kompatibel lagring för applikationer, arkiv och backupverktyg. Jämför Standard och Archive, kompatibilitet, kvoter och pris."
cardintro: "S3-kompatibel objektlagring med Standard och Archive."
background: "safespring-storage-background.svg"
form: "yes"
sidebarlinkname: "Kom igång"
sidebarlinkurl: "#contact"
sidebarlinkname2: "Pris för Storage"
sidebarlinkurl2: "/pris/#safespring-storage-s3"
socialmedia: "safespring-storage.jpg"
section: "Public cloud"
sidebarimage: "safespring-fredric.webp"
sidebartext: "Vill du prata om tjänsten? Jag heter Fredric Wallsten, ta gärna kontakt med mig om du har några frågor."
sidebarphone: "+46855107370"
sidebarmail: "hello@safespring.com"
megamenu: "yes"
slug: "s3"
aliases:
  - /tjanster/s3-kompatibel-objektlagring-i-sverige-och-norden/
  - /storage/
  - /safespring-storage/
  - /tjanster/safespring-storage/
---

<section class="service-section service-split service-intro" aria-labelledby="storage-intro">
<div>
<p class="service-eyebrow">Safespring Storage</p>
<h2 id="storage-intro">Objektlagring som ansluter till era system</h2>
</div>
<div class="service-copy">
<p>S3-kompatibel objektlagring för applikationer och dataarkiv, som också kan användas som lagringsmål för backupverktyg. Välj lagringstyp och dataplacering utifrån hur era data används.</p>
<p>Åtkomsten sker via ett S3-API. En fildelningslösning med användargränssnitt behöver en separat applikation.</p>
<div class="service-actions"><a class="button" href="/pris/#safespring-storage-s3">Se priser för Storage</a><a class="text-button" href="#lagringstyper">Jämför Standard och Archive</a></div>
</div>
</section>

<section class="service-section" aria-labelledby="lagringstyper">
<h2 id="lagringstyper">Löpande åtkomst eller långsiktigt arkiv?</h2>
{{< card-grid columns="2" ariaLabel="Jämförelse av Standard och Archive" >}}
  {{< card-grid-item code="STANDARD" title="För data som används ofta" >}}
För applikationer som ofta läser och skriver data. Standard finns dokumenterad i Stockholm och Oslo.

Publicerade standardkvoter: 10 buckets med 1 TB per bucket och en miljon objekt per bucket.
  {{< /card-grid-item >}}
  {{< card-grid-item code="ARCHIVE" title="För stora objekt som används sällan" >}}
För större objekt som skrivs sällan och läses sporadiskt, exempelvis arkiv eller ett externt lagringsmål för ett backupverktyg. Archive är dokumenterad på STO2 i Stockholm.

Publicerade standardkvoter: 2 buckets med 32 TB per bucket och en miljon objekt per bucket.
  {{< /card-grid-item >}}
{{< /card-grid >}}
{{< note title="Archive har en separat kontotyp" color="middle-blue" >}}
Archive är en separat tjänst, inte en automatisk övergång till en annan lagringsklass i samma bucket. Välj endpoint efter överenskommen variant och dataplacering. Stäm av större kvotbehov innan ni bygger lösningen kring dem.
{{< /note >}}
<p><a href="https://docs.safespring.com/storage/quota/">Läs om kvoter för Standard och Archive</a>.</p>
</section>

<section class="service-section service-split" aria-labelledby="storage-kompatibilitet">
<div>
<h2 id="storage-kompatibilitet">Utgå från de S3-funktioner ni använder</h2>
<p>Vanliga S3-operationer och flera S3-klienter stöds. Kontrollera de funktioner applikationen faktiskt använder före en flytt.</p>
</div>
<div>
{{< timeline ariaLabel="Kontroller inför en S3-integration" >}}
  {{< timeline-item label="01" title="Anslut till rätt endpoint" >}}
<p>Stäm av dataplacering, path-style-adressering och autentisering mot klientens konfigurationsguide.</p>
  {{< /timeline-item >}}
  {{< timeline-item label="02" title="Kontrollera funktioner och kryptering" >}}
<p>Safespring Storage är inte identiskt med Amazon S3. AWS SSE-S3, SSE-KMS och Cross-Region Replication anges som ej stödda i kompatibilitetsmatrisen. Förutsätt inte en automatisk kopia mellan regioner.</p>
  {{< /timeline-item >}}
  {{< timeline-item label="03" title="Prova ert verktyg före dataflytten" >}}
<p>Testa de operationer ni behöver, exempelvis uppladdning, läsning och radering, i en avgränsad miljö innan ni flyttar produktionsdata.</p>
  {{< /timeline-item >}}
{{< /timeline >}}
<div class="service-actions"><a class="text-button" href="https://docs.safespring.com/storage/s3-compatibility/">Läs kompatibilitetsmatrisen</a></div>
</div>
</section>

<section class="service-section" aria-labelledby="storage-backup">
<h2 id="storage-backup">Ett lagringsmål i er backupstrategi</h2>
{{< card-grid columns="2" ariaLabel="Lagring och kundens backupansvar" >}}
  {{< card-grid-item code="LAGRING" title="Anslut ert backupverktyg" >}}
Storage kan utvärderas som lagringsmål för ett backupverktyg. Det innebär inte att Safespring sköter hela backupflödet eller gör automatiska backuper av era buckets och objekt.
  {{< /card-grid-item >}}
  {{< card-grid-item code="ERT TEAM" title="Konfigurera och prova återställning" >}}
Ni väljer vilka data som ska skyddas och konfigurerar verktyget. Redundans, versionshantering och eventuell objektlåsning ersätter inte en genomtänkt backupstrategi.
  {{< /card-grid-item >}}
{{< /card-grid >}}
<p><a href="https://docs.safespring.com/storage/security-compliance/data-management/">Läs om ansvar och datahantering</a>.</p>
</section>

<section class="service-section service-split" aria-labelledby="storage-kostnad">
<div>
<h2 id="storage-kostnad">Räkna på lagring och användning</h2>
<p>Planera både datamängd och antal objekt. Lagringskostnaden behöver beräknas för vald tjänst och användning.</p>
<div class="service-actions"><a class="button" href="/pris/#safespring-storage-s3">Se priser för Storage</a></div>
</div>
<div>
{{< note title="Ingen separat ingress- eller egressavgift" color="middle-blue" >}}
Safespring tar inte ut ingress- eller egressavgifter för Storage. Överföringen in till och ut från tjänsten har alltså ingen separat trafikavgift. Själva lagringen har fortfarande en kostnad.
{{< /note >}}
</div>
</section>

<section class="service-section" aria-labelledby="storage-guider">
<h2 id="storage-guider">Konfigurationsguider för era verktyg</h2>
{{< manual-document-table >}}
  {{< manual-document-row title="AWS CLI" href="https://docs.safespring.com/storage/howto/configs/aws-cli/" label="Guide" description="Konfiguration för kommandoradsverktyget." >}}
  {{< manual-document-row title="Cyberduck" href="https://docs.safespring.com/storage/howto/configs/cyberduck/" label="Guide" description="Anslut Cyberduck till Storage." >}}
  {{< manual-document-row title="MinIO Client" href="https://docs.safespring.com/storage/howto/configs/minio-client/" label="Guide" description="Konfiguration av MinIO Client." >}}
{{< /manual-document-table >}}
</section>

<section class="service-section" aria-labelledby="storage-fragor">
<h2 id="storage-fragor">Frågor inför en integration</h2>
{{% accordion title="Kan vi använda Object Lock?" %}}
Stäm av stöd för ert konto och den avsedda lagringsvarianten innan ni bygger ett retentionskrav på Object Lock. Gå igenom retention, bucketkonfiguration och skillnaden mellan governance- och compliance-läge. Objektlåsning innebär inte en garanti mot alla typer av dataförlust.

[Läs dokumentationen om objektlåsning](https://docs.safespring.com/storage/object-locking/).
{{% /accordion %}}
{{% accordion title="Hur fungerar kryptering?" %}}
Skilj på kryptering i lagringsplattformen och kryptering som er klient eller applikation ansvarar för. Kontrollera krypteringsmetod och nyckelhantering mot kompatibilitetsmatrisen. Stöd för AWS KMS ska inte förutsättas.
{{% /accordion %}}
{{% accordion title="Får vi automatiskt en kopia i ett annat datacenter?" %}}
Nej, utgå inte från automatisk geografisk kopiering. Om lösningen kräver en separat kopia behöver ni planera kopieringen, dess placering och hur återställning ska fungera.
{{% /accordion %}}
{{% accordion title="Är Storage en färdig fildelningstjänst?" %}}
Storage ger åtkomst till objekt via ett S3-API. Det är inte en färdig fildelningstjänst med användargränssnitt som Dropbox eller OneDrive. En sådan lösning behöver en separat applikation.
{{% /accordion %}}
</section>

<section id="contact" class="service-section service-split" aria-labelledby="storage-kontakt">
<h2 id="storage-kontakt">Hitta rätt konfiguration för era data</h2>
<div>
<p>Berätta vilket system som ska ansluta till lagringen och om behovet gäller applikationsdata, arkiv eller ett backupmål. Ta med datamängd, antal objekt, läs- och skrivmönster samt krav på placering, retention och återställning.</p>
<div class="service-actions"><a class="button" href="#contact-form">Kontakta oss om Storage</a></div>
</div>
</section>
