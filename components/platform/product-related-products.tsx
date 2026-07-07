'use client';

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

export function ProductRelatedProducts({ relatedProducts }: ProductRelatedProductsProps) {
  if (!relatedProducts || relatedProducts.length === 0) {
    return (
      <div className="bg-zinc-950 px-6 py-10 text-center text-sm text-white/50">
        Related products not available yet.
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-[430px]">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">Related Products</h2>

        <div className="grid grid-cols-2 gap-4">
          {relatedProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              {product.imageSrc && (
                <div className="relative aspect-square w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={product.imageSrc}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 430px) 50vw, 215px"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="line-clamp-2 text-sm font-medium">{product.title}</div>
                <div className="mt-1 text-base font-semibold">
                  {product.pricing.sale.display}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
