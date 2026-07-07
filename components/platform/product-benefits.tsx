'use client';

interface BenefitItem {
  title: string;
  description?: string;
}

interface ProductBenefitsProps {
  benefits?: BenefitItem[];
}

export function ProductBenefits({ benefits }: ProductBenefitsProps) {
  // Empty / loading-safe state
  if (!benefits || benefits.length === 0) {
    return (
      <div className="px-6 py-10 text-center text-sm text-white/50">
        Benefits data not available yet.
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-[430px]">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">Benefits</h2>

        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="text-lg font-medium">{benefit.title}</div>
              {benefit.description && (
                <p className="mt-1 text-sm text-white/70">{benefit.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
