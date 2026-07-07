'use client';

import type { Knowledge } from '@/content/knowledge';
import { createCommerceContext } from '@/lib/commerce/context';
import { saveCommerceContext, clearCommerceContext, loadCommerceContext } from '@/lib/commerce/persistence';
import { buildCommerceEvent, CommerceEvents, commerceEventDispatcher } from '@/lib/commerce/events';
import { buildNonProductLineMessage } from '@/lib/commerce/line-message-builder';

interface KnowledgeCtaProps {
  knowledge: Knowledge;
  slug: string;
}

export function KnowledgeCta({ knowledge, slug }: KnowledgeCtaProps) {
  const handleLineCta = () => {
    const persisted = loadCommerceContext();
    const base = createCommerceContext({
      source: 'knowledge-page',
      entrySurface: 'cta',
      landingPage: `/knowledge/${slug}`,
      intent: 'research',
    });
    const context = persisted ? { ...persisted, ...base, timestamp: base.timestamp } : base;

    const message = buildNonProductLineMessage(knowledge.title, context);

    commerceEventDispatcher.dispatch(
      buildCommerceEvent(CommerceEvents.LINE_CLICK, {
        context,
        lineMessage: message,
      })
    );

    saveCommerceContext(context);

    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;
    window.open(lineUrl, '_blank');

    clearCommerceContext();
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
