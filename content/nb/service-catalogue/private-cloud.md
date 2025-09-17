---
ai: true
title: "Privat sky"
language: "nb"
cardtitle: "Privat sky"
cardicon: "fa-solid fa-shield-check"
cardcolor: "#195F8C"
cardorder: "06"
date: 2023-02-28
draft: false
intro: "Komplett tilbud inkludert maskinvare, drift og programvarevedlikehold."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nei"
sidebarlinkname: "Tilbake til alle kategorier"
sidebarlinkurl: "/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Safespring tjenestekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
- /service-catalogue/private-cloud/
---
{{< ingress >}}
Komplett tilbud for utrulling av privat sky, inkludert maskinvare, drift og programvarevedlikehold.
{{< /ingress >}}

IaaS-grunntilbudet inkluderer kontrollplan og Compute-tjeneste med kun lokal instanslagring.
Valgfrie tillegg inkluderer elastisk blokklagring (Ceph-klynge) og akselererte beregningsnoder (typisk GPU).
STaaS-grunntilbudet inkluderer kontrollplan og lagringsnoder av enten HDD- eller NVME-type.

Lagringsgrensesnitt inkluderer RADOS, S3 via Rados Gateway, Rados Block Device eller iSCSI/NFS via lagringsproxy.

## Privat sky – IaaS

IaaS-grunnkonfigurasjonen er for utrulling i dedikert rackplass, helst med rom for vekst. Top-of-Rack-svitsjene er basert på 32x100 Gbps og skalerer til 24 beregnings- eller lagringsnoder ettersom 4 grensesnitt er reservert for kontrollplan, 2 for interswitch-lenker, 2 for uplinks.

Ved utrulling over flere rack kreves ekstra porter for krysskobling. Konfigurasjon av beregningsnoder (CPU, RAM, lokal NVME) etter kundens spesifikasjon.

### Forutsetninger

Ingen.

### Privat sky – IaaS grunnkonfigurasjon

<table class="width100">
  <thead>
    <tr>
      <th>Nodetype</th>
      <th>Noder</th>
      <th>Rack-enheter per enhet</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Top-of-Rack-svitsj</td>
      <td>2</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Administrasjonssvitsj</td>
      <td>2</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Kontrollplan (4 servere / 2RU)</td>
      <td>3</td>
      <td>2</td>
    </tr>
    <tr>
      <td>Beregningsnode</td>
      <td>3</td>
      <td>2</td>
    </tr>
  </tbody>
</table>

### Privat sky – IaaS grunnproduktkomponenter

| Produktkode               | Komponent                                  | Rack-enheter |
| ------------------------- | ------------------------------------------ | ------------ |
| PRIVATECLOUD-compute.base | IaaS Compute-grunnkonfigurasjon            | 12           |
| PRIVATECLOUD-compute.add  | IaaS Compute – ekstra noder (4 per chassis) | 2            |

## Privat sky – IaaS Volumer-alternativ

IaaS Volumer-alternativet legger til elastisk lagring med NVME, HDD eller begge deler i den private IaaS-utrullingen. Det gjenbruker svitsjene og kontrollplanen fra den private IaaS-utrullingen. Top-of-Rack-svitsjene er basert på 32x100 Gbps og skalerer til 24 beregnings- eller lagringsnoder ettersom fire (4) grensesnitt er reservert for kontrollplan, to (2) for interswitch-lenker, to (2) for uplinks.

Ved utrulling over flere rack kreves ekstra porter for krysskobling. Lagringsgrensesnittet er Rados Block Device (RBD) mot compute-hypervisoren. HDD-lagringsnode har plass til 12x3,5”, maksimal størrelse per disk avhenger av markedstilgjengelighet og bruker Optane-disk for DB. NVME-lagringsnode har plass til 10x2,5” NVME; diskenes skriveutholdenhet og størrelse avhenger av markedstilgjengelighet og kundens preferanser.

### Forutsetninger

IaaS-grunnkonfigurasjon.

### Privat sky – IaaS Volumer-alternativ

| Nodetype             | Noder    | Rack-enheter                           |
| -------------------- | -------- | -------------------------------------- |
| Top-of-Rack-svitsj   | 2        | 0 (gjenbruk av IaaS ToR)               |
| Administrasjonssvitsj | 2        | 0 (gjenbruk av IaaS Mgm-svitsj)        |
| Kontrollplan         | 3        | 0 (samlokalisert med IaaS-kontrollplan) |
| Lagringsnoder – NVME | 0 / 6..n | 0 / 6..n                               |
| Lagringsnoder – HDD  | 0 / 6..n | 0 / 12..2n                             |

### Produktkomponenter for Privat sky – IaaS Volumer

| Produktkode                   | Komponent                                     | Rack-enheter |
| ----------------------------- | --------------------------------------------- | ------------ |
| PRIVATECLOUD-volume.nvme.base | IaaS Volumer – grunnkonfigurasjon, NVME-klasse | 6            |
| PRIVATECLOUD-volume.nvme.add  | IaaS – ekstra lagringsnode, NVME-klasse       | 1            |
| PRIVATECLOUD-volume.hdd.base  | IaaS Volumer – grunnkonfigurasjon, HDD-klasse | 12           |
| PRIVATECLOUD-volume.hdd.add   | IaaS – ekstra lagringsnode, HDD-klasse        | 2            |

### Privat sky – STaaS

STaaS-tjenesten tilbyr elastisk lagring med NVME, HDD eller begge deler. Top-of-Rack-svitsjene er basert på 32x100 Gbps og skalerer til 24 beregnings- eller lagringsnoder ettersom 4 grensesnitt er reservert for kontrollplan, to (2) for interswitch-lenker, to (2) for uplinks. Ved utrulling over flere rack kreves ekstra porter for krysskobling. Lagringsgrensesnitt inkluderer RADOS, S3 via Rados Gateway, Rados Block Device (RBD) eller iSCSI/NFS via lagringsproxy.

HDD-lagringsnode har plass til 12x3,5”, maksimal størrelse per disk avhenger av markedstilgjengelighet og bruker Optane-disk for DB. NVME-lagringsnode har plass til 10x2,5” NVME; diskenes skriveutholdenhet og størrelse avhenger av markedstilgjengelighet og kundens preferanser.

### Forutsetninger

Ingen.

### Privat sky – STaaS grunnkonfigurasjon

| Nodetype            | Noder    | Rack-enheter/element |
| ------------------- | -------- | -------------------- |
| Top-of-Rack-svitsj  | 2        | 1                    |
| Administrasjonssvitsj | 2        | 1                    |
| Kontrollplan        | 3        | 2                    |
| Lagringsnode – NVME | 0 / 4..n | 1                    |
| Lagringsnode – HDD  | 0 / 4..n | 2                    |

### Privat sky – STaaS produktkomponenter

| Produktkode                  | Komponent                              | Rack-enheter |
| ---------------------------- | -------------------------------------- | ------------ |
| PRIVATECLOUD-staas.base      | STaaS grunnkonfigurasjon               | 6            |
| PRIVATECLOUD-staas.nvme.base | STaaS – grunnlagringsklynge, NVME-klasse | 4            |
| PRIVATECLOUD-staas.nvme.add  | STaaS – lagringsklynge, NVME-klasse    | 1            |
| PRIVATECLOUD-staas.hdd.base  | STaaS – grunnlagringsklynge, HDD-klasse | 8            |
| PRIVATECLOUD-staas.hdd.add   | STaaS – lagringsklynge, HDD-klasse     | 2            |