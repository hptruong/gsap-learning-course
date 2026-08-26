/**
 * Feature: Nested Timeline — timeline lồng timeline (mượt, theo GSAP docs)
 * @layer features
 *
 * Theo gsap-timeline + gsap-core + gsap-performance:
 * - defaults trên timeline để đồng bộ duration/ease
 * - position parameter overlap "-=0.3" để chuyển cảnh liên tục, không gap
 * - chỉ animate transform + autoAlpha (GPU), will-change để promote layer
 * - labels để dễ reorder / maintain
 * - gsap.context via useGSAP auto cleanup
 */
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";
import { Play, Rewind } from "lucide-react";

export function NestedTimelineSequence() {
  const scope = useRef<HTMLDivElement>(null);
  const masterRef = useRef<gsap.core.Timeline | null>(null);
  const [status, setStatus] = useState<"idle" | "playing" | "done">("idle");

  useGSAP(
    () => {
      // Master: defaults — chậm hơn ~40% để nhìn rõ từng chapter
      const master = gsap.timeline({
        paused: true,
        defaults: { duration: 0.8, ease: "power3.out" },
        onStart: () => setStatus("playing"),
        onComplete: () => setStatus("done"),
        onReverseComplete: () => setStatus("idle"),
      });

      // Intro: title + sub — overlap sâu để tạo wave
      const intro = gsap.timeline({ defaults: { duration: 0.75, ease: "power3.out" } });
      intro
        .from(".nested-title", {
          y: 24,
          autoAlpha: 0,
          duration: 0.85,
          ease: "power3.out",
          immediateRender: false,
        })
        .from(
          ".nested-sub",
          { y: 16, autoAlpha: 0, duration: 0.65, ease: "power3.out", immediateRender: false },
          "-=0.55"
        );

      // Cards: stagger chậm hơn để thấy lan tỏa
      const cards = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out" } });
      cards.from(".nested-card", {
        y: 28,
        autoAlpha: 0,
        scale: 0.92,
        duration: 0.85,
        ease: "power3.out",
        stagger: { each: 0.12, from: "start" },
        immediateRender: false,
      });

      // CTA: pop nhẹ với back.out
      const cta = gsap.timeline({ defaults: { duration: 0.85, ease: "back.out(1.7)" } });
      cta.from(".nested-cta", {
        y: 14,
        scale: 0.88,
        autoAlpha: 0,
        duration: 0.85,
        ease: "back.out(1.7)",
        immediateRender: false,
      });

      // Ghép vào master — tăng overlap tỉ lệ với duration mới
      master
        .addLabel("intro", 0)
        .add(intro, "intro")
        .add(cards, "-=0.45")
        .add(cta, "-=0.4")
        .addLabel("end");

      masterRef.current = master;
    },
    { scope }
  );

  const handlePlay = () => {
    setStatus("playing");
    masterRef.current?.restart();
  };

  const handleReverse = () => {
    const tl = masterRef.current;
    if (!tl) return;
    // Nếu đang ở đầu (progress 0) thì phải set về cuối rồi reverse mới thấy hiệu ứng
    if (tl.progress() === 0) {
      tl.progress(1);
    }
    tl.reverse();
    setStatus("playing");
  };

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-fuchsia-400 font-mono">Nested Timeline</span> — Timeline lồng timeline
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Mỗi section là 1 child timeline — <code className="text-zinc-300">master.add(child)</code> để
        ghép thành câu chuyện lớn. Dễ maintain, dễ reorder.
      </p>

      <CodeBlock
        code={`const master = gsap.timeline({
  paused: true,
  defaults: { duration: 0.8, ease: "power3.out" },
});

const intro = gsap.timeline();
intro.from(".title", { y: 24, autoAlpha: 0, duration: 0.85 })
     .from(".sub", { y: 16, autoAlpha: 0, duration: 0.65 }, "-=0.55");

const cards = gsap.timeline();
cards.from(".card", { y: 28, autoAlpha: 0, scale: 0.92, stagger: 0.12 });

const cta = gsap.timeline();
cta.from(".cta", { y: 14, scale: 0.88, autoAlpha: 0, ease: "back.out(1.7)" });

// Overlap tỉ lệ với duration chậm hơn
master.addLabel("intro").add(intro, "intro")
      .add(cards, "-=0.45").add(cta, "-=0.4");
master.play();`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-5 overflow-hidden">
        <div className="text-center">
          <div
            className="nested-title text-lg font-black tracking-tight will-change-transform"
            style={{ willChange: "transform, opacity" }}
          >
            Nested Timeline Demo
          </div>
          <div
            className="nested-sub text-xs text-zinc-500 mt-1 will-change-transform"
            style={{ willChange: "transform, opacity" }}
          >
            3 child timelines ghép vào 1 master — overlap mượt
          </div>

          <div className="grid grid-cols-3 gap-2 mt-5 max-w-[360px] mx-auto">
            <div
              className="nested-card h-[64px] rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-mono text-zinc-300 will-change-transform"
              style={{ willChange: "transform, opacity" }}
            >
              Card 1
            </div>
            <div
              className="nested-card h-[64px] rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-mono text-zinc-300 will-change-transform"
              style={{ willChange: "transform, opacity" }}
            >
              Card 2
            </div>
            <div
              className="nested-card h-[64px] rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-mono text-zinc-300 will-change-transform"
              style={{ willChange: "transform, opacity" }}
            >
              Card 3
            </div>
          </div>

          <button
            className="nested-cta mt-5 px-5 py-2.5 rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold transition will-change-transform"
            style={{ willChange: "transform, opacity" }}
          >
            Call to Action
          </button>
        </div>

        <div className="flex gap-2 mt-6 justify-center items-center">
          <button
            onClick={handlePlay}
            className="px-4 py-2 rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Play size={14} /> Play master
          </button>
          <button
            onClick={handleReverse}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Rewind size={14} /> Reverse
          </button>
          <span
            className={`ml-1 text-[11px] px-2 py-1 rounded-full font-mono font-bold border ${
              status === "playing"
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                : status === "done"
                  ? "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/20"
                  : "bg-white/5 text-zinc-500 border-white/10"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
