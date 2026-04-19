export default function MyJeanlucSplitSection() {
  return (
    <section className="mt-14">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-[#0f69c8] px-8 py-16 text-white sm:px-12 lg:px-16 lg:py-20">
          <h2 className="text-[44px] font-light tracking-tight">Get Involved</h2>
          <p className="mt-10 max-w-[520px] text-[24px] leading-[1.55]">
            Become one of Jeanluc’s people of action and explore opportunities to
            improve communities near and far.
          </p>
          <a
            href="#"
            className="mt-10 inline-block text-[22px] font-medium text-white hover:underline"
          >
            Get Involved &gt;
          </a>
        </div>

        <div className="bg-[#d0edf7] px-8 py-16 text-[#2d3b49] sm:px-12 lg:px-16 lg:py-20">
          <h2 className="text-[44px] font-light tracking-tight">Club Search</h2>
          <p className="mt-10 max-w-[520px] text-[24px] leading-[1.55]">
            Locate and contact a club near you.
          </p>
          <a
            href="#"
            className="mt-10 inline-block text-[22px] font-medium text-[#184ea6] hover:underline"
          >
            Club Search &gt;
          </a>
        </div>
      </div>
    </section>
  );
}