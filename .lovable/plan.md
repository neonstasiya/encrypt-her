## Goal

Create a comprehensive Browser Fingerprinting Protection guide at `/guides/browser-fingerprinting` — the SEO finding flagged this as a high-traffic topic in the privacy space (EFF's "Cover Your Tracks" is a top traffic page for eff.org).

## What gets built

A new long-form guide page styled to match the existing `OnlinePrivacyStarterGuide` (same layout, header/footer, typography, glitch hero accent, ScrollAnimator reveals).

### Page sections

1. **Hero** — title, subtitle, "What you'll learn" badges
2. **What is browser fingerprinting?** — plain-language explanation, how it differs from cookies
3. **How sites fingerprint you** — canvas, WebGL, audio context, fonts, screen/timezone, User-Agent, hardware concurrency, WebRTC IP leaks, battery API
4. **Why it matters for women's safety** — tying it to stalkerware, doxxing, ad-tech tracking (EncryptHer's angle)
5. **Test your fingerprint** — outbound links to EFF Cover Your Tracks and amiunique.org
6. **Mitigation playbook** — ranked, actionable steps:
   - Use a hardened browser (Tor Browser, Mullvad Browser, Brave with Shields strict, LibreWolf)
   - Disable JavaScript on untrusted sites (NoScript)
   - Resist fingerprinting flags (`privacy.resistFingerprinting` in Firefox)
   - Block trackers (uBlock Origin, Privacy Badger)
   - VPN considerations + WebRTC leak protection
   - Avoid browser extensions that *increase* uniqueness
   - Mobile-specific tips (iOS Safari Lockdown Mode, DuckDuckGo browser)
7. **Common mistakes** — "more extensions = more privacy" myth, mixing identities across tabs
8. **FAQ accordion** — 4–6 Q&A pairs
9. **CTA** — link to newsletter + related guide

### Technical details

- New file `src/pages/BrowserFingerprintingGuide.tsx` — copies layout patterns from `OnlinePrivacyStarterGuide.tsx`
- New route in `src/App.tsx`: `<Route path="/guides/browser-fingerprinting" element={<BrowserFingerprintingGuide />} />`
- Add `/guides/browser-fingerprinting` entry to `pageMeta` in `src/hooks/usePageMeta.ts` (SEO title + meta description)
- Pass `Article` JSON-LD via `usePageMeta` options for rich-result eligibility
- Add a `SafetyGuides`-style card link on `/safety-guides` so it's internally linked
- Use shadcn `Accordion`, `Card`, `Button`; semantic `<main>`, single `<h1>`, sequential heading hierarchy (WCAG AAA per project core rules)
- All copy plain text/JSX — no `dangerouslySetInnerHTML`
- No PDF download (HTML-only); the existing privacy guide already has the download flow

### Out of scope

- No new database tables, no admin editing UI (static content)
- No PDF version
- No edge functions

## Files touched

- **new** `src/pages/BrowserFingerprintingGuide.tsx`
- **edit** `src/App.tsx` — add the route
- **edit** `src/hooks/usePageMeta.ts` — add page meta entry
- **edit** `src/pages/SafetyGuides.tsx` — add a card linking to the new guide
