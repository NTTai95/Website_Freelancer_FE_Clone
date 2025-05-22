import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { CategoriesSection } from "@/components/categories-section";
import { FeaturedFreelancers } from "@/components/featured-freelancers";
import { HowItWorks } from "@/components/how-it-works";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTASection } from "@/components/cta-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <HowItWorks />
        <FeaturedFreelancers />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
