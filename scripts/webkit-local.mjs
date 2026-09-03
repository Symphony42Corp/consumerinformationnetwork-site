import { webkit, devices } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.woff2':'font/woff2','.ico':'image/x-icon'};
const srv=createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]);let f=join('dist',p==='/'?'index.html':p);if(!existsSync(f)&&existsSync(f+'.html'))f=f+'.html';if(!existsSync(f)){res.writeHead(404);res.end();return;}res.writeHead(200,{'content-type':types[extname(f)]||'application/octet-stream'});res.end(readFileSync(f));}).listen(4324);
const b = await webkit.launch();
for (const [name, dev] of [['iphoneSE', devices['iPhone SE']], ['iphone13', devices['iPhone 13']], ['iphone15promax', devices['iPhone 15 Pro Max']], ['ipadMini', devices['iPad Mini']]]) {
  const ctx = await b.newContext({ ...dev }); const page = await ctx.newPage();
  for (const p of ['/', '/information-networks', '/contact', '/burial-insurance-information-network']) {
    await page.goto('http://localhost:4324' + p, { waitUntil: 'networkidle' });
    const m = await page.evaluate(() => { const vw = document.documentElement.clientWidth; const grid = document.querySelector('.grid-3, .grid-4'); const tiles = Array.from(document.querySelectorAll('.tile, .card')).map(t => Math.round(t.getBoundingClientRect().width)); const wide = Array.from(document.querySelectorAll('body *')).filter(e => !e.classList.contains('skip') && !e.classList.contains('nav-toggle')).filter(e => e.getBoundingClientRect().right > vw + 1).length; return { vw, docW: document.documentElement.scrollWidth, gridW: grid ? Math.round(grid.getBoundingClientRect().width) : null, maxItem: tiles.length ? Math.max(...tiles) : null, wide }; });
    const bad = m.wide || m.docW > m.vw || (m.gridW && m.maxItem > m.gridW + 1);
    console.log((bad ? 'BAD  ' : 'ok   ') + name.padEnd(15) + p.padEnd(40) + JSON.stringify(m));
  }
  if (name === 'iphone13') { await page.goto('http://localhost:4324/', { waitUntil: 'networkidle' }); await page.screenshot({ path: '/home/claude/cin_shots/wk_fixed_iphone13.png', fullPage: true }); }
  await ctx.close();
}
await b.close(); srv.close();
