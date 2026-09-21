# consumerinformationnetwork.com

Static site for Consumer Information Network, LLC (a wholly owned subsidiary of Symphony42 Corporation).
Built with Astro; every page is prerendered to plain HTML in `dist/` for Replit Static Deployment.

## Structure
- `src/data/networks.ts` — the Information Networks. **Adding a network = adding one object here.** The home index, the directory page, the per-network page, the contact list, and the sitemap are generated from it.
- `src/data/legal.json` — the Privacy Policy and Terms of Service text, preserved verbatim from the live site (captured Sept 2, 2026). Do not paraphrase.
- `src/pages/` — home, information-networks, about, contact, privacy-policy, terms-of-service, 404, and `[slug]` (one page per network).
- `src/data/callPages.ts` + `src/layouts/CallLayout.astro` + `src/pages/<vertical>/call.astro` — paid-traffic call pages (see below).
- `src/components/` — header, footer, modality tiles, directory, how-it-works, status badge.
- `public/` — icon package derived from the master "i" mark, robots.txt (explicitly allows OAI-AdsBot and OAI-SearchBot), web manifest.
- `scripts/check-forbidden.mjs` — fails the build on forbidden strings (platform names, outcome claims, disallowed phrasing).
- `scripts/make-replit-config.mjs` — writes `.replit` with the static deployment target and clean-URL rewrites (nested routes included).

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

## Call pages (paid traffic only)
`/auto-insurance/call` is the landing page for paid Google Ads clicks on Auto Insurance Information Network keywords (AIIN Call Landing Page Build Plan v2, Sept 8 2026). Rules:
- **One call page per campaign / phone number / agent.** Headline variants for different ad groups live inside the one page via `?hl=` (`quotes` or `auto` → "Auto Insurance Quotes By Phone"; `car` → "Car Insurance Quotes By Phone"); unknown values fall back to the default. A new page is warranted only when a new number and a new agent enter the picture. First switch (Governor reply, Sept 9 2026, Option A): both live RSAs → `?hl=quotes`; `?hl=car` stays built and idle until a single-pin "Car" ad exists.
- The page is `noindex`, excluded from the sitemap, and **never linked from the indexed site**. The reviewed informational page (`/auto-insurance-information-network`) is untouched; `scripts` and the shared CSS bundle are not imported by the call layout so those pages stay byte-for-byte identical.
- **Second address, same page:** `/auto-insurance` serves the identical AIIN call page (`src/pages/auto-insurance.astro` renders the same `CallLayout` with the same `aiinCall` data), so the built HTML is byte-identical to `/auto-insurance/call`. It exists because `/auto-insurance` is the verification URL and final URL of the two legacy Google call-only ads (888-802-1722); Google must find the number at that exact address. It is noindex, excluded from the sitemap, and never linked. Not a new page under the doctrine: same number, same agent (Governor requirements doc, Sept 21 2026; approved by SPF).
- Only `tel:` links plus Privacy Policy and Terms of Service are clickable. No navigation, no second phone number.
- The number is `888-802-1722` on both the ad's call button and the page (SPF ruling, Sept 8 2026). Every call element carries the number in its visible text **and** its `tel:` href — required for the Google forwarding-number swap.
- Tracking: `ads.tagId` (the account's conversion ID) renders the base Google tag; `ads.callLabel` (AIIN LP Call) renders the forwarding-number snippet; `ads.tapLabel` (AIIN LP Tap) enables the click event. Each is independently gated in `CallLayout.astro`.
- Weight budget: inline CSS, one preloaded display font (`public/fonts/`), one small mark (`cin-mark-72.*`), system sans for body text.
