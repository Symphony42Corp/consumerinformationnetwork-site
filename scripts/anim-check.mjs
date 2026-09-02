import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const root='dist'; const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.woff2':'font/woff2'};
const srv=createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]);let f=join(root,p==='/'?'index.html':p);if(!existsSync(f)&&existsSync(f+'.html'))f=f+'.html';if(!existsSync(f)){res.writeHead(404);res.end();return;}res.writeHead(200,{'content-type':types[extname(f)]||'application/octet-stream'});res.end(readFileSync(f));}).listen(4322);
const b=await chromium.launch(); const page=await b.newPage({viewport:{width:1440,height:900}});
await page.goto('http://localhost:4322/',{waitUntil:'networkidle'});
const tiles = page.locator('.grid-3').first();
for (const [i,ms] of [[0,900],[1,1300],[2,2500],[3,3000]]) { await page.waitForTimeout(ms); await tiles.screenshot({path:`/home/claude/cin_shots/anim_${i}.png`}); }
const txt = await page.evaluate(()=>Array.from(document.querySelectorAll('[data-typed]')).map(e=>e.textContent));
console.log('typed now:', JSON.stringify(txt));
await b.close(); srv.close();
