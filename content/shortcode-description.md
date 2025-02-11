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