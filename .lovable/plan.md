

## Remove Rich Link Previews When Sharing URLs

### What's Happening
Your `index.html` contains **Open Graph** and **Twitter Card** meta tags that instruct messaging apps (iMessage, WhatsApp, Facebook Messenger, etc.) to generate a rich preview with your site's title, description, and image.

### What We'll Change
Remove the Open Graph (`og:`) and Twitter Card (`twitter:`) meta tags from `index.html` (lines 11-24). This will cause most messaging platforms to display the URL as plain text instead of generating a preview card.

### Important Considerations
- **This is generally not recommended.** Rich previews make your links look more professional and increase click-through rates. Most organizations and businesses intentionally add these tags.
- **Not 100% guaranteed.** Some messaging apps may still attempt to generate a preview by scraping your page title and description meta tag (line 8). To fully prevent previews, the description meta tag could also be removed, but that would hurt your SEO.
- **SEO impact.** Open Graph tags help with social media SEO and sharing. Removing them means links shared on Facebook, LinkedIn, Twitter/X, etc. will also lose their rich appearance.

### Recommendation
Consider keeping the Open Graph tags -- they're a standard web feature that benefits your site's visibility. If you still want to proceed, we'll remove lines 11-24 from `index.html`.

### Technical Details
- **File:** `index.html`
- **Lines to remove:** 11-24 (all `og:*` and `twitter:*` meta tags)
- No other files need changes

