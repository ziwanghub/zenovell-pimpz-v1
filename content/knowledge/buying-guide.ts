import type { Knowledge } from './index';

export const buyingGuide: Knowledge = {
  id: 'kg-buying-guide',
  slug: 'buying-guide',
  title: 'Buying Guide',
  description: 'How to choose the right ZENOVELL product for your goals.',
  category: 'buying',
  summary: 'A practical guide to matching products with personal needs and lifestyle.',
  content: [
    {
      type: 'text',
      title: 'Start With Your Goal',
      body: 'Different formulas target different aspects of wellness. Clarify whether you are looking for energy, recovery, performance, or general support.',
    },
    {
      type: 'table',
      title: 'Quick Match Guide',
      rows: [
        { Goal: 'Daily energy & vitality', Recommended: 'Nicky Pimpz Boss or B21' },
        { Goal: 'On-the-go convenience', Recommended: 'NP Gel' },
        { Goal: 'Targeted daily support', Recommended: 'Boss Men / Boss Lady' },
      ],
    },
    {
      type: 'list',
      title: 'Questions to Ask Before Buying',
      items: [
        'What is my primary goal?',
        'Do I prefer capsules or gel?',
        'Am I new to these ingredients or experienced?',
      ],
    },
    {
      type: 'warning',
      title: 'Avoid Common Mistakes',
      body: 'Do not buy based on price alone. Focus on ingredient transparency and your specific needs.',
    },
  ],
  keyTakeaways: [
    'Match product to goal, not marketing',
    'Consider format and routine fit',
    'Read labels and research ingredients',
  ],
  relatedProducts: ['nicky-pimpz-boss', 'boss-men', 'boss-lady', 'np-gel', 'np-mens-wipes', 'b21'],
  relatedInformation: ['quality', 'shipping'],
  relatedKnowledge: ['safe-purchase-education'],
  seo: {
    title: 'Buying Guide | ZENOVELL Knowledge',
    description: 'Choose the right ZENOVELL product with this practical buying guide.',
    keywords: ['buying guide', 'which product', 'product comparison', 'wellness purchase'],
  },
  structuredDataType: 'Article',
  cta: {
    label: 'Ask which product is right for you',
  },
  metadata: {
    readingTime: 7,
    difficulty: 'beginner',
    audience: ['new-users'],
    createdAt: '2026-07-07T00:00:00Z',
    updatedAt: '2026-07-07T00:00:00Z',
    status: 'published',
    version: '1.0.0',
  },
};
