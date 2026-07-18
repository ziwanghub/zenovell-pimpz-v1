'use client';

import { useMemo, useState } from 'react';
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
}

export function ProductGallery({ items }: ProductGalleryProps) {
  const galleryItems = useMemo(() => items.filter((item) => item.src), [items]);
  const [activeIndex, setActiveIndex] = useState(0);

  if (galleryItems.length === 0) {
    return null;
  }

  const active = galleryItems[activeIndex] ?? galleryItems[0];

  return (
    <section className="px-4 pt-0 text-white min-[690px]:px-0">
      <div className="platform-shell-frame">
        <div className="relative overflow-hidden rounded-[26px] border border-white/9 bg-[#111111] shadow-[0_16px_42px_rgba(0,0,0,0.32)]">
          <div className="relative aspect-[1.56/1] overflow-hidden rounded-[28px] bg-black">
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="(max-width: 430px) 100vw, 430px"
              className="object-cover transition duration-300"
              style={{
                objectPosition: active.objectPosition ?? 'center 44%',
                transform: `scale(${(active.scale ?? 1) * 1.04})`,
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.05)_35%,rgba(0,0,0,0.38)_100%)]" />

            <div className="absolute left-3.5 top-3.5 z-10">
              <div className="inline-flex rounded-[8px] bg-[#ff1d8e] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_8px_18px_rgba(255,29,142,0.3)]">
                BEST SELLER
              </div>
            </div>

            <button
              type="button"
              aria-label="ดูภาพก่อนหน้า"
              onClick={() => setActiveIndex((activeIndex - 1 + galleryItems.length) % galleryItems.length)}
              className="absolute left-3.5 top-[55%] z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_20px_rgba(0,0,0,0.28)]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="ดูภาพถัดไป"
              onClick={() => setActiveIndex((activeIndex + 1) % galleryItems.length)}
              className="absolute right-3.5 top-[55%] z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_20px_rgba(0,0,0,0.28)]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 px-3 pb-3 pt-2.5">
            {galleryItems.map((item, index) => {
              const selected = index === activeIndex;

              return (
                <button
                  key={`${item.src}-${item.label}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={selected}
                  aria-label={`แสดงภาพ ${item.label}`}
                  className={`group overflow-hidden rounded-[11px] border transition ${
                    selected
                      ? 'border-[#ff4bac] shadow-[0_0_0_2px_rgba(255,75,172,0.38)]'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                  }`}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="100px"
                      className="object-cover transition duration-300 group-hover:scale-105"
                      style={{
                        objectPosition: item.objectPosition ?? 'center 44%',
                        transform: `scale(${(item.scale ?? 1) * 1.06})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
