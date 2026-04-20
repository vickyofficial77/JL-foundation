import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  "About Rotary",
  "Get Involved",
  "Our Causes",
  "Our Programs",
  "News & Features",
  "For Members",
];

export default function TakeActionHeader() {
  const navigate = useNavigate();

  return (
    <header className="w-full border-y border-slate-300 bg-white">
      <div className="mx-auto max-w-[1800px] px-0">
        <div className="hidden lg:block">
          <div className="flex h-[74px] items-center justify-between px-8 xl:px-14">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-3"
            >
              <div className="text-[22px] font-bold tracking-tight text-blue-900">
                Jeanluc
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-500 text-amber-500">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
                </svg>
              </div>
            </button>

            <div className="flex items-center gap-4 xl:gap-5">
              <button
                type="button"
                onClick={() => navigate("/my-jeanluc")}
                className="text-[15px] font-semibold uppercase tracking-[0.01em] text-sky-600 transition hover:text-sky-800"
              >
                My Jeanluc
              </button>

              <span className="text-slate-300">|</span>

              <a
                href="#"
                className="text-[15px] font-semibold uppercase tracking-[0.01em] text-sky-600 transition hover:text-sky-800"
              >
                Club Finder
              </a>

              <span className="text-slate-300">|</span>

              <a
                href="#"
                className="inline-flex items-center gap-1 text-[15px] font-semibold uppercase tracking-[0.01em] text-sky-600 transition hover:text-sky-800"
              >
                <Search className="h-4 w-4 stroke-[2.3]" />
                Search
              </a>

              <button
                type="button"
                onClick={() => navigate("/get-involved")}
                className="ml-2 inline-flex h-[42px] items-center justify-center rounded-full border border-sky-500 px-9 text-[15px] font-semibold uppercase tracking-[0.01em] text-sky-600 transition hover:bg-sky-600 hover:text-white"
              >
                Join a Club
              </button>

              <button
                type="button"
                onClick={() => navigate("/donate")}
                className="inline-flex h-[42px] items-center justify-center rounded-full bg-sky-600 px-10 text-[15px] font-semibold uppercase tracking-[0.01em] text-white transition hover:border hover:border-sky-600 hover:bg-white hover:text-sky-600"
              >
                Donate
              </button>
            </div>
          </div>

          <nav className="flex h-[72px] items-center justify-between px-8 xl:px-14">
            {navLinks.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  if (index === 1) navigate("/get-involved");
                }}
                className={`text-[18px] transition ${
                  item === "Get Involved"
                    ? "font-medium text-black"
                    : "font-normal text-slate-600 hover:text-sky-600"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}