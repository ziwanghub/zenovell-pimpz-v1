import type { Knowledge } from './index';

export const lineOrderingGuide: Knowledge = {
  id: 'kg-line-ordering',
  slug: 'line-ordering-guide',
  title: 'LINE Ordering Guide',
  description: 'How to order ZENOVELL products quickly and correctly via LINE.',
  category: 'ordering',
  summary: 'Step-by-step instructions for placing orders through our LINE Official Account.',
  content: [
    {
      type: 'steps',
      title: 'How to Order via LINE',
      items: [
        'Add ZENOVELL Official Account',
        'Send a message with the product name or code',
        'Confirm your shipping address',
        'Complete payment as instructed',
        'Receive order confirmation and tracking',
      ],
    },
    {
      type: 'highlight',
      title: 'Pro Tip',
      body: 'Mention your preferred product and any questions in one message for faster service.',
    },
    {
      type: 'faq',
      title: 'Frequently Asked',
      items: [
        'Can I change my order after sending? — Yes, reply quickly before processing.',
        'Do you ship nationwide? — Yes, with tracking on all orders.',
      ],
    },
  ],
  keyTakeaways: [
    'Clear messages speed up the process',
    'LINE is our primary and fastest channel',
    'You will always receive confirmation',
  ],
  relatedProducts: ['nicky-pimpz-boss', 'np-gel'],
  relatedInformation: ['shipping', 'contact'],
  relatedKnowledge: ['safe-purchase-education'],
  seo: {
    title: 'LINE Ordering Guide | ZENOVELL Knowledge',
    description: 'Step-by-step guide to ordering ZENOVELL products via LINE.',
    keywords: ['order via line', 'how to buy', 'line oa ordering', 'zenovell line'],
  },
  structuredDataType: 'HowTo',
  cta: {
    label: 'Start ordering on LINE now',
  },
  metadata: {
    readingTime: 4,
    difficulty: 'beginner',
    audience: ['new-users', 'existing-customers'],
    createdAt: '2026-07-07T00:00:00Z',
    updatedAt: '2026-07-07T00:00:00Z',
    status: 'published',
    version: '1.0.0',
  },
};
