'use client';

import type { Information } from '@/content/information';

interface InformationHeroProps {
  info: Information;
}

export function InformationHero({ info }: InformationHeroProps) {
  return (
    <div className="bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-[430px]">
        <div className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-widest text-white/80">
          INFORMATION
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{info.title}</h1>
        {info.subtitle && (
          <p className="mt-3 text-lg text-white/80">{info.subtitle}</p>
        )}
        {info.description && (
          <p className="mt-4 text-sm text-white/70">{info.description}</p>
        )}
      </div>
    </div>
  );
}
