import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";

export default function RegisterFormPage({ onGoToSignIn }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    robot: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isValid = useMemo(() => {
    return (
      form.firstName.trim() &&
      form.lastName.trim() &&
      /\S+@\S+\.\S+/.test(form.email) &&
      (form.age === "yes" || form.age === "no") &&
      form.robot
    );
  }, [form]);

  const validate = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = "First name is required.";
    if (!form.lastName.trim()) next.lastName = "Last name is required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.age) next.age = "Please choose an option.";
    if (!form.robot) next.robot = "Please confirm you are not a robot.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <main className="mx-auto max-w-[1320px] px-4 py-10 sm:px-8 lg:py-14">
      <div className="px-4 py-6 sm:px-10 lg:px-16">
        <h2 className="text-[42px] font-light tracking-tight text-[#243f57] sm:text-[56px]">
          Create an Account
        </h2>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-[18px] text-[#243f57]">
          <span>Already have a My Rotary Account?</span>
          <button
            type="button"
            onClick={onGoToSignIn}
            className="inline-flex items-center gap-2 font-bold uppercase text-[#00a0df] hover:text-[#007bb0]"
          >
            Sign In <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="mt-10 rounded-md border border-emerald-300 bg-emerald-50 px-6 py-5 text-[18px] text-emerald-800">
            Account form submitted successfully for <strong>{form.firstName} {form.lastName}</strong>.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <Field
              label="First name*"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              error={errors.firstName}
            />

            <Field
              label="Last name*"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              error={errors.lastName}
            />

            <Field
              label="Email*"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              error={errors.email}
            />

            <div>
              <label className="mb-3 block text-[18px] font-semibold text-[#243f57]">
                Are you 18 years or older?*
              </label>
              <div className="space-y-3 text-[18px] text-[#243f57]">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="age"
                    checked={form.age === "yes"}
                    onChange={() => update("age", "yes")}
                    className="h-6 w-6 accent-[#0d58ad]"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="age"
                    checked={form.age === "no"}
                    onChange={() => update("age", "no")}
                    className="h-6 w-6 accent-[#0d58ad]"
                  />
                  No
                </label>
              </div>
              {errors.age && <p className="mt-2 text-[15px] text-rose-600">{errors.age}</p>}
            </div>

            <div className="border-t border-slate-300 pt-6 text-[18px] leading-8 text-[#243f57]">
              By creating an account, you agree to the{" "}
              <a href="#" className="font-semibold text-[#0d58ad] underline">
                Terms of Use
              </a>{" "}
              and acknowledge our{" "}
              <a href="#" className="font-semibold text-[#0d58ad] underline">
                Privacy Policy
              </a>
              .
            </div>

            <div className="max-w-[320px] rounded border border-slate-300 bg-white px-4 py-4 shadow-sm">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.robot}
                  onChange={(e) => update("robot", e.target.checked)}
                  className="mt-1 h-7 w-7 accent-[#0d58ad]"
                />
                <div>
                  <div className="text-[16px] text-[#243f57]">I&apos;m not a robot</div>
                  <div className="mt-1 text-[12px] text-slate-500">UI simulation only</div>
                </div>
              </label>
            </div>
            {errors.robot && <p className="text-[15px] text-rose-600">{errors.robot}</p>}

            <button
              type="submit"
              disabled={!isValid}
              className={`inline-flex min-w-[270px] items-center justify-center rounded-full px-10 py-4 text-[18px] font-bold uppercase tracking-[0.02em] transition ${
                isValid
                  ? "bg-[#b5bcc4] text-white hover:bg-[#9ca5ae]"
                  : "cursor-not-allowed bg-[#cfd5db] text-white"
              }`}
            >
              Continue
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

function Field({ label, error, ...props }) {
  return (
    <div>
      <label className="mb-3 block text-[18px] font-semibold text-[#243f57]">
        {label}
      </label>
      <input
        {...props}
        className="h-[48px] w-full border border-slate-300 bg-white px-4 text-[18px] text-[#243f57] outline-none transition focus:border-[#0d58ad]"
      />
      {error && <p className="mt-2 text-[15px] text-rose-600">{error}</p>}
    </div>
  );
}