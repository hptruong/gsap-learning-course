/**
 * Feature: Timeline Control — repeat, yoyo, timeScale, callbacks
 * @layer features
 */
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";
import { Clock3 } from "lucide-react";

export function ControlledTimeline() {
  const scope = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [speed, setSpeed] = useState(1);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1, // lặp vô hạn
        yoyo: true, // đảo chiều mỗi lần lặp
        repeatDelay: 0.3,
      });

      tl.to(".ctrl-dot", {
        x: 220,
        rotation: 360,
        backgroundColor: "#6366f1",
        duration: 0.8,
        ease: "power2.inOut",
      })
        .to(".ctrl-dot", { scale: 1.3, duration: 0.15, ease: "power2.out" }, "-=0.15")
        .to(".ctrl-dot", { scale: 1, duration: 0.15, ease: "power2.inOut" });

      tlRef.current = tl;
    },
    { scope }
  );

  const setTimeScale = (v: number) => {
    setSpeed(v);
    tlRef.current?.timeScale(v);
  };

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-indigo-400 font-mono">Timeline Control</span> — repeat, yoyo, timeScale,
        callbacks
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Timeline là 1 tween — có <code className="text-zinc-300">repeat, yoyo, timeScale</code>,{" "}
        <code className="text-zinc-300">progress()</code> và callbacks y hệt tween.
      </p>

      <CodeBlock
        code={`const tl = gsap.timeline({
  repeat: -1,       // lặp vô hạn (-1)
  yoyo: true,       // đảo chiều mỗi lần lặp
  repeatDelay: 0.3, // nghỉ giữa các lần lặp
  onStart: () => console.log("bắt đầu"),
  onComplete: () => console.log("xong 1 lượt"),
  onUpdate: () => console.log(tl.progress()), // 0 → 1
});

tl.to(".dot", { x: 220, rotation: 360, duration: 0.8 })
  .to(".dot", { scale: 1.3, duration: 0.15 }, "-=0.15")
  .to(".dot", { scale: 1, duration: 0.15 });

// Điều khiển tốc độ toàn bộ timeline
tl.timeScale(2);   // nhanh gấp đôi
tl.timeScale(0.5); // chậm một nửa
tl.pause() / tl.play() / tl.reverse() / tl.progress(0.5)`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-6 overflow-hidden">
        <div className="h-[56px] flex items-center">
          <div className="ctrl-dot w-12 h-12 rounded-xl bg-zinc-700 border border-white/10 flex items-center justify-center text-[10px] font-mono text-white shrink-0">
            LOOP
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-xs text-zinc-500 font-mono">Speed:</span>
          {[0.5, 1, 1.5, 2].map((v) => (
            <button
              key={v}
              onClick={() => setTimeScale(v)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold font-mono transition border ${
                speed === v
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {v}×
            </button>
          ))}
          <span className="ml-2 text-[11px] text-zinc-500 flex items-center gap-1.5">
            <Clock3 size={12} /> repeat: -1 + yoyo
          </span>
        </div>
      </div>
    </div>
  );
}
