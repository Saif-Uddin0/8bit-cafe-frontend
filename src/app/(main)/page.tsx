// Home page — assembles all sections in order.
// This page lives at "/" via the (main) route group.
// Navbar and Footer are provided by (main)/layout.tsx.

import HeroSection from "@/components/home/HeroSection";
import PromotionSlider from "@/components/home/PromotionSlider";
import FeaturedGames from "@/components/home/FeaturedGames";
import TopPlayers from "@/components/home/TopPlayers";
import WhyCafe from "@/components/home/WhyCafe";
import TournamentsSection from "@/components/home/TournamentsSection";
import CommunitySection from "@/components/home/CommunitySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AboutSection from "@/components/home/AboutSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PromotionSlider />
      <AboutSection></AboutSection>
      <FeaturedGames />
      <TopPlayers />
      <WhyCafe />
      <TournamentsSection />
      <CommunitySection />
      <TestimonialsSection />
    </>
  );
}
