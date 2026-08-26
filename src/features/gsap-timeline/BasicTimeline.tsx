/**
 * Feature: Timeline cơ bản + position parameter
 * @layer features
 *
 * Theo gsap-timeline skill:
 * - timeline = container sequence nhiều tween
 * - position parameter: "<", ">", "+=0.2", "-=0.1", "<0.15"
 * - defaults để tránh lặp duration/ease
 */
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";
import { Play, Pause, Rewind, RotateCcw } from "lucide-react";

export function BasicTimeline() {
  const scope = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [status, setStatus] = useState("idle");

  useGSAP(
    () => {
      // defaults: áp dụng chung cho mọi tween trong timeline — gọn code
      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.5, ease: "power3.out" },
        onStart: () => setStatus("playing"),
        onComplete: () => setStatus("done"),
        onReverseComplete: () => setStatus("idle"),
      });

      // Dùng immediateRender:false để boxes vẫn visible trước khi bấm Play
      // (tránh bug: paused timeline + from() mặc định immediateRender:true sẽ ẩn boxes ngay khi mount)
      tl.from(".tl-box1", { x: -80, autoAlpha: 0, immediateRender: false })
        // "<" = bắt đầu cùng lúc với tween trước (overlap hoàn toàn)
        .from(
          ".tl-box2",
          { y: 40, autoAlpha: 0, scale: 0.8, ease: "back.out(1.4)", immediateRender: false },
          "<"
        )
        // "<0.15" = sau 0.15s kể từ khi tween trước bắt đầu
        .from(".tl-box3", { y: 40, autoAlpha: 0, immediateRender: false }, "<0.15")
        // "+=0.1" = sau 0.1s kể từ khi tween trước kết thúc
        .to(".tl-box", { scale: 1.08, duration: 0.2, ease: "power2.out", stagger: 0.06 }, "+=0.1")
        .to(".tl-box", { scale: 1, duration: 0.3, ease: "power2.inOut", stagger: 0.06 });

      tlRef.current = tl;
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-sm tracking-wide">
          <span className="text-indigo-400 font-mono">gsap.timeline()</span> — Sequence & Position
        </h3>
        <span
          className={`text-[11px] px-2.5 py-1 rounded-full font-mono font-bold border ${
            status === "playing"
              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
              : status === "done"
                ? "bg-indigo-500/15 text-indigo-400 border-indigo-500/20"
                : status === "paused"
                  ? "bg-amber-500/15 text-amber-400 border-amber-500/20"
                  : "bg-white/5 text-zinc-500 border-white/10"
          }`}
        >
          {status}
        </span>
      </div>
      <p className="text-xs text-zinc-500 mb-4">
        Timeline gom nhiều tween thành 1 sequence.{" "}
        <code className="text-zinc-300">Position parameter</code> (
        <code className="text-amber-300">{"<, >, <0.15, +=0.1"}</code>) quyết định overlap.
      </p>

      <CodeBlock
        code={`const tl = gsap.timeline({
  paused: true,
  defaults: { duration: 0.5, ease: "power3.out" }
});

tl.from(".box1", { x: -80, autoAlpha: 0 })                    // 0s — box1 vào
  .from(".box2", { y: 40, autoAlpha: 0 }, "<")                // "<" = cùng lúc với box1
  .from(".box3", { y: 40, autoAlpha: 0 }, "<0.15")            // "<0.15" = sau 0.15s kể từ box1
  .to(".box", { scale: 1.08, stagger: 0.06 }, "+=0.1")        // "+=0.1" = sau 0.1s
  .to(".box", { scale: 1, stagger: 0.06 });

// Control toàn bộ timeline như 1 tween
tl.play() / tl.pause() / tl.reverse() / tl.restart() / tl.timeScale(2)`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-6 overflow-hidden">
        <div className="flex gap-3 justify-center">
          <div className="tl-box tl-box1 w-[84px] h-[84px] rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 border border-white/10 flex flex-col items-center justify-center gap-1">
            <span className="text-[11px] font-mono font-bold text-white/80">BOX 1</span>
            <span className="text-[10px] font-mono text-white/50">x: -80 → 0</span>
          </div>
          <div className="tl-box tl-box2 w-[84px] h-[84px] rounded-2xl bg-gradient-to-br from-fuchsia-600 to-pink-600 border border-white/10 flex flex-col items-center justify-center gap-1">
            <span className="text-[11px] font-mono font-bold text-white/80">BOX 2</span>
            <span className="text-[10px] font-mono text-white/50">{"< (cùng lúc)"}</span>
          </div>
          <div className="tl-box tl-box3 w-[84px] h-[84px] rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-600 border border-white/10 flex flex-col items-center justify-center gap-1">
            <span className="text-[11px] font-mono font-bold text-white/80">BOX 3</span>
            <span className="text-[10px] font-mono text-white/50">{"<0.15"}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => {
              setStatus("playing");
              tlRef.current?.restart();
            }}
            className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Play size={14} /> Play
          </button>
          <button
            onClick={() => {
              tlRef.current?.pause();
              setStatus("paused");
            }}
            className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Pause size={14} /> Pause
          </button>
          <button
            onClick={() => {
              tlRef.current?.play();
              setStatus("playing");
            }}
            className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition"
          >
            Resume
          </button>
          <button
            onClick={() => {
              tlRef.current?.reverse();
              setStatus("reversing");
            }}
            className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Rewind size={14} /> Reverse
          </button>
          <button
            onClick={() => {
              tlRef.current?.restart();
              setStatus("playing");
            }}
            className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <RotateCcw size={14} /> Restart
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { k: "<", v: "cùng lúc với tween trước" },
            { k: ">", v: "sau khi tween trước xong" },
            { k: "<0.15", v: "sau 0.15s kể từ tween trước bắt đầu" },
            { k: "+=0.1", v: "sau 0.1s kể từ tween trước kết thúc" },
          ].map((x) => (
            <div key={x.k} className="rounded-lg bg-white/[0.04] border border-white/5 px-3 py-2 text-center">
              <div className="text-xs font-mono font-bold text-amber-400">{x.k}</div>
              <div className="text-[11px] text-zinc-500 leading-tight mt-0.5">{x.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
