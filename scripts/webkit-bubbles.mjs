import { webkit, devices } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.woff2':'font/woff2','.ico':'image/x-icon'};
const srv=createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]);let f=join('dist',p==='/'?'index.html':p);if(!existsSync(f)&&existsSync(f+'.html'))f=f+'.html';if(!existsSync(f)){res.writeHead(404);res.end();return;}res.writeHead(200,{'content-type':types[extname(f)]||'application/octet-stream'});res.end(readFileSync(f));}).listen(4325);
const b = await webkit.launch();
for (const [name, dev] of [['iphoneSE', devices['iPhone SE']], ['iphone13', devices['iPhone 13']]]) {
  const ctx = await b.newContext({ ...dev }); const page = await ctx.newPage();
  await page.goto('http://localhost:4325/', { waitUntil: 'networkidle' }); await page.waitForTimeout(2500);
  const m = await page.evaluate(() => { const vw = document.documentElement.clientWidth; const t = document.querySelector('.thread').getBoundingClientRect(); const bubbles = Array.from(document.querySelectorAll('.bubble')).map(e => { const r = e.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.right)]; }); return { vw, thread: [Math.round(t.left), Math.round(t.right)], bubbles, over: bubbles.some(([l,r]) => r > t.right + 1 || l < t.left - 1) }; });
  console.log(name, JSON.stringify(m));
  await ctx.close();
}
await b.close(); srv.close();
