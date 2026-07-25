import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Container from "../ui/Container";
import { db } from "../../firebase/config";
import { collection, getDocs, query, where, limit } from "firebase/firestore";

export default function NewsFeaturesSection() {
  const [featuredStories, setFeaturedStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFeaturedNews() {
      try {
        // Query only stories explicitly marked as featured by the admin
        const q = query(
          collection(db, "news_stories"),
          where("isFeatured", "==", true),
          limit(3)
        );
        const snapshot = await getDocs(q);
        const stories = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeaturedStories(stories);
      } catch (error) {
        console.error("Error fetching featured news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeaturedNews();
  }, []);

  const handleReadMore = (slugOrId) => {
    navigate(`/news-features/${slugOrId}`);
  };

  return (
    <section className="bg-[#f5f5f5] py-14 sm:py-16 lg:py-20">
      <Container className="max-w-[1750px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-[32px] font-light tracking-tight text-slate-700 sm:text-[44px] lg:text-[58px]">
            News &amp; Features
          </h2>
        </motion.div>

        {loading ? (
          <div className="mt-14 flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
          </div>
        ) : featuredStories.length === 0 ? (
          <div className="mt-14 text-center text-slate-500">
            <p className="text-[18px]">No featured news articles available at the moment.</p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-14 lg:gap-6">
            {featuredStories.map((card, index) => {
              const identifier = card.slug || card.id;
              return (
                <motion.article
                  key={card.id}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative overflow-hidden bg-slate-200 shadow-sm"
                >
                  <div className="aspect-[1.52/1] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => handleReadMore(identifier)}
                      className="block h-full w-full cursor-pointer"
                      aria-label={`Read more about ${card.title}`}
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
                      />
                    </button>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent pointer-events-none" />

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h3 className="max-w-[92%] text-[24px] font-normal leading-tight text-white sm:text-[28px] lg:text-[30px]">
                      {card.title}
                    </h3>

                    <button
                      type="button"
                      onClick={() => handleReadMore(identifier)}
                      className="mt-3 inline-block text-[16px] font-bold text-white transition hover:opacity-80"
                    >
                      Read more
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex justify-center lg:mt-12"
        >
          <button
            type="button"
            onClick={() => navigate("/news-features")}
            className="inline-flex h-[58px] items-center justify-center rounded-full bg-sky-500 px-10 text-[15px] font-bold uppercase tracking-[0.01em] text-white transition hover:bg-sky-600 sm:px-14 lg:h-[64px] lg:px-16"
          >
            Explore More News and Features
          </button>
        </motion.div>
      </Container>
    </section>
  );
}