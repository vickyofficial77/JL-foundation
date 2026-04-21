export default function GetInvolvedHero({ onSubmitInterest }) {
  return (
    <section className="px-0 pt-0 sm:px-4 sm:pt-4 lg:px-6 lg:pt-6">
      <div className="relative overflow-hidden sm:rounded-none lg:rounded-none">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=80"
          alt="People gathering"
          className="h-[360px] w-full object-cover sm:h-[500px] lg:h-[620px]"
        />
        <div className="absolute inset-0 bg-[#123f82]/82" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#123f82]/35 to-[#0b2e61]/80" />

        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[980px] text-center text-white">
            <h1 className="text-[38px] font-light leading-[1.02] tracking-tight sm:text-[58px] lg:text-[88px]">
              Find a club to join
            </h1>

            <p className="mx-auto mt-5 max-w-[900px] text-[17px] leading-[1.6] text-white/95 sm:mt-7 sm:text-[20px] lg:text-[24px]">
              Whether you&apos;re new to Jeanluc, looking to change clubs, or
              rejoin a club, start by filling out our interest form.
            </p>

            <p className="mx-auto mt-4 max-w-[860px] text-[17px] leading-[1.6] text-white/95 sm:mt-5 sm:text-[20px] lg:text-[24px]">
              Clubs accept new members by invitation and the information you provide
              helps us connect you with the right club.
            </p>

            <div className="mt-8 sm:mt-10">
              <button
                type="button"
                onClick={onSubmitInterest}
                className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-[#bfe7f6] px-8 text-[18px] font-semibold text-[#17479d] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#123f82] active:translate-y-0 sm:min-h-[62px] sm:px-10 sm:text-[19px] lg:h-[66px] lg:px-12 lg:text-[20px]"
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