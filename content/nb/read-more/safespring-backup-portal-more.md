---
language: "nb"
ai: true
---
#

{{< author-gabriel >}}

## Safespring Backup: En fullstendig oppdatering av brukerportalen

<div class="ingress">
	<p>
Safespring Backup bygger på den svært veletablerte løsningen Spectrum Protect fra IBM. Den har mange styrker, som høy sikkerhet, utmerket skalerbarhet og livssyklusautomatisering av data. 
</p></div>

Spectrum Protect kan beskytte ubegrenset antall terabyte med data med minimal administrativ innsats.

Sikkerhetskopier er kryptert under overføring med TLS 1.2, men kan også konfigureres til automatisk å være klientsidekryptert for enda høyere sikkerhet.

Som en svært velprøvd løsning for store virksomheter kan Spectrum Protect håndtere skalaen til store leverandørers oppsett, slik som Safesprings. Derimot mangler Spectrum Protect fleksibel administrasjon med håndtering av brukerkontoer og rolletildelinger. Siden sikkerhetskopiering ofte håndteres av en utpekt gruppe i en stor organisasjon, deles denne ulempen med mange andre sikkerhetskopiløsninger på markedet og er derfor ikke et spesifikt problem for Spectrum Protect.

## Enklere administrasjon med ny portal

For å løse dette har Safespring utviklet en brukerportal og en API-bro for vår Backup-tjeneste. Den gamle portalen har tjent sitt formål godt ved å legge til selvbetjening for å sette opp nye noder og generere nøkkeltokener for automatisk oppsett av flere noder uten direkte menneskelig interaksjon.

Selv om den gamle portalen var funksjonell, manglet den dashbord for status og muligheten for kunder til å legge til egne brukerkontoer. Brukere kunne ikke opprette sine egne hierarkier for å forenkle håndteringen av ulike grupper av servere som sikkerhetskopieres.

![Safesprings nye backup-portal](/img/safespring-backup-portal.webp)

## Nyheter og fordeler

Med vår relansering av Safespring Backup introduserer vi en fullstendig omarbeiding av brukergrensesnittet. Løsningen bygger på Auwau Cloutility med funksjoner som:

- Selvbetjening med mulighet til å opprette nye brukere uten å kontakte Safespring og tildele dem roller og privilegier.
- Multi-tenancy med mulighet til å opprette hierarkier og brukere med rollebasert tilgang til ulike deler av hierarkiet. Dette gjør det mulig for en administrator å delegere forskjellige servere til ulike deler av organisasjonen.
- Provisionering der administratoren kan definere prosessen med standardinnstillinger for å la brukere håndtere sin egen aktivering av sikkerhetskopiering på en enkel måte.
- Avansert (men enkel å bruke) rapportmotor som gjør det mulig å følge opp statusen for alle sikkerhetskopier som kjører. Det er også mulig å sette opp tidsplaner for å sende rapporter med bestemte intervaller til bestemte e-postadresser.
- REST-API gjør det mulig å gjøre alt du kan i nettgrensesnittet med API-kall for å automatisere oppsettet ditt enda mer.

### Beskyttelse mot ransomware

Safespring Backup bruker en låsemekanisme på hver node som registrerer seg for å bruke tjenesten. Denne mekanismen er designet for å hindre at sikkerhetskopieringsagenten sletter sikkerhetskopier før en forhåndsdefinert retensjonstid er utløpt. Denne retensjonstiden er satt til et visst antall dager, i løpet av hvilke sikkerhetskopiene holdes ekstra sikre.

Ved å implementere denne mekanismen kan vi sikre at selv ved et ransomware-angrep vil angriperen ikke kunne slette alle sikkerhetskopiene fra serveren før den krypterer data lokalt. Dette fordi sikkerhetskopiene er låst og ikke kan slettes før retensjonstiden har passert.

I tillegg gir mekanismen et ekstra beskyttelseslag for å sikre datagjenoppretting ved et angrep. Ved å holde flere sikkerhetskopier tilgjengelige kan vi gjenopprette data til et tidspunkt før angrepet inntraff, noe som minimerer påvirkningen av angrepet på kundene våre.

Alt i alt hjelper bruken av denne mekanismen oss å tilby en sikrere og mer pålitelig sikkerhetskopitjeneste for kundene våre, og er et viktig steg i beskyttelsen mot den økende trusselen fra ransomware-angrep.

## Konklusjon

Med vår relansering av Safespring Backup tar Safespring et kjempesteg fremover for å forbedre brukeropplevelsen og brukervennligheten når du skal håndtere sikkerhetskopiene dine hos Safespring. Med påliteligheten i Spectrum Protect kombinert med en fullverdig selvbetjeningsportal for å kjøre sikkerhetskopiene dine, har det aldri vært enklere. Med et komplett REST-API er automatisering av ulike administrative oppgaver mulig.

Med Safespring Backup får du en sikker løsning (men enkel å bruke) for å håndtere alle sikkerhetskopiene dine.