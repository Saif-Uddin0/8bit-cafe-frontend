import HeroSection from "@/components/home/HeroSection";
import PromotionSlider from "@/components/home/PromotionSlider";
import ChooseUs from "@/components/home/ChooseUs";
import Review from "@/components/home/Review";
import AboutSection from "@/components/home/AboutSection";
import GameServicesSection from "@/components/home/GameServicesSection";
import FoodCategories from "@/components/food/FoodCategories";
import DeliciousFastFood from "@/components/food/DeliciousFastFood";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PromotionSlider />
      <AboutSection></AboutSection>
      <GameServicesSection />
      <FoodCategories isHomePage={true} />
      <DeliciousFastFood />
      <ChooseUs />
      <Review />
    </>
  );
}

