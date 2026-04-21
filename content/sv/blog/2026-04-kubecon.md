---
ai: true
title: "KubeCon + CloudNativeCon Europe 2026 - sammanfattning från Amsterdam"
date: "2026-04-02"
intro: "KubeCon + CloudNativeCon Europe 2026 hölls på Amsterdam RAI den 23-26 mars och samlade över 13 500 deltagare från fler än 100 länder och 3 000 organisationer, med nästan 900 sessioner. Det var den största KubeCon hittills."
draft: false
sectiontext: "Blogg"
section: "Blogg"
tags: ["container", "event"]
showthedate: true
card: "2026-kubecon-amsterdam-card.webp"
eventbild: ""
socialmediabild: ""
language: "sv"
author: ""
---

{{< ingress >}}
Det centrala temat för årets KubeCon var tydligt: cloud native-infrastruktur är AI-infrastruktur, och ekosystemet håller på att organisera om sig runt den verkligheten. Safespring var förstås på plats och tog del av det senaste från branschen.
{{< /ingress >}}

![Entrén till Amsterdam RAI under KubeCon + CloudNativeCon Europe 2026.](/img/blogg/2026-kubecon-amsterdam-venue.webp)

## Höjdpunkter från keynotes

De inledande keynotes satte tonen med en tydlig makroprognos: 2023 gick ungefär två tredjedelar av AI-beräkningarna till träning och en tredjedel till inferens. I slutet av 2026 väntas den relationen ha vänt, och efterfrågan på inferensberäkning beräknas nå 93,3 gigawatt före decenniets slut. Budskapet var direkt: Kubernetes håller på att bli kontrollplanet för AI-infrastruktur, och CNCF-ekosystemet positionerar sig för att äga det lagret. Kanske till slut som operativsystemet för datacentret.

**NVIDIA** donerade sin DRA GPU-driver till Kubernetes SIG Node som en referensimplementation för det leverantörsneutrala Dynamic Resource Allocation API:t.

**Projektmilstolpar** från konferensen: Kyverno och Dragonfly blev graduated projects, Fluid och Tekton flyttades till incubation, och LLMD, ett distribuerat inferenssystem byggt för Kubernetes, presenterades som ett nytt CNCF sandbox-projekt.

![Safespring i showcase-området på KubeCon + CloudNativeCon Europe 2026 i Amsterdam.](/img/blogg/2026-kubecon-showcase.webp)

---

## FluxCon och FluxCD

FluxCon Europe 2026 kördes som ett co-located event den 23 mars, med sessioner som sträckte sig från enterprise-rollouts till visualisering av GitOps i skala med det nya Flux UI:t.

En tydlig lärdom var arbetet projektet har lagt på att anpassa Claude agent skills så att de verkligen passar det FluxCD gör.

Det har blivit något av en SRE för din GitOps-pipeline.

---

## CiliumCon och Cilium

CiliumCon återvände till Amsterdam för sin sjunde upplaga den 23 mars, passande nog eftersom detta också markerade **Ciliums 10-årsjubileum**. Eventet kom kort efter releasen av Cilium v1.19.

Agendan på CiliumCon visade ett moget ekosystem. Samtalen hade rört sig förbi "hur adopterar vi Cilium?" och vidare till "hur kör vi det i stor skala med avancerade funktioner?", inklusive skalning av Tetragon-policyer, multikluster-nätverk över hundratals kluster och ersättning av äldre hårdvarubaserade lastbalanserare.

En stark säkerhetstråd löpte genom dagen, från Tetragon-baserad policy enforcement per arbetslast till hårdvaruaccelererade säkerhetspolicyer på DPU:er. Projektet positionerar sig också som nätverksdataplan för AI-arbetslaster, vilket är en naturlig passform med tanke på dess eBPF-baserade prestandaprofil.

---

![Besökarmöte vid KodeKlouds monter under KubeCon + CloudNativeCon Europe 2026.](/img/blogg/2026-kubecon-kodekloud.webp)

## Sammanfattning

Efter fyra dagar i Amsterdam var det som fastnade mest inte en enskild nyhet, utan förändringen i hur människor pratade. För ett år sedan i London kändes AI på KubeCon lite påklistrat. Alla gjorde det och alla hade en MCP-server för sitt use case, sin arbetslast eller sin applikation. Den här gången var det mer avsiktligt överallt: säkerhet, nätverk, GitOps, observerbarhet, schemaläggning, allt. Cilium och Flux var två exempel på projekt som lutade sig in i det, men samma rörelse syntes i nästan hela ekosystemet. AI är inte ett tillägg till tjänsten eller applikationen, utan något man anpassar sig för. Oavsett om det handlar om att virtualisera ett helt rack GPU-noder och använda NVLink för att få dem att agera som "en", eller om att forma skills och plugins specifikt för att passa din applikation, så finns AI där.

Till skillnad från tidigare år var det inte bara hype och MCP överallt. AI används i produktion, och gapet mellan "det här fungerar i en demo" och "det här fungerar i produktion" är inte längre lika tydligt. AI har mognat.

---

![Safespring-teamet utanför Amsterdam RAI under KubeCon + CloudNativeCon Europe 2026.](/img/blogg/2026-kubecon-team.webp)

## Anders reflektioner

1. AI finns överallt. På alla nivåer i stacken. Om du anpassar hårdvaran efter ditt behov eller justerar orkestratorn efter din arbetslast, så gör du AI-infrastruktur.
2. KubeVirt mognar, tack vare de senaste licensförändringarna hos populära plattformar och behovet av en AI-orkestrator.
3. Tack vare AI verkar MultiCluster och ClusterMesh vara på uppgång. Titta till exempel på vad solo.io gör med kagent, agentgateway och kgateway.

## Ahmets reflektioner

1. AI finns överallt just nu, men mycket skulle fortfarande kunna lösas med ett enkelt skript utan all extra kostnad och komplexitet.
2. Digital suveränitet blev ett stort ämne, särskilt när fler team vill ha kontroll över sin infrastruktur och sina data.
3. Observerbarhet känns som att den slår i en vägg. Det finns redan så mycket data, och det svåra är att förstå vad som faktiskt är användbart.

## Anands reflektioner

1. En av de stora höjdpunkterna för mig på KubeCon var Project Pavilion, där jag kunde prata direkt med CNCF-projektens maintainers och core contributors. Det är ovanligt att få den typen av tillgång till de personer som bygger något verkligt betydelsefullt.
2. För första gången kändes det verkligen som att open source sätter riktningen, inte bara de stora molnleverantörerna eller stora företagen, utan en global community som tillsammans formar det som kommer härnäst.
3. På den tekniska sidan var det inspirerande att se KubeVirt få verklig fart, AI förändra observerbarhet från att bara samla signaler till att faktiskt tolka dem, och suveränitet byggas in från början. Det är spännande att vara del av en community där vi inte bara kör system längre, utan bygger framtiden.
