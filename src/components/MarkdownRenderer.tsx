import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Simple markdown renderer that handles:
 * - ## Headings
 * - **bold**
 * - *italic*
 * - - bullet lists
 * - Paragraphs (double newlines)
 * - [links](url)
 */
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = "" }) => {
  const renderContent = () => {
    const blocks = content.split(/\n\n+/);
    
    return blocks.map((block, blockIndex) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Heading ##
      if (trimmed.startsWith('## ')) {
        return (
          <h3 key={blockIndex} className="text-lg font-bold mt-6 mb-2 text-foreground">
            {renderInline(trimmed.slice(3))}
          </h3>
        );
      }

      // Heading ###
      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={blockIndex} className="text-base font-bold mt-4 mb-2 text-foreground">
            {renderInline(trimmed.slice(4))}
          </h4>
        );
      }

      // Bullet list
      const lines = trimmed.split('\n');
      if (lines.every(line => line.trim().startsWith('- ') || line.trim() === '')) {
        return (
          <ul key={blockIndex} className="list-disc pl-6 space-y-1 my-2">
            {lines
              .filter(line => line.trim().startsWith('- '))
              .map((line, i) => (
                <li key={i}>{renderInline(line.trim().slice(2))}</li>
              ))}
          </ul>
        );
      }

      // Regular paragraph
      return (
        <p key={blockIndex} className="my-2">
          {renderInline(trimmed)}
        </p>
      );
    });
  };

  const renderInline = (text: string): React.ReactNode => {
    // Process bold, italic, and links
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Bold **text**
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Italic *text*
      const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);
      // Link [text](url)
      const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);

      const matches = [
        boldMatch ? { type: 'bold', match: boldMatch, index: boldMatch.index! } : null,
        italicMatch ? { type: 'italic', match: italicMatch, index: italicMatch.index! } : null,
        linkMatch ? { type: 'link', match: linkMatch, index: linkMatch.index! } : null,
      ].filter(Boolean).sort((a, b) => a!.index - b!.index);

      if (matches.length === 0) {
        parts.push(remaining);
        break;
      }

      const first = matches[0]!;
      if (first.index > 0) {
        parts.push(remaining.slice(0, first.index));
      }

      if (first.type === 'bold') {
        parts.push(<strong key={key++}>{first.match![1]}</strong>);
        remaining = remaining.slice(first.index + first.match![0].length);
      } else if (first.type === 'italic') {
        parts.push(<em key={key++}>{first.match![1]}</em>);
        remaining = remaining.slice(first.index + first.match![0].length);
      } else if (first.type === 'link') {
        parts.push(
          <a key={key++} href={first.match![2]} className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer">
            {first.match![1]}
          </a>
        );
        remaining = remaining.slice(first.index + first.match![0].length);
      }
    }

    return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>;
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {renderContent()}
    </div>
  );
};

export default MarkdownRenderer;
