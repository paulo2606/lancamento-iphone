import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModelsSection from "@/components/ModelsSection";
import CameraSection from "@/components/CameraSection";
import GallerySection from "@/components/GallerySection";
import DisplaySection from "@/components/DisplaySection";
import BatterySection from "@/components/BatterySection";

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
    </main>
  );
}
