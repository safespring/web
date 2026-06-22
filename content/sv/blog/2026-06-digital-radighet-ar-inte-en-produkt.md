---
title: "Digital rådighet är inte en produkt"
date: "2026-06-10"
intro: "CivSecs rapport Digital rådighet och strukturella beroenden visar hur kontroll, beroenden och handlingsfrihet behöver behandlas som långsiktiga verksamhetsfrågor."
draft: false
tags: ["Svenska"]
showthedate: true
card: "safespring-puzzle.webp"
eventbild: ""
socialmedia: "blogg/socialmedia/safespring-puzzle.jpg"
language: "sv"
section: "blogg"
author: "Gabriel Paues"
aliases:
  - /blogg/2026/2026-06-digital-radighet-ar-inte-en-produkt/
---

{{< ingress >}}
I maj 2026 publicerade CivSec rapporten *Digital rådighet och strukturella beroenden*. Rapporten beskriver hur beroenden till digital infrastruktur byggs upp över tid och hur dessa beroenden påverkar myndigheter, kommuner, företag och andra verksamheter som är beroende av digitala tjänster.
{{< /ingress >}}

Begreppet digital rådighet används som en beskrivning av en organisations förmåga att behålla kontroll över information, system och verksamhetskritiska funktioner över tid. I rapporten kopplas frågan till NIS2, AI Act, DORA och den svenska cybersäkerhetslagen.

Begreppet är relativt nytt. Frågorna är det inte.

På Safespring har vi under flera år skrivit om delar av samma problemområde, ofta från olika utgångspunkter. I vissa fall har diskussionen handlat om jurisdiktion och dataskydd. I andra fall har den handlat om molnarkitektur, AI eller offentlig upphandling. Gemensamt för många av dessa frågor är att de i grunden handlar om kontroll, beroenden och handlingsfrihet.

Flera av resonemangen påminner om det vi tidigare beskrev i artikeln [Det multidimensionella problemet](/blogg/det-multidimensionella-problemet/), där juridik, säkerhet, drift, geopolitiska förutsättningar och verksamhetsrisk behandlas som delar av samma fråga.

## När juridiken möter infrastrukturen

Diskussionen om digital rådighet förs ofta som en teknisk fråga, men många av de mest komplicerade avvägningarna är juridiska.

Det blev tydligt efter Schrems II-domen 2020 och har fortsatt genom arbetet med EU-US Data Privacy Framework. För organisationer som behandlar känslig information uppstår frågor som inte kan besvaras enbart genom att studera tekniska specifikationer.

- Var lagras data?
- Vilken lagstiftning gäller för leverantören?
- Vilka möjligheter finns att flytta data om förutsättningarna förändras?

I white paperet [Läget efter EU-US Data Protection Framework (DPF)](/whitepaper/eu-us-dpf/) beskrev vi hur dessa frågor påverkar riskbedömningen även när data lagras inom Europa.

## Öppna standarder och möjligheten att byta väg

Rapporten återkommer flera gånger till frågan om portabilitet.

Det handlar inte enbart om att kunna exportera data. Det handlar också om hur beroende verksamheten blir av en viss plattform, ett visst gränssnitt eller en viss leverantör.

Därför bygger stora delar av dagens molninfrastruktur på öppna projekt och öppna gränssnitt.

OpenStack används av många organisationer som vill kunna flytta arbetslaster mellan olika miljöer.

Kubernetes används för att skapa en gemensam plattform för containeriserade applikationer.

S3-kompatibla lagringsgränssnitt används för att minska beroendet av en specifik lagringsleverantör.

Tekniken eliminerar inte leverantörsberoenden. Den kan däremot minska kostnaden för framtida förändringar.

Vi har tidigare berört samma frågor i artikeln [Helhetsgrepp om molninfrastrukturen](/blogg/helhetsgrepp-om-molninfrastrukturen/) och i flera texter om OpenStack, Kubernetes och leverantörsoberoende arkitektur.

## Samma frågor dyker nu upp inom AI

Under de senaste två åren har många organisationer börjat diskutera AI på samma sätt som de tidigare diskuterade molntjänster.

Den första frågan handlar ofta om funktionalitet.

Den andra handlar ofta om data.

Den tredje handlar om beroenden.

Var behandlas informationen?

Går modellen att granska?

Kan lösningen flyttas till en annan miljö?

Vilka krav ställer AI Act på dokumentation och transparens?

I rapporten behandlas detta som en del av digital rådighet. Vi ser samma frågor i samtal om privata AI-miljöer, GPU-infrastruktur och användning av språkmodeller inom offentlig sektor.

Ett exempel är vårt arbete med GPU-infrastruktur och federerad maskininlärning, där frågor om dataplacering, kontroll och samarbete mellan organisationer blir en del av den tekniska lösningen. Mer om detta finns på vår sida om [Machine Learning, AI and GPU Resources](/tjanster/machine-learning/).

Länge var detta en diskussion om risker som skulle kunna inträffa. I juni 2026 blev det en diskussion om något som faktiskt hade inträffat.

Fredagen den 12 juni 2026 beordrade det amerikanska handelsdepartementet AI-företaget Anthropic att stänga av åtkomsten till sina två mest kapabla modeller, Fable 5 och den underliggande Mythos 5, för samtliga utländska medborgare, oavsett om de befann sig inom eller utanför USA. Enligt Axios skickades ordern som ett brev från handelsminister Howard Lutnick till företagets vd Dario Amodei, med modellerna placerade under exportkontroll och med hot om sanktioner vid bristande efterlevnad.

Anthropic hade ingen praktisk möjlighet att skilja utländska användare från amerikanska. För att garantera efterlevnad stängde företaget därför av modellerna för alla kunder. Enligt Fortune gavs företaget 90 minuter på sig att genomföra avstängningen. Den mest kapabla AI-modell som dittills hade gjorts allmänt tillgänglig slutade fungera över hela världen på en eftermiddag.

Det officiella skälet var säkerhet. Den utlösande händelsen var enligt flera medier att ett annat företag uppgav sig ha kringgått modellens skyddsmekanismer och fått ut känslig information om cyberangrepp. Oavsett om man läser det som en verklig säkerhetsincident eller som en lämplig förevändning är mekanismen densamma. Ett brev, en fredag, och en spjutspetstjänst försvann för alla utom dem inom en enda jurisdiktion.

För en svensk eller europeisk verksamhet är poängen inte vilken leverantör eller modell det råkade gälla. Poängen är att de mest kapabla AI-verktygen på marknaden ligger inom en jurisdiktion som nu har visat att den använder sin kontroll över dem när det passar dess intressen. Ett beroende som en främmande stat kan återkalla per brev är inte en förmåga man äger. Det är en förmåga man hyr på villkor som kan ändras utan förvarning och utan samtycke.

## Det är ett mönster, inte ett enskilt fall

Avstängningen av Fable 5 och Mythos 5 var ovanligt dramatisk, men den var inte den första gången USA använt sin kontroll över amerikanska teknikföretag som ett utrikespolitiskt påtryckningsmedel.

Redan 2019 ledde president Trumps Executive Order 13884 till att Adobe stängde av samtliga konton i Venezuela. Användare och företag förlorade tillgången till program som Photoshop, Illustrator och Acrobat, och Adobe meddelade inledningsvis att man inte ens fick återbetala betalda prenumerationer. Här var det inte en enskild person utan ett helt lands användare som kopplades bort, som en följd av amerikanska sanktioner.

I februari 2025 sanktionerade Trump-administrationen Karim Khan, chefsåklagare vid Internationella brottmålsdomstolen i Haag, efter att domstolen utfärdat en arresteringsorder mot Israels premiärminister Benjamin Netanyahu. Enligt nederländska medier stängdes Khans e-postkonto hos Microsoft därefter av, och han fick övergå till den schweiziska tjänsten Proton Mail. Microsofts president Brad Smith har bestritt beskrivningen att företaget avbröt sina tjänster till domstolen, men kontot kopplades likväl bort. Händelsen fick den nederländska regeringen att inleda en översyn av sitt beroende av amerikansk teknik.

Tre fall, tre olika administrationsperioder, tre olika delar av tekniksektorn. Grafikprogram, e-post, och nu en frontmodell inom AI. Mönstret är att USA inte tvekar att utnyttja sitt inflytande över de amerikanska leverantörerna, och att räckvidden för det inflytandet växer i takt med att tjänsterna blir mer centrala.

Det här är kärnan i varför digital rådighet inte kan reduceras till en fråga om var data lagras. Det handlar om vem som ytterst kan fatta beslut om huruvida en tjänst ska finnas kvar.

## NIS2 förändrar diskussionen

En återkommande observation i rapporten är att många organisationer fortfarande behandlar leverantörsberoenden som en IT-fråga trots att regelverken i allt högre grad behandlar dem som en verksamhetsfråga.

Det är en förändring som blivit tydligare under arbetet med NIS2.

Frågor om jurisdiktion, leverantörskedjor, incidenthantering och kontinuitet har blivit en del av verksamhetens riskhantering.

För vissa organisationer leder det till nya krav i upphandlingar.

För andra leder det till nya krav på dokumentation, arkitektur eller leverantörsstyrning.

Samma utveckling ligger bakom flera av de resonemang vi tidigare fört kring digital rådighet, leverantörsrisk och europeisk infrastruktur, bland annat i artikeln [EU har precis definierat det suveräna molnet, här är vårt resultat](/blogg/eu-har-precis-definierat-det-suveräna-molnet-här-är-vårt-resultat/).

## Digital rådighet i praktiken

Rapporten beskriver digital rådighet som en organisations förmåga att behålla kontroll över information, system och beslut över tid.

I praktiken handlar det ofta om ett antal konkreta frågor:

- Kan data flyttas till en annan miljö?
- Finns dokumenterade exit-möjligheter?
- Är infrastrukturen beroende av en specifik leverantör?
- Finns alternativ om juridiska eller kommersiella förutsättningar förändras?
- Kan en kritisk AI-funktion ersättas om åtkomsten plötsligt dras tillbaka?
- Är arkitekturen byggd för förändring eller för permanenta beroenden?

Svar på dessa frågor kommer att se olika ut för olika verksamheter.

En forskningsmiljö har andra krav än en kommun.

En webbplats har andra krav än ett system som används för myndighetsutövning.

Det är också därför digital rådighet inte är en produkt eller en certifiering.

Det är resultatet av många tekniska, juridiska och organisatoriska beslut som fattas över tid.

För den som vill fördjupa sig ytterligare i den europeiska dimensionen av frågan rekommenderar vi även artiklarna [EU har precis definierat det suveräna molnet, här är vårt resultat](/blogg/eu-har-precis-definierat-det-suveräna-molnet-här-är-vårt-resultat/) och [Varför Safespring stödjer EuroStack](/blogg/varför-safespring-stödjer-eurostack/).
