import React from 'react';
import { cn } from '@/lib/utils';

type AriaRelevant = 'additions' | 'additions removals' | 'additions text' | 'all' | 'removals' | 'removals additions' | 'removals text' | 'text' | 'text additions' | 'text removals';

interface LiveRegionProps {
  /** The announcement to make */
  children: React.ReactNode;
  /** Politeness level - 'polite' for non-critical, 'assertive' for important */
  politeness?: 'polite' | 'assertive';
  /** Whether the entire region should be re-announced on changes */
  atomic?: boolean;
  /** Whether the region is currently busy loading */
  busy?: boolean;
  /** Relevant parts of the region that changed */
  relevant?: AriaRelevant;
  /** Optional className */
  className?: string;
  /** Whether to visually hide the region */
  visuallyHidden?: boolean;
}

/**
 * WCAG 4.1.3 (AA) - Status Messages
 * Enhanced live region component for screen reader announcements
 * Ensures status messages are properly announced without interrupting
 */
export const LiveRegion: React.FC<LiveRegionProps> = ({
  children,
  politeness = 'polite',
  atomic = true,
  busy = false,
  relevant = 'additions text',
  className,
  visuallyHidden = false,
}) => {
  return (
    <div
      role={politeness === 'assertive' ? 'alert' : 'status'}
      aria-live={politeness}
      aria-atomic={atomic}
      aria-busy={busy}
      aria-relevant={relevant}
      className={cn(
        visuallyHidden && 'sr-only',
        className
      )}
    >
      {children}
    </div>
  );
};

export default LiveRegion;
