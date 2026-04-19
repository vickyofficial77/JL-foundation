import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import NewsFeaturesSection from "../components/sections/NewsFeaturesSection";
import ImpactNumbersSection from "../components/sections/ImpactNumbersSection";
import CausesSection from "../components/sections/CausesSection";
import CtaSplitSection from "../components/sections/CtaSplitSection";
import MobileStickyDonateButton from "../components/ui/MobileStickyDonateButton";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Navbar />
      <HeroSection />
      <NewsFeaturesSection />
      <ImpactNumbersSection />
      <CausesSection />
      <CtaSplitSection />
      <Footer />
      <MobileStickyDonateButton />
    </div>
  );
}