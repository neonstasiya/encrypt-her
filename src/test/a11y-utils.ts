import { axe } from 'vitest-axe';
import { expect } from 'vitest';

/**
 * Run axe accessibility tests on a container element
 * Configured for WCAG 2.2 AAA compliance testing
 * @param container - The DOM container to test
 * @param options - Optional axe configuration
 */
export async function checkA11y(
  container: Element,
  options?: Parameters<typeof axe>[1]
) {
  const results = await axe(container, {
    rules: {
      // Core accessibility rules
      'color-contrast': { enabled: true },
      'document-title': { enabled: false }, // Handled by usePageTitle hook
      'html-has-lang': { enabled: false }, // Set in index.html
      'landmark-one-main': { enabled: true },
      'page-has-heading-one': { enabled: true },
      'region': { enabled: true },
      // AAA rules
      'color-contrast-enhanced': { enabled: true }, // AAA 7:1 contrast
      'target-size': { enabled: true }, // AAA 44px touch targets
    },
    // Run WCAG 2.2 rules including AAA where available
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
    },
    ...options,
  });

  expect(results).toHaveNoViolations();
  return results;
}

/**
 * Run axe accessibility tests with AAA-specific rules only
 * Use this for stricter AAA compliance testing
 */
export async function checkA11yAAA(
  container: Element,
  options?: Parameters<typeof axe>[1]
) {
  const results = await axe(container, {
    rules: {
      'color-contrast-enhanced': { enabled: true },
      'target-size': { enabled: true },
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
      return `\n${violation.id}: ${violation.description}\n  Impact: ${violation.impact}\n  WCAG: ${violation.tags.filter((t: string) => t.startsWith('wcag')).join(', ')}\n${nodes}`;
    })
    .join('\n');
}

/**
 * Check if an element has proper focus management
 */
export function checkFocusable(element: Element): boolean {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  return focusableElements.length > 0;
}

/**
 * Check if an element has proper ARIA labels
 */
export function checkAriaLabels(element: Element): {
  hasAriaLabel: boolean;
  hasAriaLabelledBy: boolean;
  hasAriaDescribedBy: boolean;
} {
  return {
    hasAriaLabel: element.hasAttribute('aria-label'),
    hasAriaLabelledBy: element.hasAttribute('aria-labelledby'),
    hasAriaDescribedBy: element.hasAttribute('aria-describedby'),
  };
}

/**
 * Check if landmarks are properly structured
 */
export function checkLandmarks(container: Element): {
  hasBanner: boolean;
  hasMain: boolean;
  hasContentinfo: boolean;
  hasNavigation: boolean;
} {
  return {
    hasBanner: container.querySelector('[role="banner"], header') !== null,
    hasMain: container.querySelector('[role="main"], main') !== null,
    hasContentinfo: container.querySelector('[role="contentinfo"], footer') !== null,
    hasNavigation: container.querySelector('[role="navigation"], nav') !== null,
  };
}

/**
 * Check heading hierarchy
 */
export function checkHeadingHierarchy(container: Element): {
  hasH1: boolean;
  headingsInOrder: boolean;
  headingLevels: number[];
} {
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const levels = Array.from(headings).map(h => parseInt(h.tagName[1]));
  
  let inOrder = true;
  for (let i = 1; i < levels.length; i++) {
    // Heading should not skip more than one level
    if (levels[i] > levels[i - 1] + 1) {
      inOrder = false;
      break;
    }
  }

  return {
    hasH1: levels.includes(1),
    headingsInOrder: inOrder,
    headingLevels: levels,
  };
}
