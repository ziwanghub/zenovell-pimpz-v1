import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllProducts, loadProductBySlug } from '@/lib/platform/entity-loader';
import { generatePlatformTitle } from '@/lib/platform';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const all = getAllProducts();
  return all.map((p) => ({ slug: p.slug }));
}

// Phase 5B Dynamic Routing Foundation for Product Landing Page.
// This completes the dynamic routing, generateStaticParams, and generateMetadata foundation.
// Full Mini Landing Page template (Hero, Benefits, Ingredients, etc.) will be implemented in 5C.
// Commerce Context reading / persistence will be wired in 5F.
// No visual design changes, no CTA wiring beyond preparation, no homepage impact.

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const result = loadProductBySlug(params.slug);

  if (!result.found || !result.entity) {
    return {
      title: 'Product Not Found | ZENOVELL',
    };
  }

  const product = result.entity;

  return {
    title: generatePlatformTitle(product.title),
    description: product.subtitle || `Learn more about ${product.title} on ZENOVELL.`,
    // Future: openGraph, other metadata from Product Authority + content layer
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const result = loadProductBySlug(params.slug);

  if (!result.found || !result.entity) {
    notFound();
  }

  const product = result.entity;

  // Phase 5B routing foundation complete.
  // The page successfully loads the product entity via Entity Loader.
  // Full template in 5C. Context wiring in 5F.
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="mt-2 text-gray-600">{product.subtitle}</p>

      <div className="mt-8 rounded border border-dashed border-gray-300 p-6">
        <p className="text-sm text-gray-500">
          Phase 5A Platform Structure skeleton.
          <br />
          Full Product Landing Page template coming in Phase 5C.
          <br />
          This page successfully loads from Product Authority (slug: {product.slug}, sku: {product.sku}).
        </p>
      </div>
    </div>
  );
}
