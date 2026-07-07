/**
 * Knowledge Authority (Phase 5E)
 *
 * Separate educational authority for long-form, SEO-optimized content.
 * Option C storage model (per Blueprint).
 *
 * Does NOT touch Product Authority or Information Authority.
 */

export type KnowledgeSectionType =
  | 'text'
  | 'list'
  | 'highlight'
  | 'steps'
  | 'faq'
  | 'image'
  | 'quote'
  | 'table'
  | 'warning';

export interface KnowledgeSection {
  type: KnowledgeSectionType;
  title?: string;
  body?: string;
  items?: string[];
  imageSrc?: string;
  imageAlt?: string;
  quote?: string;
  author?: string;
  rows?: Array<Record<string, string>>;
  level?: 'info' | 'warning' | 'critical';
}

export interface KnowledgeMetadata {
  readingTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  audience: string[];
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published';
  version: string;
}

export interface Knowledge {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category: string;
  summary: string;
  content: KnowledgeSection[];
  keyTakeaways: string[];
  relatedProducts?: string[];
  relatedInformation?: string[];
  relatedKnowledge?: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  structuredDataType: 'Article' | 'HowTo' | 'FAQPage' | 'WebPage';
  cta: {
    label: string;
  };
  metadata: KnowledgeMetadata;
}

export type KnowledgeTopic =
  | 'ingredient-guide'
  | 'product-usage-guide'
  | 'buying-guide'
  | 'safe-purchase-education'
  | 'line-ordering-guide'
  | 'wellness-education';

// Re-export individual topics
export { ingredientGuide } from './ingredient-guide';
export { productUsageGuide } from './product-usage-guide';
export { buyingGuide } from './buying-guide';
export { safePurchaseEducation } from './safe-purchase-education';
export { lineOrderingGuide } from './line-ordering-guide';
export { wellnessEducation } from './wellness-education';

import { ingredientGuide } from './ingredient-guide';
import { productUsageGuide } from './product-usage-guide';
import { buyingGuide } from './buying-guide';
import { safePurchaseEducation } from './safe-purchase-education';
import { lineOrderingGuide } from './line-ordering-guide';
import { wellnessEducation } from './wellness-education';

const knowledgePages: Record<string, Knowledge> = {
  'ingredient-guide': ingredientGuide,
  'product-usage-guide': productUsageGuide,
  'buying-guide': buyingGuide,
  'safe-purchase-education': safePurchaseEducation,
  'line-ordering-guide': lineOrderingGuide,
  'wellness-education': wellnessEducation,
};

export function getAllKnowledge(): Knowledge[] {
  return Object.values(knowledgePages);
}

export function getKnowledgeBySlug(slug: string): Knowledge | undefined {
  return knowledgePages[slug];
}

export function knowledgeExists(slug: string): boolean {
  return !!knowledgePages[slug];
}
