# 00. Giới Thiệu GSAP & Cài Đặt

## GSAP là gì?

**GSAP (GreenSock Animation Platform)** là JavaScript animation library mạnh nhất và phổ biến nhất hiện tại. Được dùng bởi các brands lớn và award-winning websites trên toàn thế giới.

### Tại sao chọn GSAP?

| So sánh | GSAP | CSS Animation | Framer Motion |
|---------|------|---------------|---------------|
| Control | Full (play, pause, reverse, seek) | Limited | Moderate |
| Browser Support | All (IE11+) | Modern only | Modern only |
| Performance | 60fps GPU-accelerated | Varies | 60fps |
| Learning Curve | Medium | Low | Low |
| Framework | Framework-agnostic | CSS only | React only |
| Plugins | 20+ plugins | None | None |

### GSAP có thể animate được gì?

- **CSS Properties**: position, rotation, scale, opacity, colors...
- **SVG**: paths, transforms, morphing, drawing
- **Canvas & WebGL**: via third-party integrations
- **React/Vue/Angular**: framework-agnostic
- **JS Objects**: any numeric value
- **Text**: character-by-character animations
- **Scroll**: scroll-based animations

---

## Cài Đặt

### Cách 1: npm (Recommended cho React/TypeScript)

```bash
npm install gsap @gsap/react
```

```typescript
// register tất cả plugins
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
```

### Cách 2: CDN (Cho vanilla HTML)

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollTrigger.min.js"></script>
```

### Cách 3: Vite + React + TypeScript (Dự án này)

```bash
# Clone project
git clone <repo-url>
cd gsap-learning-course

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

---

## Cấu Trúc Project

```
gsap-learning-course/
├── src/
│   ├── App.tsx           # Component chính
│   ├── main.tsx          # Entry point
│   ├── index.css         # Global styles (Tailwind)
│   └── lib/              # Utility modules
├── docs/                 # Tài liệu học tập
├── public/               # Static assets
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Kiểm Tra GSAP Hoạt Động

```typescript
// src/App.tsx
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Nếu thấy div chuyển động = GSAP hoạt động!
    gsap.to(".box", { x: 200, rotation: 360, duration: 2 });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <div className="box w-20 h-20 bg-blue-500" />
    </div>
  );
}
```

---

## Thuật Ngữ Quan Trọng

| Thuật ngữ | Nghĩa |
|-----------|-------|
| **Tween** | Một animation đơn lẻ (gsap.to, gsap.from) |
| **Timeline** | Container quản lý nhiều tweens |
| **Easing** | Hàm kiểm soát gia tốc/chuyển động |
| **Stagger** | Delay giữa các elements khi animate nhóm |
| **Plugin** | Module mở rộng (ScrollTrigger, SplitText...) |
| **Target** | Element được animate |
| **Scrub** | Link animation progress với scroll position |
| **Pin** | Giữ element cố định khi scroll |
| **Context** | GSAP context để manage cleanup trong React |

---

*Bài tiếp theo: [01-CO-BAN.md](./01-CO-BAN.md) - Các phương thức cơ bản*
