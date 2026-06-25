import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModelsSection from "@/components/ModelsSection";

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <HeroSection />
      <ModelsSection />
    </main>
  );
}
