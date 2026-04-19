import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Mail } from "lucide-react";

const phoneCodes = ["+250", "+254", "+255", "+256", "+1", "+44"];
const languages = ["English", "French", "Kinyarwanda", "Swahili"];
const countries = ["Rwanda", "Kenya", "Uganda", "Tanzania", "United States", "United Kingdom"];
const ageRanges = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
const genders = ["Female", "Male", "Non-binary", "Prefer not to say"];
const hearOptions = [
  "Friend or family",
  "Social media",
  "Website search",
  "Community event",
  "School or university",
  "Other",
];

export default function SubmitInterestFormPage({ onBackToLanding }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "",
    phone: "",
    preferredContact: "",
    smsAgree: false,
    language: "",
    country: "",
    ageRange: "",
    gender: "",
    heardAbout: "",
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const isStepOneValid = useMemo(() => {
    return (
      form.firstName.trim() &&
      form.lastName.trim() &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.preferredContact &&
      form.language &&
      form.country &&
      form.ageRange &&
      form.gender &&
      form.heardAbout
    );
  }, [form]);

  const validateStepOne = () => {
    const next = {};

    if (!form.firstName.trim()) next.firstName = "First name is required.";
    if (!form.lastName.trim()) next.lastName = "Last name is required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email address.";

    if (form.preferredContact === "phone") {
      if (!form.phoneCode) next.phoneCode = "Select a country code.";
      if (!form.phone.trim()) next.phone = "Phone number is required.";
    }

    if (!form.preferredContact) next.preferredContact = "Choose a preferred contact method.";
    if (!form.language) next.language = "Select a preferred language.";
    if (!form.country) next.country = "Select your country.";
    if (!form.ageRange) next.ageRange = "Select your age range.";
    if (!form.gender) next.gender = "Select your gender.";
    if (!form.heardAbout) next.heardAbout = "Select an option.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleNext = () => {
    if (!validateStepOne()) return;
    setStep(2);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const progressDots = [1, 2, 3, 4];

  return (
    <main className="px-4 py-10 sm:px-8 lg:px-12 lg:py-14">
      <div className="mx-auto max-w-[820px]">
        <div className="mb-14 flex items-center justify-center">
          <div className="flex w-full max-w-[780px] items-center justify-between">
            {progressDots.map((dot, index) => (
              <div key={dot} className="flex flex-1 items-center">
                <div
                  className={`relative z-10 h-5 w-5 rounded-full border-[4px] ${
                    dot <= step ? "border-[#1c4fa3] bg-white" : "border-[#7d7d7d] bg-[#7d7d7d]"
                  }`}
                />
                {index !== progressDots.length - 1 && (
                  <div className="h-[3px] flex-1 bg-[#7d7d7d]" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10 bg-[#d8d8d8] px-5 py-3">
          <h1 className="text-[34px] font-light tracking-tight text-[#1f2d3d] sm:text-[42px]">
            {step === 1 ? "Getting started" : "Review your information"}
          </h1>
        </div>

        {submitted ? (
          <div className="rounded-md border border-emerald-300 bg-emerald-50 px-6 py-6 text-[18px] text-emerald-800">
            Thank you, <strong>{form.firstName}</strong>. Your interest form has been submitted successfully.
          </div>
        ) : step === 1 ? (
          <>
            <p className="text-[18px] leading-[1.55] text-[#1f2d3d] sm:text-[20px]">
              Jeanluc and community clubs accept new members by invitation. Tell us about
              yourself and your interests, and we&apos;ll share your answers with leaders
              who will contact you.
            </p>

            <p className="mt-10 text-[17px] text-[#666]">*indicates a required field</p>

            <div className="mt-10 space-y-10">
              <Field
                label="*First name"
                placeholder="Your first name"
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                error={errors.firstName}
              />

              <Field
                label="*Last Name"
                placeholder="Your last name"
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                error={errors.lastName}
              />

              <div>
                <label className="mb-4 block text-[18px] font-semibold text-[#1f2d3d] sm:text-[20px]">
                  *Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-5 top-1/2 h-7 w-7 -translate-y-1/2 text-[#7a7a7a]" />
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="h-[74px] w-full rounded-[14px] border border-[#c8c8c8] bg-white pl-20 pr-5 text-[20px] text-[#1f2d3d] outline-none transition focus:border-[#1c4fa3]"
                  />
                </div>
                {errors.email && <ErrorText text={errors.email} />}
              </div>

              <SelectField
                label="Phone country code"
                value={form.phoneCode}
                onChange={(e) => updateField("phoneCode", e.target.value)}
                options={phoneCodes}
                placeholder="Select country code"
                error={errors.phoneCode}
              />

              <Field
                label="Phone"
                placeholder="XXXXXXXXXX"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                error={errors.phone}
              />

              <div>
                <label className="mb-4 block text-[18px] font-semibold text-[#1f2d3d] sm:text-[20px]">
                  *Preferred contact
                </label>

                <div className="space-y-4 text-[18px] text-[#1f2d3d] sm:text-[20px]">
                  <label className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="preferredContact"
                      checked={form.preferredContact === "email"}
                      onChange={() => updateField("preferredContact", "email")}
                      className="h-8 w-8 accent-[#1c4fa3]"
                    />
                    Email
                  </label>

                  <label className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="preferredContact"
                      checked={form.preferredContact === "phone"}
                      onChange={() => updateField("preferredContact", "phone")}
                      className="h-8 w-8 accent-[#1c4fa3]"
                    />
                    Phone
                  </label>
                </div>

                {errors.preferredContact && <ErrorText text={errors.preferredContact} />}

                <label className="mt-8 flex items-center gap-4 text-[18px] text-[#1f2d3d] sm:text-[20px]">
                  <input
                    type="checkbox"
                    checked={form.smsAgree}
                    onChange={(e) => updateField("smsAgree", e.target.checked)}
                    className="h-8 w-8 rounded accent-[#1c4fa3]"
                  />
                  I agree to receive SMS messages
                </label>
              </div>

              <SelectField
                label="Preferred language"
                value={form.language}
                onChange={(e) => updateField("language", e.target.value)}
                options={languages}
                placeholder="Select your option"
                error={errors.language}
              />

              <SelectField
                label="*Country"
                value={form.country}
                onChange={(e) => updateField("country", e.target.value)}
                options={countries}
                placeholder="Type and select your option"
                error={errors.country}
              />

              <div>
                <label className="mb-2 block text-[18px] font-semibold text-[#1f2d3d] sm:text-[20px]">
                  *Age range
                </label>
                <p className="mb-4 text-[18px] text-[#666]">
                  Club membership is open to individuals 18 and older
                </p>
                <SelectField
                  value={form.ageRange}
                  onChange={(e) => updateField("ageRange", e.target.value)}
                  options={ageRanges}
                  placeholder="Select your option"
                  error={errors.ageRange}
                  noLabel
                />
              </div>

              <SelectField
                label="*What is your gender?"
                value={form.gender}
                onChange={(e) => updateField("gender", e.target.value)}
                options={genders}
                placeholder="Select your option"
                error={errors.gender}
              />

              <SelectField
                label="How did you hear about Jeanluc?"
                value={form.heardAbout}
                onChange={(e) => updateField("heardAbout", e.target.value)}
                options={hearOptions}
                placeholder="Select your option"
                error={errors.heardAbout}
              />
            </div>

            <div className="mt-12 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex h-[74px] min-w-[260px] items-center justify-center rounded-full bg-[#1c4fa3] px-10 text-[22px] font-semibold text-white transition hover:bg-[#143d80]"
              >
                Next
                <ChevronRight className="ml-3 h-6 w-6" />
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-8 rounded-[16px] border border-[#d7d7d7] bg-white px-6 py-8 sm:px-8">
            <div>
              <h2 className="text-[28px] font-semibold text-[#1f2d3d]">Review your information</h2>
              <p className="mt-2 text-[18px] text-[#555]">
                Please confirm your details before submitting.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 text-[18px] text-[#1f2d3d] sm:grid-cols-2">
              <ReviewItem label="First name" value={form.firstName} />
              <ReviewItem label="Last name" value={form.lastName} />
              <ReviewItem label="Email" value={form.email} />
              <ReviewItem label="Phone code" value={form.phoneCode || "-"} />
              <ReviewItem label="Phone" value={form.phone || "-"} />
              <ReviewItem label="Preferred contact" value={form.preferredContact || "-"} />
              <ReviewItem label="Preferred language" value={form.language} />
              <ReviewItem label="Country" value={form.country} />
              <ReviewItem label="Age range" value={form.ageRange} />
              <ReviewItem label="Gender" value={form.gender} />
              <ReviewItem label="How you heard about us" value={form.heardAbout} />
              <ReviewItem label="SMS messages" value={form.smsAgree ? "Agreed" : "Not agreed"} />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex h-[64px] min-w-[180px] items-center justify-center rounded-full border border-[#1c4fa3] px-8 text-[20px] font-semibold text-[#1c4fa3] transition hover:bg-[#eef4ff]"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex h-[64px] min-w-[220px] items-center justify-center rounded-full bg-[#1c4fa3] px-8 text-[20px] font-semibold text-white transition hover:bg-[#143d80]"
              >
                Submit interest
              </button>
            </div>

            <button
              type="button"
              onClick={onBackToLanding}
              className="text-[17px] font-medium text-[#1c4fa3] hover:underline"
            >
              Return to Get Involved page
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function Field({ label, error, ...props }) {
  return (
    <div>
      <label className="mb-4 block text-[18px] font-semibold text-[#1f2d3d] sm:text-[20px]">
        {label}
      </label>
      <input
        {...props}
        className="h-[74px] w-full rounded-[14px] border border-[#c8c8c8] bg-white px-5 text-[20px] text-[#1f2d3d] outline-none transition focus:border-[#1c4fa3]"
      />
      {error && <ErrorText text={error} />}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  noLabel = false,
}) {
  return (
    <div>
      {!noLabel && label && (
        <label className="mb-4 block text-[18px] font-semibold text-[#1f2d3d] sm:text-[20px]">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="h-[74px] w-full appearance-none rounded-[14px] border border-[#c8c8c8] bg-white px-5 pr-16 text-[20px] text-[#1f2d3d] outline-none transition focus:border-[#1c4fa3]"
        >
          <option value="">{placeholder}</option>
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5">
          <ChevronDown className="h-8 w-8 text-[#6a7480]" />
        </div>
      </div>

      {error && <ErrorText text={error} />}
    </div>
  );
}

function ErrorText({ text }) {
  return <p className="mt-2 text-[15px] text-rose-600">{text}</p>;
}

function ReviewItem({ label, value }) {
  return (
    <div className="rounded-[12px] bg-[#f7f7f7] px-4 py-4">
      <div className="text-[15px] font-semibold uppercase tracking-[0.03em] text-[#6a7480]">
        {label}
      </div>
      <div className="mt-2 text-[18px] font-medium text-[#1f2d3d]">{value}</div>
    </div>
  );
}