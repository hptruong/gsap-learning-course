/**
 * Widget: ScrollScrubSection — scrub, pin, containerAnimation
 * @layer widgets
 */
import { Section } from "@/shared/ui/section/Section";
import { ScrubScroller } from "@/features/scroll-trigger/ScrubScroller";
import { PinnedSection } from "@/features/scroll-trigger/PinnedSection";
import { HorizontalScrollPanels } from "@/features/scroll-trigger/HorizontalScrollPanels";
import { MoveHorizontal } from "lucide-react";

export function ScrollScrubSection() {
  return (
    <Section
      id="scroll-scrub"
      number="02 — SCRUB & PIN"
      title="Scrub & Pin — scroll điều khiển kịch bản"
      subtitle="Scrub biến animation thành 'băng dính' theo tay cuộn. Pin ghim element trên màn hình để kể chuyện trong một quãng đường scroll — kết hợp cả hai tạo nên landing page điện ảnh."
      icon={<MoveHorizontal size={16} />}
    >
      <div className="space-y-4">
        <ScrubScroller />
        <PinnedSection />
        <HorizontalScrollPanels />
      </div>
    </Section>
  );
}
