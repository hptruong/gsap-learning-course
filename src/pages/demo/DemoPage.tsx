/**
 * Page: Demo — compose toàn bộ GSAP Tween + Timeline demo
 * @layer pages
 *
 * Đây là nơi duy nhất biết thứ tự các sections.
 * Mỗi section là 1 widget, mỗi widget gom nhiều features.
 */
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { Header } from "@/widgets/header/Header";
import { Hero } from "@/widgets/hero/Hero";
import { TweenSection } from "@/widgets/tween-section/TweenSection";
import { EasingSection } from "@/widgets/easing-section/EasingSection";
import { StaggerSection } from "@/widgets/stagger-section/StaggerSection";
import { KeyframesSection } from "@/widgets/keyframes-section/KeyframesSection";
import { TimelineSection } from "@/widgets/timeline-section/TimelineSection";

export function DemoPage() {
  // Tôn trọng prefers-reduced-motion (theo gsap-core skill)
  // Dùng gsap.matchMedia để tự động revert khi user đổi setting
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Giảm duration về 0.01 hoặc tắt animation cho người dùng nhạy cảm với chuyển động
      gsap.globalTimeline.timeScale(100);
      // Lưu ý: trong production, thay vì timeScale 100, nên skip hẳn animation
      // bằng cách set duration: 0 trong từng tween khi reduceMotion = true
      return () => {
        gsap.globalTimeline.timeScale(1);
      };
    });

    // Cleanup: revert tất cả matchMedia contexts khi component unmount
    return () => mm.revert();
  });
  return (
    <div className="min-h-screen bg-[#0f0f1a] text-zinc-100 selection:bg-indigo-500/30">
      <Header />
      <Hero />

      <main className="max-w-[980px] mx-auto px-4 md:px-6 pb-16 space-y-14">
        <TweenSection />
        <EasingSection />
        <StaggerSection />
        <KeyframesSection />
        <TimelineSection />

        {/* Next steps */}
        <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/15 via-violet-600/10 to-fuchsia-600/10 backdrop-blur p-6 md:p-8">
          <h2 className="text-xl font-black tracking-tight">Tiếp theo học gì?</h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
            Bạn đã nắm Tween + Timeline — nền tảng của mọi thứ. Tiếp tục với ScrollTrigger, Text/SVG,
            React integration và production patterns trong{" "}
            <code className="text-zinc-200">docs/</code>.
          </p>
          <div className="grid md:grid-cols-3 gap-3 mt-6">
            {[
              { n: "05", t: "ScrollTrigger", d: "Animation theo scroll, scrub, pin" },
              { n: "08", t: "React + GSAP", d: "useGSAP(), context, SSR" },
              { n: "13", t: "Visual Design", d: "12 Principles, Color, Typography" },
            ].map((x) => (
              <div key={x.n} className="rounded-xl bg-[#0a0a14] border border-white/10 p-4">
                <div className="text-[11px] font-mono font-bold text-indigo-400">{x.n}</div>
                <div className="font-bold text-sm mt-1">{x.t}</div>
                <div className="text-xs text-zinc-500 mt-1">{x.d}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            <a
              href="https://gsap.com/docs/v3/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-100 transition"
            >
              GSAP Docs →
            </a>
            <a
              href="https://gsap.com/resources/React"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-xs font-bold hover:bg-white/15 transition"
            >
              React + GSAP Guide
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-zinc-600">
        Built with GSAP 3.15 · React 19 · Feature-Sliced · 8 GSAP Skills — GSAP Learning Course
      </footer>
    </div>
  );
}
