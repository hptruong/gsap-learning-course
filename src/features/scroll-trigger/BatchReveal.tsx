/**
 * Feature: ScrollTrigger.batch() — reveal nhóm element khi vào viewport
 * @layer features
 *
 * Edge cases theo gsap-scrolltrigger skill:
 * - batch = 1 ScrollTrigger per target + gom callback trong interval ngắn
 * - Callback nhận (elements, scrollTriggers) — KHÁCH với callback thường (nhận instance)
 * - Không truyền trigger/animation/scrub/snap vào batch vars
 * - batchMax có thể là function → responsive theo viewport
 * - Thay thế IntersectionObserver + stagger gọn hơn nhiều
 */
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";

const CARDS = Array.from({ length: 12 }, (_, i) => i + 1);

export function BatchReveal() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Set trạng thái ẩn ban đầu bằng gsap.set — không dùng CSS để tránh FOUC ngược
      gsap.set(".st-batch-card", { autoAlpha: 0, y: 48 });

      ScrollTrigger.batch(".st-batch-card", {
        start: "top 88%",
        once: true, // reveal 1 lần — không animate lại khi scroll lên
        interval: 0.1, // gom callback trong 0.1s thành 1 batch
        batchMax: 4, // tối đa 4 element/batch (có thể là function responsive)
        onEnter: (elements) =>
          gsap.to(elements, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          }),
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-violet-400 font-mono">ScrollTrigger.batch()</span> — Reveal theo lô
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Thay vì tạo 1 tween cho từng element,{" "}
        <code className="text-zinc-300">batch()</code> gom mọi element vừa vào viewport trong ~1
        frame rồi animate <b className="text-zinc-300">cùng lúc với stagger</b> — thay thế hoàn hảo
        cho IntersectionObserver.
      </p>

      <CodeBlock
        code={`gsap.set(".card", { autoAlpha: 0, y: 48 });

ScrollTrigger.batch(".card", {
  start: "top 88%",
  once: true,          // reveal 1 lần rồi kill
  interval: 0.1,       // gom callback trong 0.1s
  batchMax: 4,         // tối đa 4 element/batch (function = responsive)
  onEnter: (elements) =>   // ⚠️ nhận ARRAY element, không phải instance
    gsap.to(elements, { autoAlpha: 1, y: 0, stagger: 0.08, overwrite: true }),
  // ❌ không truyền: trigger, animation, scrub, snap, toggleActions vào batch
});`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {CARDS.map((n) => (
            <div
              key={n}
              className="st-batch-card h-[72px] rounded-xl bg-gradient-to-br from-violet-600/80 to-indigo-600/80 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-white"
            >
              {n}
            </div>
          ))}
        </div>
        <p className="text-[11px] text-zinc-600 mt-3">
          Cuộn xuống — các card vào viewport theo lô 4 cái, mỗi lô stagger 0.08s.{" "}
          <code>once: true</code> nên không animate lại khi cuộn lên.
        </p>
      </div>
    </div>
  );
}
