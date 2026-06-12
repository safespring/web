# Safespring AI Brand Instructions

Use this file as the canonical Safespring brand instruction for AI-generated images, slide decks, documents, diagrams, and similar communication material.

Resolve root-relative links in this file against the host that served it, for example `www.safespring.com` or `www2.safespring.com`.

Machine-readable manifest: /brand/ai/brand-kit.json
Design tokens: /brand/ai/brand-tokens.css
Correction register: /brand/ai/brand-correction-register.md
Human portal: /brand/ai/

## Brand Character

Safespring should feel trustworthy, restrained, technically capable, European, and clear. The visual language should support cloud infrastructure, compliance, security, research, public sector, education, and sensitive data operations.

Prefer calm technical confidence over hype. Avoid visual cliches such as glowing fantasy clouds, abstract neon cyberpunk scenes, random lock icons, generic AI brains, excessive gradients, decorative particles, or stock-like business imagery.

## Core Colors

- Main blue: `#195F8C`
- Section-header blue: `#DAE5EE`
- Middle blue: `#417DA5`
- Clear blue: `#3C9BCD`
- Green: `#32CD32`
- Web green: `#19F064`
- Orange: `#FA690F`
- Cloud blue: `#E7EFF3`
- Charcoal: `#323232`
- Cloud white: `#FAFEFE`
- White: `#FFFFFF`

Use main blue as the dominant brand color for text, icons, lines, logos, and brand marks. Use cloud white and cloud blue for calm backgrounds. Use orange for calls to action, highlights, or a single emphasis point. Use greens sparingly for positive status, sustainability, or operational health.

## Cloud-Blue Background Rule

Safespring does not use main brand colors as ordinary backgrounds. For text boxes, callouts, tables, diagrams, icon cards, and other graphic components, use cloud blue `#E7EFF3` as the background. Use the relevant main color for icons, text, lines, and labels on top of that cloud-blue background.

- Blue component: background `#E7EFF3`, text/icon `#195F8C`
- Middle-blue component: background `#E7EFF3`, text/icon `#417DA5`
- Clear-blue component: background `#E7EFF3`, text/icon `#3C9BCD`
- Green component: background `#E7EFF3`, text/icon `#32CD32`
- Web-green component: background `#E7EFF3`, text/icon `#19F064`
- Orange component: background `#E7EFF3`, text/icon `#FA690F`
- Neutral component: background `#E7EFF3`, text/icon `#323232`

Do not use main blue, middle blue, clear blue, green, web green, orange, or charcoal as large slide, textbox, diagram, table, card, or document background fills. The official blue Safespring flag/ribbon is a brand mark, not a layout background; it may use the blue flag asset with the white symbol.

For compact section or card-header fields, use section-header blue `#DAE5EE` as the background and main blue `#195F8C` for the label text and icon.

## Typography

- Use Hind Light or Hind 300 for large editorial headings and expressive hero titles. Keep heading letter spacing normal.
- Use Hind SemiBold or Montserrat 600 for short labels and compact section headings.
- Use Montserrat for body text, UI labels, buttons, captions, slide text, and document text.
- Use Safespring Mono for code, API labels, infrastructure names, terminal examples, and technical callouts.

If the exact fonts cannot be loaded, choose clean sans-serif fallbacks and keep the same hierarchy.

## CSS-Derived Design Cues

The Safespring web CSS is a useful source for layout and component behavior. Apply these patterns when creating AI-generated material:

- Use cloud white `#FAFEFE` or white as the main page, slide, and document surface.
- Use cloud blue `#E7EFF3` for panels, boxes, diagrams, controls, and component backgrounds.
- Use code blue `#EAF0F4` for code blocks, technical snippets, and terminal-style surfaces.
- Keep text measures restrained: about 700 px for prose blocks and about 800 px for code or technical blocks.
- Use 10 px radius for code blocks, callouts, input-like boxes, and technical panels.
- Use 15 px radius for icon blocks and compact component tiles.
- Use 20 px radius only for larger media containers or substantial panels.
- Use 50 px/pill radius for buttons, inputs, filters, and small horizontal icon-label components.
- Use subtle shadows sparingly: default elevation is `2px 3px 9px rgba(0,0,0,0.10)`, with stronger elevation only on hover or active elements.
- Use small, quick interactions when relevant: hover scale around 101-102%, short ease transitions, and no decorative motion.
- Keep labels uppercase, compact, and Montserrat 600 when they function as UI or metadata labels.
- Use clear blue `#3C9BCD` for secondary headings and technical labels; use main blue `#195F8C` for primary headings and structure.

## Correction Register Workflow

Use the correction register as a learning loop for Safespring brand alignment:

- Before adapting an existing artifact, read the correction register and apply the latest correction patterns.
- When an artifact feels unlike Safespring, identify concrete causes: wrong fonts, wrong colors, non-Safespring icons, unverified claims, incorrect page size, layout overflow, embedded assets, or generic SaaS styling.
- Preserve useful structure from examples, but replace the visual system with Safespring tokens, local fonts, official assets, and approved icon rules.
- Record new findings in the correction register when they should help future images, decks, documents, one-pagers, or diagrams.
- Corrections in the register override older examples when an older example conflicts with current brand rules.

Current one-pager lessons:
- Do not use Inter, Roboto, Arial-first, Google Fonts, or another standalone font system when Safespring fonts are available.
- Use local Montserrat for body text, compact UI labels, and card-header labels. Use local Hind Light / Hind 300 for larger expressive headings.
- Use Font Awesome 6 Pro or curated Safespring symbols for functional icons. Do not use emoji as brand or interface icons.
- For A4 one-pagers and printable documents, set the physical format explicitly to `210mm x 297mm`, add an A4 page rule, and verify that the page has no internal overflow.
- For Word-like A4 one-pagers and formal documents, use Word's standard 1 inch / `25.4mm` content margin grid unless a different margin system is explicitly requested.
- Header and footer background bands may bleed to the paper edges in formal one-pagers, but content inside them and all body content must align to the document margin grid horizontally. In A4 one-pagers using the Word-standard grid, header and footer content may be vertically centered inside approved-height bands when that creates calmer document balance. Color choices must still follow the cloud-blue/main-color background rules unless a band is an approved brand mark or explicitly approved special case.
- Footer CTA bands in formal one-pagers should use a light cloud-white to cloud-blue treatment with main-blue text unless a dark special-case band is explicitly approved.
- Footer CTA headings and contact labels in formal one-pagers should use Montserrat SemiBold / weight 600.
- Prefer light Safespring image or cloud-white header fields over dark main-blue header fills in formal one-pagers. When using a light image header, add a transparent-to-cloud-white overlay fade and set all header text, metrics, and labels in main blue `#195F8C`.
- On light image headers, use the official blue Safespring logotype. Reserve white logotypes for approved dark contexts only.
- Light image headers may place the logotype, headline, and proof-point block lower in the band to create calmer top whitespace, but keep those elements on a shared vertical offset and verify they do not collide with the intro content.
- Header metrics and proof points should usually be grouped as compact right-aligned blocks, such as a 2x2 metric grid, rather than stretched across the header as a toolbar.
- Avoid redundant eyebrow labels in compact document headers when the logo already establishes context. Keep the main headline clearly dominant and readable; restrained means not oversized marketing-hero styling, not compressed microcopy.
- Avoid boxing short lead paragraphs by default in formal one-pagers. Let intro copy sit directly on the paper surface when it improves hierarchy; reserve cloud-blue boxes for grouped content, callouts, diagrams, and cards.
- Unboxed intro paragraphs in A4 one-pagers should still be readable and visibly separated from surrounding sections. Use larger Montserrat text than dense card microcopy and add clear vertical padding above and below the paragraph.
- When a light image header is followed by unboxed intro copy, add enough top margin above the intro to make it read as a new document section rather than a continuation of the header.
- Use cloud blue `#E7EFF3` for regular card-window backgrounds. Keep trust logo grids transparent when they should sit directly on the paper surface.
- Use section-header blue `#DAE5EE` for compact section/card-header fields, with main blue `#195F8C` text and icons.
- Use Montserrat SemiBold / weight 600 for compact card-header label text. Keep Hind Light for expressive document titles and larger headings.
- Use Montserrat SemiBold / weight 600 for compact service item labels when they function as UI-like labels inside service cards.
- Keep compact service labels short and plain. Avoid parenthetical product acronyms such as `(SKE)` unless the acronym is required for disambiguation.
- When a services card has four peer items, arrange them as a balanced 2x2 grid, center the grid within the available card body, and use enough row/column gap that each point reads as equally important.
- Apply component backgrounds to the full component container as well as nested body areas, so empty or flexible space does not reveal accidental paper-white gaps.
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
- Do not narrow approved jurisdictional risk wording to a single law when the approved claim is broader. For the current one-pager, the approved wording is "no exposure to US regulation, laws, access, or surveillance".
- When naming Safespring public cloud locations in compact infrastructure copy, use the approved codes STO1, STO2, and OSL2 and keep Tier III and green energy in the same data-center statement unless more detailed source-backed context is needed.
- When referencing Safespring framework agreements for research and education, use the scoped wording "GÉANT OCRE IaaS+ for the R&E sector" unless a different source-backed procurement context is explicitly needed.
- Avoid "ready" language for legal and compliance badges unless it is a verified formal status. Prefer neutral, evidence-led wording such as safeguards, documentation, contractual guarantees, or aligned.
- Avoid using Schrems II as a short compliance badge in broad one-pagers. Include it only when the artifact explicitly needs that legal topic and the wording has been verified.
- Do not use HIPAA language in Safespring Life Science or MedTech material unless it is explicitly verified and approved for the artifact. Prefer neutral workload wording such as sensitive research and clinical data.
- In research and public-sector trust grids, include EOSC and European Commission logotypes when explicitly requested and relevant. Use curated local SVGs or approved official logo files; do not recreate institutional marks from text.
- De-duplicate trust, customer, partner, and institutional logo grids. Show an organization once unless distinct sub-entities or separate verified roles are intentionally needed.
- Keep dense trust and customer logo grids visually quiet. Avoid table-like border grids and separate box fills around logos unless a formal comparison table is explicitly intended.
- When a trust-logo section needs framing, prefer a note-shortcode-inspired dashed border with the title integrated into the border line and an icon chip beside the title rather than a heavy filled card header.
- Keep framed trust-logo sections tight around the logo grid. Match top/bottom inset to the side inset where possible; if the page layout has extra vertical space, center the framed section in that space instead of padding the inside of the frame.
- Use Safespring's official general contact details in broad public-facing artifacts unless a role-specific contact is explicitly requested and verified: `hello@safespring.com` and `+46 8-55 10 73 70`.
- Use established public Safespring CTA URLs in broad artifacts. Prefer `Watch demo` with `safespring.com/demo/` over invented booking slugs unless a campaign-specific URL is explicitly supplied and verified.
- Use cloud white `#FAFEFE` as the paper surface for document-like artifacts.
- Keep strict document layouts fixed on mobile unless a separate responsive version is requested.
- Avoid inline `data:` copies of logos or customer graphics when stable curated assets can be used.
- For one-pager trust grids, source customer, partner, and institutional logos from the curated `/brand/logos/` directory and do not embed logos as `data:` URIs.
- In dense trust grids, group logos by visual aspect ratio or dimensions so square marks, compact-wide marks, and ultra-wide marks do not alternate randomly in the same row.
- Scale grouped logo rows by perceived visual weight, not only by a shared maximum size. Square or icon-like logo rows may need roughly twice the image height of wide wordmark rows to feel equally legible.
- When a wide or ultra-wide logo row feels crowded, split it into two centered rows rather than shrinking the marks until they become hard to read.
- In fixed-format A4 one-pagers, avoid compressing the middle content at the top of the page while leaving a large empty lower area. Use the available page area by increasing readable Montserrat microcopy, badge, service, industry, and value text sizes; increasing compact card-header row height; adding modest card padding/gaps; and vertically centering large trust-logo grids inside their available section.
- After increasing one-pager type scale or spacing, verify the rendered A4 page still has no internal overflow, no accidental second page, and no clipped text.
- Treat customer logos, certifications, compliance status, framework agreements, regions, uptime, ownership, and sovereignty statements as claims requiring source verification.

## Logos

Use only official logo assets from the manifest. Do not redraw, trace, recolor, distort, rotate, crop, add shadows, place in busy backgrounds, or combine with unofficial symbols.

Default usage:
- Blue logo on light or cloud-white backgrounds.
- White logo only in approved dark contexts or inside official blue flag/ribbon assets. Do not create a main-color background just to use the white logo.
- Black logo only when color output is not available.
- Symbol-only mark only when space is constrained or when the logotype appears elsewhere in the same artifact.

## Images

Create or choose imagery that feels real, grounded, and infrastructure-aware. Good directions include Nordic data centers, secure cloud operations, European public-sector technology, research infrastructure, clean network diagrams, and practical teams working with systems.

Avoid sensational security imagery, anonymous hooded attackers, unrealistic server rooms, glossy consumer-tech styling, and visuals that imply services Safespring has not claimed.

For AI-generated images, keep compositions uncluttered, use Safespring blue as the main visual anchor, and leave clear whitespace for text if the image will be used in a slide or document.

## Presentations

Use an editorial, high-clarity slide style:
- 16:9 format.
- Strong headline on each slide.
- One main proof object per slide, such as a diagram, comparison table, metric strip, architecture map, or concise narrative.
- Calm backgrounds in cloud white or cloud blue. Do not use main blue or other main colors as full-slide backgrounds.
- Text boxes, icon panels, process cards, tables, and diagrams must follow the cloud-blue background rule: cloud-blue background, main-color text/icons/lines.
- Use 10 px-style rounded technical panels, 15 px-style icon tiles, and pill-shaped controls where the slide pattern calls for controls or labels.
- Keep spacing generous: 20 px component gaps, 30-40 px panel padding, and strong alignment over decorative framing.
- Use orange only for the primary action or key emphasis.
- Keep footers quiet. Include sources only when needed.
- Prefer the existing Safespring slide grammar: top-left blue flag/ribbon brand mark where useful, white or cloud-blue slide surfaces, pale panels, soft hierarchy, icon-and-label systems, clear architecture diagrams, and generous whitespace.
- Do not pack slides with generic SaaS cards or repeated feature boxes.

Template: /brand/ai/templates/safespring-presentation-template.pptx

## Documents

Use a formal, readable document style:
- Clear title, subtitle, date, and version area.
- Hind or Montserrat heading hierarchy.
- Montserrat body text with generous line spacing.
- Blue headings and restrained callouts.
- Callouts, text boxes, tables, and document graphics should use cloud-blue backgrounds with main-color text, icons, and lines.
- Tables should be explicit, readable, and lightly ruled.
- Code and technical examples should sit on `#EAF0F4` with Safespring Mono and main-blue labels.
- Use rounded callouts and tables with restrained borders. Avoid heavy boxes or dense grid styling.
- Use Safespring Mono only for technical labels and examples.
- For fixed-format one-pagers, PDFs, and printable HTML, define the page size explicitly. For A4, use `210mm x 297mm`, set `@page { size: A4; }` when using HTML/CSS, use a 1 inch / `25.4mm` content margin grid for Word-like documents, allow only header/footer background bands to bleed to the paper edge, center content in intentionally tall header/footer bands when that improves balance, and verify there is no second page or clipped content.
- In fixed-format one-pagers, prefer readable text and balanced vertical distribution over tiny compressed content. Increase compact card-header height, body microcopy, card padding, and logo-grid vertical placement before accepting a large unused middle/lower page area.
- Use local Safespring fonts and Font Awesome or approved Safespring symbols; do not use emoji icons in formal documents.

Template: /brand/ai/templates/safespring-document-template.docx

## Do Not

- Do not invent certifications, customers, security claims, compliance status, regions, or technical capabilities.
- Do not broaden data-residency, transfer, replication, processing-location, legal, or compliance statements beyond the verified or user-approved scope.
- Do not narrow user-approved jurisdictional risk wording to one named law unless the user explicitly asks for that narrower scope.
- Do not use sales-oriented readiness wording for legal or compliance claims unless the readiness is a verified formal status.
- Do not use HIPAA claims for Life Science or MedTech unless they are explicitly verified and approved.
- Do not use unverified customer logos, partner logos, framework claims, legal claims, SLA figures, or certification badges.
- Do not fake institutional logotypes or replace available official logotypes with generic text-only labels.
- Do not show the same customer, partner, or institution twice in one trust grid unless there is a deliberate, verified reason.
- Do not use unofficial colors when brand colors can solve the design.
- Do not use third-party font systems such as Inter or Google Fonts when Safespring's local fonts are available.
- Do not use main brand colors as ordinary backgrounds for slides, text boxes, diagrams, tables, cards, or document graphics.
- Do not create separate green, orange, or blue-tint component backgrounds. Use cloud blue as the shared component background.
- Do not use random third-party icons as Safespring identity marks.
- Do not use emoji as icons in Safespring brand material.
- Do not embed brand assets as opaque `data:` images when stable curated asset URLs are available.
- Do not make the brand feel playful, cartoonish, luxury, cyberpunk, dystopian, or consumer-app focused.
- Do not place text over low-contrast imagery.

## Prompt Starter

Create a Safespring-branded [image/deck/document] about [topic]. Follow the brand kit at /brand/ai/ai-instructions.md and use the manifest at /brand/ai/brand-kit.json. Use cloud blue `#E7EFF3` as the background for text boxes and graphics. Do not use main colors as backgrounds; use main blue `#195F8C`, green `#32CD32`, clear blue `#3C9BCD`, and orange `#FA690F` for text, icons, lines, and emphasis. Keep the result restrained, technically credible, and clear.
