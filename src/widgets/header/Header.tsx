/**
 * Widget: Header — sticky nav với page routing + section anchors
 * @layer widgets
 *
 * BrowserRouter: href="#id" chỉ đổi hash, không ảnh hưởng route matching
 * → native anchor scroll hoạt động bình thường.
 */
import { NavLink, useLocation } from "react-router-dom";
import { Code2, MousePointer2, MoveVertical } from "lucide-react";

const PAGES = [
  { to: "/", label: "Tween & Timeline", icon: MousePointer2 },
  { to: "/scroll-trigger", label: "ScrollTrigger", icon: MoveVertical },
];

const SECTIONS_BY_PATH: Record<string, { href: string; label: string }[]> = {
  "/": [
    { href: "#tween", label: "Tween" },
    { href: "#easing", label: "Easing" },
    { href: "#stagger", label: "Stagger" },
    { href: "#keyframes", label: "Keyframes" },
    { href: "#timeline", label: "Timeline" },
  ],
  "/scroll-trigger": [
    { href: "#scroll-basics", label: "Trigger" },
    { href: "#scroll-scrub", label: "Scrub & Pin" },
    { href: "#scroll-advanced", label: "Nâng cao" },
  ],
};

export function Header() {
  const { pathname } = useLocation();
  const sections = SECTIONS_BY_PATH[pathname] ?? [];

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#0f0f1a]/70 border-b border-white/5">
      <div className="max-w-[980px] mx-auto px-4 md:px-6 h-[56px] flex items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-sm">
            G
          </div>
          <span className="font-black tracking-tight text-sm">GSAP COURSE</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-1">
          {/* Page links — NavLink active state theo route */}
          {PAGES.map((page) => (
            <NavLink
              key={page.to}
              to={page.to}
              end={page.to === "/"}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <page.icon size={13} />
              {page.label}
            </NavLink>
          ))}

          {/* Section anchors của page hiện tại */}
          <span className="w-px h-4 bg-white/10 mx-1.5" />
          {sections.map((section) => (
            <a
              key={section.href}
              href={section.href}
              className="px-2.5 py-1.5 rounded-full text-[11px] font-bold text-zinc-500 hover:text-white hover:bg-white/5 transition"
            >
              {section.label}
            </a>
          ))}
        </nav>

        <a
          href="https://gsap.com/docs/v3/Plugins/ScrollTrigger/"
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-100 transition flex items-center gap-1.5 shrink-0"
        >
          <Code2 size={14} /> Docs
        </a>
      </div>

      {/* Mobile nav — chỉ page links */}
      <nav className="md:hidden flex items-center gap-1 px-4 pb-2">
        {PAGES.map((page) => (
          <NavLink
            key={page.to}
            to={page.to}
            end={page.to === "/"}
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-full text-[11px] font-bold transition flex items-center gap-1.5 ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-zinc-400 bg-white/5 border border-white/10"
              }`
            }
          >
            <page.icon size={12} />
            {page.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
