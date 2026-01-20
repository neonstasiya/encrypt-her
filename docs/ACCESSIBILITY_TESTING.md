# Automated Accessibility Testing

This project uses **Vitest** and **axe-core** (via vitest-axe) for automated accessibility testing, targeting **WCAG 2.2 AAA** compliance.

## Running Tests

```bash
# Run all tests
npx vitest

# Run tests in watch mode
npx vitest --watch

# Run only accessibility tests
npx vitest a11y

# Run tests with coverage
npx vitest --coverage
```

## Test Structure

```
src/
├── test/
│   ├── setup.ts          # Test setup and global mocks
│   ├── test-utils.tsx    # Custom render with providers
│   ├── a11y-utils.ts     # Accessibility testing utilities
│   └── vitest-axe.d.ts   # TypeScript declarations
├── components/
│   └── __tests__/
│       └── SkipLink.a11y.test.tsx
└── pages/
    └── __tests__/
        ├── Index.a11y.test.tsx
        ├── NotFound.a11y.test.tsx
        ├── About.a11y.test.tsx
        └── Contact.a11y.test.tsx
```

## Writing Accessibility Tests

### Basic Page Test

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { checkA11y } from '@/test/a11y-utils';
import MyPage from '../MyPage';

describe('MyPage Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<MyPage />);
    await checkA11y(container);
  });

  it('should have required landmarks', () => {
    render(<MyPage />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
```

### Component Test

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { checkA11y } from '@/test/a11y-utils';
import MyComponent from '../MyComponent';

describe('MyComponent Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<MyComponent />);
    await checkA11y(container);
  });

  it('should have accessible button', () => {
    render(<MyComponent />);
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeInTheDocument();
  });
});
```

## WCAG 2.2 AAA Compliance

This project targets WCAG 2.2 AAA compliance. Key requirements:

### Automated Checks (axe-core)

| Criterion | Level | Description | Tested |
|-----------|-------|-------------|--------|
| 1.4.3 Contrast (Minimum) | AA | 4.5:1 contrast ratio | ✅ |
| 1.4.6 Contrast (Enhanced) | AAA | 7:1 contrast ratio | ✅ |
| 2.4.7 Focus Visible | AA | Visible focus indicators | ✅ |
| 2.5.5 Target Size (Enhanced) | AAA | 44x44px touch targets | ✅ |
| 4.1.2 Name, Role, Value | A | Proper ARIA usage | ✅ |

### Manual Testing Required

Some AAA requirements cannot be automated:

| Criterion | Level | Description | Testing Method |
|-----------|-------|-------------|----------------|
| 1.4.8 Visual Presentation | AAA | Text spacing, line height | Manual review |
| 2.2.6 Timeouts | AAA | Warn users of timeouts | Manual testing |
| 2.3.3 Animation from Interactions | AAA | Respect prefers-reduced-motion | Manual testing |
| 3.1.5 Reading Level | AAA | Content at lower secondary level | Content review |
| 3.1.6 Pronunciation | AAA | Pronunciation guides | Content review |
| 3.3.5 Help | AAA | Context-sensitive help | Manual testing |
| 3.3.6 Error Prevention (All) | AAA | Confirmation dialogs | Manual testing |

## AAA Accessibility Components

This project includes dedicated AAA accessibility components:

### Pronunciation Component
```tsx
import { Pronunciation } from '@/components/Pronunciation';

<Pronunciation phonetic="en-KRIPT-her">EncryptHer</Pronunciation>
```

### Abbreviation Component
```tsx
import { Abbr } from '@/components/Abbr';

<Abbr title="Web Content Accessibility Guidelines">WCAG</Abbr>
```

### Live Region Component
```tsx
import { LiveRegion } from '@/components/LiveRegion';

<LiveRegion politeness="polite" atomic>
  Your message has been sent.
</LiveRegion>
```

### Form Help Component
```tsx
import { FormHelp } from '@/components/FormHelp';

<FormHelp 
  label="Email" 
  helpText="We'll use this to send you updates."
/>
```

### Confirm Dialog Component
```tsx
import { ConfirmDialog } from '@/components/ConfirmDialog';

<ConfirmDialog
  open={showConfirm}
  onOpenChange={setShowConfirm}
  title="Submit Form?"
  description="Please review your information before submitting."
  onConfirm={handleSubmit}
/>
```

## CI/CD Integration

This project includes a GitHub Actions workflow (`.github/workflows/accessibility.yml`) that automatically runs WCAG 2.2 accessibility tests on every push and pull request to `main`.

### Workflow Features

- **Automatic testing** on push/PR to main branch
- **Test result artifacts** stored for 30 days
- **Verbose reporting** with JSON output for analysis

### Running Locally

```bash
# Run accessibility tests only
npm run test:a11y

# Run all tests with coverage
npm run test:coverage
```

### NPM Script

Add to your `package.json`:

```json
{
  "scripts": {
    "test:a11y": "vitest run --reporter=verbose src/**/*.a11y.test.tsx"
  }
}
```

## Screen Reader Testing

### Testing with NVDA (Windows)
1. Download NVDA from https://www.nvaccess.org/
2. Enable "Speech Viewer" to see what's being announced
3. Test navigation with Tab, Arrow keys, and screen reader shortcuts

### Testing with VoiceOver (macOS)
1. Press Cmd+F5 to toggle VoiceOver
2. Use VO+Right/Left to navigate
3. Test with Rotor (VO+U) for landmarks and headings

### Testing with JAWS
1. Use Insert+F6 for heading list
2. Use Insert+F7 for links list
3. Test forms mode (Enter to activate, Esc to exit)

## Magnification Testing

1. Test at 200% browser zoom (Ctrl/Cmd + +)
2. Test at 400% (320px equivalent viewport)
3. Verify:
   - No horizontal scrolling at 320px width
   - Text remains readable
   - Interactive elements accessible
   - No overlapping content

## Keyboard Navigation Testing

1. Start at page top
2. Press Tab through all interactive elements
3. Verify:
   - Focus indicator always visible (3px ring)
   - Logical tab order
   - No keyboard traps
   - Skip link works
   - All functionality accessible

## High Contrast Mode Testing

### Windows High Contrast
1. Settings > Accessibility > Contrast themes
2. Select "High Contrast" theme
3. Verify all content visible

### Forced Colors Detection
```css
@media (forced-colors: active) {
  /* Styles for high contrast mode */
}
```

## Resources

- [axe-core Rules](https://dequeuniversity.com/rules/axe/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [vitest-axe](https://github.com/chaance/vitest-axe)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [NVDA Screen Reader](https://www.nvaccess.org/)
