

## Plan: Add "Read More" Link to Blog Post Cards

The old hardcoded featured article had an expandable "Read More" collapsible section. Now that the article lives in the database and links to its own page (`/blog/:slug`), we should add a visible **"Read More →"** link at the bottom of each blog post card so users have a clear call-to-action.

### Changes

**File: `src/pages/Blog.tsx`** — Add a "Read More →" text link at the bottom of each post card, styled in the primary color. This goes after the author/date line, inside the existing `<Link>` wrapper, so clicking it navigates to the full post page.

```
Read More →
```

Styled as `text-primary font-semibold text-sm mt-3` with a right arrow to indicate navigation.

