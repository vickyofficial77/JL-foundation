import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import TakeActionHero from "../components/take-action/TakeActionHero";
import TakeActionIntro from "../components/take-action/TakeActionIntro";
import TakeActionCards from "../components/take-action/TakeActionCards";
import TakeActionCtas from "../components/take-action/TakeActionCtas";
import TakeActionFeedback from "../components/take-action/TakeActionFeedback";

export default function TakeActionPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-slate-900">
      <Navbar />

      <TakeActionHero />
      <TakeActionIntro />
      <TakeActionCards />
      <TakeActionCtas />
      <TakeActionFeedback />

      <Footer />
    </div>
  );
}