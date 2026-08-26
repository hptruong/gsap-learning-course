/**
 * Feature: toggleActions — 4 hành vi onEnter / onLeave / onEnterBack / onLeaveBack
 * @layer features
 *
 * Edge cases theo gsap-scrolltrigger skill:
 * - toggleActions: "onEnter onLeave onEnterBack onLeaveBack"
 * - Mỗi vị trí: play | pause | resume | reset | restart | complete | reverse | none
 * - KHÔNG dùng chung scrub + toggleActions trên cùng trigger — nếu có cả hai, scrub thắng
 */
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { CodeBlock } from "@/shared/ui/code-block/CodeBlock";

const ACTION_PRESETS = [
  {
    name: "play none none none",
    desc: "Mặc định — chạy 1 lần khi vào, không làm gì khi rời",
    actions: "play none none none",
  },
  {
    name: "play reverse play reverse",
    desc: "Ping-pong — vào thì chạy, ra thì đảo ngược (2 chiều)",
    actions: "play reverse play reverse",
  },
  {
    name: "restart pause restart pause",
    desc: "Restart mỗi lần vào, pause khi rời — hợp cho loop ngắn",
    actions: "restart pause restart pause",
  },
  {
    name: "play pause resume reset",
    desc: "Pause khi rời, resume khi quay lại, reset khi rời ngược",
    actions: "play pause resume reset",
  },
];

export function ToggleActionsScroller() {
  const scope = useRef<HTMLDivElement>(null);
  const [preset, setPreset] = useState(1);
  const [log, setLog] = useState<string[]>([]);

  useGSAP(
    () => {
      const push = (event: string) =>
        setLog((prev) => [`${new Date().toLocaleTimeString()} — ${event}`, ...prev].slice(0, 4));

      gsap.from(".st-toggle-box", {
        scale: 0.5,
        autoAlpha: 0,
        rotation: 180,
        duration: 0.8,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: ".st-toggle-stage",
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: ACTION_PRESETS[preset].actions,
          onEnter: () => push("onEnter — đi XUỐNG qua start"),
          onLeave: () => push("onLeave — đi XUỐNG qua end"),
          onEnterBack: () => push("onEnterBack — đi LÊN qua end"),
          onLeaveBack: () => push("onLeaveBack — đi LÊN qua start"),
        },
      });
    },
    { scope, dependencies: [preset], revertOnUpdate: true }
  );

  return (
    <div ref={scope} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-amber-400 font-mono">toggleActions</span> — 4 hành vi theo hướng scroll
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Chuỗi 4 hành động theo thứ tự:{" "}
        <code className="text-amber-300">onEnter · onLeave · onEnterBack · onLeaveBack</code>. Scroll
        xuống = Enter/Leave, scroll lên = EnterBack/LeaveBack.
      </p>

      <CodeBlock
        code={`scrollTrigger: {
  trigger: ".box",
  start: "top 70%",
  end: "bottom 30%",
  //        onEnter  onLeave  onEnterBack  onLeaveBack
  toggleActions: "play    reverse   play         reverse",
  // mỗi slot: play | pause | resume | reset | restart | complete | reverse | none
}

// ⚠️ Edge case: KHÔNG dùng scrub + toggleActions cùng lúc
// — nếu có cả hai, scrub thắng và toggleActions bị bỏ qua.`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-5">
        <div className="grid sm:grid-cols-2 gap-2 mb-4">
          {ACTION_PRESETS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => {
                setPreset(i);
                setLog([]);
              }}
              className={`text-left px-3 py-2.5 rounded-xl transition border ${
                preset === i
                  ? "bg-amber-500/15 border-amber-500/40"
                  : "bg-white/[0.03] border-white/10 hover:border-white/20"
              }`}
            >
              <div className="font-mono font-bold text-[11px] text-amber-300">{p.name}</div>
              <div className="text-[11px] text-zinc-500 mt-0.5 leading-snug">{p.desc}</div>
            </button>
          ))}
        </div>

        <div className="st-toggle-stage h-[200px] rounded-lg border border-dashed border-white/15 flex items-center justify-center">
          <div className="st-toggle-box w-[110px] h-[80px] rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-white">
            TOGGLE
          </div>
        </div>

        <div className="mt-3 rounded-lg bg-black/40 border border-white/5 p-3 min-h-[92px]">
          <div className="text-[10px] font-mono text-zinc-600 mb-1.5 tracking-widest">
            CALLBACK LOG
          </div>
          {log.length === 0 ? (
            <div className="text-[11px] text-zinc-600">Cuộn qua khối trên để xem log…</div>
          ) : (
            <div className="space-y-1">
              {log.map((line, i) => (
                <div
                  key={i}
                  className={`text-[11px] font-mono ${i === 0 ? "text-emerald-400" : "text-zinc-600"}`}
                >
                  {line}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
