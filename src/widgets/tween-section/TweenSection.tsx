/**
 * Widget: TweenSection — gom 4 tween demos
 * @layer widgets
 */
import { Section } from "@/shared/ui/section/Section";
import { ToTween } from "@/features/tween/ToTween";
import { FromTween } from "@/features/tween/FromTween";
import { FromToTween } from "@/features/tween/FromToTween";
import { SetUtility } from "@/features/tween/SetUtility";
import { MousePointer2 } from "lucide-react";

export function TweenSection() {
  return (
    <Section
      id="tween"
      number="01 — TWEEN"
      title="Tween — viên gạch cơ bản"
      subtitle="Mọi animation GSAP đều là tween. Có 4 cách tạo tween: to / from / fromTo / set — mỗi cách phục vụ một nhu cầu khác nhau."
      icon={<MousePointer2 size={16} />}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <ToTween />
        <FromTween />
        <FromToTween />
        <SetUtility />
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
        <h4 className="text-xs font-bold tracking-widest text-zinc-400 mb-3">CHEAT SHEET</h4>
        <div className="grid md:grid-cols-4 gap-3 text-xs">
          {[
            { name: "gsap.to()", desc: "Từ hiện tại → đến giá trị mới", use: "Di chuyển, fade, scale" },
            { name: "gsap.from()", desc: "Từ giá trị chỉ định → về CSS gốc", use: "Entrance, reveal" },
            { name: "gsap.fromTo()", desc: "Chỉ định cả FROM lẫn TO", use: "Loop, animation chính xác" },
            { name: "gsap.set()", desc: "Áp dụng ngay, không animate", use: "Reset, initial state" },
          ].map((x) => (
            <div key={x.name} className="rounded-xl bg-[#0a0a14] border border-white/5 p-3.5">
              <div className="font-mono font-bold text-indigo-400 text-xs">{x.name}</div>
              <div className="text-zinc-500 mt-1 leading-relaxed">{x.desc}</div>
              <div className="text-zinc-600 mt-1 text-[11px]">→ {x.use}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
