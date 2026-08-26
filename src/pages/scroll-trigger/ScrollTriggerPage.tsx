/**
 * Page: ScrollTriggerPage — animation theo scroll: trigger, scrub, pin, batch
 * @layer pages
 *
 * Nội dung đối chiếu GSAP ScrollTrigger docs:
 * - 3 nhóm khái niệm: trigger/vị trí, hành vi scroll, kỹ thuật nâng cao
 * - Edge cases: scrub+toggleActions, containerAnimation ease none, refreshPriority, cleanup
 */
import { Link } from "react-router-dom";
import { Header } from "@/widgets/header/Header";
import { Hero } from "@/widgets/hero/Hero";
import { ScrollBasicsSection } from "@/widgets/scroll-basics-section/ScrollBasicsSection";
import { ScrollScrubSection } from "@/widgets/scroll-scrub-section/ScrollScrubSection";
import { ScrollAdvancedSection } from "@/widgets/scroll-advanced-section/ScrollAdvancedSection";

const SECTIONS = [
  { href: "#scroll-basics", label: "Trigger" },
  { href: "#scroll-scrub", label: "Scrub & Pin" },
  { href: "#scroll-advanced", label: "Nâng cao" },
];

export function ScrollTriggerPage() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] text-zinc-100 selection:bg-emerald-500/30">
      <Header />
      <Hero
        badge="ScrollTrigger · gsap/ScrollTrigger · useGSAP"
        titleLines={[
          { text: "Scroll" },
          { text: "Trigger", accent: true },
          { text: "animation theo scroll", small: true },
        ]}
        sub="ScrollTrigger biến vị trí cuộn thành timeline: element vào viewport ở đâu, animation chạy ở đó — scrub bám theo tay cuộn, pin ghim kịch bản, batch reveal theo lô."
        sections={SECTIONS}
        nextPage={{ to: "/", label: "Tween & Timeline" }}
      />

      <main className="max-w-[980px] mx-auto px-4 md:px-6 pb-16 space-y-14">
        <ScrollBasicsSection />
        <ScrollScrubSection />
        <ScrollAdvancedSection />

        {/* Next steps */}
        <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-600/15 via-teal-600/10 to-cyan-600/10 p-6 md:p-8">
          <h2 className="text-xl font-black tracking-tight">Tiếp theo học gì?</h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
            Bạn đã nắm ScrollTrigger — công cụ mạnh nhất của GSAP. Quay lại củng cố nền tảng{" "}
            <b className="text-zinc-200">Tween &amp; Timeline</b>, hoặc đọc sâu hơn trong docs.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            <Link
              to="/"
              className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-100 transition"
            >
              ← Tween &amp; Timeline
            </Link>
            <a
              href="https://gsap.com/docs/v3/Plugins/ScrollTrigger/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-xs font-bold hover:bg-white/15 transition"
            >
              ScrollTrigger Docs
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
