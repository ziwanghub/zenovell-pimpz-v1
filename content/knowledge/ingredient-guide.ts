import type { Knowledge } from './index';

export const ingredientGuide: Knowledge = {
  id: 'kg-ingredient-guide',
  slug: 'ingredient-guide',
  title: 'Ingredient Guide',
  description: 'Deep dive into the key active ingredients used across ZENOVELL products.',
  category: 'ingredient',
  summary: 'Understand the science behind our formulations and how each ingredient contributes to results.',
  content: [
    {
      type: 'text',
      title: 'Why Ingredients Matter',
      body: 'Every ZENOVELL product is built around a core set of researched ingredients. Quality sourcing and precise dosing are non-negotiable.',
    },
    {
      type: 'list',
      title: 'Core Ingredients Across Our Range',
      items: [
        'Maca Root – Supports energy and vitality',
        'Tribulus Terrestris – Traditional support for performance',
        'L-Arginine – Precursor to nitric oxide',
        'Tongkat Ali – Long-used in Southeast Asian wellness',
      ],
    },
    {
      type: 'highlight',
      title: 'Quality Standard',
      body: 'All ingredients are tested for purity and potency. We disclose full ingredient lists on every product.',
    },
    {
      type: 'steps',
      title: 'How to Read an Ingredient Label',
      items: [
        'Check the order – ingredients are listed by amount',
        'Look for standardized extracts',
        'Avoid proprietary blends when transparency matters',
      ],
    },
    {
      type: 'quote',
      quote: 'We believe users deserve to know exactly what they are taking.',
      author: 'ZENOVELL Formulation Team',
    },
  ],
  keyTakeaways: [
    'Ingredients are chosen for evidence and tradition',
    'Standardized extracts ensure consistent dosing',
    'Full transparency is part of our brand promise',
  ],
  relatedProducts: ['nicky-pimpz-boss', 'boss-men', 'b21'],
  relatedInformation: ['quality'],
  relatedKnowledge: ['product-usage-guide'],
  seo: {
    title: 'Ingredient Guide | ZENOVELL Knowledge',
    description: 'Learn about the key ingredients in ZENOVELL wellness products and their roles.',
    keywords: ['ingredients', 'maca', 'tongkat ali', 'wellness ingredients', 'supplement guide'],
  },
  structuredDataType: 'Article',
  cta: {
    label: 'Ask about ingredients on LINE',
  },
  metadata: {
    readingTime: 8,
    difficulty: 'beginner',
    audience: ['new-users', 'existing-customers'],
    createdAt: '2026-07-07T00:00:00Z',
    updatedAt: '2026-07-07T00:00:00Z',
    status: 'published',
    version: '1.0.0',
  },
};
