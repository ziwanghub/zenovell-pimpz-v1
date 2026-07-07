'use client';

interface TrustSignalItem {
  title: string;
  subtitle?: string;
}

interface ProductTrustSignalsProps {
  trustSignals?: TrustSignalItem[];
}

export function ProductTrustSignals({ trustSignals }: ProductTrustSignalsProps) {
  // Safe empty state when rich content is absent
  if (!trustSignals || trustSignals.length === 0) {
    return (
      <div className="bg-zinc-950 px-6 py-10 text-center text-sm text-white/50">
        Trust Signals data not available yet.
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-[430px]">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">Trust Signals</h2>

        <div className="grid grid-cols-1 gap-3">
          {trustSignals.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="text-lg font-medium">{item.title}</div>
              {item.subtitle && (
                <p className="mt-1 text-sm text-white/70">{item.subtitle}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
