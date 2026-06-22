## Add Browser Fingerprinting Guide to /resources

The new guide page exists at `/guides/browser-fingerprinting` but isn't listed on the Resources page. I'll add it to the "Downloadable Guides" grid as an available guide.

### Change
**Edit `src/pages/Resources.tsx`** — add a new entry to the `downloadableGuides` array (after "Online Privacy Starter Guide"):

```ts
{
  title: "Browser Fingerprinting Guide",
  description: "Learn how websites track you across the web — and the mitigation playbook to reduce your fingerprint.",
  icon: Eye,
  available: true,
  link: "/guides/browser-fingerprinting"
}
```

This will render as a "Read Guide" card alongside the Online Privacy Starter Guide. No other changes needed — the existing card renderer already handles `available: true` + `link` correctly.

### Out of scope
- No changes to routing, SEO metadata, or the guide page itself (already in place from the previous turn).
- Not touching the footer dropdown (state-only).