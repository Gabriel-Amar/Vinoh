import { spawn } from 'node:child_process';

const children = [];
let shuttingDown = false;

function launch(cmd, args, name) {
  const child = spawn(cmd, args, {
    stdio: 'inherit',
    env: process.env,
  });
  children.push(child);
  child.on('exit', (code) => {
    if (!shuttingDown) {
      shuttingDown = true;
      console.log(`[WhatWine] ${name} exited with code ${code}`);
      for (const c of children) {
        if (!c.killed) c.kill('SIGTERM');
      }
      process.exit(code ?? 0);
    }
  });
  return child;
}

launch('node', ['server/index.mjs'], 'API Server');
launch('npx', ['vite', '--host', '0.0.0.0', '--port', '5173'], 'Vite Client');

function shutdown() {
  shuttingDown = true;
  for (const c of children) {
    if (!c.killed) c.kill('SIGTERM');
  }
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
