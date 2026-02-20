

## Fix Page-Specific Link Previews

### Why It's Not Working
The current setup has two pieces that don't connect:
- The backend function has the correct per-page metadata but crawlers never reach it
- The JavaScript hook updates meta tags, but crawlers (iMessage, WhatsApp, Facebook) don't run JavaScript — they only read the raw HTML of `index.html`, which always shows homepage content

### The Solution: Redirect Crawlers via the Backend

We need to make `index.html` detect when a bot/crawler is visiting and redirect it to the backend function. Since crawlers don't run JavaScript, we'll use an alternative approach:

**Add a `<noscript>` meta-refresh tag** plus a small inline script in `index.html` that redirects bot-like requests to the backend function. While this won't catch all crawlers, the more reliable approach is:

**Recommended: Use your custom domain (`encrypther.org`) with Cloudflare** to add a Worker that intercepts crawler traffic and proxies it to the backend function. This is the industry-standard solution for SPAs.

However, since that requires setup outside of Lovable, here's what we **can** do within the app:

### Practical Fix (within Lovable)

**Approach: Pre-populate `index.html` meta tags with a synchronous script**

Add an inline `<script>` block at the top of `index.html` that runs **immediately** (before React loads) and rewrites the OG meta tags based on `window.location.pathname`. This is a synchronous operation that completes before the HTML is fully parsed.

- This **does** work with **Google's crawler** (which executes JS)
- This **does NOT** work with iMessage, WhatsApp, or Facebook crawlers (they don't execute JS at all)

For full coverage on all platforms, the only real solution is a server-side proxy.

### What We'll Change

**File: `index.html`**
- Add an inline `<script>` in the `<head>` before the React entry point
- The script contains the same route-to-metadata map
- It reads `window.location.pathname` and immediately updates the `<meta>` tag `content` attributes
- This helps with Google and any JS-executing crawler

**File: `supabase/functions/og-meta/index.ts`**
- Remove the bot-only restriction — make it serve OG HTML for all requests so it can be used as a direct sharing URL
- Update the function to accept the path and always return the correct HTML

### Limitations (Important to Understand)

| Platform | Executes JS? | Will show correct preview? |
|----------|-------------|---------------------------|
| Google Search | Yes | Yes (with inline script) |
| iMessage | No | No (shows homepage info) |
| WhatsApp | No | No (shows homepage info) |
| Facebook | No | No (shows homepage info) |
| Twitter/X | No | No (shows homepage info) |
| Slack | Partial | Maybe |

To get iMessage/WhatsApp/Facebook working, you would need to set up a **Cloudflare Worker** on your `encrypther.org` domain that detects bot traffic and returns the correct HTML. This is a one-time setup outside of Lovable.

### Technical Details

**`index.html` inline script:**
```javascript
(function() {
  var path = window.location.pathname;
  var meta = { /* route map */ };
  var m = meta[path] || meta['/'];
  if (m) {
    document.querySelector('meta[property="og:title"]').content = m.title;
    document.querySelector('meta[property="og:description"]').content = m.description;
    document.querySelector('meta[property="og:url"]').content = 'https://encrypt-her.lovable.app' + path;
    document.title = m.title;
  }
})();
```

This runs synchronously before React mounts and updates the meta tags for any JS-executing crawler.
