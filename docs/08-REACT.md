# 08. React + GSAP Integration

## Tổng Quan

GSAP hoàn toàn **framework-agnostic**, nhưng `useGSAP()` hook giải quyết các friction points cụ thể của React.

### Tại sao dùng GSAP trong React thay vì Framer Motion?

| Tiêu chí | GSAP | Framer Motion |
|----------|------|---------------|
| Control | Full (play, pause, reverse, seek) | Limited |
| Plugins | 20+ plugins | Không có |
| Scroll | ScrollTrigger (mạnh nhất) | Basic scroll |
| SVG | DrawSVG, MorphSVG, MotionPath | Basic |
| Text | SplitText, ScrambleText | None |
| Framework | Bất cứ đâu | React only |
| Performance | 60fps GPU | 60fps GPU |

---

## 1. Setup

```bash
npm install gsap @gsap/react
```

```typescript
// app.tsx hoặc main.tsx
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
```

---

## 2. useGSAP() Hook Cơ Bản

```typescript
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function MyComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Tất cả GSAP animations trong đây tự cleanup
    gsap.to(".box", { x: 200, rotation: 360 });
  }, { scope: containerRef }); // Scope cho selector text

  return (
    <div ref={containerRef}>
      <div className="box">Animate me</div>
    </div>
  );
}
```

---

## 3. GSAP Context & Cleanup

### Tại sao cleanup quan trọng trong React?

```typescript
// ❌ SAI: Không cleanup → memory leak + duplicate animations
useEffect(() => {
  gsap.to(".box", { x: 200 });
}, []);

// ✅ ĐÚNG: useGSAP tự cleanup
useGSAP(() => {
  gsap.to(".box", { x: 200 });
});
```

### React Strict Mode

```typescript
// React 18 Strict Mode gọi Effects 2 lần
// useGSAP tự handle bằng gsap.context().revert()

// useGSAP internally:
const ctx = gsap.context(() => {
  gsap.to(...);
}, scope);

return () => ctx.revert(); // Auto cleanup
```

---

## 4. Scoped Selectors

```typescript
// Scope selector text vào container
const containerRef = useRef<HTMLDivElement>(null);

useGSAP(() => {
  // ".box" chỉ tìm trong containerRef, không phải toàn document
  gsap.to(".box", { x: 200 });
}, { scope: containerRef });

return (
  <div ref={containerRef}>
    <div className="box">Scoped</div>      {/* ✅ Animate */}
    <div className="box">Also scoped</div> {/* ✅ Animate */}
  </div>
);
// <div className="box">Not scoped</div>  {/* ❌ Không animate */}
```

---

## 5. Dependencies

```typescript
// Tái tạo animation khi dependency thay đổi
const [endX, setEndX] = useState(200);

useGSAP(() => {
  gsap.to(".box", { x: endX, duration: 1 });
}, [endX]); // Tái tạo khi endX thay đổi

// Hoặc dùng config object
useGSAP(() => {
  gsap.to(".box", { x: endX, duration: 1 });
}, { dependencies: [endX] });
```

---

## 6. ContextSafe Callbacks

### Vấn đề

```typescript
const containerRef = useRef<HTMLDivElement>(null);

useGSAP(() => {
  gsap.to(".box", { x: 100 }); // ✅ Context-safe
}, { scope: containerRef });

// ❌ KHÔNG context-safe: tạo animation sau khi useGSAP chạy
const handleClick = () => {
  gsap.to(".box", { rotation: 180 }); // Không được cleanup!
};

return <button onClick={handleClick}>Click</button>;
```

### Giải pháp: contextSafe()

```typescript
const containerRef = useRef<HTMLDivElement>(null);

// Cách 1: Dùng return value
const { contextSafe } = useGSAP({ scope: containerRef });

const handleClick = contextSafe(() => {
  // ✅ Context-safe: tự cleanup
  gsap.to(".box", { rotation: 180 });
});

// Cách 2: Dùng 2nd argument
useGSAP((context, contextSafe) => {
  const handleClick = contextSafe(() => {
    gsap.to(".box", { rotation: 180 });
  });

  containerRef.current?.addEventListener("click", handleClick);

  return () => {
    containerRef.current?.removeEventListener("click", handleClick);
  };
}, { scope: containerRef });
```

---

## 7. useRef cho Animation Elements

```typescript
function AnimatedComponent() {
  const boxRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Dùng ref thay vì selector (an toàn hơn)
    gsap.to(boxRef.current, {
      x: 200,
      duration: 1,
    });

    gsap.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <h1 ref={titleRef}>Title</h1>
      <div ref={boxRef}>Box</div>
    </div>
  );
}
```

---

## 8. Timeline trong React

```typescript
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline>();

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    tl.from(".hero-title", { y: 50, opacity: 0, duration: 1 })
      .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
      .from(".hero-cta", { scale: 0.8, opacity: 0, duration: 0.6 }, "-=0.3");

    tlRef.current = tl;
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <h1 className="hero-title">Hello</h1>
      <p className="hero-subtitle">Subtitle</p>
      <button
        className="hero-cta"
        onClick={() => tlRef.current?.play()}
      >
        Play
      </button>
    </div>
  );
}
```

---

## 9. ScrollTrigger trong React

```typescript
function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(".parallax-bg", {
      y: -100,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative h-screen">
      <div className="parallax-bg absolute inset-0" />
      <div className="relative z-10">Content</div>
    </div>
  );
}
```

---

## 10. SSR & Next.js

```typescript
// "use client" cho App Router
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// useGSAP tự handle SSR:
// - Dùng useLayoutEffect ở client
// - Fallback useEffect ở server

export default function ClientComponent() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(".box", { x: 200 });
  }, { scope: ref });

  return <div ref={ref}><div className="box" /></div>;
}
```

---

## 11. Reusable Animation Hook

```typescript
// hooks/useFadeIn.ts
import { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface UseFadeInOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
}

export function useFadeIn(
  containerRef: RefObject<HTMLElement>,
  options: UseFadeInOptions = {}
) {
  const { y = 50, duration = 1, delay = 0, stagger = 0.1 } = options;

  useGSAP(() => {
    gsap.from(".fade-in", {
      y,
      opacity: 0,
      duration,
      delay,
      stagger,
    });
  }, { scope: containerRef });
}

// Dùng
function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  useFadeIn(ref, { y: 30, duration: 0.8 });
  return <div ref={ref}><div className="fade-in">Content</div></div>;
}
```

---

## 🏋️ Bài Tập Thực Hành

### Bài 1: Animated Card Component

```typescript
// Tạo Card component với hover animation
// Dùng useGSAP + contextSafe cho click
// Proper cleanup khi unmount
```

### Bài 2: Page Transitions

```typescript
// Tạo page transition với timeline
// Animation khi mount/unmount
// Dùng useEffect + useGSAP
```

### Bài 3: Scroll-Triggered Sections

```typescript
// Tạo landing page với 5 sections
// Mỗi section có scroll-triggered animation
// Dùng useGSAP + ScrollTrigger
```

---

*Bài tiếp theo: [09-NANG-CAO.md](./09-NANG-CAO.md) - Advanced Topics*
