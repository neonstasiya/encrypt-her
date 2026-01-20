# Automated Accessibility Testing

This project uses **Vitest** and **axe-core** (via vitest-axe) for automated accessibility testing.

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

## What axe-core Checks

The automated tests check for common accessibility issues including:

- **Missing alt text** on images
- **Color contrast** issues
- **Missing form labels**
- **Incorrect ARIA usage**
- **Missing document landmarks**
- **Heading hierarchy issues**
- **Keyboard accessibility**
- **Focus management**

## Customizing axe Rules

You can customize which rules are checked in `a11y-utils.ts`:

```typescript
export async function checkA11y(container: Element) {
  const results = await axe(container, {
    rules: {
      'color-contrast': { enabled: true },
      'document-title': { enabled: false },
      // Add or modify rules as needed
    },
  });
  expect(results).toHaveNoViolations();
}
```

## Best Practices

1. **Test every page** - Create an a11y test file for each page
2. **Test complex components** - Interactive components need separate tests
3. **Check landmarks** - Verify banner, main, and contentinfo roles
4. **Verify forms** - Ensure all inputs have labels
5. **Check headings** - Verify proper h1/h2/h3 hierarchy

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

## Resources

- [axe-core Rules](https://dequeuniversity.com/rules/axe/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [vitest-axe](https://github.com/chaance/vitest-axe)
