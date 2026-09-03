import { chromium, devices } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ ...devices['iPhone 13'] });
const page = await ctx.newPage();
for (const p of ['/', '/information-networks', '/about', '/contact', '/burial-insurance-information-network', '/privacy-policy', '/terms-of-service']) {
  await page.goto('https://www.consumerinformationnetwork.com' + p, { waitUntil: 'networkidle' });
  const m = await page.evaluate(() => {
    const vw = window.innerWidth;
    const wide = Array.from(document.querySelectorAll('body *')).filter(e => { const r = e.getBoundingClientRect(); return r.right > vw + 1 || r.left < -1; }).map(e => `${e.tagName}.${(e.className||'').toString().slice(0,24)} [${Math.round(e.getBoundingClientRect().left)}..${Math.round(e.getBoundingClientRect().right)}]`);
    const small = Array.from(document.querySelectorAll('p,li,a,span,dt,dd')).filter(e => parseFloat(getComputedStyle(e).fontSize) < 13 && e.textContent.trim()).length;
    return { vw, docW: document.documentElement.scrollWidth, wide: wide.slice(0,6), tinyText: small };
  });
  console.log(p, JSON.stringify(m));
}
await page.goto('https://www.consumerinformationnetwork.com/contact', { waitUntil: 'networkidle' });
await page.screenshot({ path: '/home/claude/cin_shots/live_contact_m.png', fullPage: true });
await b.close();
