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

---

# BUILD NOTES — v1.1 (September 9, 2026): AIIN call page

## What was added
- `/auto-insurance/call` — paid-traffic call-conversion page per the AIIN Call Landing Page Build Plan v2 (Sept 8, 2026). New files: `src/data/callPages.ts`, `src/layouts/CallLayout.astro`, `src/pages/auto-insurance/call.astro`, `public/fonts/instrument-serif-latin-400-normal.woff2`, `public/images/cin-mark-72.{webp,png}`.
- `astro.config.mjs` sitemap filter excludes any `/call` route. `scripts/make-replit-config.mjs` now walks nested `dist/` folders and lists deeper paths first.

## Validation performed
- `npm run build` — 12 pages + 6 legacy redirects; `check-forbidden.mjs` 18 files, 0 violations, 0 warnings.
- Review parity: `dist/auto-insurance-information-network.html` byte-identical to the pre-change build; every other pre-existing file in `dist/` unchanged (only additions).
- Chromium 390×844: headline, sub-headline, call button (60 px tall, y 382–442) and availability line all visible without scrolling; CLS 0; `?hl=car` swaps headline and title; sticky bar hidden at top, shown after scroll; links = 2× `tel:+18888021722`, Privacy, Terms only; `meta robots noindex` present; `+18888021722` in source.
- Page weight ≈ 38 KB (HTML 14.6 KB + font 21 KB + mark 1.9 KB), before the Google tag.

## Deviations from the plan — RULED (Governor reply, Sept 9 2026, recorded as SPF's rulings)
All three approved as built: Instrument Serif headings (do not add Manrope; plan §5.8 amended to "one preloaded heading face permitted within the 60 KB budget"), `--green` call button, and the sub-headline copy (sign-off granted for launch).
1. Display font: the plan's budget said "system font stack, no web fonts"; SPF's build instruction said "match the style and design of the rest of the site". Resolution: one preloaded Instrument Serif file for headings (the site's signature), system sans for body. Metric-matched local fallbacks keep CLS at 0 if the font is late. Adding Manrope for body text is one more file (+25 KB) if wanted.
2. Call button color: `--green` from the site's own token set, not the azure used for `.btn` elsewhere — the plan asked for a high-contrast color that is not the site's blue. Reverting to azure is a one-line CSS change.

## Tracking state (Sept 9, 2026, second push)
- `ads.tagId = 'AW-11394874943'` (account conversion ID, read live by the Governor room). The base Google tag now renders; the forwarding-number snippet and tap event stay off until `callLabel` / `tapLabel` arrive from the Governor room's bootstrap write (AIIN LP Call — WEBSITE_CALL, 60 s, Secondary; AIIN LP Tap — CLICK_TO_CALL, Secondary).
- Publish sequencing (Governor ruling): Publish #1 now; Publish #2 after the labels are wired.

## Labels wired (Sept 14, 2026, third push)
- `callLabel = hgH-CJ6yx_IcEL_8v7kq` (AIIN LP Call, 7756437790) and `tapLabel = 8G6PCKGyx_IcEL_8v7kq` (AIIN LP Tap, 7756437793), from the Governor room's receipted bootstrap write BOOT-CONVACT-6e11f97c6fcb. The forwarding-number snippet and the tap event now render. Tap event sends with `transport_type: beacon`.
- Verified locally: `cinPhoneSwap(formatted, mobile)` rewrites text and `tel:` on both call elements (E.164 and plain-digit inputs); a tap pushes `event: conversion, send_to: AW-11394874943/8G6PCKGyx_IcEL_8v7kq`.
- Note: the Publish of Sept 9 (23:31 GMT) shipped the ec83b62 build because these labels had not yet reached this room. This push is what that Publish was meant to carry.

## Still open
- Publish; then `#google-wcc-debug` + Tag Assistant on the live URL (acceptance 4 and 11) and Lighthouse LCP (acceptance 6).
- Governor project: final-URL switch while PAUSED (Option A: both RSAs → `/auto-insurance/call?hl=quotes`), after Prompt B passes; approval_status joins the pre-enable invariants.
