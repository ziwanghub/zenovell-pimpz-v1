'use client';

import type { Knowledge } from '@/content/knowledge';
import type { CommerceContext } from '@/lib/commerce/context';

interface KnowledgeCtaProps {
  knowledge: Knowledge;
  slug: string;
}

export function KnowledgeCta({ knowledge, slug }: KnowledgeCtaProps) {
  const handleLineCta = () => {
    const context: CommerceContext = {
      source: 'knowledge-page',
      entrySurface: 'cta',
      landingPage: `/knowledge/${slug}`,
      intent: 'research',
      utm: {},
      timestamp: new Date().toISOString(),
    };

    const contextLine = [
      `Topic: ${knowledge.title}`,
      `URL: ${context.landingPage}`,
      `Intent: ${context.intent}`,
    ].join(' | ');

    const message = `Hello ZENOVELL,\n\nI'm reading the knowledge page and would like more information.\n\n${contextLine}\n\nThank you!`;

    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;
    window.open(lineUrl, '_blank');
  };

  return (
    <div className="bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-[430px] text-center">
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
