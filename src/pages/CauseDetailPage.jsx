import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { FaFacebookF, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const allCauseCards = [
  {
    slug: "promoting-peace",
    title: "Promoting Peace",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "providing-clean-water",
    title: "Providing Clean Water",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "improving-maternal-and-child-health",
    title: "Improving Maternal and Child Health",
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "supporting-education",
    title: "Supporting Education",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "growing-local-economies",
    title: "Growing Local Economies",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "protecting-the-environment",
    title: "Protecting the Environment",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "fighting-disease",
    title: "Fighting Disease",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop",
  },
];

const causesContent = {
  "promoting-peace": {
    title: "Promoting Peace",
    heroImage:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1800&auto=format&fit=crop",
    intro:
      "We create environments where communities can build trust, resolve conflict, and create long-term peace.",
    body1:
      "Peace is more than the absence of war. It is access to opportunity, dignity, dialogue, and hope. Through local projects and international partnerships, we help communities prevent violence before it begins.",
    body2:
      "From youth leadership programs to conflict resolution training, our work supports stronger, safer, and more connected communities.",
    stats: [
      { value: 120, suffix: "+", label: "peacebuilding projects supported" },
      { value: 45, suffix: "+", label: "communities reached" },
    ],
    youtubeId: "wLDj1DGysAY",
    actionCards: [
      {
        title: "Strengthening dialogue and trust",
        image:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
        description:
          "We support programs that bring people together, build understanding, and create safer communities.",
      },
      {
        title: "Training peace leaders",
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
        description:
          "Leadership, education, and community action help prevent conflict and open paths to cooperation.",
      },
      {
        title: "Community-based solutions",
        image:
          "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?q=80&w=1200&auto=format&fit=crop",
        description:
          "We invest in practical local initiatives that create long-term stability and opportunity.",
      },
    ],
    relatedStories: [
      "How communities build trust after conflict",
      "Youth leadership for peacebuilding",
      "Dialogue that transforms neighborhoods",
      "Explore more stories on promoting peace",
    ],
  },

  "providing-clean-water": {
    title: "Providing Clean Water",
    heroImage:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1800&auto=format&fit=crop",
    intro:
      "Access to safe water, sanitation, and hygiene changes everything for families and communities.",
    body1:
      "Clean water helps children stay in school, improves public health, and reduces preventable disease. We invest in sustainable water systems that communities can maintain long term.",
    body2:
      "We work with local leaders to improve sanitation, hygiene education, and reliable access to safe water.",
    stats: [
      { value: 300, suffix: "+", label: "water points improved" },
      { value: 89, suffix: "%", label: "community hygiene participation" },
    ],
    youtubeId: "wLDj1DGysAY",
    actionCards: [
      {
        title: "Reliable access to clean water",
        image:
          "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop",
        description:
          "We help communities create and maintain water solutions that improve health and dignity.",
      },
      {
        title: "Sanitation and hygiene education",
        image:
          "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1200&auto=format&fit=crop",
        description:
          "Education supports healthier homes, schools, and neighborhoods.",
      },
      {
        title: "Community-led maintenance",
        image:
          "https://images.unsplash.com/photo-1528323273322-d81458248d40?q=80&w=1200&auto=format&fit=crop",
        description:
          "Local ownership helps water projects remain sustainable over time.",
      },
    ],
    relatedStories: [
      "Water systems that last",
      "Why hygiene education matters",
      "Community ownership and water resilience",
      "Explore more stories on clean water",
    ],
  },

  "fighting-disease": {
    title: "Fighting Disease",
    heroImage:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1800&auto=format&fit=crop",
    intro:
      "We believe good health care is everyone’s right. Yet millions still lack access to essential health services.",
    body1:
      "Building on our successful fight to eliminate polio, we bring together global experts and leaders to improve access to health care and prevent the spread of diseases.",
    body2:
      "Rotary collaborates with local, regional, and international health providers to address preventable and treatable causes of illness and death while promoting equitable health for all.",
    stats: [
      {
        value: 454,
        suffix: "M",
        label: "in grants has been awarded to fight disease since 2014",
        color: "#8d2a86",
      },
      {
        value: 99.9,
        suffix: "%",
        label: "reduction in polio cases since our program started",
        color: "#0a57a8",
      },
    ],
    youtubeId: "wLDj1DGysAY",
    actionCards: [
      {
        title: "Fighting cervical cancer",
        image:
          "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop",
        description:
          "Building on our work with polio, Rotary members are working on projects across the globe to increase vaccines, screening, and treatment of cervical cancer.",
        accent: "bg-[#992048]",
      },
      {
        title: "Build capacity of community health workers",
        image:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop",
        description:
          "Rotary members work with partner organizations to strengthen community health systems and expand the reach of trained community health workers.",
        accent: "bg-[#12a8d8]",
      },
      {
        title: "Access to prevention, treatment, and care",
        image:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
        description:
          "Members host family health initiatives and provide access to quality health resources to people who would not otherwise have access.",
        accent: "bg-[#007f80]",
      },
    ],
    relatedStories: [
      "Polio eradication explained",
      "Hidden Army on frontlines of immunization in Pakistan",
      "Polio’s hidden figures in Tuskegee",
      "Explore more stories on fighting disease on the Rotary 360 blog",
      "Explore more stories on fighting disease on the Service in Action blog",
    ],
  },

  "supporting-education": {
    title: "Supporting Education",
    heroImage:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1800&auto=format&fit=crop",
    intro:
      "Education empowers individuals and transforms communities.",
    body1:
      "We help learners gain access to quality education, literacy programs, and the tools they need to thrive in school and beyond.",
    body2:
      "By supporting teachers, students, and learning spaces, we help build opportunity for the next generation.",
    stats: [
      { value: 78, suffix: "%", label: "literacy program completion" },
      { value: 2500, suffix: "+", label: "students impacted" },
    ],
    youtubeId: "wLDj1DGysAY",
    actionCards: [
      {
        title: "Support literacy and reading",
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
        description:
          "We invest in reading, writing, and learning opportunities that expand futures.",
      },
      {
        title: "Strengthen schools",
        image:
          "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop",
        description:
          "Better learning spaces and tools help children and teachers thrive.",
      },
      {
        title: "Open doors to opportunity",
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
        description:
          "Education creates long-term pathways to dignity, leadership, and growth.",
      },
    ],
    relatedStories: [
      "Students building stronger futures",
      "How literacy transforms communities",
      "Supporting teachers and learning spaces",
      "Explore more stories on education",
    ],
  },

  "growing-local-economies": {
    title: "Growing Local Economies",
    heroImage:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1800&auto=format&fit=crop",
    intro:
      "Stronger local economies create more resilient communities.",
    body1:
      "We support entrepreneurship, practical training, and local solutions that help families earn sustainable incomes.",
    body2:
      "Through skills development and economic empowerment, we help create long-term pathways out of poverty.",
    stats: [
      { value: 640, suffix: "+", label: "small businesses supported" },
      { value: 92, suffix: "%", label: "program retention rate" },
    ],
    youtubeId: "wLDj1DGysAY",
    actionCards: [
      {
        title: "Support entrepreneurship",
        image:
          "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
        description:
          "We help local innovators and entrepreneurs create practical solutions and new livelihoods.",
      },
      {
        title: "Build stronger livelihoods",
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
        description:
          "Skills, training, and local support systems create more resilient families and communities.",
      },
      {
        title: "Create opportunity",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        description:
          "Economic growth helps communities build confidence and long-term independence.",
      },
    ],
    relatedStories: [
      "Small businesses, big impact",
      "Skills that create resilience",
      "Communities growing together",
      "Explore more stories on local economies",
    ],
  },

  "protecting-the-environment": {
    title: "Protecting the Environment",
    heroImage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1800&auto=format&fit=crop",
    intro:
      "Healthy communities depend on a healthy planet.",
    body1:
      "We support local environmental action, natural resource protection, and climate resilience projects that improve life today and for future generations.",
    body2:
      "Our projects help communities restore ecosystems, reduce waste, and build a more sustainable future.",
    stats: [
      { value: 150, suffix: "+", label: "green projects launched" },
      { value: 12000, suffix: "+", label: "trees and restoration actions" },
    ],
    youtubeId: "wLDj1DGysAY",
    actionCards: [
      {
        title: "Restore ecosystems",
        image:
          "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=1200&auto=format&fit=crop",
        description:
          "We support projects that renew land, water, and biodiversity for future generations.",
      },
      {
        title: "Promote sustainability",
        image:
          "https://images.unsplash.com/photo-1498928715928-31d3e7fcbf8d?q=80&w=1200&auto=format&fit=crop",
        description:
          "Communities benefit when sustainable practices become part of daily life.",
      },
      {
        title: "Build climate resilience",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
        description:
          "We help communities adapt and respond to environmental change with practical action.",
      },
    ],
    relatedStories: [
      "Restoring land and water",
      "Sustainability in action",
      "Protecting the future together",
      "Explore more stories on the environment",
    ],
  },

  "improving-maternal-and-child-health": {
    title: "Improving Maternal and Child Health",
    heroImage:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1800&auto=format&fit=crop",
    intro:
      "Healthy mothers and children are the foundation of thriving communities.",
    body1:
      "We work to improve access to prenatal care, child health services, and essential support for families.",
    body2:
      "By strengthening systems and community awareness, we help more children survive and more mothers receive quality care.",
    stats: [
      { value: 210, suffix: "+", label: "care initiatives supported" },
      { value: 68, suffix: "%", label: "expanded local outreach coverage" },
    ],
    youtubeId: "wLDj1DGysAY",
    actionCards: [
      {
        title: "Improve prenatal care",
        image:
          "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1200&auto=format&fit=crop",
        description:
          "Supporting mothers before birth improves outcomes for families and communities.",
      },
      {
        title: "Protect child health",
        image:
          "https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=1200&auto=format&fit=crop",
        description:
          "Healthy children are more likely to survive, grow, and thrive.",
      },
      {
        title: "Expand family support",
        image:
          "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
        description:
          "Local education and care systems strengthen support for mothers and children.",
      },
    ],
    relatedStories: [
      "Supporting maternal care systems",
      "Community health for children",
      "Why family support matters",
      "Explore more stories on maternal and child health",
    ],
  },
};

function CountUpStat({ value, suffix = "", label, color = "#8d2a86" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1800;
    const startTime = performance.now();
    let animationFrame;

    const updateValue = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = value * eased;

      setDisplayValue(Number(current.toFixed(value % 1 !== 0 ? 1 : 0)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateValue);
      }
    };

    animationFrame = requestAnimationFrame(updateValue);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65 }}
      className="flex-1 border-l border-slate-300 px-8 py-8 first:border-l-0"
    >
      <div
        className="text-[64px] font-light leading-none sm:text-[92px]"
        style={{ color }}
      >
        {displayValue}
        {suffix}
      </div>
      <p className="mt-6 max-w-[280px] text-[18px] leading-[1.6] text-[#24415a]">
        {label}
      </p>
    </motion.div>
  );
}

function HelpfulSection() {
  const [feedbackState, setFeedbackState] = useState("idle");
  const [feedbackText, setFeedbackText] = useState("");
  const [showThanks, setShowThanks] = useState(false);

  const handleYes = () => {
    setFeedbackState("yes");
    setShowThanks(true);
  };

  const handleNo = () => {
    setFeedbackState("no");
    setShowThanks(false);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setShowThanks(true);
    setFeedbackText("");
  };

  return (
    <section className="bg-[#f3f3f3] py-8">
      <div className="mx-auto max-w-[1860px] px-6">
        <div className="rounded-sm bg-[#f0f0f0] px-6 py-9">
          {!showThanks && feedbackState !== "no" && (
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

          {showThanks && feedbackState === "yes" && (
            <div className="py-6 text-center">
              <h3 className="text-[28px] font-bold text-[#5d7287]">
                Thank you for your feedback!
              </h3>
            </div>
          )}

          {feedbackState === "no" && !showThanks && (
            <form onSubmit={handleSubmitFeedback} className="mx-auto w-full">
              <h3 className="text-center text-[20px] font-bold text-[#5d7287]">
                What can we do to improve this information?
              </h3>

              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
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

          {showThanks && feedbackState === "no" && (
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

export default function CauseDetailPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [slideIndex, setSlideIndex] = useState(0);

  const cause = useMemo(() => causesContent[slug], [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSlideIndex(0);
  }, [slug]);

  const relatedCauses = allCauseCards.filter((item) => item.slug !== slug).slice(0, 6);

  if (!cause) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] text-slate-900">
        <Navbar />
        <main className="mx-auto max-w-[1200px] px-4 py-24">
          <h1 className="text-[42px] font-light text-[#243f57]">
            Cause not found
          </h1>
        </main>
        <Footer />
      </div>
    );
  }

  const prevSlide = () => {
    setSlideIndex((prev) =>
      prev === 0 ? cause.actionCards.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setSlideIndex((prev) =>
      prev === cause.actionCards.length - 1 ? 0 : prev + 1
    );
  };

  const visibleSlides = [
    cause.actionCards[
      (slideIndex - 1 + cause.actionCards.length) % cause.actionCards.length
    ],
    cause.actionCards[slideIndex],
    cause.actionCards[(slideIndex + 1) % cause.actionCards.length],
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-slate-900">
      <Navbar />

      <main>
        <section className="relative min-h-[78vh] overflow-hidden">
          <img
            src={cause.heroImage}
            alt={cause.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 flex min-h-[78vh] items-end justify-center px-4 pb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-[52px] font-light tracking-tight text-white sm:text-[76px] lg:text-[92px]">
                {cause.title}
              </h1>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="mt-8 text-[36px] text-white/90"
              >
                ↓
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="bg-[#f5f5f5] py-20">
          <div className="mx-auto max-w-[1180px] px-4">
            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-[1100px] text-center text-[34px] font-light leading-[1.55] text-[#243f57] sm:text-[54px]"
            >
              {cause.intro}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="mx-auto mt-12 max-w-[1140px] space-y-10 text-[21px] leading-[1.8] text-[#243f57]"
            >
              <p>{cause.body1}</p>
              <p>{cause.body2}</p>
            </motion.div>
          </div>
        </section>

        <section
          className="bg-[#f5f5f5] py-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        >
          <div className="mx-auto max-w-[1400px] px-4">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-[22px] font-extrabold uppercase text-[#243f57]"
            >
              How Rotary makes help happen
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              viewport={{ once: true }}
              className="mx-auto mt-6 max-w-[1150px] text-center text-[26px] leading-[1.7] text-[#243f57]"
            >
              We educate and equip communities to create measurable change in this focus area.
            </motion.p>

            <div className="relative mt-16 hidden lg:block">
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-[-40px] top-1/2 z-20 -translate-y-1/2 text-slate-500 transition hover:text-slate-800"
              >
                <ChevronLeft className="h-16 w-16 stroke-[1.15]" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-[-40px] top-1/2 z-20 -translate-y-1/2 text-slate-500 transition hover:text-slate-800"
              >
                <ChevronRight className="h-16 w-16 stroke-[1.15]" />
              </button>

              <div className="mx-auto flex max-w-[1240px] items-start justify-center">
                {visibleSlides.map((card, index) => {
                  const isCenter = index === 1;

                  return (
                    <motion.div
                      key={`${card.title}-${index}`}
                      initial={{ opacity: 0.7, y: 20 }}
                      animate={{
                        opacity: isCenter ? 1 : 0.82,
                        scale: isCenter ? 1.03 : 0.93,
                        y: isCenter ? 0 : 58,
                      }}
                      transition={{ duration: 0.45 }}
                      className={`overflow-hidden shadow-[0_18px_35px_rgba(0,0,0,0.08)] ${
                        isCenter
                          ? "relative z-20 w-[490px]"
                          : "relative z-10 w-[420px]"
                      } ${index === 0 ? "-mr-5" : ""} ${index === 2 ? "-ml-5" : ""}`}
                    >
                      <div className={isCenter ? "h-[370px]" : "h-[305px]"}>
                        <img
                          src={card.image}
                          alt={card.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className={`${card.accent || "bg-[#00a7c4]"} px-6 py-5 text-center text-[20px] font-extrabold uppercase text-white`}>
                        {card.title}
                      </div>

                      <div className="bg-[#ececec] px-8 py-10">
                        <p className="text-[19px] leading-[1.8] text-[#243f57]">
                          {card.description}
                        </p>

                        <button
                          type="button"
                          onClick={() => navigate("/club-finder")}
                          className="mt-8 text-[16px] font-extrabold uppercase text-[#009ddb] transition hover:opacity-80"
                        >
                          Explore
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 lg:hidden">
              {cause.actionCards.map((card) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="overflow-hidden shadow-[0_18px_35px_rgba(0,0,0,0.08)]"
                >
                  <div className="h-[280px]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className={`${card.accent || "bg-[#00a7c4]"} px-6 py-5 text-center text-[19px] font-extrabold uppercase text-white`}>
                    {card.title}
                  </div>

                  <div className="bg-[#ececec] px-7 py-9">
                    <p className="text-[18px] leading-[1.8] text-[#243f57]">
                      {card.description}
                    </p>

                    <button
                      type="button"
                      onClick={() => navigate("/club-finder")}
                      className="mt-8 text-[16px] font-extrabold uppercase text-[#009ddb]"
                    >
                      Explore
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#05a8b8] py-20">
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(30deg,rgba(255,255,255,0.18)_12%,transparent_12.5%,transparent_87%,rgba(255,255,255,0.18)_87.5%,rgba(255,255,255,0.18)),linear-gradient(150deg,rgba(255,255,255,0.18)_12%,transparent_12.5%,transparent_87%,rgba(255,255,255,0.18)_87.5%,rgba(255,255,255,0.18))] [background-size:52px_90px]" />
          <div className="relative z-10 mx-auto max-w-[1120px] px-4">
            <div className="aspect-video overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${cause.youtubeId}`}
                title={`${cause.title} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section className="bg-[#f5f5f5] py-20">
          <div className="mx-auto max-w-[1360px] px-4">
            <motion.h3
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-[22px] font-extrabold uppercase text-[#243f57]"
            >
              Our impact on {cause.title.toLowerCase()}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              viewport={{ once: true }}
              className="mx-auto mt-8 max-w-[1120px] text-[22px] leading-[1.8] text-[#243f57]"
            >
              The Rotary Foundation is changing communities by providing grants and supporting practical action around the world and in local neighborhoods.
            </motion.p>

            <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-10 text-[20px] leading-[1.9] text-[#243f57]"
              >
                <p>
                  <span className="font-bold">Reducing disease burden:</span>{" "}
                  Rotary works with communities to build access to prevention,
                  care, treatment, and outreach so more families can live healthy lives.
                </p>

                <p>
                  <span className="font-bold">Expanding local capacity:</span>{" "}
                  We strengthen systems, support local leadership, and create lasting progress through partnerships and community-based action.
                </p>
              </motion.div>

              <div className="flex flex-col lg:flex-row">
                {cause.stats.map((stat) => (
                  <CountUpStat
                    key={stat.label}
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    color={stat.color}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1800&auto=format&fit=crop"
            alt="share and act"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-20 text-white">
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[24px] leading-[1.6]"
            >
              Help spread the word about Rotary’s efforts to {cause.title.toLowerCase()}.
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-5">
              {[FaFacebookF, FaXTwitter, FaEnvelope].map((Icon, index) => (
                <button
                  key={index}
                  type="button"
                  className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white text-3xl text-white transition hover:bg-white/10"
                >
                  <Icon />
                </button>
              ))}
            </div>

            <div className="mt-16 border-t border-white/35 pt-12">
              <p className="text-[26px]">What can you do in the fight against this challenge?</p>

              <div className="mt-10 flex flex-wrap gap-6">
                <button
                  type="button"
                  onClick={() => navigate("/donate")}
                  className="inline-flex min-w-[320px] items-center justify-center rounded-full bg-[#d9005b] px-10 py-5 text-[20px] font-bold uppercase text-white transition hover:bg-[#b8004d]"
                >
                  Make a Donation
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/get-involved")}
                  className="inline-flex min-w-[320px] items-center justify-center rounded-full bg-[#d9005b] px-10 py-5 text-[20px] font-bold uppercase text-white transition hover:bg-[#b8004d]"
                >
                  Become a Member
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#003b73] py-12 text-white">
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(30deg,rgba(255,255,255,0.18)_12%,transparent_12.5%,transparent_87%,rgba(255,255,255,0.18)_87.5%,rgba(255,255,255,0.18)),linear-gradient(150deg,rgba(255,255,255,0.18)_12%,transparent_12.5%,transparent_87%,rgba(255,255,255,0.18)_87.5%,rgba(255,255,255,0.18))] [background-size:52px_90px]" />
          <div className="relative z-10 mx-auto max-w-[1800px] px-4">
            <h3 className="text-center text-[22px] font-extrabold uppercase">
              Explore other causes
            </h3>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {relatedCauses.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => navigate(`/causes/${item.slug}`)}
                  className="group relative h-[250px] overflow-hidden text-left"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/25 transition group-hover:bg-black/35" />
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-[22px] font-normal leading-[1.35] text-white">
                    {item.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f5f5f5] py-20">
          <div className="mx-auto max-w-[1280px] px-4">
            <div className="border-t border-slate-300 pt-14">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
                <h3 className="text-[24px] font-normal uppercase text-[#243f57]">
                  Related stories
                </h3>

                <div className="space-y-9">
                  {cause.relatedStories.map((story, index) => (
                    <motion.button
                      key={story}
                      type="button"
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: index * 0.06 }}
                      className="block text-left text-[22px] leading-[1.5] text-[#0a57a8] transition hover:opacity-80"
                    >
                      {story}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <HelpfulSection />
      </main>

      <Footer />
    </div>
  );
}
