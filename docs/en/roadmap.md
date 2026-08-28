# GSAP Learning Roadmap: Beginner to Advanced

This is a practice path, not an API checklist. It follows [GSAP Learning Resources](https://gsap.com/resources/), then cross-checks the public teaching structure of [Creative Coding Club](https://www.creativecodingclub.com/bundles/creative-coding-club) and [VWLAB Mastering Web Animations](https://vwlab.io/products/web-animations). Current GSAP Docs decide any API disagreement.

## Pace and promotion rule

Work three to five sessions a week, 45-90 minutes each. Do not advance because you read the page. Advance when you can produce the artifact below from a blank file.

| Phase | Lessons | Skill | Required artifact |
| --- | --- | --- | --- |
| Setup | 00 | DOM, CSS transforms, first tween | A standalone HTML page running `gsap.to()` from CDN. |
| Core grammar | 01-03 | Tween methods, initial state, ease, stagger | A no-flash card entrance and a reduced-motion grid reveal. |
| Choreography | 04 | Timelines, labels, position parameters | A menu or modal without chained `delay` calls. |
| Safe scroll | 05 | Trigger lifecycle, scrub, pin, refresh, media queries | A desktop story section that becomes normal flow on mobile. |
| Specialization | 06-07 | Accessible text and SVG animation | One text or SVG treatment with semantics and cleanup. |
| Framework branch | 08 | React `useGSAP`, scope, updates, SSR | A component that never duplicates animation after mount/update/unmount. |
| Production | 09, 14 | Profiling, a11y, Flip, utilities, high-frequency input | A pointer interaction using `quickTo()` and a reduced-motion alternative. |
| Capstones | 10-15 | Motion systems, landing-page and creative patterns | A static-first project with a motion inventory and QA evidence. |

## Use every lesson actively

1. Run the example unchanged.
2. Predict the effect of one value change, then test it.
3. Intentionally reproduce a listed pitfall and repair it.
4. Finish the exercise without looking at the solution for 15 minutes.
5. Test keyboard input, a 375px viewport, reduced motion, console output and resize.

## Quality gate before a capstone

- Prefer transforms and opacity where they achieve the same outcome.
- Animation must not be the only source of accessibility state; semantic HTML and ARIA remain correct with motion disabled.
- Every lifecycle-owned animation, ScrollTrigger, listener and ticker is cleaned up.
- No FOUC, console errors, production markers or duplicated interactions.
- Large motion, scrubbed scroll, cursor followers and text splitting have an appropriate reduced-motion alternative.

## Optional branches

Smooth scrolling, custom cursors, preloaders, elaborate transitions and award-site effects are optional. Add one only after its content purpose, mobile behavior, fallback and teardown are defined. Lenis is third-party and never a default replacement for native scroll.

## Current paid-course benchmarks

These are benchmarks for **learning structure**, not endorsements or a reason to copy a syllabus. Catalogues and availability change, so check the landing page before buying.

| Course | Verified from its current landing page | What it contributes here | Important limit |
| --- | --- | --- | --- |
| [Creative Coding Club](https://www.creativecodingclub.com/bundles/creative-coding-club) | The current bundle advertises 250+ GSAP lessons, including Core, ScrollTrigger and SVG. | A short-lesson → demo → challenge model; the deepest vanilla-JS / creative-pattern benchmark. | It is not API authority over GSAP Docs, and React + TypeScript is not its advertised focus. |
| [VWLAB — Mastering Web Animations](https://vwlab.io/products/web-animations) | The current page lists HTML/CSS/JS & GSAP, a no-code Webflow branch and a chapter index. | A path from motion principles and core grammar to visual implementation and product work. | Validate the API version and preserve a native-scroll/reduced-motion baseline. |
| [Awwwards Academy — Animation System](https://www.awwwards.com/academy/course/design-meaningful-experiences-through-an-animation-system) | The catalogue currently lists 7 lessons / 4 hours; sample chapters include motion thinking, CTA, logo and slideshow. | Art direction, storytelling and system thinking for lessons 12–13. | It is not a GSAP/React API curriculum; use it for design decisions, not effect copying. |
| [Awwwards Academy — Creative Coding 2.0 in JS](https://www.awwwards.com/academy/course/creative-coding-2-0-in-js-animation-sound-color) | The catalogue currently lists 7 lessons with arcs, image data, particles, cursor input and colour. | Creative JavaScript, input performance and visual experiments after core is dependable. | It is not a beginner starting point and does not replace product accessibility work. |
| [Official GSAP React guide](https://gsap.com/resources/React/) + [`@gsap/react`](https://github.com/greensock/react) | Current source for `useGSAP`, scope, `contextSafe`, cleanup and SSR. | The most reliable React + TypeScript baseline; it informs lessons 08 and 12. | It is free reference material, not a video course; prefer it when paid material uses stale APIs. |

**About “viral”:** view counts, short-form clips and fluctuating marketplace rankings are not used as curriculum evidence. For GSAP, stronger signals are an active catalogue, samples that include lifecycle/a11y, and a syllabus that starts with DOM/CSS/JS core before effects. These entries were selected for verifiable sources and outlines, not hype.

## Source set

- [GSAP Resources](https://gsap.com/resources/): official learning progression.
- [GSAP Docs](https://gsap.com/docs/v3/): current core, plugin, utility and framework APIs.
- [GSAP accessibility guide](https://gsap.com/resources/a11y/): reduced motion and semantic text animation.
- [Creative Coding Club catalogue](https://www.creativecodingclub.com/pages/300-lessons-old): small lessons, challenges and tracks for core, SVG, advanced timelines, ScrollTrigger and projects. The page labels this catalogue old; use it for depth, not API authority.
- [ScrollTrigger Express](https://www.creativecodingclub.com/courses/ScrollTrigger-Express): basics, scrub/pin, responsive `matchMedia` and horizontal-scroll progression.
- [VWLAB syllabus](https://vwlab.io/products/web-animations): setup, tween grammar, stagger, easing, callbacks and timelines before visual effects.

You are ready for advanced work when you can explain `from()` versus `fromTo()`, build a labeled timeline without delay chains, debug start/end with markers, and keep the page usable with reduced motion.
