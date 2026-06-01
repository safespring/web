#!/usr/bin/env python3
"""Crawl a local Hugo site and report links plus sitemap gaps."""

from __future__ import annotations

import argparse
import json
import sys
import time
import xml.etree.ElementTree as ET
from collections import defaultdict, deque
from dataclasses import dataclass
from html.parser import HTMLParser
from typing import DefaultDict
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urldefrag, urljoin, urlparse, urlunparse
from urllib.request import Request, urlopen


IGNORED_PATH_PREFIXES = ("/admin/", "/login/")
SKIPPED_SCHEMES = {"mailto", "tel", "javascript", "data", "sms"}
ASSET_EXTENSIONS = {
    ".7z",
    ".avif",
    ".bmp",
    ".css",
    ".csv",
    ".doc",
    ".docx",
    ".eot",
    ".gif",
    ".ico",
    ".jpeg",
    ".jpg",
    ".js",
    ".json",
    ".map",
    ".mp3",
    ".mp4",
    ".ods",
    ".odt",
    ".otf",
    ".pdf",
    ".png",
    ".ppt",
    ".pptx",
    ".rar",
    ".rss",
    ".svg",
    ".tar",
    ".tgz",
    ".ttf",
    ".txt",
    ".webm",
    ".webp",
    ".woff",
    ".woff2",
    ".xls",
    ".xlsx",
    ".xml",
    ".zip",
}


class LinkParser(HTMLParser):
    """Collect every anchor href in source order."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.links: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() != "a":
            return
        for name, value in attrs:
            if name.lower() == "href" and value is not None:
                self.links.append(value.strip())


@dataclass(frozen=True)
class FetchResult:
    url: str
    status: int | None
    content_type: str
    body: bytes
    error: str | None = None


@dataclass(frozen=True)
class LinkOccurrence:
    source: str
    target: str
    raw_href: str
    kind: str


def normalize_url(url: str) -> str:
    """Normalize URL for dedupe/comparison, preserving root slash."""
    url, _fragment = urldefrag(url.strip())
    parsed = urlparse(url)
    scheme = parsed.scheme.lower()
    netloc = parsed.netloc.lower()
    path = parsed.path or "/"
    if path != "/" and path.endswith("/"):
        path = path.rstrip("/")
    path = quote(path, safe="/%:@")
    query = quote(parsed.query, safe="=&?/:;%+@,")
    return urlunparse((scheme, netloc, path, "", query, ""))


def display_url(url: str) -> str:
    return normalize_url(url)


def is_skipped_scheme(url: str) -> bool:
    return urlparse(url).scheme.lower() in SKIPPED_SCHEMES


def is_flagged_external_url(url: str) -> bool:
    host = urlparse(url).netloc.lower()
    return host in {"safespring.com", "www.safespring.com", "safespring.se", "www.safespring.se"}


def is_ignored_path(path: str) -> bool:
    normalized = path if path.startswith("/") else f"/{path}"
    return any(normalized == prefix.rstrip("/") or normalized.startswith(prefix) for prefix in IGNORED_PATH_PREFIXES)


def is_asset_path(path: str) -> bool:
    lowered = path.lower()
    return any(lowered.endswith(ext) for ext in ASSET_EXTENSIONS)


def same_host(url: str, base_url: str) -> bool:
    return urlparse(url).netloc.lower() == urlparse(base_url).netloc.lower()


def localize_internal_url(url: str, base_url: str, internal_hosts: set[str]) -> str:
    """Convert known site hosts to local crawl host."""
    parsed = urlparse(normalize_url(url))
    if parsed.netloc.lower() not in {host.lower() for host in internal_hosts}:
        return normalize_url(url)
    base = urlparse(normalize_url(base_url))
    return normalize_url(urlunparse((base.scheme, base.netloc, parsed.path or "/", "", parsed.query, "")))


def rebase_sitemap_url(url: str, base_url: str) -> str:
    """Map sitemap loc URL onto local crawl host, preserving path/query."""
    sitemap = urlparse(normalize_url(url))
    base = urlparse(normalize_url(base_url))
    return normalize_url(urlunparse((base.scheme, base.netloc, sitemap.path or "/", "", sitemap.query, "")))


def is_page_url(url: str) -> bool:
    parsed = urlparse(url)
    return not is_asset_path(parsed.path) and not is_ignored_path(parsed.path)


def resolve_href(source_url: str, href: str) -> str | None:
    if not href or href.startswith("#"):
        return None
    absolute = urljoin(source_url, href)
    if is_skipped_scheme(absolute):
        return None
    parsed = urlparse(absolute)
    if parsed.scheme not in {"http", "https"}:
        return None
    return normalize_url(absolute)


def fetch_url(url: str, method: str = "GET", timeout: int = 10) -> FetchResult:
    request = Request(url, method=method, headers={"User-Agent": "hugo-local-crawler/1.0"})
    try:
        with urlopen(request, timeout=timeout) as response:
            return FetchResult(
                url=response.geturl(),
                status=response.status,
                content_type=response.headers.get("content-type", ""),
                body=response.read(),
            )
    except HTTPError as exc:
        try:
            body = exc.read()
        except Exception:
            body = b""
        return FetchResult(
            url=url,
            status=exc.code,
            content_type=exc.headers.get("content-type", "") if exc.headers else "",
            body=body,
            error=str(exc),
        )
    except URLError as exc:
        return FetchResult(url=url, status=None, content_type="", body=b"", error=str(exc.reason))
    except TimeoutError as exc:
        return FetchResult(url=url, status=None, content_type="", body=b"", error=str(exc))


def check_internal_url(url: str, timeout: int) -> FetchResult:
    result = fetch_url(url, method="HEAD", timeout=timeout)
    if result.status in {None, 405, 403}:
        return fetch_url(url, method="GET", timeout=timeout)
    return result


def is_html_response(result: FetchResult) -> bool:
    content_type = result.content_type.lower()
    return result.status is not None and result.status < 400 and ("text/html" in content_type or content_type == "")


def extract_links(html: bytes) -> list[str]:
    parser = LinkParser()
    parser.feed(html.decode("utf-8", errors="replace"))
    return parser.links


def load_sitemap(base_url: str, timeout: int) -> tuple[set[str], set[str]]:
    sitemap_url = urljoin(base_url, "/sitemap.xml")
    result = fetch_url(sitemap_url, timeout=timeout)
    if result.status is None or result.status >= 400:
        return set(), set()

    try:
        root = ET.fromstring(result.body)
    except ET.ParseError:
        return set(), set()

    urls: set[str] = set()
    hosts: set[str] = set()
    for loc in root.iter():
        if loc.tag.endswith("loc") and loc.text:
            parsed = urlparse(loc.text.strip())
            if parsed.netloc:
                hosts.add(parsed.netloc.lower())
            url = rebase_sitemap_url(loc.text, base_url)
            if is_page_url(url):
                urls.add(url)
    return urls, hosts


def classify(source_page: str, links: list[str], existing: set[str] | None = None) -> dict[str, dict[str, str]]:
    """Small testable classifier preserving source page metadata."""
    existing = existing or set()
    source_host = urlparse(source_page).netloc.lower()
    result: dict[str, dict[str, str]] = {}
    for href in links:
        target = resolve_href(source_page, href)
        if target is None:
            continue
        kind = "external" if urlparse(target).netloc.lower() != source_host else "internal"
        if kind == "external" or target not in existing:
            result[target] = {"source_page": source_page, "kind": kind}
    return result


def add_source(mapping: DefaultDict[str, set[str]], target: str, source: str) -> None:
    mapping[target].add(source)


def crawl(base_url: str, timeout: int = 10, max_pages: int = 0) -> dict[str, object]:
    base_url = normalize_url(base_url)
    sitemap_pages, sitemap_hosts = load_sitemap(base_url, timeout)
    internal_hosts = {urlparse(base_url).netloc.lower(), *sitemap_hosts}
    queue = deque([base_url, *sorted(sitemap_pages)])
    queued = set(queue)
    crawled: set[str] = set()
    failed_pages: dict[str, str] = {}
    occurrences: list[LinkOccurrence] = []
    external_links: DefaultDict[str, set[str]] = defaultdict(set)
    flagged_external_links: DefaultDict[str, set[str]] = defaultdict(set)
    internal_links: DefaultDict[str, set[str]] = defaultdict(set)

    while queue:
        page = queue.popleft()
        if page in crawled:
            continue
        if max_pages and len(crawled) >= max_pages:
            break

        result = fetch_url(page, timeout=timeout)
        if result.status is None or result.status >= 400:
            failed_pages[page] = result.error or f"HTTP {result.status}"
            crawled.add(page)
            continue
        if not is_html_response(result):
            crawled.add(page)
            continue

        crawled.add(page)
        resolution_base = urldefrag(result.url or page)[0]
        for raw_href in extract_links(result.body):
            target = resolve_href(resolution_base, raw_href)
            if target is None:
                continue
            target_is_internal = urlparse(target).netloc.lower() in internal_hosts
            if target_is_internal:
                target = localize_internal_url(target, base_url, internal_hosts)
            kind = "internal" if target_is_internal else "external"
            occurrences.append(LinkOccurrence(source=page, target=target, raw_href=raw_href, kind=kind))

            if target_is_internal:
                add_source(internal_links, target, page)
                if is_page_url(target) and target not in crawled and target not in queued:
                    queue.append(target)
                    queued.add(target)
            else:
                add_source(external_links, target, page)
                if is_flagged_external_url(target):
                    add_source(flagged_external_links, target, page)

    broken_internal: dict[str, dict[str, object]] = {}
    for target, sources in sorted(internal_links.items()):
        if not is_page_url(target) and is_asset_path(urlparse(target).path):
            # Assets are checked too; only ignored paths are skipped.
            pass
        if is_ignored_path(urlparse(target).path):
            continue
        result = check_internal_url(target, timeout)
        if result.status is None or result.status >= 400:
            broken_internal[target] = {
                "status": result.status,
                "error": result.error,
                "sources": sorted(sources),
            }

    pages_missing_from_sitemap = sorted(page for page in crawled if is_page_url(page) and page not in sitemap_pages)

    summary = {
        "pages_crawled": len(crawled),
        "sitemap_pages": len(sitemap_pages),
        "link_occurrences": len(occurrences),
        "unique_internal_links": len(internal_links),
        "unique_external_links": len(external_links),
        "flagged_external_links": len(flagged_external_links),
        "broken_internal_links": len(broken_internal),
        "pages_missing_from_sitemap": len(pages_missing_from_sitemap),
        "failed_pages": len(failed_pages),
    }

    return {
        "base_url": base_url,
        "summary": summary,
        "pages_crawled": sorted(crawled),
        "failed_pages": failed_pages,
        "sitemap_pages": sorted(sitemap_pages),
        "links": [occurrence.__dict__ for occurrence in occurrences],
        "external_links": {url: sorted(sources) for url, sources in sorted(external_links.items())},
        "flagged_external_links": {url: sorted(sources) for url, sources in sorted(flagged_external_links.items())},
        "broken_internal_links": broken_internal,
        "pages_missing_from_sitemap": pages_missing_from_sitemap,
    }


def print_mapping(title: str, mapping: dict[str, object]) -> None:
    print(f"\n{title}")
    print("-" * len(title))
    if not mapping:
        print("None")
        return
    for url, value in mapping.items():
        print(url)
        if isinstance(value, dict):
            status = value.get("status")
            error = value.get("error")
            if status or error:
                print(f"  status: {status} error: {error}")
            sources = value.get("sources", [])
        else:
            sources = value
        for source in sources:
            print(f"  found on: {source}")


def print_list(title: str, values: list[str]) -> None:
    print(f"\n{title}")
    print("-" * len(title))
    if not values:
        print("None")
        return
    for value in values:
        print(value)


def print_report(report: dict[str, object]) -> None:
    print("Summary")
    print("-------")
    for key, value in report["summary"].items():
        print(f"{key}: {value}")
    print_mapping("Broken internal links", report["broken_internal_links"])
    print_mapping("Flagged external links (safespring.com)", report["flagged_external_links"])
    print_mapping("External links", report["external_links"])
    print_list("Crawled pages missing from sitemap", report["pages_missing_from_sitemap"])


def write_json(path: str, report: dict[str, object]) -> None:
    with open(path, "w", encoding="utf-8") as handle:
        json.dump(report, handle, indent=2, sort_keys=True)
        handle.write("\n")


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Crawl local Hugo site for link and sitemap issues.")
    parser.add_argument("--base-url", default="http://localhost:1313/", help="Local Hugo base URL")
    parser.add_argument("--timeout", type=int, default=10, help="Request timeout in seconds")
    parser.add_argument("--max-pages", type=int, default=0, help="Max pages to crawl; 0 means unlimited")
    parser.add_argument("--json-output", help="Write machine-readable report to this path")
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv or sys.argv[1:])
    start = time.monotonic()
    report = crawl(args.base_url, timeout=args.timeout, max_pages=args.max_pages)
    report["summary"]["elapsed_seconds"] = round(time.monotonic() - start, 2)
    print_report(report)
    if args.json_output:
        write_json(args.json_output, report)
        print(f"\nJSON report written: {args.json_output}")
    broken_count = report["summary"]["broken_internal_links"]
    return 1 if broken_count else 0


if __name__ == "__main__":
    raise SystemExit(main())
