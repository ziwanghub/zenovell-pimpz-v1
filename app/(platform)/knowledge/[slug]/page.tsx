import type { Metadata } from 'next';

interface KnowledgePageProps {
  params: { slug: string };
}

// Phase 5B Dynamic Routing Foundation skeleton for Knowledge Pages.
// This establishes the route and metadata foundation.
// Full content and template will be implemented in Phase 5E.
// Uses slug for metadata (no new content sources per scope).

export async function generateStaticParams() {
  // No static data for knowledge pages in 5B foundation.
  // Return empty to keep dynamic. This helps Next.js type system for new routes.
  return [];
}

export async function generateMetadata({ params }: KnowledgePageProps): Promise<Metadata> {
  const { slug } = params;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${title} | ZENOVELL Knowledge`,
    description: `Knowledge base: ${title}. Educational content from ZENOVELL.`,
  };
}

export default function KnowledgePage({ params }: KnowledgePageProps) {
  const { slug } = params;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold capitalize">{slug.replace(/-/g, ' ')}</h1>

      <div className="mt-8 rounded border border-dashed border-gray-300 p-6">
        <p className="text-sm text-gray-500">
          Phase 5B Dynamic Routing Foundation skeleton.
          <br />
          This route is now dynamically available at /knowledge/{slug}.
          <br />
          Full template and content in Phase 5E.
        </p>
      </div>
    </div>
  );
}

