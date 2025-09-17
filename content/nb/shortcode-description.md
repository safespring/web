---
ai: true
title: "Beskrivelser av kortkoder"
date: 2024-08-20
draft: true
language: "nb"
aliases:
  - /shortcode-description/
---
## {{ < services >}}

For å inkludere en side i `services`-shortcode-en, kan du legge til parameteren `cardorder` i front matter for hver tjenesteside du vil ha med i samlingen av kort. Verdien av parameteren «cardorder» avgjør rekkefølgen som kortet vises i, i samlingen. Denne shortcode-en er en fleksibel og tilpassbar måte å vise en visuelt tiltalende oppsummering av Safesprings tjenester på nettstedet ditt.

Kortets utseende beskrives i `layouts/_default/li-index` og kan tilpasses ved hjelp av parametere i sidens front matter. For eksempel bestemmer parameteren `cardcolor` fargen på kortets kant og ikon, mens parameteren `cardicon` bestemmer ikonet som vises på kortet. I tillegg kan parameterne cardtitle og `cardintro` brukes til å tilpasse teksten som vises på kortet. {{% accordion title="HTML-kode for tjenester" %}}```html
<div class="flexcontainer-three">
  {{ $language := .Get 0 }} {{ if eq $language "en"}} {{ range (where
  $.Site.RegularPages "Section" "en").ByParam "cardorder" }} {{ if isset .Params
  "cardorder" }} {{ .Render "li-index"}} {{ else }} {{ end }} {{ end }} {{ else
  if eq $language "nb" }} {{ range (where $.Site.RegularPages "Section"
  "no").ByParam "cardorder" }} {{ if isset .Params "cardorder" }} {{ .Render
  "li-index"}} {{ else }} {{ end }} {{ end }} {{ else }} {{ range (where
  $.Site.RegularPages "Section" "tjanster").ByParam "cardorder" }} {{ if isset
  .Params "cardorder" }} {{ .Render "li-index"}} {{ else }} {{ end }} {{ end }}
  {{ end }}
</div>
```
### HTML-kode for `li-index````html
<a href="{{ .RelPermalink }}">
  <div class="flex-item shadow-1 border-hover-{{ .Params.cardorder }}">
    <style>
      	.border-hover-{{ .Params.cardorder }} {
      		transition: all 0.2s ease-in;
      		border-bottom: 5px solid white;
      	}

      	.border-hover-{{ .Params.cardorder }}:hover {
      	transform: translateY(-5px);
      	mar border: none;
      	border-bottom: 5px solid {{ .Params.cardcolor }} !important;
      }
    </style>
    <div class="cardtitle">
      <div class="cardicon" style="background-color: {{ .Params.cardcolor }}10">
        <i
          class="{{ .Params.cardicon }} icon"
          style="color: {{ .Params.cardcolor }} !important"
        ></i>
      </div>
      <h2 style="color: {{ .Params.cardcolor }}">
        {{ if .Params.cardtitle }}{{ .Params.cardtitle }}{{ else }}{{ .Title
        }}{{ end }}
      </h2>
    </div>
    <p class="mb-0">
      {{ if .Params.cardintro }}{{ .Params.cardintro }}{{ else }}{{
      .Params.intro }}{{ end }}
    </p>
  </div>
</a>
```
{{% /accordion %}} {{< distance >}} {{< services >}}

{{< accordion-script >}}

---

# Dokumentasjon for shortcodes

Nedenfor finner du en oversiktlig dokumentasjon av alle våre shortcodes for Hugo-nettstedet. For hver shortcode finnes:

- Beskrivelse: Kort forklaring av hva shortcoden gjør.
- Kode: Selve shortcoden i HTML.
- Eksempel: Hvordan man kaller shortcoden med eksempeldata.
- Renderet resultat: Hvordan shortcoden ser ut på siden.

---

## 2calltoaction.html

### Beskrivelse

Oppretter en call-to-action-seksjon med to knapper. Den første knappen tar to parametere (tekst og URL), mens den andre knappen tar to parametere (tekst og URL).

### Kode```html
<br />
<a class="button" target="_self" href="{{ .Get 1 | safeURL }}">{{ .Get 0 }}</a>
<a
  style="margin-top: 25px; padding: 1px 0 0 0;"
  class="text-button"
  target="_blank"
  href="{{ .Get 3 | safeURL }}"
  >{{ .Get 2 }}</a
>
<br />
```
### Eksempel

{{< 2calltoaction "Call Us" "/contact" "Learn More" "https://example.com/learn-more" >}}

### Gjengitt resultat

En primær knapp med teksten "Call Us" (lenket til `/contact`) og en sekundær tekstlenke "Learn More" (lenket til
`https://example.com/learn-more`).

---

## accordion-script.html

### Beskrivelse

Legger inn JavaScript som trengs for å aktivere funksjonaliteten til accordion-elementer (veksling, jevn rulling, åpning av
accordion via lenker).

### Kode```html
<script>
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("accordion-active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        panel.style.marginBottom = 0 + "px";
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.style.marginBottom = 10 + "px";
      }
    });
  }

  function openAccordion(id) {
    var accordionBox = document.getElementById(id);
    if (accordionBox) {
      var button = accordionBox.getElementsByClassName("accordion")[0];
      if (button) {
        button.click();
        accordionBox.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href").substr(1);
      var targetElement = document.getElementById(targetId);
      if (targetElement && targetElement.classList.contains("accordion-box")) {
        e.preventDefault();
        openAccordion(targetId);
      }
    });
  });
</script>
```
### Eksempel

{{< accordion-script >}}

### Gjengitt resultat

Ingen direkte visuell komponent. Skriptet kjøres i bakgrunnen for å muliggjøre accordion-funksjonalitet.

---

## accordion.html

### Beskrivelse

Oppretter et accordion-element med en klikkbar overskrift som viser eller skjuler innholdet.

### Kode

{{< accordion id="acc1" title="Mer informasjon" >}} Dette er innholdet som skjules i accordion-elementet. {{< /accordion >}}

### Eksempel

&#123;&#123;&lt; accordion id="acc1" title="Mer informasjon" Dette er innholdet som skjules i accordion-elementet.
&#123;&#123;&lt;/accordion &gt;&#125;&#125;

### Gjengitt resultat

Et klikkbart element med overskriften «Mer informasjon» som viser/skjuler sitt innhold.

---

## aks-alternatives.html

### Beskrivelse

Viser en tabell som sammenligner Azure‑tjenester med open source‑alternativer og angir om de er administrert av Safespring.

### Kode```html
<div class="container-table-wp mt-2">
  <div class="price-table">
    <div class="table">
      <div class="row header">
        <div class="cell">Tjänst i Azure</div>
        <div class="cell">Funktion</div>
        <div class="cell">Open Source</div>
        <div class="cell">Managerat hos Safespring</div>
      </div>

      <div class="row">
        <div class="cell" data-title="Tjänst i Azure">
          Azure Kubernetes Service (AKS)
        </div>
        <div class="cell" data-title="Funktion">Managerad Kubernetes</div>
        <div class="cell" data-title="Open source alternativ">
          <a href="https://compliantkubernetes.io">Compliant Kubernetes</a>
        </div>
        <div class="cell" data-title="Managerat av Safespring">Ja</div>
      </div>

      <!-- Fler rader här, se originalkoden för alla alternativ -->
    </div>
  </div>
</div>
```
### Eksempler```
{{< en-aks-alternatives >}}
```
### Rendret resultat

En tabell med ulike Azure-tjenester, tilsvarende open source-alternativer og hvorvidt de er administrert hos Safespring.

---

## button.html

### Beskrivelse

Oppretter en knapp som lenker enten til en ekstern URL (definert i `.Params.link`) eller en sidefelt-lenke (definert i
`.Params.sidebarlinkurl`).

### Kode```html
<br />
{{ if $.Page.Params.link }}
<a class="button" target="_blank" href="{{ $.Page.Params.link }}"
  >{{ $.Page.Params.knapp }}</a
>
{{ else }}
<a href="{{ $.Page.Params.sidebarlinkurl }}" target="_blank" id="button">
  {{ $.Page.Params.sidebarlinkname }} {{ if $.Page.Params.sidebarlinkicon
  }}&nbsp;&nbsp;&nbsp;<i class="fas {{ $.Page.Params.sidebarlinkicon }}"></i>{{
  end }}
</a>
{{ end }}
```
### Eksempel```
{{ < button link="https://example.com" knapp="Klicka här" >}}
```
### Rendret resultat

En klikkbar knapp med teksten «Klikk her» som leder til `https://example.com`.

---

## button0.html

### Beskrivelse

En variant av `button.html` med samme oppførsel, men som kan brukes separat ved behov.

### Kode```html
<br />
{{ if $.Page.Params.link }}
<a class="button" target="_blank" href="{{ $.Page.Params.link }}"
  >{{ $.Page.Params.knapp }}</a
>
{{ else }}
<a href="{{ $.Page.Params.sidebarlinkurl }}" target="_blank" id="button">
  {{ $.Page.Params.sidebarlinkname }} {{ if $.Page.Params.sidebarlinkicon
  }}&nbsp;&nbsp;&nbsp;<i class="fas {{ $.Page.Params.sidebarlinkicon }}"></i>{{
  end }}
</a>
{{ end }}
```
### Eksempler```
{{< button link="https://example.com" knapp="Klicka här" >}}
```
### Renderet resultat

En klikkbar knapp med teksten "Klikk her" som leder til `https://example.com`, tilsvarende `button.html`.

---

## calendar.html

### Beskrivelse

Viser en arrangementskort-stil med dato, type arrangement, plattform og tid, formatert som en minikalender.

### Kode```html
<div>
  <style>
    .safespring-event .desc .des,
    .safespring-event .desc .hed {
      font-family: Hind, sans-serif;
      overflow: hidden;
    }
    .safespring-event {
      display: inline-block;
      position: relative;
      cursor: default;
      background: #fff;
      font-family: Hind, sans-serif;
      font-weight: 600;
      color: #323232 !important;
      font-size: 15px;
      line-height: 100%;
      -webkit-box-shadow:
        0 0 0 0.5px rgba(50, 50, 93, 0.17),
        0 2px 5px 0 rgba(50, 50, 93, 0.1),
        0 1px 1.5px 0 rgba(0, 0, 0, 0.07),
        0 1px 2px 0 rgba(0, 0, 0, 0.08),
        0 0 0 0 transparent !important;
      -moz-box-shadow:
        0 0 0 0.5px rgba(50, 50, 93, 0.17),
        0 2px 5px 0 rgba(50, 50, 93, 0.1),
        0 1px 1.5px 0 rgba(0, 0, 0, 0.07),
        0 1px 2px 0 rgba(0, 0, 0, 0.08),
        0 0 0 0 transparent !important;
      box-shadow:
        0 0 0 0.5px rgba(50, 50, 93, 0.17),
        0 2px 5px 0 rgba(50, 50, 93, 0.1),
        0 1px 1.5px 0 rgba(0, 0, 0, 0.07),
        0 1px 2px 0 rgba(0, 0, 0, 0.08),
        0 0 0 0 transparent !important;
      -webkit-border-radius: 4px;
      border-radius: 4px;
    }
    .safespring-event .date {
      width: 50px;
      height: 60px;
      float: left;
      position: relative;
    }
    .safespring-event .date .bdr1,
    .safespring-event .date .bdr2 {
      width: 1px;
      height: 50px;
      position: absolute;
      z-index: 100;
      top: 5px;
    }
    .safespring-event .date .mon {
      display: block;
      text-align: center;
      padding: 12px 0 0;
      font-size: 10px;
      color: #bf5549;
      font-weight: 700;
      line-height: 110%;
      text-transform: uppercase;
    }
    .safespring-event .date .day {
      display: block;
      text-align: center;
      padding: 0 0 8px;
      font-size: 28px;
      font-weight: 700;
      color: #333;
      line-height: 100%;
    }
    .safespring-event .date .bdr1 {
      background: #eaeaea;
      right: -3px;
    }
    .safespring-event .date .bdr2 {
      background: #fff;
      right: -4px;
    }
    .safespring-event .desc {
      height: 60px;
      float: left;
      position: relative;
      padding: 0 15px 0 0;
    }
    .safespring-event .desc p {
      margin: 0;
      display: block;
      text-align: left;
      padding: 10px 0 0 15px;
      font-size: 11px;
      color: #666;
      line-height: 130%;
    }
    .safespring-event .desc .hed {
      height: 15px;
      display: block;
      margin-bottom: 0;
      font-size: 13px;
      line-height: 110%;
      color: #333;
      text-transform: uppercase;
    }
    .safespring-event .desc .des {
      height: 28px;
      display: block;
    }
    .safespring-event-selected {
      background-color: #f4f4f4;
    }
    .addeventatc .alarm_reminder,
    .addeventatc .all_day_event,
    .addeventatc .attendees,
    .addeventatc .calname,
    .addeventatc .date_format,
    .addeventatc .recurring,
    .addeventatc .status,
    .addeventatc .uid,
    .safespring-event .client,
    .safespring-event .description,
    .safespring-event .end,
    .safespring-event .facebook_event,
    .safespring-event .location,
    .safespring-event .method,
    .safespring-event .organizer,
    .safespring-event .organizer_email,
    .safespring-event .start,
    .safespring-event .timezone,
    .safespring-event .title,
    .safespring-event .transp {
      display: none !important;
    }
  </style>
  <div style="clear:both;padding:10px 0px 10px 0px;">
    <div class="safespring-event" data-styling="none">
      <div class="date">
        <span class="mon">{{ .Get "month" }}</span>
        <span class="day">{{ .Get "day" }}</span>
        <div class="bdr1"></div>
        <div class="bdr2"></div>
      </div>
      <div class="desc">
        <p>
          <strong class="hed">{{ .Get "type" }}</strong>
          <span class="des">{{ .Get "platform" }}<br />{{ .Get "time" }}</span>
        </p>
      </div>
    </div>
  </div>
</div>
```
---

## chart.html

### Beskrivelse

Brukes til å omslutte innhold som skal gjengis av Mermaid (diagrammer, flytskjemaer osv.).

### Kode```html
<div class="mermaid">{{ .Inner }}</div>
```
### Eksempel```
{{< chart >}}
graph LR
A[Start] --> B{Beslut}
B -- Ja --> C[Gör något]
B -- Nej --> D[Gör inget]
{{< /chart >}}
```
### Rendret resultat

Et Mermaid-diagram i henhold til den definerte syntaksen.

---

## column-two.html

### Beskrivelse

Omslutter innhold i et to-kolonneoppsett.

### Kode```html
<div class="column-two">{{ .Inner }}</div>
```
### Eksempel```
{{< column-two >}}
Kolumn 1 innehåll
{{< /column-two >}}
```
### Gjengitt resultat

Viser innhold i to kolonner (krever supplerende CSS).

---

## contact-small.html

### Beskrivelse

Viser et kompakt kontaktkort med tittel, navn og e-postlenke.

### Kode```html
<div class="flex-content">
  <div class="body p-relative bg-white shadow-1">
    <div class="d-block w-full"></div>
    <div class="px-2 py-2">
      <h3
        style="color: #9A9A9A; font-size: 16px; line-height: 1 !important; margin:0 !important;"
      >
        {{ .Get "title" }}
      </h3>
      <h2
        style="color: #323232; margin:0; font-size: 20px; line-height: 1 !important; padding-top: 5px !important;"
      >
        {{ .Get "name" }}
      </h2>
      <p style="line-height: 1 !important; margin:0px !important;">
        <a
          style="color: #9A9A9A; font-size: 14px;"
          href="mailto:{{.Get `email`}}"
          >{{ .Get "email" }}</a
        >
      </p>
    </div>
  </div>
</div>
```
### Eksempel```
{{< contact-small title="Support" name="Jane Doe" email="jane@example.com" >}}
```
### Gjengitt resultat

Et lite kontaktkort med "Support", "Jane Doe" og en e-postlenke.

---

## contact.html

### Beskrivelse

Viser et mer detaljert kontaktkort med valgfritt bilde, telefon, e-post og adresse.

### Kode```html
<div class="contact-container">
  {{ if .Params.picture }}
  <div
    class="contact-image"
    style="aspect-ratio: 1 / 1; background-image: url(/img/people/{{.Get `picture` }});"
  ></div>
  {{ end }}
  <div class="contact-text-container">
    <div class="contact-text">
      <div class="contact-name">{{ .Get "name" }}</div>
      <div class="contact-title">{{ .Get "title" }}</div>
    </div>
    <div class="contact-link-container">
      {{ if .Params.phone }}
      <a class="contact-link" href="tel:{{ .Get `phone` }}">
        <i class="fa-solid fa-phone"></i>
        <span class="phone-number">{{ .Get "phone" }}</span>
      </a>
      {{ end }} {{ if .Params.email }}
      <a class="contact-link" href="mailto:{{ .Get `email` }}">
        <i class="fa-solid fa-envelope"></i>
        <span>{{ .Get "email" }}</span>
      </a>
      {{ end }} {{ if .Params.address }}
      <a class="contact-link" href="{{ .Get `address-link` }}">
        <i class="fa-solid fa-map"></i>
        <span>{{ .Get "address" }}</span>
      </a>
      {{ end }}
    </div>
  </div>
</div>

<script>
  function formatPhoneNumber(phoneNumber) {
    let cleaned = ("" + phoneNumber).replace(/\D/g, "");

    // Svenska mobilnummer (ex: +46762117309)
    if (cleaned.startsWith("46") && cleaned.length === 11) {
      return `+46 ${cleaned.slice(2, 4)}-${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9, 11)}`;
    }

    // Svenska fastnummer (ex: +46855107370)
    if (cleaned.startsWith("46") && cleaned.length === 10) {
      return `+46 ${cleaned.slice(2, 3)}-${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
    }

    // Norska mobilnummer (ex: +4747123456)
    if (cleaned.startsWith("47") && cleaned.length === 11) {
      return `+47 ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 11)}`;
    }

    // Norska fastnummer (ex: +4722345678)
    if (cleaned.startsWith("47") && cleaned.length === 10) {
      return `+47 ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
    }

    return phoneNumber;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const phoneElements = document.querySelectorAll(".phone-number");
    phoneElements.forEach((phoneElement) => {
      const formattedNumber = formatPhoneNumber(phoneElement.textContent);
      phoneElement.textContent = formattedNumber;
    });
  });
</script>
```
### Eksempel```
{{< contact picture="jane.jpg" name="Jane Doe" title="CEO" phone="+46701234567" email="jane@example.com" address="123 Main St" address-link="/contact" >}}
```
### Gjengitt resultat

Et kontaktkort med bilde, navn, tittel, telefon, e-post og adresse.

---

## custom-card.html

### Beskrivelse

Oppretter et horisontalt kort med et bakgrunnsbilde, en overskrift, tekst (eller indre innhold) og en valgfri knappelenke.

### Kode```html
<div
  class="safespring-horisontal-card-container bg-white shadow-1 safespring-horisontal-card-row"
>
  <div
    class="safespring-horisontal-card-col safespring-horisontal-card-image"
    style="background-image: url({{ .Get `image` }});"
    alt="{{ or (.Get `alt`) (.Get `cardtitle`) }}"
  ></div>
  <div
    class="safespring-horisontal-card-col safespring-horisontal-card-content"
  >
    <h3>{{ .Get "cardtitle" }}</h3>
    {{ if isset .Params "text" }}
    <p>{{ .Get "text" }}</p>
    {{ else }} {{ .Inner | safeHTML }} {{ end }} {{ if isset .Params "link" }}
    <br /><br />
    <a class="button" href="{{ .Get `link` }}">{{ .Get "linktext" }}</a>
    {{ end }}
  </div>
</div>
```
### Eksempel```
{{< custom-card image="/img/card.jpg" cardtitle="Vår tjänst" text="Läs mer om vår tjänst." link="https://example.com" linktext="Läs mer" />}}
```
### Gjengitt resultat

Et horisontalt kort med bakgrunnsbilde, overskrift og en knapp for å lese mer.

---

## disclaimer.html

### Beskrivelse

Viser en «disclaimer»-boks med en tittel og tekst.

### Kode```html
<div class="disclaimer shadow-1">
  <p class="disclaimer-title">{{ .Get 0 }}</p>
  <p>{{ .Inner }}</p>
</div>
```
### Eksempel```
{{< disclaimer "Varning" >}}
Informationen på denna sida kan ändras utan förvarning.
{{< /disclaimer >}}
```
### Gjengitt resultat

En rute med overskriften "Advarsel" og meldingen "Informasjonen på denne siden kan endres uten forvarsel."

---

## flexbox.html

### Beskrivelse

Omslutter innhold i en flex-container for fleksibel layout.

### Kode```html
<div class="flex-container">{{ .Inner }}</div>
```
### Eksempel```
{{< flexbox >}}
Innehåll 1 | Innehåll 2 | Innehåll 3
{{< /flexbox >}}
```
### Gjengitt resultat

Viser innholdet horisontalt i en flex-layout.

---

## horisontal-card.html

### Beskrivelse

Oppretter et horisontalt kort med bakgrunnsbilde, overskrift, tekst og en knapp.

### Kode```html
<div
  class="safespring-horisontal-card-container bg-white shadow-1 safespring-horisontal-card-row my-2"
>
  <div
    class="safespring-horisontal-card-col safespring-horisontal-card-image"
    style="background-image: url({{ .Get `image` }});"
    alt="{{ or (.Get `alt`) (.Get `cardtitle`) }}"
  ></div>
  <div
    class="safespring-horisontal-card-col safespring-horisontal-card-content"
  >
    <h3>{{ .Get "cardtitle" }}</h3>
    <p>{{ .Get "text" }}</p>
    <br /><br />
    <a class="button" href="{{ .Get `link` }}">{{ .Get "linktext" }}</a>
  </div>
</div>
```
### Eksempler```
{{< horisontal-card image="/img/card.jpg" cardtitle="Nyhet" text="Detta är en nyhet." link="https://example.com" linktext="Läs mer" >}}
```
### Gjengitt resultat

Et horisontalt kort med bilde, overskrift, tekst og en knapp for å lese mer.

---

## icon-block-container.html

### Beskrivelse

Omslutter flere "icon-block" i en container.

### Kode```html
<div class="icon-block-container">{{ .Inner }}</div>
```
### Eksempel```
{{< icon-block-container >}}
{{< icon-block icon="fas fa-star" color="#FFD700" text="Utvald" description="Topprankad" >}}
{{< /icon-block-container >}}
```
### Gjengitt resultat

En beholder som inneholder en eller flere "icon-block".

---

## icon-block-horisontal.html

### Beskrivelse

Lager en horisontal ikonblokk med farget bakgrunn, ikon og tekst. Kan valgfritt omgis av en lenke.

### Kode```html
{{ with .Get "link" }}
<a class="icon-block-link" href="{{ . | safeURL }}"
  >{{ end }}
  <div
    class="icon-block-horisontal"
    style='background-color: {{ .Get "color" }}10;'
  >
    <div
      class="icon-block-color"
      style='color: {{ .Get "color" }};background-color: {{ .Get "color" }}10;'
    >
      <i class='{{ .Get "icon" }} icon'></i>
    </div>
    <p>
      <span class="inline_rubrik" style='color: {{ .Get "color" }};'
        >{{ .Get "text" }} </span
      ><br />{{ .Get "description" }}
    </p>
  </div>
  {{ with .Get "link" }}</a
>{{ end }}
```
### Eksempler```
{{< icon-block-horisontal link="https://example.com" icon="fas fa-info" color="#00AEEF" text="Info" description="Mer information" >}}
```
### Gjengitt resultat

Et horisontalt ikonblokk med ikon, farge og teksten "Info" samt "Mer informasjon".

---

## icon-block-small-container.html

### Beskrivelse

Omslutter små ikonblokker i en container.

### Kode```html
<div class="icon-block-small-container">{{ .Inner }}</div>
```
### Eksempel```
{{< icon-block-small-container >}}
{{< icon-block-small icon="fas fa-check" color="#28a745" text="OK" description="Allt bra" >}}
{{< /icon-block-small-container >}}
```
### Gjengitt resultat

En beholder for små ikonblokker.

---

## icon-block-small.html

### Beskrivelse

Oppretter en liten ikonblokk med ikon, tekst og beskrivelse. Kan pakkes inn i en lenke.

### Kode```html
{{ with .Get "link" }}
<a class="icon-block-link" href="{{ . }}"
  >{{ end }}
  <div
    class="icon-block-small"
    style='color: {{ .Get "color" }};border-color: {{ .Get "color" }}30;'
  >
    <div
      class="icon-block-small-icon"
      style='background-color: {{ .Get "color" }}10;'
    >
      <i class='{{ .Get "icon" }} icon'></i>
    </div>
    <p>
      <span style='color: {{ .Get "color" }};'>{{ .Get "text" }}</span>{{ .Get
      "description" }}
    </p>
  </div>
  {{ with .Get "link" }}</a
>{{ end }}
```
### Eksempel```
{{< icon-block-small link="https://example.com" icon="fas fa-check" color="#28a745" text="OK" description="Allt bra" >}}
```
### Gjengitt resultat

En liten ikonblokk med teksten "OK" og beskrivelsen "Alt er bra", eventuelt lenket.

---

## icon-block.html

### Beskrivelse

Viser en ikonblokk som kan inneholde enten et bilde eller et ikon samt tekst og beskrivelse. Kan omsluttes av en lenke.

### Kode```html
{{ with .Get "link" }}
<a class="icon-block-link" href="{{ . }}"
  >{{ end }}
  <div class="icon-block" style='color: {{ .Get "color" }};'>
    {{ if .Get "image" }}
    <img
      src='{{ .Get "image" }}'
      alt='{{ .Get "alt" | default "Icon" }}'
      class="icon-svg"
      style="height: 70px;"
    />
    {{ else }}
    <i class='{{ .Get "icon" }} icon'></i>
    {{ end }}
    <p>
      <span style='color: {{ .Get "color" }};'>{{ .Get "text" }}</span>{{ .Get
      "description" }}
    </p>
  </div>
  {{ with .Get "link" }} </a
>{{ end }}
```
### Eksempel```
{{< icon-block link="https://example.com" icon="fas fa-star" color="#FFD700" text="Utvald" description="Topprankad" >}}
```
### Rendret resultat

En ikonblokk med et ikon eller bilde, samt overskrift og beskrivelse.

---

## icon.html

### Beskrivelse

Rendrer et enkelt ikon med valgt farge.

### Kode```html
<i style="color: {{ .Get 1 | safeHTML }}" class="{{ .Get 0 }}"></i>
```
### Eksempel```
{{< icon "fas fa-heart" "#FF0000" >}}
```
### Gjengitt resultat

Et rødt hjerteikon.

---

## info.html

### Beskrivelse

Viser en kompakt informasjonsboks med en tittel, et navn og en e-postlenke.

### Kode```html
<div class="flex-content">
  <div class="body p-relative">
    <div class="d-block w-full"></div>
    <div class="px-2 py-2">
      <h3 style="font-size: 16px;">{{ .Get "title" }}</h3>
      <h2 style="font-size: 20px;">{{ .Get "name" }}</h2>
      <p>
        <a style="color:#323232" href="mailto:{{.Get `email`}}"
          >{{ .Get "email" }}</a
        >
      </p>
    </div>
  </div>
</div>
```
### Eksempel```
{{< info title="Kontakt" name="John Smith" email="john@example.com" >}}
```
### Gjengitt resultat

En enkel informasjonsboks med tittel, navn og e-postlenke.

---

## infobox.html

### Beskrivelse

Omslutter innhold i en stylet informasjonsboks.

### Kode```html
<div class="flex-container bg-white shadow-1 br-5">{{ .Inner }}</div>
```
### Eksempel```
{{< infobox >}}
Detta är viktig information.
{{< /infobox >}}
```
### Gjengitt resultat

En hvit boks med skygge (shadow-1) som inneholder valgfritt tekstinnhold.

---

## ingress.html

### Beskrivelse

Formaterer innledende eller ingress-tekst i en egen stil, ofte større eller mer fremtredende.

### Kode```html
<div class="ingress"><p>{{ .Inner }}</p></div>
```
### Eksempel```
{{< ingress >}}
Välkommen till vår webbplats! Detta är inledande text.
{{< /ingress >}}
```
### Gjengitt resultat

En kort innledning i en distinkt stil.

---

## inline.html

### Beskrivelse

Viser inline-innhold i et avsnitt med en særskilt overskriftsstil.

### Kode```html
<p><span class="inline_rubrik">{{ .Inner }}</span></p>
```
### Eksempel```
{{< inline "Observera: Detta är ett meddelande." >}}
```
### Rendret resultat

Et avsnitt med tekst i overskriftsstil.

---

## localbutton.html

### Beskrivelse

Oppretter en knapp for lokal navigasjon med egendefinert lenke, target, ikon og tekst.

### Kode```html
<br>
<a href='{{ .Get "link" }}' {{ with .Get "target" }}target='{{ . }}'{{ else }}target='_self'{{ end }} class='button'>
  {{ with .Get "icon" }}<i class='fa-solid {{ . }}'></i>&nbsp;&nbsp;&nbsp;{{ end }}
  {{ .Get "text" }}
</a>
<br>
```
### Eksempel```
{{< localbutton link="/about" target="_self" icon="fa-info" text="Mer info" >}}
```
### Gjengitt resultat

En knapp med teksten "Mer info" og et ikon, som lenker til `/about`.

---

## localtextbutton.html

### Beskrivelse

Oppretter en tekstlenke med en knappelignende stil (eller enkel tekstlenke) uten bakgrunn.

### Kode```html
<a id="text-button" target="_self" href="{{ .Get 1 }}">{{ .Get 0 }}</a> <br />
```
### Eksempel```
{{< localtextbutton "Klicka här" "/page" >}}
```
### Gjengitt resultat

En tekstlenke med teksten "Klikk her" som leder til `/page`.

---

## note.html

### Beskrivelse

Viser en punktmarkert notisboks med en tittel og melding.

### Kode```html
<div class="note-dotted">
  <p class="note-dotted-title">{{ .Get 0 }}</p>
  {{ .Inner }}
</div>
```
### Eksempler```
{{< note "Notis" >}}
Glöm inte att uppdatera sidan.
{{< /note >}}
```
### Gjengitt resultat

En merknadsboks med overskriften "Merknad" og teksten "Ikke glem å oppdatere siden."

---

## question.html

### Beskrivelse

Oppretter en FAQ-lignende accordion med et spørsmål som overskrift og svaret i det skjulte innholdet.

### Kode```html
<div class="accordion-box">
  <button class="accordion">{{ .Get "question" }}</button>
  <div class="panel content-body">
    <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <h3 itemprop="name">{{ .Get "question" }}</h3>
      <div
        itemscope
        itemprop="acceptedAnswer"
        itemtype="https://schema.org/Answer"
      >
        <div itemprop="text">
          <p style="padding:0;">{{ .Inner }}</p>
        </div>
        <div class="pb-2"></div>
      </div>
    </div>
  </div>
</div>
```
### Eksempel```
{{< question question="Vad är er returpolicy?" >}}
Vi erbjuder 30 dagars returrätt.
{{< /question >}}
```
### Gjengitt resultat

Et klikkbart spørsmål med et skjult svar som folder seg ut ved klikk.

---

## quote.html

### Beskrivelse

Viser et sitat i blokkformat med en valgfri person eller kilde.

### Kode```html
<div class="quote">
  <p>{{ .Inner }}</p>
  <p class="quote-person">{{ .Get 0 }}</p>
</div>
```
### Eksempel```
{{< quote "Albert Einstein" >}}
Fantasi är viktigare än kunskap.
{{< /quote >}}
```
### Renderet resultat

Et blokksitat med teksten og personen «Albert Einstein» under.

---

## services.html

### Beskrivelse

Gjengir en liste med tjenestekort avhengig av hvilket språk som er angitt (En, No eller standard).

### Kode```html
<div class="flexcontainer-three">
  {{ $language := .Get 0 }} {{ if eq $language "en"}} {{ range (where
  $.Site.RegularPages "Section" "en").ByParam "cardorder" }} {{ if isset .Params
  "cardorder" }} {{ .Render "li-index"}} {{ end }} {{ end }} {{ else if eq
  $language "nb" }} {{ range (where $.Site.RegularPages "Section" "no").ByParam
  "cardorder" }} {{ if isset .Params "cardorder" }} {{ .Render "li-index"}} {{
  end }} {{ end }} {{ else }} {{ range (where $.Site.RegularPages "Section"
  "tjanster").ByParam "cardorder" }} {{ if isset .Params "cardorder" }} {{
  .Render "li-index"}} {{ end }} {{ end }} {{ end }}
</div>
```
### Eksempel```
{{< services "en" >}}
```
### Gjengitt resultat

En liste med tjenestekort fra seksjonen «en» (hvis cardorder er definert).

---

## streamed-video.html

### Beskrivelse

Viser en videospiller som støtter HLS-strømmer. Bruker Hls.js for å initialisere videoen hvis nettleseren støtter det.

### Kode```html
<div class="webinarvideo">
  <video
    class="webinar-videoplayer"
    id="myVideo"
    controls
    preload="none"
    poster="{{ .Get 1 | safeURL }}"
  >
    Your browser does not support the video tag.
  </video>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    var video = document.getElementById("myVideo");
    var hlsScriptLoaded = false;
    var videoInitialized = false;

    function loadHlsScript(callback) {
      if (hlsScriptLoaded) {
        callback();
        return;
      }

      var script = document.createElement("script");
      script.src = "/js/hls.min.js";
      script.onload = function () {
        hlsScriptLoaded = true;
        callback();
      };
      document.body.appendChild(script);
    }

    function initializeVideo() {
      if (videoInitialized) return;

      if (window.Hls && Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource("{{ .Get 0 | safeURL }}");
        hls.attachMedia(video);
        videoInitialized = true;
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // För Safari
        video.src = "{{ .Get 0 | safeURL }}";
        videoInitialized = true;
      } else if (
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !window.MSStream
      ) {
        video.src = "{{ .Get 0 | safeURL }}";
        video.load();
      } else {
        alert("Your browser does not support this video format.");
      }
    }

    // Spela upp videon vid klick eller play
    video.addEventListener("play", function () {
      if (!videoInitialized) {
        loadHlsScript(function () {
          initializeVideo();
          video.play();
        });
      }
    });

    video.addEventListener("click", function () {
      if (!videoInitialized) {
        loadHlsScript(function () {
          initializeVideo();
          video.play();
        });
      }
    });
  });
</script>
```
### Eksempler```
{{< streamed-video "https://example.com/stream.m3u8" "https://example.com/poster.jpg" >}}
```
### Gjengitt resultat

En videospiller med støtte for HLS-strømming og et forhåndsbilde (poster).

---

## tooltip.html

### Beskrivelse

Viser tekst med et verktøytips som dukker opp når du holder pekeren over.

### Kode```html
<span class="text-tooltip"
  >{{ .Get 0 }}
  <span class="text-tooltiptext shadow-1">{{ .Inner }}</span>
</span>
```
### Eksempel```
{{< tooltip "Håll musen över mig" >}}Detta är tooltip-texten.{{< /tooltip >}}
```
### Gjengitt resultat

Teksten "Hold pekeren over meg" med et verktøytips som vises ved hover.

{{< accordion-script >}}