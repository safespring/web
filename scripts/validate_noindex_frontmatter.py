#!/usr/bin/env python3
"""Validate noindex frontmatter uses boolean values only."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


VALID_VALUES = {"true", "false"}


def iter_frontmatter_lines(path: Path):
    try:
        lines = path.read_text(encoding="utf-8").splitlines()
    except UnicodeDecodeError as exc:
        raise RuntimeError(f"{path}: cannot decode as UTF-8: {exc}") from exc

    if not lines or lines[0].strip() != "---":
        return

    for line_number, line in enumerate(lines[1:], start=2):
        if line.strip() == "---":
            return
        yield line_number, line


def validate_content(content_dir: Path) -> list[str]:
    errors: list[str] = []

    for path in sorted(content_dir.rglob("*.md")):
        for line_number, line in iter_frontmatter_lines(path) or ():
            stripped = line.lstrip()
            if not stripped.startswith("noindex:"):
                continue

            value = stripped.split(":", 1)[1].strip()
            if value in VALID_VALUES:
                continue

            display_value = value if value else "<empty>"
            errors.append(
                f"{path}:{line_number}: invalid noindex value {display_value!r}; "
                "use noindex: true or noindex: false"
            )

    return errors


def parse_args(argv: list[str]) -> argparse.Namespace:
    repo_root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(
        description="Validate noindex frontmatter values in Markdown content."
    )
    parser.add_argument(
        "content_dir",
        nargs="?",
        default=repo_root / "content",
        type=Path,
        help="Content directory to scan (default: content/ relative to repo root).",
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv or sys.argv[1:])
    content_dir = args.content_dir

    if not content_dir.exists():
        print(f"{content_dir}: content directory does not exist", file=sys.stderr)
        return 2

    errors = validate_content(content_dir)
    if errors:
        print("Invalid noindex frontmatter values:", file=sys.stderr)
        for error in errors:
            print(f"  {error}", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
