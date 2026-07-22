'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  faq?: FAQItem[];
  /**
   * Initial open panel index. Use -1 for all closed (Desktop contract default).
   * Mobile default remains 0 for continuity.
   */
  defaultOpenIndex?: number;
}

export function ProductFAQ({ faq, defaultOpenIndex = 0 }: ProductFAQProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  if (!faq || faq.length === 0) {
    return (
      <section className="px-4 py-4 text-white min-[690px]:px-0" aria-labelledby={`${baseId}-heading`}>
        <div className="platform-shell-frame rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,18,20,0.96),rgba(8,8,10,0.98))] px-5 py-6 text-center text-sm text-white/55">
          <h2 id={`${baseId}-heading`} className="text-lg font-semibold text-white">
            คำถามที่มักเกิดก่อนตัดสินใจ
          </h2>
          <p className="mt-2">คำถามที่พบบ่อยจะปรากฏที่นี่เมื่อมีข้อมูลพร้อมแสดงผล</p>
        </div>
      </section>
    );
  }

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section className="px-4 py-4 text-white min-[690px]:px-0" aria-labelledby={`${baseId}-heading`}>
      <div className="platform-shell-frame">
        <div className="mb-3">
          <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/45">
            FAQ
          </div>
          <h2
            id={`${baseId}-heading`}
            className="mt-1.5 text-[20px] font-semibold tracking-[-0.02em] text-white min-[1280px]:text-[22px]"
          >
            คำถามที่มักเกิดก่อนตัดสินใจ
          </h2>
          <p className="mt-1 text-[13px] leading-5 text-white/62">
            รวมคำถามสำคัญจากข้อมูลสินค้าจริง เพื่อช่วยให้ตัดสินใจได้เร็วและชัดเจนขึ้น
          </p>
        </div>

        {/* Tablet 900+ + Desktop: 2-column accordion when width allows */}
        <div className="space-y-2.5 min-[900px]:grid min-[900px]:grid-cols-2 min-[900px]:items-start min-[900px]:gap-3 min-[900px]:space-y-0">
          {faq.map((item, index) => {
            const isOpen = openIndex === index;
            const triggerId = `${baseId}-faq-trigger-${index}`;
            const panelId = `${baseId}-faq-panel-${index}`;

            return (
              <div
                key={`${item.question}-${index}`}
                className="overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
              >
                <button
                  id={triggerId}
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex min-h-14 w-full items-center justify-between gap-4 px-4.5 py-3.5 text-left transition-colors duration-200 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#120c18]"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="text-[15px] font-medium leading-5.5 text-white">
                    {item.question}
                  </span>
                  <span className="inline-flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60">
                    <ChevronDown
                      aria-hidden="true"
                      className={[
                        'h-4 w-4 transition-transform duration-200',
                        isOpen ? 'rotate-180 text-white' : '',
                      ].join(' ')}
                    />
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  className={[
                    'grid transition-[grid-template-rows,opacity] duration-200 ease-out',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-70',
                  ].join(' ')}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-white/10 px-4.5 pb-3.5 pt-3 text-[14px] leading-5.5 text-white/78">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
