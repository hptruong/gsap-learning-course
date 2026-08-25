# 11. Landing Page Design + Animation

> Làm thế nào để tạo landing page đẹp và conversion-focused với GSAP.

---

## 7 Tiêu Chí Landing Page Đẹp (2026)

### 1. Clear Value Proposition (3-5 giây)

Visitor quyết định ở lại hay bounce trong 3-5 giây đầu.

```markdown
✅ Headline: Benefit-driven, rõ ràng
✅ Subheadline: Hỗ trợ headline với chi tiết
✅ Hero Image/Video: Chất lượng cao, relevant

❌ Headline chung chung: "Welcome to our website"
❌ Quá nhiều text trên fold
❌ Hero image không liên quan
```

**Animation**: Text stagger reveal + hero image parallax entrance

### 2. Single CTA Focus

Một CTA chính, nổi bật, không bị distractions.

```markdown
✅ CTA contrast color với background
✅ Action verbs: "Get Started", "Try Free", "See Demo"
✅ Above the fold + sticky on scroll
✅ Không có navigation links cạnh CTA

❌ Multiple CTAs cạnh nhau
❌ CTA blend vào background
❌ Generic text: "Click Here"
```

**Animation**: Magnetic button + pulse effect + scroll-triggered CTA appearance

### 3. Visual Hierarchy

Hướng dẫn mắt user theo flow mong muốn.

```markdown
✅ F-pattern hoặc Z-pattern layout
✅ Whitespace hợp lý (ít nhất 30% page)
✅ Typography scale: H1 > H2 > H3 > Body
✅ Color contrast WCAG AA (4.5:1)
```

**Animation**: Scroll-triggered section reveals with stagger

### 4. Trust Signals

Xây dựng credibility ngay lập tức.

```markdown
✅ Testimonials với photo + tên + role
✅ Client logos (known brands)
✅ Security badges (SSL, payment)
✅ Case studies với metrics
✅ Star ratings / reviews count
```

**Animation**: Logo marquee + counter animation cho metrics

### 5. Mobile-First Responsive

55%+ traffic từ mobile.

```markdown
✅ Thumb-friendly CTAs (min 48px tap target)
✅ Readable without zoom (min 16px font)
✅ Fast load time (<3s on 3G)
✅ Simplified layout trên mobile
✅ Touch-friendly interactions
```

**Animation**: Simplified animations trên mobile,尊重 prefers-reduced-motion

### 6. Animation with Purpose

Mỗi animation phải serve a purpose.

```markdown
✅ Hero entrance animation (attention)
✅ Scroll reveals (guide reading flow)
✅ Hover micro-interactions (feedback)
✅ Page transitions (continuity)
✅ Loading states (perceived performance)

❌ Animation decoration không purpose
❌ Animation quá slow (>1.5s)
❌ Animation blocking content
```

### 7. Performance

Speed = conversion.

```markdown
✅ Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
✅ Lazy loading images/videos
✅ Minimal JavaScript (tree-shaking)
✅ CDN cho assets
✅ Image optimization (WebP, AVIF)
```

---

## Animation Mapping Cho Từng Section

### Hero Section

```
┌─────────────────────────────────────────┐
│  [Headline] ← Stagger character reveal  │
│  [Subheadline] ← Fade up (delay 0.3s)   │
│  [CTA Button] ← Scale up + back.out     │
│  [Hero Image] ← Parallax zoom           │
└─────────────────────────────────────────┘
```

```typescript
// Hero Animation Sequence
const heroTL = gsap.timeline();

heroTL
  .from(".hero-headline", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  })
  .from(".hero-subheadline", {
    y: 30,
    opacity: 0,
    duration: 0.8,
  }, "-=0.5")
  .from(".hero-cta", {
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    ease: "back.out(1.7)",
  }, "-=0.3")
  .from(".hero-image", {
    scale: 1.2,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
  }, "-=0.8");
```

### Features Section

```
┌─────────────────────────────────────────┐
│  [Section Title] ← Fade up              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Feature │ │ Feature │ │ Feature │   │
│  │   Card  │ │   Card  │ │   Card  │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│  ← Stagger from bottom (0.15s each)    │
└─────────────────────────────────────────┘
```

```typescript
gsap.from(".feature-card", {
  y: 80,
  opacity: 0,
  stagger: 0.15,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".features-section",
    start: "top 80%",
  },
});
```

### Social Proof / Testimonials

```
┌─────────────────────────────────────────┐
│  [Client Logos] ← Infinite marquee      │
│  ┌─────────────────────────────────┐   │
│  │  "Quote text here"              │   │
│  │  — Name, Role, Company          │   │
│  │  ★★★★★                          │   │
│  └─────────────────────────────────┘   │
│  ← Fade in sequence                    │
└─────────────────────────────────────────┘
```

```typescript
// Marquee
gsap.to(".logo-track", {
  x: "-50%",
  duration: 20,
  repeat: -1,
  ease: "none",
});

// Testimonials
gsap.from(".testimonial-card", {
  y: 50,
  opacity: 0,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".testimonials-section",
    start: "top 80%",
  },
});
```

### Pricing / CTA Section

```
┌─────────────────────────────────────────┐
│  [Pricing Cards] ← Stagger from center  │
│  ┌─────┐ ┌─────┐ ┌─────┐              │
│  │Free │ │ Pro │ │Team │              │
│  │ $0  │ │$29  │ │$99  │              │
│  └─────┘ └─────┘ └─────┘              │
│  [CTA Button] ← Magnetic hover         │
└─────────────────────────────────────────┘
```

---

## Landing Page Template Structure

```html
<!-- 1. Preloader (optional) -->
<div class="preloader">...</div>

<!-- 2. Navigation (sticky) -->
<nav class="nav">...</nav>

<!-- 3. Hero Section -->
<section class="hero">
  <h1 class="hero-headline">...</h1>
  <p class="hero-subheadline">...</p>
  <a class="hero-cta">Get Started</a>
  <div class="hero-image">...</div>
</section>

<!-- 4. Social Proof Bar -->
<section class="logos">
  <div class="logo-track"><!-- infinite marquee --></div>
</section>

<!-- 5. Features Section -->
<section class="features">
  <h2>Features</h2>
  <div class="feature-grid">
    <div class="feature-card">...</div>
  </div>
</section>

<!-- 6. Product Showcase -->
<section class="product">
  <div class="product-image"><!-- scroll-zoom --></div>
  <div class="product-content"><!-- scroll-reveal --></div>
</section>

<!-- 7. Testimonials -->
<section class="testimonials">
  <div class="testimonial-card">...</div>
</section>

<!-- 8. Pricing -->
<section class="pricing">
  <div class="pricing-card">...</div>
</section>

<!-- 9. Final CTA -->
<section class="final-cta">
  <h2>Ready to start?</h2>
  <a class="cta-button magnetic">Start Free Trial</a>
</section>

<!-- 10. Footer -->
<footer>...</footer>
```

---

## Animation Checklist cho Landing Page

- [ ] Hero entrance animation (< 2s total)
- [ ] Scroll-triggered section reveals
- [ ] Stagger cho cards/grids
- [ ] Hover effects cho interactive elements
- [ ] Magnetic CTA button
- [ ] Logo marquee (infinite loop)
- [ ] Counter animation cho metrics
- [ ] Smooth scroll (Lenis hoặc native)
- [ ] Mobile: simplified animations
- [ ] Accessibility: prefers-reduced-motion
- [ ] Performance: GPU-accelerated only
- [ ] Cleanup: gsap.context() trong React

---

## Best Practices

### Timing Guide

| Element | Duration | Delay | Easing |
|---------|----------|-------|--------|
| Hero headline | 0.8-1s | 0 | power3.out |
| Hero subheadline | 0.6-0.8s | +0.3s | power2.out |
| Hero CTA | 0.5-0.6s | +0.5s | back.out(1.7) |
| Section title | 0.6-0.8s | 0 | power2.out |
| Feature cards | 0.6-0.8s | stagger 0.15 | power2.out |
| Testimonial cards | 0.8s | stagger 0.2 | power2.out |
| Hover effects | 0.2-0.3s | 0 | power2.out |
| Page transitions | 0.4-0.6s | 0 | power2.inOut |

### Easing cho Landing Page

```typescript
// Entrance animations
ease: "power2.out"      // Nhanh đầu, chậm cuối
ease: "power3.out"      // Mạnh hơn
ease: "back.out(1.7)"   // Playful overshoot

// Exit animations
ease: "power2.in"       // Chậm đầu, nhanh cuối

// Continuous motion
ease: "power2.inOut"    // Mượt mà cả hai đầu

// Scroll-linked
ease: "none"            // Linear (scrub controls)
```

---

*Bài tiếp theo: [12-AWWWARDS-PATTERNS.md](./12-AWWWARDS-PATTERNS.md)*
