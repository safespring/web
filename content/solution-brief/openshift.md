---
title: "OpenShift kör smidigt på Safesprings plattform"
date: 2021-12-07T13:58:58+01:00
draft: false
tags: ["Svenska"]
intro: "Med OKD-community-installer kan du snabbt få ett OpenShift-cluster up-and-running."
background: "safespring-compute.jpg"
sidebarlinkname: "Kontakta oss"
sidebarlinkurl: "/kontakt"
socialmedia: "safespring-compute.jpg"
devops: ""
card: "safespring-openshift.svg"
sidebarimage: "safespring-openshift.svg"
background: "safespring-openshift.png"
socialmediabild: "safespring_social_21.gif"
form: "yes"
toc: "Innehållsförteckning"
language: "Se"
---

![Safespring OpenShift benefits](/img/safespring_key-points-openshift-1.svg)

{{% ingress %}}
Containrar kräver flexibilitet. Safesprings plattform är skapad för skalbarhet, hög säkerhet och är optimerat för OpenShift-clusters resurskrav.
{{% /ingress %}}

Safesprings Compute-tjänst ger dig alla resurser som krävs för att köra OKD, open source versionen av Kubernetes som bygger på Red Hat OpenShift.

Kör ni OpenShift on-prem idag? Med en svensk molntjänst som grund för ert OKD-cluster får ni både skalbarheten och säkerheten hos en managerad infrastruktur­plattform. Låt era utvecklare fokusera på OpenShift och betala endast för de resurser ni förbrukar.

<div style="margin-bottom:50px;"></div>

<script data-theme="solarized-dark" id="asciicast-J98pWS97p1zAHM8L1VFmB7Bre" src="https://asciinema.org/a/J98pWS97p1zAHM8L1VFmB7Bre.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

## Installera OKD med community installeren

{{% ingress %}}
Lär dig allt som krävs för att sätta upp RedHat OpenShift (OKD) på Safesprings molnplattform.
{{% /ingress %}}

Med dessa verktyg kan du tillhandahålla ett OKD-kluster på ungefär en timme. Installationen ger ett minimalt OKD-kluster med tre control plane noder och två arbetsnoder med minimal instans­storlek. Clusteret kan skaleres upp och ned baserad på endrade input parameters og ny kjörning av ansible playbook.

På Safesprings Openstack-baserade infrastruktur­plattform kan du snabbt distribuera ett OKD-kluster med vår [verktyg för att instansiera kluster][1].

{{< 2calltoaction "Hämta OKD-installer" "https://github.com/safespring-community/utilities/tree/main/okd" >}}


### Detta behöver du för att köra igång

- Ett projekt på [Safespring Compute](/compute) med följande resurser:
    - Memory: 60GB
    - VCPUs: 16
    - Security group rules: 40
    - Storage access to S3 in sto2 site
    - A liveDNS domain @ gandi.net
    - An API key for your gandi.net user

### Terraform-modulen
Kärnan i vårt framtagna verktyg är Terraform-modulen som tillhandahåller alla nödvändiga resurser som ett OKD-kluster behöver för att sätta ihop sig själv, dvs. beräkna noder med olika roller (boot, control plane, worker), blocklagring, säkerhet, grupper, nätverk, DNS-poster, nyckelpar, och så vidare. Modulen är så generell som den kan vara. Installationsverktygen anvendar terraform-modulen till all provisionering av infrastruktur. Modulen kallas upp direkt mot github i installasjonsverktygen, i cluster-konfigurasjonsmallen "cluster.tf.js". 
### Indataparametrar
För att tillhandahålla klustret behöver det en stor mängd indataparametrar. Du kan välja att tillhandahålla dessa parametrar för att passa dina behov, men vi gjorde ett abstraktionslager som täcker vardagliga användningsfall för att göra detta så enkelt som möjligt. Det verktyg vi tagit fram ser till att du har alla beroenden på plats och gör den nödvändiga konfigurationen från mallar.

Verktyget tar några få ingångar som klusternamn, DNS-domän, S3-bucket (för den stora ignition-filen för startnoden) och konverterar dessa till användbara parametrar för Terraform-modulen. En mallgenererad "cluster.tf" innehåller dessa parametrar och referenser till modulen. Filen "cluster.tf" används för provisioneringen.

## Resultat
Installationen ger ett minimalt OKD-kluster med controle plane noder och två arbetsnoder med minimal instansstorlek. Du kan åsidosätta instansstorleken och andra parametrar (som antalet olika noder) genom filen "settings.yml".

{{< 2calltoaction "Hämta OKD-installer" "https://github.com/safespring-community/utilities/tree/main/okd" >}}

[1]:https://github.com/safespring-community/utilities/tree/main/okd
