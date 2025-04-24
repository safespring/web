---
title: "OpenShift kjører smidig på Safesprings plattform"
date: 2021-12-07T13:58:58+01:00
draft: false
tags: ["Norsk"]
intro: "Med OKD-community-installer kan du raskt spinne opp et OpenShift-cluster."
background: "safespring-compute.jpg"
sidebarlinkname: "Kontakt oss"
sidebarlinkurl: "/no/kontakt"
socialmedia: "safespring-compute.jpg"
devops: ""
card: "safespring-openshift.svg"
sidebarimage: "safespring-openshift.svg"
background: "safespring-openshift.png"
socialmediabild: "safespring_social_21.gif"
form: "yes"
toc: "Innholdsfortegnelse"
language: "No"
aliases:
- /solution-brief/openshift-no/
---

![Safespring OpenShift benefits](/img/safespring_key-points-openshift-2.svg)

{{% ingress %}}
Containere krever fleksibilitet og skalerbarhet. Safesprings API-drevne IaaS-plattform er skapt for skalerbarhet, høy sikkerhet og er og er derfor optimalisert for OpenShift-clusterressurskrav.
{{% /ingress %}}

Safesprings Compute-tjeneste gir deg alle ressursene du trenger for å kjøre OKD. 

Kjører du OpenShift on-prem i dag? Med en norsk skytjeneste som infrastruktur for ditt OKD-cluster får du både skalerbarheten og sikkerheten til IaaS samtidig som du sikrer digital suverenitet. La ditt plattform-team og dine utviklere fokusere på OpenShift og betal kun for ressursene du bruker.

<div style="margin-bottom:50px;"></div>

<script data-theme="solarized-dark" id="asciicast-J98pWS97p1zAHM8L1VFmB7Bre" src="https://asciinema.org/a/J98pWS97p1zAHM8L1VFmB7Bre.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

## Installer OKD med community-installeren.

{{% ingress %}}
Lær alt du trenger for å sette opp RedHat OpenShift (OKD) på Safesprings skyplattform.
{{% /ingress %}}

Med disse verktøyene kan spinne opp et OKD-cluster på omtrent en time. Installasjonen gir en minimal OKD-klynge med tre control plane noder og to arbeidsnoder. Ved å tilpasse input paramtere kan klusteret skaleres opp/ned med sett av forskjellige arbeidsnoder.

På Safesprings Openstack-baserte infrastrukturplattform (IaaS) kan du raskt distribuere en OKD-klynge med community-[verktøyene for å instansiere cluster][1].

{{< 2calltoaction "Last ned OKD-installer" "https://github.com/safespring-community/utilities/tree/main/okd" >}}

<div style="margin-bottom:50px;"></div>

### Du trenger dette for å komme i gang

- Et prosjekt på [Safespring Compute](/no/tjenester/compute/) med følgende ressurser:
    - Memory: 60GB
    - VCPUs: 16
    - Security group rules: 40
    - Storage access to S3 in our STO2 site
    - A liveDNS domain @ gandi.net
    - An API key for your gandi.net user

### Terraform-modulen
Kjernen i installleren er Terraform-modulen, som gir alle nødvendige ressurser som en OKD-klynge trenger for å sette seg selv sammen, dvs. noder med forskjellige roller (boot, control plane , worker), blokklagring, security groups, nettverk, DNS-oppføringer, nøkkelpar, og så videre. Modulen er så generell som den kan bli. Modulen kalles opp direkte mot github i installasjonsverktøyet, i cluster-konfigurasjonsmalen "cluster.tf.js".

### Inndataparametere
Oppsettet av klyngen trenger en stor mengde inndataparametere. Du kan velge å angi disse parametrene for å tilpasse til dine behov, men installeren har et abstraksjonslag som reduserer kompleksiteten og gjør installasjonen så enkel som mulig. Verktøyet sikrer at du har alle avhengigheter på plass og gjør nødvendig konfigurasjon fra maler.

Verktøyet trenger noen få parametere som klyngenavn, DNS-domene, S3-bøtte (for den store ignition-filen til boot-noden). blander disse med en del standardverdier og videresender disse som parametere til Terraform-modulen, i form av en  malgenerert "cluster.tf".

## Resultat
Installasjonen gir en minimal OKD-klynge med tre control plane noder og to arbeidsnoder med minimumsinstansstørrelse. Du kan overstyre node-størrelse og andre parametere (som antall forskjellige noder) gjennom "settings.yml"-filen.

{{< 2calltoaction "Last ned OKD-installer" "https://github.com/safespring-community/utilities/tree/main/okd" >}}

[1]:https://github.com/safespring-community/utilities/tree/main/okd
