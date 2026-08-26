/**
 * Feature: stagger — animation nhóm lan tỏa
 * @layer features
 *
 * Theo gsap-core: stagger có thể là number hoặc object với from, grid, amount, each.
 */
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";
import { Play } from "lucide-react";

export function StaggerGrid() {
  const scope = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope });
  const [mode, setMode] = useState<"each" | "grid" | "center" | "random">("each");

  const run = contextSafe(() => {
    // Kill tween cũ + reset về trạng thái gốc để tránh flash khi spam click
    gsap.killTweensOf(".stagger-box");
    gsap.set(".stagger-box", { clearProps: "all" });

    const configs: Record<string, gsap.StaggerVars> = {
      each: { each: 0.08 },
      grid: { amount: 0.8, grid: [2, 4], from: "start" as const },
      center: { amount: 0.6, from: "center" as const },
      random: { each: 0.07, from: "random" as const },
    };

    gsap.from(".stagger-box", {
      y: 30,
      autoAlpha: 0,
      scale: 0.85,
      rotation: -5,
      duration: 0.5,
      ease: "back.out(1.4)",
      stagger: configs[mode],
      overwrite: "auto",
    });
  });

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-violet-400 font-mono">stagger</span> — Animation nhóm lan tỏa
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Một dòng <code className="text-zinc-300">stagger</code> thay cho loop thủ công. Hỗ trợ{" "}
        <code className="text-zinc-300">each</code>, <code className="text-zinc-300">amount</code>,{" "}
        <code className="text-zinc-300">grid</code>, <code className="text-zinc-300">from: center/random/edges</code>.
      </p>

      <CodeBlock
        code={`// stagger đơn giản — mỗi box cách nhau 0.08s
gsap.from(".box", { y: 30, autoAlpha: 0, stagger: { each: 0.08 } });

// stagger theo grid 2×4 — lan tỏa như sóng
gsap.from(".box", { y: 30, autoAlpha: 0, stagger: { amount: 0.8, grid: [2,4] } });

// từ giữa lan ra
gsap.from(".box", { y: 30, autoAlpha: 0, stagger: { amount: 0.6, from: "center" } });

// ngẫu nhiên
gsap.from(".box", { y: 30, autoAlpha: 0, stagger: { each: 0.07, from: "random" } });`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-5 overflow-hidden">
        <div className="grid grid-cols-4 gap-2 max-w-[360px] mx-auto">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="stagger-box h-[56px] rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-white"
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-5">
          <div className="flex gap-1 p-1 rounded-full bg-white/5 border border-white/10">
            {(["each", "grid", "center", "random"] as const).map((val) => (
              <button
                key={val}
                onClick={() => setMode(val)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                  mode === val
                    ? "bg-violet-600 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
          <button
            onClick={run}
            className="ml-auto px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Play size={14} /> Chạy stagger
          </button>
        </div>
      </div>
    </div>
  );
}
