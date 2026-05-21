import { spawn } from 'node:child_process';

const root = process.cwd();
const children = [];

function spawnChild(command, args) {
  const child = spawn(command, args, {
    cwd: root,
    stdio: 'inherit',
    env: process.env,
  });

  children.push(child);
  return child;
}

function shutdown() {
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }
}

process.on('SIGINT', () => {
  shutdown();
  process.exit(0);
});

process.on('SIGTERM', () => {
  shutdown();
  process.exit(0);
});

spawnChild('hugo', [
  'serve',
  '--bind',
  '127.0.0.1',
  '--baseURL',
  'http://localhost:1324/',
  '--port',
  '1324',
  '--disableFastRender',
]);

setTimeout(() => {
  spawnChild(process.execPath, ['scripts/watch-compliance-pdfs.mjs']);
}, 1500);
