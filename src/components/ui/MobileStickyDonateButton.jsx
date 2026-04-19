import { Heart, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function MobileStickyDonateButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname !== "/") return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[90] px-4 sm:hidden">
      <div className="pointer-events-auto relative mx-auto max-w-md">
        <div className="absolute inset-0 animate-pulse rounded-full bg-sky-500/20 blur-2xl" />

        <button
          type="button"
          onClick={() => navigate("/donate")}
          className="group relative flex w-full items-center justify-between overflow-hidden rounded-full border border-white/25 bg-white/10 px-5 py-3.5 text-white shadow-[0_18px_45px_rgba(2,132,199,0.35)] backdrop-blur-xl transition-all duration-300 active:scale-[0.98]"
        >
          {/* gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-700 transition duration-500 group-hover:scale-[1.02]" />

          {/* animated shine */}
          <div className="absolute -left-[35%] top-0 h-full w-[30%] -skew-x-12 bg-white/20 blur-md transition-all duration-700 group-hover:left-[120%]" />

          {/* soft ring */}
          <div className="absolute inset-0 rounded-full ring-1 ring-white/20" />

          <div className="relative flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/18 ring-1 ring-white/30">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/20 opacity-40" />
              <Heart className="h-5 w-5 fill-white text-white transition-transform duration-300 group-hover:scale-110" />
            </div>

            <div className="text-left">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/75">
                Support Jeanluc
              </div>
              <div className="text-[16px] font-bold tracking-[0.02em] text-white">
                Donate Now
              </div>
            </div>
          </div>

          <div className="relative flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 ring-1 ring-white/20">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90">
              Tap
            </span>
            <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </button>
      </div>
    </div>
  );
}