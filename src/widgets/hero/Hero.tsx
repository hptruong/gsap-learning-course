/**
 * Widget: Hero — intro với GSAP timeline entrance
 * @layer widgets
 */
import { useRef } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { Sparkles, ChevronDown } from "lucide-react";

export function Hero() {
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
        <Sparkles size={14} /> GSAP 3.15 · React 19 · Feature-Sliced · 8 Skills
      </div>

      <h1 className="hero-title mt-5 text-[36px] md:text-[52px] font-black tracking-[-0.04em] leading-[0.9]">
        <span className="inline-block">Tween</span>{" "}
        <span className="inline-block text-indigo-400">&</span>{" "}
        <span className="inline-block">Timeline</span>
        <br />
        <span className="inline-block text-zinc-500 text-[28px] md:text-[40px]">từ A → Z</span>
      </h1>

      <p className="hero-sub mt-4 text-sm md:text-[15px] leading-relaxed text-zinc-400 max-w-2xl">
        Demo tương tác chi tiết cho từng phần của GSAP Tween và Timeline — mỗi ví dụ đều có{" "}
        <b className="text-zinc-200">code + comment tiếng Việt</b> và nút bấm để chạy thử ngay. Dùng 8
        GSAP AI Skills chính thức.
      </p>

      <nav className="hero-nav mt-6 flex flex-wrap gap-2 md:hidden">
        {[
          { href: "#tween", label: "Tween" },
          { href: "#easing", label: "Easing" },
          { href: "#stagger", label: "Stagger" },
          { href: "#keyframes", label: "Keyframes" },
          { href: "#timeline", label: "Timeline" },
        ].map((n) => (
          <a
            key={n.href}
            href={n.href}
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-zinc-300"
          >
            {n.label}
          </a>
        ))}
      </nav>

      <div className="mt-8 flex items-center gap-2 text-xs text-zinc-500">
        <ChevronDown size={14} className="animate-bounce" /> Kéo xuống để xem từng phần
      </div>
    </div>
  );
}
