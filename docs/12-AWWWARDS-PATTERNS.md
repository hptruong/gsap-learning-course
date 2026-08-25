# 12. Awwwards-Level Animation Patterns

> Các animation patterns thường thấy trên Awwwards-winning websites. Reference từ GSAP Vault, GSAPify, và real-world projects.

---

## 1. Text Patterns

### Character Reveal on Scroll

Text xuất hiện từng character khi scroll. Phổ biến nhất trên Awwwards.

```typescript
import { SplitText } from "gsap/SplitText";

const split = new SplitText(".headline", { type: "chars" });

gsap.from(split.chars, {
  y: 50,
  opacity: 0,
  stagger: 0.03,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".headline",
    start: "top 80%",
  },
});
```

### Line Mask Reveal

Text được reveal bởi animated mask. Tạo cảm giác "wipe" từ trái sang phải.

```css
.line-mask {
  clip-path: inset(0 100% 0 0); /* Ẩn hoàn toàn */
}
```

```typescript
gsap.to(".line-mask", {
  clipPath: "inset(0 0% 0 0)",
  duration: 1,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".line-mask",
    start: "top 80%",
  },
});
```

### Kinetic Typography

Text bounce, wiggle, rotate một cách năng động. Tạo cảm giác playfulness.

```typescript
// SplitText + CustomWiggle
const split = new SplitText(".kinetic-text", { type: "chars" });

gsap.from(split.chars, {
  y: 100,
  rotation: 90,
  stagger: {
    each: 0.03,
    from: "random",
  },
  ease: "back.out(1.7)",
});
```

### Glitch Text

Digital distortion effect. Phù hợp cho tech/cyberpunk themes.

```css
.glitch {
  position: relative;
}
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.glitch::before {
  clip-path: inset(0 0 60% 0);
  animation: glitch-top 1s infinite;
}
.glitch::after {
  clip-path: inset(60% 0 0 0);
  animation: glitch-bottom 1.5s infinite;
}
```

### Scramble/Decode Text

Random characters resolve into final text. Techy, modern feel.

```typescript
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.to(".scramble-text", {
  duration: 2,
  text: {
    value: "HELLO WORLD",
    type: "chars",
    chars: "!@#$%^&*()_+",
  },
  ease: "none",
});
```

---

## 2. Scroll Patterns

### Horizontal Scroll Section

Vertical scroll → horizontal movement trong pinned area. Rất phổ biến trên portfolio/timeline sites.

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

### Parallax Layers (Multi-speed)

3+ layers move at different speeds. Tạo depth và cinematic feel.

```typescript
// Background - slowest
gsap.to(".bg-layer", {
  y: -50,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

// Midground - medium
gsap.to(".mid-layer", {
  y: -100,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

// Foreground - fastest
gsap.to(".fg-layer", {
  y: -150,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});
```

### Scroll Velocity Skew

Elements skew dựa trên scroll speed/direction. Tạo dynamic, responsive feel.

```typescript
ScrollTrigger.create({
  trigger: ".skew-element",
  start: "top bottom",
  end: "bottom top",
  onUpdate: (self) => {
    const velocity = self.getVelocity();
    const skew = velocity / 200; // Tune value
    gsap.to(".skew-element", {
      skewX: gsap.utils.clamp(-15, 15, skew),
      duration: 0.5,
      ease: "power2.out",
    });
  },
  onLeave: () => {
    gsap.to(".skew-element", { skewX: 0, duration: 0.5 });
  },
  onLeaveBack: () => {
    gsap.to(".skew-element", { skewX: 0, duration: 0.5 });
  },
});
```

### Stacked Cards

Cards stack on top, peel away on scroll. Perfect cho features/steps sections.

```typescript
const cards = gsap.utils.toArray(".stacked-card");

cards.forEach((card, i) => {
  gsap.to(card, {
    y: `-${i * 10}%`,
    ease: "none",
    scrollTrigger: {
      trigger: card,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
});
```

### Scroll Storytelling

Narrative unfolds through scroll. Complex but highly engaging.

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

## 3. Interactive Patterns

### Magnetic Button

Button follows cursor khi hover gần. Premium feel.

```typescript
const btn = document.querySelector(".magnetic-btn");
const btnText = document.querySelector(".magnetic-btn-text");

btn.addEventListener("mousemove", (e) => {
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  gsap.to(btn, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3,
    ease: "power2.out",
  });

  gsap.to(btnText, {
    x: x * 0.15,
    y: y * 0.15,
    duration: 0.3,
    ease: "power2.out",
  });
});

btn.addEventListener("mouseleave", () => {
  gsap.to(btn, {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.3)",
  });

  gsap.to(btnText, {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.3)",
  });
});
```

### Custom Cursor

Cursor transform và react to elements.

```typescript
const cursor = document.querySelector(".custom-cursor");
const cursorFollower = document.querySelector(".cursor-follower");

// Follow mouse
document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
  });

  gsap.to(cursorFollower, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.3,
  });
});

// Hover effects
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    gsap.to(cursor, { scale: 2, backgroundColor: "#ff0000" });
  });

  el.addEventListener("mouseleave", () => {
    gsap.to(cursor, { scale: 1, backgroundColor: "#ffffff" });
  });
});
```

### Underline Slide

Link underline animates từ cursor entry direction.

```typescript
document.querySelectorAll(".link").forEach((link) => {
  link.addEventListener("mouseenter", (e) => {
    const rect = link.getBoundingClientRect();
    const fromLeft = e.clientX < rect.left + rect.width / 2;

    gsap.fromTo(link.querySelector(".underline"), {
      scaleX: 0,
      transformOrigin: fromLeft ? "left" : "right",
    }, {
      scaleX: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});
```

---

## 4. Visual Patterns

### Clip-Path Image Reveal

Image revealed through animated polygon clip-path.

```typescript
gsap.from(".clip-reveal", {
  clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
  duration: 1.2,
  ease: "power4.inOut",
  scrollTrigger: {
    trigger: ".clip-reveal",
    start: "top 80%",
  },
});
```

### SVG Mask Reveal

Video/image revealed through SVG mask.

```css
.svg-mask {
  mask: url(#mask-shape);
  -webkit-mask: url(#mask-shape);
}
```

```typescript
// Animate SVG mask path
gsap.from("#mask-circle", {
  attr: { r: 0 },
  duration: 1.5,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".masked-content",
    start: "top 80%",
  },
});
```

### Ken Burns

Slow cinematic pan + zoom. Perfect cho hero images.

```typescript
gsap.to(".ken-burns-image", {
  scale: 1.2,
  x: "5%",
  y: "3%",
  duration: 10,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});
```

### Image Trail

Images follow cursor với decay. Unique, memorable effect.

```typescript
const images = [];
const mousePos = { x: 0, y: 0 };

document.addEventListener("mousemove", (e) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;

  // Create new image at cursor position
  const img = document.createElement("img");
  img.src = `/trail-${Math.floor(Math.random() * 5) + 1}.png`;
  img.className = "trail-image";
  img.style.left = mousePos.x + "px";
  img.style.top = mousePos.y + "px";
  document.body.appendChild(img);

  images.push(img);

  // Animate in then fade out
  gsap.fromTo(img, {
    scale: 0.5,
    opacity: 1,
  }, {
    scale: 1.5,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    onComplete: () => {
      img.remove();
      images.shift();
    },
  });

  // Keep max 10 images
  if (images.length > 10) {
    images[0].remove();
    images.shift();
  }
});
```

---

## 5. Loading Patterns

### Preloader with Counter

Percentage counts 0→100, then content reveals.

```typescript
const counter = { value: 0 };

gsap.to(counter, {
  value: 100,
  duration: 2,
  ease: "power2.inOut",
  onUpdate: () => {
    document.querySelector(".counter").textContent =
      Math.round(counter.value) + "%";
  },
  onComplete: () => {
    gsap.to(".preloader", {
      y: "-100%",
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        initMainAnimations();
      },
    });
  },
});
```

### Staggered Blinds

Vertical slats slide away sequentially.

```typescript
const blinds = gsap.utils.toArray(".blind");

gsap.to(blinds, {
  y: "-100%",
  stagger: 0.05,
  duration: 0.6,
  ease: "power3.inOut",
  onComplete: () => {
    document.querySelector(".preloader").remove();
  },
});
```

### Curtain Reveal

Two panels slide apart like theatre curtains.

```typescript
const curtainTL = gsap.timeline();

curtainTL
  .to(".curtain-left", {
    x: "-100%",
    duration: 1,
    ease: "power3.inOut",
  })
  .to(".curtain-right", {
    x: "100%",
    duration: 1,
    ease: "power3.inOut",
  }, "<")
  .to(".preloader", {
    opacity: 0,
    duration: 0.3,
  }, "-=0.3");
```

---

## 6. Infinite Marquee

Horizontally scrolling content, loops infinitely.

```typescript
// Duplicate content for seamless loop
const track = document.querySelector(".marquee-track");
const content = track.innerHTML;
track.innerHTML = content + content;

// Animate
gsap.to(track, {
  x: "-50%",
  duration: 20,
  repeat: -1,
  ease: "none",
});
```

```css
.marquee {
  overflow: hidden;
  white-space: nowrap;
}

.marquee-track {
  display: inline-flex;
  gap: 2rem;
}
```

---

## Real-World Awwwards References

### Site Types & Animation Patterns

| Site Type | Must-Have Animations | Examples |
|-----------|---------------------|----------|
| **Portfolio** | Horizontal scroll, text reveal, page transitions | awwwards.com/websites/portfolio |
| **Agency** | Parallax, cursor effects, magnetic buttons | awwwards.com/websites/agency |
| **E-commerce** | Product zoom, before/after, hover effects | awwwards.com/websites/ecommerce |
| **SaaS** | Feature reveals, counter animation, scroll storytelling | awwwards.com/websites/technology |
| **Restaurant** | Ken Burns, parallax, menu reveal | awwwards.com/websites/restaurant |

### What Judges Look For

1. **Animation Purpose**: Every animation serves UX, not just decoration
2. **Timing & Easing**: Smooth, natural feel (not robotic)
3. **Performance**: 60fps on all devices
4. **Accessibility**: Respects reduced motion
5. **Innovation**: Unique creative approach
6. **Details**: Hover states, micro-interactions, loading states

---

## Exercise: Build Awwwards Pattern

### Bài 1: Magnetic Button + Underline

```typescript
// Tạo button có:
// 1. Magnetic effect khi hover
// 2. Underline slide animation
// 3. Ripple effect khi click
// 4. Scale animation
```

### Bài 2: Horizontal Scroll Gallery

```typescript
// Tạo gallery với:
// 1. Horizontal scroll từ vertical scroll
// 2. Pinned section
// 3. Snap points
// 4. Progress indicator
```

### Bài 3: Scroll Storytelling

```typescript
// Tạo narrative với:
// 1. Pinned container
// 2. 3 chapters animate in sequence
// 3. Text reveal + image parallax
// 4. Background color transitions
```

### Bài 4: Custom Cursor + Magnetic

```typescript
// Tạo interactive cursor với:
// 1. Custom cursor follower
// 2. Scale on hover over links
// 3. Color change on interactive elements
// 4. Magnetic effect cho buttons
```

---

*Cập nhật: Tháng 8, 2026 | Nguồn: GSAP Vault, GSAPify, Awwwards*
