#!/usr/bin/env python3
"""Check master/production against the deployed runtime, without touching the server.

Requires Python 3.11+, local Git and Docker. The Hugo container receives a
read-only source mount and has neither network access nor a usable Git command.
Use --output EMPTY_DIRECTORY to retain generated HTML and the build log.
"""

import argparse
from datetime import datetime
import hashlib
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile
import tomllib

from compliance_history import ROOT, check as check_history


def check_policy(root):
    config = tomllib.loads((root / "config.toml").read_text())
    if config.get("enableGitInfo", False):
        raise ValueError("enableGitInfo requires Git -C; production Git 1.8.3.1 does not support it.")
    if "pagination" in config:
        raise ValueError("Hugo 0.111.3 needs top-level paginate/paginatePath, not [pagination].")
    for path in (root / "layouts").rglob("*.html"):
        if re.search(r"\.GitInfo\b", path.read_text()):
            raise ValueError(f"Production cannot use .GitInfo: {path.relative_to(root)}")
    for name in ("hugo.toml", "hugo.yaml", "hugo.json", "config.yaml", "config.json", "go.mod"):
        if (root / name).exists():
            raise ValueError(f"Unexpected production configuration {name}; review runtime compatibility first.")
    if (root / "config").is_dir():
        raise ValueError("Production uses config.toml; a config directory needs an explicit compatibility review.")
    for scope in [config, *config.get("languages", {}).values()]:
        if any(isinstance(value, dict) for value in scope.get("permalinks", {}).values()):
            raise ValueError("Nested page/section permalinks require newer Hugo than production 0.111.3.")


class HistoryComponent(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.depth = 0
        self.dates = []
        self.links = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "div":
            if self.depth or "compliance-history" in attrs.get("class", "").split():
                self.depth += 1
        if self.depth and tag == "time":
            self.dates.append(attrs.get("datetime"))
        if self.depth and tag == "a":
            self.links.append(attrs.get("href"))

    def handle_endtag(self, tag):
        if tag == "div" and self.depth:
            self.depth -= 1


def check_rendered(build, data):
    base = "https://github.com/safespring/web/commits/production/content/"
    cases = {}
    for path, record in data["documents"].items():
        cases[path.removesuffix(".md") + "/index.html"] = (
            record["author_date"][:10], base + path
        )
    latest = max(data["documents"].values(),
                 key=lambda record: datetime.fromisoformat(record["author_date"]))["author_date"][:10]
    for path in ("compliance/index.html", "en/compliance/index.html", "no/compliance/index.html"):
        cases[path] = (latest, base + "compliance")
    for path, (date, link) in cases.items():
        component = HistoryComponent((build / path).read_text())
        if component.dates != [date] or component.links != [link]:
            raise ValueError(f"Wrong or missing compliance date/history link in {path}")
    print(f"PASS: {len(cases)} rendered compliance dates and history links", flush=True)


def build_site(root, output, runtime):
    guard = output / "guard"
    guard.mkdir()
    git = guard / "git"
    git.write_text('#!/bin/sh\nprintf "%s\\n" "$*" >> /out/git-invocations.log\n'
                   'echo "Git must not be invoked during a production Hugo build" >&2\nexit 99\n')
    git.chmod(0o755)
    command = [
        "docker", "run", "--rm", "--platform", runtime["build_platform"], "--network", "none",
        # Keep build artifacts removable by the caller on Linux CI runners.
        "--user", f"{os.getuid()}:{os.getgid()}",
        "--mount", f"type=bind,source={root},target=/src,readonly",
        "--mount", f"type=bind,source={output},target=/out",
        "--env", "HUGO_RESOURCEDIR=/out/resources",
        "--env", "HUGO_CACHEDIR=/out/cache",
        "--workdir", "/src", "--entrypoint", "sh", runtime["build_image"], "-ec",
        'export PATH="/out/guard:$PATH"; '
        'hugo version > /out/hugo-version.txt; '
        'hugo --noBuildLock --destination /out/html > /out/hugo-build.log 2>&1',
    ]
    result = subprocess.run(command)
    version_path = output / "hugo-version.txt"
    version = version_path.read_text().strip() if version_path.exists() else ""
    print(version)
    if not re.search(r"\bv" + re.escape(runtime["hugo_version"]) + r"(?:[-+\s])", version):
        raise ValueError("The build did not run the required Hugo version.")
    if runtime["hugo_extended"] and "+extended" not in version:
        raise ValueError("The build must use Hugo Extended.")
    log = (output / "hugo-build.log").read_text()
    if (output / "git-invocations.log").exists():
        calls = (output / "git-invocations.log").read_text().strip()
        raise ValueError(f"Hugo attempted to invoke Git:\n{calls}")
    if result.returncode:
        print(log[-12000:], file=sys.stderr)
        raise ValueError(f"Production Hugo build failed with exit {result.returncode}.")
    print(log.strip())
    print("PASS: Hugo build without Git or network access", flush=True)


def check_history_fallback(output, runtime):
    """Render the real partials against changed and missing document metadata."""
    fixture = output / "history-fixture"
    for directory in ("content/compliance", "data", "layouts/partials", "layouts/_default"):
        (fixture / directory).mkdir(parents=True)
    (fixture / "config.toml").write_text('baseURL = "https://example.invalid/"\nenableGitInfo = false\n')
    for name in ("compliance-history.html", "compliance-history-date.html"):
        (fixture / "layouts/partials" / name).write_text((ROOT / "layouts/partials" / name).read_text())
    (fixture / "layouts/index.html").write_text("Compatibility fixture")
    (fixture / "layouts/_default/single.html").write_text(
        '{{ partial "compliance-history.html" (dict "page" . "all" false) }}')
    (fixture / "layouts/_default/list.html").write_text(
        '{{ partial "compliance-history.html" (dict "page" . "all" true) }}')
    source = '---\ntitle: Document\ndate: 2000-01-01\n---\nOriginal text.\n'
    documents = {}
    for name in ("valid", "changed", "missing"):
        (fixture / f"content/compliance/{name}.md").write_text(
            source + ("Uncommitted change.\n" if name == "changed" else ""))
        if name != "missing":
            documents[f"compliance/{name}.md"] = {
                "author_date": "2024-02-03T23:30:00-05:00",
                "source_sha256": hashlib.sha256(source.encode()).hexdigest(),
            }
    (fixture / "data/compliance_history.json").write_text(json.dumps({"documents": documents}))
    build = output / "history-fixture-build"
    build.mkdir()
    build_site(fixture, build, runtime)
    for name, expected in (("valid/", ["2024-02-03"]), ("changed/", []), ("missing/", []), ("", [])):
        component = HistoryComponent((build / f"html/compliance/{name}index.html").read_text())
        if component.dates != expected or len(component.links) != 1:
            raise ValueError(f"Unsafe date fallback or missing history link in fixture {name!r}")
    print("PASS: stale/missing dates hidden; valid dates and all history links retained", flush=True)


def run(output):
    runtime = json.loads((ROOT / "deploy/production-runtime.json").read_text())
    check_policy(ROOT)
    data = check_history(ROOT)
    print("PASS: production configuration and committed document history", flush=True)
    build_site(ROOT, output, runtime)
    check_rendered(output / "html", data)
    subprocess.run([sys.executable, str(ROOT / "scripts/check-orphan-pages.py"),
                    str(output / "html")], check=True)
    check_history_fallback(output, runtime)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    try:
        if args.output:
            output = args.output.resolve()
            output.mkdir(parents=True, exist_ok=True)
            if any(output.iterdir()):
                raise ValueError("--output must be an empty directory.")
            run(output)
            print(f"Build artifacts: {output}")
        else:
            with tempfile.TemporaryDirectory(prefix="safespring-production-") as directory:
                run(Path(directory))
    except (ValueError, OSError, subprocess.CalledProcessError) as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        if isinstance(exc, subprocess.CalledProcessError) and exc.stderr:
            print(exc.stderr.decode().strip(), file=sys.stderr)
        return 1
    print("PASS: production compatibility")
    return 0


if __name__ == "__main__":
    sys.exit(main())
