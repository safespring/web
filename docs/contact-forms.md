# Shared contact forms

The service-page wrapper, contact shortcode and Containers template use
`layouts/partials/contact-form.html`. Copy lives in `data/contact_form_copy.json`
for Swedish (`sv`), English (`en`), Norwegian Bokmål (`nb`) and Danish (`da`).

Work email and organisation are required. Names and the 512-character message
are optional. The existing privacy acknowledgement remains on regular forms;
Containers retains its existing variant. Private email domains and provider aliases are blocked by
the shared handler, alongside the Upsales business-email restriction. Floating labels, organisation suggestions and the Containers
background are retained. Thank-you and privacy links resolve within the current
language site.

`static/js/contact-form.js`, `data/contact_form.json` and
`tests/test_contact_form.mjs` are shared with the master checkout. When syncing,
preserve beta's templates, language keys, SVG helpers and fingerprinted CSS in
`assets/css/contact-form.css`. Form icons are explicitly registered on the owning
page because other templates can concurrently use `faTargetPage` for cards.

The form handler maps beta language hosts to their existing Matomo site IDs:
`.se` → 3, `.no` → 4, `.eu` → 5, `.dk` → 6. Events require statistical consent;
contact details and message text are not included in analytics. Beta submissions
do not emit Google Ads conversions. Localhost always runs in preview mode and
does not submit to Upsales.

The Upsales configuration was verified through its interface and generated-form
GET response on 2026-11-10. `data/contact_form.json` now has `integrationReady`
enabled, the verified submission endpoint and these actual field mappings:

| Context | Upsales field |
| --- | --- |
| Message | `Extra.1794322916575` |
| Source page | `Extra.1794322940710` |
| Service | `Extra.1794322963895` |
| Language | `Extra.1794322979811` |

Upsales' business-email restriction is enabled and its notification to
`hello@safespring.com` includes the new fields. No real submission or test email
was sent. Offline tests and localhost previews verify the website behaviour;
actual CRM persistence, notification delivery and the recipients' workflow have
not been tested end to end. The handler still fails closed if integration
configuration or field mappings are missing.

## Validation

```sh
python3 scripts/validate_noindex_frontmatter.py
node --test tests/test_contact_form.mjs
hugo --minify
python3 scripts/check-contact-form-markup.py public
node scripts/verify-css-contracts.mjs public
```

The markup check covers every built contact-form page across all four languages:
required fields, optional names/message, local thank-you/privacy routes, unique
form IDs, accessible descriptions, SVG symbols and CSS/handler assets. Behaviour
tests cover validation, submission failures, duplicate requests, receipt handling,
consent and host-specific tracking. The normal release build additionally follows
`scripts/build-site.sh`, including the existing compliance-PDF pipeline.
