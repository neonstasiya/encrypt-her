import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { checkA11y } from '@/test/a11y-utils';
import Donate from '../Donate';

describe('Donate Page Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Donate />);
    await checkA11y(container);
  });

  it('should have required landmarks', () => {
    render(<Donate />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should have a single h1 heading', () => {
    render(<Donate />);
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements).toHaveLength(1);
  });

  it('should have accessible donation option buttons', () => {
    render(<Donate />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAccessibleName();
    });
  });
});
