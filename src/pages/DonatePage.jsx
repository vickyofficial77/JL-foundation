import { useMemo, useState } from "react";
import {
  ChevronDown,
  Landmark,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  LoaderCircle,
  UploadCloud,
  LogIn,
  ArrowRight,
} from "lucide-react";
import DonateHeader from "../components/donate/DonateHeader";
import DonateSectionTitle from "../components/donate/DonateSectionTitle";
import OptionCard from "../components/donate/OptionCard";
import AmountCard from "../components/donate/AmountCard";
import ClubFinderFooter from "../components/club-finder/ClubFinderFooter";

const supportTabs = ["Featured Causes", "Areas of Focus", "Global Grants", "Endowment"];

const supportData = {
  "Featured Causes": {
    intro: "Choose a cause where your gift can create immediate and meaningful impact.",
    cards: [
      {
        id: "annual-fund-share",
        title: "Annual Fund-SHARE",
        description:
          "Support flexible foundation programs, community projects, training, and humanitarian service.",
      },
      {
        id: "polioplus-fund",
        title: "PolioPlus Fund",
        description:
          "Help strengthen health campaigns, prevention programs, and community outreach.",
      },
      {
        id: "world-fund",
        title: "World Fund",
        description:
          "Support large-scale projects with measurable and sustainable community impact.",
      },
    ],
  },
  "Areas of Focus": {
    intro: "Direct your donation to the area you care about most.",
    cards: [
      {
        id: "education",
        title: "Education",
        description: "Support learning access, school resources, and youth development.",
      },
      {
        id: "health",
        title: "Health",
        description: "Support healthcare access, prevention, and community wellbeing.",
      },
      {
        id: "economic-development",
        title: "Economic Development",
        description: "Support livelihoods, entrepreneurship, and local opportunity.",
      },
    ],
  },
  "Global Grants": {
    intro: "Global grants support long-term community projects.",
    cards: [
      {
        id: "global-grants",
        title: "Global Grants",
        description: "Fund sustainable projects that solve real community challenges.",
      },
    ],
  },
  Endowment: {
    intro: "Give toward long-term foundation growth and future impact.",
    cards: [
      {
        id: "endowment-share",
        title: "Endowment-SHARE",
        description: "Build lasting giving power for future community projects.",
      },
    ],
  },
};

const donationTypes = [
  { id: "one-time", title: "One-time donation" },
  { id: "recurring", title: "Recurring donation" },
];

const amountOptions = ["25", "100", "250", "1000", "Other"];

const countries = [
  "Rwanda",
  "Uganda",
  "Kenya",
  "Tanzania",
  "Burundi",
  "Democratic Republic of Congo",
  "United States",
  "United Kingdom",
  "France",
  "Germany",
  "Other",
];

const currencies = ["US Dollar", "Euro", "Rwandan Franc", "Ugandan Shilling"];

const bankAccounts = [
  {
    id: "bank-usd",
    title: "Bank Transfer - USD",
    bankName: "Equity Bank",
    accountName: "Sinkagwa Ruterana Jeanluc",
    accountNumber: "1040103500995",
    currency: "US Dollar",
    swiftCode: "EQBLUGKA",
    branch: "Kampala Branch",
  },
  {
    id: "bank-eur",
    title: "Bank Transfer - EURO",
    bankName: "Equity Bank",
    accountName: "Sinkagwa Ruterana Jeanluc",
    accountNumber: "1040103386003",
    currency: "Euro",
    swiftCode: "EQBLUGKA",
    branch: "Kampala Branch",
  },
];

const worldRemitDetails = {
  provider: "WorldRemit / Mobile Money Uganda",
  accountName: "Sinkagwa Ruterana Jeanluc",
  phoneNumber: "+256 700 000 000",
  country: "Uganda",
  currency: "UGX / USD",
};

const initialDonor = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  addressLine1: "",
  city: "",
  country: "",
  otherCountry: "",
  paymentScreenshot: null,
};

export default function DonatePage() {
  const [activeTab, setActiveTab] = useState("Featured Causes");
  const [selectedSupport, setSelectedSupport] = useState("annual-fund-share");
  const [currency, setCurrency] = useState("US Dollar");
  const [donationType, setDonationType] = useState("one-time");
  const [frequency, setFrequency] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("250");
  const [customAmount, setCustomAmount] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank-usd");
  const [donorForm, setDonorForm] = useState(initialDonor);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [donationSubmitted, setDonationSubmitted] = useState(false);

  const currentCards = supportData[activeTab]?.cards || [];

  const selectedSupportCard = useMemo(
    () => currentCards.find((card) => card.id === selectedSupport) || currentCards[0],
    [currentCards, selectedSupport]
  );

  const finalAmount = selectedAmount === "Other" ? customAmount : selectedAmount;
  const donationAmountNumber = Number(finalAmount) || 0;
  const selectedBank = bankAccounts.find((item) => item.id === paymentMethod);

  const changeTab = (tab) => {
    setActiveTab(tab);
    setSelectedSupport(supportData[tab]?.cards?.[0]?.id || "");
  };

  const updateDonorField = (field, value) => {
    setDonorForm((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateDonation = () => {
    const errors = {};

    if (!donationAmountNumber || donationAmountNumber <= 0) {
      errors.amount = "Please select or enter a valid amount.";
    }

    if (donationType === "recurring" && !frequency) {
      errors.frequency = "Choose recurring frequency.";
    }

    if (!donorForm.firstName.trim()) errors.firstName = "First name is required.";
    if (!donorForm.lastName.trim()) errors.lastName = "Last name is required.";

    if (donorForm.email.trim() && !/\S+@\S+\.\S+/.test(donorForm.email)) {
      errors.email = "Enter a valid email.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitDonation = () => {
    if (!validateDonation()) return;

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setDonationSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);
  };

  if (donationSubmitted) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
        <DonateHeader />

        <main className="mx-auto max-w-[980px] px-4 py-16 sm:px-8">
          <div className="animate-[fadeUp_.7s_ease_both] overflow-hidden rounded-[34px] border border-emerald-200 bg-white p-7 text-center shadow-[0_30px_90px_rgba(15,23,42,0.10)] sm:p-12">
            <div className="mx-auto flex h-24 w-24 animate-bounce items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-12 w-12" />
            </div>

            <h1 className="mt-7 text-[34px] font-extrabold tracking-tight text-[#243f57] sm:text-[52px]">
              Thank you for your donation
            </h1>

            <p className="mx-auto mt-4 max-w-[700px] text-[17px] leading-8 text-slate-600">
              Your donation information has been submitted successfully. We appreciate your
              generosity and support toward community impact.
            </p>

            <div className="mx-auto mt-8 max-w-[720px] rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left">
              <SummaryRow label="Support" value={selectedSupportCard?.title} />
              <SummaryRow
                label="Donation type"
                value={donationType === "recurring" ? `Recurring - ${frequency}` : "One-time"}
              />
              <SummaryRow label="Amount" value={`${currency} ${finalAmount}`} />
              <SummaryRow
                label="Payment method"
                value={paymentMethod === "worldremit" ? "WorldRemit Uganda" : selectedBank?.title}
              />
              <SummaryRow label="Donor" value={`${donorForm.firstName} ${donorForm.lastName}`} />
            </div>

            <button
              type="button"
              onClick={() => setDonationSubmitted(false)}
              className="mt-8 rounded-2xl bg-[#0d58ad] px-8 py-4 text-[16px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#09498f]"
            >
              Edit donation
            </button>
          </div>
        </main>

        <ClubFinderFooter />

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(28px) scale(.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <DonateHeader />

      <main className="mx-auto max-w-[1460px] px-4 py-10 sm:px-8 lg:py-14">
        <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[34px]">
          <div className="bg-gradient-to-br from-[#eef6ff] via-white to-[#fff1f7] px-5 py-10 sm:px-10 lg:px-16 lg:py-14">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.22em] text-[#d10058] sm:text-[14px]">
                  Support the mission
                </p>
                <h1 className="text-[46px] font-light leading-none tracking-tight text-[#243f57] sm:text-[82px]">
                  Donate
                </h1>
              </div>

              <p className="max-w-[520px] text-[15px] leading-7 text-slate-600 sm:text-[17px] sm:leading-8 lg:text-right">
                Make a secure manual donation using bank transfer or WorldRemit. Only first
                name and last name are required.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200">
            <DonateSectionTitle title="Choose what you would like to support" />

            <div className="px-5 py-9 sm:px-8 lg:px-14">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-b border-slate-200 pb-4 text-[14px] font-bold text-slate-500 sm:flex sm:flex-wrap sm:items-center sm:gap-4 sm:text-[16px]">
                {supportTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => changeTab(tab)}
                    className={`rounded-xl px-2 py-3 text-left transition sm:rounded-none sm:px-0 sm:pb-4 ${
                      activeTab === tab
                        ? "bg-[#eef6ff] text-[#0d58ad] sm:border-b-[3px] sm:border-[#0d58ad] sm:bg-transparent"
                        : "hover:bg-slate-50 hover:text-[#0d58ad] sm:hover:bg-transparent"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <p className="mt-7 max-w-[900px] text-[16px] leading-7 text-[#243f57] sm:text-[18px] sm:leading-8">
                {supportData[activeTab]?.intro}
              </p>

              <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {currentCards.map((card) => (
                  <OptionCard
                    key={card.id}
                    title={card.title}
                    description={card.description}
                    selected={selectedSupport === card.id}
                    onSelect={() => setSelectedSupport(card.id)}
                    staticDescription
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200">
            <DonateSectionTitle title="Donation details" />

            <div className="px-5 py-10 sm:px-8 lg:px-16">
              <div className="mx-auto max-w-[960px] space-y-10">
                <SelectField
                  label="Select your currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  options={currencies}
                />

                <div>
                  <label className="mb-4 block text-[17px] font-bold text-[#243f57] sm:text-[18px]">
                    Select donation type
                  </label>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {donationTypes.map((type) => (
                      <OptionCard
                        key={type.id}
                        title={type.title}
                        description={
                          type.id === "one-time"
                            ? "Give once today to support your selected cause."
                            : "Give repeatedly and support long-term impact."
                        }
                        selected={donationType === type.id}
                        onSelect={() => {
                          setDonationType(type.id);
                          if (type.id === "one-time") setFrequency("");
                        }}
                        compact
                        staticDescription
                      />
                    ))}
                  </div>

                  {donationType === "recurring" && (
                    <div className="mt-6">
                      <SelectField
                        label="Choose frequency"
                        value={frequency}
                        onChange={(e) => {
                          setFrequency(e.target.value);
                          setFormErrors((prev) => ({ ...prev, frequency: "" }));
                        }}
                        options={["", "monthly", "quarterly", "annually"]}
                        optionLabels={{
                          "": "Select frequency",
                          monthly: "Monthly",
                          quarterly: "Quarterly",
                          annually: "Annually",
                        }}
                      />
                      {formErrors.frequency && (
                        <p className="mt-2 text-sm text-red-600">{formErrors.frequency}</p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-4 block text-[17px] font-bold text-[#243f57] sm:text-[18px]">
                    Select amount
                  </label>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {amountOptions.map((amount) => (
                      <AmountCard
                        key={amount}
                        amount={amount}
                        selected={selectedAmount === amount}
                        onSelect={() => {
                          setSelectedAmount(amount);
                          setFormErrors((prev) => ({ ...prev, amount: "" }));
                        }}
                      />
                    ))}
                  </div>

                  {selectedAmount === "Other" && (
                    <div className="mt-5">
                      <InputField
                        label="Enter custom amount"
                        type="number"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                      />
                    </div>
                  )}

                  {formErrors.amount && (
                    <p className="mt-2 text-sm text-red-600">{formErrors.amount}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:justify-center">
                  <button
                    type="button"
                    onClick={() => setShowDetails(true)}
                    className="inline-flex min-h-[58px] w-full items-center justify-center gap-2 rounded-2xl bg-[#d10058] px-8 text-[16px] font-extrabold uppercase tracking-[0.02em] text-white shadow-[0_18px_40px_rgba(209,0,88,0.22)] transition hover:-translate-y-0.5 hover:bg-[#b1004b] sm:text-[17px]"
                  >
                    Continue
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowDetails(true)}
                    className="inline-flex min-h-[58px] w-full items-center justify-center gap-2 rounded-2xl border border-[#0d58ad]/25 bg-white px-8 text-[16px] font-extrabold uppercase tracking-[0.02em] text-[#0d58ad] shadow-sm transition hover:-translate-y-0.5 hover:border-[#0d58ad] hover:bg-[#eef6ff] sm:text-[17px]"
                  >
                    <LogIn className="h-5 w-5" />
                    Sign in
                  </button>
                </div>
              </div>

              {showDetails && (
                <div className="mt-14 overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:rounded-[30px]">
                  <div className="bg-gradient-to-r from-[#243f57] to-[#0d58ad] px-5 py-7 text-white sm:px-8">
                    <h2 className="text-[30px] font-light sm:text-[42px]">Payment details</h2>
                    <p className="mt-2 max-w-[720px] text-[15px] leading-7 text-white/80 sm:text-base">
                      Choose your payment method, complete payment manually, then submit your
                      donation details.
                    </p>
                  </div>

                  <div className="px-5 py-8 sm:px-8 lg:px-10">
                    <div className="rounded-[26px] border border-[#c8d7ef] bg-gradient-to-b from-[#f8fbff] to-[#eef6ff] p-5 sm:p-7">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-[24px] font-bold text-[#243f57]">
                            Payment Method
                          </h3>
                          <p className="mt-1 text-[15px] text-slate-500">
                            Bank transfer and WorldRemit only.
                          </p>
                        </div>

                        <div className="flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#243f57] shadow-sm">
                          <ShieldCheck className="h-4 w-4 text-[#0d58ad]" />
                          Manual confirmation
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {bankAccounts.map((bank) => (
                          <button
                            key={bank.id}
                            type="button"
                            onClick={() => setPaymentMethod(bank.id)}
                            className={`inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-[15px] font-bold transition ${
                              paymentMethod === bank.id
                                ? "border-[#0f766e] bg-[#0f766e] text-white shadow-md"
                                : "border-slate-300 bg-white text-[#243f57] hover:border-[#0f766e]"
                            }`}
                          >
                            <Landmark className="h-5 w-5" />
                            {bank.currency}
                          </button>
                        ))}

                        <button
                          type="button"
                          onClick={() => setPaymentMethod("worldremit")}
                          className={`inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-[15px] font-bold transition sm:col-span-2 lg:col-span-1 ${
                            paymentMethod === "worldremit"
                              ? "border-[#f6c000] bg-[#f6c000] text-[#111827] shadow-md"
                              : "border-slate-300 bg-white text-[#243f57] hover:border-[#f6c000]"
                          }`}
                        >
                          <Smartphone className="h-5 w-5" />
                          WorldRemit Uganda
                        </button>
                      </div>

                      {paymentMethod !== "worldremit" && selectedBank && (
                        <PaymentBox title={selectedBank.title}>
                          <DetailCard label="Bank name" value={selectedBank.bankName} />
                          <DetailCard label="Account name" value={selectedBank.accountName} />
                          <DetailCard label="Account number" value={selectedBank.accountNumber} />
                          <DetailCard label="Currency" value={selectedBank.currency} />
                          <DetailCard label="SWIFT / BIC" value={selectedBank.swiftCode} />
                          <DetailCard label="Branch" value={selectedBank.branch} />
                        </PaymentBox>
                      )}

                      {paymentMethod === "worldremit" && (
                        <PaymentBox title="WorldRemit Uganda Payment" yellow>
                          <DetailCard label="Provider" value={worldRemitDetails.provider} />
                          <DetailCard label="Account name" value={worldRemitDetails.accountName} />
                          <DetailCard label="Uganda number" value={worldRemitDetails.phoneNumber} />
                          <DetailCard label="Country" value={worldRemitDetails.country} />
                          <DetailCard label="Currency" value={worldRemitDetails.currency} />
                        </PaymentBox>
                      )}
                    </div>

                    <div className="mt-10 rounded-[26px] border border-slate-200 bg-white p-5 sm:p-7">
                      <h2 className="text-[30px] font-light text-[#243f57] sm:text-[42px]">
                        Personal details
                      </h2>
                      <p className="mt-2 text-[15px] text-slate-500">
                        First name and last name are required. Country, email, phone, city,
                        address and screenshot are optional.
                      </p>

                      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <InputField
                          label="First Name *"
                          value={donorForm.firstName}
                          onChange={(e) => updateDonorField("firstName", e.target.value)}
                          error={formErrors.firstName}
                        />
                        <InputField
                          label="Last Name *"
                          value={donorForm.lastName}
                          onChange={(e) => updateDonorField("lastName", e.target.value)}
                          error={formErrors.lastName}
                        />
                        <InputField
                          label="Email optional"
                          type="email"
                          value={donorForm.email}
                          onChange={(e) => updateDonorField("email", e.target.value)}
                          error={formErrors.email}
                        />
                        <InputField
                          label="Phone Number optional"
                          value={donorForm.phone}
                          onChange={(e) => updateDonorField("phone", e.target.value)}
                        />
                        <InputField
                          className="md:col-span-2"
                          label="Address optional"
                          value={donorForm.addressLine1}
                          onChange={(e) => updateDonorField("addressLine1", e.target.value)}
                        />
                        <InputField
                          label="City optional"
                          value={donorForm.city}
                          onChange={(e) => updateDonorField("city", e.target.value)}
                        />

                        <SelectField
                          label="Country optional"
                          value={donorForm.country}
                          onChange={(e) => updateDonorField("country", e.target.value)}
                          options={["", ...countries]}
                          optionLabels={{ "": "Select country optional" }}
                        />

                        {donorForm.country === "Other" && (
                          <InputField
                            label="Write your country optional"
                            value={donorForm.otherCountry}
                            onChange={(e) => updateDonorField("otherCountry", e.target.value)}
                          />
                        )}

                        <FileUpload
                          className="md:col-span-2"
                          file={donorForm.paymentScreenshot}
                          onChange={(file) => updateDonorField("paymentScreenshot", file)}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleSubmitDonation}
                        disabled={submitting}
                        className="mt-8 inline-flex min-h-[58px] w-full items-center justify-center rounded-2xl bg-[#d10058] px-8 text-[16px] font-extrabold uppercase tracking-[0.02em] text-white shadow-[0_14px_35px_rgba(209,0,88,0.20)] transition hover:-translate-y-0.5 hover:bg-[#b1004b] disabled:opacity-60 sm:w-auto sm:min-w-[250px] sm:text-[17px]"
                      >
                        {submitting ? (
                          <>
                            <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Donation"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <ClubFinderFooter />
    </div>
  );
}

function InputField({ label, error, className = "", type = "text", ...props }) {
  return (
    <div className={className}>
      <label className="mb-2 block text-[15px] font-bold text-[#243f57]">{label}</label>
      <input
        type={type}
        {...props}
        className="h-[56px] w-full rounded-2xl border border-slate-300 bg-white px-4 text-[16px] text-[#243f57] outline-none transition focus:border-[#0d58ad] focus:ring-4 focus:ring-[#0d58ad]/10"
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function SelectField({ label, value, onChange, options, optionLabels = {} }) {
  return (
    <div>
      <label className="mb-2 block text-[15px] font-bold text-[#243f57]">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="h-[56px] w-full appearance-none rounded-2xl border border-slate-300 bg-white px-4 pr-14 text-[16px] text-[#243f57] outline-none transition focus:border-[#0d58ad] focus:ring-4 focus:ring-[#0d58ad]/10"
        >
          {options.map((item) => (
            <option key={item} value={item}>
              {optionLabels[item] || item}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#243f57]" />
      </div>
    </div>
  );
}

function FileUpload({ file, onChange, className = "" }) {
  return (
    <div className={className}>
      <label className="mb-2 block text-[15px] font-bold text-[#243f57]">
        Upload screenshot of paid donation optional
      </label>

      <label className="flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition hover:border-[#0d58ad] hover:bg-[#eef6ff]">
        <UploadCloud className="h-8 w-8 text-[#0d58ad]" />
        <span className="mt-2 text-[15px] font-semibold text-[#243f57]">
          {file ? file.name : "Click to upload payment screenshot"}
        </span>
        <span className="mt-1 text-[13px] text-slate-500">PNG, JPG, JPEG or PDF</span>

        <input
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
      </label>
    </div>
  );
}

function PaymentBox({ title, children, yellow = false }) {
  return (
    <div
      className={`mt-8 rounded-[24px] border p-5 sm:p-6 ${
        yellow ? "border-yellow-200 bg-yellow-50/80" : "border-emerald-200 bg-emerald-50/70"
      }`}
    >
      <h4 className="text-[22px] font-bold text-[#243f57]">{title}</h4>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
}

function DetailCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <div className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 break-all text-[17px] font-bold text-[#243f57]">{value}</div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="grid grid-cols-1 border-b border-slate-200 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
      <div className="font-bold text-[#243f57]">{label}</div>
      <div className="text-slate-700">{value || "—"}</div>
    </div>
  );
}