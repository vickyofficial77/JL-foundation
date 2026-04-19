import { ExternalLink } from "lucide-react";
import {
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

export default function GetInvolvedFooter() {
  return (
    <footer className="mt-8 bg-[#1d2f4d] text-white">
      <div className="border-b border-white/25">
        <div className="mx-auto flex max-w-[1800px] flex-wrap items-center gap-x-14 gap-y-4 px-5 py-8 text-[24px] font-semibold sm:px-8">
          <a href="#" className="hover:text-sky-200">Club Finder</a>
          <a href="#" className="inline-flex items-center gap-2 hover:text-sky-200">
            My Jeanluc <ExternalLink className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-sky-200">Careers</a>
        </div>
      </div>

      <div className="border-b border-white/25">
        <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_1fr_1fr_1.2fr_1.2fr]">
          <div>
            <h4 className="text-[22px] font-semibold">Who We Are</h4>
            <div className="mt-6 space-y-5 text-[20px] leading-[1.5] text-white/95">
              <a href="#" className="block hover:text-sky-200">Our Leadership</a>
              <a href="#" className="block hover:text-sky-200">The Jeanluc Foundation</a>
              <a href="#" className="block hover:text-sky-200">Diversity, Equity & Inclusion</a>
              <a href="#" className="block hover:text-sky-200">Our Finances</a>
              <a href="#" className="block hover:text-sky-200">Partnerships</a>
            </div>
          </div>

          <div>
            <h4 className="text-[22px] font-semibold">What We Do</h4>
            <div className="mt-6 space-y-5 text-[20px] leading-[1.5] text-white/95">
              <a href="#" className="block hover:text-sky-200">Ending Polio</a>
              <a href="#" className="block hover:text-sky-200">Disaster Response</a>
              <a href="#" className="block hover:text-sky-200">Our Causes</a>
            </div>
          </div>

          <div>
            <h4 className="text-[22px] font-semibold">Press Center</h4>
            <div className="mt-6 space-y-5 text-[20px] leading-[1.5] text-white/95">
              <a href="#" className="block hover:text-sky-200">Social Channels</a>
              <a href="#" className="block hover:text-sky-200">Brand Center</a>
            </div>
          </div>

          <div>
            <h4 className="text-[22px] font-semibold">Contact us</h4>
            <div className="mt-6 space-y-5 text-[20px] leading-[1.5] text-white/95">
              <p>World Headquarters</p>
              <p>+1 866-976-8279 (toll free)</p>
              <p>+1 847-866-3000</p>
              <p className="pt-4">
                Jeanluc International<br />
                One Jeanluc Center<br />
                1560 Sherman Ave.<br />
                Evanston, IL 60201-3698, USA
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-[46px] font-light leading-[1.15] tracking-tight">
              Help Create
              <br />
              Lasting Change
            </h4>

            <div className="mt-8 flex items-center gap-4 text-[#1d2f4d]">
              {[FaYoutube, FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[24px] transition hover:bg-sky-100"
                >
                  <Icon />
                </a>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="inline-flex h-[68px] items-center justify-center rounded-full bg-[#b9e3f1] px-10 text-[22px] font-semibold text-[#184ea6] transition hover:bg-[#a4d9eb]">
                Join
              </button>
              <button className="inline-flex h-[68px] items-center justify-center rounded-full bg-[#184ea6] px-10 text-[22px] font-semibold text-white transition hover:bg-[#123f8a]">
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1800px] flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="text-[38px] font-bold tracking-tight">Jeanluc</div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-amber-500 text-amber-500">
            <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current stroke-2">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[18px] text-white/95">
          <a href="#" className="hover:text-sky-200">Privacy Policy</a>
          <a href="#" className="hover:text-sky-200">Terms of Use</a>
          <span>© 2026 Jeanluc International. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}