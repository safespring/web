---
ai: true
title: "Safesprings nätverksmodell förklarad"
date: "2022-03-24"
intro: "\"Många är förbryllade över nätverksstacken i Safespring OpenStack"
compute platform. Let's check it out and do some explanation."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknikuppdatering"
author: "Jarle Bjørgeengen"
language: "sv"
toc: "Innehållsförteckning"
aliases:
    - /blogg/2022-03-network
    - /blogg/2022/2022-03-network/
---
{{< ingress >}}
Den här bloggposten förklarar de olika aspekterna av Safesprings nätverksstack ur ett användarperspektiv.
{{< /ingress >}}

Om du kommer från andra plattformar som använder det föråldrade tillvägagångssättet med «lager 2-bryggning» (med mjukvarudefinierade switchar, routrar, flytande IP-adresser etc.), läs hela inlägget för att förstå konsekvenserna. Det fungerar inte som du tror :-). Förkunskaper för att förstå detta inlägg är grundläggande kunskap om CIDR-notation, IP-protokoll (TCP, UDP, ICMP) och IP-baserad åtkomstkontroll.

{{% accordion title="TL;DR (Sammanfattning)" %}}
**Anslut inte mer än ett gränssnitt; det förstör kommunikationen**

Safesprings beräkningsplattform använder [Calico][calico], OpenStack Neutron-kärnplugin, för nätverk.

Använd säkerhetsgrupper för att möjliggöra kommunikation mellan Safespring-instanser och mellan Safespring-instanser och Internet.

IP-adresser tilldelas från en delad pool men ändras inte under en instans livstid.

Du kan inte ta med egna IP-adresser om du inte skapar egna tunnlar ovanpå dina instanser.

Det finns ingen pool med flytande IP-adresser.

Klicka igenom de sju vyerna i diagrammet nedan för att förstå hur kommunikationen sker baserat på medlemskap i säkerhetsgrupper och deras regler.

{{% /accordion %}}
{{< accordion-script >}}

{{< distance >}}

[calico]: https://www.tigera.io/project-calico/

<iframe src="/img/safespring-network.sozi.html"  width="100%" height="500" style="border:0"></iframe>

## Förklaring

Alla rutor i diagrammet innehåller samma tre instanser som är anslutna till nätverken `public`, `default-v4-nat` och `private`.

{{% note "Observera" %}}
Observera att ingen av instanserna har mer än ett gränssnitt; endast gränssnittet mot det nätverk de är anslutna till.
{{% /note %}}

Varje diagramruta exemplifierar vilken effekt säkerhetsgrupper och deras regler har på hur anslutningar får ske. Det här inlägget handlar bara om hur plattformen fungerar, så vad som händer i instansernas operativsystem ligger utanför inläggets scope.

För att förklara hur utgående regler (egress) och ingående regler (ingress) samverkar börjar diagrammet med instanser som inte är medlemmar i några säkerhetsgrupper. (dvs. standard-säkerhetsgruppen som inkluderar utgående trafik till världen har tagits bort)

Röda streckade pilar visar att anslutning inte är möjlig. Gröna heldragna pilar visar en tillåtande regel med pilen pekandes i den tillåtna riktningen.

1. Ingen av instanserna kan kommunicera med någon.
2. En utgående (E) regel läggs till för att tillåta instansen på `public`-nätet
   (den publika instansen) att nå valfri IPv4-adress på Internet på valfri
   port. Utgående anslutning visualiseras med pilens riktning.
3. En ingående (I) regel läggs till för att tillåta valfri IPv4-adress på Internet att kontakta
   den publika instansen på port 443. (Pilen går från Internet till
   instansen)
4. En ingående (I) regel läggs till på instansen på `default-v4-nat`-nätet
   (standardinstansen) som tillåter den publika instansen att nå standardinstansen
   på port 80 (tcp). Det är här många användare tror att de behöver ett separat
   «ben» från den ”publika instansen” till `default-v4-nat`-nätet. Det är inte bara onödigt, det kommer också att fullständigt förstöra kommunikationen på den publika
   instansen. Observera att den utgående regeln från punkt 3 redan tillåter utgående
   trafik från den publika instansen; därför behöver vi inte lägga till en regel för
   det.
5. En ingående (I) regel läggs till på den publika instansen som tillåter
   standardinstansen att nå den publika instansen på port 3333 (tcp). Eftersom
   inga utgående regler var kopplade till standardinstansen måste vi också
   tillåta utgående trafik (egress) till den publika instansen på port 3333.
6. En ingående (I) regel läggs till på standardinstansen som tillåter instansen på
   `private`-nätet (den privata instansen) att ansluta till standardinstansen
   på port 4545 (tcp). Även här krävs en utgående regel för den privata instansen.
   I detta fall öppnar vi brett och tillåter den privata instansen att nå alla
   portar i hela IPv4-adressrymden. (Och standardinstansen ingår förstås
   i den). Så det privata nätet borde kunna prata med vilken IPv4-adress på Internet som helst, eller hur? **Fel**. Instanser på det privata nätet kan bara prata
   med andra Safespring-instanser i samma sajt, under förutsättning att
   säkerhetsgruppsregler tillåter det.
7. En utgående (E) regel läggs till som tillåter standardinstansen att nå 1.1.1.1 på
   port 443 (tcp). Detta fungerar eftersom `default-v4-nat` är konfigurerat för att göra Network Address
   Translation (NAT). Var bara medveten om att källadressen som ses från 1.1.1.1
   förstås **inte** är den som finns på instansens gränssnitt. Det är i själva verket
   den publika adressen på compute-värden som instansen kör på.
   (Som gör NAT/Maskering)

## Andra fallgropar

En instans **måste** alltid ha den Safespring-tillhandahållna gatewayen (från
DHCP) som första routningshopp. Om du försöker lägga till (i operativsystemet)
en annan standard-gateway, eller en statisk route via en annan, kommer paketen
bara att släppas och det kommer inte att fungera.
Detta beror på att varje instans har sin egen separata lager 2-anslutning till den
Safespring-tillhandahållna gatewayen, och därmed routas all trafik genom den på lager 3. Denna router är alltid första hoppet, som automatiskt konfigureras av DHCP.

Följaktligen, om du behöver ett eget nät ovanpå Safespring-
plattformen, måste du använda någon form av tunnling som Wireguard, IPIP, GRE etc.,
som skapar ett eget overlay-nät som du som användare kontrollerar.

## Varför Calico

- {{< inline "Enkelhet/Säkerhet:" >}} Dvs mindre komplexitet => mindre angreppsyta och färre
  saker som kan gå fel.
- {{< inline "Prestanda:" >}} Ren BGP-routing är betydligt mer högpresterande än att
  (åter)skapa virtuella switchlager och **sedan** lägga lager 3 ovanpå igen. Vi
  kommer nära linjehastighet med mycket liten overhead med detta angreppssätt.
- {{< inline "Skalbarhet:" >}} BGP skalar Internet. Calico skalar datacentret på liknande sätt
  med BGP.
- {{< inline "Kostnad:" >}} Ingen dyr leverantörs-«inlåsning» med kostnader kopplade. Mindre overhead =>
  mindre beräkningskraft => lägre energiförbrukning för samma arbete => grönare och
  billigare.

## Sammanfattning

- Använd bara ett gränssnitt per instans
- Säkerhetsgrupper **är** brandväggen. Anpassa din design för att utnyttja denna
  egenskap hos plattformen, med hjälp av automationsverktyg som Terraform, till exempel
  (ordvits inte avsedd) \* Öppna bara det du behöver med säkerhetsgrupper.
- Ändra inte instansernas gränssnitts-/nätverkskonfiguration bort från
  att använda DHCP.
- Använd tunnling ovanpå vår lager 3-nätverksstack om du måste
  ha lager 2-anslutning mellan instanser.
- Safesprings «nätverk» är bara en mekanism för att tilldela IP-adresser från en
  CIDR. Varje instans routas separat (med /32-prefix) av plattformen. Instansen
  kan bara prata med gatewayen över lager 2, så i praktiken måste all
  trafik gå via den plattformslevererade gatewayen på lager 2.