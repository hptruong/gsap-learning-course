# 07. SVG Animation

## Tổng Quan

GSAP animate SVG rất mạnh. Có thể animate transforms, colors, stroke, paths và nhiều hơn nữa.

---

## 1. SVG Transform Animation

```typescript
// Animate SVG elements như DOM elements
gsap.to(".svg-circle", {
  duration: 2,
  x: 100,
  y: 50,
  rotation: 360,
  scale: 1.5,
  ease: "power2.inOut",
});
```

---

## 2. DrawSVG - Drawing Effect

```typescript
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin);

// Draw SVG path
gsap.from(".svg-path", {
  duration: 2,
  drawSVG: "0%",    // Bắt đầu từ 0%
  ease: "power2.inOut",
});

// Draw từ giữa
gsap.from(".svg-path", {
  duration: 2,
  drawSVG: "50% 50%",  // Bắt đầu từ giữa
  ease: "power2.inOut",
});

// Draw với scroll
gsap.from(".svg-path", {
  drawSVG: "0%",
  scrollTrigger: {
    trigger: ".svg-container",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
});
```

---

## 3. MotionPath - Animate Along Path

```typescript
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

// Animate element along SVG path
gsap.to(".element", {
  duration: 3,
  motionPath: {
    path: ".svg-path",
    align: ".svg-path",
    alignOrigin: [0.5, 0.5],
    autoRotate: true,
  },
  ease: "power1.inOut",
});

// Animate along custom path
gsap.to(".element", {
  duration: 3,
  motionPath: {
    path: [
      { x: 100, y: 0 },
      { x: 200, y: 100 },
      { x: 300, y: 0 },
    ],
    curviness: 1.5,
  },
});
```

---

## 4. MorphSVG - Shape Morphing

```typescript
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.registerPlugin(MorphSVGPlugin);

// Morph one shape into another
gsap.to(".shape-1", {
  duration: 2,
  morphSVG: ".shape-2",
  ease: "power2.inOut",
});

// Morph với scroll
gsap.to(".shape-1", {
  morphSVG: ".shape-2",
  scrollTrigger: {
    trigger: ".morph-container",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
});
```

---

## 5. Stroke Animation

```typescript
// Animate stroke properties
gsap.to(".svg-path", {
  duration: 2,
  strokeDashoffset: 0,
  ease: "power2.inOut",
});

// Animate stroke width
gsap.to(".svg-path", {
  duration: 1,
  strokeWidth: 5,
  ease: "power2.out",
});

// Animate stroke color
gsap.to(".svg-path", {
  duration: 1,
  stroke: "#ff0000",
  ease: "power2.out",
});
```

---

## 6. SVG + ScrollTrigger

```typescript
// Drawing effect on scroll
const path = document.querySelector(".draw-path") as SVGPathElement;
const length = path.getTotalLength();

gsap.set(path, {
  strokeDasharray: length,
  strokeDashoffset: length,
});

gsap.to(path, {
  strokeDashoffset: 0,
  ease: "none",
  scrollTrigger: {
    trigger: ".svg-container",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
});
```

---

## 7. SVG in React

```typescript
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

function AnimatedSVG() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    gsap.from(".draw-path", {
      duration: 2,
      drawSVG: "0%",
      ease: "power2.inOut",
    });
  }, { scope: svgRef });

  return (
    <svg ref={svgRef} viewBox="0 0 200 200">
      <path
        className="draw-path"
        d="M10,50 Q50,10 90,50 T170,50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
```

---

## 🏋️ Bài Tập Thực Hành

### Bài 1: Logo Drawing

```typescript
// Tạo SVG logo (text hoặc shape)
// Animate drawing effect khi scroll vào view
// Dùng DrawSVGPlugin hoặc strokeDasharray
```

### Bài 2: Icon Animation

```typescript
// Tạo set icons (home, search, cart, user)
// Mỗi icon animate drawing khi hover
// Thêm scale + rotation effect
```

### Bài 3: Animated Illustration

```typescript
// Tạo illustration với nhiều SVG paths
// Sequence drawing effect với timeline
// Thêm color transitions
```

---

*Bài tiếp theo: [08-REACT.md](./08-REACT.md) - React + GSAP Integration*
