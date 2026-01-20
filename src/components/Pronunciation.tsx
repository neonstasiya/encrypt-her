import React from 'react';

interface PronunciationProps {
  /** Phonetic pronunciation guide */
  phonetic: string;
  /** The content to render */
  children: React.ReactNode;
  /** Optional className for styling */
  className?: string;
}

/**
 * WCAG 3.1.6 (AAA) - Pronunciation
 * Provides pronunciation hints for screen readers on technical terms
 */
export const Pronunciation: React.FC<PronunciationProps> = ({
  phonetic,
  children,
  className,
}) => {
  return (
    <span className={className}>
      {children}
      <span className="sr-only"> (pronounced {phonetic})</span>
    </span>
  );
};

export default Pronunciation;
