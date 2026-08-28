# 12. Awwwards Patterns: Learn the Decision, Not the Effect

> **Goal:** analyse, rebuild and evaluate a creative pattern against content purpose, input, mobile and accessibility instead of adding it only because it resembles an award site.

“Awwwards-style” is not an API or a visual style. It is usually strong typography, intentional art direction, considered layout and a few carefully choreographed movements. GSAP is only one part of that system.

## Write a motion brief before opening DevTools

Do not start with “I want a cursor / split text / horizontal scroll.” Answer this for **one** section:

| Question | Good answer | Sign to remove the effect |
| --- | --- | --- |
| What must the visitor understand? | A product image has three details that need a guided reading order. | The effect clarifies no content. |
| What starts the motion? | The visitor opens a gallery or the section enters the viewport. | It loops automatically over text they need to read. |
| What is the static state? | Image and caption are readable with JavaScript off. | Everything waits at `opacity: 0` for JavaScript. |
| What happens on mobile? | Images stack and next/previous controls remain available. | Visitors are forced through fake horizontal scroll. |
| What is reduced motion? | Instant image change or a short fade. | Scrub, parallax and large transforms still run. |

If those answers are unclear, it is too early to build the animation.

## Pattern 01 — Purposeful image reveal

**Use it for:** revealing a visual after a visitor opens a story or as a section enters view. Do not use it to withhold important content at page load.

Keep a real image and caption in the HTML; `clip-path` is only an enhancement:

```html
<figure class="work-card">
  <img class="work-card__image" src="shoe.jpg" alt="Orange running shoe on a grey background">
  <figcaption>01 — Velocity / Spring campaign</figcaption>
</figure>
```

```css
.work-card__image { display: block; width: 100%; }
.js .work-card__image { clip-path: inset(0 100% 0 0); }
```

```js
const image = document.querySelector(".work-card__image");

gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
  gsap.to(image, {
    clipPath: "inset(0 0% 0 0)",
    duration: 0.7,
    ease: "power3.inOut",
    scrollTrigger: { trigger: image, start: "top 75%", once: true },
  });
});
```

The image is still useful if script fails, motion affects a visual mask only, and the caption is not split or hidden from assistive tech. Test large images on a real phone: `clip-path` plus a large image can be paint-heavy.

## Pattern 02 — Kinetic type with intact semantics

Kinetic type can create a strong moment and can easily make a screen reader read every character. The source must be a normal heading; SplitText is temporary DOM with cleanup.

```html
<h2 class="manifesto">Build for people, not a reel.</h2>
```

```js
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const split = SplitText.create(".manifesto", { type: "words", aria: "auto" });
gsap.from(split.words, {
  yPercent: 110,
  autoAlpha: 0,
  duration: 0.55,
  stagger: 0.045,
  ease: "power3.out",
  scrollTrigger: { trigger: ".manifesto", start: "top 80%", once: true },
});

// In an SPA/component teardown:
// split.revert();
```

Do not manually `split("")`, animate a heading containing a link/button, or use a long stagger to delay a sentence the visitor needs. If fonts load late or layout changes, split after `await document.fonts.ready` and revert before splitting again.

## Pattern 03 — Magnetic buttons are feedback, not navigation state

Magnetism can work for a secondary CTA or a generously sized portfolio card. It does not replace `:hover`, focus rings or pressed state. Pointer input is high frequency, so use `quickTo()` instead of creating a new tween on every move.

```js
const button = document.querySelector(".magnetic");
const xTo = gsap.quickTo(button, "x", { duration: 0.24, ease: "power3.out" });
const yTo = gsap.quickTo(button, "y", { duration: 0.24, ease: "power3.out" });

button.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch") return;
  const rect = button.getBoundingClientRect();
  xTo((event.clientX - rect.left - rect.width / 2) * 0.18);
  yTo((event.clientY - rect.top - rect.height / 2) * 0.18);
});
button.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
```

Keep it a native `button` or `a`, preserve `:focus-visible`, and disable the effect for reduced motion. Do not make every link on a site magnetic or attach a custom cursor everywhere.

## Pattern 04 — Pin only when story space improves

A useful pinned section has one idea, two to four states, a bounded scroll range and a mobile fallback. It is not a mandatory landing-page container.

```js
const mm = gsap.matchMedia();

mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
  const story = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: ".feature-story",
      start: "top top",
      end: "+=1200",
      scrub: 0.8,
      pin: true,
    },
  });

  story
    .to(".story-image", { scale: 1.04 })
    .to(".story-copy--one", { autoAlpha: 0, y: -24 }, 0.35)
    .fromTo(".story-copy--two", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0 }, 0.35);
});
```

Pin `.feature-story` and animate `.story-image` inside it; never animate the pinned element itself. On mobile, CSS must expose all story copy in normal vertical flow **without GSAP**. Do not put ScrollTrigger on a child tween inside a timeline.

## React + TypeScript: every pattern has a lifecycle

In React, create a pattern after render and revert it on teardown. `useGSAP` with a scope is the baseline:

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function ProjectTeaser() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".teaser__image", {
      clipPath: "inset(0 100% 0 0)",
      duration: 0.7,
      ease: "power3.inOut",
    });
  }, { scope: root });

  return <section ref={root}><img className="teaser__image" alt="Project preview" src="/preview.jpg" /></section>;
}
```

Use `contextSafe()` for animation created by handlers after the hook runs. When a dependency changes layout, consider `revertOnUpdate: true`; do not query globally or leave inline styles behind during route changes.

## Review inspiration through five layers

When studying Awwwards, do not only record the screen. Pause each state and document it:

| Layer | Reverse-engineering question | Evidence to capture |
| --- | --- | --- |
| Narrative | Where is the visitor and what is the next action? | A static screenshot still communicates hierarchy. |
| Layout | Which crop, type scale and breakpoint change? | Desktop and 375px screenshots. |
| State | What DOM/CSS state exists before motion? | JS-off or throttled-load test. |
| Motion | What are the trigger, duration, ease and cancel/reverse behavior? | Timeline labels, not guessed durations. |
| Quality | Does keyboard, touch, reduce motion and a slow GPU hold up? | QA matrix and performance recording. |

A beautiful site does not mean its pattern is right for your product. Copy decisions—hierarchy, pacing, reveal intent—not surfaces such as cursor effects, noise or scroll-jacking.

## Exercise: a constrained rebuild

Choose one project from the [Awwwards GSAP collection](https://www.awwwards.com/websites/gsap-animation/) and rebuild **one** section:

1. Capture its static state, write a motion brief, then build responsive HTML/CSS first.
2. Choose exactly one pattern: image reveal, kinetic title, magnetic CTA **or** pinned story.
3. Build the reduced-motion and mobile normal-flow variants before polishing desktop.
4. Record ten seconds at desktop, 375px, keyboard-only and reduced motion.
5. Write three lines: how the effect helps the narrative, which effect you intentionally rejected, and why.

**Done when:** content works with JavaScript off; no scroll-jacking; motion is not the source of accessibility state; no ScrollTrigger/listener survives unmount; and you can explain why the pattern exists.

## Further study

- [GSAP accessibility guide](https://gsap.com/resources/a11y/)
- [SplitText documentation](https://gsap.com/docs/v3/Plugins/SplitText/)
- [Common ScrollTrigger mistakes](https://gsap.com/resources/st-mistakes/)
- [Awwwards Academy: Animation system](https://www.awwwards.com/academy/course/design-meaningful-experiences-through-an-animation-system)
