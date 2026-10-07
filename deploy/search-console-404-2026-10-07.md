# Search Console: 404-adresser, 7 oktober 2026

Åtgärden omfattar 12 HTTP 301-omdirigeringar på `www.safespring.com` och
`www2.safespring.com`, samt rättningar av länkar från webben till befintliga
docs-sidor. Källändringarna och webbens Caddy v1-regler är förberedda lokalt.
Den här rapporten bekräftar inte publicering, commit, push eller aktivering.

De 17 adresserna på `docs.safespring.com` finns kvar i underlaget som
skrivskyddade referenser. Ingen docs-konfiguration, docs-källkod eller
docs-byggprocess ändras. Ingen regelfil för docs ingår i leveransen.

Underlaget är `Tabell.csv`, `Metadata.csv` och `Diagram.csv` i den tillhandahållna
mappen `safespring`. Den fullständiga bedömningen av varje adress, senaste
Google-crawl, kontrollerad HTTP-status, eventuellt mål och källstöd finns i
[CSV-underlaget](search-console-404-2026-10-07.csv).

## Granskning av de 51 adresserna

Vid en direkt HTTPS-kontroll den 7 oktober gav 47 adresser HTTP 404, tre HTTP 401
och en ett TLS-fel. Kontrollverktyget följde inga omdirigeringar och behöll
certifikatvalidering. Detta beskriver kontrolltillfället före aktivering;
det är inte en ny genomsökning av Googlebot.

| Bedömning | Antal | Hantering |
| --- | ---: | --- |
| Webbinnehåll med relevant ersättning | 12 | Förberedda 301-regler för www och www2 |
| Avpublicerat webbinnehåll | 14 | Befintlig 404 kvarstår |
| Felaktiga webbadresser utan belagd innehållssida | 4 | Befintlig 404 kvarstår |
| Modulnamn som ger 401 | 3 | Befintligt åtkomstskydd kvarstår |
| Docs-adresser med verifierade aktuella mål | 12 | `reference_only` i CSV; inga docs-regler |
| Avsiktligt borttagna docs-sidor | 5 | `external_removed` i CSV; inga docs-ändringar |
| Separat tjänst med certifikatfel | 1 | Utredningsunderlag för `lists.safespring.com` |

Webbens avpubliceringar är belagda med `draft: true` eller borttagningar i Git.
Elastisys-intervjun togs bort den 24 september 2026. De äldre event-, Explorer-
och BaaS-kampanjsidorna togs bort i februari 2025. Inga av dessa sidor
återpubliceras, och stängda jobbannonser återaktiveras inte.

De två Tempus-eventen från maj/juni 2020 får omdirigeringar till inspelningen
av samma webbinarium. ISO-certifikatet får en omdirigering till den ersättande
PDF som lades till när den gamla filen togs bort.

Det gamla samlade compliance-paketet i PDF-format omdirigeras till `/compliance/`,
där aktuella avtalsdokument och deras PDF-nedladdningar finns. Det är en
ersättande dokumentsamling i HTML. Ingen gammal avtalsversion återpubliceras.

## Rättningar av webbens länkar till docs

- Sex renderade länkar i fem blogginlägg pekar direkt på aktuella API- och
  flavor-guider på den befintliga docs-webbplatsen.
- Fem länkar i artikeltext till avvecklade guider har tagits bort, med
  artikeltext och textetiketter bevarade. De två gamla migrationsknapparna
  har tagits bort; den befintliga kontakten till support är kvar som
  huvudknapp. Migrationsartiklarna har fått en kort arkivnotis som förklarar
  att den tidigare guiden har avvecklats.
- Sju länkar i webbens dokumentationsmall pekar på aktuella Storage- och
  återställningsguider. Mallen används inte av det nuvarande fullständiga
  webbbygget, men har korrekta mål om den används igen.

De felaktiga e-postlänkarna var redan rättade i juni 2026. Kontrollerad
publicerad HTML för myndighetssidan använder
`mailto:fredric.wallsten@safespring.com`. Inga aktiva interna länkar till de
avpublicerade jobbannonserna hittades.

Docs-kartläggningen används som källstöd för webbens länkrättningar. Alla 12
identifierade docs-mål svarade HTTP 200 och hade motsvarande kanoniska adress
vid kontrollen den 7 oktober. Historiska filflyttar och uttryckliga
borttagningar har kontrollerats i Git. Kartläggningen innebär ingen ändring
av docs-sidornas HTTP-svar eller publicerade innehåll.

## Webbens omdirigeringar

[Webbreglerna](search-console-web-redirects.caddy) är avsedda för de befintliga
site-blocken för `www.safespring.com` och `www2.safespring.com`.

Reglerna matchar exakta sökvägar med och utan avslutande snedstreck. De behåller
frågeparametrar, inklusive UTM-taggar. Caddy v1 använder separata villkor för
anrop med och utan frågesträng så att parametrar bevaras och rena måladresser
inte får ett extra `?`. Underliggande sökvägar fångas inte av reglerna.

Importen för webbens båda befintliga site-block är:

```caddy
import /etc/caddy/search-console-web-redirects.caddy
```

Serverns befintliga Caddy-konfiguration lästes den 7 oktober. Webbens ändring
ska begränsas till denna regelfil och importen i de två webbblocken.

## Verifiering och publiceringsstatus

Det slutliga fullständiga webbbygget efter avgränsningen passerade
`scripts/check-production.py` med samtliga 414 sidor och den låsta Hugo
0.111.3 Extended-versionen, utan nätverk och utan Git i byggcontainern.
Kontrollerna av compliance-historik och de tidigare 37 Ahrefs-adresserna gick
igenom. Inga compliance-dokument eller historikdatum har ändrats.

Webbkontrollen verifierar de 12 omdirigeringarna, deras byggda målsidor och
att genererad webb-HTML saknar de rapporterade trasiga länkarna. En isolerad
Caddy v1-körning tillsammans med befintliga Ahrefs-regler passerade 60
HTTP-kontroller av 20 sökvägsvarianter samt två kontroller av de ursprungliga
Tempus-länkarnas UTM-parametrar. Webbkontrollen kan köras mot en lokal
Caddy-lyssnare och befintliga publika mål:

```sh
python3 scripts/check-search-console-redirects.py /sökväg/till/byggd-webbplats \
  --web-base http://127.0.0.1:18765
python3 scripts/check-search-console-redirects.py /sökväg/till/byggd-webbplats \
  --live-targets
```

De nio källfilsändringarna behöver ingå i webbens ordinarie releaseflöde för
`master` och `production`. Aktivering av serverregler och publicering av
källändringarna är separata steg. Den här rapporten ska uppdateras med faktisk
aktiverings- och publiceringsstatus efter avslutade HTTP-kontroller.

**Aktiveringsgräns:** Caddy v1:s gemensamma omladdning kör Git-pluginets
startfunktioner för alla webbplatser, inklusive docs. Det kan köra docs
Git-synk och MkDocs-bygge även vid oförändrad Git-revision. För att respektera
instruktionen att lämna docs orört utförs därför ingen omladdning inom denna
avgränsning. Webbens länkrättningar kan publiceras och byggas separat.
301-reglernas aktivering kräver ett separat besked om denna driftåtgärd.

Efter aktivering kontrolleras HTTP 301 och rätt `Location` för webbens
flyttade adresser samt direkt HTTP 200 för målen. Därefter kan korrigerade
webbadresser begäras genomsökta i Search Console. Avsiktligt borttagna
adresser kan fortsätta synas i rapporten; målet är fungerande länkar och
korrekta HTTP-svar. Google behandlar borttaget innehåll med 404 som frånvarande
och tar bort det ur index över tid, enligt
[Googles dokumentation om HTTP-statuskoder](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes).

För `lists.safespring.com` behöver tjänstens ägare fastställa om maillistan
fortfarande ska finnas. DNS pekade vid kontrollen på `5.75.176.254`, en annan
server än webben. Certifikatet gäller inte värdnamnet. Ingen säker
ersättningsadress har identifierats, och inget TLS- eller DNS-ingrepp ingår i
webbrättningarna.
