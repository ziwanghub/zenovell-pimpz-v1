'use client';

import { CheckCircle2, MessageCircleMore, ShieldCheck, Sparkles } from 'lucide-react';

import type { Product } from '@/content/products';
import { activateLineCta } from '@/lib/commerce/cta-activation';

interface ProductFinalCtaProps {
  product: Product;
}

export function ProductFinalCta({ product }: ProductFinalCtaProps) {
  const promotion = product.promotion;
  const pricing = product.pricing;
  const trustReasons = [
    product.badge?.label,
    ...(product.certification || []).slice(0, 2).map((item) => item.name),
    product.cta?.label ? 'ปรึกษาก่อนตัดสินใจผ่าน LINE ได้' : null,
  ].filter(Boolean) as string[];

  return (
    <section
      id="line-cta"
      className="px-4 py-4 text-white min-[690px]:px-0 min-[768px]:hidden"
    >
      <div className="platform-shell-frame overflow-hidden rounded-[28px] border border-fuchsia-500/18 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.18),_transparent_40%),linear-gradient(180deg,rgba(20,11,26,0.98),rgba(8,5,11,0.98))] p-5 shadow-[0_20px_54px_rgba(0,0,0,0.38)]">
        <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-fuchsia-100/90">
          <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
          ข้อเสนอสำหรับคุณ
        </div>

        <h2 className="mt-3.5 text-[26px] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
          พร้อมเริ่มต้นกับ {product.title}
        </h2>
        <p className="mt-2.5 text-[13px] leading-5.5 text-white/72">
          สรุปข้อมูลสำคัญก่อนตัดสินใจ ทั้งราคาปัจจุบัน โปรโมชันที่ใช้อยู่ และช่องทางปรึกษาผ่าน LINE ในขั้นตอนเดียว
        </p>

        <div className="mt-4 rounded-[22px] border border-white/10 bg-white/[0.045] p-3.5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-[0.18em] text-white/45">PRODUCT RECAP</p>
              <p className="mt-1.5 text-[17px] font-semibold leading-5.5 text-white">{product.title}</p>
            </div>
            {promotion?.discount ? (
              <div className="shrink-0 rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-fuchsia-100">
                {promotion.discount} OFF
              </div>
            ) : null}
          </div>

          <div className="mt-3 flex items-end gap-2.5">
            <div className="text-[28px] font-semibold leading-none tracking-[-0.04em] text-white">
              {pricing.sale.display}
            </div>
            {pricing.original ? (
              <p className="pb-1 text-sm text-white/38 line-through">{pricing.original.display}</p>
            ) : null}
          </div>

          {promotion?.title ? (
            <div className="mt-2.5 rounded-[18px] border border-fuchsia-400/15 bg-fuchsia-500/[0.08] px-3.5 py-2.5">
              <p className="text-[13px] font-medium leading-5 text-fuchsia-50">{promotion.title}</p>
            </div>
          ) : null}
        </div>

        <div className="mt-4 rounded-[22px] border border-white/10 bg-white/[0.045] p-3.5">
          <div className="mb-2.5 flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-white/45">
            <ShieldCheck aria-hidden="true" className="h-4 w-4 text-emerald-300" />
            เหตุผลที่ช่วยให้ตัดสินใจง่ายขึ้น
          </div>

          <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-[13px] leading-5.5 text-white/78">
            {trustReasons.slice(0, 4).map((reason) => (
              <li key={reason} className="flex items-start gap-2">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-300" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>

          {product.qualificationDetails?.safetyNotes ? (
            <p className="mt-3 text-[11px] leading-4.5 text-white/52">
              {product.qualificationDetails.safetyNotes}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          aria-label={product.cta.ariaLabel}
          onClick={() =>
            activateLineCta({
              product: {
                slug: product.slug,
                sku: product.sku,
                title: product.title,
                cta: product.cta,
              },
              surface: 'final-cta',
              landingPage: `/products/${product.slug}`,
              intent: 'high_intent',
              source: 'product-landing',
            })
          }
          className="mt-4.5 inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 px-5 py-3.5 text-base font-semibold text-white shadow-[0_16px_32px_rgba(236,72,153,0.3)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#120b17] active:scale-[0.99]"
        >
          <MessageCircleMore aria-hidden="true" className="h-5 w-5" />
          {product.cta.label}
        </button>

        <p className="mt-2.5 text-center text-[11px] leading-4.5 text-white/52">
          สอบถามรายละเอียดก่อนตัดสินใจได้ ทีมงานจะได้รับข้อมูลสินค้าที่คุณกำลังสนใจต่อเนื่องใน LINE
        </p>
      </div>
    </section>
  );
}
