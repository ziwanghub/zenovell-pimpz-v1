'use client';

import type { Knowledge } from '@/content/knowledge';

interface KnowledgeHeroProps {
  knowledge: Knowledge;
}

export function KnowledgeHero({ knowledge }: KnowledgeHeroProps) {
  return (
    <div className="bg-zinc-950 px-6 py-12 text-white min-[690px]:px-0">
      <div className="platform-shell-frame">
        <div className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-widest text-white/80">
          KNOWLEDGE
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{knowledge.title}</h1>
        {knowledge.description && (
          <p className="mt-3 text-lg text-white/80">{knowledge.description}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/60">
          <span>{knowledge.metadata.readingTime} min read</span>
          <span>•</span>
          <span>{knowledge.metadata.difficulty}</span>
        </div>
      </div>
    </div>
  );
}
