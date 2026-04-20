import {
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

const footerLinks = [
  "About Jeanluc",
  "Get Involved",
  "Our Causes",
  "Our Programs",
  "News & Features",
  "For Members",
];

export default function TakeActionFooter() {
  return (
    <footer className="border-t border-slate-200 bg-[#f4f4f4] px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1200px] text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {footerLinks.map((link) => (
            <a
              key={link}
              href="#"
              className={`text-[18px] transition ${
                link === "Get Involved"
                  ? "font-medium text-black"
                  : "font-normal text-slate-600 hover:text-slate-900"
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-10 text-[16px] font-semibold text-[#5a6b7b]">
          <a href="#" className="hover:text-slate-900">Contact Us</a>
          <a href="#" className="hover:text-slate-900">Change Language</a>
        </div>

        <div className="mt-7 flex justify-center gap-8 text-[36px] text-slate-400">
          <a href="#" className="transition hover:text-slate-700"><FaXTwitter /></a>
          <a href="#" className="transition hover:text-slate-700"><FaFacebookF /></a>
          <a href="#" className="transition hover:text-slate-700"><FaYoutube /></a>
          <a href="#" className="transition hover:text-slate-700"><FaInstagram /></a>
          <a href="#" className="transition hover:text-slate-700"><FaLinkedinIn /></a>
        </div>

        <p className="mt-10 text-[16px] text-slate-500">
          © 2026 Jeanluc International. All rights reserved.{" "}
          <a href="#" className="underline underline-offset-4">Privacy Policy</a>{" "}
          <a href="#" className="ml-2 underline underline-offset-4">Terms of Use</a>
        </p>

        <div className="mx-auto mt-8 flex h-24 w-24 items-center justify-center bg-[#f44336] text-center text-[18px] font-bold leading-[0.95] text-yellow-300">
          END
          <br />
          POLIO
          <br />
          NOW
        </div>
      </div>
    </footer>
  );
}