import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { checkA11y } from '@/test/a11y-utils';
import NotFound from '../NotFound';

describe('NotFound Page Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<NotFound />);
    await checkA11y(container);
  });

  it('should have a skip link', () => {
    render(<NotFound />);
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
  });

  it('should have a main landmark', () => {
    render(<NotFound />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('should have an h1 heading', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('404');
  });

  it('should have a link back to home', () => {
    render(<NotFound />);
    const homeLink = screen.getByRole('link', { name: /return to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
