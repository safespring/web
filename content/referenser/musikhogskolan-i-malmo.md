---
title: "Musikhögskolan i Malmö"
date: 2019-01-06T13:32:28+01:00
draft: true
intro: "Musikhögskolan i Malmö (MHM) behövde sätta upp egna system i Safespring Compute, men den centrala IT-policyn krävde att alla system passerade genom centrala brandväggar."
background: "safespring_bilder_mhm.jpg"
socialmedia: ""
---
## Musikhögskolan i Malmö får en expressförbindelse (Saferoute) till Safespring Compute
Musikhögskolan i Malmö (MHM) behövde sätta upp egna system i Safespring Compute, men den centrala IT-policyn krävde att alla system passerade genom centrala brandväggar.

Safespring Saferoute är en nätverkstjänst som gör det möjligt att sätta upp en MPLS-förbindelse mellan Safesprings plattform och det enskilda lärosätet, med möjlighet att använda lärosätets IP-adresser i Safespring Compute.

På så sätt hamnar de resurser som sätts upp Safespring Compute logiskt bakom de centrala brandväggarna vilket gör att IT-policyn kan följas.

### Hur Musikhögskolan i Malmö använder Saferoute
Saferoute erbjuder ett sätt att nära integrera din lokala infrastruktur med den virtuella infrastrukturen som körs hos Safespring.

Safespring tillhandahåller beräkningstjänster där de virtuella servrarna som körs på Safespring har tillgång till offentliga IP-adresser från SUNET. I de flesta fall är det tillräckligt eftersom Safesprings-plattformen har byggt in brandväggsfunktioner för att säkerställa att endast tillåten trafik når de virtuella servrarna i plattformen.

Om man behöver ha en privat anslutning till instanserna är det möjligt att ställa in en tunnel från campusnätverket till Safesprings infrastruktur via Internet. Detta visas längst till vänster på bilden.

<img src="/referenser/images/musikhogskolan-i-malmo_Safespring.png" style="width: 100%">

### Anledningen till valet av Saferoute från Safespring
Musikhögskolan i Malmö är ansluten till SUNET genom Lunds universitet, som har en central IT-policy att all extern trafik ska hanteras av centrala brandväggar vid LDC. Med denna policy kunde MHM inte använda standardinställningen med VPN-tunnel eftersom det inte kunde garanteras att all trafik till och från de virtuella servrarna i plattformen skulle gå igenom LDC: s brandväggar. Detta beror på att IP-adresserna på de virtuella servrarna skulle vara centrala offentliga IP-adresser från SUNET och inte egna LDC.

För att lösa detta beställde MHM Saferoute från Safespring vilket är en dedikerad MPLS-routinginstans via SUNETs nätverk som ger följande fördelar:

- IP-adresserna som tillhandahålls till instanserna kommer att vara LDC:s egna adresser, vilket ser till att all trafik till och från instanserna går genom LDC:s brandväggar.
- Ett privat nätverk till instanserna är upprättat så att ingen ytterligare hantering av en tunnel via Internet behövs för att kommunicera mellan servrar på campus och instanser i plattformen.
