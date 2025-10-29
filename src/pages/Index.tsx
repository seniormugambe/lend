import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { FeaturedEquipment } from "@/components/FeaturedEquipment";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustSection } from "@/components/TrustSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Categories />
        <FeaturedEquipment />
        <HowItWorks />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
