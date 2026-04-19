import MyJeanlucHeader from "../components/my-jeanluc/MyJeanlucHeader";
import MyJeanlucHero from "../components/my-jeanluc/MyJeanlucHero";
import MyJeanlucSplitSection from "../components/my-jeanluc/MyJeanlucSplitSection";
import MyJeanlucCardsSection from "../components/my-jeanluc/MyJeanlucCardsSection";
import MyJeanlucFoundationSection from "../components/my-jeanluc/MyJeanlucFoundationSection";
import MyJeanlucFooter from "../components/my-jeanluc/MyJeanlucFooter";

export default function MyJeanlucPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-slate-900">
      <MyJeanlucHeader />
      <MyJeanlucHero />
      <MyJeanlucSplitSection />
      <MyJeanlucCardsSection />
      <MyJeanlucFoundationSection />
      <MyJeanlucFooter />
    </div>
  );
}