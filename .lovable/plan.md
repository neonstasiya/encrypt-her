

## Plan: Reorder Emergency Grant Page — Story First

### What Changes

Reorganize the page so Rhea's spotlight appears immediately after the hero, followed by the donation form. The program info sections ("HerStory Spotlight" intro, "Why We Created This", "How Funded") move below the donation area, condensed into an "About This Program" section with anchor link from the hero.

### New Section Order

1. **Hero** (keep as-is, add a small "Learn about this program" anchor link)
2. **Current Spotlight: Rhea** (moved up from line 117)
3. **Zeffy Donation Embed** (moved up from line 240)
4. **Tax Status Disclaimer** (stays near donation)
5. **Grant Updates** (stays)
6. **About This Program** — combines the HerStory intro, Why We Created This, and How Funded into one section with an `id="about-program"` anchor
7. **Transparency Commitment** (stays at bottom)

### File Changed

- `src/pages/EmergencyGrant.tsx` — Reorder existing sections, add anchor link in hero pointing to `#about-program`, merge the three program-info sections into one condensed section near the bottom.

