# EncryptHer Accessibility (A11y) Checklist

This document provides a comprehensive checklist for ensuring ADA/WCAG 2.1 AA compliance when developing new features or pages for EncryptHer.

---

## Table of Contents

1. [Page Structure](#page-structure)
2. [Navigation & Focus](#navigation--focus)
3. [Images & Media](#images--media)
4. [Forms & Inputs](#forms--inputs)
5. [Interactive Elements](#interactive-elements)
6. [Color & Contrast](#color--contrast)
7. [Typography & Content](#typography--content)
8. [Dynamic Content](#dynamic-content)
9. [Testing Tools](#testing-tools)

---

## Page Structure

### Required Elements

- [ ] **Skip Link** - Add `<SkipLink />` component at the start of the page
  ```tsx
  import { SkipLink } from "@/components/SkipLink";
  // At start of component return:
  <SkipLink />
  ```

- [ ] **Main Landmark** - Wrap main content in `<main id="main-content">`
  ```tsx
  <main id="main-content">
    {/* Page content */}
  </main>
  ```

- [ ] **Header Landmark** - Add `role="banner"` to header
  ```tsx
  <header role="banner">
  ```

- [ ] **Footer Landmark** - Add `role="contentinfo"` to footer
  ```tsx
  <footer role="contentinfo">
  ```

- [ ] **Page Title** - Use `usePageTitle` hook for dynamic document titles
  ```tsx
  import { usePageTitle } from "@/hooks/usePageTitle";
  usePageTitle("Page Name | EncryptHer");
  ```

### Heading Hierarchy

- [ ] Single `<h1>` per page (the main page title)
- [ ] Headings follow logical order (h1 → h2 → h3, no skipping levels)
- [ ] Use `aria-labelledby` to associate sections with their headings
  ```tsx
  <section aria-labelledby="section-heading">
    <h2 id="section-heading">Section Title</h2>
  </section>
  ```

---

## Navigation & Focus

### Keyboard Navigation

- [ ] All interactive elements are keyboard accessible (Tab, Enter, Space, Escape)
- [ ] Focus order follows logical reading order
- [ ] No keyboard traps (user can always navigate away)
- [ ] Skip link works and jumps to main content

### Focus States

- [ ] All focusable elements have visible focus indicators
- [ ] Use consistent focus ring styles:
  ```tsx
  className="focus:outline-none focus:ring-2 focus:ring-ring rounded"
  // Or for focus-visible only:
  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  ```

### Navigation Labels

- [ ] Navigation elements have `aria-label`:
  ```tsx
  <nav aria-label="Main navigation">
  <nav aria-label="Footer navigation">
  ```

- [ ] Current page indicated with `aria-current="page"`:
  ```tsx
  <Link to="/about" aria-current={isCurrentPage ? "page" : undefined}>
  ```

---

## Images & Media

### Decorative Images

- [ ] Mark decorative images with `aria-hidden="true"` and empty alt:
  ```tsx
  <img src={image} alt="" aria-hidden="true" />
  ```

### Informative Images

- [ ] Provide meaningful alt text describing content/purpose:
  ```tsx
  <img src={photo} alt="Women attending a digital privacy workshop" />
  ```

### Icons

- [ ] Decorative icons use `aria-hidden="true"`:
  ```tsx
  <Shield className="h-6 w-6" aria-hidden="true" />
  ```

- [ ] Icon-only buttons need `aria-label`:
  ```tsx
  <Button variant="ghost" size="icon" aria-label="Open navigation menu">
    <Menu className="h-6 w-6" aria-hidden="true" />
  </Button>
  ```

### Background Images

- [ ] Background/decorative images in containers use `aria-hidden`:
  ```tsx
  <div className="absolute inset-0" aria-hidden="true">
    <img src={bgImage} alt="" className="..." />
  </div>
  ```

---

## Forms & Inputs

### Labels

- [ ] Every input has an associated label:
  ```tsx
  <label htmlFor="email">Email Address</label>
  <input id="email" type="email" />
  ```

- [ ] Or use `aria-label` for inputs without visible labels:
  ```tsx
  <input aria-label="Search resources" type="search" />
  ```

### Required Fields

- [ ] Mark required fields with `aria-required="true"`:
  ```tsx
  <input aria-required="true" />
  ```

- [ ] Provide visual indication (asterisk, text)

### Error Messages

- [ ] Associate errors with inputs using `aria-describedby`:
  ```tsx
  <input id="email" aria-describedby="email-error" aria-invalid="true" />
  <span id="email-error" role="alert">Please enter a valid email</span>
  ```

### Form Groups

- [ ] Use `<fieldset>` and `<legend>` for grouped inputs:
  ```tsx
  <fieldset>
    <legend>Contact Preferences</legend>
    {/* Radio buttons or checkboxes */}
  </fieldset>
  ```

---

## Interactive Elements

### Buttons

- [ ] Use `<button>` or `<Button>` for actions (not `<div>` or `<span>`)
- [ ] Buttons have accessible names (text content or `aria-label`)
- [ ] Disabled buttons use `disabled` attribute or `aria-disabled`

### Links

- [ ] Links use `<a>` or `<Link>` elements
- [ ] Link text describes destination (avoid "click here")
- [ ] External links indicate they open in new tab:
  ```tsx
  <a href="..." target="_blank" rel="noopener noreferrer">
    External Link
    <span className="sr-only">(opens in new tab)</span>
  </a>
  ```

### Expandable Content

- [ ] Toggle buttons use `aria-expanded`:
  ```tsx
  <button aria-expanded={isOpen} aria-controls="content-id">
  ```

- [ ] Collapsible content has matching `id`:
  ```tsx
  <div id="content-id" hidden={!isOpen}>
  ```

### Dropdown Menus

- [ ] Menu trigger indicates state with `aria-expanded`
- [ ] Menu has `role="menu"` and items have `role="menuitem"`
- [ ] Support keyboard navigation (Arrow keys, Escape to close)

---

## Color & Contrast

### Contrast Ratios

- [ ] Normal text: minimum 4.5:1 contrast ratio
- [ ] Large text (18pt+ or 14pt+ bold): minimum 3:1 contrast ratio
- [ ] UI components and graphics: minimum 3:1 contrast ratio

### Color Independence

- [ ] Information is not conveyed by color alone
- [ ] Use icons, text, or patterns in addition to color
- [ ] Links are distinguishable from surrounding text (underline or other indicator)

### Design Tokens

- [ ] Use semantic color tokens from the design system:
  ```tsx
  // ✅ Correct
  className="text-foreground bg-background text-muted-foreground"
  
  // ❌ Avoid hardcoded colors
  className="text-black bg-white text-gray-600"
  ```

---

## Typography & Content

### Text Sizing

- [ ] Text can be resized up to 200% without loss of content
- [ ] Use relative units (rem, em) not fixed pixels for font sizes
- [ ] Line height is at least 1.5 for body text

### Reading

- [ ] Line length is comfortable (50-75 characters recommended)
- [ ] Sufficient spacing between paragraphs
- [ ] Avoid justified text (use left-aligned)

### Language

- [ ] Page language is set: `<html lang="en">`
- [ ] Language changes are marked: `<span lang="es">Hola</span>`

---

## Dynamic Content

### Live Regions

- [ ] Dynamic updates use `aria-live` regions:
  ```tsx
  // Polite announcements (wait for user to finish)
  <div aria-live="polite" aria-atomic="true">
    {statusMessage}
  </div>
  
  // Assertive announcements (interrupt immediately)
  <div role="alert">
    {errorMessage}
  </div>
  ```

### Loading States

- [ ] Indicate loading with `aria-busy="true"`:
  ```tsx
  <div aria-busy={isLoading}>
  ```

- [ ] Provide loading text for screen readers:
  ```tsx
  {isLoading && <span className="sr-only">Loading...</span>}
  ```

### Modals & Dialogs

- [ ] Use proper dialog semantics (`role="dialog"` or `<dialog>`)
- [ ] Set `aria-modal="true"` for modal dialogs
- [ ] Focus moves to dialog when opened
- [ ] Focus returns to trigger when closed
- [ ] Escape key closes dialog
- [ ] Background content has `aria-hidden="true"` when modal is open

---

## Testing Tools

### Automated Testing

1. **axe DevTools** - Browser extension for accessibility audits
2. **WAVE** - Web Accessibility Evaluation Tool
3. **Lighthouse** - Chrome DevTools accessibility audit
4. **eslint-plugin-jsx-a11y** - Linting for accessibility issues

### Manual Testing

1. **Keyboard-only navigation** - Navigate entire page using only keyboard
2. **Screen reader testing** - Test with VoiceOver (Mac), NVDA (Windows), or JAWS
3. **Zoom testing** - Test at 200% browser zoom
4. **Color contrast checker** - WebAIM Contrast Checker

### Screen Reader Testing Checklist

- [ ] All content is announced in logical order
- [ ] Images have appropriate descriptions
- [ ] Form fields are properly labeled
- [ ] Buttons and links announce their purpose
- [ ] Headings create a navigable document outline
- [ ] Dynamic content changes are announced

---

## Quick Reference: Common Patterns

### Accessible Card Link

```tsx
<Link 
  to="/page" 
  className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
  aria-label="Card title - brief description"
>
  <Card>
    <img src={image} alt="" aria-hidden="true" />
    <CardHeader>
      <div aria-hidden="true">
        <Icon className="h-6 w-6" />
      </div>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Description text</CardDescription>
    </CardHeader>
  </Card>
</Link>
```

### Accessible Button with Icon

```tsx
<Button aria-label="Close dialog">
  <X className="h-4 w-4" aria-hidden="true" />
  <span className="sr-only">Close</span>
</Button>
```

### Screen Reader Only Text

```tsx
// Use for additional context only screen readers should announce
<span className="sr-only">Opens in new tab</span>
```

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [WebAIM](https://webaim.org/)
- [Inclusive Components](https://inclusive-components.design/)

---

*Last updated: January 2026*
