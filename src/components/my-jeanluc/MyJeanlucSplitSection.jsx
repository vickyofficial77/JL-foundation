import { useNavigate } from "react-router-dom";

export default function MyJeanlucSplitSection() {
  const navigate = useNavigate();

  return (
    <section className="mt-14">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-[#0f69c8] px-8 py-16 text-white sm:px-12 lg:px-16 lg:py-20">
          <h2 className="text-[44px] font-light tracking-tight">Get Involved</h2>

          <p className="mt-10 max-w-[520px] text-[24px] leading-[1.55]">
            Become one of Jeanluc’s people of action and explore opportunities to
            improve communities near and far.
          </p>

          <button
            type="button"
            onClick={() => navigate("/get-involved")}
            className="mt-10 inline-flex text-[22px] font-medium text-white transition hover:translate-x-1 hover:underline"
          >
            Get Involved &gt;
          </button>
        </div>

        <div className="bg-[#d0edf7] px-8 py-16 text-[#2d3b49] sm:px-12 lg:px-16 lg:py-20">
          <h2 className="text-[44px] font-light tracking-tight">Club Search</h2>

          <p className="mt-10 max-w-[520px] text-[24px] leading-[1.55]">
            Locate and contact a club near you.
          </p>

          <button
            type="button"
            onClick={() => navigate("/club-finder")}
            className="mt-10 inline-flex text-[22px] font-medium text-[#184ea6] transition hover:translate-x-1 hover:underline"
          >
            Club Search &gt;
          </button>
        </div>
      </div>
    </section>
  );
}