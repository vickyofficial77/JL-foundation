import { useState, useEffect, useRef } from "react";
import {
  UserCircle2,
  Search,
  ExternalLink,
  ChevronDown,
  HeartHandshake,
  LogOut,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function DonateHeader({ onOpenSignIn, onOpenRegister }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user profile data:", error);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignIn = () => {
    if (onOpenSignIn) {
      onOpenSignIn();
      return;
    }
    navigate("/signin");
  };

  const handleRegister = () => {
    if (onOpenRegister) {
      onOpenRegister();
      return;
    }
    navigate("/register");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setDropdownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Extract display name or email prefix
  const displayName =
    userData?.firstName ||
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "My Account";

  return (
    <header className="border-y border-slate-300 bg-white">
      <div className="mx-auto max-w-[1800px]">
        {/* Top Utility Bar */}
        <div className="flex flex-wrap items-center justify-end gap-4 px-4 py-5 text-[14px] text-slate-700 sm:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 transition hover:text-sky-700"
          >
            Jeanluc Foundation
            <ExternalLink className="h-4 w-4" />
          </Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center gap-2 font-medium transition hover:text-sky-700 focus:outline-none"
              >
                <UserCircle2 className="h-5 w-5 text-sky-700" />
                <span>{displayName}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-2 shadow-lg border border-slate-200 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-slate-700 hover:bg-slate-100 transition"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-slate-100 transition"
                  >
                    <LogOut className="h-4 w-4" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSignIn}
                className="inline-flex items-center gap-2 transition hover:text-sky-700"
              >
                <UserCircle2 className="h-5 w-5" />
                Sign In
              </button>

              <span className="hidden text-slate-300 sm:inline">|</span>

              <button
                type="button"
                onClick={handleRegister}
                className="transition hover:text-sky-700"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Main Header Navigation Bar */}
        <div className="flex flex-col gap-6 px-4 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-amber-500 text-amber-500">
              <HeartHandshake className="h-5 w-5" />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col text-left leading-none">
                <span className="text-[18px] font-bold tracking-tight text-blue-900">
                  Jeanluc
                </span>
                <span className="mt-1 text-[18px] font-bold tracking-tight text-blue-900">
                  Foundation
                </span>
              </div>

              <div className="h-12 w-px bg-slate-300" />

              <div className="text-[20px] font-semibold text-sky-700">
                My Jeanluc
              </div>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/donate")}
              className="inline-flex h-[56px] items-center justify-center rounded-full bg-[#0f4ca1] px-10 text-[18px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0b3d84] hover:shadow-lg"
            >
              Donate
            </button>

            <button
              type="button"
              onClick={() => navigate("/get-involved")}
              className="inline-flex h-[56px] items-center justify-center rounded-full bg-[#cbe7f3] px-10 text-[18px] font-semibold text-[#0f4ca1] transition hover:bg-[#b7deef]"
            >
              Get Involved
            </button>

            <button
              type="button"
              onClick={() => navigate("/search")}
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-500 text-slate-700 transition hover:bg-slate-100"
            >
              <Search className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}