import { useState } from "react";
import DonateHeader from "../components/donate/DonateHeader";
import SearchPageContent from "../components/search-page/SearchPageContent";
import ClubFinderFooter from "../components/club-finder/ClubFinderFooter";
import SignInFormPage from "../components/donate/SignInFormPage";
import RegisterFormPage from "../components/donate/RegisterFormPage";

export default function SearchPage() {
  const [pageView, setPageView] = useState("search");

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-slate-900">
      <DonateHeader
        onOpenSignIn={() => setPageView("signin")}
        onOpenRegister={() => setPageView("register")}
      />

      {pageView === "signin" ? (
        <SignInFormPage />
      ) : pageView === "register" ? (
        <RegisterFormPage onGoToSignIn={() => setPageView("signin")} />
      ) : (
        <SearchPageContent />
      )}

      <ClubFinderFooter />
    </div>
  );
}