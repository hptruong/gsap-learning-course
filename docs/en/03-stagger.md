# 03. Stagger

> **Goal:** reveal a group with one understandable tween, without delaying meaningful content.

Stagger offsets a single tween across multiple targets. It is simpler and easier to clean up than manually creating a loop of delayed tweens.

```js
gsap.from(".item", {
  y: 16,
  autoAlpha: 0,
  stagger: { each: 0.08, from: "start" },
  duration: 0.35,
  ease: "power2.out",
});
```

`each` controls the delay between targets; `amount` distributes a total delay across all targets. `from` accepts values such as `start`, `end`, `center`, `edges`, an index, or `random`. For a grid, `grid: "auto"` plus `from: "center"` can establish a useful focal point.

```js
gsap.from(".tile", {
  scale: 0.94,
  autoAlpha: 0,
  stagger: { grid: "auto", from: "center", amount: 0.45 },
});
```

Keep entrance sequences short. A stagger that makes the next action unavailable is not a pleasant reveal; it is input latency. In a reduced-motion branch, use a zero duration or a single group fade rather than a long cascade.

## Exercise

Build a 3-by-3 grid that enters from the center. Add a `prefers-reduced-motion` variant that reveals all cells at once.

**Done when:** one tween owns the grid, source order remains meaningful, and every cell is available without waiting through a long sequence.

## Further reading

- [Staggers](https://gsap.com/docs/v3/Staggers/)
