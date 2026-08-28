# 13. Motion Design for Developers: Design Relationships, Not Just Durations

> **Goal:** turn static UI into a coherent motion system through hierarchy, spatial continuity, timing tokens and feedback—not random ease choices per component.

Motion is not a polish layer added at the end. Layout, reading order, contrast and interaction state decide which motion is meaningful. If the static component is unclear, animation only makes the problem harder to see.

## Four principles you can apply to UI

| Principle | Question while coding | Good example | Common failure |
| --- | --- | --- | --- |
| Hierarchy | Where should the eye go first? | Title enters before supporting copy; CTA stays stable. | Every element receives the same stagger. |
| Spatial continuity | Where does an object go when state changes? | Detail grows from the card that was clicked. | A modal appears from an unrelated corner. |
| Causality | What did the visitor do and what changed? | Button press gives clear loading/complete feedback. | Decorative bounce after a serious action. |
| Restraint | Does motion compete with content? | One primary transition in a viewport. | Parallax, marquee and cursor all run together. |

## Start with a state map

Do not write `gsap.to()` before knowing state. For a card expansion:

| State | Visual | Semantic / interaction | Motion role |
| --- | --- | --- | --- |
| Rest | Compact card, CTA visible | Button `aria-expanded="false"` | No motion needed. |
| Pressed | Focus remains on button | `aria-expanded="true"` immediately | 100–200ms feedback. |
| Open | Detail and close control appear | Focus moves deliberately if it is a dialog | Continuity from card to detail. |
| Close | Original card returns | Focus returns to trigger | Reverse or short transition. |

Accessibility state must not wait for `onComplete`. Code state first; GSAP only expresses its visual state.

## Create motion tokens instead of magic numbers

A product does not need twenty eases. Start with purpose-named tokens:

```js
export const motion = {
  duration: { feedback: 0.16, enter: 0.42, transition: 0.55 },
  ease: { enter: "power3.out", state: "power2.inOut", data: "none" },
  distance: { small: 8, medium: 20 },
};
```

```js
gsap.from(".dialog__content", {
  y: motion.distance.medium,
  autoAlpha: 0,
  duration: motion.duration.enter,
  ease: motion.ease.enter,
});
```

Tokens are a starting point, not physics. If a component needs slower reading time, document why; do not copy a hero duration into a tooltip just for “brand consistency”.

## What does easing tell a visitor?

- `power3.out`: content enters, establishes quickly, then settles to read.
- `power2.inOut`: two states have equal weight, such as tabs or a panel.
- `none`: progress, data and scroll must preserve a 1:1 relationship.
- `back.out(...)`: small feedback with personality; not a modal/form default.

Duration and distance work together. Eight pixels over .8 seconds feels laggy; eighty pixels over .12 seconds feels like teleporting. Test on touch/mobile speed, not desktop mouse only.

## Critique a noisy sequence

**Before:** title, image, nav and six cards all fade/scale/bounce; CTA arrives after 1.8 seconds.

**After:**

1. Navigation and CTA are available immediately—they are navigation, not a reward.
2. Eyebrow → title → supporting copy use one `power3.out` timeline.
3. Product image reveals after title, without competing with reading order.
4. Features reveal only on scroll; reduced motion leaves them visible.
5. A decorative loop only runs when it cannot obscure content.

This is hierarchy through motion: removing effects often feels more premium than adding them.

## React + TypeScript: tokens do not replace lifecycle

```tsx
const motion = { enter: 0.45, ease: "power3.out" } as const;

useGSAP(() => {
  gsap.from(".product-title", { y: 20, autoAlpha: 0, duration: motion.enter, ease: motion.ease });
}, { scope: root });
```

Imported tokens do not make selectors safe. Scope the root, clean up and create motion in the client lifecycle. When app theme/reduced-motion settings change, use `gsap.matchMediaRefresh()` or deliberately recreate context instead of mutating global tweens.

## Exercise: a motion critique with evidence

1. Choose a feature card or modal in your project.
2. Draw rest / pressed / open / close and write semantic state for each.
3. Choose at most two durations, two eases and two distance tokens.
4. Implement the transition; record normal and reduced motion.
5. Delete one effect without making the product less clear; explain why.

**Done when:** visitors know what matters first; state/focus remains correct with animation disabled; no two primary motions compete in one viewport; and tokens are named by intent.

## Further reading

- [GSAP easing guide](https://gsap.com/docs/v3/Eases/)
- [GSAP accessibility guide](https://gsap.com/resources/a11y/)
