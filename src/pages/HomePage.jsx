import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import NewsFeaturesSection from "../components/sections/NewsFeaturesSection";
import ImpactNumbersSection from "../components/sections/ImpactNumbersSection";
import CausesSection from "../components/sections/CausesSection";
import CtaSplitSection from "../components/sections/CtaSplitSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Navbar />

      <section id="about">
        <HeroSection />
      </section>

      <section id="news">
        <NewsFeaturesSection />
      </section>

       <section id="programs">
        <ImpactNumbersSection />
      </section>

      <section id="causes">
        <CausesSection />
      </section>

      <section id="get-involved">
        <CtaSplitSection />
      </section>
      
      <section id="members">
        <Footer />
      </section>
    </div>
  );
}