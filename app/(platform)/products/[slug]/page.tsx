import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllProducts, loadProductBySlug } from '@/lib/platform/entity-loader';
import {
  generateProductMetadata,
  generateProductStructuredData,
} from '@/lib/platform/seo';
import { ProductHero } from '@/components/platform/product-hero';
import { ProductBenefits } from '@/components/platform/product-benefits';
import { ProductIngredients } from '@/components/platform/product-ingredients';
import { ProductHowToUse } from '@/components/platform/product-how-to-use';
import { ProductTrustSignals } from '@/components/platform/product-trust-signals';
import { ProductReviews } from '@/components/platform/product-reviews';
import { ProductFAQ } from '@/components/platform/product-faq';
import { ProductRelatedProducts } from '@/components/platform/product-related-products';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const all = getAllProducts();
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const result = loadProductBySlug(params.slug);

  if (!result.found || !result.entity) {
    return {
      title: 'Product Not Found | ZENOVELL',
    };
  }

  const product = result.entity;

  // WP-10: Enhanced SEO / AI SEO / OpenGraph using reusable helper
  return generateProductMetadata(product);
}

export default function ProductPage({ params }: ProductPageProps) {
  const result = loadProductBySlug(params.slug);

  if (!result.found || !result.entity) {
    notFound();
  }

  const product = result.entity;

  // Temporary binding: use features as benefits fallback until Rich Content Layer is populated
  const benefits = product.features?.map((f) => ({
    title: f.title,
    description: f.sub,
  }));

  // Trust Signals fallback from badge + features (trust-oriented)
  const trustSignals = [
    ...(product.badge ? [{ title: product.badge.label }] : []),
    ...(product.features || []).map((f) => ({
      title: f.title,
      subtitle: f.sub,
    })),
  ];

  // Related Products: derive from Product Authority, exclude current, simple limit
  const allProducts = getAllProducts();
  const relatedProducts = allProducts
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      pricing: p.pricing,
      imageSrc: p.imageSrc,
    }));

  // WP-10: Generate Structured Data (Product + Breadcrumb)
  const structuredData = generateProductStructuredData(product);

  // WP-02 to WP-10: Full Product Landing Foundation (Hero through Related + SEO/Structured Data)
  // Rich content currently falls back or shows safe empty state.
  return (
    <>
      <ProductHero product={product} />
      <ProductBenefits benefits={benefits} />
      <ProductIngredients ingredients={undefined} />
      <ProductHowToUse howToUse={undefined} />
      <ProductTrustSignals trustSignals={trustSignals} />
      <ProductReviews reviews={undefined} />
      <ProductFAQ faq={undefined} />
      <ProductRelatedProducts relatedProducts={relatedProducts} />

      {/* WP-10: Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.product),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.breadcrumb),
        }}
      />
    </>
  );
}
