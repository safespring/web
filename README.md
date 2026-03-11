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
