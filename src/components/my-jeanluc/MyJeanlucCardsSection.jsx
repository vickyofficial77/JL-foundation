import { ExternalLink } from "lucide-react";

export default function MyJeanlucCardsSection() {
  const cards = [
    {
      image:
        "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80",
      title: "End Polio",
      text: "Jeanluc has made incredible progress in eradicating polio forever.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      title: "Support the Jeanluc Peace Centers",
      text: "Help us create the next generation of leaders in peacebuilding and development.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80",
      title: "Youth Programs",
      text: "Learn more about programs that develop our next generation of leaders.",
    },
  ];

  return (
    <section className="bg-[#f5f5f5] px-5 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1540px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="relative overflow-visible">
              <img
                src={card.image}
                alt={card.title}
                className="h-[360px] w-full object-cover sm:h-[430px]"
              />
              <div className="relative mx-10 -mt-14 bg-[#5a5d63] px-8 py-8 text-white shadow-lg">
                <h3 className="text-[28px] font-light leading-[1.25]">
                  {card.title}
                </h3>
                <p className="mt-8 text-[20px] leading-[1.6] text-white/95">
                  {card.text}
                </p>
                <a
                  href="#"
                  className="mt-8 inline-flex items-center gap-2 text-[18px] font-semibold text-white hover:underline"
                >
                  Explore
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}