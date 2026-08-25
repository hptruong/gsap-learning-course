# GSAP Learning Course — Từ Zero đến Awwwards

> Giáo trình GSAP (GreenSock Animation Platform) hoàn chỉnh bằng tiếng Việt — từ `gsap.to()` cơ bản đến Awwwards-level patterns, production patterns và visual design cho animation hiện đại 2026.

[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge)](https://gsap.com/docs/v3/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

---

## GSAP là gì?

**GSAP (GreenSock Animation Platform)** là animation library mạnh nhất cho web hiện tại:

- **Hiệu năng cao** — GPU-accelerated, 60fps mượt mà, auto-optimize
- **Tương thích mọi nơi** — React, Vue, Svelte, Vanilla JS, Webflow, Three.js
- **Plugin ecosystem** — ScrollTrigger, Flip, MotionPath, DrawSVG, ScrollSmoother...
- **Dùng bởi** — Google, Apple, Nike, Stripe và hàng nghìn Awwwards sites

> Học GSAP không chỉ là học code animation — mà là học cách **tạo hình ảnh đẹp, có visual, kể chuyện bằng chuyển động**.

---

## Lộ trình học — 10 Phases / 20 tuần

```
Phase  1 · Foundations (W1-2)       → gsap.to/from/fromTo, Easing, Stagger
Phase  2 · Sequencing (W3-4)        → Timeline, Position Parameter, Callbacks
Phase  3 · Scroll Power (W5-6)      → ScrollTrigger, Scrub, Pin, Parallax
Phase  4 · Specialized (W7-8)       → Text (SplitText), SVG (DrawSVG/MorphSVG), Flip
Phase  5 · React + TypeScript (W9-10) → useGSAP(), Context, SSR, ContextSafe
Phase  6 · Advanced + Projects (W11-12) → Performance, A11y, Portfolio/E-commerce/Storytelling
Phase  7 · Landing Page (W13-14)    → 7 Pillars, Hero, Scroll Storytelling, Awwwards
Phase  8 · Production (W15-16)      → Preloader, Lenis Smooth Scroll, Cursor, Marquee
Phase  9 · Visual + Utilities (W17-18) → 12 Principles, Color/Typography, gsap.utils, quickTo, matchMedia
Phase 10 · Common Patterns (W19-20) → 3D Tilt, Counter, Carousel, Image Reveal, Transitions
```

Chi tiết đầy đủ: [`docs/ROADMAP.md`](docs/ROADMAP.md)

---

## Tài liệu — 18 files

| # | File | Nội dung | Level |
|---|------|----------|-------|
| 0 | [00-GIOI-THIEU.md](docs/00-GIOI-THIEU.md) | Giới thiệu GSAP & cài đặt | Beginner |
| 1 | [01-CO-BAN.md](docs/01-CO-BAN.md) | `gsap.to/from/fromTo/set`, `autoAlpha`, `keyframes`, `overwrite`, `clearProps` | Beginner |
| 2 | [02-EASING.md](docs/02-EASING.md) | Easing functions — cảm giác chuyển động | Beginner |
| 3 | [03-STAGGER.md](docs/03-STAGGER.md) | Stagger animations — animation nhóm | Beginner |
| 4 | [04-TIMELINE.md](docs/04-TIMELINE.md) | Timeline & Position Parameter | Intermediate |
| 5 | [05-SCROLL-TRIGGER.md](docs/05-SCROLL-TRIGGER.md) | ScrollTrigger — horizontal scroll, velocity skew, batch | Intermediate |
| 6 | [06-TEXT.md](docs/06-TEXT.md) | Text animations — kinetic, glitch, liquid, 3D flip | Intermediate |
| 7 | [07-SVG.md](docs/07-SVG.md) | SVG — DrawSVG, MorphSVG, MotionPath | Intermediate |
| 8 | [08-REACT.md](docs/08-REACT.md) | React + GSAP — `useGSAP()`, Context, SSR | Intermediate |
| 9 | [09-NANG-CAO.md](docs/09-NANG-CAO.md) | Advanced — Lenis, preloader, marquee, page transitions | Advanced |
| 10 | [10-PROJECTS.md](docs/10-PROJECTS.md) | 5 dự án thực chiến step-by-step | Advanced |
| 11 | [11-LANDING-PAGE.md](docs/11-LANDING-PAGE.md) | Landing page — 7 pillars + animation mapping | Advanced |
| 12 | [12-AWWWARDS-PATTERNS.md](docs/12-AWWWARDS-PATTERNS.md) | Awwwards patterns — 6 categories + code | Advanced |
| 13 | [13-VISUAL-DESIGN.md](docs/13-VISUAL-DESIGN.md) | Visual design — 12 Principles, Color, Typography, Storyboard | Intermediate |
| 14 | [14-GSAP-UTILITIES.md](docs/14-GSAP-UTILITIES.md) | Utilities — `quickTo`, `matchMedia`, `registerEffect`, `gsap.utils.*`, `ticker` | Advanced |
| 15 | [15-MISSING-PATTERNS.md](docs/15-MISSING-PATTERNS.md) | Patterns — 3D Tilt, Counter, Carousel, Image Reveal, Cursor | Advanced |
| — | [GLOSSARY.md](docs/GLOSSARY.md) | Từ điển 96 thuật ngữ animation | All |
| — | [ROADMAP.md](docs/ROADMAP.md) | Lộ trình tổng quan 10 phases | All |

> Quy ước: tài liệu viết bằng **tiếng Việt**, giữ nguyên thuật ngữ chuyên ngành GSAP bằng tiếng Anh.

---

## Tech Stack

| Layer | Công nghệ | Phiên bản |
|-------|-----------|-----------|
| Build | Vite | 8.x |
| UI | React | 19 + TypeScript 6 |
| Animation | GSAP | 3.15 + @gsap/react 2.1 |
| Smooth Scroll | Lenis | 1.3 |
| Styling | Tailwind CSS | 4.x |
| Icons | lucide-react | 1.x |
| Lint | oxlint | 1.x |
| Package Manager | pnpm | 10.x |

---

## Bắt đầu

### Yêu cầu

- Node.js >= 20
- pnpm >= 10 (`npm i -g pnpm`)

### Cài đặt & chạy

```bash
# Clone
git clone https://github.com/hptruong/gsap-learning-course.git
cd gsap-learning-course

# Cài dependencies
pnpm install

# Dev server (HMR)
pnpm dev
# → http://localhost:5173

# Build production
pnpm build

# Preview build
pnpm preview

# Lint
pnpm lint
```

### Cấu trúc dự án

```
gsap-learning-course/
├── docs/                 # 18 files giáo trình (đọc theo ROADMAP.md)
│   ├── ROADMAP.md        # Lộ trình 10 phases
│   ├── GLOSSARY.md       # 96 thuật ngữ
│   ├── 00-GIOI-THIEU.md  # ...
│   └── 15-MISSING-PATTERNS.md
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── assets/
├── public/
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Cách học hiệu quả

1. **Đọc theo thứ tự ROADMAP** — đừng nhảy cóc, mỗi phase build trên phase trước.
2. **Code theo từng bài tập** — mỗi file docs có phần `🏋️ Bài Tập` ở cuối, làm đủ trước khi sang file tiếp theo.
3. **Học visual song song với code** — đọc `13-VISUAL-DESIGN.md` sớm (12 Principles, Color Theory, Typography) để animation có hồn, không chỉ đúng kỹ thuật.
4. **Làm 3 projects ở Phase 6 + 8** trước khi học patterns nâng cao.
5. **Tham khảo GSAP docs gốc** khi cần tra API chi tiết: [gsap.com/docs/v3](https://gsap.com/docs/v3/).

---

## Best Practices (tóm tắt)

1. `gsap.registerPlugin()` trước khi dùng plugin
2. Cleanup khi component unmount — dùng `useGSAP()` + `gsap.context()`
3. Chỉ animate `x, y, scale, rotation, opacity` (GPU-accelerated) — tránh `top/left/width/height`
4. Tôn trọng `prefers-reduced-motion` (a11y)
5. Giữ duration 0.6–1.2s cho entrance, 0.2–0.3s cho hover feedback
6. Dùng `contextSafe()` cho event handlers trong React
7. Mỗi animation phải có **mục đích** — không decoration vô nghĩa
8. Kết hợp **Lenis + ScrollTrigger** cho smooth scroll 2026

---

## Tài liệu tham khảo

**Official**
- [GSAP Docs v3](https://gsap.com/docs/v3/) · [GSAP Cheatsheet](https://gsap.com/cheatsheet) · [React + GSAP](https://gsap.com/resources/React)

**Khóa học gợi ý**
- [Creative Coding Club — GSAP 3 Express](https://www.creativecodingclub.com/) (Free + Premium)
- [JavaScript Mastery — GSAP Course (YouTube)](https://jsmastery.com/course/gsap-animations-course)

**Cộng đồng**
- [GSAP Forum](https://gsap.com/community/) · [Discord](https://gsap.com/discord/) · [CodePen — GreenSock](https://codepen.io/GreenSock)

---

## License

MIT — dùng tự do cho học tập và dự án cá nhân.

---

*Cập nhật: 08/2026 · GSAP v3.15 · Maintained by [@hptruong](https://github.com/hptruong)*
