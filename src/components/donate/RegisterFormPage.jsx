import { useMemo, useState } from "react";
import {
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  auth,
  db,
} from "../../firebase/config";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function RegisterFormPage({
  onGoToSignIn,
  onSuccess,
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  const [submitting, setSubmitting] =
    useState(false);

  // =========================================================
  // FORM VALIDATION
  // =========================================================

  const isValid = useMemo(() => {
    return (
      form.firstName.trim().length > 0 &&
      form.lastName.trim().length > 0 &&
      /\S+@\S+\.\S+/.test(
        form.email.trim()
      ) &&
      form.password.length >= 6 &&
      (
        form.age === "yes" ||
        form.age === "no"
      )
    );
  }, [form]);

  const validate = () => {
    const next = {};

    if (!form.firstName.trim()) {
      next.firstName =
        "First name is required.";
    }

    if (!form.lastName.trim()) {
      next.lastName =
        "Last name is required.";
    }

    if (!form.email.trim()) {
      next.email =
        "Email address is required.";
    } else if (
      !/\S+@\S+\.\S+/.test(
        form.email.trim()
      )
    ) {
      next.email =
        "Enter a valid email address.";
    }

    if (!form.password) {
      next.password =
        "Password is required.";
    } else if (
      form.password.length < 6
    ) {
      next.password =
        "Password must be at least 6 characters.";
    }

    if (!form.age) {
      next.age =
        "Please choose an option.";
    }

    setErrors(next);

    return (
      Object.keys(next).length === 0
    );
  };

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleInputChange = (
    field,
    value
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((previous) => ({
        ...previous,
        [field]: "",
      }));
    }

    if (errors.form) {
      setErrors((previous) => ({
        ...previous,
        form: "",
      }));
    }
  };

  // =========================================================
  // REGISTER USER
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    setErrors((previous) => ({
      ...previous,
      form: "",
    }));

    try {
      const cleanFirstName =
        form.firstName.trim();

      const cleanLastName =
        form.lastName.trim();

      const cleanEmail =
        form.email
          .trim()
          .toLowerCase();

      // =====================================================
      // CREATE FIREBASE AUTH USER
      // =====================================================

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          cleanEmail,
          form.password
        );

      const user =
        userCredential.user;

      const displayName =
        `${cleanFirstName} ${cleanLastName}`;

      // =====================================================
      // UPDATE FIREBASE AUTH PROFILE
      // =====================================================

      await updateProfile(user, {
        displayName,
      });

      // =====================================================
      // SAVE USER DETAILS IN FIRESTORE
      // users/{user.uid}
      // =====================================================

      await setDoc(
        doc(
          db,
          "users",
          user.uid
        ),
        {
          // Firebase Authentication ID
          uid: user.uid,

          // Personal Information
          firstName:
            cleanFirstName,

          lastName:
            cleanLastName,

          name:
            displayName,

          displayName:
            displayName,

          // Contact
          email:
            user.email ||
            cleanEmail,

          // Age verification
          ageEligible:
            form.age,

          // Authentication provider
          providerId:
            "password",

          // Profile image
          photoURL:
            user.photoURL ||
            null,

          // Account information
          status:
            "Active",

          accountStatus:
            "Active",

          role:
            "user",

          // Timestamps
          createdAt:
            serverTimestamp(),

          updatedAt:
            serverTimestamp(),

          // Readable registration date
          date:
            new Date().toLocaleDateString(),
        },
        {
          merge: true,
        }
      );

      // =====================================================
      // SUCCESS
      // =====================================================

      if (onSuccess) {
        onSuccess(user);
      }
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      let message =
        "Registration failed. Please try again.";

      switch (error.code) {
        case "auth/email-already-in-use":
          message =
            "An account already exists with this email address.";
          break;

        case "auth/invalid-email":
          message =
            "The email address is not valid.";
          break;

        case "auth/weak-password":
          message =
            "The password is too weak. Use at least 6 characters.";
          break;

        case "auth/network-request-failed":
          message =
            "Network error. Please check your internet connection.";
          break;

        case "permission-denied":
          message =
            "You do not have permission to create this user profile.";
          break;

        default:
          message =
            error.message ||
            message;
      }

      setErrors((previous) => ({
        ...previous,
        form: message,
      }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-[700px] px-4 py-16">

      <div className="bg-white p-8 sm:p-10 shadow-sm border border-slate-200 rounded-3xl">

        <h1 className="text-3xl font-extrabold text-[#243f57] tracking-tight mb-2">
          Create an Account
        </h1>

        <p className="text-sm text-slate-500 mb-8">
          Join the platform to track configurations
          and coordinate workflows. Already have
          an account?{" "}

          <button
            type="button"
            onClick={onGoToSignIn}
            disabled={submitting}
            className="text-[#0d58ad] font-bold hover:underline disabled:opacity-50"
          >
            Sign In
          </button>
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {errors.form && (
            <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-3.5 rounded-xl border border-rose-200">
              {errors.form}
            </p>
          )}

          {/* FIRST AND LAST NAME */}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            <Field
              label="First Name"
              error={errors.firstName}
              value={form.firstName}
              onChange={(e) =>
                handleInputChange(
                  "firstName",
                  e.target.value
                )
              }
              placeholder="John"
              disabled={submitting}
              autoComplete="given-name"
            />

            <Field
              label="Last Name"
              error={errors.lastName}
              value={form.lastName}
              onChange={(e) =>
                handleInputChange(
                  "lastName",
                  e.target.value
                )
              }
              placeholder="Doe"
              disabled={submitting}
              autoComplete="family-name"
            />

          </div>

          {/* EMAIL */}

          <Field
            label="Email Address"
            type="email"
            error={errors.email}
            value={form.email}
            onChange={(e) =>
              handleInputChange(
                "email",
                e.target.value
              )
            }
            placeholder="john.doe@example.com"
            disabled={submitting}
            autoComplete="email"
          />

          {/* PASSWORD */}

          <div className="w-full">

            <label className="mb-2 block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={form.password}
                onChange={(e) =>
                  handleInputChange(
                    "password",
                    e.target.value
                  )
                }
                placeholder="••••••••"
                disabled={submitting}
                autoComplete="new-password"
                className="h-[52px] w-full border border-slate-300 bg-white px-4 pr-12 text-sm text-[#243f57] rounded-xl outline-none focus:border-[#0d58ad] focus:ring-1 focus:ring-[#0d58ad] transition-all"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (previous) =>
                      !previous
                  )
                }
                disabled={submitting}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-[#0d58ad] transition"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>

            </div>

            {errors.password && (
              <p className="mt-1.5 text-xs text-rose-600 font-semibold">
                {errors.password}
              </p>
            )}

          </div>

          {/* AGE */}

          <div>

            <label className="mb-3 block text-sm font-bold text-[#243f57]">
              Are you 18 years of age or older?
            </label>

            <div className="flex flex-col gap-2.5 mt-2">

              <label className="flex items-center gap-3 cursor-pointer">

                <input
                  type="radio"
                  name="age_verification"
                  checked={
                    form.age === "yes"
                  }
                  onChange={() =>
                    handleInputChange(
                      "age",
                      "yes"
                    )
                  }
                  className="h-4 w-4 accent-[#0d58ad]"
                  disabled={submitting}
                />

                <span className="text-sm text-slate-700">
                  Yes, I am 18 or older
                </span>

              </label>

              <label className="flex items-center gap-3 cursor-pointer">

                <input
                  type="radio"
                  name="age_verification"
                  checked={
                    form.age === "no"
                  }
                  onChange={() =>
                    handleInputChange(
                      "age",
                      "no"
                    )
                  }
                  className="h-4 w-4 accent-[#0d58ad]"
                  disabled={submitting}
                />

                <span className="text-sm text-slate-700">
                  No, I am under 18
                </span>

              </label>

            </div>

            {errors.age && (
              <p className="mt-1.5 text-xs text-rose-600 font-semibold">
                {errors.age}
              </p>
            )}

          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={
              !isValid ||
              submitting
            }
            className={`inline-flex min-w-[240px] items-center justify-center rounded-xl px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
              isValid && !submitting
                ? "bg-[#0d58ad] text-white hover:bg-[#0b4ba1] hover:shadow-md cursor-pointer"
                : "cursor-not-allowed bg-slate-200 text-slate-400"
            }`}
          >

            <span className="flex items-center gap-2">

              {submitting
                ? "Creating Account..."
                : "Continue"}

              <ChevronRight className="h-4 w-4" />

            </span>

          </button>

        </form>

      </div>

    </main>
  );
}

// =========================================================
// REUSABLE FIELD
// =========================================================

function Field({
  label,
  error,
  type = "text",
  ...props
}) {
  return (
    <div className="w-full">

      <label className="mb-2 block text-xs font-bold text-slate-500 uppercase tracking-wider">
        {label}
      </label>

      <input
        type={type}
        {...props}
        className="h-[52px] w-full border border-slate-300 bg-white px-4 text-sm text-[#243f57] rounded-xl outline-none focus:border-[#0d58ad] focus:ring-1 focus:ring-[#0d58ad] transition-all"
      />

      {error && (
        <p className="mt-1.5 text-xs text-rose-600 font-semibold">
          {error}
        </p>
      )}

    </div>
  );
}