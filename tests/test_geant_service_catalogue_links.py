import re
import subprocess
import tempfile
import unittest
from pathlib import Path


class GeantServiceCatalogueLinksTest(unittest.TestCase):
    def test_research_pages_link_to_generated_service_catalogue_pages(self):
        repo_root = Path(__file__).resolve().parents[1]

        cases = {
            "en/industries/safespring-cloud-platform-for-research-and-education/index.html": "/geant/",
            "sv/branscher/utbildning-och-forskning/index.html": "/geant/",
            "nb/industrier/utdanning-og-forskning/index.html": "/geant/service-catalogue/",
            "da/industrier/forskning-og-uddannelse/index.html": "/geant/service-catalogue/",
        }

        with tempfile.TemporaryDirectory() as output_dir:
            subprocess.run(
                ["hugo", "--destination", output_dir, "--quiet"],
                cwd=repo_root,
                check=True,
            )

            output_root = Path(output_dir)
            for page_path, catalogue_url in cases.items():
                page = output_root / page_path
                self.assertTrue(page.exists(), f"{page_path} should render")

                html = page.read_text(encoding="utf-8")
                self.assertRegex(
                    html,
                    rf'href=(["\']?){re.escape(catalogue_url)}\1(?=[\s>])',
                    f"{page_path} should link to {catalogue_url}",
                )

            for child_page in sorted((output_root / "en/geant").glob("*/index.html")):
                html = child_page.read_text(encoding="utf-8")
                self.assertIsNone(
                    re.search(r'href=(["\']?)/geant/service-catalogue/?\1(?=[\s>])', html),
                    f"{child_page.relative_to(output_root)} should not link to the broken root /geant/service-catalogue path",
                )


if __name__ == "__main__":
    unittest.main()
