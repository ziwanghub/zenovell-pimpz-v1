'use client';

import Image from 'next/image';
import { MessageCircleMore, Plus } from 'lucide-react';

import type { Product } from '@/content/products';
import { activateLineCta } from '@/lib/commerce/cta-activation';
import { LineIcon } from '@/components/ui/line-icon';

type BundlePair = {
  slug: string;
  title: string;
  pricing: { sale: { display: string } };
  imageSrc?: string;
};

interface ProductBundleProps {
  product: Product;
  pair?: BundlePair | null;
}

/**
 * Desktop bundle promotion band (P-PRODUCT-DESKTOP-02).
 * LINE-only conversion. Real product pairing only — no invented discounts.
 */
export function ProductBundle({ product, pair }: ProductBundleProps) {
  if (!pair) {
    return null;
  }

  const handleLine = () => {
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
      source: 'product-bundle-desktop',
      campaign: `bundle-with-${pair.slug}`,
    });
  };

  return (
    <section
      className="px-4 py-5 text-white min-[690px]:px-0"
      aria-labelledby="product-bundle-title"
    >
      <div className="platform-shell-frame">
        <div className="overflow-hidden rounded-[24px] border border-[#E91E8C]/25 bg-[radial-gradient(circle_at_85%_50%,rgba(233,30,140,0.18),transparent_42%),linear-gradient(180deg,rgba(22,12,20,0.98),rgba(8,6,10,0.99))] p-5 shadow-[0_20px_48px_rgba(0,0,0,0.32)] min-[1280px]:p-6">
          <div className="grid items-center gap-5 min-[1280px]:grid-cols-[minmax(0,5fr)_minmax(0,5fr)_minmax(0,2fr)] min-[1280px]:gap-6">
            {/* Copy ~38–42% */}
            <div className="min-w-0 text-left">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#E91E8C]/90">
                แพ็กคู่แนะนำ
              </p>
              <h2
                id="product-bundle-title"
                className="mt-2 text-[22px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white min-[1280px]:text-[26px]"
              >
                พร้อมเริ่มต้นกับ {product.title}
              </h2>
              <p className="mt-2 text-[14px] leading-[1.55] text-white/72">
                จับคู่กับ {pair.title} จากแคตตาล็อกจริง — สอบถามแพ็กและการใช้งานผ่าน LINE
                โดยไม่สร้างส่วนลดหรือสต็อกสมมติ
              </p>
              <div className="mt-3 flex flex-wrap items-end gap-3">
                <div>
                  <p className="text-[11px] text-white/45">{product.title}</p>
                  <p className="text-[22px] font-extrabold leading-none text-[#E91E8C]">
                    {product.pricing.sale.display}
                  </p>
                </div>
                <span className="pb-1 text-white/35" aria-hidden="true">
                  +
                </span>
                <div>
                  <p className="text-[11px] text-white/45">{pair.title}</p>
                  <p className="text-[18px] font-semibold leading-none text-white/90">
                    {pair.pricing.sale.display}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual ~38–42% */}
            <div className="flex min-w-0 items-center justify-center gap-3">
              <div className="relative h-[140px] w-[140px] overflow-hidden rounded-[18px] border border-white/10 bg-black min-[1280px]:h-[160px] min-[1280px]:w-[160px]">
                {product.imageSrc ? (
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt || product.title}
                    fill
                    className="object-contain p-2"
                    sizes="160px"
                    loading="lazy"
                  />
                ) : null}
              </div>
              <Plus className="h-6 w-6 shrink-0 text-[#E91E8C]" aria-hidden="true" />
              <div className="relative h-[140px] w-[140px] overflow-hidden rounded-[18px] border border-white/10 bg-black min-[1280px]:h-[160px] min-[1280px]:w-[160px]">
                {pair.imageSrc ? (
                  <Image
                    src={pair.imageSrc}
                    alt={pair.title}
                    fill
                    className="object-contain p-2"
                    sizes="160px"
                    loading="lazy"
                  />
                ) : null}
              </div>
            </div>

            {/* CTA ~18–24% */}
            <div className="flex min-w-0 flex-col justify-center gap-2">
              <button
                type="button"
                onClick={handleLine}
                aria-label={`สอบถามแพ็ก ${product.title} กับ ${pair.title} ผ่าน LINE`}
                className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#E91E8C] px-4 text-[14px] font-bold text-white shadow-[0_0_22px_rgba(233,30,140,0.4)] transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E91E8C]"
              >
                <LineIcon size={18} />
                สอบถามแพ็กผ่าน LINE
              </button>
              <p className="text-center text-[11px] leading-4 text-white/50">
                <MessageCircleMore className="mr-1 inline h-3.5 w-3.5 align-text-bottom" aria-hidden="true" />
                LINE-first · ไม่มีตะกร้าหรือ checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
