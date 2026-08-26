/**
 * Feature: gsap.set() + autoAlpha + clearProps
 * @layer features
 */
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";
import { RotateCcw } from "lucide-react";

export function SetUtility() {
  const scope = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope });
  const [hidden, setHidden] = useState(false);

  const handleSet = contextSafe(() => {
    // set() — áp dụng ngay lập tức, không có duration
    gsap.set(".box-set", { x: 120, rotation: 15, backgroundColor: "#06b6d4" });
  });

  const handleAutoAlpha = contextSafe(() => {
    // Dùng functional update để tránh stale closure trong contextSafe
    // (theo gsap-react skill: không rely on state closure, dùng prev)
    setHidden((prev) => {
      const nextHidden = !prev;
      gsap.to(".box-set", {
        autoAlpha: nextHidden ? 0 : 1,
        y: nextHidden ? -10 : 0,
        duration: 0.6,
        ease: "power2.inOut",
        overwrite: "auto",
      });
      return nextHidden;
    });
  });

  const handleClear = contextSafe(() => {
    gsap.set(".box-set", { clearProps: "all" });
    setHidden(false);
  });

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-cyan-400 font-mono">gsap.set()</span> +{" "}
        <span className="text-cyan-400 font-mono">autoAlpha</span> +{" "}
        <span className="text-cyan-400 font-mono">clearProps</span>
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        <code className="text-zinc-300">set()</code> áp dụng ngay.{" "}
        <code className="text-zinc-300">autoAlpha</code> ẩn an toàn hơn{" "}
        <code className="text-zinc-300">opacity</code>.{" "}
        <code className="text-zinc-300">clearProps</code> dọn inline style.
      </p>

      <CodeBlock
        code={`// set() — áp dụng ngay, không animate
gsap.set(".box", { x: 120, rotation: 15 });

// autoAlpha: opacity + visibility (an toàn hơn opacity: 0)
gsap.to(".box", { autoAlpha: 0, duration: 0.4 }); // ẩn hoàn toàn
gsap.to(".box", { autoAlpha: 1, duration: 0.4 }); // hiện lại

// clearProps: dọn inline style về CSS gốc
gsap.set(".box", { clearProps: "all" });`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-6 overflow-hidden">
        <div className="h-[72px] flex items-center">
          <div className="box-set w-[64px] h-[64px] rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center text-[11px] font-mono text-zinc-400 shrink-0">
            SET
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={handleSet}
            className="px-4 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition"
          >
            gsap.set()
          </button>
          <button
            onClick={handleAutoAlpha}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition"
          >
            toggle autoAlpha {hidden ? "(hidden)" : "(visible)"}
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <RotateCcw size={14} /> clearProps
          </button>
        </div>
      </div>
    </div>
  );
}
