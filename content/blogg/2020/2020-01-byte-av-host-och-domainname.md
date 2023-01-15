---
title: "Byte av host- och domännamn på Support- & Backuptjänsten"
intro: "Vi fasar ut vårt tidigare moderbolags varumärke IPnett från våra tjänster."
date: "2020-01-07T10:16:45+01:00"
draft: false
tags: ["Svenska"]
showthedate: true
card: "safespring_card_25.jpg"
eventbild: "safespring_background_25.jpg"
socialmediabild: "safespring_social_25.jpg"
section: "Tech update"
aliases:
    - /blogg/byte-av-host-och-domainname
---

<a id="text-button" href="#english">Read the English version</a>

{{% note "14 januari" %}}
Bytet av domännamn skedde den 2020-01-14. Det betyder att ändringen av host-namnet och DNS bör göras omgående. Gör ni ändringarna (nytt DNS-namn och in med extra root-ca-cert) så fungerar tjänsten 100% som innan och ni kan göra backup och restores precis som väntat. Läs mer under "tekniska detaljer".
{{% /note %}}

<div class="ingress"><p>Vi arbetar ständigt  med att förbättra och förtydliga våra tjänster. En del av arbetet är att fasa ut vårt tidigare moderbolags varumärke IPnett från våra tjänster.</p></div>

Som ett led i att ta bort IPnetts namn från våra tjänster kommer vi förnya certifikaten som skyddar BaaS-trafiken. Samtidigt flyttar tjänsten till en av våra egna domäner där namnbytet kommer ligga i linje med tjänsterna för Compute och Storage.

Söndagen den 14 januari, 2020 byter `tsm1.cloud.ipnett.se` namn till `tsm1.backup.sto2.safedc.net`. Det går bra att uppdatera domännamnet redan idag. Det nya namnet är redan aktivt.

Eftersom DNS-namnet är knutet till vilket certifikat som används för TLS så måste klienterna uppdatera sina root-certifikat i IBMs TSM-keystore. Vi kommer uppdatera våra klientinstallers och bidra med enkla script som utför bytet för Win/Mac/Linux, men de behöver köras på varje klient.

Detta påverkar de kunder som gör backup mot TSM1 (tsm1.cloud.ipnett.se), de vars klienter går mot andra TSM-servrar har redan nya root-certifikatet och korrekt namn.

<div class="accordion-box">
<button class="accordion">Tekniska detaljer</button>
<div class="panel content-body">
<p>Filen dsm.sys (unixar) eller dsm.opt (Win) behöver ändra parametern till TCPSERVERADDRESS från `tsm1.cloud.ipnett.se` till `tsm1.backup.sto2.safedc.net`, och root-certifikatet för safedc.net ska in i den keystore som används av IBM TSM `dsmcert.kdb`. </p><p>Existerande gamla certifikat i keystoren kan vara kvar, det skadar inte. </p><p>Bytet kommer heller inte påverka OS:ets egna certifikat eller andra installerade applikationer som använder certifikat.</p>
<h3>Mer information</h3>
<ul>
  <li><a href="https://docs.safespring.com/service/domain-changes/">Docs: Safespring domain name changes</a></li>
  <li><a href="https://github.com/safespring/cloud-BaaS/tree/master/pki">Helper scripts for migration and CA root certificate</a></li>
  <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/SafeDC-Net-Root-CA.pem">Certificate to add to keystore </a></li>
  <li><b>Linux:</b>
    <ul>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/Update-SafeDC-Net-CA.sh">Update SafeDC-Net-CA</a></li>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/Change-TSM-Hostname.sh">Change TSM-Hostname</a></li>
    </ul>
  </li>
  <li><b>Windows Powershell replace helper:</b>
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

### Ny adress för alla supportärenden

Vi kommer även att addera en ny adress för tickets, <a href="mailto:support@safespring.com">support@safespring.com</a> för att ersätta de tidigare support-adresserna under cloud.ipnett.se/no.

De gamla adresserna kommer fungera ett tag till framöver. Det kommer bli enklare med en supportingång oavsett tjänst.

---

<h2 id="english">Change of host- and domain name for Support and Backup service 2020-01-19</h2>

{{% note "14 January" %}}
Change of host name and DNS needs to be done today (2020-01-14). When you have done the changes (new DNS-name and added the extra root-ca-cert) then the service is back to 100% again, and backups/restores work exactly as planned.
{{% /note %}}

In line with our work to replace the former parent company name from our services, at the time of renewal of the certificates that protect the Backup traffic, we will be renaming the endpoint to our own domain to match the Storage and Compute services.

*“tsm1.cloud.ipnett.se”* will change to `tsm1.backup.sto2.safedc.net` on the 14 of January 2020. You may update the domain name at any time. It's already active.

Since the DNS name is tied to the certificate used for TLS, the clients will need to update the root certificate in the IBM TSM keystore. We will be updating the client installers and provide simple scripts to help perform the edits for Win/Mac/Linux, but the changes will have to be done on every client.

This solely affects customers who do backups against TSM1 (tsm1.cloud.ipnett.se), customers whose clients point to any other of our TSM servers already have the correct root certificate and server endpoint domain names and need not do anything.

<div class="accordion-box">
<button class="accordion">Technical details</button>
<div class="panel content-body">
<p>The dsm.sys (unix-like OSes) or dsm.opt (Win) file needs to get TCPSERVERADDRESS updated from tsm1.cloud.ipnett.se to <b>tsm1.backup.sto2.safedc.net</b> and the root-ca for safedc.net needs to get into the IBM TSM keystore (dsmcert.kdb).</p><p>The old cert(s) in the keystore can stay, it will not do any harm if they remain. This will not affect the OS certificate stores, or any other application using certificates. </p>
<h3>More information</h3>
<ul>
  <li><a href="https://docs.safespring.com/service/domain-changes/">Docs: Safespring domain name changes</a></li>
  <li><a href="https://github.com/safespring/cloud-BaaS/tree/master/pki">Helper scripts for migration and CA root certificate</a></li>
  <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/SafeDC-Net-Root-CA.pem">Certificate to add to keystore </a></li>
  <li><b>Linux:</b>
    <ul>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/Update-SafeDC-Net-CA.sh">Update SafeDC-Net-CA</a></li>
      <li><a href="https://github.com/safespring/cloud-BaaS/blob/master/pki/Change-TSM-Hostname.sh">Change TSM-Hostname</a></li>
    </ul>
  </li>
  <li><b>Windows Powershell replace helper:</b>
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

### New support address for all services
We will also be adding a new address for tickets, <a href="mailto:support@safespring.com">support@safespring.com</a> to replace the previous support addresses under cloud.ipnett.se/no. The old addresses will continue working for a while, but we hope it will simplify your experience by having a single point of access regardless of which service you need help with.

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
