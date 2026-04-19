import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "../ui/Container";
import { impactCards as initialCards } from "../../data/homepageData";

export default function ImpactNumbersSection() {
  const [cards, setCards] = useState(initialCards);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const rotateNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("next");

    setTimeout(() => {
      setCards((prev) => {
        const newArr = [...prev];
        const first = newArr.shift();
        newArr.push(first);
        return newArr;
      });
      setIsAnimating(false);
    }, 260);
  };

  const rotatePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("prev");

    setTimeout(() => {
      setCards((prev) => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
      setIsAnimating(false);
    }, 260);
  };

  const getCardTone = (card) => {
    const title = card.title.toLowerCase();

    if (title.includes("connect")) {
      return {
        bar: "bg-[#1cb7e8]",
        body: "bg-[#f3f3f3]",
      };
    }

    if (title.includes("fund")) {
      return {
        bar: "bg-[#992048]",
        body: "bg-[#e9e9e9]",
      };
    }

    return {
      bar: "bg-[#007f80]",
      body: "bg-[#e9e9e9]",
    };
  };

  return (
    <section className="bg-[#f5f5f5] py-10 sm:py-14 lg:py-16">
      <Container className="max-w-[1700px] px-0 sm:px-6 lg:px-8">
        <div className="px-4 text-center sm:px-0">
          <h2 className="text-[32px] font-extralight tracking-tight text-slate-700 sm:text-[46px] lg:text-[60px]">
            Impact by the numbers
          </h2>
        </div>

        <div className="relative mt-8 sm:mt-10 lg:mt-12">
          <button
            onClick={rotatePrev}
            disabled={isAnimating}
            className="absolute left-[2%] top-1/2 z-20 hidden -translate-y-1/2 text-slate-500 transition hover:text-slate-800 disabled:opacity-50 lg:block"
          >
            <ChevronLeft className="h-[76px] w-[76px] stroke-[1.15]" />
          </button>

          <button
            onClick={rotateNext}
            disabled={isAnimating}
            className="absolute right-[2%] top-1/2 z-20 hidden -translate-y-1/2 text-slate-500 transition hover:text-slate-800 disabled:opacity-50 lg:block"
          >
            <ChevronRight className="h-[76px] w-[76px] stroke-[1.15]" />
          </button>

          <div className="overflow-x-auto pb-2 md:overflow-visible">
            <div className="mx-auto flex w-max min-w-full items-start gap-0 px-4 md:max-w-[1160px] md:min-w-0 md:justify-center md:px-0">
              {cards.map((card, index) => {
                const isCenter = index === 1;
                const tone = getCardTone(card);

                const animationClass = isAnimating
                  ? direction === "next"
                    ? index === 0
                      ? "md:-translate-x-10 md:scale-[0.92] opacity-70"
                      : index === 1
                      ? "md:-translate-x-8 md:translate-y-[20px] md:scale-[0.96]"
                      : "md:-translate-x-6 md:-translate-y-[16px] md:scale-[1.02]"
                    : index === 0
                    ? "md:translate-x-6 md:-translate-y-[16px] md:scale-[1.02]"
                    : index === 1
                    ? "md:translate-x-8 md:translate-y-[20px] md:scale-[0.96]"
                    : "md:translate-x-10 md:scale-[0.92] opacity-70"
                  : "";

                return (
                  <article
                    key={`${card.title}-${index}`}
                    className={[
                      "overflow-hidden shadow-[0_18px_35px_rgba(0,0,0,0.08)]",
                      "w-[295px] shrink-0",
                      "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isCenter
                        ? "relative z-10 md:w-[392px] md:scale-[1.05]"
                        : "relative z-0 md:w-[332px] md:translate-y-[54px]",
                      index === 0 ? "md:-mr-[2px]" : "",
                      index === 2 ? "md:-ml-[2px]" : "",
                      animationClass,
                    ].join(" ")}
                  >
                    <div
                      className={
                        isCenter
                          ? "h-[255px] md:h-[365px]"
                          : "h-[255px] md:h-[335px]"
                      }
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div
                      className={[
                        "flex h-[50px] items-center justify-center px-4 text-center text-[14px] font-bold uppercase tracking-[0.01em] text-white md:h-[58px] md:text-[18px]",
                        tone.bar,
                      ].join(" ")}
                    >
                      {card.amount}
                    </div>

                    <div
                      className={[
                        "px-6 pt-10 pb-11 md:px-7 md:pt-11 md:pb-12",
                        tone.body,
                      ].join(" ")}
                    >
                      <h3 className="text-[17px] font-extrabold uppercase text-[#213244] md:text-[22px]">
                        {card.title}
                      </h3>

                      <p className="mt-4 text-[15px] text-[#2f4356] md:mt-5 md:text-[17px]">
                        {card.description}
                      </p>

                      <a
                        href="#"
                        className="mt-7 inline-block text-[14px] font-extrabold uppercase text-[#009ddb] transition hover:opacity-80 md:text-[15px]"
                      >
                        Explore
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}