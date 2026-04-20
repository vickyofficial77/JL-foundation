import { useNavigate } from "react-router-dom";

export default function TakeActionCtas() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#f4f4f4] px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] text-center">
        <h2 className="text-[34px] font-semibold leading-[1.35] text-[#31465b] sm:text-[46px] lg:text-[60px]">
          Your time, energy, and a passion to improve your world are
          all you need to get involved with Jeanluc.
        </h2>

        <p className="mx-auto mt-8 max-w-[1100px] text-[20px] leading-[1.7] text-[#425466] sm:text-[24px]">
          Become one of Jeanluc’s people of action or explore the many opportunities we have for anyone
          — whatever your age or interest — who wants to improve lives in communities near and far.
          Connect with a local club to find out how you can get involved.
        </p>

        <div className="mx-auto mt-16 flex max-w-[530px] flex-col gap-7">
          <button
            type="button"
            onClick={() => navigate("/get-involved")}
            className="inline-flex h-[78px] items-center justify-center rounded-full bg-[#8e2087] text-[24px] font-bold uppercase text-white transition hover:scale-[1.02] hover:bg-[#7c1b76]"
          >
            Become a Member
          </button>

          <button
            type="button"
            onClick={() => navigate("/get-involved")}
            className="inline-flex h-[78px] items-center justify-center rounded-full bg-[#8e2087] text-[24px] font-bold uppercase text-white transition hover:scale-[1.02] hover:bg-[#7c1b76]"
          >
            Find a Club
          </button>

          <button
            type="button"
            onClick={() => navigate("/donate")}
            className="inline-flex h-[78px] items-center justify-center rounded-full bg-[#8e2087] text-[24px] font-bold uppercase text-white transition hover:scale-[1.02] hover:bg-[#7c1b76]"
          >
            Make a Donation
          </button>
        </div>
      </div>
    </section>
  );
}