/**
 * Feature: gsap.fromTo() — kiểm soát tuyệt đối FROM và TO
 * @layer features
 *
 * Không phụ thuộc CSS gốc — explicit start & end, tránh flash.
 */
import { useRef } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";
import { Zap, RotateCcw } from "lucide-react";

export function FromToTween() {
  const scope = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope });

  const handleFromTo = contextSafe(() => {
    gsap.killTweensOf(".box-fromto");
    gsap.fromTo(
      ".box-fromto",
      { x: -32, scale: 0.6, rotation: -120, autoAlpha: 0 },
      { x: 220, scale: 1, rotation: 0, autoAlpha: 1, duration: 1.2, ease: "power3.inOut", overwrite: "auto" }
    );
  });

  const handleReset = contextSafe(() => {
    // clearProps: xóa inline style GSAP để về CSS gốc
    gsap.set(".box-fromto", { clearProps: "all" });
  });

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-fuchsia-400 font-mono">gsap.fromTo()</span> — Kiểm soát tuyệt đối
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Chỉ định cả <b>điểm bắt đầu</b> và <b>điểm kết thúc</b> — không phụ thuộc CSS gốc. Dùng khi
        cần animation chính xác hoặc loop.
      </p>

      <CodeBlock
        code={`// gsap.fromTo — timing chậm hơn để rõ quỹ đạo
gsap.fromTo(".box",
  { x: -32, scale: 0.6, rotation: -120, autoAlpha: 0 },
  { x: 220, scale: 1, rotation: 0, autoAlpha: 1,
    duration: 1.2, ease: "power3.inOut" }
);
gsap.set(".box", { clearProps: "all" });`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-6 overflow-hidden">
        <div className="h-[72px] flex items-center">
          <div
            className="box-fromto w-[64px] h-[64px] rounded-xl bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center text-[11px] font-mono text-fuchsia-300 shrink-0 will-change-transform"
            style={{ willChange: "transform, opacity" }}
          >
            F→T
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleFromTo}
            className="px-4 py-2 rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Zap size={14} /> Chạy fromTo()
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <RotateCcw size={14} /> Clear
          </button>
        </div>
      </div>
    </div>
  );
}
