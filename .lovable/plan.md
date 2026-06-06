Temporarily disable the SitePledgeGate (front pledge) so visitors are no longer blocked on entry, while keeping the component file intact for reactivation later.

## Changes
1. In `src/App.tsx`, comment out the `<SitePledgeGate />` JSX line and its import.
2. Leave `src/components/SitePledgeGate.tsx` and all pledge-related admin routes/pages untouched so the feature can be turned back on later.

## Notes
- No new dependencies.
- No database or backend changes.
- The pledge page (`/admin/pledges`) remains available in the admin panel for future use.
- Re-enabling later is a single-line uncomment in `App.tsx`.