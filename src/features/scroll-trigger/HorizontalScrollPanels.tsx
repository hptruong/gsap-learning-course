/**
 * Feature: containerAnimation — scroll dọc điều khiển content chạy ngang
 * @layer features
 *
 * Edge cases theo gsap-scrolltrigger skill:
 * - Pin section + tween x/xPercent (ease: "none" BẮT BUỘC) → "fake horizontal scroll"
 * - ScrollTrigger con dùng containerAnimation để neo vào vị trí NGANG của content
 * - Pin + snap KHÔNG khả dụng trên trigger dùng containerAnimation
 * - start "left center" = vị trí NGANG của trigger so với viewport
 * - Không animate chính element bị kéo ngang — animate con của nó
 * - Function-based value + invalidateOnRefresh để responsive
 */
import { useRef } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";

const PANELS = ["Giới thiệu", "Tính năng", "Kiến trúc", "Kết luận"];

export function HorizontalScrollPanels() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = scope.current?.querySelector(".st-h-track");
      const panel = scope.current?.querySelector(".st-h-panel");
      if (!(track instanceof HTMLElement) || !(panel instanceof HTMLElement)) return;

      // Tween kéo track ngang — function-based value + ease: "none" BẮT BUỘC
      // để mapping scroll ↔ position ngang khớp 1:1 (edge case phổ biến nhất)
      const scrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - panel.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: panel,
          pin: true, // ghim section trong lúc kéo ngang
          scrub: 1,
          start: "top top",
          end: "+=1800",
          invalidateOnRefresh: true, // tính lại x khi resize/refresh
        },
      });

      // Trigger con: neo vào vị trí NGANG của từng panel nhờ containerAnimation
      gsap.utils.toArray<HTMLElement>(".st-h-panel-item").forEach((item) => {
        const num = item.querySelector(".st-h-panel-num");
        if (!num) return;
        gsap.from(num, {
          scale: 0,
          rotation: -180,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            containerAnimation: scrollTween, // ⭐ neo theo chuyển động ngang
            trigger: item,
            start: "left 80%", // cạnh TRÁI item chạm 80% viewport (ngang!)
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-rose-400 font-mono">containerAnimation</span> — Cuộn dọc, chạy ngang
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Pin một section, kéo track ngang bằng <code className="text-zinc-300">x</code> với{" "}
        <code className="text-rose-300">ease: "none"</code> — rồi dùng{" "}
        <code className="text-zinc-300">containerAnimation</code> để trigger animation neo vào vị
        trí ngang của từng panel.
      </p>

      <CodeBlock
        code={`// 1. Tween kéo ngang — ease: "none" BẮT BUỘC
const scrollTween = gsap.to(".track", {
  x: () => -(track.scrollWidth - panel.clientWidth), // function-based = responsive
  ease: "none", // ⚠️ thiếu ease none → scroll lệch khỏi vị trí ngang
  scrollTrigger: {
    trigger: ".panel", pin: true, scrub: 1,
    start: "top top", end: "+=1800",
    invalidateOnRefresh: true,
  },
});

// 2. Trigger con neo theo CHUYỂN ĐỘNG NGANG
gsap.from(".num", {
  scale: 0, rotation: -180,
  scrollTrigger: {
    containerAnimation: scrollTween, // ⭐
    trigger: ".item",
    start: "left 80%", // vị trí NGANG, không phải dọc
  },
});

// Edge cases: pin/snap KHÔNG dùng được với containerAnimation
// Không animate chính track — chỉ animate con của item`}
      />

      {/* Panel bị pin — KHÔNG backdrop-blur ở ancestor (phá position:fixed) */}
      <div className="mt-5">
        <div className="st-h-panel h-[300px] rounded-xl bg-[#0a0a14] border border-white/10 overflow-hidden relative">
          <div className="st-h-track flex h-full items-center gap-4 px-[10vw] w-max">
            {PANELS.map((name, i) => (
              <div
                key={name}
                className="st-h-panel-item w-[62vw] max-w-[420px] h-[220px] rounded-2xl bg-gradient-to-br from-rose-600/25 to-orange-600/25 border border-white/10 flex flex-col items-center justify-center gap-3 shrink-0"
              >
                <div className="st-h-panel-num w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-sm font-black text-white">
                  {i + 1}
                </div>
                <div className="text-sm font-bold text-white">{name}</div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 right-4 text-[10px] font-mono text-zinc-600">
            cuộn tiếp ↓ — track chạy sang trái ←
          </div>
        </div>
        <p className="text-[11px] text-zinc-600 mt-3">
          Cuộn xuống: section bị ghim 1800px trong khi track trượt ngang qua 4 panel. Số tròn từng
          panel "pop" khi panel đó vào tầm nhìn ngang (nhờ{" "}
          <code>containerAnimation</code>).
        </p>
      </div>
    </div>
  );
}
