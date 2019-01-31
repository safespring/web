---
title: "Musik- och Teaterbiblioteket"
date: 2019-01-10T16:59:47+01:00
draft: true
intro: "En lokal filserver (NAS) används för att lagra masterdata som synkroniseras med Safesprings lagringslösning, orkesterat av den befintliga interna backuplösningen."
background: "safespring_bilder_musik-och-teaterbiblioteket.jpg"
socialmedia: ""
---

## Vad är musik- och teaterbiblioteket?
Musik- och teaterbiblioteket har som uppgift att arkivera noter, teatermanuskript och koreografidokument som produceras i Sverige. För att förenkla tillgången har ett kontinuerligt projekt för digitalisering av det stora antalet dokument varit igång de senaste 20 åren.

Eftersom det är mycket arbete med att digitalisera de fysiska dokumenten, är behovet av en pålitlig och säker lagringslösning hög. Masterdata, som kan användas för forskning, måste lagras i högupplösta format och därför måste lagringslösningen kunna hantera stor mängd data på ett flexibelt sätt.

### Varför Safespring?
IT-avdelningen för Musik- och teaterbiblioteket är mycket liten och hanterar cirka 30 virtuella servrar som hanterar både interna system och externa tjänster. Före Safespring användes en kommersiell lagringslösning på plats, men den var dyr och oflexibel. Det var anledningen till att IT-avdelningen började leta efter en molnbaserad lösning. Safesprings "Active Archive",  som är en S3-kompatibel lösning, visade sig vara en perfekt match.

### Anledningen till valet av Safesprings "Active Archive":
- Alla data lagras lokalt i Sverige.
- Safespring erbjuder ett lokalt och effektivt stöd.
- Lösningen är flexibel och lätt att hantera.

### Den tekniska lösningen
Masterdata måste lagras säkert, men det är inte den data som de flesta användare arbetar med. Den komprimerade tillgängliga datan tar mycket mindre utrymme och lagras i den lokala infrastrukturen hos Musik- och teaterbiblioteket.

En lokal filserver (NAS) används för att lagra masterdata och synkroniseras med Safesprings lagringslösning. Synkroniseringen är orkesterad av den befintliga interna backuplösningen. Från och med nu tas ingen data bort från NAS och därför har Musik- och teaterbiblioteket en geografiskt divergerande lagringslösning för data.

Senare, när data växer ännu mer, kommer äldre data att tas bort från NAS för att endast lagras i Safesprings lösning. Projektet startade 2016 och data som lagras hos Safespring har ökat stadigt sedan dess.
