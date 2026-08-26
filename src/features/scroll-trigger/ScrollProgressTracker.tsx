/**
 * Feature: Standalone ScrollTrigger — ScrollTrigger.create() + progress + toggleClass
 * @layer features
 *
 * Edge cases theo gsap-scrolltrigger skill:
 * - ScrollTrigger.create() tạo trigger KHÔNG gắn animation — dùng callback tự do
 * - onUpdate(self) → self.progress (0→1), self.direction (1 xuống / -1 lên)
 * - toggleClass: thêm/xoá class khi trigger active — không cần animation
 * - self.kill() trong callback để dọn dẹp
 */
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";

export function ScrollProgressTracker() {
  const scope = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isActive, setIsActive] = useState(false);

  useGSAP(
    () => {
      // Standalone trigger — không có animation, chỉ đọc dữ liệu scroll
      ScrollTrigger.create({
        trigger: ".st-progress-stage",
        start: "top 80%",
        end: "bottom 20%",
        onUpdate: (self) => {
          setProgress(self.progress); // 0 → 1 theo range start→end
          setDirection(self.direction); // 1 = cuộn xuống, -1 = cuộn lên
          if (barRef.current) {
            gsap.set(barRef.current, { scaleX: self.progress });
          }
        },
        onToggle: (self) => setIsActive(self.isActive),
      });

      // toggleClass: thêm class "is-flipped" khi trigger active — không cần tween
      ScrollTrigger.create({
        trigger: ".st-progress-badge",
        start: "top 70%",
        end: "bottom 30%",
        toggleClass: { targets: ".st-progress-badge", className: "is-flipped" },
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-indigo-400 font-mono">ScrollTrigger.create()</span> — Standalone:
        progress, direction, toggleClass
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Trigger <b className="text-zinc-300">không cần animation</b> — dùng callback để đọc{" "}
        <code className="text-zinc-300">progress</code> (0→1),{" "}
        <code className="text-zinc-300">direction</code>, hoặc toggle class thuần CSS.
      </p>

      <CodeBlock
        code={`ScrollTrigger.create({
  trigger: ".stage",
  start: "top 80%",
  end: "bottom 20%",
  onUpdate: (self) => {
    console.log(self.progress);  // 0 → 1
    console.log(self.direction); // 1 xuống, -1 lên
  },
  onToggle: (self) => console.log(self.isActive),
});

// toggleClass — thêm/xoá class khi active, không cần tween
ScrollTrigger.create({
  trigger: ".badge",
  toggleClass: { targets: ".badge", className: "is-flipped" },
});`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-5">
        {/* Progress bar — scaleX theo progress, transform-origin left */}
        <div className="h-2.5 rounded-full bg-white/5 border border-white/10 overflow-hidden mb-4">
          <div
            ref={barRef}
            className="h-full w-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          {[
            { label: "progress", value: `${(progress * 100).toFixed(1)}%` },
            { label: "direction", value: direction === 1 ? "↓ xuống" : "↑ lên" },
            { label: "isActive", value: isActive ? "true" : "false" },
          ].map((x) => (
            <div key={x.label} className="rounded-lg bg-white/[0.04] border border-white/5 py-2">
              <div className="text-[10px] font-mono text-zinc-600">{x.label}</div>
              <div className="text-xs font-mono font-bold text-indigo-300 mt-0.5">{x.value}</div>
            </div>
          ))}
        </div>

        <div className="st-progress-stage h-[240px] rounded-lg border border-dashed border-white/15 flex flex-col items-center justify-center gap-4">
          <div className="st-progress-badge w-[96px] h-[96px] rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-white transition-transform duration-500">
            BADGE
          </div>
          <span className="text-[11px] text-zinc-600 font-mono">
            badge xoay qua CSS class "is-flipped" (toggleClass)
          </span>
        </div>
      </div>

      {/* CSS cho toggleClass — thuần transition, không JS */}
      <style>{`
        .is-flipped { transform: rotate(135deg) scale(1.15); }
      `}</style>
    </div>
  );
}
