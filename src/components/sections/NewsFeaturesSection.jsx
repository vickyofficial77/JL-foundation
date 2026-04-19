import Container from "../ui/Container";
import { newsCards } from "../../data/homepageData";

export default function NewsFeaturesSection() {
  return (
    <section className="bg-[#f5f5f5] py-14 sm:py-16 lg:py-20">
      <Container className="max-w-[1750px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-[32px] font-light tracking-tight text-slate-700 sm:text-[44px] lg:text-[58px]">
            News &amp; Features
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-14 lg:gap-6">
          {newsCards.map((card) => (
            <article
              key={card.title}
              className="group relative overflow-hidden bg-slate-200 shadow-sm"
            >
              <div className="aspect-[1.52/1]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h3 className="max-w-[92%] text-[24px] font-normal leading-tight text-white sm:text-[28px] lg:text-[30px]">
                  {card.title}
                </h3>

                <a
                  href="#"
                  className="mt-3 inline-block text-[16px] font-bold text-white transition hover:opacity-80"
                >
                  Read more
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
          <button className="inline-flex h-[58px] items-center justify-center rounded-full bg-sky-500 px-10 text-[15px] font-bold uppercase tracking-[0.01em] text-white transition hover:bg-sky-600 sm:px-14 lg:h-[64px] lg:px-16">
            Explore More News and Features
          </button>
        </div>
      </Container>
    </section>
  );
}