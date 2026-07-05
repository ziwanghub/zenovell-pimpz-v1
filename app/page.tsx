import { MobileShell } from "@/components/layout/mobile-shell";
import { heroContent } from "@/content/hero";
import { section2TrustBarContent } from "@/content/section-2-trust-bar";
import { section3HeroProductContent } from "@/content/section-3-hero-product";
import { HeroSection } from "@/sections/hero";
import { Section2TrustBar } from "@/sections/section-2-trust-bar";
import { Section3HeroProduct } from "@/sections/section-3-hero-product";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-primary)]">
      <MobileShell>
        <HeroSection content={heroContent} />
        <Section2TrustBar content={section2TrustBarContent} />
        <Section3HeroProduct content={section3HeroProductContent} />
      </MobileShell>
    </main>
  );
}
