import { Globe, ExternalLink, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function GetInvolvedHeader() {
  return (
    <header className="border-y border-slate-300 bg-white">
      <div className="mx-auto max-w-[1800px]">
        <div className="flex flex-wrap items-center justify-end gap-6 px-4 py-5 text-[14px] font-semibold text-[#243f57] sm:px-8">
          <a href="#" className="inline-flex items-center gap-2 hover:text-[#0f4ca1]">
            Rotary.org
            <ExternalLink className="h-4 w-4" />
          </a>

          <a href="#" className="inline-flex items-center gap-2 hover:text-[#0f4ca1]">
            My Rotary
            <ExternalLink className="h-4 w-4" />
          </a>

          <a href="#" className="inline-flex items-center gap-2 hover:text-[#0f4ca1]">
            <Globe className="h-4 w-4" />
            English (US)
            <ChevronDown className="h-4 w-4" />
          </a>
        </div>

        <div className="flex items-center px-4 py-8 sm:px-8">
          <Link to="/" className="flex items-center gap-4">
            <div className="text-[34px] font-bold tracking-tight text-[#17479d]">
              Jeanluc
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-amber-500 text-amber-500">
              <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current stroke-2">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}