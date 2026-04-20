export default function TakeActionHero() {
  return (
    <section className="relative">
      <div className="relative h-[340px] overflow-hidden sm:h-[440px] lg:h-[520px]">
        <img
          src="/Get-involved.jpg"
          alt="Get Involved"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h1 className="text-center text-[54px] font-extralight tracking-tight text-white sm:text-[82px] lg:text-[112px]">
            Get Involved
          </h1>
        </div>
      </div>
    </section>
  );
}