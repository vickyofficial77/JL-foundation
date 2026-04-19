import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Container from "../ui/Container";
import { heroSlides } from "../../data/homepageData";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={900}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="hero-swiper"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.video}>
            <div className="relative h-[430px] w-full sm:h-[520px] lg:h-[560px] xl:h-[600px]">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                src={slide.video}
              />

              <div className="absolute inset-0 bg-black/28" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/18 to-black/42" />

              <Container className="relative z-10 flex h-full items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mx-auto max-w-[1100px] px-4 text-center text-white"
                >
                  <h1 className="px-2 text-[42px] font-extralight leading-[1.05] tracking-tight sm:text-[58px] lg:text-[82px] xl:text-[88px]">
                    {slide.title}
                  </h1>

                  <p className="mx-auto mt-6 max-w-[980px] px-4 text-[16px] font-normal leading-[1.7] text-white/95 sm:text-[21px] lg:text-[24px]">
                    {slide.description}
                  </p>

                  <div className="mt-10 flex justify-center">
                    <button className="inline-flex h-[56px] items-center justify-center rounded-full border border-white/80 px-12 py-3 text-[14px] font-bold uppercase tracking-[0.05em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black hover:shadow-[0_10px_30px_rgba(255,255,255,0.25)] sm:h-[60px] sm:px-14 sm:text-[15px]">
                      {slide.ctaPrimary}
                    </button>
                  </div>
                </motion.div>
              </Container>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .hero-swiper .swiper-pagination {
          bottom: 18px;
        }

        .hero-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.55);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .hero-swiper .swiper-pagination-bullet-active {
          width: 26px;
          border-radius: 9999px;
          background: white;
        }
      `}</style>
    </section>
  );
}