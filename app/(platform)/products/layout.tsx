import type { ReactNode } from 'react';

// Phase 5A: Shared layout skeleton for Product pages.
// This can be expanded later with shared navigation, breadcrumbs, etc.
// Currently inherits root layout. No changes to global styles or MobileShell.

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="platform-products">
      {/* Future: shared product navigation, context provider, etc. */}
      {children}
    </div>
  );
}
