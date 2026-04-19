import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

export default function OptionCard({
  title,
  description,
  selected = false,
  footer = "Learn more",
  centered = false,
  onSelect,
  compact = false,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] ${
        selected
          ? "border-[#0d58ad] shadow-[0_12px_30px_rgba(13,88,173,0.12)]"
          : "border-slate-500"
      } ${centered ? "md:col-span-2 xl:col-span-3 xl:mx-auto xl:w-[34%]" : ""}`}
    >
      <button
        type="button"
        onClick={onSelect}
        className={`w-full ${selected ? "bg-[#0d58ad] text-white" : "bg-white text-slate-900"}`}
      >
        <div className={`flex flex-col items-center justify-center px-4 ${compact ? "min-h-[200px]" : "min-h-[210px]"}`}>
          <div
            className={`mb-6 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
              selected ? "border-white" : "border-slate-700"
            }`}
          >
            {selected && <Check className="h-5 w-5" />}
          </div>

          <div className={`text-center font-bold ${compact ? "text-[20px] sm:text-[22px]" : "text-[21px] sm:text-[24px]"}`}>
            {title}
          </div>
        </div>
      </button>

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className={`flex w-full items-center justify-center gap-2 border-t px-4 py-3 text-center text-[16px] transition ${
          selected
            ? "border-[#184684] bg-[#184684] text-white hover:bg-[#123b72]"
            : "border-slate-200 bg-[#f2f2f2] text-[#2a4766] hover:bg-[#eaeaea]"
        }`}
      >
        <span>{footer}</span>
        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-40 border-t border-slate-200 bg-white opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-4 text-[15px] leading-7 text-[#2f4356]">{description}</div>
      </div>
    </div>
  );
}