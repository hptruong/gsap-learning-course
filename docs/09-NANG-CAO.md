# 09. Chủ Đề Nâng Cao

## 1. Performance Optimization

### GPU-Accelerated Properties

```typescript
// ✅ TỐT: GPU-accelerated (transform)
gsap.to(".box", {
  x: 100,        // translateX
  y: 50,         // translateY
  rotation: 45,  // rotate
  scale: 1.5,    // scale
  skewX: 15,     // skew
});

// ❌ TRÁNH: Trigger layout thrashing
gsap.to(".box", {
  left: 100,     // Layout trigger
  top: 50,       // Layout trigger
  width: 200,    // Layout trigger
  height: 200,   // Layout trigger
  padding: 20,   // Layout trigger
});
```

### will-change

```typescript
// GSAP tự thêm will-change, nhưng có thể override
gsap.to(".box", {
  x: 100,
  willChange: "transform",
});
```

### Batch Animations

```typescript
// Thay vì animate từng element riêng lẻ
// Dùng batch để optimize
ScrollTrigger.batch(".fade-in", {
  onEnter: (elements) => {
    gsap.from(elements, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
    });
  },
});
```

---

## 2. Accessibility

### prefers-reduced-motion

```typescript
// Tạo media query cho reduced motion
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  // Không animate, hoặc dùng duration非常短
  gsap.to(".box", { x: 100, duration: 0.01 });
} else {
  gsap.to(".box", { x: 100, duration: 1 });
}

// Hoặc dùng matchMedia của GSAP
gsap.matchMedia().add("(prefers-reduced-motion: reduce)", () => {
  gsap.to(".box", { x: 100, duration: 0.01 });
});

gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
  gsap.to(".box", { x: 100, duration: 1 });
});
```

### ARIA Labels

```typescript
// Đảm bảo animations không ảnh hưởng accessibility
// Thêm aria-label cho animated elements
<div
  className="animated-heading"
  role="heading"
  aria-level={1}
>
  Hello
</div>
```

---

## 3. Flip Animation

```typescript
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);

// Animate layout changes
function toggleLayout() {
  const state = Flip.getState(".item"); // Capture current state

  // Thay đổi layout
  setIsGrid(!isGrid);

  // Animate từ state cũ sang state mới
  Flip.from(state, {
    duration: 0.6,
    ease: "power2.inOut",
    absolute: true,
    onComplete: () => console.log("Done!"),
  });
}
```

---

## 4. Draggable

```typescript
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

// Make element draggable
Draggable.create(".box", {
  type: "x,y",
  bounds: ".container",
  inertia: true,     // Requires InertiaPlugin
  onDrag: () => console.log("Dragging"),
  onDragEnd: () => console.log("Dropped"),
});
```

---

## 5. Observer

```typescript
import { Observer } from "gsap/Observer";
gsap.registerPlugin(Observer);

// Normalize event detection
Observer.create({
  target: window,
  type: "wheel,touch",
  onUp: () => console.log("Scroll up"),
  onDown: () => console.log("Scroll down"),
  tolerance: 10,
  preventDefault: true,
});
```

---

## 6. GSAP Context Advanced

```typescript
// Tạo named contexts
const ctx = gsap.context(() => {
  gsap.to(".a", { x: 100 });
  gsap.to(".b", { y: 100 });
}, containerRef);

// Revert specific animations
ctx.revert(); // Revert tất cả

// Add named callbacks
const ctx2 = gsap.context((self) => {
  self.add("onClick", () => {
    gsap.to(".box", { rotation: 180 });
  });
}, containerRef);

// ctx2.onClick() để gọi callback
```

---

## 7. Custom Easing

```typescript
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

// Tạo custom ease curve
CustomEase.create("myEase", "M0,0 C0.2,1 0.8,1 1,1");

// Dùng
gsap.to(".box", { x: 200, ease: "myEase" });

// SVG path easing
CustomEase.create("complexEase", "M0,0 C0.1,0.9 0.9,0.1 1,1");
```

---

## 8. GSDevTools

```typescript
import { GSDevTools } from "gsap/GSDevTools";
gsap.registerPlugin(GSDevTools);

// Tạo dev tools panel
const tl = gsap.timeline();
GSDevTools.create(tl);

// Visual debugger cho timeline
// Cho phép scrub, play, pause, restart
```

---

## 9. Combining Multiple Plugins

```typescript
// ScrollTrigger + SplitText
const split = new SplitText(".scroll-text", { type: "chars" });

gsap.from(split.chars, {
  opacity: 0.2,
  stagger: 0.05,
  scrollTrigger: {
    trigger: ".scroll-text",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
});

// ScrollTrigger + DrawSVG
gsap.from(".draw-path", {
  drawSVG: "0%",
  scrollTrigger: {
    trigger: ".svg-container",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
});

// Flip + ScrollTrigger
ScrollTrigger.create({
  trigger: ".layout-container",
  start: "top center",
  onEnter: () => toggleLayout(),
});
```

---

## 10. Common Patterns

### Stagger from Center

```typescript
gsap.from(".card", {
  scale: 0,
  opacity: 0,
  stagger: {
    amount: 0.8,
    grid: [2, 3],
    from: "center",
  },
  ease: "back.out(1.7)",
});
```

### Parallax Layers

```typescript
gsap.to(".layer-1", { y: -50, scrollTrigger: { scrub: true } });
gsap.to(".layer-2", { y: -100, scrollTrigger: { scrub: true } });
gsap.to(".layer-3", { y: -150, scrollTrigger: { scrub: true } });
```

### Magnetic Button

```typescript
const btn = document.querySelector(".magnetic-btn");

btn?.addEventListener("mousemove", (e) => {
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  gsap.to(btn, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3,
    ease: "power2.out",
  });
});

btn?.addEventListener("mouseleave", () => {
  gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
});
```

---

## 11. Smooth Scroll (Lenis + GSAP)

Lenis là smooth scroll library tốt nhất hiện tại, integrate hoàn hảo với ScrollTrigger.

```bash
npm install lenis
```

```typescript
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  smoothWheel: true,
});

// Update ScrollTrigger on scroll
lenis.on("scroll", ScrollTrigger.update);

// Sync GSAP ticker với Lenis
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// React component
function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}
```

---

## 12. Preloader Patterns

### Counter Preloader

```typescript
const counter = { value: 0 };

gsap.to(counter, {
  value: 100,
  duration: 2,
  ease: "power2.inOut",
  onUpdate: () => {
    document.querySelector(".counter")!.textContent =
      Math.round(counter.value) + "%";
  },
  onComplete: () => {
    gsap.to(".preloader", {
      y: "-100%",
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => initMainAnimations(),
    });
  },
});
```

### Staggered Blinds

```typescript
const blinds = gsap.utils.toArray(".blind");

gsap.to(blinds, {
  y: "-100%",
  stagger: 0.05,
  duration: 0.6,
  ease: "power3.inOut",
  onComplete: () => document.querySelector(".preloader")?.remove(),
});
```

### Curtain Reveal

```typescript
const curtainTL = gsap.timeline();

curtainTL
  .to(".curtain-left", { x: "-100%", duration: 1, ease: "power3.inIn" })
  .to(".curtain-right", { x: "100%", duration: 1, ease: "power3.inOut" }, "<")
  .to(".preloader", { opacity: 0, duration: 0.3 }, "-=0.3");
```

---

## 13. Infinite Marquee

```typescript
// Duplicate content cho seamless loop
const track = document.querySelector(".marquee-track")!;
track.innerHTML += track.innerHTML;

gsap.to(track, {
  x: "-50%",
  duration: 20,
  repeat: -1,
  ease: "none",
});
```

```css
.marquee { overflow: hidden; white-space: nowrap; }
.marquee-track { display: inline-flex; gap: 2rem; }
```

---

## 14. Page Transitions

```typescript
// Fade transition giữa pages
function pageTransition(outEl: HTMLElement, inEl: HTMLElement) {
  const tl = gsap.timeline();

  tl.to(outEl, {
    opacity: 0,
    y: -50,
    duration: 0.4,
    ease: "power2.in",
    onComplete: () => outEl.remove(),
  })
    .fromTo(inEl,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
}
```

---

*Bài tiếp theo: [10-PROJECTS.md](./10-PROJECTS.md) - Practice Projects*
