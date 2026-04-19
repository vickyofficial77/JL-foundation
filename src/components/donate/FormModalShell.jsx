import { X } from "lucide-react";

export default function FormModalShell({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-8">
      <div className="relative w-full max-w-[1280px] bg-[#f4f4f4] shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-600 transition hover:bg-slate-200"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}