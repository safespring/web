#!/usr/bin/env python3
"""Check the October 2026 Search Console fixes against rendered HTML and Caddy.

Usage: python3 scripts/check-search-console-redirects.py BUILD_DIR
Optional --web-base tests an isolated local Caddy v1 listener for www/www2.
Optional --live-targets verifies destination responses without following redirects.
"""

import argparse
import csv
from html.parser import HTMLParser
from pathlib import Path
import sys
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlsplit
from urllib.request import build_opener, HTTPRedirectHandler

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "deploy/search-console-404-2026-10-07.csv"


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.links = []
        self.redirect = False
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "a":
            self.links.append(attrs.get("href", ""))
        if tag == "meta" and attrs.get("http-equiv", "").lower() == "refresh":
            self.redirect = True


class NoRedirects(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def response(opener, url):
    try:
        result = opener.open(url, timeout=20)
    except HTTPError as exc:
        result = exc
    with result:
        return result.code, result.headers.get("Location")


def key(url):
    parsed = urlsplit(url)
    return parsed.hostname, parsed.path.rstrip("/")


def run(args):
    rows = list(csv.DictReader(MANIFEST.open()))
    if len(rows) != 51 or len({row["url"] for row in rows}) != 51:
        raise ValueError("The source export must contain 51 unique URLs")
    expected = {"web": {}}
    for row in rows:
        if row["action"] != "redirect":
            continue
        parsed = urlsplit(row["url"])
        if parsed.hostname not in ("www.safespring.com", "www2.safespring.com"):
            raise ValueError(f"Redirect changes outside www/www2 are forbidden: {row['url']}")
        scope = "web"
        source = parsed.path.rstrip("/")
        target = row["target"]
        if not target.startswith("/") or target.startswith("//"):
            raise ValueError(f"Expected site-relative target: {target}")
        variants = [source] if Path(source).suffix else [source, source + "/"]
        for variant in variants:
            if variant in expected[scope] and expected[scope][variant] != target:
                raise ValueError(f"Conflicting target: {scope} {variant}")
            expected[scope][variant] = target
        if scope == "web":
            file = args.build_dir / target.lstrip("/")
            if target.endswith("/"):
                file /= "index.html"
            if not file.is_file() or (file.suffix == ".html" and Page(file.read_text()).redirect):
                raise ValueError(f"Missing or redirecting rendered target: {target}")

    for scope, rules in expected.items():
        actual = {"empty": {}, "query": {}}
        condition = None
        in_block = False
        path = ROOT / f"deploy/search-console-{scope}-redirects.caddy"
        for line in path.read_text().splitlines():
            if not line.strip() or line.lstrip().startswith("#"):
                continue
            line = line.strip()
            if line == "redir {" and not in_block:
                in_block = True
                condition = None
                continue
            if in_block and condition is None and line in ('if {query} is ""', 'if {query} not ""'):
                condition = "empty" if ' is ' in line else "query"
                continue
            if line == "}" and in_block and condition is not None:
                in_block = False
                condition = None
                continue
            parts = line.split()
            if not in_block or condition is None or len(parts) != 3 or parts[2] != "301":
                raise ValueError(f"Unexpected Caddy v1 rule: {line}")
            source, target, _ = parts
            if source in actual[condition]:
                raise ValueError(f"Duplicate redirect: {scope} {source}")
            actual[condition][source] = target
        if in_block or actual["empty"] != rules or actual["query"] != {
            source: target + "?{query}" for source, target in rules.items()
        }:
            raise ValueError(f"Caddy rules do not match reviewed manifest: {scope}")
        print(f"PASS: {scope}: {len(rules)} exact Caddy v1 routes, with query preservation")

    reported = {key(row["url"]) for row in rows}
    broken = []
    for file in args.build_dir.rglob("index.html"):
        route = "/" + file.relative_to(args.build_dir).as_posix().removesuffix("index.html")
        for href in Page(file.read_text()).links:
            if key(urljoin("https://www.safespring.com" + route, href)) in reported:
                broken.append(f"{route} -> {href}")
    if broken:
        raise ValueError("Links still use reported URLs:\n" + "\n".join(broken))
    print("PASS: no rendered web links to the 51 reported URLs")

    opener = build_opener(NoRedirects())
    checks = 0
    for scope, base in (("web", args.web_base),):
        if not base:
            continue
        for source, target in expected[scope].items():
            code, location = response(opener, base.rstrip("/") + source)
            if (code, location) != (301, target):
                raise ValueError(f"Wrong redirect: {scope} {source}: {code}, {location}")
            query = "utm_source=tempus&utm_medium=link&utm_campaign=03-juni&encoded=a%2Fb"
            code, location = response(opener, base.rstrip("/") + source + "?" + query)
            if (code, location) != (301, target + "?" + query):
                raise ValueError(f"Query lost or altered: {scope} {source}: {code}, {location}")
            # Exact rules must never capture descendants of the old route.
            code, _ = response(opener, base.rstrip("/") + source.rstrip("/") + "/not-a-page")
            if code != 404:
                raise ValueError(f"Rule captures descendant: {scope} {source}: {code}")
            checks += 3
    if checks:
        print(f"PASS: {checks} local HTTP redirect and path-boundary checks")
    if args.live_targets:
        targets = set()
        for row in rows:
            if row["action"] not in ("redirect", "reference_only") or not row["target"]:
                continue
            hosts = ("docs.safespring.com",) if urlsplit(row["url"]).hostname == "docs.safespring.com" else (
                "www.safespring.com", "www2.safespring.com"
            )
            targets.update(f"https://{host}{row['target']}" for host in hosts)
        for target in sorted(targets):
            code, _ = response(opener, target)
            if code != 200:
                raise ValueError(f"Destination must return direct HTTP 200: {target}: {code}")
        print(f"PASS: {len(targets)} live destinations return direct HTTP 200")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("build_dir", type=Path)
    parser.add_argument("--web-base")
    parser.add_argument("--live-targets", action="store_true")
    args = parser.parse_args()
    try:
        run(args)
    except (ValueError, OSError, URLError) as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        return 1
    print("PASS: Search Console fixes")
    return 0


if __name__ == "__main__":
    sys.exit(main())
