import { useState } from "react";
import DonateHeader from "../components/donate/DonateHeader";
import MyJeanlucHero from "../components/my-jeanluc/MyJeanlucHero";
import MyJeanlucSplitSection from "../components/my-jeanluc/MyJeanlucSplitSection";
import MyJeanlucCardsSection from "../components/my-jeanluc/MyJeanlucCardsSection";
import MyJeanlucFoundationSection from "../components/my-jeanluc/MyJeanlucFoundationSection";
import MyJeanlucFooter from "../components/my-jeanluc/MyJeanlucFooter";
import SignInFormPage from "../components/donate/SignInFormPage";
import RegisterFormPage from "../components/donate/RegisterFormPage";

export default function MyJeanlucPage() {
  const [pageView, setPageView] = useState("main");

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-slate-900">
      
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
        <>
          <MyJeanlucHero />
          <MyJeanlucSplitSection />
          <MyJeanlucCardsSection />
          <MyJeanlucFoundationSection />
        </>
      )}

      {/* FOOTER */}
      <MyJeanlucFooter />
    </div>
  );
}