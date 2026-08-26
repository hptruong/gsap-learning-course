/**
 * Widget: Hero — intro configurable theo page
 * @layer widgets
 */
import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { Sparkles, ChevronDown, ArrowRight } from "lucide-react";

export interface HeroProps {
  badge: string;
  titleLines: { text: string; accent?: boolean; small?: boolean }[];
  sub: string;
  sections: { href: string; label: string }[];
  nextPage?: { to: string; label: string };
}

export function Hero({ badge, titleLines, sub, sections, nextPage }: HeroProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-badge", { y: 12, autoAlpha: 0, duration: 0.5 })
        .from(".hero-title span", { y: 40, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, "-=0.2")
        .from(".hero-sub", { y: 12, autoAlpha: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-nav a", { y: 8, autoAlpha: 0, duration: 0.4, stagger: 0.06 }, "-=0.2");
    },
    { scope }
  );

  return (
    <div ref={scope} className="max-w-[980px] mx-auto px-4 md:px-6 pt-10 md:pt-14 pb-6">
      <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-300">
        <Sparkles size={14} /> {badge}
      </div>

      <h1 className="hero-title mt-5 text-[36px] md:text-[52px] font-black tracking-[-0.04em] leading-[0.9]">
        {titleLines.map((line, i) => (
          <span key={i}>
            <span
              className={`inline-block ${line.accent ? "text-indigo-400" : ""} ${
                line.small ? "text-zinc-500 text-[28px] md:text-[40px]" : ""
              }`}
            >
              {line.text}
            </span>{" "}
          </span>
        ))}
      </h1>

      <p className="hero-sub mt-4 text-sm md:text-[15px] leading-relaxed text-zinc-400 max-w-2xl">
        {sub}
      </p>

      <nav className="hero-nav mt-6 flex flex-wrap items-center gap-2">
        {sections.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-zinc-300 hover:bg-white/10 transition"
          >
            {n.label}
          </a>
        ))}
        {nextPage && (
          <Link
            to={nextPage.to}
            className="px-3 py-1.5 rounded-full bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-500 transition flex items-center gap-1.5"
          >
            {nextPage.label} <ArrowRight size={13} />
          </Link>
        )}
      </nav>

      <div className="mt-8 flex items-center gap-2 text-xs text-zinc-500">
        <ChevronDown size={14} className="animate-bounce" /> Kéo xuống để xem từng phần
      </div>
    </div>
  );
}
