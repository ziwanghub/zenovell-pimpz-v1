'use client';

import { motion } from 'framer-motion';

interface BenefitItem {
  title: string;
  description?: string;
}

interface ProductBenefitsProps {
  benefits?: BenefitItem[];
}

export function ProductBenefits({ benefits }: ProductBenefitsProps) {
  if (!benefits || benefits.length === 0) {
    return (
      <div className="px-6 py-10 text-center text-sm text-white/50">
        Benefits data not available yet.
      </div>
    );
  }

  return (
    <section className="px-4 py-5 text-white md:px-0">
      <div className="mx-auto max-w-[430px]">
        <div className="mb-4">
          <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/45">
            Benefits / Mechanism
          </div>
          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.02em] text-white">
            ทำไมสินค้านี้จึงช่วยเสริมความมั่นใจได้
          </h2>
        </div>

        <div className="space-y-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="group rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 transition-all hover:border-white/20 hover:bg-white/[0.08]"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 text-sm font-semibold text-fuchsia-100">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <div className="text-[15px] font-semibold leading-tight tracking-tight">{benefit.title}</div>
                  {benefit.description && (
                    <p className="mt-1.5 text-sm leading-6 text-white/65">{benefit.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
