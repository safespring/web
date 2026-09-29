"""Regression checks for the production failures and inaccurate document dates."""

import importlib.util
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

SCRIPTS = Path(__file__).resolve().parents[1] / "scripts"
sys.path.insert(0, str(SCRIPTS))
import compliance_history as history

spec = importlib.util.spec_from_file_location("production", SCRIPTS / "check-production.py")
production = importlib.util.module_from_spec(spec)
spec.loader.exec_module(production)


class CompatibilityTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        (self.root / "layouts").mkdir()
        (self.root / "config.toml").write_text('enableGitInfo = false\npaginate = 10\n')

    def test_accepts_legacy_configuration(self):
        production.check_policy(self.root)

    def test_rejects_gitinfo_even_without_template_access(self):
        (self.root / "config.toml").write_text('enableGitInfo = true\n')
        with self.assertRaisesRegex(ValueError, "Git -C"):
            production.check_policy(self.root)

    def test_rejects_template_gitinfo(self):
        (self.root / "layouts/index.html").write_text('{{ with .GitInfo }}{{ .AuthorDate }}{{ end }}')
        with self.assertRaisesRegex(ValueError, r"\.GitInfo"):
            production.check_policy(self.root)

    def test_rejects_silently_ignored_pagination(self):
        (self.root / "config.toml").write_text('[pagination]\npagerSize = 10\n')
        with self.assertRaisesRegex(ValueError, "paginate/paginatePath"):
            production.check_policy(self.root)

    def test_rejects_newer_nested_permalinks(self):
        (self.root / "config.toml").write_text('[languages.en.permalinks.page]\nblog = "/blog/:slug/"\n')
        with self.assertRaisesRegex(ValueError, "Nested"):
            production.check_policy(self.root)

    def test_rejects_beta_config_file(self):
        (self.root / "hugo.toml").write_text('baseURL = "https://beta.example/"\n')
        with self.assertRaisesRegex(ValueError, "Unexpected"):
            production.check_policy(self.root)

    def test_rendered_history_parser_ignores_other_dates_and_links(self):
        component = production.HistoryComponent(
            '<time datetime="1990-01-01"></time><a href="/unrelated">Link</a>'
            '<div class="compliance-history"><div><time datetime="2026-09-29"></time></div>'
            '<a href="https://github.com/example/history">History</a></div>'
        )
        self.assertEqual(component.dates, ["2026-09-29"])
        self.assertEqual(component.links, ["https://github.com/example/history"])


class HistoryTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        (self.root / "content/compliance").mkdir(parents=True)
        (self.root / "data").mkdir()
        self.document = self.root / "content/compliance/terms.md"
        self.document.write_text('---\ntitle: Terms\n---\nOriginal terms.\n')
        self.git("init")
        self.git("config", "user.name", "Compatibility test")
        self.git("config", "user.email", "compatibility@example.invalid")
        self.git("add", "content")
        self.commit("First terms", "2024-02-03T23:30:00-05:00")
        self.record()

    def git(self, *args, env=None):
        return subprocess.run([os.environ.get("GIT_BIN", "git"), *args],
                              cwd=self.root, env=env, check=True, capture_output=True)

    def commit(self, message, date):
        env = {**os.environ, "GIT_AUTHOR_DATE": date, "GIT_COMMITTER_DATE": date}
        self.git("-c", "commit.gpgsign=false", "commit", "-m", message, env=env)

    def record(self):
        data = history.collect(self.root)
        (self.root / history.DATA_PATH).write_text(json.dumps(data))
        return data

    def test_preserves_author_date_and_offset(self):
        data = history.check(self.root)
        self.assertEqual(data["documents"]["compliance/terms.md"]["author_date"],
                         "2024-02-03T23:30:00-05:00")

    def test_rejects_uncommitted_document(self):
        self.document.write_text("Changed terms")
        with self.assertRaisesRegex(ValueError, "Commit document changes"):
            history.collect(self.root)

    def test_rejects_stale_date_after_document_commit(self):
        self.document.write_text("Changed terms")
        self.git("add", "content")
        self.commit("Update terms", "2024-04-05T12:00:00+02:00")
        with self.assertRaisesRegex(ValueError, "missing or stale"):
            history.check(self.root)
        self.record()
        history.check(self.root)

    def test_rejects_shallow_history(self):
        (self.root / ".git/shallow").write_bytes(self.git("rev-parse", "HEAD").stdout)
        with self.assertRaisesRegex(ValueError, "Full Git history"):
            history.collect(self.root)

    def test_unrelated_commit_does_not_change_document_date(self):
        (self.root / "README.md").write_text("Unrelated documentation")
        self.git("add", "README.md")
        self.commit("Readme", "2025-01-01T12:00:00+00:00")
        history.check(self.root)


if __name__ == "__main__":
    unittest.main()
