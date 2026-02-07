import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { checkA11y } from '@/test/a11y-utils';
import Resources from '../Resources';

describe('Resources Page Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Resources />);
    await checkA11y(container);
  });

  it('should have required landmarks', () => {
    render(<Resources />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should have a single h1 heading', () => {
    render(<Resources />);
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements).toHaveLength(1);
  });

  it('should have accessible resource cards with proper headings', () => {
    render(<Resources />);
    expect(screen.getByRole('heading', { name: /blog/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /12 keys to safety/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /resources by state/i })).toBeInTheDocument();
  });

  it('should have accessible links with descriptive text', () => {
    render(<Resources />);
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAccessibleName();
    });
  });
});
