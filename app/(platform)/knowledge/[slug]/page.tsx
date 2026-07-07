import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllKnowledgePages, loadKnowledgeBySlug } from '@/lib/platform/entity-loader';
import {
  generateKnowledgeMetadata,
  generateKnowledgeStructuredData,
} from '@/lib/platform/seo';

import { KnowledgeHero } from '@/components/platform/knowledge-hero';
import { KnowledgeArticle } from '@/components/platform/knowledge-article';
import { KnowledgeTakeaways } from '@/components/platform/knowledge-takeaways';
import { KnowledgeRelated } from '@/components/platform/knowledge-related';
import { KnowledgeCta } from '@/components/platform/knowledge-cta';

interface KnowledgePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const all = getAllKnowledgePages();
  return all.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: KnowledgePageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = loadKnowledgeBySlug(slug);

  if (!result.found || !result.entity) {
    return {
      title: 'Knowledge Not Found | ZENOVELL',
    };
  }

  return generateKnowledgeMetadata(result.entity);
}

export default async function KnowledgePage({ params }: KnowledgePageProps) {
  const { slug } = await params;
  const result = loadKnowledgeBySlug(slug);

  if (!result.found || !result.entity) {
    notFound();
  }

  const knowledge = result.entity;

  const structuredData = generateKnowledgeStructuredData(knowledge);

  return (
    <>
      <KnowledgeHero knowledge={knowledge} />

      <KnowledgeArticle content={knowledge.content} />

      <KnowledgeTakeaways takeaways={knowledge.keyTakeaways} />

      <KnowledgeRelated
        relatedProducts={knowledge.relatedProducts}
        relatedInformation={knowledge.relatedInformation}
        relatedKnowledge={knowledge.relatedKnowledge}
      />

      <KnowledgeCta knowledge={knowledge} slug={slug} />

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

