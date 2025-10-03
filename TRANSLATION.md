# AI Translation Guide (concise)

Use `scripts/batch_translate_missing.py` to create and translate missing language pages. Follow these steps.

## 1) Prereqs
- Check Python: `python3 --version` (need 3.x). On Debian/Ubuntu: `sudo apt-get install -y python3 python3-venv`.
- Ensure Git is installed and this repo is cloned.

## 2) Get an OpenAI API key
- Sign in and create a key: [OpenAI platform](https://platform.openai.com/)
- Copy the key (`sk-...`).

## 3) Provide the key to the scripts (choose ONE)
- Create `.env.local` in the repo root:
  ```bash
  echo 'OPENAI_API_KEY="sk-PASTE_YOUR_KEY_HERE"' >> .env.local
  ```

## 4) Recommended run order
- Snapshot current work (safe point):
  ```bash
  git add -A && git commit -m "chore: snapshot before translation" || true
  ```
- Plan only (prints what would happen; no changes):
  ```bash
  python3 scripts/batch_translate_missing.py
  ```
- Dry-run sample (prints intended actions; no changes):
  ```bash
  python3 scripts/batch_translate_missing.py --execute --dry-run --limit 5
  ```
- Small real batch (creates + translates):
  ```bash
  python3 scripts/batch_translate_missing.py --execute --limit 10 --workers 6
  ```
- Run remaining (as needed):
  ```bash
  python3 scripts/batch_translate_missing.py --execute --workers 6
  ```

Useful flags: `--langs sv,en,nb,da`, `--prefer-source en,sv,nb,da`, `--content-root content`, `--verbose`.

## 5) Review changes quickly
- See changes:
  ```bash
  git status
  git diff
  ```
- Inspect a file:
  ```bash
  git diff -- content/da/path/to/page.md
  ```
- Optional preview (requires Hugo):
  ```bash
  hugo serve
  ```

## 6) Fix or redo specific pages
- If AI made a mistake, edit the file manually.
- Re-translate a single page:
  ```bash
  ./scripts/translate_page.py content/da/path/to/page.md
  ```
- Discard unwanted changes:
  ```bash
  git restore --staged . 2>/dev/null || true
  git restore .
  ```

## 7) Commit when satisfied
```bash
git add -A
git commit -m "feat(i18n): add and translate missing pages"
```

## Notes and gotchas
- Frontmatter: translator sets `ai: true` and `language: <lang>`. Verify.
- Code fences and inline code: should remain intact. Rarely they change—fix by hand.
- Links/URLs: targets should remain unchanged; spot-check a few pages.
- Paths must be under `content/<sv|en|nb|da>/...` or scripts won’t process them.
- Costs: translations call OpenAI and may incur usage charges.
