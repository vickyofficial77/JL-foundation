import ClubFinderHeader from "../components/club-finder/ClubFinderHeader";
import ClubFinderSearchSection from "../components/club-finder/ClubFinderSearchSection";
import ClubFinderFooter from "../components/club-finder/ClubFinderFooter";

export default function ClubFinderPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-slate-900">
      <ClubFinderHeader />
      <ClubFinderSearchSection />
      <ClubFinderFooter />
    </div>
  );
}