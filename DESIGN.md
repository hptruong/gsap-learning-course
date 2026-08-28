---
version: alpha
name: GSAP Studio
description: "A focused learning environment for GSAP practice and bilingual documentation."
colors:
  primary: "#8794FF"
  primary-strong: "#5264DD"
  on-primary: "#FFFFFF"
  secondary: "#D9FF77"
  tertiary: "#FF9E7A"
  canvas: "#0B0D1A"
  surface: "#121527"
  surface-raised: "#181C33"
  on-surface: "#ECEDFF"
  reading: "#D3D5E7"
  muted: "#A3A7C7"
  quiet: "#676B8A"
  border: "#292E4A"
  border-strong: "#3A4162"
  focus: "#B7C4FF"
  code: "#0A0C17"
  light-canvas: "#F5F6FB"
  light-surface: "#FFFFFF"
  light-on-surface: "#171A2D"
  light-reading: "#30364A"
  light-focus: "#3049C6"
typography:
  display:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: 52px
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: -0.045em
  headline-lg:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: 29px
    fontWeight: 700
    lineHeight: 1.28
    letterSpacing: -0.045em
  headline-md:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: 21px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.03em
  body-lg:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.78
  body-md:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.7
  label-md:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.4
  meta:
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: 0.08em
  code:
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.8
rounded:
  sm: 6px
  md: 8px
  lg: 11px
  xl: 16px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  sidebar: 294px
  header: 68px
  reading-measure: 790px
components:
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.canvas}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm}"
  lesson-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  code-block:
    backgroundColor: "{colors.code}"
    textColor: "{colors.reading}"
    typography: "{typography.code}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  button-secondary-hover:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
  raised-surface:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  document-divider:
    backgroundColor: "{colors.border}"
    height: "{spacing.xxs}"
  strong-divider:
    backgroundColor: "{colors.border-strong}"
    height: "{spacing.xxs}"
  metadata-label:
    textColor: "{colors.quiet}"
    typography: "{typography.meta}"
  light-document-shell:
    backgroundColor: "{colors.light-canvas}"
    textColor: "{colors.light-reading}"
    typography: "{typography.body-lg}"
  light-panel:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-on-surface}"
    rounded: "{rounded.md}"
  focus-ring:
    backgroundColor: "{colors.focus}"
    rounded: "{rounded.sm}"
  light-focus-ring:
    backgroundColor: "{colors.light-focus}"
    rounded: "{rounded.sm}"
---

# GSAP Studio Design System

## Overview

GSAP Studio is a purposeful learning environment for Vietnamese-first GSAP practice and bilingual documentation. It should feel like a calm, precise motion workshop: technical enough for code, spacious enough for long reading, and expressive only where motion itself is being taught.

The product has two surfaces with one visual identity:

- **React practice canvas (`src/`)** — minimal by design. A learner should see one target, one animation and one change at a time.
- **Learning documentation (`docs/`)** — a structured course with progress, interactive motion labs and long-form technical reading.

The intended response is confidence, not spectacle. Prefer a strong hierarchy, visible state and deliberate pacing over gradients, glass effects, decorative cursors, scroll-jacking or a card grid that hides the course order.

## Colors

The palette uses near-black blue surfaces to reduce glare during extended coding sessions. Violet is the conceptual/navigation signal, lime is a reserved positive/action signal, and coral is a contrasting caution or secondary visual layer.

- **Primary (`#8794FF`):** links, selected navigation, concept markers and active-but-not-complete UI.
- **Secondary (`#D9FF77`):** one primary action per local view, course completion and positive feedback. It must never be the only state signal.
- **Tertiary (`#FF9E7A`):** caution, contrast in motion diagrams and limited supporting emphasis; it is not an error color.
- **Canvas and surfaces:** `canvas`, `surface` and `surface-raised` create depth through tonal separation and borders, not heavy shadows.
- **Text:** `on-surface` is primary UI text, `reading` is article prose and `muted`/`quiet` are supporting information. Do not use muted color for a full paragraph that a learner must read.
- **Light theme:** use the `light-*` tokens rather than reusing dark text colors on a light background. In particular, body prose maps to `light-reading`.

Text and essential icon contrast must meet WCAG AA. Focus uses `focus` / `light-focus`, never the lime completion color.

## Typography

**Be Vietnam Pro** is the single UI and reading family because it renders Vietnamese diacritics reliably while remaining clear at technical reading sizes. **DM Mono** distinguishes code, time estimates and compact metadata without becoming the dominant voice.

Use the defined typography roles. Do not invent a new font size for a one-off component when an existing role fits.

- `display` is limited to the home hero or a single high-priority statement.
- `headline-lg` structures article sections; `headline-md` structures a local concept or component.
- `body-lg` is the default long-form reading role. It must remain comfortable at 100% browser zoom.
- `label-md` is for controls and navigation, not paragraph copy.
- `meta` is compact supporting data only. Metadata cannot carry required instructions.
- `code` is the code-block role. Inline code keeps the surrounding prose size and changes only family/surface so it remains readable in a Vietnamese sentence.

Use sentence case for reader-facing controls unless an all-caps mono label is explicitly metadata. Avoid more than three weights in a single view.

## Layout

The documentation layout uses a fixed 294px sidebar, a 68px sticky top header and a reading measure capped at 790px. The sidebar brand remains sticky inside its independently scrolling area. The on-page table of contents is a wide-desktop enhancement and must disappear before it can overlap an article.

Spacing follows the 4px base scale in the frontmatter. Use the next scale step before introducing a custom gap. Group related material through whitespace and a thin border; do not put every group in a raised card.

- Desktop article content centres within the available space and never relies on a TOC for usable width.
- At 850px and below, navigation becomes off-canvas and the article uses the available width with safe side padding.
- At 375px, tables and code scroll inside their own containers; the document itself must not overflow horizontally.
- Hover movement uses transform/opacity. Do not change padding, width, height or document flow on hover.

## Elevation & Depth

Depth is primarily tonal: canvas → surface → surface-raised, separated by `border` or `border-strong`. Use shadows only for temporary floating layers such as the search dialog and mobile navigation.

Avoid glow, blur-heavy cards and large elevation on ordinary course content. A border indicates structure; a raised tonal layer indicates an interactive or contained state. Code blocks always use the dark `code` surface in both themes to preserve syntax contrast.

## Shapes

The system is technically soft, not pill-heavy:

- Use `sm` (6px) for buttons, compact controls and inline code.
- Use `md` (8px) for code blocks, input fields and local containers.
- Use `lg` (11px) for motion labs and major content surfaces.
- Use `xl` (16px) only for the practice stage or a large visual container.
- Use `full` only for progress rails, status dots and explicitly circular controls.

Do not mix sharp zero-radius panels, oversized 24px cards and pills in the same component group without a semantic reason.

## Components

### Course sidebar and header

The sidebar is persistent orientation, not a dashboard. It exposes course progress, phase grouping, current lesson and reference routes. The GSAP Studio brand/header stays visible while the lesson list scrolls. The global header provides search, language and theme controls without competing with the lesson title.

Selected navigation combines violet, background and position; completion combines an icon and text/color. Both states must be distinguishable without color alone.

### Lesson header and reading content

A lesson header contains course context, phase, approximate effort, measurable outcome and an optional completion action. Its purpose is to frame a task before prose begins. Article prose uses `body-lg`; tables and callouts may be smaller only when they are supporting reference, never a substitute for readable explanation.

### Buttons, links and inputs

- A primary action uses `button-primary`; use at most one per local decision area.
- Secondary/utility actions use the surface treatment and a clear border.
- Every interactive target exposes `:focus-visible` with the focus token and at least a 3px outline offset from surrounding content.
- Disabled controls are visibly unavailable and do not rely on a pointer cursor alone.
- Inputs expose a focus-within state in addition to the browser focus outline.

### Code blocks, tables and scrollbars

Code blocks have a language label, copy action, local horizontal scroll and readable `code` typography. Tables are reference content, have visible dividers and scroll locally on small screens. Scrollbars are styled as quiet surface rails with a visible thumb: violet on code/search surfaces, tonal border on document/sidebar surfaces, lime only while actively pressed.

### Motion labs and practice canvas

A Motion Lab visually explains one concept before or alongside the runnable sample. It must still have a static understandable state if GSAP fails or reduced motion is requested. The React practice canvas starts with one stage and one target; do not create a reusable demo framework before a learner has repeated the pattern.

### Tailwind implementation policy

Tailwind is not currently installed in the minimal practice canvas. If it is added intentionally, it must consume these token values through the Tailwind theme or CSS variables.

Class strings follow this stable order:

1. layout and position
2. sizing
3. spacing
4. typography
5. visual treatment (color, border, shadow)
6. interaction and transition
7. responsive/state variants

Use utilities directly for a one-off rule. When a semantic pattern repeats, extract a React component first. Extract a named CSS class only for a stable multi-property primitive, pseudo-element or animation behavior; names describe role (`lesson-card`, `practice-stage`), never generic containers (`box`, `wrapper`, `inner`). Use `@apply` only for a documented primitive, not to hide a page-specific utility string. Avoid arbitrary values when a token or standard scale exists, conflicting utilities and nested conditional class strings.

## Do's and Don'ts

- **Do** start with static semantic HTML and usable controls; use GSAP as progressive enhancement.
- **Do** use `x`, `y`, scale, rotation, opacity and `autoAlpha` for visual movement.
- **Do** use a GSAP timeline with labels for a multi-step sequence and `useGSAP` with a scoped root in React.
- **Do** provide a reduced-motion variant, cleanup for component-owned animation and a visible keyboard focus state.
- **Do** test dark/light contrast, 375px, wide desktop, code/table overflow and the sidebar/header/TOC for overlap.
- **Don't** hide initial content in base CSS while waiting for JavaScript.
- **Don't** animate layout properties for movement, chain choreography with delays, or put ScrollTrigger on a child tween in a timeline.
- **Don't** use more than one primary lime action in the same local decision area.
- **Don't** use colour as the sole indicator of selected, complete, invalid or focused state.
- **Don't** add Tailwind, a UI library or a component abstraction merely to style one practice example.
