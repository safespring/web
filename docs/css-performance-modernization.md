# CSS Performance Modernization

This document records the low-risk CSS performance changes made to the Hugo site. It covers what changed, how CSS loading worked before, how it works now, the measured effect, and how to verify or roll back the changes.

## 2026-07-10: critical CSS and conditional module phase

### Baseline

The PageSpeed mobile run for `/tjanster/compute/` reported one global stylesheet as both render-blocking and mostly unused:

| Measurement                      |      Before |
| -------------------------------- | ----------: |
| `main.min...css` minified source | `104,647 B` |
| transferred CSS                  |  `21.1 KiB` |
| estimated unused transfer        |  `16.4 KiB` |
| render-blocking request duration |    `690 ms` |
| estimated render-blocking saving |    `170 ms` |

Local Chromium CSS Coverage used about `22,274 B`, or `21.3%`, of that stylesheet during the first mobile viewport.

### Architecture change

The static first-viewport rules from `head.html` and `header.html` now live in:

```text
assets/css/critical-layout.css
assets/css/critical-header.css
```

Hugo processes the layout file with `resources.ExecuteAsTemplate`, using the page-specific hero background and logo-banner state. It then concatenates both critical sources, minifies them, and emits one inline `<style>` in the head.

The remaining global stylesheet and component modules are loaded through:

```text
layouts/partials/deferred-stylesheet.html
```

That partial emits `rel="preload" as="style"`, applies the stylesheet in `onload`, and includes a normal `noscript` stylesheet fallback.

The previous monolithic source was split manually along existing component boundaries. No selector-based purge step or new CSS build dependency was introduced. The loading contract for every module is documented in `assets/css/README.md`.

### Local measured result

After the split, the Compute page's deferred base stylesheet is:

| Asset            |        Raw |      Gzip |
| ---------------- | ---------: | --------: |
| `main.min...css` | `27,226 B` | `5,892 B` |

The complete set of local processed stylesheets selected for Compute is:

| Asset group                        |            Raw |           Gzip |
| ---------------------------------- | -------------: | -------------: |
| Global base and footer             |     `34,533 B` |      `7,449 B` |
| Content components used by Compute |     `14,128 B` |      `4,339 B` |
| Conditional video player           |     `12,736 B` |      `3,030 B` |
| **Total deferred/processed CSS**   | **`61,397 B`** | **`14,818 B`** |

The page downloads several small cacheable component files instead of one large page-agnostic file. None of these links is a normal render-blocking stylesheet on Compute.

Local Chromium mobile CSS Coverage for the new base file was:

|        Raw |      Used |     Unused | Used share |
| ---------: | --------: | ---------: | ---------: |
| `27,218 B` | `8,640 B` | `18,578 B` |    `31.7%` |

The remaining conditional files are each below `13 KB` minified, and the base file's unused source is below Lighthouse's previous large-resource threshold. A new live PageSpeed run is still required after deployment; local figures are not recorded as production results.

A Lighthouse `13.4.0` run against the same build with gzip delivery produced:

| Audit                     | Result                    |
| ------------------------- | ------------------------- |
| `unused-css-rules`        | pass, no listed resources |
| `render-blocking-insight` | pass, no listed resources |
| Total Blocking Time       | `0 ms`                    |
| Cumulative Layout Shift   | `0`                       |

The local HTTP/1 server is not used as a production LCP reference. The live PageSpeed profile remains the acceptance measurement after deployment.

### Verification and rollback

Build and inspect the generated Swedish Compute page with:

```bash
HUGO_CACHEDIR=/tmp/safespring-css-modular-cache hugo --minify --destination /tmp/safespring-css-modular --cleanDestinationDir --noBuildLock
```

Browser verification must cover the home page, Compute, Kubernetes, Storage, Backup, price, an article with code and tables, webinar pages, About Safespring, and contact/form pages at desktop and mobile widths.

The initial reusable Playwright matrix passed `18` mobile/desktop route combinations, including mobile-menu and accordion state changes. That version only checked component visibility and interactions; it did not assert home-page or shortcode geometry, which allowed later loading-contract regressions to pass.

The matrix now includes geometry assertions for the home page and Kubernetes page. It fails if the home service cards lose their desktop rows, the video loses its width constraint, the datacenter map background disappears, horizontal icon-block icons are not centered, or the Kubernetes CTA card loses its background image and responsive layout. This protects layout-generated markup that cannot be discovered by scanning `.Content` alone.

The default single-page layout sets a `hasDefaultSidebar` page flag before rendering the head. This keeps the sidebar's `demo-sticky` component CSS conditional while ensuring it is selected even though the sidebar markup is emitted after `.Content` by the layout.

`scripts/verify-css-contracts.mjs` performs the corresponding site-wide static check after a full Hugo build. It matches generated component and markup markers to their expected fingerprinted CSS modules and also fails if `legacy.css` is emitted or linked.

To roll back this phase, restore the CSS blocks to `assets/css/main.css`, restore its blocking stylesheet link in `head.html`, remove the conditional module links, and restore the header style block. The earlier page-specific price, video, and compliance boundaries can remain independently.

### Legacy CSS audit

The remaining `main.css` selectors were compared against:

- `2,864` generated Hugo HTML pages,
- generated and source JavaScript,
- Hugo layouts and partials,
- content and shortcode source.

Only rules whose complete selector consisted of unreferenced classes were moved. Mixed selector lists were retained when any selector still applied globally; for example, a rule combining an old Chalmers class with unscoped `h2` or `li` selectors was not treated as legacy.

The confirmed legacy set contained `55` rules using `21` unreferenced classes. The main groups were:

- the retired Chalmers content/sidebar layout,
- old heading and content-grid rules,
- the old iPad form and image layout,
- the unused `.shortcode-divider` rule.

The rules are retained in `assets/css/legacy.css`, which is intentionally absent from Hugo's asset loading and generated output.

| Asset measurement          | Before legacy split | After legacy split |     Change |
| -------------------------- | ------------------: | -----------------: | ---------: |
| `main.css` source          |          `36,399 B` |         `29,971 B` | `-6,428 B` |
| generated `main.min...css` |          `27,226 B` |         `22,227 B` | `-4,999 B` |
| generated main gzip        |           `5,892 B` |          `5,053 B` |   `-839 B` |

Compute mobile coverage after the legacy split was `8,640 B` used and `13,579 B` unused from a `22,219 B` measured stylesheet, increasing the used share from `31.7%` to `38.9%` without changing the used byte count.

After the move, the `18`-case browser matrix still passed and the full generated-page CSS-module crawl reported `0` failures. No `legacy.css` reference or generated asset was found.

### Visual regression repair

The first conditional-module implementation missed markup emitted by layouts outside `.Content`. The visible symptoms were a full-width home service grid and video, a missing home datacenter-map layout, and uncentered horizontal shortcode icons. Standard and list sidebars had the same latent issue because `demo-sticky` is emitted by `sidebar-default-single.html` after the head has already selected CSS.

The repair makes home an explicit `content-components.css` consumer, passes a `hasDefaultSidebar` flag from every layout that renders the shared sidebar, and scopes icon centering to `.icon-block-color .fa-icon`. The current verification result is:

| Check                              |         Result |
| ---------------------------------- | -------------: |
| Playwright route/viewport cases    | `24/24` passed |
| Generated HTML files scanned       |        `2,904` |
| Normal pages checked               |        `1,074` |
| Component-to-CSS contracts checked |        `2,439` |
| Missing CSS contracts              |            `0` |
| Emitted or linked `legacy.css`     |            `0` |

The final local Lighthouse `13.4.0` mobile spot check used Headless Chrome `150` against the Hugo development server. Both pages had `0 ms` TBT, effectively zero CLS, and no render-blocking requests. The local performance scores were `86` for home and `84` for Kubernetes, with LCP at `4.0 s` and `4.1 s`. Lighthouse still estimated `41 KiB` and `15 KiB` of unused CSS respectively, so unused CSS and live mobile LCP remain separate follow-up work rather than being recorded as green.

Author blocks on news and Deep Dive pages follow the same layout-generated contract. `article-extras.css` is selected when author frontmatter is set, and the browser matrix asserts a flex author block with a circular `75x75px` background image.

The desktop megamenu previously inherited `.cardtitle`, `.cardicon`, and icon-centering rules from `service-cards.css`. That made the menu look correct on home and service-list pages but stretched the icon backgrounds on pages where the service-card module was intentionally absent. Equivalent rules are now scoped to `.megamenu-main-service-card` in critical layout CSS, and every desktop browser case opens the menu and asserts a circular, centered `40x40px` icon.

Accordion motion keeps the existing JavaScript-managed measured height and ARIA state. CSS uses a pronounced ease-in-out height curve that starts slowly, accelerates through the middle, and settles slowly without scaling the panel width. Bottom spacing follows the same curve, and the two-line plus icon folds into a minus. `prefers-reduced-motion: reduce` reduces all accordion transitions to an effectively immediate state change.

Accordion panel insets remain on the first and last direct content children so collapsed panels keep zero height. The resulting open panel has the same `46px` visual spacing on all four sides, including nested FAQ/schema markup.

Nested FAQ/schema panels reset the first inner heading's top margin so it does not add `40px` above the shared `46px` inset. The FAQ browser case opens the selected security question and asserts all four panel insets after the height transition settles.

Compliance download metadata is generated by the default single layout from `downloadpdf` frontmatter. `document-content.css` is therefore selected directly from that parameter instead of relying only on `.Content` markers. The browser matrix verifies the metadata grid, row columns, label treatment, width, and separators on the Acceptable Use Policy page.

Webinar and demo carousel controls are explicit `70x70px` circular flex buttons with centered SVG arrows, keyboard focus rings, and a restrained hover lift. The desktop webinar browser case asserts the circle dimensions and icon centering.

Webinar episode cards explicitly color their SVG play icons white. Chapter playlists use fixed `22px` circles, `6x8px` arrows, and a `12px` text gap; the browser matrix asserts these dimensions on the corresponding Swedish legal-security episode at desktop and mobile widths.

Horizontal cards use equal content padding on all four sides at desktop and mobile widths. Article code-block copy controls use a pill radius; the LLM Deep Dive browser case asserts both component contracts.

The AI translation disclaimer keeps a compact `4px` bottom margin. When translated content starts with an ingress block, its first paragraph uses an `8px` top margin instead of the global ingress paragraph margin. A translated standard-document browser case asserts the component margin at desktop and mobile widths; other following-content margins remain independent.

`.bg-white` and `.card-heading` are cross-layout contracts used by horizontal cards, sidebars, and contact cards. They remain in always-loaded `main.css`, not conditional `content-cards.css`. The Compute browser case asserts the documentation-heading typography and the white NIS 2 card surface.

Home and service-list cards keep their icon circles at `40px` while rendering the SVG symbol at `20px`. The home browser case asserts both dimensions so icon growth cannot shift the service-card grid.

The `readfile` shortcode uses `.readfile-details` and `.readfile-summary`, with its styling isolated in conditional `details-content.css`. This restores the summary pill and open full-screen presentation on service pages without applying generic `details` rules to price tables or other native disclosure components.

## Scope

The change is intentionally narrow:

- Hugo stays on `0.163.3`.
- Caddy, deploy scripts, and server setup are unchanged.
- Visual design and interactions are preserved.
- Inline critical CSS in `layouts/partials/head.html` and `layouts/partials/header.html` is untouched.
- No automatic CSS purging was introduced.

## Files changed, added, or removed

Changed files:

- `layouts/partials/head.html`
- `layouts/shortcodes/price-list.html`
- `assets/css/main.css`
- `assets/css/video-player.css`
- `assets/css/solid.min.css`
- `assets/css/fontawesome.min.css`
- `assets/css/custom-icons.min.css`
- `assets/css/fontawesome-price.css`
- `assets/css/fontawesome-containerplatform.css`
- `static/fonts/fa-solid-900.woff2`
- `static/fonts/custom-icons.woff2`
- `static/brand/safespring_onepager.html`
- `static/brand/ai/ai-instructions.md`
- `static/brand/ai/brand-kit.json`
- `package.json`
- `package-lock.json`

New files:

- `assets/css/price-tables.css`
- `assets/css/fontawesome-price.css`
- `assets/css/compliance-document-table.css`
- `assets/css/video-player.css`

Removed files:

- `static/css/main-v2.css`

## How it worked before

### Global CSS

Every normal page loaded the processed global stylesheet from:

```go-html-template
{{ $mainCSS := resources.Get "css/main.css" | minify | fingerprint }}
<link rel="stylesheet" href="{{ $mainCSS.RelPermalink }}" />
```

That meant all rules inside `assets/css/main.css` were render-blocking on all pages, including page-specific price-table rules.

The generated baseline was:

| Asset            |         Raw |       Gzip |
| ---------------- | ----------: | ---------: |
| `main.min...css` | `124,662 B` | `23,197 B` |

### Static main-v2.css

`static/css/main-v2.css` was a copied static stylesheet, not a Hugo asset-pipeline source. It was not minified, fingerprinted, concatenated, or linked by normal rendered Hugo pages.

The remaining repo references were maintenance metadata, not live page CSS:

- `package.json` had a stale `purgecss` script that targeted `static/css/main-v2.css`.
- `static/brand/ai/brand-kit.json` listed `/css/main-v2.css` as a design-system source CSS file.

Because the file lived under `static/`, Hugo copied it to every language output even though normal pages did not request it:

| Asset                    |        Raw |       Gzip |
| ------------------------ | ---------: | ---------: |
| `static/css/main-v2.css` | `90,906 B` | `18,161 B` |

### Price-table CSS

Rules scoped to `body.has-mobile-price-tables` lived inside `assets/css/main.css`. Those rules handled:

- wide desktop price tables
- compact mobile price-table lists
- `details.mobile-compact-row` overrides
- animation and border states used by `assets/js/mobile-price-tables.js`

Because the rules were in `main.css`, every page paid the CSS parse/download cost even though only pages rendered from `price.md` need these rules.

### Price page external Material CSS

`layouts/shortcodes/price-list.html` loaded three external Material CSS files:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@material/checkbox/dist/mdc.checkbox.min.css"
/>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@material/form-field/dist/mdc.form-field.min.css"
/>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@material/button/dist/mdc.button.min.css"
/>
```

No `mdc-*` class usage was found in the price shortcode, price content, or the mobile price-table script. These links added three external stylesheet requests on price pages without styling active elements.

### Font Awesome

Most pages used the full generated Font Awesome Pro `6.7.2` bundle:

| Asset                             |         Raw |       Gzip |
| --------------------------------- | ----------: | ---------: |
| `combined-font-awesome.min...css` | `210,862 B` | `50,714 B` |

The self-hosted Classic Solid font file was:

| Asset                |         Raw |
| -------------------- | ----------: |
| `fa-solid-900.woff2` | `354,296 B` |

The site already had one existing subset mechanism for pages with:

```toml
fontawesomebundle = "containerplatform"
```

That subset is implemented by changing the bundle sources in `layouts/partials/head.html`.

Before this change, price pages loaded the full Font Awesome CSS bundle even though the rendered page only needs a small icon set.

### Compliance document-table CSS

The `.compliance-document-table*` rules lived inside `assets/css/main.css`, so every normal page paid for these rules even though the markup only appears on a small set of pages:

- compliance overview pages
- compliance detail pages with manual document tables, such as ISO 27001
- Kubernetes/container platform service pages that render a manual document table

The related JavaScript was already loaded conditionally from `layouts/partials/footer.html` by checking rendered page content for `compliance-document-table__info`. CSS did not yet use the same page boundary.

### Video player CSS

Video-player rules also lived inside `assets/css/main.css`, including:

- `video::cue` subtitle styling
- `.video-player`, `.video-container`, `.index-video`, poster, overlay, timeline, chapters, subtitles, mute controls, and caption overlay
- `.video-list`, `.video-container2`, `.current-episode`, and webinar/demo episode-card styling
- `.webinarvideo`, `.webinar-videoplayer`, and `.webinarplaylist*`

Because these rules were global, every normal page carried the video-player CSS even when the page had no rendered video player.

## How it works now

### static main-v2.css was retired

`static/css/main-v2.css` was removed instead of moved into `assets/css/main.css`.

Moving it into the Hugo asset pipeline would have increased the normal render-blocking `main.css` payload and kept a second, stale CSS source alive. Removing it is safer because rendered pages were already using the real Hugo asset sources under `assets/css/`.

The stale `purgecss` script and dependency were removed from `package.json` / `package-lock.json`, because they only targeted the retired static file. `static/brand/ai/brand-kit.json` now points its design-system `sourceCss` metadata to:

```text
/brand/ai/brand-tokens.css
```

That file is the active brand-kit CSS source used by `static/brand/ai/index.html`.

### Price page detection

`layouts/partials/head.html` now defines a reusable Hugo condition:

```go-html-template
{{ $isPricePage := and .File (eq .File.BaseFileName "price") }}
```

This intentionally matches every content file named `price.md`, including:

- `content/en/price.md`
- `content/sv/price.md`
- `content/nb/price.md`
- `content/da/price.md`
- `content/*/geant/price.md`

This is the same condition the site already used for `mobile-price-tables.js`, so the new CSS behavior follows the existing price-page boundary.

### Price-table CSS is page-specific

The `body.has-mobile-price-tables` rules were moved out of `assets/css/main.css` into:

```text
assets/css/price-tables.css
```

`head.html` loads it only for `$isPricePage`:

```go-html-template
{{ if $isPricePage }}
  {{ $priceTablesCSS := resources.Get "css/price-tables.css" | minify | fingerprint }}
  <link rel="stylesheet" href="{{ $priceTablesCSS.RelPermalink }}" />
  {{ $mobilePriceTablesJS := resources.Get "js/mobile-price-tables.js" | minify | fingerprint }}
  <script src="{{ $mobilePriceTablesJS.RelPermalink }}" defer></script>
{{ end }}
```

The CSS is still a normal render-blocking stylesheet on price pages. That is intentional: these rules affect initial table layout and the mobile compact table state, so loading them asynchronously would risk layout shift or a flash of unstyled tables.

Generated size:

| Asset                    |       Raw |      Gzip |
| ------------------------ | --------: | --------: |
| `price-tables.min...css` | `6,487 B` | `1,384 B` |

### Price pages use a Font Awesome subset

A new subset file was added:

```text
assets/css/fontawesome-price.css
```

`head.html` now selects a smaller generated Font Awesome bundle for `$isPricePage`:

```go-html-template
{{ if $isPricePage }}
  {{ $faBundleTarget = "css/combined-font-awesome-price.css" }}
  {{ $faSources = slice (resources.Get "css/solid.min.css") (resources.Get "css/custom-icons.min.css") (resources.Get "css/fontawesome-price.css") }}
{{ else if eq .Params.fontawesomebundle "containerplatform" }}
  ...
{{ end }}
```

The subset includes the icon mappings needed by the price pages and adjacent GEANT price pages:

- `fa-arrow-up-right-from-square`
- `fa-caret-down`
- `fa-container-storage`
- `fa-envelope`
- `fa-exclamation`
- `fa-file-pdf`
- `fa-language`
- `fa-list-ul`
- `fa-server`
- `fa-table`
- `fa-xmark`

`custom-icons.min.css` remains part of the bundle so custom Safespring icons such as `fak fa-safespring-s3` keep working.

Generated size:

| Asset                                   |       Raw |      Gzip |
| --------------------------------------- | --------: | --------: |
| `combined-font-awesome-price.min...css` | `2,973 B` | `1,084 B` |

Important limitation: this only subsets Font Awesome CSS. It does not subset the `fa-solid-900.woff2` font file, which is still fetched when Font Awesome icons are used.

### Material CSS removed from price shortcode

The unused Material CSS links were removed from:

```text
layouts/shortcodes/price-list.html
```

The shortcode's own inline styles continue to style the form fields, checkbox, labels, and button. No form markup or behavior was changed.

### Compliance document-table CSS uses a main variant

The `.compliance-document-table*` rules were moved out of `assets/css/main.css` into:

```text
assets/css/compliance-document-table.css
```

`head.html` now detects rendered document-table markup with the same content marker that `footer.html` already uses for the related JS:

```go-html-template
{{ $hasComplianceDocumentTable := gt (len (findRE "compliance-document-table__info" .Content 1)) 0 }}
```

Normal pages still load one render-blocking main stylesheet:

```text
main.min...css
```

Pages with a compliance document table load one render-blocking main variant instead:

```text
main-compliance-document-table.min...css
```

That variant is generated with Hugo `resources.Concat` from `main.css + compliance-document-table.css`. This keeps the compliance table styles render-blocking where they affect initial layout, but avoids adding a second stylesheet request on the pages that need them.

### Video player CSS uses a main variant

The video-player rules were moved out of `assets/css/main.css` into:

```text
assets/css/video-player.css
```

`head.html` now detects video-player pages with:

```go-html-template
{{ $hasVideoPlayer := or .IsHome .Params.videoURL (gt (len (findRE "data-video-player" .Content 1)) 0) }}
```

That covers:

- the home page, which renders `layouts/partials/index-video-player.html`
- demo/webinar/internal pages with `videoURL`
- content pages that use the `video` shortcode and render `data-video-player`

Video pages load one render-blocking main variant:

```text
main-video-player.min...css
```

The variant is generated from `main.css + video-player.css`, so video pages do not get an extra render-blocking stylesheet request. A combined future-safe variant also exists in the template for pages that need both compliance document-table CSS and video-player CSS:

```text
main-compliance-document-table-video-player.min...css
```

No rendered English page needed the combined variant in the verification run.

### Font Awesome SVG-first rendering

Font Awesome is now SVG-first for normal Hugo pages. The implementation used the downloaded Font Awesome Kit as source material during generation:

```text
/Users/marcus/Downloads/kit-136378f476-web (1)/
```

The Hugo build does not depend on that Downloads folder. The committed runtime data is:

```text
data/icons/fa-solid.json
data/icons/fa-custom.json
```

The runtime rendering layer is:

```text
layouts/partials/fa-icon-data.html
layouts/partials/fa-icon-data-by-symbol.html
layouts/partials/fa-register-icon.html
layouts/partials/fa-icon.html
layouts/partials/fa-sprite.html
layouts/shortcodes/fa-icon.html
```

`fa-icon.html` accepts the legacy class inputs already used across the site, such as:

```text
fa-solid fa-arrow-right
fas fa-play
fa-kit fa-safespring-icon
```

It renders inline SVG markup with `currentColor`, keeps the original class names for local CSS compatibility, and registers the icon on the current Hugo page. `fa-sprite.html` emits one hidden SVG sprite at the end of the page with only the symbols used by that page.

The sprite builder uses two inputs:

- explicit registrations from layout partials, shortcodes, and render hooks
- a defensive scan of rendered `.Content` for `data-fa-symbol` and `data-fa-extra-symbols`, because Hugo can cache `.Render` and shortcode output in ways that make template side effects unreliable across languages/pages

Templates and shortcodes that previously emitted `<i class="fa...">` now call `fa-icon.html`. This includes icon shortcodes, price, compliance document tables, contact forms, video player controls, mobile TOC/sidebar controls, list/demo/webinar partials, and service cards.

Three legacy Dockyards icons were mapped to Classic Solid replacements:

| Legacy input    | SVG output    |
| --------------- | ------------- |
| `fa-docker`     | `fa-cubes`    |
| `fa-automation` | `fa-gears`    |
| `fa-expert`     | `fa-user-tie` |

Active Font Awesome CSS/webfont loading was removed from `layouts/partials/head.html`. Normal rendered pages no longer request:

- `combined-font-awesome*.css`
- `fa-solid-900.woff2`
- `custom-icons.woff2`

Font Awesome pseudo-icon dependencies in CSS were replaced with SVG markup or CSS-native shapes/text. The static FA CSS/font files still exist in the repo/output as legacy rollback material, but generated HTML/CSS/JS for normal pages no longer references them.

## Measured effect

Measured from temp Hugo builds using:

```bash
HUGO_CACHEDIR=/tmp/safespring-css-impl-cache-before hugo --minify --destination /tmp/safespring-css-impl-before --cleanDestinationDir --noBuildLock
HUGO_CACHEDIR=/tmp/safespring-css-impl-cache-after hugo --minify --destination /tmp/safespring-css-impl-after --cleanDestinationDir --noBuildLock
```

### static main-v2.css retirement

This is not a render-blocking page-load win because normal pages did not link `main-v2.css`. The effect is build-output and maintenance cleanup:

| Asset                                    |                           Before | After |  Change |
| ---------------------------------------- | -------------------------------: | ----: | ------: |
| copied `main-v2.css` per language output | `90,906 B` raw / `18,161 B` gzip | `0 B` | removed |

With four language outputs in the verification build, Hugo no longer copies roughly `363,624 B` of unreferenced CSS into the generated site.

### Global effect

The first price-table split made all pages get a smaller `main.css`:

| Asset            |  Before raw |   After raw | Raw change | Before gzip | After gzip | Gzip change |
| ---------------- | ----------: | ----------: | ---------: | ----------: | ---------: | ----------: |
| `main.min...css` | `124,662 B` | `118,138 B` | `-6,524 B` |  `23,197 B` | `22,313 B` |    `-884 B` |

This is a small global win. The bigger win is on price pages.

### Compliance document-table CSS effect

Measured after the price-page split and before/after the compliance document-table split, using:

```bash
HUGO_CACHEDIR=/tmp/safespring-css-compliance-cache-before hugo --minify --destination /tmp/safespring-css-compliance-before --cleanDestinationDir --noBuildLock
HUGO_CACHEDIR=/tmp/safespring-css-compliance-cache-after hugo --minify --destination /tmp/safespring-css-compliance-after --cleanDestinationDir --noBuildLock
```

Gzip values below use `gzip -cn` so the generated filename is not included in the gzip header.

| Asset            |  Before raw |   After raw | Raw change | Before gzip | After gzip | Gzip change |
| ---------------- | ----------: | ----------: | ---------: | ----------: | ---------: | ----------: |
| `main.min...css` | `118,138 B` | `112,731 B` | `-5,407 B` |  `22,235 B` | `21,350 B` |    `-885 B` |

Pages with compliance document tables now load the generated main variant:

| Asset                                      |         Raw |       Gzip |
| ------------------------------------------ | ----------: | ---------: |
| `main-compliance-document-table.min...css` | `118,138 B` | `22,231 B` |

That keeps the document-table pages at parity with the previous single `main.css` payload while normal pages no longer carry the document-table CSS.

### Video player CSS effect

Measured after the price-page split and compliance document-table split, before/after the video-player split, using:

```bash
HUGO_CACHEDIR=/tmp/safespring-css-video-cache-before hugo --minify --destination /tmp/safespring-css-video-before --cleanDestinationDir --noBuildLock
HUGO_CACHEDIR=/tmp/safespring-css-video-cache-after hugo --minify --destination /tmp/safespring-css-video-after --cleanDestinationDir --noBuildLock
```

The source CSS moved into `assets/css/video-player.css` is `14,312 B`.

Normal pages now get a smaller global `main.css`:

| Asset            |  Before raw |   After raw |  Raw change | Before gzip | After gzip | Gzip change |
| ---------------- | ----------: | ----------: | ----------: | ----------: | ---------: | ----------: |
| `main.min...css` | `112,731 B` | `100,619 B` | `-12,112 B` |  `21,350 B` | `19,208 B` |  `-2,142 B` |

Compliance document-table pages also benefit because their main variant is built from the smaller `main.css`:

| Asset                                      |  Before raw |   After raw |  Raw change | Before gzip | After gzip | Gzip change |
| ------------------------------------------ | ----------: | ----------: | ----------: | ----------: | ---------: | ----------: |
| `main-compliance-document-table.min...css` | `118,138 B` | `106,026 B` | `-12,112 B` |  `22,231 B` | `20,089 B` |  `-2,142 B` |

Video pages now load the generated main video variant:

| Asset                         |         Raw |       Gzip |
| ----------------------------- | ----------: | ---------: |
| `main-video-player.min...css` | `112,731 B` | `21,432 B` |

That keeps video pages at essentially the previous single-main payload size, with no added CSS request. The raw size matches the old `main.css`; gzip is `+82 B` in this local build because the moved rules are concatenated after the smaller `main.css`.

The verification also caught one Font Awesome subset gap on Kubernetes/containerplatform pages. Adding `.fa-exclamation` to `assets/css/fontawesome-containerplatform.css` changed that generated subset from `3,285 B` raw / `1,092 B` gzip to `3,310 B` raw / `1,104 B` gzip.

### Font Awesome SVG-first effect

Measured after the price, compliance document-table, video CSS, and FA7 preparation work, using:

```bash
HUGO_CACHEDIR=/tmp/safespring-fa-svg-before-cache hugo --minify --destination /tmp/safespring-fa-svg-before --cleanDestinationDir --noBuildLock
HUGO_CACHEDIR=/tmp/safespring-fa-svg-cache hugo --minify --destination /tmp/safespring-fa-svg --cleanDestinationDir --noBuildLock
```

Generated Font Awesome CSS bundles were removed from rendered page loading:

| Asset                                               |  Before raw | Before gzip | After                |
| --------------------------------------------------- | ----------: | ----------: | -------------------- |
| `combined-font-awesome.min...css`                   | `161,133 B` |  `36,765 B` | not generated/linked |
| `combined-font-awesome-price.min...css`             |   `3,094 B` |   `1,041 B` | not generated/linked |
| `combined-font-awesome-containerplatform.min...css` |   `3,431 B` |   `1,156 B` | not generated/linked |

The static font files are still copied into the output because they remain in `static/fonts`, but normal rendered pages no longer reference or request them:

| Asset                |         Raw | Page-load status               |
| -------------------- | ----------: | ------------------------------ |
| `fa-solid-900.woff2` | `276,676 B` | not requested by checked pages |
| `custom-icons.woff2` |  `10,592 B` | not requested by checked pages |

The SVG sprite adds small page-local HTML instead. Key English pages measured:

| Page                                                           | Sprite raw | Sprite gzip | HTML gzip change | FA refs before -> after |
| -------------------------------------------------------------- | ---------: | ----------: | ---------------: | ----------------------- |
| `/en/`                                                         |  `7,358 B` |   `2,285 B` |       `+2,419 B` | `2 -> 0`                |
| `/en/price/`                                                   |  `6,077 B` |   `1,972 B` |       `+2,192 B` | `2 -> 0`                |
| `/en/services/kubernetes/`                                     | `13,032 B` |   `4,300 B` |       `+4,945 B` | `2 -> 0`                |
| `/en/services/dockyards/`                                      |  `6,669 B` |   `2,633 B` |       `+2,888 B` | `2 -> 0`                |
| `/en/compliance/`                                              |  `7,400 B` |   `2,393 B` |       `+2,787 B` | `2 -> 0`                |
| `/en/compliance/iso-27001/`                                    |  `5,504 B` |   `1,713 B` |       `+1,946 B` | `2 -> 0`                |
| `/en/demo/introduction-to-safespring-kubernetes-engine/`       |  `6,086 B` |   `1,944 B` |       `+2,061 B` | `2 -> 0`                |
| `/en/contact/`                                                 |  `4,842 B` |   `1,846 B` |       `+2,083 B` | `2 -> 0`                |
| `/en/deep-dive/bootstrap-talos-linux-kubernetes-on-openstack/` |  `3,458 B` |   `1,202 B` |       `+1,345 B` | `2 -> 0`                |
| `/en/services/compute/`                                        |  `8,950 B` |   `2,788 B` |       `+3,370 B` | `2 -> 0`                |

The tradeoff is intentional: each icon page gets roughly `1.2-4.3 KB` gzip of inline sprite HTML, while avoiding a `36.8 KB` gzip Font Awesome CSS request and the much larger Classic Solid webfont request on pages with icons.

### Price-page CSS effect

Local processed CSS loaded by price pages changed from:

| Before asset                      |             Raw |           Gzip |
| --------------------------------- | --------------: | -------------: |
| `local-font-faces.min...css`      |       `2,878 B` |        `354 B` |
| `main.min...css`                  |     `124,662 B` |     `23,197 B` |
| `combined-font-awesome.min...css` |     `210,862 B` |     `50,714 B` |
| **Total**                         | **`338,402 B`** | **`74,265 B`** |

to:

| After asset                             |             Raw |           Gzip |
| --------------------------------------- | --------------: | -------------: |
| `local-font-faces.min...css`            |       `2,878 B` |        `354 B` |
| `main.min...css`                        |     `118,138 B` |     `22,313 B` |
| `price-tables.min...css`                |       `6,487 B` |      `1,384 B` |
| `combined-font-awesome-price.min...css` |       `2,973 B` |      `1,084 B` |
| **Total**                               | **`130,476 B`** | **`25,135 B`** |

Net local processed CSS reduction on price pages:

|          Raw |        Gzip |
| -----------: | ----------: |
| `-207,926 B` | `-49,130 B` |

In addition, price pages no longer request the three external Material CSS files. The audit estimated those at about `53.7 KB` raw CSS before transfer compression, plus three network requests.

### What did not change

- Hugo stays on `0.163.3`.
- Caddy, deploy scripts, and server setup are unchanged.
- The static Font Awesome CSS/font files still exist in the repo/output for rollback/legacy reasons, but normal rendered pages no longer reference them.
- Inline critical CSS size is unchanged.
- Contact pages still load `intlTelInput.css`.
- PDF CSS for `layouts/compliance/single.print.html` is unchanged.
- Video player behavior is unchanged; only its icons and CSS/font dependency were modernized.
- `static/css/main-v2.css` is not moved into `assets/css/main.css`; it is removed because it was not active page CSS.

## Verification performed

### Build

Hugo render passed with:

```bash
hugo v0.163.3+extended+withdeploy darwin/arm64
HUGO_CACHEDIR=/tmp/safespring-css-impl-cache-after hugo --minify --destination /tmp/safespring-css-impl-after --cleanDestinationDir --noBuildLock
HUGO_CACHEDIR=/tmp/safespring-css-compliance-cache-after hugo --minify --destination /tmp/safespring-css-compliance-after --cleanDestinationDir --noBuildLock
HUGO_CACHEDIR=/tmp/safespring-css-video-cache-after hugo --minify --destination /tmp/safespring-css-video-after --cleanDestinationDir --noBuildLock
HUGO_CACHEDIR=/tmp/safespring-fa7-cache hugo --minify --destination /tmp/safespring-fa7 --cleanDestinationDir --noBuildLock
HUGO_CACHEDIR=/tmp/safespring-fa-svg-cache hugo --minify --destination /tmp/safespring-fa-svg --cleanDestinationDir --noBuildLock
HUGO_CACHEDIR=/tmp/safespring-fa-svg-cache-final hugo --minify --destination /tmp/safespring-fa-svg-final --cleanDestinationDir --noBuildLock
```

### Static checks

```bash
git diff --check
rg -n '@material|mdc-' layouts/shortcodes/price-list.html content/en/price.md content/sv/price.md content/nb/price.md content/da/price.md assets/js/mobile-price-tables.js
rg -n 'Font Awesome 6 Pro|\.\./webfonts' assets/css layouts static --glob '!*.woff2'
rg -n '<i[^>]+class="[^"]*(fa-|fas\b|far\b|fab\b|fak\b|fa-kit)' /tmp/safespring-fa-svg-final --glob '*.html'
rg -n 'combined-font-awesome|Font Awesome 7 Pro|fa-solid-900\.woff2|custom-icons\.woff2' /tmp/safespring-fa-svg-final --glob '*.html' --glob '*.css' --glob '*.js'
```

Results:

- no whitespace errors
- no remaining Material CSS or `mdc-*` references in the checked price scope
- `main.min...css` no longer contains `compliance-document-table` selectors
- `main-compliance-document-table.min...css` contains the document-table selectors
- home, price, contact, and article pages load `main.min...css`
- compliance overview, ISO 27001, and Kubernetes pages with document tables load `main-compliance-document-table.min...css`
- `main.min...css` and `main-compliance-document-table.min...css` no longer contain active video-player selectors
- `main-video-player.min...css` contains the moved video-player selectors
- all 52 rendered English pages with `data-video-player` loaded `main-video-player.min...css`
- no non-home English page without `data-video-player` loaded `main-video-player.min...css`
- no active Hugo asset CSS or layout references point at `../webfonts` or `"Font Awesome 6 Pro"`
- remaining `"Font Awesome 6 Pro"` matches are historical entries in `static/brand/ai/brand-correction-register.md`
- the downloaded FA7 web kit contains many style bundles, but only Classic Solid and custom-kit files were copied into the site
- generated HTML contains no active `<i class="fa...">` icons
- generated HTML/CSS/JS contains no references to `combined-font-awesome`, `"Font Awesome 7 Pro"`, `fa-solid-900.woff2`, or `custom-icons.woff2`
- SVG sprite crawl covered `2,908` generated HTML files and `9,609` `<use>` references with `0` missing symbols

### Browser smoke checks

Latest SVG-first Playwright QA was run against the English generated output with the language directory as server root:

```bash
cd /tmp/safespring-fa-svg-final/en
python3 -m http.server 4184 --bind 127.0.0.1
```

The checked desktop and mobile pages were:

- `/`
- `/price/`
- `/services/kubernetes/`
- `/services/dockyards/`
- `/compliance/`
- `/compliance/iso-27001/`
- `/contact/`
- `/demo/introduction-to-safespring-kubernetes-engine/`
- `/deep-dive/bootstrap-talos-linux-kubernetes-on-openstack/`
- `/services/compute/`

Results from that latest run:

- all checked pages made `0` requests for `combined-font-awesome`, `fontawesome`, `fa-solid-900.woff2`, or `custom-icons.woff2`
- all checked pages had `0` missing SVG symbols
- all checked pages had `0` core asset failures for document, stylesheet, script, or font requests
- all checked pages reported no horizontal overflow in the desktop and mobile smoke run
- CSS variants loaded as expected: normal pages used `main.min...css`, document-table pages used `main-compliance-document-table.min...css`, video pages used `main-video-player.min...css`, and price pages kept `price-tables.min...css`

Interaction smoke checks also passed:

- mobile compact price-table row opened correctly
- compliance document-table info row opened correctly
- mobile TOC rendered visibly on the article page
- video player controls rendered SVG icons

### Network spot check

The latest Playwright network check against `/tmp/safespring-fa-svg-final/en` confirmed:

- checked after pages made `0` requests matching `combined-font-awesome`, `fontawesome`, `fa-solid-900.woff2`, or `custom-icons.woff2`
- `/price/` still loaded the expected price CSS set: `local-font-faces`, `main.min...css`, and `price-tables.min...css`
- `/services/kubernetes/` and `/compliance/` loaded the expected `main-compliance-document-table.min...css` variant, with no separate compliance-table CSS request
- `/`, `/demo/introduction-to-safespring-kubernetes-engine/`, and `/services/compute/` loaded the expected `main-video-player.min...css` variant
- ordinary pages such as `/contact/` and the checked article loaded the expected `main.min...css`

## Rollback

This change is easy to roll back:

For the Font Awesome SVG-first migration, the safest rollback is to revert the FA-specific files together:

- `data/icons/fa-solid.json`
- `data/icons/fa-custom.json`
- `layouts/partials/fa-icon-data.html`
- `layouts/partials/fa-icon-data-by-symbol.html`
- `layouts/partials/fa-register-icon.html`
- `layouts/partials/fa-icon.html`
- `layouts/partials/fa-sprite.html`
- `layouts/shortcodes/fa-icon.html`
- the template/shortcode/content replacements that changed `<i class="fa...">` to `fa-icon.html`
- the `head.html` removal of the Font Awesome bundle block
- the CSS changes that replaced Font Awesome pseudo-glyphs with SVG/CSS-native markers

If a smaller emergency rollback is needed, re-enable the old Font Awesome bundle block in `layouts/partials/head.html` first. That restores CSS/webfont icon rendering for any legacy class names while the SVG migration is investigated, at the cost of bringing back the Font Awesome CSS and webfont requests.

1. Restore the three Material CSS links in `layouts/shortcodes/price-list.html`.
2. Move the contents of `assets/css/price-tables.css` back into `assets/css/main.css`.
3. Remove the `$isPricePage` CSS and Font Awesome branch from `layouts/partials/head.html`.
4. Delete `assets/css/price-tables.css`.
5. Delete `assets/css/fontawesome-price.css`.
6. Move the contents of `assets/css/compliance-document-table.css` back into `assets/css/main.css`.
7. Remove the `$hasComplianceDocumentTable` main CSS variant from `layouts/partials/head.html`.
8. Delete `assets/css/compliance-document-table.css`.
9. Move the contents of `assets/css/video-player.css` back into `assets/css/main.css`.
10. Remove the `$hasVideoPlayer` main CSS variant branches from `layouts/partials/head.html`.
11. Delete `assets/css/video-player.css`.
12. If rolling back only the video work and not the Font Awesome QA fix, keep `.fa-exclamation` in `assets/css/fontawesome-containerplatform.css`; otherwise remove that single mapping too.
13. Historical note: if only the earlier Font Awesome 7 webfont upgrade needs to be rolled back, restore the previous `assets/css/solid.min.css`, `assets/css/fontawesome.min.css`, `assets/css/custom-icons.min.css`, `static/fonts/fa-solid-900.woff2`, and `static/fonts/custom-icons.woff2`. This is separate from the current SVG-first rollback above.
14. If the retired static CSS is needed again, restore `static/css/main-v2.css`, restore the old `package.json` `purgecss` script/dependency, and point `static/brand/ai/brand-kit.json` back to `/css/main-v2.css`. Do not restore it into `assets/css/main.css` unless it has first been audited as active page CSS.

The deploy/server setup does not need any rollback action because it was not changed.

## Notes for future CSS work

- Keep `price-tables.css` render-blocking on price pages unless visual tests prove async loading is safe.
- If more Font Awesome icons are added, generate/update `data/icons/fa-solid.json` and `data/icons/fa-custom.json` from actual rendered usage and include dynamic JS toggle states, not only static HTML.
- Keep the generated icon data minimal. Do not reintroduce the Font Awesome CSS/webfont path unless it is a deliberate rollback.
- Do not move article code/table/footnote CSS out of global CSS until article coverage is mapped more thoroughly.
- Keep compliance document-table CSS render-blocking on pages that use the table because it controls initial row layout and mobile description states.
- Keep video-player CSS render-blocking on pages that use the player because it controls initial player dimensions, poster/overlay positioning, and mobile caption/timeline state.
- Inline critical CSS should be reduced only with before/after screenshots for header, hero, mobile menu, and layout-shift behavior.
