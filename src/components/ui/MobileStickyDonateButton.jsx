import { Heart } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function MobileStickyDonateButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname !== "/") return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[80] px-4 sm:hidden">
      <button
        type="button"
        onClick={() => navigate("/donate")}
        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-sky-600 px-6 py-4 text-[16px] font-bold uppercase tracking-[0.03em] text-white shadow-[0_14px_30px_rgba(2,132,199,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-sky-700 active:translate-y-0"
      >
        <span className="absolute inset-0 animate-pulse bg-white/10" />
        <span className="absolute -left-10 top-0 h-full w-10 -skew-x-12 bg-white/20 transition-all duration-700 group-hover:left-[120%]" />
        <Heart className="relative h-5 w-5 fill-white text-white" />
        <span className="relative">Donate Now</span>
      </button>
    </div>
  );
}