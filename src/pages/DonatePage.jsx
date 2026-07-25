import { useMemo, useState, useEffect } from "react";
import {
  ChevronDown,
  Landmark,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  LoaderCircle,
  UploadCloud,
  ArrowRight,
  User,
  LogOut,
} from "lucide-react";

import DonateHeader from "../components/donate/DonateHeader";
import DonateSectionTitle from "../components/donate/DonateSectionTitle";
import OptionCard from "../components/donate/OptionCard";
import AmountCard from "../components/donate/AmountCard";
import ClubFinderFooter from "../components/club-finder/ClubFinderFooter";
import SignInFormPage from "../components/donate/SignInFormPage";
import RegisterFormPage from "../components/donate/RegisterFormPage";

import { db, auth } from "../firebase/config";

import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";


/* =========================================================
   SUPPORT TABS
========================================================= */

const supportTabs = [
  "Featured Causes",
  "Areas of Focus",
  "Global Grants",
  "Endowment",
];


/* =========================================================
   SUPPORT DATA
========================================================= */

const supportData = {
  "Featured Causes": {
    intro:
      "Choose a cause where your gift can create immediate and meaningful impact.",
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
    intro:
      "Direct your donation to the area you care about most.",
    cards: [
      {
        id: "education",
        title: "Education",
        description:
          "Support learning access, school resources, and youth development.",
      },
      {
        id: "health",
        title: "Health",
        description:
          "Support healthcare access, prevention, and community wellbeing.",
      },
      {
        id: "economic-development",
        title: "Economic Development",
        description:
          "Support livelihoods, entrepreneurship, and local opportunity.",
      },
    ],
  },

  "Global Grants": {
    intro:
      "Global grants support long-term community projects.",
    cards: [
      {
        id: "global-grants",
        title: "Global Grants",
        description:
          "Fund sustainable projects that solve real community challenges.",
      },
    ],
  },

  Endowment: {
    intro:
      "Give toward long-term foundation growth and future impact.",
    cards: [
      {
        id: "endowment-share",
        title: "Endowment-SHARE",
        description:
          "Build lasting giving power for future community projects.",
      },
    ],
  },
};


/* =========================================================
   DONATION TYPES
========================================================= */

const donationTypes = [
  {
    id: "one-time",
    title: "One-time donation",
  },
  {
    id: "recurring",
    title: "Recurring donation",
  },
];


/* =========================================================
   AMOUNT OPTIONS
========================================================= */

const amountOptions = [
  "25",
  "100",
  "250",
  "1000",
  "Other",
];


/* =========================================================
   COUNTRIES
========================================================= */

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


/* =========================================================
   CURRENCIES
========================================================= */

const currencies = [
  "US Dollar",
  "Euro",
  "Rwandan Franc",
  "Ugandan Shilling",
];


/* =========================================================
   BANK ACCOUNTS
========================================================= */

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


/* =========================================================
   WORLD REMIT DETAILS
========================================================= */

const worldRemitDetails = {
  provider:
    "WorldRemit / Mobile Money Uganda",
  accountName:
    "Sinkagwa Ruterana Jeanluc",
  phoneNumber:
    "+256 700 000 000",
  country: "Uganda",
  currency: "UGX / USD",
};


/* =========================================================
   INITIAL DONOR
========================================================= */

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
  donationMessage: "",
};


/* =========================================================
   DONATE PAGE
========================================================= */

export default function DonatePage() {

  const [pageView, setPageView] =
    useState("donate");

  const [currentUser, setCurrentUser] =
    useState(null);

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("Featured Causes");

  const [selectedSupport, setSelectedSupport] =
    useState("annual-fund-share");

  const [currency, setCurrency] =
    useState("US Dollar");

  const [donationType, setDonationType] =
    useState("one-time");

  const [frequency, setFrequency] =
    useState("");

  const [selectedAmount, setSelectedAmount] =
    useState("250");

  const [customAmount, setCustomAmount] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("bank-usd");

  const [donorForm, setDonorForm] =
    useState(initialDonor);

  const [formErrors, setFormErrors] =
    useState({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [uploadProgress, setUploadProgress] =
    useState(false);

  const [donationSubmitted, setDonationSubmitted] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [
    personalDetailsCleared,
    setPersonalDetailsCleared,
  ] = useState(false);


  /* =========================================================
     AUTH STATE
  ========================================================= */

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {

          setCurrentUser(user);

          if (
            user &&
            !personalDetailsCleared
          ) {

            const nameParts =
              user.displayName
                ? user.displayName.split(" ")
                : ["", ""];

            setDonorForm(
              (prev) => ({
                ...prev,

                email:
                  user.email ||
                  prev.email,

                firstName:
                  prev.firstName ||
                  nameParts[0] ||
                  "",

                lastName:
                  prev.lastName ||
                  nameParts
                    .slice(1)
                    .join(" "),
              })
            );
          }
        }
      );

    return () =>
      unsubscribe();

  }, [
    personalDetailsCleared,
  ]);


  /* =========================================================
     CURRENT SUPPORT CARDS
  ========================================================= */

  const currentCards =
    supportData[
      activeTab
    ]?.cards || [];


  /* =========================================================
     SELECTED SUPPORT CARD
  ========================================================= */

  const selectedSupportCard =
    useMemo(
      () =>
        currentCards.find(
          (card) =>
            card.id ===
            selectedSupport
        ) ||
        currentCards[0],
      [
        currentCards,
        selectedSupport,
      ]
    );


  /* =========================================================
     FINAL AMOUNT
  ========================================================= */

  const finalAmount =
    selectedAmount === "Other"
      ? customAmount
      : selectedAmount;


  /* =========================================================
     SELECTED BANK
  ========================================================= */

  const selectedBank =
    bankAccounts.find(
      (item) =>
        item.id ===
        paymentMethod
    );


  /* =========================================================
     CHANGE TAB
  ========================================================= */

  const changeTab = (
    tab
  ) => {

    setActiveTab(tab);

    setSelectedSupport(
      supportData[
        tab
      ]?.cards?.[0]?.id ||
        ""
    );
  };


  /* =========================================================
     UPDATE DONOR FIELD
  ========================================================= */

  const updateDonorField = (
    field,
    value
  ) => {

    setDonorForm(
      (prev) => ({
        ...prev,
        [field]: value,
      })
    );

    if (
      formErrors[field]
    ) {

      setFormErrors(
        (prev) => ({
          ...prev,
          [field]: "",
        })
      );
    }

    if (
      errorMessage
    ) {
      setErrorMessage("");
    }
  };


  /* =========================================================
     VALIDATE FORM
  ========================================================= */

  const validateForm = () => {

    const errors = {};

    if (
      !donorForm.firstName.trim()
    ) {

      errors.firstName =
        "Please enter your first name.";
    }

    if (
      !donorForm.lastName.trim()
    ) {

      errors.lastName =
        "Please enter your last name.";
    }

    if (
      !donorForm.email.trim()
    ) {

      errors.email =
        "Please enter your email.";

    } else {

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailRegex.test(
          donorForm.email.trim()
        )
      ) {

        errors.email =
          "Please enter a valid email address.";
      }
    }

    if (
      !finalAmount ||
      isNaN(
        Number(finalAmount)
      ) ||
      Number(finalAmount) <= 0
    ) {

      errors.amount =
        "Please enter a valid donation amount greater than 0.";
    }

    if (
      !paymentMethod
    ) {

      errors.paymentMethod =
        "Please select a payment method.";
    }

    if (
      donationType ===
        "recurring" &&
      !frequency
    ) {

      errors.frequency =
        "Please select a donation frequency.";
    }

    setFormErrors(
      errors
    );

    return (
      Object.keys(errors)
        .length === 0
    );
  };


  /* =========================================================
     CLOUDINARY UPLOAD
  ========================================================= */

  const uploadToCloudinary =
    async (
      file
    ) => {

      const cloudName =
        import.meta.env
          .VITE_CLOUDINARY_CLOUD_NAME;

      const uploadPreset =
        import.meta.env
          .VITE_CLOUDINARY_UPLOAD_PRESET;

      if (
        !cloudName ||
        !uploadPreset
      ) {

        throw new Error(
          "Cloudinary configuration is missing. Please check your environment variables."
        );
      }

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "upload_preset",
        uploadPreset
      );

      const response =
        await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

      if (
        !response.ok
      ) {

        let cloudinaryError =
          "The payment screenshot could not be uploaded to Cloudinary.";

        try {

          const errorData =
            await response.json();

          if (
            errorData?.error?.message
          ) {

            cloudinaryError =
              errorData
                .error
                .message;
          }

        } catch {
          // Keep default message.
        }

        throw new Error(
          cloudinaryError
        );
      }

      const data =
        await response.json();

      if (
        !data.secure_url
      ) {

        throw new Error(
          "Cloudinary did not return a valid image URL."
        );
      }

      return {
        url:
          data.secure_url,

        publicId:
          data.public_id ||
          "",
      };
    };


  /* =========================================================
     SUBMIT DONATION
     
     IMPORTANT:
     One donationId is generated and used in BOTH:
     
     donations/{donationId}
     donations_ledger/{donationId}
     
     This makes it possible to delete both
     using the same ID.
  ========================================================= */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setErrorMessage("");

      setSuccessMessage("");

      const isValid =
        validateForm();

      if (
        !isValid
      ) {

        setErrorMessage(
          "Please fix the errors marked in the form before submitting."
        );

        return;
      }

      setIsSubmitting(
        true
      );

      try {

        let cloudinaryUrl =
          "";

        let cloudinaryPublicId =
          "";


        /* ============================================
           UPLOAD SCREENSHOT
        ============================================ */

        if (
          donorForm.paymentScreenshot
        ) {

          setUploadProgress(
            true
          );

          const uploadResult =
            await uploadToCloudinary(
              donorForm.paymentScreenshot
            );

          cloudinaryUrl =
            uploadResult.url;

          cloudinaryPublicId =
            uploadResult.publicId;

          setUploadProgress(
            false
          );
        }


        /* ============================================
           DONOR NAME
        ============================================ */

        const donorName =
          `${donorForm.firstName.trim()} ${donorForm.lastName.trim()}`;


        /* ============================================
           GENERATE ONE UNIQUE DONATION ID
           
           This same ID will be used for:
           
           donations/{donationId}
           donations_ledger/{donationId}
        ============================================ */

        const donationRef =
          doc(
            collection(
              db,
              "donations"
            )
          );

        const donationId =
          donationRef.id;


        /* ============================================
           DONATION DATA
        ============================================ */

        const donationData = {

          donationId,

          donorName,

          name:
            donorName,

          email:
            donorForm.email.trim(),

          userId:
            currentUser?.uid ||
            null,

          amount:
            Number(
              finalAmount
            ),

          donationAmount:
            Number(
              finalAmount
            ),

          currency,

          paymentMethod,

          donationMessage:
            donorForm
              .donationMessage
              .trim(),

          screenshotUrl:
            cloudinaryUrl ||
            "",

          cloudinaryPublicId:
            cloudinaryPublicId ||
            "",

          status:
            "Pending",

          causeId:
            selectedSupport,

          causeCategory:
            activeTab,

          type:
            donationType,

          frequency:
            donationType ===
            "recurring"
              ? frequency
              : "one-time",

          donorInfo: {

            firstName:
              donorForm
                .firstName
                .trim(),

            lastName:
              donorForm
                .lastName
                .trim(),

            email:
              donorForm
                .email
                .trim(),

            phone:
              donorForm
                .phone
                .trim(),

            address:
              donorForm
                .addressLine1
                .trim(),

            city:
              donorForm
                .city
                .trim(),

            country:
              donorForm.country ===
              "Other"
                ? donorForm
                    .otherCountry
                    .trim()
                : donorForm.country,
          },

          timestamp:
            serverTimestamp(),

          date:
            new Date()
              .toLocaleDateString(),
        };


        /* ============================================
           SAVE TO DONATIONS
        ============================================ */

        await setDoc(
          doc(
            db,
            "donations",
            donationId
          ),
          donationData
        );


        /* ============================================
           SAVE SAME DONATION TO LEDGER
           
           SAME donationId
        ============================================ */

        await setDoc(
          doc(
            db,
            "donations_ledger",
            donationId
          ),
          donationData
        );


        /* ============================================
           CLEAR FORM
        ============================================ */

        setDonorForm({
          ...initialDonor,
        });

        setPersonalDetailsCleared(
          true
        );

        setFormErrors(
          {}
        );


        /* ============================================
           SHOW SUCCESS PAGE
        ============================================ */

        setDonationSubmitted(
          true
        );

        setSuccessMessage(
          "Donation submitted successfully!"
        );

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

      } catch (
        error
      ) {

        console.error(
          "Error submitting donation:",
          error
        );

        if (
          error.message
            ?.toLowerCase()
            .includes(
              "cloudinary"
            )
        ) {

          setErrorMessage(
            `Payment screenshot upload failed: ${error.message}`
          );

        } else if (
          error.code ===
            "permission-denied" ||
          error.code ===
            "firestore/permission-denied"
        ) {

          setErrorMessage(
            "We could not save your donation because Firebase denied the request. Please check your Firestore Security Rules."
          );

        } else {

          setErrorMessage(
            error.message ||
              "We could not submit your donation. Please try again."
          );
        }

      } finally {

        setIsSubmitting(
          false
        );

        setUploadProgress(
          false
        );
      }
    };


  /* =========================================================
     DELETE DONATION + LEDGER
     
     This function deletes:
     
     donations/{donationId}
     donations_ledger/{donationId}
     
     at the same time.
  ========================================================= */

  const deleteDonation =
    async (
      donationId
    ) => {

      if (
        !donationId
      ) {

        throw new Error(
          "Donation ID is missing."
        );
      }

      try {

        const batch =
          writeBatch(
            db
          );


        /* ============================================
           MAIN DONATION
        ============================================ */

        const donationRef =
          doc(
            db,
            "donations",
            donationId
          );


        /* ============================================
           DONATION LEDGER
        ============================================ */

        const ledgerRef =
          doc(
            db,
            "donations_ledger",
            donationId
          );


        /* ============================================
           DELETE BOTH
        ============================================ */

        batch.delete(
          donationRef
        );

        batch.delete(
          ledgerRef
        );


        /* ============================================
           COMMIT BOTH DELETIONS
        ============================================ */

        await batch.commit();

        console.log(
          "Donation and donation ledger deleted successfully:",
          donationId
        );

        return true;

      } catch (
        error
      ) {

        console.error(
          "Error deleting donation and ledger:",
          error
        );

        throw error;
      }
    };


  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout =
    async () => {

      try {

        await signOut(
          auth
        );

        setDropdownOpen(
          false
        );

        setPersonalDetailsCleared(
          false
        );

        setDonorForm(
          initialDonor
        );

        setPageView(
          "donate"
        );

      } catch (
        error
      ) {

        console.error(
          "Logout execution failed:",
          error
        );
      }
    };


  /* =========================================================
     NEW DONATION
  ========================================================= */

  const handleNewDonation =
    () => {

      setDonationSubmitted(
        false
      );

      setSuccessMessage(
        ""
      );

      setErrorMessage(
        ""
      );

      setFormErrors(
        {}
      );

      setDonorForm(
        initialDonor
      );

      setPersonalDetailsCleared(
        true
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };


  /* =========================================================
     SIGN IN PAGE
  ========================================================= */

  if (
    pageView ===
    "signin"
  ) {

    return (

      <div className="min-h-screen bg-[#f5f7fb]">

        <DonateHeader
          onOpenSignIn={() =>
            setPageView(
              "signin"
            )
          }
          onOpenRegister={() =>
            setPageView(
              "register"
            )
          }
        />

        <SignInFormPage
          onGoToRegister={() =>
            setPageView(
              "register"
            )
          }
          onSuccess={() =>
            setPageView(
              "donate"
            )
          }
        />

        <ClubFinderFooter />

      </div>
    );
  }


  /* =========================================================
     REGISTER PAGE
  ========================================================= */

  if (
    pageView ===
    "register"
  ) {

    return (

      <div className="min-h-screen bg-[#f5f7fb]">

        <DonateHeader
          onOpenSignIn={() =>
            setPageView(
              "signin"
            )
          }
          onOpenRegister={() =>
            setPageView(
              "register"
            )
          }
        />

        <RegisterFormPage
          onGoToSignIn={() =>
            setPageView(
              "signin"
            )
          }
          onSuccess={() =>
            setPageView(
              "donate"
            )
          }
        />

        <ClubFinderFooter />

      </div>
    );
  }


  /* =========================================================
     SUCCESS PAGE
  ========================================================= */

  if (
    donationSubmitted
  ) {

    return (

      <div className="min-h-screen bg-[#f5f7fb] text-slate-900">

        <DonateHeader
          onOpenSignIn={() =>
            setPageView(
              "signin"
            )
          }
          onOpenRegister={() =>
            setPageView(
              "register"
            )
          }
        />

        <main className="mx-auto max-w-[980px] px-4 py-16 sm:px-8">

          <div className="overflow-hidden rounded-[34px] border border-emerald-200 bg-white p-7 text-center shadow-[0_30px_90px_rgba(15,23,42,0.10)] sm:p-12">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">

              <CheckCircle2 className="h-12 w-12" />

            </div>

            <h1 className="mt-7 text-[34px] font-extrabold tracking-tight text-[#243f57] sm:text-[52px]">

              Thank you for your donation

            </h1>

            <p className="mx-auto mt-4 max-w-[700px] text-[17px] leading-8 text-slate-600">

              {successMessage ||
                "Your donation information has been successfully registered."}

            </p>

            <div className="mx-auto mt-8 max-w-[720px] rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left space-y-3">

              <div className="flex justify-between border-b pb-2">

                <span className="font-bold">
                  Allocated Cause:
                </span>

                <span>
                  {
                    selectedSupportCard?.title
                  }
                </span>

              </div>

              <div className="flex justify-between border-b pb-2">

                <span className="font-bold">
                  Amount:
                </span>

                <span>
                  {currency}{" "}
                  {finalAmount}
                </span>

              </div>

              <div className="flex justify-between border-b pb-2">

                <span className="font-bold">
                  Type:
                </span>

                <span className="capitalize">
                  {donationType}
                </span>

              </div>

            </div>

            <button
              type="button"
              onClick={
                handleNewDonation
              }
              className="mt-8 rounded-2xl bg-[#0d58ad] px-8 py-4 text-[16px] font-bold text-white transition hover:bg-[#0b4ba1]"
            >
              Make Another Donation
            </button>

          </div>

        </main>

        <ClubFinderFooter />

      </div>
    );
  }


  /* =========================================================
     MAIN DONATION PAGE
  ========================================================= */

  return (

    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">

      <DonateHeader
        onOpenSignIn={() =>
          setPageView(
            "signin"
          )
        }
        onOpenRegister={() =>
          setPageView(
            "register"
          )
        }
      />

      <main className="mx-auto max-w-[1460px] px-4 py-10 sm:px-8 lg:py-14">

        {errorMessage && (

          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">

            {errorMessage}

          </div>
        )}


        <form
          onSubmit={
            handleSubmit
          }
          className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px] lg:items-start"
        >

          <div className="space-y-8 overflow-hidden rounded-[26px] border border-slate-300 bg-white shadow-sm sm:rounded-[34px]">


            {/* ============================================
               HEADER
            ============================================ */}

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

                  Make a secure manual donation using bank transfer or WorldRemit. Only first name and last name are required.

                </p>

              </div>

            </div>


            {/* ============================================
               SUPPORT
            ============================================ */}

            <div className="border-t border-slate-300">

              <DonateSectionTitle
                title="Choose what you would like to support"
              />

              <div className="px-5 py-9 sm:px-8 lg:px-14">

                <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-b border-slate-300 pb-4 text-[14px] font-bold text-slate-500 sm:flex sm:flex-wrap sm:items-center sm:gap-4 sm:text-[16px]">

                  {supportTabs.map(
                    (tab) => (

                      <button
                        key={tab}
                        type="button"
                        onClick={() =>
                          changeTab(
                            tab
                          )
                        }
                        className={`rounded-xl px-2 py-3 text-left transition sm:rounded-none sm:px-0 sm:pb-4 ${
                          activeTab ===
                          tab
                            ? "bg-[#eef6ff] text-[#0d58ad] sm:border-b-[3px] sm:border-[#0d58ad] sm:bg-transparent"
                            : "hover:bg-slate-50 hover:text-[#0d58ad] sm:hover:bg-transparent"
                        }`}
                      >

                        {tab}

                      </button>

                    )
                  )}

                </div>

                <p className="mt-7 max-w-[900px] text-[16px] leading-7 text-[#243f57] sm:text-[18px] sm:leading-8">

                  {
                    supportData[
                      activeTab
                    ]?.intro
                  }

                </p>

                <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                  {currentCards.map(
                    (card) => (

                      <OptionCard
                        key={card.id}
                        title={
                          card.title
                        }
                        description={
                          card.description
                        }
                        selected={
                          selectedSupport ===
                          card.id
                        }
                        onSelect={() =>
                          setSelectedSupport(
                            card.id
                          )
                        }
                        staticDescription
                      />

                    )
                  )}

                </div>

              </div>

            </div>


            {/* ============================================
               DONATION DETAILS
            ============================================ */}

            <div className="border-t border-slate-300">

              <DonateSectionTitle
                title="Donation details"
              />

              <div className="space-y-8 px-5 py-9 sm:px-8 lg:px-14">

                <SelectField
                  label="Select your currency"
                  value={
                    currency
                  }
                  onChange={(e) =>
                    setCurrency(
                      e.target.value
                    )
                  }
                  options={
                    currencies
                  }
                />

                <div>

                  <label className="mb-4 block text-[17px] font-bold text-[#243f57] sm:text-[18px]">

                    Select donation type

                  </label>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {donationTypes.map(
                      (type) => (

                        <OptionCard
                          key={type.id}
                          title={
                            type.title
                          }
                          description={
                            type.id ===
                            "one-time"
                              ? "Give once today to support your selected cause."
                              : "Give repeatedly and support long-term impact."
                          }
                          selected={
                            donationType ===
                            type.id
                          }
                          onSelect={() => {

                            setDonationType(
                              type.id
                            );

                            if (
                              type.id ===
                              "one-time"
                            ) {

                              setFrequency(
                                ""
                              );
                            }

                          }}
                          compact
                          staticDescription
                        />

                      )
                    )}

                  </div>

                  {donationType ===
                    "recurring" && (

                    <div className="mt-6">

                      <SelectField
                        label="Choose frequency"
                        value={
                          frequency
                        }
                        onChange={(e) =>
                          setFrequency(
                            e.target.value
                          )
                        }
                        options={[
                          "monthly",
                          "quarterly",
                          "annually",
                        ]}
                        optionLabels={{
                          monthly:
                            "Monthly",
                          quarterly:
                            "Quarterly",
                          annually:
                            "Annually",
                        }}
                      />

                    </div>
                  )}

                </div>


                <div>

                  <label className="mb-4 block text-[17px] font-bold text-[#243f57] sm:text-[18px]">

                    Select amount

                  </label>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">

                    {amountOptions.map(
                      (amount) => (

                        <AmountCard
                          key={amount}
                          amount={
                            amount
                          }
                          selected={
                            selectedAmount ===
                            amount
                          }
                          onSelect={() =>
                            setSelectedAmount(
                              amount
                            )
                          }
                        />

                      )
                    )}

                  </div>

                  {selectedAmount ===
                    "Other" && (

                    <div className="mt-5">

                      <InputField
                        label="Enter custom amount"
                        type="number"
                        value={
                          customAmount
                        }
                        onChange={(e) => {

                          setCustomAmount(
                            e.target.value
                          );

                          if (
                            formErrors.amount
                          ) {

                            setFormErrors(
                              (
                                prev
                              ) => ({
                                ...prev,
                                amount:
                                  "",
                              })
                            );
                          }

                        }}
                        error={
                          formErrors.amount
                        }
                      />

                    </div>
                  )}

                  {formErrors.amount &&
                    selectedAmount !==
                      "Other" && (

                    <p className="mt-1.5 text-xs font-semibold text-rose-600">

                      {
                        formErrors.amount
                      }

                    </p>
                  )}

                </div>

              </div>

            </div>


            {/* ============================================
               PAYMENT DETAILS
            ============================================ */}

            <div className="border-t border-slate-300">

              <DonateSectionTitle
                title="Payment details"
              />

              <div className="px-5 py-9 sm:px-8 lg:px-14">

                <div className="rounded-xl border border-slate-300 bg-slate-50 p-5">

                  <div>

                    <h3 className="text-[18px] font-bold text-[#243f57]">

                      Payment Method

                    </h3>

                    <p className="text-sm text-slate-500">

                      Bank transfer and WorldRemit options only.

                    </p>

                  </div>


                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                    {bankAccounts.map(
                      (bank) => (

                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => {

                            setPaymentMethod(
                              bank.id
                            );

                            if (
                              formErrors.paymentMethod
                            ) {

                              setFormErrors(
                                (
                                  prev
                                ) => ({
                                  ...prev,
                                  paymentMethod:
                                    "",
                                })
                              );
                            }

                          }}
                          className={`inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border px-4 text-[15px] font-bold transition ${
                            paymentMethod ===
                            bank.id
                              ? "border-[#0d58ad] bg-[#eef6ff] text-[#0d58ad]"
                              : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                          }`}
                        >

                          <Landmark className="h-4 w-4" />

                          {
                            bank.currency
                          }

                        </button>

                      )
                    )}


                    <button
                      type="button"
                      onClick={() => {

                        setPaymentMethod(
                          "worldremit"
                        );

                        if (
                          formErrors.paymentMethod
                        ) {

                          setFormErrors(
                            (
                              prev
                            ) => ({
                              ...prev,
                              paymentMethod:
                                "",
                            })
                          );
                        }

                      }}
                      className={`inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border px-4 text-[15px] font-bold transition ${
                        paymentMethod ===
                        "worldremit"
                          ? "border-amber-500 bg-amber-50 text-amber-900"
                          : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                      }`}
                    >

                      <Smartphone className="h-4 w-4" />

                      WorldRemit

                    </button>

                  </div>


                  {formErrors.paymentMethod && (

                    <p className="mt-1.5 text-xs font-semibold text-rose-600">

                      {
                        formErrors.paymentMethod
                      }

                    </p>

                  )}


                  {paymentMethod !==
                    "worldremit" &&
                    selectedBank && (

                    <PaymentBox
                      title={
                        selectedBank.title
                      }
                    >

                      <DetailCard
                        label="Bank name"
                        value={
                          selectedBank.bankName
                        }
                      />

                      <DetailCard
                        label="Account name"
                        value={
                          selectedBank.accountName
                        }
                      />

                      <DetailCard
                        label="Account number"
                        value={
                          selectedBank.accountNumber
                        }
                      />

                      <DetailCard
                        label="SWIFT / BIC"
                        value={
                          selectedBank.swiftCode
                        }
                      />

                      <DetailCard
                        label="Branch"
                        value={
                          selectedBank.branch
                        }
                      />

                    </PaymentBox>

                  )}


                  {paymentMethod ===
                    "worldremit" && (

                    <PaymentBox
                      title="WorldRemit Uganda Payment"
                      yellow
                    >

                      <DetailCard
                        label="Provider"
                        value={
                          worldRemitDetails.provider
                        }
                      />

                      <DetailCard
                        label="Account name"
                        value={
                          worldRemitDetails.accountName
                        }
                      />

                      <DetailCard
                        label="Uganda number"
                        value={
                          worldRemitDetails.phoneNumber
                        }
                      />

                      <DetailCard
                        label="Currency"
                        value={
                          worldRemitDetails.currency
                        }
                      />

                    </PaymentBox>

                  )}

                </div>

              </div>

            </div>


            {/* ============================================
               PERSONAL DETAILS
            ============================================ */}

            <div className="border-t border-slate-300">

              <DonateSectionTitle
                title="Personal details"
              />

              <div className="grid grid-cols-1 gap-6 px-5 py-9 sm:grid-cols-2 sm:px-8 lg:px-14">

                <InputField
                  label="First Name *"
                  value={
                    donorForm.firstName
                  }
                  onChange={(e) =>
                    updateDonorField(
                      "firstName",
                      e.target.value
                    )
                  }
                  error={
                    formErrors.firstName
                  }
                />

                <InputField
                  label="Last Name *"
                  value={
                    donorForm.lastName
                  }
                  onChange={(e) =>
                    updateDonorField(
                      "lastName",
                      e.target.value
                    )
                  }
                  error={
                    formErrors.lastName
                  }
                />

                <InputField
                  label="Email Address *"
                  type="email"
                  value={
                    donorForm.email
                  }
                  onChange={(e) =>
                    updateDonorField(
                      "email",
                      e.target.value
                    )
                  }
                  error={
                    formErrors.email
                  }
                />

                <InputField
                  label="Phone Number (optional)"
                  value={
                    donorForm.phone
                  }
                  onChange={(e) =>
                    updateDonorField(
                      "phone",
                      e.target.value
                    )
                  }
                />

                <InputField
                  className="sm:col-span-2"
                  label="Donation Message (optional)"
                  value={
                    donorForm.donationMessage
                  }
                  onChange={(e) =>
                    updateDonorField(
                      "donationMessage",
                      e.target.value
                    )
                  }
                  placeholder="Add a personal dedication or message"
                />

                <InputField
                  className="sm:col-span-2"
                  label="Address (optional)"
                  value={
                    donorForm.addressLine1
                  }
                  onChange={(e) =>
                    updateDonorField(
                      "addressLine1",
                      e.target.value
                    )
                  }
                />

                <InputField
                  label="City (optional)"
                  value={
                    donorForm.city
                  }
                  onChange={(e) =>
                    updateDonorField(
                      "city",
                      e.target.value
                    )
                  }
                />

                <SelectField
                  label="Country (optional)"
                  value={
                    donorForm.country
                  }
                  onChange={(e) =>
                    updateDonorField(
                      "country",
                      e.target.value
                    )
                  }
                  options={[
                    "",
                    ...countries,
                  ]}
                  optionLabels={{
                    "":
                      "Select country",
                  }}
                />

                {donorForm.country ===
                  "Other" && (

                  <InputField
                    className="sm:col-span-2"
                    label="Specify Country"
                    value={
                      donorForm.otherCountry
                    }
                    onChange={(e) =>
                      updateDonorField(
                        "otherCountry",
                        e.target.value
                      )
                    }
                  />

                )}

                <FileUpload
                  className="sm:col-span-2"
                  file={
                    donorForm.paymentScreenshot
                  }
                  onChange={(file) =>
                    updateDonorField(
                      "paymentScreenshot",
                      file
                    )
                  }
                />

              </div>

            </div>

          </div>


          {/* ============================================
             DONATION SUMMARY
          ============================================ */}

          <div className="h-fit space-y-6 lg:sticky lg:top-8">

            <div className="relative rounded-2xl border border-slate-300 bg-white p-6 shadow-md">

              <h3 className="flex items-center justify-between border-b border-slate-100 pb-4 text-[20px] font-bold text-[#243f57]">

                <span>
                  Donation Summary
                </span>

                {currentUser && (

                  <div className="relative">

                    <button
                      type="button"
                      onClick={() =>
                        setDropdownOpen(
                          !dropdownOpen
                        )
                      }
                      className="flex items-center gap-1 rounded-full p-0.5 transition hover:ring-2 hover:ring-[#0d58ad]/30 focus:outline-none"
                    >

                      {currentUser.photoURL ? (

                        <img
                          src={
                            currentUser.photoURL
                          }
                          alt="User Avatar"
                          className="h-8 w-8 rounded-full border border-slate-300 object-cover"
                        />

                      ) : (

                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-[#eef6ff] text-[#0d58ad]">

                          <User className="h-4 w-4" />

                        </div>

                      )}

                      <ChevronDown className="h-4 w-4 text-slate-500" />

                    </button>


                    {dropdownOpen && (

                      <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 text-left shadow-xl">

                        <div className="mb-1 max-w-full truncate border-b border-slate-100 px-3 py-2 text-xs font-medium text-slate-500">

                          {
                            currentUser.email
                          }

                        </div>

                        <button
                          type="button"
                          onClick={
                            handleLogout
                          }
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-bold text-rose-600 transition hover:bg-rose-50"
                        >

                          <LogOut className="h-4 w-4" />

                          Log Out

                        </button>

                      </div>

                    )}

                  </div>

                )}

              </h3>


              <div className="mt-4 space-y-4 text-sm">

                <div className="flex justify-between border-b border-slate-100 pb-2">

                  <span className="text-slate-500">
                    Selected Cause
                  </span>

                  <span className="max-w-[200px] truncate text-right font-semibold text-[#243f57]">

                    {
                      selectedSupportCard?.title
                    }

                  </span>

                </div>


                <div className="flex justify-between border-b border-slate-100 pb-2">

                  <span className="text-slate-500">
                    Frequency
                  </span>

                  <span className="font-semibold capitalize text-[#243f57]">

                    {donationType ===
                    "recurring"
                      ? frequency ||
                        "recurring"
                      : "One-time"}

                  </span>

                </div>


                <div className="flex items-center justify-between pt-2 text-base">

                  <span className="font-bold text-[#243f57]">

                    Total Amount

                  </span>

                  <span className="text-[22px] font-black text-[#0d58ad]">

                    {currency ===
                    "US Dollar"
                      ? "$"
                      : currency ===
                        "Euro"
                      ? "€"
                      : ""}{" "}

                    {finalAmount ||
                      "0"}

                  </span>

                </div>

              </div>


              <button
                type="submit"
                disabled={
                  isSubmitting
                }
                className="mt-6 inline-flex h-[56px] w-full cursor-pointer items-center justify-center rounded-xl bg-[#d10058] text-[16px] font-bold uppercase tracking-wider text-white transition hover:bg-[#b1004b] disabled:cursor-not-allowed disabled:bg-slate-300"
              >

                {isSubmitting ? (

                  <span className="flex items-center gap-2">

                    <LoaderCircle className="h-5 w-5 animate-spin" />

                    {uploadProgress
                      ? "Uploading Screenshot..."
                      : "Submitting..."}

                  </span>

                ) : (

                  <span className="flex items-center gap-2">

                    Submit Donation

                    <ArrowRight className="h-5 w-5" />

                  </span>

                )}

              </button>


              <div className="mt-4 flex items-center justify-center gap-2 text-[12px] font-medium text-slate-500">

                <ShieldCheck className="h-4 w-4 text-emerald-600" />

                Secure data verification.

              </div>

            </div>

          </div>

        </form>

      </main>

      <ClubFinderFooter />

    </div>
  );
}


/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
  label,
  error,
  className = "",
  type = "text",
  ...props
}) {

  return (

    <div
      className={
        className
      }
    >

      <label className="mb-2 block text-[15px] font-bold text-[#243f57]">

        {label}

      </label>

      <input
        type={type}
        {...props}
        className="h-[52px] w-full rounded-xl border border-slate-300 bg-white px-4 text-[16px] text-[#243f57] outline-none transition-all focus:border-[#0d58ad]"
      />

      {error && (

        <p className="mt-1.5 text-xs font-semibold text-rose-600">

          {error}

        </p>

      )}

    </div>
  );
}


/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
  label,
  value,
  onChange,
  options,
  optionLabels = {},
}) {

  return (

    <div>

      <label className="mb-2 block text-[15px] font-bold text-[#243f57]">

        {label}

      </label>

      <div className="relative">

        <select
          value={value}
          onChange={onChange}
          className="h-[52px] w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-[16px] text-[#243f57] outline-none focus:border-[#0d58ad]"
        >

          {options.map(
            (item) => (

              <option
                key={item}
                value={item}
              >

                {
                  optionLabels[
                    item
                  ] ||
                  item
                }

              </option>

            )
          )}

        </select>

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

      </div>

    </div>
  );
}


/* =========================================================
   FILE UPLOAD
========================================================= */

function FileUpload({
  file,
  onChange,
  className = "",
}) {

  return (

    <div
      className={
        className
      }
    >

      <label className="mb-2 block text-[15px] font-bold text-[#243f57]">

        Upload screenshot of paid donation (optional)

      </label>

      <label className="flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition hover:bg-slate-100/50">

        <UploadCloud className="h-8 w-8 text-slate-400" />

        <span className="mt-2 text-[15px] font-semibold text-slate-700">

          {file
            ? file.name
            : "Click to upload payment screenshot"}

        </span>

        <span className="mt-1 text-[13px] text-slate-500">

          PNG, JPG, JPEG or PDF

        </span>

        <input
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) =>
            onChange(
              e.target.files?.[0] ||
                null
            )
          }
        />

      </label>

    </div>
  );
}


/* =========================================================
   PAYMENT BOX
========================================================= */

function PaymentBox({
  title,
  children,
  yellow = false,
}) {

  return (

    <div
      className={`mt-6 rounded-xl border p-5 ${
        yellow
          ? "border-amber-200 bg-amber-50/70"
          : "border-emerald-200 bg-emerald-50/60"
      }`}
    >

      <h4 className="mb-4 text-[16px] font-bold text-[#243f57]">

        {title}

      </h4>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {children}

      </div>

    </div>
  );
}


/* =========================================================
   DETAIL CARD
========================================================= */

function DetailCard({
  label,
  value,
}) {

  return (

    <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">

      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">

        {label}

      </div>

      <div className="mt-1 break-all text-[15px] font-bold text-[#243f57]">

        {value}

      </div>

    </div>
  );
}
