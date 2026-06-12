# Safespring AI Brand Correction Register

Use this register to preserve concrete brand corrections, recurring failure modes, and practical fixes discovered while reviewing Safespring artifacts. AI tools should read this file after `ai-instructions.md` and before creating or adapting images, presentations, one-pagers, documents, diagrams, or similar material.

Canonical instructions: /brand/ai/ai-instructions.md
Machine-readable manifest: /brand/ai/brand-kit.json

## How To Use This Register

- Treat each entry as a correction pattern, not only as project history.
- When a new artifact feels off-brand, identify the mismatch, write the correction here, and then update `ai-instructions.md` if the rule should apply broadly.
- Prefer rules that can be checked mechanically: colors, fonts, icon source, page size, asset source, claims, spacing, and overflow.
- Corrections in this register should override older examples when those examples conflict with the current brand kit.
- Keep evidence tied to real Safespring source material: existing website CSS, approved assets, presentation examples, or explicit brand feedback.
- During an active artifact review, append every accepted visual, layout, typography, icon, asset, or claim correction to this register before the work is considered finished.
- Do not log temporary implementation mechanics unless they teach a reusable brand or production rule.

## 2026-05-28 - HTML One-Pager Correction

Source artifact: `/brand/safespring_onepager.html`
Review context: The one-pager rendered as a compact sales sheet, but it did not fully feel like Safespring because several visual choices came from a generic standalone HTML pattern instead of the Safespring website and AI brand kit.

### Active Change Log

- 2026-05-28: Reviewed `/brand/safespring_onepager.html` as an example artifact and identified that useful structure existed, but the visual system felt too generic and not sufficiently Safespring.
- 2026-05-28: Changed the artifact from a generic responsive page into a strict A4 document canvas: `210mm x 297mm`.
- 2026-05-28: Added an A4 print rule with `@page { size: A4; margin: 0; }` so browser and print/PDF output share the same physical page intent.
- 2026-05-28: Preserved the fixed A4 document on mobile and allowed horizontal scrolling instead of reflowing the one-pager into a different design.
- 2026-05-28: Removed external Inter/Google Fonts usage and switched the artifact to local Safespring font files.
- 2026-05-28: Set body and compact information text to Montserrat.
- 2026-05-28: Set major headings, section headings, service names, value titles, and CTA lead text to Hind Light / weight 300.
- 2026-05-28: Replaced emoji section and service icons with Font Awesome 6 Pro from the local `fa-solid-900.woff2` font.
- 2026-05-28: Replaced flag, building, public-sector, and framework emoji markers with Font Awesome inline icons.
- 2026-05-28: Set the A4 paper surface to Safespring cloud white `#FAFEFE`.
- 2026-05-28: Introduced a Word-standard 1 inch / `25.4mm` margin grid for document content.
- 2026-05-28: Adjusted the A4 margin model so header and footer background bands bleed to the paper edges while header/footer text, intro content, and body content align to the `25.4mm` margin grid.
- 2026-05-28: Extended the same margin grid vertically: header content starts at the top margin and footer content ends at the bottom margin, while their background bands still reach the paper edges.
- 2026-05-28: Kept the approved footer band height but centered the CTA and contact content vertically inside it, because the footer felt correct as a band but the content was pinned too high.
- 2026-05-28: Kept the approved header band height but centered the logotype, headline, and metric strip vertically inside it, because the header felt correct as a band but the content was pinned too low/top-grid-specific.
- 2026-05-28: Changed the header metric strip from a single horizontal row to a compact 2x2 grid and right-aligned the group inside the header margin grid.
- 2026-05-28: Removed the small header eyebrow text and reduced the header headline size, because the logo already carries the brand context and the headline needed a quieter document scale.
- 2026-05-28: Removed the boxed treatment around the intro paragraph so the lead copy sits directly on the paper surface instead of competing with the content cards.
- 2026-05-28: Rewrote the intro paragraph to include the user-provided Sweden-only customer-data statement: "All customer data processed by the service remains within Sweden. The service does not involve any transfer, replication, or processing of customer data outside Swedish territory."
- 2026-05-28: Replaced the sales-oriented compliance badge "Schrems II ready" with the more restrained "Schrems II safeguards".
- 2026-05-28: Removed the Schrems II badge entirely from the one-pager because even the restrained wording was too specific and sales-like for this compliance proof row.
- 2026-05-28: Expanded the ownership/legal note from a US Cloud Act-only statement to the user-provided broader scope: "no exposure to US regulation, laws, access, or surveillance".
- 2026-05-28: Merged the separate Medical/MedTech and Life Sciences industry rows into "Life Science & MedTech" and removed HIPAA and GxP-ready wording from that section.
- 2026-05-28: Added EOSC and European Commission logotypes to the European research/public-sector trust grid using local SVG assets.
- 2026-05-28: Removed a duplicate Sikt logotype from the trust grid.
- 2026-05-28: Removed the outer trust-grid border and the individual logo-cell borders so the customer/institution logo area reads calmer and less table-like.
- 2026-05-28: Removed separate background fills from the trust-grid body and logo cells so the logotypes sit directly on the paper surface.
- 2026-05-28: Replaced the footer's sales-specific contact with Safespring's official general contact details: `hello@safespring.com` and `+46 8-55 10 73 70`.
- 2026-05-28: Replaced the footer's ad hoc architecture-session booking CTA with the established demo CTA: `Watch demo` and `safespring.com/demo/`.
- 2026-05-28: Set standard card-window backgrounds to cloud blue `#E7EFF3`, while keeping the trust logo grid transparent on the paper surface.
- 2026-05-28: Set compact card-header fields to a 10% main-blue tint `#E8EFF3` with main-blue `#195F8C` text and icons.
- 2026-05-28: Updated compact card-header fields to the slightly darker pale blue `#DAE5EE` with main-blue `#195F8C` text and icons.
- 2026-05-28: Changed compact card-header label text from Hind Light to Montserrat SemiBold / weight 600, treating these headers as UI labels rather than editorial headings.
- 2026-05-28: Set the three nested value tiles in the Our Values card to paper/cloud-white `#FAFEFE`, creating a quieter inset contrast against the cloud-blue card background.
- 2026-05-28: Removed paper-white traces inside regular cards by applying the cloud-blue background to the full card container, not only to the card body.
- 2026-05-28: Replaced mixed `/img/logos/` references and embedded `data:` trust logos with curated local logo files from `/brand/logos/`.
- 2026-05-28: Reordered the trust logo grid into proportion-based rows so square, compact-wide, wide, and ultra-wide marks sit with visually similar logos.
- 2026-05-28: Split the crowded final ultra-wide trust-logo row into two rows, with the shorter row centered, so wide marks have more breathing room.
- 2026-05-28: Rebalanced component spacing and text sizes so the content still fits inside one A4 page with the Word-standard content margin grid.
- 2026-05-28: Increased middle-section microcopy, badge, service, industry, and value text sizes, raised compact card-header row height, and expanded card padding/gaps so the body content uses the A4 area more evenly instead of feeling compressed at the top.
- 2026-05-28: Vertically centered the trust-logo grid inside its available lower card area so the logos distribute the remaining page space more calmly without adding a new background or border.
- 2026-05-28: Enlarged the first square-logo row in the trust grid to twice the standard logo height, because small icon-like institutional marks need more scale than wide wordmarks to feel equally visible.
- 2026-05-28: Increased the unboxed intro paragraph size and added vertical padding above and below it, because lead copy should read as a distinct document intro rather than compressed microcopy.
- 2026-05-28: Replaced the dark blue header band with the approved light Safespring cloud image background, added a transparent-to-cloud-white overlay fade, changed all header text and metrics to main blue, and replaced the embedded white logo with the official blue logotype asset.
- 2026-05-28: Increased the light-header headline substantially so the document has a clear primary message instead of treating the headline as small supporting text.
- 2026-05-28: Moved the light-header content group down by about 50px so the logotype, headline, and metrics sit lower in the image band instead of being anchored near the top.
- 2026-05-28: Added about 50px top margin above the unboxed intro paragraph so the lead copy separates clearly from the light image header.
- 2026-05-28: Rebalanced the four service points as a centered 2x2 grid with larger row and column gaps, using the full services-card height instead of clustering the points near the top.
- 2026-05-29: Set service item labels such as Compute, Storage, Backup, and Kubernetes to Montserrat SemiBold so they read as compact service labels instead of light editorial headings.
- 2026-05-28: Converted the trust-logo section from a standard card-header block into a note-shortcode-inspired variant with a dashed border, title integrated into the border line, and a side icon.
- 2026-05-28: Reduced the vertical inset inside the note-style trust-logo frame so the space above and below the logos is closer to the side inset.
- 2026-05-29: Replaced separate Stockholm and Oslo infrastructure bullets with one data-center statement naming STO1, STO2, and OSL2 as public cloud locations with Tier III and green energy.
- 2026-05-29: Replaced the broad framework-agreement list with the user-approved R&E-sector wording: GÉANT OCRE IaaS+ for the R&E sector.
- 2026-05-29: Standardized regular card-body padding to 20px so services, compliance, industries, and values boxes share the same internal spacing.
- 2026-05-29: Removed the secondary "Swedish Ownership & Infrastructure" heading inside the compliance card so the evidence rows sit directly under the card's main context.
- 2026-05-29: Moved the compliance evidence divider from below the badges to subtle separators above and below the data-center row, giving the evidence list more breathing room.
- 2026-05-29: Changed compact compliance evidence rows to a fixed icon column plus text column so icons are vertically centered against wrapped rows and continuation lines keep the same left edge.
- 2026-05-29: Increased compact industry-list headings slightly so industry category names are clearer than their supporting detail text.
- 2026-05-29: Changed the Our Values tile words to Montserrat SemiBold so compact value labels read as labels, not editorial headings.
- 2026-05-29: Removed em dashes from the one-pager copy and replaced them with commas or semicolons for a cleaner compact document tone.
- 2026-05-29: Reverted the header proof-point tiles from square tiles back to the earlier compact rectangular 2x2 metric layout.
- 2026-05-29: Increased the vertical padding in the rectangular header proof-point tiles so the metric labels have more breathing room.
- 2026-05-29: Removed the final period from the main header headline so it reads as a title rather than a sentence.
- 2026-05-29: Removed the parenthetical product acronym from the compact Kubernetes service label.
- 2026-05-29: Replaced the dark CTA footer fill with a light gradient from cloud white to cloud blue and changed footer text to main blue.
- 2026-05-29: Changed footer CTA headings and contact labels to Montserrat SemiBold.
- 2026-05-28: Verified computed browser styles for the corrected one-pager: Montserrat body, Hind Light headings, Font Awesome icons, cloud-white paper, A4 page size, 1 inch content margin grid on all sides, full-bleed header/footer bands, and no internal overflow.
- 2026-05-28: Created this correction register as a stable AI-readable brand learning log and linked it from `ai-instructions.md`, `brand-kit.json`, and the public brand portal.
- 2026-05-28: Added generalized one-pager lessons to the AI instructions so future AI-generated artifacts inherit the corrections without needing to inspect this one file.

### What Felt Off-Brand

- It used Inter from Google Fonts instead of Safespring's local type system.
- It used emoji icons for services, compliance, industries, values, locations, and framework notes.
- It used approximate colors such as `#1a6b96`, `#14527a`, `#2d8bbf`, `#e8f4fb`, and `#f0a500` instead of canonical Safespring tokens.
- It used main blue and blue gradients as large section backgrounds. Current Safespring guidance says main colors should be foreground colors; ordinary panels, cards, text boxes, diagrams, and document graphics should use cloud-blue backgrounds.
- It was built as a generic responsive web page, not as a strict document page, so it did not guarantee A4 dimensions.
- It embedded logos and partner graphics as `data:` images, making provenance and reuse hard to inspect.
- It included strong claims and certifications without visible source attribution in the file.
- It used a compact sales-sheet structure that was useful, but the visual execution initially felt more like a generic SaaS flyer than Safespring.

### Corrections Applied

- Set the sheet to strict A4: `.page` uses `210mm` by `297mm`, with `@page { size: A4; margin: 0; }`.
- Set the document content margin grid to Word default: `25.4mm` / 1 inch.
- Allowed header and footer background bands to bleed to the paper edges, while keeping header/footer content and all body content aligned to the `25.4mm` margin grid.
- Treated header and footer content placement as deliberate composition choices inside approved-height bands, while keeping their horizontal alignment on the document margin grid.
- Preserved the taller CTA footer band and centered its content vertically to avoid a top-heavy footer.
- Preserved the taller header band and centered its content vertically to avoid a top-heavy or margin-bound header.
- Set header metrics as a right-aligned 2x2 grid so proof points read as a compact block instead of a long toolbar.
- Removed redundant eyebrow text from the header and reduced the headline size to keep the band more restrained.
- Removed the intro paragraph box/background/border and kept the text aligned to the document margin grid.
- Added the user-provided Sweden-only customer-data statement to the intro copy and removed potentially conflicting Norway wording from that paragraph.
- Changed readiness-style compliance wording to neutral safeguards wording.
- Removed the Schrems II badge from the compliance proof row.
- Replaced the US Cloud Act-only ownership/legal note with the broader user-approved jurisdictional risk wording.
- Removed HIPAA and GxP-ready industry copy from the Life Science & MedTech section and replaced it with neutral workload wording.
- Added EOSC and European Commission as explicit institutional trust signals in the logo grid.
- Removed duplicate institutional/customer logos from the trust grid.
- Removed visible borders around the trust-grid container and individual logo cells.
- Removed separate background fills behind the trust-grid body and individual logo cells.
- Replaced trust-grid image sources with curated `/brand/logos/` files and removed embedded `data:` logos from the trust grid.
- Grouped the trust grid by logo aspect ratio, using row-specific column counts so visually similar logo dimensions share each row.
- Split the final ultra-wide logo group into two rows instead of compressing all wide marks into one crowded row.
- Increased the fixed A4 body type scale and compact card-header row height, then rebalanced padding and gaps so the content reads larger and uses more of the middle page area without introducing overflow.
- Centered large trust-logo grids vertically inside their available card body when the section has more height than the logo rows require.
- Enlarged the first square-logo row in the trust grid independently from the wide logo rows so icon-like marks read at a comparable perceived size.
- Increased the unboxed intro paragraph text size and vertical breathing room so lead copy has a clear document role while still sitting directly on the paper surface.
- Replaced the dark blue header band with a light Safespring cloud image background and a transparent-to-cloud-white overlay fade.
- Changed header text, metric numbers, and metric labels to main blue on the light image header and replaced the white logotype with the official blue logotype.
- Enlarged the light-header headline while keeping it in Hind Light and main blue so the title becomes the dominant message in the header.
- Lowered the light-header content group while keeping the left headline block and right metrics aligned to the same vertical offset.
- Increased the top margin above the unboxed intro paragraph to create clearer separation from the light image header.
- Balanced the Services card as a centered 2x2 grid so the four points have equal visual weight and use the card height cleanly.
- Changed service item labels to Montserrat SemiBold / weight 600.
- Replaced separate Stockholm/Oslo infrastructure bullets with one scoped public-cloud data-center line: STO1, STO2, and OSL2 public cloud locations; Tier III, green energy.
- Replaced broad framework wording with the scoped statement: GÉANT OCRE IaaS+ for the R&E sector.
- Standardized regular card body padding to 20px so peer content boxes use the same inset.
- Removed the nested infrastructure subheading from the Compliance card to reduce label noise inside the compact information box.
- Moved the compliance evidence divider away from the badge row and used subtle separators above and below the data-center row.
- Changed compact compliance evidence rows to a fixed icon column plus text column so wrapped text aligns consistently and icons remain vertically centered.
- Increased compact industry-list headings slightly so category names have clearer hierarchy over their detail lines.
- Set compact value words in the Our Values tiles to Montserrat SemiBold / weight 600.
- Replaced em dashes in compact one-pager copy with commas or semicolons.
- Reverted the header proof-point tiles from square tiles back to the earlier compact rectangular 2x2 metric layout.
- Increased rectangular header proof-point tile padding to `8px 4px` so the number and label sit less tightly.
- Removed the final period from the main header headline.
- Changed the compact service label from "Kubernetes (SKE)" to "Kubernetes".
- Changed the CTA footer background to a `#FAFEFE` to `#E7EFF3` gradient and set footer copy, labels, and contact text in main blue.
- Set the footer CTA heading and contact labels to Montserrat SemiBold / weight 600.
- Reworked the trust-logo container as a note-style field with a dashed main-blue border, a paper-backed title that interrupts the border line, and an icon chip beside the label.
- Made the note-style trust-logo frame content-height and centered it in the available row, reducing excess top/bottom space around the logos while keeping the side inset.
- Replaced the footer's sales-specific email and outdated phone number with Safespring's official general contact details.
- Replaced the footer's ad hoc booking URL with the established public demo URL.
- Set regular card-window backgrounds to Safespring cloud blue `#E7EFF3`.
- Set compact card-header fields to the 10% main-blue tint `#E8EFF3` and used main blue `#195F8C` for header text and icons.
- Updated compact card-header fields to the slightly darker pale blue `#DAE5EE` and kept main blue `#195F8C` for header text and icons.
- Set compact card-header label text to Montserrat SemiBold / weight 600 while keeping Font Awesome for the icon.
- Set nested value tiles to paper/cloud-white `#FAFEFE` inside the cloud-blue Our Values card.
- Set full regular card containers to cloud blue `#E7EFF3` so empty space inside a card does not expose the paper-white page surface.
- Set the paper surface to Safespring cloud white `#FAFEFE`.
- Kept the A4 sheet fixed on mobile and allowed horizontal scrolling, so the document remains a document instead of reflowing into a different layout.
- Replaced Inter/Google Fonts with local Safespring font files.
- Set body text to Montserrat.
- Set major headings, compact headings, service names, value titles, and CTA lead text to Hind Light / weight 300.
- Replaced emoji icons with Font Awesome 6 Pro using the local `fa-solid-900.woff2` font.
- Replaced flag/location emoji markers with Font Awesome inline icons.
- Verified computed font families in browser:
  - body: Montserrat
  - headings: Hind Light
  - icons: Font Awesome 6 Pro
- Verified rendered A4 dimensions in browser:
  - width about `793.7px`, equivalent to `210mm` at CSS 96 DPI
  - height about `1122.5px`, equivalent to `297mm` at CSS 96 DPI
  - no internal overflow inside the A4 page
- Verified rendered Word-standard content margins in browser:
  - header and footer background bands have `0px` left/right inset from the A4 paper edge
  - header logo/text, intro content, body content, and footer text align at about `96px`, equivalent to `25.4mm` at CSS 96 DPI
  - header content is vertically centered inside the approved-height header band
  - header metrics form a 2x2 grid and the metric group right edge aligns to the `25.4mm` margin
  - CTA footer content is vertically centered inside the approved-height footer band

### Generalized Rules

- Do not introduce external font systems such as Inter, Roboto, Arial-first, or Google Fonts for Safespring artifacts when local Safespring fonts are available.
- Use Montserrat for body text, labels, captions, data, document text, and compact UI text.
- Use Hind Light / Hind 300 for expressive headings and strong document titles.
- Use Montserrat SemiBold / weight 600 for compact card-header labels and other small UI-like section labels.
- Use Font Awesome or approved Safespring icon assets for functional icons. Do not use emoji as interface or brand icons.
- For printable one-pagers and similar fixed documents, define the physical format explicitly and verify the rendered page box.
- If an artifact must be A4, use `210mm x 297mm`, add an `@page` A4 rule, and verify there is no internal overflow.
- For Word-like A4 one-pagers and formal documents, use a standard 1 inch / `25.4mm` content margin grid unless a different margin system is explicitly requested.
- Header and footer background bands may bleed to the paper edges in formal one-pagers, but content inside them and all body content must align to the document margin grid horizontally.
- Footer CTA bands in formal one-pagers should use a light cloud-white to cloud-blue treatment with main-blue text unless a dark special-case band is explicitly approved.
- Footer CTA headings and contact labels in formal one-pagers should use Montserrat SemiBold / weight 600.
- Prefer light Safespring image or cloud-white header fields over dark main-blue header fills in formal one-pagers. When using a light image header, add a transparent-to-cloud-white overlay fade and set all header text, metrics, and labels in main blue `#195F8C`.
- On light image headers, use the official blue Safespring logotype. Reserve white logotypes for approved dark contexts only.
- Light image headers may place the logotype, headline, and proof-point block lower in the band to create calmer top whitespace, but keep those elements on a shared vertical offset and verify they do not collide with the intro content.
- In A4 one-pagers using the Word-standard grid, header and footer content may be vertically centered inside approved-height bands when that creates calmer document balance. Keep their horizontal alignment on the margin grid.
- Header metrics and proof points should usually be grouped as compact right-aligned blocks, such as a 2x2 metric grid, rather than stretched across the header as a toolbar.
- Avoid redundant eyebrow labels in compact document headers when the logo already establishes context. Keep the main headline clearly dominant and readable; restrained means not oversized marketing-hero styling, not compressed microcopy.
- Avoid boxing short lead paragraphs by default in formal one-pagers. Let intro copy sit directly on the paper surface when it improves hierarchy; reserve cloud-blue boxes for grouped content, callouts, diagrams, and cards.
- Unboxed intro paragraphs in A4 one-pagers should still be readable and visibly separated from surrounding sections. Use larger Montserrat text than dense card microcopy and add clear vertical padding above and below the paragraph.
- When a light image header is followed by unboxed intro copy, add enough top margin above the intro to make it read as a new document section rather than a continuation of the header.
- Use cloud blue `#E7EFF3` for standard card-window, panel, textbox, callout, table, and diagram backgrounds. Keep trust logo grids transparent when they should sit directly on the paper surface.
- For compact section or card-header fields, use pale section-header blue `#DAE5EE` as the background and main blue `#195F8C` for the label text and icon.
- For compact card-header labels, use Montserrat SemiBold / weight 600 rather than Hind Light; reserve Hind Light for expressive headings and document titles.
- Use Montserrat SemiBold / weight 600 for compact service item labels when they function as UI-like labels inside service cards.
- Keep compact service labels short and plain. Avoid parenthetical product acronyms such as `(SKE)` unless the acronym is required for disambiguation.
- When a services card has four peer items, arrange them as a balanced 2x2 grid, center the grid within the available card body, and use enough row/column gap that each point reads as equally important.
- Apply component backgrounds to the full component container as well as nested body areas, so unused or flexible space does not reveal accidental paper-white gaps.
- In cloud-blue cards, small nested value tiles or sub-panels may use paper/cloud-white `#FAFEFE` to create subtle inset contrast.
- Use a consistent 20px content padding for regular A4 card bodies when the cards are peer information boxes; reserve custom padding for special components such as note-style logo frames.
- Avoid redundant subheadings inside compact card bodies when the card header already provides context; use direct evidence rows or bullets instead.
- In compact compliance proof lists, avoid a single hard divider immediately below badges; if a key evidence row needs emphasis, place subtle separators above and below that row instead.
- In compact evidence rows with icons, use a fixed icon column and text column so wrapped text aligns with the first line and icons center vertically across multi-line rows.
- In compact industry lists, make the category names visibly larger than their supporting detail lines while keeping the list dense enough for A4.
- Use Montserrat SemiBold / weight 600 for compact value words inside small tiles; reserve Hind Light for expressive document titles and larger headings.
- Avoid em dashes in compact one-pager copy. Prefer commas, colons, semicolons, or short sentence breaks.
- Rectangular header proof-point tiles in compact A4 headers should have enough vertical padding for the number and label to breathe; in the current one-pager use `8px 4px`.
- Do not end short title-like header headlines with a period; reserve sentence punctuation for body copy and explanatory text.
- Treat data residency, transfer, replication, processing location, legal, and compliance language as exact-scope claims. Use user-approved wording when supplied, and verify scope before reusing it in other artifacts.
- Do not narrow approved jurisdictional risk wording to a single law when the approved claim is broader. For this one-pager, the approved wording is "no exposure to US regulation, laws, access, or surveillance".
- When naming Safespring public cloud locations in compact infrastructure copy, use the approved codes STO1, STO2, and OSL2 and keep Tier III and green energy in the same data-center statement unless more detailed source-backed context is needed.
- When referencing Safespring framework agreements for research and education, use the scoped wording "GÉANT OCRE IaaS+ for the R&E sector" unless a different source-backed procurement context is explicitly needed.
- Avoid "ready" language for legal and compliance badges unless it is a verified formal status. Prefer neutral, evidence-led wording such as safeguards, documentation, contractual guarantees, or aligned.
- Avoid using Schrems II as a short compliance badge in broad one-pagers. Include it only when the artifact explicitly needs that legal topic and the wording has been verified.
- Do not use HIPAA language in Safespring Life Science or MedTech material unless it is explicitly verified and approved for the artifact. Prefer neutral workload wording such as sensitive research and clinical data.
- In research and public-sector trust grids, include EOSC and European Commission logotypes when explicitly requested and relevant. Use curated local SVGs or approved official logo files; do not recreate institutional marks from text.
- De-duplicate trust, customer, partner, and institutional logo grids. Show an organization once unless distinct sub-entities or separate verified roles are intentionally needed.
- For one-pager trust grids, source customer, partner, and institutional logos from the curated `/brand/logos/` directory and do not embed logos as `data:` URIs.
- In dense trust grids, group logos by visual aspect ratio or dimensions so square marks, compact-wide marks, and ultra-wide marks do not alternate randomly in the same row.
- Scale grouped logo rows by perceived visual weight, not only by a shared maximum size. Square or icon-like logo rows may need roughly twice the image height of wide wordmark rows to feel equally legible.
- When a wide or ultra-wide logo row feels crowded, split it into two centered rows rather than shrinking the marks until they become hard to read.
- In fixed-format A4 one-pagers, do not leave the middle content visually compressed at the top while the lower area is empty. First increase readable Montserrat microcopy sizes, compact card-header height, card padding, and grid gaps; then distribute large trust-logo sections vertically inside their available area.
- After increasing one-pager scale or spacing, verify the rendered A4 page still has no internal overflow, no accidental second page, and no clipped text.
- Keep dense trust and customer logo grids visually quiet. Avoid table-like border grids and separate box fills around logos unless a formal comparison table is explicitly intended.
- When a trust-logo section needs framing, prefer a note-shortcode-inspired dashed border with the title integrated into the border line and an icon chip beside the title rather than a heavy filled card header.
- Keep framed trust-logo sections tight around the logo grid. Match top/bottom inset to the side inset where possible; if the page layout has extra vertical space, center the framed section in that space instead of padding the inside of the frame.
- Use Safespring's official general contact details in broad public-facing artifacts unless a role-specific contact is explicitly requested and verified: `hello@safespring.com` and `+46 8-55 10 73 70`.
- Use established public Safespring CTA URLs in broad artifacts. Prefer `Watch demo` with `safespring.com/demo/` over invented booking slugs unless a campaign-specific URL is explicitly supplied and verified.
- Use cloud white `#FAFEFE` as the paper surface for document-like artifacts.
- Preserve the document format on mobile; do not reflow a strict document into a different layout unless a separate mobile artifact is requested.
- Avoid inline `data:` assets for brand assets when stable URLs or curated files can be used.
- Treat customer logos, partner logos, certifications, framework agreements, regions, uptime, ownership, and compliance statements as claims that require source verification.
- When adapting a generic layout, keep useful structure but replace the visual system with Safespring tokens, fonts, icons, and asset rules.

### Remaining Issues To Fix If This One-Pager Becomes Public Source Of Truth

- Migrate approximate colors to canonical tokens from `brand-kit.json`.
- Replace main-blue section header and footer fills with a treatment that follows the cloud-blue background rule, unless explicitly approved as a special brand band.
- Replace any remaining embedded `data:` images with curated static assets and documented source files.
- Verify all compliance, SLA, datacenter, customer, and framework claims against current Safespring source material.
- Replace any generic partner logo grid with a curated, approved customer or partner asset set if the piece will be reused.

## Standing Review Checklist

Before considering a Safespring artifact brand-aligned, check:

- Fonts: Montserrat body, Hind Light/Hind heading hierarchy, Safespring Mono only for code, Font Awesome or approved symbols for icons.
- Colors: canonical tokens only; cloud-blue for component backgrounds; main colors for text, icons, lines, and emphasis.
- Logos: official assets only; no tracing, recoloring, filters, or embedded untracked copies.
- Icons: no emoji; no random third-party icon style; use Font Awesome or curated Safespring icons.
- Claims: no invented certifications, customer names, regions, uptime, sovereignty, legal, or compliance statements.
- Format: intended page, slide, or document size is explicit and verified.
- Layout: no overflow, no accidental second page, no clipped text, no tiny unreadable labels.
- Source: if the design copies an existing Safespring artifact, record which parts are inspiration and which parts are corrected.
