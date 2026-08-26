/**
 * Widget: KeyframesSection
 * @layer widgets
 */
import { Section } from "@/shared/ui/section/Section";
import { KeyframesSequence } from "@/features/keyframes/KeyframesSequence";
import { Sparkles } from "lucide-react";

export function KeyframesSection() {
  return (
    <Section
      id="keyframes"
      number="04 — KEYFRAMES"
      title="Keyframes — multi-step gọn nhẹ"
      subtitle="Khi cần nhiều bước liên tiếp nhưng không muốn tạo cả timeline — keyframes gom tất cả vào 1 tween."
      icon={<Sparkles size={16} />}
    >
      <KeyframesSequence />
    </Section>
  );
}
