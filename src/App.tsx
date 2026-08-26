import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Play,
  Pause,
  RotateCcw,
  Rewind,
  MousePointer2,
  Layers,
  Zap,
  Clock3,
  Sparkles,
  Code2,
  ChevronDown,
} from "lucide-react";

// Đăng ký plugin useGSAP để dùng được gsap.context + cleanup tự động trong React
gsap.registerPlugin(useGSAP);

// ============================================================================
// Helper: CodeBlock — hiển thị code snippet với style
// ============================================================================
function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-[#0a0a14] border border-white/10 rounded-xl p-4 text-[13px] leading-6 overflow-x-auto text-zinc-300 font-mono">
      <code>{code}</code>
    </pre>
  );
}

// ============================================================================
// Helper: Section wrapper
// ============================================================================
function Section({
  id,
  number,
  title,
  subtitle,
  icon,
  children,
}: {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
          {icon}
        </span>
        <span className="text-xs font-mono tracking-widest text-indigo-400 font-bold">
          {number}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-indigo-500/30 to-transparent" />
      </div>
      <h2 className="text-[28px] md:text-[32px] font-black tracking-tight leading-none">
        {title}
      </h2>
      <p className="text-sm text-zinc-400 mt-2 mb-8 max-w-2xl leading-relaxed">{subtitle}</p>
      {children}
    </section>
  );
}

// ============================================================================
// 1. TWEEN: gsap.to() — animate TỪ trạng thái hiện tại ĐẾN trạng thái mới
// ============================================================================
function DemoTo() {
  const scope = useRef<HTMLDivElement>(null);

  // useGSAP tự động tạo gsap.context + cleanup khi component unmount
  // scope: chỉ query selector trong scope.current (scoped selector)
  const { contextSafe } = useGSAP({ scope });

  // contextSafe giúp event handler luôn chạy đúng context, tránh memory leak
  const handleTo = contextSafe(() => {
    // gsap.to() — tween ĐẾN giá trị mới
    // duration: thời gian (giây), x/y: translate, rotation: xoay, ease: cảm giác chuyển động
    gsap.to(".box-to", {
      x: 220, // di chuyển 220px sang phải (dùng transform translateX — GPU accelerated)
      rotation: 360, // xoay 1 vòng
      scale: 1.15,
      backgroundColor: "#6366f1", // GSAP tự interpolate màu
      duration: 0.8,
      ease: "power3.out", // nhanh lúc đầu, chậm lúc cuối — tự nhiên
      overwrite: "auto", // nếu tween cũ đang chạy cùng property thì kill tween cũ
    });
  });

  const handleReset = contextSafe(() => {
    gsap.to(".box-to", {
      x: 0,
      rotation: 0,
      scale: 1,
      backgroundColor: "#27272a",
      duration: 0.5,
      ease: "power2.inOut",
    });
  });

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm tracking-wide">
          <span className="text-indigo-400 font-mono">gsap.to()</span> — Đến trạng thái mới
        </h3>
        <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-mono">
          phổ biến nhất
        </span>
      </div>
      <p className="text-xs text-zinc-500 mb-4">
        Từ trạng thái hiện tại → animate đến giá trị bạn chỉ định. Dùng cho di chuyển, fade, scale...
      </p>

      <CodeBlock
        code={`// gsap.to(target, vars) — animate ĐẾN giá trị mới
gsap.to(".box", {
  x: 220,              // translateX 220px (GPU)
  rotation: 360,       // xoay 360°
  scale: 1.15,         // phóng to
  backgroundColor: "#6366f1",
  duration: 0.8,
  ease: "power3.out",  // easing mượt
  overwrite: "auto",   // tránh conflict tween cũ
});`}
      />

      {/* Demo area */}
      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-6 overflow-hidden">
        <div className="h-[72px] flex items-center">
          <div className="box-to w-[64px] h-[64px] rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center text-[11px] font-mono text-zinc-400 shrink-0">
            BOX
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleTo}
            className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Play size={14} /> Chạy gsap.to()
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. TWEEN: gsap.from() — animate TỪ trạng thái chỉ định VỀ CSS gốc
// ============================================================================
function DemoFrom() {
  const scope = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope });

  const handleFrom = contextSafe(() => {
    // gsap.from() — bắt đầu TỪ giá trị chỉ định, animate về giá trị CSS gốc
    // immediateRender: true (mặc định) → áp dụng ngay "from" state trước khi delay
    gsap.from(".box-from", {
      y: 60, // bắt đầu từ y=60 (thấp hơn) → bay lên vị trí gốc
      opacity: 0, // bắt đầu mờ → hiện dần
      scale: 0.8,
      duration: 0.7,
      ease: "back.out(1.4)", // vượt qua đích một chút rồi bật lại — cảm giác đàn hồi
    });
  });

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-amber-400 font-mono">gsap.from()</span> — Từ trạng thái chỉ định
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Ngược với <code className="text-zinc-300">to()</code> — bạn mô tả điểm <b>bắt đầu</b>,
        GSAP sẽ animate về CSS gốc. Rất hợp cho entrance / fade-in.
      </p>

      <CodeBlock
        code={`// gsap.from(target, vars) — animate TỪ giá trị chỉ định về CSS gốc
gsap.from(".box", {
  y: 60,              // bắt đầu thấp hơn 60px
  opacity: 0,         // bắt đầu trong suốt
  scale: 0.8,         // bắt đầu nhỏ hơn
  duration: 0.7,
  ease: "back.out(1.4)", // overshoot đàn hồi
});`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-6 overflow-hidden">
        <div className="h-[72px] flex items-center">
          <div className="box-from w-[64px] h-[64px] rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[11px] font-mono text-amber-300 shrink-0">
            FROM
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleFrom}
            className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition flex items-center gap-1.5"
          >
            <Sparkles size={14} /> Chạy gsap.from()
          </button>
          <span className="text-[11px] text-zinc-500 self-center ml-2">
            Box sẽ bay từ dưới lên — thử bấm nhiều lần
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. TWEEN: gsap.fromTo() — chỉ định cả FROM lẫn TO — kiểm soát tuyệt đối
// ============================================================================
function DemoFromTo() {
  const scope = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope });

  const handleFromTo = contextSafe(() => {
    // gsap.fromTo() — bạn chỉ định cả điểm BẮT ĐẦU lẫn KẾT THÚC
    // Không phụ thuộc CSS gốc — full control, không bị "giật" do CSS khác nhau
    gsap.fromTo(
      ".box-fromto",
      {
        // FROM vars — trạng thái bắt đầu
        x: -40,
        scale: 0.5,
        rotation: -180,
        opacity: 0,
      },
      {
        // TO vars — trạng thái kết thúc
        x: 220,
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.inOut",
      }
    );
  });

  const handleReset = contextSafe(() => {
    gsap.set(".box-fromto", { clearProps: "all" }); // xóa inline style GSAP để về CSS gốc
  });

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-fuchsia-400 font-mono">gsap.fromTo()</span> — Kiểm soát tuyệt đối
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Chỉ định cả <b>điểm bắt đầu</b> và <b>điểm kết thúc</b> — không phụ thuộc CSS gốc. Dùng khi
        cần animation chính xác hoặc loop.
      </p>

      <CodeBlock
        code={`// gsap.fromTo(target, fromVars, toVars)
gsap.fromTo(".box",
  { x: -40, scale: 0.5, rotation: -180, opacity: 0 }, // FROM
  { x: 220, scale: 1, rotation: 0, opacity: 1,         // TO
    duration: 0.9, ease: "power3.inOut" }
);

// gsap.set() — set ngay lập tức, không animate (dùng để reset)
gsap.set(".box", { clearProps: "all" }); // xóa inline style`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-6 overflow-hidden">
        <div className="h-[72px] flex items-center">
          <div className="box-fromto w-[64px] h-[64px] rounded-xl bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center text-[11px] font-mono text-fuchsia-300 shrink-0">
            F→T
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleFromTo}
            className="px-4 py-2 rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Zap size={14} /> Chạy fromTo()
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <RotateCcw size={14} /> Clear
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. gsap.set() + autoAlpha + clearProps
// ============================================================================
function DemoSet() {
  const scope = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope });
  const [hidden, setHidden] = useState(false);

  const handleSet = contextSafe(() => {
    // gsap.set() — áp dụng ngay lập tức, không có duration
    // Thường dùng để set initial state trước khi animate
    gsap.set(".box-set", {
      x: 120,
      rotation: 15,
      backgroundColor: "#06b6d4",
    });
  });

  const handleAutoAlpha = contextSafe(() => {
    // autoAlpha: kết hợp opacity + visibility
    // opacity: 0 vẫn cho phép click (invisible nhưng interactive) — BUG
    // autoAlpha: 0 → opacity 0 + visibility hidden — an toàn
    gsap.to(".box-set", {
      autoAlpha: hidden ? 1 : 0, // toggle ẩn/hiện
      y: hidden ? 0 : -10,
      duration: 0.4,
      ease: "power2.inOut",
    });
    setHidden(!hidden);
  });

  const handleClear = contextSafe(() => {
    // clearProps: xóa inline style GSAP để element về CSS gốc
    gsap.set(".box-set", { clearProps: "all" });
    setHidden(false);
  });

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-cyan-400 font-mono">gsap.set()</span> +{" "}
        <span className="text-cyan-400 font-mono">autoAlpha</span> +{" "}
        <span className="text-cyan-400 font-mono">clearProps</span>
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        <code className="text-zinc-300">set()</code> áp dụng ngay. <code className="text-zinc-300">autoAlpha</code> ẩn an
        toàn hơn <code className="text-zinc-300">opacity</code>.{" "}
        <code className="text-zinc-300">clearProps</code> dọn inline style.
      </p>

      <CodeBlock
        code={`// set() — áp dụng ngay, không animate
gsap.set(".box", { x: 120, rotation: 15 });

// autoAlpha: opacity + visibility (an toàn hơn opacity: 0)
gsap.to(".box", { autoAlpha: 0, duration: 0.4 }); // ẩn hoàn toàn
gsap.to(".box", { autoAlpha: 1, duration: 0.4 }); // hiện lại

// clearProps: dọn inline style về CSS gốc
gsap.set(".box", { clearProps: "all" });`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-6 overflow-hidden">
        <div className="h-[72px] flex items-center">
          <div className="box-set w-[64px] h-[64px] rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center text-[11px] font-mono text-zinc-400 shrink-0">
            SET
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={handleSet}
            className="px-4 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition"
          >
            gsap.set()
          </button>
          <button
            onClick={handleAutoAlpha}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition"
          >
            toggle autoAlpha
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <RotateCcw size={14} /> clearProps
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. EASING — cảm giác chuyển động
// ============================================================================
const EASINGS: { name: string; ease: string; color: string }[] = [
  { name: "power1.out", ease: "power1.out", color: "#6366f1" },
  { name: "power3.out", ease: "power3.out", color: "#06b6d4" },
  { name: "back.out(1.7)", ease: "back.out(1.7)", color: "#f59e0b" },
  { name: "elastic.out(1,0.3)", ease: "elastic.out(1,0.3)", color: "#ec4899" },
  { name: "bounce.out", ease: "bounce.out", color: "#22c55e" },
  { name: "expo.inOut", ease: "expo.inOut", color: "#a78bfa" },
];

function DemoEasing() {
  const scope = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope });

  const runAll = contextSafe(() => {
    // Reset về đầu trước khi chạy — đảm bảo mỗi lần bấm đều thấy full animation
    gsap.set(".ease-dot", { x: 0 });

    // Mỗi dot chạy với easing khác nhau nhưng cùng duration → so sánh trực quan
    EASINGS.forEach((e, i) => {
      gsap.to(`.ease-dot-${i}`, {
        x: 240, // cùng quãng đường
        duration: 1.2,
        ease: e.ease, // khác easing → cảm giác khác nhau
        delay: 0.05 * i, // stagger nhẹ để dễ nhìn
      });
    });
  });

  const resetAll = contextSafe(() => {
    gsap.to(".ease-dot", { x: 0, duration: 0.4, ease: "power2.inOut", stagger: 0.03 });
  });

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-indigo-400 font-mono">ease</span> — Cảm giác chuyển động
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Cùng một tween nhưng easing khác nhau cho cảm giác hoàn toàn khác. Dùng{" "}
        <code className="text-zinc-300">power3.out</code> cho entrance tự nhiên,{" "}
        <code className="text-zinc-300">back/elastic</code> cho playful,{" "}
        <code className="text-zinc-300">bounce</code> cho vui nhộn.
      </p>

      <CodeBlock
        code={`// Chỉ cần đổi ease — cùng tween, cảm giác khác hẳn
gsap.to(".box", { x: 240, duration: 1.2, ease: "power3.out" });    // mượt, tự nhiên
gsap.to(".box", { x: 240, duration: 1.2, ease: "back.out(1.7)" }); // vượt đích rồi bật lại
gsap.to(".box", { x: 240, duration: 1.2, ease: "elastic.out(1,0.3)" }); // đàn hồi
gsap.to(".box", { x: 240, duration: 1.2, ease: "bounce.out" });    // nảy như bóng` }
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-5 overflow-hidden">
        <div className="space-y-3">
          {EASINGS.map((e, i) => (
            <div key={e.name} className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-zinc-500 w-[148px] shrink-0 text-right hidden md:block">
                {e.name}
              </span>
              <span className="text-[11px] font-mono text-zinc-500 w-[88px] shrink-0 text-right md:hidden">
                {e.name.split("(")[0]}
              </span>
              <div className="flex-1 h-[28px] bg-white/[0.04] rounded-full border border-white/5 relative overflow-hidden flex items-center px-1">
                <div
                  className={`ease-dot ease-dot-${i} w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[9px] font-bold text-white`}
                  style={{ background: e.color }}
                >
                  {i + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-5">
          <button
            onClick={runAll}
            className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Play size={14} /> Chạy so sánh
          </button>
          <button
            onClick={resetAll}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 6. STAGGER — animation nhóm với độ trễ lan tỏa
// ============================================================================
function DemoStagger() {
  const scope = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope });
  const [mode, setMode] = useState<"each" | "grid" | "center" | "random">("each");

  const run = contextSafe(() => {
    // Reset trước
    gsap.set(".stagger-box", { y: 0, opacity: 1, scale: 1, rotation: 0 });

    // Stagger configs khác nhau — so sánh hiệu ứng
    const configs: Record<string, gsap.StaggerVars> = {
      each: { each: 0.08 }, // mỗi phần tử cách nhau 0.08s — đơn giản nhất
      grid: { amount: 0.8, grid: [2, 4], from: "start" as const }, // lan tỏa theo grid 2x4
      center: { amount: 0.6, from: "center" as const }, // từ giữa lan ra 2 bên
      random: { each: 0.07, from: "random" as const }, // ngẫu nhiên — organic
    };

    gsap.from(".stagger-box", {
      y: 30,
      opacity: 0,
      scale: 0.85,
      rotation: -5,
      duration: 0.5,
      ease: "back.out(1.4)",
      stagger: configs[mode], // stagger object quyết định thứ tự + timing
    });
  });

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-violet-400 font-mono">stagger</span> — Animation nhóm lan tỏa
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Một dòng <code className="text-zinc-300">stagger</code> thay cho loop thủ công. Hỗ trợ{" "}
        <code className="text-zinc-300">each</code>, <code className="text-zinc-300">amount</code>,{" "}
        <code className="text-zinc-300">grid</code>, <code className="text-zinc-300">from: center/random/edges</code>.
      </p>

      <CodeBlock
        code={`// stagger đơn giản — mỗi box cách nhau 0.08s
gsap.from(".box", { y: 30, opacity: 0, stagger: { each: 0.08 } });

// stagger theo grid 2×4 — lan tỏa như sóng
gsap.from(".box", { y: 30, opacity: 0, stagger: { amount: 0.8, grid: [2,4] } });

// từ giữa lan ra
gsap.from(".box", { y: 30, opacity: 0, stagger: { amount: 0.6, from: "center" } });

// ngẫu nhiên
gsap.from(".box", { y: 30, opacity: 0, stagger: { each: 0.07, from: "random" } });`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-5 overflow-hidden">
        <div className="grid grid-cols-4 gap-2 max-w-[360px] mx-auto">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="stagger-box h-[56px] rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-white"
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-5">
          <div className="flex gap-1 p-1 rounded-full bg-white/5 border border-white/10">
            {(
              [
                ["each", "each"],
                ["grid", "grid"],
                ["center", "center"],
                ["random", "random"],
              ] as const
            ).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setMode(val)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                  mode === val
                    ? "bg-violet-600 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={run}
            className="ml-auto px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Play size={14} /> Chạy stagger
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 7. KEYFRAMES — multi-step trong 1 tween (thay cho timeline dài)
// ============================================================================
function DemoKeyframes() {
  const scope = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope });

  const run = contextSafe(() => {
    // keyframes: thay vì tạo timeline với nhiều .to(), gom vào 1 tween
    // Mỗi keyframe là 1 object — GSAP tự nối tiếp
    gsap.to(".box-kf", {
      keyframes: [
        { x: 120, scale: 1.2, duration: 0.3, ease: "power2.out" }, // bước 1: sang phải + to ra
        { y: -40, rotation: 180, duration: 0.3, ease: "power2.inOut" }, // bước 2: lên + xoay
        { x: 0, y: 0, scale: 1, rotation: 360, duration: 0.5, ease: "back.out(1.2)" }, // bước 3: về gốc + xoay vòng
      ],
    });
  });

  const reset = contextSafe(() => {
    gsap.set(".box-kf", { clearProps: "all" });
  });

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-emerald-400 font-mono">keyframes</span> — Multi-step trong 1 tween
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Thay vì <code className="text-zinc-300">timeline.to().to().to()</code> dài dòng — gom các bước
        vào <code className="text-zinc-300">keyframes: []</code> trong 1 tween duy nhất.
      </p>

      <CodeBlock
        code={`gsap.to(".box", {
  keyframes: [
    { x: 120, scale: 1.2, duration: 0.3, ease: "power2.out" },
    { y: -40, rotation: 180, duration: 0.3, ease: "power2.inOut" },
    { x: 0, y: 0, scale: 1, rotation: 360, duration: 0.5, ease: "back.out(1.2)" },
  ],
});`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-6 overflow-hidden">
        <div className="h-[100px] flex items-center">
          <div className="box-kf w-[56px] h-[56px] rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[11px] font-mono text-emerald-300 shrink-0">
            KF
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={run}
            className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Play size={14} /> Chạy keyframes
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 8. TIMELINE — linh hồn của GSAP — sequence nhiều tween thành câu chuyện
// ============================================================================
function DemoTimeline() {
  const scope = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [status, setStatus] = useState("idle");

  useGSAP(
    () => {
      // gsap.timeline() — container để sequence nhiều tween
      // Khác với gọi gsap.to() riêng lẻ: timeline cho phép overlap, sync, control tổng
      const tl = gsap.timeline({
        paused: true, // không auto-play — để user bấm nút
        onStart: () => setStatus("playing"),
        onComplete: () => setStatus("done"),
        onUpdate: () => {
          // có thể đọc tl.progress() (0→1) để sync progress bar, v.v.
        },
      });

      // .from() — box 1 bay từ trái vào
      tl.from(".tl-box1", {
        x: -80,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      })
        // .to() — box 2 scale up, bắt đầu CÙNG LÚC với tween trước ("<")
        // Position parameter: "<" = start cùng lúc với tween trước
        .from(
          ".tl-box2",
          {
            y: 40,
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: "back.out(1.4)",
          },
          "<" // ← position parameter: cùng lúc với tween trước
        )
        // Box 3 — bắt đầu sau 0.15s kể từ khi tween trước bắt đầu ("<0.15")
        .from(
          ".tl-box3",
          {
            y: 40,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "<0.15"
        )
        // Label + overlap: tất cả boxes cùng pulse
        .to(
          ".tl-box",
          {
            scale: 1.08,
            duration: 0.2,
            ease: "power2.out",
            stagger: 0.06,
          },
          "+=0.1" // sau 0.1s kể từ tween trước kết thúc
        )
        .to(".tl-box", {
          scale: 1,
          duration: 0.3,
          ease: "power2.inOut",
          stagger: 0.06,
        });

      tlRef.current = tl;
    },
    { scope }
  );

  const play = () => {
    setStatus("playing");
    tlRef.current?.restart(); // restart từ đầu
  };
  const pause = () => {
    tlRef.current?.pause();
    setStatus("paused");
  };
  const resume = () => {
    tlRef.current?.play();
    setStatus("playing");
  };
  const reverse = () => {
    tlRef.current?.reverse();
    setStatus("reversing");
  };
  const restart = () => {
    tlRef.current?.restart();
    setStatus("playing");
  };

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-sm tracking-wide">
          <span className="text-indigo-400 font-mono">gsap.timeline()</span> — Sequence & Position
        </h3>
        <span
          className={`text-[11px] px-2.5 py-1 rounded-full font-mono font-bold border ${
            status === "playing"
              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
              : status === "done"
                ? "bg-indigo-500/15 text-indigo-400 border-indigo-500/20"
                : status === "paused"
                  ? "bg-amber-500/15 text-amber-400 border-amber-500/20"
                  : "bg-white/5 text-zinc-500 border-white/10"
          }`}
        >
          {status}
        </span>
      </div>
      <p className="text-xs text-zinc-500 mb-4">
        Timeline gom nhiều tween thành 1 sequence.{" "}
        <code className="text-zinc-300">Position parameter</code> (
        <code className="text-amber-300">{"<, >, <0.15, +=0.1"}</code>) quyết định overlap.
      </p>

      <CodeBlock
        code={`const tl = gsap.timeline({ paused: true });

tl.from(".box1", { x: -80, opacity: 0, duration: 0.5 })          // 0s — box1 vào
  .from(".box2", { y: 40, opacity: 0, duration: 0.5 }, "<")      // "<" = cùng lúc với box1
  .from(".box3", { y: 40, opacity: 0, duration: 0.5 }, "<0.15")  // "<0.15" = sau 0.15s kể từ box1
  .to(".box", { scale: 1.08, stagger: 0.06 }, "+=0.1")           // "+=0.1" = sau 0.1s kể từ tween trước
  .to(".box", { scale: 1, stagger: 0.06 });                      // tiếp nối ngay

// Control toàn bộ timeline như 1 tween duy nhất
tl.play() / tl.pause() / tl.reverse() / tl.restart() / tl.timeScale(2)`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-6 overflow-hidden">
        <div className="flex gap-3 justify-center">
          <div className="tl-box tl-box1 w-[84px] h-[84px] rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 border border-white/10 flex flex-col items-center justify-center gap-1">
            <span className="text-[11px] font-mono font-bold text-white/80">BOX 1</span>
            <span className="text-[10px] font-mono text-white/50">x: -80 → 0</span>
          </div>
          <div className="tl-box tl-box2 w-[84px] h-[84px] rounded-2xl bg-gradient-to-br from-fuchsia-600 to-pink-600 border border-white/10 flex flex-col items-center justify-center gap-1">
            <span className="text-[11px] font-mono font-bold text-white/80">BOX 2</span>
            <span className="text-[10px] font-mono text-white/50">{"< (cùng lúc)"}</span>
          </div>
          <div className="tl-box tl-box3 w-[84px] h-[84px] rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-600 border border-white/10 flex flex-col items-center justify-center gap-1">
            <span className="text-[11px] font-mono font-bold text-white/80">BOX 3</span>
            <span className="text-[10px] font-mono text-white/50">{"<0.15"}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={play}
            className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Play size={14} /> Play
          </button>
          <button
            onClick={pause}
            className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Pause size={14} /> Pause
          </button>
          <button
            onClick={resume}
            className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition"
          >
            Resume
          </button>
          <button
            onClick={reverse}
            className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Rewind size={14} /> Reverse
          </button>
          <button
            onClick={restart}
            className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <RotateCcw size={14} /> Restart
          </button>
        </div>

        {/* Position parameter legend */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { k: "<", v: "cùng lúc với tween trước" },
            { k: ">", v: "sau khi tween trước xong" },
            { k: "<0.15", v: "sau 0.15s kể từ tween trước bắt đầu" },
            { k: "+=0.1", v: "sau 0.1s kể từ tween trước kết thúc" },
          ].map((x) => (
            <div
              key={x.k}
              className="rounded-lg bg-white/[0.04] border border-white/5 px-3 py-2 text-center"
            >
              <div className="text-xs font-mono font-bold text-amber-400">{x.k}</div>
              <div className="text-[11px] text-zinc-500 leading-tight mt-0.5">{x.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 9. TIMELINE CONTROL — timeScale, progress, repeat, yoyo, callbacks
// ============================================================================
function DemoTimelineControl() {
  const scope = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [speed, setSpeed] = useState(1);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1, // lặp vô hạn
        yoyo: true, // đảo chiều mỗi lần lặp — đi rồi về
        repeatDelay: 0.3, // nghỉ 0.3s giữa mỗi lần lặp
      });

      tl.to(".ctrl-dot", {
        x: 220,
        rotation: 360,
        backgroundColor: "#6366f1",
        duration: 0.8,
        ease: "power2.inOut",
      })
        .to(
          ".ctrl-dot",
          {
            scale: 1.3,
            duration: 0.15,
            ease: "power2.out",
          },
          "-=0.15"
        )
        .to(".ctrl-dot", {
          scale: 1,
          duration: 0.15,
          ease: "power2.inOut",
        });

      tlRef.current = tl;
    },
    { scope }
  );

  const setTimeScale = (v: number) => {
    setSpeed(v);
    tlRef.current?.timeScale(v); // timeScale: tua nhanh/chậm toàn bộ timeline
  };

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-indigo-400 font-mono">Timeline Control</span> — repeat, yoyo,
        timeScale, callbacks
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Timeline là 1 tween — có <code className="text-zinc-300">repeat, yoyo, timeScale</code>,{" "}
        <code className="text-zinc-300">progress()</code> và callbacks y hệt tween.
      </p>

      <CodeBlock
        code={`const tl = gsap.timeline({
  repeat: -1,       // lặp vô hạn (-1)
  yoyo: true,       // đảo chiều mỗi lần lặp
  repeatDelay: 0.3, // nghỉ giữa các lần lặp
  onStart: () => console.log("bắt đầu"),
  onComplete: () => console.log("xong 1 lượt"),
  onUpdate: () => console.log(tl.progress()), // 0 → 1
});

tl.to(".dot", { x: 220, rotation: 360, duration: 0.8 })
  .to(".dot", { scale: 1.3, duration: 0.15 }, "-=0.15")
  .to(".dot", { scale: 1, duration: 0.15 });

// Điều khiển tốc độ toàn bộ timeline
tl.timeScale(2);   // nhanh gấp đôi
tl.timeScale(0.5); // chậm một nửa
tl.pause() / tl.play() / tl.reverse() / tl.progress(0.5)`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-6 overflow-hidden">
        <div className="h-[56px] flex items-center">
          <div className="ctrl-dot w-12 h-12 rounded-xl bg-zinc-700 border border-white/10 flex items-center justify-center text-[10px] font-mono text-white shrink-0">
            LOOP
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-xs text-zinc-500 font-mono">Speed:</span>
          {[0.5, 1, 1.5, 2].map((v) => (
            <button
              key={v}
              onClick={() => setTimeScale(v)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold font-mono transition border ${
                speed === v
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {v}×
            </button>
          ))}
          <span className="ml-2 text-[11px] text-zinc-500 flex items-center gap-1.5">
            <Clock3 size={12} /> repeat: -1 + yoyo
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 10. NESTED TIMELINE — timeline lồng timeline
// ============================================================================
function DemoNestedTimeline() {
  const scope = useRef<HTMLDivElement>(null);
  const masterRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      // Master timeline — điều khiển toàn bộ
      const master = gsap.timeline({ paused: true });

      // Child timeline 1: intro — header + subtitle
      const intro = gsap.timeline();
      intro
        .from(".nested-title", { y: 20, opacity: 0, duration: 0.4, ease: "power3.out" })
        .from(".nested-sub", { y: 12, opacity: 0, duration: 0.3 }, "-=0.15");

      // Child timeline 2: cards stagger
      const cards = gsap.timeline();
      cards.from(".nested-card", {
        y: 24,
        opacity: 0,
        scale: 0.96,
        duration: 0.4,
        stagger: 0.08,
        ease: "power3.out",
      });

      // Child timeline 3: CTA
      const cta = gsap.timeline();
      cta.from(".nested-cta", { scale: 0.9, opacity: 0, duration: 0.4, ease: "back.out(1.4)" });

      // Ghép vào master — mỗi child là 1 "chapter"
      master
        .add(intro) // chapter 1
        .add(cards, "+=0.1") // chapter 2 — sau 0.1s
        .add(cta, "-=0.15"); // chapter 3 — overlap 0.15s

      masterRef.current = master;
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 md:p-6"
    >
      <h3 className="font-bold text-sm tracking-wide mb-1">
        <span className="text-fuchsia-400 font-mono">Nested Timeline</span> — Timeline lồng timeline
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Mỗi section là 1 child timeline — <code className="text-zinc-300">master.add(child)</code>{" "}
        để ghép thành câu chuyện lớn. Dễ maintain, dễ reorder.
      </p>

      <CodeBlock
        code={`const master = gsap.timeline({ paused: true });

// Child timelines — mỗi cái là 1 chapter
const intro = gsap.timeline();
intro.from(".title", { y: 20, opacity: 0 })
     .from(".sub", { y: 12, opacity: 0 }, "-=0.15");

const cards = gsap.timeline();
cards.from(".card", { y: 24, opacity: 0, stagger: 0.08 });

const cta = gsap.timeline();
cta.from(".cta", { scale: 0.9, opacity: 0, ease: "back.out(1.4)" });

// Ghép vào master — như lắp LEGO
master.add(intro).add(cards, "+=0.1").add(cta, "-=0.15");
master.play(); // chạy toàn bộ như 1 timeline duy nhất`}
      />

      <div className="mt-5 bg-[#0a0a14] rounded-xl border border-white/5 p-5 overflow-hidden">
        <div className="text-center">
          <div className="nested-title text-lg font-black tracking-tight">Nested Timeline Demo</div>
          <div className="nested-sub text-xs text-zinc-500 mt-1">3 child timelines ghép vào 1 master</div>

          <div className="grid grid-cols-3 gap-2 mt-5 max-w-[360px] mx-auto">
            <div className="nested-card h-[64px] rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-mono text-zinc-300">
              Card 1
            </div>
            <div className="nested-card h-[64px] rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-mono text-zinc-300">
              Card 2
            </div>
            <div className="nested-card h-[64px] rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-mono text-zinc-300">
              Card 3
            </div>
          </div>

          <button className="nested-cta mt-5 px-5 py-2.5 rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold transition">
            Call to Action
          </button>
        </div>

        <div className="flex gap-2 mt-6 justify-center">
          <button
            onClick={() => masterRef.current?.restart()}
            className="px-4 py-2 rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Play size={14} /> Play master
          </button>
          <button
            onClick={() => masterRef.current?.reverse()}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Rewind size={14} /> Reverse
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// APP — Composition: gom tất cả demo sections
// ============================================================================
export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Hero entrance — timeline stagger cho tiêu đề + subtitle
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-badge", { y: 12, opacity: 0, duration: 0.5 })
        .from(".hero-title span", { y: 40, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.2")
        .from(".hero-sub", { y: 12, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-nav a", { y: 8, opacity: 0, duration: 0.4, stagger: 0.06 }, "-=0.2");
    },
    { scope: heroRef }
  );

  const nav = [
    { href: "#tween", label: "Tween" },
    { href: "#easing", label: "Easing" },
    { href: "#stagger", label: "Stagger" },
    { href: "#keyframes", label: "Keyframes" },
    { href: "#timeline", label: "Timeline" },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-zinc-100 selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#0f0f1a]/70 border-b border-white/5">
        <div className="max-w-[980px] mx-auto px-4 md:px-6 h-[56px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-sm">
              G
            </div>
            <span className="font-black tracking-tight text-sm">GSAP DEMO</span>
            <span className="hidden md:inline text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 font-mono">
              Tween + Timeline
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="px-3 py-1.5 rounded-full text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="https://gsap.com/docs/v3/"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-100 transition flex items-center gap-1.5 shrink-0"
          >
            <Code2 size={14} /> Docs
          </a>
        </div>
      </header>

      {/* Hero */}
      <div ref={heroRef} className="max-w-[980px] mx-auto px-4 md:px-6 pt-10 md:pt-14 pb-6">
        <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-300">
          <Sparkles size={14} /> GSAP 3.15 · React 19 · TypeScript · Tailwind 4
        </div>

        <h1 className="hero-title mt-5 text-[36px] md:text-[52px] font-black tracking-[-0.04em] leading-[0.9]">
          <span className="inline-block">Tween</span>{" "}
          <span className="inline-block text-indigo-400">&</span>{" "}
          <span className="inline-block">Timeline</span>
          <br />
          <span className="inline-block text-zinc-500 text-[28px] md:text-[40px]">từ A → Z</span>
        </h1>

        <p className="hero-sub mt-4 text-sm md:text-[15px] leading-relaxed text-zinc-400 max-w-2xl">
          Demo tương tác chi tiết cho từng phần của GSAP Tween và Timeline — mỗi ví dụ đều có{" "}
          <b className="text-zinc-200">code + comment tiếng Việt</b> và nút bấm để chạy thử ngay.
          Mở DevTools để xem timeline hoạt động.
        </p>

        <nav className="hero-nav mt-6 flex flex-wrap gap-2 md:hidden">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-zinc-300"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="mt-8 flex items-center gap-2 text-xs text-zinc-500">
          <ChevronDown size={14} className="animate-bounce" /> Kéo xuống để xem từng phần
        </div>
      </div>

      {/* Main */}
      <main className="max-w-[980px] mx-auto px-4 md:px-6 pb-16 space-y-14">
        {/* ── TWEEN ── */}
        <Section
          id="tween"
          number="01 — TWEEN"
          title="Tween — viên gạch cơ bản"
          subtitle="Mọi animation GSAP đều là tween. Có 4 cách tạo tween: to / from / fromTo / set — mỗi cách phục vụ một nhu cầu khác nhau."
          icon={<MousePointer2 size={16} />}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <DemoTo />
            <DemoFrom />
            <DemoFromTo />
            <DemoSet />
          </div>

          {/* Quick reference */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
            <h4 className="text-xs font-bold tracking-widest text-zinc-400 mb-3">CHEAT SHEET</h4>
            <div className="grid md:grid-cols-4 gap-3 text-xs">
              {[
                {
                  name: "gsap.to()",
                  desc: "Từ hiện tại → đến giá trị mới",
                  use: "Di chuyển, fade, scale",
                },
                { name: "gsap.from()", desc: "Từ giá trị chỉ định → về CSS gốc", use: "Entrance, reveal" },
                {
                  name: "gsap.fromTo()",
                  desc: "Chỉ định cả FROM lẫn TO",
                  use: "Loop, animation chính xác",
                },
                { name: "gsap.set()", desc: "Áp dụng ngay, không animate", use: "Reset, initial state" },
              ].map((x) => (
                <div
                  key={x.name}
                  className="rounded-xl bg-[#0a0a14] border border-white/5 p-3.5"
                >
                  <div className="font-mono font-bold text-indigo-400 text-xs">{x.name}</div>
                  <div className="text-zinc-500 mt-1 leading-relaxed">{x.desc}</div>
                  <div className="text-zinc-600 mt-1 text-[11px]">→ {x.use}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── EASING ── */}
        <Section
          id="easing"
          number="02 — EASING"
          title="Easing — linh hồn của chuyển động"
          subtitle="Easing quyết định cảm giác: tự nhiên, đàn hồi, nảy, hay robot. Đổi ease là đổi luôn personality của animation."
          icon={<Zap size={16} />}
        >
          <DemoEasing />
        </Section>

        {/* ── STAGGER ── */}
        <Section
          id="stagger"
          number="03 — STAGGER"
          title="Stagger — một dòng cho cả nhóm"
          subtitle="Thay vì loop thủ công từng element, GSAP stagger tự lan tỏa animation qua nhiều phần tử với timing tinh tế."
          icon={<Layers size={16} />}
        >
          <DemoStagger />
        </Section>

        {/* ── KEYFRAMES ── */}
        <Section
          id="keyframes"
          number="04 — KEYFRAMES"
          title="Keyframes — multi-step gọn nhẹ"
          subtitle="Khi cần nhiều bước liên tiếp nhưng không muốn tạo cả timeline — keyframes gom tất cả vào 1 tween."
          icon={<Sparkles size={16} />}
        >
          <DemoKeyframes />
        </Section>

        {/* ── TIMELINE ── */}
        <Section
          id="timeline"
          number="05 — TIMELINE"
          title="Timeline — đạo diễn của mọi animation"
          subtitle="Timeline là nơi bạn lắp ráp nhiều tween thành một câu chuyện có nhịp điệu — với position parameter để điều khiển overlap chính xác."
          icon={<Clock3 size={16} />}
        >
          <div className="space-y-4">
            <DemoTimeline />
            <DemoTimelineControl />
            <DemoNestedTimeline />
          </div>

          {/* Timeline vs Tween comparison */}
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

        {/* ── NEXT STEPS ── */}
        <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/15 via-violet-600/10 to-fuchsia-600/10 backdrop-blur p-6 md:p-8">
          <h2 className="text-xl font-black tracking-tight">Tiếp theo học gì?</h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
            Bạn đã nắm Tween + Timeline — nền tảng của mọi thứ. Tiếp tục với ScrollTrigger, Text/SVG,
            React integration và production patterns trong{" "}
            <code className="text-zinc-200">docs/</code>.
          </p>
          <div className="grid md:grid-cols-3 gap-3 mt-6">
            {[
              { n: "05", t: "ScrollTrigger", d: "Animation theo scroll, scrub, pin" },
              { n: "08", t: "React + GSAP", d: "useGSAP(), context, SSR" },
              { n: "13", t: "Visual Design", d: "12 Principles, Color, Typography" },
            ].map((x) => (
              <div
                key={x.n}
                className="rounded-xl bg-[#0a0a14] border border-white/10 p-4"
              >
                <div className="text-[11px] font-mono font-bold text-indigo-400">{x.n}</div>
                <div className="font-bold text-sm mt-1">{x.t}</div>
                <div className="text-xs text-zinc-500 mt-1">{x.d}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            <a
              href="https://gsap.com/docs/v3/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-100 transition"
            >
              GSAP Docs →
            </a>
            <a
              href="https://gsap.com/resources/React"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-xs font-bold hover:bg-white/15 transition"
            >
              React + GSAP Guide
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-zinc-600">
        Built with GSAP 3.15 · React 19 · Tailwind 4 · Vite 8 — GSAP Learning Course
      </footer>
    </div>
  );
}
