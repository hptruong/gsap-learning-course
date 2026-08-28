# 07. SVG Animation

SVG is most predictable when its markup, viewBox, and transforms are understood before animation. Prefer GSAP transforms such as `x`, `rotation`, and `transformOrigin`.

```js
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);
gsap.from(".path", { drawSVG: "0%", duration: 0.8, ease: "power1.inOut" });
```

DrawSVG reveals an existing stroke. The target must have a visible `stroke` and `stroke-width`; it does not draw a fill. Use MorphSVG only for compatible shapes, and check the official docs before normalizing source paths.

## Checkpoint

Draw a stroked path, then animate an SVG group with a transform. Verify the animation still works at a different viewBox size.
