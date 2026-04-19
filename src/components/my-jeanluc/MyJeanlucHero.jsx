export default function MyJeanlucHero() {
  return (
    <section className="relative">
      <div className="relative h-[520px] overflow-hidden sm:h-[620px] lg:h-[680px]">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80"
          alt="Community members"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1300px] px-6 sm:px-10">
            <div className="max-w-[620px] text-white">
              <h1 className="text-[52px] font-light leading-[1.05] tracking-tight sm:text-[74px] lg:text-[84px]">
                Welcome to My Jeanluc
              </h1>

              <p className="mt-8 text-[22px] leading-[1.55] sm:text-[26px]">
                Sign in or register to access your personalized My Jeanluc portal.
              </p>

              <div className="mt-10 flex items-center gap-5 text-[18px] font-semibold sm:text-[20px]">
                <button className="border-b-[3px] border-amber-400 pb-2 text-white">
                  Sign in
                </button>
                <span>or</span>
                <button className="border-b-[3px] border-amber-400 pb-2 text-white">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-16 max-w-[1260px] px-4 sm:-mt-20 sm:px-8">
        <div className="bg-white px-6 py-10 shadow-[0_10px_30px_rgba(0,0,0,0.16)] sm:px-10 sm:py-12 lg:px-16">
          <h2 className="text-center text-[36px] font-light tracking-tight text-[#2d3b49] sm:text-[52px]">
            Sign in for easy access to resources
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-x-14 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "Jeanluc Club Central",
                text: "Set club goals and track how you're doing. Monitor your progress with detailed reports.",
              },
              {
                title: "Grant Center",
                text: "Launch and manage all your Jeanluc Foundation grants in one place.",
              },
              {
                title: "Membership and Foundation Reports",
                text: "Find reports with data about membership, contributions, recognition, and more.",
              },
              {
                title: "Learning Center",
                text: "Learn new skills with online classes and materials created for your specific role or interests.",
              },
              {
                title: "Service Project Center",
                text: "Browse successful club projects from around the world.",
              },
              {
                title: "Brand Center",
                text: "Find logos, photos, videos, and all the resources you need to promote Jeanluc in your community.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="text-[24px] font-semibold text-[#2d3b49]">
                  {item.title}
                </h3>
                <p className="mt-4 text-[18px] leading-[1.6] text-[#425466]">
                  {item.text}
                </p>
                <div className="mx-auto mt-8 h-[4px] w-[170px] bg-amber-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}