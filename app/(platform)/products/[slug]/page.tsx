import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllProducts, loadProductBySlug } from '@/lib/platform/entity-loader';
import {
  generateProductMetadata,
  generateProductStructuredData,
} from '@/lib/platform/seo';
import { ProductHero } from '@/components/platform/product-hero';
import { ProductTrustSignals } from '@/components/platform/product-trust-signals';
import { ProductReviews } from '@/components/platform/product-reviews';
import { ProductFAQ } from '@/components/platform/product-faq';
import { ProductRelatedProducts } from '@/components/platform/product-related-products';
import { ProductProblemSnapshot } from '@/components/platform/product-problem-snapshot';
import { ProductGallery } from '@/components/platform/product-gallery';
import { ProductFinalCta } from '@/components/platform/product-final-cta';
import { ProductBreadcrumb } from '@/components/platform/product-breadcrumb';
import { ProductKnowledgeTabs } from '@/components/platform/product-knowledge-tabs';
import { ProductExpectationAuthority } from '@/components/platform/product-expectation-authority';
import { ProductBundle } from '@/components/platform/product-bundle';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const all = getAllProducts();
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = loadProductBySlug(slug);

  if (!result.found || !result.entity) {
    return {
      title: 'Product Not Found | ZENOVELL',
    };
  }

  const product = result.entity;

  // WP-10: Enhanced SEO / AI SEO / OpenGraph using reusable helper
  return generateProductMetadata(product);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const result = loadProductBySlug(slug);

  if (!result.found || !result.entity) {
    notFound();
  }

  const product = result.entity;

  // S1-S3 Integration: Use rich entity data from Product Authority (pilot wired)
  // S1: Benefits + Hero
  const benefits = product.benefits && product.benefits.length > 0
    ? product.benefits
    : product.features?.map((f) => ({ title: f.title, description: f.sub }));

  // S2: Trust Signals (progressive trust after hero)
  const trustSignals = [
    ...(product.badge ? [{ title: product.badge.label, subtitle: 'BEST SELLER' }] : []),
    ...(product.certification || []).map((c) => ({ title: c.name, subtitle: c.detail })),
    ...(product.features || []).map((f) => ({ title: f.title, subtitle: f.sub })),
  ];
  const evidenceSnapshot = (product.evidence || []).map((item) => ({
    title: item.claim,
    subtitle: item.support,
  }));

  const problemTitle = benefits?.[0]?.title
    ? `${benefits[0].title} สำหรับคนที่อยากกลับมามั่นใจอีกครั้ง`
    : product.subtitle;
  const problemDetail = product.mechanism || product.qualification || product.subtitle;
  const fitCue = product.qualificationDetails?.suitableFor?.[0];

  const galleryItems = [
    {
      src: product.imageSrc,
      alt: product.imageAlt || product.title,
      label: 'Packshot',
      caption: 'มุมหลักที่เน้นการรับรู้ตัวสินค้าอย่างรวดเร็ว',
      objectPosition: 'center',
      scale: 1,
    },
    {
      src: product.imageSrc,
      alt: product.imageAlt || product.title,
      label: 'Detail',
      caption: 'ซูมเข้าให้เห็น packaging และ presence ของตัวขวดชัดขึ้น',
      objectPosition: 'center 25%',
      scale: 1.08,
    },
    {
      src: product.imageSrc,
      alt: product.imageAlt || product.title,
      label: 'Formula',
      caption: 'มองในมุมที่เชื่อมกับ reason-to-believe ของสินค้า',
      objectPosition: 'center 60%',
      scale: 1.14,
    },
    {
      src: product.imageSrc,
      alt: product.imageAlt || product.title,
      label: 'Lifestyle',
      caption: 'ใช้เป็นภาพอ้างอิงความรู้สึกและบริบทของการตัดสินใจ',
      objectPosition: 'center 40%',
      scale: 1.02,
    },
  ];

  // P6E-03A: Product Knowledge Authority data prepared on the server for SSR + SEO/AI SEO readiness
  const knowledgeBenefits = (benefits || []).map((item) => ({
    title: item.title,
    description: item.description,
  }));

  const knowledgeIngredients = (product.ingredients || []).map((item) => ({
    title: item.name,
    meta: item.amount || undefined,
    description: item.benefit,
  }));

  const knowledgeUsage = (product.usageSteps || []).map((item) => ({
    title: item.step,
    description: item.instruction,
  }));

  if (knowledgeUsage.length === 0 && product.usage) {
    knowledgeUsage.push({
      title: 'วิธีรับประทาน',
      description: product.usage,
    });
  }

  const knowledgeImportantInformation = [
    ...(product.qualificationDetails?.suitableFor || []).map((item) => ({
      title: 'เหมาะสำหรับ',
      description: item,
    })),
    ...(product.qualificationDetails?.avoidIf || []).map((item) => ({
      title: 'ควรหลีกเลี่ยง',
      description: item,
    })),
    ...(product.qualificationDetails?.safetyNotes
      ? [{
          title: 'คำแนะนำด้านความปลอดภัย',
          description: product.qualificationDetails.safetyNotes,
        }]
      : []),
    ...(product.certification || []).map((item) => ({
      title: item.name,
      description: item.detail,
    })),
    ...(product.expectedResults?.[0]
      ? [{
          title: 'หมายเหตุเรื่องผลลัพธ์',
          description: product.expectedResults[0].note || 'ผลลัพธ์แตกต่างกันตามแต่ละบุคคล',
        }]
      : []),
    ...(product.cta?.label
      ? [{
          title: 'การปรึกษาก่อนสั่งซื้อ',
          description: 'หากต้องการข้อมูลเพิ่มเติม สามารถสอบถามรายละเอียดก่อนตัดสินใจผ่าน LINE ได้',
        }]
      : []),
  ];

  // S3: Timeline + Expected Results (Blueprint 12)
  const timelineData = product.timeline;
  const expectedData = product.expectedResults;
  const expectationDisclaimer = [
    product.expectedResults?.find((item) => item.note)?.note,
    timelineData?.find((item) => item.description.includes('สม่ำเสมอ'))?.description,
    product.qualificationDetails?.safetyNotes
      ? `หากมีโรคประจำตัวหรือใช้ยาอื่นอยู่ ${product.qualificationDetails.safetyNotes}`
      : null,
  ]
    .filter(Boolean)
    .join(' ');
  const expectationConsultationAdvice = product.cta?.label
    ? 'หากต้องการข้อมูลเพิ่มเติม สามารถสอบถามรายละเอียดก่อนตัดสินใจผ่าน LINE ได้'
    : undefined;

  // S4: Social Proof & Support (Blueprint 13/14/15 + Promotion)
  const reviews = product.reviews;
  const faq = product.faq;
  // Related Products: derive from Product Authority, exclude current (enhanced for S4)
  const allProducts = getAllProducts();
  const relatedProducts = allProducts
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      pricing: p.pricing,
      imageSrc: p.imageSrc,
    }));

  // WP-10 + S5: Generate Structured Data (Product + Breadcrumb + Commerce Context)
  const structuredData = generateProductStructuredData(product);
  // S5 channel assets (SEO/AI-SEO/LINE/Ads/Marketplace) referenced via product.commerceContext and entity for cross-channel consistency.

  // Bundle pair: explicit product.bundle.pairedProductSlug authority only (P-PRODUCT-DESKTOP-02A).
  // Never derived from related-products array order.
  const bundlePairEntity = product.bundle?.pairedProductSlug
    ? allProducts.find(
        (p) => p.slug === product.bundle?.pairedProductSlug && p.slug !== product.slug && p.active,
      )
    : undefined;
  const bundlePair = bundlePairEntity
    ? {
        slug: bundlePairEntity.slug,
        title: bundlePairEntity.title,
        pricing: bundlePairEntity.pricing,
        imageSrc: bundlePairEntity.imageSrc,
      }
    : null;

  // Shared information modules (same data; factory so dual trees are independent).
  const renderProductInformation = () => (
    <>
      <ProductProblemSnapshot
        title={problemTitle}
        outcome={product.subtitle}
        detail={problemDetail}
        fitCue={fitCue}
      />
      <div className="platform-shell-frame px-4 pb-2 min-[690px]:px-0 min-[1280px]:px-0">
        <ProductKnowledgeTabs
          benefits={{ items: knowledgeBenefits }}
          ingredients={{ items: knowledgeIngredients }}
          usage={{ items: knowledgeUsage }}
          importantInformation={{ items: knowledgeImportantInformation }}
        />
        <ProductExpectationAuthority
          timeline={timelineData}
          expectedResults={expectedData}
          disclaimer={expectationDisclaimer || undefined}
          safetyNotes={product.qualificationDetails?.safetyNotes}
          consultationAdvice={expectationConsultationAdvice}
        />
      </div>
    </>
  );

  // S1–S5 + P-PRODUCT-DESKTOP-01 ATF + P-PRODUCT-DESKTOP-02 BTF (desktop ≥1280 only).
  return (
    <>
      <ProductBreadcrumb productTitle={product.title} />

      {/*
        ATF composition (P-PRODUCT-TABLET-01 + frozen Desktop ATF):
        - <900: stack (mobile frozen + tablet stack 768–899)
        - 900–1279: compact 2-col 46/54, NOT sticky
        - ≥1280: 48/52 + sticky buy (Desktop frozen)
      */}
      <div
        className={[
          'min-[900px]:max-[1280px]:grid min-[900px]:max-[1280px]:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)]',
          'min-[900px]:max-[1280px]:items-start min-[900px]:max-[1280px]:gap-x-5 min-[900px]:max-[1280px]:pb-6',
          'min-[1024px]:max-[1280px]:gap-x-6',
          'min-[1280px]:grid min-[1280px]:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)]',
          'min-[1280px]:items-start min-[1280px]:gap-x-8 min-[1440px]:gap-x-10',
          'min-[1280px]:pb-8',
        ].join(' ')}
      >
        <div className="min-[900px]:min-w-0">
          <ProductGallery
            items={galleryItems}
            badgeLabel={product.badge?.label}
          />
        </div>
        <div
          className={[
            'min-[900px]:min-w-0',
            // Sticky buy: Desktop only — tablet never sticky
            'min-[1280px]:sticky min-[1280px]:top-[calc(var(--platform-header-offset,74px)+12px)]',
            'min-[1280px]:z-10',
            'min-[1280px]:max-h-[calc(100vh-var(--platform-header-offset,74px)-28px)]',
            'min-[1280px]:overflow-y-auto min-[1280px]:overscroll-contain',
          ].join(' ')}
        >
          <ProductHero product={product} />
        </div>
      </div>

      {/*
        BTF dual trees (unique useId per instance):
        - Mobile <768: frozen mobile-era order + Final CTA
        - Tablet+Desktop ≥768: Info → Reviews → Related → Bundle → FAQ
          (Bundle authority unchanged; Final CTA mobile-only)
      */}
      <div className="min-[768px]:hidden" data-btf-tree="mobile">
        <ProductTrustSignals trustSignals={trustSignals} evidence={evidenceSnapshot} />
        {renderProductInformation()}
        <ProductReviews reviews={reviews} />
        <ProductFAQ faq={faq} defaultOpenIndex={0} />
        <ProductRelatedProducts relatedProducts={relatedProducts} />
        <ProductFinalCta product={product} />
      </div>

      <div className="hidden min-[768px]:block" data-btf-tree="tablet-desktop">
        <div className="space-y-1 pb-6" data-desktop-btf="product-information">
          {renderProductInformation()}
        </div>
        <div data-desktop-btf="reviews">
          <ProductReviews reviews={reviews} />
        </div>
        <div data-desktop-btf="related">
          <ProductRelatedProducts relatedProducts={relatedProducts} />
        </div>
        <div data-desktop-btf="bundle">
          <ProductBundle product={product} pair={bundlePair} />
        </div>
        <div data-desktop-btf="faq">
          <ProductFAQ faq={faq} defaultOpenIndex={-1} />
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.product),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.breadcrumb),
        }}
      />
    </>
  );
}
