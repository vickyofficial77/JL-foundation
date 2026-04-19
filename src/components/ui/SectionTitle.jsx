export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">
        {subtitle}
      </p>
      <h2 className="text-[34px] font-light tracking-tight text-slate-900 sm:text-[48px]">
        {title}
      </h2>
    </div>
  );
}