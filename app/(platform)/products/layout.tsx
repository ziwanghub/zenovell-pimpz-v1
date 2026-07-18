import type { ReactNode } from 'react';

import { PlatformAdaptiveShell } from '@/components/layout/platform-adaptive-shell';
import { ProductPageHeader } from '@/components/platform/product-page-header';

// Phase 5A: Shared layout skeleton for Product pages.
// This can be expanded later with shared navigation, breadcrumbs, etc.
// Currently inherits root layout. No changes to global styles or MobileShell.

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="platform-products min-h-screen bg-[radial-gradient(circle_at_top,_rgba(190,24,93,0.16),_transparent_30%),linear-gradient(180deg,#09070d_0%,#040307_100%)] text-white">
      <a
        href="#product-page-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[100] focus:rounded focus:bg-[#E91E8C] focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to product content
      </a>
      <PlatformAdaptiveShell>
        <ProductPageHeader />
        <div id="product-page-content">
          {children}
        </div>
      </PlatformAdaptiveShell>
    </main>
  );
}
