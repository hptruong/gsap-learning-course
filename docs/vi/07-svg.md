# 07. SVG Animation: Transform, Draw, Morph và Motion Path

> **Mục tiêu:** biết SVG cần chuẩn bị gì trước khi animate và chọn đúng plugin cho stroke, shape hoặc đường đi.

## Nền tảng SVG cần hiểu

`viewBox` là hệ tọa độ nội bộ; CSS width/height là kích thước hiển thị. Animate một `<g>` khi nhiều path cần di chuyển cùng nhau. Với SVG, `transformOrigin` và `svgOrigin` khác nhau: dùng `transformOrigin` cho origin của chính element, `svgOrigin` khi nhiều SVG element cần quay quanh một điểm chung trong SVG coordinate space.

```html
<svg viewBox="0 0 200 100" role="img" aria-label="Đường biểu diễn tăng trưởng">
  <path class="chart-line" d="M10,80 L70,55 L130,65 L190,15" fill="none" stroke="currentColor" stroke-width="6" />
</svg>
```

## DrawSVG: vẽ stroke có sẵn

```js
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);
gsap.fromTo(
  ".chart-line",
  { drawSVG: "0% 0%" },
  { drawSVG: "0% 100%", duration: 0.8, ease: "power1.inOut" },
);
```

DrawSVG reveal stroke, không animate fill. Target cần `stroke` và `stroke-width` nhìn thấy được. Giá trị `"20% 80%"` nghĩa là chỉ hiện đoạn giữa path; nó không phải duration.

## MorphSVG: chuyển một shape sang shape khác

```js
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);
gsap.to("#source", { morphSVG: "#target", duration: 0.7, ease: "power2.inOut" });
```

MorphSVG có thể chuẩn hóa khác biệt số điểm, nhưng target phải là SVG shape hỗ trợ. Dùng `MorphSVGPlugin.convertToPath()` cho `circle`, `rect`, `ellipse` hoặc `line` khi cần. Nếu shape xoắn giữa chừng, thử `shapeIndex: "log"` trong development để lấy index phù hợp rồi lưu số đó vào code.

## MotionPath: di chuyển theo đường

```js
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);
gsap.to(".plane", {
  duration: 2,
  motionPath: { path: "#route", align: "#route", alignOrigin: [0.5, 0.5], autoRotate: true },
});
```

`alignOrigin` là origin của target, không phải SVG. Test path ở nhiều kích thước vì viewBox, CSS sizing và transform có thể làm lệch target.

## Bài tập

Tạo icon có một stroke reveal và một plane theo path. Thêm `aria-label` hoặc `aria-hidden="true"` tùy SVG có mang nội dung hay chỉ trang trí.

**Tiêu chí đạt:** stroke có `fill="none"`; animation không phụ thuộc kích thước cố định; SVG meaningful có tên cho assistive technology.

## Đọc thêm

- [SVG guide](https://gsap.com/resources/svg/)
- [DrawSVG](https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/)
- [MorphSVG](https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/)
- [MotionPath](https://gsap.com/docs/v3/Plugins/MotionPathPlugin/)
