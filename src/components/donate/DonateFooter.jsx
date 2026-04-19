import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import {
  FaXTwitter,
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

export default function DonateFooter() {
  return (
    <footer className="mt-16 bg-[#0f4ca1] text-white">
      <div className="mx-auto max-w-[1800px] px-4 py-14 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link to="/" className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
                </svg>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-[20px] font-bold">Jeanluc</div>
                <div className="h-12 w-px bg-white/50" />
                <div className="text-[20px] font-medium">My Jeanluc</div>
              </div>
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
            <a href="#" className="hover:text-sky-200">Contact Us</a>
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
      </div>
    </footer>
  );
}