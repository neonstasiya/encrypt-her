

## Plan: Publish Grant Update as Blog Post

### What Changes

Insert a new published blog post into the `blog_posts` table with the Grant Updates content, formatted as a full article with context about the Emergency Grant program and Rhea's story.

### Implementation

**1. Insert blog post via database insert tool**

- **title**: "Campaign Launched: EncryptHer Emergency Grant for Rhea and Her Baby"
- **slug**: `campaign-launched-encrypther-emergency-grant-rhea`
- **status**: `published`
- **published_at**: `2026-03-03`
- **author_name**: "EncryptHer Team"
- **excerpt**: "The EncryptHer Emergency Grant campaign for Rhea and her baby has been launched. We are raising funds to help cover medical expenses and essential care."
- **content**: Markdown article covering the campaign launch, Rhea's story summary, what funds will cover, and a call to action linking to the Emergency Grant page (`/emergency-grant`).

**2. No code changes needed** — the existing Blog and BlogPost pages already render published posts dynamically from the database.

### Note on Photos & Videos

The blog post content will reference the Emergency Grant page for photos and videos. If you'd like specific images embedded directly in the blog post, you can upload them through the Admin Blog Editor after the post is created — the editor supports image uploads and Markdown image embedding.

