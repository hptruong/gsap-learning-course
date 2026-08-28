# 11. Motion cho Landing Page: Từ Brief Đến QA

> **Mục tiêu:** thiết kế một landing page static-first, rồi thêm motion để làm rõ hierarchy, feedback và orientation mà không làm chậm LCP, phá focus hoặc ép người dùng xem intro.

Landing page không mặc định cần preloader, smooth scroll, cursor follower hay pinned story. Motion tốt trả lời được một trong ba câu: **điều gì quan trọng trước**, **state vừa đổi là gì**, hoặc **nội dung này liên quan nhau thế nào**. Nếu không trả lời được, CSS hover hoặc không motion thường tốt hơn.

## Motion inventory trước khi viết GSAP

Lập inventory cho từng element. Đây là công cụ tránh “effect creep”.

| Element | Mục đích | Trigger | Static / reduced-motion fallback | Không làm gì |
| --- | --- | --- | --- | --- |
| Hero copy | Đưa mắt theo hierarchy | first paint | Content đã visible; có thể fade ngắn | Không stagger 1.5 giây. |
| Primary CTA | Xác nhận hover/focus | pointer / keyboard | Native CSS focus + hover | Không magnetic trên mọi device. |
| Product visual | Giải thích feature | section enter | Static image/caption | Không chặn LCP bằng preloader. |
| Feature cards | Nhóm hóa danh sách | viewport enter | Hiển thị sẵn | Không hide khi JS fail. |
| Story diagram | Diễn giải một sequence | optional desktop scroll | Flow dọc | Không horizontal scroll trên mobile. |

Chỉ code hàng có mục đích và fallback rõ. Một section có thể hoàn toàn tĩnh.

## Hero static-first, sau đó mới timeline

HTML/CSS phải readable trước. Nếu muốn tránh FOUC, chỉ CSS ẩn element khi JavaScript đã chủ động thêm class `js` vào `<html>`; không để plain HTML bị `visibility: hidden`.

```html
<section class="hero">
  <p class="hero__eyebrow">New release</p>
  <h1 class="hero__title">Move with clarity.</h1>
  <p class="hero__body">A product sentence that stays readable without JavaScript.</p>
  <a class="hero__cta" href="#pricing">See pricing</a>
</section>
```

```js
const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  const intro = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  intro
    .from(".hero__eyebrow", { y: 12, autoAlpha: 0, duration: 0.28 })
    .from(".hero__title", { y: 22, autoAlpha: 0, duration: 0.5 }, "<0.08")
    .from(".hero__body, .hero__cta", { y: 12, autoAlpha: 0, duration: 0.32, stagger: 0.06 }, "<0.16");
});
```

Timeline thể hiện hierarchy: eyebrow trước, title là primary moment, supporting copy/CTA sau. Không chain `delay`; không autoplay lại khi người dùng quay về page; không animate layout property chỉ để đưa content vào.

## Feature reveal: giúp scan, không trì hoãn scan

```js
const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.from(".feature-card", {
    y: 20,
    autoAlpha: 0,
    duration: 0.4,
    stagger: { each: 0.07, from: "start" },
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".feature-grid",
      start: "top 78%",
      once: true,
    },
  });
});
```

Ở reduced motion, không tạo tween; card vẫn visible do HTML/CSS. Với list dài, chỉ animate item cần thiết/đang vào viewport, không tạo hàng trăm trigger. Khi visual quan trọng là ảnh responsive, chờ `load` hoặc `document.fonts.ready` rồi refresh đúng lúc nếu layout đã đổi.

## CTA: interactive state phải tồn tại không cần GSAP

```css
.hero__cta {
  display: inline-flex;
  padding: .8rem 1rem;
  border-radius: .5rem;
  background: #111827;
  color: white;
  transition: background-color .15s ease;
}
.hero__cta:hover { background: #374151; }
.hero__cta:focus-visible { outline: 3px solid #60a5fa; outline-offset: 3px; }
```

GSAP có thể thêm feedback nhỏ, nhưng không thay CSS state hoặc browser focus:

```js
const cta = document.querySelector(".hero__cta");
cta.addEventListener("pointerenter", () => gsap.to(cta, { y: -2, duration: 0.18, ease: "power2.out" }));
cta.addEventListener("pointerleave", () => gsap.to(cta, { y: 0, duration: 0.18, ease: "power2.out" }));
```

Nếu dùng listener trong SPA, cleanup khi unmount. Với touch, hover không phải primary interaction; CTA vẫn phải rõ bằng layout và label.

## Performance: đo đúng thứ cần đo

| Metric / test | Motion có thể làm hỏng thế nào | Cách kiểm tra |
| --- | --- | --- |
| LCP | Preloader, font/ảnh chờ animation, hero hidden. | Chrome Performance + throttled network; hero vẫn hiện trước animation. |
| CLS | Animate hoặc inject layout, font swap sau trigger đo vị trí. | Performance/Experience panel; reserve image size. |
| INP | Pointer event tạo tween mới liên tục, heavy filter/blur. | Interaction trong Performance; dùng `quickTo()` cho high-frequency input. |
| Mobile GPU | Pin dài, clip-path/filter lớn, quá nhiều layer. | Máy thật, battery saver, reduced motion. |

Không tuyên bố “60fps” chỉ từ việc dùng transform. Profile thiết bị thấp và giảm bớt motion trước khi thêm `will-change`; chỉ set `will-change` cho element sắp animate và clear sau đó nếu cần.

## QA release checklist

1. JavaScript tắt / script load lỗi: hero, CTA, pricing và feature vẫn đọc/click được.
2. 375px + touch: không pin/horizontal scroll bắt buộc; focus không bị che bởi fixed UI.
3. Keyboard: thứ tự Tab theo DOM, `:focus-visible` rõ, không có animation chặn input.
4. `prefers-reduced-motion`: content không enter từ xa, scrub/pin decorative bị bỏ.
5. Resize, web font, ảnh chậm: ScrollTrigger không tính sai; không refresh trong scroll.
6. Production: không markers, không console error, listener/ticker/context được cleanup.

## Bài tập

Chọn landing page thật hoặc mock. Tạo static layout gồm hero, 3 feature và CTA. Viết motion inventory, sau đó chỉ implement **hai** hàng: hero timeline và feature reveal. Record evidence cho JS-off, 375px, keyboard, reduced motion và Performance trace.

**Tiêu chí đạt:** bạn giải thích được mục đích của từng tween; LCP content không bị giữ bởi animation; mobile không bị ép vào desktop effect; và page usable khi GSAP không load.

## Đọc thêm

- [GSAP accessibility](https://gsap.com/resources/a11y/)
- [GSAP performance best practices](https://gsap.com/resources/)
- [Web Vitals](https://web.dev/articles/vitals)
