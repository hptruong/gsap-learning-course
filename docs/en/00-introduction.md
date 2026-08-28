# 00. Introduction and Setup

> **Goal:** run a first tween, understand what it changes, and keep the page useful without JavaScript.

GSAP is a framework-agnostic JavaScript animation library. Use it when an interaction needs sequencing, playback control, scroll linkage, SVG work, or calculated values. CSS transitions are often enough for a simple state change.

## Smallest runnable example

```html
<div class="box"></div>
<style>
  .box { width: 80px; height: 80px; border-radius: 16px; background: #8b5cf6; }
</style>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script>
  gsap.to(".box", { x: 220, rotation: 180, duration: 0.8, ease: "power2.out" });
</script>
```

`".box"` is the target; `x`, `rotation`, `duration` and `ease` are vars. GSAP's `x` is a transform alias, so it does not mean changing CSS `left`.

## Installation choices

For a bundler:

```bash
npm install gsap @gsap/react
```

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

Only import and register plugins a page uses. Start in a small local page or CodePen with DevTools open. Do not register plugins through a CDN global unless their scripts have loaded first.

## Prerequisites and baseline

- Know HTML, CSS selectors, JavaScript functions and CSS transforms.
- Treat motion as progressive enhancement: content and controls work without it.
- Inspect the element in DevTools before blaming GSAP: wrong selector, hidden element and CSS override are common first bugs.

## Exercise

Create a card that moves, rotates and returns to its original state on a button click. Change one variable at a time and write what changed.

**Done when:** it works on refresh, JS-off content remains readable, and you can identify the target, end values and duration in the tween.

## Further reading

- [Installation](https://gsap.com/docs/v3/Installation/)
- [Getting started](https://gsap.com/resources/get-started/)
