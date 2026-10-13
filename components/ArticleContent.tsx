'use client';

import React from 'react';

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  // Parse lines into structured blocks
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (!line.trim()) {
      i++;
      continue;
    }

    // Markdown Table detection
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        // First line is header
        const headerCells = tableLines[0]
          .slice(1, -1)
          .split('|')
          .map((c) => c.trim());

        // Skip divider line (e.g. |:---:|---|)
        const rowLines = tableLines.slice(2);

        elements.push(
          <div key={`table-${i}`} className="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  {headerCells.map((h, hIdx) => (
                    <th key={hIdx} className="p-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-slate-900/60">
                {rowLines.map((row, rIdx) => {
                  const cells = row
                    .slice(1, -1)
                    .split('|')
                    .map((c) => c.trim());
                  return (
                    <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      {cells.map((cell, cIdx) => (
                        <td key={cIdx} className="p-3 text-slate-700 dark:text-slate-300">
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // Heading 2 (##)
    if (line.startsWith('## ')) {
      const title = line.replace('## ', '').trim();
      const id = title.split(' ')[0].replace(/[^a-zA-Z0-9가-힣]/g, '') || `sec-${i}`;
      elements.push(
        <h2
          key={`h2-${i}`}
          id={id}
          className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-10 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800 scroll-mt-24 flex items-center gap-2"
        >
          {renderInline(title)}
        </h2>
      );
      i++;
      continue;
    }

    // Heading 3 (###)
    if (line.startsWith('### ')) {
      const title = line.replace('### ', '').trim();
      elements.push(
        <h3 key={`h3-${i}`} className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3 scroll-mt-24">
          {renderInline(title)}
        </h3>
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (line.trim() === '---') {
      elements.push(<hr key={`hr-${i}`} className="my-8 border-slate-200 dark:border-slate-800" />);
      i++;
      continue;
    }

    // Blockquote (>)
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].replace('> ', ''));
        i++;
      }
      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="my-5 p-4 rounded-xl border-l-4 border-cyan-500 bg-cyan-50/60 dark:bg-cyan-950/20 text-slate-800 dark:text-slate-200 text-sm leading-relaxed"
        >
          {quoteLines.map((ql, qIdx) => (
            <p key={qIdx} className={qIdx > 0 ? 'mt-2' : ''}>
              {renderInline(ql)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Bullet list (- or *)
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        listItems.push(lines[i].replace(/^[-*]\s+/, ''));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-4 space-y-2 list-disc list-inside text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="pl-1">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s+/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-4 space-y-2 list-decimal list-inside text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="pl-1">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${i}`} className="my-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div className="article-body prose dark:prose-invert max-w-none">{elements}</div>;
}

// Inline formatting parser: **bold**, *italic*, `code`, [link](url)
function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  // Regex to match **bold**, `code`, [text](url)
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-bold text-slate-900 dark:text-white">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code key={match.index} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 font-mono text-xs">
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('[') && token.includes('](') && token.endsWith(')')) {
      const linkMatch = token.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        parts.push(
          <a
            key={match.index}
            href={linkMatch[2]}
            className="text-cyan-600 dark:text-cyan-400 font-semibold underline underline-offset-2 hover:opacity-80"
            target={linkMatch[2].startsWith('http') ? '_blank' : undefined}
            rel={linkMatch[2].startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {linkMatch[1]}
          </a>
        );
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
