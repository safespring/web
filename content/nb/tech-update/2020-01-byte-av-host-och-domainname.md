---
ai: true
language: "nb"
title: "Endring av verts- og domenenavn på Support- og backuptjenesten"
intro: "Vi faser ut vårt tidligere morselskaps varemerke IPnett fra våre tjenester."
date: "2020-01-07T10:16:45+01:00"
draft: false
tags: ["Svenska"]
showthedate: true
card: "safespring_card_25.jpg"
eventbild: "safespring_background_25.jpg"
socialmediabild: "safespring_social_25.jpg"
section: "Teknisk oppdatering"
aliases:
  - /blogg/byte-av-host-och-domainname
  - /blogg/2020/2020-01-byte-av-host-och-domainname/
---
<a id="text-button" href="#english">Les den engelske versjonen</a>

{{% note "14. januar" %}}
Byttet av domenenavn skjedde 2020-01-14. Det betyr at endringen av vertsnavn og DNS bør gjøres umiddelbart. Gjør dere endringene (nytt DNS-navn og legg inn ekstra root-CA-sertifikat), vil tjenesten fungere 100 % som før og dere kan ta backup og gjenopprette akkurat som forventet. Les mer under "tekniske detaljer".
{{% /note %}}

<div class="ingress"><p>Vi jobber kontinuerlig med å forbedre og tydeliggjøre tjenestene våre. En del av dette arbeidet er å fase ut vårt tidligere morselskaps varemerke IPnett fra tjenestene våre.</p></div>

Som et ledd i å fjerne IPnetts navn fra tjenestene våre kommer vi til å fornye sertifikatene som beskytter BaaS-trafikken. Samtidig flyttes tjenesten til et av våre egne domener der navnebyttet vil være i tråd med tjenestene for Compute og Storage.

Søndag 14. januar 2020 bytter `tsm1.cloud.ipnett.se` navn til `tsm1.backup.sto2.safedc.net`. Det går fint å oppdatere domenenavnet allerede i dag. Det nye navnet er allerede aktivt.

Siden DNS-navnet er knyttet til hvilket sertifikat som brukes for TLS, må klientene oppdatere root-sertifikatet i IBMs TSM-keystore. Vi kommer til å oppdatere klientinstallasjonene våre og bidra med enkle skript som utfører byttet for Win/Mac/Linux, men de må kjøres på hver enkelt klient.

Dette påvirker de kundene som tar backup mot TSM1 (tsm1.cloud.ipnett.se), de som har klienter som peker mot andre TSM-servere har allerede nytt root-sertifikat og korrekt navn.

<div class="accordion-box">
<button class="accordion">Tekniske detaljer</button>
<div class="panel content-body">
<p>Filen dsm.sys (Unix-lignende) eller dsm.opt (Win) må endre parameteren til TCPSERVERADDRESS fra `tsm1.cloud.ipnett.se` til `tsm1.backup.sto2.safedc.net`, og root-sertifikatet for safedc.net skal inn i den keystore som brukes av IBM TSM `dsmcert.kdb`. </p><p>Eksisterende gamle sertifikater i keystoren kan bli stående, det gjør ingen skade. </p><p>Byttet vil heller ikke påvirke operativsystemets egne sertifikater eller andre installerte applikasjoner som bruker sertifikater.</p>
<h3>Mer informasjon</h3>
<ul>
  <li><a href="https://docs.safespring.com/service/domain-changes/">Dokumentasjon: Endringer i Safespring-domenenavn</a></li>
  <li><a href="https://github.com/safespring/cloud-BaaS/tree/master/pki">Hjelpeskript for migrering og CA rotsertifikat</a></li>
  <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/SafeDC-Net-Root-CA.pem">Sertifikat som skal legges til i keystore </a></li>
  <li><b>Linux:</b>
    <ul>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/Update-SafeDC-Net-CA.sh">Update SafeDC-Net-CA</a></li>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/Change-TSM-Hostname.sh">Change TSM-Hostname</a></li>
    </ul>
  </li>
  <li><b>Windows Powershell utskiftingshjelper:</b>
    <ul>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/Change-TSM-Hostname.cmd">Change TSM Hostname</a></li>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/SafeDC-Net-Root-CA-win64.bat ">SafeDC Net Root CA win64</a></li>
    </ul>
  </li>
  <li><b>macOS:</b>
    <ul>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/MacOSX-Update-SafeDC-Net-CA.sh">Update SafeDC-Net-CA</a></li>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/MacOS-Change-TSM-Hostname.sh">Change TSM-Hostname</a></li>
    </ul>
  </li>
</ul>
<div class="pb-3"> </div>
</div>
</div>

### Ny adresse for alle supporthenvendelser

Vi kommer også til å legge til en ny adresse for saker, <a href="mailto:support@safespring.com">support@safespring.com</a> for å erstatte de tidligere support-adressene under cloud.ipnett.se/no.

De gamle adressene vil fungere en stund til fremover. Det blir enklere med én supportinngang uansett tjeneste.

---

<h2 id="english">Endring av verts- og domenenavn for Support- og Backup-tjeneste 2020-01-19</h2>

{{% note "14. januar" %}}
Endring av vertsnavn og DNS må gjøres i dag (2020-01-14). Når du har gjort endringene (nytt DNS-navn og lagt til ekstra root-CA-sertifikat) er tjenesten tilbake på 100 %, og backup/gjenoppretting fungerer akkurat som planlagt.
{{% /note %}}

I tråd med arbeidet vårt med å erstatte det tidligere morselskapets navn i tjenestene våre, og samtidig med fornyelsen av sertifikatene som beskytter Backup-trafikken, vil vi gi endepunktet nytt navn til vårt eget domene for å samsvare med Storage- og Compute-tjenestene.

_“tsm1.cloud.ipnett.se”_ vil endres til `tsm1.backup.sto2.safedc.net` den 14. januar 2020. Du kan oppdatere domenenavnet når som helst. Det er allerede aktivt.

Siden DNS-navnet er knyttet til sertifikatet som brukes for TLS, må klientene oppdatere root-sertifikatet i IBM TSM-keystore. Vi vil oppdatere klientinstallasjonene og gi enkle skript for å hjelpe med endringene for Win/Mac/Linux, men endringene må gjøres på hver klient.

Dette påvirker kun kunder som tar backup mot TSM1 (tsm1.cloud.ipnett.se). Kunder som har klienter som peker til noen av våre andre TSM-servere har allerede riktig root-sertifikat og serverendepunkt og trenger ikke å gjøre noe.

<div class="accordion-box">
<button class="accordion">Tekniske detaljer</button>
<div class="panel content-body">
<p>Filen dsm.sys (Unix-lignende OS) eller dsm.opt (Win) må få TCPSERVERADDRESS oppdatert fra tsm1.cloud.ipnett.se til <b>tsm1.backup.sto2.safedc.net</b> og root-CA for safedc.net må legges inn i IBM TSM-keystore (dsmcert.kdb).</p><p>Det/de gamle sertifikatene i keystoren kan bli værende; det gjør ingen skade om de blir liggende. Dette vil ikke påvirke operativsystemets sertifikatlager eller andre applikasjoner som bruker sertifikater. </p>
<h3>Mer informasjon</h3>
<ul>
  <li><a href="https://docs.safespring.com/service/domain-changes/">Dokumentasjon: Endringer i Safespring-domenenavn</a></li>
  <li><a href="https://github.com/safespring/cloud-BaaS/tree/master/pki">Hjelpeskript for migrering og CA rotsertifikat</a></li>
  <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/SafeDC-Net-Root-CA.pem">Sertifikat som skal legges til i keystore </a></li>
  <li><b>Linux:</b>
    <ul>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/Update-SafeDC-Net-CA.sh">Update SafeDC-Net-CA</a></li>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/Change-TSM-Hostname.sh">Change TSM-Hostname</a></li>
    </ul>
  </li>
  <li><b>Windows Powershell utskiftingshjelper:</b>
    <ul>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/Change-TSM-Hostname.cmd">Change TSM Hostname</a></li>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/SafeDC-Net-Root-CA-win64.bat ">SafeDC Net Root CA win64</a></li>
    </ul>
  </li>
  <li><b>macOS:</b>
    <ul>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/MacOSX-Update-SafeDC-Net-CA.sh">Update SafeDC-Net-CA</a></li>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/MacOS-Change-TSM-Hostname.sh">Change TSM-Hostname</a></li>
    </ul>
  </li>
</ul>
<div class="pb-3"> </div>
</div>
</div>

### Ny støtteadresse for alle tjenester

Vi vil også legge til en ny adresse for saker, <a href="mailto:support@safespring.com">support@safespring.com</a>, for å erstatte de tidligere supportadressene under cloud.ipnett.se/no. De gamle adressene vil fungere en stund til, men vi håper det vil forenkle opplevelsen din ved å ha ett kontaktpunkt uansett hvilken tjeneste du trenger hjelp med.

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