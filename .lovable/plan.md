
The user wants a "Online Privacy Starter Guide" — referenced from the Resources page (currently shows download cards as "Coming Soon"). Let me check that page first to understand context.

Looking at the codebase: `src/pages/Resources.tsx` likely has a card for "Online Privacy Starter Guide" linking to `/coming-soon`. The user wants this to become real content.

Two delivery options exist:
1. A web page at `/guides/online-privacy-starter` (consistent with site, accessible, SEO-friendly)
2. A downloadable PDF (offline use, shareable)

Best approach: **Do both** — create a dedicated content page AND generate a downloadable PDF that the page links to. This matches the existing "Resources" pattern of having both online courses and downloadable guides.

## Plan

### 1. Create downloadable PDF
- Generate `online-privacy-starter-guide.pdf` using ReportLab with EncryptHer branding (purple accents, clean typography)
- Save to `/public/guides/online-privacy-starter-guide.pdf` so it's served as a static asset
- Content sections:
  1. Introduction — why digital privacy matters
  2. Audit your digital footprint (Google yourself, check data broker sites)
  3. Strong passwords + password manager setup
  4. Enable two-factor authentication (2FA)
  5. Lock down social media privacy settings
  6. Secure your browser (privacy extensions, tracker blocking)
  7. Email privacy basics
  8. Mobile device privacy (app permissions, location)
  9. Public Wi-Fi safety + VPN basics
  10. Quick checklist / next steps
- QA: render to images, verify layout, no clipping, readable

### 2. Create web page `/guides/online-privacy-starter`
- New file: `src/pages/OnlinePrivacyStarterGuide.tsx`
- Same content as PDF, formatted for web with:
  - AccessibleHeader + AccessibleFooter
  - Hero section with title + intro
  - Numbered sections with icons (Lucide)
  - Prominent "Download PDF" button at top and bottom
  - Quick-jump table of contents
- Register route in `src/App.tsx`
- Add page meta in `src/hooks/usePageMeta.ts`

### 3. Wire up the Resources page
- Update `src/pages/Resources.tsx`: change the "Online Privacy Starter Guide" card from "Coming Soon" to link to `/guides/online-privacy-starter`
- Remove the "Coming Soon" badge for this card

### Files Changed
- `/mnt/documents/online-privacy-starter-guide.pdf` → copied to `public/guides/`
- `src/pages/OnlinePrivacyStarterGuide.tsx` (new)
- `src/App.tsx` (add route)
- `src/hooks/usePageMeta.ts` (add meta entry)
- `src/pages/Resources.tsx` (link the card)
