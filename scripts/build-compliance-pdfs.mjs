import { chromium } from 'playwright';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { execFile, spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { promisify } from 'node:util';

const root = process.cwd();
const contentDir = path.join(root, 'content', 'compliance');
const complianceMetaPath = path.join(root, 'data', 'compliance_meta.json');
const outputDir = path.join(root, 'static', 'compliance', 'downloads');
const baseUrl = (process.env.COMPLIANCE_BASE_URL || 'http://localhost:1324').replace(/\/$/, '');
const serverUrl = new URL(baseUrl);
const execFileAsync = promisify(execFile);

function parseFrontMatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return {};
  }

  const frontMatter = {};
  const lines = match[1].split('\n');
  let currentListKey = null;

  for (const line of lines) {
    const listItem = line.match(/^\s+-\s+(.+)\s*$/);
    if (currentListKey && listItem) {
      frontMatter[currentListKey].push(listItem[1].replace(/^["']|["']$/g, ''));
      continue;
    }

    const keyValue = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!keyValue) {
      currentListKey = null;
      continue;
    }

    const [, key, rawValue] = keyValue;
    const value = rawValue.trim();
    if (value === '') {
      frontMatter[key] = [];
      currentListKey = key;
      continue;
    }

    frontMatter[key] = value.replace(/^["']|["']$/g, '');
    currentListKey = null;
  }

  return frontMatter;
}

function toGitPath(filePath) {
  return path.relative(root, filePath).split(path.sep).join('/');
}

function getMajorVersion(rawVersion = '1.0') {
  const value = String(rawVersion || '1.0').trim().replace(/^v/i, '');
  return value.split('.')[0] || '1';
}

function getManualMinorVersion(rawVersion = '1.0') {
  const [, minor = '0'] = String(rawVersion || '1.0').trim().match(/^[^.]+\.([0-9]+)/) || [];
  return Number.parseInt(minor, 10) || 0;
}

async function getGitOutput(args) {
  try {
    const { stdout } = await execFileAsync('git', args, {
      cwd: root,
      maxBuffer: 10 * 1024 * 1024,
    });
    return stdout.trim();
  } catch {
    return '';
  }
}

async function getCommitSource(commit, gitPath) {
  return getGitOutput(['show', `${commit}:${gitPath}`]);
}

async function getCommitMajorVersion(commit, gitPath) {
  const source = await getCommitSource(commit, gitPath);
  if (!source) {
    return null;
  }

  return getMajorVersion(parseFrontMatter(source).pdfversion);
}

async function getMajorCommitCount(gitPath, majorVersion) {
  const log = await getGitOutput(['log', '--follow', '--format=%H', '--', gitPath]);
  const commits = log.split('\n').filter(Boolean);
  let count = 0;

  for (const commit of commits) {
    const commitMajor = await getCommitMajorVersion(commit, gitPath);
    if (!commitMajor || commitMajor !== majorVersion) {
      break;
    }

    count += 1;
  }

  return count;
}

async function hasWorkingTreeChanges(gitPath) {
  return Boolean(await getGitOutput(['status', '--porcelain', '--', gitPath]));
}

async function buildComplianceMeta(doc) {
  const majorVersion = getMajorVersion(doc.frontMatter.pdfversion);
  const manualMinorVersion = getManualMinorVersion(doc.frontMatter.pdfversion);
  const latestCommit = await getGitOutput(['log', '-1', '--format=%H', '--', doc.gitPath]);
  const latestCommittedMajor = latestCommit ? await getCommitMajorVersion(latestCommit, doc.gitPath) : null;
  const commitCount = latestCommit ? await getMajorCommitCount(doc.gitPath, majorVersion) : 0;
  const hasLocalChanges = await hasWorkingTreeChanges(doc.gitPath);
  let minorVersion = commitCount > 0 ? Math.max(0, commitCount - 1) : manualMinorVersion;

  if (hasLocalChanges && latestCommit && latestCommittedMajor === majorVersion) {
    minorVersion += 1;
  }

  const contentHash = createHash('sha1').update(doc.source).digest('hex');
  const id = latestCommit
    ? `${latestCommit.slice(0, 12)}${hasLocalChanges ? '-dirty' : ''}`
    : `local-${contentHash.slice(0, 12)}`;

  return {
    id,
    version: `${majorVersion}.${minorVersion}`,
    majorVersion,
    updateCount: minorVersion,
    commit: latestCommit || null,
    dirty: hasLocalChanges,
  };
}

async function writeComplianceMeta(docs) {
  const meta = {};

  for (const doc of docs) {
    doc.meta = await buildComplianceMeta(doc);
    meta[doc.slug] = doc.meta;
  }

  await fs.mkdir(path.dirname(complianceMetaPath), { recursive: true });
  await fs.writeFile(complianceMetaPath, `${JSON.stringify(meta, null, 2)}\n`);
}

async function getComplianceDocs() {
  const files = await fs.readdir(contentDir);
  const docs = [];

  for (const file of files.sort()) {
    if (!file.endsWith('.md') || file.startsWith('_')) {
      continue;
    }

    const sourcePath = path.join(contentDir, file);
    const source = await fs.readFile(sourcePath, 'utf8');
    const frontMatter = parseFrontMatter(source);

    if (!frontMatter.downloadpdf) {
      continue;
    }

    const slug = file.replace(/\.md$/, '');
    docs.push({
      slug,
      title: frontMatter.title || slug,
      source,
      frontMatter,
      sourcePath,
      gitPath: toGitPath(sourcePath),
      downloadPath: frontMatter.downloadpdf,
      outputPath: path.join(root, 'static', frontMatter.downloadpdf.replace(/^\//, '')),
    });
  }

  return docs;
}

async function resolvePrintUrl(page, slug) {
  const candidates = [
    `${baseUrl}/compliance/${slug}/pdf.html`,
    `${baseUrl}/compliance/${slug}/pdf/`,
  ];

  for (const url of candidates) {
    const response = await page.goto(url, { waitUntil: 'networkidle' });
    if (response?.ok()) {
      return url;
    }
  }

  throw new Error(`No printable compliance URL returned 200 for ${slug}`);
}

async function isServerAvailable() {
  try {
    const response = await fetch(`${baseUrl}/compliance/`, { signal: AbortSignal.timeout(1500) });
    return response.ok;
  } catch {
    return false;
  }
}

async function waitForServer(process) {
  const startedAt = Date.now();
  let output = '';

  process.stdout.on('data', (chunk) => {
    output += chunk.toString();
  });

  process.stderr.on('data', (chunk) => {
    output += chunk.toString();
  });

  while (Date.now() - startedAt < 20_000) {
    if (await isServerAvailable()) {
      return;
    }

    if (process.exitCode !== null) {
      throw new Error(`Hugo server exited before becoming available.\n${output}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Timed out waiting for Hugo server at ${baseUrl}.\n${output}`);
}

async function ensureServer() {
  if (await isServerAvailable()) {
    return null;
  }

  const port = serverUrl.port || (serverUrl.protocol === 'https:' ? '443' : '80');
  const host = serverUrl.hostname || '127.0.0.1';
  const server = spawn('hugo', [
    'serve',
    '--bind',
    host,
    '--baseURL',
    `${baseUrl}/`,
    '--port',
    port,
    '--disableFastRender',
  ], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  await waitForServer(server);
  return server;
}

async function stopServer(server) {
  if (!server) {
    return;
  }

  server.kill('SIGTERM');
  await new Promise((resolve) => {
    server.once('exit', resolve);
    setTimeout(resolve, 3000);
  });
}

async function addPageChrome(inputPath, outputPath, title, pdfDate, documentId) {
  const bytes = await fs.readFile(inputPath);
  const pdf = await PDFDocument.load(bytes);
  pdf.registerFontkit(fontkit);
  const fontCandidates = [
    path.join(root, 'static', 'fonts', 'montserrat-400.ttf'),
    path.join(root, 'static', 'fonts', 'montserrat.ttf'),
  ];
  let fontBytes = null;
  for (const fontPath of fontCandidates) {
    try {
      fontBytes = await fs.readFile(fontPath);
      break;
    } catch {
      // Try the next font file.
    }
  }

  if (!fontBytes) {
    throw new Error(`No PDF font file found. Checked: ${fontCandidates.join(', ')}`);
  }

  const font = await pdf.embedFont(fontBytes);
  const logoBytes = await fs.readFile(path.join(root, 'static', 'img', 'logos', 'safespring', 'png', 'safespring_logotype_blue_png.png'));
  const logo = await pdf.embedPng(logoBytes);
  const pageCount = pdf.getPageCount();
  const blue = rgb(0, 0.40, 0.60);
  const coverPage = pdf.getPage(0);
  const { width: coverWidth } = coverPage.getSize();
  const coverRight = coverWidth - 79;
  const coverPageNumber = `Page 1 of ${pageCount}`;
  const coverFooterSize = 7.5;

  coverPage.drawText(coverPageNumber, {
    x: coverRight - font.widthOfTextAtSize(coverPageNumber, coverFooterSize),
    y: 70,
    size: coverFooterSize,
    font,
    color: blue,
  });

  for (let index = 1; index < pageCount; index += 1) {
    const page = pdf.getPage(index);
    const { width } = page.getSize();
    const left = 70;
    const right = width - 70;
    const headerLineY = 762;
    const footerLineY = 66;
    const lineColor = rgb(0.78, 0.84, 0.86);
    const grey = rgb(0.55, 0.55, 0.55);
    const headerSize = 8.5;
    const footerSize = 8;
    const footer = `Page ${index + 1} of ${pageCount}`;
    const idFooter = documentId ? `ID: ${documentId}` : '';
    const logoWidth = 88;
    const logoHeight = logoWidth * (logo.height / logo.width);
    const logoX = right - logoWidth;
    const logoY = 779;
    const titleY = 771;
    const dateY = 770;
    const date = pdfDate ? `Date: ${pdfDate}` : '';

    page.drawText(title, {
      x: left,
      y: titleY,
      size: headerSize,
      font,
      color: grey,
    });

    page.drawImage(logo, {
      x: logoX,
      y: logoY,
      width: logoWidth,
      height: logoHeight,
    });

    if (date) {
      page.drawText(date, {
        x: logoX + ((logoWidth - font.widthOfTextAtSize(date, headerSize)) / 2),
        y: dateY,
        size: headerSize,
        font,
        color: grey,
      });
    }

    page.drawLine({
      start: { x: left, y: headerLineY },
      end: { x: right, y: headerLineY },
      thickness: 0.45,
      color: lineColor,
    });

    page.drawLine({
      start: { x: left, y: footerLineY },
      end: { x: right, y: footerLineY },
      thickness: 0.45,
      color: lineColor,
    });

    page.drawText(footer, {
      x: (width - font.widthOfTextAtSize(footer, footerSize)) / 2,
      y: 46,
      size: footerSize,
      font,
      color: blue,
    });

    if (idFooter) {
      page.drawText(idFooter, {
        x: left,
        y: 46,
        size: footerSize,
        font,
        color: blue,
      });
    }
  }

  await fs.writeFile(outputPath, await pdf.save());
}

await fs.mkdir(outputDir, { recursive: true });

let server = null;
let browser = null;
try {
  const docs = await getComplianceDocs();
  if (docs.length === 0) {
    throw new Error('No compliance documents with downloadpdf front matter were found.');
  }

  await writeComplianceMeta(docs);
  server = await ensureServer();

  browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1122, height: 1587 },
    deviceScaleFactor: 1,
  });

  for (const doc of docs) {
    const url = await resolvePrintUrl(page, doc.slug);
    const pdfMeta = await page.evaluate(() => ({
      date: document.body.dataset.pdfDate || '',
      id: document.body.dataset.pdfId || '',
    }));
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'compliance-pdf-'));
    const tempPdfPath = path.join(tempDir, `${doc.slug}.pdf`);

    await page.emulateMedia({ media: 'print' });
    await page.pdf({
      path: tempPdfPath,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: false,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm',
      },
    });

    await addPageChrome(tempPdfPath, doc.outputPath, doc.title, pdfMeta.date, pdfMeta.id || doc.meta.id);
    await fs.rm(tempDir, { recursive: true, force: true });

    const stats = await fs.stat(doc.outputPath);
    if (stats.size < 10_000) {
      throw new Error(`Generated PDF for ${doc.slug} is unexpectedly small (${stats.size} bytes).`);
    }

    console.log(`Generated ${doc.downloadPath} from ${url}`);
  }
} finally {
  if (browser) {
    await browser.close();
  }

  await stopServer(server);
}
