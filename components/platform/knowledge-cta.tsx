'use client';

import type { Knowledge } from '@/content/knowledge';
import { activateLineCta } from '@/lib/commerce/cta-activation';

interface KnowledgeCtaProps {
  knowledge: Knowledge;
  slug: string;
}

export function KnowledgeCta({ knowledge, slug }: KnowledgeCtaProps) {
  const handleLineCta = () => {
    activateLineCta({
      title: knowledge.title,
      surface: 'cta',
      landingPage: `/knowledge/${slug}`,
      intent: 'research',
      source: 'knowledge-page',
    });
  };

  return (
    <div className="bg-black px-6 py-12 text-white min-[690px]:px-0">
      <div className="platform-shell-frame text-center">
        <button
          onClick={handleLineCta}
          className="w-full rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition hover:bg-white/90 active:bg-white/80"
          aria-label={`Contact about ${knowledge.title}`}
        >
          {knowledge.cta.label}
        </button>
        <p className="mt-4 text-xs text-white/60">
          Context attached • Fast response via LINE
        </p>
      </div>
    </div>
  );
}
