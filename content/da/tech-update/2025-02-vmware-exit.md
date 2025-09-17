---
ai: true
title: "Kan VMware erstattes? Måske ..."
date: 2025-02-20
intro: "VMware er designet til hosting og administration af interne it-systemer, mens Safespring leverer tjenester til drift af applikationer og systemer i skyen. Hver har sine særskilte styrker og svagheder."
draft: false
tags: ["English"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "da"
sectiontext: "Blog"
section: "Teknisk opdatering"
author: "Gabriel Paues"
TOC: "I dette indlæg"
aliases:
  - /blogg/2025/2025-02-vmware-exit/
---
{{< ingress >}}
Med Broadcoms opkøb af VMware har mange virksomheder og organisationer, der har bygget deres infrastruktur på VMware, fået en ubehagelig overraskelse: en ny abonnementsbaseret model og generelt højere priser.
{{< /ingress >}}

{{% accordion title="TL;DR" %}}

1. Broadcoms opkøb af VMware har vakt bekymring over abonnementsbaseret prissætning og højere omkostninger.
2. Selvom VMware er stærk til on-premises virtualisering, tilbyder Safespring et cloud-native alternativ baseret på OpenStack (virtualisering), Ceph (lagring) og containere.
3. Det er ikke en direkte drop-in-erstatning; i stedet muliggør Safespring modernisering af IT-infrastrukturen med værktøjer til netværkssikkerhed, robuste tjenester (via Elastic IPs og Server Groups) og fleksible VPN-muligheder som WireGuard.
4. Bygget på open source-teknologier undgår Safesprings løsninger leverandørlåsning, giver administratorer direkte kontrol og sikrer forudsigelige, gennemsigtige priser over tid.

{{< localbutton text="Lad os tage en snak" link="#conclusion" >}}

{{% /accordion %}}
{{< accordion-script >}}

## VMware-tilbuddet

I mere end 20 år har VMware været den mest succesfulde aktør på markedet for virtualiseringsløsninger. VMware har tilbudt fleksibilitet (gennem virtualisering) samt andre funktioner og produkter, der letter systemadministratorers arbejde. Gennem gode designvalg har mange kunder kunnet migrere gamle fysiske systemer direkte til VMware. Med robust overvågning, backend-lagring og softwaredefinerede netværk (SDN) har VMware gjort det muligt at sætte systemer op på en robust og redundant måde, som kræver minimale ændringer i selve softwarekonfigurationen af systemerne. Derudover indeholder VMware indbyggede funktioner til netværkssikkerhed.

Denne funktionalitet har gjort det muligt for systemadministratorer at håndtere komplekse IT-miljøer med minimal overhead. IT-administratorer er også blevet aflastet fra at skulle håndtere de indviklede detaljer i at opbygge robusthed og redundans, da platformen tager sig af disse opgaver.

## Safesprings tilbud

Safespring tilbyder en cloud-baseret virtualiserings- og lagringsløsning bygget på OpenStack og Ceph. Derudover leverer Safespring en containerplatform baseret på OKD og en S3-kompatibel objektlagringsløsning.

{{< quote "Gabriel Paues (Cloud-arkitekt)" >}}
Det er vigtigt at bemærke, at Safesprings tilbud ikke er en drop-in-erstatning for VMware. VMware er designet til at hoste og administrere interne IT-systemer, mens Safespring leverer tjenester til at køre applikationer og systemer i skyen.
{{< /quote >}}

Hver har sine tydelige styrker og svagheder.

Når det er sagt, er der flere måder, hvorpå kunder kan modernisere deres applikationsudrulning, så den passer ind i et cloud-miljø og dermed fjerner afhængigheder af den underliggende virtualiseringsplatform.

### Netværkssikkerhed

Systemer, der kører på en VMware-platform, er ofte organiseret i interne og eksterne netværkszoner. Eksterne tjenester placeres i en ekstern netværkszone med strengere sikkerhedskrav, mens interne tjenester kører i en intern netværkszone med mere lempelige politikker. I denne opsætning stoler mange systemadministratorer på platformen for netværkssikkerhed i stedet for at implementere den direkte på hvert system.

Politikker for sikkerhedsopdateringer er ofte strengere for den eksterne zone end for den interne. For eksempel behøver systemer i den interne zone måske ikke at bruge kryptering, mens de i den eksterne zone skal.

### Mere fleksibelt end VPN-tunneler

Mange systemintegratorer bruger VPN-tunneler til at forbinde sig eksternt til systemer hostet andre steder. Den mest almindelige løsning er IPSec, som er sikker, men har udfordringer i opsætningen og interoperabilitetsproblemer. IPSec er primært designet til site-til-site- eller klient-til-site-forbindelser og kan være besværlig at konfigurere til system-til-system-kommunikation.

IPSec bruger én kanal til kryptering og en anden til at transmittere den krypterede data, hvilket gør det udfordrende at passere gennem firewalls. Som følge heraf termineres IPSec-tunneler ofte direkte på firewallen.

Når man sikkert forbinder ressourcer hos en traditionel hostingudbyder, er fremgangsmåden at opsætte en IPSec-tunnel mellem kundens interne miljø og hostingudbyderen og aggregere al trafik gennem disse to steder.

Moderne VPN-løsninger som WireGuard tilbyder dog en mere fleksibel tilgang. WireGuard er tilstandsløs (stateless) og krypterer hver pakke separat, hvilket forenkler passage gennem forskellige IT-miljøer. Bygget på UDP for hastighed, lader den indkapslede TCP-sessioner håndtere genforsendelser og pakkeintegritet.

Da Safesprings netværksstak er baseret på IP-til-IP-forbindelse, er den traditionelle site-til-site-metode suboptimal. I stedet opfordres kunder til at bygge et overlay-netværk, der spænder over både det interne og cloud-miljøet. WireGuards tilstandsløse natur gør den ideel til sådanne opsætninger. I stedet for at forbinde alle systemer gennem en enkelt central IPSec-tunnel kan kunder etablere et mesh-netværk, hvor hvert system forbinder direkte til andre efter behov. Open source-projekter som [Netbird](https://netbird.io/) kan forenkle konfigurationen af sådanne løsninger.

### Robusthed

Robusthed kan opnås på forskellige måder. Organisationer, der er vant til VMware, baserer sig sandsynligvis på værktøjer som belastningsbaseret automatisk live-migrering (DRS) og integreret softwaredefineret netværk (SDN) for at sikre, at tjenester forbliver tilgængelige. I sådanne tilfælde håndterer virtualiseringsplatformen robustheden, hvilket kræver minimal tilpasning af selve applikationerne.

Safesprings OpenStack-løsning tilbyder værktøjer til at opnå lignende robusthed:

{{< icon-block-horisontal color="#417DA5" icon="fas fa-network-wired" text="Elastic IP" description="Disse kan bruges sammen med produkter som HAProxy og Traefik til lastbalancering og netværksrobusthed." link="" >}}
{{< icon-block-horisontal color="#417DA5" icon="fas fa-server" text="Server Groups" description="Disse sikrer, at klyngemedlemmer i en tjeneste kører på forskellige hardwarenoder i platformen." link="" >}}

Ved at bruge disse værktøjer kan tjenester konfigureres til redundans og robusthed. For eksempel kan en tjeneste køre på tværs af flere klyngemedlemmer, der er fordelt på forskellige hardwarenoder via Server Groups. Elastic IPs kan fordele trafikken mellem klyngemedlemmerne, samtidig med at en fælles IP-adresse bevares.

Selvom denne tilgang kræver manuel opsætning, giver den administratorer en bedre forståelse af løsningen og skaber dermed tryghed.

## Konklusion

Safesprings tjenester giver organisationer mulighed for at transformere deres interne IT til moderne cloud-baserede løsninger, samtidig med at sikkerhed, tilgængelighed og robusthed bevares. I stedet for at være afhængig af, at en platform håndterer disse opgaver automatisk, får administratorer viden og værktøjer til selv at håndtere potentielle problemer.

Safesprings løsninger er bygget på åbne standarder, og principperne kan overføres til andre tjenester. Desuden betyder det, at de er baseret på open source-produkter, at der ikke kommer uventede ændringer i faktureringen som følge af reviderede licensmodeller.

{{% custom-card image="/img/card/safespring-move-from-vmware.svg" cardtitle="Vil du migrere dine VMware-workloads til Safespring?" %}}
Safespring tilbyder en gratis vurdering, der hjælper dig med at migrere workloads fra VMware til vores platform, skræddersyet til dine behov.

{{< localbutton text="Start vurderingen" link="https://next.safespring.com/apps/forms/s/miJx5AFAb988X5EjwCLF5LGd" >}}

{{% /custom-card %}}