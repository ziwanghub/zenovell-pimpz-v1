'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  faq?: FAQItem[];
}

export function ProductFAQ({ faq }: ProductFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Safe empty state when rich content is absent
  if (!faq || faq.length === 0) {
    return (
      <div className="bg-zinc-950 px-6 py-10 text-center text-sm text-white/50">
        FAQ data not available yet.
      </div>
    );
  }

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-[430px]">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">FAQ</h2>

        <div className="space-y-2">
          {faq.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left font-medium hover:bg-white/5 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span>{item.question}</span>
                <span className="text-xl leading-none select-none">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-4 text-sm text-white/80 border-t border-white/10 pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
