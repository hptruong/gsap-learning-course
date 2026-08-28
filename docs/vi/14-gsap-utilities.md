# 14. GSAP Utilities và High-Frequency Interaction

> **Mục tiêu:** biến phép tính lặp lại thành helper rõ ràng và tránh tạo tween mới ở mỗi pointer event.

## Utility nên học trước

```js
const clamp = gsap.utils.clamp(0, 1);
const progress = clamp(rawProgress);
const x = gsap.utils.mapRange(0, window.innerWidth, -40, 40, pointerX);
const index = gsap.utils.wrap(0, items.length, currentIndex + 1);
const nearest = gsap.utils.snap(8, value);
```

| Utility | Khi dùng |
| --- | --- |
| `toArray()` | Chuẩn hóa selector/NodeList thành array. |
| `clamp()` | Giới hạn value, ví dụ progress 0-1. |
| `mapRange()` / `normalize()` | Map pointer/scroll/data sang range khác. |
| `wrap()` | Index carousel hoặc loop có giới hạn. |
| `snap()` | Làm tròn về step hợp lệ. |
| `interpolate()` | Nội suy màu, số hoặc object. |
| `pipe()` | Ghép transform dữ liệu nhỏ. |

## `quickTo()` cho pointer follower

```js
const xTo = gsap.quickTo(".cursor", "x", { duration: 0.25, ease: "power3.out" });
const yTo = gsap.quickTo(".cursor", "y", { duration: 0.25, ease: "power3.out" });

function moveCursor(event) {
  xTo(event.clientX);
  yTo(event.clientY);
}

window.addEventListener("pointermove", moveCursor);
// teardown: window.removeEventListener("pointermove", moveCursor)
```

`quickTo()` tái sử dụng tween thay vì tạo một tween mới cho mỗi event. Chỉ bật pattern này cho pointer chính xác và `prefers-reduced-motion: no-preference`; touch không cần cursor follower.

## Ticker và cleanup

`gsap.ticker` hữu ích khi bạn cần đồng bộ một cập nhật per-frame với GSAP. Nó không tự tốt hơn `requestAnimationFrame` cho mọi việc. Luôn lưu function reference:

```js
const update = (time) => render(time);
gsap.ticker.add(update);
// teardown
gsap.ticker.remove(update);
```

## Bài tập

Tạo magnetic button: map pointer position trong button sang `x/y` giới hạn bằng `clamp`, cập nhật bằng `quickTo`, reset khi leave, tắt trên touch/reduced motion.

**Tiêu chí đạt:** không tạo tween trong mỗi `pointermove`; listener được remove; button vẫn click và focus bình thường.

## Đọc thêm

- [Utility Methods](https://gsap.com/docs/v3/GSAP/UtilityMethods/)
