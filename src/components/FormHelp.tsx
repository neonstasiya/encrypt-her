import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FormHelpProps {
  /** Help text to display */
  helpText: string;
  /** Label for screen readers */
  label: string;
  /** Optional className */
  className?: string;
}

/**
 * WCAG 3.3.5 (AAA) - Help
 * Context-sensitive help for form fields
 * Provides additional information without cluttering the interface
 */
export const FormHelp: React.FC<FormHelpProps> = ({
  helpText,
  label,
  className,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'h-5 w-5 ml-1 p-0 hover:bg-transparent inline-flex',
              className
            )}
            type="button"
            aria-label={`Help for ${label}`}
          >
            <HelpCircle className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-xs"
          role="tooltip"
        >
          <p>{helpText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FormHelp;
