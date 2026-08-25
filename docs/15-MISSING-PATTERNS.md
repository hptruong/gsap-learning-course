# 🧩 Common Animation Patterns

> Collection of practical animation patterns used trong real-world projects. Mỗi pattern includes implementation chi tiết với code examples.

---

## Bảng Nội Dục

1. [3D Card Tilt Effect](#1-3d-card-tilt-effect)
2. [Number Counter Animation](#2-number-counter-animation)
3. [Carousel / Slider](#3-carousel--slider)
4. [Image Reveal Patterns](#4-image-reveal-patterns)
5. [Before/After Image Comparison](#5-beforeafter-image-comparison)
6. [Infinite Scroll](#6-infinite-scroll)
7. [Text Scramble Effect](#7-text-scramble-effect)
8. [3D Parallax Depth](#8-3d-parallax-depth)
9. [Cursor Interaction Patterns](#9-cursor-interaction-patterns)
10. [Advanced Page Transitions](#10-advanced-page-transitions)

---

## 1. 3D Card Tilt Effect

Mouse-driven rotation trên card với perspective.

```typescript
function create3DTilt(card: HTMLElement) {
  const bounds = card.getBoundingClientRect();

  card.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    const rotateX = gsap.utils.mapRange(0, bounds.height, 10, -10, mouseY);
    const rotateY = gsap.utils.mapRange(0, bounds.width, -10, 10, mouseX);

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  });
}

// Apply to all cards
document.querySelectorAll(".tilt-card").forEach(create3DTilt);
```

### With Glare Effect

```typescript
function create3DTiltWithGlare(card: HTMLElement) {
  const glare = document.createElement("div");
  glare.className = "glare";
  card.style.position = "relative";
  card.style.overflow = "hidden";
  card.appendChild(glare);

  const bounds = card.getBoundingClientRect();

  card.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    const rotateX = gsap.utils.mapRange(0, bounds.height, 15, -15, mouseY);
    const rotateY = gsap.utils.mapRange(0, bounds.width, -15, 15, mouseX);

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });

    // Glare follows mouse
    gsap.to(glare, {
      x: mouseX,
      y: mouseY,
      opacity: 0.15,
      duration: 0.3,
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
    gsap.to(glare, { opacity: 0, duration: 0.3 });
  });
}
```

```css
.glare {
  position: absolute;
  top: 0; left: 0;
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
}
```

---

## 2. Number Counter Animation

### Basic Counter

```typescript
function animateCounter(element: HTMLElement, target: number, duration = 2) {
  const counter = { value: 0 };

  gsap.to(counter, {
    value: target,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = Math.round(counter.value).toLocaleString();
    },
  });
}

// Usage
animateCounter(document.querySelector(".counter")!, 10000);
```

### Counter with Formatting

```typescript
function animateCounterFormatted(
  element: HTMLElement,
  target: number,
  options: {
    prefix?: string;
    suffix?: string;
    decimals?: number;
    duration?: number;
    separator?: string;
  } = {}
) {
  const { prefix = "", suffix = "", decimals = 0, duration = 2, separator = "," } = options;
  const counter = { value: 0 };

  gsap.to(counter, {
    value: target,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      const formatted = counter.value.toFixed(decimals);
      const withSeparator = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      element.textContent = `${prefix}${withSeparator}${suffix}`;
    },
  });
}

// Usage
animateCounterFormatted(document.querySelector(".price")!, 9999, {
  prefix: "$",
  decimals: 2,
});

animateCounterFormatted(document.querySelector(".users")!, 50000, {
  suffix: "+",
});
```

### Scroll-Triggered Counter

```typescript
function scrollCounter(element: HTMLElement, target: number, options = {}) {
  const counter = { value: 0 };

  gsap.to(counter, {
    value: target,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      end: "bottom 20%",
      scrub: 1,
    },
    onUpdate: () => {
      element.textContent = Math.round(counter.value).toLocaleString();
    },
  });
}

// Usage
scrollCounter(document.querySelector(".scroll-counter")!, 100);
```

---

## 3. Carousel / Slider

### Draggable Carousel

```typescript
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

function createCarousel(container: HTMLElement) {
  const track = container.querySelector(".carousel-track") as HTMLElement;
  const items = gsap.utils.toArray<HTMLElement>(".carousel-item");
  const prevBtn = container.querySelector(".prev-btn");
  const nextBtn = container.querySelector(".next-btn");
  const dots = container.querySelector(".dots");

  let currentIndex = 0;
  const itemWidth = items[0].offsetWidth;
  const totalItems = items.length;

  // Create dots
  items.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = `dot ${i === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => goToSlide(i));
    dots?.appendChild(dot);
  });

  function goToSlide(index: number) {
    currentIndex = gsap.utils.wrap(0, totalItems, index);

    gsap.to(track, {
      x: -currentIndex * itemWidth,
      duration: 0.5,
      ease: "power2.out",
    });

    // Update dots
    container.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  // Draggable
  Draggable.create(track, {
    type: "x",
    bounds: { minX: -(totalItems - 1) * itemWidth, maxX: 0 },
    inertia: true,
    onDragEnd: () => {
      const x = gsap.getProperty(track, "x") as number;
      const nearestIndex = Math.round(-x / itemWidth);
      goToSlide(nearestIndex);
    },
  });

  // Navigation buttons
  prevBtn?.addEventListener("click", () => goToSlide(currentIndex - 1));
  nextBtn?.addEventListener("click", () => goToSlide(currentIndex + 1));
}
```

### Autoplay Carousel

```typescript
function createAutoplayCarousel(container: HTMLElement) {
  const carousel = createCarousel(container);
  let autoplayTimer: ReturnType<typeof setInterval>;

  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 3000);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  // Pause on hover
  container.addEventListener("mouseenter", stopAutoplay);
  container.addEventListener("mouseleave", startAutoplay);

  // Pause on focus
  container.addEventListener("focusin", stopAutoplay);
  container.addEventListener("focusout", startAutoplay);

  startAutoplay();
}
```

---

## 4. Image Reveal Patterns

### 4.1 Horizontal Wipe

```typescript
function horizontalReveal(image: HTMLElement) {
  gsap.from(image, {
    clipPath: "inset(0 100% 0 0)",
    duration: 1,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: image,
      start: "top 80%",
    },
  });
}
```

### 4.2 Diagonal Reveal

```typescript
function diagonalReveal(image: HTMLElement) {
  gsap.from(image, {
    clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
    duration: 1.2,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: image,
      start: "top 80%",
    },
  });
}
```

### 4.3 Circle Expand (Iris)

```typescript
function circleReveal(image: HTMLElement) {
  gsap.from(image, {
    clipPath: "circle(0% at 50% 50%)",
    duration: 1.2,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: image,
      start: "top 80%",
    },
  });
}
```

### 4.4 Curtain Split

```typescript
function curtainReveal(image: HTMLElement) {
  const curtain = document.createElement("div");
  curtain.className = "curtain";
  image.parentElement?.insertBefore(curtain, image);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: image,
      start: "top 80%",
    },
  });

  tl.from(image, {
    clipPath: "inset(0 50% 0 50%)",
    duration: 1,
    ease: "power3.inOut",
  })
  .to(curtain, {
    scaleX: 0,
    duration: 0.8,
    ease: "power3.inOut",
  }, "<");
}
```

### 4.5 Zoom Reveal

```typescript
function zoomReveal(image: HTMLElement) {
  gsap.from(image, {
    scale: 1.5,
    clipPath: "inset(10% 10% 10% 10%)",
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: image,
      start: "top 80%",
    },
  });
}
```

---

## 5. Before/After Image Comparison

```typescript
function createBeforeAfter(container: HTMLElement) {
  const before = container.querySelector(".before") as HTMLElement;
  const after = container.querySelector(".after") as HTMLElement;
  const slider = container.querySelector(".slider") as HTMLElement;

  let isDragging = false;

  function updateSlider(x: number) {
    const bounds = container.getBoundingClientRect();
    const position = ((x - bounds.left) / bounds.width) * 100;
    const clamped = gsap.utils.clamp(0, 100, position);

    gsap.to(slider, { left: `${clamped}%`, duration: 0 });
    gsap.to(before, { clipPath: `inset(0 ${100 - clamped}% 0 0)`, duration: 0 });
  }

  slider.addEventListener("mousedown", () => { isDragging = true; });
  document.addEventListener("mouseup", () => { isDragging = false; });
  document.addEventListener("mousemove", (e) => {
    if (isDragging) updateSlider(e.clientX);
  });

  // Touch support
  slider.addEventListener("touchstart", () => { isDragging = true; });
  document.addEventListener("touchend", () => { isDragging = false; });
  document.addEventListener("touchmove", (e) => {
    if (isDragging) updateSlider(e.touches[0].clientX);
  });

  // Initial position
  updateSlider(container.getBoundingClientRect().left + container.getBoundingClientRect().width / 2);
}
```

```css
.before-after { position: relative; overflow: hidden; }
.before-after .before { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
.before-after .after { position: relative; width: 100%; height: auto; }
.before-after .slider {
  position: absolute; top: 0; left: 50%;
  width: 4px; height: 100%;
  background: white; cursor: ew-resize;
  transform: translateX(-50%);
}
```

---

## 6. Infinite Scroll

```typescript
function createInfiniteScroll(container: HTMLElement, loadMore: () => Promise<void>) {
  const sentinel = document.createElement("div");
  sentinel.className = "infinite-scroll-sentinel";
  container.appendChild(sentinel);

  const observer = new IntersectionObserver(
    async (entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        await loadMore();

        // Animate new items
        const newItems = container.querySelectorAll(".item:not(.animated)");
        gsap.from(newItems, {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => {
            newItems.forEach((item) => item.classList.add("animated"));
            observer.observe(sentinel); // Re-observe for next load
          },
        });
      }
    },
    { rootMargin: "200px" } // Load 200px before reaching bottom
  );

  observer.observe(sentinel);
}
```

---

## 7. Text Scramble Effect

```typescript
class TextScramble {
  chars = "!<>-_\\/[]{}—=+*^?#________";

  constructor(private el: HTMLElement) {}

  setText(newText: string) {
    const oldText = this.el.textContent || "";
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => {
      const queue: { char: string; idx: number }[] = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        queue.push({ char: from, idx: i });
      }

      let frame = 0;
      const update = () => {
        let output = "";
        let complete = 0;
        for (let i = 0; i < queue.length; i++) {
          const { char, idx } = queue[i];
          if (frame >= queue[i].idx) {
            complete++;
            output += newText[idx] || "";
          } else {
            output += this.chars[Math.floor(Math.random() * this.chars.length)];
          }
        }
        this.el.textContent = output;
        if (complete === queue.length) {
          resolve();
        } else {
          frame++;
          requestAnimationFrame(update);
        }
      };
      update();
    });
    return promise;
  }
}

// Usage
const scrambler = new TextScramble(document.querySelector(".scramble-text")!);
scrambler.setText("New Text Here");
```

---

## 8. 3D Parallax Depth

```typescript
function create3DParallax(container: HTMLElement) {
  const layers = gsap.utils.toArray<HTMLElement>(".parallax-layer");

  container.addEventListener("mousemove", (e) => {
    const bounds = container.getBoundingClientRect();
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;
    const mouseX = e.clientX - bounds.left - centerX;
    const mouseY = e.clientY - bounds.top - centerY;

    layers.forEach((layer, i) => {
      const depth = (i + 1) * 0.02;
      const moveX = mouseX * depth;
      const moveY = mouseY * depth;
      const moveZ = (i + 1) * 20;

      gsap.to(layer, {
        x: moveX,
        y: moveY,
        z: moveZ,
        rotateX: -mouseY * depth * 0.5,
        rotateY: mouseX * depth * 0.5,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power1.out",
      });
    });
  });

  container.addEventListener("mouseleave", () => {
    layers.forEach((layer) => {
      gsap.to(layer, {
        x: 0,
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      });
    });
  });
}
```

---

## 9. Cursor Interaction Patterns

### 9.1 Custom Cursor

```typescript
function createCustomCursor() {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  const cursorDot = document.createElement("div");
  cursorDot.className = "cursor-dot";
  document.body.appendChild(cursorDot);

  const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power2.out" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power2.out" });

  const dotXTo = gsap.quickTo(cursorDot, "x", { duration: 0.1, ease: "power2.out" });
  const dotYTo = gsap.quickTo(cursorDot, "y", { duration: 0.1, ease: "power2.out" });

  document.addEventListener("mousemove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
    dotXTo(e.clientX);
    dotYTo(e.clientY);
  });

  // Hover states
  document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(cursor, { scale: 1.5, backgroundColor: "rgba(99, 102, 241, 0.3)", duration: 0.3 });
      gsap.to(cursorDot, { scale: 0.5, duration: 0.3 });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(cursor, { scale: 1, backgroundColor: "rgba(99, 102, 241, 1)", duration: 0.3 });
      gsap.to(cursorDot, { scale: 1, duration: 0.3 });
    });
  });
}
```

```css
.custom-cursor {
  position: fixed; top: 0; left: 0;
  width: 40px; height: 40px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 1);
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
}
.cursor-dot {
  position: fixed; top: 0; left: 0;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: white;
  pointer-events: none;
  z-index: 10000;
  transform: translate(-50%, -50%);
}
```

### 9.2 Spotlight Cursor

```typescript
function createSpotlightCursor() {
  const spotlight = document.createElement("div");
  spotlight.className = "spotlight";
  document.body.appendChild(spotlight);

  const xTo = gsap.quickTo(spotlight, "x", { duration: 0.3 });
  const yTo = gsap.quickTo(spotlight, "y", { duration: 0.3 });

  document.addEventListener("mousemove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });
}
```

```css
.spotlight {
  position: fixed; top: 0; left: 0;
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
}
```

---

## 10. Advanced Page Transitions

### 10.1 Clip-Path Wipe

```typescript
function wipeTransition(outEl: HTMLElement, inEl: HTMLElement) {
  const tl = gsap.timeline();

  tl.set(inEl, { clipPath: "inset(0 100% 0 0)" })
    .to(outEl, {
      clipPath: "inset(0 0 0 100%)",
      duration: 0.6,
      ease: "power3.in",
    })
    .to(inEl, {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.6,
      ease: "power3.out",
    }, "-=0.3")
    .set(outEl, { display: "none" });
}
```

### 10.2 Circle Expand

```typescript
function circleTransition(outEl: HTMLElement, inEl: HTMLElement, origin = "50% 50%") {
  const tl = gsap.timeline();

  tl.set(inEl, { clipPath: "circle(0% at " + origin + ")" })
    .to(outEl, {
      clipPath: "circle(0% at " + origin + ")",
      duration: 0.6,
      ease: "power3.in",
    })
    .to(inEl, {
      clipPath: "circle(150% at " + origin + ")",
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.2")
    .set(outEl, { display: "none" });
}
```

### 10.3 React Router Integration

```typescript
import { useLocation, useNavigate } from "react-router-dom";

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Initial load
    tl.from(pageRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.out",
    });

    return () => tl.kill();
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="page-transition">
      {children}
    </div>
  );
}
```

---

## 🏋️ Bài Tập Thực Hành

### Bài 1: 3D Card Gallery

```
Tạo gallery với 3D tilt effect:
1. Grid of 6 cards
2. Each card tilts on mouse move
3. Glare effect follows cursor
4. Cards animate in with stagger
5. Works on mobile (touch tilt)
```

### Bài 2: Animated Counter Dashboard

```
Tạo dashboard với animated counters:
1. 4 stat cards
2. Each number counts up on scroll
3. Different formatting ($, %, +)
4. Scroll-linked progress bars
5. Responsive layout
```

### Bài 3: Image Gallery with Reveals

```
Tạo image gallery với reveal effects:
1. 6 images
2. Each uses different reveal pattern:
   - Horizontal wipe
   - Diagonal
   - Circle expand
   - Zoom
   - Curtain split
   - Random
3. All triggered on scroll
4. Lazy loading
```

### Bài 4: Custom Cursor System

```
Tạo custom cursor system:
1. Custom cursor with follow
2. Cursor morphs on hover (links, buttons, images)
3. Spotlight effect
4. Hidden on mobile
5. Performance optimized (quickTo)
```

---

*Bài tiếp theo: [GLOSSARY.md](./GLOSSARY.md) - Animation Terminology*
