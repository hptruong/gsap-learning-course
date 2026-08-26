/**
 * Widget: StaggerSection
 * @layer widgets
 */
import { Section } from "@/shared/ui/section/Section";
import { StaggerGrid } from "@/features/stagger/StaggerGrid";
import { Layers } from "lucide-react";

export function StaggerSection() {
  return (
    <Section
      id="stagger"
      number="03 — STAGGER"
      title="Stagger — một dòng cho cả nhóm"
      subtitle="Thay vì loop thủ công từng element, GSAP stagger tự lan tỏa animation qua nhiều phần tử với timing tinh tế."
      icon={<Layers size={16} />}
    >
      <StaggerGrid />
    </Section>
  );
}
