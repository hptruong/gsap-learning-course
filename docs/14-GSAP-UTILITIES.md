# 🔧 GSAP Utilities & Helpers

> Beyond basic tweens — GSAP có hệ thống utilities mạnh mẽ giúp bạn handle complex animation logic một cách clean và efficient.

---

## Bảng Nội Dục

1. [gsap.quickTo() — High-Frequency Updates](#1-gsapquickto--high-frequency-updates)
2. [gsap.matchMedia() — Responsive Animations](#2-gsapmatchmedia--responsive-animations)
3. [gsap.registerEffect() — Reusable Effects](#3-gsapregistereffect--reusable-effects)
4. [gsap.utils.* — Utility Functions](#4-gsaputils--utility-functions)
5. [gsap.ticker — RAF Loop Control](#5-gsapticker--raf-loop-control)
6. [Keyframes Syntax](#6-keyframes-syntax)
7. [Essential Properties Deep Dive](#7-essential-properties-deep-dive)
8. [gsap.context() — Advanced Scoping](#8-gsapcontext--advanced-scoping)

---

## 1. gsap.quickTo() — High-Frequency Updates

**Khi nào dùng**: Mouse-follow, cursor, parallax — bất kỳ thứ gì cần update 60fps+.

**Tại sao không dùng `gsap.to()`?** `gsap.to()` tạo tween mới mỗi lần gọi — expensive cho高频 updates. `quickTo()` reuse同一个tween, chỉ thay đổi target value.

### Cursor Follow

```typescript
// ❌ Không nên: tạo tween mới mỗi mousemove
document.addEventListener("mousemove", (e) => {
  gsap.to(".cursor", {
    x: e.clientX,
    y: e.clientY,
    duration: 0.5,
    ease: "power2.out",
  });
});

// ✅ Nên: dùng quickTo
const xTo = gsap.quickTo(".cursor", "x", {
  duration: 0.5,
  ease: "power2.out",
});
const yTo = gsap.quickTo(".cursor", "y", {
  duration: 0.5,
  ease: "power2.out",
});

document.addEventListener("mousemove", (e) => {
  xTo(e.clientX);
  yTo(e.clientY);
});
```

### Parallax on Mouse Move

```typescript
const parallaxX = gsap.quickTo(".parallax-layer", "x", {
  duration: 0.8,
  ease: "power1.out",
});
const parallaxY = gsap.quickTo(".parallax-layer", "y", {
  duration: 0.8,
  ease: "power1.out",
});

document.addEventListener("mousemove", (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const moveX = (e.clientX - centerX) / centerX;
  const moveY = (e.clientY - centerY) / centerY;

  parallaxX(moveX * 50);
  parallaxY(moveY * 50);
});
```

### Different Speeds for Different Layers

```typescript
const quickConfigs = [
  { selector: ".layer-1", speed: 20 },
  { selector: ".layer-2", speed: 40 },
  { selector: ".layer-3", speed: 60 },
];

const quickTos = quickConfigs.map(({ selector, speed }) => ({
  xTo: gsap.quickTo(selector, "x", { duration: 0.8 }),
  yTo: gsap.quickTo(selector, "y", { duration: 0.8 }),
  speed,
}));

document.addEventListener("mousemove", (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const moveX = (e.clientX - centerX) / centerX;
  const moveY = (e.clientY - centerY) / centerY;

  quickTos.forEach(({ xTo, yTo, speed }) => {
    xTo(moveX * speed);
    yTo(moveY * speed);
  });
});
```

---

## 2. gsap.matchMedia() — Responsive Animations

**Khi nào dùng**: Thay đổi animations dựa trên viewport size hoặc `prefers-reduced-motion`.

### Basic Usage

```typescript
gsap.matchMedia().add({
  // Desktop only
  "(min-width: 768px)": () => {
    gsap.from(".hero-text", {
      y: 100,
      rotation: 10,
      duration: 1,
      ease: "power3.out",
    });
  },

  // Mobile only
  "(max-width: 767px)": () => {
    gsap.from(".hero-text", {
      y: 50,
      duration: 0.8,
      ease: "power3.out",
    });
  },
});
```

### Accessibility (prefers-reduced-motion)

```typescript
gsap.matchMedia().add({
  // Respect user preference
  "(prefers-reduced-motion: reduce)": () => {
    gsap.globalTimeline.timeScale(100); // Instant
  },

  // Normal motion
  "(prefers-reduced-motion: no-preference)": () => {
    gsap.globalTimeline.timeScale(1);
  },
});
```

### Responsive ScrollTrigger Configurations

```typescript
gsap.matchMedia().add({
  "(min-width: 1024px)": () => {
    // Desktop: horizontal scroll
    gsap.to(".gallery", {
      x: "-100%",
      scrollTrigger: {
        trigger: ".gallery-wrapper",
        pin: true,
        scrub: 1,
        end: "+=2000",
      },
    });
  },

  "(max-width: 1023px)": () => {
    // Mobile: vertical scroll (simpler)
    gsap.from(".gallery-item", {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".gallery",
        start: "top 80%",
      },
    });
  },
});
```

### Cleanup with React (useGSAP)

```typescript
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ResponsiveComponent() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.from(".card", {
        x: -100,
        stagger: 0.2,
        scrollTrigger: { trigger: ".cards", scrub: true },
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.from(".card", {
        y: 50,
        stagger: 0.15,
        scrollTrigger: { trigger: ".cards", start: "top 80%" },
      });
    });

    return () => mm.revert(); // Cleanup all matchMedia contexts
  });
}
```

---

## 3. gsap.registerEffect() — Reusable Effects

**Khi nào dùng**: Tạo reusable animation presets — dùng nhiều lần với different targets.

### Register a Fade-In Effect

```typescript
gsap.registerEffect({
  name: "fadeIn",
  effect: (targets: gsap.TweenTarget, config: { y?: number; stagger?: number }) => {
    return gsap.from(targets, {
      y: config.y ?? 50,
      opacity: 0,
      duration: 0.8,
      stagger: config.stagger ?? 0.1,
      ease: "power3.out",
    });
  },
  defaults: { y: 50, stagger: 0.1 },
  extendTimeline: true, // Can use in timeline
});

// Usage
gsap.effects.fadeIn(".element");
gsap.effects.fadeIn(".cards", { y: 100, stagger: 0.2 });

// In timeline
const tl = gsap.timeline();
tl.fadeIn(".text", { y: 30 })
  .fadeIn(".image", { y: 60 }, "-=0.3");
```

### Register a Scale-In Effect

```typescript
gsap.registerEffect({
  name: "scaleIn",
  effect: (targets: gsap.TweenTarget, config: { from?: number; duration?: number }) => {
    return gsap.from(targets, {
      scale: config.from ?? 0.5,
      opacity: 0,
      duration: config.duration ?? 0.6,
      ease: "back.out(1.7)",
    });
  },
  defaults: { from: 0.5, duration: 0.6 },
  extendTimeline: true,
});
```

### Register a Slide Effect

```typescript
gsap.registerEffect({
  name: "slideIn",
  effect: (targets: gsap.TweenTarget, config: { direction?: string; distance?: number }) => {
    const directions: Record<string, gsap.TweenVars> = {
      up: { y: config.distance ?? 50 },
      down: { y: -(config.distance ?? 50) },
      left: { x: config.distance ?? 50 },
      right: { x: -(config.distance ?? 50) },
    };

    return gsap.from(targets, {
      ...directions[config.direction ?? "up"],
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  },
  defaults: { direction: "up", distance: 50 },
  extendTimeline: true,
});

// Usage
gsap.effects.slideIn(".element", { direction: "left", distance: 100 });
```

---

## 4. gsap.utils.* — Utility Functions

### 4.1 gsap.utils.toArray()

Convert NodeList/HTMLCollection thành Array.

```typescript
// ❌ NodeList không có array methods
const items = document.querySelectorAll(".item");
// items.forEach(...) // ✅ exists in modern browsers
// items.map(...) // ❌ not available

// ✅ gsap.utils.toArray
const items = gsap.utils.toArray(".item");
items.map((item) => { /* ✅ */ });
items.filter((item) => { /* ✅ */ });

// Works with mixed selectors
const elements = gsap.utils.toArray([".heading", ".paragraph", ".image"]);
```

### 4.2 gsap.utils.normalize()

Map một value từ min-max range về 0-1 range.

```typescript
// Scroll position → 0-1
const scrollProgress = gsap.utils.normalize(
  0,              // min (start of scroll)
  1000,           // max (end of scroll)
  currentScroll   // current value
);

// Element position → 0-1
const viewportHeight = window.innerHeight;
const elementTop = element.getBoundingClientRect().top;
const progress = gsap.utils.normalize(0, viewportHeight, elementTop);
// 0 = top of viewport, 1 = bottom
```

### 4.3 gsap.utils.mapRange()

Map value từ một range sang range khác.

```typescript
// Scroll position → element position
const scrollY = 500;
const mappedX = gsap.utils.mapRange(
  0, 1000,     // input range (scroll)
  0, 500,      // output range (element x position)
  scrollY
);

// Mouse position → rotation
const mouseX = e.clientX;
const rotation = gsap.utils.mapRange(
  0, window.innerWidth,
  -15, 15,     // -15deg to 15deg
  mouseX
);
```

### 4.4 gsap.utils.wrap()

Wrap value trong range — dùng cho infinite loops.

```typescript
// Cycle through array index
const colors = ["#ff0000", "#00ff00", "#0000ff"];
const wrappedIndex = gsap.utils.wrap(0, colors.length);
// 0 → 0, 1 → 1, 2 → 2, 3 → 0, 4 → 1, ...

// Usage: cycle through slides
let currentIndex = 0;
function nextSlide() {
  currentIndex = gsap.utils.wrap(0, totalSlides, currentIndex);
  return currentIndex;
}

// Wrap position values
const xTo = gsap.utils.wrap(0, 100); // Wraps 0-100 range
```

### 4.5 gsap.utils.distribute()

Tạo distribution function cho stagger-like effects.

```typescript
// Distribute values across a range
const distribute = gsap.utils.distribute({
  base: 0,      // Start value
  amount: 100,  // Total spread
});

// Usage: cards fan out from center
gsap.to(".card", {
  y: (i) => distribute(i / (totalCards - 1)),
  rotation: (i) => gsap.utils.mapRange(0, totalCards - 1, -10, 10, i),
  stagger: 0.1,
});
```

### 4.6 gsap.utils.snap()

Snap value to nearest increment.

```typescript
// Snap to grid
const snappedX = gsap.utils.snap(50, 123); // → 100
const snappedY = gsap.utils.snap(50, 167); // → 150

// Usage: snap scroll position
const snapIncrement = window.innerWidth;
gsap.to(".container", {
  x: `-=${snapIncrement}`,
  snap: { x: snapIncrement },
});

// Snap with array
const snapToValues = gsap.utils.snap([0, 100, 200, 300]);
snapToValues(130); // → 100
snapToValues(170); // → 200
```

### 4.7 gsap.utils.interpolate()

Returns interpolation function between two values.

```typescript
// Create interpolator
const interp = gsap.utils.interpolate(0, 100);

// Use with progress (0-1)
interp(0);   // → 0
interp(0.5); // → 50
interp(1);   // → 100

// Works with complex values
const colorInterp = gsap.utils.interpolate("#ff0000", "#0000ff");
colorInterp(0);   // → "#ff0000"
colorInterp(0.5); // → "#880088" (purple)
colorInterp(1);   // → "#0000ff"

// Usage: scroll-linked color transition
ScrollTrigger.create({
  trigger: ".section",
  start: "top center",
  end: "bottom center",
  onUpdate: (self) => {
    const color = colorInterp(self.progress);
    gsap.to(".element", { backgroundColor: color, duration: 0 });
  },
});
```

### 4.8 gsap.utils.shuffle()

Shuffle array (Fisher-Yates algorithm).

```typescript
const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00"];
const shuffled = gsap.utils.shuffle(colors);

// Usage: random stagger order
gsap.from(".dot", {
  scale: 0,
  stagger: {
    each: 0.05,
    from: "random",
    // Or: shuffle array for custom random order
  },
});
```

### 4.9 gsap.utils.clamp()

Clamp value within min/max range.

```typescript
const clamped = gsap.utils.clamp(0, 100);
clamped(-10);  // → 0
clamped(50);   // → 50
clamped(150);  // → 100

// Usage: limit velocity skew
const skewAmount = velocity / 100;
const clampedSkew = gsap.utils.clamp(-15, 15, skewAmount);
```

---

## 5. gsap.ticker — RAF Loop Control

### Basic Usage

```typescript
// Add custom update function
const update = (time: number, deltaTime: number, frame: number) => {
  console.log(`Time: ${time}, Delta: ${deltaTime}ms, Frame: ${frame}`);
};
gsap.ticker.add(update);

// Remove when done
gsap.ticker.remove(update);
```

### Custom RAF Loop

```typescript
// Use GSAP ticker instead of raw requestAnimationFrame
// Benefit: GSAP handles lag smoothing, tab visibility, etc.

let customValue = 0;

gsap.ticker.add((time, delta) => {
  customValue += delta * 0.001;
  updateCustomAnimation(customValue);
});

// Lag smoothing (reduces stutter on tab switch)
gsap.ticker.lagSmoothing(0); // Disable lag smoothing
gsap.ticker.lagSmoothing(500, 33); // Default: 500ms threshold, 33ms max delta
```

### FPS Control

```typescript
// Limit to 30fps for performance
gsap.ticker.fps(30);

// Or use in matchMedia
gsap.matchMedia().add({
  "(min-width: 768px)": () => {
    gsap.ticker.fps(60); // Full fps on desktop
  },
  "(max-width: 767px)": () => {
    gsap.ticker.fps(30); // Reduced fps on mobile
  },
});
```

### Ticker vs requestAnimationFrame

| Feature | gsap.ticker | rAF |
|---------|-------------|-----|
| Lag Smoothing | ✅ Built-in | ❌ Manual |
| Tab Visibility | ✅ Auto-pause | ❌ Manual |
| Integration | ✅ Synced with GSAP | ⚠️ May desync |
| Performance | ✅ Optimized | ⚠️ Basic |
| Cleanup | ✅ Easy remove | ⚠️ Manual cancel |

**Recommendation**: Always use `gsap.ticker` instead of raw `requestAnimationFrame` when working with GSAP.

---

## 6. Keyframes Syntax

Keyframes cho phép multi-step animation trong 1 tween.

### Basic Keyframes

```typescript
// Thay vì tạo timeline với nhiều tweens:
// ❌
const tl = gsap.timeline();
tl.to(".box", { x: 100, duration: 0.3 })
  .to(".box", { y: 50, duration: 0.3 })
  .to(".box", { rotation: 360, duration: 0.5 });

// ✅ Dùng keyframes
gsap.to(".box", {
  keyframes: [
    { x: 100, duration: 0.3 },
    { y: 50, duration: 0.3 },
    { rotation: 360, duration: 0.5 },
  ],
  ease: "power1.inOut",
});
```

### Keyframes với Easing

```typescript
gsap.to(".box", {
  keyframes: [
    { x: 100, ease: "power2.out" },
    { y: 50, ease: "power2.in" },
    { rotation: 360, scale: 1.5, ease: "back.out(1.7)" },
    { scale: 1, ease: "power2.inOut" },
  ],
});
```

### Keyframes với Position Parameter

```typescript
gsap.to(".box", {
  keyframes: [
    { x: 100, duration: 0.3 },
    { y: 50, duration: 0.3, position: "-=0.1" }, // Overlap
    { rotation: 360, duration: 0.5, position: "<" }, // Same time
  ],
});
```

---

## 7. Essential Properties Deep Dive

### 7.1 autoAlpha

**autoAlpha** = `opacity` + `visibility`. Khi opacity = 0, element cũng được set `visibility: hidden`.

```typescript
// ✅ Dùng autoAlpha thay vì opacity
gsap.to(".element", {
  autoAlpha: 0,  // opacity: 0 + visibility: hidden
  duration: 0.5,
});

gsap.from(".element", {
  autoAlpha: 0,  // From opacity: 0 + visibility: hidden
  duration: 0.5,
});

// Why? visibility: hidden prevents click/interaction
// opacity: 0 still allows interaction
```

### 7.2 immediateRender

Control khi nào "from" state được apply.

```typescript
// immediateRender: true (default for gsap.from)
// → Element IMMEDIATELY goes to "from" state (opacity: 0)
gsap.from(".element", {
  opacity: 0,
  duration: 0.5,
  immediateRender: true, // Default
});

// immediateRender: false
// → Element stays at current state until animation starts
gsap.from(".element", {
  opacity: 0,
  duration: 0.5,
  delay: 1,
  immediateRender: false, // Don't hide until animation begins
});

// ⚠️ Common bug: element flashes visible then hides
// Cause: immediateRender + delay
// Fix: set immediateRender: false
```

### 7.3 overwrite

Control overlap behavior when new tweens target same property.

```typescript
// overwrite: false (default)
// → Old tween continues, new tween overrides on conflict
gsap.to(".box", { x: 100, duration: 2 });
gsap.to(".box", { x: 200, duration: 1 }); // Both run, x jumps

// overwrite: true
// → Kill ALL existing tweens on this element
gsap.to(".box", { x: 100, duration: 2 });
gsap.to(".box", { x: 200, duration: 1, overwrite: true }); // Old killed

// overwrite: "auto"
// → Kill only tweens that conflict on same properties
gsap.to(".box", { x: 100, y: 50, duration: 2 });
gsap.to(".box", { x: 200, duration: 1, overwrite: "auto" });
// Only x tween killed, y continues
```

### 7.4 clearProps

Remove inline styles after animation.

```typescript
// clearProps: "all" — removes ALL inline styles
gsap.from(".element", {
  y: 50,
  opacity: 0,
  duration: 0.5,
  clearProps: "all", // After animation: no inline styles
});

// clearProps specific properties
gsap.from(".element", {
  y: 50,
  scale: 0.5,
  rotation: 10,
  duration: 0.5,
  clearProps: "y,scale,rotation", // Only clear these
});

// Why? After gsap.from(), inline styles remain
// clearProps ensures clean state for CSS classes
```

### 7.5 modifiers

Custom value manipulation on every update.

```typescript
// Snap to grid
gsap.to(".box", {
  x: 500,
  y: 300,
  modifiers: {
    x: (x) => `${Math.round(parseFloat(x) / 50) * 50}px`, // Snap to 50px
    y: (y) => `${Math.round(parseFloat(y) / 50) * 50}px`,
  },
});

// Custom physics
gsap.to(".ball", {
  y: 500,
  modifiers: {
    y: (y) => {
      const val = parseFloat(y);
      return `${val + Math.sin(val * 0.01) * 20}px`; // Wave motion
    },
  },
});

// Format numbers
gsap.to(counter, {
  value: 1000,
  modifiers: {
    value: (v) => Math.round(parseFloat(v)).toLocaleString(),
  },
  onUpdate: () => {
    document.querySelector(".counter")!.textContent = counter.value;
  },
});
```

---

## 8. gsap.context() — Advanced Scoping

### Nested Contexts

```typescript
const parentContext = gsap.context(() => {
  gsap.from(".child-a", { opacity: 0 }); // Scoped to parentContext

  const childContext = gsap.context(() => {
    gsap.from(".child-b", { opacity: 0 }); // Scoped to BOTH contexts
  }, ".child-container");

  return () => childContext.revert(); // Only reverts child-b
});

// Later: parentContext.revert() reverts child-a AND child-b
```

### Context with Selector Scope

```typescript
gsap.context(() => {
  // Only .sidebar animations
  gsap.from(".sidebar-item", {
    x: -50,
    stagger: 0.1,
  });
}, ".sidebar"); // Scope: only .sidebar descendants

gsap.context(() => {
  // Only .main-content animations
  gsap.from(".content-block", {
    y: 30,
    stagger: 0.15,
  });
}, ".main-content"); // Scope: only .main-content descendants
```

---

## 🏋️ Bài Tập Thực Hành

### Bài 1: Cursor Follow System

```typescript
// Tạo custom cursor follow system
// Requirements:
// 1. Cursor follows mouse với quickTo
// 2. Cursor morphs khi hover different elements
// 3. Cursor scale up/down on different states
// 4. Works on mobile (touch-based, no cursor)
```

### Bài 2: Responsive Animation System

```typescript
// Tạo responsive animation system
// Requirements:
// 1. Desktop: 3-column horizontal scroll gallery
// 2. Mobile: vertical stacked cards
// 3. Tablet: 2-column grid
// 4. All transitions smooth khi resize
// 5. Respect prefers-reduced-motion
```

### Bài 3: Reusable Effect Library

```typescript
// Tạo library của gsap.registerEffect()
// Requirements:
// 1. fadeIn effect
// 2. slideIn effect (directional)
// 3. scaleIn effect
// 4. rotateIn effect
// 5. Stagger support cho tất cả
// 6. Default + custom configs
// 7. Can use trong timeline
```

### Bài 4: Scroll-Linked Value Mapper

```typescript
// Tạo scroll-linked animations với gsap.utils
// Requirements:
// 1. Scroll position → element rotation (mapRange)
// 2. Mouse position → parallax offset (quickTo + mapRange)
// 3. Scroll progress → color transition (interpolate)
// 4. All values clamped appropriately (clamp)
```

---

*Bài tiếp theo: [15-MISSING-PATTERNS.md](./15-MISSING-PATTERNS.md) - Common Patterns*
