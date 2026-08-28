# 14. GSAP Utilities

Utilities turn repeated calculation into readable, testable animation code.

```js
const bounded = gsap.utils.clamp(0, 1, progress);
const x = gsap.utils.mapRange(0, width, -40, 40, pointerX);
const nextIndex = gsap.utils.wrap(0, items.length, index + 1);
```

Use `quickTo()` for a high-frequency interaction such as pointer-following. Use `gsap.ticker` only for work that must synchronize with GSAP; a separate `requestAnimationFrame` loop is valid for independent rendering. Always remove the exact ticker listener you add.

`gsap.matchMedia()` handles responsive setup and cleanup. It is the preferred route for breakpoints and reduced motion; do not globally lower ticker FPS for mobile.

## Checkpoint

Build a pointer interaction with `quickTo()` and disable its positional motion for reduced-motion users.
