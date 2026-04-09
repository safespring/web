# Safespring Website

This repository contains the Hugo source for [safespring.com](https://www.safespring.com/): page content, templates, shortcodes, data files, and static assets.

## Tech stack

- [Hugo](https://gohugo.io/) static site generator
- In-repo custom layouts and partials under `layouts/`
- Markdown content under `content/`
- Static assets under `static/`
- Shared data under `data/`

This repo does not use a Hugo theme directory. The site is rendered from the custom templates and partials checked into this repository.

## Local development

### Run with a local Hugo install

1. Install Hugo from the [official Hugo installation guide](https://gohugo.io/installation/).
2. Clone the repository:

```bash
git clone git@github.com:safespring/web.git
cd web
```

3. Start the development server:

```bash
hugo serve
```

4. Open [http://localhost:1313/](http://localhost:1313/).

### Run with Docker

If you prefer not to install Hugo locally, you can run the site in Docker:

```bash
git clone git@github.com:safespring/web.git
cd web
docker run --rm -it -v "$(pwd):/src" -p 1313:1313 klakegg/hugo server
```

Then open [http://localhost:1313/](http://localhost:1313/).

## Build the site

To create a production build locally:

```bash
hugo
```

Generated output is written to `public/`. That directory is ignored by git and should be treated as build output, not source.

## Repository structure

The most important directories are:

- `content/`: site content in Markdown
- `layouts/`: page templates, partials, list templates, and shortcodes
- `static/`: images, PDFs, fonts, JavaScript, and other files copied as-is
- `assets/`: processed frontend assets such as CSS and JavaScript
- `data/`: shared structured data used by templates
- `archetypes/`: Hugo content archetypes

## Content and languages

The site is multilingual and includes Swedish, English, and Norwegian content. A few common patterns in the repo:

- `content/_index.md`: Swedish homepage content
- `content/en/`: English pages and English homepage
- `content/no/`: Norwegian pages and Norwegian homepage
- Section-specific content such as `content/tjanster/`, `content/blogg/`, `content/webinar/`, `content/whitepaper/`, and `content/solution-brief/`

## Templates and shortcodes

Most site behavior lives in `layouts/`, including:

- `layouts/index.html` for the homepage layout
- `layouts/_default/` for shared single and list templates
- `layouts/partials/` for reusable page fragments
- `layouts/shortcodes/` for custom content components embedded in Markdown

## Redirecting old URLs

Hugo supports aliases for redirects. Add them to a page's front matter like this:

```toml
aliases = [
  "/old-link/",
  "/new-link/"
]
```

This is useful when page URLs change and you want old links to keep working.

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

- For a step-by-step, foolproof guide with exact commands, see `TRANSLATION.md`.

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

What it does: updates/creates frontmatter with `ai: true` and `language: "<lang>"`, translates the Markdown body while preserving fenced code blocks, inline code, and link targets.

### Common issues

- **Missing API key**: Set `OPENAI_API_KEY` in `.env.local` or your environment.
- **Unsupported path**: Ensure the file lives under `content/<sv|en|nb|da>/...`.
- **Costs**: Translations call OpenAI and may incur usage charges.
