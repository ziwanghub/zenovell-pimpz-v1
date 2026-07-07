import type { Metadata } from 'next';
import type { Product } from '@/content/products';
import type { Information } from '@/content/information';
import type { Knowledge } from '@/content/knowledge';

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

// ============================================
// Phase 5D: Information SEO / Structured Data
// ============================================

export interface InformationSEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title: string;
    description: string;
  };
  canonical?: string;
}

export interface InformationJsonLd {
  '@context': string;
  '@type': string;
  name: string;
  description?: string;
  url?: string;
}

export function generateInformationMetadata(
  info: Information,
  baseUrl = 'https://zenovell.com'
): Metadata {
  const canonical = `${baseUrl}/information/${info.slug}`;

  return {
    title: info.seo.title,
    description: info.seo.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: info.seo.title,
      description: info.seo.description,
      url: canonical,
      type: 'website',
    },
    twitter: {
      title: info.seo.title,
      description: info.seo.description,
      card: 'summary',
    },
    keywords: info.seo.keywords,
  };
}

export function generateInformationJsonLd(info: Information, baseUrl = 'https://zenovell.com'): InformationJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: info.title,
    description: info.description || info.seo.description,
    url: `${baseUrl}/information/${info.slug}`,
  };
}

export function generateInformationBreadcrumbJsonLd(info: Information, baseUrl = 'https://zenovell.com') {
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
        name: 'Information',
        item: `${baseUrl}/information`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: info.title,
        item: `${baseUrl}/information/${info.slug}`,
      },
    ],
  };
}

export function generateInformationStructuredData(info: Information) {
  return {
    webpage: generateInformationJsonLd(info),
    breadcrumb: generateInformationBreadcrumbJsonLd(info),
  };
}

// ============================================
// Phase 5E: Knowledge SEO / Structured Data
// ============================================

export interface KnowledgeSEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title: string;
    description: string;
  };
  canonical?: string;
}

export interface KnowledgeJsonLd {
  '@context': string;
  '@type': string;
  name: string;
  description?: string;
  url?: string;
}

export function generateKnowledgeMetadata(
  knowledge: Knowledge,
  baseUrl = 'https://zenovell.com'
): Metadata {
  const canonical = `${baseUrl}/knowledge/${knowledge.slug}`;

  return {
    title: knowledge.seo.title,
    description: knowledge.seo.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: knowledge.seo.title,
      description: knowledge.seo.description,
      url: canonical,
      type: 'website',
    },
    twitter: {
      title: knowledge.seo.title,
      description: knowledge.seo.description,
      card: 'summary',
    },
    keywords: knowledge.seo.keywords,
  };
}

export function generateKnowledgeJsonLd(knowledge: Knowledge, baseUrl = 'https://zenovell.com'): KnowledgeJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': knowledge.structuredDataType,
    name: knowledge.title,
    description: knowledge.description || knowledge.seo.description,
    url: `${baseUrl}/knowledge/${knowledge.slug}`,
  };
}

export function generateKnowledgeBreadcrumbJsonLd(knowledge: Knowledge, baseUrl = 'https://zenovell.com') {
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
        name: 'Knowledge',
        item: `${baseUrl}/knowledge`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: knowledge.title,
        item: `${baseUrl}/knowledge/${knowledge.slug}`,
      },
    ],
  };
}

export function generateKnowledgeStructuredData(knowledge: Knowledge) {
  return {
    webpage: generateKnowledgeJsonLd(knowledge),
    breadcrumb: generateKnowledgeBreadcrumbJsonLd(knowledge),
  };
}

// ============================================
// Phase 5G: Site-level SEO / AI SEO
// Organization, WebSite, and enhancements
// ============================================

export function generateOrganizationJsonLd(baseUrl = 'https://zenovell.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ZENOVELL',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`, // use existing assets if available
    description: 'Premium wellness products for men and women.',
    sameAs: [], // add social if available
  };
}

export function generateWebSiteJsonLd(baseUrl = 'https://zenovell.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ZENOVELL',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateSiteStructuredData(baseUrl = 'https://zenovell.com') {
  return {
    organization: generateOrganizationJsonLd(baseUrl),
    website: generateWebSiteJsonLd(baseUrl),
  };
}
