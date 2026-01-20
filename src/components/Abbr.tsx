import React from 'react';
import { cn } from '@/lib/utils';

interface AbbrProps {
  /** The full expansion of the abbreviation */
  title: string;
  /** The abbreviated text to display */
  children: React.ReactNode;
  /** Optional className for styling */
  className?: string;
}

/**
 * WCAG 3.1.4 (AAA) - Abbreviations
 * Provides expansion for abbreviations accessible to all users
 */
export const Abbr: React.FC<AbbrProps> = ({ title, children, className }) => {
  return (
    <abbr
      title={title}
      className={cn(
        'no-underline cursor-help border-b border-dotted border-current',
        className
      )}
    >
      {children}
      <span className="sr-only"> ({title})</span>
    </abbr>
  );
};

export default Abbr;
