# 03. Stagger và Phân Phối Animation

> **Mục tiêu:** animate list và grid bằng một tween, giữ thứ tự đọc và có phương án reduced motion.

Stagger tạo độ lệch thời gian giữa các target. Thay vì tạo mười tween có `delay`, tạo một tween với mười target. Code ngắn hơn, cleanup đơn giản hơn và timing nhất quán hơn.

```html
<ul class="list">
  <li class="item">Tween</li><li class="item">Ease</li><li class="item">Timeline</li>
</ul>
```

```js
gsap.from(".item", {
  y: 16,
  autoAlpha: 0,
  duration: 0.35,
  stagger: 0.08,
  ease: "power2.out",
});
```

`stagger: 0.08` nghĩa là target kế tiếp bắt đầu sau target trước 0.08 giây. Dùng `each` khi muốn nói rõ điều này; dùng `amount` khi muốn toàn bộ nhóm trải trong một khoảng thời gian cố định.

```js
gsap.from(".card", {
  autoAlpha: 0,
  scale: 0.96,
  duration: 0.4,
  stagger: { amount: 0.5, from: "center", ease: "power2.inOut" },
});
```

## Các option quan trọng

| Option | Ý nghĩa |
| --- | --- |
| `each` | Khoảng cách giữa thời điểm bắt đầu của hai target. |
| `amount` | Tổng thời gian phân phối của cả nhóm. |
| `from` | `"start"`, `"end"`, `"center"`, `"edges"`, `"random"` hoặc index. |
| `grid` | Kích thước grid, hoặc `"auto"` để GSAP suy ra khi tạo tween. |
| `ease` trong stagger | Phân phối start time, không thay tween ease. |

`grid: "auto"` được tính khi tween tạo ra, không tự tính lại theo resize. Khi grid đổi layout, tạo lại animation bằng `gsap.matchMedia()` hoặc refresh luồng của component.

## Đừng làm content khó đọc

```js
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.from(".card", { y: 20, autoAlpha: 0, stagger: 0.08 });
});
```

Với reduced motion, để content hiển thị sẵn trong HTML/CSS. Không dùng stagger dài cho item mà người dùng cần thao tác ngay.

## Bài tập

Tạo grid 3 x 3 có animation đi từ tâm ra ngoài. Sau đó chuyển `from` sang `"edges"`, ghi lại khác biệt, rồi tạo phiên bản reduced motion không có transform.

**Tiêu chí đạt:** không có item bị ẩn nếu JavaScript lỗi; layout mobile không dùng grid stagger desktop; tổng thời gian reveal không làm chậm nội dung chính.

## Đọc thêm

- [GSAP Staggers](https://gsap.com/resources/getting-started/Staggers)
