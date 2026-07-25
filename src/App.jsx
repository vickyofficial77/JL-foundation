import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DonatePage from "./pages/DonatePage";
import GetInvolvedPage from "./pages/GetInvolvedPage";
import MyJeanlucPage from "./pages/MyJeanlucPage";
import TakeActionPage from "./pages/TakeActionPage";
import ClubFinderPage from "./pages/ClubFinderPage";
import SearchPage from "./pages/SearchPage";

import NewsFeaturesPage from "./pages/NewsFeaturesPage";
import NewsFeatureDetailPage from "./pages/NewsFeatureDetailPage";

import CauseDetailPage from "./pages/CauseDetailPage";

import PageTransitionLoader from "./components/ui/PageTransitionLoader";


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

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);


  return (
    <>
      {loading && <PageTransitionLoader />}

      <Routes location={displayLocation}>

        {/* ============================================
            HOME
        ============================================ */}

        <Route
          path="/"
          element={<HomePage />}
        />


        {/* ============================================
            DONATE
        ============================================ */}

        <Route
          path="/donate"
          element={<DonatePage />}
        />


        {/* ============================================
            GET INVOLVED
        ============================================ */}

        <Route
          path="/get-involved"
          element={<GetInvolvedPage />}
        />


        {/* ============================================
            MY JEANLUC
        ============================================ */}

        <Route
          path="/my-jeanluc"
          element={<MyJeanlucPage />}
        />


        {/* ============================================
            TAKE ACTION
        ============================================ */}

        <Route
          path="/take-action"
          element={<TakeActionPage />}
        />


        {/* ============================================
            CLUB FINDER
        ============================================ */}

        <Route
          path="/club-finder"
          element={<ClubFinderPage />}
        />


        {/* ============================================
            SEARCH
        ============================================ */}

        <Route
          path="/search"
          element={<SearchPage />}
        />


        {/* ============================================
            NEWS LIST
        ============================================ */}

        <Route
          path="/news-features"
          element={<NewsFeaturesPage />}
        />


        {/* ============================================
            NEWS DETAILS - NEW URL
            Example:
            /news-features/w0ma2yidO7ED8pDWEVuQ
        ============================================ */}

        <Route
          path="/news-features/:id"
          element={<NewsFeatureDetailPage />}
        />


        {/* ============================================
            NEWS DETAILS - EXISTING URL
            Example:
            /news/w0ma2yidO7ED8pDWEVuQ

            This supports your current navigation.
        ============================================ */}

        <Route
          path="/news/:id"
          element={<NewsFeatureDetailPage />}
        />


        {/* ============================================
            CAUSE DETAILS
        ============================================ */}

        <Route
          path="/causes/:slug"
          element={<CauseDetailPage />}
        />

      </Routes>
    </>
  );
}


export default function App() {
  return <AppRoutes />;
}