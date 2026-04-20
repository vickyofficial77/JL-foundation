import SearchPageHeader from "../components/search-page/SearchPageHeader";
import SearchPageContent from "../components/search-page/SearchPageContent";
import SearchPageFooter from "../components/search-page/SearchPageFooter";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-slate-900">
      <SearchPageHeader />
      <SearchPageContent />
      <SearchPageFooter />
    </div>
  );
}