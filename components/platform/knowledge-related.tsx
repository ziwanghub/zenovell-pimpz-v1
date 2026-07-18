'use client';

import Link from 'next/link';

import { getAllProducts } from '@/lib/platform/entity-loader';
import { getAllInformationPages } from '@/lib/platform/entity-loader';

interface KnowledgeRelatedProps {
  relatedProducts?: string[];
  relatedInformation?: string[];
  relatedKnowledge?: string[];
}

function RelatedKnowledgeLinks({ slugs }: { slugs?: string[] }) {
  if (!slugs || slugs.length === 0) return null;
  return (
    <div>
      <div className="text-sm text-white/60 mb-3">More Knowledge</div>
      <div className="space-y-2">
        {slugs.map(slug => (
          <Link key={slug} href={`/knowledge/${slug}`} className="block rounded-xl border border-white/10 bg-white/5 p-4 text-sm hover:bg-white/10 capitalize">
            {slug.replace(/-/g, ' ')}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function KnowledgeRelated({ relatedProducts, relatedInformation, relatedKnowledge }: KnowledgeRelatedProps) {
  const products = getAllProducts().filter(p => relatedProducts?.includes(p.slug));
  const infos = getAllInformationPages().filter(i => relatedInformation?.includes(i.slug));

  if ((!products || products.length === 0) && (!infos || infos.length === 0)) {
    return null;
  }

  return (
    <div className="bg-zinc-950 px-6 py-10 text-white min-[690px]:px-0">
      <div className="platform-shell-frame">
        <h2 className="mb-6 text-xl font-semibold tracking-tight">Related Resources</h2>

        {products.length > 0 && (
          <div className="mb-8">
            <div className="text-sm text-white/60 mb-3">Products</div>
            <div className="space-y-2">
              {products.map(p => (
                <Link key={p.slug} href={`/products/${p.slug}`} className="block rounded-xl border border-white/10 bg-white/5 p-4 text-sm hover:bg-white/10">
                  {p.title} — {p.pricing.sale.display}
                </Link>
              ))}
            </div>
          </div>
        )}

        {infos.length > 0 && (
          <div>
            <div className="text-sm text-white/60 mb-3">Information</div>
            <div className="space-y-2">
              {infos.map(i => (
                <Link key={i.slug} href={`/information/${i.slug}`} className="block rounded-xl border border-white/10 bg-white/5 p-4 text-sm hover:bg-white/10">
                  {i.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        <RelatedKnowledgeLinks slugs={relatedKnowledge} />
      </div>
    </div>
  );
}
