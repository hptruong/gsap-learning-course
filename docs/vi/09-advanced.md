# 09. Production: Performance, Accessibility và UI Plugins

> **Mục tiêu:** ship animation đo được, có fallback và cleanup, không chỉ “mượt trên máy tôi”.

## Performance đúng cách

Ưu tiên `x`, `y`, `scale`, `rotation` và `opacity` khi chúng tạo được kết quả mong muốn. Chúng thường tránh layout work, nhưng không bảo đảm GPU hay 60fps. Profile trên thiết bị thật, nhất là khi có ảnh lớn, blur, filter, pin hoặc nhiều element.

```css
/* Chỉ thêm cho element thực sự sắp animate, không gắn toàn bộ site. */
.hero-art { will-change: transform; }
```

Sau animation dài hoặc state cuối ổn định, bỏ hint nếu không còn cần: `gsap.set(".hero-art", { clearProps: "willChange" })`. Không dùng `will-change` hoặc `force3D` như “thuốc chữa bách bệnh”.

## Reduced motion là thiết kế khác, không phải tăng tốc global

```js
const mm = gsap.matchMedia();
mm.add(
  { reduce: "(prefers-reduced-motion: reduce)", desktop: "(min-width: 800px)" },
  (context) => {
    const { reduce, desktop } = context.conditions;
    gsap.from(".hero-art", {
      autoAlpha: 0,
      y: reduce ? 0 : 32,
      duration: reduce ? 0 : 0.55,
    });
    if (desktop && !reduce) gsap.to(".background", { y: -80, scrollTrigger: { scrub: true } });
  },
);
```

Bỏ decorative motion; giữ functional feedback như progress hoặc trạng thái lỗi, nhưng đơn giản hóa nó. Không thay `gsap.globalTimeline.timeScale()` làm policy toàn trang.

## Flip: animate thay đổi layout

```js
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);

const state = Flip.getState(".product-card");
grid.classList.toggle("is-list"); // thay đổi DOM hoặc class trước
Flip.from(state, { duration: 0.45, ease: "power2.inOut", absolute: true });
```

Trình tự là **capture state -> thay layout -> Flip.from**. Trong React, state update render bất đồng bộ; capture state trước update và gọi `Flip.from()` sau khi DOM mới commit, thường trong layout effect. Stable `data-flip-id` giúp match element khi list đổi vị trí.

## Draggable và Observer

`Draggable` phù hợp drag trực tiếp; `inertia: true` cần `InertiaPlugin`. `Observer` chuẩn hóa wheel/touch/pointer gesture, không thay thế ScrollTrigger. Chỉ thêm chúng khi interaction có button/keyboard/fallback cho touch và có lifecycle destroy rõ ràng.

## Quy trình QA

1. Chrome Performance: kiểm tra long task, layout shift và frame drop.
2. Resize, slow network, font/ảnh tải trễ, mobile viewport.
3. Keyboard, reduced motion, screen reader cho content text.
4. Mount/unmount hoặc route transition: không còn ScrollTrigger, ticker, listener cũ.

## Bài tập

Lấy một animation cố tình tệ dùng `left/top` cho 30 item. Chuyển sang transform + stagger, profile trước/sau, rồi viết reduced-motion variant.

**Tiêu chí đạt:** bạn có evidence trước/sau; UI không phụ thuộc animation để hiểu state; teardown không để object hoạt động trên DOM đã bị xóa.

## Đọc thêm

- [Accessible animation](https://gsap.com/resources/a11y/)
- [Flip API](https://gsap.com/docs/v3/Plugins/Flip/)
- [Draggable API](https://gsap.com/docs/v3/Plugins/Draggable/)
