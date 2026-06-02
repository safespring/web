import unittest
from urllib.parse import urljoin


try:
    from scripts import crawl_hugo
except ImportError:  # pragma: no cover - expected until script exists
    crawl_hugo = None


class CrawlHugoTest(unittest.TestCase):
    def test_import_script_module(self):
        self.assertIsNotNone(crawl_hugo, "scripts/crawl_hugo.py must exist")

    def test_normalize_url_strips_fragment_and_trailing_slash(self):
        self.assertTrue(hasattr(crawl_hugo, "normalize_url"), "normalize_url missing")
        self.assertEqual(
            crawl_hugo.normalize_url("https://example.com/docs/page/#section"),
            "https://example.com/docs/page",
        )
        self.assertEqual(
            crawl_hugo.normalize_url("https://example.com/docs/page/"),
            "https://example.com/docs/page",
        )

    def test_link_parser_extracts_every_anchor_href(self):
        self.assertTrue(hasattr(crawl_hugo, "LinkParser"), "LinkParser missing")
        html = '<a href="/one">1</a><a href="/two#frag">2</a><a href="https://x.test/three/">3</a>'
        parser = crawl_hugo.LinkParser()
        parser.feed(html)
        self.assertEqual(parser.links, ["/one", "/two#frag", "https://x.test/three/"])

    def test_extract_links_includes_window_location_href_assignments(self):
        html = b'''
            <button onclick="window.location.href='/demo'">Book demo</button>
            <script>window.location.href = "/contact";</script>
        '''

        self.assertEqual(crawl_hugo.extract_links(html), ["/demo", "/contact"])

    def test_classify_keeps_source_for_external_and_broken_internal_links(self):
        self.assertTrue(hasattr(crawl_hugo, "classify"), "classify missing")
        classify = crawl_hugo.classify
        page = "https://example.com/docs/page"
        internal_ok = urljoin(page, "/docs/other")
        external = "https://other.test/path"
        broken_internal = urljoin(page, "/docs/missing")

        # Expected behavior: collection/classification keeps source page metadata.
        result = classify(page, [internal_ok, external, broken_internal], existing={internal_ok})

        self.assertIn(external, result)
        self.assertIn(broken_internal, result)
        self.assertEqual(result[external]["source_page"], page)
        self.assertEqual(result[broken_internal]["source_page"], page)

    def test_sitemap_urls_are_rebased_to_local_host_for_comparison(self):
        self.assertTrue(hasattr(crawl_hugo, "rebase_sitemap_url"), "rebase_sitemap_url missing")
        self.assertEqual(
            crawl_hugo.rebase_sitemap_url(
                "https://beta.safespring.eu/en/services/?utm=ignored",
                "http://localhost:1313/",
            ),
            "http://localhost:1313/en/services?utm=ignored",
        )

    def test_absolute_sitemap_hosts_are_treated_as_internal_local_urls(self):
        self.assertTrue(hasattr(crawl_hugo, "localize_internal_url"), "localize_internal_url missing")
        self.assertEqual(
            crawl_hugo.localize_internal_url(
                "https://beta.safespring.se/sv/tjanster/",
                "http://localhost:1313/",
                {"beta.safespring.se"},
            ),
            "http://localhost:1313/sv/tjanster",
        )

    def test_normalize_url_encodes_spaces_in_paths(self):
        self.assertEqual(
            crawl_hugo.normalize_url("http://localhost:1313/documents/general terms.pdf"),
            "http://localhost:1313/documents/general%20terms.pdf",
        )

    def test_safespring_apex_and_www_external_links_are_flagged(self):
        self.assertTrue(hasattr(crawl_hugo, "is_flagged_external_url"), "is_flagged_external_url missing")
        self.assertTrue(crawl_hugo.is_flagged_external_url("https://safespring.com/path"))
        self.assertTrue(crawl_hugo.is_flagged_external_url("https://www.safespring.com/path"))
        self.assertTrue(crawl_hugo.is_flagged_external_url("https://safespring.se/path"))
        self.assertTrue(crawl_hugo.is_flagged_external_url("https://www.safespring.se/path"))
        self.assertFalse(crawl_hugo.is_flagged_external_url("https://docs.safespring.com/path"))
        self.assertFalse(crawl_hugo.is_flagged_external_url("https://status.safespring.com/path"))
        self.assertFalse(crawl_hugo.is_flagged_external_url("https://next.safespring.com/path"))
        self.assertFalse(crawl_hugo.is_flagged_external_url("https://beta.safespring.se/path"))
        self.assertFalse(crawl_hugo.is_flagged_external_url("https://evil-safespring.com/path"))

    def test_output_violation_check_flags_literal_relref_and_markdown_hrefs(self):
        self.assertTrue(hasattr(crawl_hugo, "find_output_violations"), "find_output_violations missing")
        html = b'''
            <a href>empty href leaked</a>
            <a href="">empty href string leaked</a>
            <a href="{{ relref . \"/contact.md\" }}">broken shortcode</a>
            <a href="/services/compute.md">markdown path leaked</a>
            <a href="https://github.com/org/repo/blob/main/README.md">external markdown ok</a>
            <a href="/services/compute/">ok</a>
        '''

        result = crawl_hugo.find_output_violations("http://localhost:1313/source", html)

        self.assertEqual(
            result["unrendered_relref"],
            [{"source": "http://localhost:1313/source", "match": "relref"}],
        )
        self.assertEqual(
            result["markdown_href"],
            [
                {
                    "source": "http://localhost:1313/source",
                    "raw_href": "/services/compute.md",
                }
            ],
        )
        self.assertEqual(
            result["empty_href"],
            [
                {"source": "http://localhost:1313/source", "raw_href": ""},
                {"source": "http://localhost:1313/source", "raw_href": ""},
            ],
        )


if __name__ == "__main__":
    unittest.main()
