'use client';

import { useCallback, useMemo, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  src: string;
  alt: string;
  label: string;
  caption: string;
  objectPosition?: string;
  scale?: number;
}

interface ProductGalleryProps {
  items: GalleryItem[];
  /** When set (e.g. BEST SELLER), shown on stage — desktop ATF reuses product badge authority */
  badgeLabel?: string;
}

/**
 * Product gallery.
 * Mobile layout frozen (aspect, cover crop, thumbs).
 * Desktop ≥1280: square stage, contain-first crop protection (P-PRODUCT-BP-01 v1.1).
 */
export function ProductGallery({ items, badgeLabel }: ProductGalleryProps) {
  const galleryItems = useMemo(() => items.filter((item) => item.src), [items]);
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length);
  }, [galleryItems.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % galleryItems.length);
  }, [galleryItems.length]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (galleryItems.length < 2) return;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      } else if (event.key === 'Home') {
        event.preventDefault();
        setActiveIndex(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        setActiveIndex(galleryItems.length - 1);
      }
    },
    [galleryItems.length, goNext, goPrev],
  );

  if (galleryItems.length === 0) {
    return null;
  }

  const active = galleryItems[activeIndex] ?? galleryItems[0];
  const stageBadge = badgeLabel || 'BEST SELLER';

  return (
    <section className="px-4 pt-0 text-white min-[690px]:px-0">
      <div className="platform-shell-frame">
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="แกลเลอรีสินค้า"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="relative overflow-hidden rounded-[26px] border border-white/9 bg-[#111111] shadow-[0_16px_42px_rgba(0,0,0,0.32)] outline-none focus-visible:ring-2 focus-visible:ring-[#E91E8C]/60 min-[1280px]:rounded-[20px]"
        >
          <div
            className={[
              'relative overflow-hidden rounded-[28px] bg-black',
              // Mobile frozen aspect
              'aspect-[1.56/1]',
              // Desktop ATF: square product stage
              'min-[1280px]:aspect-square min-[1280px]:min-h-[360px] min-[1280px]:max-h-[520px] min-[1280px]:rounded-[18px]',
            ].join(' ')}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              priority
              sizes="(max-width: 1279px) 100vw, (max-width: 1535px) 48vw, 640px"
              className={[
                // Mobile frozen cover crop
                'object-cover transition duration-300',
                // Desktop: contain-first crop protection — no stretch, letterbox OK
                'min-[1280px]:object-contain min-[1280px]:object-center min-[1280px]:scale-100',
              ].join(' ')}
              style={{
                objectPosition: active.objectPosition ?? 'center 44%',
                // Mobile-only zoom for packshot framing (disabled on desktop via scale-100 above)
                transform: `scale(${(active.scale ?? 1) * 1.04})`,
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.05)_35%,rgba(0,0,0,0.38)_100%)] min-[1280px]:bg-[linear-gradient(180deg,rgba(0,0,0,0.08),transparent_40%,rgba(0,0,0,0.22)_100%)]" />

            <div className="absolute left-3.5 top-3.5 z-10 min-[1280px]:left-4 min-[1280px]:top-4">
              <div className="inline-flex rounded-[8px] bg-[#E91E8C] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_8px_18px_rgba(233,30,140,0.3)]">
                {stageBadge}
              </div>
            </div>

            {galleryItems.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label="ดูภาพก่อนหน้า"
                  onClick={goPrev}
                  className="absolute left-3.5 top-[55%] z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_20px_rgba(0,0,0,0.28)] min-[1280px]:left-4 min-[1280px]:h-10 min-[1280px]:w-10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  aria-label="ดูภาพถัดไป"
                  onClick={goNext}
                  className="absolute right-3.5 top-[55%] z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_20px_rgba(0,0,0,0.28)] min-[1280px]:right-4 min-[1280px]:h-10 min-[1280px]:w-10"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            ) : null}
          </div>

          <div className="grid grid-cols-4 gap-2 px-3 pb-3 pt-2.5 min-[1280px]:gap-3 min-[1280px]:px-3.5 min-[1280px]:pb-3.5">
            {galleryItems.map((item, index) => {
              const selected = index === activeIndex;

              return (
                <button
                  key={`${item.src}-${item.label}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={selected}
                  aria-label={`แสดงภาพ ${item.label}`}
                  className={`group overflow-hidden rounded-[11px] border transition min-[1280px]:rounded-[12px] ${
                    selected
                      ? 'border-[#E91E8C] shadow-[0_0_0_2px_rgba(233,30,140,0.38)]'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                  }`}
                >
                  <div className="relative aspect-square overflow-hidden bg-black">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="100px"
                      className={[
                        'object-cover transition duration-300 group-hover:scale-105',
                        'min-[1280px]:object-contain min-[1280px]:group-hover:scale-100',
                      ].join(' ')}
                      style={{
                        objectPosition: item.objectPosition ?? 'center 44%',
                        transform: `scale(${(item.scale ?? 1) * 1.06})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent min-[1280px]:from-black/30" />
                  </div>
                </button>
              );
            })}
          </div>

          <p className="sr-only" aria-live="polite">
            {active.label}: {active.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
