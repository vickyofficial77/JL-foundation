import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

const footerSections = [
  {
    title: "Who We Are",
    links: [
      "Our Leadership",
      "The Jeanluc Foundation",
      "Diversity, Equity & Inclusion",
      "Our Finances",
      "Partnerships",
    ],
  },
  {
    title: "What We Do",
    links: ["Ending Polio", "Disaster Response", "Our Causes"],
  },
  {
    title: "Press Center",
    links: ["Social Channels", "Brand Center"],
  },
  {
    title: "Contact us",
    links: [
      "World Headquarters",
      "+1 866-976-8279 (toll free)",
      "+1 847-866-3000",
      "Jeanluc International",
      "One Jeanluc Center",
      "1560 Sherman Ave.",
      "Evanston, IL 60201-3698, USA",
    ],
  },
];

export default function GetInvolvedFooter() {
  const navigate = useNavigate();
  const [openMobileSection, setOpenMobileSection] = useState(null);

  const toggleSection = (title) => {
    setOpenMobileSection((prev) => (prev === title ? null : title));
  };

  return (
    <footer className="mt-8 bg-[#1d2f4d] text-white">
      {/* top quick links */}
      <div className="border-b border-white/25">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-14 lg:gap-y-4 lg:px-8 lg:py-8">
          <button
            type="button"
            onClick={() => navigate("/club-finder")}
            className="text-left text-[16px] font-semibold transition hover:text-sky-200 sm:text-[18px] lg:text-[24px]"
          >
            Club Finder
          </button>

          <button
            type="button"
            onClick={() => navigate("/my-jeanluc")}
            className="inline-flex items-center gap-2 text-left text-[16px] font-semibold transition hover:text-sky-200 sm:text-[18px] lg:text-[24px]"
          >
            My Jeanluc <ExternalLink className="h-4 w-4 lg:h-5 lg:w-5" />
          </button>

          <a
            href="#"
            className="text-left text-[16px] font-semibold transition hover:text-sky-200 sm:text-[18px] lg:text-[24px]"
          >
            Careers
          </a>
        </div>
      </div>

      {/* mobile accordion */}
      <div className="border-b border-white/25 lg:hidden">
        <div className="px-0">
          {footerSections.map((section) => {
            const isOpen = openMobileSection === section.title;

            return (
              <div key={section.title} className="border-b border-white/25 last:border-b-0">
                <button
                  type="button"
                  onClick={() => toggleSection(section.title)}
                  className="flex w-full items-center justify-between px-4 py-4 text-left"
                >
                  <span className="text-[16px] font-semibold">{section.title}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-3 px-4 pb-4 text-[15px] leading-7 text-white/90">
                    {section.links.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="block transition hover:text-sky-200"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="px-4 py-6">
            <h4 className="text-[24px] font-light leading-[1.3] tracking-tight">
              Help Create
              <br />
              Lasting Change
            </h4>

            <div className="mt-5 flex items-center gap-3 text-[#1d2f4d]">
              {[
                { Icon: FaYoutube, href: "#" },
                { Icon: FaFacebookF, href: "#" },
                { Icon: FaInstagram, href: "#" },
                { Icon: FaXTwitter, href: "#" },
                { Icon: FaLinkedinIn, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[16px] transition hover:scale-105 hover:bg-sky-100"
                >
                  <Icon />
                </a>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/get-involved")}
                className="inline-flex h-[46px] items-center justify-center rounded-full bg-[#b9e3f1] px-7 text-[18px] font-semibold text-[#184ea6] transition hover:bg-white"
              >
                Join
              </button>

              <button
                type="button"
                onClick={() => navigate("/donate")}
                className="inline-flex h-[46px] items-center justify-center rounded-full bg-[#184ea6] px-7 text-[18px] font-semibold text-white transition hover:bg-[#123f8a]"
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* desktop layout */}
      <div className="hidden border-b border-white/25 lg:block">
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
              {[
                { Icon: FaYoutube, href: "#" },
                { Icon: FaFacebookF, href: "#" },
                { Icon: FaInstagram, href: "#" },
                { Icon: FaXTwitter, href: "#" },
                { Icon: FaLinkedinIn, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[24px] transition hover:scale-105 hover:bg-sky-100"
                >
                  <Icon />
                </a>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => navigate("/get-involved")}
                className="inline-flex h-[68px] items-center justify-center rounded-full bg-[#b9e3f1] px-10 text-[22px] font-semibold text-[#184ea6] transition hover:bg-white"
              >
                Join
              </button>
              <button
                type="button"
                onClick={() => navigate("/donate")}
                className="inline-flex h-[68px] items-center justify-center rounded-full bg-[#184ea6] px-10 text-[22px] font-semibold text-white transition hover:bg-[#123f8a]"
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* bottom brand row */}
      <div className="mx-auto flex max-w-[1800px] flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-[28px] font-bold tracking-tight sm:text-[38px]">
            Jeanluc
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-amber-500 text-amber-500 sm:h-14 sm:w-14">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2 sm:h-8 sm:w-8">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-[15px] text-white/95 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4 sm:text-[18px]">
          <a href="#" className="hover:text-sky-200">Privacy Policy</a>
          <a href="#" className="hover:text-sky-200">Terms of Use</a>
          <span>© 2026 Jeanluc International. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}