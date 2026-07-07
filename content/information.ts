/**
 * Information Authority (Phase 5D)
 *
 * Separate brand-level authority for trust, compliance, and research content.
 * Hybrid content layer - core facts and structured sections here.
 *
 * Does NOT touch Product Authority (content/products.ts).
 */

export interface InformationSection {
  type: 'text' | 'list' | 'highlight';
  title?: string;
  body?: string;
  items?: string[];
}

export interface Information {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  sections: InformationSection[];
  relatedProducts?: string[]; // product slugs for cross links
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  cta: {
    label: string;
  };
}

export const informationPages: Information[] = [
  {
    id: 'about',
    slug: 'about',
    title: 'About ZENOVELL',
    subtitle: 'Premium wellness for modern life',
    description: 'ZENOVELL delivers science-backed personal care and wellness solutions with uncompromising quality.',
    sections: [
      {
        type: 'text',
        title: 'Our Story',
        body: 'Founded with a commitment to clean, effective formulations, ZENOVELL combines traditional wisdom with modern research. Every product is designed for real results without compromise.',
      },
      {
        type: 'highlight',
        title: 'What We Stand For',
        body: 'Transparency. Efficacy. Responsibility.',
      },
      {
        type: 'list',
        title: 'Core Values',
        items: [
          'Premium ingredients only',
          'Rigorous testing and quality control',
          'Sustainable and ethical sourcing',
          'Customer-first support via LINE',
        ],
      },
    ],
    relatedProducts: ['nicky-pimpz-boss', 'boss-men'],
    seo: {
      title: 'About ZENOVELL | Premium Wellness',
      description: 'Learn about ZENOVELL — our mission, values, and commitment to high-quality personal wellness products.',
      keywords: ['zenovell', 'about us', 'wellness brand', 'premium care'],
    },
    cta: {
      label: 'Talk to us on LINE',
    },
  },
  {
    id: 'quality',
    slug: 'quality',
    title: 'Quality & Certifications',
    subtitle: 'Standards you can trust',
    description: 'Every ZENOVELL product meets strict quality benchmarks and relevant certifications.',
    sections: [
      {
        type: 'text',
        title: 'Our Quality Promise',
        body: 'All formulations are developed and tested under controlled conditions. We prioritize purity, stability, and user safety.',
      },
      {
        type: 'list',
        title: 'Quality Controls',
        items: [
          'Third-party lab testing',
          'Batch traceability',
          'Ingredient sourcing audits',
          'Stability and shelf-life verification',
        ],
      },
      {
        type: 'highlight',
        title: 'Certifications & Compliance',
        body: 'Compliant with Thai FDA and international standards where applicable.',
      },
    ],
    relatedProducts: ['nicky-pimpz-boss', 'np-gel', 'b21'],
    seo: {
      title: 'Quality & Certifications | ZENOVELL',
      description: 'Discover ZENOVELL quality standards, testing processes, and certifications for our wellness products.',
      keywords: ['quality', 'certifications', 'testing', 'fda', 'wellness standards'],
    },
    cta: {
      label: 'Ask about quality on LINE',
    },
  },
  {
    id: 'privacy',
    slug: 'privacy',
    title: 'Privacy Policy',
    subtitle: 'Your data, protected',
    description: 'We respect your privacy. This policy explains how we collect, use, and protect your information.',
    sections: [
      {
        type: 'text',
        title: 'Data We Collect',
        body: 'We collect minimal data necessary to provide services and respond to inquiries. This may include contact information when you reach us via LINE or forms.',
      },
      {
        type: 'list',
        title: 'How We Use Data',
        items: [
          'Respond to your inquiries',
          'Improve our products and services',
          'Comply with legal requirements',
        ],
      },
      {
        type: 'text',
        title: 'Your Rights',
        body: 'You may request access, correction, or deletion of your personal data by contacting us directly.',
      },
    ],
    seo: {
      title: 'Privacy Policy | ZENOVELL',
      description: 'Read ZENOVELL Privacy Policy. We are committed to protecting your personal information.',
      keywords: ['privacy', 'policy', 'data protection', 'personal information'],
    },
    cta: {
      label: 'Questions about privacy? Talk to us',
    },
  },
  {
    id: 'shipping',
    slug: 'shipping',
    title: 'Shipping & Returns',
    subtitle: 'Fast, reliable delivery',
    description: 'We deliver across Thailand with care. Returns are accepted under our policy.',
    sections: [
      {
        type: 'text',
        title: 'Shipping Information',
        body: 'Orders are typically processed within 1-2 business days. Delivery times vary by location.',
      },
      {
        type: 'list',
        title: 'Shipping Details',
        items: [
          'Standard delivery: 2-5 business days',
          'Tracking provided for all orders',
          'Free shipping on qualifying orders',
        ],
      },
      {
        type: 'text',
        title: 'Returns & Exchanges',
        body: 'We accept returns within 7 days of receipt for unopened products in original condition. Contact us via LINE to initiate.',
      },
    ],
    seo: {
      title: 'Shipping & Returns | ZENOVELL',
      description: 'Learn about ZENOVELL shipping times, costs, and our return policy for wellness products.',
      keywords: ['shipping', 'delivery', 'returns', 'policy'],
    },
    cta: {
      label: 'Check order status on LINE',
    },
  },
  {
    id: 'contact',
    slug: 'contact',
    title: 'Contact Us',
    subtitle: 'We are here to help',
    description: 'The fastest way to reach our team is through LINE. We typically respond within business hours.',
    sections: [
      {
        type: 'text',
        title: 'Get in Touch',
        body: 'For product questions, orders, or general inquiries, connect with us on LINE. Our team is ready to assist.',
      },
      {
        type: 'highlight',
        title: 'Preferred Channel',
        body: 'LINE Official Account — fastest response and context-rich support.',
      },
      {
        type: 'list',
        title: 'What to Include',
        items: [
          'Your order number (if applicable)',
          'Product of interest',
          'Specific question or concern',
        ],
      },
    ],
    seo: {
      title: 'Contact ZENOVELL | Customer Support',
      description: 'Contact ZENOVELL via LINE for support, product questions, and inquiries.',
      keywords: ['contact', 'support', 'line', 'customer service'],
    },
    cta: {
      label: 'Chat with us on LINE',
    },
  },
  {
    id: 'terms',
    slug: 'terms',
    title: 'Terms of Service',
    subtitle: 'Please read carefully',
    description: 'These terms govern your use of the ZENOVELL website and services.',
    sections: [
      {
        type: 'text',
        title: 'Acceptance of Terms',
        body: 'By accessing or using this site, you agree to these Terms of Service and our Privacy Policy.',
      },
      {
        type: 'list',
        title: 'Key Points',
        items: [
          'Products are for personal use only',
          'All content is for informational purposes',
          'We reserve the right to update terms',
          'Disputes are handled under Thai law',
        ],
      },
      {
        type: 'text',
        title: 'Limitation of Liability',
        body: 'ZENOVELL is not liable for indirect or consequential damages arising from use of our products or site.',
      },
    ],
    seo: {
      title: 'Terms of Service | ZENOVELL',
      description: 'Read the Terms of Service for using the ZENOVELL website and purchasing our products.',
      keywords: ['terms', 'service', 'legal', 'conditions'],
    },
    cta: {
      label: 'Have questions? Contact us',
    },
  },
];

export function getAllInformation(): Information[] {
  return [...informationPages];
}

export function getInformationBySlug(slug: string): Information | undefined {
  return informationPages.find((page) => page.slug === slug);
}
