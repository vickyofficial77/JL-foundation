import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Link as LinkIcon,
  Search,
} from "lucide-react";

const mockResults = [
  {
    id: 1,
    category: "My Rotary",
    title: "Paul Harris Fellow Recognition Transfer Request Form",
    description:
      "Please send your completed form only once. If you have questions regarding recognition or contributions to The Rotary Foundation, please contact Rotary’s support team.",
    updated: "24 Oct 2025",
    site: "https://my.rotary.org",
    size: "62.91 KB",
    type: "Document",
    source: "My Rotary",
    icon: "pdf",
    tab: "Site",
  },
  {
    id: 2,
    category: "My Rotary",
    title: "Learning Center Course Catalog",
    description:
      "You can filter by topic to find courses when you are in the Learning Center. Courses marked with a symbol are available to non-members.",
    updated: "14 Feb 2026",
    site: "https://my.rotary.org",
    size: "471.86 KB",
    type: "Document",
    source: "My Rotary",
    icon: "pdf",
    tab: "Site",
  },
  {
    id: 3,
    category: "Rotary.org",
    title: "Paul Harris Fellow recognition | Rotary International",
    description:
      "The Paul Harris Fellow recognition acknowledges individuals who contribute, or who have contributions made in their name, of $1,000 to The Rotary Foundation.",
    updated: "5 Feb 2026",
    site: "https://www.rotary.org",
    size: "",
    type: "Content Page",
    source: "Rotary.org",
    icon: "link",
    tab: "Site",
  },
  {
    id: 4,
    category: "My Rotary",
    title: "Rotary Code of Policies",
    description:
      "The purpose of the Code is to place all these general and permanent policies currently in effect, into one integrated and comprehensive volume.",
    updated: "10 Feb 2026",
    site: "https://my.rotary.org",
    size: "4.42 MB",
    type: "Document",
    source: "My Rotary",
    icon: "pdf",
    tab: "Site",
  },
  {
    id: 5,
    category: "My Rotary",
    title: "Contribution Form - The Rotary Foundation",
    description:
      "Contributions can also be made at rotary.org/donate. Type of Payment: For security purposes, please do not send credit card contributions via unsecured methods.",
    updated: "13 Mar 2026",
    site: "https://my.rotary.org",
    size: "136.31 KB",
    type: "Document",
    source: "My Rotary",
    icon: "pdf",
    tab: "Site",
  },
  {
    id: 6,
    category: "End Polio",
    title: "Home | End Polio",
    description:
      "With your help, we can end polio for good. Our work on polio eradication is proof that vaccines save lives. 3 billion children have been vaccinated.",
    updated: "16 Apr 2026",
    site: "https://www.endpolio.org",
    size: "",
    type: "Content Page",
    source: "End Polio",
    icon: "link",
    tab: "Site",
  },
  {
    id: 7,
    category: "Rotary.org",
    title: "Rotary magazine | Rotary International",
    description:
      "As the science advances, Rotary members join the quest to find malaria vaccines. The president of the Rotary Club of Roswell, Georgia, discusses the club’s work.",
    updated: "15 Apr 2026",
    site: "https://www.rotary.org",
    size: "",
    type: "Content Page",
    source: "Rotary.org",
    icon: "link",
    tab: "Site",
  },
  {
    id: 8,
    category: "Members",
    title: "Member Resources Hub",
    description:
      "Explore key resources, profiles, account tools, and community information designed for members.",
    updated: "11 Apr 2026",
    site: "https://my.rotary.org",
    size: "",
    type: "Content Page",
    source: "My Rotary",
    icon: "link",
    tab: "Members",
  },
  {
    id: 9,
    category: "Members",
    title: "Leadership Toolkit PDF",
    description:
      "A downloadable guide for leadership development, planning meetings, and strengthening club participation.",
    updated: "21 Feb 2026",
    site: "https://my.rotary.org",
    size: "1.82 MB",
    type: "Document",
    source: "My Rotary",
    icon: "pdf",
    tab: "Members",
  },
  {
    id: 10,
    category: "Clubs",
    title: "Find a Rotary Club Near You",
    description:
      "Search for clubs by location, language, meeting day, and format to find the right one for you.",
    updated: "18 Apr 2026",
    site: "https://www.rotary.org",
    size: "",
    type: "Content Page",
    source: "Rotary.org",
    icon: "link",
    tab: "Clubs",
  },
  {
    id: 11,
    category: "Clubs",
    title: "Starting a New Club Guide",
    description:
      "Learn how to organize, structure, and launch a new club in your community using Rotary’s framework.",
    updated: "30 Mar 2026",
    site: "https://my.rotary.org",
    size: "2.14 MB",
    type: "Document",
    source: "My Rotary",
    icon: "pdf",
    tab: "Clubs",
  },
  {
    id: 12,
    category: "Brand Center",
    title: "Brand Center | Media Resources",
    description:
      "Download logos, brand guides, templates, and media assets for your campaigns and events.",
    updated: "19 Jan 2026",
    site: "https://brandcenter.rotary.org",
    size: "",
    type: "Content Page",
    source: "Brand Center",
    icon: "link",
    tab: "Site",
  },
];

const sourceOptions = [
  { name: "Brand Center", count: 49 },
  { name: "Convention", count: 22 },
  { name: "End Polio", count: 166 },
  { name: "My Rotary", count: 1884 },
  { name: "Rotary.org", count: 1608 },
];

const contentTypeOptions = [
  { name: "Content Page", count: 2531 },
  { name: "Document", count: 1198 },
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
  const [activeTab, setActiveTab] = useState("Site");
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState("Sort by Relevance");
  const [page, setPage] = useState(1);
  const [siteOpen, setSiteOpen] = useState(true);
  const [contentTypeOpen, setContentTypeOpen] = useState(true);

  const toggleArrayValue = (value, array, setArray) => {
    if (array.includes(value)) {
      setArray(array.filter((item) => item !== value));
    } else {
      setArray([...array, value]);
    }
    setPage(1);
  };

  const handleSearch = () => {
    setSubmittedQuery(query.trim());
    setPage(1);
  };

  const filtered = useMemo(() => {
    let data = mockResults.filter((item) => item.tab === activeTab);

    if (submittedQuery) {
      const q = submittedQuery.toLowerCase();
      data = data.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.source.toLowerCase().includes(q)
      );
    }

    if (selectedSources.length) {
      data = data.filter((item) => selectedSources.includes(item.source));
    }

    if (selectedTypes.length) {
      data = data.filter((item) => selectedTypes.includes(item.type));
    }

    if (sortBy === "Newest First") {
      data = [...data].sort(
        (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()
      );
    } else if (sortBy === "Oldest First") {
      data = [...data].sort(
        (a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime()
      );
    } else if (sortBy === "Title A-Z") {
      data = [...data].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Title Z-A") {
      data = [...data].sort((a, b) => b.title.localeCompare(a.title));
    }

    return data;
  }, [activeTab, submittedQuery, selectedSources, selectedTypes, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / RESULTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const paginated = filtered.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const start = filtered.length === 0 ? 0 : (currentPage - 1) * RESULTS_PER_PAGE + 1;
  const end = Math.min(currentPage * RESULTS_PER_PAGE, filtered.length);

  return (
    <section className="px-4 py-8 sm:px-8 lg:px-14 lg:py-10">
      <div className="mx-auto max-w-[1500px]">
        <h1 className="text-[68px] font-extralight leading-none tracking-tight text-[#31465b] sm:text-[88px]">
          Search
        </h1>

        <div className="mt-8 flex flex-wrap items-center gap-10 border-b border-slate-300">
          {["Site", "Members", "Clubs"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                setPage(1);
              }}
              className={`border-b-[4px] pb-5 text-[22px] transition ${
                activeTab === tab
                  ? "border-[#17479d] font-semibold text-[#17479d]"
                  : "border-transparent text-[#31465b] hover:text-[#17479d]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[460px_1fr]">
          <div className="space-y-8">
            <FilterCard
              title="Site"
              isOpen={siteOpen}
              onToggle={() => setSiteOpen((prev) => !prev)}
            >
              <div className="space-y-5">
                {sourceOptions.map((item) => (
                  <label
                    key={item.name}
                    className="flex items-center gap-4 text-[18px] text-[#31465b]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSources.includes(item.name)}
                      onChange={() =>
                        toggleArrayValue(item.name, selectedSources, setSelectedSources)
                      }
                      className="h-7 w-7 rounded border border-[#17479d] accent-[#17479d]"
                    />
                    <span>
                      {item.name} <span className="text-slate-500">({item.count})</span>
                    </span>
                  </label>
                ))}
              </div>
            </FilterCard>

            <FilterCard
              title="Content Type"
              isOpen={contentTypeOpen}
              onToggle={() => setContentTypeOpen((prev) => !prev)}
            >
              <div className="space-y-5">
                {contentTypeOptions.map((item) => (
                  <label
                    key={item.name}
                    className="flex items-center gap-4 text-[18px] text-[#31465b]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(item.name)}
                      onChange={() =>
                        toggleArrayValue(item.name, selectedTypes, setSelectedTypes)
                      }
                      className="h-7 w-7 rounded border border-[#17479d] accent-[#17479d]"
                    />
                    <span>
                      {item.name} <span className="text-slate-500">({item.count})</span>
                    </span>
                  </label>
                ))}
              </div>
            </FilterCard>
          </div>

          <div>
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="h-[72px] w-full rounded-l-[16px] border border-slate-400 bg-white px-6 pr-24 text-[20px] text-[#31465b] outline-none focus:border-[#17479d]"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="absolute right-0 top-0 flex h-[72px] w-[74px] items-center justify-center rounded-r-[16px] bg-[#17479d] text-white transition hover:bg-[#123b86]"
                >
                  <Search className="h-8 w-8" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-[18px] text-[#4a5f74]">
                Results <span className="font-semibold text-[#1f2d3d]">{start}-{end}</span> of{" "}
                <span className="font-semibold text-[#1f2d3d]">{filtered.length.toLocaleString()}</span>
              </p>

              <div className="flex items-center gap-4">
                <span className="text-[18px] font-semibold text-[#1f2d3d]">Sort by:</span>

                <div className="relative min-w-[230px]">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setPage(1);
                    }}
                    className="h-[58px] w-full appearance-none rounded-[12px] border border-slate-400 bg-white px-5 pr-16 text-[16px] text-[#31465b] outline-none focus:border-[#17479d]"
                  >
                    {sortOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-4 px-4">
                    <span className="h-8 w-px bg-slate-300" />
                    <ChevronDown className="h-5 w-5 text-slate-700" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {paginated.length === 0 ? (
                <div className="rounded-[24px] bg-[#f0f2f4] px-8 py-10 text-[20px] text-[#4a5f74]">
                  No results found. Try another keyword or remove some filters.
                </div>
              ) : (
                paginated.map((item) => <ResultCard key={item.id} item={item} />)
              )}
            </div>

            {filtered.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  className="flex h-14 w-14 items-center justify-center rounded-[8px] border border-slate-300 bg-white text-slate-400 transition enabled:hover:border-[#17479d] enabled:hover:text-[#17479d] disabled:opacity-50"
                >
                  <ChevronLeft className="h-7 w-7" />
                </button>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;
                  if (pageNumber > 5) return null;

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      className={`flex h-14 w-14 items-center justify-center rounded-[8px] border text-[20px] font-semibold transition ${
                        currentPage === pageNumber
                          ? "border-[#17479d] bg-white text-[#17479d]"
                          : "border-transparent bg-transparent text-[#1f2d3d] hover:border-slate-300"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
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
  );
}

function FilterCard({ title, isOpen, onToggle, children }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-[#2b7de9] bg-[#f5f5f5]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-8 py-8 text-left"
      >
        <span className="text-[22px] font-semibold text-[#1f2d3d]">{title}</span>
        <ChevronDown
          className={`h-7 w-7 text-[#1f2d3d] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] px-8 pb-8 opacity-100" : "max-h-0 px-8 pb-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function ResultCard({ item }) {
  return (
    <div className="rounded-[28px] bg-[#eef2f5] px-6 py-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:px-10 sm:py-8">
      <div className="flex items-start justify-between gap-6">
        <div className="rounded-full bg-[#e2edf8] px-5 py-2 text-[16px] text-[#66798c]">
          {item.category}
        </div>

        <div className="shrink-0 text-[#c11f39]">
          {item.icon === "pdf" ? (
            <FileText className="h-10 w-10 fill-current stroke-current" />
          ) : (
            <LinkIcon className="h-10 w-10 text-[#1471d8]" />
          )}
        </div>
      </div>

      <h3 className="mt-7 text-[28px] font-medium leading-[1.3] text-[#0662cc]">
        {item.title}
      </h3>

      <p className="mt-6 text-[18px] leading-[1.7] text-[#31465b]">
        {item.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-[15px] text-[#6b7f91]">
        <span>Updated: {item.updated}</span>
        <span className="hidden text-slate-400 sm:inline">|</span>
        <span>Site: {item.site}</span>
        {item.size ? (
          <>
            <span className="hidden text-slate-400 sm:inline">|</span>
            <span>Size: {item.size}</span>
          </>
        ) : null}
      </div>
    </div>
  );
}