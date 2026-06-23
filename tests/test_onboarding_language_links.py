import re
import subprocess
import tempfile
import tomllib
import unittest
from pathlib import Path


class OnboardingLanguageLinksTest(unittest.TestCase):
    def test_knowledge_hub_success_links_to_generated_language_homes(self):
        repo_root = Path(__file__).resolve().parents[1]
        with (repo_root / "hugo.toml").open("rb") as config_file:
            config = tomllib.load(config_file)

        expected_home_urls = {
            lang: config["languages"][lang]["baseURL"]
            for lang in ("sv", "nb", "en", "da")
        }

        with tempfile.TemporaryDirectory() as output_dir:
            subprocess.run(
                ["hugo", "--destination", output_dir, "--quiet"],
                cwd=repo_root,
                check=True,
            )

            onboarding_pages = sorted(Path(output_dir).glob("*/onboarding/*/index.html"))
            knowledge_hub_pages = [
                page
                for page in onboarding_pages
                if "Safespring Knowledge Hub" in page.read_text(encoding="utf-8")
            ]

            self.assertEqual(len(knowledge_hub_pages), 4)

            for page in knowledge_hub_pages:
                html = page.read_text(encoding="utf-8")
                for home_url in expected_home_urls.values():
                    quoted_home_url = re.escape(home_url)
                    self.assertRegex(
                        html,
                        rf'href=(["\']?){quoted_home_url}\1(?=[\s>])',
                        f"{page} should link to {home_url}",
                    )
                self.assertIsNone(
                    re.search(r'href=(["\']?)/(?:en|no)/?\1(?=[\s>])', html),
                    f"{page} should not link to hardcoded /en or /no paths",
                )


if __name__ == "__main__":
    unittest.main()
