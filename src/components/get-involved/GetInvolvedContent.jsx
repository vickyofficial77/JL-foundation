import { ExternalLink } from "lucide-react";

export default function GetInvolvedContent({ onSubmitInterest }) {
  return (
    <section className="px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center">
          <h2 className="text-[38px] font-light leading-[1.15] tracking-tight text-[#2d3b49] sm:text-[52px] lg:text-[64px]">
            Choosing your Jeanluc experience
          </h2>

          <p className="mx-auto mt-8 max-w-[980px] text-[20px] leading-[1.65] text-[#2d3b49] sm:text-[22px]">
            While all Jeanluc and community clubs share the values of service,
            each club provides a unique experience for its members, including when,
            where and how they choose to meet. Each club also has its own
            requirements for meeting attendance and financial commitments.
          </p>
        </div>

        <div className="mt-24 text-center">
          <h3 className="text-[38px] font-light leading-[1.15] tracking-tight text-[#2d3b49] sm:text-[52px] lg:text-[64px]">
            The benefits of membership
          </h3>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div>
            <img
              src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=80"
              alt="Members networking"
              className="h-[360px] w-full rounded-[28px] object-cover sm:h-[480px] lg:h-[560px]"
            />
          </div>

          <div className="text-[#2d3b49]">
            <p className="text-[20px] leading-[1.7] sm:text-[22px]">
              Becoming a member connects you with a diverse group of professionals
              who share your drive to give back. Through regular meetings and events,
              you will:
            </p>

            <ul className="mt-4 list-disc space-y-3 pl-8 text-[20px] leading-[1.6] sm:text-[22px]">
              <li>Discuss your community&apos;s needs and develop creative ways to meet them</li>
              <li>Connect with others who are changing the world</li>
              <li>Expand your leadership and professional skills</li>
              <li>Catch up with friends and meet new ones</li>
            </ul>

            <p className="mt-6 text-[20px] leading-[1.7] sm:text-[22px]">
              Jeanluc offers many experiences beyond your club. By joining our global
              network, you&apos;ll have opportunities to participate in extensive
              programming and activities that will help you make connections around the world.
            </p>

            <div className="mt-10">
              <button
                type="button"
                onClick={onSubmitInterest}
                className="inline-flex h-[74px] items-center justify-center rounded-full bg-[#184ea6] px-12 text-[22px] font-semibold text-white transition hover:bg-[#123f8a]"
              >
                Submit interest
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center text-[21px] text-[#2d3b49] sm:text-[23px]">
          Learn about other ways to{" "}
          <a
            href="#"
            className="inline-flex items-center gap-1 font-semibold text-[#184ea6] hover:underline"
          >
            get involved
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}