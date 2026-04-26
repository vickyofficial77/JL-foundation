import Container from "../ui/Container";
import {
  FaXTwitter,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { HeartHandshake, Mail, MapPin, Phone } from "lucide-react";

const mainLinks = [
  "About Jeanluc",
  "Get Involved",
  "Our Causes",
  "Our Programs",
  "News & Features",
  "For Members",
];

const socialIcons = [FaXTwitter, FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn];

export default function Footer() {
  return (
    <footer className="bg-[#f4f4f4] py-14 text-center">
      <Container className="max-w-[1200px]">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <a href="#" className="group flex items-center gap-4">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-[3px] border-[#f2b705] bg-white text-[#0f4ca1] shadow-[0_12px_30px_rgba(15,76,161,0.12)] transition group-hover:scale-105">
              <HeartHandshake className="h-9 w-9" />
            </div>

            <div className="text-left">
              <div className="text-[28px] font-extrabold leading-none tracking-tight text-[#0f2f63]">
                Jeanluc
              </div>
              <div className="mt-1 text-[18px] font-semibold uppercase tracking-[0.18em] text-[#0f4ca1]">
                Foundation
              </div>
            </div>
          </a>

          <p className="mt-6 max-w-[720px] text-[17px] leading-8 text-slate-600">
            Jeanluc Foundation connects people, resources, and ideas to support
            communities through education, health, peacebuilding, youth empowerment,
            and sustainable development.
          </p>
        </div>

        {/* Main links */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[18px] font-medium text-slate-600">
          {mainLinks.map((link) => (
            <a key={link} href="#" className="transition hover:text-[#0f4ca1]">
              {link}
            </a>
          ))}
        </div>

        {/* Contact details */}
        <div className="mx-auto mt-8 grid max-w-[900px] grid-cols-1 gap-4 text-left sm:grid-cols-3">
          <a
            href="mailto:info@jeanlucfoundation.org"
            className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-slate-600 shadow-sm transition hover:-translate-y-1 hover:text-[#0f4ca1] hover:shadow-md"
          >
            <Mail className="h-5 w-5" />
            <span className="text-[14px]">info@jeanlucfoundation.org</span>
          </a>

          <a
            href="tel:+250788000000"
            className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-slate-600 shadow-sm transition hover:-translate-y-1 hover:text-[#0f4ca1] hover:shadow-md"
          >
            <Phone className="h-5 w-5" />
            <span className="text-[14px]">+250 788 000 000</span>
          </a>

          <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-slate-600 shadow-sm">
            <MapPin className="h-5 w-5" />
            <span className="text-[14px]">Kigali, Rwanda</span>
          </div>
        </div>

        {/* Secondary links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[16px] font-semibold text-[#0f4ca1]">
          <a href="#" className="hover:text-[#0f2f63]">
            Contact Us
          </a>
          <a href="#" className="hover:text-[#0f2f63]">
            Change Language
          </a>
          <a href="#" className="hover:text-[#0f2f63]">
            Volunteer
          </a>
          <a href="#" className="hover:text-[#0f2f63]">
            Donate
          </a>
        </div>

        {/* Social icons */}
        <div className="mt-7 flex items-center justify-center gap-4">
          {socialIcons.map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:-translate-y-1 hover:border-[#0f4ca1] hover:bg-[#0f4ca1] hover:text-white hover:shadow-md"
            >
              <Icon className="text-[18px]" />
            </a>
          ))}
        </div>

        {/* Bottom badge */}
        <div className="mt-10 flex justify-center">
          <div className="flex h-[96px] w-[96px] flex-col items-center justify-center rounded-[26px] bg-[#0f4ca1] text-center text-white shadow-[0_18px_40px_rgba(15,76,161,0.22)]">
            <HeartHandshake className="h-8 w-8 text-[#f2b705]" />
            <span className="mt-2 text-[12px] font-extrabold uppercase leading-tight tracking-[0.08em]">
              Create
              <br />
              Lasting
              <br />
              Change
            </span>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-8 text-sm text-slate-500">
          © 2026 Jeanluc Foundation. All rights reserved.{" "}
          <a href="#" className="underline underline-offset-4 hover:text-[#0f4ca1]">
            Privacy Policy
          </a>{" "}
          ·{" "}
          <a href="#" className="underline underline-offset-4 hover:text-[#0f4ca1]">
            Terms of Use
          </a>
        </p>
      </Container>
    </footer>
  );
}