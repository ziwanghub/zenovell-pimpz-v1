import Link from 'next/link';
import { ChevronRight, House } from 'lucide-react';

interface ProductBreadcrumbProps {
  productTitle: string;
}

export function ProductBreadcrumb({ productTitle }: ProductBreadcrumbProps) {
  return (
    <nav
      aria-label="เส้นทางหน้าสินค้า"
      className="px-4 pb-1.5 pt-3 text-white/72 min-[690px]:px-0"
    >
      <div className="platform-shell-frame flex flex-wrap items-center gap-1 text-[11px] leading-5 sm:text-[12px]">
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-full px-1 py-0.5 text-white/58 transition hover:text-white"
        >
          <House className="h-3 w-3" />
          <span>Home</span>
        </Link>

        <ChevronRight className="h-3 w-3 text-white/22" aria-hidden="true" />

        <Link
          href="/#section-4-product-catalog"
          className="rounded-full px-1 py-0.5 text-white/58 transition hover:text-white"
        >
          Products
        </Link>

        <ChevronRight className="h-3 w-3 text-white/22" aria-hidden="true" />

        <span
          aria-current="page"
          className="min-w-0 flex-1 truncate px-1 py-0.5 font-medium text-white"
          title={productTitle}
        >
          {productTitle}
        </span>
      </div>
    </nav>
  );
}
