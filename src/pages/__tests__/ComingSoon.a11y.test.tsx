import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { checkA11y } from '@/test/a11y-utils';
import ComingSoon from '../ComingSoon';

describe('ComingSoon Page Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<ComingSoon />);
    await checkA11y(container);
  });

  it('should have required landmarks', () => {
    render(<ComingSoon />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should have a single h1 heading', () => {
    render(<ComingSoon />);
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements).toHaveLength(1);
  });

  it('should have accessible navigation link', () => {
    render(<ComingSoon />);
    const homeLink = screen.getByRole('link', { name: /back to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
