export default function GetInvolvedHero({ onSubmitInterest }) {
  return (
    <section className="px-5 pt-5 sm:px-8 lg:px-10">
      <div className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=80"
          alt="People gathering"
          className="h-[420px] w-full object-cover sm:h-[560px] lg:h-[620px]"
        />
        <div className="absolute inset-0 bg-[#123f82]/70" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-[920px] text-center text-white">
            <h1 className="text-[42px] font-light leading-[1.05] tracking-tight sm:text-[68px] lg:text-[88px]">
              Find a club to join
            </h1>

            <p className="mx-auto mt-8 max-w-[980px] text-[18px] leading-[1.55] sm:text-[22px] lg:text-[24px]">
              Whether you&apos;re new to Jeanluc, looking to change clubs, or
              rejoin a club, start by filling out our interest form.
            </p>

            <p className="mx-auto mt-6 max-w-[860px] text-[18px] leading-[1.55] sm:text-[22px] lg:text-[24px]">
              Clubs accept new members by invitation and the information you provide
              helps us connect you with the right club.
            </p>

            <div className="mt-10">
              <button
                type="button"
                onClick={onSubmitInterest}
                className="inline-flex h-[66px] items-center justify-center rounded-full bg-[#bfe7f6] px-10 text-[20px] font-semibold text-[#17479d] transition hover:bg-[#a8ddf2]"
              >
                Submit interest
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}