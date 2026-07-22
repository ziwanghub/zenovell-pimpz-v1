'use client';

import { useId } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface RelatedProduct {
  slug: string;
  title: string;
  pricing: {
    sale: { display: string };
  };
  imageSrc?: string;
}

interface ProductRelatedProductsProps {
  relatedProducts?: RelatedProduct[];
}

function getProductTypeLabel(title: string) {
  if (title.includes('WIPES')) {
    return 'Wipes';
  }

  if (title.includes('GEL')) {
    return 'Gel';
  }

  return 'Capsule';
}

export function ProductRelatedProducts({ relatedProducts }: ProductRelatedProductsProps) {
  const headingId = useId();

  if (!relatedProducts || relatedProducts.length === 0) {
    return (
      <section className="px-4 py-4 text-white min-[690px]:px-0">
        <div className="platform-shell-frame rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,18,20,0.96),rgba(8,8,10,0.98))] px-5 py-6 text-center text-sm text-white/55">
          สินค้าที่เกี่ยวข้องจะปรากฏที่นี่เมื่อมีข้อมูลพร้อมแสดงผล
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-4 text-white min-[690px]:px-0" aria-labelledby={headingId}>
      <div className="platform-shell-frame">
        <div className="mb-3">
          <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/45">
            Related Products
          </div>
          <h2
            id={headingId}
            className="mt-1.5 text-[20px] font-semibold tracking-[-0.02em] text-white"
          >
            สินค้าที่เกี่ยวข้อง
          </h2>
          <p className="mt-1 text-[13px] leading-5 text-white/62">
            เลือกผลิตภัณฑ์อื่นที่ตอบโจทย์ความต้องการใกล้เคียง
          </p>
        </div>

        {/*
          Mobile/tablet: horizontal carousel.
          Desktop ≥1280: 4 equal-height cards (contract).
        */}
        <div
          className={[
            'scrollbar-none -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 [overscroll-behavior-inline:contain]',
            'min-[1280px]:mx-0 min-[1280px]:grid min-[1280px]:grid-cols-4 min-[1280px]:gap-4 min-[1280px]:overflow-visible min-[1280px]:px-0 min-[1280px]:pb-0 min-[1280px]:snap-none',
          ].join(' ')}
          aria-label="สินค้าที่เกี่ยวข้อง"
        >
          {relatedProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className={[
                'group flex min-h-[314px] w-[75%] shrink-0 snap-start flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_14px_32px_rgba(0,0,0,0.2)]',
                'min-[1280px]:h-full min-[1280px]:w-auto min-[1280px]:min-h-[300px] min-[1280px]:shrink min-[1280px]:snap-align-none',
              ].join(' ')}
            >
              {product.imageSrc ? (
                <div className="relative aspect-square w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={product.imageSrc}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 min-[1280px]:object-contain min-[1280px]:group-hover:scale-100"
                    sizes="(max-width: 1279px) 76vw, 280px"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="aspect-square w-full bg-zinc-900" aria-hidden="true" />
              )}

              <div className="flex flex-1 flex-col p-3.5">
                <div className="inline-flex w-fit rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-fuchsia-100">
                  สินค้าแนะนำ
                </div>

                <div className="mt-2.5 line-clamp-2 min-h-[3rem] text-[15px] font-semibold leading-5.5 text-white">
                  {product.title}
                </div>

                <div className="mt-1 text-[12px] text-white/48">
                  {getProductTypeLabel(product.title)}
                </div>

                <div className="mt-auto pt-3.5">
                  <div className="text-[22px] font-semibold tracking-[-0.02em] text-fuchsia-100">
                    {product.pricing.sale.display}
                  </div>
                  <div className="mt-2.5 inline-flex min-h-11 w-full items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.04] px-4 text-[13px] font-medium text-white/88 transition group-hover:border-white/20 group-hover:bg-white/[0.06]">
                    ดูรายละเอียดสินค้า
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
