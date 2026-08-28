# 04. Timelines and Control

> **Goal:** choreograph related motion with one source of truth instead of chained delays.

Use a timeline when order, overlap, playback or cleanup matter.

```js
const intro = gsap.timeline({ paused: true });
intro
  .addLabel("copy")
  .from(".eyebrow", { y: 12, autoAlpha: 0, duration: 0.25 })
  .from(".title", { y: 24, autoAlpha: 0, duration: 0.45 }, "<0.1")
  .from(".action", { autoAlpha: 0, duration: 0.2 }, "copy+=0.35");

intro.play();
```

| Position | Meaning |
| --- | --- |
| Omitted | Start after the previous child ends. |
| `"<"` / `">"` | Align with the previous child start/end. |
| `"<0.1"` | Start 0.1 seconds after the previous child begins. |
| `"+=0.2"` | Insert a gap after the current end. |
| `"label+=0.1"` | Position relative to a named semantic moment. |

Store the returned timeline when a UI needs `play()`, `pause()`, `reverse()`, `progress()`, or `kill()`. Animation is not UI state: a menu's DOM, focus handling and `aria-expanded` must be correct even with motion disabled.

## Exercise

Create an accessible menu or modal sequence with labels. Open it on click, reverse it on close, return focus appropriately, and make the reduced-motion variant immediate.

**Done when:** there are no sequencing `delay` values, repeated clicks do not create competing timelines, and the UI state is valid before the animation begins.

## Further reading

- [Timelines](https://gsap.com/docs/v3/GSAP/Timeline/)
