import { ExternalLink } from "lucide-react";

const topCards = [
  {
    title: "Jeanluc Clubs",
    text: "Jeanluc clubs bring together people across generations who share the ideals of service, leadership, diversity, friendship, and integrity and wish to create lasting change in the world, in their communities, and in themselves.",
    image: "/get1.jpg",
  },
  {
    title: "Rotaract Clubs",
    text: "Rotaract clubs bring together young people ages 18 and older in communities worldwide to organize service activities, develop leadership skills, and socialize.",
    image: "/get2.jpg",
  },
  {
    title: "Interact Clubs",
    text: "Through Interact clubs, people ages 12-18 connect with others in their community or school and learn about the world through service projects and activities.",
    image: "/get3.jpg",
  },
];

const bottomCards = [
  {
    title: "Jeanluc Action Groups",
    text: "Connect with Jeanluc members and friends who are experts in a particular field by joining an Action Group. Group members share their expertise by collaborating with clubs and districts on service projects.",
    image: "/get4.jpg",
  },
  {
    title: "Jeanluc Fellowships",
    text: "Interested in scuba diving or marathon running? Want to use your skills as a doctor or environmentalist to make a difference? Share your hobby or vocation with other club members, their partners, and friends of Jeanluc.",
    image: "/get5.jpg",
  },
];

function Card({ title, text, image }) {
  return (
    <div className="group overflow-hidden bg-white shadow-[0_14px_32px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_44px_rgba(0,0,0,0.14)]">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-[260px] w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="px-8 py-8 text-center">
        <h3 className="text-[26px] font-semibold text-[#31465b]">{title}</h3>
        <p className="mt-7 text-[18px] leading-[1.7] text-[#425466]">{text}</p>

        <a
          href="#"
          className="mt-8 inline-flex items-center gap-2 text-[18px] font-medium text-sky-500 transition hover:text-sky-700"
        >
          Learn more
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

export default function TakeActionCards() {
  return (
    <section className="bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.015),transparent_45%),#f4f4f4] px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          {topCards.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </div>

        <div className="mx-auto mt-10 grid max-w-[980px] grid-cols-1 gap-8 lg:grid-cols-2">
          {bottomCards.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}