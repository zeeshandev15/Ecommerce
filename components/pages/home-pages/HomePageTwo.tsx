import BannerTwo from "@/components/banners/BannerTwo";
import SpecialDeals from "@/components/banners/SpecialDeals";
import HeroBannerTwo from "@/components/hero/HeroBannerTwo";
import BenefitsSection from "@/components/others/BenefitSection";
import TestimonialsSection from "@/components/others/Testimonials";
import ProductsCollectionTwo from "@/components/products/ProductsCollectionTwo";

const HomePageTwo = () => {
  return (
    <div className="overflow-hidden">
      <HeroBannerTwo />
      <SpecialDeals textCenter={true} />
      <ProductsCollectionTwo />
      <BenefitsSection textCenter={true} />
      <BannerTwo />
      <TestimonialsSection textCenter={true} />
    </div>
  );
};

export default HomePageTwo;
