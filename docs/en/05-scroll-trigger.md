# 05. ScrollTrigger

> **Goal:** connect motion to scroll without making content, mobile use, or resize behavior fragile.

Register the plugin once in the module that uses it. Start with a one-shot viewport reveal before scrub or pinning.

```js
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.from(".feature", {
  y: 24,
  autoAlpha: 0,
  scrollTrigger: { trigger: ".feature", start: "top 80%", once: true },
});
```

`start: "top 80%"` means the trigger's top meets 80% down the viewport. Enable `markers: true` during development to see both positions, then remove it before shipping.

## Add complexity in order

1. One-shot entry.
2. `toggleActions` for enter/leave playback behavior.
3. A scrubbed timeline with `ease: "none"`.
4. Pinning only when the temporary fixed view helps explain content.
5. Snapping only when it improves orientation rather than hijacking scroll.

Put a ScrollTrigger on the timeline, not on a child tween in that timeline. When pinning, animate children inside the pinned section, not the pinned element itself. `pinSpacing` reserves layout space by default; only disable it after designing the replacement layout.

## Responsive and dynamic layout

```js
const mm = gsap.matchMedia();
mm.add("(min-width: 800px)", () => {
  const story = gsap.timeline({
    scrollTrigger: { trigger: ".story", start: "top top", end: "+=800", pin: true, scrub: 1 },
  });
  story.to(".story-art", { xPercent: -35, ease: "none" });
});
mm.add("(prefers-reduced-motion: reduce)", () => gsap.set(".story-art", { clearProps: "all" }));
```

Test resize, font loading and dynamic content. Call `ScrollTrigger.refresh()` after layout-affecting assets have settled, not indiscriminately on every event. `matchMedia()` reverts the desktop setup when its query stops matching.

## Exercise

Implement an entry reveal and a desktop-only scrubbed story. On mobile and reduced motion, retain normal vertical content flow without pinning or scroll-linked movement.

**Done when:** markers are removed, resize does not misplace triggers, all text remains reachable, and the fallback tells the same story.

## Further reading

- [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Common ScrollTrigger mistakes](https://gsap.com/resources/st-mistakes/)
