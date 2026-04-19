import { useMemo, useState } from "react";

export default function SignInFormPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isValid = useMemo(
    () => /\S+@\S+\.\S+/.test(form.email) && form.password.trim().length >= 6,
    [form]
  );

  const validate = () => {
    const next = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email.";
    if (form.password.trim().length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <main className="flex min-h-[520px] items-center justify-center px-4 py-14">
      <div className="w-full max-w-[450px] overflow-hidden rounded border border-slate-300 bg-white">
        <div className="h-[68px] border-b border-slate-300 bg-white" />

        <div className="px-8 py-10">
          <h2 className="text-center text-[42px] font-light text-[#243f57]">Sign in</h2>

          {submitted ? (
            <div className="mt-8 rounded-md border border-emerald-300 bg-emerald-50 px-5 py-4 text-[16px] text-emerald-800">
              Signed in successfully as <strong>{form.email}</strong>.
            </div>
          ) : (
            <form onSubmit={submit} className="mt-8 space-y-6">
              <div>
                <label className="mb-2 block text-[16px] font-semibold text-[#243f57]">
                  Login email address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, email: e.target.value }));
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className="h-[44px] w-full border border-slate-300 px-4 text-[17px] outline-none transition focus:border-[#0d58ad]"
                />
                {errors.email && <p className="mt-2 text-[14px] text-rose-600">{errors.email}</p>}
              </div>

              <div>
                <label className="mb-2 block text-[16px] font-semibold text-[#243f57]">
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, password: e.target.value }));
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className="h-[44px] w-full border border-slate-300 px-4 text-[17px] outline-none transition focus:border-[#0d58ad]"
                />
                {errors.password && (
                  <p className="mt-2 text-[14px] text-rose-600">{errors.password}</p>
                )}
              </div>

              <label className="flex items-center gap-3 text-[16px] text-[#7a8694]">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, remember: e.target.checked }))
                  }
                  className="h-5 w-5 accent-[#0d58ad]"
                />
                Remember me
              </label>

              <button
                type="submit"
                disabled={!isValid}
                className={`inline-flex h-[56px] w-full items-center justify-center rounded bg-[#0f7db8] text-[18px] font-semibold text-white transition ${
                  isValid ? "hover:bg-[#0c699a]" : "cursor-not-allowed opacity-60"
                }`}
              >
                Sign in
              </button>

              <a
                href="#"
                className="block text-left text-[16px] text-[#7a8694] transition hover:text-[#0f7db8]"
              >
                Need help signing in?
              </a>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}