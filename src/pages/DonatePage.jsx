import { useMemo, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import DonateHeader from "../components/donate/DonateHeader";
import DonateSectionTitle from "../components/donate/DonateSectionTitle";
import OptionCard from "../components/donate/OptionCard";
import AmountCard from "../components/donate/AmountCard";
import ClubFinderFooter from "../components/club-finder/ClubFinderFooter";
import RegisterFormPage from "../components/donate/RegisterFormPage";
import SignInFormPage from "../components/donate/SignInFormPage";

const supportTabs = [
  "Featured Causes",
  "Areas of Focus",
  "Global Grants",
  "Named Funds",
  "Endowment",
];

const supportData = {
  "Featured Causes": {
    intro: "",
    mode: "cards",
    cards: [
      {
        id: "annual-fund-share",
        title: "Annual Fund-SHARE",
        description:
          "Your donation supports flexible Foundation funding for grants, training, and sustainable humanitarian service in communities around the world.",
        selected: true,
      },
      {
        id: "polioplus-fund",
        title: "PolioPlus Fund",
        description:
          "Your donation helps Rotary reach every child with the polio vaccine. Thanks to the Gates Foundation, your contribution will be tripled.",
      },
      {
        id: "world-fund",
        title: "World Fund",
        description:
          "Supports large-scale international projects with measurable and sustainable outcomes through Rotary grants.",
      },
      {
        id: "endowment-share",
        title: "Endowment-SHARE",
        description:
          "Builds long-term giving power by preserving and investing gifts for future impact.",
      },
      {
        id: "disaster-response-fund",
        title: "Disaster Response Fund",
        description:
          "Provides rapid and flexible support to communities facing emergencies and natural disasters.",
        centered: true,
      },
    ],
  },

  "Areas of Focus": {
    intro:
      "You can direct your gift to an area of focus within the Annual Fund. However, Annual Fund gifts that are designated to an area of focus do not generate District Designated Funds (DDF).",
    mode: "cards",
    cards: [
      {
        id: "environment",
        title: "The Environment",
        description:
          "Supports projects that protect natural resources, address climate resilience, and strengthen environmental sustainability.",
        selected: true,
      },
      {
        id: "peacebuilding",
        title: "Peacebuilding and Conflict Prevention",
        description:
          "Advances peacebuilding, conflict prevention, and community reconciliation programs.",
      },
      {
        id: "disease",
        title: "Disease Prevention and Treatment",
        description:
          "Improves prevention, treatment access, and health services in vulnerable communities.",
      },
      {
        id: "water",
        title: "Water, Sanitation, and Hygiene",
        description:
          "Expands access to clean water, sanitation infrastructure, and hygiene education.",
      },
      {
        id: "maternal",
        title: "Maternal and Child Health",
        description:
          "Supports mothers and children with critical healthcare, training, and access to life-saving services.",
      },
      {
        id: "education",
        title: "Basic Education and Literacy",
        description:
          "Improves literacy, school access, and learning opportunities for children and adults.",
      },
      {
        id: "economies",
        title: "Community Economic Development",
        description:
          "Strengthens local livelihoods, entrepreneurship, and economic resilience.",
        centered: true,
      },
    ],
  },

  "Global Grants": {
    intro:
      "Global grants support large international activities that have sustainable and measurable outcomes.",
    mode: "search",
  },

  "Named Funds": {
    intro: "Please sign in to donate to a Named Fund.",
    mode: "signin",
  },

  Endowment: {
    intro:
      "Rotary strives to increase the value of your gift to the Endowment by preserving and investing your initial contribution and spending only a portion of the earnings.",
    mode: "cards",
    cards: [
      {
        id: "endowment-share-main",
        title: "Endowment-SHARE",
        description:
          "Strengthens Rotary’s long-term capacity to fund grants and sustainable humanitarian work for future generations.",
        selected: true,
      },
      {
        id: "peace-centers",
        title: "Endowment-Rotary Peace Centers",
        description:
          "Supports Rotary Peace Centers and the training of peace and development professionals.",
      },
      {
        id: "endowment-world-fund",
        title: "Endowment-World Fund",
        description:
          "Provides lasting support for Rotary’s international grant programs and global service impact.",
        centered: true,
      },
    ],
  },
};

const donationTypes = [
  { id: "one-time", title: "One-time donation" },
  { id: "recurring", title: "Recurring donation" },
];

const amountOptions = ["25", "100", "250", "1000", "Other"];
const countries = ["Rwanda", "Kenya", "Uganda", "Tanzania", "United States"];
const currencies = ["US Dollar", "Rwandan Franc", "Euro", "British Pound"];

export default function DonatePage() {
  const [pageView, setPageView] = useState("donate");
  const [activeTab, setActiveTab] = useState("Featured Causes");
  const [selectedSupport, setSelectedSupport] = useState("annual-fund-share");
  const [infoCard, setInfoCard] = useState("polioplus-fund");
  const [honorGift, setHonorGift] = useState(false);
  const [country, setCountry] = useState("Rwanda");
  const [currency, setCurrency] = useState("US Dollar");
  const [donationType, setDonationType] = useState("one-time");
  const [frequency, setFrequency] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("250");
  const [customAmount, setCustomAmount] = useState("");
  const [grantNumber, setGrantNumber] = useState("");

  const currentTab = supportData[activeTab];
  const currentCards = currentTab.cards || [];

  const selectedSupportCard = useMemo(
    () => currentCards.find((card) => card.id === selectedSupport) ?? currentCards[0],
    [currentCards, selectedSupport]
  );

  const infoCardData = useMemo(
    () => currentCards.find((card) => card.id === infoCard),
    [currentCards, infoCard]
  );

  const finalAmount =
    selectedAmount === "Other" ? customAmount || "0" : selectedAmount;

  const changeTab = (tab) => {
    setActiveTab(tab);
    const firstSelected =
      supportData[tab].cards?.find((card) => card.selected)?.id ||
      supportData[tab].cards?.[0]?.id ||
      "";
    setSelectedSupport(firstSelected);
    setInfoCard(firstSelected);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-slate-900">
      <DonateHeader
        onOpenSignIn={() => setPageView("signin")}
        onOpenRegister={() => setPageView("register")}
      />

      {pageView === "signin" ? (
        <SignInFormPage />
      ) : pageView === "register" ? (
        <RegisterFormPage onGoToSignIn={() => setPageView("signin")} />
      ) : (
        <main className="mx-auto max-w-[1460px] px-4 py-10 sm:px-8 lg:py-14">
          <div className="border border-slate-300 bg-white/20 px-4 py-10 sm:px-10 lg:px-16 lg:py-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h1 className="text-[56px] font-light leading-none tracking-tight text-[#243f57] sm:text-[84px]">
                Donate
              </h1>
              <p className="text-right text-[18px] text-[#243f57] sm:text-[20px]">
                All fields are required unless marked <em>optional.</em>
              </p>
            </div>

            <div className="mt-12 border border-slate-400">
              <DonateSectionTitle title="Choose what you would like to support" />

              <div className="px-4 py-10 sm:px-8 lg:px-14 lg:py-14">
                <div className="flex flex-wrap items-center gap-5 border-b border-slate-300 pb-5 text-[18px] font-semibold text-slate-500">
                  <button className="text-[28px] leading-none text-slate-600">‹</button>

                  {supportTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => changeTab(tab)}
                      className={`pb-4 transition ${
                        activeTab === tab
                          ? "border-b-[3px] border-[#0d58ad] text-[#0d58ad]"
                          : "hover:text-[#0d58ad]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}

                  <button className="ml-auto text-[28px] leading-none text-slate-600">›</button>
                </div>

                {currentTab.intro && (
                  <p className="mt-8 max-w-[980px] text-[20px] leading-[1.5] text-[#243f57]">
                    {currentTab.intro}
                  </p>
                )}

                {currentTab.mode === "cards" && (
                  <>
                    {activeTab === "Featured Causes" && infoCardData ? (
                      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_390px] lg:items-start">
                        <OptionCard
                          title={currentCards[0].title}
                          description={currentCards[0].description}
                          selected={selectedSupport === currentCards[0].id}
                          onSelect={() => setSelectedSupport(currentCards[0].id)}
                          onLearnMore={() => setInfoCard(currentCards[0].id)}
                        />

                        <div className="relative min-h-[202px] bg-white px-10 py-10 text-[20px] leading-[1.5] text-[#111827] shadow-sm">
                          <button
                            type="button"
                            onClick={() => setInfoCard("")}
                            className="absolute right-4 top-4 text-[#0d58ad] transition hover:opacity-70"
                          >
                            <X className="h-6 w-6" />
                          </button>
                          {infoCardData.description}
                        </div>
                      </div>
                    ) : null}

                    <div
                      className={`grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 ${
                        activeTab === "Featured Causes" ? "mt-8" : "mt-10"
                      }`}
                    >
                      {currentCards
                        .filter((_, index) =>
                          activeTab === "Featured Causes" ? index !== 0 : true
                        )
                        .map((card) => (
                          <OptionCard
                            key={card.id}
                            title={card.title}
                            description={card.description}
                            selected={selectedSupport === card.id}
                            centered={card.centered}
                            onSelect={() => setSelectedSupport(card.id)}
                            onLearnMore={() => setInfoCard(card.id)}
                          />
                        ))}
                    </div>

                    {activeTab !== "Featured Causes" && infoCardData && (
                      <div className="mt-10 rounded-sm bg-white px-8 py-7 text-[18px] leading-[1.6] text-[#243f57] shadow-sm">
                        <div className="font-semibold text-[#0d58ad]">
                          {infoCardData.title}
                        </div>
                        <p className="mt-3">{infoCardData.description}</p>
                      </div>
                    )}
                  </>
                )}

                {currentTab.mode === "search" && (
                  <div className="mt-10 max-w-[860px]">
                    <label className="mb-4 block text-[20px] font-semibold text-[#243f57]">
                      Seven-digit grant number
                    </label>
                    <input
                      type="text"
                      value={grantNumber}
                      onChange={(e) => setGrantNumber(e.target.value)}
                      className="h-[46px] w-full border border-slate-500 bg-white px-4 text-[18px] outline-none focus:border-[#0d58ad]"
                    />

                    <button className="mt-8 inline-flex min-w-[190px] items-center justify-center bg-[#d10058] px-10 py-5 text-[18px] font-bold uppercase tracking-[0.02em] text-white transition hover:bg-[#b1004b]">
                      Search
                    </button>
                  </div>
                )}

                {currentTab.mode === "signin" && (
                  <div className="mt-10">
                    <button
                      type="button"
                      onClick={() => setPageView("signin")}
                      className="inline-flex min-w-[190px] items-center justify-center bg-[#d10058] px-10 py-5 text-[18px] font-bold uppercase tracking-[0.02em] text-white transition hover:bg-[#b1004b]"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 border border-slate-300 bg-[#eaf5fb] px-6 py-8 text-[18px] text-[#243f57] sm:text-[20px]">
              <label className="flex items-start gap-4 sm:items-center">
                <input
                  type="checkbox"
                  checked={honorGift}
                  onChange={(e) => setHonorGift(e.target.checked)}
                  className="mt-1 h-6 w-6 accent-[#0d58ad] sm:mt-0"
                />
                <span>
                  I would like to make this donation in honor or in memory of someone
                </span>
              </label>
            </div>

            <div className="mt-12 border border-slate-400">
              <DonateSectionTitle title="Donation" />

              <div className="px-4 py-10 sm:px-8 lg:px-16 lg:py-14">
                <div className="mx-auto max-w-[900px] space-y-10">
                  <div>
                    <label className="mb-3 block text-[18px] font-semibold text-[#243f57]">
                      Select your country
                    </label>
                    <div className="relative">
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="h-[52px] w-full appearance-none border border-slate-500 bg-white px-4 pr-16 text-[18px] text-[#243f57] outline-none transition focus:border-[#0d58ad]"
                      >
                        {countries.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-4 px-4">
                        <span className="h-7 w-px bg-slate-400" />
                        <ChevronDown className="h-6 w-6 text-[#243f57]" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-[18px] font-semibold text-[#243f57]">
                      Select your currency
                    </label>
                    <div className="relative">
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="h-[52px] w-full appearance-none border border-slate-500 bg-white px-4 pr-16 text-[18px] text-[#243f57] outline-none transition focus:border-[#0d58ad]"
                      >
                        {currencies.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-4 px-4">
                        <span className="h-7 w-px bg-slate-400" />
                        <ChevronDown className="h-6 w-6 text-[#243f57]" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-4 block text-[18px] font-semibold text-[#243f57]">
                      Select a donation type
                    </label>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      {donationTypes.map((type) => (
                        <OptionCard
                          key={type.id}
                          title={type.title}
                          description={
                            type.id === "one-time"
                              ? "Give once today to support your selected cause."
                              : "Set up a recurring gift and extend your impact over time."
                          }
                          selected={donationType === type.id}
                          footer=""
                          onSelect={() => {
                            setDonationType(type.id);
                            if (type.id === "one-time") {
                              setFrequency("");
                            }
                          }}
                          compact
                          staticDescription
                        />
                      ))}
                    </div>

                    {donationType === "recurring" && (
                      <>
                        <div className="mt-8 border border-slate-300 bg-[#eaf5fb] px-6 py-6 text-[18px] leading-[1.6] text-[#1e4f8c]">
                          If you have an existing recurring donation and would like to update it, please{" "}
                          <button
                            type="button"
                            onClick={() => setPageView("signin")}
                            className="underline underline-offset-2 hover:text-[#0d58ad]"
                          >
                            sign in and edit in My Donations
                          </button>
                          .
                        </div>

                        <div className="mt-8">
                          <label className="mb-3 block text-[18px] font-semibold text-[#243f57]">
                            Choose frequency
                          </label>

                          <div className="relative">
                            <select
                              value={frequency}
                              onChange={(e) => setFrequency(e.target.value)}
                              className="h-[52px] w-full appearance-none border border-slate-500 bg-white px-4 pr-16 text-[18px] text-[#243f57] outline-none transition focus:border-[#0d58ad]"
                            >
                              <option value="">Select</option>
                              <option value="monthly">Monthly</option>
                              <option value="quarterly">Quarterly</option>
                              <option value="annually">Annually</option>
                            </select>

                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-4 px-4">
                              <span className="h-7 w-px bg-slate-400" />
                              <ChevronDown className="h-6 w-6 text-[#243f57]" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    <label className="mb-4 block text-[18px] font-semibold text-[#243f57]">
                      Select an amount
                    </label>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                      {amountOptions.map((amount) => (
                        <AmountCard
                          key={amount}
                          amount={amount}
                          selected={selectedAmount === amount}
                          onSelect={() => setSelectedAmount(amount)}
                        />
                      ))}
                    </div>

                    {selectedAmount === "Other" && (
                      <div className="mt-6">
                        <label className="mb-3 block text-[17px] font-semibold text-[#243f57]">
                          Enter custom amount
                        </label>
                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          placeholder="Enter amount"
                          className="h-[52px] w-full border border-slate-500 bg-white px-4 text-[18px] text-[#243f57] outline-none transition focus:border-[#0d58ad]"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-14 rounded-md border border-slate-300 bg-white/40 px-5 py-6 text-[17px] text-[#243f57]">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-semibold">Selected support:</span>
                    <span>{selectedSupportCard?.title}</span>
                  </div>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-semibold">Donation summary:</span>
                    <span>
                      {donationType === "recurring" ? "Recurring" : "One-time"}
                      {donationType === "recurring" && frequency
                        ? ` · ${frequency.charAt(0).toUpperCase() + frequency.slice(1)}`
                        : ""}
                      {" · "}
                      {currency} {finalAmount}
                    </span>
                  </div>
                </div>

                <div className="mt-14 flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-10">
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setPageView("signin")}
                      className="inline-flex min-w-[320px] items-center justify-center bg-[#d10058] px-10 py-5 text-[20px] font-bold uppercase tracking-[0.02em] text-white transition hover:bg-[#b1004b]"
                    >
                      Sign In
                    </button>
                    <p className="mx-auto mt-6 max-w-[300px] text-[18px] leading-8 text-[#243f57]">
                      Sign in to My Jeanluc to track your donations and receive recognition
                    </p>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setPageView("register")}
                      className="inline-flex min-w-[320px] items-center justify-center border border-[#d10058] bg-white px-10 py-5 text-[20px] font-bold uppercase tracking-[0.02em] text-[#d10058] transition hover:bg-[#fff1f7]"
                    >
                      Continue as a Guest
                    </button>
                    <p className="mx-auto mt-6 max-w-[260px] text-[18px] leading-8 text-[#243f57]">
                      You can create an account after you donate
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      <ClubFinderFooter />
    </div>
  );
}