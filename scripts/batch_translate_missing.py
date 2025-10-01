#!/usr/bin/env python3

"""
Batch-translate missing Hugo content pages by orchestrating scripts/translate_page.py.

- Scans content/<lang>/ for .md files across configured languages
- Computes union of base relative paths (after content/<lang>/)
- For each missing language file, copies from a preferred source language file and
  invokes the single-file translator to translate in-place
- Runs translation jobs in parallel with a bounded worker pool
- Defaults to plan-only mode for safety (use --execute to run translations)

Example usage:
    python3 scripts/batch_translate_missing.py --execute --workers 6
    python3 scripts/batch_translate_missing.py --execute --limit 5 --dry-run

No external dependencies beyond the Python standard library.
"""

import argparse
import concurrent.futures
import os
import sys
import traceback
from dataclasses import dataclass
from typing import Dict, Iterable, List, Optional, Set, Tuple
import subprocess

# Repository root (assumed parent of scripts/)
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_CONTENT_ROOT = "content"
DEFAULT_LANGS = ("sv", "en", "nb", "da")
DEFAULT_PREFER_SOURCE = ("en", "sv", "nb", "da")
TRANSLATE_SCRIPT_ABS = os.path.join(REPO_ROOT, "scripts", "translate_page.py")


@dataclass(frozen=True)
class Job:
    base_rel_path: str  # e.g., "documents/acceptable-use-policy.md"
    target_lang: str    # e.g., "da"
    source_lang: str    # e.g., "en"
    source_abs: str     # absolute path to source file
    target_abs: str     # absolute path to target file to create/translate


@dataclass
class Plan:
    jobs: List[Job]
    total_bases: int
    missing_before: int  # total missing files before execution (sum over bases)


def parse_csv_list(value: str) -> List[str]:
    items = [v.strip() for v in value.split(",") if v.strip()]
    return items


def is_markdown_file(path: str) -> bool:
    return path.lower().endswith(".md")


def to_abs(path: str) -> str:
    return path if os.path.isabs(path) else os.path.abspath(path)


def build_lang_to_bases(content_root_abs: str, langs: Iterable[str]) -> Dict[str, Set[str]]:
    lang_map: Dict[str, Set[str]] = {lang: set() for lang in langs}
    for lang in langs:
        lang_dir = os.path.join(content_root_abs, lang)
        if not os.path.isdir(lang_dir):
            # Treat as empty; directory might not exist yet
            continue
        for root, _dirs, files in os.walk(lang_dir):
            for fname in files:
                if not is_markdown_file(fname):
                    continue
                abs_path = os.path.join(root, fname)
                # compute base relative path after content/<lang>/
                rel_after_lang = os.path.relpath(abs_path, lang_dir)
                rel_after_lang = rel_after_lang.replace("\\", "/")
                lang_map[lang].add(rel_after_lang)
    return lang_map


def choose_source_for_base(base: str, lang_map: Dict[str, Set[str]], prefer_order: List[str]) -> Optional[Tuple[str, str]]:
    """Return (source_lang, source_abs_path) for the first available source in prefer_order.
    If none exist, return None.
    """
    for src_lang in prefer_order:
        if base in lang_map.get(src_lang, set()):
            source_abs = os.path.join(REPO_ROOT, DEFAULT_CONTENT_ROOT, src_lang, base)
            return src_lang, source_abs
    return None


def compute_plan(
    content_root_abs: str,
    langs: List[str],
    prefer_source: List[str],
) -> Plan:
    lang_map = build_lang_to_bases(content_root_abs, langs)
    all_bases: Set[str] = set()
    for s in lang_map.values():
        all_bases.update(s)

    # stable ordering for determinism
    sorted_bases = sorted(all_bases)

    jobs: List[Job] = []
    missing_before = 0

    for base in sorted_bases:
        have_langs = {lang for lang in langs if base in lang_map.get(lang, set())}
        missing_langs = [lang for lang in langs if lang not in have_langs]
        if not missing_langs:
            continue
        missing_before += len(missing_langs)

        src_info = choose_source_for_base(base, lang_map, prefer_source)
        if not src_info:
            # No source available across preferred order; skip (cannot create)
            continue
        src_lang, src_abs = src_info
        for tgt_lang in missing_langs:
            target_abs = os.path.join(content_root_abs, tgt_lang, base)
            jobs.append(
                Job(
                    base_rel_path=base,
                    target_lang=tgt_lang,
                    source_lang=src_lang,
                    source_abs=src_abs,
                    target_abs=target_abs,
                )
            )

    return Plan(jobs=jobs, total_bases=len(sorted_bases), missing_before=missing_before)


def ensure_parent_dir(path: str) -> None:
    parent = os.path.dirname(path)
    if parent and not os.path.isdir(parent):
        os.makedirs(parent, exist_ok=True)


def read_text(abs_path: str) -> str:
    with open(abs_path, "r", encoding="utf-8") as f:
        return f.read()


def write_text(abs_path: str, text: str) -> None:
    with open(abs_path, "w", encoding="utf-8") as f:
        f.write(text)


def rel_from_repo(path_abs: str) -> str:
    try:
        return os.path.relpath(path_abs, REPO_ROOT)
    except Exception:
        return path_abs


def run_translator(target_abs: str, *, cwd: Optional[str] = None) -> None:
    # Use absolute path to translator; run from repo root to help env discovery
    cmd = [TRANSLATE_SCRIPT_ABS, target_abs]
    subprocess.run(cmd, check=True, text=True, cwd=cwd or REPO_ROOT)


def log(msg: str) -> None:
    print(msg)


def verbose_log(enabled: bool, msg: str) -> None:
    if enabled:
        log(msg)


def execute_job(job: Job, *, dry_run: bool, verbose: bool) -> Tuple[str, bool, str]:
    """Execute a single job.
    Returns a tuple: (target_abs, success, message)
    """
    target_rel = rel_from_repo(job.target_abs)
    source_rel = rel_from_repo(job.source_abs)
    try:
        if os.path.exists(job.target_abs):
            # Should not happen by plan, but guard for idempotency
            return job.target_abs, True, f"SKIP exists: {target_rel}"
        if dry_run:
            return job.target_abs, True, f"DRY create+translate {job.target_lang} <- {job.source_lang}: {target_rel} (from {source_rel})"
        ensure_parent_dir(job.target_abs)
        content = read_text(job.source_abs)
        write_text(job.target_abs, content)
        # Invoke translator to translate in-place (target lang inferred from path)
        run_translator(job.target_abs, cwd=REPO_ROOT)
        return job.target_abs, True, f"OK {job.target_lang}: {target_rel} (from {job.source_lang})"
    except subprocess.CalledProcessError as cpe:
        return job.target_abs, False, f"FAIL translate {target_rel}: exit {cpe.returncode}"
    except Exception as exc:
        return job.target_abs, False, f"FAIL {target_rel}: {exc}"


def print_plan(plan: Plan, *, verbose: bool) -> None:
    log("Plan:")
    if not plan.jobs:
        log("  No missing files. Nothing to do.")
        return
    for job in plan.jobs:
        target_rel = rel_from_repo(job.target_abs)
        source_rel = rel_from_repo(job.source_abs)
        log(f"  CREATE {job.target_lang}: {target_rel}  <- from {job.source_lang}: {source_rel}")
    verbose_log(verbose, f"Total bases: {plan.total_bases}")
    log(f"Missing before: {plan.missing_before}; to create: {len(plan.jobs)}. Run with --execute to run translations.")


def run_plan(
    plan: Plan,
    *,
    dry_run: bool,
    workers: int,
    limit: Optional[int],
    verbose: bool,
) -> Tuple[int, int, int, int]:
    """Execute the plan with concurrency.

    Returns metrics: (created, translated, skipped, failures)
    Note: In dry_run, created=translated=skipped=failures=0
    """
    if dry_run:
        return 0, 0, 0, 0

    if not plan.jobs:
        return 0, 0, 0, 0

    jobs = plan.jobs
    if limit is not None:
        jobs = jobs[: max(0, int(limit))]

    created = 0
    translated = 0
    skipped = 0
    failures = 0

    log(f"Executing {len(jobs)} job(s) with workers={workers}...")

    with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as pool:
        future_to_job = {
            pool.submit(execute_job, job, dry_run=False, verbose=verbose): job for job in jobs
        }
        for fut in concurrent.futures.as_completed(future_to_job):
            job = future_to_job[fut]
            try:
                _target_abs, success, message = fut.result()
            except Exception as exc:
                success = False
                message = f"FAIL {rel_from_repo(job.target_abs)}: {exc}\n" + traceback.format_exc()
            log(message)
            if message.startswith("SKIP"):
                skipped += 1
            elif success:
                created += 1
                translated += 1
            else:
                failures += 1

    return created, translated, skipped, failures


def build_arg_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "Batch-translate missing Hugo pages by copying from a preferred source language "
            "and invoking scripts/translate_page.py on each created file. "
            "Defaults to plan-only mode for safety."
        )
    )
    p.add_argument(
        "--content-root",
        default=DEFAULT_CONTENT_ROOT,
        help="Path to the content directory (default: content). Can be absolute or relative to repo root.",
    )
    p.add_argument(
        "--langs",
        default=",".join(DEFAULT_LANGS),
        help="Comma-separated languages to consider (default: sv,en,nb,da)",
    )
    p.add_argument(
        "--prefer-source",
        default=",".join(DEFAULT_PREFER_SOURCE),
        help="Comma-separated source language preference order (default: en,sv,nb,da)",
    )
    p.add_argument(
        "--workers",
        type=int,
        default=4,
        help="Number of concurrent translation workers (default: 4)",
    )
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="Only print actions; do not create files or call translator.",
    )
    p.add_argument(
        "--limit",
        type=int,
        help="Limit the number of translation jobs executed (useful for testing).",
    )
    p.add_argument(
        "--execute",
        action="store_true",
        help="Execute the translation plan (default: \"plan-only\" mode for safety).",
    )
    p.add_argument(
        "--verbose",
        action="store_true",
        help="Enable verbose logs.",
    )
    return p


def main(argv: List[str]) -> int:
    parser = build_arg_parser()
    args = parser.parse_args(argv)

    langs = parse_csv_list(args.langs)
    prefer_source = parse_csv_list(args.prefer_source)

    # Validate langs
    if not langs:
        parser.error("--langs must include at least one language")
    if not all(len(l) > 0 for l in langs):
        parser.error("--langs contains an empty item")

    # Validate prefer_source entries are among langs (not strictly required, but helpful)
    invalid_sources = [s for s in prefer_source if s not in langs]
    if invalid_sources:
        # Warn but continue by filtering
        print(f"Warning: --prefer-source contains languages not in --langs: {invalid_sources}. They will be ignored.")
        prefer_source = [s for s in prefer_source if s in langs]
    if not prefer_source:
        # If all preferred were filtered out, fall back to langs order
        prefer_source = list(langs)

    # Resolve content root to absolute path
    content_root_input = args.content_root
    content_root_abs = content_root_input
    if not os.path.isabs(content_root_abs):
        content_root_abs = os.path.join(REPO_ROOT, content_root_input)
    content_root_abs = os.path.abspath(content_root_abs)

    if not os.path.isdir(content_root_abs):
        parser.error(f"--content-root directory does not exist: {content_root_abs}")

    plan = compute_plan(content_root_abs, langs, prefer_source)

    print_plan(plan, verbose=args.verbose)

    if not args.execute:
        # Summary only, no execution (default plan-only mode)
        print(
            f"Summary: bases={plan.total_bases}, missing_before={plan.missing_before}, created=0, translated=0, skipped=0, failures=0"
        )
        return 0

    # If dry-run, we still honor --limit by printing only that many actions as DRY lines
    if args.dry_run and args.limit is not None and plan.jobs:
        limited = plan.jobs[: max(0, int(args.limit))]
        if len(limited) < len(plan.jobs):
            print(f"(dry-run) Limiting output to first {len(limited)} of {len(plan.jobs)} job(s)")
        for job in limited:
            target_rel = rel_from_repo(job.target_abs)
            source_rel = rel_from_repo(job.source_abs)
            print(f"DRY create+translate {job.target_lang} <- {job.source_lang}: {target_rel} (from {source_rel})")
        print(
            f"Summary: bases={plan.total_bases}, missing_before={plan.missing_before}, created=0, translated=0, skipped=0, failures=0"
        )
        return 0

    created, translated, skipped, failures = run_plan(
        plan,
        dry_run=args.dry_run,
        workers=int(args.workers),
        limit=args.limit,
        verbose=args.verbose,
    )

    print(
        f"Summary: bases={plan.total_bases}, missing_before={plan.missing_before}, created={created}, translated={translated}, skipped={skipped}, failures={failures}"
    )

    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
