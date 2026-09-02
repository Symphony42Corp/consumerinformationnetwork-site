// Forbidden-string check over the built HTML (spec §7.1 + Sept 2026 rules).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const root = 'dist';
const patterns = [
  /\bOpenAI\b/i, /\bChatGPT\b/i, /\bGemini\b/i, /\bGoogle\b/i,
  /plain-english/i, /\bcold[- ]?call/i, /licensed expert/i,
  /guaranteed/i, /unsolicited/i, /outbound/i, /settle your debt/i, /reduce your debt/i, /debt free/i, /erase debt/i, /stop collections/i,
  /government (debt )?program/i, /debt relief expert/i, /expert guidance/i, /answers you can trust/i,
  /most likely to lower your rate/i, /compares? several top insurers/i, /save money/i,
  /\bfree\b/i, // reported as a warning; allowed only in the approved phrasings below
];
const allowedFree = [/always free\./i, /free for consumers/i, /provided at no cost/i];
const files = [];
(function walk(d){ for (const f of readdirSync(d)) { const p = join(d,f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(root);
let violations = 0, warnings = 0;
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  // strip tags and comments for body-text checks; legal pages are exempt from the marketing rules
  const text = html.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<!--[\s\S]*?-->/g,'').replace(/<[^>]+>/g,' ');
  const legal = /privacy-policy|terms-of-service/.test(f);
  for (const re of patterns) {
    const m = text.match(re);
    if (!m) continue;
    if (re.source === '\\bfree\\b') {
      const ctx = text.slice(Math.max(0, m.index - 40), m.index + 40).replace(/\s+/g,' ');
      if (allowedFree.some((a) => a.test(ctx))) continue;
      if (legal) continue;
      console.log(`WARN  ${f}: "free" outside approved phrasing → …${ctx}…`); warnings++; continue;
    }
    console.log(`FAIL  ${f}: matched ${re} → "${m[0]}"`); violations++;
  }
}
console.log(`${files.length} HTML files checked · ${violations} violations · ${warnings} warnings`);
process.exit(violations ? 1 : 0);
