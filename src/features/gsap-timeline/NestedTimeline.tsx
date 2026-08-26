/**
 * Feature: Nested Timeline — timeline lồng timeline
 * @layer features
 *
 * Theo gsap-timeline skill: dùng gsap.timeline() lồng nhau + master.add(child)
 */
import { useRef } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";
import { Play, Rewind } from "lucide-react";

export function NestedTimeline() {
  const scope = useRef<HTMLDivElement>(null);
  const masterRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const master = gsap.timeline({ paused: true });

      // Child timelines với immediateRender:false để không ẩn elements trước khi Play
      const intro = gsap.timeline();
      intro
        .from(".nested-title", {
          y: 20,
          autoAlpha: 0,
          duration: 0.4,
          ease: "power3.out",
          immediateRender: false,
        })
        .from(".nested-sub", { y: 12, autoAlpha: 0, duration: 0.3, immediateRender: false }, "-=0.15");

      const cards = gsap.timeline();
      cards.from(".nested-card", {
        y: 24,
        autoAlpha: 0,
        scale: 0.96,
        duration: 0.4,
        stagger: 0.08,
        ease: "power3.out",
        immediateRender: false,
      });

      const cta = gsap.timeline();
      cta.from(".nested-cta", {
        scale: 0.9,
        autoAlpha: 0,
        duration: 0.4,
        ease: "back.out(1.4)",
        immediateRender: false,
      });

      master.add(intro).add(cards, "+=0.1").add(cta, "-=0.15");
      masterRef.current = master;
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-fuchsia-400 font-mono">Nested Timeline</span> — Timeline lồng timeline
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Mỗi section là 1 child timeline — <code className="text-zinc-300">master.add(child)</code> để
        ghép thành câu chuyện lớn. Dễ maintain, dễ reorder.
      </p>

      <CodeBlock
        code={`const master = gsap.timeline({ paused: true });

// Child timelines — mỗi cái là 1 chapter
const intro = gsap.timeline();
intro.from(".title", { y: 20, autoAlpha: 0 })
     .from(".sub", { y: 12, autoAlpha: 0 }, "-=0.15");

const cards = gsap.timeline();
cards.from(".card", { y: 24, autoAlpha: 0, stagger: 0.08 });

const cta = gsap.timeline();
cta.from(".cta", { scale: 0.9, autoAlpha: 0, ease: "back.out(1.4)" });

// Ghép vào master — như lắp LEGO
master.add(intro).add(cards, "+=0.1").add(cta, "-=0.15");
master.play(); // chạy toàn bộ như 1 timeline duy nhất`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-5 overflow-hidden">
        <div className="text-center">
          <div className="nested-title text-lg font-black tracking-tight">Nested Timeline Demo</div>
          <div className="nested-sub text-xs text-zinc-500 mt-1">3 child timelines ghép vào 1 master</div>

          <div className="grid grid-cols-3 gap-2 mt-5 max-w-[360px] mx-auto">
            <div className="nested-card h-[64px] rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-mono text-zinc-300">
              Card 1
            </div>
            <div className="nested-card h-[64px] rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-mono text-zinc-300">
              Card 2
            </div>
            <div className="nested-card h-[64px] rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-mono text-zinc-300">
              Card 3
            </div>
          </div>

          <button className="nested-cta mt-5 px-5 py-2.5 rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold transition">
            Call to Action
          </button>
        </div>

        <div className="flex gap-2 mt-6 justify-center">
          <button
            onClick={() => masterRef.current?.restart()}
            className="px-4 py-2 rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Play size={14} /> Play master
          </button>
          <button
            onClick={() => masterRef.current?.reverse()}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Rewind size={14} /> Reverse
          </button>
        </div>
      </div>
    </div>
  );
}
