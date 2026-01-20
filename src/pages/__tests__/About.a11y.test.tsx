import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { checkA11y } from '@/test/a11y-utils';
import About from '../About';

describe('About Page Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<About />);
    await checkA11y(container);
  });

  it('should have required landmarks', () => {
    render(<About />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should have a skip link', () => {
    render(<About />);
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
  });

  it('should have proper heading hierarchy', () => {
    render(<About />);
    const h1 = screen.getAllByRole('heading', { level: 1 });
    const h2 = screen.getAllByRole('heading', { level: 2 });
    
    expect(h1.length).toBe(1);
    expect(h2.length).toBeGreaterThan(0);
  });
});
