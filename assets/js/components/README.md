# Header and footer JavaScript components

These files replace inline JavaScript that used to live in `layouts/partials/header.html` and `layouts/partials/footer.html`. The site is still a static Hugo site. Hugo renders the markup first, then these small components restore behavior that cannot be expressed safely in static HTML alone.

All files are loaded through Hugo `js.Build`, minified, fingerprinted, and deferred. Components must be defensive: if their expected markup is missing, they should exit without throwing.

## Component map

### `site-header.js`

Loaded by `header.html` on normal pages because the header appears globally. It preserves:

- fixed-header hide/show behavior while scrolling,
- desktop platform megamenu hover/focus behavior,
- mobile menu open/close behavior,
- submenu navigation,
- `inert` management for page content while the mobile menu is open,
- focus trapping and Escape/outside-click close behavior,
- the existing Matomo contact-button event.

Required markup: `#navbar`, `#main-menu-link-platform`, `#site-megamenu`, `#mobileMenuBtn`, `#mobileMenuWrapper`, `#mobileMainMenu`, `.mobile-submenu-trigger`, `.mobile-menu-wrapper .back-button`, and `.mobile-menu-wrapper .submenu`.

Accessibility contract: keep `aria-expanded`, `aria-hidden`, `inert`, `body.mobile-menu-open`, and focus restoration synchronized with visible menu state.

### `compliance-document-info.js`

Loaded by `footer.html` only when page content contains `compliance-document-table__info`. It lets one compliance document description open at a time.

Required markup: `.compliance-document-table__row` containing `.compliance-document-table__info` and `.compliance-document-table__description`.

Accessibility contract: keep `aria-controls`, `aria-expanded`, `aria-hidden`, and `.is-description-open` synchronized.

### `accordion.js`

Loaded by `footer.html` only when page content contains `class="accordion`. It initializes accordion panels that are rendered as static Hugo markup.

Required markup: `.accordion` buttons followed by their panel. Deep links use optional `.accordion-box` wrappers with matching ids.

Accessibility contract: keep `aria-controls`, `aria-expanded`, `aria-hidden`, `role="region"`, `aria-labelledby`, and `inert` synchronized with panel state. Hash links to accordion boxes must still open and scroll to the target panel.

### `code-block-tools.js`

Loaded by `footer.html` only when page content contains `<pre`. It adds language labels and localized copy buttons to rendered code blocks.

Required markup: `pre` elements, optionally with `pre > code[class*="language-"]`.

Localization: `copyLabel`, `copiedLabel`, and `errorLabel` are passed through Hugo `js.Build` params so each language keeps the previous button text.

### `table-labels.js`

Loaded by `footer.html` only when page content contains `<table`. It adds `data-label` attributes to table cells so mobile CSS can show the related header beside each cell.

Required markup: standard `table`, `th`, and `td` elements.

### `footnote-backrefs.js`

Loaded by `footer.html` only when page content contains `footnote-backref`. It adds localized `aria-label` and `title` values to Hugo footnote return links.

Required markup: `.footnote-backref` links.

Localization: `backrefLabel` is passed through Hugo `js.Build` params.

### `lazy-iframes.js`

Loaded by `footer.html` only when page content contains `data-src=`. It delays iframe loading until the frame intersects the viewport. Browsers without `IntersectionObserver` load the iframe immediately.

Required markup: `iframe[data-src]`.

### `mermaid-theme.js`

Loaded by `footer.html` only when page content contains Mermaid markup. The external Mermaid CDN script still loads first; this component only applies the Safespring theme.

Required markup and dependency: `<div class="mermaid">` in content and `window.mermaid` from the CDN script.

## Maintenance rules

- Keep components small and tied to one behavior.
- Keep loading conditions in `footer.html` aligned with the selectors above.
- Do not add new global dependencies for these behaviors.
- If markup selectors change, update both the component and this document in the same change.
