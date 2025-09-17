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
{{ relref . "contact" }}
```

Which would link to `/contact`, `https://safespring.se/kontakt` and `https://safespring.no/kontakt` assuming current language is english.

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

### AI Translating content pages (quick start)

- **What these scripts do**

  - `scripts/batch_translate_missing.py`: Finds pages missing in some languages, copies from a preferred source language, then auto-translates them.
  - `scripts/translate_page.py`: Translates a single Markdown page in place, preserving code blocks and URLs. Ensures frontmatter has `ai: true` and the correct `language`.

- **Prerequisites**
  - Python 3 installed.
  - An OpenAI API key available to the scripts.
  - From the repo root, create a `.env.local` (or `.env`) with your key:
    ```bash
    echo 'OPENAI_API_KEY="sk-..."' >> .env.local
    ```
  - Supported languages: `sv`, `en`, `nb`, `da`.

### Batch translate missing pages

- **Plan what will happen (no changes)**

  ```bash
  python3 scripts/batch_translate_missing.py --plan-only
  ```

- **Dry run a small sample (prints actions only)**

  ```bash
  python3 scripts/batch_translate_missing.py --dry-run --limit 5
  ```

- **Run for real (creates files and translates)**

  ```bash
  python3 scripts/batch_translate_missing.py --workers 6
  ```

- **Useful options**
  - `--langs sv,en,nb,da`: Which languages to consider.
  - `--prefer-source en,sv,nb,da`: Source language order when copying.
  - `--limit 20`: Cap how many jobs to run.
  - `--verbose`: Extra logs.
  - `--content-root content`: Change content directory if needed.

What it does: scans `content/<lang>/`, builds the union of page paths, creates any missing language files by copying from the first available preferred source, then calls `scripts/translate_page.py` to translate them.

Tip: Commit your work before running (the script overwrites newly created target files without backup).

### Translate a single page

- **Basic usage**

  ```bash
  ./scripts/translate_page.py content/da/path/to/page.md
  ```

  The language is inferred from the path segment after `content/` (e.g., `da`).

- **Optional flags**
  - `--target-lang da`: Override detected language.
  - `--model gpt-5`: Model name (default is `gpt-5`).

What it does: updates/creates frontmatter with `ai: true` and `language: "<lang>"`, translates user-facing frontmatter fields (`title`, `description`, `summary`, etc.), and translates the Markdown body while preserving fenced code blocks, inline code, and link targets.

### Common issues

- **Missing API key**: Set `OPENAI_API_KEY` in `.env.local` or your environment.
- **Unsupported path**: Ensure the file lives under `content/<sv|en|nb|da>/...`.
- **Costs**: Translations call OpenAI and may incur usage charges.
