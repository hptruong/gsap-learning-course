# 15. Common Patterns: Chọn Constraint Trước Snippet

> **Mục tiêu:** đánh giá magnetic button, carousel, marquee, counter, image reveal và page transition bằng input, semantics, fallback và cleanup trước khi copy code.

Một pattern chỉ là interaction tốt khi nó giữ được mục đích trên keyboard, touch, reduced motion, resize và route change. Nếu không qua các constraint này, để nó ở sandbox — đừng ship.

## Decision matrix

| Pattern | Dùng khi | Không dùng khi | Fallback bắt buộc |
| --- | --- | --- | --- |
| Magnetic button | CTA phụ, pointer chính xác, vùng hit lớn | Form submit, touch-first UI, mọi link | Native hover/focus, offset 0. |
| Carousel | Có bộ slide hữu hạn cần so sánh | Content có thể là list/grid bình thường | Buttons, keyboard, selected state. |
| Marquee | Label trang trí hoặc brand list ngắn | Nó là cách duy nhất để đọc text/link | Static wrapped text + pause. |
| Counter | Số liệu có ngữ cảnh và final value | User cần giá trị chính xác ngay | Final number trong HTML. |
| Image reveal | Visual có thể bắt đầu static | Image là LCP/content bị ẩn | Visible image/caption. |
| Page transition | Cùng-app state change rõ ràng | Chỉ để che loading/navigation | Native navigation và focus/history đúng. |

## Magnetic button: input-aware và bounded

```js
const mm = gsap.matchMedia();
const button = document.querySelector(".magnetic");

mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
  const xTo = gsap.quickTo(button, "x", { duration: 0.2, ease: "power3.out" });
  const yTo = gsap.quickTo(button, "y", { duration: 0.2, ease: "power3.out" });

  const move = (event) => {
    const rect = button.getBoundingClientRect();
    xTo(gsap.utils.clamp(-12, 12, (event.clientX - rect.left - rect.width / 2) * 0.25));
    yTo(gsap.utils.clamp(-12, 12, (event.clientY - rect.top - rect.height / 2) * 0.25));
  };
  const leave = () => gsap.to(button, { x: 0, y: 0, duration: 0.25, overwrite: "auto" });
  button.addEventListener("pointermove", move);
  button.addEventListener("pointerleave", leave);
  return () => { button.removeEventListener("pointermove", move); button.removeEventListener("pointerleave", leave); };
});
```

`quickTo()` tái sử dụng tween. Media query làm touch/reduced motion không nhận listener; cleanup return chạy khi query không còn match. Button vẫn là native `button`/`a` với focus ring.

## Carousel: animation không thay accessibility model

Carousel bounded và infinite loop là hai bài toán khác nhau. Bắt đầu bounded:

1. HTML có heading, list slide và button previous/next tên rõ.
2. Một biến `activeIndex` là source of truth; update `aria-current`, disabled state và live announcement có chủ ý.
3. Keyboard: button native hoạt động; không hijack Arrow key toàn page; focus không rơi vào content hidden.
4. GSAP chỉ animate slide đang rời/vào. Dùng `overwrite: "auto"` khi click nhanh.
5. Destroy remove listener/tween; nếu clone node để loop, không duplicate ID hoặc focusable content.

`horizontalLoop()` là helper/community pattern, không phải built-in API. Đọc source/demo trước khi dùng và chứng minh duplicate node không làm screen reader hoặc tab order sai.

## Marquee và counter: data phải tồn tại trước animation

Marquee dùng `ease: "none"` nếu loop, pause bằng hover/focus và reduced motion giữ static. Không duplicate interactive link để tạo loop; nếu duplicate decorative text, thêm `aria-hidden="true"` cho clone.

Counter phải render final value có nghĩa trước:

```html
<p>Đã tiết kiệm <strong class="metric">0</strong> giờ mỗi tuần.</p>
```

```js
const value = { count: 0 };
gsap.to(value, {
  count: 128,
  duration: 0.8,
  ease: "power1.out",
  snap: { count: 1 },
  onUpdate: () => { document.querySelector(".metric").textContent = String(value.count); },
});
```

Không announce mỗi frame với `aria-live`; chỉ announce final change nếu user action cần feedback. Với giá trị thay đổi từ server, semantic text/data phải đúng trước rồi motion mới là enhancement.

## Image reveal và page transition

`clip-path` reveal cần ảnh static visible nếu JavaScript tắt. Chỉ thêm class `.js` sau khi script sẵn sàng; đừng hide ảnh base CSS. Test image crop, contrast caption và GPU mobile.

Page transition không được trì hoãn navigation lâu, làm mất focus hoặc phá back/forward. Bắt đầu bằng transition trong một component/page; nếu sau này dùng router transition, define rõ: route mới render khi nào, focus heading nào, navigation pending state và cleanup animation cũ ở đâu.

## Checklist ship

- [ ] Content/action có lý do tồn tại không cần effect.
- [ ] Pointer, keyboard, touch và focus state đều hoạt động.
- [ ] Reduced motion/static fallback đã test, không chỉ `timeScale` global.
- [ ] Không tạo tween/listener không giới hạn ở input/frame.
- [ ] Route/component teardown không còn transform, trigger, clone node hoặc listener cũ.
- [ ] Có screenshot/video normal + 375px + keyboard + reduced motion.

## Bài tập

Chọn **một** pattern. Viết decision matrix riêng, dựng static fallback, implement bản desktop tối giản, rồi test checklist. Nếu không trả lời được một hàng, bỏ effect hoặc giữ nó trong playground.

**Tiêu chí đạt:** pattern không là cách duy nhất để hiểu content; có source of truth cho state; và cleanup/fallback là một phần của implementation chứ không phải ghi chú cuối bài.

## Đọc thêm

- [GSAP utility methods](https://gsap.com/docs/v3/GSAP/UtilityMethods/)
- [GSAP accessibility](https://gsap.com/resources/a11y/)
