import subprocess
import tempfile
import unittest
from pathlib import Path


class ValidateNoindexFrontmatterTest(unittest.TestCase):
    def run_validator(self, content_dir: Path):
        repo_root = Path(__file__).resolve().parents[1]
        return subprocess.run(
            [
                "python3",
                str(repo_root / "scripts/validate_noindex_frontmatter.py"),
                str(content_dir),
            ],
            cwd=repo_root,
            text=True,
            capture_output=True,
        )

    def test_boolean_noindex_values_pass(self):
        with tempfile.TemporaryDirectory() as tmp:
            content_dir = Path(tmp) / "content"
            content_dir.mkdir()
            (content_dir / "valid.md").write_text(
                "---\ntitle: Valid\nnoindex: true\n---\nBody noindex: \"yes\" ignored\n",
                encoding="utf-8",
            )
            (content_dir / "also-valid.md").write_text(
                "---\ntitle: Also valid\nnoindex: false\n---\n",
                encoding="utf-8",
            )

            result = self.run_validator(content_dir)

            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(result.stderr, "")

    def test_invalid_noindex_values_fail_with_actionable_errors(self):
        invalid_values = ['"ja"', '"yes"', '"noindex"', "", "nope"]

        with tempfile.TemporaryDirectory() as tmp:
            content_dir = Path(tmp) / "content"
            content_dir.mkdir()
            for index, value in enumerate(invalid_values, start=1):
                suffix = f" {value}" if value else ""
                (content_dir / f"invalid-{index}.md").write_text(
                    f"---\ntitle: Invalid {index}\nnoindex:{suffix}\n---\n",
                    encoding="utf-8",
                )

            result = self.run_validator(content_dir)

            self.assertNotEqual(result.returncode, 0)
            for index, value in enumerate(invalid_values, start=1):
                self.assertIn(f"invalid-{index}.md:3", result.stderr)
                self.assertIn(value or "<empty>", result.stderr)
            self.assertIn("use noindex: true or noindex: false", result.stderr)

    def test_noindex_outside_frontmatter_is_ignored(self):
        with tempfile.TemporaryDirectory() as tmp:
            content_dir = Path(tmp) / "content"
            content_dir.mkdir()
            (content_dir / "body.md").write_text(
                "---\ntitle: Body\n---\nnoindex: \"yes\"\n",
                encoding="utf-8",
            )

            result = self.run_validator(content_dir)

            self.assertEqual(result.returncode, 0, result.stderr)

    def test_regular_build_runs_validator_before_pdf_and_hugo(self):
        repo_root = Path(__file__).resolve().parents[1]
        build_script = (repo_root / "scripts/build-site.sh").read_text(encoding="utf-8")

        validator = "python3 scripts/validate_noindex_frontmatter.py"
        self.assertIn(validator, build_script)
        self.assertLess(build_script.index(validator), build_script.index("npm run pdf:compliance"))
        self.assertLess(build_script.index(validator), build_script.index('hugo "$@"'))

    def test_missing_content_directory_exits_two(self):
        with tempfile.TemporaryDirectory() as tmp:
            missing_dir = Path(tmp) / "missing"

            result = self.run_validator(missing_dir)

            self.assertEqual(result.returncode, 2)
            self.assertIn("content directory does not exist", result.stderr)


if __name__ == "__main__":
    unittest.main()
