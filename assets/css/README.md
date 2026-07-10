# CSS modules and loading contracts

These files replace the previous single render-blocking `main.css` delivery model. The site is still a static Hugo site. Hugo decides which modules a page needs, minifies and fingerprints them, and keeps the first viewport styled with inline critical CSS.

Loading conditions live in `layouts/partials/head.html`. Deferred stylesheets are emitted through `layouts/partials/deferred-stylesheet.html` with a `noscript` fallback. If markup or a page parameter changes, update the CSS condition and this document in the same change.

## Loading model

### Critical CSS

`critical-layout.css` contains the shared first-viewport layout, hero, button, and responsive rules. It is processed with `resources.ExecuteAsTemplate` because hero backgrounds and logo-banner state differ by page.

`critical-header.css` contains the desktop and mobile navigation rules. Hugo concatenates it with the processed critical layout, minifies the result, and emits one inline `<style>` in the document head.

Required contract: header, hero, primary typography, and mobile navigation must be fully styled before deferred CSS arrives. Do not move below-the-fold component rules into the critical bundle.

### Deferred global CSS

`main.css` is the remaining global foundation for normal page content and shared layouts. `footer.css` contains the global footer. Both are preloaded and applied asynchronously, with normal stylesheet links inside `noscript`.

### Blocking page CSS

`about-history.css` remains blocking on the dedicated `about-history` layout because its page-specific layout begins in the first viewport.

`price-content.css` and `price-tables.css` are concatenated into one blocking price-page stylesheet. Their initial table layout must be available before paint.

### Legacy CSS

`legacy.css` contains rules retained only for historical reference and rollback. It is intentionally not requested by `head.html`, is not processed into the generated site, and must not receive new active styles.

The initial legacy set contains old Chalmers layout rules, retired heading/content-grid rules, and the old iPad form layout. Every moved selector had zero references across generated HTML, templates, content, and generated/source JavaScript during the audit.

To reactivate a legacy component, first restore or add its markup, move only that component's rules into an appropriate active module, add an explicit loading condition in `head.html`, and rerun the complete browser/static verification. Do not link the whole legacy file.

## Conditional module map

| Module | Loaded when | Markup or behavior contract |
| --- | --- | --- |
| `accordion.css` | Rendered content contains `class="accordion` | `.accordion`, `.accordion-box`, `.panel`, and `.accordion-active`; keep aligned with `accordion.js`. |
| `article-extras.css` | Author, CPU/flavour, or impact markup is present | `.author-*`, `.authors`, `.cpu`, and `.impact`. |
| `contact-card.css` | Rendered content contains `contact-container` | Contact shortcode/card markup using `.contact-*`. |
| `content-cards.css` | Home, list/taxonomy pages, or card-oriented sections | Blog, tech-update, webinar, solution-brief, and whitepaper cards. |
| `content-components.css` | Home page, standard sidebar, or demo sticky, two-field, ingress/quote, partner, note, or disclaimer markup is present | Home and default-single layouts generate component markup outside `.Content`; shortcode markup must remain detectable in rendered `.Content`. |
| `content-filter.css` | Filter markup contains `tf-filter`, `tf-buttons`, or `filter-number` | Filter controls and `.tf-*` item state classes. |
| `content-listing.css` | The content-card condition is active | Listing containers, webinar sidebar, and list-page metadata. |
| `content-tables.css` | Rendered content contains a `<table` | Responsive generic tables; keep aligned with `table-labels.js`. |
| `code-content.css` | Rendered content contains `<pre` or `<code` | Safespring Mono faces, code blocks, copy controls, and highlighted code. |
| `document-content.css` | Compliance document table or footnote/document markup is present | Document tables, references, and footnote backrefs. |
| `forms.css` | Rendered content contains form, contact-form, input-group, or reCAPTCHA markup | Shared form fields, validation focus states, and checkbox groups. |
| `horizontal-card.css` | Rendered content contains `safespring-horisontal-card-container` | Horizontal/custom-card shortcodes and list layout. |
| `icon-blocks.css` | Rendered content contains icon-block markers | Large and small icon-block shortcodes and responsive variants. |
| `mermaid-content.css` | Rendered content contains `class="mermaid` | Mermaid container sizing; keep aligned with `mermaid-theme.js`. |
| `photo-roll.css` | A logo-banner page parameter is set | Logo-banner photo roll and reduced-motion behavior. |
| `service-cards.css` | Home, section list, or service-card markup | Service grids rendered by `li-index` and service shortcodes. |
| `tooltips.css` | Rendered content contains tooltip markup | Tooltip trigger and visible text state. |
| `video-player.css` | Home, `videoURL`, or `data-video-player` markup | Video player, episode cards, subtitles, controls, and playlists. |
| `compliance-document-table.css` | Rendered content contains `compliance-document-table__info` | Compliance document table layout; keep aligned with its conditional JavaScript. |

## Maintenance rules

- Keep each module tied to one component family or loading boundary.
- Prefer rendered markup, page layout, section, or explicit page parameters as loading signals.
- Treat markup emitted directly by a layout as an explicit loading contract; `.Content` scanning cannot detect it.
- Do not add automatic CSS purging. JavaScript state classes, Hugo render hooks, and shortcode output must be handled explicitly.
- Do not load `legacy.css` or add new production rules to it.
- Keep first-viewport CSS in the critical bundle and below-the-fold/component CSS in deferred modules.
- Keep every deferred module below 20 KB minified where practical so one page-specific component cannot recreate the former unused-CSS warning.
- Preserve `noscript` fallbacks for all asynchronously applied stylesheets.
- If selectors or loading conditions change, update this file in the same commit.
- Verify desktop and mobile rendering, interactive states, a production Hugo build, and CSS Coverage before removing a legacy rule.

Run the reusable browser matrix against a local build with:

```bash
node scripts/verify-css-modules.mjs http://127.0.0.1:4190
```

After a full Hugo build, verify component-to-stylesheet contracts across every generated normal page with:

```bash
node scripts/verify-css-contracts.mjs /tmp/safespring-css-build
```
