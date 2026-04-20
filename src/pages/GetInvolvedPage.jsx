import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import GetInvolvedHero from "../components/get-involved/GetInvolvedHero";
import GetInvolvedContent from "../components/get-involved/GetInvolvedContent";
import GetInvolvedFooter from "../components/get-involved/GetInvolvedFooter";
import SubmitInterestFormPage from "../components/get-involved/SubmitInterestFormPage";

export default function GetInvolvedPage() {
  const [view, setView] = useState("landing");

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-slate-900">
      <Navbar />

      {view === "form" ? (
        <SubmitInterestFormPage onBackToLanding={() => setView("landing")} />
      ) : (
        <>
          <GetInvolvedHero onSubmitInterest={() => setView("form")} />
          <GetInvolvedContent onSubmitInterest={() => setView("form")} />
        </>
      )}

      <GetInvolvedFooter />
    </div>
  );
}