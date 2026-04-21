import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const stories = {
  "care-close-to-home": {
    title: "Care close to home",
    subtitle: "April 2026",
    author: "Brad Webber",
    heroTitle: "Care close to home",
    intro:
      "Portable kidney failure treatment will help patients stay in the remote communities they love.",
    sections: [
      {
        heading: "Mexico",
        body:
          "Within hours of deadly floods and landslides that struck communities, Rotary members were responding. Members helped residents reach safety, cleaned mud-laden streets, and moved house to house to assist families and restore access to daily life.",
        image:
          "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop",
        imageLeft: false,
      },
      {
        heading: "Canada",
        body:
          "Members of a Rotary club in British Columbia created a remembrance project that honored sacrifice and connected the wider community through stories, educational programs, and public participation.",
        image:
          "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop",
        imageLeft: true,
      },
    ],
    stats: [
      {
        value: 100000,
        prefix: "",
        suffix: "",
        label: "Homes damaged by October floods in Mexico",
      },
      {
        value: 75,
        prefix: "",
        suffix: "",
        label: "Countries where Canadians killed in WWI and WWII are buried",
      },
    ],
    ctaTitle:
      "Rotary projects make a difference in communities around the world.",
  },

  "rotary-projects-around-the-globe-april-2026": {
    title: "Rotary projects around the globe",
    subtitle: "April 2026",
    author: "Brad Webber",
    heroTitle: "Rotary projects around the globe",
    intro:
      "Snapshots of service from communities where Rotary members are creating practical change.",
    sections: [
      {
        heading: "Mexico",
        body:
          "After severe flooding, Rotary members supported families with emergency response, clean-up efforts, and access to safe water and meals.",
        image:
          "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop",
        imageLeft: false,
      },
      {
        heading: "Canada",
        body:
          "A remembrance initiative helped honor fallen soldiers while educating students and strengthening civic connection in the community.",
        image:
          "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop",
        imageLeft: true,
      },
      {
        heading: "Latvia",
        body:
          "Volunteers supported a soup kitchen that continues to provide warm meals, tea, and care to guests in need.",
        image:
          "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop",
        imageLeft: false,
      },
      {
        heading: "India",
        body:
          "A local literature festival gave authors, students, and readers a space to celebrate culture, books, and ideas.",
        image:
          "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
        imageLeft: true,
      },
    ],
    stats: [
      {
        value: 100000,
        prefix: "",
        suffix: "",
        label: "Homes damaged by October floods in Mexico",
      },
      {
        value: 75,
        prefix: "",
        suffix: "",
        label: "Countries where Canadians killed in WWI and WWII are buried",
      },
      {
        value: 12,
        prefix: "1 in ",
        suffix: "",
        label: "People worldwide who face chronic hunger",
      },
      {
        value: 9,
        prefix: "$",
        suffix: " billion",
        label: "Value of India’s print book market in 2020",
      },
    ],
    ctaTitle:
      "Rotary projects make a difference in communities around the world.",
  },

  "to-catch-a-killer-parasite": {
    title: "To catch a killer parasite",
    subtitle: "March 2026",
    author: "Brad Webber",
    heroTitle: "To catch a killer parasite",
    intro:
      "Research, training, and community action are helping tackle one of the world’s toughest public health threats.",
    sections: [
      {
        heading: "Field Research",
        body:
          "Researchers and frontline teams are working together to identify outbreaks earlier, strengthen diagnosis, and bring care closer to vulnerable communities.",
        image:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
        imageLeft: false,
      },
      {
        heading: "Community Response",
        body:
          "Local partnerships improve awareness, prevention, and treatment access while supporting long-term health resilience.",
        image:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop",
        imageLeft: true,
      },
    ],
    stats: [
      {
        value: 454,
        prefix: "$",
        suffix: "M",
        label: "in grants supporting disease prevention and response",
      },
      {
        value: 99.9,
        prefix: "",
        suffix: "%",
        label: "Reduction in polio cases since program launch",
      },
    ],
    ctaTitle:
      "Stronger health systems begin with practical local action.",
  },

  "discover-science-led-community-breakthroughs": {
    title: "Discover science-led community breakthroughs",
    subtitle: "April 2026",
    author: "Editorial Team",
    heroTitle: "Discover science-led community breakthroughs",
    intro:
      "From research labs to local clinics, science-led community action is helping solve real-world challenges.",
    sections: [
      {
        heading: "Innovation in health",
        body:
          "Community partnerships and scientific research are creating better tools, treatments, and systems that improve lives in practical ways.",
        image:
          "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=1200&auto=format&fit=crop",
        imageLeft: false,
      },
      {
        heading: "Local breakthroughs",
        body:
          "When experts, volunteers, and community leaders collaborate, breakthroughs become more accessible and more sustainable.",
        image:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
        imageLeft: true,
      },
    ],
    stats: [
      {
        value: 320,
        prefix: "",
        suffix: "+",
        label: "community-led health innovations supported",
      },
      {
        value: 84,
        prefix: "",
        suffix: "%",
        label: "improvement in project access and delivery",
      },
    ],
    ctaTitle:
      "Science and service together can create lasting community change.",
  },

  "global-volunteers-transforming-local-lives": {
    title: "Global volunteers transforming local lives",
    subtitle: "April 2026",
    author: "Editorial Team",
    heroTitle: "Global volunteers transforming local lives",
    intro:
      "Dedicated volunteers are helping communities respond to urgent needs and build stronger futures.",
    sections: [
      {
        heading: "Community service in action",
        body:
          "Volunteers bring energy, compassion, and practical support to projects focused on health, dignity, education, and opportunity.",
        image:
          "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1200&auto=format&fit=crop",
        imageLeft: false,
      },
      {
        heading: "Lasting local impact",
        body:
          "When local communities and global volunteers work together, projects can respond faster and reach more people effectively.",
        image:
          "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop",
        imageLeft: true,
      },
    ],
    stats: [
      {
        value: 5000,
        prefix: "",
        suffix: "+",
        label: "volunteer hours mobilized across communities",
      },
      {
        value: 60,
        prefix: "",
        suffix: "+",
        label: "local initiatives strengthened",
      },
    ],
    ctaTitle:
      "Volunteer action creates visible impact where communities need it most.",
  },

  "cleaner-water-systems-beyond-traditional-access": {
    title: "Cleaner water systems beyond traditional access",
    subtitle: "April 2026",
    author: "Editorial Team",
    heroTitle: "Cleaner water systems beyond traditional access",
    intro:
      "Smarter and cleaner water systems are helping communities move beyond traditional limits of access.",
    sections: [
      {
        heading: "Modern water access",
        body:
          "Improved water systems are helping families, schools, and clinics get more reliable access to safe water.",
        image: "get3.jpg",
        imageLeft: false,
      },
      {
        heading: "Sustainable local systems",
        body:
          "By combining infrastructure, education, and local ownership, communities can maintain cleaner water systems over the long term.",
        image:
          "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1200&auto=format&fit=crop",
        imageLeft: true,
      },
    ],
    stats: [
      {
        value: 240,
        prefix: "",
        suffix: "+",
        label: "clean water systems improved",
      },
      {
        value: 91,
        prefix: "",
        suffix: "%",
        label: "households reporting improved access",
      },
    ],
    ctaTitle:
      "Better water systems mean healthier and more resilient communities.",
  },
};

const storyAliases = {
  "global-volunteers-transforming-local-lives": "global-volunteers-transforming-local-lives",
  "discover-science-led-community-breakthroughs":
    "discover-science-led-community-breakthroughs",
  "cleaner-water-systems-beyond-traditional-access":
    "cleaner-water-systems-beyond-traditional-access",
};

function CountUp({ value, prefix = "", suffix = "", label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1700;
    const startTime = performance.now();
    let frameId;

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = value * eased;
      setCount(Number(current.toFixed(value % 1 !== 0 ? 1 : 0)));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55 }}
      className="px-4 py-10 text-center"
    >
      <div className="text-[58px] font-light leading-none text-[#0a57a8] sm:text-[88px]">
        {prefix}
        {count}
        {suffix}
      </div>
      <p className="mx-auto mt-8 max-w-[380px] text-[20px] leading-[1.5] text-[#0a57a8]">
        {label}
      </p>
    </motion.div>
  );
}

function HelpfulSection() {
  const [state, setState] = useState("idle");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleYes = () => {
    setState("yes");
    setSubmitted(true);
  };

  const handleNo = () => {
    setState("no");
    setSubmitted(false);
  };

  const submitFeedback = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitted(true);
    setText("");
  };

  return (
    <section className="bg-[#f3f3f3] py-8">
      <div className="mx-auto max-w-[1880px] px-6">
        <div className="rounded-sm bg-[#f0f0f0] px-6 py-9">
          {state !== "no" && !submitted && (
            <div className="flex flex-col items-center justify-center gap-6 text-center lg:flex-row lg:gap-10">
              <p className="text-[18px] text-[#667789]">
                Please help us improve. Was this page helpful?
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6">
                <button
                  type="button"
                  onClick={handleYes}
                  className="inline-flex min-w-[170px] justify-center rounded-full bg-white px-10 py-4 text-[18px] font-bold text-[#5d7287] transition hover:bg-slate-50"
                >
                  YES
                </button>
                <button
                  type="button"
                  onClick={handleNo}
                  className="inline-flex min-w-[170px] justify-center rounded-full bg-white px-10 py-4 text-[18px] font-bold text-[#5d7287] transition hover:bg-slate-50"
                >
                  NO
                </button>
              </div>
            </div>
          )}

          {submitted && state === "yes" && (
            <div className="py-6 text-center">
              <h3 className="text-[28px] font-bold text-[#5d7287]">
                Thank you for your feedback!
              </h3>
            </div>
          )}

          {state === "no" && !submitted && (
            <form onSubmit={submitFeedback}>
              <h3 className="text-center text-[20px] font-bold text-[#5d7287]">
                What can we do to improve this information?
              </h3>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-6 min-h-[250px] w-full resize-y border border-[#b8c4cf] bg-white px-4 py-4 text-[18px] text-[#243f57] outline-none transition focus:border-[#159dc5]"
              />

              <p className="mt-8 text-center text-[16px] text-[#667789]">
                To protect your privacy, do not include contact information in your feedback.
              </p>

              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  className="inline-flex min-w-[350px] items-center justify-center rounded-full bg-[#159dc5] px-10 py-5 text-[20px] font-bold uppercase text-white transition hover:bg-[#118ab0]"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          )}

          {submitted && state === "no" && (
            <div className="py-6 text-center">
              <h3 className="text-[28px] font-bold text-[#5d7287]">
                Thank you for your feedback!
              </h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function NewsFeatureDetailPage() {
  const { slug } = useParams();

  const resolvedSlug = storyAliases[slug] || slug;
  const story = useMemo(() => stories[resolvedSlug], [resolvedSlug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [resolvedSlug]);

  if (!story) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] text-slate-900">
        <Navbar />
        <main className="mx-auto max-w-[1200px] px-4 py-24">
          <h1 className="text-[42px] font-light text-[#243f57]">
            Story not found
          </h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-slate-900">
      <Navbar />

      <main>
        <section className="bg-[#f5f5f5] py-16 sm:py-20">
          <div className="mx-auto max-w-[1280px] px-4">
            <motion.div
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="text-center"
            >
              <h1 className="mx-auto max-w-[1100px] text-[52px] font-light leading-[1.05] tracking-tight text-[#3a434d] sm:text-[84px] lg:text-[98px]">
                {story.heroTitle}
              </h1>

              <div className="mt-10 text-[22px] font-bold text-[#243f57] sm:text-[40px]">
                {story.subtitle}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.55 }}
              className="mx-auto mt-10 max-w-[1000px]"
            >
              <div className="text-[20px] text-[#243f57]">
                By <span className="font-bold">{story.author}</span>
              </div>
              <div className="mt-8 h-px w-[70px] bg-slate-300" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.55 }}
              className="mx-auto mt-10 max-w-[1000px] text-[22px] leading-[1.8] text-[#243f57]"
            >
              {story.intro}
            </motion.p>
          </div>
        </section>

        <section className="bg-[#f5f5f5] py-6">
          <div className="mx-auto max-w-[1540px] px-4">
            <div className="space-y-20">
              {story.sections.map((section, index) => (
                <motion.div
                  key={section.heading}
                  initial={{ opacity: 0, y: 38 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2"
                >
                  {section.imageLeft && (
                    <div className="order-2 lg:order-1">
                      <img
                        src={section.image}
                        alt={section.heading}
                        className="h-[380px] w-full object-cover"
                      />
                    </div>
                  )}

                  <div className={section.imageLeft ? "order-1 lg:order-2" : "order-1"}>
                    <h2 className="text-[32px] font-bold text-[#243f57]">
                      {section.heading}
                    </h2>
                    <p className="mt-6 text-[22px] leading-[1.85] text-[#243f57]">
                      {section.body}
                    </p>
                  </div>

                  {!section.imageLeft && (
                    <div className="order-2">
                      <img
                        src={section.image}
                        alt={section.heading}
                        className="h-[380px] w-full object-cover"
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="bg-[#f5f5f5] py-16"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        >
          <div className="mx-auto max-w-[1500px] px-4">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              {story.stats.map((stat) => (
                <CountUp
                  key={stat.label}
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#003b73] py-20 text-white">
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(30deg,rgba(255,255,255,0.18)_12%,transparent_12.5%,transparent_87%,rgba(255,255,255,0.18)_87.5%,rgba(255,255,255,0.18)),linear-gradient(150deg,rgba(255,255,255,0.18)_12%,transparent_12.5%,transparent_87%,rgba(255,255,255,0.18)_87.5%,rgba(255,255,255,0.18))] [background-size:52px_90px]" />
          <div className="relative z-10 mx-auto max-w-[1300px] px-4 text-center">
            <motion.h3
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-[920px] text-[36px] font-bold leading-[1.5] text-white sm:text-[48px]"
            >
              {story.ctaTitle}
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="mt-12"
            >
              <button
                type="button"
                onClick={() => window.location.assign("/news-features")}
                className="inline-flex min-w-[350px] items-center justify-center rounded-full bg-white px-12 py-5 text-[22px] font-bold uppercase text-[#61778b] transition hover:bg-slate-100"
              >
                Learn More
              </button>
            </motion.div>
          </div>
        </section>

        <HelpfulSection />
      </main>

      <Footer />
    </div>
  );
}