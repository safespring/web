---
ai: true
title: "KubeCon + CloudNativeCon Europe 2026 — Amsterdam Recap"
date: "2026-04-02"
intro: "KubeCon + CloudNativeCon Europe 2026 fandt sted i Amsterdam RAI fra den 23. til 26. marts, og samlede over 13.500 deltagere fra 100+ lande og 3.000+ organisationer på tværs af næsten 900 sessioner - den største KubeCon til dato."
draft: false
sectiontext: "Blog"
section: "blogg"
tags: ["container", "events"]
showthedate: true
card: "2026-kubecon-amsterdam-card.webp"
eventbild: ""
socialmediabild: ""
language: "da"
author: ""
---



{{< ingress >}}
Det centrale tema for dette års KubeCon var umiskendeligt: ​​Cloud native infrastruktur er
AI-infrastruktur, og økosystemet omorganiseres omkring den virkelighed. Selvfølgelig var
Safespring på stedet og nød det seneste fra branchen.
{{< /ingress >}}

![Amsterdam RAI spillestedsindgang under KubeCon + CloudNativeCon Europe 2026.](/img/blogg/2026-kubecon-amsterdam-venue.webp)

## Keynote-højdepunkter

De indledende hovedtoner satte tonen med en klar makroprognose: I 2023 gik omkring to
tredjedele af AI-beregning til træning og en tredjedel til inferens. Ved udgangen af ​​2026
forventes dette forhold at vende, og efterspørgslen efter konklusioner forventes at nå 93,3
gigawatt ved udgangen af ​​årti. Beskeden var direkte - Kubernetes er ved at blive
kontrolplanet for AI-infrastruktur, og CNCF-økosystemet positionerer sig selv til at eje
dette lag. Og måske endelig styresystemet til datacenteret.

**NVIDIA**, donerede sin DRA GPU-driver til Kubernetes SIG Node som en
referenceimplementering for den leverandørneutrale Dynamic Resource Allocation (DRA) API.


**Projektmilepæle** fra konferencen: Kyverno og Dragonfly dimitterede; Fluid og Tekton
flyttede ind i inkubation; LLMD, et distribueret inferenssystem bygget til Kubernetes, blev
annonceret som et nyt CNCF-sandkasseprojekt.

![Safespring på udstillingsområdet KubeCon + CloudNativeCon Europe 2026 i Amsterdam.](/img/blogg/2026-kubecon-showcase.webp)

---

## Fluxcon og FluxCD

FluxCon Europe 2026 kørte som en samlokaliseret begivenhed den 23. marts, sessioner spændte
fra virksomhedsudrulning til visualisering af GitOps i stor skala ved hjælp af den nye Flux
UI.

Hvor en vigtig take away er det arbejde, som projektet har hældt i at skræddersy
Claude-agentkompetencer, så de virkelig passer til det, FluxCD laver.

Og det er blevet ret SRE for din GitOps-pipeline.

---

## CiliumCon og Cilium

CiliumCon vendte tilbage til Amsterdam for sin syvende iteration den 23. marts - og passende
nok, da dette markerede **Ciliums 10 års jubilæum**. Begivenheden kom kort efter udgivelsen
af ​​Cilium v1.19.

CiliumCon-dagsordenen afspejlede et modent økosystem. Samtaler flyttede forbi "hvordan
adopterer vi Cilium?" og til "hvordan kører vi det i skala med avancerede funktioner?" —
inklusive Tetragon-politikskalering, multi-cluster-netværk på tværs af hundredvis af klynger
og udskiftning af ældre hardware-belastningsbalancere.

En stærk sikkerhedstråd løb gennem dagen, fra Tetragon-baseret håndhævelse af politikker pr.
arbejdsbelastning til hardware-accelererede sikkerhedspolitikker på DPU'er. Projektet
positionerer sig også som netværksdataplanet for AI-arbejdsbelastninger, en naturlig
tilpasning i betragtning af dets eBPF-baserede præstationsprofil.

---

![Besøgsmøde på KodeKloud-standen under KubeCon + CloudNativeCon Europe 2026.](/img/blogg/2026-kubecon-kodekloud.webp)

## Oversigt

Da jeg gik ud af Amsterdam efter fire dage, var det, der holdt sig mest, ikke en enkelt
meddelelse - det var skiftet i, hvordan folk talte. For et år siden følte AI hos KubeCon i
London sig fast, alle gjorde det, og alle havde en MCP-server til deres brug, arbejdsbyrde
eller applikation. Denne gang blev det gjort mere med vilje på alle områder - sikkerhed,
netværk, GitOps, observerbarhed, planlægning, you name it. Cilium og Flux var to eksempler
på projekter, der lænede sig ind i det, men det var praktisk talt alle andre hjørner af
økosystemet. Og AI er ikke en tilføjelse til tjenesten eller applikationen - det er noget,
du skræddersyr til. Uanset om du virtualiserer et helt rack af GPU-noder og bruger nvlink
til at gøre dem til "én", eller hvis du stryger færdigheder/plugins specifikt til at passe
til din applikation, er AI der.

Og i modsætning til tidligere år, var dette ikke kun hype og MCP'er overalt. AI bliver brugt
i produktionen, og kløften mellem dette fungerer i en demo og det, der arbejder i
produktionen, er der ikke rigtig længere. AI er modnet.

---

![Safespring-teammedlemmer uden for Amsterdam RAI under KubeCon + CloudNativeCon Europe 2026.](/img/blogg/2026-kubecon-team.webp)

## Anders’ takeaways:
1. AI alle gør det. På alle niveauer af stakken.
Hvis det skræddersyer hw'en til dit behov eller tilpasser orkestratoren, så den passer til
din arbejdsbyrde - så gør du det!
2. KubeVirt modnes - tak for de seneste ændringer af licensering af populær platform og opfordringen til en AI-orkestrator.
3. Takket være AI ser MultiCluster/ClusterMesh ud til at være på vej op. Ser på, hvad solo.io gør med kagent, agentgateway, kgateway for at nævne nogle få.
## Ahmets takeaways:
1. AI er overalt lige nu, men mange ting kunne stadig bare løses med et simpelt script uden alle de ekstra omkostninger og kompleksitet.
2. Digital suverænitet blev et stort emne, især da flere teams ønsker kontrol over deres infrastruktur og data.
3. Observerbarhed føles som om den rammer en væg, der er allerede så mange data, og den svære del er at finde ud af, hvad der faktisk er nyttigt.
## Anands takeaways:
1. Et af de vigtigste højdepunkter for mig på KubeCon var projektpavillonen, hvor jeg kunne tale direkte med CNCF-projektvedligeholdere og kernebidragydere. Det er sjældent, at man får den slags adgang til de mennesker, der bygger noget virkelig effektfuldt.
2. For første gang føltes det virkelig som om, at open source sætter retningen, ikke kun de store cloud-udbydere eller store virksomheder, men et globalt fællesskab, der i samarbejde former det næste.
3. På den tekniske side elskede jeg at se KubeVirt få reelt momentum, AI omforme observerbarhed fra blot at indsamle signaler til faktisk at fortolke dem, og suverænitet blive indbygget ved design. Det er spændende at være en del af et fællesskab, hvor vi ikke bare kører systemer længere, men bygger fremtiden.
