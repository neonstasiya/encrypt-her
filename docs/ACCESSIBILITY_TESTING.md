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

## CI Integration

Add to your CI pipeline:

```yaml
- name: Run accessibility tests
  run: npx vitest run --reporter=verbose
```

## Resources

- [axe-core Rules](https://dequeuniversity.com/rules/axe/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
