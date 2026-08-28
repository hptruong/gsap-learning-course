# 12. Awwwards Patterns: Học Kỹ Thuật, Không Copy Hiệu Ứng

> **Mục tiêu:** phân tích, dựng lại và đánh giá một creative pattern theo mục đích nội dung, input, mobile và accessibility — thay vì thêm effect chỉ để giống một award site.

“Awwwards-style” không phải một API hay một style riêng. Đó thường là tổ hợp của typography mạnh, art direction, layout có chủ ý và một vài chuyển động được choreograph kỹ. GSAP chỉ là một phần của hệ thống đó.

## Trước khi mở DevTools: viết motion brief

Đừng bắt đầu bằng “mình muốn làm cursor / split text / horizontal scroll”. Hãy điền brief này cho **một** section:

| Câu hỏi | Ví dụ tốt | Dấu hiệu nên bỏ effect |
| --- | --- | --- |
| Người dùng cần hiểu gì? | Ảnh sản phẩm có ba chi tiết cần được dẫn mắt qua. | Effect không làm rõ nội dung nào. |
| Motion bắt đầu vì đâu? | Người dùng bấm mở gallery hoặc section đi vào viewport. | Tự chạy vô hạn trên content cần đọc. |
| State tĩnh là gì? | Ảnh và caption đọc được khi JavaScript tắt. | Mọi thứ `opacity: 0` chờ JavaScript. |
| Mobile làm gì? | Ảnh xếp dọc; vẫn có button next/previous. | Ép người dùng swipe một “fake horizontal scroll”. |
| Reduced motion là gì? | Đổi ảnh tức thì hoặc fade ngắn. | Vẫn scrub, parallax và transform lớn. |

Nếu không viết được câu trả lời, chưa đến lúc code animation.

## Pattern 01 — Image reveal có chủ đích

**Use case:** reveal một visual khi user chủ động mở story hoặc section vừa đi vào viewport. Không dùng để che content quan trọng lúc page load.

HTML vẫn có ảnh và caption thật; `clip-path` chỉ là enhancement:

```html
<figure class="work-card">
  <img class="work-card__image" src="shoe.jpg" alt="Giày chạy màu cam trên nền xám">
  <figcaption>01 — Velocity / Spring campaign</figcaption>
</figure>
```

```css
.work-card__image { display: block; width: 100%; }
.js .work-card__image { clip-path: inset(0 100% 0 0); }
```

```js
const image = document.querySelector(".work-card__image");

gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
  gsap.to(image, {
    clipPath: "inset(0 0% 0 0)",
    duration: 0.7,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: image,
      start: "top 75%",
      once: true,
    },
  });
});
```

**Vì sao pattern này ổn:** image còn đọc được nếu script fail; animation chỉ thay đổi visual mask; caption không bị split hoặc aria-hidden. Test ảnh lớn trên mobile thật vì `clip-path` + ảnh lớn có thể tốn paint.

## Pattern 02 — Kinetic type nhưng semantics vẫn đúng

Kinetic type dễ tạo “wow” và cũng rất dễ làm screen reader đọc từng ký tự. Quy tắc: **source text là một heading bình thường**; SplitText chỉ là DOM tạm thời, có cleanup.

```html
<h2 class="manifesto">Build for people, not a reel.</h2>
```

```js
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const split = SplitText.create(".manifesto", {
  type: "words",
  aria: "auto",
});

gsap.from(split.words, {
  yPercent: 110,
  autoAlpha: 0,
  duration: 0.55,
  stagger: 0.045,
  ease: "power3.out",
  scrollTrigger: { trigger: ".manifesto", start: "top 80%", once: true },
});

// Trong SPA / component teardown:
// split.revert();
```

Đừng tự `split("")`, đừng animate heading chứa link/button, và đừng dùng stagger dài để trì hoãn câu người dùng cần đọc. Nếu font load muộn hoặc layout thay đổi, tạo split sau `await document.fonts.ready` và cleanup trước khi split lại.

## Pattern 03 — Magnetic button là feedback, không phải navigation state

Magnetic effect phù hợp cho CTA phụ hoặc card portfolio có kích thước đủ lớn. Nó không thay thế `:hover`, focus ring hay trạng thái pressed. Pointer event tần suất cao cần `quickTo()`, không tạo tween mới mỗi lần mousemove.

```js
const button = document.querySelector(".magnetic");
const xTo = gsap.quickTo(button, "x", { duration: 0.24, ease: "power3.out" });
const yTo = gsap.quickTo(button, "y", { duration: 0.24, ease: "power3.out" });

button.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch") return;
  const rect = button.getBoundingClientRect();
  xTo((event.clientX - rect.left - rect.width / 2) * 0.18);
  yTo((event.clientY - rect.top - rect.height / 2) * 0.18);
});
button.addEventListener("pointerleave", () => {
  xTo(0);
  yTo(0);
});
```

Giữ CTA click được, dùng native `button` hoặc `a`, có `:focus-visible`, và tắt effect cho reduced motion. Không gắn custom cursor hoặc magnetic movement vào mọi link trên site.

## Pattern 04 — Pinned story: chỉ pin khi không gian kể chuyện tăng lên

Một pinned section tốt có một ý tưởng, 2–4 state, giới hạn scroll rõ và mobile fallback. Nó không phải container bắt buộc của landing page.

```js
const mm = gsap.matchMedia();

mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
  const story = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: ".feature-story",
      start: "top top",
      end: "+=1200",
      scrub: 0.8,
      pin: true,
    },
  });

  story
    .to(".story-image", { scale: 1.04 })
    .to(".story-copy--one", { autoAlpha: 0, y: -24 }, 0.35)
    .fromTo(".story-copy--two", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0 }, 0.35);
});
```

Pin parent `.feature-story`; animate child `.story-image`, không animate element bị pin. Trên mobile, CSS phải hiển thị đầy đủ các story copy theo flow dọc **mà không cần GSAP**. Không đặt ScrollTrigger trên tween con của timeline.

## React + TypeScript: pattern phải có lifecycle

Trong React, animation của một pattern chỉ được tạo sau render và phải revert. `useGSAP` + scope là baseline:

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function ProjectTeaser() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".teaser__image", {
      clipPath: "inset(0 100% 0 0)",
      duration: 0.7,
      ease: "power3.inOut",
    });
  }, { scope: root });

  return <section ref={root}><img className="teaser__image" alt="Project preview" src="/preview.jpg" /></section>;
}
```

Với animation sinh trong handler sau khi hook chạy, dùng `contextSafe()`. Với dependency đổi layout, cân nhắc `revertOnUpdate: true`; không query selector global và không để style inline từ page trước còn lại khi route đổi.

## Review một site truyền cảm hứng theo 5 lớp

Khi xem Awwwards, đừng chỉ record màn hình. Pause ở từng state và lập bảng:

| Lớp | Câu hỏi để reverse engineer | Evidence cần ghi |
| --- | --- | --- |
| Narrative | User đang ở đâu, bước tiếp theo là gì? | Static screenshot vẫn hiểu hierarchy. |
| Layout | Kích thước, crop, type scale thay đổi ở breakpoint nào? | Desktop + 375px screenshot. |
| State | DOM/CSS state trước khi motion chạy là gì? | JS-off hoặc throttled-load test. |
| Motion | Trigger, duration, ease, cancel/reverse là gì? | Timeline labels, không chỉ duration đoán mò. |
| Quality | Keyboard, touch, reduce motion, slow GPU có ổn? | QA matrix và Performance recording. |

Một site đẹp không đồng nghĩa pattern của nó đúng cho product của bạn. Copy **quyết định** (hierarchy, pacing, reveal intent), không copy bề mặt (cursor, noise, scroll-jack).

## Bài tập: rebuild có giới hạn

Chọn một project từ [Awwwards GSAP collection](https://www.awwwards.com/websites/gsap-animation/) và làm lại **một section**:

1. Chụp static state, viết motion brief và dựng HTML/CSS responsive trước.
2. Chọn đúng một pattern: image reveal, kinetic title, magnetic CTA **hoặc** pinned story.
3. Tạo reduced-motion variant và mobile normal-flow variant trước khi polish desktop.
4. Record 10 giây ở desktop, 375px, keyboard-only và reduced motion.
5. Viết 3 dòng: effect giúp narrative thế nào, effect nào bạn chủ động bỏ, và lý do.

**Tiêu chí đạt:** content đọc được khi JavaScript không chạy; không scroll-jack; không để animation quyết định accessibility state; không có ScrollTrigger/listener tồn tại sau unmount; và bạn giải thích được vì sao pattern tồn tại.

## Đọc sâu hơn

- [GSAP accessibility guide](https://gsap.com/resources/a11y/)
- [SplitText documentation](https://gsap.com/docs/v3/Plugins/SplitText/)
- [ScrollTrigger common mistakes](https://gsap.com/resources/st-mistakes/)
- [Awwwards Academy: Animation system](https://www.awwwards.com/academy/course/design-meaningful-experiences-through-an-animation-system)
