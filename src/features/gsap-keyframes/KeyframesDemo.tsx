/**
 * Feature: keyframes — multi-step trong 1 tween
 * @layer features
 */
import { useRef } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";
import { Play, RotateCcw } from "lucide-react";

export function KeyframesDemo() {
  const scope = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope });

  const run = contextSafe(() => {
    gsap.killTweensOf(".box-kf");
    // keyframes: gom nhiều bước vào 1 tween thay vì timeline dài
    gsap.to(".box-kf", {
      keyframes: [
        { x: 120, scale: 1.2, duration: 0.3, ease: "power2.out" },
        { y: -40, rotation: 180, duration: 0.3, ease: "power2.inOut" },
        { x: 0, y: 0, scale: 1, rotation: 360, duration: 0.5, ease: "back.out(1.2)" },
      ],
      overwrite: "auto",
    });
  });

  const reset = contextSafe(() => {
    gsap.set(".box-kf", { clearProps: "all" });
  });

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-emerald-400 font-mono">keyframes</span> — Multi-step trong 1 tween
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Thay vì <code className="text-zinc-300">timeline.to().to().to()</code> dài dòng — gom các bước
        vào <code className="text-zinc-300">keyframes: []</code> trong 1 tween duy nhất.
      </p>

      <CodeBlock
        code={`gsap.to(".box", {
  keyframes: [
    { x: 120, scale: 1.2, duration: 0.3, ease: "power2.out" },
    { y: -40, rotation: 180, duration: 0.3, ease: "power2.inOut" },
    { x: 0, y: 0, scale: 1, rotation: 360, duration: 0.5, ease: "back.out(1.2)" },
  ],
});`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-6 overflow-hidden">
        <div className="h-[100px] flex items-center">
          <div className="box-kf w-[56px] h-[56px] rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[11px] font-mono text-emerald-300 shrink-0">
            KF
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={run}
            className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Play size={14} /> Chạy keyframes
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}
