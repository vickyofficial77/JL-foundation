import { useState } from "react";

export default function TakeActionFeedback() {
  const [selected, setSelected] = useState("");

  return (
    <section className="bg-[#f4f4f4] px-6 py-8 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1760px] bg-[#efefef] px-6 py-8 sm:px-10">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <p className="text-center text-[18px] text-[#5a6b7b] sm:text-[22px] lg:text-left">
            Please help us improve. Was this page helpful?
          </p>

          <div className="flex w-full max-w-[720px] flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => setSelected("yes")}
              className={`flex-1 rounded-full px-10 py-5 text-[22px] font-semibold transition ${
                selected === "yes"
                  ? "bg-[#8e2087] text-white"
                  : "bg-white text-[#5a6b7b] hover:bg-slate-100"
              }`}
            >
              YES
            </button>

            <button
              type="button"
              onClick={() => setSelected("no")}
              className={`flex-1 rounded-full px-10 py-5 text-[22px] font-semibold transition ${
                selected === "no"
                  ? "bg-[#8e2087] text-white"
                  : "bg-white text-[#5a6b7b] hover:bg-slate-100"
              }`}
            >
              NO
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
