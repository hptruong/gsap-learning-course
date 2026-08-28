# GSAP Studio — Learning Experience System

## Audit: why the previous experience failed learners

The former site had a correct documentation shell (sidebar, article, TOC) but it was optimized for **reference lookup**, not deliberate practice:

1. **No learning state.** A learner could not see where they were, what was complete, or which lesson came next.
2. **No lesson framing.** Goals existed as Markdown blockquotes but were visually identical to a note. Reading intent, estimated effort and an explicit completion action were missing.
3. **Flat curriculum.** Sixteen items appeared as one long library. Beginner/core/advanced boundaries and the artifact-driven progression in `roadmap.md` were invisible.
4. **Low information hierarchy.** Dense grayscale navigation, small typography and generic cards made the learning order hard to scan. The visual language did not communicate “motion”.
5. **Docs-first interaction.** Search, TOC and official-doc link were prominent; practice and self-check were not.

The content is technically sound and bilingual; the redesign preserves its Markdown source and official GSAP links while changing the experience around it.

## Research-informed decisions

This system uses durable documentation and learning patterns rather than copying a marketing site:

| Reference | Principle applied |
| --- | --- |
| [GOV.UK Design System](https://design-system.service.gov.uk/) | Make the next action obvious; use plain labels and predictable navigation. |
| [IBM Carbon](https://carbondesignsystem.com/) | Semantic tokens, a disciplined spacing scale, visible states and accessible contrast. |
| [Material Design 3](https://m3.material.io/) | Clear hierarchy, state feedback and responsive adaptation rather than desktop compression. |
| [MDN Learn](https://developer.mozilla.org/en-US/docs/Learn) | Progressive modules, explicit prerequisites and task-oriented learning. |
| [GSAP Learning Resources](https://gsap.com/resources/) | Foundation first; scroll/plugins/framework work only after core tween and timeline grammar. |

## Product model

**GSAP Studio is a guided studio, not a docs clone.** The home page answers: *what will I make, where do I start, and how far have I come?* A lesson answers: *why am I learning this, what is the smallest successful outcome, and what do I do next?*

### Curriculum hierarchy

- **Phase 01 — Motion foundations:** setup, tweens, easing, stagger, timelines.
- **Phase 02 — Flow & interaction:** ScrollTrigger, text, SVG, React lifecycle.
- **Phase 03 — Design to ship:** performance, capstone, product patterns, motion design and utilities.

The original page order remains canonical in `site.config.mjs`. Reference routes remain available but are not presented as prerequisites.

### Components and behavior

| Component | Job |
| --- | --- |
| Course progress | Stores completed lessons locally, shows `n/16` and percentage in the sidebar. It is optional and never gates content. |
| Phase rail | Groups every lesson by difficulty/use case with a short outcome statement. |
| Lesson header | Promotes existing Markdown title and goal into course context, duration, outcome and completion action. |
| Practice signal | Detects exercise/checkpoint headings to visually distinguish doing from reading. |
| TOC | Remains available at wide widths only; it never shrinks the reading column below a usable measure. |
| Search | Keyboard accessible via Cmd/Ctrl + K, search-first instead of visual clutter. |

## Tokens and accessibility

- Dark canvas `#0b0d1a`, raised surfaces and `#ecedff` text create a high-contrast reading environment. Light mode maps the same semantic tokens to paper surfaces.
- Violet denotes navigation and concepts; lime denotes progress/success; coral is reserved for cautions. Color never carries state alone: completion also has an icon and label.
- Reading width is capped at 760px. Desktop controls preserve a separate 210px TOC; mobile removes it instead of squeezing the article.
- Every interactive control has a visible border/focus-capable native control. Motion honors `prefers-reduced-motion`.
- The only decorative GSAP entrance timeline animates `y` and `autoAlpha`, is skipped for reduced motion, and leaves content usable if the CDN cannot load.

## Content standard: docs → learning

Every lesson should keep this sequence:

1. A measurable goal (the existing `> **Mục tiêu:**` / `> **Goal:**` block).
2. A smallest runnable example before a list of options.
3. Explanation of the one concept changed by that example.
4. A deliberate exercise/checkpoint that can be completed from a blank file.
5. Acceptance criteria, an accessibility/reduced-motion note where relevant, and official GSAP links for API depth.

This scaffolding is now rendered by the UI. Future lessons should preserve the goal block and use `## Bài tập`, `## Checkpoint`, `## Exercise`, or `## Practice` for their doing section.
