# 05. ScrollTrigger - Animation Cuộn

## ScrollTrigger là gì?

**ScrollTrigger** là plugin mạnh nhất của GSAP, cho phép tie animations với scroll position. Tạo hiệu ứng **animate-on-scroll**, **parallax**, **scrub**, **pin** và nhiều hơn nữa.

---

## 1. Setup

```typescript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

---

## 2. ScrollTrigger Cơ Bản

```typescript
// Animation chạy khi element vào viewport
gsap.to(".box", {
  duration: 1,
  x: 200,
  scrollTrigger: {
    trigger: ".box",         // Element trigger
    start: "top 80%",        // Khi top của trigger chạm 80% viewport
    end: "top 20%",          // Kết thúc tại top 20% viewport
    markers: true,           // Debug markers (xóa trong production)
  },
});
```

---

## 3. Start & End Values

```typescript
// Cách viết start/end
start: "top 80%"      // Top của trigger tại 80% viewport
start: "top bottom"   // Top của trigger tại bottom viewport
start: "center center" // Center trigger tại center viewport
start: "top 200px"    // Top trigger tại 200px từ top viewport

// Relative values
start: "top+=100 80%" // Top trigger + 100px tại 80% viewport

// Complex
start: "top center-=100"  // Top trigger tại center - 100px
```

### Visual Start/End

```
start: "top 80%"                start: "top bottom"
┌─────────────────────┐         ┌─────────────────────┐
│      80% ───────────│─ ─ ─ ─ │top                  │
│                     │         │                     │
│   ┌─────────┐       │         │   ┌─────────┐       │
│   │ trigger │       │         │   │ trigger │       │
│   └─────────┘       │         │   └─────────┘       │
│                     │         │                     │
└─────────────────────┘         └─────────────────────┘
```

---

## 4. Scrub - Link Animation với Scroll

```typescript
// Scrub: animation progress = scroll progress
gsap.to(".box", {
  x: 500,
  rotation: 360,
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    end: "bottom center",
    scrub: true,      // Instant (scroll = animation)
    // scrub: 1,       // 1 second smoothing
    // scrub: 0.5,     // 0.5 second smoothing
  },
});
```

### Scrub Values

| Value | Behavior |
|-------|----------|
| `true` | Instant - scroll directly controls animation |
| `1` | 1 second smoothing (buttery smooth) |
| `0.5` | 0.5 second smoothing |
| `false` | No scrub (default - play on trigger) |

---

## 5. Pin - Giữ Element Cố Định

```typescript
// Pin element trong viewport khi scroll qua
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".section",
    start: "top top",
    end: "+=500",     // Pin trong 500px scroll
    pin: true,        // Giữ element cố định
    pinSpacing: true, // Thêm spacing để tránh overlap
  },
});
```

### Pin Options

```typescript
pin: true                    // Pin element trigger
pin: ".specific-element"     // Pin element khác
pinSpacing: true             // Thêm spacer (default: true)
pinSpacing: false            // Không thêm spacer
```

---

## 6. Toggle Actions

```typescript
scrollTrigger: {
  trigger: ".box",
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none reverse",
  //         onEnter  onLeave  onEnterBack  onLeaveBack
  //         ───────  ───────  ──────────  ──────────
  // play     none     none     reverse
}
```

### Toggle Actions Values

| Value | Behavior |
|-------|----------|
| `play` | Play animation |
| `pause` | Pause animation |
| `resume` | Resume from pause |
| `reverse` | Reverse animation |
| `restart` | Play from beginning |
| `reset` | Reset to beginning |
| `none` | Do nothing |

---

## 7. Toggle Class

```typescript
scrollTrigger: {
  trigger: ".box",
  start: "top 80%",
  toggleClass: { targets: ".box", className: "active" },
  // Thêm/bớt class khi scroll qua trigger
}
```

---

## 8. Callbacks

```typescript
scrollTrigger: {
  trigger: ".box",
  start: "top 80%",
  end: "bottom 20%",

  onEnter: () => console.log("Vào trigger"),
  onLeave: () => console.log("Rời trigger"),
  onEnterBack: () => console.log("Quay lại trigger"),
  onLeaveBack: () => console.log("Rời trigger (reverse)"),

  onUpdate: (self) => {
    // self.progress: 0 → 1
    // self.direction: 1 (down) or -1 (up)
    // self.getVelocity(): pixels/second
    console.log(`Progress: ${self.progress}`);
  },
}
```

---

## 9. Parallax Effect

```typescript
// Background parallax
gsap.to(".background", {
  y: -100,  // Di chuyển chậm hơn scroll
  scrollTrigger: {
    trigger: ".section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

// Content parallax (nhanh hơn scroll)
gsap.to(".content", {
  y: 50,
  scrollTrigger: {
    trigger: ".section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});
```

---

## 10. ScrollTrigger trong React

```typescript
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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
      <div className="parallax-bg absolute inset-0 bg-cover" />
      <div className="relative z-10">Content here</div>
    </div>
  );
}
```

---

## 11. ScrollTrigger Refresh

```typescript
// Refresh ScrollTrigger khi layout thay đổi
ScrollTrigger.refresh();

// Refresh sau image load
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

// Refresh sau dynamic content
useGSAP(() => {
  // ... animations
  ScrollTrigger.refresh();
}, { scope: containerRef });
```

---

## 12. ScrollTrigger Cleanup

```typescript
// useGSAP tự cleanup ScrollTrigger
// Nhưng nếu dùng useEffect manual:

useEffect(() => {
  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: ".box",
      start: "top 80%",
    });
  });

  return () => ctx.revert(); // Cleanup tất cả
}, []);
```

---

## Horizontal Scroll

Vertical scroll → horizontal movement trong pinned area.

```typescript
const sections = gsap.utils.toArray(".panel");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector(".container").offsetWidth,
  },
});
```

### Snap Points
```typescript
snap: 1 / (sections.length - 1) // Snap to each section
// Hoặc
snap: {
  snapTo: 1 / (sections.length - 1),
  duration: 0.5,
  ease: "power1.inOut",
}
```

---

## Scroll Velocity Skew

Elements skew dựa trên scroll speed. Tạo dynamic feel.

```typescript
ScrollTrigger.create({
  trigger: ".skew-element",
  start: "top bottom",
  end: "bottom top",
  onUpdate: (self) => {
    const velocity = self.getVelocity();
    const skew = velocity / 200;
    gsap.to(".skew-element", {
      skewX: gsap.utils.clamp(-15, 15, skew),
      duration: 0.5,
      ease: "power2.out",
    });
  },
  onLeave: () => gsap.to(".skew-element", { skewX: 0, duration: 0.5 }),
  onLeaveBack: () => gsap.to(".skew-element", { skewX: 0, duration: 0.5 }),
});
```

---

## Scroll Storytelling

Pinned section với narrative unfolds through scroll.

```typescript
const storyTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".story-section",
    start: "top top",
    end: "+=2000",
    scrub: true,
    pin: true,
  },
});

storyTL
  .from(".chapter-1", { opacity: 0, y: 100 })
  .to(".chapter-1", { opacity: 0, y: -100 })
  .from(".chapter-2", { opacity: 0, y: 100 })
  .to(".chapter-2", { opacity: 0, y: -100 })
  .from(".chapter-3", { opacity: 0, y: 100 });
```

---

## Batch Animations

Optimize cho nhiều elements cùng scroll trigger.

```typescript
ScrollTrigger.batch(".fade-in", {
  onEnter: (elements) => {
    gsap.from(elements, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
    });
  },
  start: "top 85%",
});
```

---

## Common ScrollTrigger Patterns

### Fade In On Scroll
```typescript
gsap.from(".fade-in", {
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".fade-in",
    start: "top 85%",
  },
});
```

### Progress Bar
```typescript
gsap.to(".progress-bar", {
  width: "100%",
  scrollTrigger: {
    trigger: ".content",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.3,
  },
});
```

### Sticky Navigation
```typescript
ScrollTrigger.create({
  trigger: ".nav",
  start: "top top",
  end: "+=100",
  pin: true,
  pinSpacing: false,
});
```

---

## 🏋️ Bài Tập Thực Hành

### Bài 1: Scroll Reveal

```typescript
// Tạo section với 5 cards
// Mỗi card fade in + slide lên khi scroll vào view
// Stagger 0.15s giữa mỗi card
```

### Bài 2: Parallax Hero

```typescript
// Tạo hero section với background parallax
// Title move chậm hơn scroll
// Subtitle move nhanh hơn scroll
// CTA button fade in khi scroll qua
```

### Bài 3: Scroll-Linked Animation

```typescript
// Tạo timeline với scrub: true
// 1. Image scale từ 1 lên 1.5
// 2. Text slide từ phải
// 3. Background color thay đổi
// Tất cả link với scroll position
```

---

*Bài tiếp theo: [06-TEXT.md](./06-TEXT.md) - Text Animations*
