import { ExternalLink } from "lucide-react";

export default function MyJeanlucFoundationSection() {
  return (
    <section className="relative">
      <div className="relative h-[520px] overflow-hidden sm:h-[620px] lg:h-[700px]">
        <img
          src="https://images.unsplash.com/photo-1516575150278-77136aed6920?auto=format&fit=crop&w=1800&q=80"
          alt="Foundation work"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-[1540px] px-5 sm:px-8 lg:px-12">
            <div className="ml-auto max-w-[560px] bg-[#3b4652]/88 px-10 py-10 text-white shadow-xl sm:px-12 sm:py-12">
              <h2 className="text-[48px] font-light tracking-tight">Our Foundation</h2>
              <p className="mt-8 text-[22px] leading-[1.65] text-white/95">
                Give to The Jeanluc Foundation and fund service projects that change
                lives – both close to home and around the world.
              </p>
              <a
                href="#"
                className="mt-10 inline-flex items-center gap-2 border-b-[4px] border-amber-400 pb-2 text-[20px] font-semibold text-white hover:opacity-90"
              >
                Explore
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}