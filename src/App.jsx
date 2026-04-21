import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DonatePage from "./pages/DonatePage";
import GetInvolvedPage from "./pages/GetInvolvedPage";
import MyJeanlucPage from "./pages/MyJeanlucPage";
import PageTransitionLoader from "./components/ui/PageTransitionLoader";
import TakeActionPage from "./pages/TakeActionPage";
import ClubFinderPage from "./pages/ClubFinderPage";
import SearchPage from "./pages/SearchPage";
import NewsFeaturesPage from "./pages/NewsFeaturesPage";
import CauseDetailPage from "./pages/CauseDetailPage";
import NewsFeatureDetailPage from "./pages/NewsFeatureDetailPage";



function AppRoutes() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setLoading(true);

      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <>
      {loading && <PageTransitionLoader />}

      <Routes location={displayLocation}>
        <Route path="/" element={<HomePage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/get-involved" element={<GetInvolvedPage />} />
        <Route path="/my-jeanluc" element={<MyJeanlucPage />} />
        <Route path="/take-action" element={<TakeActionPage />} />
        <Route path="/club-finder" element={<ClubFinderPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/news-features" element={<NewsFeaturesPage />} />
        <Route path="/news-features/:slug" element={<NewsFeatureDetailPage />} />
        <Route path="/causes/:slug" element={<CauseDetailPage />} />
        


      </Routes>
    </>
  );
}

export default function App() {
  return <AppRoutes />;
}