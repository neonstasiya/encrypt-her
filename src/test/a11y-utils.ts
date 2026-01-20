import { axe } from 'vitest-axe';
import { expect } from 'vitest';

/**
 * Run axe accessibility tests on a container element
 * @param container - The DOM container to test
 * @param options - Optional axe configuration
 */
export async function checkA11y(
  container: Element,
  options?: Parameters<typeof axe>[1]
) {
  const results = await axe(container, {
    rules: {
      // Disable rules that may have false positives in test environment
      'color-contrast': { enabled: true },
      'document-title': { enabled: false }, // Handled by usePageTitle hook
      'html-has-lang': { enabled: false }, // Set in index.html
      'landmark-one-main': { enabled: true },
      'page-has-heading-one': { enabled: true },
      'region': { enabled: true },
    },
    ...options,
  });

  expect(results).toHaveNoViolations();
  return results;
}

/**
 * Format axe violations for readable error output
 */
export function formatViolations(violations: any[]) {
  return violations
    .map((violation) => {
      const nodes = violation.nodes
        .map((node: any) => `  - ${node.html}\n    Fix: ${node.failureSummary}`)
        .join('\n');
      return `\n${violation.id}: ${violation.description}\n${nodes}`;
    })
    .join('\n');
}
