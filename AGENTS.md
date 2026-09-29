# Production compatibility

`master` serves www2; `production` serves www. They currently build with Hugo
0.111.3 Extended, Git 1.8.3.1 and Caddy v1 on CentOS 7.9. The separately hosted
beta site has a different runtime; do not copy beta configuration into these
branches without checking compatibility. Verified versions are recorded in
`deploy/production-runtime.json`.

- Run `python3 scripts/check-production.py` after changes to source, templates,
  configuration or build tooling. A successful build with a newer local Hugo
  does not verify production compatibility.
- Keep Hugo's `enableGitInfo` disabled and do not use `.GitInfo` in templates.
  The server's Git does not support the `-C` argument used by Hugo.
- Preserve compliance history links and verified dates using the committed
  `data/compliance_history.json`. After committing document edits, regenerate
  it with `python3 scripts/compliance_history.py`, then commit the data file.
  Do not substitute file modification times or today's date.
- The check must build all pages without network or Git access, using the
  pinned Hugo version. Do not skip pages or override production configuration
  to make it pass. Caddy redirects must use v1 syntax.
- Keep compatibility fixes in the code unless a server/runtime change is
  explicitly requested. Do not assume commit, push or deployment from a local
  check. The workflow is not a branch protection rule.
