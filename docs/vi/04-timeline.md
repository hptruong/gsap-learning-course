# 04. Timeline, Labels và Điều Khiển

> **Mục tiêu:** tạo choreography nhiều bước không phụ thuộc vào chuỗi `delay`.

Timeline là container chứa tween. Mỗi tween được thêm nối tiếp mặc định; position parameter quyết định tween bắt đầu ở đâu. Đây là công cụ chính cho hero, menu, modal, page transition và bất cứ flow nhiều bước nào.

```js
const intro = gsap.timeline({
  paused: true,
  defaults: { ease: "power2.out" },
});

intro
  .addLabel("enter")
  .from(".eyebrow", { y: 12, autoAlpha: 0, duration: 0.25 }, "enter")
  .from(".title", { y: 28, autoAlpha: 0, duration: 0.5 }, "<0.08")
  .from(".action", { autoAlpha: 0, scale: 0.96, duration: 0.25 }, ">-0.1");

intro.play();
```

## Position parameter

| Giá trị | Nghĩa |
| --- | --- |
| `0` | Bắt đầu ở giây thứ 0. |
| `"+=0.2"` | 0.2 giây sau animation trước kết thúc. |
| `"-=0.2"` | 0.2 giây trước animation trước kết thúc. |
| `"<"`, `">"` | Cùng thời điểm bắt đầu, hoặc kết thúc của animation vừa thêm. |
| `"label"`, `"label+=0.2"` | Theo label đã đặt tên. |

Label làm code đọc như kịch bản. Đừng dùng số giây “ma thuật” ở nhiều nơi nếu chúng mô tả cùng một cảnh.

## Điều khiển tween và timeline

```js
playButton.addEventListener("click", () => intro.play());
pauseButton.addEventListener("click", () => intro.pause());
reverseButton.addEventListener("click", () => intro.reverse());
restartButton.addEventListener("click", () => intro.restart());
```

Tween và timeline đều trả về animation instance, nên có `progress()`, `time()`, `timeScale()`, `kill()` và callback như `onComplete`. Lưu instance khi UI cần điều khiển; không query/tạo lại timeline ở mỗi click.

## Ví dụ: menu mở và đóng

```js
const menu = gsap.timeline({ paused: true, reversed: true });
menu
  .set(".menu", { autoAlpha: 1 })
  .fromTo(".menu", { yPercent: -100 }, { yPercent: 0, duration: 0.35 })
  .from(".menu a", { y: 12, autoAlpha: 0, stagger: 0.05 }, "<0.1");

toggle.addEventListener("click", () => {
  menu.reversed() ? menu.play() : menu.reverse();
});
```

GSAP chỉ animate hình ảnh. Bạn vẫn phải cập nhật `aria-expanded`, quản lý focus và cho phép phím Escape đóng menu.

## Bài tập

Tạo modal có open và close bằng cùng một timeline. Thử click nhanh năm lần.

**Tiêu chí đạt:** animation không nhảy state, backdrop không nhận click khi modal đóng, `aria-expanded` và focus khớp state thực.

## Đọc thêm

- [Timeline API](https://gsap.com/docs/v3/GSAP/Timeline)
- [Position parameter](https://gsap.com/resources/position-parameter)
