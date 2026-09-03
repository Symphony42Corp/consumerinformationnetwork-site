import { webkit, devices } from 'playwright';
const url = process.argv[2] || 'https://www.consumerinformationnetwork.com/';
const b = await webkit.launch();
for (const [name, dev] of [['iphone13', devices['iPhone 13']], ['iphone15promax', devices['iPhone 15 Pro Max']]]) {
  const ctx = await b.newContext({ ...dev }); const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  const m = await page.evaluate(() => {
    const vw = window.innerWidth;
    const tiles = Array.from(document.querySelectorAll('.tile')).map(t => Math.round(t.getBoundingClientRect().width));
    const grid = document.querySelector('.grid-3'); const gw = grid ? Math.round(grid.getBoundingClientRect().width) : null;
    const cols = grid ? getComputedStyle(grid).gridTemplateColumns : null;
    const wide = Array.from(document.querySelectorAll('body *')).filter(e => !e.classList.contains('skip') && !e.classList.contains('nav-toggle')).filter(e => e.getBoundingClientRect().right > vw + 1).map(e => `${e.tagName}.${(e.className||'').toString().slice(0,20)} r=${Math.round(e.getBoundingClientRect().right)}`).slice(0,6);
    return { vw, docW: document.documentElement.scrollWidth, gridW: gw, cols, tiles, wide };
  });
  console.log(name, JSON.stringify(m));
  await page.screenshot({ path: `/home/claude/cin_shots/wk_${name}.png`, fullPage: false });
  await ctx.close();
}
await b.close();
