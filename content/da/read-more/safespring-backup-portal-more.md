---
language: "da"
ai: true
---
#

{{< author-gabriel >}}

## Safespring Backup: En fuldstændig opdatering af brugerportalen

<div class="ingress">
	<p>
Safespring Backup bygger på den meget veletablerede løsning Spectrum Protect fra IBM. Den har mange styrker, såsom høj sikkerhed, fremragende skalerbarhed og livscyklusautomatisering af data. 
</p></div>

Spectrum Protect kan beskytte et ubegrænset antal terabyte data med minimal administrativ indsats.

Sikkerhedskopier er krypteret under transit med TLS 1.2, men kan også konfigureres til automatisk at være krypteret på klientsiden for endnu højere sikkerhed.

Som en meget gennemprøvet løsning til store virksomheder kan Spectrum Protect håndtere skalaen i store leverandørers opsætninger som Safesprings. Derimod mangler Spectrum Protect fleksibel administration med håndtering af brugerkonti og rolletildelinger. Da backup ofte håndteres af en udpeget gruppe i en stor organisation, er denne ulempe noget, der deles med mange andre backup-løsninger på markedet og er derfor ikke et specifikt problem for Spectrum Protect.

## Nemmere administration med ny portal

For at løse dette har Safespring udviklet en brugerportal og en API-bro til vores backup-tjeneste. Den gamle portal har tjent sit formål godt ved at tilføje selvbetjening til at opsætte nye noder og generere nøgletokens til automatisk opsætning af flere noder uden direkte menneskelig indgriben.

Selv om den gamle portal var funktionsdygtig, manglede den dashboards til status og muligheden for, at kunder kunne tilføje deres egne brugerkonti. Brugere kunne ikke oprette deres egne hierarkier for at forenkle håndteringen af forskellige grupper af servere, der sikkerhedskopieres.

![Safesprings nye backup-portal](/img/safespring-backup-portal.webp)

## Nyheder og fordele

Med vores relancering af Safespring Backup introducerer vi en fuldstændig omarbejdning af brugergrænsefladen. Løsningen bygger på Auwau Cloutility med funktioner som:

- Selvbetjening med mulighed for at oprette nye brugere uden at kontakte Safespring og tildele dem roller og privilegier.
- Multi-tenancy med mulighed for at oprette hierarkier og brugere med rollebaseret adgang til forskellige dele af hierarkiet. Dette gør det muligt for en administrator at delegere forskellige servere til forskellige dele af organisationen.
- Provisionering, hvor administratoren kan definere processen med standardindstillinger for at lade brugere håndtere deres egen aktivering af backup nemt.
- Avanceret (men nem at bruge) rapportmotor, som gør det muligt at følge status for alle sikkerhedskopieringer, der kører. Det er også muligt at opsætte planer for at sende rapporter med bestemte intervaller til bestemte e-mailadresser.
- REST API gør det muligt at gøre alt, hvad du kan gøre i webbrugergrænsefladen, med API-kald for at automatisere din opsætning endnu mere.

### Beskyttelse mod ransomware

Safespring Backup bruger en låsemekanisme på hver node, der registrerer sig for at bruge tjenesten. Denne mekanisme er designet til at forhindre, at backup-agenten sletter sikkerhedskopier, før en forudindstillet retentionstid er udløbet. Denne retentionstid er sat til et vist antal dage, i hvilke sikkerhedskopierne holdes ekstra sikre.

Ved at implementere denne mekanisme kan vi sikre, at selv ved et ransomware-angreb vil angriberen ikke kunne slette alle sikkerhedskopierne fra serveren, før dataene krypteres lokalt. Dette skyldes, at sikkerhedskopierne er låst og ikke kan fjernes, før retentionstiden er passeret.

Derudover giver mekanismen også et ekstra beskyttelseslag for at sikre datagendannelse ved et angreb. Ved at holde flere sikkerhedskopier tilgængelige kan vi gendanne data til et tidspunkt før angrebet fandt sted, hvilket minimerer angrebets påvirkning for vores kunder.

Samlet set hjælper brugen af denne mekanisme os med at tilbyde en mere sikker og pålidelig backup-tjeneste til vores kunder og er et vigtigt skridt i beskyttelsen mod den voksende trussel fra ransomware-angreb.

## Konklusion

Med vores relancering af Safespring Backup tager Safespring et kæmpe skridt fremad for at forbedre brugeroplevelsen og brugervenligheden ved at håndtere dine sikkerhedskopier hos Safespring. Med pålideligheden i Spectrum Protect kombineret med en fuldt udviklet selvbetjeningsportal til at køre dine sikkerhedskopier har det aldrig været nemmere. Med et fuldt REST API er automatisering af forskellige administrative opgaver mulig.

Med Safespring Backup får du en sikker løsning (men nem at bruge) til at håndtere alle dine sikkerhedskopier.