import { Check } from "lucide-react";

export default function AmountCard({ amount, selected = false, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex min-h-[142px] flex-col border transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] ${
        selected
          ? "border-[#0d58ad] bg-[#0d58ad] text-white"
          : "border-slate-500 bg-white text-slate-900 hover:border-[#0d58ad]"
      }`}
    >
      <div className="px-3 pt-3 text-left text-[15px] font-semibold">USD</div>

      <div className="flex flex-1 flex-col items-center justify-center px-3 pb-6">
        <div
          className={`mb-5 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
            selected ? "border-white" : "border-slate-700"
          }`}
        >
          {selected && <Check className="h-5 w-5" />}
        </div>

        <div className="text-[22px] font-bold">{amount}</div>
      </div>
    </button>
  );
}