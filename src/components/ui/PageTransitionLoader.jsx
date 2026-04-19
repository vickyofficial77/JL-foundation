export default function PageTransitionLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-sky-100" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-sky-600 border-r-sky-500" />
          <div className="absolute inset-[14px] rounded-full border-2 border-amber-400/70" />
        </div>

        <h2 className="mt-6 text-[22px] font-semibold tracking-tight text-slate-800">
          Jeanluc Foundation
        </h2>
        <p className="mt-2 text-[15px] text-slate-500">Loading page...</p>
      </div>
    </div>
  );
}