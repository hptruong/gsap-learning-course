/**
 * Widget: EasingSection
 * @layer widgets
 */
import { Section } from "@/shared/ui/section/Section";
import { EasingRaceTrack } from "@/features/easing/EasingRaceTrack";
import { Zap } from "lucide-react";

export function EasingSection() {
  return (
    <Section
      id="easing"
      number="02 — EASING"
      title="Easing — linh hồn của chuyển động"
      subtitle="Easing quyết định cảm giác: tự nhiên, đàn hồi, nảy, hay robot. Đổi ease là đổi luôn personality của animation."
      icon={<Zap size={16} />}
    >
      <EasingRaceTrack />
    </Section>
  );
}
