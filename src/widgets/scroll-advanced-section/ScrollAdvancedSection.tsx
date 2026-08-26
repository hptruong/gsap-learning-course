/**
 * Widget: ScrollAdvancedSection — batch, standalone trigger, progress
 * @layer widgets
 */
import { Section } from "@/shared/ui/section/Section";
import { BatchReveal } from "@/features/scroll-trigger/BatchReveal";
import { ScrollProgressTracker } from "@/features/scroll-trigger/ScrollProgressTracker";
import { Gauge } from "lucide-react";

export function ScrollAdvancedSection() {
  return (
    <Section
      id="scroll-advanced"
      number="03 — NÂNG CAO"
      title="Batch & Standalone — điều khiển không cần animation"
      subtitle="ScrollTrigger.batch() thay IntersectionObserver để reveal theo lô. ScrollTrigger.create() đứng độc lập — chỉ đọc progress/direction từ scroll để vẽ UI như progress bar."
      icon={<Gauge size={16} />}
    >
      <div className="space-y-4">
        <BatchReveal />
        <ScrollProgressTracker />
      </div>

      <div className="mt-4 rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-4 md:p-5">
        <h4 className="text-xs font-bold tracking-widest text-rose-400 mb-3">
          EDGE CASES CẦN NHỚ (THEO GSAP DOCS)
        </h4>
        <ul className="text-xs text-zinc-400 list-disc pl-4 space-y-1.5 leading-relaxed">
          <li>
            ScrollTrigger chỉ đặt trên <b>tween/timeline cấp cao nhất</b> — không bao giờ trên child
            tween của timeline, và không lồng trigger trong timeline cha.
          </li>
          <li>
            <b>scrub + toggleActions không dùng chung</b> — nếu có cả hai, scrub thắng.
          </li>
          <li>
            <b>containerAnimation bắt buộc ease: "none"</b> — nếu không scroll và vị trí ngang lệch
            nhau; pin/snap cũng không dùng được với containerAnimation.
          </li>
          <li>
            Tạo trigger theo thứ tự trên xuống trang; nếu tạo bất đồng bộ → đặt{" "}
            <b>refreshPriority</b> để thứ tự refresh đúng.
          </li>
          <li>
            Sau khi DOM/layout thay đổi (ảnh, font load) → gọi <b>ScrollTrigger.refresh()</b>;
            resize được tự xử lý (debounce 200ms).
          </li>
          <li>
            Trong React: dùng <b>useGSAP()</b> — mọi ScrollTrigger tự revert khi unmount, không leak
            ra element đã detach.
          </li>
        </ul>
      </div>
    </Section>
  );
}
