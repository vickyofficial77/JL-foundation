import {
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function SearchPageFooter() {
  return (
    <footer className="mt-14 bg-[#0f4ca1] text-white">
      <div className="mx-auto flex max-w-[1800px] flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link to="/" className="flex items-center gap-4">
            <div className="text-[38px] font-bold tracking-tight">Jeanluc</div>

            <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-white text-white">
              <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current stroke-2">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
              </svg>
            </div>

            <div className="h-12 w-px bg-white/50" />
            <div className="text-[22px] font-medium">My Jeanluc</div>
          </Link>

          <div className="mt-8 flex items-center gap-6 text-[28px]">
            <FaXTwitter />
            <FaYoutube />
            <FaFacebookF />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-10 gap-y-4 text-[16px] font-semibold">
          <a href="#" className="hover:text-sky-200">
            Contact Us
          </a>
          <a href="#" className="inline-flex items-center gap-2 hover:text-sky-200">
            Rotary.org <ExternalLink className="h-4 w-4" />
          </a>
          <a href="#" className="inline-flex items-center gap-2 hover:text-sky-200">
            End Polio Now <ExternalLink className="h-4 w-4" />
          </a>
          <a href="#" className="inline-flex items-center gap-2 hover:text-sky-200">
            Careers <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-white/25 bg-[#2f3b46]">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-6 px-5 py-7 text-[16px] text-white/95 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>©2026 Jeanluc International. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="hover:text-sky-200">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-sky-200">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}