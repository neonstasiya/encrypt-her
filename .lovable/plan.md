

**Component: `SitePledgeGate.tsx`**
- A full-screen modal overlay (not a route guard) that renders on top of any page when the user hasn't signed.
- Shows the pledge text + email input + "I agree & enter" button.
- On submit: stores email in a new `site_pledges` table, sets `localStorage.site_pledge_signed = true`, removes the overlay.
- Has a small "Need help right now?" link in the corner that scrolls past the modal to surface RAINN/hotline numbers (so a woman in crisis is never blocked).

**Integration: mount once in `App.tsx`**
- Renders globally above all routes.
- Reads `localStorage` on mount — if signed, never shows.
- Excluded routes: `/auth`, `/reset-password`, `/unsubscribe` (admin/utility flows).

**SEO protection (critical):**
- The modal is rendered as a sibling overlay, NOT conditionally hiding page content. Page HTML stays fully intact in the DOM.
- No `noindex`, no redirects, no server-side gating.
- Add a tiny "Skip pledge" text link in the modal footer for accessibility (WCAG) and as a safety valve for crisis users — they can dismiss with a click and `localStorage` records "skipped" so they're not nagged.

**Database:**
- New table `site_pledges` (id, email nullable, agreed_at, ip_hash, user_agent) with RLS allowing public INSERT only.
- Email is optional — pledge can be signed without email (lower friction, still captures intent + analytics).

**Pledge copy (draft):**
> "EncryptHer exists to protect women — many of whom face abuse, stalking, or surveillance every day. Before you enter, I pledge to use what I learn here to keep myself and others safer, and never to weaponize this knowledge against another person."
> 
> [ optional email field ]
> [ ✓ I agree ] [ Enter EncryptHer ]
> 
> *In crisis right now? [Skip and view emergency resources →]*

**Admin:** Add a "Pledge Signups" tile in `/admin` showing total pledges + email exports (CSV).

**Files to create/edit:**
- `src/components/SitePledgeGate.tsx` (new)
- `src/App.tsx` (mount gate)
- `src/pages/AdminPledges.tsx` (new admin view)
- `src/pages/AdminDashboard.tsx` (add tile)
- New migration: `site_pledges` table + RLS

**Tradeoffs to know:**
- First-visit friction will modestly reduce bounce-rate-adjusted engagement (~5-15% typical for pledge modals).
- Email capture rate will be lower than a hard gate (~20-40% vs 60%+) because email is optional.
- Crisis-safety escape hatch is non-negotiable for the mission.

