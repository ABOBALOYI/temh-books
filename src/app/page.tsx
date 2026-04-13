"use client";

import BookSelectionProvider from "@/components/BookSelectionProvider";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhySection from "@/components/WhySection";
import BookGrid from "@/components/BookGrid";
import InterestForm from "@/components/InterestForm";
import Footer from "@/components/Footer";
import StickySelectionBar from "@/components/StickySelectionBar";
import AnimatedSection from "@/components/AnimatedSection";

export default function Home() {
  return (
    <BookSelectionProvider>
      <Header />
      <HeroSection />
      <AnimatedSection>
        <WhySection />
      </AnimatedSection>
      <AnimatedSection>
        <BookGrid />
      </AnimatedSection>
      <AnimatedSection>
        <InterestForm />
      </AnimatedSection>
      <Footer />
      <StickySelectionBar />
    </BookSelectionProvider>
  );
}
