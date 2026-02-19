

## Problem

GitHub Pages serves static files and doesn't know about React Router's client-side routes. When someone visits `encrypther.org/privacy-policy` directly (or refreshes on that page), GitHub Pages looks for a file at that path, finds nothing, and shows a 404 error.

This affects **all pages** on your site, not just Privacy Policy and Terms -- any direct URL visit or page refresh on a route other than the homepage will fail.

## Solution

Add a `404.html` file to the `public/` folder. This is a standard workaround for single-page apps (SPAs) on GitHub Pages. When GitHub Pages can't find a file, it serves `404.html` instead. This file will redirect the browser to your `index.html` while preserving the URL path, so React Router can then load the correct page.

## Technical Details

### Step 1: Create `public/404.html`

Create a small HTML file that:
- Captures the current URL path
- Redirects to the root (`/`) with the path stored in a session variable
- This allows `index.html` to pick up the intended route

This uses a well-known technique (the "spa-github-pages" approach) with a simple JavaScript redirect.

### Step 2: Add a redirect script to `index.html`

Add a small inline script in `index.html` (before the app loads) that checks if a redirect path was stored by `404.html`, and if so, uses `history.replaceState` to restore the correct URL so React Router handles it.

### Result

After this change, visiting `encrypther.org/privacy-policy`, `encrypther.org/terms`, or any other route directly will work correctly on GitHub Pages.

