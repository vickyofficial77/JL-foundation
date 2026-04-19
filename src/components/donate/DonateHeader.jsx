import { Globe, UserCircle2, Search, ExternalLink, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function DonateHeader({ onOpenSignIn, onOpenRegister }) {
  const navigate = useNavigate();

  return (
    <header className="border-y border-slate-300 bg-white">
      <div className="mx-auto max-w-[1800px]">
        <div className="flex flex-wrap items-center justify-end gap-4 px-4 py-5 text-[14px] text-slate-700 sm:px-8">
          <a href="#" className="inline-flex items-center gap-2 hover:text-sky-700">
            Rotary.org
            <ExternalLink className="h-4 w-4" />
          </a>
          <a href="#" className="hidden items-center gap-2 hover:text-sky-700 md:inline-flex">
            Brand Center
            <ExternalLink className="h-4 w-4" />
          </a>
          <a href="#" className="inline-flex items-center gap-2 hover:text-sky-700">
            <Globe className="h-4 w-4" />
            English
            <ChevronDown className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={onOpenSignIn}
            className="inline-flex items-center gap-2 hover:text-sky-700"
          >
            <UserCircle2 className="h-5 w-5" />
            Sign In
          </button>
          <span className="hidden text-slate-300 sm:inline">|</span>
          <button
            type="button"
            onClick={onOpenRegister}
            className="hover:text-sky-700"
          >
            Register
          </button>
        </div>

        <div className="flex flex-col gap-6 px-4 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-500 text-amber-500">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
                </svg>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-[22px] font-bold text-blue-900">Jeanluc</div>
                <div className="h-14 w-px bg-slate-300" />
                <div className="text-[22px] font-medium text-sky-700">My Jeanluc</div>
              </div>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button className="inline-flex h-[56px] items-center justify-center rounded-full bg-[#0f4ca1] px-10 text-[18px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0b3d84] hover:shadow-lg">
              Donate
            </button>

            <button
              type="button"
              onClick={() => navigate("/get-involved")}
              className="inline-flex h-[56px] items-center justify-center rounded-full bg-[#cbe7f3] px-10 text-[18px] font-semibold text-[#0f4ca1] transition hover:bg-[#b7deef]"
            >
              Get Involved
            </button>

            <button className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-500 text-slate-700 transition hover:bg-slate-100">
              <Search className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}