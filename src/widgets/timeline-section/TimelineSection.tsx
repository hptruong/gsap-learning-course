/**
 * Widget: TimelineSection — gom 3 timeline demos
 * @layer widgets
 */
import { Section } from "@/shared/ui/section/Section";
import { BasicTimeline } from "@/features/gsap-timeline/BasicTimeline";
import { ControlledTimeline } from "@/features/gsap-timeline/ControlledTimeline";
import { NestedTimeline } from "@/features/gsap-timeline/NestedTimeline";
import { Clock3 } from "lucide-react";

export function TimelineSection() {
  return (
    <Section
      id="timeline"
      number="05 — TIMELINE"
      title="Timeline — đạo diễn của mọi animation"
      subtitle="Timeline là nơi bạn lắp ráp nhiều tween thành một câu chuyện có nhịp điệu — với position parameter để điều khiển overlap chính xác."
      icon={<Clock3 size={16} />}
    >
      <div className="space-y-4">
        <BasicTimeline />
        <ControlledTimeline />
        <NestedTimeline />
      </div>

      <div className="mt-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] p-4 md:p-5">
        <h4 className="text-xs font-bold tracking-widest text-indigo-400 mb-3">
          TWEEN vs TIMELINE — KHI NÀO DÙNG GÌ?
        </h4>
        <div className="grid md:grid-cols-2 gap-3 text-xs leading-relaxed">
          <div className="rounded-xl bg-[#0a0a14] border border-white/5 p-4">
            <div className="font-bold text-zinc-200 mb-1">Dùng Tween khi…</div>
            <ul className="text-zinc-500 list-disc pl-4 space-y-1">
              <li>Chỉ 1 animation đơn lẻ (hover, click, fade)</li>
              <li>Không cần sync với animation khác</li>
              <li>Cần nhanh gọn — 1 dòng là xong</li>
            </ul>
          </div>
          <div className="rounded-xl bg-[#0a0a14] border border-white/5 p-4">
            <div className="font-bold text-zinc-200 mb-1">Dùng Timeline khi…</div>
            <ul className="text-zinc-500 list-disc pl-4 space-y-1">
              <li>Nhiều animation cần sequence / overlap</li>
              <li>Cần control tổng (play/pause/reverse/timeScale)</li>
              <li>Muốn code dễ đọc, dễ reorder như kịch bản</li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
