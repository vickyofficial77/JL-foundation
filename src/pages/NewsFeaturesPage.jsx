import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/config";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import {
  Search,
  Calendar,
  User,
  ArrowRight,
  BookOpen,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const filterOptions = [
  "All",
  "News",
  "Feature",
  "Health",
  "Community",
  "Update",
];

export default function NewsFeaturesPage() {
  const navigate = useNavigate();

  // ============================================
  // STATE
  // ============================================

  const [allStories, setAllStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // ============================================
  // FETCH NEWS FROM FIRESTORE
  // ============================================

  useEffect(() => {
    let isMounted = true;

    async function fetchStories() {
      try {
        setLoading(true);
        setError("");

        const storiesQuery = query(
          collection(db, "news_stories"),
          orderBy("timestamp", "desc")
        );

        const snapshot = await getDocs(storiesQuery);

        const stories = snapshot.docs.map((storyDoc) => ({
          id: storyDoc.id,
          ...storyDoc.data(),
        }));

        if (isMounted) {
          setAllStories(stories);
        }
      } catch (err) {
        console.error("Error loading news:", err);

        if (isMounted) {
          setError(
            err.message ||
              "Unable to load news articles. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchStories();

    return () => {
      isMounted = false;
    };
  }, []);

  // ============================================
  // FORMAT DATE
  // ============================================

  const formatDate = (story) => {
    if (story.timestamp?.toDate) {
      return story.timestamp.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    if (story.date) {
      return story.date;
    }

    return "No date";
  };

  // ============================================
  // FILTER NEWS
  // ============================================

  const filteredStories = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();

    return allStories.filter((story) => {
      const category =
        story.category ||
        story.label ||
        "News";

      const matchesCategory =
        activeFilter === "All" ||
        category === activeFilter;

      const matchesSearch =
        !search ||
        story.title
          ?.toLowerCase()
          .includes(search) ||
        story.author
          ?.toLowerCase()
          .includes(search) ||
        story.shortArticle
          ?.toLowerCase()
          .includes(search) ||
        story.detailArticle
          ?.toLowerCase()
          .includes(search);

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [
    allStories,
    searchQuery,
    activeFilter,
  ]);

  // ============================================
  // OPEN ARTICLE
  // ============================================

  const openArticle = (storyId) => {
    if (!storyId) return;

    navigate(`/news/${storyId}`);
  };

  // ============================================
  // LOADING
  // ============================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <Navbar />

        <main className="pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-4 w-32 bg-slate-200 rounded mb-5" />

              <div className="h-12 w-80 bg-slate-200 rounded mb-4" />

              <div className="h-5 w-full max-w-2xl bg-slate-200 rounded mb-12" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-[24px] overflow-hidden"
                  >
                    <div className="h-72 bg-slate-200" />

                    <div className="p-8 space-y-5">
                      <div className="h-8 bg-slate-200 rounded w-24" />

                      <div className="h-7 bg-slate-200 rounded w-4/5" />

                      <div className="h-4 bg-slate-200 rounded w-full" />

                      <div className="h-4 bg-slate-200 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // ============================================
  // ERROR
  // ============================================

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />

        <main className="flex-1 flex items-center justify-center px-4 pt-24">
          <div className="max-w-lg text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 flex items-center justify-center mb-5">
              <AlertCircle className="w-8 h-8 text-rose-500" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Unable to Load News
            </h1>

            <p className="mt-3 text-slate-500 leading-relaxed">
              {error}
            </p>

            <button
              onClick={() =>
                window.location.reload()
              }
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0d58ad] text-white font-semibold hover:bg-[#0b4c96] transition"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-24">

        {/* ============================================
            HEADER
        ============================================ */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0d58ad]">
              News & Features
            </p>

            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#243f57]">
              Stories that matter.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-8">
              Discover stories, updates, impact reports,
              and important news from our work and community.
            </p>
          </div>

          {/* ============================================
              SEARCH + FILTER
          ============================================ */}

          <div className="mt-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

              {/* SEARCH */}

              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  placeholder="Search news..."
                  className="w-full h-12 pl-12 pr-4 rounded-full border border-slate-200 bg-white text-sm text-slate-800 outline-none transition focus:border-[#0d58ad] focus:ring-4 focus:ring-[#0d58ad]/10 shadow-sm"
                />
              </div>

              {/* FILTERS */}

              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setActiveFilter(option)
                    }
                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
                      activeFilter === option
                        ? "bg-[#0d58ad] text-white shadow-md shadow-[#0d58ad]/20"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-[#0d58ad] hover:text-[#0d58ad]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            NEWS GRID
        ============================================ */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">

          {filteredStories.length === 0 ? (
            <div className="py-24 text-center bg-white rounded-[24px]">
              <BookOpen className="w-12 h-12 mx-auto text-slate-300" />

              <h2 className="mt-5 text-xl font-bold text-[#243f57]">
                No news articles found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {filteredStories.map((story) => (

                <article
                  key={story.id}
                  onClick={() =>
                    openArticle(story.id)
                  }
                  className="group cursor-pointer bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.14)] transition-all duration-300"
                >

                  {/* ============================================
                      IMAGE
                  ============================================ */}

                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">

                    {story.image ? (
                      <img
                        src={story.image}
                        alt={
                          story.title ||
                          "News article"
                        }
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        No image available
                      </div>
                    )}

                    {/* IMAGE OVERLAY */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* ============================================
                      CONTENT
                  ============================================ */}

                  <div className="p-8">

                    {/* CATEGORY */}

                    <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#edf5fb] text-[#315b7d] text-sm font-medium">
                      {story.category ||
                        story.label ||
                        "News"}
                    </span>

                    {/* TITLE */}

                    <h2 className="mt-7 text-2xl sm:text-3xl font-bold leading-[1.25] tracking-tight text-[#2c4356] group-hover:text-[#0d58ad] transition-colors duration-200">
                      {story.title}
                    </h2>

                    {/* SHORT ARTICLE */}

                    <p className="mt-5 text-base sm:text-lg text-slate-600 leading-8 line-clamp-3">
                      {story.shortArticle ||
                        story.description ||
                        "Read the full story for more information."}
                    </p>

                    {/* META */}

                    <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-500">

                      <span className="inline-flex items-center gap-2">
                        <User className="w-4 h-4" />

                        {story.author ||
                          "Admin"}
                      </span>

                      <span className="inline-flex items-center gap-2">
                        <Calendar className="w-4 h-4" />

                        {formatDate(story)}
                      </span>

                    </div>

                    {/* READ MORE */}

                    <div className="mt-7 pt-5 border-t border-slate-100">

                      <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0d58ad] group-hover:gap-3 transition-all">
                        Read full story

                        <ArrowRight className="w-4 h-4" />
                      </span>

                    </div>

                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}