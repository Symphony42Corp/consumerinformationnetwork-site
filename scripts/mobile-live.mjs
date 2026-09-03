import { chromium, devices } from 'playwright';
const b = await chromium.launch();
const shots = [];
for (const [name, dev] of [['iphone13', devices['iPhone 13']], ['pixel7', devices['Pixel 7']]]) {
  const ctx = await b.newContext({ ...dev });
  const page = await ctx.newPage();
  await page.goto('https://www.consumerinformationnetwork.com/', { waitUntil: 'networkidle' });
  const m = await page.evaluate(() => ({ vw: window.innerWidth, docW: document.documentElement.scrollWidth, bodyW: document.body.scrollWidth,
    wide: Array.from(document.querySelectorAll('body *')).filter(e => e.getBoundingClientRect().right > window.innerWidth + 1).slice(0, 8).map(e => e.tagName + '.' + (e.className || '').toString().slice(0,30) + ' right=' + Math.round(e.getBoundingClientRect().right)) }));
  console.log(name, JSON.stringify(m));
  await page.screenshot({ path: `/home/claude/cin_shots/live_${name}.png`, fullPage: false });
  await ctx.close();
}
await b.close();
