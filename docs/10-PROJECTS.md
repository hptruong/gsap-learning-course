# 10. Dự Án Thực Hành

## Project 1: Portfolio Website

### Yêu cầu
- Hero section với text animation
- About section với scroll reveal
- Projects grid với stagger animation
- Contact form với hover effects

### Tech Stack
- React + TypeScript
- GSAP + ScrollTrigger
- Tailwind CSS

### Chi tiết

```typescript
// 1. Hero Section
function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".hero-title", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
      .from(
        ".hero-subtitle",
        { y: 30, opacity: 0, duration: 0.8 },
        "-=0.5"
      )
      .from(
        ".hero-cta",
        { scale: 0.8, opacity: 0, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3"
      );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="hero-title text-6xl font-bold">Portfolio</h1>
        <p className="hero-subtitle text-xl mt-4">Creative Developer</p>
        <button className="hero-cta mt-8 px-8 py-4 bg-blue-500 rounded">
          View Work
        </button>
      </div>
    </section>
  );
}

// 2. Projects Grid
function ProjectsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".project-card", {
      y: 100,
      opacity: 0,
      stagger: {
        amount: 0.8,
        grid: [2, 3],
        from: "center",
      },
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-8 p-8">
      {projects.map((project) => (
        <div key={project.id} className="project-card">
          <img src={project.image} alt={project.title} />
          <h3>{project.title}</h3>
        </div>
      ))}
    </div>
  );
}
```

### Timeline
- Tuần 1: Setup + Hero section
- Tuần 2: About + Projects
- Tuần 3: Contact + Polish

---

## Project 2: E-commerce Landing Page

### Yêu cầu
- Animated hero with product showcase
- Scroll-triggered feature sections
- Product carousel with drag
- Sticky add-to-cart button
- Smooth page transitions

### Tech Stack
- React + TypeScript
- GSAP + ScrollTrigger + Draggable
- Tailwind CSS

### Chi tiết

```typescript
// 1. Product Showcase với ScrollTrigger
function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(".product-image", {
      scale: 1.2,
      rotation: 10,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="h-screen">
      <img className="product-image" src="/product.png" alt="Product" />
    </div>
  );
}

// 2. Feature Cards với Stagger
function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".feature-card", {
      y: 50,
      opacity: 0,
      stagger: 0.15,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-8 p-16">
      {features.map((feature) => (
        <div key={feature.id} className="feature-card">
          <feature.icon />
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Timeline
- Tuần 1: Setup + Hero
- Tuần 2: Features + Products
- Tuần 3: Cart + Checkout flow
- Tuần 4: Polish + Performance

---

## Project 3: Interactive Storytelling

### Yêu cầu
- Scroll-driven narrative
- Text reveal animations
- SVG illustrations with drawing effects
- Parallax layers
- Audio sync (optional)

### Tech Stack
- React + TypeScript
- GSAP + ScrollTrigger + SplitText + DrawSVG
- Tailwind CSS

### Chi tiết

```typescript
// 1. Chapter với Scroll-Linked Text
function Chapter() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const split = new SplitText(".chapter-text", { type: "chars,words" });

    gsap.from(split.chars, {
      opacity: 0.2,
      stagger: 0.03,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-screen flex items-center">
      <div className="chapter-text max-w-3xl mx-auto text-2xl">
        Once upon a time, in a land far away...
      </div>
    </section>
  );
}

// 2. SVG Illustration với Drawing Effect
function Illustration() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    gsap.from(".illustration-path", {
      drawSVG: "0%",
      stagger: 0.1,
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });
  }, { scope: svgRef });

  return (
    <svg ref={svgRef} viewBox="0 0 400 400">
      <path className="illustration-path" d="..." />
    </svg>
  );
}
```

### Timeline
- Tuần 1: Story outline + Setup
- Tuần 2: Chapter 1 + Text animations
- Tuần 3: Chapter 2 + SVG illustrations
- Tuần 4: Chapter 3 + Parallax
- Tuần 5: Polish + Audio (optional)

---

## đánh giá Projects

### Criteria

| Criteria | Weight | Description |
|----------|--------|-------------|
| Animation Quality | 30% | Smoothness, timing, easing |
| Code Quality | 25% | Clean code, proper cleanup, TypeScript |
| User Experience | 25% | Intuitive, accessible, performant |
| Creativity | 20% | Unique effects, storytelling |

### Grading Scale

- **A (90-100)**: Awwwards-level quality
- **B (80-89)**: Professional quality
- **C (70-79)**: Good, room for improvement
- **D (60-69)**: Basic, needs more work
- **F (<60)**: Incomplete

---

---

## Exercises Chi Tiết (Step-by-Step)

### Exercise 1: Hero Text Stagger

**Difficulty**: ⭐⭐ | **Plugins**: SplitText

```typescript
// Step 1: Setup HTML
// <h1 class="hero-title">Hello World</h1>

// Step 2: Split text
const split = new SplitText(".hero-title", { type: "chars" });

// Step 3: Animate chars
gsap.from(split.chars, {
  y: 50,
  opacity: 0,
  stagger: 0.03,
  duration: 0.8,
  ease: "power3.out",
});

// Step 4: Add scroll trigger (optional)
// Thêm scrollTrigger để reveal khi scroll

// Deliverables:
// [ ] Text xuất hiện từng character
// [ ] Stagger 0.03s giữa mỗi char
// [ ] Easing power3.out
// [ ] Mobile responsive
```

### Exercise 2: Magnetic Button

**Difficulty**: ⭐⭐⭐ | **Plugins**: Core GSAP

```typescript
// Step 1: HTML
// <button class="magnetic-btn">Hover me</button>

// Step 2: Mousemove handler
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

// Step 3: Mouseleave handler
btn?.addEventListener("mouseleave", () => {
  gsap.to(btn, {
    x: 0, y: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.3)",
  });
});

// Step 4: Thêm text element di chuyển chậm hơn

// Deliverables:
// [ ] Button follow cursor khi hover gần
// [ ] Smooth return về center khi leave
// [ ] Elastic easing
// [ ] Text element cũng move (parallax feel)
```

### Exercise 3: Horizontal Scroll Gallery

**Difficulty**: ⭐⭐⭐⭐ | **Plugins**: ScrollTrigger

```typescript
// Step 1: HTML structure
// <div class="container">
//   <div class="panel">Panel 1</div>
//   <div class="panel">Panel 2</div>
//   <div class="panel">Panel 3</div>
//   <div class="panel">Panel 4</div>
// </div>

// Step 2: Horizontal scroll
const sections = gsap.utils.toArray(".panel");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector(".container")!.offsetWidth,
  },
});

// Step 3: Thêm progress indicator
// Step 4: Thêm snap animation
// Step 5: Test mobile (convert to vertical)

// Deliverables:
// [ ] Vertical scroll → horizontal movement
// [ ] Pinned section
// [ ] Snap points
// [ ] Progress indicator
// [ ] Mobile fallback
```

### Exercise 4: Preloader with Counter

**Difficulty**: ⭐⭐ | **Plugins**: Core GSAP

```typescript
// Step 1: HTML
// <div class="preloader">
//   <span class="counter">0%</span>
// </div>

// Step 2: Counter animation
const counter = { value: 0 };

gsap.to(counter, {
  value: 100,
  duration: 2,
  ease: "power2.inOut",
  onUpdate: () => {
    document.querySelector(".counter")!.textContent =
      Math.round(counter.value) + "%";
  },
});

// Step 3: Hide preloader
// Step 4: Init main animations

// Deliverables:
// [ ] Counter 0% → 100%
// [ ] Smooth easing
// [ ] Preloader slide up
// [ ] Main content reveal sau khi xong
```

### Exercise 5: Scroll Storytelling

**Difficulty**: ⭐⭐⭐⭐⭐ | **Plugins**: ScrollTrigger

```typescript
// Step 1: HTML structure
// <section class="story">
//   <div class="chapter ch-1">Chapter 1</div>
//   <div class="chapter ch-2">Chapter 2</div>
//   <div class="chapter ch-3">Chapter 3</div>
// </section>

// Step 2: Timeline + ScrollTrigger
const storyTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".story",
    start: "top top",
    end: "+=2000",
    scrub: true,
    pin: true,
  },
});

storyTL
  .from(".ch-1", { opacity: 0, y: 100 })
  .to(".ch-1", { opacity: 0, y: -100 })
  .from(".ch-2", { opacity: 0, y: 100 })
  .to(".ch-2", { opacity: 0, y: -100 })
  .from(".ch-3", { opacity: 0, y: 100 });

// Step 3: Thêm images, text reveals
// Step 4: Thêm background color transitions
// Step 5: Optimize cho mobile

// Deliverables:
// [ ] Pinned container
// [ ] 3 chapters animate in sequence
// [ ] Scrub linked với scroll
// [ ] Smooth transitions
// [ ] Mobile optimized
```

---

## Tips cho Projects

1. **Plan first**: Sketch animation sequences trước khi code
2. **Start simple**: Bắt đầu với basic animations, thêm complexity dần
3. **Performance**: Test trên mobile, optimize images
4. **Accessibility**: Luôn respect `prefers-reduced-motion`
5. **Code organization**: Tách animation logic thành reusable functions
6. **Version control**: Commit thường xuyên
7. **Documentation**: Ghi chú cách dùng animations
8. **Lenis**: Dùng Lenis cho smooth scroll thay vì native
9. **Cleanup**: Luôn cleanup animations trong React (useGSAP)
10. **Timing**: Entrance 0.6-1s, Hover 0.2-0.3s, Scroll scrub linked

---

*Chúc mừng bạn đã hoàn thành lộ trình học GSAP! 🎉*
