import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { db, auth } from "../../firebase/config";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function SignInFormPage({
  onGoToRegister,
  onSuccess,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [localError, setLocalError] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  // =========================================================
  // EMAIL + PASSWORD LOGIN
  // =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanEmail =
      email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setLocalError(
        "Please enter both email and password."
      );
      return;
    }

    setSubmitting(true);
    setLocalError("");

    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          cleanEmail,
          password
        );

      const user =
        userCredential.user;

      console.log(
        "Successfully signed in:",
        user.email
      );

      if (onSuccess) {
        onSuccess(user);
      }
    } catch (error) {
      console.error(
        "Login processing error:",
        error
      );

      let message =
        "Unable to sign in. Please try again.";

      switch (error.code) {
        case "auth/invalid-email":
          message =
            "The email address is not valid.";
          break;

        case "auth/user-not-found":
          message =
            "No account was found with this email address.";
          break;

        case "auth/wrong-password":
          message =
            "Incorrect password. Please try again.";
          break;

        case "auth/invalid-credential":
          message =
            "Incorrect email or password.";
          break;

        case "auth/user-disabled":
          message =
            "This account has been disabled.";
          break;

        case "auth/too-many-requests":
          message =
            "Too many unsuccessful attempts. Please wait and try again.";
          break;

        case "auth/network-request-failed":
          message =
            "Network error. Please check your internet connection.";
          break;

        default:
          message =
            error.message || message;
      }

      setLocalError(message);
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================================
  // GOOGLE LOGIN
  // =========================================================
  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    setLocalError("");

    try {
      const provider =
        new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      const user =
        result.user;

      console.log(
        "Google authentication successful:",
        user.email
      );

      // -------------------------------------------------------
      // USER FIRESTORE DOCUMENT
      // -------------------------------------------------------
      const userRef = doc(
        db,
        "users",
        user.uid
      );

      const userSnap =
        await getDoc(userRef);

      // -------------------------------------------------------
      // CREATE PROFILE ONLY FOR NEW GOOGLE USERS
      // -------------------------------------------------------
      if (!userSnap.exists()) {

        const displayName =
          user.displayName || "";

        const nameParts =
          displayName
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        const firstName =
          nameParts.length > 0
            ? nameParts[0]
            : "User";

        const lastName =
          nameParts.length > 1
            ? nameParts
                .slice(1)
                .join(" ")
            : "";

        await setDoc(
          userRef,
          {
            uid: user.uid,
            firstName: firstName,
            lastName: lastName,
            displayName: displayName,
            email:
              user.email || "",
            ageEligible:
              "unspecified",
            providerId:
              "google.com",
            photoURL:
              user.photoURL || null,
            createdAt:
              serverTimestamp(),
            updatedAt:
              serverTimestamp(),
          }
        );
      }

      if (onSuccess) {
        onSuccess(user);
      }
    } catch (error) {
      console.error(
        "Google authentication error:",
        error
      );

      let message =
        "Google Sign-In failed. Please try again.";

      switch (error.code) {
        case "auth/popup-closed-by-user":
          message =
            "Google Sign-In was cancelled.";
          break;

        case "auth/popup-blocked":
          message =
            "Your browser blocked the Google Sign-In popup. Please allow popups and try again.";
          break;

        case "auth/cancelled-popup-request":
          message =
            "Another Google Sign-In request is already in progress.";
          break;

        case "auth/account-exists-with-different-credential":
          message =
            "An account already exists with this email using another sign-in method.";
          break;

        case "auth/network-request-failed":
          message =
            "Network error. Please check your internet connection.";
          break;

        default:
          message =
            error.message || message;
      }

      setLocalError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-[540px] px-4 py-16">

      <div className="bg-white p-8 sm:p-10 shadow-sm rounded-3xl border border-slate-200">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <h2 className="text-3xl font-extrabold text-[#243f57] tracking-tight mb-2">
          Sign In
        </h2>

        <p className="text-sm text-slate-500 mb-8">
          Welcome back! Need an account?{" "}

          <button
            type="button"
            onClick={onGoToRegister}
            disabled={submitting}
            className="text-[#0d58ad] font-bold hover:underline disabled:opacity-50"
          >
            Create one here
          </button>
        </p>

        {/* =====================================================
            FORM
        ====================================================== */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* EMAIL */}
          <div>

            <label className="mb-2 block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(
                  e.target.value
                );
                setLocalError("");
              }}
              className="h-[52px] w-full border border-slate-300 rounded-xl px-4 text-[#243f57] text-sm outline-none focus:border-[#0d58ad] focus:ring-1 focus:ring-[#0d58ad] transition-all"
              placeholder="name@example.com"
              disabled={submitting}
              autoComplete="email"
            />

          </div>

          {/* PASSWORD */}
          <div>

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
                value={password}
                onChange={(e) => {
                  setPassword(
                    e.target.value
                  );
                  setLocalError("");
                }}
                className="h-[52px] w-full border border-slate-300 rounded-xl px-4 pr-12 text-[#243f57] text-sm outline-none focus:border-[#0d58ad] focus:ring-1 focus:ring-[#0d58ad] transition-all"
                placeholder="••••••••"
                disabled={submitting}
                autoComplete="current-password"
              />

              {/* VIEW PASSWORD BUTTON */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
                disabled={submitting}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-[#0d58ad] transition"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>

            </div>

          </div>

          {/* ERROR */}
          {localError && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-medium text-rose-600">
              {localError}
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex flex-col gap-3 pt-3">

            {/* EMAIL LOGIN */}
            <button
              type="submit"
              disabled={
                submitting ||
                !email.trim() ||
                !password
              }
              className="inline-flex h-[52px] w-full items-center justify-center rounded-xl bg-[#0d58ad] text-sm font-bold text-white transition hover:bg-[#0b4ba1] disabled:bg-slate-300 cursor-pointer shadow-xs"
            >
              {submitting
                ? "Signing In..."
                : "Sign In"}
            </button>

            {/* GOOGLE LOGIN */}
            <button
              type="button"
              onClick={
                handleGoogleSignIn
              }
              disabled={submitting}
              className="inline-flex h-[52px] w-full items-center justify-center rounded-xl border border-slate-300 bg-white text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:bg-slate-100 disabled:cursor-not-allowed cursor-pointer"
            >

              <svg
                className="mr-3 h-4 w-4"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.33 0 3.357 2.72 1.5 6.664l3.766 3.101z"
                />

                <path
                  fill="#4285F4"
                  d="M23.491 12.275c0-.796-.073-1.564-.205-2.302H12v4.355h6.455a5.514 5.514 0 01-2.391 3.614l3.736 2.895c2.182-2.01 3.441-4.968 3.441-8.562z"
                />

                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.955-1.073 7.941-2.913l-3.736-2.895c-1.036.695-2.364 1.11-4.205 1.11-3.232 0-5.973-2.187-6.95-5.128L1.284 17.27C3.105 21.24 7.227 24 12 24z"
                />

                <path
                  fill="#FBBC05"
                  d="M5.05 14.174a7.123 7.123 0 010-4.348L1.284 6.725a11.933 11.933 0 000 10.55l3.766-3.101z"
                />
              </svg>

              Continue with Google

            </button>

          </div>

        </form>
      </div>

    </main>
  );
}

