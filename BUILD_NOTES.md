# BUILD NOTES — consumerinformationnetwork.com v1 (September 2, 2026)

## Validation performed
- `npm run build` — 12 pages, 6 legacy-slug redirect pages, sitemap, exit 0.
- `scripts/check-forbidden.mjs` — 0 violations, 0 warnings across 18 HTML files.
- Playwright screenshots (desktop 1440, mobile 390) reviewed for home, network page, directory, about, privacy.
- Every page ships as full HTML (no client-side rendering; no JavaScript required to read any page).

## Items flagged for counsel review (text preserved verbatim; comments placed in the HTML)
1. Privacy Policy §7 "annual third-party security audits" — confirm literally true and documented; otherwise soften to "commercially reasonable technical, administrative, and organizational safeguards designed to protect personal information."
2. Privacy Policy §7 "retained indefinitely" — recommended: "for as long as reasonably necessary for service delivery, quality assurance, compliance, security, dispute resolution, AI improvement, and other legitimate business purposes, unless deletion is requested and deletion is legally and operationally permitted."
3. Privacy Policy §3 "protected health information" — confirm still accurate as Senior Care Information Network launches; the site states the Senior Care AI Agent operates at a non-medical level and does not collect PHI.
4. Terms of Service — Sections 8 (Category-Specific Service Limitations) and 9 (Third-Party Provider Independence) added; the "Updated" line advanced from June 2025 to September 2026 to reflect the additions.
5. Privacy Policy "plain-language snapshot" line contains the phrase "never cold-calls you." It is legal text and was preserved verbatim, but it conflicts with the site-wide rule against cold-call phrasing. Owner decision: keep, or replace with "only responds when you reach out."

## Open items for SPF
- Toll-free numbers for Debt Relief, Burial Insurance, and Senior Care (pages show "Phone number coming soon").
- Home Insurance "Available now": confirm 831-888-4242 answers with the AI Agent (Aug 10 audit noted a served≠published version discrepancy).
- symphony42.com/consumer-brands page (parent-side affiliation link) before the ad-platform brand change.
- FAQ blocks per network and FAQPage JSON-LD (v1.1) for AI-crawler profile building.
- Per-network language availability lines when multilingual agents go live.

## Deployment
Replit Static Deployment. `.replit` sets `deploymentTarget = "static"`, `publicDir = "dist"`, and clean-URL rewrites for every page (`/about` → `/about.html`, with and without trailing slash). `dist/404.html` is the custom not-found page. Legacy Squarespace slugs (`/auto-insurance`, `/auto-insurance-1`, …) are meta-refresh pages pointing at the canonical long-form slugs.
