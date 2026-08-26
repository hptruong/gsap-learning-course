/**
 * Feature: Easing — cảm giác chuyển động
 * @layer features
 *
 * Theo gsap-core skill: dùng built-in eases, chỉ dùng CustomEase khi cần curve riêng.
 */
import { useRef } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";
import { Play, RotateCcw } from "lucide-react";

const EASINGS: { name: string; ease: string; color: string }[] = [
  { name: "power1.out", ease: "power1.out", color: "#6366f1" },
  { name: "power3.out", ease: "power3.out", color: "#06b6d4" },
  { name: "back.out(1.7)", ease: "back.out(1.7)", color: "#f59e0b" },
  { name: "elastic.out(1,0.3)", ease: "elastic.out(1,0.3)", color: "#ec4899" },
  { name: "bounce.out", ease: "bounce.out", color: "#22c55e" },
  { name: "expo.inOut", ease: "expo.inOut", color: "#a78bfa" },
];

export function EasingRaceTrack() {
  const scope = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope });

  const runAll = contextSafe(() => {
    gsap.killTweensOf(".ease-dot");
    gsap.set(".ease-dot", { x: 0 });
    const tl = gsap.timeline({ defaults: { duration: 1.7, overwrite: "auto" } });
    EASINGS.forEach((e, i) => {
      tl.to(`.ease-dot-${i}`, { x: 220, ease: e.ease }, i === 0 ? 0 : "<0.08");
    });
  });

  const resetAll = contextSafe(() => {
    gsap.killTweensOf(".ease-dot");
    gsap.to(".ease-dot", {
      x: 0,
      duration: 0.65,
      ease: "power3.out",
      stagger: { each: 0.05, from: "start" },
      overwrite: "auto",
    });
  });

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-indigo-400 font-mono">ease</span> — Cảm giác chuyển động
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Cùng một tween nhưng easing khác nhau cho cảm giác hoàn toàn khác. Dùng{" "}
        <code className="text-zinc-300">power3.out</code> cho entrance tự nhiên,{" "}
        <code className="text-zinc-300">back/elastic</code> cho playful,{" "}
        <code className="text-zinc-300">bounce</code> cho vui nhộn.
      </p>

      <CodeBlock
        code={`// Dùng timeline + position "<0.05" để stagger mượt hơn delay
const tl = gsap.timeline();
tl.to(".box1", { x: 220, ease: "power3.out" }, 0)
  .to(".box2", { x: 220, ease: "back.out(1.7)" }, "<0.05")
  .to(".box3", { x: 220, ease: "elastic.out(1,0.3)" }, "<0.05");`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-5 overflow-hidden">
        <div className="space-y-3">
          {EASINGS.map((e, i) => (
            <div key={e.name} className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-zinc-500 w-[148px] shrink-0 text-right hidden md:block">
                {e.name}
              </span>
              <span className="text-[11px] font-mono text-zinc-500 w-[88px] shrink-0 text-right md:hidden">
                {e.name.split("(")[0]}
              </span>
              <div className="flex-1 h-[28px] bg-white/[0.04] rounded-full border border-white/5 relative overflow-hidden flex items-center px-1">
                <div
                  className={`ease-dot ease-dot-${i} w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[9px] font-bold text-white will-change-transform`}
                  style={{ background: e.color, willChange: "transform" }}
                >
                  {i + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-5">
          <button
            onClick={runAll}
            className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Play size={14} /> Chạy so sánh
          </button>
          <button
            onClick={resetAll}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}
