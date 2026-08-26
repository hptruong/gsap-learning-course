/**
 * Widget: ScrollBasicsSection — khái niệm nền tảng của ScrollTrigger
 * @layer widgets
 */
import { Section } from "@/shared/ui/section/Section";
import { ScrollTriggerBasics } from "@/features/scroll-trigger/ScrollTriggerBasics";
import { ToggleActionsScroller } from "@/features/scroll-trigger/ToggleActionsScroller";
import { MousePointerClick } from "lucide-react";

export function ScrollBasicsSection() {
  return (
    <Section
      id="scroll-basics"
      number="01 — TRIGGER & VỊ TRÍ"
      title="ScrollTrigger — animation neo vào scroll"
      subtitle="ScrollTrigger là cầu nối giữa vị trí cuộn trang và animation: element vào tầm nhìn ở đâu, animation bắt đầu ở đó — với start/end quyết định chính xác thời điểm."
      icon={<MousePointerClick size={16} />}
    >
      <div className="space-y-4">
        <ScrollTriggerBasics />
        <ToggleActionsScroller />
      </div>

      <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4 md:p-5">
        <h4 className="text-xs font-bold tracking-widest text-emerald-400 mb-3">
          3 NHÓM KHÁI NIỆM SCROLLTRIGGER
        </h4>
        <div className="grid md:grid-cols-3 gap-3 text-xs">
          {[
            {
              n: "1. Trigger & vị trí",
              items: ["trigger, start, end", "markers (chỉ khi dev)", "once, refreshPriority"],
            },
            {
              n: "2. Hành vi scroll",
              items: ["toggleActions (4 hành vi)", "scrub (bám scroll)", "⚠️ không dùng cả hai"],
            },
            {
              n: "3. Kỹ thuật nâng cao",
              items: ["pin + pinSpacing", "ScrollTrigger.batch()", "containerAnimation"],
            },
          ].map((g) => (
            <div key={g.n} className="rounded-xl bg-[#0a0a14] border border-white/5 p-4">
              <div className="font-bold text-zinc-200 mb-2">{g.n}</div>
              <ul className="text-zinc-500 list-disc pl-4 space-y-1">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
