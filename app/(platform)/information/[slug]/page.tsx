import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  getAllInformationPages,
  loadInformationBySlug,
} from '@/lib/platform/entity-loader';
import {
  generateInformationMetadata,
  generateInformationStructuredData,
} from '@/lib/platform/seo';

import { InformationHero } from '@/components/platform/information-hero';
import { InformationContent } from '@/components/platform/information-content';
import { InformationTrust } from '@/components/platform/information-trust';
import { InformationRelatedProducts } from '@/components/platform/information-related-products';
import { InformationCta } from '@/components/platform/information-cta';

interface InformationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const all = getAllInformationPages();
  return all.map((info) => ({ slug: info.slug }));
}

export async function generateMetadata({ params }: InformationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = loadInformationBySlug(slug);

  if (!result.found || !result.entity) {
    return {
      title: 'Information Not Found | ZENOVELL',
    };
  }

  const info = result.entity;
  return generateInformationMetadata(info);
}

export default async function InformationPage({ params }: InformationPageProps) {
  const { slug } = await params;
  const result = loadInformationBySlug(slug);

  if (!result.found || !result.entity) {
    notFound();
  }

  const info = result.entity;

  // Basic Commerce Context support is handled inside InformationCta
  // (research intent + landing page enrichment for LINE handoff)

  const structuredData = generateInformationStructuredData(info);

  // Extract highlights for trust section (from sections if present)
  const trustHighlights = info.sections
    .filter((s) => s.type === 'highlight' && s.body)
    .map((s) => s.body!)
    .slice(0, 3);

  return (
    <>
      <InformationHero info={info} />

      <InformationContent sections={info.sections} />

      <InformationTrust highlights={trustHighlights.length > 0 ? trustHighlights : undefined} />

      <InformationRelatedProducts relatedSlugs={info.relatedProducts} />

      <InformationCta info={info} slug={slug} />

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.webpage),
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

