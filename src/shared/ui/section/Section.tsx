/**
 * Section — wrapper cho mỗi phase/demo section.
 * Hiển thị number, title, subtitle, icon theo design system.
 */
export function Section({
  id,
  number,
  title,
  subtitle,
  icon,
  children,
}: {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
          {icon}
        </span>
        <span className="text-xs font-mono tracking-widest text-indigo-400 font-bold">{number}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-indigo-500/30 to-transparent" />
      </div>
      <h2 className="text-[28px] md:text-[32px] font-black tracking-tight leading-none">{title}</h2>
      <p className="text-sm text-zinc-400 mt-2 mb-8 max-w-2xl leading-relaxed">{subtitle}</p>
      {children}
    </section>
  );
}
