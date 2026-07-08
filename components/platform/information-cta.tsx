'use client';

import type { Information } from '@/content/information';
import { activateLineCta } from '@/lib/commerce/cta-activation';

interface InformationCtaProps {
  info: Information;
  slug: string;
}

export function InformationCta({ info, slug }: InformationCtaProps) {
  const handleLineCta = () => {
    activateLineCta({
      title: info.title,
      surface: 'cta',
      landingPage: `/information/${slug}`,
      intent: 'research',
      source: 'information-page',
    });
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
