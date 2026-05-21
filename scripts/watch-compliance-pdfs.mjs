import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const watchTargets = [
  path.join(root, 'content', 'compliance'),
  path.join(root, 'assets', 'css', 'compliance-pdf.css'),
  path.join(root, 'layouts', 'compliance'),
];

let timer = null;
let running = false;
let pending = false;

function runBuild(reason = 'initial') {
  if (running) {
    pending = true;
    return;
  }

  running = true;
  pending = false;
  console.log(`[pdf:watch] Rebuilding compliance PDFs (${reason})`);

  const child = spawn(process.execPath, ['scripts/build-compliance-pdfs.mjs'], {
    cwd: root,
    stdio: 'inherit',
    env: process.env,
  });

  child.on('exit', (code) => {
    running = false;
    if (code !== 0) {
      console.error(`[pdf:watch] PDF rebuild failed with exit code ${code}`);
    }

    if (pending) {
      runBuild('queued changes');
    }
  });
}

function scheduleBuild(eventType, filename) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    runBuild(`${eventType}${filename ? ` ${filename}` : ''}`);
  }, 750);
}

for (const target of watchTargets) {
  if (!fs.existsSync(target)) {
    continue;
  }

  const stat = fs.statSync(target);
  fs.watch(target, { recursive: stat.isDirectory() }, (eventType, filename) => {
    const name = filename ? filename.toString() : '';
    if (name.includes('/downloads/') || name.endsWith('.pdf')) {
      return;
    }

    scheduleBuild(eventType, name);
  });
}

runBuild();
console.log('[pdf:watch] Watching compliance content, PDF CSS, and PDF layouts.');
