---
ai: true
title: "Förstå Safespring On-demand Kubernetes om du brukar köra Kubernetes själv"
date: "2026-03-30"
intro: "En praktisk guide för plattformsteam som vill förstå tjänstegränsen, standardvalen och de tekniska avvägningarna i Safespring On-demand Kubernetes."
draft: false
sectiontext: "Teknikuppdatering"
section: "Teknikuppdatering"
tags: ["container"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "sv"
author: ""
TOC: "I det här inlägget"
sidebarlinkname: "Talos på OpenStack"
sidebarlinkurl: "/tekniska-uppdateringar/2025-03-talos-linux-on-openstack/"
sidebarlinkname2: "Cluster API på OpenStack"
sidebarlinkurl2: "/tekniska-uppdateringar/2025-06-deploy-talos-kubernetes-on-openstack-with-cluster-api/"
aliases:
  - /blogg/2026/2026-03-what-to-compare-managed-kubernetes-vs-self-managed/
  - /blogg/2026-03-what-to-compare-managed-kubernetes-vs-self-managed/
---

{{< ingress >}}
Om du redan vet hur man kör Kubernetes själv är den viktiga frågan inte om en hanterad tjänst kan skapa ett kluster. Den viktiga frågan är hur tjänsten är utformad, var gränsen går och vilka delar av plattformen den redan löser på ett bra sätt.
{{< /ingress >}}

Vi har skrivit en hel del på sistone om att bygga Kubernetes-plattformar med Talos, OpenStack, Cluster API, Cinder CSI och modern trafikhantering. Det är ena sidan av bilden.

Den andra sidan är att förstå vad en tjänst som Safespring On-demand Kubernetes faktiskt försöker tillhandahålla.

Det här inlägget riktar sig till ingenjörer och plattformsteam som absolut kan köra Kubernetes själva, men som vill förstå Safespring On-demand Kubernetes mer konkret än bara som "managed Kubernetes".

{{% accordion title="TL;DR" %}}

1. Safespring On-demand Kubernetes är utformat för att ge team en användbar Kubernetes-plattformsgräns från dag ett, snarare än ett rått kluster som fortfarande kräver omfattande integrationsarbete.
2. Tjänsten dokumenterar i dag klusterprovisionering via portal och API, ett hanterat kontrollplan, Talos Linux, Cilium som standard-CNI, alternativ för trafikhantering, Cinder CSI-baserad lagring, OIDC-baserad åtkomst och GPU-kapabla worker-noder.
3. Det mest användbara sättet att utvärdera tjänsten är att titta på vad som redan är löst som standard och vad som fortfarande ingår i er egen plattformsdesign.
4. För många team är värdet inte att Kubernetes blir "enkelt", utan att färre återkommande plattformsansvar behöver ägas internt.
5. Om ditt team redan kör Kubernetes självt är den erfarenheten fortfarande direkt relevant, särskilt kring arbetslastdesign, observerbarhet, åtkomstmodeller, lagringsbeteende och trafikmönster.

{{< localbutton text="Hoppa till tjänstegränsen" link="#tjanstegransen-i-praktiken" >}}

{{% /accordion %}}
{{< accordion-script >}}

## Vad Safespring On-demand Kubernetes försöker göra

På en övergripande nivå är Safespring On-demand Kubernetes en Kubernetes-tjänst byggd på Safespring Compute och exponerad genom en självbetjäningsmodell. Syftet är inte att ersätta tekniskt omdöme eller dölja Kubernetes bakom ett proprietärt kontrollager. Syftet är att ge en stabil plattformsbas så att team kan lägga mindre tid på att sätta ihop själva klustret och mer tid på arbetslasterna.

Den skillnaden spelar roll.

Vissa tjänster marknadsför sig som hanterade men lämnar ändå stora delar av plattformsberättelsen olösta. Du kan fortfarande behöva skruva fast identitet, lagring, ingress eller en sammanhängande uppgraderingsmodell innan tjänsten känns användbar i produktion.

Det som är mer intressant i Safesprings fall är att tjänstegränsen dokumenteras i konkreta plattformstermer:

- hur kluster provisioneras
- hur kontrollplanet hanteras
- vilken nätverksmodell som förväntas
- hur persistent lagring görs tillgänglig
- hur användare autentiserar sig mot kluster
- vilket stöd som finns för GPU-arbetslaster
- vad som medvetet lämnas utanför standardomfattningen

Det gör det enklare för plattformsteam att utvärdera erbjudandet som infrastruktur, inte bara som produktbudskap.

## Vad du får dag ett

Utifrån den aktuella Safespring-dokumentationen beskrivs On-demand Kubernetes med följande plattformsegenskaper:

- **Klusterprovisionering via portal och API** så att kluster kan skapas och hanteras genom ett självbetjäningsflöde.
- **Ett hanterat kontrollplan** med stöd för `3` eller `5` kontrollplansnoder beroende på tillgänglighetskrav.
- **Talos Linux** som underliggande operativsystem för Kubernetes-noderna.
- **Cilium som standard-CNI**, med Gateway API aktiverat i nätverksmodellen.
- **Stöd för Traefik** för team som föredrar ett välbekant ingressmönster.
- **Persistenta volymer via Cinder CSI**, med lagringsklasserna `fast` och `large` tillgängliga när CSI-komponenten är aktiverad.
- **OIDC-baserad autentisering**, med portalgenererad kubeconfig och `kubelogin`.
- **GPU-kapabla worker-noder** för team med ML, AI eller andra accelererade arbetslaster.
- **Ett hanterat kontrollplan**, mätt mot Kubernetes API-tillgänglighet.

Det är en meningsfull mängd plattformsytor att ha definierade från start. Det betyder att tjänsten inte bara handlar om att få noder att boota. Den ger också team ett känt sätt att tänka kring åtkomst, nätverk, lagring och plattformsdrift.

## Tjänstegränsen i praktiken {#tjanstegransen-i-praktiken}

Om du är van vid självhanterad Kubernetes hjälper det att läsa tjänsten inte som "vad kan den göra?", utan som "vad äger den redan?"

Ett tydligare sätt att tänka är ämne för ämne:

{{< boundary-row
  first="true"
  topic="Klusterprovisionering"
  service="Kluster skapas och hanteras via portal och API."
  responsibility="Er namnsättning, miljömodell, automationslager och interna användningsmönster."
>}}

{{< boundary-row
  topic="Kontrollplan"
  service="Kontrollplanet är hanterat och tillgängligt i layouter med `3` eller `5` noder."
  responsibility="Er arbetslastarkitektur, era SLO:er och hur applikationerna beter sig vid nod- eller beroendefel."
>}}

{{< boundary-row
  topic="Nod-OS och klustergrund"
  service="Talos Linux används som operativsystemgrund."
  responsibility="Era applikationsantaganden, runtime-krav och hur ni operationaliserar arbetslaster ovanpå den grunden."
>}}

{{< boundary-row
  topic="Nätverk"
  service="Cilium är standard-CNI och Gateway API är aktiverat i plattformsmodellen."
  responsibility="Er routedesign, certifikatmodell, namespace-gränser, strategi för exponering av tjänster och design av nätverkspolicyer."
>}}

{{< boundary-row
  topic="Ingress och trafik"
  service="Traefik stöds som komplement till den huvudsakliga nätverksriktningen."
  responsibility="Vilket trafikmönster ni standardiserar på internt och hur ni driver det över team."
>}}

{{< boundary-row
  topic="Persistent lagring"
  service="Cinder CSI kan aktiveras med lagringsklasserna `fast` och `large`."
  responsibility="Er PVC-design, era förväntningar på retention, beteendet hos stateful workloads och applikationsnivåns datastrategi."
>}}

{{< boundary-row
  topic="Autentisering"
  service="OIDC-baserad klusteråtkomst dokumenteras via portalutfärdad kubeconfig och `kubelogin`."
  responsibility="Era RBAC-konventioner, tenantmodell, gruppmappning och intern åtkomststyrning."
>}}

{{< boundary-row
  topic="GPU-arbetslaster"
  service="GPU-kapabla worker-noder ingår i det dokumenterade erbjudandet."
  responsibility="Era schemaläggningsregler, runtime-förväntningar, modellpaketering och kostnadskontroll för arbetslaster."
>}}

{{< boundary-row
  topic="Observerbarhet"
  service="Gränsen är explicit i stället för dold."
  responsibility="Prometheus, Grafana, Loki, larm, dashboards, loggretention och incidentflöden ingår fortfarande i er plattformsdesign."
  last="true"
>}}

Den sista raden är värd att säga tydligt.

Safespring presenterar inte On-demand Kubernetes som om varje operativt bekymmer ingår i tjänsten. Den aktuella dokumentationen rekommenderar att ni driftsätter er egen observerbarhetsstack, och klusterloggar lagras eller övervakas inte som standard för on-demand-kluster.

För vissa team kan det se ut som en lucka. För andra är det en sund och realistisk gräns. Det betyder att tjänsten tar ansvar för själva klusterplattformen utan att låtsas att observerbarhet på arbetslastnivå kan lösas generiskt för varje kund.

## Varför den här tjänsteformen spelar roll

Den operativa formen på en Kubernetes-tjänst spelar större roll än etiketten den får.

En tjänst kan ha en lång funktionslista och ändå skapa mycket plattformsarbete för kunden om standardvalen är svaga eller ansvarsfördelningen otydlig. Omvänt kan en tjänst vara övertygande även utan att försöka hantera varje lager, så länge tjänstegränsen är sammanhängande och dokumenterad.

Det är där Safespring On-demand Kubernetes blir intressant för ingenjörer.

Den kombinerar några val som passar bra ihop:

- Talos som nodgrund
- Cilium som standardriktning för nätverk
- Gateway API-stöd i tjänstemodellen
- Cinder-baserad persistent lagring
- OIDC-baserad klusteråtkomst
- ett hanterat kontrollplan i stället för ett bring-your-own-control-plane-mönster

Inget av dessa val är mystiskt i sig. De flesta plattformsteam känner igen dem direkt. Värdet ligger i att de kombineras till en konsekvent startpunkt för tjänsten, i stället för att bli en lista med integrationer som varje kund måste lösa från grunden.

## Där din egen Kubernetes-erfarenhet fortfarande spelar roll

Att använda en tjänst som denna gör inte Kubernetes-kunskap mindre viktig. Det ändrar bara var den kunskapen bäst används.

Om ditt team redan kör Kubernetes självt är den erfarenheten fortsatt mycket relevant inom områden som:

- design av namespaces, RBAC och klusteranvändning över flera team
- val mellan ingressmönster och gatewaymönster
- beslut om hur stateful workloads ska använda persistenta volymer
- design av observerbarhet och larm som passar era applikationer
- förståelse för feldomäner på arbetslastnivå, inte bara på nodnivå
- beslut om när GPU-arbetslaster hör hemma i Kubernetes och när de inte gör det

Med andra ord kan tjänsten minska mängden klusterinfrastruktur ni behöver äga, men den tar inte bort behovet av plattformsteknik kring arbetslaster och drift.

Det är ofta en bra avvägning.

## Ett praktiskt sätt att utvärdera Safespring On-demand Kubernetes

För team som vill utvärdera tjänsten på allvar tycker vi att de bästa frågorna är:

1. Stämmer den dokumenterade tjänstegränsen med hur vi vill dela upp plattformsarbetet internt?
2. Ligger nätverks-, åtkomst- och lagringsstandarderna tillräckligt nära våra verkliga krav?
3. Har vi större nytta av ett hanterat kontrollplan än av att designa det lagret själva?
4. Är vi bekväma med att äga vår egen observerbarhet, våra arbetslaststandarder och våra högre plattformskonventioner ovanpå tjänsten?
5. Passar de dokumenterade byggstenarna de applikationer vi faktiskt kör, inte bara de kluster vi vill skapa?

De frågorna leder oftast till en mer användbar teknisk diskussion än generella debatter om huruvida hanterad Kubernetes är "bättre" än självhanterad Kubernetes.

## Avslutande tanke

Om du är van vid att bygga kluster själv är Safespring On-demand Kubernetes förmodligen mest användbart att tänka på som en dokumenterad plattformsbas.

Den ger dig ett hanterat kontrollplan, en självbetjäningsväg för provisionering, en vald nodoperativmodell, en standardriktning för nätverk, lagringsintegrationer, identitetsintegration och stöd för GPU-kapabla arbetslaster. Samtidigt lämnar den tillräckligt mycket av de övre plattformslagren i era händer för att ni ska kunna forma arbetslastupplevelsen efter era egna behov.

Den balansen är ofta där en tjänst blir genuint användbar för ingenjörsteam.

Inte för att den tar bort Kubernetes.

Utan för att den minskar mängden Kubernetes-plattformsarbete som behöver upprepas för varje kluster.

{{< horisontal-card
    image="/img/graphics/safespring-image.svg"
    alt="Safespring On-demand Kubernetes för plattformsteam"
    cardtitle="Gå igenom plattformsgränsen utifrån era egna behov"
    text="Om du vill utvärdera Safespring On-demand Kubernetes för era arbetslaster, börja med den dokumenterade tjänstegränsen: kontrollplan, nätverk, lagring, åtkomst, observerbarhet och dag två-drift."
    link="/kontakt/"
    linktext="Diskutera era krav"
>}}
