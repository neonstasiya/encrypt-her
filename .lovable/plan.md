

## Plan: Style Blog Post Cards

### What Changes

Update the blog post cards on the Blog page to use the brand purple as a subtle left border accent and a gradient background, making them visually distinct and more "blog-like."

### Details

**File: `src/pages/Blog.tsx`**

- **Dynamic post cards (line 54)**: Change the `Card` className to add a left border accent (`border-l-4 border-l-primary`), a subtle gradient background (`bg-gradient-to-r from-primary/5 to-transparent`), and a stronger hover state (`hover:from-primary/10`).
- **Featured article card (line 72)**: Apply the same styling for visual consistency.

This uses the existing purple primary color from the design system, works in both light and dark mode, and maintains WCAG contrast requirements since only background tints change.

