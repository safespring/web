import re
import subprocess
import tempfile
import unittest
from pathlib import Path


NOINDEX_META = re.compile(r'<meta\s+name=["\']?robots["\']?\s+content=["\']?noindex["\']?')


class NoindexCleanupTest(unittest.TestCase):
    def test_noindex_meta_and_sitemap_only_for_intended_pages(self):
        repo_root = Path(__file__).resolve().parents[1]

        intended_noindex_pages = {
            "en/documents/sunet-drive-file-sync-and-share-solution/index.html": "https://beta.safespring.eu/documents/sunet-drive-file-sync-and-share-solution/",
            "en/contact-thanks/index.html": "https://beta.safespring.eu/contact-thanks/",
            "en/onboarding/success/index.html": "https://beta.safespring.eu/en/onboarding/success/",
            "en/geant/index.html": "https://beta.safespring.eu/geant/",
            "en/documents/safespring-swamid-privacy-policy/index.html": "https://beta.safespring.eu/documents/safespring-swamid-privacy-policy/",
            "en/onboarding/safespring-onboarding/index.html": "https://beta.safespring.eu/onboarding/safespring-onboarding/",
            "en/internal/index.html": "https://beta.safespring.eu/en/internal/",
        }
        non_rendered_fragment_pages = {
            "en/read-more/index.html": "https://beta.safespring.eu/read-more/",
            "en/read-more/iaas-vs-colocation/index.html": "https://beta.safespring.eu/read-more/iaas-vs-colocation/",
        }
        intended_indexable_pages = {
            "en/services/index.html": "https://beta.safespring.eu/services/",
        }

        with tempfile.TemporaryDirectory() as output_dir:
            subprocess.run(
                ["hugo", "--destination", output_dir, "--quiet"],
                cwd=repo_root,
                check=True,
            )

            output_root = Path(output_dir)
            sitemap = (output_root / "en/sitemap.xml").read_text(encoding="utf-8")

            for page_path, page_url in intended_noindex_pages.items():
                page = output_root / page_path
                self.assertTrue(page.exists(), f"{page_path} should render")
                self.assertRegex(page.read_text(encoding="utf-8"), NOINDEX_META)
                self.assertNotIn(f"<loc>{page_url}</loc>", sitemap)

            for page_path, page_url in non_rendered_fragment_pages.items():
                self.assertFalse((output_root / page_path).exists(), f"{page_path} should not render as a standalone page")
                self.assertNotIn(f"<loc>{page_url}</loc>", sitemap)

            self.assertFalse((output_root / "en/read-more/index.xml").exists())

            for page_path, page_url in intended_indexable_pages.items():
                page = output_root / page_path
                self.assertTrue(page.exists(), f"{page_path} should render")
                self.assertNotRegex(page.read_text(encoding="utf-8"), NOINDEX_META)
                self.assertIn(f"<loc>{page_url}</loc>", sitemap)

    def test_all_content_noindex_frontmatter_is_boolean(self):
        repo_root = Path(__file__).resolve().parents[1]

        for path in sorted((repo_root / "content").rglob("*.md")):
            for line_number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
                if line.startswith("noindex:"):
                    self.assertIn(
                        line,
                        {"noindex: true", "noindex: false"},
                        f"{path.relative_to(repo_root)}:{line_number} should use boolean true or false",
                    )

    def test_sitemap_templates_use_noindex_or_internal_rule(self):
        repo_root = Path(__file__).resolve().parents[1]
        rule = '(or (eq .Params.noindex true) (eq .Section "internal") (eq .Section "read-more"))'

        for template_path in ("layouts/_default/sitemap.xml", "layouts/index.xml"):
            template = (repo_root / template_path).read_text(encoding="utf-8")
            self.assertIn(rule, template)


if __name__ == "__main__":
    unittest.main()
