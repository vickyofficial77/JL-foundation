import { useMemo, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const featuredStories = [
  {
    id: 1,
    title: "Care close to home",
    type: "Feature",
    date: "20-Apr-2026",
    image:
      "https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=1600&auto=format&fit=crop",
    description:
      "Portable kidney failure treatment will keep patients in Labrador in the remote communities they love",
    large: true,
  },
  {
    id: 2,
    title: "Rotary projects around the globe April 2026",
    type: "Feature",
    date: "01-Apr-2026",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "To catch a killer parasite",
    type: "Feature",
    date: "31-Mar-2026",
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1600&auto=format&fit=crop",
  },
];

const allStories = [
  {
    id: 1,
    label: "Feature",
    title: "Care close to home",
    date: "20-Apr-2026",
  },
  {
    id: 2,
    label: "News",
    title: "Passport clubs offer ticket to flexibility",
    date: "20-Apr-2026",
  },
  {
    id: 3,
    label: "News",
    title: "Progress report: Partners for a Malaria-Free Zambia",
    date: "10-Apr-2026",
  },
  {
    id: 4,
    label: "News",
    title: "Nobel Peace laureate Malala Yousafzai to speak at the Rotary Convention in Taipei",
    date: "09-Apr-2026",
  },
  {
    id: 5,
    label: "News",
    title: "A Rotarian works to dispel myths about polio vaccines",
    date: "09-Apr-2026",
  },
  {
    id: 6,
    label: "Press Release",
    title: "Rotary International moves Barcelona convention to 2027",
    date: "06-Apr-2026",
  },
  {
    id: 7,
    label: "Feature",
    title: "Rotary projects around the globe April 2026",
    date: "01-Apr-2026",
  },
  {
    id: 8,
    label: "Feature",
    title: "To catch a killer parasite",
    date: "31-Mar-2026",
  },
  {
    id: 9,
    label: "Press Release",
    title: "Six young leaders named Rotary’s ‘Champions of Tomorrow’ for empowering youth",
    date: "30-Mar-2026",
  },
  {
    id: 10,
    label: "News",
    title: "Young leaders honored as Rotary’s People of Action: Champions of Tomorrow",
    date: "27-Mar-2026",
  },
  {
    id: 11,
    label: "Feature",
    title: "Water beyond wells",
    date: "19-Mar-2026",
  },
  {
    id: 12,
    label: "News",
    title: "Rotary Peace Fellow employs AI for a better world",
    date: "19-Mar-2026",
  },
];

const filterOptions = ["Feature", "News", "Press Release"];

export default function NewsFeaturesPage() {
  const [filters, setFilters] = useState([]);

  const filteredStories = useMemo(() => {
    if (filters.length === 0) return allStories;
    return allStories.filter((story) => filters.includes(story.label));
  }, [filters]);

  const toggleFilter = (value) => {
    setFilters((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const getAccentColor = (label) => {
    if (label === "Feature") return "border-t-[3px] border-t-[#00a6b2]";
    if (label === "Press Release") return "border-t-[3px] border-t-[#a61d8f]";
    return "border-t-[3px] border-t-[#00a6b2]";
  };

  const getLabelColor = (label) => {
    if (label === "Press Release") return "text-[#a61d8f]";
    return "text-[#008c95]";
  };

  return (
    <div className="min-h-screen bg-[#efefef] text-slate-900">
      <Navbar />

      <main>
        <section className="bg-[#0d3b66]">
          <div className="mx-auto max-w-[1800px]">
            <div
              className="flex min-h-[390px] items-center justify-center bg-cover bg-center px-4 text-center"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(7,44,79,0.86), rgba(7,44,79,0.86)), url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop')",
              }}
            >
              <h1 className="text-[52px] font-light tracking-tight text-white sm:text-[72px] lg:text-[92px]">
                News &amp; Features
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <article className="relative min-h-[360px] overflow-hidden">
                <img
                  src={featuredStories[0].image}
                  alt={featuredStories[0].title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-10">
                  <h2 className="max-w-[700px] text-[38px] font-normal leading-tight text-white sm:text-[50px]">
                    {featuredStories[0].title}
                  </h2>
                  <p className="mt-4 text-[16px] text-white/90">
                    {featuredStories[0].type} | {featuredStories[0].date}
                  </p>
                  <p className="mt-6 max-w-[760px] text-[18px] leading-[1.6] text-white">
                    {featuredStories[0].description}
                  </p>
                </div>
              </article>

              <div className="grid grid-cols-1">
                {featuredStories.slice(1).map((story) => (
                  <article
                    key={story.id}
                    className="relative min-h-[180px] overflow-hidden"
                  >
                    <img
                      src={story.image}
                      alt={story.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/35" />
                    <div className="relative z-10 flex h-full flex-col justify-end p-8">
                      <h3 className="max-w-[650px] text-[28px] font-normal leading-tight text-white sm:text-[36px]">
                        {story.title}
                      </h3>
                      <p className="mt-3 text-[15px] text-white/90">
                        {story.type} | {story.date}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="bg-[#efefef] py-14 sm:py-16 lg:py-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        >
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-[18px] text-slate-700">
              <span className="font-bold uppercase tracking-[0.02em] text-slate-700">
                Filter by type:
              </span>

              {filterOptions.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <input
                    type="checkbox"
                    checked={filters.includes(option)}
                    onChange={() => toggleFilter(option)}
                    className="h-6 w-6 accent-[#0d58ad]"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
              {filteredStories.map((story) => (
                <article
                  key={story.id}
                  className={`min-h-[320px] bg-[#f7f7f7] px-8 py-10 shadow-sm ${getAccentColor(
                    story.label
                  )}`}
                >
                  <div
                    className={`text-[14px] font-bold uppercase tracking-[0.03em] ${getLabelColor(
                      story.label
                    )}`}
                  >
                    {story.label}
                  </div>

                  <h3 className="mt-8 text-[32px] font-normal leading-[1.35] text-[#243f57]">
                    {story.title}
                  </h3>

                  <p className="mt-10 text-[16px] text-[#415466]">
                    {story.label} | {story.date}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-center">
              <span className="text-[18px] font-semibold text-[#243f57]">
                0 to {filteredStories.length} of 769
              </span>
              <button className="text-[18px] font-bold text-sky-500 transition hover:text-sky-700">
                next ›
              </button>
            </div>
          </div>
        </section>

        <section className="bg-[#e9e9e9] py-10">
          <div className="mx-auto max-w-[1760px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-6 rounded-sm bg-[#f0f0f0] px-6 py-8 text-center lg:flex-row lg:gap-10">
              <p className="text-[18px] text-[#667789]">
                Please help us improve. Was this page helpful?
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6">
                <button className="inline-flex min-w-[240px] justify-center rounded-full bg-white px-10 py-4 text-[18px] font-bold text-[#5d7287] transition hover:bg-slate-50">
                  YES
                </button>
                <button className="inline-flex min-w-[240px] justify-center rounded-full bg-white px-10 py-4 text-[18px] font-bold text-[#5d7287] transition hover:bg-slate-50">
                  NO
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}