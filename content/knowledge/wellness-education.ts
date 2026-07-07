import type { Knowledge } from './index';

export const wellnessEducation: Knowledge = {
  id: 'kg-wellness-education',
  slug: 'wellness-education',
  title: 'Wellness Education',
  description: 'Foundational knowledge for building sustainable personal wellness habits.',
  category: 'education',
  summary: 'Broader perspective on wellness that goes beyond single products.',
  content: [
    {
      type: 'text',
      title: 'Wellness Is a System',
      body: 'Supplements work best when supported by sleep, nutrition, movement, and stress management.',
    },
    {
      type: 'list',
      title: 'Foundational Pillars',
      items: [
        'Quality sleep',
        'Balanced nutrition',
        'Regular movement',
        'Stress awareness',
        'Consistent routines',
      ],
    },
    {
      type: 'image',
      title: 'Daily Wellness Stack Example',
      body: 'Morning: Product + hydration. Midday: Movement break. Evening: Wind-down routine.',
    },
    {
      type: 'quote',
      quote: 'The best results come from combining smart products with smart habits.',
      author: 'ZENOVELL Education Team',
    },
  ],
  keyTakeaways: [
    'Products amplify good habits',
    'Small consistent actions compound',
    'Education leads to better decisions',
  ],
  relatedProducts: ['b21', 'boss-men'],
  relatedInformation: ['about'],
  relatedKnowledge: ['ingredient-guide', 'product-usage-guide'],
  seo: {
    title: 'Wellness Education | ZENOVELL Knowledge',
    description: 'Holistic wellness education to support your ZENOVELL journey.',
    keywords: ['wellness education', 'healthy habits', 'lifestyle', 'holistic wellness'],
  },
  structuredDataType: 'Article',
  cta: {
    label: 'Talk about your wellness goals',
  },
  metadata: {
    readingTime: 9,
    difficulty: 'intermediate',
    audience: ['existing-customers'],
    createdAt: '2026-07-07T00:00:00Z',
    updatedAt: '2026-07-07T00:00:00Z',
    status: 'published',
    version: '1.0.0',
  },
};
