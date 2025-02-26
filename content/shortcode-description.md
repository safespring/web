---
title: "Descriptions of short codes"
date: 2024-08-20
draft: true
language: "En"
---

## {{ < services >}}
To include a page in the `services` shortcode, you can add the `cardorder` parameter to each service page's front matter that you want to include in the collection of cards. The value of the "cardorder" parameter determines the order in which the card appears in the collection. This shortcode is a flexible and customizable way to display a visually appealing summary of Safespring's services on your website.

The card's appearance is described in `layouts/_default/li-index` and can be customized using parameters in the page's front matter. For example, the  `cardcolor` parameter determines the color of the card's border and icon, while the `cardicon` parameter determines the icon displayed on the card. Additionally, the cardtitle and `cardintro` parameters can be used to customize the text displayed on the card.
{{% accordion title="Html code for services" %}}
```html
<div class="flexcontainer-three">
  {{ $language := .Get 0 }}
  {{ if eq $language "En"}}
    {{ range (where $.Site.RegularPages "Section" "en").ByParam "cardorder" }}
      {{ if isset .Params "cardorder" }}
        {{ .Render "li-index"}}
        {{ else }}
      {{ end }}
  {{ end }}
  {{ else if eq $language "No" }}
    {{ range (where $.Site.RegularPages "Section" "no").ByParam "cardorder" }}
      {{ if isset .Params "cardorder" }}
        {{ .Render "li-index"}}
        {{ else }}
      {{ end }}
    {{ end }}
  {{ else }}
    {{ range (where $.Site.RegularPages "Section" "tjanster").ByParam "cardorder" }}
      {{ if isset .Params "cardorder" }}
        {{ .Render "li-index"}}
        {{ else }}
      {{ end }}
    {{ end }}
  {{ end }}
</div>
```

### Html code for `li-index`
```html
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
      <div class="cardicon" style="background-color: {{ .Params.cardcolor }}10"><i class="{{ .Params.cardicon }} icon" style="color: {{ .Params.cardcolor }} !important"></i></div>
      <h2 style="color: {{ .Params.cardcolor }}">
        {{ if .Params.cardtitle }}{{ .Params.cardtitle }}{{ else }}{{ .Title }}{{ end }}
      </h2>
    </div>
      <p class="mb-0">
        {{ if .Params.cardintro }}{{ .Params.cardintro }}{{ else }}{{ .Params.intro }}{{ end }}
      </p>
</div>
</a>
```
{{% /accordion %}}
{{< distance >}}
{{< services >}}





{{< accordion-script >}}






---






# Shortcodes Documentation

Nedan finns en översiktlig dokumentation av alla våra shortcodes för Hugo-webbplatsen. För varje shortcode finns:
- **Beskrivning:** Kort förklaring av vad shortcoden gör.
- **Kod:** Själva shortcoden i HTML.
- **Exempel:** Hur man anropar shortcoden med exempeldata.
- **Renderat resultat:** Hur kortkoden ser ut på sidan.

---

## 2calltoaction.html

### Beskrivning
Skapar en call-to-action-sektion med två knappar. Den första knappen tar två parametrar (text och URL) medan den andra knappen tar två parametrar (text och URL).

### Kod
```html
<br>
<a class="button" target="_self" href="{{ .Get 1 | safeURL }}">{{ .Get 0 }}</a>
<a style="margin-top: 25px; padding: 1px 0 0 0;" class="text-button" target="_blank" href="{{ .Get 3 | safeURL }}">{{ .Get 2 }}</a>
<br>
```

### Exempel

{{< 2calltoaction "Call Us" "/contact" "Learn More" "https://example.com/learn-more" >}}


### Renderat resultat
En primär knapp med texten "Call Us" (länkad till `/contact`) och en sekundär textlänk "Learn More" (länkad till `https://example.com/learn-more`).

---

## accordion-script.html

### Beskrivning
Infogar JavaScript som behövs för att aktivera funktionaliteten hos accordion-element (toggle, smidig scroll, öppning av accordion via länkar).

### Kod
```html
<script>
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
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
      accordionBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    var targetId = this.getAttribute('href').substr(1);
    var targetElement = document.getElementById(targetId);
    if (targetElement && targetElement.classList.contains('accordion-box')) {
      e.preventDefault();
      openAccordion(targetId);
    }
  });
});
</script>
```

### Exempel
 
{{< accordion-script >}}
 

### Renderat resultat
Ingen direkt visuell komponent. Scriptet körs i bakgrunden för att möjliggöra accordion-funktionalitet.

---

## accordion.html

### Beskrivning
Skapar ett accordion-element med en klickbar rubrik som visar eller döljer dess innehåll.

### Kod

{{< accordion id="acc1" title="Mer information" >}}
Detta är innehållet som döljs i accordionen.
{{< /accordion >}}


### Exempel

  &#123;&#123;&lt; accordion id="acc1" title="Mer information"
  Detta är innehållet som döljs i accordionen.
  &#123;&#123;&lt;/accordion &gt;&#125;&#125;
 

### Renderat resultat
Ett klickbart element med rubriken "Mer information" som visar/döljer sitt innehåll.

---

## aks-alternatives.html

### Beskrivning
Visar en tabell som jämför Azure-tjänster med open source-alternativ samt anger om de är managerade av Safespring.

### Kod
```html
<div class="container-table-wp mt-2">
  <div class="price-table">
    <div class="table">
      <div class="row header">
        <div class="cell">
          Tjänst i Azure
        </div>
        <div class="cell">
          Funktion
        </div>
        <div class="cell">
          Open Source
        </div>
        <div class="cell">
          Managerat hos Safespring
        </div>
      </div>

      <div class="row">
        <div class="cell" data-title="Tjänst i Azure">
          Azure Kubernetes Service (AKS)
        </div>
        <div class="cell" data-title="Funktion">
          Managerad Kubernetes
        </div>
        <div class="cell" data-title="Open source alternativ">
          <a href="https://compliantkubernetes.io">Compliant Kubernetes</a>
        </div>
        <div class="cell" data-title="Managerat av Safespring">
          Ja
        </div>
      </div>

      <!-- Fler rader här, se originalkoden för alla alternativ -->
    </div>
  </div>
</div>
```

### Exempel
```
{{< aks-alternatives >}}
```

### Renderat resultat
En tabell med olika Azure-tjänster, motsvarande open source-alternativ och huruvida de är managerade hos Safespring.

---

## button.html

### Beskrivning
Skapar en knapp som länkar antingen till en extern URL (definierad i `.Params.link`) eller en sidebar-länk (definierad i `.Params.sidebarlinkurl`).

### Kod
```html
<br>
{{ if $.Page.Params.link }}
  <a class="button" target="_blank" href="{{ $.Page.Params.link }}">{{ $.Page.Params.knapp }}</a>
{{ else }}
  <a href="{{ $.Page.Params.sidebarlinkurl }}" target="_blank" id="button">
    {{ $.Page.Params.sidebarlinkname }}
    {{ if $.Page.Params.sidebarlinkicon }}&nbsp;&nbsp;&nbsp;<i class="fas {{ $.Page.Params.sidebarlinkicon }}"></i>{{ end }}
  </a>
{{ end }}
```

### Exempel
```
{{ < button link="https://example.com" knapp="Klicka här" >}}
```

### Renderat resultat
En klickbar knapp med texten "Klicka här" som leder till `https://example.com`.

---

## button0.html

### Beskrivning
En variant av `button.html` med samma beteende, men som kan användas separat vid behov.

### Kod
```html
<br>
{{ if $.Page.Params.link }}
  <a class="button" target="_blank" href="{{ $.Page.Params.link }}">{{ $.Page.Params.knapp }}</a>
{{ else }}
  <a href="{{ $.Page.Params.sidebarlinkurl }}" target="_blank" id="button">
    {{ $.Page.Params.sidebarlinkname }}
    {{ if $.Page.Params.sidebarlinkicon }}&nbsp;&nbsp;&nbsp;<i class="fas {{ $.Page.Params.sidebarlinkicon }}"></i>{{ end }}
  </a>
{{ end }}
```

### Exempel
```
{{< button0 link="https://example.com" knapp="Klicka här" >}}
```

### Renderat resultat
En klickbar knapp med texten "Klicka här" som leder till `https://example.com`, snarlik `button.html`.

---

## calendar.html

### Beskrivning
Visar en eventkort-stil med datum, typ av event, plattform och tid, formaterad som en minikalender.

### Kod
```html
<div>
  <style>
    .safespring-event .desc .des,.safespring-event .desc .hed{font-family:Hind,sans-serif;overflow:hidden}.safespring-event{display:inline-block;position:relative;cursor:default;background:#fff;font-family:Hind,sans-serif;font-weight:600;color:#323232!important;font-size:15px;line-height:100%;-webkit-box-shadow:0 0 0 .5px rgba(50,50,93,.17),0 2px 5px 0 rgba(50,50,93,.1),0 1px 1.5px 0 rgba(0,0,0,.07),0 1px 2px 0 rgba(0,0,0,.08),0 0 0 0 transparent!important;-moz-box-shadow:0 0 0 .5px rgba(50,50,93,.17),0 2px 5px 0 rgba(50,50,93,.1),0 1px 1.5px 0 rgba(0,0,0,.07),0 1px 2px 0 rgba(0,0,0,.08),0 0 0 0 transparent!important;box-shadow:0 0 0 .5px rgba(50,50,93,.17),0 2px 5px 0 rgba(50,50,93,.1),0 1px 1.5px 0 rgba(0,0,0,.07),0 1px 2px 0 rgba(0,0,0,.08),0 0 0 0 transparent!important;-webkit-border-radius:4px;border-radius:4px}.safespring-event .date{width:50px;height:60px;float:left;position:relative}.safespring-event .date .bdr1,.safespring-event .date .bdr2{width:1px;height:50px;position:absolute;z-index:100;top:5px}.safespring-event .date .mon{display:block;text-align:center;padding:12px 0 0;font-size:10px;color:#bf5549;font-weight:700;line-height:110%;text-transform:uppercase}.safespring-event .date .day{display:block;text-align:center;padding:0 0 8px;font-size:28px;font-weight:700;color:#333;line-height:100%}.safespring-event .date .bdr1{background:#eaeaea;right:-3px}.safespring-event .date .bdr2{background:#fff;right:-4px}.safespring-event .desc{height:60px;float:left;position:relative;padding:0 15px 0 0}.safespring-event .desc p{margin:0;display:block;text-align:left;padding:10px 0 0 15px;font-size:11px;color:#666;line-height:130%}.safespring-event .desc .hed{height:15px;display:block;margin-bottom:0;font-size:13px;line-height:110%;color:#333;text-transform:uppercase}.safespring-event .desc .des{height:28px;display:block}.safespring-event-selected{background-color:#f4f4f4}.addeventatc .alarm_reminder,.addeventatc .all_day_event,.addeventatc .attendees,.addeventatc .calname,.addeventatc .date_format,.addeventatc .recurring,.addeventatc .status,.addeventatc .uid,.safespring-event .client,.safespring-event .description,.safespring-event .end,.safespring-event .facebook_event,.safespring-event .location,.safespring-event .method,.safespring-event .organizer,.safespring-event .organizer_email,.safespring-event .start,.safespring-event .timezone,.safespring-event .title,.safespring-event .transp{display:none!important}
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

### Exempel
```
{{< calendar month="Sep" day="15" type="Webinar" platform="Zoom" time="10:00 AM" >}}
```

### Renderat resultat
En liten eventruta med månad, dag, typ av event, plattform och tid.

---

## calendly.html

### Beskrivning
Skapar en horisontell kortkomponent med en bild, titel, text och en Calendly-knapp som öppnar en popup för bokning.

### Kod
```html
<div class="safespring-horisontal-card-container bg-white shadow-1 safespring-horisontal-card-row my-2">
  <div class="safespring-horisontal-card-col safespring-horisontal-card-image">
    <img src="{{ .Get `image` }}" alt="{{ .Get `cardtitle` }}">
  </div>
  <div class="safespring-horisontal-card-col safespring-horisontal-card-content">
    <h3>{{ .Get "cardtitle" }}</h3>
    <p>{{ .Get "text" }}</p><br><br>
    <!-- Calendly link widget begin -->
    <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
    <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
    <a class="button" href="" onclick="Calendly.initPopupWidget({url: '{{ .Get `link` }}'});return false;">{{ .Get "linktext" }}</a>
    <!-- Calendly link widget end -->
  </div>
</div>
```

### Exempel
```
{{< calendly image="/img/calendly.png" cardtitle="Boka ett möte" text="Välj en tid som passar dig" link="https://calendly.com/din-lank" linktext="Boka nu" >}}
```

### Renderat resultat
Ett horisontellt kort med en bild, titel, text och en knapp **Boka nu** som öppnar Calendly i en popup.

---

## chart.html

### Beskrivning
Används för att omge innehåll som ska renderas av Mermaid (diagram, flödesdiagram, etc.).

### Kod
```html
<div class="mermaid">
  {{ .Inner }}
</div>
```

### Exempel
```
{{< chart >}}
graph LR
A[Start] --> B{Beslut}
B -- Ja --> C[Gör något]
B -- Nej --> D[Gör inget]
{{< /chart >}}
```

### Renderat resultat
Ett Mermaid-diagram enligt den definierade syntaxen.

---

## checkbox.html

### Beskrivning
Skapar en interaktiv checkbox som kan klickas på för att toggla en check-ikon.

### Kod
```html
<!-- Checkbox Shortcode -->
<div class="checkbox-wrapper" onclick="toggleCheckbox(this)">
  <div class="checkbox-circle"><i class="fa fa-check checkbox-icon"></i></div>
  <p class="checkbox-text">{{ .Inner }}</p>
</div>

<!-- Stylar för Checkbox -->
<style>
.checkbox-wrapper {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.checkbox-circle {
  background-color: #E8EFF3;
  transition: all 0.2s;
  height: 50px;
  padding-inline: 16px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: transparent;
}

.checkbox-circle.checked {
  background-color: #32CD3240;
  color: #32CD32;
}

.checkbox-text {
  padding-left: 30px;
}

.checkbox-wrapper:hover .checkbox-circle {
  transform: scale(1.1);
}

.checkbox-wrapper:active .checkbox-circle {
  transform: scale(1.2);
}
</style>

<!-- JavaScript för att hantera klick -->
<script>
function toggleCheckbox(element) {
  const circle = element.querySelector('.checkbox-circle');
  circle.classList.toggle('checked');
}
</script>
```

### Exempel
```
{{< checkbox >}}Jag godkänner villkoren.{{< /checkbox >}}
```

### Renderat resultat
En checkbox med texten "Jag godkänner villkoren." som kan klickas för att visa eller dölja check-ikonen.

---

## column-two.html

### Beskrivning
Omger innehåll i en två-kolumners layout.

### Kod
```html
<div class="column-two">
  {{ .Inner }}
</div>
```

### Exempel
```
{{< column-two >}}
Kolumn 1 innehåll
{{< /column-two >}}
```

### Renderat resultat
Visar innehåll i två kolumner (kräver kompletterande CSS).

---

## contact-small.html

### Beskrivning
Visar ett kompakt kontaktkort med titel, namn och e-postlänk.

### Kod
```html
<div class="flex-content">
  <div class="body p-relative bg-white shadow-1">
    <div class="d-block w-full">
    </div>
    <div class="px-2 py-2">
      <h3 style="color: #9A9A9A; font-size: 16px; line-height: 1 !important; margin:0 !important;">
        {{ .Get "title" }}
      </h3>
      <h2 style="color: #323232; margin:0; font-size: 20px; line-height: 1 !important; padding-top: 5px !important;">
        {{ .Get "name" }}
      </h2>
      <p style="line-height: 1 !important; margin:0px !important;">
        <a style="color: #9A9A9A; font-size: 14px;" href="mailto:{{.Get `email`}}">{{ .Get "email" }}</a>
      </p>
    </div>
  </div>
</div>
```

### Exempel
```
{{< contact-small title="Support" name="Jane Doe" email="jane@example.com" >}}
```

### Renderat resultat
Ett litet kontaktkort med "Support", "Jane Doe" och en e-postlänk.

---

## contact.html

### Beskrivning
Visar ett mer detaljerat kontaktkort med valfri bild, telefon, e-post och adress.

### Kod
```html
<div class="contact-container">
  {{ if .Params.picture }}
  <div class="contact-image" style="aspect-ratio: 1 / 1; background-image: url(/img/people/{{.Get `picture` }});">
  </div>{{ end }}
  <div class="contact-text-container">
    <div class="contact-text">
      <div class="contact-name">
        {{ .Get "name" }}
      </div>
      <div class="contact-title">
        {{ .Get "title" }}
      </div>
    </div>
    <div class="contact-link-container">
      {{ if .Params.phone }}
      <a class="contact-link" href="tel:{{ .Get `phone` }}">
        <i class="fa-solid fa-phone"></i>
        <span class="phone-number">{{ .Get "phone" }}</span>
      </a>
      {{ end }}
      {{ if .Params.email }}
      <a class="contact-link" href="mailto:{{ .Get `email` }}">
        <i class="fa-solid fa-envelope"></i>
        <span>{{ .Get "email" }}</span>
      </a>
      {{ end }}
      {{ if .Params.address }}
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
    let cleaned = ('' + phoneNumber).replace(/\D/g, '');

    // Svenska mobilnummer (ex: +46762117309)
    if (cleaned.startsWith('46') && cleaned.length === 11) {
      return `+46 ${cleaned.slice(2, 4)}-${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9, 11)}`;
    }

    // Svenska fastnummer (ex: +46855107370)
    if (cleaned.startsWith('46') && cleaned.length === 10) {
      return `+46 ${cleaned.slice(2, 3)}-${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
    }

    // Norska mobilnummer (ex: +4747123456)
    if (cleaned.startsWith('47') && cleaned.length === 11) {
      return `+47 ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 11)}`;
    }

    // Norska fastnummer (ex: +4722345678)
    if (cleaned.startsWith('47') && cleaned.length === 10) {
      return `+47 ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
    }

    return phoneNumber;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const phoneElements = document.querySelectorAll('.phone-number');
    phoneElements.forEach(phoneElement => {
      const formattedNumber = formatPhoneNumber(phoneElement.textContent);
      phoneElement.textContent = formattedNumber;
    });
  });
</script>
```

### Exempel
```
{{< contact picture="jane.jpg" name="Jane Doe" title="CEO" phone="+46701234567" email="jane@example.com" address="123 Main St" address-link="/contact" >}}
```

### Renderat resultat
Ett kontaktkort med bild, namn, titel, telefon, e-post och adress.

---

## custom-card.html

### Beskrivning
Skapar ett horisontellt kort med en bakgrundsbild, rubrik, text (eller inre innehåll) och en valfri knapp-länk.

### Kod
```html
<div class="safespring-horisontal-card-container bg-white shadow-1 safespring-horisontal-card-row">
  <div class="safespring-horisontal-card-col safespring-horisontal-card-image" style="background-image: url({{ .Get `image` }});" alt="{{ or (.Get `alt`) (.Get `cardtitle`) }}">
  </div>
  <div class="safespring-horisontal-card-col safespring-horisontal-card-content">
    <h3>{{ .Get "cardtitle" }}</h3>
    {{ if isset .Params "text" }}
      <p>{{ .Get "text" }}</p>
    {{ else }}
      {{ .Inner | safeHTML }}
    {{ end }}
    {{ if isset .Params "link" }}
      <br><br>
      <a class="button" href="{{ .Get `link` }}">{{ .Get "linktext" }}</a>
    {{ end }}
  </div>
</div>
```

### Exempel
```
{{< custom-card image="/img/card.jpg" cardtitle="Vår tjänst" text="Läs mer om vår tjänst." link="https://example.com" linktext="Läs mer" >}}
```

### Renderat resultat
Ett horisontellt kort med bakgrundsbild, rubrik och en knapp för vidare läsning.

---

## disclaimer.html

### Beskrivning
Visar en "disclaimer"-ruta med en titel och text.

### Kod
```html
<div class="disclaimer shadow-1">
  <p class="disclaimer-title">{{ .Get 0 }}</p>
  <p>
  {{ .Inner }}
  </p>
</div>
```

### Exempel
```
{{< disclaimer "Varning" >}}
Informationen på denna sida kan ändras utan förvarning.
{{< /disclaimer >}}
```

### Renderat resultat
En ruta med rubriken "Varning" och meddelandet "Informationen på denna sida kan ändras utan förvarning."

---

## flavour.html

### Beskrivning
Visar resursspecifikationer (CPU, RAM, disk) med hjälp av ikoner och numeriska värden.

### Kod
```html
{{ $cpu := .Get "cpu" }}
{{ $ram := .Get "ram" }}
{{ $disk := .Get "disk" }}
<div class="disk-container">
  <div class="disk">
    {{ $disk }}
  </div>
</div>
<div class="flavour-container">
  <div class="cpu-container">
    {{ with $cpu }}
      {{ range $index, $e := seq 1 $cpu }}
        <div class="cpu"></div>
      {{ end }}
    {{ end }}
  </div>
  <div class="ram-container">
    {{ with $ram }}
      {{ range $index, $e := seq 1 $ram }}
        <div class="ram"></div>
      {{ end }}
    {{ end }}
  </div>
</div>
```

### Exempel
```
{{< flavour cpu="4" ram="8" disk="100GB" >}}
```

### Renderat resultat
Visuella indikationer för 4 CPU, 8 RAM och en disk på 100GB.

---

## flexbox.html

### Beskrivning
Omger innehåll i en flex-container för flexibel layout.

### Kod
```html
<div class="flex-container">
  {{ .Inner }}
</div>
```

### Exempel
```
{{< flexbox >}}
Innehåll 1 | Innehåll 2 | Innehåll 3
{{< /flexbox >}}
```

### Renderat resultat
Visar innehållet horisontellt i en flex-layout.

---

## half-image.html

### Beskrivning
Skapar en kortkomponent med en bild på ena sidan och text på den andra.

### Kod
```html
<div class="safespring-horisontal-card-container bg-white shadow-1 safespring-horisontal-card-row my-2">
  {{ if ne .Get "image" }}
  <div class="safespring-horisontal-card-col safespring-horisontal-card-image">
    <img src="{{ .Get 0 }}" alt="">
  </div>
  {{ end }}
  <div class="safespring-horisontal-card-col safespring-horisontal-card-content">
    {{ .Inner }}
  </div>
</div>
```

### Exempel
```
{{< half-image "https://example.com/image.jpg" >}}
Textinnehåll på höger sida.
{{< /half-image >}}
```

### Renderat resultat
En horisontell kortkomponent med en bild till vänster och text till höger.

---

## horisontal-card.html

### Beskrivning
Skapar ett horisontellt kort med bakgrundsbild, rubrik, text och en knapp.

### Kod
```html
<div class="safespring-horisontal-card-container bg-white shadow-1 safespring-horisontal-card-row my-2">
  <div class="safespring-horisontal-card-col safespring-horisontal-card-image" style="background-image: url({{ .Get `image` }});" alt="{{ or (.Get `alt`) (.Get `cardtitle`) }}">
  </div>
  <div class="safespring-horisontal-card-col safespring-horisontal-card-content">
    <h3>{{ .Get "cardtitle" }}</h3>
    <p>{{ .Get "text" }}</p><br><br>
    <a class="button" href="{{ .Get `link` }}">{{ .Get "linktext" }}</a>
  </div>
</div>
```

### Exempel
```
{{< horisontal-card image="/img/card.jpg" cardtitle="Nyhet" text="Detta är en nyhet." link="https://example.com" linktext="Läs mer" >}}
```

### Renderat resultat
Ett horisontellt kort med bild, rubrik, text och en knapp för att läsa mer.

---

## icon-block-container.html

### Beskrivning
Omger flera "icon-block" i en container.

### Kod
```html
<div class="icon-block-container">
  {{ .Inner }}
</div>
```

### Exempel
```
{{< icon-block-container >}}
{{< icon-block icon="fas fa-star" color="#FFD700" text="Utvald" description="Topprankad" >}}
{{< /icon-block-container >}}
```

### Renderat resultat
En container som rymmer ett eller flera "icon-block".

---

## icon-block-horisontal.html

### Beskrivning
Skapar ett horisontellt ikonblock med färgad bakgrund, ikon och text. Kan valfritt omges av en länk.

### Kod
```html
{{ with .Get "link" }}
<a class="icon-block-link" href='{{ . | safeURL }}'>{{ end }}
  <div class="icon-block-horisontal" style='background-color: {{ .Get "color" }}10;'>
    <div class="icon-block-color" style='color: {{ .Get "color" }};background-color: {{ .Get "color" }}10;'>
      <i class='{{ .Get "icon" }} icon'></i>
    </div>
    <p><span class="inline_rubrik" style='color: {{ .Get "color" }};'>{{ .Get "text" }} </span><br>{{ .Get "description" }}</p>
  </div>
{{ with .Get "link" }}</a>{{ end }}
```

### Exempel
```
{{< icon-block-horisontal link="https://example.com" icon="fas fa-info" color="#00AEEF" text="Info" description="Mer information" >}}
```

### Renderat resultat
Ett horisontellt ikonblock med ikon, färg och text "Info" samt "Mer information".

---

## icon-block-small-container.html

### Beskrivning
Omger små ikonblock i en container.

### Kod
```html
<div class="icon-block-small-container">
  {{ .Inner }}
</div>
```

### Exempel
```
{{< icon-block-small-container >}}
{{< icon-block-small icon="fas fa-check" color="#28a745" text="OK" description="Allt bra" >}}
{{< /icon-block-small-container >}}
```

### Renderat resultat
En container för små ikonblock.

---

## icon-block-small.html

### Beskrivning
Skapar ett litet ikonblock med ikon, text och beskrivning. Kan omges av en länk.

### Kod
```html
{{ with .Get "link" }}
<a class="icon-block-link" href='{{ . }}'>{{ end }}
  <div class="icon-block-small" style='color: {{ .Get "color" }};border-color: {{ .Get "color" }}30;'>
    <div class="icon-block-small-icon" style='background-color: {{ .Get "color" }}10;'>
      <i class='{{ .Get "icon" }} icon'></i>
    </div>
    <p>
      <span style='color: {{ .Get "color" }};'>{{ .Get "text" }}</span>{{ .Get "description" }}
    </p>
  </div>
{{ with .Get "link" }}</a>{{ end }}
```

### Exempel
```
{{< icon-block-small link="https://example.com" icon="fas fa-check" color="#28a745" text="OK" description="Allt bra" >}}
```

### Renderat resultat
Ett litet ikonblock med texten "OK" och beskrivningen "Allt bra", eventuellt länkad.

---

## icon-block.html

### Beskrivning
Visar ett ikonblock som kan innehålla antingen en bild eller en ikon samt text och beskrivning. Kan omges av en länk.

### Kod
```html
{{ with .Get "link" }}
<a class="icon-block-link" href='{{ . }}'>{{ end }}
    <div class="icon-block" style='color: {{ .Get "color" }};'>
        {{ if .Get "image" }}
            <img src='{{ .Get "image" }}' alt='{{ .Get "alt" | default "Icon" }}' class="icon-svg" style="height: 70px;"/>
        {{ else }}
            <i class='{{ .Get "icon" }} icon'></i>
        {{ end }}
        <p>
            <span style='color: {{ .Get "color" }};'>{{ .Get "text" }}</span>{{ .Get "description" }}
        </p>
    </div>
{{ with .Get "link" }}
</a>{{ end }}
```

### Exempel
```
{{< icon-block link="https://example.com" icon="fas fa-star" color="#FFD700" text="Utvald" description="Topprankad" >}}
```

### Renderat resultat
Ett ikonblock med en ikon eller bild, samt rubrik och beskrivning.

---

## icon.html

### Beskrivning
Renderar en enkel ikon med vald färg.

### Kod
```html
<i style='color: {{ .Get 1 | safeHTML }}' class='{{ .Get 0 }}'></i>
```

### Exempel
```
{{< icon "fas fa-heart" "#FF0000" >}}
```

### Renderat resultat
En röd hjärtikon.

---

## impact.html

### Beskrivning
Visar svårighetsgrad och påverkan i form av repetitiva ikoner eller symboler.

### Kod
```html
{{ $difficulty := .Get "difficulty" }}
{{ $impact := .Get "impact" }}
<div class="impact-container">
  <div class="difficulty-column">
    {{ with $difficulty }}
      {{ range $index, $e := seq 1 $difficulty }}
        <div class="difficulty"></div>
      {{ end }}
    {{ end }}
  </div>
  <div class="impact-column">
    {{ with $impact }}
      {{ range $index, $e := seq 1 $impact }}
        <div class="impact"></div>
      {{ end }}
    {{ end }}
  </div>
</div>
```

### Exempel
```
{{< impact difficulty="3" impact="4" >}}
```

### Renderat resultat
3 ikoner för svårighetsgrad och 4 ikoner för påverkan.

---

## info.html

### Beskrivning
Visar en kompakt informationsruta med en titel, ett namn och en e-postlänk.

### Kod
```html
<div class="flex-content">
  <div class="body p-relative">
    <div class="d-block w-full">
    </div>
    <div class="px-2 py-2">
      <h3 style="font-size: 16px;">{{ .Get "title" }}</h3>
      <h2 style="font-size: 20px;">{{ .Get "name" }}</h2>
      <p>
        <a style="color:#323232" href="mailto:{{.Get `email`}}">{{ .Get "email" }}</a>
      </p>
    </div>
  </div>
</div>
```

### Exempel
```
{{< info title="Kontakt" name="John Smith" email="john@example.com" >}}
```

### Renderat resultat
En enkel informationsruta med titel, namn och e-postlänk.

---

## infobox.html

### Beskrivning
Omger innehåll i en stylad informationsruta.

### Kod
```html
<div class="flex-container bg-white shadow-1 br-5">
  {{ .Inner }}
</div>
```

### Exempel
```
{{< infobox >}}
Detta är viktig information.
{{< /infobox >}}
```

### Renderat resultat
En vit ruta med skugga (shadow-1) som innehåller valfritt textinnehåll.

---

## ingress.html

### Beskrivning
Formaterar inledande eller ledande text i en särskild stil, ofta större eller mer framträdande.

### Kod
```html
<div class="ingress"><p>{{ .Inner }}</p></div>
```

### Exempel
```
{{< ingress >}}
Välkommen till vår webbplats! Detta är inledande text.
{{< /ingress >}}
```

### Renderat resultat
En kort inledning i en distinkt stil.

---

## inline_rubrik.html

### Beskrivning
Visar en rubrik eller label inline.

### Kod
```html
<span class="inline-rubrik">{{ .Get 0 }}</span>
```

### Exempel
```
{{< inline_rubrik "Viktigt:" >}}
```

### Renderat resultat
Inline-text "Viktigt:" i en rubrik-stil.

---

## inline.html

### Beskrivning
Visar inline-innehåll i en paragraf med en särskild rubrikstil.

### Kod
```html
<p><span class="inline_rubrik">{{ .Inner }}</span></p>
```

### Exempel
```
{{< inline >}}Observera: Detta är ett meddelande.{{< /inline >}}
```

### Renderat resultat
En paragraf med en rubrik-stylad text.

---

## localbutton.html

### Beskrivning
Skapar en knapp för lokal navigering med anpassad länk, target, ikon och text.

### Kod
```html
<br>
<a href='{{ .Get "link" }}' {{ with .Get "target" }}target='{{ . }}'{{ else }}target='_self'{{ end }} class='button'>
  {{ with .Get "icon" }}<i class='fa-solid {{ . }}'></i>&nbsp;&nbsp;&nbsp;{{ end }}
  {{ .Get "text" }}
</a>
<br>
```

### Exempel
```
{{< localbutton link="/about" target="_self" icon="fa-info" text="Mer info" >}}
```

### Renderat resultat
En knapp med texten "Mer info" och en ikon, som länkar till `/about`.

---

## localtextbutton.html

### Beskrivning
Skapar en text-länk med en knapp-liknande stil (eller enkel text-länk) utan bakgrund.

### Kod
```html
<a id="text-button" target="_self" href="{{ .Get 1 }}">{{ .Get 0 }}</a>
<br>
```

### Exempel
```
{{< localtextbutton "Klicka här" "/page" >}}
```

### Renderat resultat
En textlänk med texten "Klicka här" som leder till `/page`.

---

## note.html

### Beskrivning
Visar en punktmarkerad notisruta med en titel och meddelande.

### Kod
```html
<div class="note-dotted">
  <p class="note-dotted-title">{{ .Get 0 }}</p>
  {{ .Inner }}
</div>
```

### Exempel
```
{{< note "Notis" >}}
Glöm inte att uppdatera sidan.
{{< /note >}}
```

### Renderat resultat
En notisruta med rubriken "Notis" och texten "Glöm inte att uppdatera sidan."

---

## question.html

### Beskrivning
Skapar en FAQ-liknande accordion med en fråga som rubrik och svaret i det dolda innehållet.

### Kod
```html
<div class="accordion-box">
  <button class="accordion">
    {{ .Get "question" }}
  </button>
  <div class="panel content-body">
    <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <h3 itemprop="name">
        {{ .Get "question" }}
      </h3>
      <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <div itemprop="text">
          <p style="padding:0;">{{ .Inner }}</p>
        </div>
        <div class="pb-2"></div>
      </div>
    </div>
  </div>
</div>
```

### Exempel
```
{{< question question="Vad är er returpolicy?" >}}
Vi erbjuder 30 dagars returrätt.
{{< /question >}}
```

### Renderat resultat
En klickbar fråga med ett doldt svar som expanderar vid klick.

---

## quote.html

### Beskrivning
Visar ett citat i blockformat med en valfri person eller källa.

### Kod
```html
<div class="quote">
  <p>{{ .Inner }}</p>
  <p class="quote-person">{{ .Get 0 }}</p>
</div>
```

### Exempel
```
{{< quote "Albert Einstein" >}}
Fantasi är viktigare än kunskap.
{{< /quote >}}
```

### Renderat resultat
Ett blockcitat med texten och personen "Albert Einstein" under.

---

## services.html

### Beskrivning
Renderar en lista med tjänstekort beroende på vilket språk som anges (En, No eller default).

### Kod
```html
<div class="flexcontainer-three">
  {{ $language := .Get 0 }}
  {{ if eq $language "En"}}
    {{ range (where $.Site.RegularPages "Section" "en").ByParam "cardorder" }}
      {{ if isset .Params "cardorder" }}
        {{ .Render "li-index"}}
      {{ end }}
    {{ end }}
  {{ else if eq $language "No" }}
    {{ range (where $.Site.RegularPages "Section" "no").ByParam "cardorder" }}
      {{ if isset .Params "cardorder" }}
        {{ .Render "li-index"}}
      {{ end }}
    {{ end }}
  {{ else }}
    {{ range (where $.Site.RegularPages "Section" "tjanster").ByParam "cardorder" }}
      {{ if isset .Params "cardorder" }}
        {{ .Render "li-index"}}
      {{ end }}
    {{ end }}
  {{ end }}
</div>
```

### Exempel
```
{{< services "En" >}}
```

### Renderat resultat
En lista med tjänstekort från sektionen "en" (om cardorder är definierad).

---

## streamed-video.html

### Beskrivning
Visar en videospelare som stödjer HLS-strömmar. Använder Hls.js för att initiera videon om webbläsaren stödjer det.

### Kod
```html
<div class="webinarvideo">
  <video class="webinar-videoplayer" id="myVideo" controls
  preload="none"
  poster="{{ .Get 1 | safeURL }}">
  Your browser does not support the video tag.
</video>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        var video = document.getElementById('myVideo');
        var hlsScriptLoaded = false;
        var videoInitialized = false;

        function loadHlsScript(callback) {
            if (hlsScriptLoaded) {
                callback();
                return;
            }

            var script = document.createElement('script');
            script.src = '/js/hls.min.js';
            script.onload = function() {
                hlsScriptLoaded = true;
                callback();
            };
            document.body.appendChild(script);
        }

        function initializeVideo() {
            if (videoInitialized) return;

            if (window.Hls && Hls.isSupported()) {
                var hls = new Hls();
                hls.loadSource('{{ .Get 0 | safeURL }}');
                hls.attachMedia(video);
                videoInitialized = true;
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                // För Safari
                video.src = '{{ .Get 0 | safeURL }}';
                videoInitialized = true;
            } else if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                video.src = '{{ .Get 0 | safeURL }}';
                video.load();
            } else {
                alert('Your browser does not support this video format.');
            }
        }

        // Spela upp videon vid klick eller play
        video.addEventListener('play', function() {
            if (!videoInitialized) {
                loadHlsScript(function() {
                    initializeVideo();
                    video.play();
                });
            }
        });

        video.addEventListener('click', function() {
            if (!videoInitialized) {
                loadHlsScript(function() {
                    initializeVideo();
                    video.play();
                });
            }
        });
    });
</script>
```

### Exempel
```
{{< streamed-video "https://example.com/stream.m3u8" "https://example.com/poster.jpg" >}}
```

### Renderat resultat
En videospelare med stöd för HLS-strömning och en förhandsbild (poster).

---

## table.html

### Beskrivning
Omger tabell-innehåll (Markdown) i ett HTML-table med valfri CSS-klass.

### Kod
```html
{{ $class := .Get "class" }}
{{ $table := .Inner | markdownify }}
<table {{ with $class }} class="{{ . }}"{{ end }}>
  {{ $table }}
</table>
```

### Exempel
```
{{< table class="my-table" >}}
| Rubrik 1 | Rubrik 2 |
|----------|----------|
| Cell 1   | Cell 2   |
{{< /table >}}
```

### Renderat resultat
En HTML-tabell med klassen "my-table", renderad från markdown.

---

## tooltip.html

### Beskrivning
Visar text med en tooltip som dyker upp vid hover.

### Kod
```html
<span class="text-tooltip">{{ .Get 0 }}
  <span class="text-tooltiptext shadow-1">{{ .Inner }}</span>
</span>
```

### Exempel
```
{{< tooltip "Håll musen över mig" >}}Detta är tooltip-texten.{{< /tooltip >}}
```

### Renderat resultat
Texten "Håll musen över mig" med en tooltip som visas vid hover.



{{< accordion-script >}}