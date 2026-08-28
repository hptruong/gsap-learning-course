# 11. Landing-page Motion: From Brief to QA

> **Goal:** design a static-first landing page, then add motion that clarifies hierarchy, feedback and orientation without delaying LCP, breaking focus or making visitors watch an intro.

A landing page does not automatically need a preloader, smooth scrolling, cursor follower or pinned story. Good motion answers one of three questions: **what matters first**, **what state just changed**, or **how do these pieces relate**. If it answers none, CSS hover—or no motion—is usually better.

## Make a motion inventory before writing GSAP

| Element | Purpose | Trigger | Static / reduced-motion fallback | Do not |
| --- | --- | --- | --- | --- |
| Hero copy | Guide the reading hierarchy | First paint | Content is already visible; optionally short fade | Stagger for 1.5 seconds. |
| Primary CTA | Confirm hover/focus | Pointer / keyboard | Native CSS focus + hover | Use magnetism on every device. |
| Product visual | Explain a feature | Section enter | Static image/caption | Block LCP behind a preloader. |
| Feature cards | Group a list | Viewport enter | Visible by default | Hide them if JS fails. |
| Story diagram | Explain a sequence | Optional desktop scroll | Vertical flow | Force horizontal scroll on mobile. |

Only code rows with a clear purpose and fallback. A section can be entirely static.

## Hero: static first, then a timeline

HTML/CSS must be readable before JavaScript. To avoid FOUC, only hide elements with CSS after JavaScript deliberately adds a `js` class to `<html>`; never leave plain HTML at `visibility: hidden`.

```html
<section class="hero">
  <p class="hero__eyebrow">New release</p>
  <h1 class="hero__title">Move with clarity.</h1>
  <p class="hero__body">A product sentence that stays readable without JavaScript.</p>
  <a class="hero__cta" href="#pricing">See pricing</a>
</section>
```

```js
const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .from(".hero__eyebrow", { y: 12, autoAlpha: 0, duration: 0.28 })
    .from(".hero__title", { y: 22, autoAlpha: 0, duration: 0.5 }, "<0.08")
    .from(".hero__body, .hero__cta", { y: 12, autoAlpha: 0, duration: 0.32, stagger: 0.06 }, "<0.16");
});
```

The timeline expresses hierarchy: eyebrow first, title as the primary moment, then supporting copy and CTA. Do not chain `delay`, autoplay again on return, or animate layout properties just to bring content in.

## Feature reveals should aid scan, not delay it

```js
const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.from(".feature-card", {
    y: 20,
    autoAlpha: 0,
    duration: 0.4,
    stagger: { each: 0.07, from: "start" },
    ease: "power2.out",
    scrollTrigger: { trigger: ".feature-grid", start: "top 78%", once: true },
  });
});
```

With reduced motion, do not create a tween; cards stay visible in HTML/CSS. For long lists, animate only necessary/visible items rather than create hundreds of triggers. When responsive images or fonts change layout, refresh once at the actual change.

## CTA state must exist without GSAP

```css
.hero__cta { display: inline-flex; padding: .8rem 1rem; border-radius: .5rem; background: #111827; color: white; transition: background-color .15s ease; }
.hero__cta:hover { background: #374151; }
.hero__cta:focus-visible { outline: 3px solid #60a5fa; outline-offset: 3px; }
```

GSAP can add small feedback but must not replace CSS state or browser focus:

```js
const cta = document.querySelector(".hero__cta");
cta.addEventListener("pointerenter", () => gsap.to(cta, { y: -2, duration: 0.18, ease: "power2.out" }));
cta.addEventListener("pointerleave", () => gsap.to(cta, { y: 0, duration: 0.18, ease: "power2.out" }));
```

Clean up listeners in an SPA. On touch, hover is not a primary interaction, so the CTA must remain obvious through layout and label.

## Measure the right performance risks

| Metric / test | How motion can hurt it | Check |
| --- | --- | --- |
| LCP | Preloaders, font/image waits, hidden hero. | Performance with network throttle; hero appears before animation. |
| CLS | Layout animation/injection, late font swap after trigger positions. | Experience panel; reserve image dimensions. |
| INP | Pointer events create a tween every move; heavy filters/blur. | Performance interaction trace; use `quickTo()` for high-frequency input. |
| Mobile GPU | Long pinning, large clip-path/filter, too many layers. | Real device, battery saver, reduced motion. |

Do not claim 60fps because you used transforms. Profile a low-end device and simplify before adding `will-change`; use that hint only for elements about to animate, then clear it if appropriate.

## Release QA checklist

1. JavaScript off / script failure: hero, CTA, pricing and features remain readable and clickable.
2. 375px + touch: no required pin/horizontal scroll; fixed UI cannot hide focus.
3. Keyboard: Tab follows DOM order, focus is visible, animation cannot block input.
4. `prefers-reduced-motion`: no distant entrances; decorative scrub/pin is omitted.
5. Resize, web fonts and slow images: ScrollTrigger positions remain correct; no refresh in scroll.
6. Production: no markers or console errors; listeners, tickers and contexts clean up.

## Exercise

Use a real landing page or mock. Build static hero, three features and a CTA. Write the inventory, then implement **only two** rows: hero timeline and feature reveal. Record evidence for JS-off, 375px, keyboard, reduced motion and a Performance trace.

**Done when:** you can explain the purpose of every tween; LCP content is not held by animation; mobile is not forced into a desktop effect; and the page stays useful without GSAP.

## Further reading

- [GSAP accessibility](https://gsap.com/resources/a11y/)
- [Web Vitals](https://web.dev/articles/vitals)
