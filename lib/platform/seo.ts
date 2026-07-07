import type { Metadata } from 'next';
import type { Product } from '@/content/products';

/**
 * SEO / AI SEO / Structured Data utilities for Product Landing Platform (WP-10)
 * Reusable, pure functions. Uses only Product Authority data.
 */

export interface ProductSEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title: string;
    description: string;
    images?: { url: string; alt?: string }[];
  };
  twitter?: {
    title: string;
    description: string;
  };
  canonical?: string;
}

export interface ProductJsonLd {
  '@context': string;
  '@type': string;
  name: string;
  description?: string;
  sku?: string;
  offers?: {
    '@type': string;
    price: number;
    priceCurrency: string;
    availability: string;
  };
}

export interface BreadcrumbJsonLd {
  '@context': string;
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Generate rich metadata for a product landing page.
 * Supports SEO + AI SEO + Open Graph.
 */
export function generateProductMetadata(
  product: Product,
  baseUrl = 'https://zenovell.com'
): Metadata {
  const title = product.title;
  const description = product.subtitle || `Premium ${product.category} from ZENOVELL. ${product.title} - ${product.pricing.sale.display}.`;

  const canonical = `${baseUrl}/products/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: product.imageSrc
        ? [
            {
              url: product.imageSrc.startsWith('http') ? product.imageSrc : `${baseUrl}${product.imageSrc}`,
              alt: product.imageAlt || product.title,
            },
          ]
        : undefined,
      type: 'website',
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
    },
    // AI SEO friendly keywords derived from product
    keywords: [
      product.title.toLowerCase(),
      product.subtitle?.toLowerCase() || '',
      'wellness',
      'premium',
      product.category,
    ].filter(Boolean),
  };
}

/**
 * Generate Product JSON-LD structured data.
 */
export function generateProductJsonLd(product: Product): ProductJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.subtitle,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      price: product.pricing.sale.amount / 100,
      priceCurrency: product.pricing.sale.currency,
      availability: product.active ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };
}

/**
 * Generate BreadcrumbList JSON-LD.
 */
export function generateBreadcrumbJsonLd(product: Product): BreadcrumbJsonLd {
  const baseUrl = 'https://zenovell.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: `${baseUrl}/products`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.title,
        item: `${baseUrl}/products/${product.slug}`,
      },
    ],
  };
}

/**
 * Combine structured data for the page.
 */
export function generateProductStructuredData(product: Product) {
  return {
    product: generateProductJsonLd(product),
    breadcrumb: generateBreadcrumbJsonLd(product),
  };
}
