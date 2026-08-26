/**
 * Page: TweenTimelinePage — nền tảng GSAP: Tween, Easing, Stagger, Keyframes, Timeline
 * @layer pages
 *
 * Page là nơi duy nhất biết thứ tự các sections.
 * Mỗi section là 1 widget, mỗi widget gom nhiều features.
 */
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { Header } from "@/widgets/header/Header";
import { Hero } from "@/widgets/hero/Hero";
import { TweenSection } from "@/widgets/tween-section/TweenSection";
import { EasingSection } from "@/widgets/easing-section/EasingSection";
import { StaggerSection } from "@/widgets/stagger-section/StaggerSection";
import { KeyframesSection } from "@/widgets/keyframes-section/KeyframesSection";
import { TimelineSection } from "@/widgets/timeline-section/TimelineSection";

const SECTIONS = [
  { href: "#tween", label: "Tween" },
  { href: "#easing", label: "Easing" },
  { href: "#stagger", label: "Stagger" },
  { href: "#keyframes", label: "Keyframes" },
  { href: "#timeline", label: "Timeline" },
];

export function TweenTimelinePage() {
  // Tôn trọng prefers-reduced-motion (theo gsap-core skill)
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.globalTimeline.timeScale(100);
      return () => {
        gsap.globalTimeline.timeScale(1);
      };
    });

    return () => mm.revert();
  });

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-zinc-100 selection:bg-indigo-500/30">
      <Header />
      <Hero
        badge="GSAP 3.15 · React 19 · Feature-Sliced"
        titleLines={[
          { text: "Tween" },
          { text: "&", accent: true },
          { text: "Timeline" },
          { text: "từ A → Z", small: true },
        ]}
        sub="Tương tác chi tiết cho từng phần của GSAP Tween và Timeline — mỗi ví dụ đều có code + comment tiếng Việt và nút bấm để chạy thử ngay."
        sections={SECTIONS}
        nextPage={{ to: "/scroll-trigger", label: "ScrollTrigger" }}
      />

      <main className="max-w-[980px] mx-auto px-4 md:px-6 pb-16 space-y-14">
        <TweenSection />
        <EasingSection />
        <StaggerSection />
        <KeyframesSection />
        <TimelineSection />

        {/* Next steps */}
        <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/15 via-violet-600/10 to-fuchsia-600/10 p-6 md:p-8">
          <h2 className="text-xl font-black tracking-tight">Tiếp theo học gì?</h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
            Bạn đã nắm Tween + Timeline — nền tảng của mọi thứ. Bước tiếp theo:{" "}
            <b className="text-zinc-200">ScrollTrigger</b> — animation theo scroll, scrub, pin và
            containerAnimation.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            <Link
              to="/scroll-trigger"
              className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-100 transition"
            >
              Học ScrollTrigger →
            </Link>
            <a
              href="https://gsap.com/docs/v3/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-xs font-bold hover:bg-white/15 transition"
            >
              GSAP Docs
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-zinc-600">
        Built with GSAP 3.15 · React 19 · Feature-Sliced — GSAP Learning Course
      </footer>
    </div>
  );
}
