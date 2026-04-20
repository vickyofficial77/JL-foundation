import { useState } from "react";
import DonateHeader from "../components/donate/DonateHeader";
import ClubFinderSearchSection from "../components/club-finder/ClubFinderSearchSection";
import ClubFinderFooter from "../components/club-finder/ClubFinderFooter";
import SignInFormPage from "../components/donate/SignInFormPage";
import RegisterFormPage from "../components/donate/RegisterFormPage";

export default function ClubFinderPage() {
  const [pageView, setPageView] = useState("club");

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-slate-900">
      
      {/* HEADER */}
      <DonateHeader
        onOpenSignIn={() => setPageView("signin")}
        onOpenRegister={() => setPageView("register")}
      />

      {/* CONTENT SWITCH */}
      {pageView === "signin" ? (
        <SignInFormPage />
      ) : pageView === "register" ? (
        <RegisterFormPage onGoToSignIn={() => setPageView("signin")} />
      ) : (
        <ClubFinderSearchSection />
      )}

      {/* FOOTER */}
      <ClubFinderFooter />
    </div>
  );
}