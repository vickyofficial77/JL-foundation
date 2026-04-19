import Container from "../ui/Container";
import {
  FaXTwitter,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

const mainLinks = [
  "About Jeanluc",
  "Get Involved",
  "Our Causes",
  "Our Programs",
  "News & Features",
  "For Members",
];

export default function Footer() {
  return (
    <footer className="bg-[#f4f4f4] py-14 text-center">
      <Container className="max-w-[1200px]">
        {/* Top links */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[18px] text-slate-600">
          {mainLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="transition hover:text-slate-900"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Secondary links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[16px] font-medium text-slate-600">
          <a href="#" className="hover:text-slate-900">
            Contact Us
          </a>
          <a href="#" className="hover:text-slate-900">
            Change Language
          </a>
        </div>

        {/* Social icons */}
        <div className="mt-6 flex items-center justify-center gap-6 text-slate-500">
          {[FaXTwitter, FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn].map(
            (Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-xl transition hover:text-slate-800"
              >
                <Icon />
              </a>
            )
          )}
        </div>

        {/* Copyright */}
        <p className="mt-8 text-sm text-slate-500">
          © 2026 Jeanluc Foundation. All rights reserved.{" "}
          <a href="#" className="underline hover:text-slate-700">
            Privacy Policy
          </a>{" "}
          ·{" "}
          <a href="#" className="underline hover:text-slate-700">
            Terms of Use
          </a>
        </p>

        {/* Bottom badge */}
        <div className="mt-10 flex justify-center">
          <div className="flex h-[90px] w-[90px] items-center justify-center bg-red-600 text-center text-[18px] font-extrabold leading-tight text-yellow-300 shadow-md">
            END <br /> POLIO <br /> NOW
          </div>
        </div>
      </Container>
    </footer>
  );
}