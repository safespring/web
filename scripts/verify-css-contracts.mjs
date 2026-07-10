import fs from "node:fs";
import path from "node:path";

const outputRoot = path.resolve(process.argv[2] || "public");
const htmlFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(filePath);
    else if (entry.name.endsWith(".html")) htmlFiles.push(filePath);
  }
}

const classContracts = [
  [
    "article-extras",
    (classes) => classes.includes("author-container"),
    /\/css\/article-extras\.min/,
  ],
  [
    "accordion",
    (classes) =>
      classes.some(
        (name) => name === "accordion" || name.startsWith("accordion-"),
      ),
    /\/css\/accordion\.min/,
  ],
  [
    "contact-card",
    (classes) => classes.includes("contact-container"),
    /\/css\/contact-card\.min/,
  ],
  [
    "content-components",
    (classes) =>
      classes.some(
        (name) =>
          name.startsWith("demo-sticky") ||
          name.startsWith("two-field-") ||
          [
            "ingress",
            "quote",
            "quote-person",
            "partner-grid",
            "partner-container",
            "note-dotted",
            "disclaimer-dotted",
            "note",
            "disclaimer",
          ].includes(name),
      ),
    /\/css\/content-components\.min/,
  ],
  [
    "document-content",
    (classes) => classes.includes("document-download"),
    /\/css\/document-content\.min/,
  ],
  [
    "content-filter",
    (classes) =>
      classes.some((name) =>
        ["tf-filter", "tf-buttons", "filter-number"].includes(name),
      ),
    /\/css\/content-filter\.min/,
  ],
  [
    "horizontal-card",
    (classes) => classes.includes("safespring-horisontal-card-container"),
    /\/css\/horizontal-card\.min/,
  ],
  [
    "details-content",
    (classes) => classes.includes("readfile-details"),
    /\/css\/details-content\.min/,
  ],
  [
    "icon-blocks",
    (classes) =>
      classes.some((name) =>
        [
          "icon-block",
          "icon-block-horisontal",
          "icon-block-small",
          "icon-block-container",
        ].includes(name),
      ),
    /\/css\/icon-blocks\.min/,
  ],
  [
    "mermaid-content",
    (classes) => classes.includes("mermaid"),
    /\/css\/mermaid-content\.min/,
  ],
  [
    "service-cards",
    (classes) =>
      classes.some(
        (name) => name === "flexcontainer-three" || name === "service-card",
      ),
    /\/css\/service-cards\.min/,
  ],
  [
    "tooltips",
    (classes) =>
      classes.some(
        (name) => name === "text-tooltip" || name === "text-tooltiptext",
      ),
    /\/css\/tooltips\.min/,
  ],
  [
    "compliance-document-table",
    (classes) => classes.includes("compliance-document-table__info"),
    /\/css\/compliance-document-table\.min/,
  ],
];

const markupContracts = [
  [
    "content-tables",
    /<table(?:\s|>)/i,
    /\/css\/content-tables\.min|\/css\/price-page\.min/,
  ],
  ["code-content", /<(?:pre|code)(?:\s|>)/i, /\/css\/code-content\.min/],
  ["forms", /<form(?:\s|>)/i, /\/css\/forms\.min/],
  ["video-player", /data-video-player(?:=|\s|>)/i, /\/css\/video-player\.min/],
];

function isNormalPage(relativePath, html) {
  return (
    /<body(?:\s|>)/i.test(html) &&
    !/http-equiv=["']refresh/i.test(html) &&
    !/(^|\/)brand\//.test(relativePath) &&
    !/\/pdf\.html$/.test(relativePath) &&
    !/(^|\/)404\.html$/.test(relativePath) &&
    !/\/img\//.test(relativePath)
  );
}

function extractClasses(html) {
  return [
    ...html.matchAll(/class=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi),
  ].flatMap((match) =>
    (match[1] || match[2] || match[3] || "").split(/\s+/).filter(Boolean),
  );
}

if (!fs.existsSync(outputRoot)) {
  throw new Error(`Generated site not found: ${outputRoot}`);
}

walk(outputRoot);
const failures = [];
let checkedPages = 0;
let contractChecks = 0;

for (const filePath of htmlFiles) {
  const relativePath = path.relative(outputRoot, filePath);
  const html = fs.readFileSync(filePath, "utf8");
  if (!isNormalPage(relativePath, html)) continue;

  checkedPages += 1;
  const classes = extractClasses(html);
  for (const [name, hasComponent, stylesheet] of classContracts) {
    if (!hasComponent(classes)) continue;
    contractChecks += 1;
    if (!stylesheet.test(html)) failures.push(`${name}: ${relativePath}`);
  }
  for (const [name, marker, stylesheet] of markupContracts) {
    if (!marker.test(html)) continue;
    contractChecks += 1;
    if (!stylesheet.test(html)) failures.push(`${name}: ${relativePath}`);
  }
}

const legacyAssets = [];
function findLegacyAssets(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) findLegacyAssets(filePath);
    else if (/legacy.*\.css$/i.test(entry.name))
      legacyAssets.push(path.relative(outputRoot, filePath));
  }
}
findLegacyAssets(outputRoot);
if (legacyAssets.length)
  failures.push(`legacy CSS emitted: ${legacyAssets.join(", ")}`);

const linkedLegacy = htmlFiles.filter((filePath) =>
  /legacy\.css/i.test(fs.readFileSync(filePath, "utf8")),
);
if (linkedLegacy.length) {
  failures.push(
    `legacy CSS linked by ${linkedLegacy.length} generated HTML file(s)`,
  );
}

console.log(
  JSON.stringify(
    {
      htmlFiles: htmlFiles.length,
      checkedPages,
      contractChecks,
      failures: failures.length,
    },
    null,
    2,
  ),
);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
}
