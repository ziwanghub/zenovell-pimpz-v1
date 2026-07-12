'use client';

import { BadgeCheck, Lock, ShieldCheck, Sparkles, Truck } from 'lucide-react';

interface TrustSignalItem {
  title: string;
  subtitle?: string;
}

interface ProductTrustSignalsProps {
  trustSignals?: TrustSignalItem[];
  evidence?: TrustSignalItem[];
}

const trustIcons = [ShieldCheck, Lock, Truck, BadgeCheck, Sparkles];

export function ProductTrustSignals({ trustSignals, evidence }: ProductTrustSignalsProps) {
  if (!trustSignals || trustSignals.length === 0) {
    return null;
  }

  return (
    <section className="hidden px-4 py-5 text-white min-[690px]:px-0">
      <div className="platform-shell-frame">
        <div className="mb-4">
          <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/45">
            Trust Snapshot
          </div>
          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.02em] text-white">
            หลักฐานความน่าเชื่อถือที่เห็นได้เร็ว
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {trustSignals.slice(0, 4).map((item, index) => {
            const Icon = trustIcons[index % trustIcons.length];

            return (
              <div
                key={`${item.title}-${index}`}
                className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 shadow-[0_14px_34px_rgba(0,0,0,0.22)]"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-200">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-[15px] font-semibold leading-6 text-white">{item.title}</div>
                {item.subtitle && (
                  <p className="mt-1 text-sm leading-6 text-white/68">{item.subtitle}</p>
                )}
              </div>
            );
          })}
        </div>

        {evidence && evidence.length > 0 && (
          <div className="mt-4 rounded-[26px] border border-white/10 bg-white/[0.035] p-4">
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-fuchsia-100/55">
              Evidence Layer
            </div>
            <div className="space-y-3">
              {evidence.slice(0, 2).map((item, index) => (
                <div key={`${item.title}-${index}`} className="rounded-2xl bg-black/25 p-4">
                  <div className="text-sm font-semibold leading-6 text-white">{item.title}</div>
                  {item.subtitle && (
                    <p className="mt-1 text-sm leading-6 text-white/68">{item.subtitle}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
