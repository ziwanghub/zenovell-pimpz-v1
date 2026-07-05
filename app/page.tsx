import { MobileShell } from "@/components/layout/mobile-shell";
import { heroContent } from "@/content/hero";
import { section2TrustBarContent } from "@/content/section-2-trust-bar";
import { section3HeroProductContent } from "@/content/section-3-hero-product";
import { section4ProductCatalogContent } from "@/content/section-4-product-catalog";
import { section5WhyChooseUsContent } from "@/content/section-5-why-choose-us";
import { section6HowToOrderContent } from "@/content/section-6-how-to-order";
import { section7PrivacyShippingContent } from "@/content/section-7-privacy-shipping";
import { HeroSection } from "@/sections/hero";
import { Section2TrustBar } from "@/sections/section-2-trust-bar";
import { Section3HeroProduct } from "@/sections/section-3-hero-product";
import { Section4ProductCatalog } from "@/sections/section-4-product-catalog";
import { Section5WhyChooseUs } from "@/sections/section-5-why-choose-us";
import { Section6HowToOrder } from "@/sections/section-6-how-to-order";
import { Section7PrivacyShipping } from "@/sections/section-7-privacy-shipping";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-primary)]">
      <MobileShell>
        <HeroSection content={heroContent} />
        <Section2TrustBar content={section2TrustBarContent} />
        <Section3HeroProduct content={section3HeroProductContent} />
        <Section4ProductCatalog content={section4ProductCatalogContent} />
        <Section5WhyChooseUs content={section5WhyChooseUsContent} />
        <Section6HowToOrder content={section6HowToOrderContent} />
        <Section7PrivacyShipping content={section7PrivacyShippingContent} />
      </MobileShell>
    </main>
  );
}
