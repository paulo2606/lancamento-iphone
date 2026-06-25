import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModelsSection from "@/components/ModelsSection";
import CameraSection from "@/components/CameraSection";
import DisplaySection from "@/components/DisplaySection";

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <HeroSection />
      <ModelsSection />
      <CameraSection />
      <DisplaySection />
    </main>
  );
}
