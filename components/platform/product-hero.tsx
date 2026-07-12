'use client';

import { BadgeCheck, Lock, MessageCircleMore, ShieldCheck, Star, TestTubeDiagonal } from 'lucide-react';

import type { Product } from '@/content/products';
import { activateLineCta } from '@/lib/commerce/cta-activation';

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  const handleLineCta = () => {
    activateLineCta({
      product: {
        slug: product.slug,
        sku: product.sku,
        title: product.title,
        cta: product.cta,
      },
      surface: 'hero-line',
      landingPage: `/products/${product.slug}`,
      intent: 'inquiry',
      source: 'product-landing',
    });
  };

  const hasDiscount = product.pricing.sale.amount < product.pricing.original.amount;
  const ratings = (product.reviews || []).map((review) => review.rating).filter((rating): rating is number => typeof rating === 'number');
  const ratingAverage = ratings.length > 0
    ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)
    : null;
  const capsuleLabel =
    product.features?.find((feature) => feature.sub?.includes('แคปซูล'))?.sub ?? '';
  const description =
    product.mechanism ?? product.subtitle;
  const trustItems = [
    { icon: ShieldCheck, label: 'ของแท้ 100%' },
    { icon: BadgeCheck, label: product.certification?.[0]?.name ?? 'ผ่านการตรวจสอบ' },
    { icon: TestTubeDiagonal, label: product.certification?.[1]?.name ?? 'ทดสอบคุณภาพ' },
    { icon: Lock, label: 'ข้อมูลเป็นความลับ' },
  ];

  return (
    <section className="px-4 pb-1 pt-1.5 text-white min-[690px]:px-0">
      <div className="platform-shell-frame">
        <div className="mb-0.5 text-[10px] font-medium text-[#ff2f96]">
          ผลิตภัณฑ์แนะนำ
        </div>

        <h1 className="text-[18px] font-bold leading-[1.14] tracking-[-0.02em] text-white sm:text-[20px]">
          {product.title}
        </h1>

        {capsuleLabel ? (
          <div className="mt-0.5 text-[11px] leading-4 text-white/65">
            {capsuleLabel}
          </div>
        ) : null}

        {ratingAverage && (
          <div className="mt-1 flex items-center gap-2 text-[12px] text-white/76">
            <div className="flex items-center gap-0.5 text-yellow-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-3 w-3 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-[#ffd24a]">{ratingAverage}</span>
            <span className="text-white/52">({ratings.length} รีวิว)</span>
          </div>
        )}

        <div className="mt-1.5 flex items-end gap-2">
          <div className="text-[48px] font-extrabold leading-none tracking-[-0.055em] text-[#ff2f96]">
            {product.pricing.sale.display}
          </div>
          {hasDiscount && (
            <div className="flex items-end gap-2 pb-1">
              <div className="text-[14px] leading-none text-white/34 line-through">
                {product.pricing.original.display}
              </div>
              <div className="inline-flex h-7.5 items-center rounded-[8px] bg-[#ff2f96] px-2.5 text-[10px] font-bold text-white">
                พิเศษ 23%
              </div>
            </div>
          )}
        </div>

        <p className="mt-1 text-[13px] leading-[1.68] text-white/72 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
          {description}
        </p>

        <div className="mt-2 flex items-center gap-2 text-[12px] text-emerald-400">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          <span>สอบถามความพร้อมล่าสุดผ่าน LINE</span>
        </div>

        <button
          type="button"
          onClick={handleLineCta}
          className="mt-2.5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[14px] bg-[#ff2f96] px-4 text-[13px] font-semibold text-white shadow-[0_10px_22px_rgba(255,47,150,0.33)]"
        >
          <MessageCircleMore className="h-4 w-4" />
          สั่งซื้อผ่าน LINE
        </button>

        <div className="mt-2.5 rounded-[16px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
          <div className="grid grid-cols-4 divide-x divide-white/8">
            {trustItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={`${item.label}-${index}`} className="px-2 py-2.5 text-center">
                  <Icon className="mx-auto h-3.5 w-3.5 text-[#ff2f96]" />
                  <div className="mt-1 text-[10px] leading-[1.35] text-white/72">
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
