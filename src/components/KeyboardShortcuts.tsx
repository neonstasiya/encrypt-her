import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Shortcut {
  key: string;
  description: string;
  action: () => void;
}

/**
 * WCAG 2.1.4 (A) - Character Key Shortcuts
 * WCAG 2.4.1 (A) - Bypass Blocks
 * Provides discoverable keyboard shortcuts for power users
 */
export const KeyboardShortcuts: React.FC = () => {
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);

  const shortcuts: Shortcut[] = [
    { key: '?', description: 'Show keyboard shortcuts', action: () => setShowHelp(true) },
    { key: 'h', description: 'Go to Home', action: () => navigate('/') },
    { key: 'a', description: 'Go to About', action: () => navigate('/about') },
    { key: 'c', description: 'Go to Contact', action: () => navigate('/contact') },
    { key: 'r', description: 'Go to Resources', action: () => navigate('/resources') },
    { key: 'd', description: 'Go to Donate', action: () => navigate('/donate') },
    { key: 'Escape', description: 'Close dialogs', action: () => setShowHelp(false) },
  ];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      const target = event.target as HTMLElement;
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if (isTyping) return;

      // Don't trigger if modifier keys are pressed (except Shift for ?)
      if (event.ctrlKey || event.altKey || event.metaKey) return;

      const key = event.key;
      const shortcut = shortcuts.find((s) => s.key === key);

      if (shortcut) {
        event.preventDefault();
        shortcut.action();
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Dialog open={showHelp} onOpenChange={setShowHelp}>
      <DialogContent aria-describedby="shortcuts-description">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription id="shortcuts-description">
            Use these keyboard shortcuts to navigate the site quickly.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <table className="w-full" role="grid" aria-label="Keyboard shortcuts list">
            <thead>
              <tr>
                <th className="text-left py-2 pr-4 font-semibold" scope="col">Key</th>
                <th className="text-left py-2 font-semibold" scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {shortcuts.map((shortcut) => (
                <tr key={shortcut.key} className="border-t border-border">
                  <td className="py-2 pr-4">
                    <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">
                      {shortcut.key === '?' ? 'Shift + /' : shortcut.key}
                    </kbd>
                  </td>
                  <td className="py-2 text-muted-foreground">
                    {shortcut.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs font-mono">?</kbd> at any time to show this help.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcuts;
