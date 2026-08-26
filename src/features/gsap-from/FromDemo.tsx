/**
 * Feature: gsap.from() — tween TỪ trạng thái chỉ định VỀ CSS gốc
 * @layer features
 *
 * Lưu ý GSAP core:
 * - immediateRender: true (mặc định) → "from" state áp dụng ngay khi tạo tween
 * - Nếu nhiều from() cùng target/property, set immediateRender: false cho tween sau
 */
import { useRef } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";
import { Sparkles } from "lucide-react";

export function FromDemo() {
  const scope = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope });

  const handleFrom = contextSafe(() => {
    // Kill tween cũ trước khi tạo mới để tránh stack khi spam click
    gsap.killTweensOf(".box-from");
    // gsap.from() — bắt đầu TỪ giá trị chỉ định, animate về CSS gốc
    gsap.from(".box-from", {
      y: 60, // bắt đầu thấp hơn 60px → bay lên vị trí gốc
      autoAlpha: 0, // dùng autoAlpha thay vì opacity (gsap-performance)
      scale: 0.8,
      duration: 0.7,
      ease: "back.out(1.4)", // vượt đích rồi bật lại — đàn hồi
      overwrite: "auto",
    });
  });

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-amber-400 font-mono">gsap.from()</span> — Từ trạng thái chỉ định
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Ngược với <code className="text-zinc-300">to()</code> — bạn mô tả điểm <b>bắt đầu</b>, GSAP sẽ
        animate về CSS gốc. Hợp cho entrance / reveal.
      </p>

      <CodeBlock
        code={`// gsap.from(target, vars) — animate TỪ giá trị chỉ định về CSS gốc
gsap.from(".box", {
  y: 60,                 // bắt đầu thấp hơn 60px
  autoAlpha: 0,          // autoAlpha = opacity + visibility
  scale: 0.8,            // bắt đầu nhỏ hơn
  duration: 0.7,
  ease: "back.out(1.4)", // overshoot đàn hồi
});`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-6 overflow-hidden">
        <div className="h-[72px] flex items-center">
          <div className="box-from w-[64px] h-[64px] rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[11px] font-mono text-amber-300 shrink-0">
            FROM
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleFrom}
            className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition flex items-center gap-1.5"
          >
            <Sparkles size={14} /> Chạy gsap.from()
          </button>
          <span className="text-[11px] text-zinc-500 self-center ml-2">Thử bấm nhiều lần</span>
        </div>
      </div>
    </div>
  );
}
