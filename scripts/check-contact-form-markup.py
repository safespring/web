#!/usr/bin/env python3
"""Check the shared contact form on every page in a four-language Hugo build."""

from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path
import sys
from urllib.parse import urlsplit


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.nodes = []
        self.form_nodes = []
        self.forms = []
        self.inside_form = False
        self.inside_config = False
        self.config_text = ""
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.nodes.append((tag, attrs))
        if tag == "form" and "data-contact-form" in attrs:
            self.forms.append(attrs)
            self.inside_form = True
        if self.inside_form:
            self.form_nodes.append((tag, attrs))
        if tag == "script" and "data-contact-config" in attrs:
            self.inside_config = True

    def handle_endtag(self, tag):
        if tag == "form":
            self.inside_form = False
        if tag == "script":
            self.inside_config = False

    def handle_data(self, data):
        if self.inside_config:
            self.config_text += data


def check_page(file, root, deployment):
    page = Page(file.read_text())
    if not page.forms:
        return None
    lang = file.relative_to(root).parts[0]
    assert lang in {"sv", "en", "nb", "da"}, "unexpected language directory"
    assert len(page.forms) == 1, "multiple shared contact forms"
    form = page.forms[0]
    config = json.loads(page.config_text)
    for key in ("integrationReady", "submissionUrl", "analyticsSites", "fieldNames", "blockedEmailDomains", "blockedEmailProviders"):
        assert config.get(key) == deployment.get(key), f"missing or stale configuration: {key}"
    assert config["language"] == config["copy"]["lang"] == lang, "wrong form language"
    assert form["action"] == "#up-form", "form must submit through its guarded handler"
    fields = {a["id"]: a for tag, a in page.form_nodes if tag in {"input", "textarea"} and "id" in a}
    required = {name for name, attrs in fields.items() if "required" in attrs}
    expected = {"up-email-input", "up-client-name-input"}
    containers = "contact-form--containers" in form.get("class", "")
    if not containers:
        expected.add("accept-usage")
    assert required == expected, f"unexpected required fields: {required}"
    assert "up-firstname-input" in fields and "up-lastname-input" in fields
    assert not any(attrs.get("type") == "tel" for attrs in fields.values()), "legacy phone field"
    message = fields["up-message-input"]
    assert message.get("maxlength") == "512" and message.get("placeholder") == config["copy"]["messageHint"]
    assert "up-message-error" in message.get("aria-describedby", "").split()
    ids = Counter(a["id"] for _, a in page.nodes if "id" in a)
    for _, attrs in page.form_nodes:
        if "id" in attrs:
            assert ids[attrs["id"]] == 1, f"duplicate form ID: {attrs['id']}"
        for target in attrs.get("aria-describedby", "").split():
            assert target in ids, f"missing accessible description: {target}"
    for tag, attrs in page.form_nodes:
        if tag == "use":
            assert attrs.get("href", "").removeprefix("#") in ids, "missing SVG icon symbol"
    success = urlsplit(form["data-success-url"])
    assert not success.netloc and success.path == "/contact-thanks/", "wrong thank-you route"
    site = root / lang
    assert (site / success.path.lstrip("/") / "index.html").is_file(), "missing thank-you page"
    if not containers:
        privacy = [a["href"] for tag, a in page.form_nodes if tag == "a" and "privacy_policy_web_recruitment" in a.get("href", "")]
        assert len(privacy) == 1 and not urlsplit(privacy[0]).netloc, "wrong privacy link"
        assert (site / privacy[0].lstrip("/") / "index.html").is_file(), "missing privacy page"
    styles = [a["href"] for tag, a in page.nodes if tag == "link" and "/css/contact-form.min." in a.get("href", "")]
    assert len(styles) == 1 and (site / styles[0].lstrip("/")).is_file(), "missing form CSS"
    scripts = [a["src"] for tag, a in page.nodes if tag == "script" and a.get("src", "").endswith("/js/contact-form.js")]
    assert len(scripts) == 1 and (site / scripts[0].lstrip("/")).is_file(), "missing or repeated form handler"
    return lang


def main():
    root = Path(sys.argv[1] if len(sys.argv) > 1 else "public").resolve()
    deployment = json.loads((Path(__file__).resolve().parents[1] / "data/contact_form.json").read_text())
    counts = Counter()
    failures = []
    for file in root.rglob("*.html"):
        try:
            lang = check_page(file, root, deployment)
            if lang:
                counts[lang] += 1
        except (AssertionError, KeyError, ValueError) as error:
            failures.append(f"{file.relative_to(root)}: {error}")
    if set(counts) != {"sv", "en", "nb", "da"}:
        failures.append(f"Expected contact forms in all four languages; found {dict(counts)}")
    if failures:
        print("\n".join(failures), file=sys.stderr)
        return 1
    print(f"Contact form markup passed: {sum(counts.values())} pages; " + ", ".join(f"{lang}={counts[lang]}" for lang in sorted(counts)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
