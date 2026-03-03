

## Plan: Admin Emergency Grant Media Manager

Currently, the Emergency Grant page has hardcoded "Photo coming soon" placeholders, and there is no admin section to manage this page's media. This plan adds an admin page for uploading photos and videos for Rhea's story, and wires the Emergency Grant page to display them.

### What Gets Built

**1. Database: `emergency_grant_media` table**

A new table to store uploaded media references:
- `id` (uuid, primary key)
- `file_url` (text) — public storage URL
- `media_type` (text) — "photo" or "video"
- `caption` (text, nullable)
- `display_order` (integer, default 0)
- `created_at` (timestamp)

RLS: admin-only for insert/update/delete, public read (since the grant page is public).

**2. Storage bucket: `emergency-grant`**

A public storage bucket for grant photos and videos. Admin-only upload/delete policies.

**3. New admin page: `src/pages/AdminEmergencyGrant.tsx`**

- Upload photos (drag-and-drop or file picker, accepts images and video)
- Preview uploaded media
- Add/edit captions
- Reorder or delete media
- Link from the Admin Dashboard

**4. Update Admin Dashboard**

Add a new card: "Emergency Grant Media" linking to `/admin/emergency-grant`.

**5. Update `src/pages/EmergencyGrant.tsx`**

Replace the hardcoded photo placeholders (lines 149–170) with a query to `emergency_grant_media` that renders actual uploaded images/videos. Falls back to "Photo coming soon" if none exist.

**6. Add route in `src/App.tsx`**

Protected admin route for `/admin/emergency-grant`.

### Files Changed

- **Migration SQL** — create table + storage bucket + RLS policies
- `src/pages/AdminEmergencyGrant.tsx` — new file (upload UI)
- `src/pages/AdminDashboard.tsx` — add link card
- `src/pages/EmergencyGrant.tsx` — replace placeholder with dynamic media
- `src/App.tsx` — add route

