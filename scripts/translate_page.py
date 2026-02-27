#!/usr/bin/env python3

"""
Translate a Markdown page to the language implied by its path.

Usage (CLI):
    ./scripts/translate_page.py content/da/documents/acceptable-use-policy.md

Behavior:
- Detect target language from the path segment after `content/` (sv|en|nb|da).
- Translate the Markdown body (preserves code blocks/inline code/URLs).
- Translate user-facing frontmatter fields.
- Ensure `ai: true` exists in frontmatter. Also set `language: "<lang>"`.
- Write changes back in-place.

Environment variables:
- OPENAI_API_KEY: If set and backend=openai, uses OpenAI to translate.

Notes:
- If no translation backend is available, the script falls back to a no-op
  translator and will only update frontmatter.
"""

import argparse
import os
import re
import sys
from dataclasses import dataclass
from typing import Optional, Tuple, List


SUPPORTED_LANGS = {"sv", "en", "nb", "da"}

# Frontmatter markers
FM_START = "---\n"
FM_DELIM = "\n---\n"

# Project root (repository root assumed to be parent of scripts/)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class TranslateError(Exception):
    pass


def detect_language_from_path(path: str) -> str:
    """Return the language code from a content path like content/da/....md"""
    # Normalize path separators
    normalized = path.replace("\\", "/")
    m = re.search(r"(?:^|/)content/([^/]+)/", normalized)
    if not m:
        raise TranslateError(
            f"Unable to detect language from path: {path}. Expected 'content/<lang>/'"
        )
    lang = m.group(1).strip().lower()
    if lang not in SUPPORTED_LANGS:
        raise TranslateError(
            f"Unsupported or unknown language '{lang}' in path '{path}'. Supported: {sorted(SUPPORTED_LANGS)}"
        )
    return lang


def read_file_text(filepath: str) -> str:
    with open(filepath, "r", encoding="utf-8") as f:
        return f.read()


def write_file_text(filepath: str, text: str) -> None:
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(text)

def _simple_parse_env_kv(line: str) -> Optional[Tuple[str, str]]:
    s = line.strip()
    if not s or s.startswith("#"):
        return None
    if s.startswith("export "):
        s = s[len("export ") :].lstrip()
    if "=" not in s:
        return None
    k, v = s.split("=", 1)
    k = k.strip()
    v = v.strip()
    if (v.startswith('"') and v.endswith('"')) or (v.startswith("'") and v.endswith("'")):
        v = v[1:-1]
    return k, v


def _simple_load_env_file(path: str) -> None:
    try:
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                parsed = _simple_parse_env_kv(line)
                if not parsed:
                    continue
                key, val = parsed
                if key not in os.environ:
                    os.environ[key] = val
    except FileNotFoundError:
        return


def load_env_local(explicit_path: Optional[str] = None) -> None:
    """Load environment variables from .env.local if present.

    Search current working directory and project root. Do not override existing
    process environment values.
    """
    # If user supplied a specific path, try it first
    if explicit_path:
        try:
            from dotenv import load_dotenv  # type: ignore

            load_dotenv(dotenv_path=explicit_path, override=False)
        except Exception:
            _simple_load_env_file(explicit_path)
        return
    # First try python-dotenv if available
    try:
        from dotenv import load_dotenv, find_dotenv  # type: ignore

        # Explicit known locations first
        for name in (".env.local", ".env"):
            load_dotenv(dotenv_path=os.path.join(os.getcwd(), name), override=False)
            load_dotenv(dotenv_path=os.path.join(PROJECT_ROOT, name), override=False)

        # Then attempt auto-discovery upwards for .env.local and .env
        found = find_dotenv(filename=".env.local", usecwd=True)
        if found:
            load_dotenv(found, override=False)
        found_env = find_dotenv(filename=".env", usecwd=True)
        if found_env:
            load_dotenv(found_env, override=False)
    except Exception:
        # Fallback: simple parser for common KEY=VAL lines
        for name in (".env.local", ".env"):
            _simple_load_env_file(os.path.join(os.getcwd(), name))
            _simple_load_env_file(os.path.join(PROJECT_ROOT, name))


def split_frontmatter(text: str) -> Tuple[Optional[str], str]:
    """Split text into (frontmatter_block_with_markers_or_None, body).

    Preserves the original frontmatter including the leading and trailing '---' markers
    if present. If no frontmatter is present, returns (None, full_text).
    """
    if text.startswith(FM_START):
        # Find the closing marker. Accept both "\n---\n" and end-of-file after ---.
        end_idx = text.find(FM_DELIM, 4)
        if end_idx == -1:
            # Try if the file ends with --- without trailing newline
            alt_end = text.find("\n---\r\n", 4)
            if alt_end != -1:
                end_idx = alt_end
        if end_idx != -1:
            fm = text[: end_idx + len(FM_DELIM)]
            body = text[end_idx + len(FM_DELIM) :]
            return fm, body
        # Malformed frontmatter (no closing). Treat as no frontmatter
    return None, text


def parse_frontmatter_lines(frontmatter: str) -> List[str]:
    """Return the lines inside the frontmatter (excluding the first and last '---')."""
    lines = frontmatter.splitlines()
    if not (len(lines) >= 2 and lines[0].strip() == "---"):
        return []
    # Find last marker line from bottom
    last_marker_idx = None
    for i in range(len(lines) - 1, -1, -1):
        if lines[i].strip() == "---":
            last_marker_idx = i
            break
    if last_marker_idx is None:
        return []
    # Extract lines between markers
    return lines[1:last_marker_idx]


def build_frontmatter_from_lines(lines: List[str]) -> str:
    """Reconstruct a frontmatter block including '---' markers from inner lines."""
    # Always end with newline after closing '---' to separate from body consistently
    return FM_START + "\n".join(lines) + FM_DELIM


def ensure_key_value_in_frontmatter_lines(
    lines: List[str], key: str, value: str, quote: bool = True
) -> List[str]:
    """Ensure YAML key exists with the given value (optionally quoted), updating or inserting.

    We do minimal YAML handling: if a line starts with the key followed by ':', we replace
    that line with key: value (quoted when quote=True). Otherwise, we insert a new line just
    after the start (preserving overall simplicity). We do not attempt nested YAML.
    """
    key_pattern = re.compile(rf"^\s*{re.escape(key)}\s*:\s*(.*)$")
    new_lines = list(lines)
    for idx, line in enumerate(new_lines):
        if key_pattern.match(line):
            formatted_value = f'"{value}"' if quote else value
            new_lines[idx] = f"{key}: {formatted_value}"
            return new_lines
    # Not found -> insert at top of frontmatter content
    formatted_value = f'"{value}"' if quote else value
    return [f"{key}: {formatted_value}"] + new_lines


def update_frontmatter_for_ai_and_language(
    existing_frontmatter: Optional[str], target_lang: str
) -> str:
    """Return an updated frontmatter block (with markers) ensuring ai and language."""
    if existing_frontmatter is None:
        inner_lines: List[str] = []
    else:
        inner_lines = parse_frontmatter_lines(existing_frontmatter)

    # Ensure keys
    inner_lines = ensure_key_value_in_frontmatter_lines(inner_lines, "ai", "true", quote=False)
    inner_lines = ensure_key_value_in_frontmatter_lines(
        inner_lines, "language", target_lang
    )

    return build_frontmatter_from_lines(inner_lines)


def extract_frontmatter_field(lines: List[str], field: str) -> Optional[Tuple[int, str]]:
    """Return (index, value_string_without_quotes) if a simple scalar field exists."""
    pattern = re.compile(rf"^\s*{re.escape(field)}\s*:\s*(.*)$")
    for idx, line in enumerate(lines):
        m = pattern.match(line)
        if m:
            raw = m.group(1).strip()
            if raw.startswith('"') and raw.endswith('"') and len(raw) >= 2:
                return idx, raw[1:-1]
            if raw.startswith("'") and raw.endswith("'") and len(raw) >= 2:
                return idx, raw[1:-1]
            # Unquoted scalar
            return idx, raw
    return None


def set_frontmatter_field(lines: List[str], field: str, value: str) -> List[str]:
    pattern = re.compile(rf"^\s*{re.escape(field)}\s*:\s*(.*)$")
    updated = list(lines)
    for i, line in enumerate(updated):
        if pattern.match(line):
            updated[i] = f'{field}: "{value}"'
            return updated
    # Not found -> append
    updated.append(f'{field}: "{value}"')
    return updated


def _looks_like_boolean(s: str) -> bool:
    return s.lower() in {"true", "false"}


def _looks_like_number(s: str) -> bool:
    return bool(re.fullmatch(r"-?\d+(?:\.\d+)?", s))


def _looks_like_date(s: str) -> bool:
    # Simple ISO-8601 date/datetime check
    return bool(re.fullmatch(r"\d{4}-\d{2}-\d{2}(?:[ tT]\d{2}:\d{2}(?::\d{2})?(?:Z|[+-]\d{2}:?\d{2})?)?", s))


def _looks_like_url_or_path(s: str) -> bool:
    # Treat absolute/relative URLs, mail/tel links, and hash anchors as non-translatable
    return (
        s.startswith(("http://", "https://", "mailto:", "tel:"))
        or s.startswith("/")
        or s.startswith("#")
    )


def _looks_like_file_ref(s: str) -> bool:
    return s.lower().endswith((".jpg", ".jpeg", ".png", ".svg", ".webp", ".pdf", ".gif"))


ALWAYS_TRANSLATE_FIELDS = {"title", "description", "summary"}
NON_USER_FACING_FIELDS = {
    "ai",
    "language",
    "date",
    "draft",
    "slug",
    "url",
    # Content taxonomy/section-like fields
    "section",
    "aliases",
    "categories",
    "tags",
    "keywords",
    "weight",
    "layout",
    "type",
    "menu",
    "params",
    "featured",
    "image",
    "images",
    "cover",
    "thumbnail",
    "icon",
    # Media/subtitles and timing fields
    "src",
    "srclang",
    "videoURL",
    "time",
    "timeFormatted",
    # Author and sidebar meta
    "author_image",
    "sidebarlinkurl",
    "sidebarlinkurl2",
}

# Fields stored as yes/no flags that should be normalized and never translated
YES_NO_FIELDS = {
    "form",
    "noindex",
    "dontshow",
    "logobanner",
    "general",
    # Common site toggles
    "saas",
    "sidebarwhitepaper",
}


def _strip_quotes(s: str) -> Tuple[str, bool]:
    if (s.startswith('"') and s.endswith('"')) or (s.startswith("'") and s.endswith("'")):
        return s[1:-1], True
    return s, False


def _strip_enclosing_quote_pairs(text: str) -> str:
    """Remove one set of enclosing quotes if present (supports straight and typographic)."""
    pairs = [
        ('"', '"'),
        ("'", "'"),
        ('“', '”'),
        ('”', '“'),  # be tolerant of reversed order
        ('«', '»'),
        ('„', '”'),
        ('‚', '’'),
    ]
    t = text.strip()
    for left, right in pairs:
        if t.startswith(left) and t.endswith(right) and len(t) >= len(left) + len(right):
            return t[len(left) : len(t) - len(right)].strip()
    return t


def _collapse_whitespace(text: str) -> str:
    """Collapse all runs of whitespace (including newlines) to a single space."""
    return re.sub(r"\s+", " ", text).strip()


def sanitize_translated_scalar(text: str) -> str:
    """Best-effort cleanup for translated scalar values used in YAML frontmatter.

    - Trim surrounding whitespace
    - Remove one layer of enclosing quotes if present
    - Collapse internal newlines and excessive spaces
    """
    t = text if text is not None else ""
    t = _strip_enclosing_quote_pairs(t)
    t = _collapse_whitespace(t)
    return t


def escape_for_yaml_double_quoted(text: str) -> str:
    """Escape a string for safe inclusion inside YAML double quotes.

    Escapes backslashes and double quotes.
    """
    return text.replace('\\', '\\\\').replace('"', '\\"')


def value_seems_translatable_scalar(value: str) -> bool:
    v, _ = _strip_quotes(value.strip())
    if not v:
        return False
    # Skip short tokens or control-like values
    if len(v) <= 3 and not re.search(r"\s", v):
        return False
    if _looks_like_boolean(v) or _looks_like_number(v) or _looks_like_date(v):
        return False
    if _looks_like_url_or_path(v) or _looks_like_file_ref(v):
        return False
    # If contains whitespace and letters, assume user-facing text
    return bool(re.search(r"[A-Za-zÅÄÖåäöÆØæøÀ-ÿ]", v))


def auto_translate_frontmatter_fields(
    translator: "Translator", fm_lines: List[str], target_lang: str
) -> List[str]:
    updated = list(fm_lines)
    key_val_pattern = re.compile(r"^\s*([A-Za-z0-9_-]+)\s*:\s*(.+)$")
    for idx, line in enumerate(updated):
        m = key_val_pattern.match(line)
        if not m:
            continue
        key = m.group(1)
        raw_val = m.group(2)
        # Title/description/summary always translated
        if key in ALWAYS_TRANSLATE_FIELDS:
            text, _ = _strip_quotes(raw_val.strip())
            translated = translator.translate(text, target_lang)
            cleaned = sanitize_translated_scalar(translated)
            safe = escape_for_yaml_double_quoted(cleaned)
            updated[idx] = f'{key}: "{safe}"'
            continue
        # Skip non-user-facing keys
        if key in NON_USER_FACING_FIELDS:
            continue
        # Translate simple scalar values that appear to be readable text
        if value_seems_translatable_scalar(raw_val):
            text, _ = _strip_quotes(raw_val.strip())
            translated = translator.translate(text, target_lang)
            cleaned = sanitize_translated_scalar(translated)
            safe = escape_for_yaml_double_quoted(cleaned)
            updated[idx] = f'{key}: "{safe}"'
    return updated


def is_code_block_fence(line: str) -> bool:
    """Check if a line is a valid markdown code fence (```) that starts at beginning of line.

    This ensures that only properly formatted code fences are detected and preserved
    during translation, which helps maintain valid markdown structure.

    A valid code fence must:
    1. Start with ``` (after optional whitespace)
    2. Have nothing before the ``` except whitespace
    3. Be followed only by optional language identifier and whitespace
    """
    stripped = line.lstrip()
    if not stripped.startswith("```"):
        return False

    # Extract the part after ```
    after_ticks = stripped[3:].strip()

    # Should be empty or contain only a language identifier (word characters, hyphens, underscores)
    return not after_ticks or all(c.isalnum() or c in "-_" for c in after_ticks)


def simple_markdown_body_chunks(text: str) -> List[Tuple[str, bool]]:
    """Split Markdown into chunks: (chunk_text, is_translatable).

    We mark fenced code blocks as non-translatable. Everything else is translatable.
    This is a conservative approach and avoids accidental translation inside code.

    Preserves exact line structure to ensure code fences remain valid.
    """
    lines = text.splitlines(keepends=True)
    chunks: List[Tuple[str, bool]] = []
    buf: List[str] = []
    in_code = False
    for line in lines:
        if is_code_block_fence(line):
            # Flush current buffer with its current mode
            if buf:
                # Join with empty string to preserve exact line endings
                chunk_text = "".join(buf)
                chunks.append((chunk_text, not in_code))
                buf = []
            # Toggle code mode and include the fence line in its own chunk
            in_code = not in_code
            chunks.append((line, False))
            continue
        buf.append(line)
    if buf:
        # Join with empty string to preserve exact line endings
        chunk_text = "".join(buf)
        chunks.append((chunk_text, not in_code))
    return chunks


def build_translation_prompt(target_lang: str) -> str:
    return (
        "You are a professional translator. Translate the provided Markdown to "
        f"{target_lang.upper()} with natural, fluent style. "
        "CRITICAL: Preserve exact line breaks, whitespace, and Markdown structure. "
        "Do NOT translate code blocks, inline code, URLs, slugs, file names, or frontmatter keys. "
        "Translate link texts but keep link targets unchanged. "
        "Do not translate short control values (yes/no/none), hash anchors like #form, or fields like srclang. "
        "Maintain exact paragraph breaks, list formatting, and code fence positioning. "
        "Return only the translated text with identical structure."
        "Do not ask for clarification or follow up questions."
        "Your response will be used directly as is, so do not include any additional text or comments."
        "If all else fails, return the original text."
    )


@dataclass
class TranslationConfig:
    backend: str = "openai"  # enforced
    model: str = "gpt-5.2"


class Translator:
    def __init__(self, cfg: TranslationConfig) -> None:
        self.cfg = cfg
        self._client = None
        if cfg.backend != "openai":
            raise TranslateError("Only 'openai' backend is supported.")
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise TranslateError("OPENAI_API_KEY is required for translation.")
        try:
            # Deferred import to avoid hard dependency if not used
            from openai import OpenAI  # type: ignore

            self._client = OpenAI()
        except Exception as exc:  # pragma: no cover - best effort import
            raise TranslateError(f"Failed to initialize OpenAI client: {exc}")

    def translate(self, text: str, target_lang: str) -> str:
        if not text.strip():
            return text
        assert self._client is not None
        system_prompt = build_translation_prompt(target_lang)
        # Use Chat Completions for broad compatibility
        resp = self._client.chat.completions.create(
            model=self.cfg.model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": text},
            ],
        )
        content = resp.choices[0].message.content or ""
        return content


def translate_markdown_body(translator: Translator, body: str, target_lang: str) -> str:
    # Split into code vs text chunks to avoid translating code fences content
    chunks = simple_markdown_body_chunks(body)
    out_parts: List[str] = []
    for chunk_text, is_translatable in chunks:
        if is_translatable:
            translated = translator.translate(chunk_text, target_lang)
            out_parts.append(translated)
        else:
            out_parts.append(chunk_text)
    return "".join(out_parts)


def translate_frontmatter_fields(
    translator: Translator,
    fm_lines: List[str],
    target_lang: str,
    fields: List[str],
) -> List[str]:
    updated = list(fm_lines)
    for field in fields:
        found = extract_frontmatter_field(updated, field)
        if not found:
            continue
        idx, value = found
        translated_value = translator.translate(value, target_lang)
        cleaned = sanitize_translated_scalar(translated_value)
        safe = escape_for_yaml_double_quoted(cleaned)
        updated[idx] = f'{field}: "{safe}"'
    return updated


def process_file(
    filepath: str,
    target_lang: Optional[str],
    cfg: TranslationConfig,
    dry_run: bool,
) -> None:
    abs_path = os.path.abspath(filepath)
    if not os.path.isfile(abs_path):
        raise TranslateError(f"File not found: {filepath}")

    lang = target_lang or detect_language_from_path(filepath)

    original_text = read_file_text(abs_path)
    existing_frontmatter, body = split_frontmatter(original_text)

    # Prepare frontmatter
    updated_frontmatter_block = update_frontmatter_for_ai_and_language(
        existing_frontmatter, lang
    )
    front_lines = parse_frontmatter_lines(updated_frontmatter_block)

    translator = Translator(cfg)

    # Always translate frontmatter user-facing fields
    if front_lines:
        # Priority fields first
        front_lines = translate_frontmatter_fields(
            translator, front_lines, lang, fields=["title", "description", "summary"]
        )
        # Then auto-detect other user-facing fields
        front_lines = auto_translate_frontmatter_fields(translator, front_lines, lang)
        updated_frontmatter_block = build_frontmatter_from_lines(front_lines)

    # Translate body
    translated_body = translate_markdown_body(translator, body, lang)

    new_text = updated_frontmatter_block + translated_body

    if dry_run:
        sys.stdout.write(new_text)
        return

    # No backup

    if new_text != original_text:
        write_file_text(abs_path, new_text)
        sys.stderr.write(f"Updated file written: {filepath}\n")
    else:
        sys.stderr.write("No changes detected; file left unchanged.\n")


def build_arg_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "Translate a Markdown page to the language implied by its path and ensure frontmatter ai: true."
        )
    )
    p.add_argument(
        "filepath",
        help="Relative path to the Markdown file, e.g., content/da/documents/foo.md",
    )
    # Backend is enforced to openai; exposing flag is unnecessary
    p.add_argument(
        "--model",
        default="gpt-5.2",
        help="Model to use with the chosen backend (if applicable).",
    )
    p.add_argument(
        "--target-lang",
        dest="target_lang",
        help="Override target language (sv|en|nb|da). Defaults to language inferred from path.",
    )
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="Print the would-be result to stdout instead of writing the file.",
    )
    return p


def main(argv: List[str]) -> int:
    # Load env from default locations (CWD and project root)
    load_env_local()
    parser = build_arg_parser()
    args = parser.parse_args(argv)

    if args.target_lang and args.target_lang not in SUPPORTED_LANGS:
        parser.error(
            f"--target-lang must be one of {sorted(SUPPORTED_LANGS)}; got {args.target_lang}"
        )

    cfg = TranslationConfig(backend="openai", model=args.model)
    try:
        process_file(
            filepath=args.filepath,
            target_lang=args.target_lang,
            cfg=cfg,
            dry_run=args.dry_run,
        )
    except TranslateError as te:
        sys.stderr.write(f"Error: {te}\n")
        return 2
    except KeyboardInterrupt:
        sys.stderr.write("Interrupted.\n")
        return 130
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

