import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { checkA11y } from '@/test/a11y-utils';
import Contact from '../Contact';

describe('Contact Page Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Contact />);
    await checkA11y(container);
  });

  it('should have required landmarks', () => {
    render(<Contact />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should have labeled form inputs', () => {
    render(<Contact />);
    
    // Check that form inputs have associated labels
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('should have a submit button', () => {
    render(<Contact />);
    const submitButton = screen.getByRole('button', { name: /send|submit/i });
    expect(submitButton).toBeInTheDocument();
  });
});
