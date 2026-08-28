# 09. Production Techniques

Production animation starts with accessibility and measurement, not effects.

## Performance and accessibility

Prefer transforms and opacity when they achieve the desired result because they commonly avoid layout work. They do not guarantee GPU acceleration or a fixed frame rate. Profile real devices and add `will-change` sparingly for a short, known animation.

```js
const media = gsap.matchMedia();
media.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.from(".decorative", { y: 24, autoAlpha: 0, stagger: 0.08 });
});
```

For reduced motion, remove decorative movement or use a simple fade. Do not change `globalTimeline.timeScale()` as a global accessibility policy.

## Plugins and integrations

Use Flip after the framework has committed its new layout; capture state before the update and call `Flip.from()` from a layout effect after render. Treat Lenis as an optional third-party integration, not a replacement for native scrolling. When attaching a GSAP ticker callback, store and remove the exact same function reference.

## Checkpoint

Test a scroll animation with reduced motion, keyboard navigation, a small viewport, and DevTools performance recording.
