

## Plan: Convert Featured Article to DB Post + Add Category Filtering

Two changes requested:

### 1. Insert the hardcoded featured article as a database blog post

Move the October 13, 2025 "The Growing Crisis" article from hardcoded HTML into the `blog_posts` table so it appears as a proper blog post with its own page at `/blog/the-growing-crisis-privacy-laws`.

**Database insert** with:
- **title**: "The Growing Crisis: How Lack of Privacy Laws Puts Everyone at Risk"
- **slug**: `the-growing-crisis-privacy-laws`
- **category**: "Privacy & Policy"
- **published_at**: `2025-10-13`
- **status**: `published`
- **author_name**: "EncryptHer Team"
- **excerpt**: The existing intro paragraph
- **content**: Full Markdown version of the article (Current State of Privacy Protection, Why This Matters for Women's Safety sections with all bullet points)

### 2. Remove the hardcoded featured article section

**File: `src/pages/Blog.tsx`** — Delete lines 91-144 (the entire featured article Card with Collapsible). It will now appear in the dynamic "Recent Posts" list with a "Read More" link that goes to its dedicated blog post page (`/blog/the-growing-crisis-privacy-laws`).

### 3. Make category badges clickable with filtering

**File: `src/pages/Blog.tsx`**:
- Add a `selectedCategory` state (`string | null`, default `null`)
- Add a category filter bar below the page header showing all unique categories from posts as clickable Badge buttons, plus an "All" option
- When a category is selected, filter the displayed posts to that category
- Make the category badges on individual post cards also clickable (using `e.preventDefault()` to stop the Link navigation, then setting the filter)

This gives the blog a polished feel: all posts are dynamic, each links to a full-page view ("Read More"), and categories act as clickable filters.

### Files Changed
- **Database** — insert blog post record
- `src/pages/Blog.tsx` — remove hardcoded article, add category filter state + UI

