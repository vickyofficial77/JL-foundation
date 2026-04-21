import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import GetInvolvedHero from "../components/get-involved/GetInvolvedHero";
import GetInvolvedContent from "../components/get-involved/GetInvolvedContent";
import GetInvolvedFooter from "../components/get-involved/GetInvolvedFooter";
import SubmitInterestFormPage from "../components/get-involved/SubmitInterestFormPage";

export default function GetInvolvedPage() {
  const [view, setView] = useState("landing");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-slate-900">
      <Navbar />

      <main className="w-full overflow-x-hidden">
        {view === "form" ? (
          <div className="w-full">
            <SubmitInterestFormPage onBackToLanding={() => setView("landing")} />
          </div>
        ) : (
          <div className="w-full">
            <GetInvolvedHero onSubmitInterest={() => setView("form")} />
            <GetInvolvedContent onSubmitInterest={() => setView("form")} />
          </div>
        )}
      </main>

      <GetInvolvedFooter />
    </div>
  );
}