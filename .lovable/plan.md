

## Dynamic Link Previews Per Page

### The Challenge
Your app is a Single Page Application (SPA). When someone shares a link like `encrypt-her.lovable.app/privacy-policy`, messaging apps request that URL but always receive the same `index.html` with the home page's title and description. They can't see page-specific content because the page is rendered by JavaScript after loading.

### The Solution
We'll add **Open Graph meta tags back** to `index.html` with sensible defaults, **plus** create a `usePageMeta` hook that dynamically updates these tags when each page loads. This approach works with messaging apps that execute JavaScript (iMessage, many modern crawlers).

For apps that **don't** execute JavaScript (some older platforms), we'll also create a small **backend function** that detects bot/crawler requests and returns page-specific meta tags in the HTML before JavaScript runs.

### What We'll Do

**Step 1: Add default Open Graph tags back to `index.html`**
- Add `og:title`, `og:description`, `og:type`, `og:url`, and `og:image` with sensible defaults

**Step 2: Create a `usePageMeta` hook**
- Extends the existing `usePageTitle` pattern
- Dynamically updates `og:title`, `og:description`, and `og:url` meta tags in the document head based on the current route
- Each page will have its own title and description mapping (similar to the existing `pageTitles` map in `usePageTitle.ts`)

**Step 3: Update all page components**
- Replace `usePageTitle` calls with `usePageMeta` calls in each page component, providing page-specific descriptions

**Step 4: Create a backend function for bot detection**
- A backend function that intercepts requests from known crawlers/bots (WhatsApp, iMessage, Facebook, Twitter)
- Returns a lightweight HTML page with the correct Open Graph tags for the requested URL
- This ensures previews work even on platforms that don't run JavaScript

### Important Note
- **Most messaging apps** (iMessage, WhatsApp, Facebook Messenger) will show the correct page-specific preview after these changes
- The preview will show the **title and description** of the specific page being shared, not the home page
- Some platforms cache previews aggressively, so previously shared links may take time to update

### Technical Details

**New file:** `src/hooks/usePageMeta.ts`
- Contains a map of routes to `{ title, description }` objects
- Updates `document.title` and `<meta>` tags in `<head>` on route change

**Modified file:** `index.html`
- Re-add `og:title`, `og:description`, `og:type`, `og:url` meta tags with default values

**Modified files:** All page components (~20 files)
- Switch from `usePageTitle()` to `usePageMeta()` 

**New file:** `supabase/functions/og-meta/index.ts`
- Bot-detection edge function that returns correct meta tags per route

