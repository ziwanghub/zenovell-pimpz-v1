'use client';

import type { KnowledgeSection } from '@/content/knowledge';

interface KnowledgeArticleProps {
  content: KnowledgeSection[];
}

export function KnowledgeArticle({ content }: KnowledgeArticleProps) {
  if (!content || content.length === 0) {
    return (
      <div className="px-6 py-10 text-center text-sm text-white/50">
        Content not available yet.
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-[430px] space-y-10">
        {content.map((section, index) => (
          <div key={index}>
            {section.title && (
              <h2 className="mb-4 text-xl font-semibold tracking-tight">{section.title}</h2>
            )}

            {section.body && <p className="text-sm leading-relaxed text-white/80">{section.body}</p>}

            {section.type === 'list' && section.items && (
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 block h-1 w-1 rounded-full bg-white/60" />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {section.type === 'highlight' && section.body && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/80">
                {section.body}
              </div>
            )}

            {section.type === 'steps' && section.items && (
              <ol className="mt-4 space-y-3 text-sm text-white/80">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-mono text-white/50">{i + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            )}

            {section.type === 'warning' && section.body && (
              <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-amber-200">
                ⚠ {section.body}
              </div>
            )}

            {section.type === 'quote' && section.quote && (
              <blockquote className="mt-4 border-l-2 border-white/30 pl-4 text-sm italic text-white/70">
                “{section.quote}” {section.author && <span className="not-italic text-white/50">— {section.author}</span>}
              </blockquote>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
