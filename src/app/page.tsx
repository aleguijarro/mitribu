import { LandingHeader } from "@/components/landing/landing-header";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { PropertiesPreview } from "@/components/landing/properties-preview";
import { MarketplacePreview } from "@/components/landing/marketplace-preview";
import { CommunityPreview } from "@/components/landing/community-preview";
import { Benefits } from "@/components/landing/benefits";
import { SecuritySection } from "@/components/landing/security-section";
import { Testimonials } from "@/components/landing/testimonials";
import { FaqSection } from "@/components/landing/faq-section";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/layout/footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <LandingHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <PropertiesPreview />
        <MarketplacePreview />
        <Benefits />
        <CommunityPreview />
        <SecuritySection />
        <Testimonials />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
