'use client';

import type { InformationSection } from '@/content/information';

interface InformationContentProps {
  sections?: InformationSection[];
}

export function InformationContent({ sections }: InformationContentProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className="px-6 py-10 text-center text-sm text-white/50 min-[690px]:px-0">
        Content not available yet.
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 px-6 py-10 text-white min-[690px]:px-0">
      <div className="platform-shell-frame space-y-10">
        {sections.map((section, index) => (
          <div key={index}>
            {section.title && (
              <h2 className="mb-4 text-xl font-semibold tracking-tight">{section.title}</h2>
            )}

            {section.body && (
              <p className="text-sm leading-relaxed text-white/80">{section.body}</p>
            )}

            {section.type === 'list' && section.items && section.items.length > 0 && (
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
          </div>
        ))}
      </div>
    </div>
  );
}
