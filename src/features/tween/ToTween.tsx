/**
 * Feature: gsap.to() — tween ĐẾN trạng thái mới
 * @layer features
 *
 * GSAP Core best practices áp dụng:
 * - Dùng transform aliases (x, rotation, scale) thay vì CSS transform string
 * - Dùng autoAlpha khi cần fade
 * - overwrite: "auto" để tránh conflict khi bấm nhiều lần
 * - useGSAP + contextSafe để cleanup đúng trong React (gsap-react skill)
 */
import { useRef } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";
import { Play, RotateCcw } from "lucide-react";

export function ToTween() {
  const scope = useRef<HTMLDivElement>(null);
  // useGSAP tạo gsap.context scoped — auto revert khi unmount
  const { contextSafe } = useGSAP({ scope });

  const handleTo = contextSafe(() => {
    gsap.to(".box-to", {
      x: 220,
      rotation: 360,
      scale: 1.15,
      duration: 1.15,
      ease: "power3.out",
      overwrite: "auto",
    });
  });

  const handleReset = contextSafe(() => {
    gsap.to(".box-to", {
      x: 0,
      rotation: 0,
      scale: 1,
      duration: 0.75,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  });

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm tracking-wide">
          <span className="text-indigo-400 font-mono">gsap.to()</span> — Đến trạng thái mới
        </h3>
        <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-mono">
          phổ biến nhất
        </span>
      </div>
      <p className="text-xs text-zinc-500 mb-4">
        Từ trạng thái hiện tại → animate đến giá trị bạn chỉ định. Dùng cho di chuyển, fade, scale...
      </p>

      <CodeBlock
        code={`// gsap.to — chậm hơn để nhìn rõ easing
gsap.to(".box", {
  x: 220, rotation: 360, scale: 1.15,
  duration: 1.15, ease: "power3.out", overwrite: "auto",
});`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-6 overflow-hidden">
        <div className="h-[72px] flex items-center">
          <div
            className="box-to w-[64px] h-[64px] rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 border border-white/10 flex items-center justify-center text-[11px] font-mono text-zinc-300 shrink-0 will-change-transform"
            style={{ willChange: "transform" }}
          >
            BOX
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleTo}
            className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Play size={14} /> Chạy gsap.to()
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}
