# Repository instructions

## Scope and source of truth

This is a GSAP learning repository with two independent surfaces:

- `src/` is a deliberately minimal React + TypeScript practice canvas. It is for learning one GSAP concept at a time.
- `docs/` is the bilingual GSAP Studio course. Author lessons in `docs/vi/` and `docs/en/`; `docs/_site/` is generated static output.
- [`DESIGN.md`](DESIGN.md) is the visual-system source of truth. [`docs/DESIGN.md`](docs/DESIGN.md) adds documentation-site implementation context.

Keep `src/` small. Do not restore the former demo catalogue, router, UI kit, state library or icon library unless the task explicitly requires it. Do not edit files in `docs/_site/` by hand.

## Setup and commands

Use `pnpm`; do not use npm, yarn or npx commands.

```bash
pnpm install
pnpm dev                         # React practice canvas: http://localhost:3000
pnpm build                       # TypeScript + Vite production build
pnpm lint                        # Lint source
pnpm docs:check                  # Validate docs routes and locales
pnpm docs:build                  # Generate docs/_site
pnpm docs:dev                    # Serve docs at http://127.0.0.1:4173
pnpm dlx @google/design.md lint DESIGN.md
```

## Change workflow

1. Inspect the relevant source and existing conventions before editing.
2. Make the smallest complete change that solves the task. Preserve user changes outside that scope.
3. Update both locale sources for a documentation-content change.
4. Run the applicable verification before handoff:
   - `src/`, dependency, TypeScript or Vite changes: `pnpm build`
   - docs source, builder, app or theme changes: `pnpm docs:check && pnpm docs:build`
   - root design-system changes: `pnpm dlx @google/design.md lint DESIGN.md`
5. State the changed paths and the commands actually run. Do not claim a visual/browser check that was not performed.

## React and TypeScript

- Use function components and strict TypeScript. Type DOM refs explicitly, for example `useRef<HTMLDivElement>(null)`.
- Start with a single `App` and extract a component only after a repeated, named responsibility exists.
- A component owns its markup, local state, refs, event listeners and teardown. Avoid global mutable UI state and `document.querySelector()` in React components.
- Use semantic HTML, valid heading order, native buttons/links and visible `:focus-visible` states. JavaScript and animation cannot be the only source of a control's state or meaning.
- Do not run GSAP during render. Do not use `any`, `@ts-ignore`, untyped event handlers or unused dependencies to bypass a problem.

## GSAP and motion

- Use the official GSAP API and current documentation. Import/register a plugin once before using it.
- In React, prefer `useGSAP(() => { ... }, { scope: root })`; scope selector text to a root ref and use direct refs for a single target.
- `useGSAP` reverts its context on teardown. Wrap GSAP work created later by an event handler in `contextSafe`; remove native DOM listeners manually.
- Prefer `x`, `y`, `scale`, `rotation`, `autoAlpha` and opacity for visual movement. Use layout properties only when changing layout itself is the intended UI result.
- Use a timeline with labels/position parameters for a sequence. Do not coordinate a sequence with chained delays.
- Use `gsap.matchMedia()` for responsive and `prefers-reduced-motion` variants. Do not use global timeline speed as an accessibility fallback.
- ScrollTrigger belongs on a top-level tween or timeline, never a child tween. Register it first, remove production markers, refresh only after a real layout change and clean it up on unmount.
- For non-trivial motion, check reduced motion, keyboard interaction, resize and component unmount.

## Styling

Follow the semantic tokens, typography roles, layout limits, contrast requirements and component rules in [`DESIGN.md`](DESIGN.md).

- `src/` currently uses plain CSS. Do not introduce Tailwind for a one-off style.
- If Tailwind is explicitly added, use the class-order and utility/reuse policy defined in `DESIGN.md`; do not duplicate it in components.
- Use semantic CSS variables/tokens rather than copy-pasted colors, spacing, shadows or durations.
- Keep prose and inline code readable. Avoid hover layout shift; prefer transforms and opacity.
- Preserve dark/light contrast, focus-visible, disabled, touch and reduced-motion states.

## Documentation

- `docs/site.config.mjs` is the route/order registry. Keep filenames and both locales aligned with it.
- Every lesson needs a measurable goal, a smallest runnable example, a deliberate exercise/checkpoint, acceptance criteria and official GSAP references.
- Build generated docs after any change to Markdown, locale JSON, `docs/build.mjs`, `docs/app.js` or `docs/theme.css`.
- Keep GSAP Studio navigation, course completion, local overflow, responsive layout and reduced-motion behavior usable when enhancing docs UI.

## Review checklist

Before committing, verify there is no unintended generated-file edit, no stale import, no leaked animation/listener, no broken focus behavior, no layout overlap at relevant breakpoints and no skipped required check.
