# 01. Tween Basics

> **Goal:** choose `to()`, `from()`, `fromTo()` or `set()` intentionally and avoid first-paint flashes.

A tween changes properties over time. Prefer GSAP transform aliases such as `x`, `y`, `scale` and `rotation` to manually composing a `transform` string.

```js
gsap.to(".card", { x: 80, rotation: 8, duration: 0.5, ease: "power2.out" });
gsap.from(".title", { y: 24, autoAlpha: 0, duration: 0.4 });
gsap.fromTo(".dot", { scale: 0 }, { scale: 1, duration: 0.25 });
gsap.set(".menu", { autoAlpha: 0 });
```

## Pick the method from state ownership

| Method | Meaning | Use it when |
| --- | --- | --- |
| `to()` | Current computed state to destination. | CSS/DOM already owns the start. |
| `from()` | Supplied values to current computed state. | The final visual state already exists. |
| `fromTo()` | Explicit start to explicit end. | You need deterministic endpoints. |
| `set()` | Apply values immediately. | You need a non-animated state change. |

`autoAlpha` updates opacity and visibility. It is useful for elements that should not receive pointer events while hidden.

## FOUC and `immediateRender`

`from()` applies its start state immediately by default. This can cause a flash of unstyled content or fight a separate initial-state animation. Use CSS to hide a deliberate pre-animation state, or use `fromTo()` when both endpoints must be owned by the animation.

```css
.js .hero-title { opacity: 0; visibility: hidden; transform: translateY(24px); }
```

```js
document.documentElement.classList.add("js");
gsap.to(".hero-title", { autoAlpha: 1, y: 0, duration: 0.55 });
```

Do not hide primary content in CSS unless you have a failure-safe path for JavaScript. The [FOUC](https://gsap.com/resources/fouc/) and [immediateRender](https://gsap.com/resources/immediaterender/) guides explain the trade-offs.

## Exercise

Build a three-item card entrance with `autoAlpha` and `y`. Rebuild it with `fromTo()`, then disable JavaScript and confirm all content still appears.

**Done when:** no flash appears on refresh; you can explain which code owns each endpoint; the animation has no accessibility-only state.
