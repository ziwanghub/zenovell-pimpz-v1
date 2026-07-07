import type { Metadata } from 'next';

interface InformationPageProps {
  params: { slug: string };
}

// Phase 5B Dynamic Routing Foundation skeleton for Information Pages.
// This establishes the route and metadata foundation.
// Full content and template will be implemented in Phase 5D.
// Uses slug for metadata (no new content sources per scope).

export async function generateStaticParams() {
  // No static data for information pages in 5B foundation.
  // Return empty to keep dynamic. This helps Next.js type system for new routes.
  return [];
}

export async function generateMetadata({ params }: InformationPageProps): Promise<Metadata> {
  const { slug } = params;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${title} | ZENOVELL`,
    description: `Information about ${title} on ZENOVELL. Learn more and connect via LINE.`,
  };
}

export default function InformationPage({ params }: InformationPageProps) {
  const { slug } = params;

  // Dynamic route loaded. Entity loading for related products can be added in 5F.
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold capitalize">{slug.replace(/-/g, ' ')}</h1>

      <div className="mt-8 rounded border border-dashed border-gray-300 p-6">
        <p className="text-sm text-gray-500">
          Phase 5B Dynamic Routing Foundation skeleton.
          <br />
          This route is now dynamically available at /information/{slug}.
          <br />
          Full template and content in Phase 5D.
        </p>
      </div>
    </div>
  );
}

