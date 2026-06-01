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


if __name__ == "__main__":
    unittest.main()
