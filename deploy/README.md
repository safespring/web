# Ahrefs orphan pages, 25 september 2026

Lokalt genomförda ändringar för de 37 adresserna i Safesprings Ahrefs-rapport:

| Åtgärd | Antal | Omfattning |
| --- | ---: | --- |
| Omdirigering till ersättande sida | 11 | Sju äldre integritets-/cookiesidor, gamla norska kontaktsidan, två sidkopior och äldre Acceptable Use Policy |
| Kontextuella interna länkar | 17 | Tjänster, partnererbjudanden, guider och norska informationssidor |
| `noindex`, borttagna ur sitemap | 9 | Fyra tacksidor, tom kategorisida samt fyra introduktionssidor för direktlänkar |

Introduktionssidorna `/en/hello/`, `/no/hello/`, `/upplev/` och `/no/opplev/` behåller innehåll och formulär. Användaren bekräftade den 25 september att dessa ska fungera via direktlänkar men uteslutas från sökindex.

Alla 37 adresser, omdirigeringsmål och nya länkkällor finns i [granskningsunderlaget](../tests/fixtures/ahrefs-orphans-2026-09-25.json). De 17 sidorna med nya länkar är nåbara från startsidan via indexerbara sidor med vanliga följbara länkar. Även den svenska Private Cloud-sidan har fått en länk från tjänsteöversikten så att länkarna därifrån inte ligger i en isolerad grupp.

## Aktivering vid publicering

`www.safespring.com` använder **Caddy v1**. Hugo genererar omdirigeringssidor med canonical, `noindex` och omedelbar HTML-/JavaScript-omdirigering. **En statisk Hugo-sida ger inte i sig HTTP 301.** Serverreglerna i [ahrefs-orphan-redirects.caddy](ahrefs-orphan-redirects.caddy) behöver därför aktiveras i den befintliga Caddy v1-konfigurationen för produktionswebbplatsen.

1. Publicera de granskade Hugo-ändringarna genom webbplatsens ordinarie releaseflöde.
2. Placera regelfilen på produktionsservern och lägg en `import` med dess riktiga sökväg **inne i det befintliga site-blocket för Safespring**. Filen ersätter inte den befintliga Caddy-konfigurationen. Reglerna täcker exakt de elva gamla adresserna, med och utan avslutande snedstreck.
3. Validera hela den sammanslagna konfigurationen med Caddy v1 och ladda om den genom serverns ordinarie driftflöde. Regelfilen har lokalt validerats och HTTP-testats med Caddy 1.0.3, men produktionskonfigurationens eventuella andra regler måste också kontrolleras.
4. Verifiera HTTP 301 och rätt `Location` för de gamla adresserna, HTTP 200 för målsidorna och att sitemap saknar omdirigerings- och noindex-sidorna. Starta därefter en ny Ahrefs-crawl.

Ingen publicering eller serverändring har genomförts i detta arbete. Produktionsserverns aktiva konfigurationssökväg har inte verifierats; använd inte beta-miljöns konfiguration som ersättning.

## Lokal verifiering

Bygg med webbplatsens normala `baseURL`, till en separat utdatakatalog, och kör:

```sh
python3 scripts/check-orphan-pages.py /sökväg/till/byggd-webbplats
```

Kontrollen verifierar alla 37 utfall i genererad HTML och sitemap, inklusive att länkkällorna är nåbara från startsidan och att omdirigeringarna inte bildar kedjor. Med en lokal Caddy-server som importerar regelfilen kan även de 22 HTTP-varianterna kontrolleras:

```sh
python3 scripts/check-orphan-pages.py /sökväg/till/byggd-webbplats --http-base http://127.0.0.1:18765
```

Verifierat den 25 september 2026: fullständiga byggen med Hugo 0.111.3 och 0.163.3, alla 37 kontroller på båda byggena samt 22 faktiska HTTP 301-svar med Caddy 1.0.3. Hugo 0.163.3 visar befintliga deprecieringsvarningar.
