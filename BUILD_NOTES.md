# BUILD NOTES — consumerinformationnetwork.com v1 (September 2, 2026)

## Validation performed
- `npm run build` — 12 pages, 6 legacy-slug redirect pages, sitemap, exit 0.
- `scripts/check-forbidden.mjs` — 0 violations, 0 warnings across 18 HTML files.
- Playwright screenshots (desktop 1440, mobile 390) reviewed for home, network page, directory, about, privacy.
- Every page ships as full HTML (no client-side rendering; no JavaScript required to read any page).

## Legal-text rulings (SPF, September 2, 2026 — no outside counsel; owner decisions)
1. Privacy Policy opening summary rewritten: no absolute promises ("collects only", "keeps it secure", "deletes on request") and no cold-calling mention. Site-wide rule: inbound-only is expressed positively ("Every conversation starts with you"), never as a denial.
2. Privacy Policy §7: "annual third-party security audits" and "retained indefinitely" replaced with defensible safeguards and retention-as-long-as-necessary language.
3. Privacy Policy: "Updated September 2026" line added (publish month), matching the Terms.
4. Terms §5: "CIN does not place unsolicited outbound calls or texts." replaced with "The Service is available only when you initiate contact with us."
5. Terms: Sections 8 and 9 added; "Updated" advanced to September 2026.
6. Privacy Policy §3 no-PHI statement kept; the Senior Care page states the same.
7. Privacy Policy §10 last-updated sentence aligned to September 2026.
8. Privacy Policy §4/§6: "train AI language models" replaced with "improve our AI Agents, including their prompts and conversation flows" — Symphony42 does not train foundation models on consumer transcripts; the opt-out wording follows.
The captured live text remains in `src/data/legal.json` unchanged; every edit is applied in the page templates and is reversible there.

## Publication state
- Debt Relief Information Network is present in the data (`published: false`) but not rendered, listed, or in the sitemap during the ad-platform brand review. Restore by removing the flag. Legacy `/debt-relief` redirects to the directory meanwhile.

## Open items for SPF
- Toll-free numbers for Debt Relief, Burial Insurance, and Senior Care (pages show "Phone number coming soon").
- Home Insurance "Available now": confirm 831-888-4242 answers with the AI Agent (Aug 10 audit noted a served≠published version discrepancy).
- symphony42.com/consumer-brands page deferred to the symphony42.com redesign (SPF ruling).
- FAQ blocks per network and FAQPage JSON-LD (v1.1) for AI-crawler profile building.
- Per-network language availability lines when multilingual agents go live.

## Deployment
Replit Static Deployment. `.replit` sets `deploymentTarget = "static"`, `publicDir = "dist"`, and clean-URL rewrites for every page (`/about` → `/about.html`, with and without trailing slash). `dist/404.html` is the custom not-found page. Legacy Squarespace slugs (`/auto-insurance`, `/auto-insurance-1`, …) are meta-refresh pages pointing at the canonical long-form slugs.
