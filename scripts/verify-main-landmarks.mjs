// Usage: node scripts/verify-main-landmarks.mjs /path/to/multilingual-build
// Inspect every HTML file, including noindex/non-sitemap pages. No navigation or
// asset loading: Chromium only parses strings into detached, inert DOM documents.
// Visibility is static (hidden/inert/aria-hidden and inline styles), not external
// CSS or responsive rendering. Multiple H1s are allowed when all are inside main.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(process.argv[2] || "public");
const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const languages = ["en", "sv", "nb", "da"];
function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : entry.name.endsWith(".html") ? [file] : [];
  });
}
const files = htmlFiles(root).sort();
const staticFiles = new Set(htmlFiles(path.join(source, "static")).map((file) => path.relative(path.join(source, "static"), file)));
const counts = { normal: 0, redirect: 0, static: 0, print: 0 };
const localeCounts = Object.fromEntries(languages.map((language) => [language, 0]));
const failures = [];
let multipleH1 = 0, withoutHero = 0, errorPages = 0;
const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ serviceWorkers: "block" });
  await context.route("**/*", (route) => route.abort());
  const page = await context.newPage();
  for (let offset = 0; offset < files.length; offset += 80) {
    const batch = files.slice(offset, offset + 80).map((file) => {
      const relative = path.relative(root, file), parts = relative.split(path.sep);
      const language = languages.includes(parts[0]) ? parts.shift() : "other";
      const sitePath = parts.join(path.sep);
      return { relative, language, sitePath, copiedStatic: staticFiles.has(sitePath), html: fs.readFileSync(file, "utf8") };
    });
    const results = await page.evaluate((entries) => entries.map((entry) => {
      const doc = new DOMParser().parseFromString(entry.html, "text/html");
      const result = { relative: entry.relative, language: entry.language, sitePath: entry.sitePath, category: "normal", errors: [] };
      const redirect = [...doc.querySelectorAll('meta[http-equiv="refresh" i]')].some((meta) => /^\s*\d+(?:\.\d+)?\s*;\s*url\s*=\s*\S/i.test(meta.content));
      if (redirect) result.category = "redirect";
      else if (entry.copiedStatic) result.category = "static";
      else if (entry.sitePath.endsWith("/pdf.html") && doc.querySelector(".pdf-document")) result.category = "print";
      if (result.category !== "normal") return result;
      const exposed = (element) => {
        for (let node = element; node; node = node.parentElement) {
          if (node.matches('[hidden], [inert], [aria-hidden="true" i], template, noscript')) return false;
          if (node.style.display === "none" || ["hidden", "collapse"].includes(node.style.visibility)) return false;
        }
        return true;
      };
      const select = (selector) => [...doc.querySelectorAll(selector)].filter(exposed);
      const mains = select('main, [role="main" i]');
      const headings = select("h1");
      const heroSelector = ".heading-default-single, .heading-default-list, .heading-index, .hero";
      const heroes = select(heroSelector);
      const intros = select(".content-summary-index, .content-summary-blogg, .content-summary, .hero-description");
      for (const hero of heroes) intros.push(...[...hero.querySelectorAll("p")].filter(exposed));
      result.h1s = headings.length;
      result.heroes = heroes.length;
      if (mains.length !== 1) result.errors.push(`expected 1 exposed main, found ${mains.length}`);
      if (mains.some((main) => main.tagName !== "MAIN" || !["", "main"].includes((main.getAttribute("role") || "").trim().toLowerCase()))) result.errors.push("main must be a native <main> with default/main role");
      if (!headings.length) result.errors.push("no exposed H1");
      const pageHeadings = headings.filter((heading) => heroes.some((hero) => hero.contains(heading)));
      if ((pageHeadings.length ? pageHeadings : headings.slice(0, 1)).some((heading) => !heading.textContent.trim())) result.errors.push("page/hero H1 is empty");
      if (mains.length === 1) {
        const main = mains[0];
        for (const [label, elements] of [["H1", headings], ["hero", heroes], ["intro", intros]]) {
          if (elements.some((element) => !main.contains(element))) result.errors.push(`${label} outside main`);
        }
        const chrome = select('#navbar, .site-header, .site-header-nav, .safespring-footer-container, [role="banner"], [role="contentinfo"], body > header, body > footer');
        if (chrome.some((element) => main.contains(element) || element.contains(main))) result.errors.push("main overlaps global navbar/footer");
      }
      return result;
    }), batch);
    for (const result of results) {
      counts[result.category]++;
      if (result.category !== "normal") continue;
      localeCounts[result.language] = (localeCounts[result.language] || 0) + 1;
      multipleH1 += result.h1s > 1;
      withoutHero += result.heroes === 0;
      errorPages += /^(404|500)\.html$/.test(result.sitePath);
      if (result.errors.length) failures.push(`${result.relative}: ${result.errors.join("; ")}`);
    }
  }
} finally {
  await browser.close();
}
for (const language of languages) if (!localeCounts[language]) failures.push(`Coverage: no normal pages checked for ${language}`);
console.log(`${files.length} HTML files: ${JSON.stringify(counts)}; checked by locale: ${JSON.stringify(localeCounts)}`);
console.log(`Included ${errorPages} error pages, ${multipleH1} multi-H1 pages and ${withoutHero} pages without recognised hero classes.`);
console.log("Static exposed-markup checks only; external CSS/JS and responsive visibility are not evaluated.");
for (const failure of failures) console.error(`FAIL ${failure}`);
console.log(`${failures.length ? "FAIL" : "PASS"}: ${counts.normal} normal pages checked; ${failures.length} failures.`);
process.exitCode = failures.length ? 1 : 0;
