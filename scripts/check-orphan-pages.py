#!/usr/bin/env python3
"""Verify the rendered outcome of the 37-URL Ahrefs audit, optionally over HTTP.

Usage: python3 scripts/check-orphan-pages.py BUILD_DIR [--http-base URL]
Build with the normal production baseURL. The HTTP server must import the
Caddy redirect rules; Hugo's development server cannot return those 301s.
"""

import argparse
from collections import Counter, deque
from html.parser import HTMLParser
import json
from pathlib import Path
import sys
from urllib.error import HTTPError
from urllib.parse import urljoin, urlsplit
from urllib.request import build_opener, HTTPRedirectHandler
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
FIXTURE = ROOT / "tests/fixtures/ahrefs-orphans-2026-09-25.json"


class Page(HTMLParser):
    def __init__(self, url, html):
        super().__init__(convert_charrefs=True)
        self.url = url
        self.links = set()
        self.noindex = False
        self.redirect = False
        self.canonical = None
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta":
            if attrs.get("name", "").lower() == "robots":
                self.noindex = "noindex" in attrs.get("content", "").lower()
            if attrs.get("http-equiv", "").lower() == "refresh":
                self.redirect = True
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = urlsplit(attrs.get("href", "")).path
        if tag != "a" or "nofollow" in attrs.get("rel", "").split():
            return
        href = urlsplit(urljoin("https://www.safespring.com" + self.url, attrs.get("href", "")))
        if href.scheme not in ("http", "https") or href.hostname not in ("www.safespring.com", "safespring.com"):
            return
        path = href.path or "/"
        if not Path(path).suffix:
            path = path.rstrip("/") + "/"
        if path != self.url:
            self.links.add(path)


class NoRedirects(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("build_dir", type=Path)
    parser.add_argument("--http-base", help="Local Caddy origin, e.g. http://127.0.0.1:18765")
    args = parser.parse_args()
    cases = json.loads(FIXTURE.read_text())
    if len(cases) != 37 or len({case["url"] for case in cases}) != 37:
        raise SystemExit("The audit fixture must contain exactly 37 unique URLs")

    pages = {}
    for file in args.build_dir.rglob("index.html"):
        route = "/" + file.relative_to(args.build_dir).as_posix().removesuffix("index.html")
        pages[route] = Page(route, file.read_text())
    sitemap = {
        urlsplit(node.text).path
        for node in ET.parse(args.build_dir / "sitemap.xml").iter()
        if node.tag.endswith("}loc")
    }
    reachable = set()
    queue = deque(["/"])
    while queue:
        url = queue.popleft()
        if url in reachable or url not in pages:
            continue
        page = pages[url]
        if page.redirect or page.noindex:
            continue
        reachable.add(url)
        queue.extend(page.links - reachable)

    errors = []
    opener = build_opener(NoRedirects())
    http_checks = 0
    rules = {}
    for line in (ROOT / "deploy/ahrefs-orphan-redirects.caddy").read_text().splitlines():
        if line.startswith("redir "):
            _, source, target, code = line.split()
            if source in rules:
                errors.append(f"Duplicate Caddy route: {source}")
            rules[source] = (target, code)

    for case in cases:
        url, action = case["url"], case["action"]
        page = pages.get(url)
        start = len(errors)
        if page is None:
            errors.append(f"Missing rendered page: {url}")
            continue
        if action == "linked":
            source = case["link_from"]
            if page.noindex or page.redirect or url not in sitemap:
                errors.append(f"Linked content must remain indexable and in sitemap: {url}")
            if source not in reachable:
                errors.append(f"Link source cannot be reached from the homepage: {source}")
            if url not in pages.get(source, Page(source, "")).links:
                errors.append(f"Missing follow link: {source} -> {url}")
            if url not in reachable:
                errors.append(f"Content cannot be reached from the homepage: {url}")
        elif action in ("redirect", "noindex"):
            if not page.noindex or url in sitemap:
                errors.append(f"Expected noindex and exclusion from sitemap: {url}")
            if action == "redirect":
                target = case["target"]
                if not page.redirect or page.canonical != target:
                    errors.append(f"Missing redirect fallback/canonical: {url} -> {target}")
                if target not in pages or pages[target].redirect:
                    errors.append(f"Redirect target is missing or creates a chain: {target}")
                for variant in (url.rstrip("/"), url):
                    if rules.get(variant) != (target, "301"):
                        errors.append(f"Missing exact Caddy 301 rule: {variant}")
                    if args.http_base:
                        request_url = args.http_base.rstrip("/") + variant
                        try:
                            response = opener.open(request_url, timeout=10)
                        except HTTPError as exc:
                            response = exc
                        with response:
                            http_checks += 1
                            if response.code != 301 or response.headers.get("Location") != target:
                                errors.append(f"Wrong HTTP response for {variant}: {response.code}, {response.headers.get('Location')}")
            elif page.redirect:
                errors.append(f"Noindex page must remain directly usable: {url}")
        else:
            errors.append(f"Unresolved audit action {action!r}: {url}")
        print(f"{'PASS' if len(errors) == start else 'FAIL'} {action:8} {url}")

    print(f"\n{len(cases)} URLs: {dict(Counter(case['action'] for case in cases))}; {http_checks} HTTP redirect checks")
    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print("All audit checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
