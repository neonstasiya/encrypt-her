import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { checkA11y } from '@/test/a11y-utils';
import { SkipLink } from '../SkipLink';

describe('SkipLink Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<SkipLink />);
    await checkA11y(container);
  });

  it('should be accessible via keyboard', () => {
    render(<SkipLink />);
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('should be visually hidden until focused', () => {
    render(<SkipLink />);
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toHaveClass('sr-only');
  });
});
