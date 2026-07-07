'use client';

import type { Information } from '@/content/information';
import type { CommerceContext } from '@/lib/commerce/context';

interface InformationCtaProps {
  info: Information;
  slug: string;
}

export function InformationCta({ info, slug }: InformationCtaProps) {
  const handleLineCta = () => {
    const context: CommerceContext = {
      source: 'information-page',
      entrySurface: 'cta',
      landingPage: `/information/${slug}`,
      intent: 'research',
      utm: {},
      timestamp: new Date().toISOString(),
    };

    // Build a context-rich message for general inquiries (no specific product required)
    const contextLine = [
      `Page: ${info.title}`,
      `URL: ${context.landingPage}`,
      `Intent: ${context.intent}`,
      `Source: ${context.source}`,
      context.timestamp ? `At: ${context.timestamp}` : '',
    ]
      .filter(Boolean)
      .join(' | ');

    const message = `Hello ZENOVELL,\n\nI'm reaching out from the information page.\n\n${contextLine}\n\nPlease assist me. Thank you!`;

    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;
    window.open(lineUrl, '_blank');
  };

  return (
    <div className="bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-[430px] text-center">
        <button
          onClick={handleLineCta}
          className="w-full rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition hover:bg-white/90 active:bg-white/80"
          aria-label={`Contact ZENOVELL via LINE about ${info.title}`}
        >
          {info.cta.label}
        </button>

        <p className="mt-4 text-xs text-white/60">
          Fastest response • Context attached automatically
        </p>
      </div>
    </div>
  );
}
