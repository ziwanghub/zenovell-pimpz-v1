import type { Knowledge } from './index';

export const productUsageGuide: Knowledge = {
  id: 'kg-usage-guide',
  slug: 'product-usage-guide',
  title: 'Product Usage Guide',
  description: 'Best practices for using ZENOVELL products effectively and safely.',
  category: 'usage',
  summary: 'Learn timing, dosage considerations, and how to combine products for best results.',
  content: [
    {
      type: 'text',
      title: 'General Guidelines',
      body: 'Most users see best results when products are taken consistently as part of a daily routine.',
    },
    {
      type: 'steps',
      title: 'Recommended Daily Routine',
      items: [
        'Take with water, preferably at the same time each day',
        'Start with the lowest recommended serving',
        'Track how you feel over 2-4 weeks',
        'Combine with healthy lifestyle habits',
      ],
    },
    {
      type: 'highlight',
      title: 'Important Note',
      body: 'Individual results vary. Consult a healthcare professional if you have any medical conditions.',
    },
    {
      type: 'faq',
      title: 'Common Questions',
      items: [
        'Can I take multiple products together? — Yes, many users stack complementary formulas.',
        'Should I take with food? — Most are fine with or without food.',
      ],
    },
  ],
  keyTakeaways: [
    'Consistency beats intensity',
    'Start low and monitor',
    'Pair with lifestyle fundamentals',
  ],
  relatedProducts: ['nicky-pimpz-boss', 'np-gel', 'boss-lady'],
  relatedInformation: ['quality'],
  relatedKnowledge: ['ingredient-guide'],
  seo: {
    title: 'Product Usage Guide | ZENOVELL Knowledge',
    description: 'How to use ZENOVELL products correctly for optimal results.',
    keywords: ['usage guide', 'how to take', 'dosage', 'supplement routine'],
  },
  structuredDataType: 'HowTo',
  cta: {
    label: 'Get usage advice on LINE',
  },
  metadata: {
    readingTime: 6,
    difficulty: 'beginner',
    audience: ['new-users', 'existing-customers'],
    createdAt: '2026-07-07T00:00:00Z',
    updatedAt: '2026-07-07T00:00:00Z',
    status: 'published',
    version: '1.0.0',
  },
};
