import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { checkA11y } from '@/test/a11y-utils';
import AccessibilityStatement from '../AccessibilityStatement';

describe('AccessibilityStatement Page Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<AccessibilityStatement />);
    await checkA11y(container);
  });

  it('should have required landmarks', () => {
    render(<AccessibilityStatement />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should have a single h1 heading', () => {
    render(<AccessibilityStatement />);
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements).toHaveLength(1);
  });

  it('should have accessible contact information', () => {
    render(<AccessibilityStatement />);
    const emailLink = screen.getByRole('link', { name: /info@encrypther\.org/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:info@encrypther.org');
  });
});
