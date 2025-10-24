---
ai: true
title: "Privat sky"
language: "nb"
cardtitle: "Privat sky"
cardicon: "fa-solid fa-shield-check"
cardcolor: "#195F8C"
cardorder: "07"
date: "2025-01-20"
draft: false
cardintro: "Komplett tilbud inkludert maskinvare, drift og vedlikehold av programvare."
intro: "Omfattende løsninger for privat sky, inkludert maskinvare, drift og vedlikehold av programvare, skreddersydd for full kontroll og skalerbarhet i dedikert kundeeid infrastruktur."
background: "safespring-compute-background.svg"
form: "nei"
sidebarlinkname: "Tilbake til alle kategorier"
sidebarlinkurl: "/geant/service-catalogue"
section: "OCRE 2024-rammeverk"
socialmedia: "/safespring-start.jpg"
toc: "På denne siden"
noindex: "x"
aliases:
  - /geant/service-catalogue/private-cloud/
---

{{< ingress >}}
Komplett tilbud for utrulling av privat sky, inkludert maskinvare, drift og programvarevedlikehold. Maskinvaren eies av kunden, som stiller med rackplass i datasenteret for installasjonen.
{{< /ingress >}}

Grunnpakken for Compute inkluderer kontrollplan og Compute-tjeneste med kun lokal instanslagring.

Alternativer omfatter elastisk blokk-lagring (Ceph-klynge) og akselererte beregningsnoder (typisk GPU).

Grunnpakken for lagring inkluderer kontrollplan og lagringsnoder av enten HDD- eller NVMe-type.

Lagringsgrensesnitt omfatter RADOS, S3 via Rados Gateway, Rados Block Device eller iSCSI/NFS via lagringsproxy.

Ved behov kan kunden overta forvaltningen av installasjonen og fortsette å drifte tjenesten selv. Dette sikrer tjenestekontinuitet dersom kundens behov endrer seg over tid, og kan tilrettelegges med kontrollert kunnskapsoverføring fra Safespring til kunden.

## Privat sky – Compute Base

Grunnkonfigurasjonen, Compute Base, er for utrulling i dedikert rackplass, helst med rom for vekst. ToR-svitsjene skalerer til 24 beregnings- eller lagringsnoder siden 4 grensesnitt er reservert til kontrollplanet, 2 til mellomkoblinger (interswitch-links) og 2 til uplinks.

Ved utrulling over flere rack kreves ekstra porter for krysskobling. Konfigurasjon av beregningsnoder (CPU, RAM, lokal NVMe) etter kundens spesifikasjon.

### Forutsetninger

Ingen.

## Privat sky – alternativ for volumlagring

Compute Volumes-alternativet legger til flere lagringsvalg i Compute Base-utrullingen. NVMe for lokal, flyktig lagring på beregningsnodene der instansene kjører, samt HDD-basert lagring for vedvarende behov i en delt Ceph-klynge. Det gjenbruker svitsjene og kontrollplanet fra Private Cloud-utrullingen. ToR-svitsjene er basert på 32x100 Gbps og skalerer til 24 beregnings- eller lagringsnoder siden fire grensesnitt er reservert til kontrollplanet, to til mellomkoblinger og to til uplinks.

Ved utrulling over flere rack kreves ekstra porter for krysskobling. Lagringsgrensesnittet er Rados Block Device (RBD) til beregningsnodene. HDD-lagringsnode har plass til 12x3,5”, maksimal størrelse per disk avhenger av markeds­tilgjengelighet og den bruker Optane-disk for database. NVMe-lagringsnode har plass til 10x2,5” NVMe; diskenes skriveutholdenhet og størrelse avhenger av markeds­tilgjengelighet og kundens preferanser.

### Forutsetninger

Compute Base-konfigurasjon.

## Privat sky – S3-lagringsalternativ

Privat sky kan leveres med en stor, skalerbar objektlagring med et S3-kompatibelt API. Dette gir kunden en kostnadseffektiv og standardisert måte å lagre store datamengder på i plattformen.

I kombinasjon med alternativet for blokk-lagring koblet til beregningsnodene kan data lagres i S3-objektlagring og deretter kopieres til blokk-lagringen under behandling. Denne kombinasjonen av S3-objektlagring og blokk-lagring gir et svært kostnadseffektivt, men likevel produktivt miljø for å lagre og behandle store datamengder.

S3-lagringsalternativet er en separat løsning fra Compute Base og kan settes opp separat.

### Forutsetninger

Ingen.

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kontakt Safespring" %}}
{{< inline "Brukerstøtte:" >}} support@safespring.com  
{{< inline "Salg:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}
