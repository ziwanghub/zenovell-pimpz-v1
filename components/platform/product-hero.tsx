'use client';

import Image from 'next/image';

import type { Product } from '@/content/products';
import { buildLineMessage } from '@/lib/commerce/line-message-builder';
import type { CommerceContext } from '@/lib/commerce/context';

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  const handleLineCta = () => {
    // Minimal context for foundation (can be enriched later via Commerce Context)
    const context: CommerceContext = {
      source: 'product-landing',
      entrySurface: 'hero',
      landingPage: `/products/${product.slug}`,
      intent: 'inquiry',
      utm: {},
      timestamp: new Date().toISOString(),
    };

    const message = buildLineMessage(product, context, {
      includePrice: true,
    });

    // Open LINE with pre-filled message (text link for broad compatibility)
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;
    window.open(lineUrl, '_blank');
  };

  const hasDiscount = product.pricing.sale.amount < product.pricing.original.amount;

  return (
    <div className="relative w-full overflow-hidden bg-black text-white">
      {/* Hero Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950 md:aspect-[16/9]">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt || product.title}
          fill
          className="object-cover"
          sizes="(max-width: 430px) 100vw, 430px"
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative -mt-12 px-6 pb-10 md:-mt-16 md:px-8">
        <div className="mx-auto max-w-[430px]">
          {/* Badge */}
          {product.badge && (
            <div className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-widest text-white/80">
              {product.badge.label}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold leading-none tracking-tighter md:text-5xl">
            {product.title}
          </h1>

          {/* Subtitle / Short Description */}
          {product.subtitle && (
            <p className="mt-3 text-lg text-white/80 md:text-xl">
              {product.subtitle}
            </p>
          )}

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-semibold tracking-tight">
              {product.pricing.sale.display}
            </span>
            {hasDiscount && (
              <span className="text-lg text-white/50 line-through">
                {product.pricing.original.display}
              </span>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={handleLineCta}
            className="mt-8 w-full rounded-xl bg-white py-4 text-base font-semibold text-black active:bg-white/90"
          >
            {product.cta.label}
          </button>

          <p className="mt-3 text-center text-xs text-white/50">
            ส่งข้อความถึงเราผ่าน LINE ทันที
          </p>
        </div>
      </div>
    </div>
  );
}
