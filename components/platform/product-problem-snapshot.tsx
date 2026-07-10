'use client';

import { Sparkles, Target, UserRoundCheck } from 'lucide-react';

interface ProductProblemSnapshotProps {
  title: string;
  outcome: string;
  detail: string;
  fitCue?: string;
}

export function ProductProblemSnapshot({
  title,
  outcome,
  detail,
  fitCue,
}: ProductProblemSnapshotProps) {
  return (
    <section className="px-4 py-5 text-white md:px-0">
      <div className="mx-auto max-w-[430px] overflow-hidden rounded-[28px] border border-fuchsia-500/20 bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.24),_transparent_38%),linear-gradient(180deg,rgba(20,11,26,0.98),rgba(8,5,11,0.98))] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.35)]">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200/90">
          <Sparkles className="h-3.5 w-3.5" />
          Problem / Outcome Fit
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-fuchsia-200/70">
              <Target className="h-3.5 w-3.5" />
              Relevance
            </div>
            <h2 className="text-lg font-semibold leading-tight tracking-[-0.01em] text-white sm:text-xl">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/72">{detail}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">
                Desired Outcome
              </div>
              <p className="mt-2 text-[15px] font-medium leading-6 text-fuchsia-100">
                {outcome}
              </p>
            </div>

            {fitCue && (
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-100/80">
                  <UserRoundCheck className="h-3.5 w-3.5" />
                  Fit Cue
                </div>
                <p className="mt-2 text-sm leading-6 text-white/80">{fitCue}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
