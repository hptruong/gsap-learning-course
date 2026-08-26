/**
 * Feature: ScrollTrigger Basics — trigger + start/end + markers + once
 * @layer features
 *
 * Edge cases theo gsap-scrolltrigger skill:
 * - start/end format: "triggerPosition viewportPosition" (vd "top center")
 * - Giá trị số = pixel scroll từ đầu trang; "clamp()" giữ start/end trong page bounds
 * - markers chỉ dùng khi dev — không để trong production
 * - once: true → kill ScrollTrigger sau khi chạy xong 1 lần
 * - useGSAP + dependencies + revertOnUpdate để rebuild khi đổi config
 */
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";

const START_END_PRESETS = [
  { label: 'start: "top bottom" (mặc định)', start: "top bottom", end: "bottom top" },
  { label: '"top center" → "bottom center"', start: "top center", end: "bottom center" },
  { label: '"top 80%" → "top 30%"', start: "top 80%", end: "top 30%" },
  { label: '"center center" → "+=300"', start: "center center", end: "+=300" },
];

export function ScrollTriggerBasics() {
  const scope = useRef<HTMLDivElement>(null);
  const [preset, setPreset] = useState(1);
  const [showMarkers, setShowMarkers] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [enterCount, setEnterCount] = useState(0);

  useGSAP(
    () => {
      const { start, end } = START_END_PRESETS[preset];
      // ScrollTrigger đặt trên TWEEN cấp cao nhất — không bao giờ trên child của timeline
      gsap.from(".st-basic-box", {
        x: -120,
        autoAlpha: 0,
        rotation: -12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".st-basic-stage",
          start,
          end,
          markers: showMarkers, // chỉ bật khi dev/debug
          once: playOnce, // true → tự kill sau lần đầu chạy xong
          toggleActions: "play none none none",
          onEnter: () => setEnterCount((c) => c + 1),
        },
      });
    },
    { scope, dependencies: [preset, showMarkers, playOnce], revertOnUpdate: true }
  );

  const current = START_END_PRESETS[preset];

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6"
    >
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-emerald-400 font-mono">trigger + start/end</span> — Animation neo vào
        vị trí scroll
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        <code className="text-zinc-300">start</code> = "vị trí của trigger" chạm "vị trí của
        viewport" thì animation bắt đầu. Format:{" "}
        <code className="text-amber-300">"top center"</code> = đỉnh element chạm giữa màn hình.
      </p>

      <CodeBlock
        code={`gsap.from(".box", {
  x: -120, autoAlpha: 0, duration: 0.9,
  scrollTrigger: {
    trigger: ".stage",
    start: "top center",   // đỉnh .stage chạm giữa viewport
    end: "bottom center",  // đáy .stage chạm giữa viewport
    markers: true,         // CHỈ dùng khi debug — xoá trước khi production
    once: false,           // true = chạy 1 lần rồi kill trigger
    toggleActions: "play none none none",
  },
});

// start/end cũng nhận số (px scroll) hoặc function:
// start: 500, end: () => "+=" + window.innerHeight * 2
// start: "clamp(top bottom)" — giữ trong page bounds (v3.12+)`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-5">
        <div className="flex flex-wrap gap-2 mb-4">
          {START_END_PRESETS.map((p, i) => (
            <button
              key={p.start}
              onClick={() => setPreset(i)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold font-mono transition border ${
                preset === i
                  ? "bg-emerald-600 border-emerald-500 text-white"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              {p.start} → {p.end}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-4 text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showMarkers}
              onChange={(e) => setShowMarkers(e.target.checked)}
              className="accent-emerald-500"
            />
            <span className="font-mono text-zinc-400">markers: true</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={playOnce}
              onChange={(e) => setPlayOnce(e.target.checked)}
              className="accent-emerald-500"
            />
            <span className="font-mono text-zinc-400">once: true</span>
          </label>
          <span className="text-zinc-600 font-mono">onEnter: {enterCount} lần</span>
        </div>

        {/* Stage cao hơn viewport một chút để có khoảng scroll cho start/end */}
        <div className="st-basic-stage h-[280px] rounded-lg border border-dashed border-white/15 flex items-center justify-center relative overflow-hidden">
          <span className="absolute top-2 left-3 text-[10px] font-mono text-zinc-600">
            .stage — {current.start} → {current.end}
          </span>
          <div className="st-basic-box w-[120px] h-[80px] rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-white">
            SCROLL ME
          </div>
        </div>
        <p className="text-[11px] text-zinc-600 mt-3">
          Cuộn trang lên xuống qua khối trên để thấy start/end kích hoạt. Đổi preset để so sánh vị
          trí trigger.
        </p>
      </div>
    </div>
  );
}
