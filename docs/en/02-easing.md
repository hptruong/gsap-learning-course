# 02. Easing and Motion Feel

> **Goal:** choose easing from interaction intent instead of treating it as decoration.

Easing changes the rate of progress, not the distance. Start with documented GSAP eases; a consistent, restrained motion vocabulary usually feels more intentional than a different novelty ease on every element.

```js
gsap.to(".panel", { x: 160, ease: "power2.out", duration: 0.5 });
gsap.to(".button", { scale: 1.05, ease: "back.out(1.4)", duration: 0.2 });
gsap.to(".progress", { scaleX: 1, ease: "none", duration: 1 });
```

| Intent | Starting point | Avoid |
| --- | --- | --- |
| Entrance | `power2.out` or `power3.out` | Excessive bounce that delays reading. |
| State transition | `power2.inOut` or `power3.inOut` | Different ease in each direction without meaning. |
| Scroll/data mapping | `none` | An ease that breaks the direct mapping. |
| Playful feedback | `back.out()` sparingly | Elastic motion on critical UI. |

For a scrubbed ScrollTrigger, use `ease: "none"`; scroll already supplies the timing. CustomEase is useful when a product has an agreed motion curve, not as a substitute for deciding what the motion communicates.

## Exercise

Animate one card with `power2.out`, `power3.inOut`, and `back.out(1.4)`. Record which fits an entrance, a toggle, and playful feedback. Test the same interaction under reduced motion.

**Done when:** the easing choice has a user-facing rationale, and the interaction remains understandable with decorative movement removed.

## Further reading

- [Eases](https://gsap.com/docs/v3/Eases/)
- [CustomEase](https://gsap.com/docs/v3/Eases/CustomEase/)
