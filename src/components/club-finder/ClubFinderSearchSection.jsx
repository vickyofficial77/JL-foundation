import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const clubData = [
  {
    id: 1,
    name: "Kigali Central Rotary Club",
    location: "Kigali, Rwanda",
    distanceKm: 4,
    type: "Rotary Club",
    day: "Tuesday",
    format: "In-person",
    language: "English",
  },
  {
    id: 2,
    name: "Kigali Hills Rotaract Club",
    location: "Kigali, Rwanda",
    distanceKm: 9,
    type: "Rotaract Club",
    day: "Saturday",
    format: "Hybrid",
    language: "English",
  },
  {
    id: 3,
    name: "Musanze Rotary Club",
    location: "Musanze, Rwanda",
    distanceKm: 87,
    type: "Rotary Club",
    day: "Thursday",
    format: "In-person",
    language: "English",
  },
  {
    id: 4,
    name: "Butare Interact Club",
    location: "Huye, Rwanda",
    distanceKm: 121,
    type: "Interact Club",
    day: "Friday",
    format: "In-person",
    language: "French",
  },
  {
    id: 5,
    name: "Nairobi Lake Rotary Club",
    location: "Nairobi, Kenya",
    distanceKm: 235,
    type: "Rotary Club",
    day: "Monday",
    format: "Online",
    language: "English",
  },
  {
    id: 6,
    name: "Rubavu Community Rotary Club",
    location: "Rubavu, Rwanda",
    distanceKm: 156,
    type: "Rotary Club",
    day: "Wednesday",
    format: "Hybrid",
    language: "Kinyarwanda",
  },
];

const distanceOptions = ["25", "50", "100", "250"];
const clubTypes = ["Rotary Club", "Rotaract Club", "Interact Club"];
const meetingDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const meetingFormats = ["In-person", "Online", "Hybrid"];
const meetingLanguages = ["English", "French", "Kinyarwanda", "Swahili"];

export default function ClubFinderSearchSection() {
  const [activeTab, setActiveTab] = useState("Clubs");

  const [filters, setFilters] = useState({
    clubName: "",
    location: "",
    distance: "25",
    unit: "km",
    clubType: "",
    meetingDay: "",
    meetingFormat: "",
    meetingLanguage: "",
  });

  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState([]);

  const tabs = ["Site", "Members", "Clubs"];

  const filteredResults = useMemo(() => {
    return clubData.filter((club) => {
      const byName =
        !filters.clubName ||
        club.name.toLowerCase().includes(filters.clubName.toLowerCase());

      const byLocation =
        !filters.location ||
        club.location.toLowerCase().includes(filters.location.toLowerCase());

      const limit =
        filters.unit === "km"
          ? Number(filters.distance || 25)
          : Number(filters.distance || 25) * 1.60934;

      const byDistance = !filters.location || club.distanceKm <= limit;
      const byType = !filters.clubType || club.type === filters.clubType;
      const byDay = !filters.meetingDay || club.day === filters.meetingDay;
      const byFormat =
        !filters.meetingFormat || club.format === filters.meetingFormat;
      const byLanguage =
        !filters.meetingLanguage || club.language === filters.meetingLanguage;

      return (
        byName &&
        byLocation &&
        byDistance &&
        byType &&
        byDay &&
        byFormat &&
        byLanguage
      );
    });
  }, [filters]);

  const updateFilter = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    setHasSearched(true);
    setResults(filteredResults);
  };

  const handleReset = () => {
    setFilters({
      clubName: "",
      location: "",
      distance: "25",
      unit: "km",
      clubType: "",
      meetingDay: "",
      meetingFormat: "",
      meetingLanguage: "",
    });
    setHasSearched(false);
    setResults([]);
  };

  const useCurrentLocation = () => {
    updateFilter("location", "Kigali, Rwanda");
  };

  return (
    <section className="px-4 py-8 sm:px-8 lg:px-14 lg:py-10">
      <div className="mx-auto max-w-[1500px]">
        <h1 className="text-[68px] font-extralight leading-none tracking-tight text-[#31465b] sm:text-[88px]">
          Search
        </h1>

        <div className="mt-10 flex flex-wrap items-center gap-10 border-b border-slate-300 pb-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`border-b-[4px] px-0 pb-5 text-[22px] transition ${
                activeTab === tab
                  ? "border-[#17479d] font-semibold text-[#17479d]"
                  : "border-transparent text-[#31465b] hover:text-[#17479d]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-0 grid grid-cols-1 overflow-hidden border border-slate-300 lg:grid-cols-[530px_1fr]">
          <div className="bg-[#e9e9ea] px-6 py-10 sm:px-10">
            <h2 className="text-[54px] font-extralight leading-none tracking-tight text-[#31465b]">
              Find a club
            </h2>

            <div className="mt-12 space-y-8">
              <div>
                <label className="mb-3 block text-[18px] font-semibold text-[#1f2d3d]">
                  Club Name
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-500" />
                  <input
                    type="text"
                    value={filters.clubName}
                    onChange={(e) => updateFilter("clubName", e.target.value)}
                    placeholder="Find by name (optional)"
                    className="h-[58px] w-full border border-slate-300 bg-white pl-14 pr-4 text-[16px] text-[#31465b] outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <div className="text-[18px] font-bold uppercase tracking-[0.03em] text-[#31465b]">
                  Filter By
                </div>
              </div>

              <div>
                <label className="mb-3 block text-[18px] font-semibold text-[#1f2d3d]">
                  Meeting Location
                </label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => updateFilter("location", e.target.value)}
                  className="h-[58px] w-full border border-slate-300 bg-white px-4 text-[16px] text-[#31465b] outline-none focus:border-sky-500"
                />
                <div className="mt-3 flex flex-col gap-2 text-[15px] text-[#617487] sm:flex-row sm:items-center sm:justify-between">
                  <span>Example: “Tokyo, Japan”</span>
                  <button
                    type="button"
                    onClick={useCurrentLocation}
                    className="text-left text-[#17479d] transition hover:underline"
                  >
                    Use Current Location
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-[18px] font-semibold text-[#1f2d3d]">
                  Distance
                </label>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative w-full sm:w-[225px]">
                    <select
                      value={filters.distance}
                      onChange={(e) => updateFilter("distance", e.target.value)}
                      className="h-[58px] w-full appearance-none border border-slate-300 bg-white px-5 pr-16 text-[16px] text-[#31465b] outline-none focus:border-sky-500"
                    >
                      {distanceOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-4 px-4">
                      <span className="h-8 w-px bg-slate-300" />
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-[16px] text-[#617487]">
                    <input
                      type="radio"
                      checked={filters.unit === "km"}
                      onChange={() => updateFilter("unit", "km")}
                      className="h-6 w-6 accent-slate-400"
                    />
                    Km
                  </label>

                  <label className="flex items-center gap-2 text-[16px] text-[#617487]">
                    <input
                      type="radio"
                      checked={filters.unit === "miles"}
                      onChange={() => updateFilter("unit", "miles")}
                      className="h-6 w-6 accent-slate-400"
                    />
                    Miles
                  </label>
                </div>
              </div>

              <SelectField
                label="Club Type"
                value={filters.clubType}
                onChange={(e) => updateFilter("clubType", e.target.value)}
                options={clubTypes}
              />

              <SelectField
                label="Meeting Day"
                value={filters.meetingDay}
                onChange={(e) => updateFilter("meetingDay", e.target.value)}
                options={meetingDays}
              />

              <SelectField
                label="Meeting format"
                value={filters.meetingFormat}
                onChange={(e) => updateFilter("meetingFormat", e.target.value)}
                options={meetingFormats}
              />

              <SelectField
                label="Meeting Language"
                value={filters.meetingLanguage}
                onChange={(e) => updateFilter("meetingLanguage", e.target.value)}
                options={meetingLanguages}
              />

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="inline-flex h-[70px] w-full items-center justify-center rounded-full bg-[#15a0c7] text-[24px] font-bold uppercase text-white transition hover:bg-[#0f8eb1]"
                >
                  Search
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-8 block w-full text-center text-[24px] font-semibold text-[#15a0c7] transition hover:underline"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>

          <div className="border-l border-slate-300 bg-[#f9f9f9] px-6 py-10 sm:px-8">
            {!hasSearched ? (
              <p className="text-[20px] text-[#31465b]">
                Please provide at least one search parameter.
              </p>
            ) : results.length === 0 ? (
              <div>
                <h3 className="text-[28px] font-semibold text-[#31465b]">
                  No clubs found
                </h3>
                <p className="mt-3 text-[18px] leading-8 text-[#5b6d7d]">
                  Try adjusting your filters or location and search again.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-[28px] font-semibold text-[#31465b]">
                  Search Results ({results.length})
                </h3>

                <div className="mt-8 grid grid-cols-1 gap-5">
                  {results.map((club) => (
                    <div
                      key={club.id}
                      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h4 className="text-[24px] font-semibold text-[#17479d]">
                            {club.name}
                          </h4>
                          <p className="mt-2 text-[17px] text-[#425466]">
                            {club.location}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-3 text-[14px]">
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                              {club.type}
                            </span>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                              {club.day}
                            </span>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                              {club.format}
                            </span>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                              {club.language}
                            </span>
                          </div>
                        </div>

                        <div className="text-[16px] font-medium text-[#15a0c7]">
                          {filters.unit === "miles"
                            ? `${(club.distanceKm / 1.60934).toFixed(1)} miles`
                            : `${club.distanceKm} km`}
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <button className="rounded-full bg-[#17479d] px-5 py-2 text-[15px] font-semibold text-white transition hover:bg-[#123a86]">
                          View Club
                        </button>
                        <button className="rounded-full border border-[#15a0c7] px-5 py-2 text-[15px] font-semibold text-[#15a0c7] transition hover:bg-[#15a0c7] hover:text-white">
                          Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="mb-3 block text-[18px] font-semibold text-[#1f2d3d]">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="h-[58px] w-full appearance-none border border-slate-300 bg-white px-5 pr-16 text-[16px] text-[#31465b] outline-none focus:border-sky-500"
        >
          <option value="">--Select--</option>
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-4 px-4">
          <span className="h-8 w-px bg-slate-300" />
          <ChevronDown className="h-5 w-5 text-sky-500" />
        </div>
      </div>
    </div>
  );
}