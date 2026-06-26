import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModelsSection from "@/components/ModelsSection";
import CameraSection from "@/components/CameraSection";
import GallerySection from "@/components/GallerySection";
import DisplaySection from "@/components/DisplaySection";
import BatterySection from "@/components/BatterySection";
import SpecsSection from "@/components/SpecsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <HeroSection />
      <ModelsSection />
      <CameraSection />
      <GallerySection />
      <DisplaySection />
      <BatterySection />
      <SpecsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
