/**
 * Feature: pin — ghim element trong lúc scroll
 * @layer features
 *
 * Edge cases theo gsap-scrolltrigger skill:
 * - pin: true → GHIM chính trigger element (position: fixed) trong suốt range start→end
 * - KHÔNG animate chính element bị pin — animate con của nó
 * - pinSpacing: true (mặc định) chèn spacer để layout không bị sập khi element bị fixed
 * - Khi pin: true, start mặc định là "top top"
 * - Lưu ý: ancestor có backdrop-blur/filter sẽ phá position: fixed → card này dùng bg thường
 * - end: "+=1200" = ghim trong 1200px scroll tiếp theo
 */
import { useRef } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";

export function PinnedSection() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Timeline + pin + scrub: ghim section, kéo timeline theo scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".st-pin-panel",
          start: "top top", // mặc định khi pin: true
          end: "+=1400", // ghim trong 1400px scroll
          pin: true, // ghim chính .st-pin-panel
          pinSpacing: true, // spacer giữ layout (mặc định)
          scrub: 1,
          // markers: true, // bật khi debug vị trí pin
        },
        defaults: { ease: "none", duration: 1 },
      });

      // Animate CON của panel — không animate chính panel đang bị pin
      tl.from(".st-pin-title", { y: 40, autoAlpha: 0 })
        .from(".st-pin-card", { y: 80, autoAlpha: 0, scale: 0.8, stagger: 0.3 }, "<0.2")
        .to(".st-pin-card", { rotation: 8, stagger: 0.2 }, ">")
        .to(".st-pin-title", { letterSpacing: "0.2em" }, "<");
    },
    { scope }
  );

  return (
    <div ref={scope} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-fuchsia-400 font-mono">pin</span> — Ghim element khi scroll
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        <code className="text-zinc-300">pin: true</code> giữ nguyên element trên màn hình trong khi
        người dùng cuộn qua một quãng đường — tạo hiệu ứng "kịch bản" như các landing page.
      </p>

      <CodeBlock
        code={`const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".panel",
    start: "top top",   // mặc định khi pin
    end: "+=1400",      // ghim trong 1400px scroll
    pin: true,          // ghim chính trigger
    pinSpacing: true,   // chèn spacer — layout không sập
    scrub: 1,
  },
  defaults: { ease: "none" },
});

// ✅ animate CON của panel
tl.from(".title", { y: 40, autoAlpha: 0 })
  .from(".card", { y: 80, stagger: 0.3 });

// ❌ SAI: animate chính element bị pin → giật layout
// gsap.to(".panel", { y: 100, scrollTrigger: { pin: true } })

// Edge case: pinSpacing: false chỉ dùng khi tự quản lý layout
// Edge case: ancestor có backdrop-blur/filter phá position:fixed của pin`}
      />

      {/* Panel bị pin — bg thường, KHÔNG backdrop-blur (phá position: fixed) */}
      <div className="mt-5">
        <div className="st-pin-panel h-[320px] rounded-xl bg-[#0a0a14] border border-white/10 flex flex-col items-center justify-center overflow-hidden">
          <div className="st-pin-title text-lg font-black tracking-tight text-white">
            Pinned Panel — ghim 1400px
          </div>
          <div className="flex gap-3 mt-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="st-pin-card w-[88px] h-[88px] rounded-2xl bg-gradient-to-br from-fuchsia-600 to-purple-600 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-white"
              >
                Card {n}
              </div>
            ))}
          </div>
          <div className="text-[11px] text-zinc-600 mt-6 font-mono">
            panel đứng yên — cards animate theo scroll ↓
          </div>
        </div>
        <p className="text-[11px] text-zinc-600 mt-3">
          Cuộn tới khi panel chạm đỉnh viewport — nó sẽ bị ghim, cards lần lượt xuất hiện rồi xoay.
          Sau 1400px, panel được nhả ra và page cuộn tiếp bình thường (nhờ{" "}
          <code>pinSpacing</code>).
        </p>
      </div>
    </div>
  );
}
