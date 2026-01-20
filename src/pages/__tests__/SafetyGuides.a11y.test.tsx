import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { checkA11y } from '@/test/a11y-utils';
import SafetyGuides from '../SafetyGuides';

describe('SafetyGuides Page Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<SafetyGuides />);
    await checkA11y(container);
  });

  it('should have required landmarks', () => {
    render(<SafetyGuides />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should have a single h1 heading', () => {
    render(<SafetyGuides />);
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements).toHaveLength(1);
  });

  it('should have accessible guide cards', () => {
    render(<SafetyGuides />);
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAccessibleName();
    });
  });
});
