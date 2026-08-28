#!/usr/bin/env node

import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(directory, '_site');
const port = Number(process.env.DOCS_PORT || 4173);
const mime = {
  '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon',
};

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const pathname = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
  const file = path.resolve(root, `.${pathname}`);
  if (!file.startsWith(root)) { response.writeHead(403); response.end('Forbidden'); return; }
  try {
    const body = await fs.readFile(file);
    response.writeHead(200, { 'Content-Type': mime[path.extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-cache' });
    response.end(body);
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(error.code === 'ENOENT' ? 'Not found' : 'Server error');
  }
});

server.listen(port, '127.0.0.1', () => console.log(`GSAP learning docs: http://127.0.0.1:${port}`));
