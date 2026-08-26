/**
 * Feature: Timeline Control — repeat, yoyo, timeScale, callbacks
 * @layer features
 */
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";
import { Clock3 } from "lucide-react";

export function TimelinePlaybackControl() {
  const scope = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [speed, setSpeed] = useState(1);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.7,
        defaults: { ease: "power2.inOut", duration: 1.1 },
      });

      tl.to(".ctrl-dot", {
        x: 220,
        rotation: 360,
        duration: 1.4,
        ease: "power2.inOut",
      })
        .to(".ctrl-dot", { scale: 1.2, duration: 0.28, ease: "power2.out" }, "-=0.3")
        .to(".ctrl-dot", { scale: 1, duration: 0.32, ease: "power3.out" });

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
  repeat: -1, yoyo: true, repeatDelay: 0.7,
  defaults: { duration: 1.1, ease: "power2.inOut" }
});

tl.to(".dot", { x: 220, rotation: 360, duration: 1.4 })
  .to(".dot", { scale: 1.2, duration: 0.28 }, "-=0.3")
  .to(".dot", { scale: 1, duration: 0.32, ease: "power3.out" });
tl.timeScale(2); // nhanh gấp đôi`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-6 overflow-hidden">
        <div className="h-[56px] flex items-center">
          <div
            className="ctrl-dot w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 border border-white/10 flex items-center justify-center text-[10px] font-mono text-white shrink-0 will-change-transform"
            style={{ willChange: "transform" }}
          >
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
