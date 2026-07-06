import { GlobalHeader } from "@/components/layout/global-header";
import { MobileShell } from "@/components/layout/mobile-shell";
import { heroContent } from "@/content/hero";
import { siteHeaderContent } from "@/content/site-header";
import {
  ctaDestinations,
  siteNavigationGroups,
} from "@/content/site-navigation";
import { section2TrustBarContent } from "@/content/section-2-trust-bar";
import { section3HeroProductContent } from "@/content/section-3-hero-product";
import { section4ProductCatalogContent } from "@/content/section-4-product-catalog";
import { section5WhyChooseUsContent } from "@/content/section-5-why-choose-us";
import { section6HowToOrderContent } from "@/content/section-6-how-to-order";
import { section7PrivacyShippingContent } from "@/content/section-7-privacy-shipping";
import { section8ReviewsContent } from "@/content/section-8-reviews";
import { section10FinalCtaContent } from "@/content/section-10-final-cta";
import { section11FooterContent } from "@/content/section-11-footer";
import { section9FaqContent } from "@/content/section-9-faq-content";
import { HeroSection } from "@/sections/hero";
import { Section2TrustBar } from "@/sections/section-2-trust-bar";
import { Section3HeroProduct } from "@/sections/section-3-hero-product";
import { Section4ProductCatalog } from "@/sections/section-4-product-catalog";
import { Section5WhyChooseUs } from "@/sections/section-5-why-choose-us";
import { Section6HowToOrder } from "@/sections/section-6-how-to-order";
import { Section7PrivacyShipping } from "@/sections/section-7-privacy-shipping";
import { Section8Reviews } from "@/sections/section-8-reviews";
import { Section10FinalCta } from "@/sections/section-10-final-cta";
import { Section11Footer } from "@/sections/section-11-footer";
import { Section9Faq } from "@/sections/section-9-faq";
import { mapGlobalHeaderProps } from "@/lib/global-header-mapper";

const globalHeaderProps = mapGlobalHeaderProps(
  siteHeaderContent,
  siteNavigationGroups,
  ctaDestinations,
);

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-primary)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-[#E91E8C] focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:rounded focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      <MobileShell>
        <GlobalHeader {...globalHeaderProps} />
        <HeroSection content={heroContent} />
        <Section2TrustBar content={section2TrustBarContent} />
        <Section3HeroProduct content={section3HeroProductContent} />
        <Section4ProductCatalog content={section4ProductCatalogContent} />
        <Section5WhyChooseUs content={section5WhyChooseUsContent} />
        <Section6HowToOrder content={section6HowToOrderContent} />
        <Section7PrivacyShipping content={section7PrivacyShippingContent} />
        <Section8Reviews content={section8ReviewsContent} />
        <Section9Faq content={section9FaqContent} />
        <Section10FinalCta content={section10FinalCtaContent} />
        <Section11Footer content={section11FooterContent} />
      </MobileShell>
    </main>
  );
}
