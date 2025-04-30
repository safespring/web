# Safespring Website

This repository contains the source code and Markdown content for the Safespring website, which can be found at https://www.safespring.com/.

## Previewing the site locally

There are two options for previewing the site locally: using the Hugo binary or using Docker as a server.

### Using the Hugo binary

1. Download and install the Hugo binary from the [official Hugo website](https://gohugo.io/overview/installing/).
2. Clone the repository and run Hugo:

```
git clone git@github.com:safespring/web
cd web
hugo serve
```

3. Open http://localhost:1313/ in your web browser to view the site.

### Using Docker as a server

1. Make sure you have [Docker installed](https://www.docker.com/products/container-runtime#/download).
2. Clone the repository and run Docker:

```
git clone git@github.com:safespring/web
cd web
docker run --rm -it -v $(pwd):/src -p 1313:1313 klakegg/hugo server
```

3. Open http://localhost:1313/ in your web browser to view the site.

## Notes for theme development

- The current theme for the Safespring website is located in `themes/safespring` and is based on the [Type theme](https://github.com/digitalcraftsman/hugo-type-theme).
- More information about customizing and creating themes and templates can be found in the [Hugo documentation](https://gohugo.io/themes/customizing/).

## Redirecting old links to new ones

Hugo has a feature that allows you to redirect old links to new ones. To do this, add the following code to the front matter of the Markdown file for the blog post:

```
aliases = [
"/old-link/",
"/new-link/"
]
```

This way, if the structure of the page changes, users will still be able to use their old links.

## Clearing old files

Use `hugo --printUnusedTemplates` to identify unused templates.

## Translations

### Translated Links

To link to the correct translated page, use the following syntax:

```
{{ with .GetPage "contact" }}
   {{ .RelPermalink }}
{{ end }}
```

Which would link to `/contact`, `/sv/kontakt` and `/nb/kontakt` depending on the current language.

### Translation variables

To find missing translations, run `hugo --printI18nWarnings` and look for the keys that are not translated.

`{{ T "" }}` is a shorthand function that is equivalent to `{{ i18n "" }}`. They are functionally identical and can be used interchangeably.
How it works:

- Look up translations in the i18n files (the `.toml` files in the `i18n/` directory)
- Use the current language context to determine which translation to use
- Return the translated string for the given key

Example:

```html
<span> {{ T "knowledgehub.read_post" }} </span>
```

This would look up the translation for the key "knowledgehub.read_post" in the i18n files (like `i18n/en.toml`, `i18n/sv.toml`, etc.) and return the appropriate translation based on the current language.
