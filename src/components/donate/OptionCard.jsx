import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";

export default function OptionCard({
  title,
  description,
  selected = false,
  centered = false,
  onSelect,
  compact = false,
  staticDescription = false,
}) {
  const [open, setOpen] = useState(false);

  const handleCardClick = () => {
    if (onSelect) onSelect();
  };

  return (
    <div
      className={[
        "relative overflow-hidden border border-[#415466] bg-white transition-all duration-300",
        "hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
        centered ? "md:col-span-2 xl:col-span-1 xl:mx-auto" : "",
        compact ? "min-h-[240px]" : "min-h-[290px]",
        selected ? "bg-[#0057b8] text-white" : "text-[#111827]",
      ].join(" ")}
    >
      {!open ? (
        <>
          <button
            type="button"
            onClick={handleCardClick}
            className={[
              "flex w-full flex-col items-center justify-center px-6 text-center transition",
              compact ? "min-h-[180px] py-10" : "min-h-[220px] py-12",
              selected ? "bg-[#0057b8] text-white" : "bg-white text-[#111827]",
            ].join(" ")}
          >
            <div
              className={[
                "mb-6 flex h-11 w-11 items-center justify-center rounded-full border-2",
                selected ? "border-white" : "border-[#415466]",
              ].join(" ")}
            >
              {selected ? <Check className="h-6 w-6" /> : null}
            </div>

            <h3
              className={[
                "font-bold leading-[1.25]",
                compact ? "text-[20px] sm:text-[22px]" : "text-[20px] sm:text-[22px] lg:text-[24px]",
              ].join(" ")}
            >
              {title}
            </h3>

            {staticDescription && description ? (
              <p
                className={[
                  "mt-5 max-w-[320px] text-center text-[16px] leading-[1.6]",
                  selected ? "text-white/90" : "text-[#31465b]",
                ].join(" ")}
              >
                {description}
              </p>
            ) : null}
          </button>

          {!staticDescription && (
            <div
              className={[
                "border-t px-6 py-5 text-center",
                selected
                  ? "border-white/15 bg-[#0d4690] text-white"
                  : "border-slate-200 bg-[#f3f4f6] text-[#1e4f8c]",
              ].join(" ")}
            >
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 text-[16px] font-medium transition hover:opacity-80"
              >
                Learn more
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="relative flex min-h-[290px] items-center justify-center bg-white px-8 py-10 text-center text-[#111827]">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 text-[#1e4f8c] transition hover:opacity-70"
          >
            <X className="h-6 w-6" />
          </button>

          <p className="mx-auto max-w-[320px] text-[18px] leading-[1.7] text-[#111827]">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}