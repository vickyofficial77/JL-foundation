import TakeActionHeader from "../components/take-action/TakeActionHeader";
import TakeActionHero from "../components/take-action/TakeActionHero";
import TakeActionIntro from "../components/take-action/TakeActionIntro";
import TakeActionCards from "../components/take-action/TakeActionCards";
import TakeActionCtas from "../components/take-action/TakeActionCtas";
import TakeActionFeedback from "../components/take-action/TakeActionFeedback";
import TakeActionFooter from "../components/take-action/TakeActionFooter";

export default function TakeActionPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-slate-900">
      <TakeActionHeader />
      <TakeActionHero />
      <TakeActionIntro />
      <TakeActionCards />
      <TakeActionCtas />
      <TakeActionFeedback />
      <TakeActionFooter />
    </div>
  );
}