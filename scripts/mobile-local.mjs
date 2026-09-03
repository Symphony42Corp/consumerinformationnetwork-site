import { chromium, devices } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.woff2':'font/woff2','.ico':'image/x-icon'};
const srv=createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]);let f=join('dist',p==='/'?'index.html':p);if(!existsSync(f)&&existsSync(f+'.html'))f=f+'.html';if(!existsSync(f)){res.writeHead(404);res.end();return;}res.writeHead(200,{'content-type':types[extname(f)]||'application/octet-stream'});res.end(readFileSync(f));}).listen(4323);
const b = await chromium.launch();
for (const [name, dev] of [['se', devices['iPhone SE']], ['i13', devices['iPhone 13']], ['pixel', devices['Pixel 7']], ['ipad', devices['iPad Mini']]]) {
  const ctx = await b.newContext({ ...dev }); const page = await ctx.newPage();
  for (const p of ['/', '/contact', '/about', '/burial-insurance-information-network']) {
    await page.goto('http://localhost:4323' + p, { waitUntil: 'networkidle' });
    const m = await page.evaluate(() => { const vw = window.innerWidth; const wide = Array.from(document.querySelectorAll('body *')).filter(e => !e.classList.contains('skip') && !e.classList.contains('nav-toggle')).filter(e => { const r = e.getBoundingClientRect(); return r.right > vw + 1 || r.left < -1; }).length; return { vw, docW: document.documentElement.scrollWidth, wide }; });
    if (m.wide || m.docW > m.vw) console.log('OVERFLOW', name, p, JSON.stringify(m));
  }
  await page.goto('http://localhost:4323/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `/home/claude/cin_shots/m_${name}_closed.png` });
  if (name === 'i13') { await page.click('label.menu-btn'); await page.waitForTimeout(200); await page.screenshot({ path: '/home/claude/cin_shots/m_i13_open.png' }); }
  await ctx.close();
}
await b.close(); srv.close(); console.log('mobile checks done');
