---
ai: true
language: "en"
title: "Changing the host and domain name for the Support & Backup Service"
intro: "We are phasing out our former parent company’s IPnett brand from our services."
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
  - /blogg/2020/2020-01-byte-av-host-och-domainname/
---
<a id="text-button" href="#english">Read the English version</a>

{{% note "14 January" %}}
The domain name change took place on 2020-01-14. This means the host name and DNS should be updated immediately. Once you make the changes (new DNS name and add the extra root CA certificate), the service will work 100% as before and you can perform backups and restores exactly as expected. Read more under "Technical details".
{{% /note %}}

<div class="ingress"><p>We constantly work to improve and clarify our services. Part of this effort is phasing out our former parent company’s brand, IPnett, from our services.</p></div>

As part of removing the IPnett name from our services, we will renew the certificates that protect the BaaS traffic. At the same time, the service will move to one of our own domains so that the naming aligns with the Compute and Storage services.

On Sunday, January 14, 2020, `tsm1.cloud.ipnett.se` will change to `tsm1.backup.sto2.safedc.net`. You can already update the domain name today. The new name is already active.

Because the DNS name is tied to the certificate used for TLS, clients must update their root certificates in IBM’s TSM keystore. We will update our client installers and provide simple scripts to perform the change for Win/Mac/Linux, but they need to be run on every client.

This affects customers who back up to TSM1 (tsm1.cloud.ipnett.se); those whose clients point to other TSM servers already have the new root certificate and correct name.

<div class="accordion-box">
<button class="accordion">Technical details</button>
<div class="panel content-body">
<p>The dsm.sys (Unix-like) or dsm.opt (Windows) file needs the TCPSERVERADDRESS parameter changed from `tsm1.cloud.ipnett.se` to `tsm1.backup.sto2.safedc.net`, and the root certificate for safedc.net must be added to the IBM TSM keystore `dsmcert.kdb`.</p><p>Existing old certificates in the keystore can remain; they do no harm.</p><p>The change will also not affect the OS’s own certificates or other installed applications that use certificates.</p>
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

### New address for all support tickets

We will also add a new address for tickets, <a href="mailto:support@safespring.com">support@safespring.com</a>, to replace the previous support addresses under cloud.ipnett.se/no.

The old addresses will continue to work for a while. Having a single support entry point will make things simpler regardless of service.

---

<h2 id="english">Change of host- and domain name for Support and Backup service 2020-01-19</h2>

{{% note "14 January" %}}
Change of host name and DNS needs to be done today (2020-01-14). When you have done the changes (new DNS-name and added the extra root-ca-cert) then the service is back to 100% again, and backups/restores work exactly as planned.
{{% /note %}}

In line with our work to replace the former parent company name from our services, at the time of renewal of the certificates that protect the Backup traffic, we will be renaming the endpoint to our own domain to match the Storage and Compute services.

_“tsm1.cloud.ipnett.se”_ will change to `tsm1.backup.sto2.safedc.net` on the 14 of January 2020. You may update the domain name at any time. It's already active.

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