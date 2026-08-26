/**
 * Feature: scrub — animation bám theo vị trí scroll
 * @layer features
 *
 * Edge cases theo gsap-scrolltrigger skill:
 * - scrub: true = progress bám 1:1 với scroll
 * - scrub: <number> = số GIÂY playhead "đuổi kịp" vị trí scroll → mượt hơn
 * - scrub + timeline: cả timeline chạy theo scroll, không phải từng tween
 * - scrub thường đi kèm ease: "none" trên tween để mapping scroll → position tuyến tính
 */
import { useRef } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";

export function ScrubScroller() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // scrub: true — bám sát scroll từng pixel, cảm giác "cứng"
      gsap.to(".st-scrub-instant", {
        x: 260,
        ease: "none", // ease none để mapping scroll → x tuyến tính, chính xác 1:1
        scrollTrigger: {
          trigger: ".st-scrub-stage-instant",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      // scrub: 1 — playhead mất 1s để đuổi kịp → mượt, "lười" tự nhiên hơn
      gsap.to(".st-scrub-smooth", {
        x: 260,
        ease: "none",
        scrollTrigger: {
          trigger: ".st-scrub-stage-smooth",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      // scrub + timeline — nhiều bước chạy liên tục theo scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".st-scrub-stage-timeline",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 0.8,
        },
        defaults: { ease: "none" },
      });
      // ScrollTrigger nằm TRÊN TIMELINE — không bao giờ trên child tween
      tl.to(".st-scrub-step", { scale: 1.3, stagger: 0.2 })
        .to(".st-scrub-step", { rotation: 180, stagger: 0.2 })
        .to(".st-scrub-step", { scale: 1, rotation: 360, stagger: 0.2 });
    },
    { scope }
  );

  return (
    <div ref={scope} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-cyan-400 font-mono">scrub</span> — Animation bám scroll
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Với <code className="text-zinc-300">scrub</code>, animation không chạy theo thời gian nữa mà
        chạy theo <b className="text-zinc-300">vị trí cuộn</b>. Cuộn tới đâu, animation đến đó.
      </p>

      <CodeBlock
        code={`// scrub: true — bám 1:1 từng pixel scroll (cảm giác "cứng")
gsap.to(".dot", {
  x: 260, ease: "none",
  scrollTrigger: { trigger: ".stage", start: "top 80%", end: "bottom 20%", scrub: true }
});

// scrub: 1 — playhead mất 1s đuổi kịp scroll → mượt, tự nhiên hơn
gsap.to(".dot", {
  x: 260, ease: "none",
  scrollTrigger: { trigger: ".stage", scrub: 1 }
});

// scrub + TIMELINE: cả sequence chạy theo scroll
const tl = gsap.timeline({
  scrollTrigger: { trigger: ".stage", scrub: 0.8 },
  defaults: { ease: "none" },
});
tl.to(".a", { scale: 1.3 }).to(".a", { rotation: 180 });`}
      />

      <div className="mt-5 space-y-4">
        {[
          {
            cls: "instant",
            label: "scrub: true",
            hint: "bám sát từng pixel — giật theo tay scroll",
          },
          {
            cls: "smooth",
            label: "scrub: 1",
            hint: "trễ 1s đuổi kịp — mượt và 'lười' hơn",
          },
        ].map((row) => (
          <div key={row.cls} className="bg-[#0a0a14] rounded-xl border border-white/5 p-4">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xs font-mono font-bold text-cyan-300">{row.label}</span>
              <span className="text-[11px] text-zinc-600">{row.hint}</span>
            </div>
            <div
              className={`st-scrub-stage-${row.cls} h-[72px] rounded-lg border border-dashed border-white/15 flex items-center px-2`}
            >
              <div
                className={`st-scrub-${row.cls} w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 border border-white/10 flex items-center justify-center text-[10px] font-mono font-bold text-white shrink-0`}
              >
                {row.cls === "instant" ? "1:1" : "1s"}
              </div>
            </div>
          </div>
        ))}

        <div className="bg-[#0a0a14] rounded-xl border border-white/5 p-4">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xs font-mono font-bold text-cyan-300">scrub + timeline</span>
            <span className="text-[11px] text-zinc-600">
              scale → rotation → reset, tất cả theo scroll
            </span>
          </div>
          <div className="st-scrub-stage-timeline h-[72px] rounded-lg border border-dashed border-white/15 flex items-center justify-center gap-3 px-2">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="st-scrub-step w-11 h-11 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 border border-white/10 flex items-center justify-center text-[10px] font-mono font-bold text-white"
              >
                {n}
              </div>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-zinc-600">
          Mẹo: cuộn chậm qua từng khối để cảm nhận khác biệt giữa <code>scrub: true</code> và{" "}
          <code>scrub: 1</code>.
        </p>
      </div>
    </div>
  );
}
