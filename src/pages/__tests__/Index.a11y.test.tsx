import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { checkA11y } from '@/test/a11y-utils';
import Index from '../Index';

describe('Index Page Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Index />);
    await checkA11y(container);
  });

  it('should have a skip link', () => {
    render(<Index />);
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
  });

  it('should have a main landmark', () => {
    render(<Index />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute('id', 'main-content');
  });

  it('should have a banner landmark (header)', () => {
    render(<Index />);
    const banner = screen.getByRole('banner');
    expect(banner).toBeInTheDocument();
  });

  it('should have a contentinfo landmark (footer)', () => {
    render(<Index />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('should have exactly one h1', () => {
    render(<Index />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings.length).toBe(1);
  });

  it('should have navigation menu trigger', () => {
    render(<Index />);
    const menuButton = screen.getByLabelText('Open main navigation menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('should have decorative images marked as aria-hidden', () => {
    const { container } = render(<Index />);
    const decorativeImages = container.querySelectorAll('[aria-hidden="true"]');
    expect(decorativeImages.length).toBeGreaterThan(0);
  });
});
