import { MetadataRoute } from 'next';
import { getAllProducts, getAllInformationPages, getAllKnowledgePages } from '@/lib/platform/entity-loader';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zenovell.com';

  const products = getAllProducts().map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const information = getAllInformationPages().map((info) => ({
    url: `${baseUrl}/information/${info.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const knowledge = getAllKnowledgePages().map((know) => ({
    url: `${baseUrl}/knowledge/${know.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...products,
    ...information,
    ...knowledge,
  ];
}
