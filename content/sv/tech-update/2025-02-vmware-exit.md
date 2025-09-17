---
ai: true
title: "Går det att ersätta VMware? Det kanske finns..."
date: 2025-02-20
intro: "VMware är avsett för drift och hantering av interna IT-system, medan Safespring tillhandahåller tjänster för att köra applikationer och system i molnet. Båda har sina tydliga styrkor och svagheter."
draft: false
tags: ["English"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "sv"
sectiontext: "Blogg"
section: "Teknikuppdatering"
author: "Gabriel Paues"
TOC: "I det här inlägget"
aliases:
  - /blogg/2025/2025-02-vmware-exit/
---
{{< ingress >}}
I och med Broadcoms förvärv av VMware har många företag och organisationer som byggt sin infrastruktur på VMware mötts av en otrevlig överraskning: en ny abonnemangsbaserad modell och generellt högre priser.
{{< /ingress >}}

{{% accordion title="TL;DR" %}}

1. Broadcoms förvärv av VMware har väckt oro över abonnemangsbaserad prissättning och högre kostnader.
2. Medan VMware är starkt på lokal virtualisering erbjuder Safespring ett moln-nativt alternativ baserat på OpenStack (virtualisering), Ceph (lagring) och containrar.
3. Det är ingen direkt drop-in-ersättning; i stället möjliggör Safespring modernisering av IT-infrastrukturen med verktyg för nätverkssäkerhet, resilienta tjänster (via Elastic IP-adresser och Server Groups) samt flexibla VPN-alternativ som WireGuard.
4. Byggda på öppen källkod undviker Safesprings lösningar inlåsning, ger administratörer praktisk kontroll och säkerställer förutsägbar, transparent prissättning över tid.

{{< localbutton text="Låt oss prata" link="#conclusion" >}}

{{% /accordion %}}
{{< accordion-script >}}

## VMware-erbjudandet

I mer än 20 år har VMware varit den mest framgångsrika aktören på marknaden för virtualiseringslösningar. VMware har erbjudit flexibilitet (genom virtualisering) samt andra funktioner och produkter som underlättar systemadministratörers arbete. Genom goda designval har många kunder kunnat migrera gamla fysiska system direkt till VMware. Med robust övervakning, backend-lagring och lösningar för programvarudefinierade nätverk (SDN) har VMware möjliggjort att system kan sättas upp på ett resilient och redundant sätt, med minimala förändringar i systemens faktiska mjukvarukonfiguration. Dessutom ingår inbyggda funktioner för nätverkssäkerhet i VMware.

Denna funktionalitet har gjort det möjligt för systemadministratörer att hantera komplexa IT-miljöer med minimalt merarbete. IT-administratörer har också sluppit hantera de detaljerade aspekterna av att bygga robusthet och redundans, eftersom plattformen tar hand om detta.

## Safesprings erbjudande

Safespring erbjuder en molnbaserad virtualiserings- och lagringslösning byggd på OpenStack och Ceph. Dessutom tillhandahåller Safespring en containerplattform baserad på OKD samt en S3-kompatibel objektlagring.

{{< quote "Gabriel Paues (Cloud Architect)" >}}
Det är viktigt att påpeka att Safesprings erbjudande inte är en drop-in-ersättning för VMware. VMware är utformat för att hysa och hantera interna IT-system, medan Safespring tillhandahåller tjänster för att köra applikationer och system i molnet.
{{< /quote >}}

Båda har tydliga styrkor och svagheter.

Med det sagt finns det flera sätt för kunder att modernisera sin applikationsdriftsättning så att den passar i en molnmiljö och därmed eliminera beroenden av den underliggande virtualiseringsplattformen.

### Nätverkssäkerhet

System som körs på en VMware-plattform organiseras ofta i interna och externa nätverkszoner. Externa tjänster placeras i en extern nätverkszon med striktare säkerhetskrav, medan interna tjänster verkar i en intern nätverkszon med mer tillåtande policys. I ett sådant upplägg förlitar sig många systemadministratörer på plattformen för nätverkssäkerhet i stället för att implementera den direkt på varje system.

Säkerhetspolicys för uppdateringar är ofta striktare för den externa zonen än för den interna. Till exempel kan det saknas krav på kryptering i den interna zonen, medan sådana krav finns i den externa zonen.

### Mer flexibelt än VPN-tunnlar

Många systemintegratörer använder VPN-tunnlar för att ansluta på distans till system som är hostade på annan plats. Den vanligaste lösningen är IPSec, som är säker men har utmaningar vid installation och interoperabilitetsproblem. IPSec är i första hand utformat för plats‑till‑plats- eller klient‑till‑plats-anslutningar och kan vara bökigt att konfigurera för system‑till‑system-kommunikation.

IPSec använder en kanal för kryptering och en annan för överföring av den krypterade datan, vilket gör det svårt att passera brandväggar. Därför avslutas IPSec-tunnlar ofta direkt i brandväggen.

När man säkert kopplar samman resurser hos en traditionell hosting-leverantör brukar man sätta upp en IPSec-tunnel mellan kundens interna miljö och leverantören, och all trafik samlas då genom dessa två platser.

Moderna VPN-lösningar som WireGuard erbjuder dock ett mer flexibelt angreppssätt. WireGuard är tillståndslös och krypterar varje paket separat, vilket förenklar passage genom olika IT-miljöer. Byggd på UDP för hastighet låter den inkapslade TCP-sessioner hantera omsändningar och paketintegritet.

Eftersom Safesprings nätverksstack bygger på IP‑till‑IP-anslutning är den traditionella plats‑till‑plats-metoden suboptimal. I stället uppmuntras kunder att bygga ett överliggande nät (overlay) som spänner över både den interna och molnmiljön. WireGuards tillståndslösa natur gör den idealisk för sådana upplägg. I stället för att koppla alla system via en enda central IPSec-tunnel kan kunder etablera ett mesh-nät där varje system ansluter direkt till andra vid behov. Öppen-källkodsprojekt som [Netbird](https://netbird.io/) kan förenkla konfigurationen av sådana lösningar.

### Resiliens

Resiliens kan uppnås på flera sätt. Organisationer som är vana vid VMware förlitar sig sannolikt på verktyg som lastbaserad automatisk live-migrering (DRS) och integrerade programvarudefinierade nätverk (SDN) för att säkerställa att tjänster förblir tillgängliga. I sådana fall hanterar virtualiseringsplattformen resiliensen och kräver minimala anpassningar av själva applikationerna.

Safesprings OpenStack-lösning erbjuder verktyg för att uppnå liknande resiliens:

{{< icon-block-horisontal color="#417DA5" icon="fas fa-network-wired" text="Elastic IP" description="Dessa kan användas med produkter som HAProxy och Traefik för lastbalansering och nätverksresiliens." link="" >}}
{{< icon-block-horisontal color="#417DA5" icon="fas fa-server" text="Server Groups" description="Dessa säkerställer att klustermedlemmar i en tjänst körs på olika hårdvarunoder inom plattformen." link="" >}}

Med dessa verktyg kan tjänster konfigureras för redundans och resiliens. Till exempel kan en tjänst köras över flera klustermedlemmar fördelade på olika hårdvarunoder med hjälp av Server Groups. Elastic IP-adresser kan fördela trafiken mellan klustermedlemmarna samtidigt som en gemensam IP-adress bibehålls.

Även om detta tillvägagångssätt kräver manuell uppsättning ger det administratörer en bättre förståelse för lösningen, vilket skapar trygghet och tillförsikt.

## Slutsats

Safesprings tjänster ger organisationer möjlighet att omvandla sin interna IT till moderna molnbaserade lösningar samtidigt som säkerhet, tillgänglighet och resiliens bibehålls. I stället för att förlita sig på att en plattform sköter detta automatiskt får administratörer kunskap och verktyg för att hantera potentiella problem.

Safesprings lösningar bygger på öppna standarder, och principerna som används är överförbara till andra tjänster. Dessutom, genom att vara baserade på produkter med öppen källkod, uppstår inga oväntade förändringar i faktureringen till följd av ändrade licensmodeller.

{{% custom-card image="/img/card/safespring-move-from-vmware.svg" cardtitle="Vill du migrera dina VMware-arbetslaster till Safespring?" %}}
Safespring erbjuder en kostnadsfri utvärdering för att hjälpa dig att migrera arbetslaster från VMware till vår plattform, anpassat efter dina behov.

{{< localbutton text="Starta utvärderingen" link="https://next.safespring.com/apps/forms/s/miJx5AFAb988X5EjwCLF5LGd" >}}

{{% /custom-card %}}