'use client';

import Link from 'next/link';

import { getAllProducts } from '@/lib/platform/entity-loader';

interface InformationRelatedProductsProps {
  relatedSlugs?: string[];
}

export function InformationRelatedProducts({ relatedSlugs }: InformationRelatedProductsProps) {
  if (!relatedSlugs || relatedSlugs.length === 0) {
    return null;
  }

  const allProducts = getAllProducts();
  const related = allProducts
    .filter((p) => relatedSlugs.includes(p.slug))
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-[430px]">
        <h2 className="mb-6 text-xl font-semibold tracking-tight">Related Products</h2>

        <div className="space-y-3">
          {related.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
            >
              <div className="font-medium">{product.title}</div>
              <div className="text-sm text-white/70 mt-0.5">{product.pricing.sale.display}</div>
            </Link>
          ))}
        </div>

        <p className="mt-4 text-xs text-white/50">
          Learn more about products that align with this topic.
        </p>
      </div>
    </div>
  );
}
