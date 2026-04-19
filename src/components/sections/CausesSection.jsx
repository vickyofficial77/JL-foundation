import { motion } from "framer-motion";
import Container from "../ui/Container";
import { causes } from "../../data/homepageData";

export default function CausesSection() {
  return (
    <section className="relative overflow-hidden bg-[#003b73] py-14 text-white sm:py-18 lg:py-24">
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(30deg,rgba(255,255,255,0.18)_12%,transparent_12.5%,transparent_87%,rgba(255,255,255,0.18)_87.5%,rgba(255,255,255,0.18)),linear-gradient(150deg,rgba(255,255,255,0.18)_12%,transparent_12.5%,transparent_87%,rgba(255,255,255,0.18)_87.5%,rgba(255,255,255,0.18)),linear-gradient(90deg,rgba(255,255,255,0.12)_2%,transparent_2.5%,transparent_97%,rgba(255,255,255,0.12)_97.5%,rgba(255,255,255,0.12))] [background-size:52px_90px]" />

      <Container className="relative z-10 max-w-[980px] px-0 sm:px-6">
        <div className="mx-auto max-w-[760px] px-6 text-center">
          <h2 className="text-[30px] font-light leading-[1.25] tracking-tight text-white sm:text-[32px] lg:text-[34px]">
            No challenge is too
            <br className="sm:hidden" />
            {" "}big for us
          </h2>

          <p className="mx-auto mt-7 max-w-[300px] text-[15px] font-semibold leading-[1.65] text-white/95 sm:max-w-[700px] sm:text-[12px] sm:leading-[1.9] lg:text-[13px]">
            For more than a century, we&apos;ve bridged cultures and connected
            continents. We champion peace, fight illiteracy and poverty, help
            people get access to clean water and sanitation, and fight disease.
            Our newest cause is to protect our planet and its resources.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 justify-items-center gap-y-10 px-4 sm:mt-10 sm:grid-cols-2 sm:gap-y-8 lg:mt-12 lg:grid-cols-3 lg:px-0">
          {causes.map((cause, index) => {
            const desktopPosClass =
              index === 0
                ? "lg:mt-[88px]"
                : index === 1
                ? "lg:mt-0"
                : index === 2
                ? "lg:mt-[88px]"
                : index === 3
                ? "lg:-mt-[4px]"
                : index === 4
                ? "lg:-mt-[86px]"
                : index === 5
                ? "lg:-mt-[4px]"
                : "lg:-mt-[86px] lg:col-start-2";

            const mobileSpanClass =
              causes.length % 2 === 1 && index === causes.length - 1
                ? "col-span-2"
                : "";

            return (
              <motion.div
                key={cause.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`text-center ${desktopPosClass} ${mobileSpanClass}`}
              >
                <div className="mx-auto h-[126px] w-[126px] overflow-hidden rounded-full bg-white sm:h-[170px] sm:w-[170px] lg:h-[190px] lg:w-[190px]">
                  <img
                    src={cause.image}
                    alt={cause.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="mx-auto mt-5 max-w-[145px] text-[14px] font-extrabold leading-[1.25] tracking-tight text-white sm:max-w-[200px] sm:text-[13px] lg:text-[14px]">
                  {cause.title}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}