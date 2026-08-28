# 15. Common Patterns: Choose Constraints Before a Snippet

> **Goal:** evaluate magnetic buttons, carousels, marquees, counters, image reveals and page transitions through input, semantics, fallback and cleanup before copying code.

A pattern is good interaction only when its purpose survives keyboard, touch, reduced motion, resize and route changes. If it fails these constraints, keep it in a sandbox rather than ship it.

## Decision matrix

| Pattern | Use when | Do not use when | Required fallback |
| --- | --- | --- | --- |
| Magnetic button | Secondary CTA, precise pointer, generous hit area | Submit form, touch-first UI, every link | Native hover/focus, zero offset. |
| Carousel | A bounded slide set must be compared | A list/grid would communicate better | Buttons, keyboard, selected state. |
| Marquee | Decorative label or short brand list | It is the only way to read text/link | Wrapped static text and pause. |
| Counter | A metric has context and a final value | Exact value is needed immediately | Final number in HTML. |
| Image reveal | Visual can start static | Image is LCP/hidden content | Visible image and caption. |
| Page transition | A same-app state change is clear | It only hides loading/navigation | Native navigation and correct focus/history. |

## Magnetic buttons: input-aware and bounded

```js
const mm = gsap.matchMedia();
const button = document.querySelector(".magnetic");

mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
  const xTo = gsap.quickTo(button, "x", { duration: 0.2, ease: "power3.out" });
  const yTo = gsap.quickTo(button, "y", { duration: 0.2, ease: "power3.out" });
  const move = (event) => {
    const rect = button.getBoundingClientRect();
    xTo(gsap.utils.clamp(-12, 12, (event.clientX - rect.left - rect.width / 2) * 0.25));
    yTo(gsap.utils.clamp(-12, 12, (event.clientY - rect.top - rect.height / 2) * 0.25));
  };
  const leave = () => gsap.to(button, { x: 0, y: 0, duration: 0.25, overwrite: "auto" });
  button.addEventListener("pointermove", move);
  button.addEventListener("pointerleave", leave);
  return () => { button.removeEventListener("pointermove", move); button.removeEventListener("pointerleave", leave); };
});
```

`quickTo()` reuses a tween. The media query prevents touch/reduced-motion listeners; its cleanup runs when the query stops matching. The control remains a native `button`/`a` with a focus ring.

## Carousels: animation does not replace the accessibility model

A bounded carousel and infinite loop are different problems. Start bounded:

1. HTML has a heading, slide list and clearly named previous/next buttons.
2. One `activeIndex` is source of truth; update `aria-current`, disabled state and deliberate live announcements.
3. Native buttons work by keyboard; do not hijack Arrow keys globally; focus cannot land in hidden content.
4. GSAP only animates exiting/entering slides. Use `overwrite: "auto"` for fast clicks.
5. Destroy removes listeners/tweens. If nodes are cloned for a loop, do not duplicate IDs or focusable content.

`horizontalLoop()` is a community/helper pattern, not a built-in API. Read its source/demo and prove cloned nodes do not break screen readers or tab order.

## Marquees and counters: data exists before animation

A looping marquee uses `ease: "none"`, pauses on hover/focus and becomes static with reduced motion. Never duplicate an interactive link for looping; decorative clones need `aria-hidden="true"`.

A counter renders a meaningful final value before animation:

```html
<p>Saved <strong class="metric">0</strong> hours per week.</p>
```

```js
const value = { count: 0 };
gsap.to(value, {
  count: 128,
  duration: 0.8,
  ease: "power1.out",
  snap: { count: 1 },
  onUpdate: () => { document.querySelector(".metric").textContent = String(value.count); },
});
```

Do not announce every frame with `aria-live`; announce the final change only when a visitor action needs feedback. Server data and semantic text must be correct before motion is enhancement.

## Image reveals and page transitions

A `clip-path` reveal keeps its static image visible with JavaScript off. Add a `.js` class only after script is ready; never hide the base image in CSS. Test crop, caption contrast and mobile GPU cost.

A page transition cannot delay navigation, lose focus or break back/forward. Begin with a component/page transition; before adding router transitions, define when the new route renders, where heading focus goes, how pending state works and where old animation cleans up.

## Ship checklist

- [ ] Content/action has a reason without the effect.
- [ ] Pointer, keyboard, touch and focus all work.
- [ ] Reduced-motion/static fallback is tested, not a global `timeScale` change.
- [ ] No unbounded tween/listener is created per input/frame.
- [ ] Component/route teardown leaves no transform, trigger, clone or listener.
- [ ] Evidence exists for normal, 375px, keyboard and reduced motion.

## Exercise

Choose **one** pattern. Write its decision matrix, build static fallback, implement a minimal desktop version, then run the checklist. If one row has no answer, remove the effect or keep it in a playground.

**Done when:** the pattern is not the only way to understand content, state has a source of truth, and cleanup/fallback are implementation rather than an end-of-lesson note.

## Further reading

- [GSAP utility methods](https://gsap.com/docs/v3/GSAP/UtilityMethods/)
- [GSAP accessibility](https://gsap.com/resources/a11y/)
