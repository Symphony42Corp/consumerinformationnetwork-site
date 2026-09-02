# consumerinformationnetwork.com

Static site for Consumer Information Network, LLC (a wholly owned subsidiary of Symphony42 Corporation).
Built with Astro; every page is prerendered to plain HTML in `dist/` for Replit Static Deployment.

## Structure
- `src/data/networks.ts` — the Information Networks. **Adding a network = adding one object here.** The home index, the directory page, the per-network page, the contact list, and the sitemap are generated from it.
- `src/data/legal.json` — the Privacy Policy and Terms of Service text, preserved verbatim from the live site (captured Sept 2, 2026). Do not paraphrase.
- `src/pages/` — home, information-networks, about, contact, privacy-policy, terms-of-service, 404, and `[slug]` (one page per network).
- `src/components/` — header, footer, modality tiles, directory, how-it-works, status badge.
- `public/` — icon package derived from the master "i" mark, robots.txt (explicitly allows OAI-AdsBot and OAI-SearchBot), web manifest.
- `scripts/check-forbidden.mjs` — fails the build on forbidden strings (platform names, outcome claims, disallowed phrasing).
- `scripts/make-replit-config.mjs` — writes `.replit` with the static deployment target and clean-URL rewrites.

## Build
```
npm install
npm run build
node scripts/make-replit-config.mjs
node scripts/check-forbidden.mjs
```
Output: `dist/` (committed so Replit can serve it without a build step).

## Rules baked in
- The master mark appears exactly twice on the home page (nav, and as the AI Agent avatar).
- Vocabulary: "Expert AI Agents" (the AI), "human Expert" (the people). No "licensed Expert" at the family level. No "plain-English". No "cold call".
- Never name other AI companies or search engines on the site.
- "Available now" only for a network whose phone number answers.
