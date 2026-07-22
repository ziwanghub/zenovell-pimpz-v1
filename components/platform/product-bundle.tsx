'use client';

import { useId } from 'react';
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
  /** Resolved pair from product.bundle.pairedProductSlug authority */
  pair?: BundlePair | null;
}

/**
 * Desktop companion / co-use band (P-PRODUCT-DESKTOP-02 / 02A).
 * LINE-only. Pairing must come from explicit product.bundle authority.
 */
export function ProductBundle({ product, pair }: ProductBundleProps) {
  const titleId = useId();

  if (!pair || !product.bundle?.pairedProductSlug) {
    return null;
  }

  // Guard: only render when pair matches explicit authority slug
  if (pair.slug !== product.bundle.pairedProductSlug) {
    return null;
  }

  const bandLabel = product.bundle.label || 'แนะนำให้ใช้ร่วมกัน';
  const bandDescription =
    product.bundle.description ||
    `แนะนำให้ใช้ ${product.title} ร่วมกับ ${pair.title} — สอบถามรายละเอียดผ่าน LINE`;

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
      campaign: `co-use-${product.bundle?.pairedProductSlug}`,
    });
  };

  return (
    <section
      className="px-4 py-5 text-white min-[690px]:px-0"
      aria-labelledby={titleId}
    >
      <div className="platform-shell-frame">
        <div className="overflow-hidden rounded-[24px] border border-[#E91E8C]/25 bg-[radial-gradient(circle_at_85%_50%,rgba(233,30,140,0.18),transparent_42%),linear-gradient(180deg,rgba(22,12,20,0.98),rgba(8,6,10,0.99))] p-5 shadow-[0_20px_48px_rgba(0,0,0,0.32)] min-[768px]:p-5 min-[1280px]:p-6">
          {/*
            Tablet 768–1279 (P-PRODUCT-TABLET-02): content | visual, CTA full width (desktop composition, reduced density)
            Desktop ≥1280: 5/5/2 band
          */}
          <div
            className={[
              'grid items-center gap-5',
              'min-[768px]:max-[1280px]:grid-cols-2 min-[768px]:max-[1280px]:gap-4',
              'min-[900px]:max-[1280px]:gap-5',
              'min-[1280px]:grid-cols-[minmax(0,5fr)_minmax(0,5fr)_minmax(0,2fr)] min-[1280px]:gap-6',
            ].join(' ')}
          >
            <div className="min-w-0 text-left">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#E91E8C]/90">
                {bandLabel}
              </p>
              <h2
                id={titleId}
                className="mt-2 text-[20px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white min-[768px]:text-[20px] min-[900px]:text-[22px] min-[1280px]:text-[26px]"
              >
                {product.title} + {pair.title}
              </h2>
              <p className="mt-2 text-[13px] leading-[1.55] text-white/72 min-[1280px]:text-[14px]">
                {bandDescription}
              </p>
              <div className="mt-3 flex flex-wrap items-end gap-3">
                <div>
                  <p className="text-[11px] text-white/45">{product.title}</p>
                  <p className="text-[20px] font-extrabold leading-none text-[#E91E8C] min-[1280px]:text-[22px]">
                    {product.pricing.sale.display}
                  </p>
                </div>
                <span className="pb-1 text-white/35" aria-hidden="true">
                  +
                </span>
                <div>
                  <p className="text-[11px] text-white/45">{pair.title}</p>
                  <p className="text-[16px] font-semibold leading-none text-white/90 min-[1280px]:text-[18px]">
                    {pair.pricing.sale.display}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex min-w-0 items-center justify-center gap-2 min-[768px]:gap-2.5 min-[900px]:gap-3">
              <div className="relative h-[120px] w-[120px] overflow-hidden rounded-[16px] border border-white/10 bg-black min-[768px]:h-[120px] min-[768px]:w-[120px] min-[900px]:h-[140px] min-[900px]:w-[140px] min-[1280px]:h-[160px] min-[1280px]:w-[160px] min-[1280px]:rounded-[18px]">
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
              <Plus className="h-5 w-5 shrink-0 text-[#E91E8C] min-[768px]:h-5 min-[768px]:w-5 min-[900px]:h-6 min-[900px]:w-6" aria-hidden="true" />
              <div className="relative h-[120px] w-[120px] overflow-hidden rounded-[16px] border border-white/10 bg-black min-[768px]:h-[120px] min-[768px]:w-[120px] min-[900px]:h-[140px] min-[900px]:w-[140px] min-[1280px]:h-[160px] min-[1280px]:w-[160px] min-[1280px]:rounded-[18px]">
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

            <div className="flex min-w-0 flex-col justify-center gap-2 min-[768px]:max-[1280px]:col-span-2">
              <button
                type="button"
                onClick={handleLine}
                aria-label={`สอบถามการใช้ ${product.title} ร่วมกับ ${pair.title} ผ่าน LINE`}
                className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#E91E8C] px-4 text-[14px] font-bold text-white shadow-[0_0_22px_rgba(233,30,140,0.4)] transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E91E8C] min-[1280px]:h-[52px]"
              >
                <LineIcon size={18} />
                สอบถามผ่าน LINE
              </button>
              <p className="text-center text-[11px] leading-4 text-white/50">
                <MessageCircleMore className="mr-1 inline h-3.5 w-3.5 align-text-bottom" aria-hidden="true" />
                LINE-first · ไม่มีตะกร้า · ไม่มีส่วนลดสมมติ
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
