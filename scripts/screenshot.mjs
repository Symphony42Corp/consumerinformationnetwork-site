import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const root = 'dist';
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.png':'image/png', '.ico':'image/x-icon', '.woff2':'font/woff2', '.xml':'application/xml', '.txt':'text/plain', '.webmanifest':'application/manifest+json' };
const srv = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = join(root, p === '/' ? 'index.html' : p);
  if (!existsSync(f) && existsSync(f + '.html')) f = f + '.html';
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { res.writeHead(404); res.end('nf'); return; }
  res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' });
  res.end(readFileSync(f));
}).listen(4321);
const browser = await chromium.launch();
const pages = process.argv.slice(2);
for (const [i, p] of pages.entries()) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await page.goto('http://localhost:4321' + p, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `/home/claude/cin_shots/${i}_${p.replace(/\W+/g,'_') || 'home'}.png`, fullPage: true });
  await page.close();
}
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
await m.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await m.screenshot({ path: '/home/claude/cin_shots/mobile_home.png', fullPage: true });
await browser.close(); srv.close();
console.log('shots done');
