import Container from "../ui/Container";

export default function CtaSplitSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="flex items-center bg-teal-700 px-6 py-16 sm:px-10 lg:px-16 xl:px-20">
          <div className="max-w-[560px] text-white">
            <h2 className="text-[32px] font-light leading-tight sm:text-[40px] lg:text-[46px]">
              Help us create lasting change
            </h2>

            <p className="mt-6 text-[16px] leading-[1.7] text-white/90 sm:text-[17px] lg:text-[18px]">
              Solving some of the world’s most complex and pressing problems
              takes real commitment and vision. Rotary members believe that we
              share a responsibility to take action to improve our communities.
              Join us, so that we can make an even bigger impact – together.
            </p>

            <div className="mt-10">
              <button className="inline-flex h-[54px] items-center justify-center rounded-full border border-white/80 px-10 text-[14px] font-bold uppercase tracking-[0.02em] text-white transition hover:bg-white/10 sm:h-[58px] sm:px-12">
                Get Involved
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="relative h-[320px] w-full sm:h-[420px] lg:h-[520px] xl:h-[560px]">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1600&auto=format&fit=crop"
            alt="community"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}