---
title: "Meltdown: Sårbarheter i moderne mikroprosessorer"
date: "2018-01-04"
draft: true
tags: "vedlikehold"
showthedate: true
---

Safespring er kjent med flere sårbarheter ("Meltdown" og "Spectre") som rammer alle operativsystemer på moderne mikroprosessorer, og som kan gjøre det mulig for en prosess å lese andre prosessers minne. Sårbarhetene rammer både personlige datamaskiner, mobile enheter og skytjenester.

For de som vil lese mer om sårbarhetene har de fått sin [eget nettsted](https://meltdownattack.com)

Vi jobber med å skaffe oss oversikt over omfanget, og vil i dagene fremover oppdatere systemene våre med tilgjengelige sikkerhetsoppdateringer. Dette vil påvirke kundene våre i forskjellig grad, i hovedsak som omstart av kjørende systemer. Vi anbefaler at man følger med på [vår statusside](http://status.safespring.com).

## Anbefaling til kunder

Vi anbefaler at alle sørger for å holde operativsystemer oppdatert, og installere patcher fra leverandører. For de fleste linux-distroer er det sluppet oppdateringer som dekker enkelte av sårbarhetene. For Windows vil det komme oppdateringer snart.

[Informasjon fra RedHat](https://access.redhat.com/security/vulnerabilities/speculativeexecution?sc_cid=701f2000000tsLNAAY&)

## Safespring som skyleverandør

Safespring produserer skytjenester lokalt fra datasentre i Norge og Sverige. Våre tjenester er tilgjengelige for alle universiteter, høgskoler og utdanningsinstitusjoner gjennom avtaler med Uninett i Norge og Sunet i Sverige. Som skyleverandør er vi opptatt av å levere tjenester med høyt sikkerhetsnivå. Gjennom å levere tjenester fra lokale datasenter, og med dedikerte ressurser til målgruppen vår, bidrar vi til å begrense påvirkningen fra denne typen sårbarheter.

## Oppdatert status:

### Fredag 5. januar

Vi har i løpet av dagen bygget ny kjerne og konfigurasjon for compute hosts. Vi vil teste denne grundig før vi setter den i produksjon.

Det har blitt publisert oppdatert informasjon fra qemu, og vi mener at patching av kjernen på compute hosts foreløpig skal være tilstrekkelig.

* [Informasjon fra Qemu.org](https://www.qemu.org/2018/01/04/spectre/)

### Mandag 8 januar

Vi har i løpet av dagen oppdatert test-systemer med patchet kjerne, og kjører disse med last. Så snart vi har verifisert at ny kjerne oppfører seg som forventet vil vi fortløpende oppdatere compute-noder på datasentrene i Norge og Sverige.

### Tirsdag 9 januar

Patchingen av datasenteret i Norge ble fullført i løpet av dagen.

### Onsdag 10. januar

Vi fortsetter patching av datasenteret i Sverige.

### Torsdag 11. januar

Sikkerhetspatching ferdigstilt i går kveld - for denne gang. Vi følger med videre, vær trygg!

## Lenker til mer informasjon

* Google [Project Zero blog](https://googleprojectzero.blogspot.com/2018/01/reading-privileged-memory-with-side.html)
* [Meltdownattack](https://meltdownattack.com/)
* MITRE [CVE-2017-5715](http://www.cve.mitre.org/cgi-bin/cvename.cgi?name=2017-5715)
* MITRE [CVE-2017-5753](http://www.cve.mitre.org/cgi-bin/cvename.cgi?name=2017-5753)
* MITRE [CVE-2017-5754](http://www.cve.mitre.org/cgi-bin/cvename.cgi?name=2017-5754)
* Intel [Informasjon fra Intel](https://newsroom.intel.com/news/intel-responds-to-security-research-findings/)
