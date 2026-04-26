import {
  Globe,
  ExternalLink,
  ChevronDown,
  Search,
  UserCircle2,
  HeartHandshake,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function MyJeanlucHeader() {
  const navigate = useNavigate();

  return (
    <header className="border-y border-slate-300 bg-white">
      <div className="mx-auto max-w-[1800px]">
        <div className="flex flex-wrap items-center justify-end gap-4 px-4 py-5 text-[14px] text-slate-700 sm:px-8">
          <a href="#" className="inline-flex items-center gap-2 hover:text-sky-700">
            Jeanluc Foundation
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

          <Link
            to="/signin"
            className="inline-flex items-center gap-2 hover:text-sky-700"
          >
            <UserCircle2 className="h-5 w-5" />
            Sign In
          </Link>

          <span className="text-slate-300">|</span>

          <Link to="/register" className="hover:text-sky-700">
            Register
          </Link>
        </div>

        <div className="flex flex-col gap-6 px-4 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <Link to="/" className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-500 text-amber-500">
              <HeartHandshake className="h-6 w-6" />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col leading-none">
                <span className="text-[20px] font-bold tracking-tight text-blue-900">
                  Jeanluc
                </span>
                <span className="mt-1 text-[20px] font-bold tracking-tight text-blue-900">
                  Foundation
                </span>
              </div>

              <div className="h-14 w-px bg-slate-300" />

              <div className="text-[22px] font-medium text-sky-700">
                My Jeanluc
              </div>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/donate")}
              className="inline-flex h-[56px] items-center justify-center rounded-full bg-[#0f4ca1] px-10 text-[18px] font-semibold text-white transition hover:border hover:border-[#0f4ca1] hover:bg-white hover:text-[#0f4ca1]"
            >
              Donate
            </button>

            <button
              type="button"
              onClick={() => navigate("/get-involved")}
              className="inline-flex h-[56px] items-center justify-center rounded-full bg-[#cbe7f3] px-10 text-[18px] font-semibold text-[#0f4ca1] transition hover:bg-[#0f4ca1] hover:text-white"
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