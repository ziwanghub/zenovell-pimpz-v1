'use client';

import {
  BadgeCheck,
  Lock,
  MessageCircleMore,
  ShieldCheck,
  Star,
  TestTubeDiagonal,
} from 'lucide-react';

import type { Product } from '@/content/products';
import { activateLineCta } from '@/lib/commerce/cta-activation';
import { LineIcon } from '@/components/ui/line-icon';

interface ProductHeroProps {
  product: Product;
}

/**
 * Buy module / product identity column.
 * Mobile <768: frozen single CTA + 4-trust.
 * Tablet 768–1279 (P-PRODUCT-TABLET-02): desktop composition hierarchy
 *   (dual LINE CTA + 3 trust), reduced type/spacing density, no sticky.
 * Desktop ≥1280: full desktop type + dual CTA + 3 trust (sticky via page).
 */
export function ProductHero({ product }: ProductHeroProps) {
  const productShape = {
    slug: product.slug,
    sku: product.sku,
    title: product.title,
    cta: product.cta,
  };

  const handlePrimaryLine = () => {
    activateLineCta({
      product: productShape,
      surface: 'hero-line',
      landingPage: `/products/${product.slug}`,
      intent: 'purchase',
      source: 'product-landing-desktop-primary',
    });
  };

  const handleSecondaryLine = () => {
    activateLineCta({
      product: productShape,
      surface: 'support-line',
      landingPage: `/products/${product.slug}`,
      intent: 'inquiry',
      source: 'product-landing-desktop-secondary',
    });
  };

  // Mobile single CTA preserves prior surface for continuity
  const handleMobileLine = () => {
    activateLineCta({
      product: productShape,
      surface: 'hero-line',
      landingPage: `/products/${product.slug}`,
      intent: 'inquiry',
      source: 'product-landing',
    });
  };

  const hasDiscount = product.pricing.sale.amount < product.pricing.original.amount;
  const discountPercent =
    product.promotions?.find((p) => typeof p.discountPercent === 'number')?.discountPercent ??
    (hasDiscount
      ? Math.round(
          ((product.pricing.original.amount - product.pricing.sale.amount) /
            product.pricing.original.amount) *
            100,
        )
      : null);

  const ratings = (product.reviews || [])
    .map((review) => review.rating)
    .filter((rating): rating is number => typeof rating === 'number');
  const ratingAverage =
    ratings.length > 0
      ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)
      : null;

  const capsuleLabel =
    product.features?.find((feature) => feature.sub?.includes('แคปซูล'))?.sub ?? '';
  const description = product.mechanism ?? product.subtitle;

  const trustItems = [
    { icon: ShieldCheck, label: 'ของแท้ 100%' },
    {
      icon: BadgeCheck,
      label: product.certification?.[0]?.name ?? 'ผ่านการตรวจสอบ',
    },
    {
      icon: TestTubeDiagonal,
      label: product.certification?.[1]?.name ?? 'ทดสอบคุณภาพ',
    },
    { icon: Lock, label: 'ข้อมูลเป็นความลับ' },
  ];

  const primaryLabel = product.cta?.label || 'สั่งซื้อผ่าน LINE';

  return (
    <section className="px-4 pb-1 pt-1.5 text-white min-[690px]:px-0 min-[768px]:pt-0 min-[768px]:pb-0">
      <div className="platform-shell-frame min-[768px]:max-w-none">
        <div className="mb-0.5 text-[10px] font-medium text-[#E91E8C] min-[768px]:text-[11px] min-[768px]:tracking-[0.04em] min-[1280px]:text-[12px]">
          {product.badge?.label ? 'ผลิตภัณฑ์แนะนำ' : 'ผลิตภัณฑ์'}
        </div>

        <h1 className="text-[18px] font-bold leading-[1.14] tracking-[-0.02em] text-white sm:text-[20px] min-[768px]:text-[24px] min-[768px]:font-extrabold min-[768px]:leading-[1.12] min-[900px]:text-[28px] min-[900px]:leading-[1.1] min-[1280px]:text-[34px] min-[1280px]:leading-[1.08] min-[1280px]:tracking-[-0.03em]">
          {product.title}
        </h1>

        {capsuleLabel ? (
          <div className="mt-0.5 text-[11px] leading-4 text-white/65 min-[768px]:mt-1 min-[768px]:text-[12px] min-[768px]:text-white/70 min-[1280px]:mt-1.5 min-[1280px]:text-[14px]">
            {capsuleLabel}
          </div>
        ) : null}

        {ratingAverage && (
          <div className="mt-1 flex items-center gap-2 text-[12px] text-white/76 min-[768px]:mt-1.5 min-[768px]:text-[12px] min-[1280px]:mt-2.5 min-[1280px]:text-[14px]">
            <div className="flex items-center gap-0.5 text-yellow-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-3 w-3 fill-current min-[768px]:h-3.5 min-[768px]:w-3.5"
                />
              ))}
            </div>
            <span className="font-semibold text-[#ffd24a]">{ratingAverage}</span>
            <span className="text-white/52">({ratings.length} รีวิว)</span>
          </div>
        )}

        <div className="mt-1.5 flex items-end gap-2 min-[768px]:mt-2 min-[1280px]:mt-3 min-[1280px]:gap-3">
          <div className="text-[48px] font-extrabold leading-none tracking-[-0.055em] text-[#E91E8C] min-[768px]:text-[32px] min-[768px]:tracking-[-0.04em] min-[900px]:text-[34px] min-[1280px]:text-[38px]">
            {product.pricing.sale.display}
          </div>
          {hasDiscount && (
            <div className="flex items-end gap-2 pb-1">
              <div className="text-[14px] leading-none text-white/34 line-through min-[1280px]:text-[16px]">
                {product.pricing.original.display}
              </div>
              {discountPercent != null ? (
                <div className="inline-flex h-7.5 items-center rounded-[8px] bg-[#E91E8C] px-2.5 text-[10px] font-bold text-white min-[768px]:h-8 min-[768px]:text-[11px]">
                  พิเศษ {discountPercent}%
                </div>
              ) : null}
            </div>
          )}
        </div>

        <p className="mt-1 text-[13px] leading-[1.68] text-white/72 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden min-[768px]:mt-1.5 min-[768px]:text-[13px] min-[768px]:leading-[1.5] min-[768px]:[-webkit-line-clamp:3] min-[1280px]:mt-2.5 min-[1280px]:text-[15px] min-[1280px]:leading-[1.6]">
          {description}
        </p>

        <div className="mt-2 flex items-center gap-2 text-[12px] text-emerald-400 min-[768px]:mt-2 min-[1280px]:mt-3 min-[1280px]:text-[13px]">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          <span>สอบถามความพร้อมล่าสุดผ่าน LINE</span>
        </div>

        {/* Mobile single CTA — frozen under 768 */}
        <button
          type="button"
          onClick={handleMobileLine}
          className="mt-2.5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[14px] bg-[#E91E8C] px-4 text-[13px] font-semibold text-white shadow-[0_10px_22px_rgba(233,30,140,0.33)] min-[768px]:hidden"
        >
          <MessageCircleMore className="h-4 w-4" />
          {primaryLabel}
        </button>

        {/* Tablet 768+ + Desktop dual LINE CTA — desktop hierarchy, no cart */}
        <div className="mt-3 hidden gap-2 min-[768px]:grid min-[768px]:grid-cols-2 min-[1024px]:gap-2.5 min-[1280px]:mt-4 min-[1280px]:gap-3">
          <button
            type="button"
            onClick={handleSecondaryLine}
            aria-label="ปรึกษาผ่าน LINE"
            className="inline-flex h-[44px] w-full items-center justify-center gap-1.5 rounded-full border border-white/12 bg-[#1A1A1A] px-2 text-[12px] font-semibold text-white transition hover:border-white/20 hover:bg-[#222] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E91E8C] min-[900px]:h-[48px] min-[900px]:gap-2 min-[900px]:px-3 min-[900px]:text-[14px] min-[1280px]:h-[52px] min-[1280px]:px-4 min-[1280px]:text-[15px]"
          >
            <LineIcon size={16} />
            ปรึกษาผ่าน LINE
          </button>
          <button
            type="button"
            onClick={handlePrimaryLine}
            aria-label={product.cta?.ariaLabel || primaryLabel}
            className="inline-flex h-[44px] w-full items-center justify-center gap-1.5 rounded-full bg-[#E91E8C] px-2 text-[12px] font-bold text-white shadow-[0_0_20px_rgba(233,30,140,0.4)] transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E91E8C] min-[900px]:h-[48px] min-[900px]:gap-2 min-[900px]:px-3 min-[900px]:text-[14px] min-[1280px]:h-[52px] min-[1280px]:px-4 min-[1280px]:text-[15px]"
          >
            <LineIcon size={16} />
            {primaryLabel}
          </button>
        </div>

        {/* Trust: mobile 4-col frozen; tablet + desktop 3-col (desktop hierarchy) */}
        <div className="mt-2.5 rounded-[16px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] min-[768px]:mt-3 min-[768px]:rounded-[12px] min-[1280px]:mt-4 min-[1280px]:rounded-[14px]">
          <div className="grid grid-cols-4 divide-x divide-white/8 min-[768px]:grid-cols-3">
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              const hideOnTabletDesktop = index >= 3;

              return (
                <div
                  key={`${item.label}-${index}`}
                  className={[
                    'px-2 py-2.5 text-center min-[768px]:min-h-[56px] min-[768px]:px-2 min-[768px]:py-2.5 min-[1280px]:min-h-[68px] min-[1280px]:px-2.5 min-[1280px]:py-3',
                    hideOnTabletDesktop ? 'min-[768px]:hidden' : '',
                  ].join(' ')}
                >
                  <Icon className="mx-auto h-3.5 w-3.5 text-[#E91E8C] min-[768px]:h-4 min-[768px]:w-4 min-[1280px]:h-5 min-[1280px]:w-5" />
                  <div className="mt-1 text-[10px] leading-[1.35] text-white/72 min-[768px]:mt-1 min-[1280px]:mt-1.5 min-[1280px]:text-[11px]">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
