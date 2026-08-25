# 🎨 Visual Design Fundamentals for Animation

> Animation không chỉ là code — nó là **nghệ thuật kể chuyện bằng chuyển động**. Bạn cần hiểu visual design để tạo animations đẹp, có purpose, và professional.

---

## Bảng Nội Dục

1. [12 Principles of Animation](#1-12-principles-of-animation)
2. [Color Theory for Motion](#2-color-theory-for-motion)
3. [Typography for Animation](#3-typography-for-animation)
4. [Composition & Layout](#4-composition--layout)
5. [Storyboarding & Timing Charts](#5-storyboarding--timing-charts)
6. [Design Tools for Motion](#6-design-tools-for-motion)
7. [Animation Timing Reference](#7-animation-timing-reference)

---

## 1. 12 Principles of Animation

### Why This Matters

12 Principles of Animation được phát triển bởi **Frank Thomas & Ollie Johnston** (Disney Legends, 1981). Đây là nền tảng cho mọi animation — từ cartoon đến UI animation đến Awwwards sites.

**Nếu bạn chỉ biết GSAP API mà không biết 12 Principles, animations của bạn sẽ trông "robot" và缺乏soul.**

---

### 1.1 Squash & Stretch

**Định nghĩa**: Object thay đổi form khi di chuyển — nén khi chạm đất, giãn khi bay lên. Tạo cảm giác **mass** và **flexibility**.

```typescript
// Ball bounce với squash & stretch
const tl = gsap.timeline();

tl.to(".ball", {
  scaleY: 0.6,
  scaleX: 1.4,
  duration: 0.1,
  ease: "power2.in",
})
.to(".ball", {
  scaleY: 1.2,
  scaleX: 0.8,
  duration: 0.1,
  ease: "power2.out",
})
.to(".ball", {
  scaleY: 1,
  scaleX: 1,
  duration: 0.3,
  ease: "elastic.out(1, 0.3)",
});
```

**UI Application**:
- Button press: slight scale down (0.95) → bounce back
- Card hover: subtle squash on Y when lifting
- Page transition: content squashes on entry

**Lưu ý quan trọng**: Luôn giữ **volume** — nếu scaleX tăng, scaleY phải giảm tương ứng.

---

### 1.2 Anticipation

**Định nghĩa**: Motion preparation —动作 trước khi thực hiện动作 chính. Tạo **readability** và **natural feel**.

```typescript
// Button click với anticipation
const btn = document.querySelector(".cta-button");

btn?.addEventListener("mouseenter", () => {
  gsap.to(btn, {
    scale: 0.95,
    duration: 0.15,
    ease: "power2.in",
  });
});

btn?.addEventListener("mouseleave", () => {
  gsap.to(btn, {
    scale: 1,
    duration: 0.4,
    ease: "elastic.out(1, 0.3)",
  });
});
```

```typescript
// Page element xuất hiện với anticipation
gsap.from(".hero-text", {
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
  delay: 0.2,
});
```

**UI Application**:
- Modal mở: backdrop fade → content scale từ 0.9 → 1
- Menu xuất hiện: slide từ slightly opposite direction
- Scroll reveal: elements hơi move lên trước khi settle

---

### 1.3 Staging

**Định nghĩa**: Present idea rõ ràng, ensure audience attention vào đúng place. **Composition + timing + contrast** determines what the viewer sees first.

```typescript
// Staging: highlight active element, dim others
function stageActive(activeEl: HTMLElement, otherEls: HTMLElement[]) {
  const tl = gsap.timeline();

  tl.to(otherEls, {
    opacity: 0.3,
    scale: 0.98,
    duration: 0.4,
    ease: "power2.out",
  })
  .to(activeEl, {
    scale: 1.05,
    opacity: 1,
    duration: 0.4,
    ease: "power2.out",
  }, "<");
}
```

**UI Application**:
- Hero section: 1 focal point (headline), supporting elements fade
- Active nav item: brighter color, others dim
- Modal: background dims, modal center stage

---

### 1.4 Straight Ahead vs Pose-to-Pose

**Two approaches to creating animation:**

| Approach | Description | GSAP Use Case |
|----------|-------------|---------------|
| **Straight Ahead** | Animate frame by frame từ start đến end | `gsap.to()` sequential — từng property một |
| **Pose-to-Pose** | Define key poses, fill in between | `gsap.timeline()` với keyframes — define milestones |

```typescript
// Pose-to-Pose: Define key poses
const tl = gsap.timeline();
tl.to(".box", { x: 200, rotation: 90, duration: 0.5 })   // Pose 1
  .to(".box", { x: 400, rotation: 180, duration: 0.5 })  // Pose 2
  .to(".box", { x: 200, rotation: 270, duration: 0.5 }); // Pose 3
// GSAP tự interpolates giữa poses
```

---

### 1.5 Follow-Through & Overlapping Action

**Follow-Through**: Parts of object tiếp tục di chuyển sau khi object dừng.
**Overlapping Action**: Different parts of object move at different rates/times.

```typescript
// Follow-through: hair/clothing simulation
function followThrough(mainEl: HTMLElement, followEls: HTMLElement[]) {
  const tl = gsap.timeline();

  // Main body moves
  tl.to(mainEl, { y: 100, duration: 0.5, ease: "power2.out" });

  // Follow-through elements lag behind
  followEls.forEach((el, i) => {
    tl.to(el, {
      y: 100,
      rotation: 10 - i * 5,
      duration: 0.6 + i * 0.1,
      ease: "power2.out",
    }, 0.1 * i); // Offset start time
  });
}
```

```typescript
// Overlapping: staggered elements stop at different times
gsap.from(".card", {
  y: 50,
  opacity: 0,
  stagger: {
    each: 0.1,
    from: "edges",
  },
  duration: 0.8,
  ease: "power3.out",
});
```

**UI Application**:
- Nav items animate in sequence, but bounce back at different rates
- Cards stagger in, but each card has slightly different easing
- Page load: hero first, then content, then footer — overlapping not sequential

---

### 1.6 Slow In & Slow Out (Easing)

**Định nghĩa**: Objects accelerate and decelerate naturally. Không có gì trong tự nhiên move với constant speed.

Đây chính là **Easing** — đã cover chi tiết trong [02-EASING.md](./02-EASING.md).

**Key insight**: Mỗi type of motion cần easing khác nhau:
- **Entrance**: ease-out (nhanh đầu, chậm cuối)
- **Exit**: ease-in (chậm đầu, nhanh cuối)
- **Movement**: ease-in-out (chậm 2 đầu, nhanh giữa)
- **Bounce**: elastic/back (overshoot)

---

### 1.7 Arcs

**Định nghĩa**: Natural motion follows弧形 paths, không phải đường thẳng.

```typescript
// Arc motion thay vì linear
gsap.to(".object", {
  motionPath: {
    path: [
      { x: 100, y: 0 },
      { x: 200, y: -50 },
      { x: 300, y: 0 },
    ],
    curviness: 1.5,
  },
  duration: 1,
  ease: "power1.inOut",
});
```

```typescript
// Simple arc với rotation + translation
gsap.to(".object", {
  x: 200,
  y: -100, // Arc peak
  rotation: 45,
  duration: 0.8,
  ease: "power2.inOut",
});
```

**UI Application**:
- Floating elements: subtle arc paths
- Menu items: arc from source to destination
- Page transitions: content arcs into view

---

### 1.8 Secondary Action

**Định nghĩa**: Supporting animations that complement main action, thêm richness mà không distract.

```typescript
// Main action: card flip
// Secondary actions: shadow changes, background particles, border glow
function cardFlipWithSecondary(card: HTMLElement) {
  const tl = gsap.timeline();

  tl.to(card, {
    rotationY: 180,
    duration: 0.6,
    ease: "power2.inOut",
  })
  // Secondary: shadow
  .to(card, {
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    duration: 0.6,
  }, "<")
  // Secondary: border glow
  .to(card, {
    borderColor: "#6366f1",
    duration: 0.3,
  }, 0.3);
}
```

---

### 1.9 Timing

**Định nghĩa**: Number of frames (thời gian) cho mỗi action. Timing quyết định mood và readability.

```
Fast (0.2-0.4s): UI feedback, hover, click
Medium (0.4-0.8s): Entrance, transitions
Slow (0.8-1.5s): Dramatic reveals, storytelling
Very Slow (1.5s+): Background, ambient motion
```

Xem chi tiết trong [Animation Timing Reference](#7-animation-timing-reference) bên dưới.

---

### 1.10 Exaggeration

**Định nghĩa**: Push movements beyond realism để tạo impact và personality.

```typescript
// Normal hover
gsap.to(btn, { scale: 1.05, duration: 0.3 });

// Exaggerated hover (Awwwards style)
gsap.to(btn, {
  scale: 1.15,
  rotation: -3,
  y: -5,
  boxShadow: "0 10px 40px rgba(99, 102, 241, 0.4)",
  duration: 0.4,
  ease: "back.out(1.7)",
});
```

**UI Application**:
- Error shake: slightly more dramatic than realistic
- Success bounce: exaggerated scale (1.2 → 0.9 → 1)
- Loading: exaggerated pulse to show activity

---

### 1.11 Solid Drawing

**Định nghĩa**: Understanding 3D form, weight, volume — even trong 2D animation.

```typescript
// 3D transforms tạo depth
gsap.to(".card", {
  rotationY: 15,
  rotationX: -5,
  transformPerspective: 1000,
  duration: 0.6,
  ease: "power2.out",
});

// Shadow responds to 3D rotation
gsap.to(".card-shadow", {
  x: 20,
  y: 10,
  scaleX: 1.1,
  duration: 0.6,
  ease: "power2.out",
});
```

---

### 1.12 Appeal

**Định nghĩa**: Character/Object phải visually interesting và attractive. Không có appeal = boring animation.

**UI Appeal Checklist**:
- [ ] Easing có varied và interesting không? (không chỉ linear)
- [ ] Colors có harmonious không?
- [ ] Typography có readable và stylish không?
- [ ] Spacing có consistent và balanced không?
- [ ] Animation có purpose không? (không decoration)

---

## 2. Color Theory for Motion

### 2.1 Color Psychology in Animation

| Color | Feeling | Animation Use | Duration |
|-------|---------|---------------|----------|
| **Red** | Urgency, passion, energy | Errors, CTAs, notifications | Fast (0.2-0.4s) |
| **Blue** | Trust, calm, professional | Navigation, backgrounds, loading | Medium (0.4-0.8s) |
| **Green** | Success, growth, nature | Confirmations, success states | Medium (0.4-0.6s) |
| **Yellow** | Warning, optimism, warmth | Warnings, highlights, attention | Fast (0.2-0.3s) |
| **Purple** | Luxury, creativity, mystery | Premium features, hero sections | Slow (0.6-1.0s) |
| **Orange** | Action, enthusiasm, energy | CTAs, hover states, transitions | Fast (0.3-0.5s) |

### 2.2 Color Transitions

```typescript
// Smooth color transition
gsap.to(".element", {
  backgroundColor: "#6366f1",
  color: "#ffffff",
  duration: 0.4,
  ease: "power2.out",
});

// Gradient shift
gsap.to(".gradient-bg", {
  backgroundPosition: "100% 50%",
  duration: 2,
  ease: "power1.inOut",
});

// Color cycle (ambient)
gsap.to(".ambient", {
  backgroundColor: "#ff6b6b",
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});
```

### 2.3 Contrast for Motion

**Rule**: Animated elements must have sufficient contrast against background.

```
WCAG AA: 4.5:1 ratio for text
WCAG AAA: 7:1 ratio for text
Motion contrast: animated element should "pop" against static elements
```

```typescript
// Highlight animated element với contrast
gsap.to(".highlight", {
  scale: 1.1,
  boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.5)",
  duration: 0.3,
  ease: "power2.out",
});
```

---

## 3. Typography for Animation

### 3.1 Font Pairing Rules

```
Heading: Bold, expressive font (Inter, Satoshi, Cabinet Grotesk)
Body: Clean, readable font (Inter, DM Sans, Plus Jakarta Sans)

Contrast principle: Different styles create visual interest
- Sans-serif headings + Serif body
- Bold headings + Light body
- Display headings + Monospace accents
```

### 3.2 Typography Hierarchy & Animation Timing

```
H1 (Hero): 0.8-1.2s — slowest, most dramatic
H2 (Section): 0.6-0.8s — medium
H3 (Subsection): 0.4-0.6s — faster
Body text: 0.3-0.5s — quick fade in
Labels/Captions: 0.2-0.3s — fastest, subtle
```

```typescript
// Staggered typography reveal
const splitH1 = new SplitText("h1", { type: "chars" });
const splitH2 = new SplitText("h2", { type: "chars" });
const splitBody = new SplitText("p", { type: "words" });

const tl = gsap.timeline();

tl.from(splitH1.chars, {
  y: 50,
  opacity: 0,
  stagger: 0.03,
  duration: 1,
  ease: "power3.out",
})
.from(splitH2.chars, {
  y: 30,
  opacity: 0,
  stagger: 0.02,
  duration: 0.8,
  ease: "power3.out",
}, "-=0.5")
.from(splitBody.words, {
  y: 20,
  opacity: 0,
  stagger: 0.01,
  duration: 0.5,
  ease: "power2.out",
}, "-=0.4");
```

### 3.3 Typography Sizing Scale

```
Mobile:    H1: 2rem  | H2: 1.5rem | H3: 1.25rem | Body: 1rem
Tablet:    H1: 3rem  | H2: 2rem   | H3: 1.5rem  | Body: 1rem
Desktop:   H1: 4rem  | H2: 2.5rem | H3: 1.75rem | Body: 1rem
Large:     H1: 5rem+ | H2: 3rem+  | H3: 2rem    | Body: 1.125rem
```

---

## 4. Composition & Layout

### 4.1 Visual Hierarchy Rules

```
1. Focal Point: 1 dominant element per viewport
2. Size: Larger = more important
3. Contrast: High contrast = more attention
4. Position: Top-left = first seen (F-pattern)
5. White Space: More space = more importance
6. Motion: Moving elements draw attention
```

### 4.2 Layout Patterns for Animation

**F-Pattern** (Text-heavy pages):
```typescript
// Animate elements in F-pattern
const fPatternElements = [
  { el: ".logo", x: 0, y: 0 },         // Top-left
  { el: ".nav", x: 100, y: 0 },        // Top-right
  { el: ".hero-h1", x: 0, y: 50 },     // Left, large
  { el: ".hero-p", x: 0, y: 100 },     // Left, below
  { el: ".card-1", x: 0, y: 150 },     // Left column
  { el: ".card-2", x: 200, y: 150 },   // Right column
];
```

**Z-Pattern** (Landing pages):
```typescript
// Animate elements in Z-pattern
const zPatternElements = [
  { el: ".logo", anchor: "top-left" },         // 1: Top-left
  { el: ".nav-cta", anchor: "top-right" },     // 2: Top-right
  { el: ".hero-center", anchor: "center" },    // 3: Center
  { el: ".bottom-left", anchor: "bottom-left" }, // 4: Bottom-left
  { el: ".bottom-cta", anchor: "bottom-right" }, // 5: Bottom-right
];
```

### 4.3 Grid & Spacing

```typescript
// Consistent spacing scale
const spacing = {
  xs: "0.25rem",   // 4px
  sm: "0.5rem",    // 8px
  md: "1rem",      // 16px
  lg: "1.5rem",    // 24px
  xl: "2rem",      // 32px
  "2xl": "3rem",   // 48px
  "3xl": "4rem",   // 64px
  "4xl": "6rem",   // 96px
};

// Animation with consistent spacing
gsap.from(".card", {
  y: spacing.xl, // 32px — consistent with layout
  opacity: 0,
  duration: 0.6,
});
```

---

## 5. Storyboarding & Timing Charts

### 5.1 Storyboard for Web Animation

Storyboard là bản vẽ phác thảo trước khi code. Mỗi "frame" = 1 state của animation.

```
Frame 1: Hero section — text hidden, background visible
Frame 2: Text slides up + fades in (0.4s)
Frame 3: CTA button scales up từ 0.8 → 1 (0.3s)
Frame 4: Subtitle fades in below (0.3s, delay 0.2s)
Frame 5: Background gradient shifts (continuous)
```

### 5.2 Timing Chart

Timing chart thể hiện duration và offset của mỗi element:

```
Element         | 0s    | 0.2s  | 0.4s  | 0.6s  | 0.8s  | 1.0s
----------------|-------|-------|-------|-------|-------|------
H1 chars        | ██████|███████|███████|███████|       |
H2 words        |  ░░░░░|░░░░░░░|░░░░░░░|░░░░░░░|       |
Body text       |   ░░░░|░░░░░░░|░░░░░░░|░░░░░░░|░░░░░░░|
CTA button      |        ░░░░░░░|░░░░░░░|░░░░░░░|       |
Background      | ████████████████████████████████████████| → continuous

█ = active animation    ░ = delay/settling
```

### 5.3 Pre-Production Checklist

```
□ sketch animation storyboard (5-8 frames)
□ define timing for each element
□ choose easing for each motion type
□ plan entrance sequence (which first?)
□ plan exit sequence (reverse? fade?)
□ define scroll triggers (if scroll-based)
□ consider mobile layout (simplify?)
□ test with prefers-reduced-motion
```

---

## 6. Design Tools for Motion

### 6.1 Figma for Motion Planning

**Cách dùng Figma để plan animation:**

1. **Frame variants**: Tạo 2-3 frames cho mỗi animated state
2. **Component states**: Define hover/active/disabled states
3. **Prototype**: Figma smart animate để preview motion concept
4. **Export**: Xuất specs cho developer (duration, easing, transform values)

### 6.2 After Effects → GSAP Workflow

```
1. Design in Figma
2. Animate in After Effects
3. Export via Lottie (json) hoặc Bodymovin
4. Import into web project
5. Or: Use AE timing/easing as reference for GSAP implementation
```

### 6.3 GSAP DevTools

```typescript
// Chrome Extension: GSAP DevTools
// - Inspect active tweens
// - Scrub through animations
// - Debug easing curves
// - Monitor performance
```

---

## 7. Animation Timing Reference

### 7.1 Duration Guide

| Animation Type | Duration | Easing | Notes |
|---------------|----------|--------|-------|
| **Button Hover** | 0.2-0.3s | ease-out | Instant feedback |
| **Tooltip Show** | 0.15-0.25s | ease-out | Near-instant |
| **Dropdown Menu** | 0.2-0.3s | power2.out | Quick reveal |
| **Card Hover Lift** | 0.3-0.4s | power2.out | Subtle feedback |
| **Page Section Reveal** | 0.5-0.8s | power3.out | Dramatic |
| **Hero Text Entrance** | 0.8-1.2s | power3.out | Most dramatic |
| **Full Page Transition** | 0.6-1.0s | power2.inOut | Smooth |
| **Background Gradient** | 3-10s | sine.inOut | Ambient |
| **Scroll-linked** | scrub | varies | Follows scroll |
| **Loading Spinner** | 0.8-1.5s | linear | Continuous |

### 7.2 Stagger Timing

```
Micro (subtle): 0.01-0.02s — for large groups
Small (noticeable): 0.03-0.05s — for text chars
Medium (rhythmic): 0.06-0.1s — for cards, list items
Large (dramatic): 0.1-0.2s — for hero elements
Very Large (theatrical): 0.2-0.5s — for few key elements
```

### 7.3 Delay Guide

```
No delay (0s): First element, or continuous motion
Short delay (0.05-0.15s): Slight offset for natural feel
Medium delay (0.15-0.3s): Sequential elements
Long delay (0.3-0.6s): Dramatic reveals
Very long (0.6-1s): Entrance sequence after page load
```

---

## 🏋️ Bài Tập Thực Hành

### Bài 1: 12 Principles Audit

```
1. Chọn 1 Awwwards-winning site
2. Xem 3 animations trên site đó
3. For each animation, identify:
   - Which of 12 principles are used?
   - What easing type is used?
   - What duration/stagger?
   - How does it create "appeal"?
4. Ghi kết quả vào document
```

### Bài 2: Storyboard a Landing Page

```
1. Chọn 1 landing page template
2. Sketch 6-8 frames cho page load animation
3. For each frame:
   - Which elements are visible?
   - What is their current state (position, scale, opacity)?
   - What will happen next?
4. Create timing chart
5. Implement with GSAP
```

### Bài 3: Color Animation System

```
1. Design 1 color palette (5-7 colors)
2. Define animation rules:
   - Entrance: use palette.primary
   - Success: animate to palette.green
   - Error: animate to palette.red
   - Hover: lighten palette.primary by 10%
3. Create reusable gsap.registerEffect() for each
4. Test on real UI components
```

### Bài 4: Typography Motion System

```
1. Define typography scale (4 sizes)
2. For each size:
   - Animation type (chars/words/lines)
   - Duration
   - Easing
   - Stagger
3. Create reusable SplitText animation function
4. Apply to real heading + paragraph
```

---

*Bài tiếp theo: [14-GSAP-UTILITIES.md](./14-GSAP-UTILITIES.md) - GSAP Utility Functions*
