import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import Footer from "../layout/Footer";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Calendar,
  User,
  BookOpen,
  AlertTriangle,
  Loader2,
} from "lucide-react";

const sourceOptions = [
  { name: "News" },
  { name: "Feature" },
  { name: "Health" },
  { name: "Community" },
  { name: "Update" },
];

const sortOptions = [
  "Sort by Relevance",
  "Newest First",
  "Oldest First",
  "Title A-Z",
  "Title Z-A",
];

const RESULTS_PER_PAGE = 5;

export default function SearchPageContent() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Site");
  const [queryInput, setQueryInput] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const [selectedSources, setSelectedSources] = useState([]);
  const [sortBy, setSortBy] = useState("Sort by Relevance");

  const [page, setPage] = useState(1);
  const [siteOpen, setSiteOpen] = useState(true);

  // Firebase / Firestore state
  const [firebaseStories, setFirebaseStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================================================
  // FETCH NEWS FROM FIRESTORE
  // ============================================================
  useEffect(() => {
    async function fetchNewsStories() {
      try {
        setLoading(true);
        setError(null);

        const newsCollection = collection(
          db,
          "news_stories"
        );

        const q = query(
          newsCollection,
          orderBy("timestamp", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFirebaseStories(data);
      } catch (err) {
        console.error(
          "Error fetching news from Firestore:",
          err
        );

        setError(
          "Failed to load news articles from the database."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchNewsStories();
  }, []);

  // ============================================================
  // TOGGLE CATEGORY FILTER
  // ============================================================
  const toggleArrayValue = (value) => {
    setSelectedSources((previous) => {
      if (previous.includes(value)) {
        return previous.filter(
          (item) => item !== value
        );
      }

      return [...previous, value];
    });

    setPage(1);
  };

  // ============================================================
  // SEARCH
  // ============================================================
  const handleSearch = () => {
    setSubmittedQuery(queryInput.trim());
    setPage(1);
  };

  // ============================================================
  // CLEAR SEARCH AND FILTERS
  // ============================================================
  const handleClearSearch = () => {
    setQueryInput("");
    setSubmittedQuery("");
    setSelectedSources([]);
    setPage(1);
  };

  // ============================================================
  // FILTER AND SORT FIREBASE DATA
  // ============================================================
  const filtered = useMemo(() => {
    let data = [...firebaseStories];

    // ----------------------------------------------------------
    // SEARCH THROUGH FIRESTORE DATA
    // ----------------------------------------------------------
    if (submittedQuery) {
      const searchQuery =
        submittedQuery.toLowerCase();

      data = data.filter((item) => {
        const title =
          item.title?.toLowerCase() || "";

        const shortArticle =
          item.shortArticle?.toLowerCase() || "";

        const detailArticle =
          item.detailArticle?.toLowerCase() || "";

        const intro =
          item.intro?.toLowerCase() || "";

        const description =
          item.description?.toLowerCase() || "";

        const author =
          item.author?.toLowerCase() || "";

        const category =
          item.category?.toLowerCase() || "";

        const label =
          item.label?.toLowerCase() || "";

        return (
          title.includes(searchQuery) ||
          shortArticle.includes(searchQuery) ||
          detailArticle.includes(searchQuery) ||
          intro.includes(searchQuery) ||
          description.includes(searchQuery) ||
          author.includes(searchQuery) ||
          category.includes(searchQuery) ||
          label.includes(searchQuery)
        );
      });
    }

    // ----------------------------------------------------------
    // CATEGORY FILTER
    // ----------------------------------------------------------
    if (selectedSources.length > 0) {
      data = data.filter((item) => {
        const category =
          item.category ||
          item.label ||
          "News";

        return selectedSources.includes(
          category
        );
      });
    }

    // ----------------------------------------------------------
    // SORTING
    // ----------------------------------------------------------
    if (sortBy === "Newest First") {
      data.sort((a, b) => {
        const dateA =
          a.timestamp?.seconds ||
          new Date(
            a.date || 0
          ).getTime() / 1000 ||
          0;

        const dateB =
          b.timestamp?.seconds ||
          new Date(
            b.date || 0
          ).getTime() / 1000 ||
          0;

        return dateB - dateA;
      });
    }

    if (sortBy === "Oldest First") {
      data.sort((a, b) => {
        const dateA =
          a.timestamp?.seconds ||
          new Date(
            a.date || 0
          ).getTime() / 1000 ||
          0;

        const dateB =
          b.timestamp?.seconds ||
          new Date(
            b.date || 0
          ).getTime() / 1000 ||
          0;

        return dateA - dateB;
      });
    }

    if (sortBy === "Title A-Z") {
      data.sort((a, b) =>
        (a.title || "").localeCompare(
          b.title || ""
        )
      );
    }

    if (sortBy === "Title Z-A") {
      data.sort((a, b) =>
        (b.title || "").localeCompare(
          a.title || ""
        )
      );
    }

    return data;
  }, [
    firebaseStories,
    submittedQuery,
    selectedSources,
    sortBy,
  ]);

  // ============================================================
  // PAGINATION
  // ============================================================
  const totalPages = Math.max(
    1,
    Math.ceil(
      filtered.length /
        RESULTS_PER_PAGE
    )
  );

  const currentPage = Math.min(
    page,
    totalPages
  );

  const paginated = filtered.slice(
    (currentPage - 1) *
      RESULTS_PER_PAGE,
    currentPage *
      RESULTS_PER_PAGE
  );

  const start =
    filtered.length === 0
      ? 0
      : (currentPage - 1) *
          RESULTS_PER_PAGE +
        1;

  const end = Math.min(
    currentPage *
      RESULTS_PER_PAGE,
    filtered.length
  );

  // ============================================================
  // NAVIGATE TO NEWS DETAILS
  // ============================================================
  const handleResultClick = (item) => {
    navigate(
      `/news/${item.slug || item.id}`
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased flex flex-col">

      {/* ========================================================
          MAIN SEARCH CONTENT
          NAVBAR REMOVED
      ======================================================== */}
      <section className="flex-grow px-4 pb-12 pt-10 sm:px-8 lg:px-14 lg:py-12">
        <div className="mx-auto max-w-[1500px]">

          {/* ====================================================
              PAGE TITLE
          ==================================================== */}
          <h1 className="text-[48px] font-extralight leading-none tracking-tight text-[#31465b] sm:text-[72px]">
            Search News & Articles
          </h1>

          {/* ====================================================
              TABS
          ==================================================== */}
          <div className="mt-8 flex flex-wrap items-center gap-10 border-b border-slate-300">
            {[
              "Site",
              "Members",
              "Clubs",
            ].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  setPage(1);
                }}
                className={`border-b-[4px] pb-5 text-[20px] transition ${
                  activeTab === tab
                    ? "border-[#17479d] font-semibold text-[#17479d]"
                    : "border-transparent text-[#31465b] hover:text-[#17479d]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ====================================================
              MAIN CONTENT
          ==================================================== */}
          <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[360px_1fr]">

            {/* ==================================================
                LEFT FILTER
            ================================================== */}
            <div className="space-y-8">

              <FilterCard
                title="Category Filter"
                isOpen={siteOpen}
                onToggle={() =>
                  setSiteOpen(
                    (previous) =>
                      !previous
                  )
                }
              >
                <div className="space-y-5">
                  {sourceOptions.map(
                    (item) => (
                      <label
                        key={item.name}
                        className="flex cursor-pointer items-center gap-4 text-[18px] text-[#31465b]"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSources.includes(
                            item.name
                          )}
                          onChange={() =>
                            toggleArrayValue(
                              item.name
                            )
                          }
                          className="h-6 w-6 rounded border border-[#17479d] accent-[#17479d]"
                        />

                        <span>
                          {item.name}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </FilterCard>

              {/* CLEAR FILTERS */}
              {(selectedSources.length >
                0 ||
                submittedQuery) && (
                <button
                  type="button"
                  onClick={
                    handleClearSearch
                  }
                  className="w-full rounded-xl border border-slate-300 px-5 py-4 text-[16px] font-semibold text-[#17479d] transition hover:border-[#17479d] hover:bg-slate-50"
                >
                  Clear Search & Filters
                </button>
              )}
            </div>

            {/* ==================================================
                RIGHT RESULTS
            ================================================== */}
            <div>

              {/* ==================================================
                  SEARCH INPUT
              ================================================== */}
              <div className="flex flex-col gap-5 lg:flex-row">
                <div className="relative flex-1">

                  <input
                    type="text"
                    value={queryInput}
                    onChange={(e) =>
                      setQueryInput(
                        e.target.value
                      )
                    }
                    placeholder="Search by title, author, or keyword..."
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter"
                      ) {
                        handleSearch();
                      }
                    }}
                    className="h-[72px] w-full rounded-[16px] border border-slate-400 bg-white px-6 pr-24 text-[20px] text-[#31465b] outline-none transition focus:border-[#17479d] focus:ring-2 focus:ring-[#17479d]/10"
                  />

                  <button
                    type="button"
                    onClick={
                      handleSearch
                    }
                    aria-label="Search"
                    className="absolute right-0 top-0 flex h-[72px] w-[74px] items-center justify-center rounded-r-[16px] bg-[#17479d] text-white transition hover:bg-[#123b86]"
                  >
                    <Search className="h-8 w-8" />
                  </button>
                </div>
              </div>

              {/* ==================================================
                  RESULTS INFO AND SORT
              ================================================== */}
              <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <p className="text-[18px] text-[#4a5f74]">
                  Results{" "}
                  <span className="font-semibold text-[#1f2d3d]">
                    {start}-{end}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-[#1f2d3d]">
                    {filtered.length.toLocaleString()}
                  </span>
                </p>

                <div className="flex flex-wrap items-center gap-4">

                  <span className="text-[18px] font-semibold text-[#1f2d3d]">
                    Sort by:
                  </span>

                  <div className="relative min-w-[230px]">

                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(
                          e.target.value
                        );
                        setPage(1);
                      }}
                      className="h-[58px] w-full appearance-none rounded-[12px] border border-slate-400 bg-white px-5 pr-16 text-[16px] text-[#31465b] outline-none transition focus:border-[#17479d]"
                    >
                      {sortOptions.map(
                        (option) => (
                          <option
                            key={option}
                            value={option}
                          >
                            {option}
                          </option>
                        )
                      )}
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-4 px-4">
                      <span className="h-8 w-px bg-slate-300" />

                      <ChevronDown className="h-5 w-5 text-slate-700" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ==================================================
                  RESULTS LIST
              ================================================== */}
              <div className="mt-6 space-y-6">

                {/* LOADING */}
                {loading && (
                  <div className="flex flex-col items-center justify-center gap-3 rounded-[24px] bg-[#f0f2f4] px-8 py-16 text-center text-[18px] text-[#4a5f74]">

                    <Loader2 className="h-8 w-8 animate-spin text-[#17479d]" />

                    <span>
                      Loading database articles...
                    </span>
                  </div>
                )}

                {/* ERROR */}
                {!loading &&
                  error && (
                    <div className="flex items-center gap-3 rounded-[24px] border border-rose-200 bg-rose-50 px-8 py-10 text-[18px] text-rose-700">

                      <AlertTriangle className="h-6 w-6 shrink-0 text-rose-600" />

                      <span>
                        {error}
                      </span>
                    </div>
                  )}

                {/* NO RESULTS */}
                {!loading &&
                  !error &&
                  paginated.length ===
                    0 && (
                    <div className="space-y-2 rounded-[24px] bg-[#f0f2f4] px-8 py-12 text-center text-[18px] text-[#4a5f74]">

                      <BookOpen className="mx-auto mb-2 h-10 w-10 text-slate-400" />

                      <p className="font-bold text-[#1f2d3d]">
                        No news found
                        matching your
                        search.
                      </p>

                      <p className="text-sm">
                        Try modifying
                        keywords or
                        clearing category
                        filters.
                      </p>
                    </div>
                  )}

                {/* RESULTS */}
                {!loading &&
                  !error &&
                  paginated.length >
                    0 &&
                  paginated.map(
                    (item) => (
                      <ResultCard
                        key={item.id}
                        item={item}
                        onClick={() =>
                          handleResultClick(
                            item
                          )
                        }
                      />
                    )
                  )}
              </div>

              {/* ==================================================
                  PAGINATION
              ================================================== */}
              {!loading &&
                !error &&
                filtered.length >
                  0 && (
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

                    {/* PREVIOUS */}
                    <button
                      type="button"
                      disabled={
                        currentPage ===
                        1
                      }
                      onClick={() =>
                        setPage(
                          (previous) =>
                            Math.max(
                              1,
                              previous -
                                1
                            )
                        )
                      }
                      aria-label="Previous page"
                      className="flex h-14 w-14 items-center justify-center rounded-[8px] border border-slate-300 bg-white text-slate-400 transition enabled:hover:border-[#17479d] enabled:hover:text-[#17479d] disabled:opacity-50"
                    >
                      <ChevronLeft className="h-7 w-7" />
                    </button>

                    {/* PAGE NUMBERS */}
                    {Array.from({
                      length: totalPages,
                    }).map(
                      (_, index) => {
                        const pageNumber =
                          index + 1;

                        if (
                          pageNumber >
                          5
                        ) {
                          return null;
                        }

                        return (
                          <button
                            key={
                              pageNumber
                            }
                            type="button"
                            onClick={() =>
                              setPage(
                                pageNumber
                              )
                            }
                            className={`flex h-14 w-14 items-center justify-center rounded-[8px] border text-[20px] font-semibold transition ${
                              currentPage ===
                              pageNumber
                                ? "border-[#17479d] bg-white text-[#17479d]"
                                : "border-transparent bg-transparent text-[#1f2d3d] hover:border-slate-300"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      }
                    )}

                    {/* NEXT */}
                    <button
                      type="button"
                      disabled={
                        currentPage ===
                        totalPages
                      }
                      onClick={() =>
                        setPage(
                          (previous) =>
                            Math.min(
                              totalPages,
                              previous +
                                1
                            )
                        )
                      }
                      aria-label="Next page"
                      className="flex h-14 w-14 items-center justify-center rounded-[8px] border border-slate-300 bg-white text-[#17479d] transition enabled:hover:border-[#17479d] enabled:hover:bg-slate-50 disabled:opacity-50"
                    >
                      <ChevronRight className="h-7 w-7" />
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

// ================================================================
// FILTER CARD COMPONENT
// ================================================================
function FilterCard({
  title,
  isOpen,
  onToggle,
  children,
}) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-[#2b7de9] bg-[#f5f5f5]">

      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-8 py-8 text-left"
      >
        <span className="text-[22px] font-semibold text-[#1f2d3d]">
          {title}
        </span>

        <ChevronDown
          className={`h-7 w-7 text-[#1f2d3d] transition-transform ${
            isOpen
              ? "rotate-180"
              : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen
            ? "max-h-[500px] px-8 pb-8 opacity-100"
            : "max-h-0 px-8 pb-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// ================================================================
// RESULT CARD COMPONENT
// ================================================================
function ResultCard({
  item,
  onClick,
}) {
  const articleDescription =
    item.shortArticle ||
    item.intro ||
    item.description ||
    item.detailArticle ||
    "Read more about this article.";

  const category =
    item.category ||
    item.label ||
    "News";

  const displayDate =
    item.date ||
    formatFirebaseDate(
      item.timestamp
    );

  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (
          e.key === "Enter" ||
          e.key === " "
        ) {
          onClick();
        }
      }}
      className="group flex cursor-pointer flex-col items-start gap-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6 md:flex-row"
    >

      {/* IMAGE */}
      {item.image ? (
        <div className="h-36 w-full shrink-0 overflow-hidden rounded-xl bg-slate-200 md:w-56">
          <img
            src={item.image}
            alt={
              item.title ||
              "News article"
            }
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex h-36 w-full shrink-0 items-center justify-center rounded-xl bg-slate-200 text-xs font-bold uppercase text-slate-400 md:w-56">
          No Image
        </div>
      )}

      {/* CONTENT */}
      <div className="min-w-0 flex-1">

        {/* CATEGORY */}
        <div className="mb-2 flex items-center justify-between gap-4">
          <span className="rounded-full bg-[#e2edf8] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#17479d]">
            {category}
          </span>
        </div>

        {/* TITLE */}
        <h3 className="text-xl font-bold leading-snug text-[#0662cc] transition group-hover:underline sm:text-2xl">
          {item.title ||
            "Untitled Article"}
        </h3>

        {/* DESCRIPTION */}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#31465b] sm:text-base">
          {articleDescription}
        </p>

        {/* META */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 sm:text-sm">

          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />

            {item.author ||
              "Admin"}
          </span>

          <span className="hidden text-slate-300 sm:inline">
            |
          </span>

          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />

            {displayDate}
          </span>
        </div>
      </div>
    </article>
  );
}

// ================================================================
// FIREBASE TIMESTAMP FORMATTER
// ================================================================
function formatFirebaseDate(
  timestamp
) {
  if (!timestamp) {
    return "Recent";
  }

  try {
    let date;

    // Firestore Timestamp
    if (
      typeof timestamp.toDate ===
      "function"
    ) {
      date =
        timestamp.toDate();
    }

    // Firestore serialized timestamp
    else if (
      timestamp.seconds
    ) {
      date = new Date(
        timestamp.seconds *
          1000
      );
    }

    // JavaScript Date
    else if (
      timestamp instanceof Date
    ) {
      date = timestamp;
    }

    if (!date) {
      return "Recent";
    }

    return date.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  } catch (error) {
    console.error(
      "Error formatting date:",
      error
    );

    return "Recent";
  }
}