# 08. GSAP in React + TypeScript

> **Goal:** build React animation that is scoped, SSR-safe and cleanly reverted during Strict Mode, route changes and data updates.

React declares what the DOM should be. GSAP imperatively animates that DOM **after** React commits it. Use `@gsap/react` rather than putting `gsap.to()` in render or an unscoped effect.

## The safe component baseline

Install both packages, register the hook once, create a root ref, then scope every selector to that root.

```bash
npm install gsap @gsap/react
```

```tsx
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function FeatureCard() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".card", {
      y: 24,
      autoAlpha: 0,
      duration: 0.45,
      ease: "power2.out",
    });
  }, { scope: root });

  return <div ref={root}><article className="card">Content</article></div>;
}
```

`scope: root` means `.card` only resolves inside this component. `useGSAP()` creates a GSAP context and automatically calls `revert()` on unmount, including tweens, ScrollTriggers, Draggable and SplitText created in its callback.

## Dependencies are an animation lifecycle decision

```tsx
useGSAP(() => {
  gsap.to(".card", { x: endX, duration: 0.3 });
}, { scope: root, dependencies: [endX], revertOnUpdate: true });
```

Without `revertOnUpdate`, the hook cleans up at unmount only. Use `true` when an update creates GSAP objects that must not overlap with the previous version. Do not add a dependency because ESLint asks for one; decide whether a new state should create, update or leave an animation alone.

## Events created after the hook need `contextSafe()`

```tsx
const root = useRef<HTMLButtonElement>(null);
const { contextSafe } = useGSAP({ scope: root });

const onEnter = contextSafe(() => gsap.to(".card", { scale: 1.02, duration: 0.2 }));
const onLeave = contextSafe(() => gsap.to(".card", { scale: 1, duration: 0.2 }));

return <button ref={root} onPointerEnter={onEnter} onPointerLeave={onLeave}>Explore</button>;
```

An animation created by a click, timeout or native listener runs after the hook callback, so it is not automatically part of the original context unless you wrap it. If you add a native listener yourself, still remove that exact listener in the hook cleanup.

## ScrollTrigger in a TypeScript component

Register the plugin once at module scope, but only **create a trigger** inside `useGSAP()`. Scope prevents selectors matching another route; the hook reverts tween and ScrollTrigger on unmount.

```tsx
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function FeatureReveal() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".feature-card", {
      y: 28,
      autoAlpha: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: { trigger: ".feature-grid", start: "top 75%", once: true },
    });
  }, { scope: root });

  return <section ref={root}><div className="feature-grid"><article className="feature-card">Fast</article><article className="feature-card">Clear</article><article className="feature-card">Cleaned up</article></div></section>;
}
```

If layout changes after data, an image or a font loads, call `ScrollTrigger.refresh()` **after that specific change**, never during render or on every scroll event. For desktop-only pinning/scrub, create `gsap.matchMedia()` inside the callback; the `useGSAP` context still owns cleanup.

## Accordion: React owns state; GSAP expresses it

Animation must not be the source of ARIA state. React state controls `aria-expanded` and `hidden`; GSAP animates the panel after each state change.

```tsx
import { useRef, useState } from "react";

export function FAQItem() {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    gsap.to(panel.current, {
      height: open ? "auto" : 0,
      autoAlpha: open ? 1 : 0,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, { scope: root, dependencies: [open] });

  return <div ref={root}><button aria-expanded={open} aria-controls="answer" onClick={() => setOpen((value) => !value)}>What is GSAP cleanup?</button><div id="answer" ref={panel} aria-hidden={!open}>Animations and triggers are reverted when the component unmounts.</div></div>;
}
```

`height` is layout work, but it is appropriate here because opening and closing layout is the intended outcome; do not replace it with `scaleY`, which distorts text and does not change layout. `overwrite: "auto"` prevents rapid clicks leaving competing tweens. If the panel contains focusable controls, manage focus and `inert`/`hidden` from state rather than opacity alone.

## Next.js and SSR

Put `"use client"` at the top of a client component. Do not execute `gsap.to()` during render or module evaluation that runs on the server; create animations in `useGSAP()` or client event handlers. The hook uses an isomorphic layout effect, but the component itself must still be a client component.

## Checkpoint

Build a React accordion whose state owns `aria-expanded`; fast clicks must not create duplicate animation. Add a ScrollTrigger, mount/unmount the component repeatedly in Strict Mode, then verify no selector affects another component and no stale inline style remains.

## Further reading

- [Official GSAP React guide](https://gsap.com/resources/React/)
- [useGSAP README](https://github.com/greensock/react)
