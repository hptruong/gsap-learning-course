/**
 * Widget: Header — sticky nav
 * @layer widgets
 */
import { Code2 } from "lucide-react";

const NAV = [
  { href: "#tween", label: "Tween" },
  { href: "#easing", label: "Easing" },
  { href: "#stagger", label: "Stagger" },
  { href: "#keyframes", label: "Keyframes" },
  { href: "#timeline", label: "Timeline" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#0f0f1a]/70 border-b border-white/5">
      <div className="max-w-[980px] mx-auto px-4 md:px-6 h-[56px] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-sm">
            G
          </div>
          <span className="font-black tracking-tight text-sm">GSAP DEMO</span>
          <span className="hidden md:inline text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 font-mono">
            Tween + Timeline
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="px-3 py-1.5 rounded-full text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="https://gsap.com/docs/v3/"
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-100 transition flex items-center gap-1.5 shrink-0"
        >
          <Code2 size={14} /> Docs
        </a>
      </div>
    </header>
  );
}
