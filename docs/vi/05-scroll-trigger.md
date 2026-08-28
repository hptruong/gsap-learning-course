# 05. ScrollTrigger Từ Cơ Bản Đến Production

> **Mục tiêu:** hiểu trigger, `start`, `end`, `toggleActions`, scrub, pin và cách test responsive trước khi dùng effect phức tạp.

ScrollTrigger liên kết animation với viewport hoặc scroll position. Dùng nó sau khi bạn đã tự tin với tween và timeline. Đừng bắt đầu bằng pin hoặc horizontal scroll.

## Cài đặt và ví dụ đầu tiên

```html
<section class="feature"><h2>Đọc tôi khi cuộn đến đây</h2></section>
```

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.from(".feature", {
  y: 32,
  autoAlpha: 0,
  duration: 0.5,
  scrollTrigger: {
    trigger: ".feature",
    start: "top 80%",
    once: true,
    markers: true,
  },
});
```

`"top 80%"` nghĩa là animation bắt đầu khi **mép trên của trigger** chạm **điểm 80% chiều cao viewport**. `markers` chỉ dùng khi phát triển; phải xóa trước production.

## Hai kiểu hành vi

### Trigger rời rạc: `toggleActions`

```js
scrollTrigger: {
  trigger: ".feature",
  start: "top 75%",
  end: "bottom 25%",
  toggleActions: "play reverse play reverse",
}
```

Bốn action theo thứ tự là `onEnter`, `onLeave`, `onEnterBack`, `onLeaveBack`. Kiểu này phù hợp cho entrance/exit.

### Progress nối với scroll: `scrub`

```js
gsap.to(".illustration", {
  xPercent: 35,
  ease: "none",
  scrollTrigger: {
    trigger: ".story",
    start: "top bottom",
    end: "bottom top",
    scrub: 0.6,
  },
});
```

`scrub: true` gắn trực tiếp. `scrub: 0.6` khiến playhead đuổi theo scroll trong 0.6 giây. Không kết hợp `scrub` và `toggleActions`; scrub thắng và ý nghĩa của toggleActions trở nên mơ hồ.

## Timeline scroll và pin

```js
const story = gsap.timeline({
  scrollTrigger: {
    trigger: ".story",
    start: "top top",
    end: "+=900",
    pin: true,
    scrub: 0.8,
  },
});

story
  .to(".chapter-one", { autoAlpha: 0, y: -24 })
  .from(".chapter-two", { autoAlpha: 0, y: 24 }, "<");
```

Đặt ScrollTrigger trên **timeline**, không đặt trên tween con trong timeline. Khi pin, animate child bên trong section, không animate element đang bị pin. `pinSpacing` mặc định tạo khoảng trống để layout không sụp; chỉ tắt khi bạn đã xử lý layout thay thế.

## Responsive và reduced motion

```js
const mm = gsap.matchMedia();

mm.add(
  {
    desktop: "(min-width: 800px)",
    reduce: "(prefers-reduced-motion: reduce)",
  },
  (context) => {
    const { desktop, reduce } = context.conditions;
    gsap.from(".feature", {
      autoAlpha: 0,
      y: reduce ? 0 : 24,
      duration: reduce ? 0 : 0.45,
      scrollTrigger: desktop && !reduce ? { trigger: ".feature", start: "top 80%" } : undefined,
    });
  },
);
```

`matchMedia()` tự revert animation và ScrollTrigger khi query không còn match. Ngoài framework, gọi `mm.revert()` lúc teardown page. Mobile không phải desktop thu nhỏ: nhiều pin, scrub và horizontal scroll nên trở thành flow dọc bình thường.

## Refresh và lỗi layout

ScrollTrigger tự refresh khi resize, nhưng dynamic content, ảnh, web font hoặc accordion có thể đổi layout sau đó. Refresh đúng thời điểm:

```js
await document.fonts?.ready;
window.addEventListener("load", () => ScrollTrigger.refresh());
```

Không gọi `refresh()` trong mỗi scroll event. Tạo triggers theo thứ tự trên xuống dưới. Khi pin spacing thay đổi layout, thứ tự tạo sai có thể khiến trigger tính sai.

## Bài tập

1. Tạo ba content section reveal bằng `toggleActions` và markers.
2. Thêm một illustration scrubbed với `ease: "none"`.
3. Chỉ pin trên desktop; reduced motion không có pin hay scrub.

**Tiêu chí đạt:** test resize, scroll nhanh, tab keyboard, reduced motion, ảnh load chậm; markers không có trong production.

## Đọc thêm

- [ScrollTrigger API](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Most common ScrollTrigger mistakes](https://gsap.com/resources/st-mistakes)
