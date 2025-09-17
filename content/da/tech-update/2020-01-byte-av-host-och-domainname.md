---
ai: true
language: "da"
title: "Ændring af værts- og domænenavn på support- og backup-tjenesten"
intro: "Vi udfaser vores tidligere moderselskabs varemærke IPnett fra vores tjenester."
date: "2020-01-07T10:16:45+01:00"
draft: false
tags: ["Svenska"]
showthedate: true
card: "safespring_card_25.jpg"
eventbild: "safespring_background_25.jpg"
socialmediabild: "safespring_social_25.jpg"
section: "Teknisk opdatering"
aliases:
  - /blogg/byte-av-host-och-domainname
  - /blogg/2020/2020-01-byte-av-host-och-domainname/
---
<a id="text-button" href="#english">Læs den engelske version</a>

{{% note "14. januar" %}}
Skiftet af domænenavn fandt sted den 2020-01-14. Det betyder, at ændringen af hostnavnet og DNS bør udføres omgående. Når I laver ændringerne (nyt DNS-navn og tilføjer et ekstra root-ca-certifikat), fungerer tjenesten 100% som før, og I kan tage backup og gendanne præcis som forventet. Læs mere under "tekniske detaljer".
{{% /note %}}

<div class="ingress"><p>Vi arbejder løbende på at forbedre og tydeliggøre vores tjenester. En del af arbejdet er at udfase vores tidligere moderselskabs brand IPnett fra vores tjenester.</p></div>

Som led i at fjerne IPnetts navn fra vores tjenester vil vi forny certifikaterne, der beskytter BaaS-trafikken. Samtidig flyttes tjenesten til et af vores egne domæner, hvor navneskiftet vil være på linje med tjenesterne for Compute og Storage.

Søndag den 14. januar 2020 skifter `tsm1.cloud.ipnett.se` navn til `tsm1.backup.sto2.safedc.net`. Det er helt i orden at opdatere domænenavnet allerede i dag. Det nye navn er allerede aktivt.

Da DNS-navnet er knyttet til, hvilket certifikat der bruges til TLS, skal klienterne opdatere deres root-certifikat i IBMs TSM-keystore. Vi vil opdatere vores klientinstallationsprogrammer og levere enkle skripter, der udfører skiftet for Win/Mac/Linux, men de skal køres på hver klient.

Dette påvirker de kunder, der laver backup mod TSM1 (tsm1.cloud.ipnett.se); dem hvis klienter peger mod andre TSM-servere har allerede det nye root-certifikat og det korrekte navn.

<div class="accordion-box">
<button class="accordion">Tekniske detaljer</button>
<div class="panel content-body">
<p>Filen dsm.sys (unix-lignende systemer) eller dsm.opt (Win) skal have parameteren TCPSERVERADDRESS ændret fra `tsm1.cloud.ipnett.se` til `tsm1.backup.sto2.safedc.net`, og root-certifikatet for safedc.net skal ind i den keystore, som IBM TSM bruger, `dsmcert.kdb`. </p><p>Eksisterende gamle certifikater i keystoren kan blive liggende; det gør ingen skade. </p><p>Skiftet vil heller ikke påvirke operativsystemets egne certifikater eller andre installerede applikationer, der bruger certifikater.</p>
<h3>Mere information</h3>
<ul>
  <li><a href="https://docs.safespring.com/service/domain-changes/">Dokumentation: Safespring ændringer af domænenavne</a></li>
  <li><a href="https://github.com/safespring/cloud-BaaS/tree/master/pki">Hjælpeskripter til migrering og CA-rootcertifikat</a></li>
  <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/SafeDC-Net-Root-CA.pem">Certifikat der skal tilføjes til keystore</a></li>
  <li><b>Linux:</b>
    <ul>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/Update-SafeDC-Net-CA.sh">Opdater SafeDC-Net-CA</a></li>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/Change-TSM-Hostname.sh">Skift TSM-værtsnavn</a></li>
    </ul>
  </li>
  <li><b>Windows Powershell hjælpeværktøj til udskiftning:</b>
    <ul>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/Change-TSM-Hostname.cmd">Skift TSM-værtsnavn</a></li>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/SafeDC-Net-Root-CA-win64.bat ">SafeDC Net Root CA win64</a></li>
    </ul>
  </li>
  <li><b>macOS:</b>
    <ul>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/MacOSX-Update-SafeDC-Net-CA.sh">Opdater SafeDC-Net-CA</a></li>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/MacOS-Change-TSM-Hostname.sh">Skift TSM-værtsnavn</a></li>
    </ul>
  </li>
</ul>
<div class="pb-3"> </div>
</div>
</div>

### Ny adresse til alle supporthenvendelser

Vi tilføjer også en ny adresse til tickets, <a href="mailto:support@safespring.com">support@safespring.com</a>, som erstatter de tidligere supportadresser under cloud.ipnett.se/no.

De gamle adresser vil fortsat fungere i et stykke tid. Det bliver enklere med én supportindgang uanset tjeneste.

---

<h2 id="english">Ændring af værts- og domænenavn for support- og backup-tjenesten 2020-01-19</h2>

{{% note "14. januar" %}}
Ændring af værtsnavn og DNS skal gøres i dag (2020-01-14). Når du har foretaget ændringerne (nyt DNS-navn og tilføjet ekstra root-ca-certifikat), er tjenesten tilbage på 100% igen, og backups/gendannelser fungerer præcis som planlagt.
{{% /note %}}

I tråd med vores arbejde med at fjerne det tidligere moderselskabs navn fra vores tjenester vil vi, i forbindelse med fornyelsen af certifikaterne der beskytter backup-trafikken, omdøbe endpointet til vores eget domæne, så det matcher Storage- og Compute-tjenesterne.

_“tsm1.cloud.ipnett.se”_ skifter til `tsm1.backup.sto2.safedc.net` den 14. januar 2020. Du kan opdatere domænenavnet når som helst. Det er allerede aktivt.

Da DNS-navnet er knyttet til certifikatet, der bruges til TLS, skal klienterne opdatere root-certifikatet i IBM TSM-keystoren. Vi opdaterer klientinstallationsprogrammerne og leverer enkle skripter, der hjælper med at udføre ændringerne for Win/Mac/Linux, men de skal foretages på hver klient.

Dette berører kun kunder, der laver backup mod TSM1 (tsm1.cloud.ipnett.se). Kunder hvis klienter peger på andre af vores TSM-servere, har allerede det korrekte root-certifikat og server-endpoint-domænenavne og behøver ikke gøre noget.

<div class="accordion-box">
<button class="accordion">Tekniske detaljer</button>
<div class="panel content-body">
<p>Filen dsm.sys (unix-lignende OS’er) eller dsm.opt (Win) skal have TCPSERVERADDRESS opdateret fra tsm1.cloud.ipnett.se til <b>tsm1.backup.sto2.safedc.net</b>, og root-CA’et for safedc.net skal ind i IBM TSM-keystoren (dsmcert.kdb).</p><p>De gamle certifikater i keystoren kan blive; det gør ingen skade. Dette påvirker ikke operativsystemets certifikatlager eller andre applikationer, der bruger certifikater. </p>
<h3>Mere information</h3>
<ul>
  <li><a href="https://docs.safespring.com/service/domain-changes/">Dokumentation: Safespring ændringer af domænenavne</a></li>
  <li><a href="https://github.com/safespring/cloud-BaaS/tree/master/pki">Hjælpeskripter til migrering og CA-rootcertifikat</a></li>
  <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/SafeDC-Net-Root-CA.pem">Certifikat der skal tilføjes til keystore</a></li>
  <li><b>Linux:</b>
    <ul>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/Update-SafeDC-Net-CA.sh">Opdater SafeDC-Net-CA</a></li>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/Change-TSM-Hostname.sh">Skift TSM-værtsnavn</a></li>
    </ul>
  </li>
  <li><b>Windows Powershell hjælpeværktøj til udskiftning:</b>
    <ul>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/Change-TSM-Hostname.cmd">Skift TSM-værtsnavn</a></li>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/SafeDC-Net-Root-CA-win64.bat ">SafeDC Net Root CA win64</a></li>
    </ul>
  </li>
  <li><b>macOS:</b>
    <ul>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/MacOSX-Update-SafeDC-Net-CA.sh">Opdater SafeDC-Net-CA</a></li>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/MacOS-Change-TSM-Hostname.sh">Skift TSM-værtsnavn</a></li>
    </ul>
  </li>
</ul>
<div class="pb-3"> </div>
</div>
</div>

### Ny supportadresse til alle tjenester

Vi tilføjer også en ny adresse til tickets, <a href="mailto:support@safespring.com">support@safespring.com</a>, som erstatter de tidligere supportadresser under cloud.ipnett.se/no. De gamle adresser vil fortsætte med at fungere i et stykke tid, men vi håber, det gør oplevelsen enklere med ét kontaktpunkt, uanset hvilken tjeneste du har brug for hjælp til.

<script>
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active-utbildning");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
</script>