import type { ReactNode } from 'react';

/**
 * PlatformPage (Phase 5A Skeleton)
 *
 * Reusable wrapper for future platform pages (PLP, Information, Knowledge).
 * Currently minimal. Will be enhanced in 5C+ with consistent header, footer, context handling, etc.
 *
 * Does not affect the frozen homepage.
 */

interface PlatformPageProps {
  children: ReactNode;
  title?: string;
}

export function PlatformPage({ children, title }: PlatformPageProps) {
  return (
    <main className="min-h-screen">
      {title && <h1 className="sr-only">{title}</h1>}
      {children}
    </main>
  );
}
