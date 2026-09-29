#!/usr/bin/env python3
"""Prepare compliance dates locally/CI; the production Hugo build never runs this.

Commit document edits first, run this script, then commit the resulting JSON.
--check validates the recorded dates against full Git history without writing.
Requires Python 3.11+ for the surrounding production check, not on the web server.
"""

import argparse
from datetime import datetime
import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = Path("data/compliance_history.json")


def git(root, *args):
    # cwd and %ai also work with Git 1.8.3.1; avoid -C and %aI.
    return subprocess.check_output(
        [os.environ.get("GIT_BIN", "git"), *args], cwd=root, stderr=subprocess.PIPE
    )


def collect(root):
    git_dir = Path(git(root, "rev-parse", "--git-dir").decode().strip())
    if not git_dir.is_absolute():
        git_dir = root / git_dir
    if (git_dir / "commondir").exists():
        git_dir = git_dir / (git_dir / "commondir").read_text().strip()
    if (git_dir / "shallow").exists():
        raise ValueError("Full Git history is required; fetch/unshallow before recording dates.")
    documents = {}
    for path in sorted((root / "content/compliance").rglob("*.md")):
        if path.name == "_index.md":
            continue
        source_path = path.relative_to(root).as_posix()
        source = path.read_bytes()
        if source != git(root, "show", f"HEAD:{source_path}"):
            raise ValueError(f"Commit document changes before recording dates: {source_path}")
        commit, author_date = git(
            root, "log", "-1", "--format=%H%n%ai", "--", source_path
        ).decode().strip().splitlines()
        documents[path.relative_to(root / "content").as_posix()] = {
            "author_date": datetime.strptime(author_date, "%Y-%m-%d %H:%M:%S %z").isoformat(),
            "commit": commit,
            "source_sha256": hashlib.sha256(source).hexdigest(),
        }
    if not documents:
        raise ValueError("No compliance documents found.")
    return {"schema_version": 1, "documents": documents}


def check(root):
    expected = collect(root)
    path = root / DATA_PATH
    if not path.exists() or json.loads(path.read_text()) != expected:
        raise ValueError(
            "Compliance history is missing or stale. Commit document edits, run "
            "python3 scripts/compliance_history.py, and commit data/compliance_history.json."
        )
    return expected


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    try:
        data = check(ROOT) if args.check else collect(ROOT)
        if not args.check:
            (ROOT / DATA_PATH).write_text(json.dumps(data, indent=2) + "\n")
        print(f"Compliance history: {len(data['documents'])} verified document dates")
    except (ValueError, OSError, subprocess.CalledProcessError) as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        if isinstance(exc, subprocess.CalledProcessError):
            print(exc.stderr.decode().strip(), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
