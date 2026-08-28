# 01. Tween Cơ Bản

> **Mục tiêu:** chọn đúng `to()`, `from()`, `fromTo()` hoặc `set()`, và biết vì sao một animation bị nháy hoặc chạy sai state.

## Cấu trúc một tween

```js
const tween = gsap.to(target, vars);
```

`target` có thể là selector, một DOM element, NodeList hoặc array. `vars` chứa state đích và các option. `duration` dùng đơn vị giây, mặc định là `0.5`; ease mặc định là `"power1.out"`.

```js
const card = document.querySelector(".card");

const tween = gsap.to(card, {
  x: 80,
  rotation: 8,
  duration: 0.5,
  ease: "power2.out",
});
```

Ưu tiên direct element reference như trên trong component; selector chỉ an toàn khi nó được scope đúng vùng DOM.

## Bốn method cần nhớ

| Method | Điểm bắt đầu | Điểm kết thúc | Khi dùng |
| --- | --- | --- | --- |
| `to()` | computed state hiện tại | vars | Di chuyển, đổi state, hover. |
| `from()` | vars | computed state hiện tại | Entrance đơn giản. |
| `fromTo()` | fromVars | toVars | Cần kiểm soát cả hai đầu. |
| `set()` | không có animation | vars ngay lập tức | Chuẩn bị state hoặc reset. |

```js
gsap.to(".card", { x: 120, autoAlpha: 1, duration: 0.4 });
gsap.from(".title", { y: 24, autoAlpha: 0, duration: 0.5 });
gsap.fromTo(".dot", { scale: 0 }, { scale: 1, duration: 0.25 });
gsap.set(".menu", { autoAlpha: 0, y: -8 });
```

`autoAlpha` đặt cả `opacity` và `visibility`. Khi bằng 0, element không nhận click; vì vậy nó thường tốt hơn `opacity: 0` cho panel bị ẩn.

## Transform properties

Các property sau thường tránh layout work và là lựa chọn đầu tiên cho motion:

| GSAP | CSS tương đương | Đơn vị mặc định |
| --- | --- | --- |
| `x`, `y` | `translateX`, `translateY` | px |
| `xPercent`, `yPercent` | translate theo kích thước element | % |
| `scale` | scale cả hai trục | số |
| `rotation` | rotate | deg |
| `transformOrigin` | điểm xoay/scale | chuỗi CSS |

```js
gsap.to(".badge", {
  xPercent: -50,
  yPercent: -50,
  transformOrigin: "center center",
  scale: 1.2,
});
```

Không mặc định animate `top`, `left`, `width` hoặc `height` để tạo chuyển động. Chúng có thể cần layout lại; chỉ dùng khi chính layout mới là kết quả mong muốn.

## `from()` và lỗi nháy màn hình

`from()` áp dụng start state ngay khi tween được tạo (`immediateRender` mặc định là `true`). Điều này hữu ích cho entrance, nhưng có thể ghi đè state của tween `from()` khác hoặc làm content nháy trước khi JavaScript load.

```html
<!-- CSS giữ content ẩn trước khi JavaScript chạy -->
<h1 class="hero-title">Học GSAP</h1>
<style>.hero-title { visibility: hidden; }</style>
```

```js
gsap.fromTo(
  ".hero-title",
  { autoAlpha: 0, y: 24 },
  { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
);
```

Nếu nhiều tween `from()` cùng animate property của một target, đặt `immediateRender: false` cho tween chạy sau hoặc tổ chức chúng trong timeline. Đừng thêm `delay` để che lỗi state.

## Giá trị hữu ích

```js
gsap.to(".chip", { x: "+=24" });          // tương đối
gsap.to(".item", { rotation: "random(-8, 8)" });
gsap.to(".item", { x: (index) => index * 24 });
gsap.to(":root", { "--brand-hue": 220 }); // CSS variable
```

## Bài tập

Tạo card có ba state: vào trang, hover, rời hover. Dùng `fromTo()` cho entrance, `to()` trong hover và `set()` để reset state ban đầu.

**Tiêu chí đạt:** card không nháy khi refresh, không chặn click khi ẩn, và hover nhanh nhiều lần không để lại transform sai.

## Đọc thêm

- [Tween API](https://gsap.com/docs/v3/GSAP/Tween)
- [Avoiding FOUC](https://gsap.com/resources/fouc)
- [immediateRender](https://gsap.com/resources/immediaterender)
