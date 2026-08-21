# Google Ads, samtycke och Qualified evaluation

## Ansvarsfördelning

CookieTractors externa konfiguration är ensam ägare av Google-taggen för `AW-802443484`. Den laddar `gtag.js`, konfigurerar Ads-kontot och skickar Consent Mode-uppdateringar för `ad_storage`, `ad_user_data` och `ad_personalization`.

`/js/google-ads.js` är en händelseadapter. Den får köa och skicka Ads-händelser när marknadsföringssamtycke finns, men får inte ladda `gtag.js` eller köra `gtag('config', ...)`.

## Återkallat samtycke

Alla anrop via den egna adaptern kontrollerar marknadsföringssamtycke vid sändningstillfället. När `marketing` återkallas rensas väntande formulärhändelser och nya Ads-händelser blockeras utan att sidan behöver laddas om. CookieTractor ansvarar samtidigt för att uppdatera Googles Consent Mode till `denied`.

En redan inläst tredjepartstagg kan ligga kvar i dokumentet tills omladdning. Det är därför Consent Mode-uppdateringen och frånvaron av nya Ads-anrop efter återkallelse som ska verifieras, inte enbart förekomsten av ett skriptelement.

## Qualified evaluation

Qualified evaluation (QE) fortsätter att vara en Matomo-händelse som endast kan skapas med `statistical`-samtycke. Den används som en signal om en längre och mer kvalificerad utvärderingsresa, inte som en verifierad lead eller primär Ads-konvertering.

När både `statistical` och `marketing` är godkända skickas dessutom en separat Google Ads-händelse med namnet `qualified_evaluation`. Händelsen innehåller endast:

- utvärderingsversion
- poäng
- produktområde (`backup`, `storage`, `compute`, `kubernetes` eller `general`)
- om besökaren är återkommande

URL, formulärdata och andra personuppgifter skickas inte. Händelsen skickas högst en gång per webbläsarsession och kan användas som underlag för en separat remarketingmålgrupp. Den ska inte importeras som primär konvertering eller användas för automatisk budgivning utan separat beslut.

## Teknisk verifiering

Kör det lokala testet:

```sh
node scripts/test-consent-tracking.mjs
```

Efter publicering ska följande verifieras i webbläsarens nätverkspanel och Google Tag Assistant:

1. Utan marknadsföringssamtycke laddas ingen Google Ads-tagg av webbplatsens egen kod och ingen QE-händelse skickas till Google.
2. Efter godkännande finns exakt en laddning av `gtag/js?id=AW-802443484`.
3. Med en kvalificerad QE-session och båda samtyckena skickas exakt en `qualified_evaluation` till `AW-802443484`.
4. När marknadsföringssamtycket återkallas skickar CookieTractor `ad_storage`, `ad_user_data` och `ad_personalization` som `denied` och inga nya egna Ads-händelser skickas utan omladdning.
5. Efter omladdning med återkallat samtycke laddas ingen Google Ads-tagg.

Google Ads krav för samtyckessignaler inom EES: <https://support.google.com/google-ads/answer/13695607>
