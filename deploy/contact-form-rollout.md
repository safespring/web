# Kontaktformulär: lokal förhandsvisning och driftsättning

Arbetet gäller kontaktformulär 98, med publikt ID
`9549u7794d4f86da545e6a442e233c24577d8`. Formulärets befintliga
identitet och historik ska bevaras. Prislista och onboarding ingår inte.

## Integration verifierad 10 november 2026

Formulär 98 uppdaterades i Upsales formulärbyggare och lästes tillbaka via
`GET /api/v2/forms/98`. Den befintliga identiteten och historiken behölls.

- Arbetsmejl och organisation är obligatoriska. För- och efternamn är
  frivilliga. Telefon visas inte på webbplatsen.
- Nya frivilliga, formulärspecifika fält har skapats och återlästs:
  meddelande `Extra.1794322916575`, källsida `Extra.1794322940710`,
  tjänsteområde `Extra.1794322963895`, språk `Extra.1794322979811`.
  Webbplatsen skickar källsidans sökväg utan frågeparametrar.
- `SendEmail.ToAddresses` är `hello@safespring.com`. Aviseringsmallen
  innehåller samtliga fyra nya fält. Befintlig kontoansvarig ändras inte.
- `Tillåt endast företagsadresser` aktiverades i Upsales. Den befintliga
  spärrlistan kompletterades med webbformulärets återstående privata
  domäner. Webbformuläret validerar också domänlistan, inklusive
  landsvarianter av Gmail, Yahoo, Hotmail, Live, AOL och Outlook.
- Den återlästa genererade koden använder
  `https://power.upsales.com/api/external/forms/submit`, URL-kodade fält
  och `isAjax=true`. Dess success-handler använder ett skalärt `submitId`.
  Webbplatsen kräver HTTP 200 och en icke-tom skalär kvittens; tomma svar,
  objekt, HTML, kontrolltecken och kända felvärden avvisas.
- `integrationReady: true` anger att fält och endpoint är konfigurerade.
  Det är inte ett bevis på ett genomfört CRM-inskick eller mottaget mejl.

Inga riktiga formulärinskick eller testmejl skickades vid implementationen.
Lagring och faktisk leverans till hello behöver därför följas vid första
kontrollerade inskicket. Ett HTTP-svar eller en tacksida bevisar inte i sig
att en förfrågan har blivit ett kvalificerat lead.

## Lokal förhandsvisning

På localhost och övriga loopback-adresser skickas inga uppgifter eller
analysdata, även med en konfigurerad integration. Validering och flytande
etiketter fungerar som på webbplatsen. Ogiltig eller ofullständig
integrationskonfiguration stoppar inskick även utanför localhost.

## Spårning

Matomo-kategorin `Contact form` använder `view`, `start`,
`validation_error_*`, `submission_error` och `request_received`.
Händelsenamnet innehåller bara sidans sökväg. Namn, mejl, organisation,
meddelande och kvittens-ID skickas inte till Matomo.

- Endast aktuellt statistiksamtycke medger en händelse. Händelser från en
  nekad period spelas inte upp senare; återkallat samtycke tömmer även
  väntande formulärhändelsers möjlighet att skickas.
- En uttrycklig host/site-mappning väljer en enda Matomo-tracker:
  `www.safespring.com` → 1, beta `.se` → 3, `.no` → 4, `.eu` → 5,
  `.dk` → 6. `www2`, localhost och okända hosts ger inga formulärhändelser.
- Upsales besökskoppling får kvittens-ID endast med marknadsföringssamtycke.
- Befintlig Google Ads-konfiguration återanvänds endast efter giltig
  kvittens på `www.safespring.com` och med marknadsföringssamtycke.
  Ingen ny konverteringsetikett införs. Den generiska XHR-lyssnaren
  undantar det här formuläret för att undvika dubbla/falska konverteringar.
- Befintliga tacksidemål ändras inte. Summera inte `request_received`,
  tacksidemål och CRM-inskick till ett antal unika förfrågningar.

Spårningens callback och scalarrespons följer leverantörernas kontrakt:
[Matomo JavaScript](https://developer.matomo.org/guides/tracking-javascript-guide)
och Upsales genererade kod från formulär 98. Ingen allmän ombyggnad av
sidornas eller Tag Managers övriga spårning ingår.

## Mottagning och ansvar

Alla med tillgång till `hello@safespring.com` ska kunna hantera
förfrågningarna. Johan och Fredric bevakar i första hand nya ärenden.
Den som tar en förfrågan markerar sig som ansvarig i Upsales så att
kollegorna ser vem som följer upp. Första personliga återkopplingen ska ske
inom en arbetsdag; ansvarig kopplar in rätt specialist vid behov.

Bedöm behov och affärspotential. Arbetsmejl är ett grundkrav, men är inte
ensamt en kvalificering. Skilj relevant nykund från utveckling hos
befintlig kund, behov av komplettering, support och irrelevant/spam/test.

## Kontroll och uppföljning

- Kontrollera mobil, tangentbord, autofyllnad, flytande etiketter,
  frivilliga fält, manuellt företagsnamn, privatmejlspärr och teckengräns.
- Kontrollera ett inskick per försök, bevarad text och synliga fel vid
  nätverksproblem, timeout och serverfel. Testa lokalt med simulerade svar.
- Kör `python3 scripts/check-production.py` och granska på www2 före
  produktion. En lokal byggkontroll innebär inte publicering.
- Följ unika organisationer med relevant affärspotential som går vidare
  till dialog, genomförda första samtal, affärsmöjligheter, kompletteringar
  och återkoppling inom en arbetsdag. Redovisa test och spam separat.
- API-totalräknaren är inte en journal som enbart växer; den hade minskat
  mellan två observationer. Spara daterade mätpunkter och stäm av perioder
  och kundkvalitet mot konverteringslistan och CRM-uppföljningen.
- Gör första samlade utvärderingen efter åtta hela veckor. Inför fler
  obligatoriska frågor först när uppföljningen visar ett konkret behov.
