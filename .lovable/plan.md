

## Plan: Build the EncryptHer Emergency Grant Page

### What We're Building

A new `/emergency-grant` page featuring the "HerStory Spotlight" program — a story-driven donation page for Rhea and her 9-month-old baby in the Philippines. The page will embed a Zeffy donation form and follow the same accessible design patterns as existing pages.

### Page Structure

1. **Hero** — "EncryptHer Emergency Grant" title with subtitle about supporting women and mothers in developing countries
2. **HerStory Spotlight intro** — Program description explaining what HerStory Spotlight is and why it exists
3. **Why We Created This** — Program purpose (extending mission beyond digital safety to emergency relief)
4. **How This Program Is Funded** — Transparency section (community donations + portion of class proceeds)
5. **Current Spotlight: Rhea** — Her story (baby's bacterial infection, postpartum health challenges, Philippines, 9 months old), funds breakdown, goal amount, placeholder for photos/video
6. **Zeffy Donation Embed** — Placeholder iframe/link for the Zeffy form (you'll paste your Zeffy form URL once created)
7. **Tax Status Disclaimer** — 501(c)(3) pending notice with proper legal wording
8. **Updates Section** — Space for posting grant updates
9. **Transparency Commitment** — Trust-building footer section

### Files to Create/Modify

1. **Create** `src/pages/EmergencyGrant.tsx` — The full page component
2. **Modify** `src/App.tsx` — Add route `/emergency-grant`
3. **Modify** `src/components/AccessibleHeader.tsx` — Add nav link to Emergency Grant page

### Technical Details

- Follows existing page patterns (AccessibleHeader, AccessibleFooter, SkipLink, usePageMeta, aria attributes)
- Zeffy embed will be an iframe placeholder — you'll replace the `src` URL with your actual Zeffy campaign link
- Photo placeholders using styled containers (you'll upload Rhea's photos later via admin asset upload)
- Progress bar showing funding goal vs raised amount (static for now, can be made dynamic later)
- All content is hardcoded (no database table needed for this single page)
- Accessible: proper heading hierarchy, aria labels, semantic HTML

