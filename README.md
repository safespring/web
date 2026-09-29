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

3. Start the development server with Hugo **0.111.3 Extended**, matching production:

```bash
hugo serve
```

4. Open [http://localhost:1313/](http://localhost:1313/).

### Run with Docker

If you prefer not to install Hugo locally, you can run the site in Docker:

```bash
git clone git@github.com:safespring/web.git
cd web
docker run --rm -it -v "$(pwd):/src" -p 1313:1313 klakegg/hugo:0.111.3-ext server
```

Then open [http://localhost:1313/](http://localhost:1313/).

## Build the site

To create a production build locally:

```bash
hugo
```

Generated output is written to `public/`. That directory is ignored by git and should be treated as build output, not source.

Production and www2 use Hugo **0.111.3 Extended**, Git **1.8.3.1** and Caddy **v1** on CentOS 7.9 (verified 29 September 2026). `master` deploys to www2; `production` deploys to www. Beta has a separate runtime. See [the runtime contract](deploy/production-runtime.json).

Run the compatibility gate before publishing code changes (Python 3.11+, Git and Docker are local/CI requirements only):

```bash
python3 -m unittest discover -s tests -p 'test_production_compatibility.py'
python3 scripts/check-production.py
```

This builds the whole site with the pinned Hugo image on Linux/amd64, a read-only source mount, no network and a Git command that fails and records any invocation. It also checks document dates/history links, stale-date fallbacks and the 37 orphan-page outcomes. It covers Hugo/template compatibility and independence from build-time Git/network access; it does not emulate the full CentOS host or run the production Caddy service. Use `--output /tmp/safespring-check` with an empty directory to retain HTML and logs. `GIT_BIN=/absolute/path/to/git` selects an alternative local Git binary when necessary.

The `Production compatibility` workflow runs the same gate for pull requests and pushes targeting `master` or `production`. It performs no deployment. It must be configured as a required check in branch protection to block merges; adding the workflow alone does not enforce that policy or prevent direct push deployments.

Compliance dates come from committed `data/compliance_history.json`, not from Git calls during the server build. After committing edits to a compliance document, run:

```bash
python3 scripts/compliance_history.py
python3 scripts/compliance_history.py --check
```

Commit the generated data in a following commit before pushing. Generation requires full Git history and committed document contents. Each date retains the original Git author date and includes a source hash; changed files with stale metadata keep their history link but do not display an inaccurate date. CI rejects missing/stale data. These are document change dates, not publication or contract effective dates. Other pages retain their existing front matter date handling. Hugo's `enableGitInfo` must stay disabled because it invokes `git -C`, unsupported by the server's Git.

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
